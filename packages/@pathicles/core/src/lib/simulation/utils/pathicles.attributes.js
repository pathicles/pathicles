export const stepAttributes = ({
  particleCount,
  bufferLength,
  channelsPerValueCount
}) => {
  return Array(particleCount * bufferLength * channelsPerValueCount)
    .fill(0)
    .map((_, i) => Math.floor(i / particleCount))
}
export const particleAttributes = ({
  particleCount,
  bufferLength,
  channelsPerValueCount
}) => {
  return Array(particleCount * bufferLength * channelsPerValueCount)
    .fill(0)
    .map((_, i) => i % particleCount)
}
export const aFourIndexAttributes = ({
  particleCount,
  bufferLength,
  channelsPerValueCount
}) => {
  return Array(particleCount * bufferLength * channelsPerValueCount)
    .fill(0)
    .map((_, i) => i % channelsPerValueCount)
}
