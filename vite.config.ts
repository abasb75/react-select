import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { globSync } from 'glob';
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import rollupTs from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';




// https://vite.dev/config/
export default defineConfig({
  appType: 'mpa', 
  plugins: [
    react(),
    libInjectCss(),
    dts({ insertTypesEntry: true }),
   copy({
    targets: [
      { src: './assets/package.json', dest: './dist' }
    ],
    hook: 'writeBundle'
  })
  
  ],
  resolve: {
    alias: {
      "@lib":"/lib",
      "@reactApp":"/react-app",
    },
  },
  
  build: {
    copyPublicDir:false,
    cssMinify:true,
    minify:true,
    sourcemap:true,
    assetsDir:"",
    lib: {
      entry: resolve(__dirname, './lib/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      // https://rollupjs.org/configuration-options/#input
      input: Object.fromEntries(
        globSync(["lib/index.ts"]).map((file) => {
          // This remove `src/` as well as the file extension from each
          // file, so e.g. src/nested/foo.js becomes nested/foo
          const entryName = path.relative(
            "lib",
            file.slice(0, file.length - path.extname(file).length)
          );
          // This expands the relative paths to absolute paths, so e.g.
          // src/nested/foo becomes /project/src/nested/foo.js
          const entryUrl = fileURLToPath(new URL(file, import.meta.url));
          return [entryName, entryUrl];
        })
      ),
      output: {
        entryFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
        globals: {
          react: "React",
          "react-dom": "React-dom",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },

  
});
