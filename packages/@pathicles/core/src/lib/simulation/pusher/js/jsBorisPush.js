/* eslint-disable */
import { PerformanceLogger } from '../../../utils/PerformanceLogger'

export function jsBorisPush({ runner, variables, model, debug, initialData }) {
  const performanceLogger = new PerformanceLogger()

  performanceLogger.entries = []

  // const positions = new Float32Array(variables.snapshotCount * variables.particleCount * 4)
  // positions.set(initialData.fourPositions.flat(), 0)

  // const velocities = new Float32Array(variables.snapshotCount * variables.particleCount * 4)
  // velocities.set(initialData.fourVelocities.flat(), 0)

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

        const velocity = [
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

        const nextFourVelocity = [
          fourVelocity[0],
          fourVelocity[1],
          fourVelocity[2],
          fourVelocity[3]
        ]

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

    //   uniforms: {
    //     snapshotCount: variables.snapshotCount,
    //     particleCount: variables.particleCount,
    //     iterationsPerSnapshot: variables.iterationsPerSnapshot,
    //     deltaTOverC: variables.iterationDurationOverC,

    //     particleInteraction: model.interactions.particleInteraction ? 1 : 0,
    //     electricField: model.interactions.electricField || [0, 0, 0],
    //     magneticField: model.interactions.magneticField || [0, 0, 1],

    //     boundingBoxSize: model.boundingBoxSize,
    //     boundingBoxCenter: model.boundingBoxCenter || [0, 1, 0],
    //     iteration: regl.prop('iteration'),
    //     takeSnapshot: regl.prop('takeSnapshot'),

    //     variableIdx: variableSlot,

    //     ut_particleChargesMassesChargeMassRatios: () =>
    //       variables.particleChargesMassesChargeMassRatios,
    //     ut_position: (context, props) =>
    //       variables.position.buffers[(props.iteration + 1) % 2],
    //     ut_velocity: (context, props) =>
    //       variables.velocity.buffers[(props.iteration + 1) % 2]
    //   }

    // vert,
    // frag: [
    //   frag
    //     .replace(
    //       '/*__latticeDefinition__*/',
    //       model.lattice.toGLSLDefinition()
    //     )
    //     .replace('/*__latticeChunkGLSL__*/', latticeChunkGLSL)
    //     .replace(
    //       '/*__latticeSize__*/',
    //       `const int BEAMLINE_ELEMENT_COUNT_OR_1 = ${
    //         model.lattice.beamline.length || 1
    //       }; const int BEAMLINE_ELEMENT_COUNT = ${
    //         model.lattice.beamline.length
    //       };`
    //     )
    // ].join('\n')
  }

  const push = pushFactory()

  return {
    push: (n = 1, profile = false) => {
      for (let i = 0; i < n; i++) {
        variables.iteration++
        // console.log(variables.iteration);
        variables.position.pingPong = variables.iteration % 2
        variables.velocity.pingPong = variables.iteration % 2

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
        for (let s = snapshots.length - 1; s >= 0; s--) {
          fourPositions.push(
            Array.from(snapshots[s].fourPositions.subarray(p * 4, p * 4 + 4))
          )
        }
      }
      // console.log(fourPositions);
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
