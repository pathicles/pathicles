import { distribution } from './distributions/distributions.js'
import { boundedRandom } from '../utils/random'
import ParticleTypes from './particle-types'

function normalize(a) {
  let x = a[0]
  let y = a[1]
  let z = a[2]
  let len = x * x + y * y + z * z
  if (len > 0) {
    len = 1 / Math.sqrt(len)
  }
  return [a[0] * len, a[1] * len, a[2] * len]
}

export function particleTypesFromDescriptor(particleTypeDescriptor, n = 0) {
  const particleTypesArray = particleTypeDescriptor
    .trim()
    .split(/\s+/)
    .map((d) => {
      return ParticleTypes.byName(d)
    })

  if (n === 0) {
    return particleTypesArray
  }

  return Array(n)
    .fill(0)
    .map((x, p) => {
      return particleTypesArray[p % particleTypesArray.length]
    })
}

export function jitterPosition({ position = [0, 0, 0], jitter = [0, 0, 0] }) {
  return position.map(
    (d, i) => d + Math.floor(boundedRandom() * jitter[i] * 100) / 100
  )
}

export function jitterDirection({
  direction = [0, 0, 1],
  directionJitter = [0, 0, 0],
  localPosition = [0, 0, 0]
}) {
  const jitteredDirection = [
    ...direction.map(
      (d, i) =>
        d +
        Math.floor(
          boundedRandom(0, 1) * directionJitter[i] * localPosition[i] * 100
        ) /
          100
    )
  ]

  return normalize(jitteredDirection)
}

export function betaFromGamma(gamma = 0) {
  if (gamma === 0) return NaN
  return Math.sqrt(1 - 1 / Math.pow(gamma, 2))
}

export function ParticleCollection({
  particleCount = 3,
  particleType = 'PHOTON ELECTRON PROTON',
  bunchShape = 'ROW',
  particleSeparation = 0.1,
  gamma = 1,
  position = [0, 0, 0],
  direction = [0, 0, 1],
  positionJitter = [0, 0, 0],
  directionJitter = [0, 0, 0]
}) {
  // create particle collection
  const particles = particleTypesFromDescriptor(particleType, particleCount)

  const localPositions = distribution({
    shape: bunchShape,
    count: particleCount,
    separation: particleSeparation
  })

  const fourPositions = particles
    .map((particle, p) => {
      const jitteredPosition = jitterPosition({
        position: position,
        jitter: positionJitter
      })
      return [
        localPositions[p * 3] + jitteredPosition[0],
        localPositions[p * 3 + 1] + jitteredPosition[1],
        localPositions[p * 3 + 2] + jitteredPosition[2],
        0
      ]
    })
    .reduce((acc, val) => acc.concat(val), [])

  const fourVelocities = particles.map((particle, p) => {
    const beta = particle.mass__eVc_2 === 0 ? 1 : betaFromGamma(gamma)
    const myDirection = jitterDirection({
      direction,
      directionJitter,
      localPosition: [
        localPositions[p * 3],
        localPositions[p * 3 + 1],
        localPositions[p * 3 + 2]
      ]
    })
    return [
      beta * myDirection[0],
      beta * myDirection[1],
      beta * myDirection[2],
      gamma
    ]
  })
  //  .reduce((acc, val) => acc.concat(val), [])

  const fourMomenta = particles
    .map((particle, p) => {
      return [
        (particle.mass__eVc_2 === 0 ? 1 : gamma) * fourVelocities[p][0],
        (particle.mass__eVc_2 === 0 ? 1 : gamma) * fourVelocities[p][1],
        (particle.mass__eVc_2 === 0 ? 1 : gamma) * fourVelocities[p][2],
        gamma
      ]
    })
    .reduce((acc, val) => acc.concat(val), [])

  return {
    fourPositions,
    fourVelocities: fourMomenta.reduce((acc, val) => acc.concat(val), []),
    particleCount,
    // particles,
    particleTypes: particles.map((p) => p.id)
    // particleChargesMassesChargeMassRatios: particles.map(
    //   ({ charge__qe, mass__eVc_2, chargeMassRatio__Ckg_1 }) => [
    //     charge__qe,
    //     mass__eVc_2,
    //     chargeMassRatio__Ckg_1,
    //     0
    //   ]
    // )
  }
}
