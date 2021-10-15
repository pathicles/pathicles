// import { describe, expect, it } from '@jest/globals'
//
// import { encodeFloatRGBA, decodeFloatRGBA } from './float2rgba'
// import { FloatPacking } from './float-packing'
//
// //
// // vec4 packFloatToVec4i(const float value) {
// //   const vec4 bitSh = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);
// //   const vec4 bitMsk = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);
// //   vec4 res = fract(value * bitSh);
// //   res -= res.xxyz * bitMsk;
// //   return res;
// // }
//
// function packFloatToVec4i(value) {
//   const bitSh = [256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0]
//   const bitMsk = [0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0]
//
//   const res = bitSh.map((v) => Math.trunc(value * v))
//   const res2 = [res[0], res[0], res[1], res[2]].map(
//     (v, i) => res[i] - v * bitMsk[i]
//   )
//
//   return res
// }
//
// // float unpackFloatFromVec4i(const vec4 value) {
// //   const vec4 bitSh = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);
// //   return(dot(value, bitSh));
// // }
//
// describe('encodeFloatRGBA', () => {
//   it('"Float32Array -> Uint8Array[4]"', () => {
//     const value = Math.PI
//     const valueAsFloat32 = new Float32Array(1)
//     valueAsFloat32[0] = value
//     const valueAsUint8 = new Uint8Array(valueAsFloat32.buffer)
//     const resultvaluxeAsFloat32 = new Float32Array(valueAsUint8.buffer)
//     expect(valueAsFloat32[0]).toEqual(resultvalueAsFloat32[0])
//     console.log(`${value} => ${valueAsUint8} => ${resultvalueAsFloat32}`)
//   })
//
//   it('"packFloatToVec4i -> Uint8Array[4]"', () => {
//     const value = Math.PI - 3
//     const valueAsInt = FloatPacking.encodeUnitFloat32(value)
//     const result = FloatPacking.decodeUnitFloat32(valueAsInt)
//     console.log(`${value} => ${valueAsInt} => ${result}`)
//     expect(result).toEqual(value)
//   })
//
//   it('"0"', () => {
//     const value = Math.PI
//     const valueAsUint8 = new Uint8Array(4)
//     encodeFloatRGBA(value, valueAsUint8, 0)
//     const result = decodeFloatRGBA(...valueAsUint8)
//     expect(value).toBeCloseTo(result, 6)
//     console.log(`${value} => ${valueAsUint8} => ${result}`)
//   })
// })
