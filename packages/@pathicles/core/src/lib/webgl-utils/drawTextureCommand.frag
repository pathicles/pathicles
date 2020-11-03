precision highp float;
uniform sampler2D texture;
varying vec2 uv;
void main () {
  vec4 texel = texture2D(texture, uv);
  gl_FragColor = texel;
}




