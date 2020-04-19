import createCube from 'primitive-cube'

import vert from './model.vert'
import frag from './model.frag'
import fromTranslation from 'gl-mat4/fromTranslation'
import { identity, perspective, lookAt } from 'gl-mat4'

import shadowBuilder from './shadow'

export default function(regl, { variables, model, view }, cubeShadowFbo) {
  const createGeometry = ({ pathicleWidth, pathicleRelativeHeight }) =>
    createCube(pathicleWidth, pathicleWidth * pathicleRelativeHeight, 1)

  const shadow = shadowBuilder(view.lightPosition)

  const geometry = createGeometry({
    pathicleWidth: view.pathicleWidth,
    pathicleRelativeHeight: view.pathicleRelativeHeight
  })

  Math.clip = function(number, min, max) {
    return Math.max(min, Math.min(number, max))
  }

  let modelMatrix = identity([])

  const command = mode => {
    const framebuffer = {
      framebuffer: function(context, props, batchId) {
        return cubeShadowFbo.faces[batchId]
      }
    }

    return regl({
      depth: true,
      // blend: {
      //   enable: true,
      //   func: {
      //     srcRGB: 'src alpha',
      //     srcAlpha: 1,
      //     dstRGB: 'one minus src alpha',
      //     dstAlpha: 1
      //   },
      //   equation: {
      //     rgb: 'add',
      //     alpha: 'add'
      //   },
      //   color: [1, 1, 1, 1]
      // },
      // cull: {
      //   enable: true,
      //   face: 'back'
      // },
      primitive: 'triangles',
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

                const r = (y ** 2 + x ** 2) / n ** 2

                return 1 //Math.clip(1.25 * Math.pow(Math.cos(2 * r), 4, 0, 1))
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

      vert: [`#define ${mode} 1`, vert].join('\n'),
      frag: [`#define ${mode} 1`, frag].join('\n'),

      ...(mode === 'shadowCube' && framebuffer),
      uniforms: {
        ...(mode === 'shadowCube' && {
          shadowViewMatrix: function(context, props, batchId) {
            switch (batchId) {
              case 0: // +x
                return shadow.shadowViewMatrix_x
              case 1: // -x
                return shadow.shadowViewMatrix_x_
              case 2: // +y
                return shadow.shadowViewMatrix_y
              case 3: // -y
                return shadow.shadowViewMatrix_y_
              case 4: // +z
                return shadow.shadowViewMatrix_z
              case 5: // -z
                return shadow.shadowViewMatrix_z_
              default:
                break
            }
          }
        }),
        ...(mode === 'lighting' && { shadowCube: cubeShadowFbo }),
        uLight: [1, 1, 0, 1],
        ambientIntensity: view.ambientIntensity,
        utParticleColorAndType: () => variables.particleColorsAndTypes,
        utPositionBuffer: () => variables.position[0],
        viewRange: (ctx, props) => {
          return props.viewRange || [0, 1]
        },
        lightPosition: view.lightPosition,
        shadowProjectionMatrix: shadow.shadowProjectionMatrix,
        shadowViewMatrix_top: shadow.shadowViewMatrix_y_,
        stageGrid_y: view.stageGrid.y,
        shadowColor: view.shadowColor,
        stageGrid_size: view.stageGrid.size,
        model: (ctx, props) => {
          return fromTranslation(modelMatrix, [
            props.modelTranslateX || 0,
            props.modelTranslateY || 0,
            0
          ])
        }
      }
    })
  }

  return {
    lighting: command('lighting'),
    shadow: command('shadow'),
    shadowCube: command('shadowCube')
  }
}
