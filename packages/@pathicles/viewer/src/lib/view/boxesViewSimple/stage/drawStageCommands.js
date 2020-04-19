import * as createPlane from './plane'

import frag from './stage.frag'
import vert from './stage.vert'

import shadowBuilder from './../model/shadow'

export default function(regl, view, cubeShadowFbo) {
  const stage = createPlane.createPlane(
    view.stageGrid.size,
    view.stageGrid.size
  )

  const shadow = shadowBuilder(view.lightPosition)

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
        shadowCube: cubeShadowFbo,
        lightPosition: view.lightPosition,
        shadowProjectionMatrix: shadow.shadowProjectionMatrix,
        shadowViewMatrix_top: shadow.shadowViewMatrix_y_
      },
      vert,
      frag
    })
  }

  return {
    lighting: command('lighting')
  }
}
