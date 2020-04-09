import {columnDistribution} from "./Distributions";

const arrayToNumbers = (arr) => {return arr.map(a => a.toNumber())}

test('row distribution ', () => {

  const distribution = columnDistribution({});

  expect(distribution).toEqual([]);

})

test('columnDistribution({n: 1})', () => {

  const distribution = columnDistribution({n: 1});

  expect(distribution.length).toEqual(1);
  expect(arrayToNumbers(distribution[0])).toEqual([0, 0, 0]);

})


test('columnDistribution({n: 1, d: 1})', () => {

  const distribution = columnDistribution({n: 1, d: 1});

  expect(distribution.length).toEqual(1);
  expect(arrayToNumbers(distribution[0])).toEqual([0, 0, 0]);

})


test('columnDistribution({n: 2, d: 1})', () => {

  const distribution = columnDistribution({n: 2, d: 1});

  expect(distribution.length).toEqual(2);
  expect(arrayToNumbers(distribution[0])).toEqual([0, -.5, 0]);
  expect(arrayToNumbers(distribution[1])).toEqual([0, .5, 0]);

})

test('columnDistribution({n: 3, d: 1})', () => {

  const distribution = columnDistribution({n: 3, d: 1});

  expect(distribution.length).toEqual(3);
  expect(arrayToNumbers(distribution[0])).toEqual([0, -1, 0]);
  expect(arrayToNumbers(distribution[1])).toEqual([0, 0, 0]);
  expect(arrayToNumbers(distribution[2])).toEqual([0, 1, 0]);

})

test('columnDistribution({n: 4, d: 1})', () => {

  const distribution = columnDistribution({n: 4, d: 1});

  expect(distribution.length).toEqual(4);
  expect(arrayToNumbers(distribution[0])).toEqual([0, -1.5, 0]);
  expect(arrayToNumbers(distribution[1])).toEqual([0, -.5, 0]);
  expect(arrayToNumbers(distribution[2])).toEqual([0, .5, 0]);
  expect(arrayToNumbers(distribution[3])).toEqual([0, 1.5, 0]);

})
