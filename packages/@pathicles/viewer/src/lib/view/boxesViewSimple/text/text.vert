precision highp float;
attribute vec3 aPosition;
//attribute vec3 aNormal;
uniform mat4 projection, view;

varying vec3 vPosition;
varying vec3 vNormal;



void main () {

  vPosition = 0.001 * aPosition;

  gl_Position = projection * view * vec4(vPosition, 1.0);

}

