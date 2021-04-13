import defaultConfig from './_default'
import { C, RUNNER_MODE } from '../constants'

export default {
  name: 'free-photon',

  debug: {
    logPushing: true,
    logPerformance: false
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
    prerender: false,
    loops: 0,

    // mode: RUNNER_MODE.NOBREAK,
    iterationsPerSnapshot: 1,
    iterationCount: 10,
    snapshotCount: 11,
    iterationDurationOverC: 0.1
  },

  model: {
    boundingBoxSize: 0,
    boundingBoxCenter: [0, 0, 0],
    emitter: {
      particleCount: 1,
      particleType: 'PHOTON',
      direction: [1, 2, 1],
      position: [
        0,
        (defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight) /
        2,
        0
      ],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 2
    },

    interactions: {
      electricField: [0, 0, 0],
      particleInteraction: false,
      magneticField: [0, 0, 0]
    }
  }
}
