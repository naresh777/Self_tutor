import { defineConfig } from "vite";
import { readFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url)));

// Relative base so the build works at https://<user>.github.io/self_tutor/ or any other folder.
export default defineConfig({
  base: "./",
  define: { __APP_VERSION__: JSON.stringify(version) },
  build: { outDir: "dist", assetsDir: "assets" },
});
