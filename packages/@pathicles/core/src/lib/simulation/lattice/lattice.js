const DRIF = 'DRIF'
const QUAD = 'QUAD'
const SBEN = 'SBEN'
const ESTA = 'ESTA'

export const LATTICE_ELEMENT_TYPES = {
  DRIF,
  SBEN,
  QUAD,
  ESTA
}

export const LATTICE_ELEMENTS = {
  DRIF: {
    color: [0.3, 0.3, 0.3],
    width: 0.2,
    height: 0.05,
    gap: 0.2
  },
  SBEN: { color: [0.5, 0, 0], width: 0.2, height: 0.05, gap: 0 },
  QUAD: {
    color: [0.3, 0.3, 0.3],
    color_minus: [0.9, 0.5, 0.0],
    width: 0.3,
    height: 0.05,
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
      const b = LATTICE_ELEMENTS[element.type].width / 2
      const phi_half = element.angle ? phi + element.angle / 2 : phi
      const start = [x, y, z]

      ;[x, y, z] = [
        x - Math.sin(phi_half) * element.l,
        y,
        z + Math.cos(phi_half) * element.l
      ]
      phi = element.angle ? phi + element.angle : phi
      return {
        ...element,
        start,
        startBottomRight: [
          start[0] - b * Math.cos(phi_half),
          0,
          start[2] - b * Math.sin(phi_half)
        ],
        middle: [(start[0] + x) / 2, y, (start[2] + z) / 2],
        end: [x, y, z],
        endTopLeft: [
          start[0] - Math.sin(phi_half) * element.l + b * Math.cos(phi_half),
          2,
          start[2] + Math.cos(phi_half) * element.l + b * Math.sin(phi_half)
        ],
        phi,
        phi_half,
        local_z_min: local_z - element.l,
        local_z_max: local_z
      }
    })
  }

  get transformations() {
    return this.beamline.map((element) => {
      return {
        translation: element.middle,
        phi: element.phi_half,
        scale: [
          LATTICE_ELEMENTS[element.type].width,
          LATTICE_ELEMENTS[element.type].height,
          element.l - LATTICE_ELEMENTS[element.type].gap
        ]
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

  segmentIndexForZ(z) {
    const z_mod = z % this.length()
    for (let idx = 0; idx < Math.min(this.beamline.length, 1000); idx++) {
      if (
        z_mod >= this.beamline[idx].local_z_min &&
        z_mod <= this.beamline[idx].local_z_max
      )
        return idx
    }
  }

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
        (v, i) =>
          `beamline[${i}] = BeamlineElement(
vec3(${v.startBottomRight.join(',')}),
vec3(${v.endTopLeft.join(',')}),
${LatticeElementTypesArray.indexOf(v.type)},
${v.strength ? v.strength.toFixed(10) : '0.'})`
      )
      .join(';\n')
  }

  // getClosestBeamlineElement(position) {
  //   let bestLength = 1000
  //   let bestIndex = 0
  //
  //   for (let i = 0; i < this.beamline.length; i++) {
  //     // console.log(i);
  //     let bl = this.beamline[i]
  //     const currentLength =
  //       Math.pow(position[0] - bl.start[0], 2) +
  //       Math.pow(position[1] - bl.start[1], 2) +
  //       Math.pow(position[2] - bl.start[2], 2)
  //     if (currentLength < bestLength) {
  //       bestIndex = i
  //       bestLength = currentLength
  //       // console.log('Bestlength', bestIndex, bestLength)
  //     }
  //   }
  //   return this.beamline[bestIndex]
  // }
}
