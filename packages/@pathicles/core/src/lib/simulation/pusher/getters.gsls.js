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

  vec4 readVariable(sampler2D tex, float p, float b) {

    return texture2D(tex,
      vec2(p, b) /
      vec2(particleCount, bufferLength));

    float x = texture2D(tex,
      vec2(p, b) /
      vec2(particleCount, bufferLength * 4.)).x;

    float y = texture2D(tex,
      vec2(p, b ) /
      vec2(particleCount, bufferLength * 4.)).y;

    float z = texture2D(tex,
      vec2(p, b) /
      vec2(particleCount, bufferLength )).z;

    float w = texture2D(tex,
      vec2(p, b) /
      vec2(particleCount, bufferLength )).w;



    // float x = texture2D(tex,
    //   vec2(p, b + particleCount * 4. * 0.) /
    //   vec2(particleCount, bufferLength)).x;
    //
    // float y = texture2D(tex,
    //   vec2(p, b + 1.) /
    //   vec2(particleCount, bufferLength)).y;
    //
    // float z = texture2D(tex,
    //   vec2(p, b +  2.) /
    //   vec2(particleCount, bufferLength)).z;
    //
    // float w = texture2D(tex,
    //   vec2(p , b + 3.) /
    //   vec2(particleCount, bufferLength)).w;

    return vec4(x, y, z, w);
  }

`
