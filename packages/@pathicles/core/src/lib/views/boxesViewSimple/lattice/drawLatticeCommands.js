import createCube from 'primitive-cube'
import { mergeMeshes } from './mergeMeshes.js'

import vert from './lattice.vert'
import frag from './lattice.frag'
import { LATTICE_ELEMENT_TYPES } from '../../../../../../config/src/constants.js'

function dipoleGeometry() {
  const geometryDipoleTop = createCube(1, 0.1, 1)
  geometryDipoleTop.positions = geometryDipoleTop.positions.map(([x, y, z]) => [
    x,
    y + 0.4,
    z
  ])
  const geometryDipoleBottom = createCube(1, 0.1, 1)
  geometryDipoleBottom.positions = geometryDipoleBottom.positions.map(
    ([x, y, z]) => [x, y - 0.4, z]
  )
  return mergeMeshes([geometryDipoleTop, geometryDipoleBottom])
}

function quadrupoleGeometry() {
  const geometryDipoleTop = createCube(0.75, 0.1, 1)
  geometryDipoleTop.positions = geometryDipoleTop.positions.map(([x, y, z]) => [
    x,
    y + 0.5,
    z
  ])
  const geometryDipoleLeft = createCube(0.1, 0.75, 1)
  geometryDipoleLeft.positions = geometryDipoleLeft.positions.map(
    ([x, y, z]) => [x - 0.5, y, z]
  )
  const geometryDipoleRight = createCube(0.1, 0.75, 1)
  geometryDipoleRight.positions = geometryDipoleRight.positions.map(
    ([x, y, z]) => [x + 0.5, y, z]
  )
  const geometryDipoleBottom = createCube(0.75, 0.1, 1)
  geometryDipoleBottom.positions = geometryDipoleBottom.positions.map(
    ([x, y, z]) => [x, y - 0.5, z]
  )
  return mergeMeshes([
    geometryDipoleTop,
    geometryDipoleBottom,
    geometryDipoleRight,
    geometryDipoleLeft
  ])
}

export default function (regl, { model }, shadow) {
  const command = (type, mode) => {
    const geometry =
      type === LATTICE_ELEMENT_TYPES.QUAD
        ? quadrupoleGeometry()
        : dipoleGeometry()

    const blElements = model.lattice.beamline.filter((d) => d.type === type)

    const transformations = model.lattice.transformations.filter(
      (d) => d.type === type
    )

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
      instances: blElements.length,
      attributes: {
        aPosition: geometry.positions,
        aNormal: geometry.normals,
        aUV: geometry.uvs,
        aColor: {
          buffer: regl.buffer(blElements.map((d) => d.color)),
          divisor: 1
        },
        aTranslation: {
          buffer: regl.buffer(transformations.map((t) => t.translation)),
          divisor: 1
        },
        aPhi: {
          buffer: regl.buffer(transformations.map((t) => -t.phi)),
          divisor: 1
        },
        aTheta: {
          buffer: regl.buffer(transformations.map((t) => -t.theta)),
          divisor: 1
        },
        aScale: {
          buffer: regl.buffer(transformations.map((t) => t.scale)),
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
    quadLighting: command(LATTICE_ELEMENT_TYPES.QUAD, 'lighting'),
    quadShadow: command(LATTICE_ELEMENT_TYPES.QUAD, 'shadow'),
    sbenLighting: command(LATTICE_ELEMENT_TYPES.SBEN, 'lighting'),
    sbenShadow: command(LATTICE_ELEMENT_TYPES.SBEN, 'shadow')
  }
}
