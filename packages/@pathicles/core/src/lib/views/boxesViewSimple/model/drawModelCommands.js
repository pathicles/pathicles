import createCube from 'primitive-cube'

import vert from './model.vert'
import frag from './model.frag'
import fromTranslation from 'gl-mat4/fromTranslation'
import { identity } from 'gl-mat4'
export const stepAttributes = ({ particleCount, snapshots }) => {
  return Array(particleCount * snapshots)
    .fill(0)
    .map((_, i) => Math.floor(i / particleCount))
}
export const particleAttributes = ({ particleCount, snapshots }) => {
  return Array(particleCount * snapshots)
    .fill(0)
    .map((_, i) => i % particleCount)
}
export default function (regl, { variables, view }, shadow) {
  const geometry = createCube()

  let modelMatrix = identity([])

  const command = (mode) => {
    return regl({
      depth: {
        enable: true
      },
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
        face: 'back'
      },
      elements: geometry.cells,
      instances: () => {
        return (
          variables.particleCount *
          Math.min(variables.iteration, variables.snapshots)
        )
      },
      attributes: {
        aPosition: geometry.positions,
        aNormal: geometry.normals,
        aUV: geometry.uvs,
        aParticle: {
          buffer: regl.buffer(particleAttributes(variables)),
          divisor: 1
        },
        aStep: {
          buffer: regl.buffer(stepAttributes(variables)),
          divisor: 1
        }
      },

      vert: [
        `#define ${mode} 1`,
        // `#define texelSize 1.0 / float(${shadow.shadowMapSize})`,
        vert
      ].join('\n'),
      frag: [
        `#define ${mode} 1`,
        // `#define texelSize 1.0 / float(${shadow.shadowMapSize})`,
        frag
      ].join('\n'),

      uniforms: {
        ...shadow.uniforms,
        stageSize: view.stageGrid.size,

        ...(mode === 'shadow' && {
          projection: shadow.shadowProjectionMatrix,
          view: shadow.shadowViewMatrix
        }),

        ...(mode === 'lighting' && { shadowMap: shadow.fbo }),
        utColorCorrections: (ctx, props) => {
          return props.colorCorrections
        },

        utParticleColorAndType: (ctx, props) => {
          return props.particleColorsAndTypes
        },
        utPositionBuffer: (ctx, props) => {
          return props.position
        },
        viewRange: (ctx, props) => {
          return props.viewRange || [0, 1]
        },
        snapshots: variables.snapshots,
        particleCount: variables.particleCount,
        iterations: variables.iterations,
        iteration: () => variables.iteration,

        pathicleGap: view.pathicleRelativeGap * view.pathicleWidth,
        pathicleHeight: view.pathicleWidth * view.pathicleRelativeHeight,
        pathicleWidth: view.pathicleWidth,
        model: (ctx, props) => {
          modelMatrix = identity([])
          return fromTranslation(modelMatrix, [
            props.modelTranslateX || 0,
            props.modelTranslateY || 0,
            0
          ])
        }
      },
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
