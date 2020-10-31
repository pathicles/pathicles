// import drawBackgroundCommand from './background/drawBackgroundCommands'
// import drawBoxCommands from './box/drawBoxCommands'
import drawModelCommands from './model/drawModelCommands'
import drawStageCommands from './stage/drawStageCommands'
import { Shadow } from './shadow/Shadow'
import { drawAxesCommand } from './axes'
import drawVignetteCommandBuilder from './vignette/drawVignetteCommandBuilder'

export function boxesViewSimple(regl, { variables, model, config }) {
  const lightPosition = config.view.lights[0].position
  const shadow = new Shadow(regl, config.view.lights[0])

  const uniforms = {
    //model
    bufferLength: model.bufferLength,
    particleCount: model.particleCount,
    stepCount: model.stepCount || model.bufferLength,
    pathicleGap: config.view.pathicleRelativeGap * config.view.pathicleWidth,
    viewRange: regl.prop('viewRange'),
    ambientLightAmount: config.view.ambientLightAmount,
    diffuseLightAmount: config.view.diffuseLightAmount,
    dt: 2 * model.halfDeltaTOverC
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

  const drawAxis = drawAxesCommand(regl, 0.5)
  const drawVignette = drawVignetteCommandBuilder(regl)

  function drawDiffuse(props) {
    setParams(config.view, ({ tick, time }) => {
      regl.clear({
        color: [0, 0, 0, 0],
        depth: 1,
        framebuffer: shadow.fbo
      })
      // regl.clear({
      //   color: [1, 0, 0, 0],
      //   depth: 1,
      //   framebuffer: shadow.fboBlurred
      // })
      shadow.update([
        lightPosition[0],
        lightPosition[1], // * Math.sin(time * 2),
        lightPosition[2]
      ])

      config.view.isShadowEnabled && drawModel.shadow(props)
      // config.view.isShadowEnabled && shadow.blur()({})
      // config.view.showAxes &&
      //   drawAxis([
      //     { axis: [1, 0, 0] },
      //     { axis: [0, 1, 0] },
      //     { axis: [0, 0, 1] }
      //   ])

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
