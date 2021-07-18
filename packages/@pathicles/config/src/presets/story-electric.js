import { LATTICE_ELEMENT_TYPES } from '../constants'

export default {
  name: 'story-electric',
  view: {
    camera: {
      center: [0, 1, 0],
      distance: 4,
      theta: (-45 / 360) * 2 * Math.PI,
      phi: (-5 / 360) * 2 * Math.PI
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON PHOTON PROTON',
      gamma: () => 1.5
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
