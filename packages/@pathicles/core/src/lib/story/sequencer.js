// based on https://github.com/rreusser/rreusser.github.io/blob/master/src/src/flamms-paraboloid/sequencer.js
/* eslint-env browser */

import bspline from 'b-spline'
import { config } from '@pathicles/config'
import { VariableBuffers } from '../simulation/utils/pingPongVariableBuffers'

import { colorCorrection } from '../simulation/utils/colorCorrection'

export default function (regl, scenes, stateVars, onStateChange) {
  let t = 0
  scenes.forEach((scene, s) => {
    scene.presetName = scene.pathicles.preset
    scene.configuration = config(scene.presetName)

    const RTTFloatType = 'float'
    const channelsPerValueCount = scene.configuration.channelsPerValueCount
    const particleCount = 128 //scene.configuration.model.emitter.particleCount
    const bufferLength = scene.configuration.bufferLength || 128

    const particleColorsAndTypes = regl.texture({
      data: Array(particleCount * 4),
      shape: [particleCount, 1, 4]
    })

    scene.variables = {
      referencePoint: [0, 0, 0],
      channelsPerValueCount,
      bufferLength,
      particleCount,
      pingPong: 0,
      tick: { value: bufferLength },
      particleColorsAndTypes,
      colorCorrections,
      position: new VariableBuffers(
        regl,
        particleCount,
        bufferLength,
        RTTFloatType,
        channelsPerValueCount,
        []
      )
    }

    if (scene.data) {
      scene.data().then(({ data }) => {
        performance.mark('scene data')
        scene.variables.position.load(data.position)

        scene.variables.particleColorsAndTypes({
          data: data.particleTypes
            .map((p) => scene.configuration.colors[p].concat(p))
            .flat(),
          shape: [particleCount, 1, 4],
          type: RTTFloatType
        })

        // if (scene.presetName === 'story-electric')
        //   console.log({ name: scene.presetName, position: data.position })
        const colorCorrections = colorCorrection(
          scene.variables.position.fourPositions,
          scene.configuration.model.emitter.position
        )

        scene.variables.colorCorrections({
          data: data.particleTypes
            .map((p, i) => [colorCorrections[i], 0, 0, 0])
            .flat(),
          shape: [particleCount, 1, 4],
          type: RTTFloatType
        })
      })
    }

    scene.model = {
      halfDeltaTOverC: scene.configuration.model.tickDurationOverC / 2,
      particleCount: particleCount,
      particleTypes: scene.data ? scene.data.particleTypes : [],
      bufferLength: bufferLength,
      stepCount: scene.configuration.runner.stepCount,
      boundingBoxSize: scene.configuration.model.boundingBoxSize,
      interactions: {
        particleInteraction:
          scene.configuration.model.interactions.particleInteraction,
        electricField: scene.configuration.model.interactions.electricField,
        magneticField: scene.configuration.model.interactions.magneticField
      }
    }
    scene._s = s
    scene._t0 = t
    scene._t0_normalized = t / scenes.duration
    scene._t1 = t + scene.duration
    scene._t1_normalized = scene._t1 / scenes.duration
    t = scene._t1
    if (scene.cameraSploints)
      if (scene.cameraSploints.eye) {
        scene.cameraPositionBSpline = (t) =>
          bspline(t, 2, scene.cameraSploints.eye)

        if (scene.cameraSploints.center) {
          scene.cameraTargetBSpline = (t) =>
            bspline(t, 2, scene.cameraSploints.center)
        }
      }
  })

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
    state.activeSceneProgress =
      ((t - state.scene._t0_normalized) * scenes.duration) /
      state.scene.duration

    state.viewRange =
      state.activeSceneProgress < 0.5
        ? [0, state.activeSceneProgress * 2]
        : [state.activeSceneProgress * 2 - 1, 1]
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
