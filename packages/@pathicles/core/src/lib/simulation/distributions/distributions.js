export function rowDistribution({ n = 0, d = 0 }) {
  const dOffset = (d * (n - 1)) / 2

  return [...Array(n)]
    .fill(0)
    .map((zero, i) => [i * d - dOffset, 0, 0])
    .reduce((acc, val) => acc.concat(val), [])
}

export function columnDistribution({ n = 0, d = 0 }) {
  const dOffset = (d * (n - 1)) / 2
  return [...Array(n)]
    .fill(0)
    .map((zero, i) => [0, i * d - dOffset, 0])
    .reduce((acc, val) => acc.concat(val), [])
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

  return [...Array(n)]
    .fill(0)
    .map((zero, i) => {
      const ix = i % nx
      const iy = Math.floor(i / nx)
      return mixer(ix * d - dOffsetX, iy * d - dOffsetY)
    })
    .reduce((acc, val) => acc.concat(val), [])
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
    .reduce((acc, val) => acc.concat(val), [])
}

export function cubeDistribution({ n = 0, d = 0 }) {
  return Array(n)
    .fill(0)
    .map((zero, i) => {
      const theta = i / 15
      const r = d
      return [r * Math.sin(theta), r * Math.cos(theta), r * Math.sin(theta)]
    })
    .reduce((acc, val) => acc.concat(val), [])
}

export const DISTRIBUTIONS = {
  SQUARE_XY: ({ count, separation }) =>
    squareDistribution({
      n: count,
      d: separation,
      mixer: (a, b) => [a, b, 0]
    }),
  SQUARE_XZ: ({ count, separation }) =>
    squareDistribution({
      n: count,
      d: separation,
      mixer: (a, b) => [a, 0, b]
    }),
  SQUARE_YZ: ({ count, separation }) =>
    squareDistribution({
      n: count,
      d: separation,
      mixer: (a, b) => [0, a, b]
    }),
  ROW: ({ count, separation }) =>
    rowDistribution({
      n: count,
      d: separation
    }),
  COLUMN: ({ count, separation }) =>
    columnDistribution({
      n: count,
      d: separation
    }),
  SPIRAL_XY: ({ count, separation }) =>
    spiralDistribution({
      n: count,
      d: separation,
      mixer: (r, theta) => [r * Math.cos(theta), r * Math.sin(theta), 0]
    }),
  SPIRAL_YZ: ({ count, separation }) =>
    spiralDistribution({
      n: count,
      d: separation
    })
}

export function distribution({ shape, count, separation }) {
  if (!DISTRIBUTIONS[shape]) {
    throw new Error('unknown distribution type: ' + shape)
  }

  return DISTRIBUTIONS[shape]({ count, separation })
  //
  // return shape === 'SQUARE_XY'
  //   ? squareDistribution({
  //       n: count,
  //       d: separation,
  //       mixer: (a, b) => [a, b, 0]
  //     })
  //   : shape === 'SQUARE_XZ'
  //   ? squareDistribution({
  //       n: count,
  //       d: separation,
  //       mixer: (a, b) => [a, 0, b]
  //     })
  //   : shape === 'SQUARE_YZ'
  //   ? squareDistribution({
  //       n: count,
  //       d: separation,
  //       mixer: (a, b) => [0, a, b]
  //     })
  //   : shape === 'ROW'
  //   ? rowDistribution({
  //       n: count,
  //       d: separation
  //     })
  //   : shape === 'COLUMN'
  //   ? columnDistribution({
  //       n: count,
  //       d: separation
  //     })
  //   : shape === 'SPIRAL_XY'
  //   ? spiralDistribution({
  //       n: count,
  //       d: separation,
  //       mixer: (r, theta) => [r * Math.cos(theta), r * Math.sin(theta), 0]
  //     })
  //   : shape === 'SPIRAL_YZ'
  //   ? spiralDistribution({
  //       n: count,
  //       d: separation
  //     })
  //   : shape === 'CUBE'
  //   ? cubeDistribution({
  //       n: count,
  //       d: separation
  //     })
  //   : shape === 'COLUMN'
  //   ? columnDistribution({
  //       n: count,
  //       d: separation
  //     })
  //   : (function () {
  //       throw new Error('unknown distribution type: ', shape)
  //     })()
}
