import { LATTICE_ELEMENT_TYPES } from '../constants'

export default {
  name: 'story-electric',
  view: {
    camera: {
      center: [-0, 1.5, 0],
      distance: 8,
      phi: (15 / 360) * 2 * Math.PI,
      theta: (-45 / 360) * 2 * Math.PI
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON PHOTON PROTON',
      gamma: () => 1.1
    },

    interactions: {
      electricField: [0, 0, -0],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    },
    lattice: {
      elements: {
        l: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 7
        },
        e: {
          type: LATTICE_ELEMENT_TYPES.ESTA,
          l: 1,
          strength: -1e5
        }
      },
      beamline: ['l', 'e', 'l'],
      origin: {
        phi: 0,
        position: [0, 1.5, -8]
      }
    }
  }
}
