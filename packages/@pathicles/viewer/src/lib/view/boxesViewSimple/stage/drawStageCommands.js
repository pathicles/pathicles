import * as createPlane from './plane'

import frag from './stage.frag'
import vert from './stage.vert'

export default function(regl, view, shadow) {
  const stage = createPlane.createPlane(
    view.stageGrid.size,
    view.stageGrid.size
  )

  // eslint-disable-next-line no-unused-vars
  const command = mode => {
    return regl({
      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 1,
          dstRGB: 'one minus src alpha',
          dstAlpha: 1
        },
        equation: {
          rgb: 'add',
          alpha: 'add'
        },
        color: [0, 1, 0, 1]
      },
      cull: {
        enable: true,
        face: 'front'
      },
      depth: false,
      primitive: 'triangles',
      elements: stage.cells,
      attributes: {
        position: stage.positions,
        uv: stage.uvs
      },
      uniforms: {
        uOffset: [0, view.stageGrid.y - 0, 0],
        uResolution: [view.stageGrid.size, view.stageGrid.size],
        shadow: shadow.fbo,
        lightPosition: view.lightPosition,
        shadowProjectionMatrix: shadow.shadowProjectionMatrix,
        shadowViewMatrix: shadow.shadowViewMatrix
      },
      vert,
      frag
    })
  }

  return {
    lighting: command('lighting')
  }
}
