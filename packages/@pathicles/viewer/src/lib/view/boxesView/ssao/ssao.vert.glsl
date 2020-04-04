precision mediump float;
attribute vec2 xy;
varying vec2 uv;
void main () {
  uv = 0.5 * (1.0 + xy);
  gl_Position = vec4(xy, 0, 1);
}
