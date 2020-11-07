#pragma glslify: export(readVariable);

vec4 readVariable(sampler2D tex, float p, float b) {
    return texture2D(
      tex,
      vec2(p, b) / vec2(particleCount, bufferLength  *channelsPerValueCount)
    );
  //  return texture2D(tex, vec2(p + particleCount * 0., b) /
  //  vec2(particleCount, bufferLength));
  float x = texture2D(tex,
  vec2(p + particleCount * 0., b) /
  vec2(particleCount, bufferLength)).z;

  float y = texture2D(tex,
  vec2(p + particleCount * 1., b) /
  vec2(particleCount, bufferLength)).y;

  float z = texture2D(tex,
  vec2(p + particleCount * 2., b) /
  vec2(particleCount, bufferLength)).z;

  float w = texture2D(tex,
  vec2(p + particleCount * 3., b) /
  vec2(particleCount, bufferLength)).w;

  return vec4(x, y, z, w);
}


