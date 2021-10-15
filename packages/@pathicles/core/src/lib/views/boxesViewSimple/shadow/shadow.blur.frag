precision highp float;

#pragma glslify: decodeFloat = require("@pathicles/core/src/lib/shaders/decodeFloat.glsl");

uniform float minBias;
uniform sampler2D u_tex;
uniform float wRcp, hRcp;
const int N = 10;
const int R = 10;
uniform vec2 u_texSize;
void main()
{
  vec2 uv = gl_FragCoord.xy/u_texSize;

  float W =  float((1 + N * R) * (1 + N * R));
  // // vec3 avg = texture2D(u_tex, uv).xyz;
  vec4 avg = texture2D(u_tex, uv);
  float f = (decodeFloat(avg) - minBias > 1.) ? 1. : 0.;

  for (int x = -N; x <= +N; x++) {
    for (int y = -N; y <= +N; y++) {

      float val = decodeFloat(texture2D(u_tex, uv + vec2(float(x) * wRcp, float(y) * hRcp)));
      f +=  (val - minBias > 1.)  ?  (1.0 / W) * 1. : 0.;
    }
  }
  f = 1. - f;
  gl_FragColor = vec4(f, f, f, 1.);
  gl_FragColor = avg;
//  gl_FragColor = vec4(.5);
}
