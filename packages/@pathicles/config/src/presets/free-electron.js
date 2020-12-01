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

  runner: {
    prerender: true,
    mode: RUNNER_MODE.FRAMEWISE,

    loops: 0,
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
      direction: [0, 0, 1],
      particleSeparation: 0.0,
      gamma: 10,
      particleCount: 1,
      bunchShape: 'ROW',
      particleType: 'ELECTRON',
      positionJitter: [0, 0, 0]
    }
  }
}
