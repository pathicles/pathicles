import { LATTICE_ELEMENT_TYPES } from '../constants.js'

const quadLength = 1 // m
const quadF = 1 // m
const quadStrength = 1 / quadF / quadLength // m^-2

export const storyQuadrupole = {
  name: 'story-quadrupole',
  view: {
    camera: {
      center: [-0, 1.5, 0],
      distance: 5,
      theta: (-10 / 360) * 2 * Math.PI,
      phi: (-3 / 360) * 2 * Math.PI
    }
  },
  model: {
    emitter: {
      particleCount: 121,
      particleType: 'PROTON',
      // particleSeparation: 0.25,
      direction: [0, 0, -1],
      position: [0, 1.5, 10],
      directionJitter: [0.05, 0.05, 0],
      positionJitter: [0.0, 0.0, 0.0],
      gamma: 2
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
        'l_5'
      ],
      origin: {
        phi: (-Math.PI / 4) * 3,
        position: [0, 1.5, 10]
      }
    }
  }
}
