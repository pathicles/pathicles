import { RUNNER_MODE } from '../constants'
import { boundedRandom } from '@pathicles/core/src/lib/utils/random'

export default {
  name: 'random',
  view: {
    camera: {
      distance: 6,
      phi: (5 / 360) * 2 * Math.PI,
      theta: (45 / 360) * 2 * Math.PI
    }
  },

  runner: {
    prerender: true,
    loops: 0,

    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerTick: 1,
    iterationsPerSnapshot: 1,
    iterations: 16,
    snapshotCount: 128 / 4,
    iterationDurationOverC: 0.05
  },

  model: {
    boundingBoxSize: 1,
    // boundingBoxCenter: [0, 2, 0],
    emitter: {
      position: [0, 1, 0],
      direction: ({ p }) => [boundedRandom(), boundedRandom(), boundedRandom()],
      // bunchShape: 'SQUARE_XZ',
      particleSeparation: 0.1,
      // directionJitter: [1, 1, 1],
      // positionJitter: [0, 0, 0],
      gamma: 2,
      particleCount: 1024,
      particleType: 'PHOTON ELECTRON PROTON'
    }
  }
}
