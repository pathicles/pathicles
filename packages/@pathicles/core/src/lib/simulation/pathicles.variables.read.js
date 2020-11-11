const formatVariableValue = (arr, { particleCount, bufferLength }) => {
  const result = []

  for (let b = 0; b < bufferLength; b++) {
    const step = []
    result.push(step)
    for (let p = 0; p < particleCount; p++) {
      // debugger
      step.push([
        arr[b * particleCount * 4 + p * 4],
        arr[b * particleCount * 4 + p * 4 + 1],
        arr[b * particleCount * 4 + p * 4 + 2],
        arr[b * particleCount * 4 + p * 4 + 3]
      ])
    }
    // const step = Array(arr.length / bufferLength / 4)
    //   .fill(0)
    //   .map((d, i) => {
    //     return [
    //       arr[b * bufferLength + i * 4],
    //       arr[b * bufferLength + i * 4 + 1],
    //       arr[b * bufferLength + i * 4 + 2],
    //       arr[b * bufferLength + i * 4 + 3]
    //     ]
    //   })
  }
  return result
}

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
    // position_: position,
    // velocity_: velocity,
    position: formatVariableValue(position, variables),
    velocity: formatVariableValue(velocity, variables)
  }
}
