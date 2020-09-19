import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export default {
  name: 'gyrotest-1-electron',
  view: {
    camera: {
      center: [0.5, 0, 0],
      theta: (2 * Math.PI) / (360 / 45),
      phi: (2 * Math.PI) / (360 / 15),
      distance: 0.5
    }
  },

  runner: {
    stepsPerTick: 2,
    stepCount: 27
  },

  model: {
    bufferLength: 27,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 1,
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 0, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 310
    },

    lattice: {
      elements: {
        l0: {
          type: LatticeElementTypes.SBEN,
          l: 20,
          strength: 1.3
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
