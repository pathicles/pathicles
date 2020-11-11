precision highp float;
attribute vec2 aXY;

void main () {
  gl_Position = vec4(aXY, 0, 1);
}

