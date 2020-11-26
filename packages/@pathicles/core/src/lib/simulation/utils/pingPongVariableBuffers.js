import { convertToHalfFloat } from './../../webgl-utils/to-half-float'
import { variableTexture } from './variableTexture'

const FOUR_VECTOR_COMPONENT_COUNT = 4

export class VariableBuffers {
  constructor(regl, particleCount, bufferLength, RTTFloatType, initialData) {
    this.regl = regl
    this.particleCount = particleCount
    this.bufferLength = bufferLength
    this.RTTFloatType = RTTFloatType
    this.initialData = initialData
    this.width = particleCount
    this.height = bufferLength * FOUR_VECTOR_COMPONENT_COUNT
    this.buffers = [0, 1].map(() => {
      return regl.framebuffer({
        height: this.height,
        width: this.width,
        format: 'rgba',
        colorType: RTTFloatType,
        depthStencil: false,
        color: variableTexture(
          regl,
          { width: this.width, height: this.height },
          RTTFloatType
        )
      })
    })

    if (initialData) this.load(initialData)
  }

  load(data) {
    const typedData =
      this.RTTFloatType === 'float'
        ? new Float32Array(
            new Array(FOUR_VECTOR_COMPONENT_COUNT)
              .fill(data)
              .flat()
              .concat(
                new Array(
                  this.width *
                    (this.height - 1) *
                    FOUR_VECTOR_COMPONENT_COUNT *
                    4
                ).fill(0)
              )
          )
        : new Uint8Array(
            new Array(FOUR_VECTOR_COMPONENT_COUNT)
              .fill(convertToHalfFloat(data))
              .flat()
              .concat(
                new Array(
                  this.width *
                    (this.height - 1) *
                    FOUR_VECTOR_COMPONENT_COUNT *
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
