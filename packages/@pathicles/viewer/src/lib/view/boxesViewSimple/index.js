import drawBackgroundCommand from './background/drawBackgroundCommands'
import drawModelCommands from './model/drawModelCommands'
import drawStageCommands from './stage/drawStageCommands'

const CUBE_MAP_SIZE = 1024

export function boxesViewSimple(regl, { variables, model, config }) {
  const cubeShadowFbo = regl.framebufferCube({
    radius: CUBE_MAP_SIZE,
    colorFormat: 'rgba',
    colorType: 'uint8'
  })

  const uniforms = {
    //model
    bufferLength: model.bufferLength,
    particleCount: model.particleCount,
    stepCount: model.stepCount || model.bufferLength,
    pathicleGap: config.view.pathicleRelativeGap * config.view.pathicleWidth,
    pathicleWidth: config.view.pathicleWidth,
    viewRange: regl.prop('viewRange'),
    ambient: (ctx, props) => new Array(3).fill(props.ambientIntensity),
    pointLightPosition: config.view.lights[0].position,
    lightPos: config.view.lightPosition,
    dt: 2 * model.halfDeltaTOverC,
    rgbGamma: config.view.rgbGamma,
    cubeShadowFbo
  }

  const setParams = regl({
    uniforms: uniforms
  })

  const drawModel = drawModelCommands(
    regl,
    {
      variables,
      model,
      view: config.view
    },
    cubeShadowFbo
  )
  const drawStage = drawStageCommands(regl, config.view, cubeShadowFbo)
  const drawBackground = drawBackgroundCommand(regl, config.view)

  function drawDiffuse(props) {
    setParams(config.view, () => {
      drawBackground()

      config.view.isStageVisible && drawStage.lighting(props)
      // config.view.isShadowEnabled && drawModel.shadow(props)

      drawModel.shadowCube(props)
      drawModel.lighting(props)
    })
  }
  const texelSize = 1

  function drawShadowCubeFbo() {
    const command = regl({
      vert: `
      precision mediump float;
      attribute vec2 position;
      varying vec2 uv;
      void main () {
        uv = position;
        gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
      }`,

      frag: `
      precision mediump float;
      uniform samplerCube texture;
      varying vec2 uv;
      float unpackRGBA (vec4 v) {
        return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
      }
      void main () {
        vec3 texCoord = vec3(uv.xy, 1.);
        vec4 texel = vec4(0.,0.,0., unpackRGBA(textureCube(texture, texCoord)));
        gl_FragColor = texel;
      }`,

      attributes: { position: [2, 0, 0, 2, -2, -2] },

      uniforms: {
        texture: cubeShadowFbo
      },

      viewport: {
        x: (_, __, batchId) => {
          batchId * CUBE_MAP_SIZE * texelSize
        },
        y: 0,
        width: CUBE_MAP_SIZE * texelSize,
        height: CUBE_MAP_SIZE * texelSize
      },
      depth: {
        enable: false
      },

      count: 3
    })

    return command()
  }

  const destroy = () => {}

  return {
    destroy,
    drawDiffuse,
    drawShadowCubeFbo
  }
}
