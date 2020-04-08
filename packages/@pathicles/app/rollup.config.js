/* eslint-env node */

import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import bundleSize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import { dependencies } from './package.json'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const external = Object.keys(dependencies)
const extensions = ['.js', '.vue']
const isProduction = !process.env.ROLLUP_WATCH
const globals = { vue: 'Vue' }

const lintOpts = {
  extensions,
  exclude: ['**/*.json'],
  cache: true,
  throwOnError: true
}

const plugins = [
  resolve(),
  // eslint(lintOpts),
  bundleSize(),
  vue({
    template: {
      isProduction,
      compilerOptions: { preserveWhitespace: false }
    },
    css: true
  }),
  buble(),
  serve(), // index.html should be in root of project
  livereload()
]

export default {
  external,
  plugins,
  input: 'src/entry.js',
  output: {
    globals,
    file: 'dist/bundle.js',
    format: 'umd'
  }
}
