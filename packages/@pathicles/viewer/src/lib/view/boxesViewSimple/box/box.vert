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
  vScale = aScale;
//  vScale.x = .2;
//  vScale.z = .2;
  vec4 worldPosition = model * vec4(aPosition*vScale+aOffset, 1.0);
  vPosition = worldPosition.xyz;
  vNormal = aNormal;


  gl_Position = projection * view * worldPosition;
}
