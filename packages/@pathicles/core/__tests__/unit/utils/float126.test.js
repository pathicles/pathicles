import { hfround } from '@petamoriken/float16'

const fixtures = [
  {
    float64: 0,
    float16: 0
  },
  {
    float64: 0.9,
    float16: 0.89990234375
  },
  {
    float64: 0.99,
    float16: 0.98974609375
  },
  {
    float64: 0.999,
    float16: 0.99853515625
  },
  {
    float64: 0.9999,
    float16: 0.99951171875
  },
  {
    float64: 0.99999,
    float16: 0.99951171875
  },
  {
    float64: 0.999999,
    float16: 0.99951171875
  }
]
describe('hfround', () => {
  fixtures.forEach(({ float64, float16 }) => {
    it(`hfround(${float64}) =>  ${float16}`, () => {
      expect(hfround(float64)).toEqual(float16)
    })
  })
})
