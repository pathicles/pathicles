import {
  getters,
  inverseMat4,
  lookAt,
  particleDataChunk
} from '../../../utils/utils'

import normals from 'angle-normals'
import createCube from 'primitive-cube'

export default function(regl, { variables, model, view }) {
  const createGeometry = ({ pathicleWidth, pathicleRelativeHeight }) =>
    createCube(pathicleWidth, pathicleWidth * pathicleRelativeHeight, 1)

  const geometry = createGeometry({
    pathicleWidth: view.pathicleWidth,
    pathicleRelativeHeight: view.pathicleRelativeHeight
  })

  const scaleFactor = 1.00001

  const command = mode =>
    regl({
      primitive: 'triangles',
      elements: geometry.cells,
      instances: () =>
        model.particleCount *
        Math.min(variables.tick.value + 1, model.bufferLength),

      attributes: {
        aPosition: geometry.positions,
        aNormal: normals(geometry.cells, geometry.positions),
        aParticle: {
          buffer: regl.buffer(
            Array(model.particleCount * model.bufferLength)
              .fill()
              .fill(0)
              .map((_, i) => i % model.particleCount)
          ),
          divisor: 1
        },
        aStep: {
          buffer: regl.buffer(
            Array(model.particleCount * model.bufferLength)
              .fill(0)
              .map((_, i) => Math.floor(i / model.particleCount))
          ),
          divisor: 1
        }
      },

      uniforms: {
        viewRange: (ctx, props) => {
          return props.viewRange
        }
      },

      // VERTEX
      vert: `
      precision mediump float;

      attribute vec3 aPosition;
      attribute vec3 aNormal;
      attribute float aParticle;
      attribute float aStep;

      uniform float particleCount;
      uniform float bufferLength;
      uniform float stepCount;

      uniform float dt;
      uniform vec2 viewRange;

      uniform float pathicleWidth;
      uniform float pathicleGap;

      uniform sampler2D utPositionBuffer;
      uniform sampler2D utVelocityBuffer;
      uniform mat4 projection, view;

      varying float toBeDiscarded;
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec2 vUv;
      varying vec3 vDiffuseColor;
      varying float vColorCorrection;


      ${getters}
      ${inverseMat4}
      ${lookAt}


      ${particleDataChunk(model.particleTypes)}


      float calculateToBeDiscarded(vec4 previousFourPosition, vec4 currentFourPosition) {

        float undefinedBuffer = (currentFourPosition.w == 0. || previousFourPosition.w > currentFourPosition.w) ? 1.0 : 0.0;
        float beyondProgressLower = (currentFourPosition.w / dt < viewRange[0] * stepCount) ? 1.0 : 0.0;
        float beyondProgressUpper =  (currentFourPosition.w / dt > viewRange[1] * stepCount) ? 1.0 : 0.0;

        return (undefinedBuffer > 0. || beyondProgressLower > 0. || beyondProgressUpper > 0.) ? 1.0 : 0.0;

      }

      void main () {

        initParticleData();

        vDiffuseColor = getParticleData(aParticle).color;

        float previousBufferHead = (aStep < 1.) ? bufferLength : aStep - 1.;
        vec4 previousFourPosition = get_position(aParticle, previousBufferHead);
        vec4 currentFourPosition = get_position(aParticle, aStep);

        mat4 lookAtMat4 = lookAt(currentFourPosition.xyz, previousFourPosition.xyz, vec3(0., 1, 0.));

        vec3 scaledPosition = vec3(
          aPosition.x, aPosition.y,
          aPosition.z * (length(previousFourPosition.xyz - currentFourPosition.xyz) - pathicleGap));

        vPosition = ((lookAtMat4 * vec4(scaledPosition, 1.)).xyz
                  + 0.5 * (currentFourPosition.xyz + previousFourPosition.xyz)) * ${scaleFactor};
        vNormal = normalize((transpose(inverse(lookAtMat4)) * vec4(aNormal, 0.)).xyz);

        gl_Position = projection * view * vec4(vPosition, 1.0);

        const float width = 2.;
        float xFactor = 0. * clamp((vPosition.x-width) / width, -1., 1. );

        vColorCorrection =  abs(dot(aNormal, vec3(1., 0., 0.))) * xFactor;
          // + 0.2 * abs(dot(aNormal, vec3(0., 1., 0.)) * abs(vPosition.y));
        // if (
        //   abs(dot(
        //     aNormal,
        //     vec3(1., 0., 0.)
        //   )) == 1.) {vColorCorrection = cos(xFactor * 1.5) * cos(xFactor * 1.5);}
        //
        if (
          abs(dot(
            aNormal,
            vec3(0., 0., 1.)
          )) == 1.) {vColorCorrection += -.5;}


        // 1. - .1 * vPosition.x;
          //1. - 1.*((aParticle / particleCount) - (aStep /bufferLength));

        toBeDiscarded = calculateToBeDiscarded(previousFourPosition, currentFourPosition);

    }`,
      // FRAGMENT SHADER
      frag: `
      #define ${mode} 1
      precision mediump float;

      varying float toBeDiscarded;
      varying vec3 vPosition;
      varying vec3 vNormal;
      varying vec3 vDiffuseColor;
      varying float vColorCorrection;

         vec3 hemisphere_light(
    vec3 normal
  , vec3 sky
  , vec3 ground
  , vec3 lightDirection) {
  vec3 direction = normalize((
    // modelMatrix * vec4(lightDirection, 1.0)
    vec4(lightDirection, 1.0)
  ).xyz);

  float weight = 0.5 * dot(
      normal
    , direction
  ) + 0.5;

  return mix(ground, sky, weight);
}



      void main () {

        if (toBeDiscarded == 1.0) discard;

        #ifdef depthNormal
          gl_FragColor = vec4(gl_FragCoord.z, vNormal);
        #endif

        #ifdef diffuse
          gl_FragColor =  vec4((1. + vColorCorrection) * vDiffuseColor, 1.);
        #endif

        #ifdef lighting



         vec3 hemisphereColor = hemisphere_light(vNormal, vec3(2., 2., 2.), vec3(.5,.5,.5), vec3(0.,1.,0.));
         float ssao = 1.;
         float ambient = 1.;
         vec3 materialColor = (1. + vColorCorrection) * vDiffuseColor;
         vec3 ambientColor = (hemisphereColor * materialColor).rgb;
         // vec3 lighting = ssao * (ambientColor + materialColor.rgb * diffuseColor);
         vec3 lightingColor = ambientColor;


          gl_FragColor =  vec4(lightingColor, 1.);
        #endif

        #ifdef position
          gl_FragColor = vec4(vPosition, 1);
        #endif

      }`
    })

  return {
    depthNormal: command('depthNormal'),
    position: command('position'),
    diffuse: command('diffuse'),
    lighting: command('lighting')
  }
}
