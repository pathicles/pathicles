import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'
import { RUNNER_MODE } from '../constants'
import defaultConfig from './_default'

export default {
  name: 'gyrotest-1-electron',
  view: {
    camera: {
      center: [0, 0, 0],
      distance: 5
      //   center: [0.5, 0, 0],
      //   theta: (2 * Math.PI) / (360 / 45),
      //   phi: (2 * Math.PI) / (360 / 15),
      //   distance: 0.5
    }
  },

  runner: {
    prerender: true,
    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerTick: 1,
    iterationCount: 17
  },

  model: {
    bufferLength: 18,
    iterationDurationOverC: (2 * Math.PI) / 1,
    emitter: {
      particleCount: 1,
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE_XY',
      direction: [0, 0, 1],
      position: [
        -1,
        defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight *
          5,
        0
      ],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 1 / Math.sqrt(1 - 0.05867 * 0.05867) //1.55
    },

    lattice: {
      elements: {
        l0: {
          type: LatticeElementTypes.SBEN,
          l: 20,
          strength: 0.0001
        }
      },
      beamline: ['l0'],
      origin: {
        phi: 0,
        position: [0, 0, -10]
      }
    }
  }
}
