import createCylinder from 'primitive-cylinder'
import { mergeMeshes } from './../lattice/mergeMeshes.js'

import vert from './fieldValue.vert'
import frag from './fieldValue.frag'
import fromTranslation from 'gl-mat4/fromTranslation'
import { identity } from 'gl-mat4'
import { latticeChunk } from '../../../simulation/lattice/lattice.gsls'

const X = 51
const Y = 3
const Z = 51
const STEP_SIZE = 0.1

export const positionAttributes = () => {
  const out = []
  for (let x = 0; x < X; x++)
    for (let y = 0; y < Y; y++)
      for (let z = 0; z < Z; z++) {
        out.push([
          (x - (X - 1) / 2) * STEP_SIZE,
          (y - (Y - 1) / 2) * STEP_SIZE + 1,
          (z - (Z - 1) / 2) * STEP_SIZE
        ])
      }
  return out
}

export default function (regl, { model, view }, shadow) {
  const coneGeometry = createCylinder(0, 0.01, 0.05)
  const tailGeometry = createCylinder(0.005, 0.005, 0.05)

  tailGeometry.positions = tailGeometry.positions.map(([x, y, z]) => [
    x,
    y - 0.05,
    z
  ])

  const geometry = mergeMeshes([coneGeometry, tailGeometry])

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
      instances: () => X * Y * Z,
      attributes: {
        aPosition: geometry.positions,
        aNormal: geometry.normals,
        aUV: geometry.uvs,
        aOffset: {
          buffer: regl.buffer(positionAttributes()),
          divisor: 1
        }
      },

      vert: [
        `#define ${mode} 1`,
        // `#define texelSize 1.0 / float(${shadow.shadowMapSize})`,
        vert
          .replace(
            '/*__latticeDefinition__*/',
            model.lattice.toGLSLDefinition()
          )
          .replace('/*__latticeChunkGLSL__*/', latticeChunk(model.lattice))
          .replace(
            '/*__latticeSize__*/',
            `const int BEAMLINE_ELEMENT_COUNT_OR_1 = ${
              model.lattice.activeBeamlineElements().length || 1
            }; const int BEAMLINE_ELEMENT_COUNT = ${
              model.lattice.activeBeamlineElements().length
            };`
          )
      ].join('\n'),
      frag: [`#define ${mode} 1`, frag].join('\n'),

      uniforms: {
        ...shadow.uniforms,
        stageSize: view.stageGrid.size,
        magneticField: model.interactions.magneticField,

        ...(mode === 'shadow' && {
          projection: shadow.shadowProjectionMatrix,
          view: shadow.shadowViewMatrix
        }),

        ...(mode === 'lighting' && { shadowMap: shadow.fbo }),
        utColorCorrections: (ctx, props) => {
          return props.colorCorrections
        },

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
