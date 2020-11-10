#pragma glslify: export(readVariable);

vec4 readVariable(sampler2D tex, float p, float b) {
    return texture2D(
      tex,
      vec2(p, b) / vec2(particleCount, bufferLength * channelsPerValueCount)
    );
  //  return texture2D(tex, vec2(p + particleCount * 0., b) /
  //  vec2(particleCount, bufferLength));
  float x = texture2D(tex,
  vec2(p, b) /
  vec2(particleCount, bufferLength * channelsPerValueCount)).x;

  float y = texture2D(tex,
  vec2(p, b + 1.) /
  vec2(particleCount, bufferLength * channelsPerValueCount)).y;

  float z = texture2D(tex,
  vec2(p, b + 2.) /
  vec2(particleCount, bufferLength * channelsPerValueCount)).z;

  float w = texture2D(tex,
  vec2(p, b + 3.) /
  vec2(particleCount, bufferLength * channelsPerValueCount)).w;

  return vec4(x, y, z, w);
}


