import { ParticleSystem } from './ParticleSystem'
import ParticleCollection from './ParticleCollection'
import ParticleTypes from './ParticleTypes'
import { format6 } from './'

import { presets } from '@pathicles/config'

describe('System ', function () {
  it('has a constructor with a mandatory argument', () => {
    let constructor = () => {
      new ParticleSystem()
    }
    expect(constructor).toThrow(
      'The constructor of class System has a mandatory argument'
    )
  })
})

describe('System of 10 photons ', function () {
  const particleCount = 10

  const pCollection = ParticleCollection.create({
    particleCount: particleCount,
    particleTypeDistribution: [ParticleTypes.PHOTON]
  })

  const pSystem = new ParticleSystem(pCollection)

  it('has correct initial state', () => {
    expect(pSystem.particleCollection.particles).toHaveLength(particleCount)
    expect(pSystem._fields).toEqual([])

    expect(format6(pSystem.particles[0].position)).toEqual('[0 m, 0 m, 0 m]')
  })
})

describe('System.load', function () {
  it('has correct initial state', () => {})
})

describe('System.load(gyrotest--1-electrons', function () {
  const configuration = presets['gyrotest_1_electron']
  const system = ParticleSystem.load(configuration)

  it('has correct particle count', () => {
    expect(system.particleCollection.particles).toHaveLength(
      configuration.particleCount
    )
  })
})
