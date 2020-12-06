import drawModelCommands from './model/drawModelCommands'
import drawStageCommands from './stage/drawStageCommands'
import { Shadow } from './shadow/Shadow'
import { drawAxesCommand } from './axes'
import drawVignetteCommandBuilder from './vignette/drawVignetteCommandBuilder'

export function boxesViewSimple(regl, { runner, variables, view }) {
  const lightPosition = view.lights[0].position
  const shadow = new Shadow(regl, view.lights[0])

  const uniforms = {
    //model
    stageGrid_size: view.stageGrid.size / 2,
    viewRange: regl.prop('viewRange'),
    ambientLightAmount: view.ambientLightAmount,
    diffuseLightAmount: view.diffuseLightAmount
    // dt: 2 * runner.iterationDurationOverC
  }

  const setParams = regl({
    uniforms
  })

  const drawModel = drawModelCommands(
    regl,
    {
      runner,
      variables,
      view
    },
    shadow
  )
  const drawStage = drawStageCommands(regl, view, shadow)

  const drawAxis = drawAxesCommand(regl, 0.5)
  const drawVignette = drawVignetteCommandBuilder(regl)

  function drawDiffuse(props) {
    regl.clear({
      color: [0, 0, 0, 0],
      depth: 1
    })
    // eslint-disable-next-line no-unused-vars
    setParams(view, () => {
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

      view.isShadowEnabled && drawModel.shadow(props)
      // view.showAxes &&
      //   drawAxis([
      //     { axis: [1, 0, 0] },
      //     { axis: [0, 1, 0] },
      //     { axis: [0, 0, 1] }
      //   ])

      view.isStageVisible && drawStage.lighting(props)
      drawModel.lighting(props)
      view.showVignette && drawVignette.lighting(props)
    })
  }

  const destroy = () => {}

  return {
    destroy,
    drawDiffuse,
    shadow
  }
}
