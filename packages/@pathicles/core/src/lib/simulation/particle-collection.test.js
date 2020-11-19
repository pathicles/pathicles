'use strict'

import { describe, expect, it } from '@jest/globals'

import { PARTICLE_TYPE } from '@pathicles/config'

import {
  betaFromGamma,
  ParticleCollection,
  jitterPosition,
  particleTypesFromDescriptor
} from './particle-collection'

describe('jitterPosition', () => {
  it('"0,0,0"', () => {
    const jitteredPosition = jitterPosition({
      position: [0, 0, 0],
      jitter: [0, 0, 0]
    })
    expect(jitteredPosition).toEqual([0, 0, 0])
  })
})

describe('particleTypesArrayFromDescriptor', () => {
  it('"PROTON"', () => {
    const types = particleTypesFromDescriptor(PARTICLE_TYPE.PROTON)
    expect(types.map((t) => t.name)).toEqual([PARTICLE_TYPE.PROTON])
  })

  it('"PROTON, 3"', () => {
    const types = particleTypesFromDescriptor(PARTICLE_TYPE.PROTON, 3)
    expect(types.map((t) => t.name)).toEqual([
      PARTICLE_TYPE.PROTON,
      PARTICLE_TYPE.PROTON,
      PARTICLE_TYPE.PROTON
    ])
  })

  it('"PROTON ELECTRON PHOTON PROTON"', () => {
    const types = particleTypesFromDescriptor('PROTON ELECTRON PHOTON PROTON')
    expect(types.map((t) => t.name)).toEqual([
      PARTICLE_TYPE.PROTON,
      PARTICLE_TYPE.ELECTRON,
      PARTICLE_TYPE.PHOTON,
      PARTICLE_TYPE.PROTON
    ])
  })

  it('"PROTON ELECTRON PHOTON PROTON, 10"', () => {
    const types = particleTypesFromDescriptor(
      'PROTON ELECTRON PHOTON PROTON',
      10
    )
    expect(types.map((t) => t.name)).toEqual([
      PARTICLE_TYPE.PROTON,
      PARTICLE_TYPE.ELECTRON,
      PARTICLE_TYPE.PHOTON,
      PARTICLE_TYPE.PROTON,
      PARTICLE_TYPE.PROTON,
      PARTICLE_TYPE.ELECTRON,
      PARTICLE_TYPE.PHOTON,
      PARTICLE_TYPE.PROTON,
      PARTICLE_TYPE.PROTON,
      PARTICLE_TYPE.ELECTRON
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

describe('ParticleCollection()', () => {
  it('no argument args', () => {
    const particleCollection = ParticleCollection({})
    expect(particleCollection).toEqual({
      particleCount: 3,
      particleTypes: [0, 1, 3],
      fourPositions: [
        [-0.1, 0, 0, 0],
        [0, 0, 0, 0],
        [0.1, 0, 0, 0]
      ],
      fourVelocities: [
        [0, 0, 1, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1]
      ]
    })
  })

  it('PHELPRO row', () => {
    const particleCollection = ParticleCollection({
      particleCount: 3,
      particleType: 'PHOTON ELECTRON PROTON',
      bunchShape: 'ROW',
      particleSeparation: 0.1,
      gamma: 1,
      emitterDirection: [0, 0, 1],
      emitterDirectionJitter: [0, 0, 0]
    })
    expect(particleCollection).toEqual({
      particleTypes: [0, 1, 3],
      particleCount: 3,
      fourPositions: [
        [-0.1, 0, 0, 0],
        [0, 0, 0, 0],
        [0.1, 0, 0, 0]
      ],
      fourVelocities: [
        [0, 0, 1, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1]
      ]
    })
  })

  it('PHELPRO row with gamma 100', () => {
    const particleCollection = ParticleCollection({
      particleCount: 3,
      particleType: 'PHOTON ELECTRON PROTON',
      bunchShape: 'ROW',
      particleSeparation: 0.1,
      gamma: 100,
      emitterDirection: [0, 0, 1],
      emitterDirectionJitter: [0, 0, 0]
    })
    expect(particleCollection).toEqual({
      particleTypes: [0, 1, 3],
      particleCount: 3,
      fourPositions: [
        [-0.1, 0, 0, 0],
        [0, 0, 0, 0],
        [0.1, 0, 0, 0]
      ],
      fourVelocities: [
        [0, 0, 1, 100],
        [0, 0, 99.99499987499375, 100],
        [0, 0, 99.99499987499375, 100]
      ]
      // fourMomenta: []
    })
  })

  it('square of nine electrons at rest', () => {
    const particleCollection = ParticleCollection({
      particleCount: 9,
      particleType: PARTICLE_TYPE.ELECTRON,
      bunchShape: 'SQUARE_XY',
      particleSeparation: 1,
      gamma: 1,
      emitterDirection: [0, 0, 1],
      emitterDirectionJitter: [0, 0, 0]
    })
    expect(particleCollection).toEqual({
      particleTypes: Array(9).fill(1),
      particleCount: 9,
      fourPositions: [
        [-1, -1, 0, 0],
        [0, -1, 0, 0],
        [1, -1, 0, 0],
        [-1, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [-1, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 0, 0]
      ],
      fourVelocities: [
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1]
      ]
    })
  })
})
