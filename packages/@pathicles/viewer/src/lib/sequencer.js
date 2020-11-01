// based on https://github.com/rreusser/rreusser.github.io/blob/master/src/src/flamms-paraboloid/sequencer.js
/* eslint-env browser */

import bspline from 'b-spline'
import { config } from '@pathicles/config'
import createVariableTexture from './createVariableTexture'

export default function (regl, scenes, stateVars, onStateChange) {
  let t = 0
  scenes.forEach((scene, s) => {
    scene.presetName = scene.preset
    scene.preset = config(scene.preset)

    scene.particleCount = 128 //scene.preset.model.emitter.particleCount
    scene.bufferLength = scene.preset.model.bufferLength || 128

    scene.particleColorsAndTypes = regl.texture({
      data: Array(scene.particleCount * 4),
      shape: [scene.particleCount, 1, 4]
    })
    scene.initialParticleDistances = regl.texture({
      data: Array(scene.particleCount),
      shape: [scene.particleCount, 1, 1]
    })

    scene.variables = {
      referencePoint: [0, 0, 0],
      pingPong: 0,
      tick: { value: scene.bufferLength },
      position: {
        buffers: [
          createVariableTexture(regl, scene.particleCount, scene.bufferLength)
        ]
      },
      particleColorsAndTypes: scene.particleColorsAndTypes,

      initialData: {
        // initialParticleDistances: scene.initialParticleDistances,
        fourPositions: [],
        emitterPosition: scene.preset.model.emitter.position
      }
    }

    if (scene.data) {
      scene.data().then(({ data }) => {
        performance.mark('scene data')
        scene.variables.position.buffers[0]({
          width: scene.particleCount,
          height: scene.bufferLength * 4,
          min: 'nearest',
          mag: 'nearest',
          format: 'rgba',
          data: new Float32Array(data.position.map((d) => d / 1))
        })

        // if (variables.initialData.fourPositions) {
        //   variables.initialData.fourPositions.set(
        //     data.position.slice(0, scene.particleCount)
        //   )
        //   // console.log(variables.initialData.fourPositions)
        // }
        scene.particleColorsAndTypes({
          data: data.particleTypes
            .map((p) => scene.preset.colors[p].concat(p))
            .flat(),
          shape: [scene.particleCount, 1, 4],
          type: 'float'
        })
      })
    }

    scene.model = {
      halfDeltaTOverC: scene.preset.model.tickDurationOverC / 2,
      particleCount: scene.particleCount,
      particleTypes: scene.data ? scene.data.particleTypes : [],
      bufferLength: scene.bufferLength,
      stepCount: scene.preset.runner.stepCount,
      boundingBoxSize: scene.preset.model.boundingBoxSize,
      // lattice: new Lattice(scene.preset.model.lattice),
      // latticeConfig: scene.preset.model.lattice,
      interactions: {
        gravityConstant: scene.preset.model.interactions.gravityConstant,
        particleInteraction:
          scene.preset.model.interactions.particleInteraction,
        electricField: scene.preset.model.interactions.electricField,
        magneticField: scene.preset.model.interactions.magneticField
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
