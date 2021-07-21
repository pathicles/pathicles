import { RUNNER_MODE } from '../constants'

export default {
  name: 'free-electrons',
  view: {
    camera: {
      center: [0, 1, 0],
      theta: 0.001,
      phi: 0.001,
      distance: 8.75
    }
  },

  runner: {
    prerender: true,
    mode: RUNNER_MODE.NOBREAK,
    packFloat2UInt8: false,
    loops: 0,
    iterationsPerSnapshot: 1,
    iterationCount: 100,
    snapshotCount: 11,
    iterationDurationOverC: 0.1
    // // iterationsPerSnapshot: 1,
    // // snapshotCount: 128,
    // iterationDurationOverC: 0.025,
    // packFloat2UInt8: false
  },

  model: {
    emitter: {
      // particleCount: 32,
      particleType: 'ELECTRON'
      // bunchShape: 'SPIRAL_XY',
      // gamma: 10
    },
    lattice: {
      elements: {},
      beamline: [],
      origin: {
        phi: 0,
        position: [0, 1, -5]
      }
    }
  }
}
