import pkg from './package.json'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import glslify from 'rollup-plugin-glslify'
import bundleSize from 'rollup-plugin-bundle-size'
import { join } from 'path'
import cleanup from 'rollup-plugin-cleanup'
import progress from 'rollup-plugin-progress'

export default {
  input: join('src', 'index.js'),
  output: {
    format: 'esm',
    file: pkg.module
  },
  plugins: [
    progress({
      clearLine: false // default: true
    }),
    nodeResolve(),
    commonjs({
      // https://github.com/rollup/@rollup/plugin-commonjs#usage-in-monorepo
      include: /node_modules/
    }),
    glslify(),
    cleanup(),
    bundleSize()
  ],
  external: ['debug', 'regl']
}
