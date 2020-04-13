export const getters = `
  struct ParticleData {
    float charge;
    float mass;
    float chargeMassRatio;
    float particleType;
  };
  vec4 EncodeFloatRGBA( float v ) {
    vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;
    enc = fract(enc);
    enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);
    return enc;
  }
  float DecodeFloatRGBA( vec4 rgba ) {
    return dot( rgba, vec4(1.0, 1./255.0, 1./65025.0, 1./16581375.0) );
  }
  ParticleData getParticleData(float p) {
    vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);
    vec4 data = texture2D(utParticleChargesMassesChargeMassRatios, coords);
    return ParticleData(data.x, data.y, data.z, data.w);
  }
  vec4 get_color(float p) {
    vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);
    return texture2D(utParticleColorAndType, coords);
  }
  vec4 get_position(float p, float b) {
    vec2 coords = vec2(p, b) / vec2(particleCount, bufferLength);
    return texture2D(utPositionBuffer, coords);
  }
  vec4 get_velocity(float p, float b) {
    vec2 coords = vec2(p, b) / vec2(particleCount, bufferLength);
    return texture2D(utVelocityBuffer, coords);
  }
`
