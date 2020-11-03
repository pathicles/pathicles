precision highp float;

attribute vec3 position;
attribute vec2 uv;
//
uniform vec3 uOffset;
uniform mat4 projection;
uniform mat4 view;

uniform mat4 shadowProjectionMatrix;
uniform mat4 shadowViewMatrix;
uniform vec3 shadowDirection;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vShadowCoord;
const mat4 texUnitConverter = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);


void main () {
  vUv = uv / 1.2 ;
  vPosition = position + uOffset;

  vec4 worldPosition = vec4(position, 1.0);
  vPosition = worldPosition.xyz;
  vShadowCoord = (texUnitConverter * shadowProjectionMatrix * shadowViewMatrix * worldPosition).xyz;

  gl_Position = projection * view * vec4(vPosition, 1.);
}
