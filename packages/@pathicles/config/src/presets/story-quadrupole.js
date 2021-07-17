import { LATTICE_ELEMENT_TYPES } from '../constants.js'

const quadLength = 1 // m
const quadF = 0.5 // m
const quadStrength = (2 * 0.5) / quadF / quadLength // m^-2

export default {
  name: 'story-quadrupole',
  view: {
    camera: {
      center: [-0, 1.5, 0],
      distance: 8,
      theta: (45 / 360) * 2 * Math.PI,
      phi: (0 / 360) * 2 * Math.PI
    }
  },
  model: {
    emitter: {
      bunchShape: 'SPIRAL_XY',
      particleType: 'PROTON',
      direction: [0, 0, 1],
      position: [0, 1.5, -8],
      gamma: 2
    },
    interactions: {
      magneticField: [0, 0.0, 0]
    },

    lattice: {
      elements: {
        q1: {
          type: LATTICE_ELEMENT_TYPES.QUAD,
          strength: quadStrength,
          l: quadLength
        },
        q2: {
          type: LATTICE_ELEMENT_TYPES.QUAD,
          strength: -quadStrength,
          l: quadLength
        },
        l_5: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 5 //(20 - 5 * quadLength) / 2
        },
        l_20: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 20 //(20 - 5 * quadLength) / 2
        },
        l_1: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: quadLength
        }
      },
      // beamline: ['l_1', 'q1', 'l_1', 'q2', 'l_1', 'q1', 'l_1', 'q2', 'l_1', 'q1', 'l_1', 'q2', 'l_1', 'q1', 'l_1', 'q2', 'l_1'],
      beamline: [
        'l_1',
        'q1',
        'l_1',
        'q2',
        'l_1',
        'q1',
        'l_1',
        'q2',
        'l_1',
        'q1',
        'l_1',
        'q2',
        'l_1',
        'q1'
      ],
      origin: {
        phi: (-Math.PI / 4) * 0,
        position: [0, 1.5, -8]
      }
    }
  }
}
