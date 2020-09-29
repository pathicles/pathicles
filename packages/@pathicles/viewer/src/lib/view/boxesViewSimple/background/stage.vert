precision highp float;


#define FOG_DENSITY 0.2
#define FOG_START 10.
#define FOG_END 20.
#pragma glslify: fog_linear = require(glsl-fog/linear)
#pragma glslify: fog_exp2 = require(glsl-fog/exp2)

attribute vec3 position;
//
uniform vec3 uOffset;
uniform mat4 projection;
uniform mat4 view;
//
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying float fogAmount;

void main () {
  //  vUv = uv / 1.;
  vPosition = position + uOffset;
  gl_Position = projection * view * vec4(vPosition, 1.);

  float fogDistance = length(vPosition.xyz);
  fogAmount = fog_exp2(fogDistance, FOG_DENSITY);
  fogAmount = fog_linear(fogDistance, FOG_START, FOG_END);
}
