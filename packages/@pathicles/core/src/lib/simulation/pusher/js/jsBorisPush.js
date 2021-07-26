/* eslint-disable */
import { PerformanceLogger } from '../../../utils/PerformanceLogger'
import bp from './boris.push.js'
import ParticleTypes, {
  LIST
} from '../../../../../../specrel/src/ParticleTypes'

import { C } from '@pathicles/config'

function dot(x, y) {
  var sum = 0
  for (var i = 0; i < x.length; i++) {
    sum += x[i] * y[i]
  }
  return sum
}
function sqrt(x) {
  if (x.length) {
    return x.map(sqrt)
  }
  return Math.sqrt(x)
}
function cross(x, y) {
  var x0 = x[0],
    x1 = x[1],
    x2 = x[2],
    y0 = y[0],
    y1 = y[1],
    y2 = y[2]
  var out = [0, 0, 0]
  out[0] = x1 * y2 - x2 * y1
  out[1] = x2 * y0 - x0 * y2
  out[2] = x0 * y1 - x1 * y0
  return out
}

export function jsBorisPush({ runner, variables, model, debug, initialData }) {
  const performanceLogger = new PerformanceLogger()

  performanceLogger.entries = []

  const snapshots = [
    {
      fourPositions: new Float32Array(variables.particleCount * 4),
      fourVelocities: new Float32Array(variables.particleCount * 4)
    }
  ]
  snapshots[0].fourPositions.set(initialData.fourPositions.flat(), 0)
  snapshots[0].fourVelocities.set(initialData.fourVelocities.flat(), 0)

  const pushFactory = () => {
    const uniforms = {
      lattice: model.lattice,
      snapshotCount: variables.snapshotCount,
      particleCount: variables.particleCount,
      deltaTOverC: variables.iterationDurationOverC,

      particleInteraction: model.interactions.particleInteraction ? 1 : 0,
      electricField: model.interactions.electricField || [0, 0, 0],
      magneticField: model.interactions.magneticField || [0, 0, 1],
      takeSnapshot: () => variables.takeSnapshot,

      boundingBoxSize: model.boundingBoxSize,
      boundingBoxCenter: model.boundingBoxCenter || [0, 1, 0],

      littleEndian: runner.littleEndian === 1,

      particleChargesMassesChargeMassRatios:
        variables.particleChargesMassesChargeMassRatios
    }

    return () => {
      let nextFourPositions = new Float32Array(variables.particleCount * 4)
      let nextFourVelocities = new Float32Array(variables.particleCount * 4)

      for (let p = 0; p < variables.particleCount; p++) {
        const fourPosition = snapshots[
          snapshots.length - 1
        ].fourPositions.subarray(p * 4, p * 4 + 4)
        const fourVelocity = snapshots[
          snapshots.length - 1
        ].fourVelocities.subarray(p * 4, p * 4 + 4)

        // intermediate

        let velocity = [
          fourVelocity[0] / fourVelocity[3],
          fourVelocity[1] / fourVelocity[3],
          fourVelocity[2] / fourVelocity[3]
        ]

        const intermediateFourPosition = [
          fourPosition[0] + 0.5 * velocity[0] * uniforms.deltaTOverC,
          fourPosition[1] + 0.5 * velocity[1] * uniforms.deltaTOverC,
          fourPosition[2] + 0.5 * velocity[2] * uniforms.deltaTOverC,
          fourPosition[3] + 0.5 * uniforms.deltaTOverC
        ]
        let gamma = 1; //fourVelocity[3] / C;
        let u = [fourVelocity[0], fourVelocity[1], fourVelocity[2]]

        if (initialData.particleTypes[p] > 0) {
        //   const E = uniforms.lattice.getE(intermediateFourPosition)

        //   const B = uniforms.lattice.getB(intermediateFourPosition)

        //   debugger

        //   const { mass__eVc_2, charge__qe, chargeMassRatio__Ckg_1 } =
        //     LIST[initialData.particleTypes[p]]

        //   var hdtc_m = (chargeMassRatio__Ckg_1 * uniforms.deltaTOverC) / C / 2
        //   u = [u[0] + hdtc_m * E[0], u[1] + hdtc_m * E[1], u[2] + hdtc_m * E[2]]
          gamma = sqrt(1 + dot(u / C, u / C))

        //   var t_ = (hdtc_m * B) / gamma
        //   u = cross(u, t_).map(function (_) {
        //     return this + _
        //   }, u)
        //   var s_ = [
        //     (2.0 / (1.0 + t_[0] * t_[0])) * t_[0],
        //     (2.0 / (1.0 + t_[1] * t_[1])) * t_[1],
        //     (2.0 / (1.0 + t_[2] * t_[2])) * t_[2]
        //   ]
        //   u = cross(u, s_).map(function (_) {
        //     return this + _
        //   }, u)
        //   u = [u[0] + hdtc_m * E[0], u[1] + hdtc_m * E[1], u[2] + hdtc_m * E[2]]
        //   gamma = sqrt(1 + dot(u / C, u / C))
        }
        const nextFourVelocity = [...u].concat(gamma * C)


        // console.log({fourVelocity, nextFourVelocity});
        

        const nextVelocity = [
          nextFourVelocity[0] / nextFourVelocity[3],
          nextFourVelocity[1] / nextFourVelocity[3],
          nextFourVelocity[2] / nextFourVelocity[3]
        ]
        console.log({nextFourVelocity, nextVelocity});

        const nextFourPosition = [
          intermediateFourPosition[0] +
            0.5 * nextVelocity[0] * uniforms.deltaTOverC,
          intermediateFourPosition[1] +
            0.5 * nextVelocity[1] * uniforms.deltaTOverC,
          intermediateFourPosition[2] +
            0.5 * nextVelocity[2] * uniforms.deltaTOverC,
          intermediateFourPosition[3] + 0.5 * uniforms.deltaTOverC
        ]

        nextFourPositions.set(nextFourPosition, p * 4)
        nextFourVelocities.set(nextFourVelocity, p * 4)
      }
      snapshots.push({
        fourPositions: nextFourPositions,
        fourVelocities: nextFourVelocities
      })
    }
  }

  const push = pushFactory()

  return {
    push: (n = 1, profile = false) => {
      for (let i = 0; i < n; i++) {
        variables.iteration++

        const snapshots = Math.floor(
          variables.iteration / variables.iterationsPerSnapshot
        )
        variables.segments =
          variables.particleCount *
          Math.min(
            snapshots +
              variables.iteration -
              snapshots * variables.iterationsPerSnapshot,
            variables.snapshotCount - 1
          )

        variables.takeSnapshot =
          variables.iterationsPerSnapshot === 1 ||
          variables.iteration % variables.iterationsPerSnapshot === 1
            ? 1
            : 0

        push()
      }

      const fourPositions = []
      for (let p = 0; p < variables.particleCount; p++) {
        for (
          let s = snapshots.length - 1;
          s >= Math.max(0, snapshots.length - variables.snapshotCount);
          s--
        ) {
          fourPositions.push(
            Array.from(snapshots[s].fourPositions.subarray(p * 4, p * 4 + 4))
          )
        }
      }
      variables.position.load(fourPositions)
    },
    reset: () => {
      snapshots.length = 0
      snapshots.push({
        fourPositions: new Float32Array(variables.particleCount * 4),
        fourVelocities: new Float32Array(variables.particleCount * 4)
      })
      snapshots[0].fourPositions.set(initialData.fourPositions.flat(), 0)
      snapshots[0].fourVelocities.set(initialData.fourVelocities.flat(), 0)
    }
  }
}
