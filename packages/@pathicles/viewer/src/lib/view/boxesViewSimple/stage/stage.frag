precision mediump float;
#extension GL_OES_standard_derivatives : enable


#pragma glslify: fog_exp2 = require(glsl-fog/exp2)
#pragma glslify: fog_exp = require(glsl-fog/exp)
#define FOG_START 100
#define FOG_END 500
#pragma glslify: fog_linear = require(glsl-fog/linear)



uniform vec2 uResolution;
uniform vec3 eye;
uniform sampler2D uTex;
uniform float ambientIntensity;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float fogAmount;


varying vec4 vLightNDC;
uniform sampler2D shadowMap;
uniform vec3 lightPosition;


float unpackRGBA (vec4 v) {
  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
}


float grid(vec2 st, float res, float width) {
  vec2 grid =  fract(st*res) / width;
  grid /= fwidth(st);
  return 1. - (step(res, grid.x) * step(res, grid.y));
}

void main() {

  float resolution = 10.;
  vec2 grid_st = vUv * uResolution * resolution;
  vec4 color = vec4(1., 1., 1., .0);
  color -= vec4(vec3(.75) * grid(grid_st, 1. / resolution, 2.), -.2);
  color -= vec4(vec3(.5) * grid(grid_st, 10. / resolution, 1.), -.2);

  vec3 texCoord = (vPosition - lightPosition);
  float visibility = 0.0;

//  vec3 tex = texture2D(shadow, vUv).rgb;
//  vec3 lightPos = vLightNDC.xyz / vLightNDC.w;

  //do soft shadows:
//  for (int x = 0; x < 2; x++) {
//    for (int y = 0; y < 2; y++) {
////      for (int z = 0; z < 2; z++) {
//        float bias = 0.3;
//        vec4 env = texture2D(shadow, texCoord + vec2(x,y) * vec2(0.1)).rgb;
//
//
//        vec3 lightPos = vLightNDC.xyz / vLightNDC.w;
//        float depth = lightPos.z - bias;
//        float occluder = unpackRGBA(env);
//
//        float shadow = mix(0.2, 1.0, step(depth, occluder));
//        visibility += (env.x+bias) < (distance(vPosition, lightPos)) ? 0.0 : 1.0;
////        visibility += shadow; //(env.x+bias) < (distance(vPosition, lightPos)) ? 0.0 : 1.0;
////      }
//    }
//  }w
//  visibility *= 1.0 / 8.0;

  vec3 lightPos = vLightNDC.xyz / vLightNDC.w;

  float bias = 0.02;
  float depth = lightPos.z - bias;
  float occluder = unpackRGBA(texture2D(shadowMap, lightPos.xy));

  // Compare actual depth from light to the occluded depth rendered in the depth map
  // If the occluded depth is smaller, we must be in shadow
  float shadow = mix(0.2, 1.0, step(depth, occluder));

  shadow = 1.;

  vec4 shadowedColor = color * shadow;

  gl_FragColor = shadowedColor;

  const float FOG_DENSITY = .05;
  const vec4 FOG_COLOR = vec4(1.0, 1.0, 1.0, .5);
  float fogDistance = length( vPosition);
  float fogAmount = fog_exp2(fogDistance, FOG_DENSITY);

  vec4 faggedColor = mix(shadowedColor, FOG_COLOR, fogAmount);
  gl_FragColor = vec4(faggedColor.rgb, shadowedColor.w * (1.-fogAmount));



}
