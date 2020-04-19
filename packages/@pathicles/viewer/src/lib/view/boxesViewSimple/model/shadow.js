// render point-light shadows into a cubemap
import { perspective, lookAt } from 'gl-mat4'

export default lightPosition => ({
  shadowViewMatrix_x: lookAt(
    [],
    lightPosition,
    [lightPosition[0] + 1.0, lightPosition[1], lightPosition[2]],
    [0.0, -1.0, 0.0]
  ),
  shadowViewMatrix_x_: lookAt(
    [],
    lightPosition,
    [lightPosition[0] - 1.0, lightPosition[1], lightPosition[2]],
    [0.0, -1.0, 0.0]
  ),
  shadowViewMatrix_y: lookAt(
    [],
    lightPosition,
    [lightPosition[0], lightPosition[1] + 1.0, lightPosition[2]],
    [0.0, 0.0, 1.0]
  ),
  shadowViewMatrix_y_: lookAt(
    [],
    lightPosition,
    [lightPosition[0], lightPosition[1] - 1.0, lightPosition[2]],
    [0.0, 0.0, -1.0]
  ),
  shadowViewMatrix_z: lookAt(
    [],
    lightPosition,
    [lightPosition[0], lightPosition[1], lightPosition[2] + 1.0],
    [0.0, -1.0, 0.0]
  ),
  shadowViewMatrix_z_: lookAt(
    [],
    lightPosition,
    [lightPosition[0], lightPosition[1], lightPosition[2] - 1.0],
    [0.0, -1.0, 0.0]
  ),

  shadowProjectionMatrix: perspective([], Math.PI / 2.0, 1.0, 0.25, 70.0)
})
