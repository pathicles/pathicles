export const variable2NestedArray = (
  arr,
  { particleCount, bufferLength, channelsPerValueCount }
) => {
  const result = []

  for (let b = 0; b < bufferLength; b++) {
    const step = []
    result.push(step)

    for (let p = 0; p < particleCount; p++) {
      // debugger
      const particle = []
      step.push(particle)

      for (let c = 0; c < channelsPerValueCount; c++) {
        particle.push([
          arr[
            b * channelsPerValueCount * particleCount * 4 +
              p * 4 +
              c * channelsPerValueCount * particleCount
          ],
          arr[
            b * channelsPerValueCount * particleCount * 4 +
              p * 4 +
              1 +
              c * channelsPerValueCount * particleCount
          ],
          arr[
            b * channelsPerValueCount * particleCount * 4 +
              p * 4 +
              2 +
              c * channelsPerValueCount * particleCount
          ],
          arr[
            b * channelsPerValueCount * particleCount * 4 +
              p * 4 +
              3 +
              c * channelsPerValueCount * particleCount
          ]
        ])
      }
    }
  }
  return result
}
