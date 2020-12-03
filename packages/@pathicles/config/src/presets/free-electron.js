import { defaultConfig } from './_default'
import { RUNNER_MODE } from '../constants'

export const freeElectron = {
  name: 'free-electron',
  view: {
    camera: {
      center: [0, 0, 0.5],
      distance: 2,
      phi: (15 / 360) * 2 * Math.PI,
      theta: (45 / 360) * 2 * Math.PI
    }
  },

  debug: {
    logPushing: true
  },

  runner: {
    prerender: false,
    mode: RUNNER_MODE.STEPWISE,

    loops: 0,
    iterationsPerSnapshot: 2,
    iterations: 20,
    snapshotCount: 12,
    iterationDurationOverC: 0.1
  },

  model: {
    emitter: {
      position: [
        0,
        ((defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight) /
          2) *
          3,
        0
      ],
      direction: [0, 0, 1],
      particleSeparation: 0.0,
      gamma: 1.1,
      particleCount: 1,
      bunchShape: 'ROW',
      particleType: 'ELECTRON',
      positionJitter: [0, 0, 0]
    }
  }
}
