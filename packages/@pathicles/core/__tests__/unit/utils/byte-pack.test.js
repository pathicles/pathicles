import { pack, unpack } from 'byte-data'

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
  },
  {
    float64: 0.999999,
    int16: 15360
  },
  {
    float64: 0.9999999,
    int16: 15360
  },
  {
    float64: 0.99999999,
    int16: 15360
  }
]

const int16Type = { bits: 16, signed: false }
const float64Type = { bits: 64, fp: true }
const float32Type = { bits: 32, fp: true }

describe('IEEE754Buffer.pack', () => {
  fixtures.forEach(({ float64, int16 }) => {
    const packed = pack(float64, float32Type)

    // console.log(packed)
    it(`pack(${float64}) =>  ${packed}`, () => {
      // expect(packed).toEqual(int16)

      expect(unpack(packed, float32Type)).toEqual(float64)
    })
  })
})
