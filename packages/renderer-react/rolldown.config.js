import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'src/index.tsx',
  external: [/^react/, '@21stware/rpui'],
  platform: 'browser',
  transform: { jsx: 'react-jsx' },
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
});
