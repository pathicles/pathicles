import { LATTICE_ELEMENT_TYPES } from '../constants'

export default {
  name: 'story-electric',
  view: {
    camera: {
      center: [0, 1, 0],
      distance: 7,
      theta: (45 / 360) * 2 * Math.PI,
      phi: (10 / 360) * 2 * Math.PI
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON PHOTON PROTON',
      gamma: () => 1.5
    },

    lattice: {
      elements: {
        l: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 4.75
        },
        e: {
          type: LATTICE_ELEMENT_TYPES.ESTA,
          l: 0.5,
          strength: -1e10
        }
      },
      beamline: ['l', 'e', 'l'],
      origin: {
        phi: 0,
        position: [0, 1, -5]
      }
    }
  }
}
