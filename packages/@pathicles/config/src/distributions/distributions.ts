
export const round = (N: number) => (x: number) =>
  Math.round((x + Number.EPSILON) * N) / N

const ID = (x: number) => Math.sign(x) * Math.abs(x)

export const line =
  ({ swizzle = (x: number) => [x, 0, 0], round = ID }) =>
    ({ n = 0, d = 0 }) => {
      const dOffset = (d * (n - 1)) / 2
      return Array(n)
        .fill(0)
        .map((zero, i) => swizzle(round(i * d - dOffset)))
    }

export const square =
  ({ swizzle = (x: number, y: number) => [x, y, 0], round = ID }) =>
    ({ n = 0, d = 0 }) => {
      const nx = Math.ceil(Math.sqrt(n))
      const ny = Math.ceil(n / nx)

      const dOffsetX = (d * (nx - 1)) / 2
      const dOffsetY = (d * (ny - 1)) / 2

      return Array(n)
        .fill(0)
        .map((zero, i) => {
          const ix = i % nx
          const iy = Math.floor(i / nx)
          return swizzle(round(ix * d - dOffsetX), round(iy * d - dOffsetY))
        })
    }

const golden_angle = Math.PI * (3 - Math.sqrt(5))

export const spiralDistribution =
  ({ swizzle = (x: number, y: number) => [x, y, 0], round = ID }) =>
    ({ n = 0, d = golden_angle }) => {
      return Array(n)
        .fill(0)
        .map((zero, i) => {
          const theta = i * golden_angle
          const r = (Math.sqrt(i) / Math.sqrt(n)) * d * 3
          return swizzle(round(r * Math.cos(theta)), round(r * Math.sin(theta)))
        })
    }

export const DISTRIBUTIONS = new Map<string, unknown>()

DISTRIBUTIONS.set(
  'SQUARE_XY',
  square({
    swizzle: (a, b) => [a, b, 0]
  })
)
DISTRIBUTIONS.set(
  'SQUARE_XZ',
  square({
    swizzle: (a, b) => [a, 0, b]
  })
)
DISTRIBUTIONS.set(
  'SQUARE_YZ',
  square({
    swizzle: (a, b) => [0, a, b]
  })
)
DISTRIBUTIONS.set(
  'ROW_X',
  line({
    swizzle: (x) => [x, 0, 0]
  })
)
DISTRIBUTIONS.set(
  'ROW_Y',
  line({
    swizzle: (y) => [0, y, 0]
  })
)
DISTRIBUTIONS.set(
  'ROW_Z',
  line({
    swizzle: (z) => [0, 0, z]
  })
)
DISTRIBUTIONS.set(
  'COLUMN',
  line({
    swizzle: (y) => [0, y, 0]
  })
)
DISTRIBUTIONS.set(
  'SPIRAL_XY',
  square({
    swizzle: (a, b) => [a, b, 0]
  })
)
DISTRIBUTIONS.set(
  'SPIRAL_XY',
  spiralDistribution({
    swizzle: (x, y) => [x, y, 0]
  })
)
DISTRIBUTIONS.set(
  'SPIRAL_YZ',
  spiralDistribution({
    swizzle: (y, z) => [0, y, z]
  })
)

export function distribution({ shape, count, separation }: any) {
  const distributorFn = DISTRIBUTIONS.get(shape)
  return distributorFn
    ? distributorFn({ n: count, d: separation })
    : (function () {
      throw new Error('unknown distribution type: ' + shape)
    })()
}
