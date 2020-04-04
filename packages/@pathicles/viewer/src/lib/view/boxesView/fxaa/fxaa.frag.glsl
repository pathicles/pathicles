precision mediump float;

uniform vec2 resolution;
uniform sampler2D iChannel0;
uniform bool enabled;

//import our fxaa shader
//  g#pragmalslify: fxaa = require(glsl-fxaa)
#pragma glslify: fxaa = require(./glsl-fxaa/index.glsl)

void main() {
  vec2 uv = vec2(gl_FragCoord.xy / resolution.xy);
//   uv.y = 1.0 - uv.y;

  //can also use gl_FragCoord.xy
  vec2 fragCoord = uv * resolution;

  vec4 color;
  if (enabled) {
      color = fxaa(iChannel0, fragCoord, resolution);
  } else {
      color = texture2D(iChannel0, uv);
  }

  gl_FragColor = color;
}
