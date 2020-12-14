import { bigNumberMath, speedOfLight__ms_1, speedOfLight } from './index'

class Particle {
  constructor(particleType) {
    if (!particleType) {
      throw 'The constructor of class Particle has a mandatory argument'
    }

    this._mass__eVc_2 = bigNumberMath.evaluate(particleType.mass__eVc_2)
    this._charge__qe = bigNumberMath.evaluate(particleType.charge__qe)
    this._chargeMassRatio__Ckg_1 = bigNumberMath.evaluate(
      particleType.chargeMassRatio__Ckg_1
    )

    this._position__m = [
      bigNumberMath.evaluate(0),
      bigNumberMath.evaluate(0),
      bigNumberMath.evaluate(0)
    ]

    this._momentum__eVc_1 = [
      bigNumberMath.evaluate(0),
      bigNumberMath.evaluate(0),
      bigNumberMath.evaluate(0)
    ]

    if (particleType.mass__eVc_2 === 0) {
      this._momentum__eVc_1 = [
        bigNumberMath.evaluate(0),
        bigNumberMath.evaluate(0),
        bigNumberMath.evaluate(1)
      ]
    }
    this._particleType = particleType

    // console.log(this)
  }

  get particleType() {
    return this._particleType
  }

  get mass() {
    return bigNumberMath.unit(this._mass__eVc_2, 'eV / c^2')
  }

  get mass__eVc_2() {
    return this._mass__eVc_2
  }

  get charge() {
    return bigNumberMath.unit(this._charge__qe, 'qe')
  }

  get charge__C() {
    return this.charge.to('C').toNumeric()
  }

  get chargeMassRatio() {
    return bigNumberMath.unit(this.chargeMassRatio__Ckg_1, 'C / kg')
  }

  get chargeMassRatio__Ckg_1() {
    return this._chargeMassRatio__Ckg_1
  }

  get position() {
    return this._position__m.map((d) => bigNumberMath.unit(d, 'm'))
  }

  set position(position__m) {
    this._position__m = position__m
  }

  get momentum() {
    return this._momentum__eVc_1.map((d) => bigNumberMath.unit(d, 'eV / c'))
  }

  get momentumSquare__eV2c_2() {
    return this._momentum__eVc_1[0]
      .pow(2)
      .add(this._momentum__eVc_1[1].pow(2))
      .add(this._momentum__eVc_1[2].pow(2))
  }

  get momentumLength__eVc_1() {
    return bigNumberMath.norm(this._momentum__eVc_1)
  }

  get momentumNormalized() {
    if (this.momentumSquare__eV2c_2.sqrt().eq(0)) {
      return [
        bigNumberMath.bignumber(0),
        bigNumberMath.bignumber(0),
        bigNumberMath.bignumber(0)
      ]
    }

    return bigNumberMath.divide(
      this._momentum__eVc_1,
      this.momentumLength__eVc_1
    )
  }

  get velocity__c() {
    if (this.beta.equals(1)) {
      return this.direction
    }
    return this._momentum__eVc_1.map((p) =>
      bigNumberMath.divide(
        p,
        bigNumberMath.multiply(this._mass__eVc_2, this.gamma)
      )
    )
  }

  get velocity__ms_1() {
    return this.velocity__c.map((v) =>
      bigNumberMath.multiply(v, speedOfLight__ms_1)
    )
  }

  get velocity() {
    return this.velocity__c.map((v) =>
      bigNumberMath.multiply(v, speedOfLight__ms_1)
    )
  }

  get u() {
    return bigNumberMath.multiply(this.velocity, this.gamma)
  }

  get energy__eV() {
    return this._mass__eVc_2.pow(2).add(this.momentumSquare__eV2c_2).sqrt()
  }

  get energy() {
    return bigNumberMath.unit(this.energy__eV, 'eV')
  }

  get restEnergy() {
    return bigNumberMath.unit(this._mass__eVc_2, 'eV')
  }

  get kineticEnergy__eV() {
    return this.energy__eV.minus(this._mass__eVc_2)
  }

  get beta() {
    return bigNumberMath.bignumber(1).minus(this.gamma.pow(-2)).sqrt()
  }

  get gamma() {
    if (!this._mass__eVc_2.toNumber()) return bigNumberMath.bignumber(Infinity)
    return this.energy__eV.div(this._mass__eVc_2)
  }

  get direction() {
    return bigNumberMath.divide(
      this._momentum__eVc_1,
      bigNumberMath.norm(this._momentum__eVc_1)
    )
  }

  gyroRadius(dipole_strength) {
    return bigNumberMath.divide(
      bigNumberMath.multiply(this.gamma, this.velocity, this.mass),
      bigNumberMath.multiply(
        this.charge.abs(),
        bigNumberMath.unit(dipole_strength, 'T')
      )
    )
  }

  gyroPeriod(dipole_strength) {
    return bigNumberMath.divide(
      bigNumberMath.multiply(
        bigNumberMath.bignumber(bigNumberMath.PI * 2),
        this.gamma,
        this.mass
      ),
      bigNumberMath.multiply(
        this.charge.abs(),
        bigNumberMath.unit(dipole_strength, 'T')
      )
    )
  }

  gyroFrequency(dipole_strength) {
    return bigNumberMath.divide(
      bigNumberMath.multiply(
        this.charge.abs(),
        bigNumberMath.unit(dipole_strength, 'T')
      ),
      bigNumberMath.multiply(this.gamma, this.mass)
    )
  }

  setMomentumFromKineticEnergy(kineticEnergy, direction) {
    if (this._mass__eVc_2.toNumber() === 0)
      throw 'method cannot be used for massless particles.'

    const gamma = bigNumberMath
      .bignumber(kineticEnergy)
      .div(this._mass__eVc_2)
      .plus(1)
    this.setMomentumFromGamma(gamma, direction)
  }

  setDirection(direction) {
    const d_directionNormalized = bigNumberMath.divide(
      direction,
      bigNumberMath.norm(direction)
    )
    const newMomentum__eVc_1 = bigNumberMath.multiply(
      d_directionNormalized,
      this.momentumLength__eVc_1
    )
    this._momentum__eVc_1 = newMomentum__eVc_1
  }

  setMomentumFromGamma(gamma, direction = [0, 0, 1]) {
    if (direction.length != 3) {
      throw 'direction must bew Array of length 3'
    }

    const bigmathDirection = direction.map((x) => bigNumberMath.bignumber(x))

    //  special case massless particles (photons)
    if (this.particleType.mass__eVc_2 === 0) {
      this.setDirection(bigmathDirection)
    } else {
      const d_directionNormalized = bigNumberMath.divide(
        bigmathDirection,
        bigNumberMath.norm(bigmathDirection)
      )

      const gamma2 = bigNumberMath.bignumber(gamma).pow(2)

      const newMomentumLength = bigNumberMath.multiply(
        gamma2.minus(1).sqrt(),
        this.mass,
        speedOfLight
      )

      const newMomentum = bigNumberMath.multiply(
        d_directionNormalized,
        newMomentumLength
      )

      this._momentum__eVc_1 = newMomentum.map((p) => p.to('eV / c').toNumeric())
    }
  }

  setMomentumFromVelocity(velocity) {
    const momentum = bigNumberMath.multiply(this.mass, this.gamma, velocity)

    this._momentum__eVc_1 = momentum.map((p) => p.to('eV / c').toNumeric())
  }

  setMomentumFromBeta(beta, direction) {
    function gammaFromBeta(beta) {
      return bigNumberMath
        .subtract(1, bigNumberMath.bignumber(beta).pow(2))
        .sqrt()
        .pow(-1)
    }

    if (direction.length !== 3) {
      throw 'direction must bew Array of length 3'
    }

    //  special case massless particles (photons)
    if (this.particleType.mass__eVc_2 === 0) {
      throw 'can only be used for particles with mass'
    } else {
      this.setMomentumFromGamma(gammaFromBeta(beta), direction)
    }
  }

  projectedPosition__m(dt__s) {
    return bigNumberMath.add(
      this._position__m,
      bigNumberMath.multiply(
        this.velocity__ms_1,
        bigNumberMath.bignumber(dt__s)
      )
    )
  }

  calculateGammaForVelocity(velocity) {
    const beta = bigNumberMath
      .divide(
        bigNumberMath.add(
          velocity[0].pow(2),
          velocity[1].pow(2),
          velocity[2].pow(2)
        ),
        speedOfLight.pow(2)
      )
      .sqrt()

    return this.calculateGammaForBeta(beta)
  }

  calculateGammaForBeta(beta) {
    return bigNumberMath.divide(
      1,
      bigNumberMath.subtract(1, beta.pow(2)).sqrt()
    )
  }

  // calculateGammaForU(u) {
  //   return bigNumberMath
  //     .add(
  //       1,
  //       bigNumberMath.divide(
  //         bigNumberMath.add(u[0].pow(2), u[1].pow(2), u[2].pow(2)),
  //         speedOfLight.pow(2)
  //       )
  //     )
  //     .sqrt()
  // }

  toString() {
    return (
      'position: (' +
      this.position.map((a) => a.toNumber()).join(', ') +
      '); momentum: (' +
      this.momentum.map((a) => a.toNumber()).join(', ') +
      '); velocity: (' +
      this.velocity__c.map((a) => a.toNumber()).join(', ') +
      ')'
    )
  }

  getVariableData() {
    return {
      particleType: this.particleType.name,
      position__m: this.position.map((a) => a.toNumber()),
      velocity__c: this.velocity__c.map((a) => a.toNumber()),
      gamma: this.gamma.toNumber()
    }
  }

  clone() {
    const newParticle = new Particle(this.particleType)
    newParticle._position__m = this._position__m
    newParticle._momentum__eVc_1 = this._momentum__eVc_1
    return newParticle
  }
}

Particle.create = (particleType, position, momentum) => {
  // if (typeof particleTypeName === "undefined") {
  //   throw new Error(`argument typeName must be of type String`)
  // }

  // const particleType = PARTICLE_TYPES.byName(particleTypeName)
  if (!particleType) {
    throw new Error(`particleType ${particleType} unknown`)
  }

  const newParticle = new Particle(particleType)

  if (position) {
    newParticle.position = position
  }
  if (momentum) {
    newParticle.momentum = momentum
  }

  return newParticle
}

export default Particle
