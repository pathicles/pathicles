import { floatToRgba } from './_float2rgba.js'
import { describe, expect, it } from '@jest/globals'

describe('floatToRgba', () => {
  it('"Float32Array -> Uint8Array[4] 1"', () => {
    expect(floatToRgba(0)).toEqual([0, 0, 0, 0])
  })
  it('"Float32Array -> Uint8Array[4] 2"', () => {
    expect(floatToRgba(2)).toEqual([64, 0, 0, 0])
  })
  it('"Float32Array -> Uint8Array[4] 3"', () => {
    expect(floatToRgba(0.07, 1)).toEqual([66, 69, 229, 59])
  })
})
