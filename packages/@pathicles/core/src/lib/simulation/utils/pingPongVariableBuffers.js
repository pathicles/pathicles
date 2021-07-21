// import { convertToHalfFloat } from './../../webgl-utils/to-half-float'
import { variableTexture } from './variableTexture'

const FOUR_VECTOR_COMPONENT_COUNT = 4

export class VariableBuffers {
  constructor(regl, particleCount, snapshotCount, numberType, initialData) {
    this.regl = regl
    this.particleCount = particleCount
    this.snapshotCount = snapshotCount
    this.numberType = numberType
    this.initialData = initialData
    this.pingPong = 0
    this.data = new Array(2)
    const width = (this.width = snapshotCount * FOUR_VECTOR_COMPONENT_COUNT)
    const height = (this.height = particleCount)
    this.buffers = [0, 1].map(() => {
      return regl.framebuffer({
        height: this.height,
        width: this.width,
        // colorFormat: 'rgba',
        // colorType: numberType,
        depthStencil: false,
        color: variableTexture(regl, { width, height }, numberType)
      })
    })

    if (initialData) this.load(initialData)
  }

  load(fourVectors) {
    this.data[0] = this.data[1] =
      this.numberType === 'float'
        ? new Float32Array(
            fourVectors
              .map((fourVector) =>
                fourVector.map((component) => [component, 0, 0, 0])
              )
              .flat(2)
          )
        : new Uint8Array(new Float32Array(fourVectors.flat()).buffer)

    this.buffers.forEach((buffer, i) =>
      buffer.color[0].subimage({
        width: FOUR_VECTOR_COMPONENT_COUNT,
        height: this.particleCount,
        data: this.data[i]
      })
    )

    return this
  }

  value() {
    return this.buffers[this.pingPong]
  }

  reset() {
    this.pingPong = 0
    this.load(this.initialData)
  }

  toTypedArray(pingPong = this.pingPong, precision = 3) {
    let float32Array
    let colorUint8Array
    if (this.numberType === 'uint8') {
      let data = new Uint8Array(this.particleCount * this.snapshotCount * 4 * 4)
      this.regl({
        framebuffer: this.buffers[pingPong]
      })(() => {
        this.regl.read({ data: data })
      })
      colorUint8Array = Array.from(data) //new Uint8Array(data.buffer) //.filter((d, i) => i % 4 === 0)
      float32Array = new Float32Array(data.buffer) //.filter((d, i) => i % 4 === 0)
    }
    if (this.numberType === 'float') {
      try {
        const colorFloat32Array = new Float32Array(
          this.particleCount * this.snapshotCount * 4 * 4
        )
        this.regl({
          framebuffer: this.buffers[pingPong]
        })(() => {
          this.regl.read({ data: colorFloat32Array })
        })
        float32Array = colorFloat32Array //.filter((d, i) => i % 4 === 0)
      } catch (e) {
        // eslint-disable-next-line no-undef
        console.error(e)
      }
    }

    return {
      colorUint8Array,
      float32Array: Array.from(float32Array).map((d) =>
        precision
          ? Math.round(d * Math.pow(10, precision)) / Math.pow(10, precision)
          : d
      )
    }
  }

  pack(float32Array) {
    const packedFloat32Array = []

    for (let p = 0; p < this.particleCount; p++) {
      const particle = []
      packedFloat32Array.push(particle)
      // debugger

      for (let b = 0; b < this.snapshotCount; b++) {
        if (this.numberType === 'uint8') {
          const offset = (p * this.snapshotCount + b) * 4
          particle.push([
            float32Array[offset],
            float32Array[offset + 1],
            float32Array[offset + 2],
            float32Array[offset + 3]
          ])
        } else {
          const offset = (p * this.snapshotCount + b) * 4 * 4
          particle.push([
            float32Array[offset],
            float32Array[offset + 4],
            float32Array[offset + 8],
            float32Array[offset + 12]
          ])
        }
      }
    }
    return packedFloat32Array
  }
}
