import drawBackgroundCommand from './background/drawBackgroundCommands'
import drawModelCommands from './model/drawModelCommands'
// import drawTextCommands from './text/drawTextCommands'
import drawStageCommands from './stage/drawStageCommands'

export function boxesViewSimple(regl, { variables, model, config }) {
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
    dt: 2 * model.halfDeltaTOverC,
    rgbGamma: config.view.rgbGamma
  }

  const setParams = regl({
    uniforms: uniforms
  })

  const drawModel = drawModelCommands(regl, {
    variables,
    model,
    view: config.view
  })
  const drawStage = drawStageCommands(regl, config.view)
  const drawBackground = drawBackgroundCommand(regl)
  // const drawTextCommand = drawTextCommands(regl)

  function drawDiffuse(props) {
    setParams(config.view, () => {
      drawBackground()
      config.view.isStageVisible && drawStage.lighting(props)
      config.view.isShadowEnabled && drawModel.shadow(props)
      drawModel.lighting(props)
      // drawTextCommands.lighting()
    })
  }

  const destroy = () => {}

  return {
    destroy,
    drawDiffuse
  }
}
