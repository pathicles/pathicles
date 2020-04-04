export function createBuffers(regl, particleCount, bufferLength) {
  return [0, 1].map(() => {
    return regl.framebuffer({
      width: particleCount,
      height: bufferLength,
      format: 'rgba',
      colorType: 'float32',
      depthStencil: false,
      color: regl.texture({
        width: particleCount,
        height: bufferLength,
        min: 'nearest',
        mag: 'nearest',
        format: 'rgba',
        type: 'float32'
        // data: new Float32Array(data)
      })
    })
  })
}

export function loadBuffers(buffers, data) {
  ;[0, 1].forEach(b =>
    buffers[b].color[0].subimage({
      width: buffers[b].width,
      height: buffers[b].height,
      data
    })
  )
  return buffers
}
