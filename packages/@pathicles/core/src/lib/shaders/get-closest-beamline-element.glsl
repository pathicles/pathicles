#pragma glslify: export(getClosestBeamlineElement);

BeamlineElement getBeamlineElement(float id) {
  for (int i=0; i < BEAMLINE_ELEMENT_COUNT; i++) {
    if (float(i) == id) return beamline[i];
  }
  return beamline[0];
}
BeamlineElement getClosestBeamlineElement(vec3 position) {

  float bestLength = 50.;
  int bestIndex = 0;

  for (int i=0; i < BEAMLINE_ELEMENT_COUNT; i++) {

    BeamlineElement bl = getBeamlineElement(float(i));
    float currentLength = length(position - (bl.start+bl.end)/2.) ;
    if (currentLength < bestLength) {

      bestIndex = i;
      bestLength = currentLength;
    }
  }
  return getBeamlineElement(float(bestIndex));
}

