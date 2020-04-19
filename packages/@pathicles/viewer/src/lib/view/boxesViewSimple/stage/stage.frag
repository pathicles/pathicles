precision mediump float;
#extension GL_OES_standard_derivatives : enable

#define FOG_DENSITY 0.2
#pragma glslify: fog_exp2 = require(glsl-fog/exp2)

const vec4 fogColor = vec4(1.0);

uniform vec2 uResolution;
uniform vec3 eye;
uniform sampler2D uTex;
uniform float ambientIntensity;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;



varying vec4 vLightNDC;
uniform sampler2D shadow;
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
  vec4 color = vec4(.8, .8, .8, .5);
  color -= vec4(vec3(.75) * grid(grid_st, 1. / resolution, 2.), -.1);
  color -= vec4(vec3(.5) * grid(grid_st, 10. / resolution, 1.), -.1);

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

  vec4 shadowedColor = color;



  float fogDistance = length( vPosition);
  float fogAmount = fog_exp2(fogDistance, FOG_DENSITY);

  gl_FragColor = vec4(
  mix(shadowedColor.rgb, fogColor.rgb, exp(- fogDistance * FOG_DENSITY)),  exp(- fogDistance * FOG_DENSITY));
//  gl_FragColor = vec4(color.rgb, 1.);


}
