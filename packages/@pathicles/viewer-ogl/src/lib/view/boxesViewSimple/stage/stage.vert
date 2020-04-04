precision highp float;
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
varying vec3 vNormal;

void main () {
  vUv = uv;
  vNormal = normal;
  vPosition = position +  uOffset;

  gl_Position = projection * view * vec4(vPosition, 1.);
}
