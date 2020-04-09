import Specrel, { bigNumberMath, format30, format6 } from '../Specrel'
import Pusher from './Pusher'
import createLogger from '../Logger'

const logger = createLogger('Pusher_BorisImplementation')
logger.setLevel('info')

export default class Pusher_BorisImplementation extends Pusher {
  /**
   * Create a Euler pusher for a system
   * @param {ParticleSystem} system - The particle system the pusher is applied to.
   * @param {number} dt__s - The default time step. @defaultvalue = 1/c
   */
  constructor({ system, dt__s }) {
    super({ system, dt__s })
  }

  push(steps = 1) {
    const result = { particles: {} }

    for (let step = 0; step < steps; step++) {
      const nextParticlesCollection = this.system.particleCollection.clone()

      nextParticlesCollection.particles.forEach((particle, p) => {
        result.particles[p] = {
          current: {},
          next: {}
        }

        result.particles[p].current.position = particle.position
        result.particles[p].current.momentum = particle.momentum
        result.particles[p].current.velocity = particle.velocity
        result.particles[p].current.gamma = particle.gamma
        result.dt__s = this._dt__s

        const intermediatePosition = bigNumberMath.add(
          particle.position,
          bigNumberMath.multiply(particle.velocity, this._half_dt)
        )

        const { B, E } = this.system.fieldValue(
          intermediatePosition.map(x => x.toNumber())
        )

        const v_n = particle.velocity
        // logger.info("v_n", format30(v_n))

        const dv_el = bigNumberMath.multiply(
          particle.chargeMassRatio,
          this._half_dt,
          E
        )

        // logger.info("dv_el", format30(dv_el))

        const v_el1 = bigNumberMath.add(v_n, dv_el)

        // logger.info("v_el1", format30(v_el1))
        // logger.info("B", format30(B))

        // const gamma_el1 = particle.gamma; //particle.calculateGammaForVelocity(v_el1)
        const gamma_el1 = particle.calculateGammaForVelocity(v_el1)
        logger.info('gamma_el1', format30(gamma_el1))

        logger.info(
          'particle.chargeMassRatio 30',
          format30(particle.chargeMassRatio)
        )
        logger.info(
          'particle.chargeMassRatio ove c 30',
          format30(particle.chargeMassRatio.divide(Specrel.speedOfLight))
        )
        const b_0 = bigNumberMath.multiply(
          bigNumberMath.divide(particle.chargeMassRatio, gamma_el1),
          this._half_dt,
          B
        )
        // logger.info("b_0", format30(b_0))

        // logger.info("this._half_dt", format6(this._half_dt))
        // logger.info("b_0", format6(b_0))
        // logger.info("particle.chargeMassRatio", format30(particle.chargeMassRatio))

        const b_0_square = bigNumberMath.add(
          b_0[0].pow(2),
          b_0[1].pow(2),
          b_0[2].pow(2)
        )

        // logger.info("b_0_square", format30(b_0_square))

        result.b_0_square = b_0_square

        const dv_mag = bigNumberMath.multiply(
          bigNumberMath.divide(2, bigNumberMath.add(1, b_0_square)),
          bigNumberMath.cross(bigNumberMath.add(v_el1, bigNumberMath.cross(v_el1, b_0)), b_0)
        )

        logger.info('v_el1', format6(v_el1))
        logger.info('v_el1_cross_b_0__c', format6(bigNumberMath.cross(v_el1, b_0)))
        logger.info(
          'factor',
          format6(bigNumberMath.divide(2, bigNumberMath.add(1, b_0_square)))
        )
        logger.info('dv_mag__c', format6(dv_mag))

        const v_mag = bigNumberMath.add(v_el1, dv_mag)

        // logger.info("v_mag", format6(v_mag))

        const v_n1 = bigNumberMath.add(v_mag, dv_el)

        if (particle.chargeMassRatio.toNumber() != 0)
          particle.setMomentumFromVelocity(v_n1)

        const x_next = bigNumberMath.add(
          intermediatePosition,
          bigNumberMath.multiply(v_n1, this._half_dt)
        )

        particle._position__m = x_next.map(x => x.to('m').toNumeric())

        // console.log(
        //   prettyjson.render({
        //     position: format30(particle.position),
        //     momentum: format30(particle.momentum)
        //
        //   }))
        //

        result.particles[p].next.position = particle.position
        result.particles[p].next.momentum = particle.momentum
        result.particles[p].next.velocity = v_n1
        result.particles[p].next.gamma = particle.gamma
      })

      this.system.particleCollection = nextParticlesCollection
    }
  }
}
