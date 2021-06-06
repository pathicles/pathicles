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
    float currentLength = min(length(position - bl.start), length(position - bl.end));
    if (currentLength < bestLength) {

      bestIndex = i;
      bestLength = currentLength;
    }
  }
  return getBeamlineElement(float(bestIndex));
}

