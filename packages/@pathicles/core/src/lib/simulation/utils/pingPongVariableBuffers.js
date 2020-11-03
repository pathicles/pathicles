import { convertToHalfFloat } from './../../webgl-utils/to-half-float'

export class VariableBuffers {
  constructor(
    regl,
    particleCount,
    bufferLength,
    RTTFloatType,
    channelsPerValueCount,
    initialData
  ) {
    // console.log(RTTFloatType)
    this.regl = regl
    this.particleCount = particleCount
    this.bufferLength = bufferLength
    this.RTTFloatType = RTTFloatType
    this.channelsPerValueCount = channelsPerValueCount
    this.initialData = initialData
    this.width = particleCount
    this.height = bufferLength * channelsPerValueCount
    this.buffers = [0, 1].map(() => {
      return regl.framebuffer({
        height: this.height,
        width: this.width,
        format: 'rgba',
        colorType: RTTFloatType,
        depthStencil: false,
        color: regl.texture({
          width: this.width,
          height: this.height,
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
    const typedData =
      this.RTTFloatType === 'float'
        ? new Float32Array(
            new Array(this.channelsPerValueCount)
              .fill(data)
              .flat()
              .concat(
                new Array(
                  this.width *
                    (this.height - 1) *
                    this.channelsPerValueCount *
                    4
                ).fill(0)
              )
          )
        : new Uint16Array(
            new Array(this.channelsPerValueCount)
              .fill(convertToHalfFloat(data))
              .flat()
              .concat(
                new Array(
                  this.width *
                    (this.height - 1) *
                    this.channelsPerValueCount *
                    4
                ).fill(0)
              )
          )

    this.buffers.forEach((buffer) =>
      buffer.color[0].subimage({
        width: this.width,
        height: this.height,
        data: typedData
      })
    )
    return this
  }

  reset() {
    return this.load(this.initialData)
  }
}
