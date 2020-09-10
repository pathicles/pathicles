import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyQuadrupole = {
  name: 'story-quadrupole',
  view: {
    camera: {
      position: [5, 2, 5],
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
      directionJitter: [0, 0.2, 0],
      positionJitter: [0, 0, 0.1],

      gamma: 3
    },

    lattice: {
      elements: {
        q1: {
          type: LatticeElementTypes.QUAD,
          strength: 0.5,
          l: 2.5
        },
        q2: {
          type: LatticeElementTypes.QUAD,
          strength: -0.5,
          l: 2.5
        },
        l1: {
          type: LatticeElementTypes.DRIF,
          l: 10
        }
      },
      beamline: ['l1', 'q1', 'q2', 'l1'],
      origin: {
        phi: -Math.PI / 2,
        position: [-10, 0, 0]
      }
    }
  }
}
