import { LATTICE_ELEMENT_TYPES } from '../constants'
import { DISTRIBUTIONS } from '../distributions/distributions'

export default {
  name: 'story-dipole',
  view: {
    camera: {
      center: [-0, 0, -4.5],
      distance: 15,
      theta: (0 / 360) * 2 * Math.PI,
      phi: (89 / 360) * 2 * Math.PI
    }
  },

  model: {
    emitter: {
      particleType: 'ELECTRON',
      bunchShape: 'SPIRAL_YZ',
      position: [0, 1, -2.25 * 2],
      direction: [1, 0, 0]
    },
    interactions: {
      magneticField: [0, 0.0, 0]
    },
    lattice: {
      elements: {
        l1: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 2
        },
        d1: {
          type: LATTICE_ELEMENT_TYPES.SBEN,
          l: 1,
          strength: -0.00045,
          angle: (2 * Math.PI) / 8
        }
      },
      // beamline: ['d1'],
      beamline: [
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
        phi: (-90 / 360) * 2 * Math.PI,
        position: [0, 1, -2.35 * 2]
      }
    }
  }
}
