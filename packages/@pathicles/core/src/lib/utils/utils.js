export function particleTypeArrayDefintion(particleTypes) {
  return particleTypes.map((v, i) => `ptype[${i}]=${v}.`).join(';')
}

export const lookAt = `
  mat4 lookAt(vec3 eye, vec3 at, vec3 up) {
      vec3 zaxis = normalize(eye - at);
      vec3 xaxis = normalize(cross(zaxis, up));
      vec3 yaxis = cross(xaxis, zaxis);
      zaxis *= -1.;
      return mat4(
        vec4(xaxis.x, xaxis.y, xaxis.z, -dot(xaxis, eye)),
        vec4(yaxis.x, yaxis.y, yaxis.z, -dot(yaxis, eye)),
        vec4(zaxis.x, zaxis.y, zaxis.z, -dot(zaxis, eye)),
        vec4(0, 0, 0, 1)
      );
    }
  `

export const rotateY = `
export function rotateY(out, a, rad) {
  let s = Math.sin(rad);
  let c = Math.cos(rad);
  let a00 = a[0];
  let a01 = a[1];
  let a02 = a[2];
  let a03 = a[3];
  let a20 = a[8];
  let a21 = a[9];
  let a22 = a[10];
  let a23 = a[11];
  if (a !== out) { // If the source and destination differ, copy the unchanged rows
    out[4]  = a[4];
    out[5]  = a[5];
    out[6]  = a[6];
    out[7]  = a[7];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  // Perform axis-specific matrix multiplication
  out[0] = a00 * c - a20 * s;
  out[1] = a01 * c - a21 * s;
  out[2] = a02 * c - a22 * s;
  out[3] = a03 * c - a23 * s;
  out[8] = a00 * s + a20 * c;
  out[9] = a01 * s + a21 * c;
  out[10] = a02 * s + a22 * c;
  out[11] = a03 * s + a23 * c;
  return out;
}

`

export const inverseMat4 = `
 mat4 inverse(mat4 m) {
  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],
    a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],
    a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],
    a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],

    b00 = a00 * a11 - a01 * a10,
    b01 = a00 * a12 - a02 * a10,
    b02 = a00 * a13 - a03 * a10,
    b03 = a01 * a12 - a02 * a11,
    b04 = a01 * a13 - a03 * a11,
    b05 = a02 * a13 - a03 * a12,
    b06 = a20 * a31 - a21 * a30,
    b07 = a20 * a32 - a22 * a30,
    b08 = a20 * a33 - a23 * a30,
    b09 = a21 * a32 - a22 * a31,
    b10 = a21 * a33 - a23 * a31,
    b11 = a22 * a33 - a23 * a32,

    det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 *
    b06;

  return mat4(
    a11 * b11 - a12 * b10 + a13 * b09,
    a02 * b10 - a01 * b11 - a03 * b09,
    a31 * b05 - a32 * b04 + a33 * b03,
    a22 * b04 - a21 * b05 - a23 * b03,
    a12 * b08 - a10 * b11 - a13 * b07,
    a00 * b11 - a02 * b08 + a03 * b07,
    a32 * b02 - a30 * b05 - a33 * b01,
    a20 * b05 - a22 * b02 + a23 * b01,
    a10 * b10 - a11 * b08 + a13 * b06,
    a01 * b08 - a00 * b10 - a03 * b06,
    a30 * b04 - a31 * b02 + a33 * b00,
    a21 * b02 - a20 * b04 - a23 * b00,
    a11 * b07 - a10 * b09 - a12 * b06,
    a00 * b09 - a01 * b07 + a02 * b06,
    a31 * b01 - a30 * b03 - a32 * b00,
    a20 * b03 - a21 * b01 + a22 * b00) / det;
  }
`

export const getters = `
  // vec4 getPosition(float p, float g) {
  //   vec2 coords = vec2( p + .5, g + .5) / vec2(particleCount, bufferLength);
  //   return texture2D(uTexPositions, coords);
  // }
  vec4 EncodeFloatRGBA( float v ) {
    vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;
    enc = fract(enc);
    enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);
    return enc;
  }
  float DecodeFloatRGBA( vec4 rgba ) {
    return dot( rgba, vec4(1.0, 1./255.0, 1./65025.0, 1./16581375.0) );
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

export const transposeMat4 = `
  mat4 transpose(mat4 m) {
    return mat4(m[0][0], m[1][0], m[2][0], m[3][0],
      m[0][1], m[1][1], m[2][1], m[3][1],
      m[0][2], m[1][2], m[2][2], m[3][2],
      m[0][3], m[1][3], m[2][3], m[3][3]);
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

export function particleDataChunk(particleTypes) {
  return `
const float chargeMassRatio_unit_Ckg_1_0 = 0.;
const float chargeMassRatio_unit_Ckg_1_1 = -1.75882004556243e+11;
const float chargeMassRatio_unit_Ckg_1_2 = 1.75882004556243e+11;
const float chargeMassRatio_unit_Ckg_1_3 = 9.57883323113770929296814695637e+7;
const float chargeMassRatioOverC_unit_Ckg_1_0 = 0.;
const float chargeMassRatioOverC_unit_Ckg_1_1 = -5.86679217114404525813654725097e+2;
const float chargeMassRatioOverC_unit_Ckg_1_2 = 5.86679217114404525813654725097e+2;
const float chargeMassRatioOverC_unit_Ckg_1_3 = 3.19515483979844149381503119735e-1 ;
const float charge_unit_qe_0 = 0.;
const float charge_unit_qe_1 = -1.;
const float charge_unit_qe_2 = 1.;
const float charge_unit_qe_3 = 1.;
const float mass_unit_eVc_2_0 = 0.;
const float mass_unit_eVc_2_1 = 510998.94;
const float mass_unit_eVc_2_2 = 510998.94;
const float mass_unit_eVc_2_3 = 938272081.;
const vec3 pathicle_color_0 = vec3(0.7, 0.7, 0.0);
const vec3 pathicle_color_1 = vec3(0.12, 0.45, 0.65);
const vec3 pathicle_color_2 = vec3(0.12, 0.45, 0.65);
const vec3 pathicle_color_3 = vec3(0.77, 0.2, 0.2);


float ptype[${particleTypes.length}];

float getParticleType(float id) {
  for (int i=0; i < 2048; i++) {
      if (float(i) == id) return ptype[i];
  }
}

struct ParticleData {
  float mass;
  float charge;
  float chargeMassRatio;
  vec3 color;
};

const ParticleData particleData_0 = ParticleData(
  mass_unit_eVc_2_0,
  charge_unit_qe_0,
  chargeMassRatio_unit_Ckg_1_0,
  pathicle_color_0
);
const ParticleData particleData_1 = ParticleData(
  mass_unit_eVc_2_1,
  charge_unit_qe_1,
  chargeMassRatio_unit_Ckg_1_1,
  pathicle_color_1
);
const ParticleData particleData_2 = ParticleData(
  mass_unit_eVc_2_2,
  charge_unit_qe_2,
  chargeMassRatio_unit_Ckg_1_2,
  pathicle_color_2
);
const ParticleData particleData_3 = ParticleData(
  mass_unit_eVc_2_3,
  charge_unit_qe_3,
  chargeMassRatio_unit_Ckg_1_3,
  pathicle_color_3
);

ParticleData getParticleData(float p) {

  float particleType = getParticleType(p);

  if (particleType == 0.) {
    return particleData_0;
  } else if (particleType == 1.) {
    return particleData_1;
  } else if (particleType == 2.) {
    return particleData_2;
  } else {
    return particleData_3;
  }
}
void initParticleData()  {

  ${particleTypeArrayDefintion(particleTypes)};
}
`
}
