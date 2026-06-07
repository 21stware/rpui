import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/rpui.ts'),
      formats: ['es'],
      fileName: () => 'rpui.js'
    },
    sourcemap: true,
    minify: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});
