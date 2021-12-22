// vite.config.js

import {glslify} from 'vite-plugin-glslify'
import path from 'path'
import { defineConfig } from 'vite'
// import dts from 'vite-plugin-dts'


const moduleURL = new URL(import.meta.url);
// console.log(`pathname ${moduleURL.pathname}`);
// console.log(`dirname ${path.dirname(moduleURL.pathname)}`);

const dirname = path.dirname(moduleURL.pathname);


console.log(glslify)

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'pathicles-core',
      fileName: (format) => `pathicles-core.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // external: ['vue'],

      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          // vue: 'Vue'
        }
      }
    }
  },

  plugins: [glslify()]
})
