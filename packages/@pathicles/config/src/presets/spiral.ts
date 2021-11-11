export default {
  name: 'spiral',
  view: {
    camera: {
      center: [0, 1.5, 0],
      distance: 2,
      theta: 95 * (Math.PI / 180),
      phi: 2 * (Math.PI / 180)
    }
  },
  runner: {
    // iterationDurationOverC: 0.1,
    // iterationsPerSnapshot: 1,
    iterationCount: 1024 * 1 - 1,
    snapshotCount: 1024
  },

  model: {
    emitter: {
      bunchShape: 'SPIRAL_XY',
      direction: [0, 0.15, 1],
      particleCount: 256,
      gamma: 5
    },
    interactions: {
      magneticField: [0, 0.01, 0],
      particleInteraction: false
    },
    lattice: {
      beamline: [],
      origin: {
        phi: 0,
        position: [0, 0, 0]
      }
    }
  }
}
