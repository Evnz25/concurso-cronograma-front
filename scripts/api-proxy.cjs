// Proxy opcional para APIs externas sem CORS. A API deste projeto já aceita acesso direto.
const http = require("node:http");
const https = require("node:https");

function createProxy(target = "http://127.0.0.1:3000", webOrigin = "") {
  const upstream = new URL(target);
  if (!["http:", "https:"].includes(upstream.protocol))
    throw new Error("API_PROXY_TARGET deve usar HTTP ou HTTPS.");
  return http.createServer((req, res) => {
    const origin = req.headers.origin;
    const allowed =
      !origin ||
      origin === webOrigin ||
      /^http:\/\/(localhost|127\.0\.0\.1):(8081|19006)$/.test(origin);
    if (!allowed) {
      res.writeHead(403);
      res.end("Origem não permitida.");
      return;
    }
    if (origin) res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }
    if (
      !["GET", "POST", "PATCH"].includes(req.method) ||
      !/^\/(saude|catalogo|auth|conta|sync)(\/|\?|$)/.test(req.url || "")
    ) {
      res.writeHead(404);
      res.end();
      return;
    }
    // O destino é fixo. Nunca aceitar host ou URL absoluta enviados pelo navegador.
    const url = new URL(upstream);
    url.pathname = upstream.pathname.replace(/\/$/, "") + req.url.split("?")[0];
    url.search = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
    const headers = { accept: "application/json" };
    for (const name of ["content-type", "content-length", "authorization"]) {
      if (req.headers[name]) headers[name] = req.headers[name];
    }
    const request = (url.protocol === "https:" ? https : http).request(
      url,
      { method: req.method, headers },
      (response) => {
        res.statusCode = response.statusCode || 502;
        for (const name of ["content-type", "retry-after"]) {
          if (response.headers[name]) res.setHeader(name, response.headers[name]);
        }
        response.on("error", () => res.destroy());
        response.pipe(res);
      },
    );
    request.setTimeout(14000, () => request.destroy(new Error("Timeout")));
    request.on("error", () => {
      if (res.headersSent) {
        res.destroy();
        return;
      }
      res.writeHead(502, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ erro: "API indisponível. Inicie o back-end e confira API_PROXY_TARGET." }),
      );
    });
    req.on("aborted", () => request.destroy());
    req.pipe(request);
  });
}

if (require.main === module) {
  const port = Number(process.env.API_PROXY_PORT || 3001);
  const proxy = createProxy(process.env.API_PROXY_TARGET, process.env.WEB_ORIGIN);
  proxy.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `A porta ${port} já está em uso. Se o proxy já estiver rodando em outro terminal, mantenha apenas aquela instância. Para reiniciá-lo, encerre a instância anterior com Ctrl+C e execute npm run api:proxy novamente.`,
      );
    } else {
      console.error(`Não foi possível iniciar o proxy: ${error.message}`);
    }
    process.exitCode = 1;
  });
  proxy.listen(
    port,
    "127.0.0.1",
    () => {
      console.log(`Proxy da API disponível em http://localhost:${port}`);
    },
  );
}
module.exports = { createProxy };
