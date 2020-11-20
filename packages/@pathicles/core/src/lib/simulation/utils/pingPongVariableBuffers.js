// import { convertToHalfFloat } from './../../webgl-utils/to-half-float'
import { variableTexture } from './variableTexture'

export class VariableBuffers {
  constructor(regl, particleCount, bufferLength, type, initialData) {
    this.regl = regl
    this.particleCount = particleCount
    this.bufferLength = bufferLength
    this.type = type
    this.initialData = initialData
    this.height = particleCount
    this.pingPong = 0
    this.width = bufferLength * 4
    this.buffers = [0, 1].map(() => {
      return regl.framebuffer({
        height: this.height,
        width: this.bufferLength * 4,
        format: 'rgba',
        colorType: 'uint8',
        depthStencil: false,
        color: variableTexture(
          regl,
          { width: this.width, height: this.particleCount },
          type
        )
      })
    })

    if (initialData) this.load(initialData)
  }

  testData() {
    const packedFourVectors = []
    for (let p = 0; p < this.particleCount; p++) {
      const steps = []
      packedFourVectors.push(steps)
      for (let s = 0; s < this.bufferLength; s++) {
        const base = p * 10 + s
        steps.push([base + 0.1, base + 0.2, base + 0.3, base + 0.4])
      }
    }
    let data

    if (this.type === 'uint8') {
      const fourVectorsAsFloat32 = new Float32Array(packedFourVectors.flat(2))
      data = new Uint8Array(fourVectorsAsFloat32.buffer)
    } else {
      const fourVectorsAsFloat32 = new Float32Array(packedFourVectors.flat(2))
      data = new Uint8Array(fourVectorsAsFloat32.buffer)
      data = new Float32Array(new Uint8Array(fourVectorsAsFloat32.buffer))

      //
      // data = new Float32Array(
      //   packedFourVectors.flat(2).flatMap((d) => [d, 0, 0, 0])
      // )
    }
    this.buffers.forEach((buffer) =>
      buffer.color[0].subimage({
        width: this.width,
        height: this.height,
        data
      })
    )

    // const fourVectorsAsFloat32 = new Float32Array(particles.flat())
    // const data = new Uint8Array(fourVectorsAsFloat32.buffer)
    //x
    // this.buffers.forEach((buffer) =>
    //   buffer.color[0].subimage({
    //     // width: 4,
    //     // height: this.particleCount,
    //     data
    //   })
    // )
  }

  load(packedFourVectors) {
    let data
    if (this.type === 'uint8') {
      const fourVectorsAsFloat32 = new Float32Array(packedFourVectors.flat(2))
      data = new Uint8Array(fourVectorsAsFloat32.buffer)
    } else {
      const fourVectorsAsFloat32 = new Float32Array(packedFourVectors.flat(2))
      data = new Uint8Array(fourVectorsAsFloat32.buffer)
      data = new Float32Array(new Uint8Array(fourVectorsAsFloat32.buffer))
    }

    this.buffers.forEach((buffer) =>
      buffer.color[0].subimage({
        width: 4,
        height: this.height,
        data
      })
    )

    return this
  }

  reset() {
    return this.load(this.initialData)
  }

  toTypedArray(pingPong = this.pingPong) {
    let float32Array, uint8Array

    if (this.type === 'uint8') {
      uint8Array = new Uint8Array(
        this.particleCount * this.bufferLength * 4 * 4
      )
      this.regl({
        framebuffer: this.buffers[pingPong]
      })(() => {
        this.regl.read({ data: uint8Array })
      })
      float32Array = new Float32Array(uint8Array.buffer)
    } else {
      const colorFloat32Array = new Float32Array(
        this.particleCount * this.bufferLength * 4 * 4
      )
      this.regl({
        framebuffer: this.buffers[pingPong]
      })(() => {
        this.regl.read({ data: colorFloat32Array })
      })

      float32Array = colorFloat32Array.filter((d, i) => i % 4 === 0)
    }

    const packedFloat32Array = []

    for (let p = 0; p < this.particleCount; p++) {
      // debugger
      const particle = []
      packedFloat32Array.push(particle)

      for (let b = 0; b < this.bufferLength; b++) {
        const offset = (p * this.bufferLength + b) * 4

        particle.push(float32Array.slice(offset, offset + 4))
      }
    }

    return {
      pingPong,
      float32Array,
      uint8Array,
      packedFloat32Array
    }
  }
}
