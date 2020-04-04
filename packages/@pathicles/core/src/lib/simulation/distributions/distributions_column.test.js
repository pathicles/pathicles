/* eslint-env jest */
'use strict'

const columnDistribution = require('./distributions').columnDistribution

describe('columnDistribution', () => {
  it('{}', () => {
    const distribution = columnDistribution({})
    expect(distribution).toEqual([])
  })

  it('{n: 1}', () => {
    const distribution = columnDistribution({
      n: 1
    })
    expect(distribution).toEqual([0, 0, 0])
  })

  it('{n: 1, d: 1}', () => {
    const distribution = columnDistribution({
      n: 1,
      d: 1
    })
    expect(distribution).toEqual([0, 0, 0])
  })

  it('{n: 3, d: 1}', () => {
    const distribution = columnDistribution({
      n: 3,
      d: 1
    })
    expect(distribution).toEqual([0, -1, 0, 0, 0, 0, 0, 1, 0])
  })

  it('{n: 3, d: 0}', () => {
    const distribution = columnDistribution({
      n: 3,
      d: 0
    })
    expect(distribution).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0])
  })
})
