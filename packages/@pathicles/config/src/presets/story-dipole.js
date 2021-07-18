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
      particleCount: 1
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
          l: 1,
          strength: 0.00135,
          angle: ((2 * Math.PI) / 360) * 10
        },
        d2: {
          type: LATTICE_ELEMENT_TYPES.SBEN,
          l: 1,
          strength: -0.000135,
          angle: (((1 * (2 * Math.PI)) / 360) * 45) / 2
        }
      },
      // beamline: ['d1'],
      beamline: [
        'l1',
        'd1',
        'l1',
        'd1'
        // 'l1',
        // 'd1',
        // 'l1',
        // 'd1',
        // 'l1',
        // 'd1',
        // 'l1',
        // 'd1',
        // 'l1',
        // 'd1',
        // 'l1',
        // 'd1'
      ],
      // beamline: [],
      origin: {
        phi: (0 / 360) * 2 * Math.PI,
        position: [0, 1, 0]
      }
    }
  }
}
