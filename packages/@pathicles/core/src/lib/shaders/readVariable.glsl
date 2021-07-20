#pragma glslify: export(readVariable);

#ifdef PACK_FLOAT

#pragma glslify: rgbaToFloat = require('glsl-rgba-to-float')

bool bLittleEndian = (LITTLE_ENDIAN == 1);

#endif

vec4 readVariable(sampler2D tex, int p, int s) {

#ifdef PACK_FLOAT
  return vec4(rgbaToFloat(texture2D(tex, vec2(4 * s, p) / resolution), bLittleEndian), rgbaToFloat(texture2D(tex, vec2(4 * s + 1, p) / resolution), bLittleEndian), rgbaToFloat(texture2D(tex, vec2(4 * s + 2, p) / resolution), bLittleEndian), rgbaToFloat(texture2D(tex, vec2(4 * s + 3, p) / resolution), bLittleEndian));
#else
  return vec4(texture2D(tex, vec2(4 * s, p) / resolution).r, texture2D(tex, vec2(4 * s + 1, p) / resolution).r, texture2D(tex, vec2(4 * s + 2, p) / resolution).r, texture2D(tex, vec2(4 * s + 3, p) / resolution).r);
#endif
}
