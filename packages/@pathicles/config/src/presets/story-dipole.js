import { LATTICE_ELEMENT_TYPES } from '../constants'

export default {
  name: 'story-dipole',
  view: {
    camera: {
      center: [-0, 1.5, 0],
      distance: 5,
      theta: (-3 / 360) * 2 * Math.PI,
      phi: (5 / 360) * 2 * Math.PI
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON',
      position: [0, 1.5, -7],
      direction: [1, 0, 0]
    },
    interactions: {
      magneticField: [0, 0.0, 0]
    },
    lattice: {
      elements: {
        l: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 8
        },
        l1: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 2
        },
        d1: {
          type: LATTICE_ELEMENT_TYPES.SBEN,
          l: 1,
          strength: -0.0001
        }
      },
      // beamline: ['d1'],
      beamline: [
        'l1',
        'd1',
        'l1',
        'd1',
        'l1',
        'd1',
        'l1',
        'd1',
        'l1',
        'd1',
        'l1'
      ],
      // beamline: [],
      origin: {
        phi: (90 / 360) * 2 * Math.PI,
        position: [0, 1, -10]
      }
    }
  }
}
