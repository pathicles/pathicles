const DRIF = 'DRIF'
const QUAD = 'QUAD'
const SBEN = 'SBEN'
const ESTA = 'ESTA'

function rotY([x, y, z], phi) {
  const c = Math.cos(phi)
  const s = Math.sin(phi)
  return [c * x - s * z, y, s * x + c * z]
}

function signedDistanceToBox(p, size) {
  const offsetX = Math.abs(p[0]) - size[0] / 2
  const offsetY = Math.abs(p[1]) - size[1] / 2
  const offsetZ = Math.abs(p[2]) - size[2] / 2

  const offsetMaxX = Math.max(offsetX, 0)
  const offsetMaxY = Math.max(offsetY, 0)
  const offsetMaxZ = Math.max(offsetZ, 0)
  const offsetMinX = Math.min(offsetX, 0)
  const offsetMinY = Math.min(offsetY, 0)
  const offsetMinZ = Math.min(offsetZ, 0)

  const unsignedDst = Math.sqrt(
    offsetMaxX * offsetMaxX + offsetMaxY * offsetMaxY + offsetMaxZ * offsetMaxZ
  )
  const dstInsideBox = Math.max(offsetMinX, offsetMinY, offsetMinZ)

  return unsignedDst + dstInsideBox
}
//
// function sdBox(p, s) {
//   const d = [
//     Math.abs(p[0]) - s[0],
//     Math.abs(p[1]) - s[1],
//     Math.abs(p[2]) - s[2]
//   ]
//
//   return (
//     Math.min(Math.max(d[0], Math.max(d[1], d[2])), 0.0) +
//     length(Math.max(d, 0.0))
//   )
// }

export const LATTICE_ELEMENT_TYPES = {
  DRIF,
  SBEN,
  QUAD,
  ESTA
}

export const LATTICE_ELEMENTS = {
  DRIF: {
    color: [0.3, 0.3, 0.3],
    width: 0.15,
    height: 0.5,
    gap: 0
  },
  SBEN: { color: [0.5, 0, 0], width: 0.5, height: 0.5, gap: 0 },
  QUAD: {
    color: [0.9, 0.4, 0],
    color_minus: [0.5, 0.4, 0],
    width: 0.5,
    height: 0.5,
    gap: 0
  },
  ESTA: { color: [0, 0.8, 0], width: 0.5, height: 0.05, gap: 0 }
}

const LatticeElementTypesArray = [DRIF, SBEN, QUAD, ESTA]

export class Lattice {
  constructor(latticeDescriptor) {
    if (typeof latticeDescriptor === 'undefined')
      throw new Error('no default constructor')

    this.origin = latticeDescriptor.origin || {
      phi: 0,
      position: [0, 0, 0]
    }

    let phi = this.origin.phi
    let [x, y, z] = this.origin.position

    let local_z = 0
    this.beamline = latticeDescriptor.beamline.map((elementKey) => {
      if (!latticeDescriptor.elements[elementKey]) {
        throw new Error(`element ${elementKey} not defined`)
      }
      const element = latticeDescriptor.elements[elementKey]
      local_z += element.l
      // const b = LATTICE_ELEMENTS[element.type].width / 2
      const phi_half = element.angle ? phi + element.angle / 2 : phi
      const start = [x, y, z]

      ;[x, y, z] = [
        x - Math.sin(phi_half) * element.l,
        y,
        z + Math.cos(phi_half) * element.l
      ]
      phi = element.angle ? phi + element.angle : phi
      return {
        type: element.type,
        ...(element.strength && { strength: element.strength }),
        middle: [(start[0] + x) / 2, y, (start[2] + z) / 2],
        phi: phi_half,
        local_z_min: local_z - element.l,
        local_z_max: local_z,
        size: [
          LATTICE_ELEMENTS[element.type].width,
          LATTICE_ELEMENTS[element.type].height,
          element.l - LATTICE_ELEMENTS[element.type].gap
        ]
      }
    })
  }

  get transformations() {
    return this.beamline.map((element) => {
      return {
        translation: element.middle,
        phi: element.phi,
        scale: element.size
      }
    })
  }

  get colors() {
    return this.beamline.map((element) => {
      return element.type === LATTICE_ELEMENT_TYPES.QUAD && element.strength < 0
        ? LATTICE_ELEMENTS[element.type].color_minus
        : LATTICE_ELEMENTS[element.type].color
    })
  }

  // segmentIndexForZ(z) {
  //   const z_mod = z % this.length()
  //   for (let idx = 0; idx < Math.min(this.beamline.length, 1000); idx++) {
  //     if (
  //       z_mod >= this.beamline[idx].local_z_min &&
  //       z_mod <= this.beamline[idx].local_z_max
  //     )
  //       return idx
  //   }
  // }

  length() {
    return (
      this.beamline.length &&
      this.beamline[this.beamline.length - 1].local_z_max
    )
  }

  activeBeamlineElements() {
    return this.beamline.filter((element) => element.type != DRIF)
  }

  toGLSLDefinition() {
    return this.activeBeamlineElements()
      .map(
        (element, i) =>
          `beamline[${i}] = BeamlineElement(
vec3(${element.middle.join(',')}),
vec3(${element.size[0] / 2}, ${element.size[1] / 2}, ${element.size[2] / 2}),
${element.phi ? -element.phi.toFixed(10) : '0.'},
${LatticeElementTypesArray.indexOf(element.type)},
${element.strength ? element.strength.toFixed(10) : '0.'})`
      )
      .join(';\n')
  }

  getElementForPosition(position) {
    for (let i = 0; i < this.beamline.length; i++) {
      let bl = this.beamline[i]

      let localPosition = position
      localPosition = rotY(position, bl.phi)
      localPosition[0] -= bl.middle[0]
      localPosition[1] -= bl.middle[1]
      localPosition[2] -= bl.middle[2]

      if (signedDistanceToBox(localPosition, bl.size) <= 0) {
        return bl
      }
    }
    return null
  }
}
// vec3(${element.size[0]}, 1. , ${element.size[2]}),
