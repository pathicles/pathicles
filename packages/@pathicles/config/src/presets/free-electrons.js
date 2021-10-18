export default {
  name: 'free-electrons',
  view: {
    camera: {
      center: [0, 1, 0],
      theta: 0,
      phi: 0.0,
      distance: 2
    }
  },

  runner: {
    snapshotCount: 35,
    iterationDurationOverC: 0.1
  },

  model: {
    emitter: {
      particleCount: 129,
      particleType: 'ELECTRON',
      gamma: 10
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
