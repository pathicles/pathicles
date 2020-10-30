import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import glslify from 'rollup-plugin-glslify'
import bundleSize from 'rollup-plugin-bundle-size'
import cleanup from 'rollup-plugin-cleanup'
// import visualizer from 'rollup-plugin-visualizer'

export default {
  input: 'src/index.js',
  output: {
    format: 'esm',
    file: 'dist/pathicles-viewer.esm.js'
  },
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    commonjs({
      include: /node_modules/
    }),
    glslify({ compress: false }),
    cleanup(),
    bundleSize()
    // visualizer({ brotliSize: true, gzipSize: true })
  ],
  external: ['debug', 'regl']
}
