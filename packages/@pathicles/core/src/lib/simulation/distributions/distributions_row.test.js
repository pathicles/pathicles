import { describe, expect, it } from '@jest/globals'

const rowDistribution = require('./distributions').rowDistribution

describe('rowDistribution', () => {
  it('{}', () => {
    const distribution = rowDistribution({})
    expect(distribution).toEqual([])
  })

  it('{n: 1}', () => {
    const distribution = rowDistribution({
      n: 1
    })
    expect(distribution).toEqual([0, 0, 0])
  })

  it('{n: 1, d: 1}', () => {
    const distribution = rowDistribution({
      n: 1,
      d: 1
    })
    expect(distribution).toEqual([0, 0, 0])
  })

  it('{n: 3, d: 1}', () => {
    const distribution = rowDistribution({
      n: 3,
      d: 1
    })
    expect(distribution).toEqual([-1, 0, 0, 0, 0, 0, 1, 0, 0])
  })

  it('{n: 3, d: 0}', () => {
    const distribution = rowDistribution({
      n: 3,
      d: 0
    })
    expect(distribution).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0])
  })
})
