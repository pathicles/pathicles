precision highp float;

attribute vec3 position;
//
uniform vec3 uOffset;
uniform mat4 projection;
uniform mat4 view;

uniform mat4 shadowProjectionMatrix;
uniform mat4 shadowViewMatrix;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vShadowCoord;


void main () {
  //  vUv = uv / 1.;
  vPosition = position + uOffset;

  vec4 worldPosition =vec4(position, 1.0);
  vPosition = worldPosition.xyz;


  float fogDistance = length(vPosition.xyz);
//  fogAmount = fog_exp2(fogDistance, FOG_DENSITY);
  vShadowCoord = (shadowProjectionMatrix * shadowViewMatrix * worldPosition).xyz;
  gl_Position = projection * view * vec4(vPosition, 1.);
}
