import drawModelCommands from './model/drawModelCommands'
import drawStageCommands from './stage/drawStageCommands'
import { Shadow } from './shadow/Shadow'
import { drawAxesCommand } from './axes'
import drawVignetteCommandBuilder from './vignette/drawVignetteCommandBuilder'

export function boxesViewSimple(regl, { variables, params }) {
  const lightPosition = params.view.lights[0].position
  const shadow = new Shadow(regl, params.view.lights[0])

  const uniforms = {
    //model
    stageGrid_size: params.view.stageGrid.size / 2,
    viewRange: regl.prop('viewRange'),
    ambientLightAmount: params.view.ambientLightAmount,
    diffuseLightAmount: params.view.diffuseLightAmount,
    dt: 2 * params.model.iterationDurationOverC
  }

  const setParams = regl({
    uniforms
  })

  const drawModel = drawModelCommands(
    regl,
    {
      variables,
      view: params.view
    },
    shadow
  )
  const drawStage = drawStageCommands(regl, params.view, shadow)

  const drawAxis = drawAxesCommand(regl, 0.5)
  const drawVignette = drawVignetteCommandBuilder(regl)

  function drawDiffuse(props) {
    // eslint-disable-next-line no-unused-vars
    setParams(params.view, () => {
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

      params.view.isShadowEnabled && drawModel.shadow(props)
      params.view.showAxes &&
        drawAxis([
          { axis: [1, 0, 0] },
          { axis: [0, 1, 0] },
          { axis: [0, 0, 1] }
        ])

      params.view.isStageVisible && drawStage.lighting(props)
      drawModel.lighting(props)
      params.view.showVignette && drawVignette.lighting(props)
    })
  }

  const destroy = () => {}

  return {
    destroy,
    drawDiffuse,
    shadow
  }
}
