precision mediump float;
#extension GL_OES_standard_derivatives : enable
#define FOG_DENSITY 0.1
#pragma glslify: fog_exp2 = require(glsl-fog/exp2)


uniform vec2 uResolution;
uniform vec3 eye;
uniform sampler2D uTex;
uniform float ambientIntensity;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

const vec4 fogColor = vec4(1.0);



float grid(vec2 st, float res, float width) {
  vec2 grid =  fract(st*res) / width;
  grid /= fwidth(st);
  return 1. - (step(res, grid.x) * step(res, grid.y));
}

void main() {

  float resolution = 1.;
  vec2 grid_st = vUv * uResolution * resolution;
  vec3 color = vec3(.9);
  color -= vec3(.75) * grid(grid_st, 1. / resolution, 2.);
  color -= vec3(.5) * grid(grid_st, 10. / resolution, 1.);

  float fogDistance = length(vPosition - eye); //gl_FragCoord.z / gl_FragCoord.w;
  float fogAmount = fog_exp2(fogDistance, FOG_DENSITY);

  vec4 color4 = vec4(color, .5);

  gl_FragColor = mix(color4,
        fogColor,
        fogAmount);




//  gl_FragColor = vec4(color.rgb, 1.);

}
