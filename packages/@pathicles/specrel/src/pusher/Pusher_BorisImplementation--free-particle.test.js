import { config } from '@pathicles/config'
import { bigNumberMath, format6, speedOfLight__ms_1 } from '../'
import Pusher_BorisImplementation from './Pusher_BorisImplementation'

import { ParticleSystem } from '../ParticleSystem'

const { performance } = require('perf_hooks')

describe('Boris Pusher for system of 1 photon ', () => {
  const report = simulate('free--1-photon')

  it('boundingBox.x.width = 0', () => {
    expect(report.result.boundingBox.x.width).toEqual(0)
  })
  it('boundingBox.y.width = 0', () => {
    expect(report.result.boundingBox.y.width).toEqual(0)
  })
  it('boundingBox.z.width = 1', () => {
    expect(report.result.boundingBox.z.width).toEqual(1)
  })
})

describe('Boris Pusher for system of 1 electron of gamma 1, no field ', () => {
  const report = simulate('free--1-electron--gamma-1')

  // console.log(prettyjson.render(report));

  it('boundingBox.x.width = 0', () => {
    expect(report.result.boundingBox.x.width).toEqual(0)
  })
  it('boundingBox.y.width = 0', () => {
    expect(report.result.boundingBox.y.width).toEqual(0)
  })
  it('boundingBox.z.width = 0', () => {
    expect(report.result.boundingBox.z.width).toEqual(0)
  })
})
describe('Boris Pusher for system of 1 electron of gamma 2, no field ', () => {
  const report = simulate('free--1-electron--gamma-2')

  // console.log(prettyjson.render(report));

  it('boundingBox.x.width = 0', () => {
    expect(report.result.boundingBox.x.width).toEqual(0)
  })
  it('boundingBox.y.width = 0', () => {
    expect(report.result.boundingBox.y.width).toEqual(0)
  })
  it('boundingBox.z.width ~ 0.866', () => {
    expect(report.result.boundingBox.z.width).toBeCloseTo(0.866)
  })
})
describe('Boris Pusher for system of 1 electron of gamma 1000, no field ', () => {
  const report = simulate('free--1-electron--gamma-1000')

  // console.log(prettyjson.render(report));

  it('boundingBox.x.width = 0', () => {
    expect(report.result.boundingBox.x.width).toEqual(0)
  })
  it('boundingBox.y.width = 0', () => {
    expect(report.result.boundingBox.y.width).toEqual(0)
  })
  it('boundingBox.z.width ~ 0.9999995', () => {
    expect(report.result.boundingBox.z.width).toBeCloseTo(0.9999995) // beta = sqrt(1 - (1/gamma)^2)
  })
})
describe('Boris Pusher for system of 1 electron of gamma 10000, no field ', () => {
  const report = simulate('free--1-electron--gamma-10000')

  // console.log(prettyjson.render(report));

  it('boundingBox.x.width = 0', () => {
    expect(report.result.boundingBox.x.width).toEqual(0)
  })
  it('boundingBox.y.width = 0', () => {
    expect(report.result.boundingBox.y.width).toEqual(0)
  })
  it('boundingBox.z.width  0.999999995', () => {
    expect(report.result.boundingBox.z.width).toBeCloseTo(0.999999995)
  })
})
describe('Boris Pusher for system of 1 electron of gamma 100000, no field ', () => {
  const report = simulate('free--1-electron--gamma-100000')

  // console.log(prettyjson.render(report));

  it('boundingBox.x.width = 0', () => {
    expect(report.result.boundingBox.x.width).toEqual(0)
  })
  it('boundingBox.y.width = 0', () => {
    expect(report.result.boundingBox.y.width).toEqual(0)
  })
  it('boundingBox.z.width ~ 0.9999999999', () => {
    expect(report.result.boundingBox.z.width).toBeCloseTo(0.9999999999)
  })
})
describe('Boris Pusher for system of 1 electron of gamma 1000000000, no field ', () => {
  const report = simulate('free--1-electron--gamma-1000000000')

  // console.log(prettyjson.render(report));

  it('boundingBox.x.width = 0', () => {
    expect(report.result.boundingBox.x.width).toEqual(0)
  })
  it('boundingBox.y.width = 0', () => {
    expect(report.result.boundingBox.y.width).toEqual(0)
  })
  it('boundingBox.z.width = ~1', () => {
    expect(report.result.boundingBox.z.width).toBeCloseTo(1)
  })
})

function simulate(presetName) {
  // const load = presetName =>
  //   presets.find(
  //     ({ name }) => name === presetName
  //   )
  const configuration = config(presetName)
  const particleSystem = ParticleSystem.load(configuration)

  //console.log(prettyjson.render(configuration))

  // console.log('A')

  const dt__s = bigNumberMath.divide(
    bigNumberMath.bignumber(configuration.model.tickDurationOverC),
    speedOfLight__ms_1
  )

  // console.log('B')

  const borisPusher = new Pusher_BorisImplementation({
    system: particleSystem,
    dt__s: dt__s
  })

  const computeStart = performance.now()
  borisPusher.push(configuration.iterations)
  const computeEnd = performance.now()

  // analysis
  // const { boundingBox, steps } = fastBorisPusher.toData();

  const report = {
    meta: {
      name: configuration.name,
      precision: 'arbitrary',
      computeTime: computeEnd - computeStart,
      dt__s: format6(dt__s),
      configuration
    },
    result: {
      boundingBox: particleSystem.getBoundingBox(),
      steps: particleSystem.toData()
    }
  }

  return report
}
