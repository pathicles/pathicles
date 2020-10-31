export class VariableBuffers {
  constructor(
    regl,
    particleCount,
    bufferLength,
    RTTFloatType,
    channelsPerValueCount,
    initialData
  ) {
    // console.log(channelsPerValueCount)
    this.regl = regl
    this.particleCount = particleCount
    this.bufferLength = bufferLength
    this.RTTFloatType = RTTFloatType
    this.channelsPerValueCount = channelsPerValueCount
    this.initialData = initialData
    this.buffers = [0, 1].map(() => {
      return regl.framebuffer({
        height: bufferLength * channelsPerValueCount,
        width: particleCount,
        format: 'rgba',
        colorType: RTTFloatType,
        depthStencil: false,
        color: regl.texture({
          width: particleCount,
          height: bufferLength * channelsPerValueCount,
          min: 'nearest',
          mag: 'nearest',
          format: 'rgba',
          type: RTTFloatType
        })
      })
    })

    this.load(initialData)
  }

  load(data) {
    this.buffers.forEach((buffer) =>
      buffer.color[0].subimage({
        width: buffer.width,
        height: buffer.height,
        // data: RTTFloatType === 'float' ? data : convert_arrayToUInt16Array(data)
        data: new Float32Array(
          new Array(this.channelsPerValueCount)
            .fill(data)
            .flat()
            .concat(
              new Array(
                buffer.width *
                  (buffer.height - 1) *
                  this.channelsPerValueCount *
                  4
              ).fill(0)
            )
        )
      })
    )
    return this
  }

  reset() {
    return this.load(this.initialData)
  }
}
