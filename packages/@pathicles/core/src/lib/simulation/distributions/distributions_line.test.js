import { describe, expect, test } from '@jest/globals'

import { line, round } from './distributions.js'

describe('line (row)', () => {
  test('{}', () => {
    const distribution = line({})
    expect(distribution).toEqual([])
  })

  test('{n: 1}', () => {
    const distribution = line({
      n: 1
    })
    expect(distribution).toEqual([[0, 0, 0]])
  })

  test('{n: 1, d: 1}', () => {
    const distribution = line({
      n: 1,
      d: 1
    })
    expect(distribution).toEqual([[0, 0, 0]])
  })

  test('{n: 3, d: 1}', () => {
    const distribution = line({
      n: 3,
      d: 1
    })
    expect(distribution).toEqual([
      [-1, 0, 0],
      [0, 0, 0],
      [1, 0, 0]
    ])
  })

  test('{n: 3, d: 0}', () => {
    const distribution = line({
      n: 3,
      d: 0
    })
    expect(distribution).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
  })

  test('{n: 5, d: .1}', () => {
    const distribution = line({
      n: 5,
      d: 0.1
    })
    expect(distribution).toEqual([
      [-0.2, 0, 0],
      [-0.1, 0, 0],
      [0, 0, 0],
      [0.10000000000000003, 0, 0],
      [0.2, 0, 0]
    ])
  })

  test('{n: 5, d: .1} rounded', () => {
    const distribution = line({
      n: 5,
      d: 0.1,
      round: round(100)
    })
    expect(distribution).toEqual([
      [-0.2, 0, 0],
      [-0.1, 0, 0],
      [0, 0, 0],
      [0.1, 0, 0],
      [0.2, 0, 0]
    ])
  })
})

describe('line (column)', () => {
  const swizzle = (y) => [0, y, 0]
  test('{}', () => {
    const distribution = line({ swizzle })
    expect(distribution).toEqual([])
  })

  test('{n: 1}', () => {
    const distribution = line({
      n: 1,
      swizzle
    })
    expect(distribution).toEqual([[0, 0, 0]])
  })

  test('{n: 1, d: 1}', () => {
    const distribution = line({
      n: 1,
      d: 1,
      swizzle
    })
    expect(distribution).toEqual([[0, 0, 0]])
  })

  test('{n: 3, d: 1}', () => {
    const distribution = line({
      n: 3,
      d: 1,
      swizzle
    })
    expect(distribution).toEqual([
      [0, -1, 0],
      [0, 0, 0],
      [0, 1, 0]
    ])
  })

  test('{n: 3, d: 0}', () => {
    const distribution = line({
      n: 3,
      d: 0,
      swizzle
    })
    expect(distribution).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
  })
})
