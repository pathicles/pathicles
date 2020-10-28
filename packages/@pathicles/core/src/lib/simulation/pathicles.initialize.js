import { createParticleCollection } from './variables'
import { random, boundedRandom } from '../utils/random'

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
  let fourPositions = new Array(particleCount)
  let fourVelocities = new Array(particleCount)
  // let fourMomenta = new Float32Array(particleCount)
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

    fourPositions = particleCollection.fourPositions

    fourVelocities = particleCollection.fourVelocities

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
