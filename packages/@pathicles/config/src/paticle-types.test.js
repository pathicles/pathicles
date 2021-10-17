import { describe, expect, it } from '@jest/globals'
import { PARTICLE_TYPES } from './particle-types.js'

describe('PARTICLE_TYPES', () => {
  it('count = 4', () => {
    // console.log({ PARTICLE_TYPES })
    expect(PARTICLE_TYPES).toHaveLength(4)
  })
})
