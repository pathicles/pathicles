export function rowDistribution({ n = 0, d = 0 }) {
  const dOffset = (d * (n - 1)) / 2

  return [...Array(n)].fill(0).map((zero, i) => [i * d - dOffset, 0, 0])
}

export function columnDistribution({ n = 0, d = 0 }) {
  const dOffset = (d * (n - 1)) / 2
  return [...Array(n)].fill(0).map((zero, i) => [0, i * d - dOffset, 0])
}

export function squareDistribution({
  n = 0,
  d = 0,
  mixer = (x, y) => [x, y, 0]
}) {
  const nx = Math.ceil(Math.sqrt(n))
  const ny = Math.ceil(n / nx)

  const dOffsetX = (d * (nx - 1)) / 2
  const dOffsetY = (d * (ny - 1)) / 2

  return [...Array(n)].fill(0).map((zero, i) => {
    const ix = i % nx
    const iy = Math.floor(i / nx)
    return mixer(ix * d - dOffsetX, iy * d - dOffsetY)
  })
}

// export function squareDistributionXZ({ n = 0, d = 0 }) {
//   const nx = Math.ceil(Math.sqrt(n))
//   const ny = Math.ceil(n / nx)
//
//   const dOffsetX = (d * (nx - 1)) / 2
//   const dOffsetY = (d * (ny - 1)) / 2
//
//   return Array(n)
//     .fill(0)
//     .map((zero, i) => {
//       const ix = i % nx
//       const iy = Math.floor(i / nx)
//       return [ix * d - dOffsetX, 0, iy * d - dOffsetY]
//     })
//     .reduce((acc, val) => acc.concat(val), [])
// }
//
// export function squareDistributionYZ({ n = 0, d = 0 }) {
//   const nx = Math.ceil(Math.sqrt(n))
//   const ny = Math.ceil(n / nx)
//
//   const dOffsetX = (d * (nx - 1)) / 2
//   const dOffsetY = (d * (ny - 1)) / 2
//
//   return Array(n)
//     .fill(0)
//     .map((zero, i) => {
//       const ix = i % nx
//       const iy = Math.floor(i / nx)
//       return [0, iy * d - dOffsetY, ix * d - dOffsetX]
//     })
//     .reduce((acc, val) => acc.concat(val), [])
// }

const golden_angle = Math.PI * (3 - Math.sqrt(5))

export function spiralDistribution({
  n = 0,
  d = golden_angle,
  mixer = (r, theta) => [0, r * Math.cos(theta), r * Math.sin(theta)]
}) {
  return Array(n)
    .fill(0)
    .map((zero, i) => {
      const theta = i * golden_angle
      const r = (Math.sqrt(i) / Math.sqrt(n)) * d * 3
      return mixer(r, theta)
    })
}

export function cubeDistribution({ n = 0, d = 0 }) {
  return Array(n)
    .fill(0)
    .map((zero, i) => {
      const theta = i / 15
      const r = d
      return [r * Math.sin(theta), r * Math.cos(theta), r * Math.sin(theta)]
    })
}

export function distribution({ shape, count, separation }) {
  return shape === 'SQUARE_XY'
    ? squareDistribution({
        n: count,
        d: separation,
        mixer: (a, b) => [a, b, 0]
      })
    : shape === 'SQUARE_XZ'
    ? squareDistribution({
        n: count,
        d: separation,
        mixer: (a, b) => [a, 0, b]
      })
    : shape === 'SQUARE_YZ'
    ? squareDistribution({
        n: count,
        d: separation,
        mixer: (a, b) => [0, a, b]
      })
    : shape === 'ROW'
    ? rowDistribution({
        n: count,
        d: separation
      })
    : shape === 'COLUMN'
    ? columnDistribution({
        n: count,
        d: separation
      })
    : shape === 'SPIRAL_XY'
    ? spiralDistribution({
        n: count,
        d: separation,
        mixer: (r, theta) => [r * Math.cos(theta), r * Math.sin(theta), 0]
      })
    : shape === 'SPIRAL_YZ'
    ? spiralDistribution({
        n: count,
        d: separation
      })
    : shape === 'CUBE'
    ? cubeDistribution({
        n: count,
        d: separation
      })
    : shape === 'COLUMN'
    ? columnDistribution({
        n: count,
        d: separation
      })
    : (function () {
        throw new Error('unknown distribution type: ', shape)
      })()
}
