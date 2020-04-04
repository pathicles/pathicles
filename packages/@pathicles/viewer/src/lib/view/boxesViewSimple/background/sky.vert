precision highp float;
varying vec3 vWorldPosition;
varying vec2 vUv;
attribute vec3 aPosition;
attribute vec2 uv;

uniform mat4 projection;
uniform mat4 model;
uniform mat4 view;

void main()
{
  vUv = uv;
  //vec4 worldPosition = model * vec4(aPosition, 1.0);
  //  vWorldPosition = worldPosition.xyz;
  gl_Position = projection * view * model * vec4(aPosition, 1.0);
}
