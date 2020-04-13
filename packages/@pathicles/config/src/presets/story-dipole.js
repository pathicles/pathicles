import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      center: [0, 0.1, 0],
      theta: (2 * Math.PI) / (360 / 90),
      phi: (2 * Math.PI) / (360 / 5),
      distance: 5
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON',
      bunchShape: 'DISC',
      direction: [0, 0.3, -1],
      position: [3.2, -1.5, 0],
      directionJitter: [0.05, 0.0, 0.05],
      positionJitter: [0.5, 0.5, 0.1],
      gamma: 2
    },
    interactions: {
      magneticField: [0, 0, 0],
      particleInteraction: false
    },

    lattice: {
      elements: {
        l0: {
          type: LatticeElementTypes.SBEN,
          l: 20,
          strength: 0.002
        }
      },
      beamline: ['l0'],
      origin: {
        phi: 0,
        position: [0, 0, -10]
      }
    }
  }
}
