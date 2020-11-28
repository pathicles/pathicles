const FOUR_VECTOR_COMPONENT_COUNT = 4

export const stepAttributes = ({ particleCount, bufferLength }) => {
  return Array(particleCount * bufferLength * FOUR_VECTOR_COMPONENT_COUNT)
    .fill(0)
    .map((_, i) => Math.floor(i / particleCount))
}
export const particleAttributes = ({ particleCount, bufferLength }) => {
  return Array(particleCount * bufferLength * FOUR_VECTOR_COMPONENT_COUNT)
    .fill(0)
    .map((_, i) => i % particleCount)
}
export const aFourIndexAttributes = ({ particleCount, bufferLength }) => {
  return Array(particleCount * bufferLength * FOUR_VECTOR_COMPONENT_COUNT)
    .fill(0)
    .map((_, i) => i % FOUR_VECTOR_COMPONENT_COUNT)
}
