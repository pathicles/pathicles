precision highp float;
#pragma glslify: inverse = require(glsl-inverse)
#pragma glslify: transpose = require(glsl-transpose)
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

attribute vec3 aPosition;

attribute vec3 aNormal;
attribute vec2 aUV;

attribute float aParticle;
attribute float aColorCorrection;
attribute float aStep;

uniform float particleCount;
uniform float bufferLength;
uniform float stepCount;

uniform float dt;
uniform vec2 viewRange;

uniform float pathicleWidth;
uniform float pathicleGap;
uniform float pathicleHeight;
uniform float stageGrid_size;

uniform sampler2D utParticleColorAndType;
uniform sampler2D utPositionBuffer;
uniform sampler2D utVelocityBuffer;
uniform mat4 projection, view, model;
uniform vec3 eye;


uniform mat4 shadowProjectionMatrix;
uniform mat4 shadowViewMatrix;
uniform vec3 shadowDirection;
uniform float minBias;
uniform float maxBias;


varying float toBeDiscarded;
varying vec3 vScale;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vNormalOrig;
varying vec2 vUv;
varying vec3 vShadowCoord;
varying vec4 vColor;
varying float vColorCorrection;
uniform sampler2D shadowMap;


float decodeFloat (vec4 color) {
  const vec4 bitShift = vec4(
  1.0 / (256.0 * 256.0 * 256.0),
  1.0 / (256.0 * 256.0),
  1.0 / 256.0,
  1
  );
  return dot(color, bitShift);
}

vec4 encodeFloat (float depth) {
  const vec4 bitShift = vec4(
  256 * 256 * 256,
  256 * 256,
  256,
  1.0
  );
  const vec4 bitMask = vec4(
  0,
  1.0 / 256.0,
  1.0 / 256.0,
  1.0 / 256.0
  );
  vec4 comp = fract(depth * bitShift);
  comp -= comp.xxyz * bitMask;
  return comp;
}


//vec4 packRGBA (float v) {
//  vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v / 10.);
//  pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;
//  return pack;
//}
//float unpackRGBA (vec4 v) {
//  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0))*10. ;
//}
//float shadowSample(vec2 co, float z, float bias) {
//  float a = unpackRGBA(texture2D(shadowMap, co));
//  float b = z;
//  return step(b-bias, a);
//}


const mat4 texUnitConverter = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5,
0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);




vec4 get_color(float p) {
  vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);
  return texture2D(utParticleColorAndType, coords);
}
vec4 get_position(float p, float b) {
  vec2 coords = vec2(p, b) / vec2(particleCount, bufferLength) ;
  return texture2D(utPositionBuffer, coords);
}
float calculateToBeDiscarded(vec4 previousFourPosition, vec4 currentFourPosition) {

  float undefinedBuffer = (currentFourPosition.w == 0. || previousFourPosition.w > currentFourPosition.w) ? 1.0 : 0.0;
  float beyondProgressLower = (currentFourPosition.w / dt < viewRange[0] * stepCount) ? 1.0 : 0.0;
  float beyondProgressUpper =  (currentFourPosition.w / dt > viewRange[1] * stepCount) ? 1.0 : 0.0;
  float outsideGrid = (currentFourPosition.x > stageGrid_size || currentFourPosition.x < -stageGrid_size
  || currentFourPosition.y > stageGrid_size || currentFourPosition.y < -stageGrid_size
  || currentFourPosition.z > stageGrid_size || currentFourPosition.z < -stageGrid_size) ? 1.0 : 0.0;

  return (outsideGrid > 0. || undefinedBuffer > 0. || beyondProgressLower > 0. || beyondProgressUpper > 0.) ? 1.0 : 0.0;

}

void main () {



  float previousBufferHead = (aStep < 1.) ? bufferLength : aStep - 1.;
  vec4 previousFourPosition = get_position(aParticle, previousBufferHead);
  vec4 currentFourPosition = get_position(aParticle, aStep);

  mat4 lookAtMat4 = lookAt(currentFourPosition.xyz, previousFourPosition.xyz, vec3(0., 1, 0.));


  #ifdef lighting

  vScale = vec3(pathicleWidth/2., pathicleHeight, length(previousFourPosition.xyz - currentFourPosition.xyz) - pathicleGap);

  #endif
  #ifdef shadow

  vScale = vec3(pathicleWidth*4., pathicleHeight, length(previousFourPosition.xyz - currentFourPosition.xyz));

  #endif

  vec3 scaledPosition = aPosition * vScale;

  vPosition = vec3(1., 1., 1.) * (((lookAtMat4 * vec4(scaledPosition, 1.)).xyz
  + 0.5 * (currentFourPosition.xyz + previousFourPosition.xyz)));


  vNormalOrig = aNormal;
  vNormal = normalize((transpose(inverse(lookAtMat4)) * vec4(aNormal, 0.)).xyz);

  vUv = aUV;

  vColor = get_color(aParticle);

  toBeDiscarded = calculateToBeDiscarded(previousFourPosition, currentFourPosition);
  vShadowCoord = 1.*(shadowProjectionMatrix *  shadowViewMatrix * model * vec4(vPosition, 1.0)).xyz;
  gl_Position = projection * view *  model * vec4(vPosition, 1.0);





  #ifdef lighting


  gl_Position = projection * view *  model * vec4(vPosition, 1.0);

  vec3 lightDir = normalize(shadowDirection -1.*vPosition);
  float cosTheta = dot(vNormal, shadowDirection);



  vec3 fragmentDepth = vShadowCoord.xyz;
  float shadowAcneRemover = 0.00007;
  fragmentDepth.z -= shadowAcneRemover;
  float amountInLight = 0.0;
  for (int x = -1; x <= 1; x++) {
    for (int y = -1; y <= 1; y++) {
      float texelDepth = decodeFloat(texture2D(shadowMap, fragmentDepth.xy + vec2(x, y) * texelSize));
      if (fragmentDepth.z < texelDepth) {
        amountInLight += 1.0;
      }
    }
  }
  amountInLight /= 9.0;

  vColorCorrection = amountInLight;
  vColorCorrection = aColorCorrection; //1.-abs(sin(aParticle)) * .2;

#endif// lighting

}

