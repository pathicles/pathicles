import { Decimal } from 'decimal.js'

export function rowDistribution({ n = 0, d = 0 }) {
  const d_d = new Decimal(d)
  const d_offset = new Decimal((n - 1) / 2).times(d_d)

  return [...Array(n)].fill(0).map((zero, i) => {
    const d_i = new Decimal(i)
    const d_x = d_i.times(d_d).minus(d_offset)

    return [d_x, new Decimal(0), new Decimal(0)]
  })
}

export function columnDistribution({ n = 0, d = 0 }) {
  const tmpRowDistribution = rowDistribution({ n, d })
  return tmpRowDistribution.map(([x, y, z]) => [y, x, z])
}

export function squareDistribution({ n = 0, d = 0 }) {
  const d_d = new Decimal(d)

  const nx = Math.ceil(Math.sqrt(n))
  const ny = Math.ceil(n / nx)

  const d_offset_x = new Decimal((nx - 1) / 2).times(d_d)
  const d_offset_y = new Decimal((ny - 1) / 2).times(d_d)

  return [...Array(n)].fill(0).map((zero, i) => {
    const ix = i % nx
    const iy = Math.floor(i / nx)

    const d_ix = new Decimal(i % nx)
    const d_iy = new Decimal(Math.floor(i / nx))

    const x = d_ix.times(d_d).minus(d_offset_x)
    const y = d_iy.times(d_d).minus(d_offset_y)

    return [x, y, new Decimal(0)]
  })
}

export function squareHorizontalDistribution({ n = 0, d = 0 }) {
  const distribution = squareDistribution({ n, d })
  return distribution.map(([x, y, z]) => [x, z, y])
}
