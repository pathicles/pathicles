/* eslint-env jest */
'use strict'

const {
  particleTypesArrayFromDescriptor,
  betaFromGamma,
  createParticleCollection
} = require('./variables')

describe('particleTypesArrayFromDescriptor', () => {
  it('"PROTON"', () => {
    const types = particleTypesArrayFromDescriptor('PROTON')
    expect(types.map(t => t.name)).toEqual(['PROTON'])
  })

  it('"PROTON, 3"', () => {
    const types = particleTypesArrayFromDescriptor('PROTON', 3)
    expect(types.map(t => t.name)).toEqual(['PROTON', 'PROTON', 'PROTON'])
  })

  it('"PROTON ELECTRON PHOTON PROTON"', () => {
    const types = particleTypesArrayFromDescriptor(
      'PROTON ELECTRON PHOTON PROTON'
    )
    expect(types.map(t => t.name)).toEqual([
      'PROTON',
      'ELECTRON',
      'PHOTON',
      'PROTON'
    ])
  })

  it('"PROTON ELECTRON PHOTON PROTON, 10"', () => {
    const types = particleTypesArrayFromDescriptor(
      'PROTON ELECTRON PHOTON PROTON',
      10
    )
    expect(types.map(t => t.name)).toEqual([
      'PROTON',
      'ELECTRON',
      'PHOTON',
      'PROTON',
      'PROTON',
      'ELECTRON',
      'PHOTON',
      'PROTON',
      'PROTON',
      'ELECTRON'
    ])
  })
})

// describe('jitterDirection', () => {
//   it('empty args', () => {
//     expect(jitterDirection({})).toEqual([0, 0, 1])
//   })
//   it('[1,1,1], [0,0,0]', () => {
//     expect(jitterDirection({ direction: [1, 1, 1] })).toEqual([
//       0.5773502691896258,
//       0.5773502691896258,
//       0.5773502691896258
//     ])
//   })
//   it('[1,1,1], [.1,0,0]', () => {
//     const jittered = jitterDirection({
//       direction: [1, 1, 1],
//       jitter: [0.1, 0, 0]
//     })
//     expect(jittered[0] === jittered[1]).toBeFalsy()
//     expect(jittered[1] === jittered[2]).toBeTruthy()
//   })
//   it('[1,1,1], [.1,.1,.1]', () => {
//     const jittered = jitterDirection({
//       direction: [1, 1, 1],
//       jitter: [0.1, 0.1, 0.1]
//     })
//     expect(jittered[0]).not.toEqual(1)
//     expect(jittered[1]).not.toEqual(1)
//     expect(jittered[2]).not.toEqual(1)
//   })
// })

describe('betaFromGamma(gamma)', () => {
  it('no argument args', () => {
    expect(betaFromGamma()).toEqual(NaN)
  })

  it('gamma = 0', () => {
    expect(betaFromGamma(0)).toEqual(NaN)
  })

  it('gamma = 1', () => {
    expect(betaFromGamma(1)).toEqual(0)
  })

  it('gamma = 2', () => {
    expect(betaFromGamma(2).toFixed(6)).toEqual('0.866025')
  })
  it('gamma = 100', () => {
    expect(betaFromGamma(100).toFixed(6)).toEqual('0.999950')
  })
})

describe('createParticleCollection()', () => {
  it('no argument args', () => {
    const particleCollection = createParticleCollection({})
    expect(particleCollection).toEqual({
      particleTypes: [0, 1, 3],
      fourPositions: [-0.1, 0, 0, 0, 0, 0, 0, 0, 0.1, 0, 0, 0],
      fourVelocities: [0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1]
    })
  })

  it('electric', () => {
    const particleCollection = createParticleCollection({
      particleCount: 3,
      particleTypeDescriptor: 'PHOTON ELECTRON PROTON',
      bunchShape: 'ROW',
      particleSeparation: 0.1,
      gamma: 1,
      emitterDirection: [0, 0, 1],
      emitterDirectionJitter: [0, 0, 0]
    })
    expect(particleCollection).toEqual({
      particleTypes: [0, 1, 3],
      fourPositions: [-0.1, 0, 0, 0, 0, 0, 0, 0, 0.1, 0, 0, 0],
      fourVelocities: [0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1]
    })
  })

  it('electric with gamma 100', () => {
    const particleCollection = createParticleCollection({
      particleCount: 3,
      particleTypeDescriptor: 'PHOTON ELECTRON PROTON',
      bunchShape: 'ROW',
      particleSeparation: 0.1,
      gamma: 100,
      emitterDirection: [0, 0, 1],
      emitterDirectionJitter: [0, 0, 0]
    })
    expect(particleCollection).toEqual({
      particleTypes: [0, 1, 3],
      fourPositions: [-0.1, 0, 0, 0, 0, 0, 0, 0, 0.1, 0, 0, 0],
      fourVelocities: [
        0,
        0,
        1,
        100,
        0,
        0,
        0.9999499987499375,
        100,
        0,
        0,
        0.9999499987499375,
        100
      ]
    })
  })

  it('square of nine electrons in rest', () => {
    const particleCollection = createParticleCollection({
      particleCount: 9,
      particleTypeDescriptor: 'ELECTRON',
      bunchShape: 'SQUARE',
      particleSeparation: 1,
      gamma: 1,
      emitterDirection: [0, 0, 1],
      emitterDirectionJitter: [0, 0, 0]
    })
    expect(particleCollection).toEqual({
      particleTypes: Array(9).fill(1),
      fourPositions: [
        -1,
        -1,
        0,
        0,
        //
        0,
        -1,
        0,
        0, //
        1,
        -1,
        0,
        0, //
        -1,
        0,
        0,
        0, //
        0,
        0,
        0,
        0, //
        1,
        0,
        0,
        0, //
        -1,
        1,
        0,
        0, //
        0,
        1,
        0,
        0, //
        1,
        1,
        0,
        0 //
      ],
      fourVelocities: [
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        1
      ]
    })
  })
})
