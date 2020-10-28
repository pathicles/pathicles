import frag from './stage.frag'
import vert from './stage.vert'
import { createPlane } from './plane'

export default function (regl, view, shadow) {
  const stage = createPlane(view.stageGrid.size, view.stageGrid.size)
  // eslint-disable-next-line no-unused-vars
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

        ...(mode === 'shadow' && {
          projection: shadow.shadowProjectionMatrix,
          view: shadow.shadowViewMatrix
        }),

        uOffset: [0, view.stageGrid.y, 0],
        // uResolution: [view.stageGrid.size, view.stageGrid.size],
        ...(mode === 'lighting' && { shadowMap: shadow.fboBlurred })
      },
      vert: [
        `#define ${mode} 1`,
        `#define texelSize 1.0 / float(${shadow.shadowMapSize})`,
        vert
      ].join('\n'),
      frag: [
        `#define ${mode} 1`,
        `#define texelSize 1.0 / float(${shadow.shadowMapSize})`,
        frag
      ].join('\n'),
      ...(mode === 'shadow' && {
        framebuffer: shadow.fbo
      })
    })
  }

  return {
    lighting: command('lighting'),
    shadow: command('shadow')
  }
}
