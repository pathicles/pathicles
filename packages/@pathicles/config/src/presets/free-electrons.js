import { defaultConfig } from './_default'
import { RUNNER_MODE } from '../constants'

export const freeElectrons = {
  name: 'free-electrons',
  view: {
    camera: {
      center: [0, 0, 0.5],
      distance: 2,
      phi: (15 / 360) * 2 * Math.PI,
      theta: (45 / 360) * 2 * Math.PI
    }
  },

  runner: {
    prerender: false,
    mode: RUNNER_MODE.STEPWISE,

    loops: 0,
    iterationsPerSnapshot: 2,
    iterations: 10,
    snapshotCount: 6,
    iterationDurationOverC: 0.1
  },

  debug: {
    logPushing: false
  },

  model: {
    emitter: {
      position: [
        0,
        (0 *
          (defaultConfig.view.pathicleWidth *
            defaultConfig.view.pathicleRelativeHeight)) /
          2,
        0
      ],
      direction: [0, 0, 1],
      particleSeparation: 0.1,
      gamma: 10,
      particleCount: 5,
      bunchShape: 'ROW',
      particleType: 'ELECTRON',
      positionJitter: [0, 0, 0]
    }
  }
}
