// based on https://github.com/rreusser/rreusser.github.io/blob/master/src/src/flamms-paraboloid/sequencer.js
/* eslint-env browser */

import bspline from 'b-spline'

import { colorCorrection } from '../simulation/utils/colorCorrection'
import { variableTexture } from '../simulation/utils/variableTexture'

export default function (regl, scenes, stateVars, onStateChange) {
  let t = 0
  scenes.forEach((scene, s) => {
    // scene.data().then(({ data }) => {
    const { data, configuration } = scene.data
    scene.presetName = configuration.presetName
    scene.configuration = configuration

    const variableType = 'float32'
    const particleCount = scene.configuration.model.emitter.particleCount
    const bufferLength = scene.configuration.model.bufferLength

    const particleColorsAndTypes = regl.texture({
      data: Array(particleCount * 4),
      shape: [particleCount, 1, 4]
    })

    // const colorCorrections = regl.texture({
    //   data: Array(particleCount * 4),
    //   shape: [particleCount, 1, 4],
    //   type: variableType
    // })

    scene.variables = {
      referencePoint: [0, 0, 0],
      // colorCorrections,
      bufferLength,
      particleCount,
      iterations: 128,
      pingPong: 0,
      iteration: bufferLength,
      particleColorsAndTypes,
      position: {
        buffers: [
          variableTexture(
            regl,
            {
              width: particleCount,
              height: bufferLength * 4
            },
            variableType,
            new Float32Array(data.position)
          )
        ]
      }
    }

    performance.mark('scene data')
    scene.variables.particleColorsAndTypes({
      data: data.particleTypes
        .map((p) => scene.configuration.colors[p].concat(p))
        .flat(),
      shape: [particleCount, 1, 4]
    })

    const initialPosition = data.position.slice(-particleCount * 4)
    const particles = new Array(particleCount)
      .fill(0)
      .map((_, i) => [
        initialPosition[i * 4],
        initialPosition[i * 4 + 1],
        initialPosition[i * 4 + 2],
        initialPosition[i * 4 + 3]
      ])
    // // console.log(particles)
    // const colorCorrectionData = colorCorrection(
    //   particles,
    //   configuration.model.emitter.position
    // )
    // console.log(
    //   data.position,
    //   configuration.model.emitter.position,
    //   colorCorrectionData
    // )

    scene.variables.colorCorrections = colorCorrection(
      regl,
      'float',
      particles,
      configuration.model.emitter.position
    )

    // ({
    //   data: data.particleTypes
    //     .map((p, i) => [colorCorrectionData[i], 0, 0, 0])
    //     .flat(),
    //   shape: [particleCount, 1, 4],
    //   type: variableType
    // })

    scene.model = {
      boundingBoxSize: configuration.model.boundingBoxSize,
      interactions: {
        particleInteraction:
          configuration.model.interactions.particleInteraction,
        electricField: configuration.model.interactions.electricField,
        magneticField: configuration.model.interactions.magneticField
      }
    }
    scene._s = s
    scene._t0 = t
    scene._t0_normalized = t / scenes.duration
    scene._t1 = t + scene.duration
    scene._t1_normalized = scene._t1 / scenes.duration
    t = scene._t1
    scene.cameraBSplines = {
      distance: (x) => bspline(x, 2, scene.cameraSploints.distance),
      phi: (x) => bspline(x, 2, scene.cameraSploints.phi),
      theta: (x) => bspline(x, 2, scene.cameraSploints.theta),
      centerX: (x) => bspline(x, 2, scene.cameraSploints.centerX),
      centerY: (x) => bspline(x, 2, scene.cameraSploints.centerY),
      centerZ: (x) => bspline(x, 2, scene.cameraSploints.centerZ)
    }
  })
  // })

  const state = {
    sceneIdx: 0,
    scene: scenes[0]
  }
  const changed = {}

  function computeState(t) {
    // let newValue
    if (t > 1) t = 1
    const sceneIdx = (
      scenes.find(
        (scene) => scene._t0_normalized <= t && t <= scene._t1_normalized
      ) || { _s: 0 }
    )._s

    if (
      sceneIdx !== state.sceneIdx &&
      sceneIdx >= 0 &&
      sceneIdx < scenes.length
    ) {
      changed.sceneIdx = { from: state.sceneIdx, to: sceneIdx }
      state.sceneIdx = sceneIdx
      state.scene = scenes[sceneIdx]
    } else {
      delete changed.sceneIdx
    }
    state.sceneProgress =
      ((t - state.scene._t0_normalized) * scenes.duration) /
      state.scene.duration

    state.viewRange = [state.sceneProgress - 0.1, state.sceneProgress + 0.1]
    // state.sceneProgress < 0.5
    //   ? [0, state.sceneProgress * 2]
    //   : [state.sceneProgress * 2 - 1, 1]
    return Object.keys(changed).length > 0
  }

  let currentPosition = 0
  computeState(currentPosition)

  const self = {
    setPosition: function (t) {
      currentPosition = t
      const hasChanges = computeState(t)
      if (hasChanges) {
        onStateChange && onStateChange(state, changed)
      }
      return self
    },
    getPosition: function () {
      return currentPosition
    },
    getState: function () {
      return state
    }
  }

  return self
}
