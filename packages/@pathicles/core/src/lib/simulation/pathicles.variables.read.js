export default function readData(regl, { variables, model }) {
  const data = {}
  const variableNames = Object.keys(variables).filter(
    key => key === 'position' || key === 'velocity'
  )

  variableNames.forEach(key => {
    data[key] = [
      new Float32Array(model.particleCount * model.bufferLength * 4),
      new Float32Array(model.particleCount * model.bufferLength * 4)
      // new Float32Array(model.particleCount * model.bufferLength * 4),
      // new Float32Array(model.particleCount * model.bufferLength * 4)
    ]
  })

  variableNames.forEach(variableName => {
    regl({ framebuffer: variables[variableName][0] })(() => {
      regl.read({ data: data[variableName][0] })
    })
    regl({ framebuffer: variables[variableName][1] })(() => {
      regl.read({ data: data[variableName][1] })
    })
  })

  const position = Object.values(data.position[variables.tick.value % 2]).map(
    d => Math.floor(d * 1000) / 1000
  )
  const velocity = Object.values(data.velocity[variables.tick.value % 2])
  return {
    tick: variables.tick.value,
    data: {
      position,
      // velocity,
      particleTypes: variables.initialData.particleTypes
    }
  }
}
