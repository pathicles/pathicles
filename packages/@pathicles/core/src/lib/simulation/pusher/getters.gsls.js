export const getters = `
  struct ParticleData {
    float charge;
    float mass;
    float chargeMassRatio;
    float particleType;
  };
  ParticleData getParticleData(float p) {
    vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);
    vec4 data = texture2D(utParticleChargesMassesChargeMassRatios, coords);
    return ParticleData(data.x, data.y, data.z, data.w);
  }

  // vec4 get_color(float p) {
  //   vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);
  //   return texture2D(utParticleColorAndType, coords);
  // }

  vec4 readVariable(sampler2D tex, float p, float b) {

    return texture2D(tex,
      vec2(p, b) /
      vec2(particleCount, bufferLength));

    // float x = texture2D(tex,
    //   vec2(p + particleCount * 0., b) /
    //   vec2(particleCount, bufferLength)).x;
    //
    // float y = texture2D(tex,
    //   vec2(p + particleCount * 1., b) /
    //   vec2(particleCount, bufferLength)).y;
    //
    // float z = texture2D(tex,
    //   vec2(p + particleCount * 2., b) /
    //   vec2(particleCount, bufferLength)).z;
    //
    // float w = texture2D(tex,
    //   vec2(p + particleCount * 3., b) /
    //   vec2(particleCount, bufferLength)).w;
    //
    // return vec4(x, y, z, w);
  }

`
