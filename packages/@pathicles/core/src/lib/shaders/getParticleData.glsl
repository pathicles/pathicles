#pragma glslify: export(getParticleData);

ParticleData getParticleData(int p) {
  vec2 coords = vec2(float(p), 0.) / vec2(float(particleCount), 1.);
  vec4 data = texture2D(utParticleChargesMassesChargeMassRatios, coords);
  return ParticleData(data.x, data.y, data.z, data.w);
}


