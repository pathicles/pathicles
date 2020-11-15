import { describe, expect, it } from '@jest/globals'

import { encodeFloatRGBA, decodeFloatRGBA } from './float2rgba'

describe('encodeFloatRGBA', () => {
  it('"Float32Array -> Uint8Array[4]"', () => {
    const fa = new Float32Array(1)
    fa[0] = Math.PI
    const uia = new Uint8Array(fa.buffer)
    const fa2 = new Float32Array(uia.buffer)
    expect(fa[0]).toEqual(fa2[0])
  })

  it('"0"', () => {
    const value = Math.PI
    const out = new Uint8Array(4)
    encodeFloatRGBA(value, out, 0)
    const result = decodeFloatRGBA(...out)
    expect(value).toBeCloseTo(result, 6)
  })
})
