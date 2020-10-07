import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export default {
  name: 'gyrotest-1-electron',
  view: {
    camera: {
      position: [3, 3, 0],
      target: [0, 0, 0]
      //   center: [0.5, 0, 0],
      //   theta: (2 * Math.PI) / (360 / 45),
      //   phi: (2 * Math.PI) / (360 / 15),
      //   distance: 0.5
    }
  },

  runner: {
    stepsPerTick: 8,
    stepCount: 83
  },

  model: {
    bufferLength: 128,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 1,
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [-1, 0, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 1.55
    },

    lattice: {
      elements: {
        l0: {
          type: LatticeElementTypes.SBEN,
          l: 20,
          strength: 0.002
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
