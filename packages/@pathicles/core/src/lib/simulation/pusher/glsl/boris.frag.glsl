precision highp float;
const highp float c = 2.99792458e+8;

uniform bool littleEndian;
uniform float boundingBoxSize;
uniform float deltaTOverC;
uniform float particleInteraction;
uniform int takeSnapshot;
uniform int variableIdx;
uniform sampler2D ut_particleChargesMassesChargeMassRatios;
uniform sampler2D ut_position;
uniform sampler2D ut_velocity;
uniform vec2 resolution;
uniform vec3 boundingBoxCenter;
uniform vec3 electricField;
uniform vec3 magneticField;

struct BeamlineElement {
  vec3 middle;
  vec3 size;
  float phi;
  int type; //0: drift, 1: dipole, 2: quadrupole, 3: esta
  float strength;
};

const int BEAMLINE_ELEMENT_TYPE_DRIFT = 0;
const int BEAMLINE_ELEMENT_TYPE_DIPOLE = 1;
const int BEAMLINE_ELEMENT_TYPE_QUADRUPOLE = 2;
const int BEAMLINE_ELEMENT_TYPE_ESTA = 3;

/*__latticeSize__*/
/*__latticeChunkGLSL__*/

mat2 rot2D(float phi) {
  float c = cos(phi);
  float s = sin(phi);
  return mat2(c, -s, s, c);
}
float sdBox(vec3 p, vec3 s) {
  vec3 d = abs(p) - .5 * s;
  return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
}
#define FLOAT_MAX  1.70141184e38
#define FLOAT_MIN  1.17549435e-38

lowp vec4 packFloat(highp float v) {
  highp float av = abs(v);

  //Handle special cases
  if(av < FLOAT_MIN) {
    return vec4(0.0, 0.0, 0.0, 0.0);
  } else if(v > FLOAT_MAX) {
    return vec4(127.0, 128.0, 0.0, 0.0) / 255.0;
  } else if(v < -FLOAT_MAX) {
    return vec4(255.0, 128.0, 0.0, 0.0) / 255.0;
  }

  highp vec4 c = vec4(0,0,0,0);

  //Compute exponent and mantissa
  highp float e = floor(log2(av));
  highp float m = av * pow(2.0, -e) - 1.0;

  //Unpack mantissa
  c[1] = floor(128.0 * m);
  m -= c[1] / 128.0;
  c[2] = floor(32768.0 * m);
  m -= c[2] / 32768.0;
  c[3] = floor(8388608.0 * m);

  //Unpack exponent
  highp float ebias = e + 127.0;
  c[0] = floor(ebias / 2.0);
  ebias -= c[0] * 2.0;
  c[1] += floor(ebias) * 128.0;

  //Unpack sign bit
  c[0] += 128.0 * step(0.0, -v);

  //Scale back to range
  return c / 255.0;
}

float shiftRight(float v, float amt) {
    v = floor(v) + 0.5;
    return floor(v / exp2(amt));
}
float shiftLeft(float v, float amt) {
    return floor(v * exp2(amt) + 0.5);
}
float maskLast(float v, float bits) {
    return mod(v, shiftLeft(1.0, bits));
}
float extractBits(float num, float from, float to) {
    from = floor(from + 0.5);
    to = floor(to + 0.5);
    return maskLast(shiftRight(num, from), to - from);
}
vec4 floatToRgba(float texelFloat, bool littleEndian) {
    if(texelFloat == 0.0)
        return vec4(0, 0, 0, 0);
    float sign = texelFloat > 0.0 ? 0.0 : 1.0;
    texelFloat = abs(texelFloat);
    float exponent = floor(log2(texelFloat));
    float biased_exponent = exponent + 127.0;
    float fraction = ((texelFloat / exp2(exponent)) - 1.0) * 8388608.0;
    float t = biased_exponent / 2.0;
    float last_bit_of_biased_exponent = fract(t) * 2.0;
    float remaining_bits_of_biased_exponent = floor(t);
    float byte4 = extractBits(fraction, 0.0, 8.0) / 255.0;
    float byte3 = extractBits(fraction, 8.0, 16.0) / 255.0;
    float byte2 = (last_bit_of_biased_exponent * 128.0 + extractBits(fraction, 16.0, 23.0)) / 255.0;
    float byte1 = (sign * 128.0 + remaining_bits_of_biased_exponent) / 255.0;
    return (littleEndian ? vec4(byte4, byte3, byte2, byte1) : vec4(byte1, byte2, byte3, byte4));
}

struct ParticleData {
  float charge;
  float mass;
  float chargeMassRatio;
  float particleType;
};

ParticleData getParticleData(int p) {
  vec2 coords = vec2(float(p), 0.) / vec2(float(resolution.y), 1.);
  vec4 data = texture2D(ut_particleChargesMassesChargeMassRatios, coords);
  return ParticleData(data.x, data.y, data.z, data.w);
}

#ifdef PACK_FLOAT

// Denormalize 8-bit color channels to integers in the range 0 to 255.
ivec4 floatsToBytes(vec4 inputFloats, bool littleEndian) {
  ivec4 bytes = ivec4(inputFloats * 255.0);
  return (
    littleEndian
    ? bytes.abgr
    : bytes
  );
}

// Break the four bytes down into an array of 32 bits.
void bytesToBits(const in ivec4 bytes, out bool bits[32]) {
  for (int channelIndex = 0; channelIndex < 4; ++channelIndex) {
    float acc = float(bytes[channelIndex]);
    for (int indexInByte = 7; indexInByte >= 0; --indexInByte) {
      float powerOfTwo = exp2(float(indexInByte));
      bool bit = acc >= powerOfTwo;
      bits[channelIndex * 8 + (7 - indexInByte)] = bit;
      acc = mod(acc, powerOfTwo);
    }
  }
}

// Compute the exponent of the 32-bit float.
float getExponent(bool bits[32]) {
  const int startIndex = 1;
  const int bitStringLength = 8;
  const int endBeforeIndex = startIndex + bitStringLength;
  float acc = 0.0;
  int pow2 = bitStringLength - 1;
  for (int bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {
    acc += float(bits[bitIndex]) * exp2(float(pow2--));
  }
  return acc;
}

// Compute the mantissa of the 32-bit float.
float getMantissa(bool bits[32], bool subnormal) {
  const int startIndex = 9;
  const int bitStringLength = 23;
  const int endBeforeIndex = startIndex + bitStringLength;
  // Leading/implicit/hidden bit convention:
  // If the number is not subnormal (with exponent 0), we add a leading 1 digit.
  float acc = float(!subnormal) * exp2(float(bitStringLength));
  int pow2 = bitStringLength - 1;
  for (int bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {
    acc += float(bits[bitIndex]) * exp2(float(pow2--));
  }
  return acc;
}

// Parse the float from its 32 bits.
float bitsToFloat(bool bits[32]) {
  float signBit = float(bits[0]) * -2.0 + 1.0;
  float exponent = getExponent(bits);
  bool subnormal = abs(exponent - 0.0) < 0.01;
  float mantissa = getMantissa(bits, subnormal);
  float exponentBias = 127.0;
  return signBit * mantissa * exp2(exponent - exponentBias - 23.0);
}

// Decode a 32-bit float from the RGBA color channels of a texel.
float rgbaToFloat(vec4 texelRGBA, bool littleEndian) {
  ivec4 rgbaBytes = floatsToBytes(texelRGBA, littleEndian);
  bool bits[32];
  bytesToBits(rgbaBytes, bits);
  return bitsToFloat(bits);
}

#endif

vec4 readVariable(sampler2D tex, int p, int s) {

#ifdef PACK_FLOAT
  return vec4(rgbaToFloat(texture2D(tex, vec2(4 * s, p) / resolution), littleEndian), 
  rgbaToFloat(texture2D(tex, vec2(4 * s + 1, p) / resolution), littleEndian), 
  rgbaToFloat(texture2D(tex, vec2(4 * s + 2, p) / resolution), littleEndian), 
  rgbaToFloat(texture2D(tex, vec2(4 * s + 3, p) / resolution), littleEndian));
#else
  return vec4(texture2D(tex, vec2(4 * s, p) / resolution).r, texture2D(tex, vec2(4 * s + 1, p) / resolution).r, texture2D(tex, vec2(4 * s + 2, p) / resolution).r, texture2D(tex, vec2(4 * s + 3, p) / resolution).r);
#endif
}

vec3 reflection(vec3 v, vec3 bottomLeft, vec3 topRight) {
  return 2. * (step(bottomLeft, v) - step(topRight, v)) - vec3(1.);
}
vec3 getE(vec3 position) {

  vec3 E = electricField;

  for(int i = 0; i < BEAMLINE_ELEMENT_COUNT; i++) {
    BeamlineElement ble = beamline[i];
    if(ble.type == BEAMLINE_ELEMENT_TYPE_ESTA) {
      vec3 localPosition = position;
      localPosition -= ble.middle;
      localPosition.xz *= rot2D(ble.phi);
      if(sdBox(localPosition, ble.size) <= 0.) {
        E += vec3(0., 0., ble.strength);
      }
    }
  }
  return E;
}

vec3 getB(vec3 position) {
  vec3 B = magneticField;

  for(int i = 0; i < BEAMLINE_ELEMENT_COUNT; i++) {
    BeamlineElement ble = beamline[i];
    vec3 localPosition = position;
    localPosition -= ble.middle;
    localPosition.xz *= rot2D(ble.phi);
    if(sdBox(localPosition, ble.size) <= 0.) {
      if(ble.type == BEAMLINE_ELEMENT_TYPE_DIPOLE) {
        B += vec3(0., ble.strength, 0.);
      } else if(ble.type == BEAMLINE_ELEMENT_TYPE_QUADRUPOLE) {
        B += abs(ble.strength) * ((ble.strength > 0.) ? vec3(localPosition.y, localPosition.x, 0) : vec3(-localPosition.y, -localPosition.x, 0.));
      }
    }
  }

  return B;
}

vec4 push_position(int p) {

  ParticleData particleData = getParticleData(p);
  vec4 fourPosition = readVariable(ut_position, p, 0);

  vec3 position = fourPosition.xyz;
  float time = fourPosition.w;

  // vec4 fourVelocity_current = readVariable(ut_velocity, p, 1);
  vec4 fourVelocity_next = readVariable(ut_velocity, p, 0);

  float nextTime = time + deltaTOverC;

  vec4 next = vec4(position + fourVelocity_next.xyz / fourVelocity_next.w * deltaTOverC, nextTime);

  return next;
}

vec4 push_velocity(int p) {

  ParticleData particleData = getParticleData(p);

  vec4 fourPosition = readVariable(ut_position, p, 1);
  vec4 fourVelocity = readVariable(ut_velocity, p, 0);

  vec3 velocity =  fourVelocity.xyz / fourVelocity.w;

  vec3 intermediatePosition = fourPosition.xyz + .5 * velocity * deltaTOverC;
  vec3 E = getE(intermediatePosition);
  vec3 B = getB(intermediatePosition);

  float gamma = 1.;
  vec3 u = fourVelocity.xyz;

  if(particleData.particleType > .1) {

    float chargeMassRatio = particleData.chargeMassRatio;
    float hdtc_m = chargeMassRatio * deltaTOverC / c / 2.;

    u += hdtc_m * E;
    gamma = sqrt(1. + dot(u / c, u / c));

    vec3 t_ = hdtc_m * B / gamma;
    u += cross(u, t_);
    vec3 s_ = 2.0 / (1.0 + t_ * t_) * t_;
    u += cross(u, s_);
    u += hdtc_m * E;
    gamma = sqrt(1. + dot(u / c, u / c));
  }

  if(boundingBoxSize > 0.) {

    velocity = (particleData.particleType > .1) ? u / gamma / c : velocity;
    vec3 nextPosition = intermediatePosition.xyz + .5 * velocity * deltaTOverC;
    vec3 ref = reflection(nextPosition.xyz, boundingBoxCenter - vec3(boundingBoxSize), boundingBoxCenter + vec3(boundingBoxSize));
    u *= ref;

  }
  return vec4(u, gamma * c);
}
vec4 push(int p) {
  return (variableIdx == 0) ? push_position(p) : push_velocity(p);
}

vec4 readVariable(int particle, int snapshot) {
  return (variableIdx == 0) ? readVariable(ut_position, particle, snapshot) : readVariable(ut_velocity, particle, snapshot);
}

void main() {

  int particle = int(gl_FragCoord.y - .5);
  int snapshot = int(floor((gl_FragCoord.x - .5) / 4.));
  int fourComponentIndex = int(floor(gl_FragCoord.x - .5)) - snapshot * 4;
  initLatticeData();

  vec4 value = (snapshot == 0) ? push(particle) : (takeSnapshot == 0) ? readVariable(particle, snapshot) : readVariable(particle, snapshot - 1);

#ifdef PACK_FLOAT

  gl_FragColor = (fourComponentIndex == 0) ? packFloat(value.x) : (fourComponentIndex == 1) ? packFloat(value.y) : (fourComponentIndex == 2) ? packFloat(value.z) : packFloat(value.w);

#else

  gl_FragColor = (fourComponentIndex == 0) ? vec4(value.x, 0., 0., 0.) : (fourComponentIndex == 1) ? vec4(value.y, 0., 0., 0.) : (fourComponentIndex == 2) ? vec4(value.z, 0., 0., 0.) : vec4(value.w, 0., 0., 0.);

#endif

}
