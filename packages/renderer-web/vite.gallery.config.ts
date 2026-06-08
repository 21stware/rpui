import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

// gallery.js — a single, fully self-contained bundle (runtime + parser + gallery
// chrome). inlineDynamicImports + a single entry guarantees no shared chunks, so
// the compiler can embed it as one <script> in standalone HTML.
export default defineConfig({
  root: resolve(__dirname, '../..'),
  build: {
    lib: {
      entry: resolve(__dirname, 'src/gallery.ts'),
      formats: ['es'],
      fileName: () => 'gallery.js'
    },
    outDir: resolve(__dirname, 'dist'),
    sourcemap: true,
    minify: false,
    emptyOutDir: false,
    rollupOptions: {
      output: { inlineDynamicImports: true }
    }
  }
});
