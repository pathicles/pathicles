let seed = 1
export const random = () => {
  let x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}
export const boundedRandom = (min = -1, max = 1) => random() * (max - min) + min
