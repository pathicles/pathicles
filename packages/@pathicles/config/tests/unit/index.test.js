import { config, presets } from '../../src'

describe('config size', () => {
  it('{}', () => {
    expect(Object.keys(presets)).toHaveLength(17)
  })

  it('config()', () => {
    expect(Object.keys(config())).toHaveLength(5)
  })
  it("config('does-not-exist')", () => {
    expect(Object.keys(config('story-quadrupole'))).toHaveLength(5)
  })

  it("config('story-quadrupole')", () => {
    expect(Object.keys(config('story-quadrupole'))).toHaveLength(5)
  })
})
