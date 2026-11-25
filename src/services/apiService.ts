import type {
  AnswerInput,
  ApiAttempt,
  ApiSchedule,
  SimulationSummary,
  ReviewEntry,
  ApiExam,
  ApiQuestion,
  ApiTrack,
  AuthResponse,
  SyncOperation,
  SyncResponse,
} from "../interfaces/Api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status = 0,
  ) {
    super(message);
  }
}

export function createApiClient(baseUrl: string) {
  async function request<T>(
    path: string,
    token?: string,
    method = "GET",
    body?: unknown,
  ): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(`${baseUrl.replace(/\/$/, "")}${path}`, {
        method,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(body === undefined ? {} : { "Content-Type": "application/json" }),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      });
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new ApiError(
          "A API não retornou JSON válido. Confira o endereço do servidor.",
          response.status,
        );
      }
      if (!response.ok)
        throw new ApiError(data.erro || `Erro HTTP ${response.status}.`, response.status);
      return data as T;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(
        "Não foi possível acessar a API. Confira a conexão e o endereço do servidor e tente novamente.",
      );
    } finally {
      clearTimeout(timer);
    }
  }

  return {
    request,
    startSimulation: (token: string, scheduleId: string) =>
      request<{ id: string; total: number; pendentes: string[] }>("/estudo/simulados", token, "POST", {
        cronograma_id: scheduleId, agendado: true, deslocamento_utc_min: -new Date().getTimezoneOffset(),
      }),
    finishSimulation: (token: string, id: string) =>
      request<{ cronograma: ApiSchedule; resumo: SimulationSummary | null }>(`/estudo/simulados/${encodeURIComponent(id)}/concluir`, token, "POST", {
        deslocamento_utc_min: -new Date().getTimezoneOffset(),
      }),
    reviews: async (token: string) =>
      (await request<{ revisoes: ReviewEntry[] }>("/estudo/agenda", token)).revisoes,
    studyAgenda: async (token: string) => {
      const result = await request<{ revisoes: ReviewEntry[]; em_andamento: boolean }>(
        `/estudo/agenda?simulado=1&deslocamento_utc_min=${-new Date().getTimezoneOffset()}`, token,
      );
      return { agenda: result.revisoes, openSimulation: result.em_andamento };
    },
    preview: (token: string, input: AnswerInput) =>
      request<Record<"hard" | "medium" | "easy", string>>("/estudo/previa", token, "POST", input),
    createCycle: async (token: string, id: string, trackId: string) =>
      (
        await request<{ cronograma: ApiSchedule }>("/estudo/ciclos", token, "POST", {
          id,
          trilha_id: trackId,
          deslocamento_utc_min: -new Date().getTimezoneOffset(),
        })
      ).cronograma,
    async saveAnswer(token: string, input: AnswerInput, difficulty: number) {
      const { id, ...answer } = input;
      const response = await request<{
        resultados: { status: string; tentativa?: ApiAttempt; motivo?: string;
          plano?: { cronograma: ApiSchedule; resumo: SimulationSummary } | null }[];
      }>("/sync", token, "POST", {
        operacoes: [
          {
            id: 1,
            entidade: "tentativa_exercicio",
            entidade_id: id,
            operacao: "insert",
            payload: { ...answer, dificuldade_informada: difficulty, ...(!answer.simulado_id && { incluir_cronograma: true }) },
          },
        ],
      });
      const result = response.resultados[0];
      if (result?.status !== "ok" || result.tentativa?.id !== id)
        throw new ApiError(result?.motivo || "A API não confirmou o agendamento da revisão.");
      return { tentativa: result.tentativa, plano: result.plano };
    },
    async authenticate(
      mode: "login" | "cadastro",
      email: string,
      senha: string,
      registration?: { name: string; trackId: string },
    ) {
      if (mode === "cadastro" && !registration?.trackId)
        throw new ApiError("Escolha uma trilha de estudo.");
      return request<AuthResponse>(`/auth/${mode}`, undefined, "POST", {
        email,
        senha,
        ...(mode === "cadastro" && registration
          ? {
              nome: registration.name.trim(),
              trilha_id: registration.trackId,
              deslocamento_utc_min: -new Date().getTimezoneOffset(),
            }
          : {}),
      });
    },
    tracks: async () => (await request<{ trilhas: ApiTrack[] }>("/catalogo/trilhas")).trilhas,
    async downloadCurrentWeek(token: string) {
      await request("/estudo/ciclos/atual", token, "POST", {
        deslocamento_utc_min: -new Date().getTimezoneOffset(),
      });
      return this.download(token);
    },
    updateAfterPractice: (token: string) =>
      request<{ cronograma: ApiSchedule | null; resumo: SimulationSummary | null }>("/estudo/ciclos/atual", token, "POST", {
        incluir_cronograma: true, deslocamento_utc_min: -new Date().getTimezoneOffset(),
      }),
    exams: async () => (await request<{ concursos: ApiExam[] }>("/catalogo/concursos")).concursos,
    async questions(trackId: string) {
      const result: ApiQuestion[] = [];
      for (let pagina = 1; ; pagina++) {
        const page = await request<{ total: number; questoes: ApiQuestion[] }>(
          `/catalogo/questoes?trilhaId=${encodeURIComponent(trackId)}&pagina=${pagina}&limite=500`,
        );
        result.push(...page.questoes);
        if (result.length >= page.total) return result;
        if (!page.questoes.length)
          throw new ApiError("A paginação de questões não avançou. Tente atualizar os dados.");
      }
    },
    async download(token: string): Promise<SyncResponse> {
      const schedules = new Map<string, SyncResponse["cronogramas"][number]>();
      const attempts = new Map<string, SyncResponse["tentativas"][number]>();
      let cursor = "";
      for (;;) {
        const page = await request<SyncResponse>(
          `/sync?limite=500${cursor ? `&desde=${encodeURIComponent(cursor)}` : ""}`,
          token,
        );
        page.cronogramas.forEach((item) => schedules.set(item.id, item));
        page.tentativas.forEach((item) => attempts.set(item.id, item));
        if (!page.tem_mais)
          return {
            ...page,
            cronogramas: [...schedules.values()],
            tentativas: [...attempts.values()],
          };
        if (!page.proximo_desde || page.proximo_desde === cursor) {
          throw new ApiError(
            "A paginação do histórico não avançou. A API precisa de um cursor adicional para registros com a mesma data.",
          );
        }
        cursor = page.proximo_desde;
      }
    },
    async upload(token: string, operations: SyncOperation[]) {
      // Envio sequencial: uma etapa só pode ser criada depois do cronograma.
      for (let start = 0; start < operations.length; start += 100) {
        const batch = operations.slice(start, start + 100);
        const response = await request<{
          resultados: { id: number; status: string; motivo?: string; ignorada?: boolean }[];
        }>("/sync", token, "POST", { operacoes: batch });
        for (const operation of batch) {
          const result = response.resultados.find((item) => item.id === operation.id);
          if (!result || result.status !== "ok")
            throw new ApiError(result?.motivo || "A API não confirmou a alteração.");
          if (result.ignorada)
            throw new ApiError(
              "Há uma alteração mais recente no servidor. Atualize os dados antes de tentar novamente.",
            );
        }
      }
    },
  };
}
