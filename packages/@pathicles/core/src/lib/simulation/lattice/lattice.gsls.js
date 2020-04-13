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
    for (int i=0; i < ${Math.min(lattice.beamline.length, 100)}; i++) {
        if (float(i) == id) return beamline[i];
    }
  }

  BeamlineElement getClosestBeamlineElement(vec3 position) {

    float bestLength = 50.;
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
