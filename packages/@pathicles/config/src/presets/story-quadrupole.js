import { LATTICE_ELEMENT_TYPES } from '../constants.js'

const quadLength = 1 // m
const quadF = 1 // m
const quadStrength = 1000 //(2 * 0.5) / quadF / quadLength // m^-2

export default {
  name: 'story-quadrupole',
  view: {
    camera: {
      center: [-0, 1.5, 0],
      distance: 3,
      theta: (-15 / 360) * 2 * Math.PI,
      phi: (0 / 360) * 2 * Math.PI
    }
  },
  model: {
    emitter: {
      // bunchShape: 'SQUARE_XY',
      particleSeparation: 0.1,
      particleType: 'PROTON',
      direction: [0, 0, -1],
      position: [0, 1.5, 10],
      gamma: 2
    },
    interactions: {
      magneticField: [0, 0.000000001, 0]
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
          l: 0 //(20 - 5 * quadLength) / 2
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
        'l_5',
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
        'q1',
        'l_20'
      ],
      origin: {
        phi: (-Math.PI / 4) * 3,
        position: [0, 1.5, 10]
      }
    }
  }
}
