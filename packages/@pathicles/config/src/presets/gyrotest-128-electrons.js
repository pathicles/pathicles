import { LATTICE_ELEMENT_TYPES, RUNNER_MODE } from '../constants'
import defaultConfig from './_default'

export default {
  name: 'gyrotest-128-electrons',
  view: {
    camera: {
      center: [1, 2, 0],
      distance: 15,
      theta: -90 * (Math.PI / 180),
      phi: 5 * (Math.PI / 180)
    }
  },

  debug: {
    logPushing: false
  },

  runner: {
    prerender: true,
    loops: 0,
    mode: RUNNER_MODE.NOBREAK,
    iterationsPerSnapshot: 1,
    iterationCount: 511,
    snapshotCount: 512,
    iterationDurationOverC: 0.05
  },

  model: {
    emitter: {
      particleCount: 128,
      particleSeparation: 0.05,
      particleType: 'ELECTRON',
      bunchShape: 'ROW_Y',
      // direction: [0, 0.15, 1],
      // position: () => [
      //   0,
      //   defaultConfig.view.pathicleWidth *
      //     defaultConfig.view.pathicleRelativeHeight *
      //     2,
      //   0
      // ],
      // directionJitter: [0, 0, 0],
      // positionJitter: [0, 0, 0],
      gamma: ({ p }) => Math.log10(1 * p + 1)
    },
    interactions: {
      particleInteraction: false,
      electricField: [0, 0, 0],
      magneticField: [0, 0.0005, 0]
    },
    lattice: {
      // elements: {
      //   l0: {
      //     type: LATTICE_ELEMENT_TYPES.SBEN,
      //     l: 20,
      //     strength: 0.00075
      //   }
      // },
      // beamline: ['l0'],
      origin: {
        phi: 0,
        position: [
          0,
          defaultConfig.view.pathicleWidth *
            defaultConfig.view.pathicleRelativeHeight *
            2,
          0
        ]
      }
    }
  }
}
