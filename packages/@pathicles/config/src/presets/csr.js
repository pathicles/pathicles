import { LATTICE_ELEMENT_TYPES, RUNNER_MODE } from '../constants.js'

export default {
  name: 'csr',
  view: {
    camera: {
      center: [0, 1.5, 0],
      distance: 18,
      phi: (45 / 360) * 2 * Math.PI,
      theta: (90 / 360) * 2 * Math.PI
    }
  },
  runner: {
    prerender: false,
    loops: 0,
    mode: RUNNER_MODE.NOBREAK,
    iterationsPerSnapshot: 8,
    iterationDurationOverC: 0.01,
    snapshotCount: 32,
    iterationCount: 512 * 4 - 1
  },

  model: {
    emitter: {
      particleType: 'ELECTRON',
      bunchShape: 'SPIRAL_XY',
      gamma: 2.5
    },
    interactions: {
      magneticField: [0, 0.0, 0],
      particleInteraction: false
    },
    lattice: {
      elements: {
        l0: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 1.43
        },
        l1: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 1
        },
        l2: {
          type: LATTICE_ELEMENT_TYPES.DRIF,
          l: 0.35
        },
        q1: {
          type: LATTICE_ELEMENT_TYPES.QUAD,
          k1: 2.87506832355,
          l: 0.25
        },
        q2: {
          type: LATTICE_ELEMENT_TYPES.QUAD,
          k1: -6.31393492954,
          l: 0.25
        },
        q3: {
          type: LATTICE_ELEMENT_TYPES.QUAD,
          k1: 4.36962492724,
          l: 0.25
        },
        q4: {
          type: LATTICE_ELEMENT_TYPES.QUAD,
          k1: 5.5089117863,
          l: 0.25
        },
        d1: {
          type: LATTICE_ELEMENT_TYPES.SBEN,
          l: 1,
          strength: 0.0021,
          angle: -((2 * Math.PI) / 360) * 45
        },
        bm: {
          type: LATTICE_ELEMENT_TYPES.SBEN,
          angle: 0.78539816,
          e1: 0.39269908,
          e2: 0.39269908,
          l: 1.8,
          strength: 0.0001
        }
      },
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
        //
        // 'l0',
        // // 'bm',
        // 'q1',
        // 'l2',
        // 'q2',
        // 'l2',
        // 'q3',
        // 'l2',
        // 'bm',
        // 'l2',
        // 'l1',
        // 'q4',
        // 'l1',
        // 'l2'
        // 'bm',
        // 'l2',
        // 'q3',
        // 'l2',
        // 'q2',
        // 'l2',
        // 'l0',
        // 'q1',
        // 'l2',
        // 'q2'
        // 'l2',
        // 'q3',
        // 'l2',
        // 'bm',
        // 'l2',
        // 'l1',
        // 'q4',
        // 'l1'
        // 'l2',
        // 'bm',
        // 'l2',
        // 'q3',
        // 'l2',
        // 'q2',
        // 'l2',
        // 'l0',
        // 'q1',
        // 'l2',
        // 'q2',
        // 'l2',
        // 'q3',
        // 'l2',
        // 'bm',
        // 'l2',
        // 'l1',
        // 'q4',
        // 'l1',
        // 'l2',
        // 'bm',
        // 'l2',
        // 'q3',
        // 'l2',
        // 'q2',
        // 'l2',
        // 'l0',
        // 'q1',
        // 'l2',
        // 'q2',
        // 'l2',
        // 'q3',
        // 'l2',
        // 'bm',
        // 'l2',
        // 'l1',
        // 'q4',
        // 'l1',
        // 'l2',
        // 'bm',
        // 'l2',
        // 'q3',
        // 'l2',
        // 'q2',
        // 'l2'
      ],
      origin: {
        phi: 0,
        position: [-0.5, 1, -0.5]
      }
    }
  }
}
