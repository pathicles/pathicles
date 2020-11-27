import { convertToHalfFloat } from './../../webgl-utils/to-half-float'
import { variableTexture } from './variableTexture'

const FOUR_VECTOR_COMPONENT_COUNT = 4

export class VariableBuffers {
  constructor(regl, particleCount, bufferLength, colorType, initialData) {
    this.regl = regl
    this.particleCount = particleCount
    this.bufferLength = bufferLength
    this.colorType = colorType
    this.initialData = initialData
    this.pingPong = 0
    this.width = particleCount
    this.height = bufferLength * FOUR_VECTOR_COMPONENT_COUNT
    this.buffers = [0, 1].map(() => {
      return regl.framebuffer({
        height: this.height,
        width: this.width,
        format: 'rgba',
        colorType: colorType,
        depthStencil: false,
        color: variableTexture(
          regl,
          { width: this.width, height: this.height },
          colorType
        )
      })
    })

    if (initialData) this.load(initialData)
  }

  load(data) {
    const typedData =
      this.colorType === 'float'
        ? new Float32Array(
            new Array(FOUR_VECTOR_COMPONENT_COUNT)
              .fill(data.reduce((acc, val) => acc.concat(val), []))
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
              .fill(
                convertToHalfFloat(
                  data.reduce((acc, val) => acc.concat(val), [])
                )
              )
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

  value() {
    return this.buffers[this.pingPong]
  }

  reset() {
    return this.load(this.initialData)
  }

  toTypedArray(pingPong = this.pingPong) {
    let float32Array

    if (this.type === 'uint8') {
      //
      // try {
      //   uint8Array = new Uint8Array(
      //     this.particleCount * this.bufferLength * 4 * 4 * 4
      //   )
      //   this.regl({
      //     framebuffer: this.buffers[pingPong]
      //   })(() => {
      //     this.regl.read({ data: uint8Array })
      //   })
      //   float32Array = new Float32Array(uint8Array.buffer)
      // } catch (e) {
      //   console.log(e)
      // }
    } else {
      try {
        const colorFloat32Array = new Float32Array(
          this.particleCount * this.bufferLength * 4 * 4
        )
        this.regl({
          framebuffer: this.buffers[pingPong]
        })(() => {
          this.regl.read({ data: colorFloat32Array })
        })
        float32Array = colorFloat32Array //.filter((d, i) => i % 4 === 0)
      } catch (e) {
        // eslint-disable-next-line no-undef
        console.log(e)
      }
    }

    return {
      float32Array
    }
  }

  pack(float32Array) {
    const packedFloat32Array = []

    for (let p = 0; p < this.particleCount; p++) {
      const particle = []
      packedFloat32Array.push(particle)

      for (let b = 0; b < this.bufferLength; b++) {
        const offset = (p * this.bufferLength + b) * 4

        particle.push(float32Array.slice(offset, offset + 4))
      }
    }
    return packedFloat32Array
  }
}
