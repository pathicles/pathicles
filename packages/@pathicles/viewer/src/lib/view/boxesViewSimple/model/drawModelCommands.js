import createCube from 'primitive-cube'

import vert from './model.vert'
import frag from './model.frag'
import fromTranslation from 'gl-mat4/fromTranslation'
import { identity } from 'gl-mat4'

function clip(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export default function (regl, { variables, model, view }, shadow) {
  const geometry = createCube()

  // const debleeder = [0.1, .99]
  // geometry.uvs = geometry.uvs.map(([u, v]) => [debleeder[u], debleeder[v]])

  Math.clip = function (number, min, max) {
    return Math.max(min, Math.min(number, max))
  }

  let modelMatrix = identity([])

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
        aColorCorrection: {
          buffer: regl.buffer(
            Array(model.particleCount * model.bufferLength)
              .fill(0)
              .map((_, i) => {
                const n = Math.sqrt(model.particleCount)
                const p = i % model.particleCount
                const x = Math.floor(p / n) - n / 2
                const y = (p % Math.sqrt(model.particleCount)) - n / 2

                // eslint-disable-next-line no-unused-vars
                const r = (y ** 2 + x ** 2) / n ** 2

                return clip(1.25 * Math.pow(Math.cos(2 * r), 2), 0.25, 0.5)
              })
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

        ...(mode === 'shadow' && {
          projection: shadow.shadowProjectionMatrix,
          view: shadow.shadowViewMatrix
        }),

        ...(mode === 'lighting' && { shadowMap: shadow.fbo }),
        // ambientLightAmount: 0.2,
        // diffuseLightAmount: 0.8,

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
