/* eslint-env browser */

import read from 'gl-texture2d-read-float'

export default function readData(regl, { variables, model }) {
  const data = {}
  const variableNames = Object.keys(variables).filter(
    (key) => key === 'position' || key === 'velocity'
  )

  variableNames.forEach((key) => {
    data[key] = [
      new Float32Array(model.particleCount * model.bufferLength * 4),
      new Float32Array(model.particleCount * model.bufferLength * 4)
    ]
  })

  variableNames.forEach((variableName) => {
    debugger
    // regl({ framebuffer: variables[variableName][0] })(() => {
    read(variables[variableName][0], function (err, d) {
      if (err) throw err
      data[variableName][0] = d
      // console.log(d)
    })
    // regl.read({ data: data[variableName][0] })
    //
    read(variables[variableName][1], function (err, d) {
      if (err) throw err

      data[variableName][1] = d
      // console.log(d)
    })
    // regl.read({ data: data[variableName][0] })
  })
  const precision = 1000
  return {
    tick: variables.tick.value,
    data: {
      position: Object.values(data.position[variables.tick.value % 2]).map(
        (d) => Math.floor(d * precision) / precision
      ),
      velocity: Object.values(data.velocity[variables.tick.value % 2]).map(
        (d) => Math.floor(d * precision) / precision
      ),
      particleTypes: variables.initialData.particleTypes
    }
  }
}
