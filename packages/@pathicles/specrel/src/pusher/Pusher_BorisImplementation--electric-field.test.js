import Pusher_FastBorisImplementation from './Pusher_FastBorisImplementation'

const epsilon = 0.00001

const { PerformanceObserver, performance } = require('perf_hooks')

import Specrel, { bigNumberMath, format6 } from '../Specrel'
import * as d3 from 'd3'
import Pusher_BorisImplementation from './Pusher_BorisImplementation'

import prettyjson from 'prettyjson'
import { ParticleSystem } from '../ParticleSystem'

const logbook = []

// describe("Boris Pusher for system of 1 photon ", () => {
//   const report = simulate("free--1-photon", {
//     // electricFieldStrength: 1
//   });
//
//   it("boundingBox.x.width = 0", () => {
//     expect(report.result.boundingBox.x.width).toEqual(0);
//   });
//   it("boundingBox.y.width = 0", () => {
//     expect(report.result.boundingBox.y.width).toEqual(0);
//   });
//   it("boundingBox.z.width = 1", () => {
//     expect(report.result.boundingBox.z.width).toEqual(1);
//   });
// });
//

// let gamma = 2;
// let electricFieldStrength = -10000000;
const stepCount = 10

// for (let particleType of ["PHOTON", "ELECTRON", "PROTON"]) {
for (let particleType of ['ELECTRON']) {
  // for (let gamma of [1, 2, 10]) {
  for (let gamma of [2]) {
    // for (let gamma of [1, 2, 10, 100, 1000, 10000]) {
    // for (let electricFieldStrength of [0, 100, 10000]) {
    // for (let electricFieldStrength of [0, 1, 10, 100, 1000, 10000]) {
    for (let electricFieldStrength of [1]) {
      describe(`Boris Pusher for 1 ${particleType} of gamma ${gamma} with E: ${electricFieldStrength}`, () => {
        const report = simulate({
          particleType,
          electricFieldStrength,
          gamma,
          stepCount
        })

        // console.log(prettyjson.render(report.result));

        logbook.push({
          particleType: report.result.steps[0].particles[0].particleType,
          gamma,
          // E_x: 0,
          // E_y: 0,
          E_z: electricFieldStrength,
          stepCount,
          // z_boundingBoxWidth: report.result.boundingBox.z.width,
          z_10__m: report.result.steps[10].particles[0].position__m[2],
          v_10__c: report.result.steps[10].particles[0].velocity__c[2],

          position__m: report.result.steps.map(
            step => step.particles[0].position__m
          ),
          velocity__c: report.result.steps.map(
            step => step.particles[0].velocity__c
          )
        })

        it('boundingBox.x.width = 0', () => {
          expect(report.result.boundingBox.x.width).toBeCloseTo(0)
        })
        it('boundingBox.y.width = 0', () => {
          expect(report.result.boundingBox.y.width).toBeCloseTo(0)
        })
        it('boundingBox.z.width = 0', () => {
          expect(report.result.boundingBox.z.width).toBeCloseTo(0)
        })
      })
    }
  }
}

console.log(d3.csvFormat(logbook))

function simulate(configuration = {}) {
  const system = ParticleSystem.load(configuration)

  console.log(prettyjson.render(system))
  const dt__s = bigNumberMath
    .divide(
      bigNumberMath.bignumber(1 / configuration.stepCount),
      Specrel.speedOfLight
    )
    .toNumeric()

  const borisPusher = new Pusher_BorisImplementation({
    system,
    dt__s
  })

  const computeStart = performance.now()
  borisPusher.push(configuration.stepCount)
  const computeEnd = performance.now()

  // analysis

  const report = {
    meta: {
      name: configuration.name,
      precision: 'arbitrary',
      computeTime: computeEnd - computeStart,
      dt__s: format6(dt__s),
      configuration
    },
    result: {
      boundingBox: system.getBoundingBox(),
      steps: system.toData()
    },
    expected: {
      // gammas: particleSystem.particles[0].
      //   .gyroRadius(configuration.dipole_strength)
      //   .map(d => d.toNumber("m")),
      // gyroPeriod: particleSystem.particles[0]
      //   .gyroPeriod(configuration.dipole_strength)
      //   .toNumber("s")
    }
  }

  return report
}
