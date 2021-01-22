import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import bundleSize from 'rollup-plugin-bundle-size'
import json from '@rollup/plugin-json'
import { join } from 'path'
import glslify from 'rollup-plugin-glslify'
import cleanup from 'rollup-plugin-cleanup'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import visualizer from 'rollup-plugin-visualizer'
import fs from 'fs-extra-plus'
// import notify from 'rollup-plugin-notify'
// import closureCompile from '@ampproject/rollup-plugin-closure-compiler'
// eslint-disable-next-line no-undef
const prod = () => process.env.NODE_ENV === 'production'

const output = (pkg) => {
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
          plugins: [
            ['@babel/plugin-transform-runtime', { useESModules: false }]
          ]
        })
      ]
    })
  }

  return output
}

export default (pkg) => ({
  input: join('src', 'index.js'),
  output: output(pkg),
  plugins: [
    // notify(),
    {
      name: 'watch-external',
      async buildStart() {
        const files = await fs.glob('src/**/*')
        for (let file of files) {
          this.addWatchFile(file)
        }
      }
    },
    visualizer({ filename: 'stats.html' }),
    cleanup(),
    nodeResolve(),
    commonjs({
      include: /node_modules/
    }),
    json(),
    glslify({ compress: false }),
    bundleSize()
    // closureCompile({
    //   debug: true,
    //   compilation_level: 'SIMPLE' // Or 'ADVANCED' or 'WHITESPACE_ONLY'
    // })
  ],
  external: ['debug', 'regl']
})
