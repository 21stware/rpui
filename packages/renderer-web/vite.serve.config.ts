import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

// serve.js — the `rpui serve` CLI, bundled to Node-compatible ESM with a
// shebang. node: builtins stay external; it reads the sibling gallery.js at
// runtime, so the bundle itself is tiny.
export default defineConfig({
  root: resolve(__dirname, '../..'),
  build: {
    lib: {
      entry: resolve(__dirname, 'src/serve/cli.ts'),
      formats: ['es'],
      fileName: () => 'serve.js'
    },
    target: 'node18',
    outDir: resolve(__dirname, 'dist'),
    sourcemap: false,
    minify: false,
    emptyOutDir: false,
    rollupOptions: {
      external: [/^node:/],
      output: {
        inlineDynamicImports: true,
        banner: '#!/usr/bin/env node'
      }
    }
  }
});
