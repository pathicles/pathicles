import createBuffers from './buffer/createBuffers'
import drawModelCommands from './draw/drawModelCommands'
import drawStageCommands from './draw/drawStageCommands'
import drawLatticeCommands from './draw/drawLatticeCommands'
// import drawShadowMapCommand from './draw/drawShadowMapCommand'
import deferredCompositionCommand from './deferred/deferredCompositionCommand'
import showBuffers from './buffer/showBuffers'
import ssaoSupport from './ssao/ssao'
import fxaaSupport from './fxaa/fxaa'
// eslint-disable-next-line

export default function(regl, { variables, model, config }) {
  const uniforms = {
    //model
    bufferLength: model.bufferLength,
    particleCount: model.particleCount,
    stepCount: model.stepCount || model.bufferLength,
    radius: regl.prop('ssaoBlurRadius'),
    blur: regl.prop('ssaoBlurPower'),
    ssaoPower: regl.prop('ssaoPower'),
    exposure: regl.prop('exposure'),
    roughness: regl.prop('roughness'),
    fresnel: regl.prop('fresnel'),
    diffuse: regl.prop('diffuse'),
    specular: regl.prop('specular'),
    viewRange: regl.prop('viewRange'),
    ssaoEnabled: config.view.ssaoEnabled ? 1 : 0,
    ambient: (ctx, props) => new Array(3).fill(props.ambientIntensity),
    pointLightPosition: config.view.lights[0].position,
    pathicleGap: config.view.pathicleRelativeGap * config.view.pathicleWidth,
    pathicleWidth: config.view.pathicleWidth,
    dt: 2 * model.halfDeltaTOverC,
    utPositionBuffer: () => variables.position[variables.tick.value % 2],
    rgbGamma: () => config.view.rgbGamma
  }
  const setParams = regl({
    uniforms: uniforms
  })

  const buffers = createBuffers(regl, {})

  const drawModel = drawModelCommands(regl, {
    variables,
    model,
    view: config.view
  })

  const drawStage = drawStageCommands(regl, config.view.stageGrid)

  const drawLattice = drawLatticeCommands(regl, {
    lattice: model.lattice,
    dy: config.view.stageGrid.dy
  })

  const ssao = ssaoSupport(regl)
  const fxaa = fxaaSupport(regl, buffers.compositionBuffer)

  const deferredRender = deferredCompositionCommand(regl)

  function drawDiffuse(props) {
    setParams(config.view, () => {
      regl.clear({
        color: [0, 0, 0, 0],
        depth: 1
      })
      drawModel.lighting(props)
      if (config.view.isStageVisible) {
        drawStage.lighting(props)
      }
      if (config.view.isLatticeVisible) {
        drawLattice.lighting(props)
      }
    })
  }

  function draw(props) {
    setParams(config.view, () => {
      buffers.positionBuffer.use(() => {
        regl.clear({
          color: [0, 0, 0, 0],
          depth: 1
        })

        drawModel.position(props)
        if (config.view.isStageVisible) {
          drawStage.position(props)
        }
        if (config.view.isLatticeVisible) {
          drawLattice.position(props)
        }
      })

      buffers.depthNormalBuffer.use(() => {
        regl.clear({
          color: [0, 0, 0, 0],
          depth: 1
        })
        drawModel.depthNormal(props)
        if (config.view.isStageVisible) {
          drawStage.depthNormal(props)
        }
        if (config.view.isLatticeVisible) {
          drawLattice.depthNormal(props)
        }
      })

      buffers.diffuseBuffer.use(() => {
        regl.clear({
          color: [1, 1, 1, 1],
          depth: 1
        })
        drawModel.diffuse(props)
        if (config.view.isStageVisible) {
          drawStage.diffuse(props)
        }
        if (config.view.isLatticeVisible) {
          drawLattice.diffuse(props)
        }
      })

      // if (config.view.isShadowEnabled) {
      //   drawShadowMap(6, () => {
      //     regl.clear({
      //       color: [0, 0, 0, 255],
      //       depth: 1
      //     })
      //     drawModel.depthNormal()
      //     // if (config.view.isStageVisible) {
      //     //   drawStage.position()
      //     // }
      //     // if (config.view.isLatticeVisible) {
      //     //   drawLattice.position()
      //     // }
      //   })
      //   // });
      // }

      if (config.view.ssaoEnabled) {
        ssao.ssaoBuffer.use(() => {
          ssao.drawSSAO({
            positionBuffer: buffers.positionBuffer,
            depthNormalBuffer: buffers.depthNormalBuffer,
            rotations: ssao.rotationsBuffer
          })
        })
        if (config.view.ssaoBlurRadius > 0.001) {
          ssao.ssaoBlurBuffer.use(() => {
            ssao.blurSSAO({
              ssaoBuffer: ssao.ssaoBuffer
            })
          })
        }
      }
      // regl.clear({ color: [1, 1, 1, 1], depth: 1 })
      //   drawModelPosition()

      buffers.compositionBuffer.use(() => {
        regl.clear({
          color: [1, 1, 1, 1],
          depth: 0
        })

        deferredRender({
          ...uniforms,
          diffuseBuffer: buffers.diffuseBuffer,
          positionBuffer: buffers.positionBuffer,
          depthNormalBuffer: buffers.depthNormalBuffer,
          shadowBufferCube: buffers.shadowBufferCube,
          isShadowEnabled: config.view.isShadowEnabled,
          lights: config.view.lights,
          ssaoBuffer:
            config.view.ssaoBlurRadius > 0.001
              ? ssao.ssaoBlurBuffer
              : ssao.ssaoBuffer,

          referencePoint: ctx => ctx.referencePoint
        })
      })
      fxaa({
        fb: buffers.compositionBuffer,
        fxaaEnabled: true
      })
    })
    // } catch (err) {
    //   throw err
    // }
  }

  const destroy = () => {
    Object.keys(buffers).forEach(key => {
      buffers[key].destroy()
    })
  }

  return {
    destroy,
    buffers,
    draw,
    drawDiffuse,
    showPositionBuffer: showBuffers(regl, buffers.positionBuffer, {
      x0: (regl._gl.canvas.width / 8) * 0,
      y0: (regl._gl.canvas.height / 8) * 7
    }),
    showDepthNormalBuffer: showBuffers(regl, buffers.depthNormalBuffer, {
      x0: (regl._gl.canvas.width / 8) * 1,
      y0: (regl._gl.canvas.height / 8) * 7
    }),
    showDiffuseColorBuffer: showBuffers(regl, buffers.diffuseBuffer, {
      x0: (regl._gl.canvas.width / 8) * 2,
      y0: (regl._gl.canvas.height / 8) * 7
    }),
    showSSAOBuffer: () => {
      if (config.view.ssaoEnabled) {
        showBuffers(regl, ssao.ssaoBuffer, {
          x0: (regl._gl.canvas.width / 8) * 0,
          y0: (regl._gl.canvas.height / 8) * 7
        })
      }
    }
  }
}
