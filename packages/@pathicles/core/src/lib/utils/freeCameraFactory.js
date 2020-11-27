/* eslint-env browser */

import camera from './inertial-turntable-camera.js'

import interactionEvents from './normalized-interaction-events'
import { Lethargy } from './Lethargy.js'
import merge from 'lodash-es/merge'

export default function (regl, params) {
  const cameraParams = {}
  merge(cameraParams, params)

  const aCamera = camera(cameraParams)
  aCamera.updateParams = (newParams) => {
    merge(aCamera.params, newParams)
  }

  initializeCameraControls(aCamera, regl && regl._gl.canvas, params)

  aCamera.toConfig = () => {
    return {
      center: aCamera.params.center,
      theta: aCamera.params.theta,
      phi: aCamera.params.phi,
      distance: aCamera.params.distance
    }
  }

  aCamera.toggleAutorotate = () => {
    params.autorotate.enabled = !params.autorotate.enabled

    if (params.autorotate.enabled) {
      aCamera.startAutorotate()
    }
  }
  aCamera.stopAutorotate = () => {
    params.autorotate.enabled = false
  }
  aCamera.autorotateParams = { ...aCamera.params }
  aCamera.startAutorotate = () => {
    aCamera.autorotateParams = { ...aCamera.params }
    aCamera.autorotateT0 = Date.now()
  }
  aCamera.doAutorotate = () => {
    if (params.autorotate.enabled) {
      const dt = (Date.now() - aCamera.autorotateT0) / 1000
      // aCamera.params.distance =
      //   aCamera.autorotateParams.distance +
      //   0.1 * Math.sin(autorotateSpeedDistance * dt)
      aCamera.params.theta =
        aCamera.autorotateParams.theta + params.autorotate.dTheta * dt
      aCamera.params.phi =
        aCamera.autorotateParams.phi +
        0.05 * Math.sin(params.autorotate.dPhi * dt)
    }
  }

  params.autorotate.enabled && aCamera.startAutorotate()

  aCamera.setCameraUniforms = regl({
    uniforms: {
      projection: (ctx, camera) => {
        // camera.resize(ctx.viewportWidth / ctx.viewportHeight)
        return camera.state.projection
      },
      view: (ctx, camera) => camera.state.view,
      eye: (ctx, camera) => camera.state.eye
    }
  })
  return aCamera
}

function initializeCameraControls(camera, canvas, options) {
  const lethargy = new Lethargy()

  const radiansPerHalfScreenWidth = Math.PI * 0.5

  interactionEvents(canvas)
    .on('wheel', function (ev) {
      options.autorotate.enabled = false

      if (!ev.active) return
      if (lethargy.check(ev) !== false) {
        if (camera.params.distance <= options.maxDistance)
          camera.zoom(ev.x, ev.y, 0.2 * (Math.exp(-ev.dy) - 1.0))
        camera.params.distance = Math.max(
          options.minDistance,
          Math.min(options.maxDistance, camera.params.distance)
        )
      }
    })
    .on('mousemove', function (ev) {
      if (!ev.active || ev.buttons !== 1) return
      options.autorotate.enabled = false
      if (ev.mods.shift) {
        camera.pan(ev.dx, ev.dy)
      } else if (ev.mods.meta) {
        // camera.pivot(ev.dx, ev.dy)
      } else {
        // camera.pivot(ev.dx, ev.dy)
        options.autorotate.enabled = false
        camera.rotate(
          -ev.dx * radiansPerHalfScreenWidth,
          -ev.dy * radiansPerHalfScreenWidth
        )
      }
    })
    .on('touchmove', function (ev) {
      options.autorotate.enabled = false
      if (!ev.active) return
      camera.rotate(
        -ev.dx * radiansPerHalfScreenWidth,
        -ev.dy * radiansPerHalfScreenWidth
      )
    })
}
