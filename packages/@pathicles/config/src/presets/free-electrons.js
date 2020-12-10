import { defaultConfig } from './_default'
import { RUNNER_MODE } from '../constants'

export const freeElectrons = {
  name: 'free-electrons',
  view: {
    camera: {
      center: [0, 1, 0],
      distance: 4,
      //   center: [0.5, 0, 0],
      theta: -(2 * Math.PI) / (360 / 0),
      phi: (2 * Math.PI) / (360 / 10)
      //   distance: 0.5
    }
  },

  runner: {
    prerender: true,
    mode: RUNNER_MODE.FRAMEWISE,

    loops: 0,
    iterationsPerSnapshot: 1,
    iterations: 10,
    snapshotCount: 32,
    iterationDurationOverC: 0.1
  },

  debug: {
    logPushing: false
  },

  model: {
    emitter: {
      particleCount: 3,
      particleSeparation: 0.0,
      particleType: 'PHOTON ELECTRON PROTON',
      bunchShape: 'ROW',
      direction: [0, 0, -1],
      position: ({ p }) => [
        (p - 16) / 2 / 10,
        (defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight) /
          2,
        0
      ],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: ({ p }) => 1 + Math.floor(p / 3) / 20 //1.55
    }
  }
}
