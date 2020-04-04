import sub from 'gl-vec3/subtract'
import normalize from 'gl-vec3/normalize'
import cross from 'gl-vec3/cross'
import lookAt from 'gl-mat4/lookAt'
import perspective from 'gl-mat4/perspective'

// eslint-disable-next-line no-unused-vars
export default function({ scenes, camera }, regl) {
  const guidedCamera = {
    mView: new Float32Array(16),
    mProj: new Float32Array(16),
    vSky: new Float32Array([0, 1, 0]),
    vEye: new Float32Array(3),
    pEye: new Float32Array(3),
    vUp: new Float32Array(3),
    pTarget: new Float32Array(3)
  }

  guidedCamera.toConfig = () => guidedCamera

  const fov = camera.fovY

  const setCameraUniforms = regl({
    uniforms: {
      eye: (context, { scene, activeSceneProgress }) => {
        guidedCamera.pEye = scene.cameraPositionBSpline(Math.min(activeSceneProgress, 1))
        guidedCamera.pTarget = scene.cameraTargetBSpline(Math.min(activeSceneProgress, 1))
        sub(guidedCamera.vEye, guidedCamera.pTarget, guidedCamera.pEye)
        return guidedCamera.pEye
      },
      view: (context, { scene, activeSceneProgress }) => {
        guidedCamera.pEye = scene.cameraPositionBSpline(Math.min(activeSceneProgress, 1))
        guidedCamera.pTarget = scene.cameraTargetBSpline(Math.min(activeSceneProgress, 1))

        sub(guidedCamera.vEye, guidedCamera.pTarget, guidedCamera.pEye)
        normalize(
          guidedCamera.vUp,
          cross(
            guidedCamera.vUp,
            cross(guidedCamera.vUp, guidedCamera.vEye, guidedCamera.vSky),
            guidedCamera.vEye
          )
        )

        lookAt(
          guidedCamera.mView,
          guidedCamera.pEye,
          guidedCamera.pTarget,
          guidedCamera.vUp
        )
        return guidedCamera.mView
      },
      projection: context => {
        const aspectRatio = context.viewportWidth / context.viewportHeight

        lookAt(
          guidedCamera.mView,
          guidedCamera.pEye,
          guidedCamera.pTarget,
          guidedCamera.vUp
        )
        perspective(
          guidedCamera.mProj,
          fov,
          aspectRatio,
          camera.near,
          camera.far
        )
        return guidedCamera.mProj
      }
    }
  })

  return [guidedCamera, setCameraUniforms]
}
