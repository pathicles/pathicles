const DRIF = 'DRIF'
const QUAD = 'QUAD'
const SBEN = 'SBEN'

export const LatticeElementTypes = {
  DRIF,
  SBEN,
  QUAD
}

const LatticeElementTypesArray = [DRIF, SBEN, QUAD]

const colors = {
  DRIF: [0.3, 0.3, 0.3],
  QUAD: [0.5, 0.5, 0.0],
  QUAD1: [0.9, 0.5, 0.0],
  SBEN: [0.5, 0, 0],
  ESTA: [0, 0.8, 0]
}

export class Lattice {
  constructor(latticeDescriptor) {
    if (typeof latticeDescriptor === 'undefined')
      throw new Error('no default constructor')

    // Object.values(latticeDescriptor.elements).forEach(e => {
    //   // check
    // })

    this.origin = latticeDescriptor.origin || {
      phi: 0,
      position: [0, 0, 0]
    }

    let local_z = 0
    this.beamline = latticeDescriptor.beamline.map((elementKey) => {
      if (!latticeDescriptor.elements[elementKey]) {
        throw new Error(`element ${elementKey} not defined`)
      }
      const element = latticeDescriptor.elements[elementKey]
      local_z += element.l
      return {
        ...element,
        local_z_min: local_z - element.l,
        local_z_max: local_z
      }
    })

    const startEnds = this.startEnds

    this.beamline.forEach((v, k) => {
      v.start = startEnds[k].start
      v.end = startEnds[k].end
    })
  }

  get startEnds() {
    let phi = this.origin.phi
    let [x, y, z] = this.origin.position
    return this.beamline.map((element) => {
      const start = [x, y, z]
      const phi_half = element.angle ? phi + element.angle / 2 : phi
      const end = [
        x - Math.sin(phi_half) * element.l,
        y,
        z + Math.cos(phi_half) * element.l
      ]

      // const middle = [(start[0] + end[0]) / 2, y, (start[2] + end[2]) / 2]
      ;[x, y, z] = end
      phi = element.angle ? phi + element.angle : phi
      return {
        start,
        end
      }
    })
  }

  get transformations() {
    let phi = this.origin.phi
    let [x, y, z] = this.origin.position
    //y = -1
    return this.beamline.map((element) => {
      const start = [x, y, z]
      const phi_half = element.angle ? phi + element.angle / 2 : phi
      const end = [
        x - Math.sin(phi_half) * element.l,
        y,
        z + Math.cos(phi_half) * element.l
      ]

      const middle = [(start[0] + end[0]) / 2, 0.1, (start[2] + end[2]) / 2]
      ;[x, y, z] = end
      phi = element.angle ? phi + element.angle : phi
      return {
        translation: middle,
        phi: phi_half,
        scale: [
          element.type === 'DRIF' ? 0.25 : 0.5,
          0.2,
          element.l - 0.2 - (element.type === 'SBEN' ? 0 : 0)
        ]
        // scale: [1, 1, 1]
      }
    })
  }

  get colors() {
    return this.beamline.map((element) => {
      if (element.type === LatticeElementTypes.QUAD && element.strength < 0)
        return colors['QUAD1']
      return colors[element.type]
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
    // console.log(this.beamline[this.beamline.length - 1])
    return (
      this.beamline.length &&
      this.beamline[this.beamline.length - 1].local_z_max
    )
  }

  toGLSLDefinition() {
    const myStartEnds = this.startEnds
    return this.beamline
      .map(
        (v, i) =>
          `beamline[${i}] = BeamlineElement(
            vec3(${myStartEnds[i].start.join(',')}),
            vec3(${myStartEnds[i].end.join(',')}),
            ${LatticeElementTypesArray.indexOf(v.type)},
            ${v.strength ? v.strength.toFixed(10) : '0.'})`
      )
      .join(',')
  }

  getClosestBeamlineElement(position) {
    let bestLength = 1000
    let bestIndex = 0

    const startEnds = this.startEnds

    for (let i = 0; i < this.beamline.length; i++) {
      // console.log(i);
      // let bl = this.beamline[i]
      const currentLength =
        Math.pow(position[0] - startEnds[i].start[0], 2) +
        Math.pow(position[1] - startEnds[i].start[1], 2) +
        Math.pow(position[2] - startEnds[i].start[2], 2)
      if (currentLength < bestLength) {
        bestIndex = i
        bestLength = currentLength
        // console.log('Bestlength', bestIndex, bestLength)
      }
    }
    return this.beamline[bestIndex]
  }
}
