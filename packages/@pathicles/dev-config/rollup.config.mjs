import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import { sizeme } from 'rollup-plugin-sizeme'
import json from '@rollup/plugin-json'
import { join } from 'path'
import cleanup from 'rollup-plugin-cleanup'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import notify from 'rollup-plugin-notify'
import { terser } from 'rollup-plugin-terser'
import glslify from 'rollup-plugin-glslify'

export default (pkg) => ({
  input: join('src', 'index.js'),
  output: [
    {
      format: 'esm',
      file: pkg.module
    }
    // {
    //   format: 'cjs',
    //   file: pkg.main,
    //   plugins: [
    //     getBabelOutputPlugin({
    //       presets: ['@babel/preset-env'],
    //       plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]]
    //     })
    //     // terser()
    //   ]
    // }
  ],
  plugins: [
    glslify({ compress: false }),
    notify(),
    cleanup(),
    nodeResolve(),
    commonjs({
      include: /node_modules/
    }),
    json(),
    sizeme()
  ],
  external: ['debug', 'regl']
})
