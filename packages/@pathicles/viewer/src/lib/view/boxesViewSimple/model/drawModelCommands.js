import createCube from 'primitive-cube'

import vert from './model.vert'
import frag from './model.frag'
import fromTranslation from 'gl-mat4/fromTranslation'
import { identity } from 'gl-mat4'

function clip(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export default function (regl, { variables, model, view }, shadow, cubeShadow) {
  const createGeometry = ({ pathicleWidth, pathicleRelativeHeight }) =>
    createCube(pathicleWidth, pathicleWidth * pathicleRelativeHeight, 1)

  // const geometry = createGeometry({
  //   pathicleWidth: view.pathicleWidth,
  //   pathicleRelativeHeight: view.pathicleRelativeHeight
  // })
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
      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 'src alpha',
          dstRGB: 'one minus src alpha',
          dstAlpha: 'one minus src alpha'
        },
        // equation: {
        //   rgb: 'add',
        //   alpha: 'add'
        // },
        color: [1, 1, 1, 1]
      },
      cull: {
        enable: false,
        face: 'front'
      },
      // primitive: 'triangles',
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

      vert: [`#define ${mode} 1`, vert].join('\n'),
      frag: [`#define ${mode} 1`, frag].join('\n'),

      ...(mode === 'cubeShadow' && {
        framebuffer: function (context, props, batchId) {
          return cubeShadow.fbo.faces[batchId]
        }
      }),
      ...(mode === 'shadowMap' && {
        framebuffer: shadow.fbo
      }),
      uniforms: {
        ...(mode === 'shadowMap' && {
          shadowViewMatrix: shadow.shadowViewMatrix,
          shadowProjectionMatrix: shadow.shadowProjectionMatrix
        }),
        ...(mode === 'cubeShadow' && {
          shadowViewMatrix: function (context, props, batchId) {
            switch (batchId) {
              case 0: // +x
                return cubeShadow.shadowViewMatrix_x
              case 1: // -x
                return cubeShadow.shadowViewMatrix_x_
              case 2: // +y
                return cubeShadow.shadowViewMatrix_y
              case 3: // -y
                return cubeShadow.shadowViewMatrix_y_
              case 4: // +z
                return cubeShadow.shadowViewMatrix_z
              case 5: // -z
                return cubeShadow.shadowViewMatrix_z_
              default:
                break
            }
          }
        }),
        ...(mode === 'lighting' && { cubeShadow: cubeShadow.fbo }),
        uResolution: [1, 1],
        uLight: [1, 1, 0, 1],
        ambientIntensity: view.ambientIntensity,
        utParticleColorAndType: () => variables.particleColorsAndTypes,
        utPositionBuffer: () => variables.position[0],
        viewRange: (ctx, props) => {
          return props.viewRange || [0, 1]
        },
        lightPosition: view.lightPosition,
        shadowMap: shadow.fbo,
        shadowProjectionMatrix: cubeShadow.shadowProjectionMatrix,
        shadowViewMatrix_top: cubeShadow.shadowViewMatrix_y_,
        stageGrid_y: view.stageGrid.y,
        shadowColor: view.shadowColor,
        stageGrid_size: view.stageGrid.size / 2,
        pathicleHeight: view.pathicleWidth * view.pathicleRelativeHeight,
        pathicleWidth: view.pathicleWidth,
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
    // wireframe: command('wireframe'),
    shadow: command('shadow'),
    shadowMap: command('shadowMap'),
    cubeShadow: command('cubeShadow')
  }
}
