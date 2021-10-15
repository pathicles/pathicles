#pragma glslify: export(readVariable);

#pragma glslify: rgbaToFloat = require('glsl-rgba-to-float')
bool bLittleEndian = LITTLE_ENDIAN == 1;

vec4 readVariable(sampler2D tex, int p, int s) {
  return vec4(
  rgbaToFloat(texture2D(tex, vec2(4*s,p) / resolution), bLittleEndian),
  rgbaToFloat(texture2D(tex, vec2(4*s+1,p) / resolution), bLittleEndian),
  rgbaToFloat(texture2D(tex, vec2(4*s+2,p) / resolution), bLittleEndian),
  rgbaToFloat(texture2D(tex, vec2(4*s+3,p) / resolution), bLittleEndian)
  );
}



