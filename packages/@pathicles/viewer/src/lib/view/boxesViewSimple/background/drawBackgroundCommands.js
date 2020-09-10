import createCube from 'primitive-cube'
import { fromTranslation } from 'gl-mat4'

import frag from './background.frag'
import vert from './background.vert'

export default function(regl, { stageGrid }) {
  // const stage = createCube(stageGrid.size, stageGrid.size * 10, stageGrid.size)
  const stage = createCube(1, 1, 1)

  // let model = fromTranslation([], [0, -stageGrid.size * 5, 0])
  let model = fromTranslation([], [0, 0, 0])

  return regl({
    primitive: 'triangles',
    elements: stage.cells,
    cull: {
      enable: true,
      face: 'front'
    },
    attributes: {
      aPosition: stage.positions,
      uv: stage.uvs
    },
    uniforms: {
      uResolution: [stageGrid.size, stageGrid.size],
      uSunPosition: context => [
        context.viewportHeight / 2,
        (context.viewportWidth / 4) * 3
      ],
      model
    },
    vert,
    frag
  })
}
