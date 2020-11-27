export function colorCorrection(fourPositions, emitterPosition) {
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
  return relativeParticleDistances.map((d) => {
    return maxParticleDistance > 0 ? (d < 0.7 ? d : 1) : 1
  })
}
