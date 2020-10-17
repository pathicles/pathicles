import frag from './stage.frag'
import vert from './stage.vert'
import { createPlane } from './plane'

export default function (regl, view, cubeShadow) {
  const stage = createPlane(view.stageGrid.size, view.stageGrid.size)
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
        enable: false,
        face: 'front'
      },
      depth: true,
      primitive: 'triangles',
      elements: stage.cells,
      attributes: {
        position: stage.positions
      },
      uniforms: {
        uOffset: [0, view.stageGrid.y, 0],
        uResolution: [view.stageGrid.size, view.stageGrid.size],
        // shadowMap: shadow.fbo,
        lightPosition: view.lightPosition
        // shadowProjectionMatrix: shadow.shadowProjectionMatrix,
        // shadowViewMatrix: shadow.shadowViewMatrix
      },
      vert,
      frag
    })
  }

  return {
    lighting: command('lighting')
  }
}
