export default function(regl, particleCount, bufferLength, data) {
  return Array(2)
    .fill()
    .map(() =>
      regl.texture({
        width: particleCount,
        height: bufferLength,
        min: 'nearest',
        mag: 'nearest',
        format: 'rgba',
        type: 'float32',
        data: new Float32Array(data)
      })
    )
}
