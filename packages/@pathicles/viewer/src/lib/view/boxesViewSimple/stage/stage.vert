precision mediump float;
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

uniform mat4 shadowViewMatrix_top;
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

  vLightNDC = depthScaleMatrix * shadowProjectionMatrix * shadowViewMatrix_top  * vec4(vPosition, 1.0);

  gl_Position = projection * view * vec4(vPosition, 1.);
}
