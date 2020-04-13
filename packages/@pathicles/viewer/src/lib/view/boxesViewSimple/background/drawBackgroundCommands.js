import createCube from 'primitive-cube'
import identity from 'gl-mat4/identity'

import frag from './background.frag'
import vert from './background.vert'

export default function(regl, { stageGrid }) {
  const stage = createCube(stageGrid.size )

  let model = identity([])

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
