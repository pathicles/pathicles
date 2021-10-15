function floor(x) {
  if (x.length) {
    return x.map(floor)
  }
  return Math.floor(x)
}
function exp2(x) {
  if (x.length) {
    return x.map(exp2)
  }
  return Math.pow(2, x)
}
function mod(x, y) {
  if (x.length) {
    if (y.length) {
      return x.map(function (x, i) {
        if (x === 0 || y[i] === 0) {
          return 0
        }
        return x % y[i]
      })
    }
    return x.map(function (x) {
      if (x === 0 || y === 0) {
        return 0
      }
      return x % y
    })
  }
  return x % y
}
function abs(x) {
  if (x.length) {
    return x.map(abs)
  }
  return Math.abs(x)
}
function log2(x) {
  if (x.length) {
    return x.map(log2)
  }
  return Math.log2(x)
}
function fract(x) {
  if (x.length) {
    return x.map(fract)
  }
  return x - Math.floor(x)
}
function shiftRight(v, amt) {
  v = floor(v) + 0.5
  return floor(v / exp2(amt))
}
function shiftLeft(v, amt) {
  return floor(v * exp2(amt) + 0.5)
}
function maskLast(v, bits) {
  return mod(v, shiftLeft(1.0, bits))
}
function extractBits(num, from, to) {
  from = floor(from + 0.5)
  to = floor(to + 0.5)
  return maskLast(shiftRight(num, from), to - from)
}
export function floatToRgba(texelFloat, littleEndian) {
  if (texelFloat == 0.0) {
    return [0, 0, 0, 0]
  }
  var sign = texelFloat > 0.0 ? 0.0 : 1.0
  texelFloat = abs(texelFloat)
  var exponent = floor(log2(texelFloat))
  var biased_exponent = exponent + 127.0
  var fraction = (texelFloat / exp2(exponent) - 1.0) * 8388608.0
  var t = biased_exponent / 2.0
  var last_bit_of_biased_exponent = fract(t) * 2.0
  var remaining_bits_of_biased_exponent = floor(t)
  var byte4 = extractBits(fraction, 0.0, 8.0)
  var byte3 = extractBits(fraction, 8.0, 16.0)
  var byte2 =
    last_bit_of_biased_exponent * 128.0 + extractBits(fraction, 16.0, 23.0)
  var byte1 = sign * 128.0 + remaining_bits_of_biased_exponent
  return littleEndian
    ? [byte4, byte3, byte2, byte1]
    : [byte1, byte2, byte3, byte4]
}
