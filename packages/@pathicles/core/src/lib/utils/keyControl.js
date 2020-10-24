/* eslint-env browser */

import saveCanvas from './saveCanvas'

const onDocumentKeyDown = (app) => (event) => {
  event.stopPropagation()
  // event.preventDefault()
  const delta = 0.01
  if (event.shiftKey) {
    switch (event.code) {
      case 'ArrowLeft':
        app.camera.rotate(-delta, 0)
        break
      case `ArrowUp`:
        app.camera.rotate(0, -delta)
        break
      case 'ArrowRight':
        app.camera.rotate(+delta, 0)
        break
      case 'ArrowDown':
        app.camera.rotate(0, delta)
        break
    }
  } else {
    switch (event.code) {
      case 'ArrowLeft':
        app.camera.pan(-delta, 0)
        break
      case `ArrowUp`:
        app.camera.pan(0, +delta)
        break
      case 'ArrowRight':
        app.camera.pan(+delta, 0)
        break
      case 'ArrowDown':
        app.camera.pan(0, -delta)
        break
    }
  }
  const keyCode = event.keyCode
  if (keyCode === 65) {
    // a for autorotate
    app.config.view.camera.autorotate = !app.config.view.camera.autorotate
  } else if (keyCode === 67) {
    const cameraConfig = app.camera.toConfig()
    console.log(JSON.stringify({ camera: cameraConfig }, null, 2))
  } else if (keyCode === 68) {
    // d for dump
    console.log(app.simulation.dump())
  } else if (keyCode === 77) {
    // m for mode
    app.pathiclesRunner.toggleMode()
  } else if (keyCode === 84) {
    // t for textures
    app.config.view.showTextures = !app.config.view.showTextures
  } else if (keyCode === 71) {
    // g for stageGrid
    app.config.drawGrid = !app.config.drawGrid
  } else if (keyCode === 83) {
    // s for image
    saveCanvas(
      app.regl._gl.canvas,
      'pathicles' + (app.presetName ? '--' + app.presetName : '')
    )
  } else if (keyCode === 78) {
    // n for loop
    app.pathiclesRunner.next()
  } else if (keyCode === 76) {
    // l for loop
    app.pathiclesRunner.toggleLooping()
  } else if (keyCode === 32) {
    // SPACE for Start/stop or nextStep

    app.pathiclesRunner.toggleActivity()
  }

  return false
}

export function keyControlMount(app) {
  document.addEventListener('keydown', onDocumentKeyDown(app), false)
}
export function keyControlUnmount(app) {
  document.removeEventListener('keydown', onDocumentKeyDown(app), false)
}
