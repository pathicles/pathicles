export function colorCorrection(particleCount, fourPositions, emitterPosition) {
  const initialParticleDistances = Array(particleCount)
    .fill(0)
    .map((_, i) => {
      return Math.sqrt(
        Math.pow(fourPositions[i * 4] - emitterPosition[0], 2) +
          Math.pow(fourPositions[i * 4 + 1] - emitterPosition[1], 2) +
          Math.pow(fourPositions[i * 4 + 2] - emitterPosition[2], 2)
      )
    })

  const maxParticleDistance = Math.max(...initialParticleDistances)
  return initialParticleDistances.map((d) => d / maxParticleDistance - 1)
}
