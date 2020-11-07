export function colorCorrection(fourPositions, emitterPosition) {
  if (fourPositions) {
    const initialParticleDistances = Array(fourPositions.length / 4)
      .fill(0)
      .map((_, i) => {
        return Math.sqrt(
          Math.pow(fourPositions[i * 4] - emitterPosition[0], 2) +
            Math.pow(fourPositions[i * 4 + 1] - emitterPosition[1], 2) +
            Math.pow(fourPositions[i * 4 + 2] - emitterPosition[2], 2)
        )
      })
    const maxParticleDistance = Math.max(...initialParticleDistances)
    return initialParticleDistances.map((d, i) =>
      maxParticleDistance ? Math.pow(d / maxParticleDistance, 2) - 1 / 2 : 0
    )
  }
}
