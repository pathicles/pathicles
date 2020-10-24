/* eslint-env browser */

import camera from './inertial-turntable-camera.js'

import interactionEvents from 'normalized-interaction-events'
// import invert from 'gl-mat4/invert'
import { Lethargy } from './Lethargy.js'

export default function (regl, options) {
  const { eye, center } = options
  const d = [-center[0] + eye[0], -center[1] + eye[1], -center[2] + eye[2]]

  //
  // var lethargy
  // if (typeof Lethargy !== 'undefined' && Lethargy !== null) {
  //   lethargy = new Lethargy()
  // }

  // p[0] = ((p[0] > 0 ? p[0] : 2 * Math.PI + p[0]) * 360) / (2 * Math.PI)
  // console.log(p)

  const distance = Math.sqrt(
    Math.pow(d[0], 2) + Math.pow(d[1], 2) + Math.pow(d[2], 2)
  )
  // let theta = Math.atan2(d[1], d[0])
  // let phi = Math.atan2(Math.sqrt(d[0] * d[0] + d[1] * d[1]), d[2])
  // let phi = (d[0] ? Math.atan2(d[2] / d[0]) : 0) || 0

  let phi = Math.atan2(d[1], d[0])

  //console.log(options)
  let theta = Math.atan2(Math.sqrt(d[0] * d[0] + d[1] * d[1]), d[2])
  theta -= d[0] < 0 ? Math.PI : 0

  console.log({ phi, theta })

  // if (d[1] < 0) phi = -phi // + Math.PI
  const cameraOptions = Object.assign({}, options, {
    fovY: options.fovY,
    zoomDecayTime: 0,
    rotationDecayTime: 0,
    panDecayTime: 0,
    distance,
    // zoomAboutCursor: false,
    // rotationCenter: center,
    // phi: theta,
    // theta: phi,
    phi,
    theta,
    // up: [0, 0, 1],
    center,
    ...(options.aspectRatio && { aspectRatio: options.aspectRatio })
  })

  const aCamera = camera(cameraOptions)
  initializeCameraControls(aCamera, regl && regl._gl.canvas, {
    minDistance: options.minDistance || 0.1,
    maxDistance: options.maxDistance || 50
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
      // iProj: (ctx, camera) => invert([], camera.state.projection),
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
  const lethargy = new Lethargy()

  const radiansPerHalfScreenWidth = Math.PI * 0.5

  interactionEvents(canvas)
    .on('wheel', function (ev) {
      // e.preventDefault()
      // e.stopPropagation()

      if (!ev.active) return
      if (lethargy.check(ev) !== false) {
        if (camera.params.distance <= maxDistance)
          camera.zoom(ev.x, ev.y, 0.2 * (Math.exp(-ev.dy) - 1.0))
        camera.params.distance = Math.max(
          minDistance,
          Math.min(maxDistance, camera.params.distance)
        )
      }
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
