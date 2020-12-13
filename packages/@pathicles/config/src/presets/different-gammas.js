import defaultConfig from './_default'
import { RUNNER_MODE } from '../constants'

export default {
  name: 'different-gammas',
  view: {
    pathicleRelativeGap: 1,
    pathicleRelativeHeight: 5,
    pathicleWidth: 0.01,
    camera: {
      center: [0, 0.8, 0],
      distance: 3,
      theta: -(2 * Math.PI) / (360 / 0),
      phi: (2 * Math.PI) / (360 / 10)
    }
  },

  runner: {
    prerender: true,
    mode: RUNNER_MODE.FRAMEWISE,

    loops: 0,
    iterationsPerSnapshot: 1,
    iterations: 10,
    snapshotCount: 11,
    iterationDurationOverC: 0.1
  },

  debug: {
    logPushing: false
  },

  model: {
    emitter: {
      particleCount: 60,
      particleSeparation: 0.0,
      particleType: 'PHOTON ELECTRON PROTON',
      bunchShape: 'ROW',
      direction: [0, 0, -1],
      position: ({ p }) => [
        (Math.floor(p / 3) - 10) / 10 + (p % 3) * 0.025,
        ((defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight) /
          2) *
          2,
        0
      ],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: ({ p }) => 1 + Math.floor(p / 3) / 50 //1.55
    }
  }
}
