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
    stageGrid_size: config.view.stageGrid.size / 2,
    viewRange: regl.prop('viewRange'),
    ambientLightAmount: config.view.ambientLightAmount,
    diffuseLightAmount: config.view.diffuseLightAmount,
    dt: 2 * config.model.iterationDurationOverC
  }

  const setParams = regl({
    uniforms
  })

  const drawModel = drawModelCommands(
    regl,
    {
      variables,
      view: config.view
    },
    shadow
  )
  const drawStage = drawStageCommands(regl, config.view, shadow)

  const drawAxis = drawAxesCommand(regl, 0.5)
  const drawVignette = drawVignetteCommandBuilder(regl)

  function drawDiffuse(props) {
    // eslint-disable-next-line no-unused-vars
    setParams(config.view, () => {
      regl.clear({
        color: [0, 0, 0, 0],
        depth: 1,
        framebuffer: shadow.fbo
      })

      shadow.update([
        lightPosition[0],
        lightPosition[1], // Math.sin(time * 2),
        lightPosition[2]
      ])

      config.view.isShadowEnabled && drawModel.shadow(props)
      config.view.showAxes &&
        drawAxis([
          { axis: [1, 0, 0] },
          { axis: [0, 1, 0] },
          { axis: [0, 0, 1] }
        ])

      config.view.isStageVisible && drawStage.lighting(props)
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
