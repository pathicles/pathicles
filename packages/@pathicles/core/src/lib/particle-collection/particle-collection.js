import { DISTRIBUTIONS } from '@pathicles/config'
import { boundedRandom } from '../utils/random'
import { particleByName } from '@pathicles/config'

const functionalize = (x) => (typeof x == 'function' ? x : () => x)

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
      return particleByName(d)
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
  return position.map((d, i) => boundedRandom() * jitter[i])
}

export function jitterDirection({
  direction = [0, 0, 1],
  directionJitter = [0, 0, 0]
}) {
  const jitteredDirection = [
    ...direction.map((d, i) => d + boundedRandom(0, 1) * directionJitter[i])
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
  const gammaFn = functionalize(gamma)
  const directionFn = functionalize(direction)
  const positionFn = functionalize(position)

  const particles = particleTypesFromDescriptor(particleType, particleCount)

  const localPositions = DISTRIBUTIONS[bunchShape]({
    n: particleCount,
    d: particleSeparation
  })

  const fourPositions = localPositions.map((localPosition, p) => {
    const jitter = jitterPosition({
      jitter: positionJitter
    })
    return [
      positionFn({ p })[0] + localPosition[0] + jitter[0],
      positionFn({ p })[1] + localPosition[1] + jitter[1],
      positionFn({ p })[2] + localPosition[2] + jitter[2],
      0
    ]
  })

  const fourVelocities = particles.map((particle, p) => {
    const beta = particle.mass__eVc_2 === 0 ? 1 : betaFromGamma(gammaFn({ p }))

    const direction = directionFn({ p, localPositions })

    const jitteredDirection = direction

    //   +
    //     jitterDirection({
    //   direction,
    //   directionJitter
    // }) //.map((d, i) => d * (Math.sign(localPositions[p][i]) || 1))

    return [
      beta * jitteredDirection[0],
      beta * jitteredDirection[1],
      beta * jitteredDirection[2],
      gamma
    ]
  })

  // const fourMomenta = particles
  //   .map((particle, p) => {
  //     return [
  //       (particle.mass__eVc_2 === 0 ? 1 : gamma) * fourVelocities[p][0],
  //       (particle.mass__eVc_2 === 0 ? 1 : gamma) * fourVelocities[p][1],
  //       (particle.mass__eVc_2 === 0 ? 1 : gamma) * fourVelocities[p][2],
  //       gamma
  //     ]
  //   })
  //   .reduce((acc, val) => acc.concat(val), [])

  return {
    fourPositions,
    fourVelocities,
    particleCount,
    particleTypes: particles.map((p) => p.id)
  }
}
