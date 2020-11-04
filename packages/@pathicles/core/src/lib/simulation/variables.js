// 'use strict'
//
// import {
//   columnDistribution,
//   // discDistributionXY,
//   // discDistributionYZ,
//   spiralDistribution,
//   rowDistribution,
//   cubeDistribution,
//   squareDistributionXY,
//   squareDistributionXZ,
//   squareDistributionYZ
// } from './distributions/distributions'
// import norm from 'norm.js'
// import { boundedRandom } from '../utils/random'
//
// export function jitterPosition({ position = [0, 0, 0], jitter = [0, 0, 0] }) {
//   return position.map(
//     (d, i) => d + Math.floor(boundedRandom() * jitter[i] * 100) / 100
//   )
// }
//
// export function jitterDirection({
//   direction = [0, 0, 1],
//   directionJitter = [0, 0, 0]
// }) {
//   const jitteredDirection = direction.map(
//     (d, i) => d + Math.floor(boundedRandom() * directionJitter[i] * 100) / 100
//   )
//   return norm.normalize(jitteredDirection, 'Euclidean')
// }
//
// export function betaFromGamma(gamma = 0) {
//   if (gamma === 0) return NaN
//   return Math.sqrt(1 - 1 / Math.pow(gamma, 2))
// }
//
// export function createParticleCollection({
//   particleCount = 3,
//   particleTypeDescriptor = 'PHOTON ELECTRON PROTON',
//   bunchShape = 'ROW',
//   particleSeparation = 0.1,
//   gamma = 1,
//   position = [0, 0, 0],
//   direction = [0, 0, 1],
//   positionJitter = [0, 0, 0],
//   directionJitter = [0, 0, 0]
// }) {
//   // create particle collection
//   const particles = particleTypesFromDescriptor(
//     particleTypeDescriptor,
//     particleCount
//   )
//
//   // distribute Location
//
//   if (
//     [
//       'SQUARE',
//       'CUBE',
//       'ROW',
//       // 'DISC',
//       // 'DISC_YZ',
//       'COLUMN',
//       'SQUARE_YZ',
//       'SQUARE_HORIZONTAL',
//       'SPIRAL_XY',
//       'SPIRAL_YZ'
//     ].indexOf(bunchShape) === -1
//   ) {
//     throw new Error('unknown distribution type')
//   }
//   const localPositions =
//     bunchShape === 'SQUARE'
//       ? squareDistributionXY({
//           n: particleCount,
//           d: particleSeparation
//         })
//       : bunchShape === 'SQUARE_YZ'
//       ? squareDistributionYZ({
//           n: particleCount,
//           d: particleSeparation
//         })
//       : // : bunchShape === 'DISC'
//       // ? discDistributionXY({
//       //     n: particleCount,
//       //     d: particleSeparation
//       //   })
//       // : bunchShape === 'DISC_YZ'
//       // ? discDistributionYZ({
//       //     n: particleCount,
//       //     d: particleSeparation
//       //   })
//       bunchShape === 'SQUARE_HORIZONTAL'
//       ? squareDistributionXZ({
//           n: particleCount,
//           d: particleSeparation
//         })
//       : bunchShape === 'ROW'
//       ? rowDistribution({
//           n: particleCount,
//           d: particleSeparation
//         })
//       : bunchShape === 'COLUMN'
//       ? columnDistribution({
//           n: particleCount,
//           d: particleSeparation
//         })
//       : bunchShape === 'SPIRAL_XY'
//       ? spiralDistribution({
//           n: particleCount,
//           mixer: (r, theta) => [r * Math.cos(theta), r * Math.sin(theta), 0]
//         })
//       : bunchShape === 'SPIRAL_YZ'
//       ? spiralDistribution({
//           n: particleCount
//         })
//       : bunchShape === 'CUBE'
//       ? cubeDistribution({
//           n: particleCount,
//           d: particleSeparation
//         })
//       : columnDistribution({
//           n: particleCount,
//           d: particleSeparation
//         })
//
//   // console.log({ particleCount, localPositions })
//
//   const fourPositions = particles
//     .map((particle, p) => {
//       const jitteredPosition = jitterPosition({
//         position: position,
//         jitter: positionJitter
//       })
//       return [
//         localPositions[p * 3] + jitteredPosition[0],
//         localPositions[p * 3 + 1] + jitteredPosition[1],
//         localPositions[p * 3 + 2] + jitteredPosition[2],
//         0
//       ]
//     })
//     .reduce((acc, val) => acc.concat(val), [])
//
//   const fourVelocities = particles.map((particle, p) => {
//     const beta = particle.mass__eVc_2 === 0 ? 1 : betaFromGamma(gamma)
//     const myDirection = jitterDirection({
//       direction,
//       directionJitter,
//       localPosition: [
//         localPositions[p * 3],
//         localPositions[p * 3 + 1],
//         localPositions[p * 3 + 2]
//       ]
//     })
//     return [
//       beta * myDirection[0],
//       beta * myDirection[1],
//       beta * myDirection[2],
//       gamma
//     ]
//   })
//   //  .reduce((acc, val) => acc.concat(val), [])
//
//   const fourMomenta = particles
//     .map((particle, p) => {
//       return [
//         (particle.mass__eVc_2 === 0 ? 1 : gamma) * fourVelocities[p][0],
//         (particle.mass__eVc_2 === 0 ? 1 : gamma) * fourVelocities[p][1],
//         (particle.mass__eVc_2 === 0 ? 1 : gamma) * fourVelocities[p][2],
//         gamma
//       ]
//     })
//     .reduce((acc, val) => acc.concat(val), [])
//   // console.log({ gamma, fourMomenta })
//   return {
//     fourPositions,
//     fourVelocities: fourMomenta.reduce((acc, val) => acc.concat(val), []),
//     // fourMomenta,
//     particleTypes: particles.map((p) => p.id)
//   }
// }
