import drawFieldsCommands from './fields/drawFieldsCommands'
import drawModelCommands from './model/drawModelCommands'
import drawStageCommands from './stage/drawStageCommands'
import drawLatticeCommands from './lattice/drawLatticeCommands'
import { Shadow } from './shadow/Shadow'
import { drawAxesCommand } from './axes'
import drawVignetteCommandBuilder from './vignette/drawVignetteCommandBuilder'
import { PerformanceLogger } from '../../utils/PerformanceLogger'
import { Lattice } from '../../simulation/lattice/lattice'

export class BoxesViewSimple {
  constructor(regl, { runner, variables, model, view, debug }) {
    this.regl = regl
    this.performanceLogger = new PerformanceLogger(debug.logPerformance)

    this.performanceLogger.start('BoxesViewSimple()')

    this.lightPosition = view.lights[0].position

    this.config = view

    this.shadow = new Shadow(regl, this.config.lights[0])

    //
    this.setParams = regl({
      uniforms: {
        stageGrid_size: this.config.stageGrid.size / 2,
        viewRange: regl.prop('viewRange'),
        ambientLightAmount: this.config.ambientLightAmount,
        diffuseLightAmount: this.config.diffuseLightAmount
      }
    })

    this.drawModel = drawModelCommands(
      regl,
      {
        runner,
        variables,
        view
      },
      this.shadow
    )
    this.drawStage = drawStageCommands(regl, view, this.shadow)
    this.drawLattice = drawLatticeCommands(
      regl,
      {
        runner,
        model,
        view
      },
      this.shadow
    )

    this.drawFields = drawFieldsCommands(regl, { model, view }, this.shadow)

    this.drawAxis = drawAxesCommand(regl, 0.5)
    this.drawVignette = drawVignetteCommandBuilder(regl)
  }

  drawDiffuse(props) {
    this.performanceLogger.start(
      `BoxesViewSimple.drawDiffuse (t=${props.tick})`
    )
    this.regl.clear({
      color: [1, 1, 1, 1],
      depth: 1
    })
    // eslint-disable-next-line no-unused-vars
    this.setParams({}, () => {
      this.regl.clear({
        color: [1, 1, 1, 1],
        depth: 1,
        framebuffer: this.shadow.fbo
      })

      // this.shadow.update([
      //   this.config.lightPosition[0],
      //   this.config.lightPosition[1], // Math.sin(time * 2),
      //   this.config.lightPosition[2]
      // ])

      this.config.isShadowEnabled && this.drawModel.shadow(props)
      // this.config.isShadowEnabled && this.shadow.blur()
      this.config.showAxes &&
        this.drawAxis([
          { axis: [1, 0, 0] },
          { axis: [0, 1, 0] },
          { axis: [0, 0, 1] }
        ])

      this.drawLattice.lighting(props)
      this.drawFields.lighting(props)
      this.config.isStageVisible && this.drawStage.lighting(props)
      this.drawModel.lighting(props)
      this.config.showVignette && this.drawVignette.lighting(props)
    })
    this.performanceLogger.stop('BoxesViewSimple.drawDiffuse')
  }

  destroy() {}
}
