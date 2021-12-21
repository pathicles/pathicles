//precision highp float;
uniform sampler2D texture;
uniform float decode;
varying vec2 uv;
float unpackRGBA (vec4 v) {
  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
}
void main () {
  vec4 texel = texture2D(texture, uv);
  gl_FragColor = (decode == 0.) ? texel :
    (decode == 1.) ?  vec4(unpackRGBA(texel),0.,0.,1.)
    : vec4(texel.r,texel.r,texel.r,1.);
}




