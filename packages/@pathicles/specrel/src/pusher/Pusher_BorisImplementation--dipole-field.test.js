import { config } from '@pathicles/config'

import { performance } from 'perf_hooks'

import { bigNumberMath, format6, speedOfLight__ms_1 } from '..'
import Pusher_BorisImplementation from './Pusher_BorisImplementation'

import prettyjson from 'prettyjson'
import { ParticleSystem } from '../ParticleSystem'

describe('Boris Pusher for system of 1 electron in magnetic dipole field ', () => {
  const report = simulate('gyrotest--1-electron')

  // analysis

  console.log(prettyjson.render(report.expected.gyroRadius))

  it('x-radius is ' + report.expected.gyroRadius[0], () => {
    expect(Math.abs(report.result.boundingBox.x.width)).toBeCloseTo(
      report.expected.gyroRadius[0]
    )
  })
  it('y-radius is ' + report.expected.gyroRadius[1], () => {
    expect(report.result.boundingBox.y.width).toBeLessThan(0)
  })
  it('z-radius is ' + report.expected.gyroRadius[2], () => {
    expect(
      report.result.boundingBox.z.width - report.expected.gyroRadius[2]
    ).toBeLessThan(0.00001)
  })
})

function simulate(presetName, overwrite = {}) {
  const configuration = Object.assign(config(presetName), overwrite)
  const particleSystem = ParticleSystem.load(configuration)

  const dt__s = bigNumberMath.divide(
    bigNumberMath.bignumber(configuration.model.tickDurationOverC),
    speedOfLight__ms_1
  )

  const borisPusher = new Pusher_BorisImplementation({
    system: particleSystem,
    dt__s: dt__s
  })

  const computeStart = performance.now()
  borisPusher.push(configuration.iterations)
  const computeEnd = performance.now()

  // analysis

  const { boundingBox, steps } = borisPusher.toData()

  return {
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
}
