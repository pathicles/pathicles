import { LATTICE_ELEMENT_TYPES, RUNNER_MODE } from '../constants.js'

export default {
  name: 'csr',
  view: {
    camera: {
      center: [0, 1.5, 0],
      distance: 8,
      phi: (0 / 360) * 2 * Math.PI,
      theta: (90 / 360) * 2 * Math.PI
    }
  },
  runner: {
    prerender: true,
    loops: 0,
    mode: RUNNER_MODE.NOBREAK,
    iterationsPerSnapshot: 1,
    iterationsPerTick: 4,
    iterationDurationOverC: 0.25,
    snapshotCount: 128,
    iterations: 128
  },

  model: {
    emitter: {
      particleCount: 512,
      particleType: 'ELECTRON',
      bunchShape: 'SPIRAL_XY',
      particleSeparation: 0.1,
      position: [0, 1.5, -9],
      direction: [0, 0, 1],
      positionJitter: [0.0, 0.0, 0],

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
          l: 0.25
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
        'l0',
        // 'bm',
        'q1',
        'l2',
        'q2',
        'l2',
        'q3',
        'l2',
        'bm',
        'l2',
        'l1',
        'q4',
        'l1',
        'l2'
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
        position: [0, 1.5, -9]
      }
    }
  }
}
