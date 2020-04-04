export const freePhoton = {
  view: {
    camera: {
      center: [0, -0.5, 0],
      theta: Math.PI / 2,
      phi: Math.PI / 4,
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
    // stageGrid: {
    //   resolution: 256,
    //   y: -1,
    //   size: 1,
    //   dark: 1,
    //   light: 0.8
    // },
  },

  runner: {
    prerender: true,
    looping: true,

    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 10
  },

  model: {
    bufferLength: 11,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 1,
      particleType: 'PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 0, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 10
    },

    interactions: {
      electricField: [0, 0, 0.01],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
}
