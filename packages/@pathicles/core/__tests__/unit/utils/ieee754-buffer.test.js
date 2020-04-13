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
describe('IEEE754Buffer.pack', () => {
  const IEEE754Buffer = require('ieee754-buffer').IEEE754Buffer
  let packer = new IEEE754Buffer(8, 23)
  let buffer = new Int16Array(4)
  packer.pack(buffer, 3.141592741, 0)
  console.log(buffer)

  fixtures.forEach(({ float64, float16 }) => {
    it(`hfround(${float64}) =>  ${float16}`, () => {
      packer.pack(buffer, float64, 0)
      expect(buffer).toEqual(float16)
    })
  })
})
