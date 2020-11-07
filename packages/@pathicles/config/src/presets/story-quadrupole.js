import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyQuadrupole = {
  name: 'story-quadrupole',
  view: {
    camera: {
      theta: (30 / 360) * 2 * Math.PI,
      phi: (5 / 360) * 2 * Math.PI
    }
  },
  model: {
    emitter: {
      particleType: 'PROTON',
      bunchShape: 'SQUARE_XY',
      particleCount: 121,
      direction: [0, 0, -1],
      position: [0, 1.5, 10],
      directionJitter: [0.05, 0.05, 0],
      positionJitter: [0.1, 0.1, 0],

      gamma: 8.5
    },

    lattice: {
      elements: {
        q1: {
          type: LatticeElementTypes.QUAD,
          strength: -2.5,
          l: 2
        },
        q2: {
          type: LatticeElementTypes.QUAD,
          strength: 2.5,
          l: 2
        },
        l_5: {
          type: LatticeElementTypes.DRIF,
          l: 1
        },
        l_2: {
          type: LatticeElementTypes.DRIF,
          l: 2
        }
      },
      // beamline: ['l_6', 'q1', 'l_1', 'q2', 'l_1', 'q1', 'l_1', 'q2', 'l_6'],
      beamline: [
        'l_5',
        'q1',
        'l_2',
        'q2',
        'l_2',
        'q1',
        'l_2',
        'q2',
        'l_2',
        'q1',
        'l_5'
      ],
      origin: {
        phi: (-Math.PI / 4) * 3,
        position: [0, 1.5, 10]
      }
    }
  }
}
