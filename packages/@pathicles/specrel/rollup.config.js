import { join } from 'path'
import bundleSize from 'rollup-plugin-bundle-size'
import cleanup from 'rollup-plugin-cleanup'
// import prettier from 'rollup-plugin-prettier'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default [
  {
    input: join('src', 'index.js'),
    output: {
      format: 'cjs',
      file: pkg.main
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
  },
  {
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
]



// import pkg from './package.json'
// import commonjs from '@rollup/plugin-commonjs'
// import nodeResolve from '@rollup/plugin-node-resolve'
// import glslify from 'rollup-plugin-glslify'
// import bundleSize from 'rollup-plugin-bundle-size'
// import { join } from 'path'
// import cleanup from 'rollup-plugin-cleanup'
// // import prettier from 'rollup-plugin-prettier'
//
// export default {
//   input: join('src', 'Specrel.js'),
//   output: {
//     format: 'esm',
//     file: pkg.module
//   },
//   plugins: [
//     nodeResolve({ preferBuiltins: true }),
//     commonjs({
//       // https://github.com/rollup/@rollup/plugin-commonjs#usage-in-monorepo
//       include: /node_modules/,
//       namedExports: {
//         // node_modules/prop-types/factoryWithTypeCheckers.js#L115
//         'prop-types': [
//           'array',
//           'bool',
//           'func',
//           'number',
//           'object',
//           'string',
//           'symbol',
//           'any',
//           'arrayOf',
//           'element',
//           'elementType',
//           'instanceOf',
//           'node',
//           'objectOf',
//           'oneOf',
//           'oneOfType',
//           'shape',
//           'exact'
//         ]
//       }
//     }),
//     glslify(),
//     cleanup(),
//     // prettier({
//     //   sourcemap: false,
//     //   parser: 'babel'
//     // }),
//     bundleSize()
//   ],
//   external: ['debug', 'regl']
// }
