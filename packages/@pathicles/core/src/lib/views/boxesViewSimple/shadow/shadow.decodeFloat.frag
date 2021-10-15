precision mediump float;
uniform sampler2D texture;
varying vec2 uv;

#pragma glslify: decodeFloat = require("@pathicles/core/src/lib/shaders/decodeFloat.glsl");

void main () {

  vec4 texel = texture2D(texture, uv);
   float depth = decodeFloat(texel);

  gl_FragColor = texel; //vec4(uv,uv);
   gl_FragColor = vec4(uv.x);
}

