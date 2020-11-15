import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyQuadrupole = {
  name: 'story-quadrupole',
  view: {
    camera: {
      center: [0.3, 1.5, 0],
      distance: 5,
      theta: (0 / 360) * 2 * Math.PI,
      phi: (0 / 360) * 2 * Math.PI
    }
  },
  model: {
    emitter: {
      particleType: 'PROTON',
      particleSeparation: 0.05,
      direction: [0, 0, -1],
      position: [0, 1.5, 10],
      directionJitter: [0.2, 0.2, 0]
    },

    lattice: {
      elements: {
        q1: {
          type: LatticeElementTypes.QUAD,
          strength: -0.5,
          l: 1
        },
        q2: {
          type: LatticeElementTypes.QUAD,
          strength: 0.5,
          l: 1
        },
        l_5: {
          type: LatticeElementTypes.DRIF,
          l: 5
        },
        l_1: {
          type: LatticeElementTypes.DRIF,
          l: 1
        }
      },
      // beamline: ['l_6', 'q1', 'l_1', 'q2', 'l_1', 'q1', 'l_1', 'q2', 'l_6'],
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
        'l_5'
      ],
      origin: {
        phi: (-Math.PI / 4) * 3,
        position: [0, 1.5, 10]
      }
    }
  }
}
