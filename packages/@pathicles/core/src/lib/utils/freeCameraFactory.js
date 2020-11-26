/* eslint-env browser */

import camera from './inertial-turntable-camera.js'

import interactionEvents from './normalized-interaction-events'
import { Lethargy } from './Lethargy.js'

// function calcPhiThetaDistance(eye, center) {
//   const d = [-center[0] + eye[0], -center[1] + eye[1], -center[2] + eye[2]]
//
//   const distance = Math.sqrt(
//     Math.pow(d[0], 2) + Math.pow(d[1], 2) + Math.pow(d[2], 2)
//   )
//
//   let phi = Math.atan2(d[1], d[0])
//   if (d[1] < 0) phi = phi + Math.PI / 2
//
//   let theta = Math.atan2(Math.sqrt(d[0] * d[0] + d[1] * d[1]), d[2])
//
//   return { phi, theta, distance }
// }

export default function (regl, options) {
  // theta -= d[0] < 0 ? Math.PI : 0

  const {
    phi,
    theta,
    distance,
    autorotate,
    autorotateSpeedDistance,
    autorotateSpeedTheta,
    autorotateSpeedPhi
  } = options

  // const { phi, theta, distance } = calcPhiThetaDistance(
  //   options.eye,
  //   options.center
  // )

  // if (d[1] < 0) phi = -phi // + Math.PI
  const cameraOptions = Object.assign({}, options, {
    fovY: options.fovY,
    zoomDecayTime: 0,
    rotationDecayTime: 50,
    panDecayTime: 50,
    distance,
    phi,
    theta,
    center: options.center,
    ...(options.aspectRatio && { aspectRatio: options.aspectRatio })
  })

  const aCamera = camera(cameraOptions)
  aCamera.autorotate = autorotate
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

  aCamera.toggleAutorotate = () => {
    aCamera.autorotate = !aCamera.autorotate

    if (aCamera.autorotate) {
      aCamera.startAutorotate()
    }
  }
  aCamera.startAutorotate = () => {
    aCamera.autorotate = true
    aCamera.autorotateParams = { ...aCamera.params }
    console.log('startAutorotate')

    aCamera.autorotateT0 = Date.now()
  }
  aCamera.stopAutorotate = () => {
    aCamera.autorotate = false
    aCamera.autorotateParams = { ...aCamera.params }
    console.log('startAutorotate')

    aCamera.autorotateT0 = Date.now()
  }
  aCamera.doAutorotate = () => {
    if (aCamera.autorotate) {
      const dt = (Date.now() - aCamera.autorotateT0) / 1000
      aCamera.params.distance =
        aCamera.autorotateParams.distance +
        0.1 * Math.sin(autorotateSpeedDistance * dt)
      aCamera.params.theta =
        aCamera.autorotateParams.theta + autorotateSpeedTheta * dt
      aCamera.params.phi =
        aCamera.autorotateParams.phi + 0.05 * Math.sin(autorotateSpeedPhi * dt)
    }
  }

  // aCamera.updateEyeCenter = (eye, center) => {
  //   const { phi, theta, distance } = calcPhiThetaDistance(eye, center)
  //
  //   aCamera.params.center = center
  //   aCamera.params.theta = theta
  //   aCamera.params.phi = phi
  //   aCamera.params.distance = distance
  // }

  aCamera.setCameraUniforms = regl({
    uniforms: {
      projection: (ctx, camera) => {
        camera.resize(ctx.viewportWidth / ctx.viewportHeight)
        return camera.state.projection
      },
      view: (ctx, camera) => camera.state.view,
      eye: (ctx, camera) => camera.state.eye
    }
  })
  return aCamera
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
      camera.autorotate = false
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
      camera.autorotate = false
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
      camera.autorotate = false
      if (!ev.active) return
      camera.rotate(
        -ev.dx * radiansPerHalfScreenWidth,
        -ev.dy * radiansPerHalfScreenWidth
      )
    })
}
