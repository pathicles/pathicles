import defaultConfig from './_default'
import { RUNNER_MODE } from '../constants'

export const freeElectron = {
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
    prerender: false,
    mode: RUNNER_MODE.STEPWISE,

    loops: 1,
    iterationsPerTick: 1,
    iterationCount: 10
  },

  model: {
    bufferLength: 11,
    iterationDurationOverC: 0.1,
    emitter: {
      position: [
        0,
        (defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight) /
          2,
        0
      ],
      direction: [1, 1, 1],
      particleSeparation: 1,
      gamma: 1,
      particleCount: 2,
      particleType: 'ELECTRON'
    }
  }
}
