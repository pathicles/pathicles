import { random } from '../utils/random'

const channelsPerBuffer = 4

export default function (
  bufferLength,
  {
    randomize,
    bunchShape,
    particleCount,
    particleType,
    particleSeparation,
    direction,
    position,
    directionJitter,
    positionJitter,
    gamma
  }
) {
  // boundingBoxSize = -1
  let fourPositions = new Float32Array(particleCount * bufferLength * 4)
  let fourVelocities = new Float32Array(particleCount * bufferLength * 4)
  // let fourMomenta = new Float32Array(particleCount * bufferLength * 4)
  let particleTypes = new Array(particleCount)

  if (randomize) {
    for (let p = 0; p < particleCount; p++) {
      fourPositions[p * 4] = boundedRandom() * 0.1 //boundingBoxSize
      fourPositions[p * 4 + 1] = boundedRandom() * 0.1 //boundingBoxSize
      fourPositions[p * 4 + 2] = boundedRandom() * 0.1 //boundingBoxSize
      fourPositions[p * 4 + 3] = 0
      fourVelocities[p * 4] = boundedRandom()
      fourVelocities[p * 4 + 1] = boundedRandom()
      fourVelocities[p * 4 + 2] = boundedRandom()
      fourVelocities[p * 4 + 3] = 0
      particleTypes[p] = Math.floor(random() * 4)
    }
    fourPositions = new Float32Array(
      [
        ...fourPositions,
        ...fourPositions,
        ...fourPositions,
        ...fourPositions
      ].concat(
        new Array(
          particleCount * (bufferLength - 1) * 4 * channelsPerBuffer
        ).fill(0)
      )
    )

    fourVelocities = new Float32Array(
      [
        ...fourVelocities,
        ...fourVelocities,
        ...fourVelocities,
        ...fourVelocities
      ].concat(
        new Array(
          particleCount * (bufferLength - 1) * 4 * channelsPerBuffer
        ).fill(0)
      )
    )
  } else {
    const particleCollection = createParticleCollection({
      particleCount: particleCount,
      particleTypeDescriptor: particleType,
      bunchShape: bunchShape,
      particleSeparation: particleSeparation,
      gamma: gamma,
      position: position,
      positionJitter: positionJitter,
      direction: direction,
      directionJitter: directionJitter
    })
    fourPositions = new Float32Array(
      [
        ...particleCollection.fourPositions,
        ...particleCollection.fourPositions,
        ...particleCollection.fourPositions,
        ...particleCollection.fourPositions
      ].concat(
        new Array(
          particleCount * (bufferLength - 1) * 4 * channelsPerBuffer
        ).fill(0)
      )
    )

    fourVelocities = new Float32Array(
      [
        ...particleCollection.fourVelocities,
        ...particleCollection.fourVelocities,
        ...particleCollection.fourVelocities,
        ...particleCollection.fourVelocities
      ].concat(
        new Array(
          particleCount * (bufferLength - 1) * 4 * channelsPerBuffer
        ).fill(0)
      )
    )
    // fourMomenta = new Float32Array(
    //   [
    //     ...particleCollection.fourMomenta
    //     // ...particleCollection.fourVelocities,
    //     // ...particleCollection.fourVelocities,
    //     // ...particleCollection.fourVelocities
    //   ].concat(new Array(particleCount * (bufferLength - 1) * 4).fill(0))
    // )

    particleTypes = particleCollection.particleTypes
  }

  return {
    particleCount: particleCount,
    bufferLength: bufferLength,
    fourPositions,
    fourVelocities,
    particleTypes,
    emitterPosition: position
  }
}

import ParticleTypes from './particleTypes'
import {
  columnDistribution,
  discDistributionXY,
  discDistributionYZ,
  rowDistribution,
  squareDistributionXY,
  squareDistributionXZ,
  spiralDistributionXY,
  squareDistributionYZ,
  spiralDistributionYZ
} from './distributions/distributions'
import norm from 'norm.js'
import { boundedRandom } from '../utils/random'

export function particleTypesArrayFromDescriptor(
  particleTypeDescriptor,
  n = 0
) {
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
  const jitteredDirection = direction.map(
    (d, i) =>
      d +
      Math.floor(
        Math.abs(boundedRandom()) * localPosition[i] * directionJitter[i] * 100
      ) /
        100
  )
  return norm.normalize(jitteredDirection, 'Euclidean')
}

export function betaFromGamma(gamma = 0) {
  if (gamma === 0) return NaN
  return Math.sqrt(1 - 1 / Math.pow(gamma, 2))
}

export function createParticleCollection({
  particleCount = 3,
  particleTypeDescriptor = 'PHOTON ELECTRON PROTON',
  bunchShape = 'ROW',
  particleSeparation = 0.1,
  gamma = 1,
  position = [0, 0, 0],
  direction = [0, 0, 1],
  positionJitter = [0, 0, 0],
  directionJitter = [0, 0, 0]
}) {
  // create particle collection
  const particles = particleTypesArrayFromDescriptor(
    particleTypeDescriptor,
    particleCount
  )

  // distribute Location

  if (
    [
      'SQUARE',
      'ROW',
      'DISC',
      'DISC_YZ',
      'COLUMN',
      'SQUARE_YZ',
      'SQUARE_HORIZONTAL',
      'SPIRAL_XY',
      'SPIRAL_YZ'
    ].indexOf(bunchShape) === -1
  ) {
    throw new Error('unknown distribution type')
  }
  const localPositions =
    bunchShape === 'SQUARE'
      ? squareDistributionXY({
          n: particleCount,
          d: particleSeparation
        })
      : bunchShape === 'SQUARE_YZ'
      ? squareDistributionYZ({
          n: particleCount,
          d: particleSeparation
        })
      : bunchShape === 'DISC'
      ? discDistributionXY({
          n: particleCount,
          d: particleSeparation
        })
      : bunchShape === 'DISC_YZ'
      ? discDistributionYZ({
          n: particleCount,
          d: particleSeparation
        })
      : bunchShape === 'SQUARE_HORIZONTAL'
      ? squareDistributionXZ({
          n: particleCount,
          d: particleSeparation
        })
      : bunchShape === 'ROW'
      ? rowDistribution({
          n: particleCount,
          d: particleSeparation
        })
      : bunchShape === 'COLUMN'
      ? columnDistribution({
          n: particleCount,
          d: particleSeparation
        })
      : bunchShape === 'SPIRAL_XY'
      ? spiralDistributionXY({
          n: particleCount
        })
      : bunchShape === 'SPIRAL_YZ'
      ? spiralDistributionYZ({
          n: particleCount
        })
      : columnDistribution({
          n: particleCount,
          d: particleSeparation
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
  // console.log({ gamma, fourMomenta })
  return {
    fourPositions,
    fourVelocities: fourMomenta.reduce((acc, val) => acc.concat(val), []),
    // fourMomenta,
    particleTypes: particles.map((p) => p.id)
  }
}
