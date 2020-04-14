export function createBuffers(regl, particleCount, bufferLength, RTTFloatType) {
  return [0, 1].map(() => {
    return regl.framebuffer({
      height: bufferLength,
      width: particleCount,
      format: 'rgba',
      colorType: RTTFloatType,
      depthStencil: false,
      color: regl.texture({
        width: particleCount,
        height: bufferLength,
        min: 'nearest',
        mag: 'nearest',
        format: 'rgba',
        type: RTTFloatType
      })
    })
  })
}

export function loadBuffers(buffers, data, RTTFloatType) {
  ;[0, 1].forEach(b =>
    buffers[b].color[0].subimage({
      width: buffers[b].width,
      height: buffers[b].height,
      data: RTTFloatType === 'float' ? data : convert_arrayToUInt16Array(data)
    })
  )
  return buffers
}

function convert_floatToInt16(val) {
  var floatView = new Float32Array(1)
  var int32View = new Int32Array(floatView.buffer)
  floatView[0] = val
  var x = int32View[0]
  var bits = (x >> 16) & 0x8000 /* Get the sign */
  var m = (x >> 12) & 0x07ff /* Keep one extra bit for rounding */
  var e = (x >> 23) & 0xff /* Using int is faster here */
  /* If zero, or denormal, or exponent underflows too much for a denormal
   * half, return signed zero. */
  if (e < 103) {
    return bits
  }
  /* If NaN, return NaN. If Inf or exponent overflow, return Inf. */
  if (e > 142) {
    bits |= 0x7c00
    /* If exponent was 0xff and one mantissa bit was set, it means NaN,
     * not Inf, so make sure we set one mantissa bit too. */
    bits |= (e == 255 ? 0 : 1) && x & 0x007fffff
    return bits
  }
  /* If exponent underflows but not too much, return a denormal */
  if (e < 113) {
    m |= 0x0800
    /* Extra rounding may overflow and set mantissa to 0 and exponent
     * to 1, which is OK. */
    bits |= (m >> (114 - e)) + ((m >> (113 - e)) & 1)
    return bits
  }
  bits |= ((e - 112) << 10) | (m >> 1)
  /* Extra rounding. An overflow will set mantissa to 0 and increment
   * the exponent, which is OK. */
  bits += m & 1
  return bits
} //end convert_floatToInt16()

//convert an array with float values or a Float32Array
//to an Uint16array with 16bits encoded float
//(see https://en.wikipedia.org/wiki/Half-precision_floating-point_format for the encoding)
function convert_arrayToUInt16Array(arr) {
  var arr16 = new Uint16Array(arr.length)
  arr.forEach(function(val, ind) {
    arr16[ind] = convert_floatToInt16(val)
  })
  return arr16
}
