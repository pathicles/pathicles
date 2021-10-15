#pragma glslify: unpackFloat = require("@pathicles/core/src/lib/shaders/unpack-float.glsl");

vec4 readVariable(sampler2D tex, float p, float s) {
  float ns = bufferLength;
  float np = particleCount;

  vec2 res = vec2(ns * 4., np);

  return texture2D(tex, vec2(s * 4., p) / res);


  return vec4(
  unpackFloat(texture2D(tex, vec2(s * 4., p) / res)),
  unpackFloat(texture2D(tex, vec2(s * 4. + 1., p) / res)),
  unpackFloat(texture2D(tex, vec2(s * 4. + 2., p) / res)),
  unpackFloat(texture2D(tex, vec2(s * 4.+ 3., p) / res))
  );
}

  #pragma glslify: export(readVariable);


//    : vec4(
//        texture2D(tex, vec2(p, bc) / res).x,
//        texture2D(tex, vec2(p, bc+1.) / res).y,
//        texture2D(tex, vec2(p, bc+2.) / res).z,
//        texture2D(tex, vec2(p, bc+3.) / res).w
//    );
