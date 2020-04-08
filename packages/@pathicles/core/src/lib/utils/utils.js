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

export function latticeChunk(lattice) {
  return `
  int BEAMLINE_ELEMENT_TYPE_DRIFT = 0;
  int BEAMLINE_ELEMENT_TYPE_DIPOLE = 1;
  int BEAMLINE_ELEMENT_TYPE_QUADRUPOLE = 2;
  struct BeamlineElement {
    vec3 start;
    vec3 end;
    int type; //0: drift, 1: dipole, 2: quadrupole
    float strength;
  };

  ${
    lattice.beamline.length > 0
      ? 'BeamlineElement beamline[' + lattice.beamline.length + '];'
      : 'BeamlineElement beamline[1];'
  }

  BeamlineElement getBeamlineElement(float id) {
    for (int i=0; i < ${Math.min(lattice.beamline.length, 1000)}; i++) {
        if (float(i) == id) return beamline[i];
    }
  }

  BeamlineElement getClosestBeamlineElement(vec3 position) {

    float bestLength = 1000.;
    int bestIndex = 0;

    for (int i=0; i < ${lattice.beamline.length}; i++) {

      BeamlineElement bl = getBeamlineElement(float(i));
      float currentLength = length(position - (bl.start+bl.end)/2.) ;
      if (currentLength < bestLength) {

        bestIndex = i;
        bestLength = currentLength;
      }
  }
  return getBeamlineElement(float(bestIndex));
  }

  void initLatticeData() {
    ${lattice.toGLSLDefinition()};
  }
  `
}
