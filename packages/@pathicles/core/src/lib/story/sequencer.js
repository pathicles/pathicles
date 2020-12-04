// based on https://github.com/rreusser/rreusser.github.io/blob/master/src/src/flamms-paraboloid/sequencer.js
/* eslint-env browser */

import bspline from 'b-spline'

import { ColorCorrector } from '../simulation/utils/colorCorrection'
import { variableTexture } from '../simulation/utils/variableTexture'
import { PARTICLE_TYPES } from '@pathicles/config'

export default function (regl, scenes, stateVars, onStateChange) {
  let t = 0
  scenes.forEach((scene, s) => {
    // scene.data().then(({ data }) => {
    const { data, configuration } = scene.data
    scene.presetName = configuration.presetName
    scene.configuration = configuration

    const variableType = 'float32'
    const particleCount = scene.configuration.model.emitter.particleCount
    const snapshotCount = scene.configuration.runner.snapshotCount

    const particleColorsAndTypes = regl.texture({
      data: Array(particleCount * 4),
      shape: [particleCount, 1, 4]
    })

    // let image = new Image()
    // image.src =
    //
    // document.getElementById('storyDipolePNG')

    // const imageTexture = regl.texture(128, 121)

    // console.log()
    //
    // const emptyTextureDimension = {
    //   width: 128,
    //   height: 121,
    //   channels: 4
    // }
    //
    // function loadImageIntoTexture(url, texture) {
    //   const image = new Image()
    //   image.crossOrigin = 'anonymous'
    //   image.src = url
    //   image.onload = function () {
    //     texture({ data: image })
    //     console.log({ texture, image })
    //   }
    // }
    //
    // const imgTexture = regl.texture(emptyTextureDimension)
    // loadImageIntoTexture('story-quadrupole.png', imgTexture)

    scene.runner = scene.configuration.runner
    scene.model = scene.configuration.model

    // const position = data.position2 //new Float32Array(new Uint8Array(data.position2).buffer)
    // console.log({ position })
    scene.variables = {
      referencePoint: [0, 0, 0],
      snapshotCount,
      particleCount,
      iterations: 127,
      pingPong: 0,
      segments: particleCount * (snapshotCount - 1),
      iteration: snapshotCount,
      particleColorsAndTypes,
      position: {
        buffers: [
          variableTexture(
            regl,
            {
              width: snapshotCount * 4,
              height: particleCount
            },
            variableType,
            new Float32Array(data.position)
          )
        ]
      }
    }

    performance.mark('scene data')
    scene.variables.particleColorsAndTypes({
      data: data.particleTypes.map((p) => PARTICLE_TYPES[p].color.concat(p)),
      shape: [particleCount, 1, 4]
    })

    // const initialPosition = position.slice(-particleCount * 4)
    // const particles = new Array(particleCount)
    //   .fill(0)
    //   .map((_, i) => [
    //     initialPosition[i * 4],
    //     initialPosition[i * 4 + 1],
    //     initialPosition[i * 4 + 2],
    //     initialPosition[i * 4 + 3]
    //   ])

    // const colorCorrector = new ColorCorrector(
    //   regl,
    //   particles,
    //   configuration.model.emitter.position
    // )

    scene.variables.colorCorrections = regl.texture({
      data: data.colorCorrections.map((c) => [c, 0, 0, 0]).flat(),
      shape: [particleCount, 1, 4],
      type: 'float'
    })
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
