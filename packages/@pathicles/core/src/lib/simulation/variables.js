'use strict'

import ParticleTypes from './particleTypes'
import {
  columnDistribution,
  discDistributionXY,
  discDistributionYZ,
  rowDistribution,
  squareDistributionXY,
  squareDistributionXZ,
  squareDistributionYZ
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
    .map(d => {
      return ParticleTypes.byName(d)
    })

  if (n === 0) {
    return particleTypesArray
  }

  const filledParticleTypesArray = Array(n)
    .fill(0)
    .map((x, p) => {
      const particleType = particleTypesArray[p % particleTypesArray.length]
      return particleType
    })

  return filledParticleTypesArray
}

export function jitterPosition({ position = [0, 0, 0], jitter = [0, 0, 0] }) {
  const jitteredPosition = position.map(
    (d, i) => d + Math.floor(boundedRandom() * jitter[i] * 100) / 100
  )
  return jitteredPosition
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

// export function createVariableBuffers(
//   regl,
//   {
//     particleCount = 3,
//     bufferLength = 3
//     // particleTypeDescriptor = 'PHOTON ELECTRON PROTON',
//     // bunchShape = 'ROW',
//     // particleSeparation = 0.1,
//     // gamma,
//     // direction = [0, 0, 1],
//     // directionJitter = [0, 0, 0]
//   }
// ) {
//   // const particleCollection = createParticleCollection({
//   //   particleCount,
//   //   particleTypeDescriptor,
//   //   bunchShape,
//   //   particleSeparation,
//   //   gamma,
//   //   direction,
//   //   directionJitter
//   // })
//
//   const positionsBufferBuffer = Array(2)
//     .fill()
//     .map(() =>
//       regl.framebuffer({
//         radius: particleCount * bufferLength,
//         colorType: 'float'
//       })
//     )
//   const velocitiesBufferBuffer = Array(2)
//     .fill()
//     .map(() =>
//       regl.framebuffer({
//         radius: particleCount * bufferLength,
//         colorType: 'float'
//       })
//     )
//
//   return {
//     positionsBufferBuffer,
//     velocitiesBufferBuffer
//   }
// }

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
      'SQUARE_HORIZONTAL'
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
        localPositions[p * 3 + 0] + jitteredPosition[0],
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
        localPositions[p * 3 + 0],
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
    fourMomenta,
    particleTypes: particles.map(p => p.id)
  }
}
