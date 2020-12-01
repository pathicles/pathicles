import { describe, expect, test } from '@jest/globals'

import { presets, config } from './index.js'

describe('presets', () => {
  test('count presets', () => {
    expect(Object.keys(presets)).toHaveLength(10)
  })
  test('count members', () => {
    expect(Object.keys(config())).toHaveLength(5)
  })

  test("config('does-not-exist')", () => {
    expect(config('does-not-exist').name).toEqual('default')
  })

  test("config('story-quadrupole')", () => {
    expect(config('story-quadrupole').name).toEqual('story-quadrupole')
  })
})
