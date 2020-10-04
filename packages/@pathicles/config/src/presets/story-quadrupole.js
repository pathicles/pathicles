import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyQuadrupole = {
  name: 'story-quadrupole',
  view: {
    camera: {
      position: [6, 2.1, 6],
      target: [0, 2, 0]
    }
  },
  model: {
    tickDurationOverC: 0.2,
    emitter: {
      particleType: 'PROTON ',
      bunchShape: 'SQUARE_YZ',
      direction: [1, 0, 0],
      position: [-10, 2, 0],
      directionJitter: [0.2, 0.2, 0],
      positionJitter: [0, 0, 0],

      gamma: 3
    },

    lattice: {
      elements: {
        q1: {
          type: LatticeElementTypes.QUAD,
          strength: 1,
          l: 1
        },
        q2: {
          type: LatticeElementTypes.QUAD,
          strength: -1,
          l: 1
        },
        l1: {
          type: LatticeElementTypes.DRIF,
          l: 10
        },
        l2: {
          type: LatticeElementTypes.DRIF,
          l: 1
        },
        l3: {
          type: LatticeElementTypes.DRIF,
          l: 2
        }
      },
      beamline2: ['l1', 'q1', 'q2', 'l1', 'q3', 'q4', 'l1'],
      beamline: ['l1', 'q1', 'l2', 'q2', 'l3', 'q1', 'l2', 'q2', 'l1'],
      origin: {
        phi: -Math.PI / 2,
        position: [-10, 0, 0]
      }
    }
  }
}
