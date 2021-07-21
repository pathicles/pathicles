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
    return x.map(function (x, i) {
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
function floatsToBytes(inputFloats, littleEndian) {
  inputFloats = inputFloats.slice()
  var bytes = [
    inputFloats[0] * 255.0,
    inputFloats[1] * 255.0,
    inputFloats[2] * 255.0,
    inputFloats[3] * 255.0
  ]
  return littleEndian ? [bytes[3], bytes[2], bytes[1], bytes[0]] : bytes
}
function bytesToBits(bytes, bits) {
  for (var channelIndex = 0; channelIndex < 4; ++channelIndex) {
    var acc = bytes[channelIndex]
    for (var indexInByte = 7; indexInByte >= 0; --indexInByte) {
      var powerOfTwo = exp2(indexInByte)
      var bit = acc >= powerOfTwo
      bits[channelIndex * 8 + (7 - indexInByte)] = bit
      acc = mod(acc, powerOfTwo)
    }
  }
  bytesToBits.__out__ = [bits]
}
function getExponent(bits) {
  var startIndex = 1
  var bitStringLength = 8
  var endBeforeIndex = startIndex + bitStringLength
  var acc = 0.0
  var pow2 = bitStringLength - 1
  for (var bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {
    acc += +bits[bitIndex] * exp2(pow2--)
  }
  return acc
}
function getMantissa(bits, subnormal) {
  var startIndex = 9
  var bitStringLength = 23
  var endBeforeIndex = startIndex + bitStringLength
  var acc = !subnormal * exp2(bitStringLength)
  var pow2 = bitStringLength - 1
  for (var bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {
    acc += +bits[bitIndex] * exp2(pow2--)
  }
  return acc
}
function bitsToFloat(bits) {
  var signBit = +bits[0] * -2.0 + 1.0
  var exponent = getExponent(bits)
  var subnormal = abs(exponent) < 0.01
  var mantissa = getMantissa(bits, subnormal)
  var exponentBias = 127.0
  return signBit * mantissa * exp2(exponent - exponentBias - 23.0)
}
export function rgbaToFloat(texelRGBA, littleEndian) {
  texelRGBA = texelRGBA.slice()
  var rgbaBytes = floatsToBytes(texelRGBA, littleEndian)
  var bits = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]
  bytesToBits(rgbaBytes, bits),
    ([bits] = bytesToBits.__out__),
    bytesToBits.__return__
  return bitsToFloat(bits)
}
