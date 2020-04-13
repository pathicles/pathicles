import { create, all } from 'mathjs'

// create a mathjs instance with configuration
let bigNumberConfig = {
  number: 'BigNumber'
}
export const bigNumberMath = create(all, bigNumberConfig)

let numberConfig = {
  number: 'BigNumber'
}
export const numberMath = create(all, numberConfig)

bigNumberMath.createUnit({
  c: {
    definition: bigNumberMath.evaluate('speedOfLight')
  }
})

export const c = bigNumberMath.evaluate('speedOfLight').toNumber()

bigNumberMath.createUnit({
  hbar: {
    definition: bigNumberMath.evaluate('reducedPlanckConstant')
  }
})

bigNumberMath.createUnit({
  qe: {
    definition: bigNumberMath.evaluate('elementaryCharge')
  }
})

export function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ]
}

export function gammaFromVelocity__ms_1(velocity__ms_1, round = a => a) {
  const betaSquare = betaSquareFromVelocity__ms_1(velocity__ms_1, round)
  return round(1 / round(Math.sqrt(round(1 - round(betaSquare)))))
}

export function gammaFromVelocity__c(velocity__c, round = a => a) {
  const betaSquare = betaSquareFromVelocity__c(velocity__c, round)
  return round(1 / round(Math.sqrt(round(1 - round(betaSquare)))))
}

export function gammaFromBetaSquare(betaSquare, round = a => a) {
  return round(1 / round(Math.sqrt(round(1 - round(betaSquare)))))
}

export function gammaFromBeta(beta, round = a => a) {
  return round(1 / round(Math.sqrt(round(1 - round(beta) * round(beta)))))
}

export function gammaFromBetaPrime(betaPrime, round = a => a) {
  return round(
    1 / round(Math.sqrt(round(betaPrime) * round(2 - round(betaPrime))))
  )
}

export function gammaFromBetaPrimeSquare(betaPrimeSquare, round = a => a) {
  return round(
    1 /
      round(
        Math.sqrt(
          round(2 * round(Math.sqrt(betaPrimeSquare))) + round(betaPrimeSquare)
        )
      )
  )
}

export function betaSquareFromVelocity__ms_1(velocity__ms_1, round = a => a) {
  return (
    round(round(velocity__ms_1[0] / c) ** 2) +
    round(round(velocity__ms_1[1] / c) ** 2) +
    round(round(velocity__ms_1[2] / c) ** 2)
  )
}

export function betaSquareFromVelocity__c(velocity__c, round = a => a) {
  return velocity__c[0] ** 2 + velocity__c[1] ** 2 + velocity__c[2] ** 2
}

export function betaSquareFromVelocityPrime(
  velocityPrime__ms_1
  // round = a => a
) {
  return (
    3 -
    2 *
      (velocityPrime__ms_1[0] +
        velocityPrime__ms_1[1] +
        velocityPrime__ms_1[2]) +
    (velocityPrime__ms_1[0] ** 2 +
      velocityPrime__ms_1[1] ** 2 +
      velocityPrime__ms_1[2] ** 2)
  )
}

export const format6 = obj => {
  return bigNumberMath.format(obj, { precision: 6 })
}
export const format30 = obj => {
  return bigNumberMath.format(obj, { precision: 30, lowerExp: 0 })
}

export const speedOfLight = bigNumberMath.evaluate('speedOfLight')
// eslint-disable-next-line camelcase
export const speedOfLight__ms_1 = bigNumberMath
  .evaluate('speedOfLight')
  .toNumeric('m / s')
export const elementaryCharge = bigNumberMath.evaluate('elementaryCharge')
// eslint-disable-next-line camelcase
export const elementaryCharge__C = bigNumberMath
  .evaluate('elementaryCharge')
  .toNumeric('C')
