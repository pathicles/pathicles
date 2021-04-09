import { describe, expect, test } from '@jest/globals'
import Ratio from './ratio'

describe('Ratio', () => {
  test('new', () => {
    expect(new Ratio(0, 1).toValue()).toEqual(0)
    expect(new Ratio(1, 1).toValue()).toEqual(1)
  })

  test('nthroot', () => {
    expect(Ratio.fromNumber(4).toValue()).toEqual(4)
    expect(Ratio.fromNumber(4).pow(Ratio.fromNumber(0.5)).toValue()).toEqual(2)
    // expect(Ratio.nthRoot(Ratio.fromNumber(4), Ratio.fromNumber(2))).toEqual(2)
  })
})

describe('gyroRadius', () => {
  test('new', () => {
    const gamma = new Ratio(11n, 1n)

    const velocity_squared = Ratio.c__ms_1
      .pow(Ratio.fromNumber(2))
      .times(
        Ratio.fromNumber(1).subtract(
          Ratio.fromNumber(1).divideBy(gamma.pow(Ratio.fromNumber(2)))
        )
      )

    const velocity = velocity_squared.pow(Ratio.fromNumber(0.5))

    // console.log(velocity.toFixed(4))

    const mass = Ratio.fromNumber(9.10938356e-31)
    const bField = new Ratio(1n, 100n)
    const charge = Ratio.fromNumber(1.60217662e-19)
    //
    // console.log(gamma.times(velocity).times(mass).toFixed(5))
    // console.log(charge.times(bField))
    console.log(
      gamma
        .times(velocity)
        .times(mass)
        .divideBy(charge.times(bField))
        .toFixed(5)
    )
  })
})
