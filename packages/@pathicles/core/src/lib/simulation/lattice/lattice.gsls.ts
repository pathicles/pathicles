export function latticeChunk(lattice) {
  return `

  ${
    lattice.activeBeamlineElements().length > 0
      ? 'BeamlineElement beamline[' +
        lattice.activeBeamlineElements().length +
        '];'
      : 'BeamlineElement beamline[1];'
  }
  void initLatticeData() {
    ${lattice.toGLSLDefinition()};
  }
  `
}
