export function colorCorrection(fourPositions, emitterPosition) {
  if (fourPositions) {
    const initialParticleDistances = fourPositions.map((x) => {
      return Math.sqrt(
        Math.pow(x[0] - emitterPosition[0], 2) +
          Math.pow(x[+1] - emitterPosition[1], 2) +
          Math.pow(x[+2] - emitterPosition[2], 2)
      )
    })
    const maxParticleDistance = Math.max(...initialParticleDistances)
    const relativeParticleDistances = initialParticleDistances.map((d) =>
      maxParticleDistance === 0 ? 0 : d / maxParticleDistance
    )
    return relativeParticleDistances.map((d) => {
      return maxParticleDistance > 0 ? (d < 0.5 ? d : 1) : 1
    })
  }
}
