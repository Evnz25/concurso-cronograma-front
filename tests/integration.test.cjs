const { test } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const { PassThrough, Readable, Writable } = require("node:stream");
const { loadTs } = require("./load-ts.cjs");
const { createApiClient, ApiError } = loadTs("src/services/apiService.ts");
const { mapTrack, mapQuestion, mapExam, mapBlocks, mapAttempt } = loadTs(
  "src/services/apiAdapters.ts",
);
const stats = loadTs("src/services/statsService.ts");
const { localDate } = loadTs("src/services/formatService.ts");
const { filterExams } = loadTs("src/services/examService.ts");
const { getWeekDays, getBreakBefore, getPlannedMinutes } = loadTs(
  "src/services/scheduleService.ts",
);
const { createProxy } = require("../scripts/api-proxy.cjs");

// Formatos reais das rotas catalogo.js e sync.js, incluindo IDs não conhecidos pelo protótipo.
const tracks = [
  {
    _id: "trilha-dev",
    nome: "Desenvolvimento",
    materias: [
      { _id: "mat-db", nome: "Banco de dados", temas: [{ _id: "tema-sql", nome: "SQL" }] },
    ],
  },
  { _id: "trilha-dados", nome: "Dados", materias: [] },
];
const rawQuestion = {
  _id: "q-1",
  materiaId: "mat-db",
  temaId: "tema-sql",
  enunciado: "Qual comando consulta dados?",
  alternativas: ["INSERT", "SELECT"],
  gabarito: "B",
  banca: "Banca",
  ano: 2026,
};
const rawExam = {
  _id: "c-1",
  orgao: "Órgão Exemplo",
  cargo: "Analista",
  localizacao: "Brasil",
  fimEdital: "2026-12-01T00:00:00.000Z",
  trilhaIds: ["trilha-dev", "trilha-dados"],
};
const basePage = {
  usuario: { id: "u-1", nome: "Pessoa", email: "pessoa@example.com" },
  cronogramas: [],
  tentativas: [],
  tem_mais: false,
  proximo_desde: "2026-11-23T12:00:00Z",
};
function mockResponses(t, responses) {
  const requests = [];
  t.mock.method(global, "fetch", async (url, options) => {
    requests.push({ url, options });
    assert.ok(responses.length, "requisição extra inesperada");
    const { body, status = 200 } = responses.shift();
    return new Response(typeof body === "string" ? body : JSON.stringify(body), { status });
  });
  return requests;
}

test("converte catálogo, gabarito, múltiplas trilhas e campos ausentes", () => {
  assert.equal(mapTrack(tracks[0]).id, "trilha-dev");
  const question = mapQuestion(rawQuestion, tracks);
  assert.equal(question.correctIndex, 1);
  assert.equal(question.theme, "SQL");
  assert.equal(question.topic, "Banco de dados");
  assert.equal(question.trackId, "trilha-dev");
  const exam = mapExam(rawExam, tracks);
  assert.equal(exam.salary, null);
  assert.equal(exam.vacancies, null);
  assert.equal(exam.registrationDeadline, "2026-12-01");
  assert.equal(filterExams([exam], "mine", "trilha-dados").length, 1);
  assert.equal(filterExams([exam], "mine", "outra").length, 0);
});

test("baixa todas as páginas de questões e codifica IDs", async (t) => {
  const requests = mockResponses(t, [
    { body: { total: 2, questoes: [rawQuestion] } },
    { body: { total: 2, questoes: [{ ...rawQuestion, _id: "q-2" }] } },
  ]);
  assert.equal((await createApiClient("http://api").questions("trilha a&b")).length, 2);
  assert.match(requests[0].url, /trilhaId=trilha%20a%26b/);
  assert.match(requests[1].url, /pagina=2/);
});

test("sync deduplica borda inclusiva e preserva cronogramas das páginas anteriores", async (t) => {
  mockResponses(t, [
    {
      body: {
        ...basePage,
        tem_mais: true,
        proximo_desde: "2026-11-22T12:00:00Z",
        cronogramas: [{ id: "cron-1" }],
        tentativas: [{ id: "t-1" }],
      },
    },
    { body: { ...basePage, tentativas: [{ id: "t-1" }, { id: "t-2" }] } },
  ]);
  const result = await createApiClient("http://api").download("token");
  assert.equal(result.tentativas.length, 2);
  assert.equal(result.cronogramas.length, 1);
});

test("renova a semana antes de mostrar os pesos e blocos persistidos", async (t) => {
  const ciclo = {
    id: "semana-2",
    ativo: 1,
    trilha_id: "ti",
    pesos: [
      { materia_id: "redes", peso: 2 },
      { materia_id: "dados", peso: 1 },
    ],
    etapas: [
      {
        id: "e1",
        materia_id: "redes",
        data: "2026-11-24",
        duracao_min: 60,
        pausa_min: 0,
        concluida: 1,
      },
      {
        id: "e2",
        materia_id: "dados",
        data: "2026-11-24",
        duracao_min: 60,
        pausa_min: 15,
        concluida: 0,
      },
      {
        id: "e3",
        materia_id: "redes",
        data: "2026-11-24",
        duracao_min: 60,
        pausa_min: 0,
        concluida: 0,
      },
      {
        id: "e4",
        materia_id: "dados",
        data: "2026-11-24",
        duracao_min: 60,
        pausa_min: 0,
        concluida: 0,
      },
    ],
  };
  const requests = mockResponses(t, [
    { body: { ok: true } },
    { body: { ...basePage, cronogramas: [ciclo] } },
  ]);
  const sync = await createApiClient("http://api").downloadCurrentWeek("sessao");
  assert.deepEqual(sync.cronogramas, [ciclo]);
  const blocos = mapBlocks(sync.cronogramas, [
    {
      _id: "ti",
      materias: [
        { _id: "redes", nome: "Redes" },
        { _id: "dados", nome: "Banco de Dados" },
      ],
    },
  ]);
  assert.deepEqual(
    blocos.map((b) => [b.id, b.title, b.durationMinutes, b.subjectWeight, b.completed]),
    [
      ["e1", "Redes", 60, 2, true],
      ["e2", "Banco de Dados", 60, 1, false],
      ["e3", "Redes", 60, 2, false],
      ["e4", "Banco de Dados", 60, 1, false],
    ],
  );
  assert.equal(getPlannedMinutes(blocos), 240);
  assert.deepEqual(
    blocos.map((_, i) => getBreakBefore(blocos, i)?.durationMinutes ?? 0),
    [0, 0, 15, 0],
  );
  assert.equal(requests[0].url, "http://api/estudo/ciclos/atual");
  assert.equal(requests[0].options.method, "POST");
  assert.equal(requests[0].options.headers.Authorization, "Bearer sessao");
  assert.match(requests[1].url, /\/sync\?/);
});

test("interrompe paginação sem progresso em vez de travar a interface", async (t) => {
  const body = { ...basePage, tem_mais: true, tentativas: [{ id: "t-1" }] };
  mockResponses(t, [{ body }, { body }]);
  await assert.rejects(createApiClient("http://api").download("token"), /cursor adicional/);
});

test("envia JWT e JSON e propaga erro de autenticação", async (t) => {
  const requests = mockResponses(t, [{ status: 401, body: { erro: "Sessão expirada." } }]);
  await assert.rejects(
    createApiClient("http://api/").request("/conta", "abc", "PATCH", { nome: "Pessoa" }),
    (error) =>
      error instanceof ApiError && error.status === 401 && error.message === "Sessão expirada.",
  );
  assert.equal(requests[0].url, "http://api/conta");
  assert.equal(requests[0].options.headers.Authorization, "Bearer abc");
  assert.deepEqual(JSON.parse(requests[0].options.body), { nome: "Pessoa" });
});

test("trata resposta não JSON, falha de rede e HTTP 429", async (t) => {
  mockResponses(t, [
    { body: "<html>Erro</html>", status: 502 },
    { body: { erro: "Aguarde." }, status: 429 },
  ]);
  await assert.rejects(createApiClient("http://api").tracks(), /JSON válido/);
  await assert.rejects(
    createApiClient("http://api").tracks(),
    (error) => error.status === 429 && error.message === "Aguarde.",
  );
  t.mock.restoreAll();
  t.mock.method(global, "fetch", async () => {
    throw new TypeError("fetch failed");
  });
  await assert.rejects(createApiClient("http://api").tracks(), /Não foi possível acessar/);
});

test("HTTP 200 com operação rejeitada ou ignorada não é tratado como sucesso", async (t) => {
  mockResponses(t, [
    { body: { resultados: [{ id: 1, status: "rejeitada", motivo: "Matéria inválida." }] } },
    { body: { resultados: [{ id: 1, status: "ok", ignorada: true }] } },
    { body: { resultados: [] } },
  ]);
  const api = createApiClient("http://api");
  const operations = [
    { id: 1, entidade: "etapa_estudo", entidade_id: "e-1", operacao: "update", payload: {} },
  ];
  await assert.rejects(api.upload("token", operations), /Matéria inválida/);
  await assert.rejects(api.upload("token", operations), /mais recente/);
  await assert.rejects(api.upload("token", operations), /não confirmou/);
});

test("respeita limite de 100 operações por requisição", async (t) => {
  const operations = Array.from({ length: 101 }, (_, index) => ({ id: index + 1 }));
  const requests = mockResponses(t, [
    { body: { resultados: operations.slice(0, 100).map((item) => ({ ...item, status: "ok" })) } },
    { body: { resultados: [{ id: 101, status: "ok" }] } },
  ]);
  await createApiClient("http://api").upload("token", operations);
  assert.equal(JSON.parse(requests[0].options.body).operacoes.length, 100);
  assert.equal(JSON.parse(requests[1].options.body).operacoes.length, 1);
});

test("cadastro exige a escolha de trilha e login usa apenas as credenciais", async (t) => {
  const requests = mockResponses(t, [{ body: {} }, { body: {} }]);
  const client = createApiClient("http://api");
  await assert.rejects(client.authenticate("cadastro", "a@example.org", "senha-teste"), /trilha/);
  await client.authenticate("cadastro", "a@example.org", "senha-teste", {
    name: " Ana ",
    trackId: "redes",
  });
  await client.authenticate("login", "a@example.org", "senha-teste");
  const cadastro = JSON.parse(requests[0].options.body);
  assert.equal(cadastro.trilha_id, "redes");
  assert.equal(cadastro.nome, "Ana");
  assert.deepEqual(JSON.parse(requests[1].options.body), {
    email: "a@example.org",
    senha: "senha-teste",
  });
});

test("envia apenas trilha, fuso e id de reenvio e usa o ciclo devolvido pela API", async (t) => {
  const cycle = { id: "c1", etapas: [{ id: "e1", materia_id: "m", data: "2027-09-01" }] };
  const requests = mockResponses(t, [{ body: { cronograma: cycle } }]);
  const returned = await createApiClient("http://api").createCycle("token", "c1", "ti");
  assert.deepEqual(returned, cycle);
  assert.equal(requests[0].url, "http://api/estudo/ciclos");
  assert.deepEqual(JSON.parse(requests[0].options.body), {
    id: "c1",
    trilha_id: "ti",
    deslocamento_utc_min: -new Date().getTimezoneOffset() || 0,
  });
});

test("usa a prévia e a tentativa confirmada pelo servidor", async (t) => {
  const saved = { id: "t1", proxima_revisao: "2027-02-15" };
  const dates = { hard: "2027-02-12", medium: "2027-02-13", easy: "2027-02-14" };
  const agenda = [{ questao_id: "q", vencimento: saved.proxima_revisao }];
  const requests = mockResponses(t, [
    { body: dates },
    { body: { resultados: [{ status: "ok", tentativa: saved }] } },
    { body: { revisoes: agenda } },
    { body: { resultados: [{ status: "rejeitada", motivo: "Questão inválida" }] } },
  ]);
  const client = createApiClient("http://api");
  const input = {
    id: "t1",
    questao_id: "q",
    alternativa: "B",
    respondida_em: "2027-02-01T12:00:00Z",
    deslocamento_utc_min: -180,
  };
  assert.deepEqual(await client.preview("token", input), dates);
  assert.deepEqual(await client.saveAnswer("token", input, 5), saved);
  assert.deepEqual(await client.reviews("token"), agenda);
  const { id, ...fields } = input;
  assert.deepEqual(JSON.parse(requests[1].options.body).operacoes[0].payload, {
    ...fields,
    dificuldade_informada: 5,
  });
  assert.ok(requests.every((r) => r.options.headers.Authorization === "Bearer token"));
  await assert.rejects(client.saveAnswer("token", input, 5), /Questão inválida/);
});

test("mapeia etapas reais e calcula estatísticas sem valores de demonstração", () => {
  const now = new Date().toISOString();
  const blocks = mapBlocks(
    [
      {
        id: "cron-1",
        trilha_id: "trilha-dev",
        pesos: [{ materia_id: "mat-db", peso: 1.2 }],
        etapas: [
          {
            id: "e-1",
            materia_id: "mat-db",
            data: localDate(),
            duracao_min: 90,
            pausa_min: 15,
            concluida: 1,
            concluida_em: now,
          },
          {
            id: "e-2",
            materia_id: "mat-db",
            data: localDate(),
            duracao_min: 60,
            pausa_min: 15,
            concluida: 0,
            concluida_em: null,
          },
        ],
      },
    ],
    tracks,
  );
  assert.equal(blocks[0].title, "Banco de dados");
  assert.equal(blocks[0].subjectWeight, 1.2);
  assert.equal(blocks[0].weeklyMinutes, 150);
  assert.equal(blocks[0].startTime, "");
  assert.equal(stats.getStudyHours("week", blocks), 1.5);
  assert.equal(stats.getSubjectHours("week", blocks)[0].hours, 1.5);
  assert.equal(stats.getStudyHours("month", []), 0);
  assert.equal(stats.getAccuracy([]).percent, 0);
  const answers = [
    { correct: true, answeredAt: now },
    { correct: false, answeredAt: "2000-01-01T12:00:00Z" },
  ];
  assert.equal(stats.getQuestionsSolved("week", answers), 1);
  assert.equal(stats.getAccuracy(stats.filterAnswers(answers, "week")).percent, 100);
});

test("calcula pesos atuais das matérias ordenados por prioridade e carga do ciclo", () => {
  assert.deepEqual(stats.getSubjectWeights(undefined, tracks), []);
  const catalog = [
    {
      _id: "trilha-dev",
      nome: "Desenvolvimento",
      materias: [
        { _id: "mat-db", nome: "Banco de Dados", temas: [] },
        { _id: "mat-logica", nome: "Lógica de Programação", temas: [] },
        { _id: "mat-gov", nome: "Governança de TI", temas: [] },
      ],
    },
  ];
  const schedule = {
    id: "cron-1",
    trilha_id: "trilha-dev",
    pesos: [
      { materia_id: "mat-gov", peso: 0.8 },
      { materia_id: "mat-db", peso: 1.6 },
      { materia_id: "mat-logica", peso: 1.0 },
    ],
    etapas: [
      { id: "e-1", materia_id: "mat-db", duracao_min: 120 },
      { id: "e-2", materia_id: "mat-db", duracao_min: 60 },
      { id: "e-3", materia_id: "mat-logica", duracao_min: 120 },
    ],
  };
  const weights = stats.getSubjectWeights(schedule, catalog);
  assert.deepEqual(
    weights.map((row) => ({
      subjectId: row.subjectId,
      title: row.title,
      weight: row.weight,
      sharePercent: row.sharePercent,
      weeklyMinutes: row.weeklyMinutes,
      icon: row.icon,
    })),
    [
      {
        subjectId: "mat-db",
        title: "Banco de Dados",
        weight: 1.6,
        sharePercent: 47,
        weeklyMinutes: 180,
        icon: "database",
      },
      {
        subjectId: "mat-logica",
        title: "Lógica de Programação",
        weight: 1,
        sharePercent: 29,
        weeklyMinutes: 120,
        icon: "code",
      },
      {
        subjectId: "mat-gov",
        title: "Governança de TI",
        weight: 0.8,
        sharePercent: 24,
        weeklyMinutes: 0,
        icon: "briefcase",
      },
    ],
  );
  assert.equal(stats.getWeightTone(1.6), "orange");
  assert.equal(stats.getWeightTone(1), "purple");
  assert.equal(stats.getWeightTone(0.8), "green");
});

test("revisão pendente usa somente a tentativa mais recente da questão", () => {
  const question = mapQuestion(rawQuestion, tracks);
  const attempt = mapAttempt(
    {
      id: "t-1",
      questao_id: question.id,
      acertou: 1,
      respondida_em: "2026-01-01T12:00:00Z",
      dificuldade_informada: 5,
      proxima_revisao: "2026-01-02",
    },
    [question],
  );
  assert.equal(attempt.theme, "SQL");
  assert.equal(attempt.difficulty, "easy");
  assert.equal(stats.getPendingReviewCount([attempt]), 1);
  assert.equal(
    stats.getPendingReviewCount([
      attempt,
      { ...attempt, id: "t-2", answeredAt: "2026-02-01T12:00:00Z", nextReview: "2099-01-01" },
    ]),
    0,
  );
});

test("calendário preserva data completa na mudança do mês", () => {
  const week = getWeekDays(new Date(2026, 10, 30), [{ date: "2026-12-01" }]);
  assert.equal(week[0].date, "2026-11-30");
  assert.equal(week[1].date, "2026-12-01");
  assert.equal(week[1].hasStudy, true);
  assert.equal(week[0].hasStudy, false);
});

async function listen(server) {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return "http://127.0.0.1:" + server.address().port;
}
test("proxy valida origem e encaminha JSON e autorização sem abrir sockets", async (t) => {
  t.mock.method(http, "request", (url, options, callback) => {
    const outgoing = new PassThrough();
    outgoing.setTimeout = () => outgoing;
    let body = "";
    outgoing.on("data", (chunk) => (body += chunk));
    outgoing.on("finish", () => {
      const response = Readable.from([
        JSON.stringify({
          path: url.pathname + url.search,
          method: options.method,
          authorization: options.headers.authorization,
          body: JSON.parse(body),
        }),
      ]);
      response.statusCode = 200;
      response.headers = { "content-type": "application/json" };
      callback(response);
    });
    return outgoing;
  });
  const proxy = createProxy("http://api.example");
  function invoke(method, origin, body = "") {
    return new Promise((resolve) => {
      const req = new PassThrough();
      req.method = method;
      req.url = "/conta?teste=1";
      req.headers = { origin, authorization: "Bearer session", "content-type": "application/json" };
      let output = "";
      const res = new Writable({
        write(chunk, encoding, done) {
          output += chunk;
          done();
        },
      });
      const headers = {};
      res.setHeader = (name, value) => {
        headers[name] = value;
      };
      res.writeHead = (status) => {
        res.statusCode = status;
      };
      res.on("finish", () => resolve({ status: res.statusCode, headers, output }));
      proxy.emit("request", req, res);
      req.end(body);
    });
  }
  const options = await invoke("OPTIONS", "http://localhost:8081");
  assert.equal(options.status, 204);
  assert.equal(options.headers["Access-Control-Allow-Origin"], "http://localhost:8081");
  const response = await invoke(
    "PATCH",
    "http://localhost:8081",
    JSON.stringify({ nome: "Pessoa" }),
  );
  assert.deepEqual(JSON.parse(response.output), {
    path: "/conta?teste=1",
    method: "PATCH",
    authorization: "Bearer session",
    body: { nome: "Pessoa" },
  });
  assert.equal((await invoke("GET", "https://outro-site.example")).status, 403);
});

test(
  "proxy HTTP com sockets reais (RUN_HTTP_TESTS=1)",
  { skip: process.env.RUN_HTTP_TESTS !== "1" },
  async (t) => {
    const upstream = http.createServer((req, res) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            path: req.url,
            method: req.method,
            authorization: req.headers.authorization,
            body: JSON.parse(body || "{}"),
          }),
        );
      });
    });
    const target = await listen(upstream);
    const proxy = createProxy(target);
    const url = await listen(proxy);
    t.after(() => {
      proxy.closeAllConnections();
      upstream.closeAllConnections();
      proxy.close();
      upstream.close();
    });
    const preflight = await fetch(url + "/conta", {
      method: "OPTIONS",
      headers: { Origin: "http://localhost:8081" },
    });
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get("access-control-allow-origin"), "http://localhost:8081");
    const result = await createApiClient(url).request("/conta?teste=1", "session", "PATCH", {
      nome: "Pessoa",
    });
    assert.equal(result.authorization, "Bearer session");
    assert.equal(result.method, "PATCH");
    assert.equal(result.path, "/conta?teste=1");
    assert.deepEqual(result.body, { nome: "Pessoa" });
    assert.equal(
      (await fetch(url + "/conta", { headers: { Origin: "https://outro-site.example" } })).status,
      403,
    );
  },
);
