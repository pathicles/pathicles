import pkg from './package.json'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import bundleSize from 'rollup-plugin-bundle-size'
import json from '@rollup/plugin-json'
import { join } from 'path'
import glslify from 'rollup-plugin-glslify'
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
    cleanup(),
    // babel({ babelHelpers: 'bundled' }),
    nodeResolve(),
    commonjs({
      // https://github.com/rollup/@rollup/plugin-commonjs#usage-in-monorepo
      include: /node_modules/
    }),
    json(),
    glslify({ compress: false }),
    bundleSize()
  ],
  external: ['debug', 'regl']
}

//
//
// import pkg from './package.json'
// import commonjs from '@rollup/plugin-commonjs'
// import nodeResolve from '@rollup/plugin-node-resolve'
// import glslify from 'rollup-plugin-glslify'
// import json from '@rollup/plugin-json'
// import bundleSize from 'rollup-plugin-bundle-size'
// import { join } from 'path'
// import cleanup from 'rollup-plugin-cleanup'
// import babel from '@rollup/plugin-babel'
// // import progress from 'rollup-plugin-progress'
// // import babel from '@rollup/plugin-babel'
//
// export default {
//   input: join('src', 'index.js'),
//   output: {
//     format: 'esm',
//     file: pkg.module
//   },
//   plugins: [
//     // progress({
//     //   clearLine: true // default: true
//     // }),
//     // babel(),
//     babel({ babelHelpers: 'bundled' }),
//     nodeResolve(),
//     commonjs({
//       // https://github.com/rollup/@rollup/plugin-commonjs#usage-in-monorepo
//       include: /node_modules/
//     }),
//     glslify({ compress: false }),
//     cleanup(),
//     json(),
//     bundleSize()
//   ],
//   watch: {
//     chokidar: {
//       paths: 'src/**'
//     }
//   },
//   external: ['debug', 'regl', 'gl-mat4', 'gl-vec3']
// }
