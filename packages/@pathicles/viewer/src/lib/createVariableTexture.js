export default function (regl, particleCount, bufferLength) {
  return regl.texture({
    width: particleCount,
    height: bufferLength,
    min: 'nearest',
    mag: 'nearest',
    format: 'rgba',
    type: 'float32',
    data: new Float32Array(particleCount * bufferLength * 4)
  })
}
