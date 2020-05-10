precision highp float;


#define FOG_DENSITY 0.2
#define FOG_START 10.
#define FOG_END 20.
#pragma glslify: fog_linear = require(glsl-fog/linear)
#pragma glslify: fog_exp2 = require(glsl-fog/exp2)


attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
//
uniform vec3 uOffset;
uniform mat4 projection;
uniform mat4 view;
//
varying vec2 vUv;
varying vec3 vPosition;
varying float fogAmount;

uniform mat4 shadowViewMatrix;
uniform mat4 shadowProjectionMatrix;
varying vec4 vLightNDC;
// Matrix to shift range from -1->1 to 0->1
const mat4 depthScaleMatrix = mat4(
0.5, 0, 0, 0,
0, 0.5, 0, 0,
0, 0, 0.5, 0,
0.5, 0.5, 0.5, 1
);

void main () {
  vUv = uv / 1.;
  vPosition = position + uOffset;

  vLightNDC = depthScaleMatrix * shadowProjectionMatrix * shadowViewMatrix  * vec4(vPosition, 1.0);

  gl_Position = projection * view * vec4(vPosition, 1.);

  float fogDistance = length(vPosition.xyz);
  fogAmount = fog_exp2(fogDistance, FOG_DENSITY);
  fogAmount = fog_linear(fogDistance, FOG_START, FOG_END);
}
