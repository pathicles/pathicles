import drawBackgroundCommand from './background/drawBackgroundCommands'
import drawModelCommands from './model/drawModelCommands'
import drawStageCommands from './stage/drawStageCommands'
import { CubeShadow } from './model/CubeShadow'
import { Shadow } from './model/Shadow'

export function boxesViewSimple(regl, { variables, model, config }) {

  console.log(config)
  const cubeShadow = new CubeShadow(regl, config.view.lightPosition)
  const shadow = new Shadow(regl, config.view.lightPosition)

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
    rgbGamma: config.view.rgbGamma
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
    shadow,
    cubeShadow
  )
  const drawStage = drawStageCommands(regl, config.view, shadow, cubeShadow)
  const drawBackground = drawBackgroundCommand(regl, config.view)

  function drawDiffuse(props) {
    setParams(config.view, () => {
      // drawBackground()
      // drawModel.cubeShsadow(props)

      regl.clear({
        color: [1, 1, 1, 1],
        depth: 1,
        framebuffer: shadow.fbo
      })
      //drawModel.shadowMap(props)

      //config.view.isShadowEnabled && drawModel.shadow(props)

      drawModel.lighting(props)

      config.view.isStageVisible && drawStage.lighting(props)
    })
  }

  const destroy = () => {}

  return {
    destroy,
    drawDiffuse,
    cubeShadow,
    shadow
  }
}
