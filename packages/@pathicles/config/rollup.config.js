import { join } from 'path'
import bundleSize from 'rollup-plugin-bundle-size'
import cleanup from 'rollup-plugin-cleanup'
// import prettier from 'rollup-plugin-prettier'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  input: join('src', 'index.js'),
  output: {
    format: 'esm',
    file: pkg.module
  },
  plugins: [
    resolve(),
    commonjs(),
    cleanup(),
    // prettier({
    //   sourcemap: true,
    //   parser: 'babel'
    // }),
    babel({
      exclude: 'node_modules/**'
    }),
    bundleSize()
  ]
}
