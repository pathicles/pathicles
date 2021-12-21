// vite.config.js
import glslify from 'rollup-plugin-glslify'
import path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'PathiclesConfig',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      // external: ['vue'],
      plugins: [
        glslify({
          inclwde: [
            '**/*.vs',
            '**/*.fs',
            '**/*.vert',
            '**/*.frag',
            '**/*.glsl'
          ],

          // Undefined by default
          exclude: 'node_modules/**',

          // Compress shader by default using logic from rollup-plugin-glsl
          compress: true
        })
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          // vue: 'Vue'
        }
      }
    }
  }
  // plugins: [dts()]
})
