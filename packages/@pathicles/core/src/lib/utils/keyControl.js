/* eslint-env browser */

import saveCanvas from './saveCanvas'

const onDocumentKeyDown = (app) => (event) => {
  event.stopPropagation()
  // event.preventDefault()
  const delta = 1 / 150
  const dDistance = 0.01
  if (event.shiftKey) {
    switch (event.code) {
      case 'ArrowLeft':
        app.camera.stopAutorotate()
        app.camera.rotate(delta / 2, 0)
        break
      case `ArrowUp`:
        app.camera.stopAutorotate()
        app.camera.rotate(0, delta / 2)
        break
      case 'ArrowRight':
        app.camera.stopAutorotate()
        app.camera.rotate(-delta, 0)
        break
      case 'ArrowDown':
        app.camera.stopAutorotate()
        app.camera.rotate(0, -delta)
        break
    }
  } else {
    switch (event.code) {
      case 'ArrowLeft':
        app.camera.stopAutorotate()
        app.camera.pan(dDistance, 0)
        break
      case `ArrowUp`:
        app.camera.stopAutorotate()
        app.camera.pan(0, -dDistance)
        break
      case 'ArrowRight':
        app.camera.stopAutorotate()
        app.camera.pan(-dDistance, 0)
        break
      case 'ArrowDown':
        app.camera.stopAutorotate()
        app.camera.pan(0, dDistance)
        break
    }
  }
  const code = event.code

  if (code === 'KeyA') {
    // a for autorotate
    // app.camera.toggleAutorotate()
  } else if (code === 'KeyC') {
    const cameraConfig = app.camera.toConfig()
    console.log(JSON.stringify({ camera: cameraConfig }, null, 2))
  } else if (code === 'KeyD') {
    // d for dump
    console.log(app.simulation.dump())
  } else if (code === 'KeyM') {
    // m for mode
    app.runner.toggleMode()
  } else if (code === 'KeyT') {
    // t for textures
    app.config.debug.showTextures = !app.config.debug.showTextures
  } else if (code === 'KeyS') {
    // s for image
    saveCanvas(
      app.regl._gl.canvas,
      'pathicles' + (app.presetName ? '--' + app.presetName : '')
    )
  } else if (code === 'KeyN') {
    // n for loop
    app.runner.next()
  } else if (code === 'KeyL') {
    // l for loop
    app.runner.toggleLooping()
  } else if (code === 'Space') {
    // SPACE for Start/stop or nextStep

    app.runner.toggleActivity()
  }

  return false
}

export function keyControlMount(app) {
  document.addEventListener('keydown', onDocumentKeyDown(app), false)
}
export function keyControlUnmount(app) {
  document.removeEventListener('keydown', onDocumentKeyDown(app), false)
}
