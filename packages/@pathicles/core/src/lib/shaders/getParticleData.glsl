#pragma glslify: export(getParticleData);

ParticleData getParticleData(float p) {
  vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);
  vec4 data = texture2D(utParticleChargesMassesChargeMassRatios, coords);
  return ParticleData(data.x, data.y, data.z, data.w);
}


