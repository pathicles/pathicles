/* eslint-disable */
import { PerformanceLogger } from '../../../utils/PerformanceLogger'
import bp from './boris.push.js'
import ParticleTypes, {
  LIST
} from '../../../../../../specrel/src/ParticleTypes'

import { C } from '@pathicles/config'
function vec3(x, y, z) {
  if (x == null) {
    x = 0
  }
  if (y == null) {
    y = x
  }
  if (z == null) {
    z = y
  }
  return [x, y, z]
}
vec3.add = function add(out, a, b) {
  out[0] = a[0] + b[0]
  out[1] = a[1] + b[1]
  out[2] = a[2] + b[2]

  return out
}
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

      littleEndian: runner.littleEndian === 1
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

        var velocity = [0, 1, 2]
          .map(function (x, i) {
            return this[x]
          }, fourVelocity)
          .map(function (_) {
            return _ / this
          }, fourVelocity[3])

        const intermediateFourPosition = [
          fourPosition[0] + 0.5 * velocity[0] * uniforms.deltaTOverC,
          fourPosition[1] + 0.5 * velocity[1] * uniforms.deltaTOverC,
          fourPosition[2] + 0.5 * velocity[2] * uniforms.deltaTOverC,
          fourPosition[3] + 0.5 * uniforms.deltaTOverC
        ]

        const intermediatePosition = intermediateFourPosition.slice(0,3);
        
        

        var E = uniforms.lattice.getE(intermediatePosition)
        var B = uniforms.lattice.getB(intermediatePosition)
        var gamma = 1
        var u = [0, 1, 2].map(function (x, i) {
          return this[x]
        }, fourVelocity)
        if (initialData.particleTypes[p] > 0) {
          const { mass__eVc_2, charge__qe, chargeMassRatio__Ckg_1 } =
            LIST[initialData.particleTypes[p]]

          var hdtc_m = (chargeMassRatio__Ckg_1 * uniforms.deltaTOverC) / C / 2
          u = [u[0] + hdtc_m * E[0], u[1] + hdtc_m * E[1], u[2] + hdtc_m * E[2]]
          gamma = sqrt(
            1 +
              dot(
                [u[0] / C, u[1] / C, u[2] / C],
                [u[0] / C, u[1] / C, u[2] / C]
              )
          )
          var t_ = [
            (hdtc_m * B[0]) / gamma,
            (hdtc_m * B[1]) / gamma,
            (hdtc_m * B[2]) / gamma
          ]
          u = vec3.add([], u, cross(u, t_))
          var s_ = [
            (2.0 / (1.0 + t_[0] * t_[0])) * t_[0],
            (2.0 / (1.0 + t_[1] * t_[1])) * t_[1],
            (2.0 / (1.0 + t_[2] * t_[2])) * t_[2]
          ]
          u = vec3.add([], u, cross(u, s_))
          u = [u[0] + hdtc_m * E[0], u[1] + hdtc_m * E[1], u[2] + hdtc_m * E[2]]
          gamma = sqrt(
            1 +
              dot(
                [u[0] / C, u[1] / C, u[2] / C],
                [u[0] / C, u[1] / C, u[2] / C]
              )
          )
        }
        if (uniforms.boundingBoxSize > 0) {
          velocity =
            particleData.particleType > 0.1
              ? [u[0] / gamma / c, u[1] / gamma / c, u[2] / gamma / c]
              : velocity
          var nextPosition = [
            intermediatePosition[0] + 0.5 * velocity[0] * deltaTOverC,
            intermediatePosition[1] + 0.5 * velocity[1] * deltaTOverC,
            intermediatePosition[2] + 0.5 * velocity[2] * deltaTOverC
          ]
          var ref = reflection(
            nextPosition,
            [
              uniforms.boundingBoxCenter - +uniforms.boundingBoxSize,
              uniforms.boundingBoxCenter - +uniforms.boundingBoxSize,
              uniforms.boundingBoxCenter - +uniforms.boundingBoxSize
            ],
            [
              uniforms.boundingBoxCenter + +uniforms.boundingBoxSize,
              uniforms.boundingBoxCenter + +uniforms.boundingBoxSize,
              uniforms.boundingBoxCenter + +uniforms.boundingBoxSize
            ]
          )
          u = [u[0] * ref[0], u[1] * ref[1], u[2] * ref[2]]
        }

        const nextFourVelocity = [u[0], u[1], u[2], gamma * C]

        const nextVelocity = [
          nextFourVelocity[0] / nextFourVelocity[3],
          nextFourVelocity[1] / nextFourVelocity[3],
          nextFourVelocity[2] / nextFourVelocity[3]
        ]


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
