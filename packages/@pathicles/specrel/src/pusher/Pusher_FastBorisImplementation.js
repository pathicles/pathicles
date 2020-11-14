import Specrel, {
  cross,
  format30,
  gammaFromVelocity__c,
  gammaFromVelocity__ms_1
} from '../'
import Pusher from './Pusher'
import createLogger from '../Logger'
import * as d3 from 'd3'

const logger = createLogger(
  "Pusher_FastBorisImplementatlet canvas = document.getElementById('canvas');\n" +
    "let gl = canvas.getContext('webgl');\n" +
    '\n' +
    "canvas.addEventListener('webglcontextlost', (event) => {\n" +
    '\tconsole.log(event);\n' +
    '});\n' +
    '\n' +
    "gl.getExtension('WEBGL_lose_context').loseContext();\nion"
)
// logger.setLevel("warn")
logger.enable = true

export default class Pusher_FastBorisImplementation extends Pusher {
  /**
   * Create a Euler pusher for a system
   * @param {ParticleSystem} system - The particle system the pusher is applied to.
   * @param {number} dt__s - The default time step. @defaultvalue = 1/c
   */
  constructor({
    system,
    dt__s,
    round = (x) => Math.fround(x),
    stepHistoryLength = 1
  }) {
    super({ system, dt__s })
    this._round = round

    this._initialSystem = system

    this._currentStep = null
    this._dt__s = this._round(dt__s.toNumber())
    this._half_dt__s = this._round(dt__s.times(0.5).toNumber())
    this._stepHistoryLength = stepHistoryLength

    const initialData = system.particleCollection.asArrays(stepHistoryLength)

    this.variables = {
      gamma: initialData.gamma.map((x) => round(x)),
      position__m: initialData.position__m.map((x) => round(x)),
      velocity__c: initialData.velocity__c.map((x) => round(x))
      // velocityPrime__c: initialData.velocity__c.map(x => round(1 - round(x))),
      // velocityPrime__ms_1: initialData.velocity__c.map(x => round(Specrel.c - round(Specrel.c * x))),
    }
    this.uniforms = {
      charge__eq: initialData.charge__eq.map((x) => round(x)),
      mass__eVc_2: initialData.mass__eVc_2.map((x) => round(x))
    }
    this._particleCount = this._system.particles.length
  }

  toData() {
    const steps = []
    const xValues = []
    const yValues = []
    const zValues = []

    for (let s = 0; s < this._stepHistoryLength; s++) {
      const step = {
        stepId: s,
        particles: []
      }
      steps.push(step)

      for (let p = 0; p < this._particleCount; p++) {
        const dataIndexOffset = 4 * p + 4 * s * this._particleCount

        xValues.push(this.variables.position__m[dataIndexOffset])
        yValues.push(this.variables.position__m[dataIndexOffset + 1])
        zValues.push(this.variables.position__m[dataIndexOffset + 2])

        const particle = {
          particleId: p,
          position__m: [
            this.variables.position__m[dataIndexOffset],
            this.variables.position__m[dataIndexOffset + 1],
            this.variables.position__m[dataIndexOffset + 2]
          ],
          velocity__c: [
            this.variables.velocity__c[dataIndexOffset],
            this.variables.velocity__c[dataIndexOffset + 1],
            this.variables.velocity__c[dataIndexOffset + 2]
          ],

          gamma: this.variables.velocity__c[dataIndexOffset + 3]
        }
        step.particles.push(particle)
      }
    }
    const [xMin, xMax] = d3.extent(xValues)
    const xWidth = xMax - xMin
    const [yMin, yMax] = d3.extent(yValues)
    const yWidth = yMax - yMin
    const [zMin, zMax] = d3.extent(zValues)
    const zWidth = zMax - zMin

    const boundingBox = {
      x: { min: xMin, max: xMax, width: xWidth },
      y: { min: yMin, max: yMax, width: yWidth },
      z: { min: zMin, max: zMax, width: zWidth }
    }

    return { boundingBox, steps }
  }

  push(steps = 1, round = this._round) {
    for (let step = 0; step < steps; step++) {
      if (!this._currentStep) {
        this._currentStep = 1
      } else {
        this._currentStep++
      }

      const nextParticlesCollection = this.system.particleCollection.clone()

      nextParticlesCollection.particles.forEach((pp, p) => {
        const dataIndexOffset =
          4 * p + 4 * (this._currentStep - 1) * this._particleCount

        const particle = {
          currentStep: this._currentStep,
          ct__m: round(this._dt__s * Specrel.c * this._currentStep),
          gamma: this.variables.gamma[p],
          position__m: [
            this.variables.position__m[dataIndexOffset],
            this.variables.position__m[dataIndexOffset + 1],
            this.variables.position__m[dataIndexOffset + 2]
          ],
          velocity__c: [
            this.variables.velocity__c[dataIndexOffset],
            this.variables.velocity__c[dataIndexOffset + 1],
            this.variables.velocity__c[dataIndexOffset + 2]
          ],
          // mass__eVc_2: round(this.uniforms.mass__eVc_2[p]),
          // charge__eq: this.uniforms.charge__eq[p],
          chargeMassRatio__Ckg_1: round(pp.chargeMassRatio__Ckg_1)
        }

        particle.velocity__ms_1 = particle.velocity__c.map((vi) =>
          round(vi * Specrel.c)
        )

        particle.intermediatePosition__m = particle.position__m.map((x, i) =>
          round(x + this._half_dt__s * particle.velocity__c[i] * Specrel.c)
        )

        const { B__T, E__Vm_1 } = this.system.fieldValue(
          particle.intermediatePosition__m
        )

        const dv_el = E__Vm_1.map((E_i, i) =>
          round(E_i * this._half_dt__s * particle.chargeMassRatio__Ckg_1)
        )

        console.log(dv_el)

        const v_el1__ms_1 = particle.velocity__ms_1.map((v_i, i) =>
          round(v_i + dv_el[i])
        )
        const v_el1__c = particle.velocity__c.map(
          (beta_i, i) => beta_i + round(dv_el[i] / Specrel.c)
        )

        particle.v_el1__ms_1 = v_el1__ms_1
        particle.v_el1__c = v_el1__c
        particle.gamma_el1__ms_1 = gammaFromVelocity__ms_1(
          particle.v_el1__ms_1,
          round
        )
        particle.gamma_el1__c = gammaFromVelocity__c(particle.v_el1__c, round)

        particle.gamma_el1 = particle.gamma

        const b_0_tmp = round(
          round(
            round(particle.chargeMassRatio__Ckg_1) / round(particle.gamma_el1)
          ) * round(this._half_dt__s)
        )
        const b_0 = B__T.map((B_i, i) => round(B_i * b_0_tmp))
        const b_0xb_0 = round(
          round(b_0[0] ** 2) + round(b_0[1] ** 2) + round(b_0[2] ** 2)
        )

        particle.b_0 = b_0
        particle.b_0xb_0 = b_0xb_0

        const factor = 2 / (1 + b_0xb_0)
        const v_el1_cross_b_0__c = cross(v_el1__c, b_0)
        const v_el1_plus_v_el1_cross_b_0__c = v_el1__c.map(
          (v, i) => v + v_el1_cross_b_0__c[i]
        )
        const v_el1_plus_v_el1_cross_b_0__cross_b0__c = cross(
          v_el1_plus_v_el1_cross_b_0__c,
          b_0
        )
        const dv_mag__c = v_el1_plus_v_el1_cross_b_0__cross_b0__c.map(
          (v, i) => factor * v
        )

        logger.info('b_0xb_0', b_0xb_0)
        logger.info('factor', factor)
        logger.info('v_el1__c', v_el1__c)
        logger.info('v_el1_cross_b_0__c', v_el1_cross_b_0__c)
        logger.info('dv_mag__c', dv_mag__c)

        particle.v_mag__c = v_el1__c.map((v_i, i) => round(v_i + dv_mag__c[i]))

        logger.info('b_0_tmp', format30(b_0_tmp))
        logger.info('b_0xb_0', format30(b_0xb_0))

        particle.velocity_next__c = particle.v_mag__c.map(
          (v_i, i) => v_i + round(dv_el[i] / Specrel.c)
        )
        logger.info('particle.velocity_next__c', particle.velocity_next__c)

        particle.position_next__m = particle.intermediatePosition__m.map(
          (x, i) =>
            x + particle.velocity_next__c[i] * Specrel.c * this._half_dt__s
        )

        const nextDataIndexOffset =
          4 * p + 4 * this._currentStep * this._particleCount

        this.variables.velocity__c[nextDataIndexOffset] =
          particle.velocity_next__c[0]
        this.variables.velocity__c[nextDataIndexOffset + 1] =
          particle.velocity_next__c[1]
        this.variables.velocity__c[nextDataIndexOffset + 2] =
          particle.velocity_next__c[2]
        this.variables.velocity__c[nextDataIndexOffset + 3] = particle.gamma

        this.variables.position__m[nextDataIndexOffset] =
          particle.position_next__m[0]
        this.variables.position__m[nextDataIndexOffset + 1] =
          particle.position_next__m[1]
        this.variables.position__m[nextDataIndexOffset + 2] =
          particle.position_next__m[2]
        this.variables.position__m[nextDataIndexOffset + 3] = particle.ct__m
      })

      this.system.particleCollection = nextParticlesCollection
    }
  }
}
