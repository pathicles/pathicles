import frag from './stage.frag'
import vert from './stage.vert'
import { createPlane } from './plane'

export default function (regl, view, shadow) {
  const stage = createPlane(view.stageGrid.size, view.stageGrid.size)

  const command = (mode) => {
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
      depth: true,
      primitive: 'triangles',
      elements: stage.cells,
      attributes: {
        position: stage.positions,
        uv: stage.uvs
      },
      uniforms: {
        ...shadow.uniforms,
        stageSize: view.stageGrid.size,
        uOffset: [0, view.stageGrid.y, 0],
        ...(mode === 'lighting' && { shadowMap: shadow.fbo })
      },
      vert: [`#define ${mode} 1`, vert].join('\n'),
      frag: [`#define ${mode} 1`, frag].join('\n')
    })
  }

  return {
    lighting: command('lighting')
  }
}
