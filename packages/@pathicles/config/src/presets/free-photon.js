import { defaultConfig } from './_default'
import { RUNNER_MODE } from '../constants'
export const freePhoton = {
  name: 'free-photon',

  debug: {
    logPushing: true
  },

  view: {
    camera: {
      eye: [2, 0.25, 2],
      center: [0, 0, 0.5]
    }
  },
  runner: {
    prerender: false,
    loops: 0,

    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerSnapshot: 1,
    iterations: 10,
    snapshotCount: 11,
    iterationDurationOverC: 0.1
  },

  model: {
    emitter: {
      particleCount: 1,
      particleType: 'PHOTON',
      direction: [0, 0, 1],
      position: [
        0,
        ((defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight) /
          2) *
          2,
        0
      ],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 1
    },

    interactions: {
      electricField: [0, 0, 0],
      particleInteraction: false,
      magneticField: [0, 0, 0]
    }
  }
}
