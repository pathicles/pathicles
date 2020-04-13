import { createParticleCollection } from './variables'
import { boundedRandom, random } from '../utils/random'

export default function(
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
  },
  boundingBoxSize = -1
) {
  let fourPositions = new Float32Array(particleCount * bufferLength * 4)
  let fourVelocities = new Float32Array(particleCount * bufferLength * 4)
  let fourMomenta = new Float32Array(particleCount * bufferLength * 4)
  let particleTypes = new Array(particleCount)

  if (randomize) {
    for (let p = 0; p < particleCount; p++) {
      fourPositions[p * 4] = boundedRandom() * 0 //boundingBoxSize
      fourPositions[p * 4 + 1] = boundedRandom() * 0 //boundingBoxSize
      fourPositions[p * 4 + 2] = boundedRandom() * 0 //boundingBoxSize
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
    fourPositions = new Float32Array(
      [
        ...particleCollection.fourPositions
        // ...particleCollection.fourPositions,
        // ...particleCollection.fourPositions,
        // ...particleCollection.fourPositions
      ].concat(new Array(particleCount * (bufferLength - 1) * 4).fill(0))
    )

    fourVelocities = new Float32Array(
      [
        ...particleCollection.fourVelocities
        // ...particleCollection.fourVelocities,
        // ...particleCollection.fourVelocities,
        // ...particleCollection.fourVelocities
      ].concat(new Array(particleCount * (bufferLength - 1) * 4).fill(0))
    )
    fourMomenta = new Float32Array(
      [
        ...particleCollection.fourMomenta
        // ...particleCollection.fourVelocities,
        // ...particleCollection.fourVelocities,
        // ...particleCollection.fourVelocities
      ].concat(new Array(particleCount * (bufferLength - 1) * 4).fill(0))
    )

    particleTypes = particleCollection.particleTypes
  }

  return {
    particleCount: particleCount,
    bufferLength: bufferLength,
    fourPositions,
    fourVelocities,
    particleTypes
  }
}
