import { RUNNER_MODE } from '../constants'
import { boundedRandom } from '@pathicles/core/src/lib/utils/random'

export default {
  name: 'random',
  view: {
    camera: {
      distance: 6,
      theta: 45 * (Math.PI / 180),
      phi: 2 * (Math.PI / 180)
    }
  },

  runner: {
    prerender: true,
    loops: 0,

    mode: RUNNER_MODE.FRAMEWISE,
    iterationsPerTick: 1,
    iterationsPerSnapshot: 1,
    iterations: 64,
    snapshotCount: 16,
    iterationDurationOverC: 0.2
  },

  model: {
    boundingBoxSize: 1,
    // boundingBoxCenter: [0, 2, 0],
    emitter: {
      position: [0, 1, 0],
      direction: () => [boundedRandom(), boundedRandom(), boundedRandom()],
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
