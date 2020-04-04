/* eslint-env jest */
const squareDistributionXY = require('./distributions').squareDistributionXY
const squareDistributionXZ = require('./distributions').squareDistributionXZ

describe('squareDistributionXY', () => {
  it('{}', () => {
    const distribution = squareDistributionXY({})
    expect(distribution).toEqual([])
  })

  it('{n: 1}', () => {
    const distribution = squareDistributionXY({
      n: 1
    })
    expect(distribution).toEqual([0, 0, 0])
  })

  it('{n: 1, d: 1}', () => {
    const distribution = squareDistributionXY({
      n: 1,
      d: 1
    })
    expect(distribution).toEqual([0, 0, 0])
  })

  it('{n: 3, d: 1}', () => {
    const distribution = squareDistributionXY({
      n: 3,
      d: 1
    })
    expect(distribution).toEqual([-0.5, -0.5, 0, 0.5, -0.5, 0, -0.5, 0.5, 0])
  })

  it('{n: 3, d: 0}', () => {
    const distribution = squareDistributionXY({
      n: 3,
      d: 0
    })
    expect(distribution).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0])
  })
})

describe('squareDistributionXZ', () => {
  it('{}', () => {
    const distribution = squareDistributionXY({})
    expect(distribution).toEqual([])
  })

  it('{n: 1}', () => {
    const distribution = squareDistributionXZ({
      n: 1
    })
    expect(distribution).toEqual([0, 0, 0])
  })

  it('{n: 1, d: 1}', () => {
    const distribution = squareDistributionXZ({
      n: 1,
      d: 1
    })
    expect(distribution).toEqual([0, 0, 0])
  })

  it('{n: 3, d: 1}', () => {
    const distribution = squareDistributionXZ({
      n: 3,
      d: 1
    })
    expect(distribution).toEqual([-0.5, 0, -0.5, 0.5, 0, -0.5, -0.5, 0, 0.5])
  })

  it('{n: 3, d: 0}', () => {
    const distribution = squareDistributionXZ({
      n: 3,
      d: 0
    })
    expect(distribution).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0])
  })
})
