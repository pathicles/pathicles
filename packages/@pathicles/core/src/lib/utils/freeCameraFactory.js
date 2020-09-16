/* eslint-env browser */

import camera from 'inertial-turntable-camera'

import interactionEvents from 'normalized-interaction-events'
import invert from 'gl-mat4/invert'

export default function (options, regl) {
  const { position, target } = options
  const p = [
    -target[0] + position[0],
    -target[1] + position[1],
    -target[2] + position[2]
  ]

  const distance = Math.sqrt(p[0] * p[0] + p[1] * p[1] + p[2] * p[2])
  const phi = Math.atan2(p[1], p[0])
  const theta = Math.atan2(Math.sqrt(p[0] * p[0] + p[1] * p[1]), p[2])

  const aCamera = camera({
    ...{ ...options, distance, phi, theta, center: target },
    aspectRatio: regl._gl.canvas.clientWidth / regl._gl.canvas.clientHeight
  })
  initializeCameraControls(aCamera, regl._gl.canvas, {
    minDistance: options.minDistance || 0.1,
    maxDistance: options.maxDistance || 20
  })

  aCamera.toConfig = () => {
    return {
      center: aCamera.params.center,
      theta: aCamera.params.theta,
      phi: aCamera.params.phi,
      distance: aCamera.params.distance
    }
  }

  const setCameraUniforms = regl({
    uniforms: {
      projection: (ctx, camera) => {
        camera.resize(ctx.viewportWidth / ctx.viewportHeight)
        return camera.state.projection
      },
      iProj: (ctx, camera) => invert([], camera.state.projection),
      view: (ctx, camera) => camera.state.view,
      eye: (ctx, camera) => camera.state.eye
    }
  })
  return [aCamera, setCameraUniforms]
}

function initializeCameraControls(
  camera,
  canvas,
  { minDistance, maxDistance }
) {
  const arrow = { left: 37, up: 38, right: 39, down: 40 }
  const delta = -0.01
  window.addEventListener('keydown', function (event) {
    // event.preventDefault()
    switch (event.keyCode) {
      case arrow.left:
        camera.pan(-delta, 0)
        break
      case arrow.up:
        camera.pan(0, +delta)
        break
      case arrow.right:
        camera.pan(+delta, 0)
        break
      case arrow.down:
        camera.pan(0, -delta)
        break
    }
  })

  const radiansPerHalfScreenWidth = Math.PI * 0.5

  interactionEvents(canvas)
    .on('wheel', function (ev) {
      if (!ev.active) return
      camera.zoom(ev.x, ev.y, Math.exp(-ev.dy) - 1.0)
      camera.params.distance = Math.max(
        minDistance,
        Math.min(maxDistance, camera.params.distance)
      )
    })
    .on('mousemove', function (ev) {
      if (!ev.active || ev.buttons !== 1) return

      if (ev.mods.shift) {
        camera.pan(ev.dx, ev.dy)
      } else if (ev.mods.meta) {
        // camera.pivot(ev.dx, ev.dy)
      } else {
        // camera.pivot(ev.dx, ev.dy)

        camera.rotate(
          -ev.dx * radiansPerHalfScreenWidth,
          -ev.dy * radiansPerHalfScreenWidth
        )

        // if (camera.params.phi < 0.1) camera.params.phi = 0.1
        // if (camera.params.phi > 0.5) camera.params.phi = 0.5
      }
    })
    .on('touchmove', function (ev) {
      if (!ev.active) return
      camera.rotate(
        -ev.dx * radiansPerHalfScreenWidth,
        -ev.dy * radiansPerHalfScreenWidth
      )
    })
}
