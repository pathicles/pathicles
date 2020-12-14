import { describe, expect, test } from '@jest/globals'
import Ratio from './ratio'

import { ELECTRON } from '@pathicles/config'

describe('Ratio', () => {
  test('new', () => {
    expect(new Ratio(0, 1).toValue()).toEqual(0)
    expect(new Ratio(1, 1).toValue()).toEqual(1)
  })
})

describe('gyroRadius', () => {
  test('new', () => {
    const gamma = new Ratio(10n, 1n)
    const velocity = new Ratio(9n, 10n)
    const mass = Ratio.fromNumber(ELECTRON.mass__eVc_2 / 1e9)
    const bField = new Ratio(2n, 1n)
    const charge = Ratio.fromNumber(ELECTRON.charge__qe)

    console.log(gamma.times(velocity).times(mass))
    console.log(charge.times(bField))
    console.log(
      gamma.times(velocity).times(mass).divideBy(charge.times(bField)).toValue()
    )
  })
})
