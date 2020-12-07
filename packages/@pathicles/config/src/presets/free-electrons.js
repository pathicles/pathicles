import { defaultConfig } from './_default'
import { RUNNER_MODE } from '../constants'

export const freeElectrons = {
  name: 'free-electrons',
  view: {
    camera: {
      center: [0, 3, 0.5],
      distance: 0.01,
      phi: (0 / 360) * 2 * Math.PI,
      theta: (0 / 360) * 2 * Math.PI
    }
  },

  runner: {
    prerender: true,
    mode: RUNNER_MODE.FRAMEWISE,

    loops: 0,
    iterationsPerSnapshot: 2,
    iterations: 255,
    snapshotCount: 128,
    iterationDurationOverC: 0.1
  },

  debug: {
    logPushing: false
  },

  model: {
    emitter: {
      position: [
        0,
        3 +
          (0 *
            (defaultConfig.view.pathicleWidth *
              defaultConfig.view.pathicleRelativeHeight)) /
            2,
        -10
      ],
      direction: [0, 0, 1],
      particleSeparation: 0.1,
      gamma: 10,
      particleCount: 1024,
      bunchShape: 'SQUARE_XY',
      particleType: 'ELECTRON',
      positionJitter: [0, 0, 0]
    }
  }
}
