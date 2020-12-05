#pragma glslify: export(readVariable);
#pragma glslify: unpackFloat = require("@pathicles/core/src/lib/shaders/unpackFloat.glsl");
#pragma glslify: rgbaToFloat = require('glsl-rgba-to-float')

bool bLittleEndian = littleEndian == 1;

vec4 readVariable(sampler2D tex, int p, int s) {



  vec2 resolution = vec2(4*snapshotCount, particleCount);

  return (packFloat2UInt8 == 0)
    ? vec4(
      texture2D(tex, vec2(4*s,p) / resolution).r,
      texture2D(tex, vec2(4*s+1,p) / resolution).r,
      texture2D(tex, vec2(4*s+2,p) / resolution).r,
      texture2D(tex, vec2(4*s+3,p) / resolution).r
      )
    : vec4(
  rgbaToFloat(texture2D(tex, vec2(4*s,p) / resolution), bLittleEndian),
  rgbaToFloat(texture2D(tex, vec2(4*s+1,p) / resolution), bLittleEndian),
  rgbaToFloat(texture2D(tex, vec2(4*s+2,p) / resolution),bLittleEndian),
  rgbaToFloat(texture2D(tex, vec2(4*s+3,p) / resolution),bLittleEndian)
    );
}



