import { rgbaToFloat } from './_rgba2Float.js'
import { describe, expect, it } from '@jest/globals'

describe('floatToRgba', () => {
  it('"Float32Array -> Uint8Array[4]"', () => {
    expect(rgbaToFloat([0, 0, 0, 0])).toEqual(0)
  })
  it('"Float32Array -> Uint8Array[4]"', () => {
    expect(rgbaToFloat([1, 1, 1, 1])).toEqual(0)
  })
  it('"Float32Array -> Uint8Array[4]"', () => {
    expect(rgbaToFloat([255, 255, 255, 255])).toEqual(0)
  })
})
