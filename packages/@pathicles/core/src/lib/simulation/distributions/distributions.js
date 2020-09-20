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

export function squareDistributionXY({ n = 0, d = 0 }) {
  const nx = Math.ceil(Math.sqrt(n))
  const ny = Math.ceil(n / nx)

  const dOffsetX = (d * (nx - 1)) / 2
  const dOffsetY = (d * (ny - 1)) / 2

  return [...Array(n)]
    .fill(0)
    .map((zero, i) => {
      const ix = i % nx
      const iy = Math.floor(i / nx)
      return [ix * d - dOffsetX, iy * d - dOffsetY, 0]
    })
    .reduce((acc, val) => acc.concat(val), [])
}

export function squareDistributionXZ({ n = 0, d = 0 }) {
  const nx = Math.ceil(Math.sqrt(n))
  const ny = Math.ceil(n / nx)

  const dOffsetX = (d * (nx - 1)) / 2
  const dOffsetY = (d * (ny - 1)) / 2

  return Array(n)
    .fill(0)
    .map((zero, i) => {
      const ix = i % nx
      const iy = Math.floor(i / nx)
      return [ix * d - dOffsetX, 0, iy * d - dOffsetY]
    })
    .reduce((acc, val) => acc.concat(val), [])
}

export function squareDistributionYZ({ n = 0, d = 0 }) {
  const nx = Math.ceil(Math.sqrt(n))
  const ny = Math.ceil(n / nx)

  const dOffsetX = (d * (nx - 1)) / 2
  const dOffsetY = (d * (ny - 1)) / 2

  return Array(n)
    .fill(0)
    .map((zero, i) => {
      const ix = i % nx
      const iy = Math.floor(i / nx)
      return [0, iy * d - dOffsetY, ix * d - dOffsetX]
    })
    .reduce((acc, val) => acc.concat(val), [])
}

export function discDistributionXY({ n = 0, d = 0 }) {
  const nx = Math.ceil(Math.sqrt(n))
  const ny = Math.ceil(n / nx)

  const dOffsetX = (d * (nx - 1)) / 2
  const dOffsetY = (d * (ny - 1)) / 2

  return Array(n)
    .fill(0)
    .map((zero, i) => {
      const ix = i % nx
      const iy = Math.floor(i / nx)

      if (
        (ix * d - dOffsetX) ** 2 + (iy * d - dOffsetY) ** 2 <
        ((nx * d) / 2) ** 2
      )
        return [ix * d - dOffsetX, iy * d - dOffsetY, 0]
      else return [ix * d - dOffsetX, iy * d - dOffsetY - 10000, 0]
    })
    .reduce((acc, val) => acc.concat(val), [])
}

export function discDistributionYZ({ n = 0, d = 0 }) {
  const nx = Math.ceil(Math.sqrt(n))
  const ny = Math.ceil(n / nx)

  const dOffsetX = (d * (nx - 1)) / 2
  const dOffsetY = (d * (ny - 1)) / 2

  return Array(n)
    .fill(0)
    .map((zero, i) => {
      const ix = i % nx
      const iy = Math.floor(i / nx)

      if (
        (ix * d - dOffsetX) ** 2 + (iy * d - dOffsetY) ** 2 <
        ((nx * d) / 2) ** 2
      )
        return [0, iy * d - dOffsetY, ix * d - dOffsetX]
      else return [0, iy * d - dOffsetY - 10000, ix * d - dOffsetX]
    })
    .reduce((acc, val) => acc.concat(val), [])
}
