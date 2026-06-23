import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// rpui.js (runtime) + rpml-loader.js (depends on rpui.js as a shared chunk).
// gallery.js is built separately (vite.gallery.config.ts) as a fully
// self-contained bundle so the compiler can inline it as a single <script>.
export default defineConfig({
  root: resolve(__dirname, "../.."),
  build: {
    lib: {
      entry: {
        rpui: resolve(__dirname, "src/rpui.ts"),
        "rpml-loader": resolve(__dirname, "src/rpml-loader.ts"),
      },
      formats: ["es"],
    },
    outDir: resolve(__dirname, "dist"),
    sourcemap: true,
    minify: false,
    emptyOutDir: false,
    rollupOptions: {
      output: { entryFileNames: "[name].js" },
    },
  },
});
