import { packFloat } from './packFloat.js'
import { describe, expect, it } from '@jest/globals'

describe('packFloat', () => {
  it('"Float32Array -> Uint8Array[4] 1"', () => {
    expect(packFloat(0)).toEqual([0, 0, 0, 0])
  })
  it('"Float32Array -> Uint8Array[4] 2"', () => {
    expect(packFloat(2)).toEqual([64 / 255, 0, 0, 0])
  })
  it('"Float32Array -> Uint8Array[4] 3"', () => {
    expect(packFloat(0.07)).toEqual([61 / 255, 143 / 255, 92 / 255, 40 / 255])
  })
})
