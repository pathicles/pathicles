'use strict'

import { describe, test, expect } from '@jest/globals'
import { convertToHalfFloat } from './to-half-float'

describe('convertToHalfFloat', () => {
  test.each([
    [0, 0],
    [0.1, 11878],
    [1, 15360]
  ])('.add(%i, %i)', (input, expected) => {
    expect(convertToHalfFloat([input])).toMatchObject({ 0: expected })
  })
})
