// import drawBackgroundCommand from './background/drawBackgroundCommands'
// import drawBoxCommand from './box/drawBoxCommands'
import drawBoxCommands from './box/drawBoxCommands'
import drawModelCommands from './model/drawModelCommands'
import drawStageCommands from './stage/drawStageCommands'
// import { CubeShadow } from './model/CubeShadow'
import { Shadow } from './model/Shadow'
import { drawAxesCommand } from './axes'
import drawVignetteCommandBuilder from './vignette/drawVignetteCommandBuilder'

export function boxesViewSimple(regl, { variables, model, config }) {
  // const cubeShadow = new CubeShadow(regl, config.view.lightPosition)
  // const shadow = new Shadow(regl, [-0.39 * 5, -0.87 * 5, -0.29 * 5])
  const shadow = new Shadow(regl, [0, 5, 0])

  const uniforms = {
    //model
    bufferLength: model.bufferLength,
    particleCount: model.particleCount,
    stepCount: model.stepCount || model.bufferLength,
    pathicleGap: config.view.pathicleRelativeGap * config.view.pathicleWidth,
    // pathicleWidth: config.view.pathicleWidth * 5,
    viewRange: regl.prop('viewRange'),
    ambientLightAmount: config.view.ambientLightAmount,
    diffuseLightAmount: config.view.diffuseLightAmount,
    // pointLightPosition: config.view.lights[0].position,
    // lightPos: config.view.lightPosition,
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
  // const drawBackground = drawBackgroundCommand(regl, config.view)
  const drawBox = drawBoxCommands(regl, config.view, shadow)

  const drawAxis = drawAxesCommand(regl, 1)
  const drawVignette = drawVignetteCommandBuilder(regl)

  function drawDiffuse(props) {
    setParams(config.view, () => {
      // drawBox.shadow({})
      regl.clear({
        color: [1, 0, 0, 0],
        depth: 1,
        framebuffer: shadow.fbo
      })
      drawModel.shadow({})
      // config.view.isShadowEnabled && drawModel.shadow(props)
      ;(true || config.view.showAxes) &&
        drawAxis([
          { axis: [1, 0, 0] },
          { axis: [0, 1, 0] },
          { axis: [0, 0, 1] }
        ])

      config.view.isStageVisible && drawStage.lighting()
      drawModel.lighting(props)

      // drawBox.lighting()
      config.view.showVignette && drawVignette.lighting(props)

      // console.log(drawModel.lighting.stats)
    })
  }

  const destroy = () => {}

  return {
    destroy,
    drawDiffuse,
    shadow
  }
}
