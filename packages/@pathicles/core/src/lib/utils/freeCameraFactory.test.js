'use strict'

import { beforeAll, describe, expect, test } from '@jest/globals'
import freeCameraFactory from './freeCameraFactory.mjs'
import createREGL from 'regl'

let glContext

beforeAll(() => {
  const width = 64
  const height = 64
  glContext = require('gl')(width, height, { preserveDrawingBuffer: true })
})

function regl() {
  return createREGL(glContext)
}

describe('params from eye & center', () => {
  test.each([
    [
      { eye: [0, 0, 1], center: [0, 0, 0] },
      { phi: 0, theta: 0, distance: 1 }
    ],
    [
      { eye: [0, 1, 0], center: [0, 0, 0] },
      { phi: Math.PI / 2, theta: 0, distance: 1 }
    ],
    [
      { eye: [1, 0, 0], center: [0, 0, 0] },
      { phi: Math.PI, theta: 0, distance: 1 }
    ]
  ])('(%o, %o)', (input, expected) => {
    const [camera] = freeCameraFactory(regl(), {
      eye: input.eye,
      center: input.center
    })

    expect(camera.params.distance).toEqual(expected.distance)
    expect(camera.params.theta).toEqual(expected.theta)
    expect(camera.params.phi).toEqual(expected.phi)
  })
})
