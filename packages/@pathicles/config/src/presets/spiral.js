export default {
  name: 'spiral',
  view: {
    camera: {
      center: [0, 1.5, 0],
      distance: 5,
      theta: 90 * (Math.PI / 180),
      phi: 1 * (Math.PI / 180)
    }
  },
  runner: {
    iterationDurationOverC: 0.1,
    iterationsPerSnapshot: 1,
    iterationCount: 256 * 1 - 1,
    snapshotCount: 256
  },

  model: {
    emitter: {
      bunchShape: 'SPIRAL_XY',
      direction: [0, 0.2, 1],

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
