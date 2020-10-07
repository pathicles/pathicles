export const freePhotons = {
  name: 'free-photons',
  view: {
    camera: {
      center: [0, 0, 0.5],
      theta: Math.PI / 4,
      phi: Math.PI / 8,
      distance: 1.5,

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
    loops: 1,

    mode: 'framewise',
    stepsPerTick: 8,
    stepCount: 200
  },

  model: {
    bufferLength: 200,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 484,
      particleType: 'PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 1, -10],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 1
    },

    interactions: {
      electricField: [0, 0, 0],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
}
