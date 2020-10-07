/* eslint-env browser */

import saveCanvas from './saveCanvas'

//import debug from 'debug'

export default function keyControl(app) {
  document.addEventListener('keydown', onDocumentKeyDown, false)

  function onDocumentKeyDown(event) {
    event.stopPropagation()
    // event.preventDefault()

    const keyCode = event.which
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
}
