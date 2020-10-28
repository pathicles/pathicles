export default function readData(regl, { variables, model }) {
  const data = {}
  const variableNames = Object.keys(variables).filter(
    (key) => key === 'position' || key === 'velocity'
  )

  variableNames.forEach((key) => {
    data[key] = [
      new Float32Array(model.particleCount * model.bufferLength * 4 * 4),
      new Float32Array(model.particleCount * model.bufferLength * 4 * 4)
    ]
  })

  variableNames.forEach((variableName) => {
    regl({ framebuffer: variables[variableName][0] })(() => {
      regl.read({ data: data[variableName][0] })
    })
    regl({ framebuffer: variables[variableName][1] })(() => {
      regl.read({ data: data[variableName][1] })
    })
  })

  const precision = 1000
  return {
    tick: variables.tick.value,
    // data_: data,
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
