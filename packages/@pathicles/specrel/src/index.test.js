import { describe, expect, it } from '@jest/globals'
import {
  bigNumberMath,
  elementaryCharge,
  elementaryCharge__C,
  gammaFromBeta,
  gammaFromBetaPrime,
  gammaFromBetaPrimeSquare,
  gammaFromBetaSquare,
  speedOfLight,
  speedOfLight__ms_1
} from './index'
import ParticleTypes from './ParticleTypes'

describe('beta', () => {
  it('betaSquareFromVelocity', () => {
    for (let i = 1; i < 17; i++) {
      const betaPrime = Math.pow(10, -i)
      const beta = 1 - betaPrime

      for (let j = 1; j < 2; j++) {
        const angle = (2 * Math.PI) / j
        const velocity__c = [0, 0, beta]
        const velocityPrime__c = velocity__c.map((v) => 1 - v)

        //const velocity__ms_1 = velocity__c.map(v => v * c)

        // console.log({
        //   label: '1 - ' + betaPrime,
        //   beta,
        //   angle,
        //   velocity__c,
        //   velocityPrime__c,
        //   // betaSquareFromVelocity: betaSquareFromVelocity(velocity__c),
        //   betaSquareFromVelocity32: betaSquareFromVelocity__c(
        //     velocity__c,
        //     Math.fround
        //   ),
        //   // betaSquareFromVelocityRoot: Math.sqrt(betaSquareFromVelocity(velocity__c)),
        //   betaSquareFromVelocityRoot32: Math.fround(
        //     Math.sqrt(betaSquareFromVelocity__c(velocity__c, Math.fround))
        //   ),
        //   // betaSquareFromVelocityPrime: betaSquareFromVelocityPrime(velocityPrime__c),
        //   betaSquareFromVelocityPrime32: betaSquareFromVelocityPrime(
        //     velocityPrime__c,
        //     Math.fround
        //   ),
        //   // betaSquareFromVelocityPrimeRoot: Math.sqrt(betaSquareFromVelocityPrime(velocityPrime__c)),
        //   betaSquareFromVelocityPrimeRoot32: Math.fround(
        //     Math.sqrt(
        //       betaSquareFromVelocityPrime(velocityPrime__c, Math.fround)
        //     )
        //   ),
        //   gammaFromBeta: gammaFromBeta(
        //     Math.sqrt(betaSquareFromVelocity__c(velocity__c))
        //   ),
        //   gammaFromBeta32: gammaFromBeta(
        //     Math.sqrt(betaSquareFromVelocity__c(velocity__c, Math.fround)),
        //     Math.fround
        //   )
        // })
      }
    }
  })

  it('beta', () => {
    const result = []

    for (let i = 1; i < 17; i++) {
      const betaPrime = Math.pow(10, -i)
      const beta = 1 - betaPrime

      const betaSquare = beta ** 2
      const betaPrimeSquare = betaPrime ** 2

      result.push({
        exponent: -i,
        beta: {
          bit64: beta,
          bit32: Math.fround(beta),
          diff: beta - Math.fround(beta)
        },
        betaSquare: {
          bit64: betaSquare,
          bit32: Math.fround(betaSquare),
          diff: betaSquare - Math.fround(betaSquare)
        },
        betaPrime: {
          bit64: betaPrime,
          bit32: Math.fround(betaPrime),
          diff: betaPrime - Math.fround(betaPrime)
        },
        betaPrimeSquare: {
          bit64: betaPrimeSquare,
          bit32: Math.fround(betaPrimeSquare),
          diff: betaPrimeSquare - Math.fround(betaPrimeSquare)
        },
        gamma: {
          bit64: gammaFromBeta(beta),
          bit32: gammaFromBeta(beta, Math.fround),
          diff: gammaFromBeta(beta) - gammaFromBeta(beta, Math.fround)
        },
        gammaFromBetaSquare: {
          bit64: gammaFromBetaSquare(betaSquare),
          bit32: gammaFromBetaSquare(betaSquare, Math.fround),
          diff:
            gammaFromBetaSquare(betaSquare) -
            gammaFromBetaSquare(betaSquare, Math.fround)
        },
        gammaFromBetaPrime: {
          bit64: gammaFromBetaPrime(betaPrime),
          bit32: gammaFromBetaPrime(betaPrime, Math.fround),
          diff:
            gammaFromBetaPrime(betaPrime) -
            gammaFromBetaPrime(betaPrime, Math.fround)
        },
        gammaFromBetaPrimeSquare: {
          bit64: gammaFromBetaPrimeSquare(betaPrimeSquare),
          bit32: gammaFromBetaPrimeSquare(betaPrimeSquare, Math.fround),
          diff:
            gammaFromBetaPrimeSquare(betaPrimeSquare) -
            gammaFromBetaPrimeSquare(betaPrimeSquare, Math.fround)
        }
      })
    }
    // console.log(prettyjson.render(result))
  })

  it('beta 2', () => {
    const betaZ = 0.99999999
    const beta = [0, 0, betaZ]

    const betaSquared =
      beta[0] * beta[0] + beta[1] * beta[1] + beta[2] * beta[2]
    const betaSquaredRoot = Math.sqrt(betaSquared)
    // const gamma = 1 / Math.sqrt(1 - betaSquared)

    // const betaSquared__32 =
    //   Math.fround(beta[0] * beta[0]) +
    //   Math.fround(beta[1] * beta[1]) +
    //   Math.fround(beta[2] * beta[2])
    // const betaSquaredRoot__32_ = Math.fround(Math.sqrt(betaSquared__32))
    // const betaSquaredRoot__32 = Math.sqrt(betaSquared__32)
    // const gamma__32 = Math.fround(
    //   1 / Math.fround(Math.sqrt(Math.fround(1 - betaSquared__32)))
    // )

    expect(beta).toEqual([0, 0, betaZ])
    expect(betaSquaredRoot).toEqual(betaZ)
  })

  //  it("*Specrel.c", () => {
  //   const vz = .999999 * Specrel.c
  //   const v = [0, 0, vz];
  //
  //   const betaSquared = (v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) / Specrel.c / Specrel.c
  //   const betaSquaredRoot = Math.sqrt(betaSquared)
  //   const gamma = 1 / Math.sqrt(1 - betaSquared)
  //
  //   const betaSquared__32 = Math.fround(v[0] * v[0]) + Math.fround(v[1] * v[1]) + Math.fround(v[2] * v[2]) /
  // Specrel.c / Specrel.c const betaSquaredRoot__32_ = Math.fround(Math.sqrt(betaSquared__32)) const
  // betaSquaredRoot__32 = Math.sqrt(betaSquared__32) const gamma__32 = Math.fround(1 /
  // Math.fround(Math.sqrt(Math.fround(1 - betaSquared__32))))   console.log({ betaSquared, betaSquaredRoot, gamma,
  // gamma__32, diffgamma: gamma - gamma__32, betaSquared__32, betaSquaredRoot__32_, betaSquaredRoot__32, diff:
  // betaSquaredRoot - betaSquaredRoot__32 })  expect(v).toEqual([0, 0, vz]) expect(betaSquaredRoot).toEqual(vz)  //
  // expect(betaSquared__32).toEqual(betaZ) // expect(betaSquaredRoot__32).toEqual(betaZ)  })

  // it('include the important ones', () => {
  //   const dbetaz = 1 - 0.99999999
  //   const dbeta = [0, 0, dbetaz]
  //
  //   const betaSquared =
  //     dbeta[0] * dbeta[0] + dbeta[1] * dbeta[1] + dbeta[2] * dbeta[2]
  //   const betaSquaredRoot = Math.sqrt(betaSquared)
  //   const gamma = 1 / Math.sqrt(1 - betaSquared)
  //
  //   const betaSquared__32 =
  //     Math.fround(dbeta[0] * dbeta[0]) +
  //     Math.fround(dbeta[1] * dbeta[1]) +
  //     Math.fround(dbeta[2] * dbeta[2])
  //   const betaSquaredRoot__32_ = Math.fround(Math.sqrt(betaSquared__32))
  //   const betaSquaredRoot__32 = Math.sqrt(betaSquared__32)
  //   const gamma__32 = Math.fround(
  //     1 / Math.fround(Math.sqrt(Math.fround(1 - betaSquared__32)))
  //   )
  //
  //   expect(dbeta).toEqual([0, 0, dbetaz])
  //   expect(betaSquaredRoot).toEqual(dbetaz)
  // })
})

describe('Specrel constants', () => {
  it('speed of light with units', () => {
    expect(bigNumberMath.format(speedOfLight, { notation: 'fixed' })).toBe(
      '299792458 m / s'
    )
  })
  it('speed of light [m / s]', () => {
    expect(
      bigNumberMath.format(speedOfLight__ms_1, { notation: 'fixed' })
    ).toBe('299792458')
  })
  it('elementary charge with units', () => {
    expect(
      bigNumberMath.format(elementaryCharge, {
        notation: 'exponential'
      })
    ).toBe('1.602176634e-19 C')
  })
  it('lementary charge [units]', () => {
    expect(
      bigNumberMath.format(elementaryCharge__C, {
        notation: 'exponential'
      })
    ).toBe('1.602176634e-19')
  })
})

describe('Specrel bigmath units', () => {
  it('include unit c for becoming natural', () => {
    const electronMass = bigNumberMath
      .unit(
        bigNumberMath.bignumber(ParticleTypes.ELECTRON.mass__eVc_2),
        'eV / c^2'
      )
      .to('kg')
    expect(bigNumberMath.format(electronMass, { precision: 6 })).toEqual(
      '9.10938e-31 kg'
    )
  })

  it('include qe as elemnatry charge unit', () => {
    const electronCharge = bigNumberMath
      .unit(bigNumberMath.bignumber(ParticleTypes.ELECTRON.charge__qe), 'qe')
      .to('C')
    expect(bigNumberMath.format(electronCharge, { precision: 6 })).toEqual(
      '-1.60218e-19 C'
    )
  })

  it('include hbar as base unit', () => {
    const oneMeter = bigNumberMath
      .unit(bigNumberMath.bignumber(5.06773093605323e15), 'hbar c / GeV')
      .to('m')
    expect(bigNumberMath.format(oneMeter, { precision: 6 })).toEqual('1 m')
  })
})
