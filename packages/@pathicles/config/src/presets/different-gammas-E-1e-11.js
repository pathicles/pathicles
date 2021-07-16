import defaultConfig from './_default'
import { RUNNER_MODE } from '../constants'

export default {
  name: 'different-gammas-E-1e-11',
  view: {
    pathicleRelativeGap: 1,
    pathicleRelativeHeight: 3,
    pathicleWidth: 0.005,
    camera: {
      center: [0, 0.5, -0.8],
      distance: 4,
      theta: 0 * (Math.PI / 180),
      phi: 20 * (Math.PI / 180)
    }
  },

  runner: {
    prerender: true,
    mode: RUNNER_MODE.NOBREAK,

    loops: 0,
    iterationsPerSnapshot: 1,
    iterationCount: 10,
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
      bunchShape: 'ROW_X',
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
      gamma: ({ p }) => 1 + Math.floor(p / 3) / 50
    },
    interactions: {
      electricField: [0, 0, -1e-11],
      particleInteraction: false,
      magneticField: [0, 0, 0]
    }
  }
}
