import frag from './stage.frag'
import vert from './stage.vert'
import { createPlane } from './plane'

export default function (regl, view, shadow) {
  const stage = createPlane(view.stageGrid.size - 1, view.stageGrid.size - 1)
  // eslint-disable-next-line no-unused-vars
  const command = () => {
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
        color: [0, 0, 0, 1]
      },
      cull: {
        enable: true,
        face: 'front'
      },
      depth: false,
      primitive: 'triangles',
      elements: stage.cells,
      attributes: {
        position: stage.positions
      },
      uniforms: {
        uOffset: [0, view.stageGrid.y, 0],
        uResolution: [view.stageGrid.size, view.stageGrid.size],
        shadowMap: shadow.fbo,
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
