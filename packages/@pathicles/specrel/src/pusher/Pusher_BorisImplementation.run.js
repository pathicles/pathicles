/* eslint-env node */

//import { ParticleSystem } from './../ParticleSystem'
// import { bigNumberMath, format30 } from './../Specrel'
import Pusher_BorisImplementation from '@pathicles/specrel/src/pusher/Pusher_BorisImplementation'
import presets from './../PathiclesConfigurationPresets.js'
import { PusherTestSystemFactory } from './PusherTestSystemFactory'
import createLogger from '../../utils/Logger'
import * as d3 from 'd3'

const configGyrotest = presets.remembered['gyrotest'][0]

const logger = createLogger('pathicles')
logger.setLevel('warn')

const pusherTestSystem = PusherTestSystemFactory(configGyrotest)

const gyroRadius = bigNumberMath.divide(
  bigNumberMath.multiply(
    pusherTestSystem.particles[0].gamma,
    pusherTestSystem.particles[0].velocity,
    pusherTestSystem.particles[0].mass
  ),
  bigNumberMath.multiply(
    pusherTestSystem.particles[0].charge.abs(),
    bigNumberMath.unit(configGyrotest.dipoleStrength, 'T')
  )
)

const gyroFrequency = bigNumberMath.divide(
  bigNumberMath.multiply(
    pusherTestSystem.particles[0].charge.abs(),
    bigNumberMath.unit(configGyrotest.dipoleStrength, 'T')
  ),
  bigNumberMath.multiply(
    pusherTestSystem.particles[0].gamma,
    pusherTestSystem.particles[0].mass
  )
)

const dsv = d3.dsvFormat(',')

logger.debug('gyroRadius', format30(gyroRadius))
// logger.debug("gyroRadius__m", format30(gyroRadius))
logger.debug('gyroFrequency', format30(gyroFrequency))
logger.debug('gyroPeriod', format30(gyroFrequency.pow(-1).to('s')))
logger.debug(
  'gyroPeriod/c',
  format30(
    gyroFrequency
      .pow(-1)
      .toNumeric()
      .times(Specrel.speedOfLight__ms_1)
  )
)
//
pusherTestSystem.particles[0]._momentum__eVc_1[2] = bigNumberMath.bignumber(
  51097340
)

// const dt__s = Specrel.speedOfLight__ms_1.pow(-1).times(configGyrotest.tickDuration__c_1);
const dt__s = Specrel.speedOfLight__ms_1
  .pow(-1)
  .times(configGyrotest.tickDuration__c_1)

console.time('borisPusher')

const borisPusher = new Pusher_BorisImplementation({
  system: pusherTestSystem,
  // dt__s: gyroFrequency.pow(-1).toNumber()
  dt__s: dt__s
})

for (let i = 0; i < configGyrotest.stepCount; i++) {
  const result = borisPusher.push()

  // logger.info(
  //   prettyjson.render(
  //     {
  //       dt__s: format30(result.dt__s),
  //       current: {
  //         position: format30(result.particles[0].current.position.map(x => x.to("m"))),
  //         momentum_: format30(result.particles[0].current.momentum),
  //         velocity: format30(result.particles[0].current.velocity),
  //         gamma: format30(result.particles[0].current.gamma),
  //       },
  //       next: {
  //         position: format30(result.particles[0].next.position),
  //         momentum_: format30(result.particles[0].next.momentum),
  //         velocity: format30(result.particles[0].next.velocity),
  //         gamma: format30(result.particles[0].next.gamma),
  //       }
  //
  //     }))
}

console.timeEnd('borisPusher')

// analysis

// const particlePositions = pusherTestSystem
//   ._particleCollectionHistory.map((step, s) => {
//     return [step.particles[0]._position__m[0].toNumber(), step.particles[0]._position__m[2].toNumber()]
//   })
// const particleMomenta = pusherTestSystem
//   ._particleCollectionHistory.map((step, s) => {
//     return [step.particles[0]._momentum__eVc_1[0].toNumber(), step.particles[0]._momentum__eVc_1[2].toNumber()]
//   })
//
const particleData = pusherTestSystem._particleCollectionHistory.map(
  (step, s) => {
    return {
      ct: Specrel.speedOfLight__ms_1.times(s * dt__s),
      x__m: step.particles[0]._position__m[0].toNumber(),
      // y__m: step.particles[0]._position__m[1].toNumber(),
      z__m: step.particles[0]._position__m[2].toNumber(),
      px__eVc_1: step.particles[0]._momentum__eVc_1[0].toNumber(),
      // py__eVc_1: step.particles[0]._momentum__eVc_1[1].toNumber(),
      pz__eVc_1: step.particles[0]._momentum__eVc_1[2].toNumber(),
      gamma: step.particles[0].gamma.toNumber()
    }
  }
)

const xExtent = d3.extent(particleData.map(p => p.x__m))
// const yExtent = d3.extent(particleData.map(p => p.y__m))
const zExtent = d3.extent(particleData.map(p => p.z__m))

logger.info('xExtent', xExtent)
logger.info('zExtent', zExtent)

const particleDataFixed = particleData.map(p =>
  Object.values(p).map(v => v.toFixed(16).padStart(30))
)

logger.warn(dsv.format(particleDataFixed))
logger.warn(format30(Specrel.speedOfLight__ms_1))
