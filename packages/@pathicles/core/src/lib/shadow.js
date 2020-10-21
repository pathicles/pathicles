/* eslint-env browser */

import { mat4 } from 'gl-matrix'
import freeCameraFactory from './utils/freeCameraFactory'
import PerformanceLogger from './utils/PerformanceLogger'
import keyControl from './utils/keyControl'
import { checkSupport } from './utils/checkSupport'
import createREGL from 'regl'
import createCube from 'primitive-cube'

const k = 3
const n = k * k

const offsets = []
for (let ix = 0; ix < k; ix++) {
  //for (let iy = 0; iy < k; iy++) {
  for (let iz = 0; iz < k; iz++) {
    // console.log(ix - k / 2)
    // offsets.push((k / 2 - ix) * 2)
    offsets.push(0)
    offsets.push(0)
    offsets.push(0)
    // offsets.push((k / 2 - iz) * 2)
  }
  //}
}

export class ReglShadow {
  constructor({ canvas, config, pixelRatio, control, simulate = true }) {
    keyControl(this)
    this.config = config
    this.simulate = simulate
    this.control = control

    // eslint-disable-next-line no-undef
    createREGL({
      canvas,
      profile: this.config.profile,
      attributes: {
        preserveDrawingBuffer: true,
        antialiasing: true
      },
      pixelRatio,
      onDone: (err, regl) => {
        if (err) return console.error(err)
        try {
          this.regl = regl

          window.pathicles = this

          PerformanceLogger.start('checkSupport')
          this.checkSupport(regl)
          PerformanceLogger.stop()

          PerformanceLogger.start('init')
          this.init(regl)
          PerformanceLogger.stop()

          this.run(regl)
        } catch (e) {
          // alert(e)
          console.error(e)
        }
      },
      extensions: simulate
        ? [
            'angle_instanced_arrays',
            'oes_texture_float',
            'OES_standard_derivatives',
            'OES_texture_half_float',
            'WEBGL_depth_texture'
          ]
        : [
            'angle_instanced_arrays',
            'oes_texture_float',
            'OES_standard_derivatives',
            'WEBGL_depth_texture'
          ]
    })
  }

  destroy() {
    console.log('destroy')
    this.regl.destroy()
  }

  loadConfig() {
    // this.stop(this.regl)
    // this.config = config
    // this.init(this.regl)
    // this.run(this.regl)
  }

  checkSupport() {
    this.support = checkSupport()
  }

  init(regl) {
    this.cameras = []
    this.setCameraUniforms = []
    ;[this.cameras['free'], this.setCameraUniforms['free']] = freeCameraFactory(
      { ...this.config.view.camera },
      regl
    )

    this.camera = this.cameras['free']

    this.lightPos = [0.0, 1.0, 0.0]

    const CUBE_MAP_SIZE = 1024 * 1
    this.shadowFbo = this.regl.framebufferCube({
      radius: CUBE_MAP_SIZE,
      colorFormat: 'rgba',
      colorType: 'float'
    })

    const planeElements = []
    const planePosition = []
    const planeNormal = []

    planePosition.push([-0.5, 0.0, -0.5])
    planePosition.push([+0.5, 0.0, -0.5])
    planePosition.push([-0.5, 0.0, +0.5])
    planePosition.push([+0.5, 0.0, +0.5])

    planeNormal.push([0.0, 1.0, 0.0])
    planeNormal.push([0.0, 1.0, 0.0])
    planeNormal.push([0.0, 1.0, 0.0])
    planeNormal.push([0.0, 1.0, 0.0])

    planeElements.push([3, 1, 0])
    planeElements.push([0, 2, 3])

    this.box = createCube()

    // This call encapsulates the common state between `drawNormal` and `drawDepth`
    // this.globalScope = this.regl({
    //   uniforms: {
    //     lightPos: this.lightPos
    //   }
    // })´

    this.regl._commands = []

    // this.cameras = []
    // this.setCameraUniforms = []
    // ;[this.cameras['free'], this.setCameraUniforms['free']] = freeCameraFactory(
    //   { ...this.config.view.camera },
    //   regl
    // )
    //
    // this.ca = camera(this.regl._gl.canvas)
    // // this.ca.rotate([1.0, 0.0], [0.0, -0.3])
    // this.ca.zoom(1)

    // this.camera = this.cameras['free']
    PerformanceLogger.start('init.simulation')
    // this.simulation = new Simulation(
    //   regl,
    //   {
    //     ...this.config
    //   },
    //   this.support
    // )
    PerformanceLogger.stop()

    // PerformanceLogger.start('init.view')
    //
    // this.view = boxesViewSimple(regl, {
    //   variables: this.simulation.variables,
    //   model: this.simulation.model,
    //   config: this.config
    // })
    // PerformanceLogger.stop()
    // PerformanceLogger.start('init.runner')
    // this.pathiclesRunner = new SimulationFSM(this.simulation, {
    //   ...this.config.runner,
    //   simulate: this.simulate
    // })
    // PerformanceLogger.stop()

    function Mesh(elements, position, normal, instances = n) {
      this.elements = elements
      this.position = position
      this.normal = normal
      this.instances = instances
    }

    Mesh.prototype.draw = this.regl({
      uniforms: {
        model: (_, props) => {
          let m = mat4.identity([])

          mat4.translate(m, m, props.translate)

          let s = props.scale
          mat4.scale(m, m, [s, s, s])
          return m
        },
        ambientLightAmount: 0.2,
        diffuseLightAmount: 0.8,
        color: this.regl.prop('color')
      },
      attributes: {
        position: this.regl.this('position'),
        normal: this.regl.this('normal'),
        offset: {
          buffer: regl.buffer(
            // [1,0,0,2,0,0,3,0,0]
            offsets
            // Array(10 * 3)
            //   .fill(0)
            //   .map((d) => Math.random() * 3)
          ),
          divisor: 1
        }
      },
      instances: 1,
      elements: this.regl.this('elements'),
      cull: {
        enable: false,
        face: 'back'
      }
    })

    // this.bunnyMesh = new Mesh(
    //   bunny.cells,
    //   bunny.positions,
    //   normals(bunny.cells, bunny.positions)
    // )
    this.boxMesh = new Mesh(
      this.box.cells,
      this.box.positions,
      this.box.normals
    )
    this.planeMesh = new Mesh(planeElements, planePosition, planeNormal)

    this.drawNormal = this.regl({
      uniforms: {
        // view: () => this.ca.view(),
        projection: ({ viewportWidth, viewportHeight }) =>
          mat4.perspective(
            [],
            Math.PI / 2,
            viewportWidth / viewportHeight,
            0.01,
            1000
          ),
        shadowCube: this.shadowFbo
      },
      frag: `
  precision mediump float;

  varying vec3 vNormal;
  varying vec3 vPosition;

  uniform float ambientLightAmount;
  uniform float diffuseLightAmount;
  uniform vec3 color;
  uniform vec3 lightPos;
  uniform samplerCube shadowCube;

  float unpackRGBA (vec4 v) {
  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
}

  void main () {
    // do ambient and diffuse lighting.
    vec3 lightDir = normalize(lightPos - vPosition);
    vec3 ambient = ambientLightAmount * color;
    float cosTheta = dot(vNormal, lightDir);
    vec3 diffuse = diffuseLightAmount * color * clamp(cosTheta , 0.0, 1.0 );

    vec3 texCoord = (vPosition - lightPos);
    float visibility = 0.0;

    // do soft shadows:
    for (int x = 0; x < 2; x++) {
      for (int y = 0; y < 2; y++) {
        for (int z = 0; z < 2; z++) {
          float bias = 0.005*tan(acos(cosTheta));
          bias = clamp(bias, 0., 0.01);
          vec4 env = textureCube(shadowCube, texCoord + vec3(x,y,z) * vec3(1.6) );
          float envv = unpackRGBA(env);
          visibility += (envv+bias) < (distance(vPosition, lightPos)) ? 0.0 : 1.0;
        }
      }
    }
    visibility *= 1.0 / 8.0;
    visibility = 1.;

    gl_FragColor = vec4((ambient + visibility * diffuse), 1.0);
  }`,
      vert: `
  precision mediump float;

  attribute vec3 position;
  attribute vec3 normal;
  attribute vec3 offset;

  varying vec3 vPosition;
  varying vec3 vNormal;

  uniform float time;
  uniform mat4 projection, view, model;

  void main() {
    vec4 worldSpacePosition = model * vec4(position + offset * sin(time), 1);

    vPosition = worldSpacePosition.xyz;
    vNormal = normal;

    gl_Position = projection * view * worldSpacePosition;
  }`
    })

    let lightPos = this.lightPos
    this.drawDepth = this.regl({
      uniforms: {
        projection: mat4.perspective([], Math.PI / 2.0, 1.0, 0.0001, 50.0),
        view: function (context, props, batchId) {
          switch (batchId) {
            case 0: // +x
              return mat4.lookAt(
                [],
                lightPos,
                [lightPos[0] + 0.1, lightPos[1], lightPos[2]],
                [0.0, -1.0, 0.0]
              )
            case 1: // -x
              return mat4.lookAt(
                [],
                lightPos,
                [lightPos[0] - 0.1, lightPos[1], lightPos[2]],
                [0.0, -1.0, 0.0]
              )
            case 2: // +y
              return mat4.lookAt(
                [],
                lightPos,
                [lightPos[0], lightPos[1] + 0.1, lightPos[2]],
                [0.0, 0.0, 1.0]
              )
            case 3: // -y
              return mat4.lookAt(
                [],
                lightPos,
                [lightPos[0], lightPos[1] - 0.1, lightPos[2]],
                [0.0, 0.0, -1.0]
              )
            case 4: // +z
              return mat4.lookAt(
                [],
                lightPos,
                [lightPos[0], lightPos[1], lightPos[2] + 0.1],
                [0.0, -1.0, 0.0]
              )
            case 5: // -z
              return mat4.lookAt(
                [],
                lightPos,
                [lightPos[0], lightPos[1], lightPos[2] - 0.1],
                [0.0, -1.0, 0.0]
              )
          }
        }
      },

      frag: `
  precision mediump float;

  varying vec3 vPosition;

  uniform vec3 lightPos;

  vec4 packRGBA (float v) {
  vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v);
  pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;
  return pack;
}

  void main () {
    gl_FragColor = packRGBA(distance(vPosition, lightPos));
  }`,

      vert: `
  precision mediump float;

  attribute vec3 position;
  attribute float idx;
  attribute vec3 offset;

  varying vec3 vPosition;

  uniform float time;

  uniform mat4 projection, view, model;

  void main() {
    // vec4 p = model * vec4(position, 1.0);
    vec4 worldSpacePosition = model * vec4(position + offset * sin(time), 1);
    vPosition = worldSpacePosition.xyz;
    gl_Position = projection * view * worldSpacePosition;
  }`,

      framebuffer: (context, props, batchId) => {
        return this.shadowFbo.faces[batchId]
      }
    })
  }

  run(regl) {
    // if (this.simulate) this.pathiclesRunner.start()
    const globalScope = regl({
      uniforms: {
        time: ({ time }) => time,
        lightPos: ({ time }) => [
          0,
          1,
          Math.cos(time * 1) * k * 1
          // -Math.sin(time * 4) * k * 5
        ]
      }
    })
    const mainloop = () => {
      return regl.frame(({ time }) => {
        // this.lightPos[1] = Math.sin(tick * 1) * 0.1 + 10

        const drawMeshes = () => {
          regl.clear({
            color: [0, 0, 0, 255],
            depth: 1
          })

          // for (i = 0; i < 1.0; i += 0.1) {
          //   theta = Math.PI * 2 * i
          //   R = 20.0
          //
          //   r = ((Math.abs(23232 * i * i + 100212) % 255) / 255) * 0.4 + 0.3
          //   g = ((Math.abs(32278 * i + 213) % 255) / 255) * 0.4 + 0.15
          //   b =
          //     ((Math.abs(3112 * i * i * i + 2137 + i) % 255) / 255) * 0.05 +
          //     0.05
          //
          //   bunnyMesh.draw({
          //     scale: 0.7,
          //     translate: [
          //       R * Math.cos(theta + phi0),
          //       3.0,
          //       R * Math.sin(theta + phi0)
          //     ],
          //     color: [r, g, b]
          //   })
          // }

          this.boxMesh.draw({
            scale: 0.1,
            translate: [
              0,
              1,
              Math.cos(time * 1) * k * 1
              // -Math.sin(time * 4) * k * 5
            ],
            color: [1, 1, 0]
          })

          this.boxMesh.draw({
            scale: 1.5,
            translate: [0, -2, 0],
            color: [1, 1, 0]
          })
          this.boxMesh.draw({
            scale: 1.5,
            translate: [0, 0, 0],
            color: [1, 1, 0]
          })
          this.boxMesh.draw({
            scale: 1.5,
            translate: [0, 2, 0],
            color: [1, 1, 0]
          })
          this.boxMesh.draw({
            scale: 1.5,
            translate: [-2, -2, 0],
            color: [1, 1, 0]
          })
          this.boxMesh.draw({
            scale: 1.5,
            translate: [-2, 0, 0],
            color: [1, 1, 0]
          })
          this.boxMesh.draw({
            scale: 1.5,
            translate: [-2, 2, 0],
            color: [1, 1, 0]
          })
          this.boxMesh.draw({
            scale: 1.5,
            translate: [2, -2, 0],
            color: [1, 1, 0]
          })
          this.boxMesh.draw({
            scale: 1.5,
            translate: [2, 0, 0],
            color: [1, 1, 0]
          })
          this.boxMesh.draw({
            scale: 1.5,
            translate: [2, 2, 0],
            color: [1, 1, 0]
          })
          // this.boxMesh.draw({
          //   scale: 100,
          //   translate: [-150, 0, 0],
          //   color: [1, 1, 0]
          // })
          this.boxMesh.draw({
            scale: 10,
            translate: [0, 0, 0],
            color: [1, 0, 0]
          })
          // this.planeMesh.draw({
          //   scale: 250.0,
          //   translate: [0.0, 0.0, 0.0],
          //   color: [1.0, 0, 1.0]
          // })
        }

        // PerformanceLogger.start('mainloop')
        if (this.config.view.camera.autorotate) {
          this.cameras['free'].rotate(this.config.view.camera.dTheta, 0)
        }
        // if (this.simulate) this.pathiclesRunner.next()

        // this.setCameraUniforms(this.camera, () => {
        this.setCameraUniforms[this.control.cameraMode](
          {
            ...this.cameras[this.control.cameraMode]
            // viewRange: this.control.viewRange
            // scene: storyState.scene,
            // scene_t: storyState.scene_t
          },
          () => {
            this.cameras['free'].tick({})
            globalScope(() => {
              //   console.log(drawMeshes)
              this.drawDepth(6, () => {
                drawMeshes()
              })
              this.drawNormal(() => {
                drawMeshes()
              })
            })
          }
        )
        // if (this.config.view.camera.autorotate) {
        //   this.cameras['free'].rotate(this.config.view.camera.dTheta, 0)
        // }
        // if (this.simulate) this.pathiclesRunner.next()
        //
        // // this.setCameraUniforms(this.camera, () => {
        // this.setCameraUniforms[this.control.cameraMode](
        //   {
        //     ...this.cameras[this.control.cameraMode]
        //     // viewRange: this.control.viewRange
        //     // scene: storyState.scene,
        //     // scene_t: storyState.scene_t
        //   },
        //   () => {
        //     this.cameras['free'].tick({})
        //
        //     this.view.drawDiffuse({ viewRange: [0, 1] })
        //
        //     if (this.config.view.showTextures) {
        //       //this.view.shadow.drawFbo()
        //       this.simulation.drawVariableTexture({ variableName: 'position' })
        //       this.simulation.drawVariableTexture({ variableName: 'velocity' })
        //     }
        //   }
        // )

        // PerformanceLogger.stop()
        // this.ca.tick()

        // console.log(this.ca)
      })
    }
    this.loop = mainloop()
  }

  stop() {
    this.loop.cancel()
  }
}
