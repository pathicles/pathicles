import vert from './fxaa.vert.glsl'
import frag from './fxaa.frag.glsl'

export default function(regl, buffer) {
  return regl({
    vert,
    frag,
    attributes: {
      position: [
        [-4, -4],
        [0, 4],
        [4, -4]
      ]
    },
    uniforms: {
      resolution: [regl._gl.canvas.width, regl._gl.canvas.height],
      iChannel0: buffer,
      enabled: regl.prop('fxaaEnabled')
    },
    depth: { enable: false },
    count: 3
  })
}
