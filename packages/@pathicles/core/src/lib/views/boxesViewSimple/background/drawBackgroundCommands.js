import frag from './stage.frag'
import vert from './stage.vert'
import createCube from 'primitive-cube'

export default function (regl, view) {
  const stage = createCube(view.stageGrid.size)

  // eslint-disable-next-line no-unused-vars
  const command = () => {
    return regl({
      blend: {
        enable: false,
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
        lightPosition: view.lightPosition
      },
      vert,
      frag
    })
  }

  return {
    lighting: command('lighting')
  }
}
