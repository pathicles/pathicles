export default function (regl) {
  return {
    depthNormalBuffer: regl.framebuffer({
      width: regl._gl.canvas.width,
      height: regl._gl.canvas.height,
      depth: true,
      colorFormat: 'rgba',
      colorType: 'float32'
    }),
    diffuseBuffer: regl.framebuffer({
      width: regl._gl.canvas.width,
      height: regl._gl.canvas.height,
      depth: true,
      colorFormat: 'rgba',
      colorType: 'float32'
    }),
    positionBuffer: regl.framebuffer({
      width: regl._gl.canvas.width,
      height: regl._gl.canvas.height,
      depth: true,
      colorFormat: 'rgba',
      colorType: 'float32'
    }),
    compositionBuffer: regl.framebuffer({
      width: regl._gl.canvas.width,
      height: regl._gl.canvas.height,
      depth: true,
      colorFormat: 'rgba',
      colorType: 'float32'
    })

    // shadowBufferCube: regl.framebufferCube({
    //   radius: CUBE_MAP_SIZE,
    //   colorFormat: 'rgba',
    //   colorType: 'float'
    // })
  }
}
