import { convertToHalfFloat } from './../../webgl-utils/to-half-float'
import { variableTexture } from './variableTexture'

const FOUR_VECTOR_COMPONENT_COUNT = 4

export class VariableBuffers {
  constructor(regl, particleCount, snapshotCount, colorType, initialData) {
    this.regl = regl
    this.particleCount = particleCount
    this.snapshotCount = snapshotCount
    this.colorType = colorType
    this.initialData = initialData
    this.pingPong = 0
    this.width = particleCount
    this.height = snapshotCount * FOUR_VECTOR_COMPONENT_COUNT
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

  load(fourVectors) {
    const arrayLength = this.particleCount * FOUR_VECTOR_COMPONENT_COUNT * 4
    const data =
      this.colorType === 'float'
        ? new Float32Array(
            fourVectors.reduce((acc, fourVector) => {
              return [
                ...acc,
                ...[
                  fourVector[0],
                  fourVector[1],
                  fourVector[2],
                  fourVector[3],
                  fourVector[0],
                  fourVector[1],
                  fourVector[2],
                  fourVector[3],
                  fourVector[0],
                  fourVector[1],
                  fourVector[2],
                  fourVector[3],
                  fourVector[0],
                  fourVector[1],
                  fourVector[2],
                  fourVector[3]
                  // fourVector[0],
                  // fourVector[0],
                  // fourVector[0],
                  // fourVector[0],
                  // fourVector[1],
                  // fourVector[1],
                  // fourVector[1],
                  // fourVector[1],
                  // fourVector[2],
                  // fourVector[2],
                  // fourVector[2],
                  // fourVector[2],
                  // fourVector[3],
                  // fourVector[3],
                  // fourVector[3],
                  // fourVector[3]
                ]
              ]
            }, [])
          )
        : new Uint8Array(arrayLength).fill(0)
    // console.log(
    //   fourVectors,
    //   // new Float32Array(
    //   new Array(FOUR_VECTOR_COMPONENT_COUNT)
    //     .fill(data.reduce((acc, val) => acc.concat(val), []))
    //     .flat()
    //   // .concat(
    //   //   new Array(
    //   //     this.width * (this.height - 1) * FOUR_VECTOR_COMPONENT_COUNT * 4
    //   //   ).fill(0)
    //   // )
    //   // )
    // )
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

    console.log({ data, typedData })
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
    this.pingPong = 0
    this.load(this.initialData)
  }

  toTypedArray(pingPong = this.pingPong) {
    let float32Array

    if (this.colorType === 'float') {
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
      float32Array
    }
  }

  pack(float32Array) {
    const packedFloat32Array = []

    for (let p = 0; p < this.particleCount; p++) {
      const particle = []
      packedFloat32Array.push(particle)
      // debugger

      for (let b = 0; b < this.snapshotCount; b++) {
        const offset = (p * this.snapshotCount + b) * 4 * 4

        particle.push([
          float32Array[offset],
          float32Array[offset + 4 + 1],
          float32Array[offset + 8 + 2],
          float32Array[offset + 12 + 3]
        ])
      }
    }
    return packedFloat32Array
  }
}
