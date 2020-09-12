precision highp float;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vScale;

attribute vec3 aOffset;
attribute vec3 aScale;
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 uv;


uniform mat4 projection;
uniform mat4 model;
uniform mat4 view;

void main()
{
  vUv = uv;
  vec4 worldPosition = model * vec4(aPosition*aScale+aOffset, 1.0);
  vPosition = worldPosition.xyz;
  vNormal = aNormal;
  vScale = aScale;
  gl_Position = projection * view * worldPosition;
}
