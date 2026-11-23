// Usa o TypeScript já instalado para testar serviços puros sem adicionar dependências.
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const cache = new Map();
function loadTs(file) {
  const absolute = path.resolve(__dirname, "..", file);
  if (cache.has(absolute)) return cache.get(absolute).exports;
  const module = { exports: {} };
  cache.set(absolute, module);
  const code = ts.transpileModule(fs.readFileSync(absolute, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const localRequire = (name) => {
    if (!name.startsWith(".") && !name.startsWith("@/")) return require(name);
    const resolved = name.startsWith("@/")
      ? path.resolve(__dirname, "../src", name.slice(2))
      : path.resolve(path.dirname(absolute), name);
    return loadTs(resolved + ".ts");
  };
  new Function("require", "module", "exports", code)(localRequire, module, module.exports);
  return module.exports;
}
module.exports = { loadTs };
