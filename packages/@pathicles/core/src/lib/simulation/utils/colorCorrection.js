export function colorCorrection(
  regl,
  colorType,
  fourPositions,
  emitterPosition
) {
  const particleCount = fourPositions.length
  const initialParticleDistances = fourPositions.map((fourPosition) => {
    return Math.sqrt(
      Math.pow(fourPosition[0] - emitterPosition[0], 2) +
        Math.pow(fourPosition[1] - emitterPosition[1], 2) +
        Math.pow(fourPosition[2] - emitterPosition[2], 2)
    )
  })
  const maxParticleDistance = Math.max(...initialParticleDistances)
  const relativeParticleDistances = initialParticleDistances.map((d) =>
    maxParticleDistance === 0 ? 0 : d / maxParticleDistance
  )
  const corrections = relativeParticleDistances.map((d) => {
    return maxParticleDistance > 0 ? (d < 0.7 ? d : 1) : 1
  })

  return regl.texture({
    data: corrections.map((c) => [c, 0, 0, 0]).flat(),
    shape: [particleCount, 1, 4],
    type: colorType
  })
}
