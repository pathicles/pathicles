import { bigNumberMath } from '../Specrel'
import Pusher from './Pusher'

export default class Pusher_EulerImplementation extends Pusher {
  /**
   * Create a Euler pusher for a system
   * @param {ParticleSystem} system - The particle system the pusher is applied to.
   * @param {number} dt__s - The default time step. @defaultvalue = 1/c
   */
  constructor({ system, dt__s }) {
    super({ system, dt__s })
  }

  push() {
    for (let step = 0; step < steps; step++) {
      const nextParticlesCollection = this.system.particleCollection.clone()

      nextParticlesCollection.particles.forEach((particle, p) => {
        const intermediateVelocity__ms_1 = particle.velocity__ms_1

        const intermediatePosition = bigNumberMath.add(
          particle.position,
          bigNumberMath.multiply(particle.velocity, this._half_dt)
        )

        const { B__T, E } = this.system.fieldValue(
          intermediatePosition.toNumber()
        )

        const v_cross_B__ms_1T = bigNumberMath.cross(intermediateVelocity__ms_1, B__T)
        const qv_cross_B__Cms_1T = bigNumberMath.multiply(
          v_cross_B__ms_1T,
          particle.charge__C
        )
        const deltaMomentum__CmT = bigNumberMath.multiply(
          qv_cross_B__Cms_1T,
          this._half_dt__s
        )
        const deltaMomentum = deltaMomentum__CmT.map(dp =>
          bigNumberMath.unit(dp, 'C m T')
        )
        const deltaMomentum__eVc_1 = deltaMomentum.map(dp =>
          dp.to('eV / c').toNumeric()
        )

        const newMomentum__eVc_1 = bigNumberMath.add(
          particle._momentum__eVc_1,
          deltaMomentum__eVc_1
        )

        particle._momentum__eVc_1 = newMomentum__eVc_1

        const newPosition = bigNumberMath.add(
          intermediatePosition,
          bigNumberMath.multiply(particle.velocity, this._half_dt)
        )

        particle.projectedPosition__m(this._half_dt__s)

        particle._position__m = newPosition
      })

      this.system.particleCollection = nextParticlesCollection
    }
  }
}
