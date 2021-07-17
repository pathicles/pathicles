import { LATTICE_ELEMENT_TYPES } from '../constants'
import { DISTRIBUTIONS } from '../distributions/distributions'

export default {
  name: 'story-dipole',
  view: {
    camera: {
      // center: [-0, 0, -3.7207765272494715],
      center: [-0, 0, 0],
      distance: 10,
      theta: (0 / 360) * 2 * Math.PI,
      phi: (45 / 360) * 2 * Math.PI
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON',
      position: [0, 1, 0],
      direction: [0, 0, 1]
    },
    interactions: {
      magneticField: [0, 0, 0]
    },
    lattice: {
      elements: {
        l1: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 1
        },
        d1: {
          type: LATTICE_ELEMENT_TYPES.SBEN,
          l: 2,
          strength: 0.000135,
          angle: ((2 * Math.PI) / 360) * 45
        },
        d2: {
          type: LATTICE_ELEMENT_TYPES.SBEN,
          l: 1,
          strength: -0.000135,
          angle: (0 * (2 * Math.PI)) / 360
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
        'l1',
        'd1',
        'l1',
        'd1',
        'l1',
        'd1'
      ],
      // beamline: [],
      origin: {
        phi: (0 / 360) * 2 * Math.PI,
        position: [0, 1, 0]
        // position: [-1, 1, -3.7207765272494715]
      }
    }
  }
}
