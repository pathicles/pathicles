import pkg from './package.json'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import bundleSize from 'rollup-plugin-bundle-size'
import { join } from 'path'
import cleanup from 'rollup-plugin-cleanup'
// import progress from 'rollup-plugin-progress'

export default {
  input: join('src', 'index.js'),
  output: {
    format: 'esm',
    file: pkg.module
  },
  plugins: [
    // progress({
    //   clearLine: true // default: true
    // }),
    babel({ babelHelpers: 'bundled' }),
    nodeResolve(),
    commonjs({
      // https://github.com/rollup/@rollup/plugin-commonjs#usage-in-monorepo
      include: /node_modules/
    }),
    cleanup(),
    bundleSize()
  ],
  external: ['debug', 'regl']
}
