#pragma glslify: export(BeamlineElement);

struct BeamlineElement {
  vec3 start;
  vec3 end;
  int type; //0: drift, 1: dipole, 2: quadrupole
  float strength;
};




