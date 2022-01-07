/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readdirSync } from 'fs';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

const absolutePathAliases = {};
// Root resources folder
const srcPath = path.resolve('./src/');
// Ajust the regex here to include .vue, .js, .jsx, etc.. files from the resources/ folder
const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((dirent) =>
  dirent.name.replace(/(\.(ts|js|jsx|css)){1}(x?)/, '')
);

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...absolutePathAliases,
    },
  },

  // build: {
  //   rollupOptions: {
  //     input: 'src/main.jsx',
  //   },
  // },
  test: {
    global: true,
    environment: 'happy-dom',
  },
});
