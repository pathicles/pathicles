import createCube from 'primitive-cube'
import { fromTranslation } from 'gl-mat4'

import frag from './box.frag'
import vert from './box.vert'

export default function(regl) {
  let scale = [1, 1, 1]

  const cube = createCube(...scale)

  const debleeder = [0.0, .999]
  cube.uvs = cube.uvs.map(([u, v]) => [debleeder[u], debleeder[v]])

  // let model = fromTranslation([], [0, -cubeGrid.size * 5, 0])
  let model = fromTranslation([], [0, 2, 0])

  return regl({
    primitive: 'triangles',
    elements: cube.cells,
    cull: {
      enable: false,
      face: 'front'
    },
    instances: 10,
    attributes: {
      aPosition: cube.positions,
      aNormal: cube.normals,
      uv: cube.uvs,
      aOffset: {
        buffer: regl.buffer(
          // [1,0,0,2,0,0,3,0,0]
          Array(10*3)
            .fill(0)
            .map((_, i) => (i%3) ? 0 : i*.1)
        ),
        divisor: 1
      },
      aScale: {
        buffer: regl.buffer(
          // [1,0,0,2,0,0,3,0,0]
          Array(10*3)
            .fill(0)
            .map((_, i) => (i%3) ? (30-i)*.5 + (i%2) : .2)
        ),
        divisor: 1
      },
    },
    uniforms: {
      boxScale: scale,
      model
    },
    vert,
    frag
  })
}
