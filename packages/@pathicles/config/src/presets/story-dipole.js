import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      eye: [5, 2, 5],
      center: [0, 2, 0]
    }
  },

  model: {
    tickDurationOverC: 0.2,
    emitter: {
      particleType: 'ELECTRON ELECTRON',
      bunchShape: 'SPIRAL_XY',
      position: [1, 1, 0],
      direction: [0, 0.2, 1],
      directionJitter: [0, 0, 0],
      positionJitter: [0.0, 0.05, 0],
      gamma: 6.05
    },
    interactions: {
      magneticField: [0, -0.01, 0],
      particleInteraction: false
    },

    lattice: {
      //   elements: {
      //     l: {
      //       type: LatticeElementTypes.DRIF,
      //       l: 0.5
      //     },
      //     d: {
      //       type: LatticeElementTypes.SBEN,
      //       l: 10,
      //       strength: -0.08
      //     }
      //   },
      //   beamline: ['l', 'd', 'l'],
      //   origin: {
      //     phi: 0,
      //     position: [0, 0.5, -10]
      //   }
    }
  }
}
