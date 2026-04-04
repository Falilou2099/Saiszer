import { fileURLToPath } from "url";
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const rootDir = path.resolve(fileURLToPath(new URL(".", import.meta.url)));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: true,
  },
  resolve: {
    alias: {
      "@": rootDir,
    },
  },
});
