import createCube from 'primitive-cube'
import { mergeMeshes } from './mergeMeshes.js'

import vert from './lattice.vert'
import frag from './lattice.frag'

export default function (regl, { model }, shadow) {
  const geometryDipoleTop = createCube(0.75, 0.15, 1)
  geometryDipoleTop.positions = geometryDipoleTop.positions.map(([x, y, z]) => [
    x,
    y + 0.5,
    z
  ])
  const geometryDipoleLeft = createCube(0.15, 0.75, 1)
  geometryDipoleLeft.positions = geometryDipoleLeft.positions.map(
    ([x, y, z]) => [x - 0.5, y, z]
  )
  const geometryDipoleRight = createCube(0.15, 0.75, 1)
  geometryDipoleRight.positions = geometryDipoleRight.positions.map(
    ([x, y, z]) => [x + 0.5, y, z]
  )

  const geometryDipoleBottom = createCube(0.75, 0.15, 1)
  geometryDipoleBottom.positions = geometryDipoleBottom.positions.map(
    ([x, y, z]) => [x, y - 0.5, z]
  )

  const geometry = mergeMeshes([
    geometryDipoleTop,
    geometryDipoleBottom,
    geometryDipoleRight,
    geometryDipoleLeft
  ]) //createCube()

  const command = (mode) => {
    return regl({
      depth: {
        enable: true
      },
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
        enable: false,
        face: 'back'
      },
      elements: geometry.cells,
      instances: model.lattice.beamline.length,
      attributes: {
        aPosition: geometry.positions,
        aNormal: geometry.normals,
        aUV: geometry.uvs,
        aColor: {
          buffer: regl.buffer(model.lattice.colors),
          divisor: 1
        },
        aTranslation: {
          buffer: regl.buffer(
            model.lattice.transformations.map((t) => t.translation)
          ),
          divisor: 1
        },
        aPhi: {
          buffer: regl.buffer(model.lattice.transformations.map((t) => -t.phi)),
          divisor: 1
        },
        aTheta: {
          buffer: regl.buffer(
            model.lattice.transformations.map((t) => -t.theta)
          ),
          divisor: 1
        },
        aScale: {
          buffer: regl.buffer(
            model.lattice.transformations.map((t) => t.scale)
          ),
          divisor: 1
        }
      },

      vert: [`#define ${mode} 1`, vert].join('\n'),
      frag: [`#define ${mode} 1`, frag].join('\n'),

      uniforms: {
        ...shadow.uniforms
      }
    })
  }

  return {
    lighting: command('lighting'),
    shadow: command('shadow')
  }
}
