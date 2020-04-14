export const freePhoton = {
  name: 'free-photon',
  view: {
    camera: {
      center: [0, -1, 0.5],
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
      near: 0.0001
    }
  },

  runner: {
    prerender: true,
    looping: false,

    mode: 'framewise',
    stepsPerTick: 2,
    stepCount: 11
  },

  model: {
    bufferLength: 11,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 1,
      particleType: 'PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, -1, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 0
    },

    interactions: {
      electricField: [0, 0, 0.01],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
}
