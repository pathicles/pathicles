import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      center: [0, 1, 0],
      distance: 5,
      theta: (0 / 360) * 2 * Math.PI,
      phi: (0 / 360) * 2 * Math.PI
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON',
      position: [0, -0.4, -1],
      direction: [-1, 0.2, 0]
    },
    interactions: {
      particleInteraction: false,
      electricField: [0, 0, 0],
      magneticField: [0, 0.001, 0]
    }
    // lattice: {
    //   elements: {
    //     l: {
    //       type: LatticeElementTypes.DRIF,
    //       l: 0
    //     },
    //     d: {
    //       type: LatticeElementTypes.SBEN,
    //       l: 10,
    //       strength: 0.004
    //     }
    //   },
    //   beamline: ['l', 'd', 'l'],
    //   origin: {
    //     phi: 0,
    //     position: [0, 0.5, -9]
    //   }
  }
  // }
}
