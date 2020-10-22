// import drawBackgroundCommand from './background/drawBackgroundCommands'
// import drawBoxCommands from './box/drawBoxCommands'
import drawModelCommands from './model/drawModelCommands'
import drawStageCommands from './stage/drawStageCommands'
import { Shadow } from './model/Shadow'
import { drawAxesCommand } from './axes'
import drawVignetteCommandBuilder from './vignette/drawVignetteCommandBuilder'

export function boxesViewSimple(regl, { variables, model, config }) {
  const shadow = new Shadow(regl, [0, 5, 0])

  const uniforms = {
    //model
    bufferLength: model.bufferLength,
    particleCount: model.particleCount,
    stepCount: model.stepCount || model.bufferLength,
    pathicleGap: config.view.pathicleRelativeGap * config.view.pathicleWidth,
    viewRange: regl.prop('viewRange'),
    ambientLightAmount: config.view.ambientLightAmount,
    diffuseLightAmount: config.view.diffuseLightAmount,
    dt: 2 * model.halfDeltaTOverC,
    rgbGamma: config.view.rgbGamma
  }

  const setParams = regl({
    uniforms
  })

  const drawModel = drawModelCommands(
    regl,
    {
      variables,
      model,
      view: config.view
    },
    shadow
  )
  const drawStage = drawStageCommands(regl, config.view, shadow)

  const drawAxis = drawAxesCommand(regl, 1)
  const drawVignette = drawVignetteCommandBuilder(regl)

  function drawDiffuse(props) {
    setParams(config.view, () => {
      regl.clear({
        color: [1, 0, 0, 0],
        depth: 1,
        framebuffer: shadow.fbo
      })
      config.view.isShadowEnabled && drawModel.shadow({})
      config.view.showAxes &&
        drawAxis([
          { axis: [1, 0, 0] },
          { axis: [0, 1, 0] },
          { axis: [0, 0, 1] }
        ])

      config.view.isStageVisible && drawStage.lighting()
      drawModel.lighting(props)
      config.view.showVignette && drawVignette.lighting(props)
    })
  }

  const destroy = () => {}

  return {
    destroy,
    drawDiffuse,
    shadow
  }
}
