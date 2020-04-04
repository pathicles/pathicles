export default function(regl, buffer) {
  return regl({
    vert: require('raw-loader!./fxaa.vert.glsl'),
    frag: require('raw-loader!glslify-loader!./fxaa.frag.glsl'),
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
