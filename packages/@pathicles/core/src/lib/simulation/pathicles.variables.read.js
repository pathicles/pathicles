const formatVariableValue = (arr) =>
  Array(arr.length / 4)
    .fill(0)
    .map((d, i) => {
      return [arr[i * 4], arr[i * 4 + 1], arr[i * 4 + 2], arr[i * 4 + 3]]
    })

export default function readData(regl, { variables }, precision = 10000) {
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

  const position = Object.values(data.position[variables.pingPong]).map(
    (d) => Math.floor(d * precision) / precision
  )

  const velocity = Object.values(data.velocity[variables.pingPong]).map(
    (d) => Math.floor(d * precision) / precision
  )

  return {
    pingPong: variables.pingPong,
    iteration: variables.iteration,
    particleTypes: variables.particleTypes,
    position: formatVariableValue(position),
    velocity: formatVariableValue(velocity)
  }
}
