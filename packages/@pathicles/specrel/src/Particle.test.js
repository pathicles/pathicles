import Specrel, { bigNumberMath, format6 } from './Specrel'
import Particle from './Particle'
import ParticleTypes from './ParticleTypes'
// todo: refactor to mathjs
import { Decimal } from 'decimal.js'

Decimal.set({ precision: 20, rounding: 4 })
const numberify = arr => {
  return arr.map(a => a.toNumber())
}

describe('Particle constructor must be called with arguemtn', () => {
  let constructor = () => {
    new Particle()
  }
  expect(constructor).toThrow(
    'The constructor of class Particle has a mandatory argument'
  )
})

describe('calculateGammaForVelocity', () => {
  const electron = new Particle.create(ParticleTypes.ELECTRON)

  const gamma1 = electron.calculateGammaForVelocity(
    bigNumberMath.eval('[0 c, 0c, 0.8660254038c]')
  )
  const gamma2 = electron.calculateGammaForBeta(
    bigNumberMath.bignumber(0.8660254038)
  )
  const gamma3 = electron.calculateGammaForU(
    bigNumberMath.eval('[0 c, 0c, 1.7320508076c]')
  )

  expect(format6(gamma2)).toEqual('2')
  expect(format6(gamma1)).toEqual('2')
  expect(format6(gamma3)).toEqual('2')
})

test('Particle factory: PHOTON', () => {
  const photon = new Particle.create(ParticleTypes.PHOTON)

  expect(photon.particleType.name).toEqual(ParticleTypes.PHOTON.name)

  expect(format6(photon.mass)).toEqual('0 eV / c^2')
  expect(format6(photon.charge.to('C'))).toEqual('0 C')
  expect(format6(photon.position)).toEqual('[0 m, 0 m, 0 m]')
  expect(format6(photon.momentum)).toEqual('[0 eV / c, 0 eV / c, 1 eV / c]')
  expect(format6(photon.momentumNormalized)).toEqual('[0, 0, 1]')

  // console.log(photon.beta)
  // console.log("photon.beta", photon.beta.toNumber())
  expect(format6(photon.velocity)).toEqual('[0 c, 0 c, 1 c]')

  expect(format6(photon.chargeMassRatio)).toEqual('0 C / kg')

  expect(photon.energy.toNumber()).toEqual(1)
  expect(photon.gamma.toNumber()).toEqual(Infinity)
  expect(photon.beta.toNumber()).toEqual(1)

  photon.setMomentumFromGamma(1, [0, 0, 1])
  expect(numberify(photon.momentum)).toEqual([0, 0, 1])

  expect(() => photon.setMomentumFromKineticEnergy(1, [0, 0, 1])).toThrow(
    'method cannot be used for massless particles.'
  )

  const projectedPosition__m = photon.projectedPosition__m(
    Specrel.speedOfLight__ms_1.pow(-1)
  )

  expect(format6(projectedPosition__m)).toEqual('[0, 0, 1]')
})

test('Particle factory: ELECTRON', () => {
  const electron = new Particle.create(ParticleTypes.ELECTRON)

  expect(format6(electron.mass)).toEqual('5.10999e+5 eV / c^2')
  expect(format6(electron.charge.to('qe'))).toEqual('-1e+0 qe')
  expect(format6(electron.charge__C)).toEqual('-1.60218e-19')
  expect(format6(electron.position)).toEqual('[0 m, 0 m, 0 m]')
  expect(format6(electron.momentum)).toEqual('[0 eV / c, 0 eV / c, 0 eV / c]')
  expect(format6(electron.momentumNormalized)).toEqual('[0, 0, 0]')
  expect(format6(electron.velocity)).toEqual('[0 c, 0 c, 0 c]')
  expect(format6(electron.u)).toEqual('[0 c, 0 c, 0 c]')

  expect(electron.chargeMassRatio.to('C / kg').toNumber()).toEqual(
    -1.75882004556243e11
  )

  expect(electron.energy.toNumber()).toEqual(510998.94)
  expect(electron.restEnergy.toNumber()).toEqual(510998.94)
  expect(electron.kineticEnergy__eV.toNumber()).toEqual(0)
  expect(electron.gamma.toNumber()).toEqual(1)
  expect(electron.beta.toNumber()).toEqual(0)

  electron.setMomentumFromGamma(1, [1, 0, 0])
  expect(numberify(electron.position)).toEqual([0, 0, 0])
  expect(numberify(electron.momentum)).toEqual([0, 0, 0])
  expect(numberify(electron.momentumNormalized)).toEqual([0, 0, 0])
  expect(numberify(electron.velocity)).toEqual([0, 0, 0])
  expect(electron.energy.toNumber()).toEqual(510998.94)
  expect(electron.kineticEnergy__eV.toNumber()).toEqual(0)
  expect(electron.gamma.toNumber()).toEqual(1)
  expect(electron.beta.toNumber()).toEqual(0)

  electron.setMomentumFromGamma(2, [1, 0, 0])
  expect(numberify(electron.position)).toEqual([0, 0, 0])

  expect(format6(electron.momentum)).toEqual(
    '[8.85076e+5 eV / c, 0 eV / c, 0 eV / c]'
  )

  expect(format6(electron.momentumNormalized)).toEqual('[1, 0, 0]')
  expect(electron.energy__eV.toNumber()).toEqual(510998.94 * 2)
  expect(electron.kineticEnergy__eV.toNumber()).toEqual(510998.94)
  expect(electron.gamma.toNumber()).toEqual(2)
  const beta = bigNumberMath.bignumber(1 - 1 / (2 * 2)).sqrt()
  expect(electron.beta.toNumber()).toEqual(beta.toNumber())
  expect(format6(electron.momentum)).toEqual(
    '[8.85076e+5 eV / c, 0 eV / c, 0 eV / c]'
  )

  electron.setMomentumFromGamma(1, [1, 0, 0])
  electron.setMomentumFromKineticEnergy(510998.94, [0, 1, 0])
  expect(format6(electron.momentum)).toEqual(
    '[0 eV / c, 8.85076e+5 eV / c, 0 eV / c]'
  )

  expect(format6(electron.momentumNormalized)).toEqual('[0, 1, 0]')
  expect(electron.energy.toNumber()).toEqual(510998.94 * 2)
  expect(electron.kineticEnergy__eV.toNumber()).toEqual(510998.94)
  expect(electron.gamma.toNumber()).toEqual(2)

  electron.setMomentumFromGamma(10, [0, 0, 1])
  expect(numberify(electron.position)).toEqual([0, 0, 0])

  expect(format6(electron.momentum)).toEqual(
    '[0 eV / c, 0 eV / c, ' +
      format6(
        bigNumberMath
          .bignumber(510998.94)
          .times(bigNumberMath.bignumber(99).sqrt())
      ) +
      ' eV / c]'
  )

  expect(electron.gamma.toNumber()).toEqual(10)
  expect(electron.energy.toNumber()).toEqual(
    bigNumberMath.bignumber(510998.94 * 10).toNumber()
  )

  const beta10 = bigNumberMath.bignumber(1 - 1 / (10 * 10)).sqrt()
  expect(electron.beta.toNumber()).toEqual(beta10.toNumber())

  expect(format6(electron.velocity)).toEqual(
    '[0 c, 0 c, ' + format6(beta10) + ' c]'
  )
  expect(format6(electron.u)).toEqual(
    '[0 c, 0 c, ' + format6(10 * beta10) + ' c]'
  )
})
test('Particle factory: POSITRON', () => {
  const positron = new Particle.create(ParticleTypes.POSITRON)

  expect(positron.mass.toNumber()).toEqual(510998.94)
  expect(positron.charge.toNumber()).toEqual(1)
  expect(numberify(positron.position)).toEqual([0, 0, 0])
  expect(numberify(positron.momentum)).toEqual([0, 0, 0])
  expect(positron.energy.toNumber()).toEqual(510998.94)
  expect(positron.restEnergy.toNumber()).toEqual(510998.94)
  expect(positron.kineticEnergy__eV.toNumber()).toEqual(0)
  expect(positron.gamma.toNumber()).toEqual(1)
  expect(positron.beta.toNumber()).toEqual(0)

  expect(positron.chargeMassRatio.to('C / kg').toNumber()).toEqual(
    1.75882004556243e11
  )
})

describe('Relativitic electrons ', () => {
  it('Relativitic electrons ', () => {
    const electron = new Particle.create(ParticleTypes.ELECTRON)

    electron.setMomentumFromBeta(0.985, [0, 0, 1])

    expect(
      electron.momentum.map(p => p.to('kg m / s').format({ precision: 3 }))
    ).toEqual(['0 (kg m) / s', '0 (kg m) / s', '1.56e-21 (kg m) / s'])
  })
})

test('Particle factory: PROTON', () => {
  const proton = new Particle.create(ParticleTypes.PROTON)

  expect(proton.mass.toNumber()).toEqual(938272081)
  expect(proton.charge.toNumber()).toEqual(1)
  expect(numberify(proton.position)).toEqual([0, 0, 0])
  expect(numberify(proton.momentum)).toEqual([0, 0, 0])

  expect(proton.energy.toNumber()).toEqual(938272081)
  expect(proton.restEnergy.toNumber()).toEqual(938272081)
  expect(proton.kineticEnergy__eV.toNumber()).toEqual(0)
  expect(proton.gamma.toNumber()).toEqual(1)
  expect(proton.beta.toNumber()).toEqual(0)

  expect(proton.chargeMassRatio.to('C / kg').toNumber()).toEqual(
    95.7883323113771e6
  )

  proton.position = [
    bigNumberMath.bignumber(1),
    bigNumberMath.bignumber(1),
    bigNumberMath.bignumber(1)
  ]
  expect(numberify(proton.position)).toEqual([1, 1, 1])
})

describe('Particle.clone', () => {
  it('creates a new particle from the given one', () => {
    const proton1 = new Particle.create(ParticleTypes.PROTON)
    expect(proton1.particleType).toEqual(ParticleTypes.PROTON)
    proton1.position = bigNumberMath.eval('[1, 2, 3]')

    const proton2 = proton1.clone()

    expect(proton2.particleType).toEqual(ParticleTypes.PROTON)

    expect(numberify(proton1.position)).toEqual([1, 2, 3])
    expect(numberify(proton2.position)).toEqual([1, 2, 3])

    proton1.position = bigNumberMath.eval('[4, 5, 6]')
    expect(numberify(proton1.position)).toEqual([4, 5, 6])
    expect(numberify(proton2.position)).toEqual([1, 2, 3])
  })
})
