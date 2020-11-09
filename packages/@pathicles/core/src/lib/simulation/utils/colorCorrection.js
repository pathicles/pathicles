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
    const relativeParticleDistances = initialParticleDistances.map((d) =>
      maxParticleDistance === 0 ? 0 : d / maxParticleDistance
    )
    return relativeParticleDistances.map((d) => {
      return d < 0.5 ? 1 - d * 2 : 1
    })
    //
    // return relativeParticleDistances.map((d) =>
    //   d > 0.3
    //       ? 1
    //       : Math.pow(d , 1)
    //     : 1
    // )
  }
}
