import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import glslify from 'rollup-plugin-glslify'
import bundleSize from 'rollup-plugin-bundle-size'
import cleanup from 'rollup-plugin-cleanup'
import prettier from 'rollup-plugin-prettier'

export default {
  input: 'src/index.js',
  output: {
    format: 'esm',
    file: 'dist/pathicles-viewer.esm.js'
  },
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    commonjs({
      // https://github.com/rollup/@rollup/plugin-commonjs#usage-in-monorepo
      include: /node_modules/,
      namedExports: {
        // node_modules/prop-types/factoryWithTypeCheckers.js#L115
        'prop-types': [
          'array',
          'bool',
          'func',
          'number',
          'object',
          'string',
          'symbol',
          'any',
          'arrayOf',
          'element',
          'elementType',
          'instanceOf',
          'node',
          'objectOf',
          'oneOf',
          'oneOfType',
          'shape',
          'exact'
        ]
      }
    }),
    glslify(),
    cleanup(),
    // prettier({
    //   sourcemap: true,
    //   parser: 'babel'
    // }),
    bundleSize()
  ],
  external: ['debug', 'regl']
}
