precision highp float;
uniform sampler2D texture;
varying vec2 uv;
void main () {
  vec4 texel = texture2D(texture, uv);
  gl_FragColor = texel.r < 0.
    ? vec4(texel.r, 0., 0., 1.)
    : vec4(0., texel.r, 0., 1.);
}




