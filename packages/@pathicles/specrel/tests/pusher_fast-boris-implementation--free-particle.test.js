import { bigNumberMath, format6, speedOfLight__ms_1 } from '..'

import Pusher_FastBorisImplementation from 'pusher/Pusher_FastBorisImplementation'

import { ParticleSystem } from '../ParticleSystem'
//
// for (let precision of ['32bit', '64bit']) {
//   for (let gamma of [1, 2, 5, 10, 100]) {
//     describe(`Boris Pusher for 1 photon of gamma ${gamma}, precision: ${precision}`, () => {
//       const report = simulate('free--1-photon', precision, {
//         gamma
//       })
//
//       console.log(prettyjson.render(report.result))
//
//       it('boundingBox.x.width = 0', () => {
//         expect(report.result.boundingBox.x.width).toEqual(0)
//       })
//       it('boundingBox.y.width = 0', () => {
//         expect(report.result.boundingBox.y.width).toEqual(0)
//       })
//       it('boundingBox.z.width = 1', () => {
//         expect(report.result.boundingBox.z.width).toEqual(1)
//       })
//     })
//   }
// }
//
// function simulate(presetName, precision = '64bit', overwrite = {}) {
//   let round = (x) => x
//   if (precision === '32bit') {
//     round = (x) => Math.fround(x)
//   }
//
//   const load = (presetName) =>
//     require('../../../config/presets').default.find(
//       ({ name }) => name === presetName
//     )
//   const configuration = Object.assign(load(presetName), overwrite)
//   const particleSystem = ParticleSystem.load(configuration)
//
//   const dt__s = bigNumberMath
//     .divide(configuration.tickDuration__c_1, speedOfLight__ms_1)
//     .toNumeric()
//
//   const pusher = new Pusher_FastBorisImplementation({
//     system: particleSystem,
//     dt__s,
//     round,
//     stepHistoryLength: configuration.stepcount
//   })
//   const computeStart = performance.now()
//   pusher.push(configuration.iterations, round)
//   const computeEnd = performance.now()
//
//   const { boundingBox, steps } = pusher.toData()
//
//   return {
//     meta: {
//       name: configuration.name,
//       precision: round(0.9999999999999) === 1 ? '32bit' : '64bit',
//       computeTime: computeEnd - computeStart,
//       dt__s: format6(dt__s),
//       configuration
//     },
//     result: { boundingBox, steps }
//   }
// }
