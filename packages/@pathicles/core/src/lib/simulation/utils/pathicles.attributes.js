export const stepAttributes = ({ particleCount, bufferLength }) => {
  return Array(particleCount * bufferLength * 4)
    .fill(0)
    .map((_, i) => Math.floor(i / particleCount))
}
export const particleAttributes = ({ particleCount, bufferLength }) => {
  return Array(particleCount * bufferLength * 4)
    .fill(0)
    .map((_, i) => i % particleCount)
}
export const aFourIndexAttributes = ({ particleCount, bufferLength }) => {
  return Array(particleCount * bufferLength * 4)
    .fill(0)
    .map((_, i) => i % 4)
}
