import {
  float64ToInt16,
  int16ToFloat64,
  float64ArrayToInt16Array
} from '../../../src/lib/utils/float64ToInt16'

const fixtures = [
  {
    float64: 0,
    int16: 0
  },
  {
    float64: 0.9,
    int16: 15155
  },
  {
    float64: 0.99,
    int16: 15340
  },
  {
    float64: 0.999,
    int16: 15358
  },
  {
    float64: 0.9999,
    int16: 15360
  },
  {
    float64: 0.99999,
    int16: 15360
  }
]

describe('float64ToInt16', () => {
  fixtures.forEach(({ float64, int16 }) => {
    it(`(float64) ${float64} => (int16) ${int16}`, () => {
      expect(float64ToInt16(float64)).toEqual(int16)
    })
  })
})

describe('int16ToFloat64', () => {
  fixtures.forEach(({ float64, int16 }) => {
    it(`(float64) ${float64} <== (int16) ${int16}`, () => {
      expect(int16ToFloat64(int16)).toEqual(float64)
    })
  })
})

describe('int16ToFloat64', () => {
  it('0 = 0', () => {
    expect(int16ToFloat64(0)).toEqual(0)
  })
  it('0.999999999999 = 0', () => {
    expect(int16ToFloat64(15360)).toEqual(0.999999999999)
  })
})

describe('float64ArrayToInt16Array', () => {
  it('0 = 0', () => {
    expect(float64ArrayToInt16Array([0])).toMatchObject({ '0': 0 })
  })
  it('0.999999999999 = 0', () => {
    expect(float64ArrayToInt16Array([0.999999999999])).toMatchObject({
      '0': 15360
    })
  })
})
