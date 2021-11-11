// based on https://github.com/rreusser/rreusser.github.io/blob/master/src/src/flamms-paraboloid/sequencer.js
/* eslint-env browser */

import bspline from 'b-spline'

import { variableTexture } from '../simulation/utils/variableTexture'
import { PARTICLE_TYPES } from '@pathicles/config'
import { isLittleEndian } from '../utils/little-endian'
import { Lattice } from '../simulation/lattice/lattice.js'
export default function (regl, scenes, stateVars, onStateChange) {
  let t = 0
  scenes.forEach((scene, s) => {
    scene.loaded = false
    const numberType = 'float'
    const particleCount = 64 //scene.configuration.model.emitter.particleCount
    const snapshotCount = 128

    scene.variables = {
      snapshotCount,
      particleCount,
      iterations: 127,
      pingPong: 0,
      segments: particleCount * (snapshotCount - 1),
      iteration: snapshotCount,
      littleEndian: isLittleEndian()
    }
    scene._s = s
    scene._t0 = t
    scene._t0_normalized = t / scenes.duration
    scene._t1 = t + scene.duration
    scene._t1_normalized = scene._t1 / scenes.duration
    t = scene._t1

    scene.data().then(({ data, name, configuration }) => {
      scene.preset = name
      scene.configuration = configuration
      scene.runner = scene.configuration.runner
      scene.model = scene.configuration.model
      scene.variables.position = {
        buffers: [
          variableTexture(
            regl,
            {
              width: scene.runner.snapshotCount * 4,
              height: scene.model.emitter.particleCount
            },
            numberType,
            new Float32Array(data.position.map((p) => [p, 0, 0, 0]).flat())
          )
        ]
      }

      scene.variables.particleColorsAndTypes = regl.texture({
        data: data.particleTypes
          .map((p) => PARTICLE_TYPES[p].color.concat(p))
          .flat(),
        shape: [particleCount, 1, 4]
      })

      scene.variables.colorCorrections = regl.texture({
        data: data.colorCorrections.map((c) => [c, 0, 0, 0]).flat(),
        shape: [particleCount, 1, 4],
        type: 'float'
      })
      scene.model = {
        lattice: new Lattice(scene.model.lattice),
        boundingBoxSize: configuration.model.boundingBoxSize,
        interactions: {
          particleInteraction:
            configuration.model.interactions.particleInteraction,
          electricField: configuration.model.interactions.electricField,
          magneticField: configuration.model.interactions.magneticField
        }
      }

      scene.cameraBSplines = {
        distance: (x) => bspline(x, 2, scene.cameraSploints.distance),
        phi: (x) => bspline(x, 2, scene.cameraSploints.phi),
        theta: (x) => bspline(x, 2, scene.cameraSploints.theta),
        centerX: (x) => bspline(x, 2, scene.cameraSploints.centerX),
        centerY: (x) => bspline(x, 2, scene.cameraSploints.centerY),
        centerZ: (x) => bspline(x, 2, scene.cameraSploints.centerZ)
      }
      scene.loaded = true
    })
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
    state.sceneProgress =
      ((t - state.scene._t0_normalized) * scenes.duration) /
      state.scene.duration

    state.viewRange = [state.sceneProgress - 0.5, state.sceneProgress]
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
