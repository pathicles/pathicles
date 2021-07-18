function offsetCells(cells, offset) {
  return cells.map(function (cell) {
    return cell.map(function (index) {
      return index + offset
    })
  })
}

export function mergeMeshes(meshes) {
  let positions = []
  let uvs = []
  let normals = []
  let cells = []
  let offset = 0

  meshes.forEach(function (mesh) {
    uvs = uvs.concat(mesh.uvs)
    normals = normals.concat(mesh.normals)
    positions = positions.concat(mesh.positions)
    cells = cells.concat(offsetCells(mesh.cells, offset))
    offset += mesh.positions.length
  })

  return {
    cells,
    positions,
    normals,
    uvs
  }
}
