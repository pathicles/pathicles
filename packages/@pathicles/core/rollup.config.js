import pkg from './package.json'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import bundleSize from 'rollup-plugin-bundle-size'
import json from '@rollup/plugin-json'
import { join } from 'path'
import glslify from 'rollup-plugin-glslify'
import cleanup from 'rollup-plugin-cleanup'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import visualizer from 'rollup-plugin-visualizer'

// eslint-disable-next-line no-undef
const prod = () => process.env.NODE_ENV === 'production'

const output = [
  {
    format: 'esm',
    file: pkg.module
  }
]

if (prod()) {
  output.push({
    format: 'cjs',
    file: pkg.main,
    plugins: [
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
        plugins: [['@babel/plugin-transform-runtime', { useESModules: false }]]
      })
    ]
  })
}

export default {
  input: join('src', 'index.js'),
  output,
  plugins: [
    visualizer({ filename: 'stats.html' }),
    cleanup(),
    nodeResolve(),
    commonjs({
      include: /node_modules/
    }),
    json(),
    glslify({ compress: false }),
    bundleSize()
  ],
  external: ['debug', 'regl']
}
