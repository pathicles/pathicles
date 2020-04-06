import * as createPlane from './plane'

import frag from './stage.frag'
import vert from './stage.vert'

export default function(regl, { stageGrid }) {
  const stage = createPlane.createPlane(stageGrid.size, stageGrid.size)

  const command = () => {
    return regl({
      cull: {
        enable: true,
        face: 'front'
      },
      primitive: 'triangles',
      elements: stage.cells,
      attributes: {
        position: stage.positions,
        uv: stage.uvs
      },
      uniforms: {
        uOffset: [0, stageGrid.y - 0, 0],
        uResolution: [stageGrid.size, stageGrid.size]
      },
      vert,
      frag
    })
  }

  return {
    lighting: command('')
  }
}
