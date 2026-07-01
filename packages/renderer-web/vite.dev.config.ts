import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "../..");

export default defineConfig({
  root,
  resolve: {
    alias: {
      "@": resolve(root, "preview/src"),
      "@21stware/rpui": resolve(root, "packages/renderer-web/src/rpui.ts"),
      "@21stware/rpui-react": resolve(
        root,
        "packages/renderer-react/src/index.tsx",
      ),
    },
  },
  plugins: [react(), tailwindcss()],
  server: {
    open: "/preview/",
  },
});
