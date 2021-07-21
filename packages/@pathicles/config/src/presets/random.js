import { RUNNER_MODE } from '../constants'
let seed = 1
export const random = () => {
  let x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}
export const boundedRandom = (min = -1, max = 1) => random() * (max - min) + min

export default {
  name: 'random',
  view: {
    camera: {
      center: [0, 0.5, 0],
      distance: 8,
      theta: 45 * (Math.PI / 180),
      phi: 5 * (Math.PI / 180)
    }
  },

  runner: {
    prerender: true,
    loops: 2,
    iterationsPerSnapshot: 1,
    iterationCount: 128,
    snapshotCount: 16,
    iterationDurationOverC: 0.1
  },

  model: {
    boundingBoxSize: 1,
    boundingBoxCenter: [0, 1, 0],
    emitter: {
      position: [0, 0.5, 0],
      direction: () => [boundedRandom(), boundedRandom(), boundedRandom()],
      particleSeparation: 0.1,
      gamma: 10,
      bunchShape: 'SQUARE_YZ',
      particleCount: 512,
      particleType: 'PHOTON ELECTRON PROTON'
    }
  }
}
