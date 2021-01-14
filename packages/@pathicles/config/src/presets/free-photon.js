import defaultConfig from './_default'
import { RUNNER_MODE } from '../constants'

export default {
  name: 'free-photon',

  debug: {
    logPushing: false
  },

  view: {
    camera: {
      center: [0, 0.25, 0.5],
      distance: 2,
      phi: (5 / 360) * 2 * Math.PI,
      theta: (45 / 360) * 2 * Math.PI
    }
  },
  runner: {
    prerender: true,
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
        (defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight) /
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
