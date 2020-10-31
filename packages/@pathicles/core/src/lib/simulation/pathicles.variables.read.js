export default function readData(regl, { variables, model }) {
  const data = {}
  const variableNames = Object.keys(variables).filter(
    (key) => key === 'position' || key === 'velocity'
  )

  const width = variables['position'].buffers[0].width
  const height = variables['position'].buffers[0].height

  variableNames.forEach((variableName) => {
    data[variableName] = [
      new Float32Array(width * height * 4),
      new Float32Array(width * height * 4)
    ]

    regl({ framebuffer: variables[variableName].buffers[0] })(() => {
      regl.read({ data: data[variableName][0] })
    })
    regl({ framebuffer: variables[variableName].buffers[1] })(() => {
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
