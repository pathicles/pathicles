import {squareDistribution} from "./Distributions"

const arrayToNumbers = (arr) => {return arr.map(a => a.toNumber())}


test('square distribution ', () => {

  const distribution = squareDistribution({})
  expect(distribution).toEqual([])

})


test('squareDistribution({n: 1})', () => {

  const distribution = squareDistribution({n: 1})

  expect(distribution.length).toEqual(1)
  expect(arrayToNumbers(distribution[0])).toEqual([0, 0, 0])

})


test('squareDistribution({n: 1, d: 1})', () => {

  const distribution = squareDistribution({n: 1, d: 1})

  expect(distribution.length).toEqual(1)
  expect(arrayToNumbers(distribution[0])).toEqual([0, 0, 0])

})


test('squareDistribution({n: 2, d: 1})', () => {

  const distribution = squareDistribution({n: 2, d: 1})
  expect(distribution.length).toEqual(2)
  expect(arrayToNumbers(distribution[0])).toEqual([-.5, 0, 0])
  expect(arrayToNumbers(distribution[1])).toEqual([.5, 0, 0])

})

test('squareDistribution({n: 3, d: 1})', () => {

  const distribution = squareDistribution({n: 3, d: 1})
  expect(distribution.length).toEqual(3)
  expect(arrayToNumbers(distribution[0])).toEqual([-.5, -.5, 0])
  expect(arrayToNumbers(distribution[1])).toEqual([.5, -.5, 0])
  expect(arrayToNumbers(distribution[2])).toEqual([-.5, .5, 0])
})

test('squareDistribution({n: 4, d: 1})', () => {

  const distribution = squareDistribution({n: 4, d: 1})
  expect(distribution.length).toEqual(4)
  expect(arrayToNumbers(distribution[0])).toEqual([-.5, -.5, 0])
  expect(arrayToNumbers(distribution[1])).toEqual([.5, -.5, 0])
  expect(arrayToNumbers(distribution[2])).toEqual([-.5, .5, 0])
  expect(arrayToNumbers(distribution[3])).toEqual([.5, .5, 0])

})


test('squareDistribution({n: 4, d: 2})', () => {

  const distribution = squareDistribution({n: 4, d: 2})
  expect(distribution.length).toEqual(4)
  expect(arrayToNumbers(distribution[0])).toEqual([-1, -1, 0])
  expect(arrayToNumbers(distribution[1])).toEqual([1, -1, 0])
  expect(arrayToNumbers(distribution[2])).toEqual([-1, 1, 0])
  expect(arrayToNumbers(distribution[3])).toEqual([1, 1, 0])

})
