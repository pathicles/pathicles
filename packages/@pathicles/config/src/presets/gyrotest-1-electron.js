import { LatticeElementTypes } from '@pathicles/core/src/lib/simulation/lattice/lattice'

export default {
  name: 'gyrotest-1-electron',
  view: {
    camera: {
      center: [0.5, -1, 0],
      theta: (2 * Math.PI) / (360 / 45),
      phi: (2 * Math.PI) / (360 / 15),
      distance: 1,

      fovY: Math.PI / 3,
      dTheta: 0.001,
      autorotate: false,
      // rotationDecayTime: 0,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: 1,
      // panDecayTime: 0,
      far: 50,
      near: 0.0002
    }
  },

  runner: {
    stepsPerTick: 2,
    stepCount: 37
  },

  model: {
    bufferLength: 37,
    tickDurationOverC: 5.94985880215349239057744464763e-2,
    emitter: {
      particleCount: 1,
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, -1, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 200
    },

    lattice: {
      elements: {
        l0: {
          type: LatticeElementTypes.SBEN,
          l: 20,
          strength: 1
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
