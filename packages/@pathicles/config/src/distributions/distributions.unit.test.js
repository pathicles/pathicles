import { describe, expect, test } from '@jest/globals'

import { line, round, square } from './distributions.js'

describe('line (row)', () => {
  test('{}', () => {
    const distribution = line({})({})
    expect(distribution).toEqual([])
  })

  test('{n: 1}', () => {
    const distribution = line({})({
      n: 1
    })
    expect(distribution).toEqual([[0, 0, 0]])
  })

  test('{n: 1, d: 1}', () => {
    const distribution = line({})({
      n: 1,
      d: 1
    })
    expect(distribution).toEqual([[0, 0, 0]])
  })

  test('{n: 3, d: 1}', () => {
    const distribution = line({})({
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
    const distribution = line({})({
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
    const distribution = line({})({
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
    const distribution = line({ round: round(100) })({
      n: 5,
      d: 0.1
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
    const distribution = line({ swizzle })({})
    expect(distribution).toEqual([])
  })

  test('{n: 1}', () => {
    const distribution = line({ swizzle })({
      n: 1
    })
    expect(distribution).toEqual([[0, 0, 0]])
  })

  test('{n: 1, d: 1}', () => {
    const distribution = line({ swizzle })({
      n: 1,
      d: 1
    })
    expect(distribution).toEqual([[0, 0, 0]])
  })

  test('{n: 3, d: 1}', () => {
    const distribution = line({ swizzle })({
      n: 3,
      d: 1
    })
    expect(distribution).toEqual([
      [0, -1, 0],
      [0, 0, 0],
      [0, 1, 0]
    ])
  })

  test('{n: 3, d: 0}', () => {
    const distribution = line({ swizzle })({
      n: 3,
      d: 0
    })
    expect(distribution).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
  })
})

describe('square (xy)', () => {
  test('{}', () => {
    const distribution = square({})({})
    expect(distribution).toEqual([])
  })

  test('{n: 1}', () => {
    const distribution = square({})({
      n: 1
    })
    expect(distribution).toEqual([[0, 0, 0]])
  })

  test('{n: 1, d: 1}', () => {
    const distribution = square({})({
      n: 1,
      d: 1
    })
    expect(distribution).toEqual([[0, 0, 0]])
  })

  test('{n: 3, d: 1}', () => {
    const distribution = square({})({
      n: 3,
      d: 1
    })
    expect(distribution).toEqual([
      [-0.5, -0.5, 0],
      [0.5, -0.5, 0],
      [-0.5, 0.5, 0]
    ])
  })

  test('{n: 3, d: 0}', () => {
    const distribution = square({})({
      n: 3,
      d: 0
    })
    expect(distribution).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
  })

  test('{n: 11, d: .1}', () => {
    const distribution = square({})({
      n: 11,
      d: 0.1
    })
    expect(distribution).toEqual([
      [-0.15000000000000002, -0.1, 0],
      [-0.05000000000000002, -0.1, 0],
      [0.04999999999999999, -0.1, 0],
      [0.15000000000000002, -0.1, 0],
      [-0.15000000000000002, 0, 0],
      [-0.05000000000000002, 0, 0],
      [0.04999999999999999, 0, 0],
      [0.15000000000000002, 0, 0],
      [-0.15000000000000002, 0.1, 0],
      [-0.05000000000000002, 0.1, 0],
      [0.04999999999999999, 0.1, 0]
    ])
  })

  test('{n: 11, d: .1} rounded', () => {
    const distribution = square({ round: round(100) })({
      n: 11,
      d: 0.1
    })
    expect(distribution).toEqual([
      [-0.15, -0.1, 0],
      [-0.05, -0.1, 0],
      [0.05, -0.1, 0],
      [0.15, -0.1, 0],
      [-0.15, 0, 0],
      [-0.05, 0, 0],
      [0.05, 0, 0],
      [0.15, 0, 0],
      [-0.15, 0.1, 0],
      [-0.05, 0.1, 0],
      [0.05, 0.1, 0]
    ])
  })
})

describe('square (yz)', () => {
  const swizzle = (a, b) => [0, a, b]

  test('default', () => {
    const distribution = square({})({})
    expect(distribution).toEqual([])
  })

  test('{n: 1}', () => {
    const distribution = square({})({
      n: 1
    })
    expect(distribution).toEqual([[0, 0, 0]])
  })

  test('{n: 1, d: 1}', () => {
    const distribution = square({})({
      n: 1,
      d: 1
    })
    expect(distribution).toEqual([[0, 0, 0]])
  })

  test('{n: 3, d: 1}', () => {
    const distribution = square({ swizzle })({
      n: 3,
      d: 1
    })
    expect(distribution).toEqual([
      [0, -0.5, -0.5],
      [0, 0.5, -0.5],
      [0, -0.5, 0.5]
    ])
  })

  test('{n: 3, d: 0}', () => {
    const distribution = square({})({
      n: 3,
      d: 0
    })
    expect(distribution).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
  })

  test('{n: 11, d: .1}', () => {
    const distribution = square({ swizzle })({
      n: 11,
      d: 0.1
    })
    expect(distribution).toEqual([
      [0, -0.15000000000000002, -0.1],
      [0, -0.05000000000000002, -0.1],
      [0, 0.04999999999999999, -0.1],
      [0, 0.15000000000000002, -0.1],
      [0, -0.15000000000000002, 0],
      [0, -0.05000000000000002, 0],
      [0, 0.04999999999999999, 0],
      [0, 0.15000000000000002, 0],
      [0, -0.15000000000000002, 0.1],
      [0, -0.05000000000000002, 0.1],
      [0, 0.04999999999999999, 0.1]
    ])
  })

  test('{n: 11, d: .1} rounded', () => {
    const distribution = square({ swizzle, round: round(100) })({
      n: 11,
      d: 0.1
    })
    expect(distribution).toEqual([
      [0, -0.15, -0.1],
      [0, -0.05, -0.1],
      [0, 0.05, -0.1],
      [0, 0.15, -0.1],
      [0, -0.15, 0],
      [0, -0.05, 0],
      [0, 0.05, 0],
      [0, 0.15, 0],
      [0, -0.15, 0.1],
      [0, -0.05, 0.1],
      [0, 0.05, 0.1]
    ])
  })
})
