import ParticleCollection from './ParticleCollection'
import ParticleTypes from './ParticleTypes'
import { max, min } from 'd3-array'
import { bigNumberMath } from './'

const arrayToNumbers = (arr) => {
  return arr.map((a) => a.toNumber())
}

test('ParticleCollection default constructor ', () => {
  const pCollection = new ParticleCollection()
  expect(pCollection.particles).toHaveLength(0)
})

test('ParticleCollection.create({particleCount: 1})', () => {
  const pCollection = ParticleCollection.create({ particleCount: 1 })
  expect(pCollection.particles).toHaveLength(1)
  expect(pCollection.particles[0].mass.to('kg').toString()).toEqual('0 kg')
  expect(pCollection.particles[0].charge.to('C').toString()).toEqual('0 C')
})

test('new ParticleCollection({count: 2, particleTypeDistribution: [ParticleTypes.ELECTRON]})', () => {
  const pCollection = ParticleCollection.create({
    particleCount: 2,
    particleTypeDistribution: [ParticleTypes.ELECTRON]
  })

  expect(pCollection._particles).toHaveLength(2)

  expect(pCollection._particles.map((p) => p.particleType)).toEqual([
    ParticleTypes.ELECTRON,
    ParticleTypes.ELECTRON
  ])
})

test('new ParticleCollection({particleCount: 3, particleTypeDistribution: "PROTON"})', () => {
  const pCollection = ParticleCollection.create({
    particleCount: 3,
    particleTypeDistribution: [ParticleTypes.PROTON]
  })

  expect(pCollection._particles).toHaveLength(3)

  expect(pCollection._particles.map((p) => p.particleType)).toEqual([
    ParticleTypes.PROTON,
    ParticleTypes.PROTON,
    ParticleTypes.PROTON
  ])
})

test('new ParticleCollection({particleCount: 7, particleTypeDistribution: "multiple"})', () => {
  const pCollection = ParticleCollection.create({
    particleCount: 7,
    particleTypeDistribution: [
      ParticleTypes.PROTON,
      ParticleTypes.PHOTON,
      ParticleTypes.ELECTRON,
      ParticleTypes.ELECTRON
    ]
  })

  expect(pCollection._particles).toHaveLength(7)

  expect(pCollection._particles.map((p) => p.particleType)).toEqual([
    ParticleTypes.PROTON,
    ParticleTypes.PHOTON,
    ParticleTypes.ELECTRON,
    ParticleTypes.ELECTRON,
    ParticleTypes.PROTON,
    ParticleTypes.PHOTON,
    ParticleTypes.ELECTRON
  ])

  const pCollectionClone = pCollection.clone()
  expect(pCollectionClone._particles).toHaveLength(7)

  expect(pCollectionClone._particles.map((p) => p.particleType)).toEqual([
    ParticleTypes.PROTON,
    ParticleTypes.PHOTON,
    ParticleTypes.ELECTRON,
    ParticleTypes.ELECTRON,
    ParticleTypes.PROTON,
    ParticleTypes.PHOTON,
    ParticleTypes.ELECTRON
  ])
})

test('new ParticleCollection({particleCount: 5, particleTypeDistribution: "multiple"})', () => {
  const pCollection = ParticleCollection.create({
    particleCount: 5,
    particleTypeDistribution: [
      ParticleTypes.PROTON,
      ParticleTypes.PHOTON,
      ParticleTypes.ELECTRON,
      ParticleTypes.ELECTRON
    ]
  })

  expect(pCollection._particles).toHaveLength(5)

  expect(pCollection._particles.map((p) => p.particleType)).toEqual([
    ParticleTypes.PROTON,
    ParticleTypes.PHOTON,
    ParticleTypes.ELECTRON,
    ParticleTypes.ELECTRON,
    ParticleTypes.PROTON
  ])

  pCollection.distributeLocation({ bunchShape: 'ROW', dx: 0.1 })
  expect(pCollection.particles.map((p) => arrayToNumbers(p.position))).toEqual([
    [-0.2, 0, 0],
    [-0.1, 0, 0],
    [0, 0, 0],
    [0.1, 0, 0],
    [0.2, 0, 0]
  ])
})

describe('new ParticleCollection({particleCount: 251, particleTypeDistribution: "multiple"}) square distribution', () => {
  const pCollection = ParticleCollection.create({
    particleCount: 251,
    particleTypeDistribution: [ParticleTypes.PROTON]
  })
  pCollection.distributeLocation({ bunchShape: 'SQUARE', dx: 1 })
  pCollection.setMomentaFromGamma({ gamma: 10, direction: [0, 0, 1] })

  it('has correct number of particles', () => {
    expect(pCollection._particles).toHaveLength(251)
  })

  it('has correctly distributed particle positions', () => {
    // x fromm -7.5 to 7.5
    const positions = pCollection.particles.map((p) => p.position)
    const positionSet = new Set(positions)

    // 251 distinct values
    expect(positions).toHaveLength(positionSet.size)
    expect(min(positions.map((r) => r[0].toNumber()))).toEqual(-7.5)
    expect(max(positions.map((r) => r[1].toNumber()))).toEqual(7.5)
  })

  it('has correctly distributed particle momenta', () => {
    const momenta = pCollection.particles.map((p) => [
      p.momentum[0].toNumber(),
      p.momentum[1].toNumber(),
      p.momentum[2].toNumber()
    ])
    // map to string for equality predicate in Set constructor
    const momentaSet = new Set(
      momenta.map((p) => p[0] + '_' + p[1] + '_' + p[2])
    )
    expect(momentaSet.size).toEqual(1)

    //const asArray = pCollection.asArrays()
  })

  pCollection.setMomentaFromKineticEnergy({
    kineticEnergy__eV: 1000,
    direction: [1, 0, 0]
  })

  it('has correctly distributed particle momenta', () => {
    const momenta = pCollection.particles.map((p) => [
      p.momentum[0].toNumber(),
      p.momentum[1].toNumber(),
      p.momentum[2].toNumber()
    ])
    // map to string for equality predicate in Set constructor
    const momentaSet = new Set(
      momenta.map((p) => p[0] + '_' + p[1] + '_' + p[2])
    )
    expect(momentaSet.size).toEqual(1)

    //const asArray = pCollection.asArrays()
  })

  // console.log(asArray)
})

describe('ParticleCollection.clone', () => {
  const pCollection = ParticleCollection.create({
    particleCount: 3,
    particleTypeDistribution: [ParticleTypes.ELECTRON]
  })

  it('creates new particles', () => {
    const pCollectionClone = pCollection.clone()

    pCollection.particles[0].position = bigNumberMath.eval('[10, 10, 10]')
    expect(pCollection.particles[0].position[0].toNumber()).toBe(10)
    expect(pCollectionClone.particles[0].position[0].toNumber()).toBe(0)
  })
})
