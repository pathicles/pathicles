precision mediump float;
#extension GL_OES_standard_derivatives : enable

uniform vec2 uResolution;
uniform vec3 eye;
uniform sampler2D uTex;
uniform float ambientIntensity;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

const vec3 fogColor = vec3(1.0);
const float FogDensity = 0.3;


float grid(vec2 st, float res, float width) {
  vec2 grid =  fract(st*res) / width;
  grid /= fwidth(st);
  return 1. - (step(res, grid.x) * step(res, grid.y));
}

void main() {

  float resolution = 1.;
  vec2 grid_st = vUv * uResolution * resolution;
  vec3 color = vec3(.6);
  color -= vec3(.75) * grid(grid_st, 1. / resolution, 3.);
  color -= vec3(.5) * grid(grid_st, 10. / resolution, 1.);

  float fogDistance = length(eye - vPosition);

  gl_FragColor = vec4(color.rgb, exp(- fogDistance * FogDensity));

}
