import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projectRequire = createRequire(resolve(projectRoot, "package.json"));

try {
  projectRequire.resolve("framer-motion");
} catch {
  console.log("Framer Motion está ausente. Instalando as dependências do projeto...");

  const result = spawnSync(
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["install", "--no-audit", "--no-fund"],
    { cwd: projectRoot, stdio: "inherit", shell: process.platform === "win32" },
  );

  if (result.error) {
    console.error("Não foi possível iniciar o npm:", result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  try {
    projectRequire.resolve("framer-motion");
  } catch {
    console.error("O npm terminou, mas o Framer Motion ainda não pode ser encontrado.");
    process.exit(1);
  }
}
