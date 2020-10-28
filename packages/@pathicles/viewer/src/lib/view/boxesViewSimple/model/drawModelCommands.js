import createCube from 'primitive-cube'

import vert from './model.vert'
import frag from './model.frag'
import fromTranslation from 'gl-mat4/fromTranslation'
import { identity } from 'gl-mat4'

export default function (regl, { variables, model, view }, shadow) {
  const geometry = createCube()

  let modelMatrix = identity([])

  const initialParticleDistances = Array(model.particleCount)
    .fill(0)
    .map((_, i) => {
      return Math.sqrt(
        Math.pow(
          variables.initialData.fourPositions[i * 4] -
            variables.initialData.emitterPosition[0],
          2
        ) +
          Math.pow(
            variables.initialData.fourPositions[i * 4 + 1] -
              variables.initialData.emitterPosition[1],
            2
          ) +
          Math.pow(
            variables.initialData.fourPositions[i * 4 + 2] -
              variables.initialData.emitterPosition[2],
            2
          )
      )
    })

  const maxParticleDistance = Math.max(...initialParticleDistances)
  const colorCorrection = initialParticleDistances.map(
    (d) => d / maxParticleDistance
  )

  const command = (mode) => {
    return regl({
      depth: true,
      profile: true,
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
      instances: () =>
        model.particleCount *
        Math.min(variables.tick.value, model.bufferLength),
      attributes: {
        aPosition: geometry.positions,
        aNormal: geometry.normals,
        aUV: geometry.uvs,
        aParticle: {
          buffer: regl.buffer(
            Array(model.particleCount * model.bufferLength)
              .fill(0)
              .map((_, i) => i % model.particleCount)
          ),
          divisor: 1
        },
        aStep: {
          buffer: regl.buffer(
            Array(model.particleCount * model.bufferLength)
              .fill(0)
              .map((_, i) => Math.floor(i / model.particleCount))
          ),
          divisor: 1
        },
        aColorCorrection: {
          buffer: regl.buffer(Array(model.bufferLength).fill(colorCorrection)),
          divisor: 1
        }
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

      uniforms: {
        ...shadow.uniforms,
        stageSize: view.stageGrid.size,

        ...(mode === 'shadow' && {
          projection: shadow.shadowProjectionMatrix,
          view: shadow.shadowViewMatrix
        }),

        ...(mode === 'lighting' && { shadowMap: shadow.fbo }),

        utParticleColorAndType: () => variables.particleColorsAndTypes,
        utPositionBuffer: () => variables.position[0],
        viewRange: (ctx, props) => {
          return props.viewRange || [0, 1]
        },
        stageGrid_size: view.stageGrid.size / 2,
        pathicleHeight: view.pathicleWidth * view.pathicleRelativeHeight,
        pathicleWidth: view.pathicleWidth * 3,
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
