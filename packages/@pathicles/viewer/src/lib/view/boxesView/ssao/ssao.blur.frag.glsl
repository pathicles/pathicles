precision mediump float;
uniform sampler2D ssaoBuffer;
varying vec2 uv;
uniform vec2 h;
uniform float blur;
void main () {
  float use;
  float result = 0.0;
  float cnt = 0.0;
  for (float i = -1.0; i <= 1.1; i += 0.5) {
    for (float j = -1.0; j <= 1.1; j += 0.5) {
      vec4 value = texture2D(ssaoBuffer, uv + vec2(h.x * i, h.y * j) * blur);
      use = value.w == 0.0 ? 0.0 : 1.0;
      result += value.x * use;
      cnt += use;
    }
  }
  float value = result / max(cnt, 1.0);
  // value = .5;
  gl_FragColor = vec4(vec3(value), 1);
}
