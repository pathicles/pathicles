export const freePhotons = {
  name: 'free-photons',
  view: {
    camera: {
      center: [0, 0, 0],
      theta: Math.PI / 2,
      phi: 0,
      distance: 2,

      fovY: Math.PI / 3,
      dTheta: 0.001,
      autorotate: false,
      // rotationDecayTime: 0,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: 1,
      // panDecayTime: 0,
      far: 50,
      near: 0.0001
    }
  },

  runner: {
    prerender: true,
    looping: true,

    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 8
  },

  model: {
    bufferLength: 8,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 2,
      particleType: 'PHOTON ELECTRON PROTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, -0.5, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 1.1
    },

    interactions: {
      electricField: [0, 0, 0.091],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
}
