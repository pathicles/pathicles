export function latticeChunk(lattice) {
  return `

  ${
    lattice.beamline.length > 0
      ? 'BeamlineElement beamline[' + lattice.beamline.length + '];'
      : 'BeamlineElement beamline[1];'
  }
  void initLatticeData() {
    ${lattice.toGLSLDefinition()};
  }
  `
}
