import * as d3random from 'd3-random'
import { default as seedrandom } from 'seedrandom'
import createLogger from './Logger.js'
import Particle from './Particle'
import {
  columnDistribution,
  rowDistribution,
  squareDistribution,
  squareHorizontalDistribution
} from './distribution/Distributions'
import ParticleTypes from './ParticleTypes'

const logger = createLogger('ParticleCollection')

const random = d3random.randomUniform.source(seedrandom('a22ebc7ca3a47'))(0, 1)

class ParticleCollection {
  constructor(particles) {
    if (particles) {
      this._particles = Array.from(particles)
    }
  }

  get particles() {
    return this._particles || []
  }

  distributeLocation({ bunchShape, dx = 0.1, x0 = 0, y0 = 0, z0 = 0 }) {
    if (
      ['SQUARE', 'ROW', 'COLUMN', 'SQUARE_HORIZONTAL'].indexOf(bunchShape) ===
      -1
    ) {
      throw Error('unknown distribution type')
    }
    const distribution =
      bunchShape === 'SQUARE'
        ? squareDistribution({ n: this.particles.length, d: dx })
        : bunchShape === 'SQUARE_HORIZONTAL'
        ? squareHorizontalDistribution({ n: this.particles.length, d: dx })
        : bunchShape === 'ROW'
        ? rowDistribution({ n: this.particles.length, d: dx })
        : bunchShape === 'COLUMN'
        ? columnDistribution({ n: this.particles.length, d: dx })
        : columnDistribution({ n: this.particles.length, d: dx })

    this.particles.forEach((particle, p) => {
      particle.position = distribution[p]
    })
  }

  setMomentaFromGamma({
    gamma = 1,
    direction,
    relativeEmitterDirectionJitter = [0, 0, 0]
  }) {
    this.particles.forEach((particle, p) => {
      const jitteredDirection = direction.map(
        (d, i) =>
          d +
          Math.floor(
            d3random.randomUniform(
              -relativeEmitterDirectionJitter[i],
              relativeEmitterDirectionJitter[i]
            )() * 100
          ) /
            100
      )
      particle.setMomentumFromGamma(gamma, jitteredDirection)
    })
  }

  setMomenta({ momentum__eVc_1 }) {
    this.particles.forEach((particle, p) => {
      particle._momentum__eVc_1 = momentum__eVc_1
    })
  }

  setMomentaFromKineticEnergy({ kineticEnergy = 1, direction }) {
    this.particles.forEach((particle, p) => {
      particle.setMomentumFromKineticEnergy(kineticEnergy, direction)
    })
  }

  asArrays(stepHistoryLength = 1) {
    const result = {
      position__m: this._particles
        .reduce((sum, current) => {
          return sum.concat([
            current.position[0].toNumber(),
            current.position[1].toNumber(),
            current.position[2].toNumber(),
            0
          ])
        }, [])
        .concat(
          new Array(this._particles.length * (stepHistoryLength - 1) * 4).fill(
            0
          )
        ),
      momentum__eVc_1: this._particles
        .reduce((sum, current) => {
          return sum.concat([
            current.momentum[0].toNumber(),
            current.momentum[1].toNumber(),
            current.momentum[2].toNumber(),
            0
          ])
        }, [])
        .concat(
          new Array(this._particles.length * (stepHistoryLength - 1) * 4).fill(
            0
          )
        ),
      velocity__c: this._particles
        .reduce((sum, current) => {
          return sum.concat([
            current.velocity__c[0].toNumber(),
            current.velocity__c[1].toNumber(),
            current.velocity__c[2].toNumber(),
            current.gamma
          ])
        }, [])
        .concat(
          new Array(this._particles.length * (stepHistoryLength - 1) * 4).fill(
            0
          )
        ),
      type: this._particles.reduce((sum, current) => {
        return sum.concat(current.particleType.id)
      }, []),
      gamma: this._particles.reduce((sum, current) => {
        return sum.concat(current.gamma.toNumber())
      }, []),
      beta: this._particles.reduce((sum, current) => {
        return sum.concat(current.beta.toNumber())
      }, []),

      charge__eq: this._particles.reduce((sum, current) => {
        return sum.concat(current.charge.toNumber())
      }, []),
      mass__eVc_2: this._particles.reduce((sum, current) => {
        return sum.concat(current.mass__eVc_2.toNumber())
      }, [])
    }
    return result
  }

  clone() {
    return new ParticleCollection(this.particles.map(p => p.clone()))
  }
}

ParticleCollection.create = ({
  particleCount = 0,
  particleTypeDistribution = [ParticleTypes.PHOTON]
}) => {
  const particles = Array(particleCount)
    .fill(0)
    .map((x, p) => {
      const particleType =
        particleTypeDistribution[p % particleTypeDistribution.length]
      return Particle.create(particleType)
    })

  return new ParticleCollection(particles)
}

export default ParticleCollection
