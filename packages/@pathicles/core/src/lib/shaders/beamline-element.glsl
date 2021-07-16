#pragma glslify: export(BeamlineElement);

struct BeamlineElement {
  vec3 middle;
  vec3 size;
  float phi;
  int type; //0: drift, 1: dipole, 2: quadrupole
  float strength;
};
