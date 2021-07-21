/**
 * This file encodes/decodes float values into 32bit rgba array
 *
 * It is based on https://computergraphics.stackexchange.com/questions/4151/webgl-packing-unpacking-functions-that-can-roundtrip-all-typical-32-bit-floats
 * and it is not perfect. If you know how to improve it - please let me know.
 */

/**
 * Encodes float value into output array
 * @param {number} val - value to be encode
 * @param {Uint8Array} out  - array where encoded value needs to be written.
 * @param {Number} writeOffset - offset in the original array where values should be written.
 */
export function encodeFloatRGBA(val, out, writeOffset) {
  if (val === 0.0) {
    out[writeOffset] = 0
    out[writeOffset + 1] = 0
    out[writeOffset + 2] = 0
    out[writeOffset + 3] = 0
    return
  }

  let mag = Math.abs(val)
  let exponent = Math.floor(Math.log2(mag))
  // Correct log2 approximation errors.
  exponent += exp2(exponent) <= mag / 2.0 ? 1 : 0
  exponent -= exp2(exponent) > mag ? 1 : 0

  let mantissa
  if (exponent > 100.0) {
    mantissa = mag / 1024.0 / exp2(exponent - 10.0) - 1.0
  } else {
    mantissa = mag / exp2(exponent) - 1.0
  }

  let a = exponent + 127.0
  mantissa *= 256.0
  let b = Math.floor(mantissa)
  mantissa -= b
  mantissa *= 256.0
  let c = Math.floor(mantissa)
  mantissa -= c
  mantissa *= 128.0
  let d = Math.floor(mantissa) * 2.0 + (val < 0.0 ? 1 : 0)

  out[writeOffset] = a
  out[writeOffset + 1] = b
  out[writeOffset + 2] = c
  out[writeOffset + 3] = d
}

/**
 * Given byte values in range [0..255] returns decoded float value.
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} a
 */
export function decodeFloatRGBA(r, g, b, a) {
  let A = Math.floor(r + 0.5)
  let B = Math.floor(g + 0.5)
  let C = Math.floor(b + 0.5)
  let D = Math.floor(a + 0.5)

  let exponent = A - 127.0
  let sign = 1.0 - (D % 2.0) * 2.0
  let mantissa =
    (A > 0.0 ? 1 : 0) +
    B / 256.0 +
    C / 65536.0 +
    Math.floor(D / 2.0) / 8388608.0
  return sign * mantissa * exp2(exponent)
}

function exp2(exponent) {
  return Math.exp(exponent * Math.LN2)
}
