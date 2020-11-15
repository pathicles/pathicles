#pragma glslify: export(readVariable);

vec4 readVariable(sampler2D tex, float p, float b) {
  float floatChannelsPerValueCount = float(channelsPerValueCount);
  vec2 resolution = vec2(particleCount, bufferLength * floatChannelsPerValueCount);

  float bc = b * floatChannelsPerValueCount;

  return (channelsPerValueCount == 0)
    ? texture2D(
        tex,
        vec2(p, bc) / resolution
      )
    : vec4(
        texture2D(tex, vec2(p, bc) / resolution).x,
        texture2D(tex, vec2(p, bc+1.) / resolution).y,
        texture2D(tex, vec2(p, bc+2.) / resolution).z,
        texture2D(tex, vec2(p, bc+3.) / resolution).w
  );
}



