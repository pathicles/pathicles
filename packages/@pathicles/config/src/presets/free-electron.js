import defaultConfig from './_default'


export default {
  name: 'free-electron',
  view: {
    camera: {
      center: [0, 0, 0.5],
      distance: 3,
      phi: (15 / 360) * 2 * Math.PI,
      theta: (45 / 360) * 2 * Math.PI
    }
  },

  runner: {
    snapshotCount: 11,
    iterationDurationOverC: 0.1
  },

  model: {
    emitter: {
      gamma: 10,
      particleCount: 1,
      particleType: 'ELECTRON'
    },
    lattice: {
      origin: {
        position: [
          0,
          defaultConfig.view.pathicleWidth *
            defaultConfig.view.pathicleRelativeHeight,
          0
        ]
      }
    }
  }
}
