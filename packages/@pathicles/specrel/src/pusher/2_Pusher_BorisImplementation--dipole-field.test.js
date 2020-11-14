const epsilon = 0.00001
import { config } from '@pathicles/config'

import { performance } from 'perf_hooks'

import { bigNumberMath, format6, speedOfLight } from '../'
import Pusher_BorisImplementation from './Pusher_BorisImplementation'

import prettyjson from 'prettyjson'
import { ParticleSystem } from '../ParticleSystem'

describe('Boris Pusher for system of 1 electron in magnetic dipole field ', () => {
  const report = simulate('gyrotest--1-electron')

  // analysis

  console.log(prettyjson.render(report.expected.gyroRadius))

  it('x-radius is ' + report.expected.gyroRadius[0], () => {
    expect(
      Math.abs(
        report.result.boundingBox.x.width - report.expected.gyroRadius[0]
      )
    ).toBeLessThan(epsilon)
  })
  it('y-radius is ' + report.expected.gyroRadius[1], () => {
    expect(report.result.boundingBox.y.width).toBeLessThan(epsilon)
  })
  it('z-radius is ' + report.expected.gyroRadius[2], () => {
    expect(
      report.result.boundingBox.z.width - report.expected.gyroRadius[2]
    ).toBeLessThan(0.00001)
  })
})

function simulate(presetName, overwrite = {}) {
  const load = (presetName) => config(presetName)
  const configuration = Object.assign(load(presetName), overwrite)
  const particleSystem = ParticleSystem.load(configuration)

  const dt__s = bigNumberMath
    .divide(
      bigNumberMath.bignumber(configuration.tickDuration__c_1),
      speedOfLight
    )
    .toNumeric()

  const borisPusher = new Pusher_BorisImplementation({
    system: particleSystem,
    dt__s: dt__s
  })

  const computeStart = performance.now()
  borisPusher.push(configuration.iterationCount)
  const computeEnd = performance.now()

  // analysis

  const { boundingBox, steps } = borisPusher.toData()

  const report = {
    meta: {
      name: configuration.name,
      precision: 'arbitrary',
      computeTime: computeEnd - computeStart,
      dt__s: format6(dt__s),
      configuration
    },
    result: {
      boundingBox,
      steps
    },
    expected: {
      gyroRadius: particleSystem.particles[0]
        .gyroRadius(configuration.dipole_strength)
        .map((d) => d.toNumber('m')),
      gyroPeriod: particleSystem.particles[0]
        .gyroPeriod(configuration.dipole_strength)
        .toNumber('s')
    }
  }

  return report
}
