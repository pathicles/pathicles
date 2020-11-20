#pragma glslify: export(readVariable);
#pragma glslify: unpackFloat = require("@pathicles/core/src/lib/shaders/unpack-float.glsl");



vec4 readVariable(sampler2D tex, float p, float s) {


  float ns = bufferLength;
  float np = particleCount;

  vec2 res = vec2(ns * 4., np);

  return vec4(
  (texture2D(tex, vec2(s * 4., p) / res).x),
  (texture2D(tex, vec2(s * 4. +1., p) / res).x),
  (texture2D(tex, vec2(s * 4.+2., p) / res).x),
  (texture2D(tex, vec2(s * 4. +3., p) / res).x)
  );
  //  return vec4(
  //    p,
  //    s, //unpackFloat(packFloat(s)),
  //    np,
  //    ns);
  //  return vec4(
  //    packFloat(p),
  //    packFloat(s),
  //    packFloat(np),
  //    packFloat(ns)
  //  );
  //  return vec4(unpackFloat(packFloat(999.)));
  //  //  return vec4(res, res);
}

//
//
//
//vec4 readVariable(sampler2D tex, float p, float s) {
//
//
//  float ns = bufferLength;
//  float np = particleCount;
//
//  vec2 res = vec2(ns * 4., np);
////  return vec4(999.);
////  return vec4(res, res);
//  return vec4(unpackFloat(texture2D(tex, vec2(s * 4., p) / res)));
//
////  return vec4(
////    p, s, np, ns
////  );
//
////
////  float floatChannelsPerValueCount = float(channelsPerValueCount);
////  vec2 resolution = vec2(particleCount, bufferLength * floatChannelsPerValueCount);
////
////  float bc = b * floatChannelsPerValueCount;
//
//  return vec4(
//    unpackFloat(texture2D(tex, vec2(s * 4., p) / res)),
//    unpackFloat(texture2D(tex, vec2(s * 4. + 1., p) / res)),
//    unpackFloat(texture2D(tex, vec2(s * 4. + 2., p) / res)),
//    unpackFloat(texture2D(tex, vec2(s * 4.+ 3., p) / res))
//  );
//
////  return (channelsPerValueCount == 0)
////    ? texture2D(
////        tex,
////        vec2(p, bc) / resolution
////      )
//////    : vec4(
//////        texture2D(tex, vec2(p, bc) / resolution).x,
//////        texture2D(tex, vec2(p, bc+1.) / resolution).y,
//////        texture2D(tex, vec2(p, bc+2.) / resolution).z,
//////        texture2D(tex, vec2(p, bc+3.) / resolution).w
//////    );
////    : vec4(
////        unpackFloat(texture2D(tex, vec2(s * 4., p) / res)),
////        unpackFloat(texture2D(tex, vec2(s * 4. + 1., p) / res)),
////        unpackFloat(texture2D(tex, vec2(s * 4. + 2., p) / res)),
////        unpackFloat(texture2D(tex, vec2(s * 4.+ 3., p) / res))
////    );
//}
//
////
////+
////
////float ns = bufferLength;
////float np = particleCount;
////
////vec2 res = vec2(ns * 4., np);
////
////return texture2D(tex, vec2(s * 4., p) / res);
////
////
////return vec4(
////unpackFloat(texture2D(tex, vec2(s * 4., p) / res)),
////unpackFloat(texture2D(tex, vec2(s * 4. + 1., p) / res)),
////unpackFloat(texture2D(tex, vec2(s * 4. + 2., p) / res)),
////unpackFloat(texture2D(tex, vec2(s * 4.+ 3., p) / res))
////);
////}
