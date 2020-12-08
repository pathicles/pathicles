import { describe, expect, test } from '@jest/globals'
import Ratio from './ratio'

describe('Ratio', () => {
  test('new', () => {
    expect(new Ratio(0, 1).toValue()).toEqual(0)
    expect(new Ratio(1, 1).toValue()).toEqual(1)
  })
})
