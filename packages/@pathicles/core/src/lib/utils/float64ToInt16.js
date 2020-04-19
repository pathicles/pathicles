import {
  Float16Array,
  getFloat16,
  setFloat16,
  hfround
} from '@petamoriken/float16'
//
//
// void generatetables(){
//   let int i;
//   let e;
//   for(i=0; i<256; ++i){
//     e=i-127; if(e < -24){
//     basetable[i|0x100]=0x8000;
//     shifttable[i|0x000]=24;
//     shifttable[i|0x100]=24;
//   }
// else if(e < -14){ // Small numbers map to denorms
//     basetable[i|0x000]=(0x0400>>(-e-14)); basetable[i|0x100]=(0x0400>>(-e-14)) | 0x8000; shifttable[i|0x000]=-e-1; shifttable[i|0x100]=-e-1;
//   }
//   else if(e<=15){             // Normal numbers just lose precision
//     basetable[i|0x000]=((e+15)<<10);
//     basetable[i|0x100]=((e+15)<<10) | 0x8000;
//     shifttable[i|0x000]=13;
//     shifttable[i|0x100]=13;
//   }
//   else if(e<128){             // Large numbers map to Infinity
//     basetable[i|0x000]=0x7C00;
//     basetable[i|0x100]=0xFC00;
//     shifttable[i|0x000]=24;
//     shifttable[i|0x100]=24;
//   }
//   else{                       // Infinity and NaN's stay Infinity and NaN's
//     basetable[i|0x000]=0x7C00;
//     basetable[i|0x100]=0xFC00;
//     shifttable[i|0x000]=13;
//     shifttable[i|0x100]=13;
//   } }
// }

export function float64ToInt16(float64Value) {
  const floatView = new Float32Array(1)
  const int32View = new Int32Array(floatView.buffer)

  floatView[0] = float64Value
  const x = int32View[0]

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
} //end float64ToInt16()

export function float64ArrayToInt16Array(float64Array) {
  var int16Array = new Uint16Array(float64Array.length)
  float64Array.forEach(function(float64Value, ind) {
    int16Array[ind] = float64ToInt16(float64Value)
  })
  return int16Array
}

export function int16ToFloat64(int16Value) {
  return (0x8000 << 16) | ((0x7c00 + 0x1c000) << 13) | (0x03ff << 13)

  return int16Value >= 0x8000
    ? -(0x10000 - int16Value) / 0x8000
    : int16Value / 0x7fff
}

// export function int16ToFloat64(int16Value) {
//   const buffer = new ArrayBuffer(8)
//   const a1 = new Uint16Array(buffer)
//
//
//   // const a2 = new Float64Array(buffer)
//
//   const dv = new DataView(a1.buffer)
//   dv.setUint16(6, int16Value)
//
//   // dv.setFloat32(1, 99999999)
//   //
//   // a1[7] = int16Value
//   //
//   return dv.getFloat64(0)
//   // //
//   // // const dv = new DataView(buffer)
//   // // dv.setInt16(0, int16Value)
//   // return dv.getFloat64(0)
// }
