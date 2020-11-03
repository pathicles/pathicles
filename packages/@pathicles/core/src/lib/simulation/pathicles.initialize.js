import { createParticleCollection } from './variables'
import { random, boundedRandom } from '../utils/random'

export default function (
  bufferLength,
  {
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

  return {
    particleCount: particleCount,
    bufferLength: bufferLength,
    fourPositions: particleCollection.fourPositions,
    fourVelocities: particleCollection.fourVelocities,
    particleTypes: particleCollection.particleTypes,
    emitterPosition: position
  }
}
