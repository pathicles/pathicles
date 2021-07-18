import { LATTICE_ELEMENT_TYPES } from '../constants'

export default {
  name: 'story-dipole',
  view: {
    camera: {
      center: [0, 1, 0],
      distance: 4,
      theta: (45 / 360) * 2 * Math.PI,
      phi: (15 / 360) * 2 * Math.PI
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON'
      // particleCount: 1
    },
    interactions: {
      magneticField: [0, 0, 0]
    },
    lattice: {
      elements: {
        l1: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 4.5
        },
        d1: {
          type: LATTICE_ELEMENT_TYPES.SBEN,
          l: 1,
          strength: 0.00075,
          angle: ((2 * Math.PI) / 360) * 0
        }
      },
      // beamline: ['d1'],
      beamline: [
        'l1',
        'd1'
        // 'l1',
        // 'd1'
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
        position: [0, 1, -5]
      }
    }
  }
}
