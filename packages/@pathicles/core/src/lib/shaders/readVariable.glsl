#pragma glslify: export(readVariable);

#ifdef LITTLE_ENDIAN

#pragma glslify: unpackFloat = require("@pathicles/core/src/lib/shaders/unpackFloat.glsl");
#pragma glslify: rgbaToFloat = require('glsl-rgba-to-float')
bool bLittleEndian = LITTLE_ENDIAN == 1;

#endif

vec4 readVariable(sampler2D tex, int p, int s) {

  vec2 resolution = vec2(4*snapshotCount, particleCount);


  #ifdef LITTLE_ENDIAN
  return vec4(
    rgbaToFloat(texture2D(tex, vec2(4*s,p) / resolution), bLittleEndian),
    rgbaToFloat(texture2D(tex, vec2(4*s+1,p) / resolution), bLittleEndian),
    rgbaToFloat(texture2D(tex, vec2(4*s+2,p) / resolution), bLittleEndian),
    rgbaToFloat(texture2D(tex, vec2(4*s+3,p) / resolution), bLittleEndian)
  );

#else
  return vec4(
    texture2D(tex, vec2(4*s, p) / resolution).r,
    texture2D(tex, vec2(4*s+1, p) / resolution).r,
    texture2D(tex, vec2(4*s+2, p) / resolution).r,
    texture2D(tex, vec2(4*s+3, p) / resolution).r
  );
#endif
}



