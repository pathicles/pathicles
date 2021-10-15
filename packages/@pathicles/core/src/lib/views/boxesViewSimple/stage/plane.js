export function createPlane(sx, sy, nx, ny, options) {
  sx = sx || 1
  sy = sy || 1
  nx = nx || 1
  ny = ny || 1
  const quads = options && options.quads ? options.quads : false

  const positions = []
  const uvs = []
  const normals = []
  const cells = []

  for (let iy = 0; iy <= ny; iy++) {
    for (let ix = 0; ix <= nx; ix++) {
      const u = ix / nx
      const v = iy / ny
      const x = -sx / 2 + u * sx // starts on the left
      const y = sy / 2 - v * sy // starts at the top
      positions.push([x, 0, y])
      uvs.push([u, 1.0 - v])
      normals.push([0, 0, 1])
      if (iy < ny && ix < nx) {
        if (quads) {
          cells.push([
            iy * (nx + 1) + ix,
            (iy + 1) * (nx + 1) + ix,
            (iy + 1) * (nx + 1) + ix + 1,
            iy * (nx + 1) + ix + 1
          ])
        } else {
          cells.push([
            iy * (nx + 1) + ix,
            (iy + 1) * (nx + 1) + ix + 1,
            iy * (nx + 1) + ix + 1
          ])
          cells.push([
            (iy + 1) * (nx + 1) + ix + 1,
            iy * (nx + 1) + ix,
            (iy + 1) * (nx + 1) + ix
          ])
        }
      }
    }
  }
  return {
    positions: positions,
    normals: normals,
    uvs: uvs,
    cells: cells
  }
}
