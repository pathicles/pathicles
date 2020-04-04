export default function(regl, particleCount, bufferLength, data) {
  return Array(2)
    .fill()
    .map(() => {
      const buffer = regl.framebuffer({
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
      // debugger
      buffer.color[0].subimage({
        width: particleCount,
        height: bufferLength,
        data
      })
      return buffer
    })
}
