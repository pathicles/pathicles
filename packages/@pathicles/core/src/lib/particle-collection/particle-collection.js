import { DISTRIBUTIONS, particleByName, C } from '@pathicles/config'
import { boundedRandom } from '../utils/random'

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
  // TODO: restore
  // eslint-disable-next-line no-unused-vars
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
    const gamma = gammaFn({ p })

    const beta = particle.mass__eVc_2 === 0 ? 1 : betaFromGamma(gamma)

    const jitteredDirection = directionFn({ p, localPositions })

    return particle.mass__eVc_2 === 0
      ? [
          C * jitteredDirection[0],
          C * jitteredDirection[1],
          C * jitteredDirection[2],
          C
        ]
      : [
          gamma * beta * C * jitteredDirection[0],
          gamma * beta * C * jitteredDirection[1],
          gamma * beta * C * jitteredDirection[2],
          gamma * C
        ]
  })

  return {
    fourPositions,
    fourVelocities,
    particleCount,
    particleTypes: particles.map((p) => p.id)
  }
}
