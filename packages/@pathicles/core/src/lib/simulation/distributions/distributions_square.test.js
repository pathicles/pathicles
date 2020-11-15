import { describe, expect, it } from '@jest/globals'

const squareDistribution = require('./distributions').squareDistribution

describe('squareDistribution 1', () => {
  it('{}', () => {
    const distribution = squareDistribution({})
    expect(distribution).toEqual([])
  })

  it('{n: 1}', () => {
    const distribution = squareDistribution({
      n: 1
    })
    expect(distribution).toEqual([0, 0, 0])
  })

  it('{n: 1, d: 1}', () => {
    const distribution = squareDistribution({
      n: 1,
      d: 1
    })
    expect(distribution).toEqual([0, 0, 0])
  })

  it('{n: 3, d: 1} x-y', () => {
    const distribution = squareDistribution({
      n: 3,
      d: 1
    })
    expect(distribution).toEqual([-0.5, -0.5, 0, 0.5, -0.5, 0, -0.5, 0.5, 0])
  })

  it('{n: 3, d: 0}', () => {
    const distribution = squareDistribution({
      n: 3,
      d: 0
    })
    expect(distribution).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0])
  })
})

describe('squareDistribution', () => {
  it('{}', () => {
    const distribution = squareDistribution({})
    expect(distribution).toEqual([])
  })

  it('{n: 1}', () => {
    const distribution = squareDistribution({
      n: 1
    })
    expect(distribution).toEqual([0, 0, 0])
  })

  it('{n: 1, d: 1} x-y', () => {
    const distribution = squareDistribution({
      n: 1,
      d: 1
    })
    expect(distribution).toEqual([0, 0, 0])
  })

  it('{n: 3, d: 1} x-z', () => {
    const distribution = squareDistribution({
      n: 3,
      d: 1,
      mixer: (a, b) => [a, 0, b]
    })
    expect(distribution).toEqual([-0.5, 0, -0.5, 0.5, 0, -0.5, -0.5, 0, 0.5])
  })

  it('{n: 3, d: 0}', () => {
    const distribution = squareDistribution({
      n: 3,
      d: 0
    })
    expect(distribution).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0])
  })
})
