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
const float FogDensity = 0.2;


float grid(vec2 st, float res){
  vec2 grid = fract(st*res);
    grid /= fwidth(st);
  return 1.-(step(res,grid.x) * step(res,grid.y));
}

void main() {

  float resolution = 5.;

  vec2 grid_st = vUv * uResolution * resolution;

  vec3 color = vec3(1.);
  color -= vec3(.5, .5, 0.) * grid(grid_st, 1. / resolution);
  color -= vec3(0.2) * grid(grid_st, 10. / resolution);

  float fogDistance = length(eye - vPosition);

  gl_FragColor =
    mix(
      vec4(color.rgb, 1.),
      vec4(fogColor, 1),
      1.0 - exp( - fogDistance * FogDensity )
    );

}
