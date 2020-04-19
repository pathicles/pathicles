import buffer from 'buffer';

var subtract_1 = subtract;
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out
}

var normalize_1 = normalize;
function normalize(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out
}

var cross_1 = cross;
function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out
}

var identity_1 = identity;
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

var lookAt_1 = lookAt;
function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];
    if (Math.abs(eyex - centerx) < 0.000001 &&
        Math.abs(eyey - centery) < 0.000001 &&
        Math.abs(eyez - centerz) < 0.000001) {
        return identity_1(out);
    }
    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }
    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }
    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
}

var perspective_1 = perspective;
function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
}

function guidedCameraFactory({ scenes, camera }, regl) {
  const guidedCamera = {
    mView: new Float32Array(16),
    mProj: new Float32Array(16),
    vSky: new Float32Array([0, 1, 0]),
    vEye: new Float32Array(3),
    pEye: new Float32Array(3),
    vUp: new Float32Array(3),
    pTarget: new Float32Array(3)
  };
  guidedCamera.toConfig = () => guidedCamera;
  const fov = camera.fovY;
  const setCameraUniforms = regl({
    uniforms: {
      eye: (context, { scene, activeSceneProgress }) => {
        guidedCamera.pEye = scene.cameraPositionBSpline(
          Math.min(activeSceneProgress, 1)
        );
        guidedCamera.pTarget = scene.cameraTargetBSpline(
          Math.min(activeSceneProgress, 1)
        );
        subtract_1(guidedCamera.vEye, guidedCamera.pTarget, guidedCamera.pEye);
        return guidedCamera.pEye
      },
      view: (context, { scene, activeSceneProgress }) => {
        guidedCamera.pEye = scene.cameraPositionBSpline(
          Math.min(activeSceneProgress, 1)
        );
        guidedCamera.pTarget = scene.cameraTargetBSpline(
          Math.min(activeSceneProgress, 1)
        );
        subtract_1(guidedCamera.vEye, guidedCamera.pTarget, guidedCamera.pEye);
        normalize_1(
          guidedCamera.vUp,
          cross_1(
            guidedCamera.vUp,
            cross_1(guidedCamera.vUp, guidedCamera.vEye, guidedCamera.vSky),
            guidedCamera.vEye
          )
        );
        lookAt_1(
          guidedCamera.mView,
          guidedCamera.pEye,
          guidedCamera.pTarget,
          guidedCamera.vUp
        );
        return guidedCamera.mView
      },
      projection: context => {
        const aspectRatio = context.viewportWidth / context.viewportHeight;
        lookAt_1(
          guidedCamera.mView,
          guidedCamera.pEye,
          guidedCamera.pTarget,
          guidedCamera.vUp
        );
        perspective_1(
          guidedCamera.mProj,
          fov,
          aspectRatio,
          camera.near,
          camera.far
        );
        return guidedCamera.mProj
      }
    }
  });
  return [guidedCamera, setCameraUniforms]
}

function createCube(sx, sy, sz, nx, ny, nz) {
    if (sx === undefined) sx = 1.0;
    if (sy === undefined) sy = sx;
    if (sz === undefined) sz = sx;
    if (nx === undefined) nx = 1.0;
    if (ny === undefined) ny = nx;
    if (nz === undefined) nz = nx;
    var vertexIndex = 0;
    var positions = [];
    var normals = [];
    var uvs = [];
    var cells = [];
    function makePlane(u, v, w, su, sv, nu, nv, pw, flipu, flipv) {
        var vertShift = vertexIndex;
        for(var j=0; j<=nv; j++) {
            for(var i=0; i<=nu; i++) {
                var vert = positions[vertexIndex] = [0,0,0];
                vert[u] = (-su/2 + i*su/nu) * flipu;
                vert[v] = (-sv/2 + j*sv/nv) * flipv;
                vert[w] = pw;
                var normal = normals[vertexIndex] = [0,0,0];
                normal[u] = 0;
                normal[v] = 0;
                normal[w] = pw/Math.abs(pw);
                var texCoord = uvs[vertexIndex] = [0,0];
                texCoord[0] = i/nu;
                texCoord[1] = 1.0 - j/nv;
                ++vertexIndex;
            }
        }
        for(var j=0; j<nv; j++) {
            for(var i=0; i<nu; i++) {
                var n = vertShift + j * (nu + 1) + i;
                cells.push([n, n + nu  + 1, n + nu + 2]);
                cells.push([n, n + nu + 2, n + 1]);
            }
        }
    }
     makePlane(0, 1, 2, sx, sy, nx, ny,  sz/2,  1, -1);
     makePlane(0, 1, 2, sx, sy, nx, ny, -sz/2, -1, -1);
     makePlane(2, 1, 0, sz, sy, nz, ny, -sx/2,  1, -1);
     makePlane(2, 1, 0, sz, sy, nz, ny,  sx/2, -1, -1);
     makePlane(0, 2, 1, sx, sz, nx, nz,  sy/2,  1,  1);
     makePlane(0, 2, 1, sx, sz, nx, nz, -sy/2,  1, -1);
    return {
        positions: positions,
        normals: normals,
        uvs: uvs,
        cells: cells
    }
}
var primitiveCube = createCube;

var frag = "precision mediump float;\n#extension GL_OES_standard_derivatives : enable\n#define GLSLIFY 1\n\nuniform vec2 uResolution;\nuniform vec2 uSunPosition;\nvarying vec2 vUv;\nuniform vec3 eye;\nvarying vec3 vPosition;\n\nvec3 getSky(vec2 uv) {\n  float atmosphere = sqrt(1.0-uv.y);\n  vec3 skyColor = vec3(0.85, 0.85, 0.85);\n\n  float scatter = pow(uSunPosition.y / uResolution.y, 1.0 / 15.0);\n  scatter = 1.0 - clamp(scatter, 0.8, 1.0);\n\n  vec3 scatterColor = mix(vec3(1.0), vec3(1.0, 0.3, 0.0) * 1.5, scatter);\n  return mix(skyColor, vec3(scatterColor), atmosphere / 1.);\n\n}\n\nvec3 getSun(vec2 uv){\n  float sun = 1. - distance(uv, uSunPosition.xy / uResolution.x);\n  sun = clamp(sun, 0.0, 1.0);\n\n  float glow = sun;\n  glow = clamp(glow, 0.0, 1.0);\n\n  sun = pow(sun, 200.0);\n  sun *= 1.0;\n  sun = clamp(sun, 0.0, 1.0);\n\n  glow = pow(glow, 10.0) * 1.0;\n  glow = pow(glow, (uv.y));\n  glow = clamp(glow, 0.0, 1.0);\n\n  sun *= pow(dot(uv.y, uv.y), 1.0 / 1.65);\n\n  glow *= pow(dot(uv.y, uv.y), 1.0 / 2.0);\n\n  sun += glow;\n\n  vec3 sunColor = vec3(1.0, 1., 1.) * sun;\n\n  return vec3(sunColor);\n}\n\nfloat grid(vec2 st, float res){\n  vec2 grid = fract(st*res);\n  grid /= fwidth(st);\n  return 1. - (step(res, grid.x) * step(res, grid.y));\n}\n\nvoid main () {\n  vec3 sky = getSky(vUv);\n  vec3 sun = getSun(vUv);\n\n//\n//  float resolution = 1000.;\n//  vec2 grid_st = vUv * uResolution * resolution;\n//  vec3 color = vec3(.5);\n//  color += vec3(.5, .5, 0.) * grid(grid_st, 1. / resolution);\n//  color += vec3(0.2) * grid(grid_st, 10. / resolution);\n//\n//  float fogDistance = length(eye - vPosition);\n//\n//  gl_FragColor = vec4(color.rgb, exp(- fogDistance * FogDensity));\n\n    gl_FragColor = vec4(sky + sun, 1.);\n}\n"; // eslint-disable-line

var vert = "precision highp float;\n#define GLSLIFY 1\nvarying vec3 vPosition;\nvarying vec2 vUv;\nattribute vec3 aPosition;\nattribute vec2 uv;\n\nuniform mat4 projection;\nuniform mat4 model;\nuniform mat4 view;\n\nvoid main()\n{\n  vUv = uv;\n  vec4 worldPosition = model * vec4(aPosition, 1.0);\n  vPosition = worldPosition.xyz;\n  gl_Position = projection * view * model * vec4(aPosition, 1.0);\n}\n"; // eslint-disable-line

function drawBackgroundCommand(regl, { stageGrid }) {
  const stage = primitiveCube(stageGrid.size );
  let model = identity_1([]);
  return regl({
    primitive: 'triangles',
    elements: stage.cells,
    cull: {
      enable: true,
      face: 'front'
    },
    attributes: {
      aPosition: stage.positions,
      uv: stage.uvs
    },
    uniforms: {
      uResolution: [stageGrid.size, stageGrid.size],
      uSunPosition: context => [
        context.viewportHeight / 2,
        (context.viewportWidth / 4) * 3
      ],
      model
    },
    vert,
    frag
  })
}

var vert$1 = "precision highp float;\n#define GLSLIFY 1\nfloat inverse(float m) {\n  return 1.0 / m;\n}\n\nmat2 inverse(mat2 m) {\n  return mat2(m[1][1],-m[0][1],\n             -m[1][0], m[0][0]) / (m[0][0]*m[1][1] - m[0][1]*m[1][0]);\n}\n\nmat3 inverse(mat3 m) {\n  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2];\n  float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2];\n  float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2];\n\n  float b01 = a22 * a11 - a12 * a21;\n  float b11 = -a22 * a10 + a12 * a20;\n  float b21 = a21 * a10 - a11 * a20;\n\n  float det = a00 * b01 + a01 * b11 + a02 * b21;\n\n  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),\n              b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),\n              b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;\n}\n\nmat4 inverse(mat4 m) {\n  float\n      a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],\n      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],\n      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],\n      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],\n\n      b00 = a00 * a11 - a01 * a10,\n      b01 = a00 * a12 - a02 * a10,\n      b02 = a00 * a13 - a03 * a10,\n      b03 = a01 * a12 - a02 * a11,\n      b04 = a01 * a13 - a03 * a11,\n      b05 = a02 * a13 - a03 * a12,\n      b06 = a20 * a31 - a21 * a30,\n      b07 = a20 * a32 - a22 * a30,\n      b08 = a20 * a33 - a23 * a30,\n      b09 = a21 * a32 - a22 * a31,\n      b10 = a21 * a33 - a23 * a31,\n      b11 = a22 * a33 - a23 * a32,\n\n      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;\n\n  return mat4(\n      a11 * b11 - a12 * b10 + a13 * b09,\n      a02 * b10 - a01 * b11 - a03 * b09,\n      a31 * b05 - a32 * b04 + a33 * b03,\n      a22 * b04 - a21 * b05 - a23 * b03,\n      a12 * b08 - a10 * b11 - a13 * b07,\n      a00 * b11 - a02 * b08 + a03 * b07,\n      a32 * b02 - a30 * b05 - a33 * b01,\n      a20 * b05 - a22 * b02 + a23 * b01,\n      a10 * b10 - a11 * b08 + a13 * b06,\n      a01 * b08 - a00 * b10 - a03 * b06,\n      a30 * b04 - a31 * b02 + a33 * b00,\n      a21 * b02 - a20 * b04 - a23 * b00,\n      a11 * b07 - a10 * b09 - a12 * b06,\n      a00 * b09 - a01 * b07 + a02 * b06,\n      a31 * b01 - a30 * b03 - a32 * b00,\n      a20 * b03 - a21 * b01 + a22 * b00) / det;\n}\n\nfloat transpose(float m) {\n  return m;\n}\n\nmat2 transpose(mat2 m) {\n  return mat2(m[0][0], m[1][0],\n              m[0][1], m[1][1]);\n}\n\nmat3 transpose(mat3 m) {\n  return mat3(m[0][0], m[1][0], m[2][0],\n              m[0][1], m[1][1], m[2][1],\n              m[0][2], m[1][2], m[2][2]);\n}\n\nmat4 transpose(mat4 m) {\n  return mat4(m[0][0], m[1][0], m[2][0], m[3][0],\n              m[0][1], m[1][1], m[2][1], m[3][1],\n              m[0][2], m[1][2], m[2][2], m[3][2],\n              m[0][3], m[1][3], m[2][3], m[3][3]);\n}\n\nmat4 lookAt(vec3 eye, vec3 at, vec3 up) {\n  vec3 zaxis = normalize(eye - at);\n  vec3 xaxis = normalize(cross(zaxis, up));\n  vec3 yaxis = cross(xaxis, zaxis);\n  zaxis *= -1.;\n  return mat4(\n  vec4(xaxis.x, xaxis.y, xaxis.z, -dot(xaxis, eye)),\n  vec4(yaxis.x, yaxis.y, yaxis.z, -dot(yaxis, eye)),\n  vec4(zaxis.x, zaxis.y, zaxis.z, -dot(zaxis, eye)),\n  vec4(0, 0, 0, 1)\n  );\n}\n\nattribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aUV;\nattribute float aParticle;\nattribute float aColorCorrection;\nattribute float aStep;\n\nuniform float particleCount;\nuniform float bufferLength;\nuniform float stepCount;\n\nuniform float dt;\nuniform vec2 viewRange;\n\nuniform float pathicleWidth;\nuniform float pathicleGap;\nuniform float stageGrid_y;\nuniform float stageGrid_size;\nuniform vec3 shadowColor;\nuniform vec4 uLight;\n\nuniform sampler2D utParticleColorAndType;\nuniform sampler2D utPositionBuffer;\nuniform sampler2D utVelocityBuffer;\nuniform mat4 projection, view, model;\nuniform vec3 eye;\n\nuniform mat4 shadowViewMatrix_top;\nuniform mat4 shadowViewMatrix;\nuniform mat4 shadowProjectionMatrix;\nvarying vec4 vLightNDC;\n// Matrix to shift range from -1->1 to 0->1\nconst mat4 depthScaleMatrix = mat4(\n0.5, 0, 0, 0,\n0, 0.5, 0, 0,\n0, 0, 0.5, 0,\n0.5, 0.5, 0.5, 1\n);\n\nvarying float toBeDiscarded;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec2 vUv;\nvarying vec3 vAmbientColor;\nvarying vec3 vDiffuseColor;\n\nvarying float vColorCorrection;\n\nvec3 hemisphere_light(\n  vec3 normal,\n  vec3 sky,\n  vec3 ground,\n  vec3 lightDirection,\n  mat4 modelMatrix,\n  mat4 viewMatrix,\n  vec3 viewPosition,\n  float shininess,\n  float specularity\n) {\n  vec3 direction = normalize((\n  modelMatrix * vec4(lightDirection, 1.0)\n  ).xyz);\n\n  float weight = 0.5 * dot(\n  normal\n  , direction\n  ) + 0.5;\n\n  vec3 diffuse = mix(ground, sky, weight);\n\n  vec3 specDirection = normalize((\n  viewMatrix * modelMatrix * vec4(lightDirection, 1.0)\n  ).xyz);\n\n  float skyWeight = 0.5 * dot(\n  normal\n  , normalize(specDirection + viewPosition)\n  ) + 0.5;\n\n  float gndWeight = 0.5 * dot(\n  normal\n  , normalize(viewPosition - specDirection)\n  ) + 0.5;\n\n  vec3 specular = specularity * diffuse * (\n  max(pow(skyWeight, shininess), 0.0) +\n  max(pow(gndWeight, shininess), 0.0)\n  ) * weight;\n\n  return diffuse + specular;\n}\n\nvec4 get_color(float p) {\n  vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);\n  return texture2D(utParticleColorAndType, coords);\n}\nvec4 get_position(float p, float b) {\n  vec2 coords = vec2(p, b) / vec2(particleCount, bufferLength);\n  return texture2D(utPositionBuffer, coords);\n}\nfloat calculateToBeDiscarded(vec4 previousFourPosition, vec4 currentFourPosition) {\n\n  float undefinedBuffer = (currentFourPosition.w == 0. || previousFourPosition.w > currentFourPosition.w) ? 1.0 : 0.0;\n  float beyondProgressLower = (currentFourPosition.w / dt < viewRange[0] * stepCount) ? 1.0 : 0.0;\n  float beyondProgressUpper =  (currentFourPosition.w / dt > viewRange[1] * stepCount) ? 1.0 : 0.0;\n  float outsideGrid = (currentFourPosition.x > stageGrid_size || currentFourPosition.x < -stageGrid_size\n  || currentFourPosition.y > stageGrid_size || currentFourPosition.y < -stageGrid_size\n  || currentFourPosition.z > stageGrid_size || currentFourPosition.z < -stageGrid_size) ? 1.0 : 0.0;\n\n  return (outsideGrid > 0. || undefinedBuffer > 0. || beyondProgressLower > 0. || beyondProgressUpper > 0.) ? 1.0 : 0.0;\n\n}\n\nvoid main () {\n\n  vNormalOrig = aNormal;\n\n  float previousBufferHead = (aStep < 1.) ? bufferLength : aStep - 1.;\n  vec4 previousFourPosition = get_position(aParticle, previousBufferHead);\n  vec4 currentFourPosition = get_position(aParticle, aStep);\n\n  mat4 lookAtMat4 = lookAt(currentFourPosition.xyz, previousFourPosition.xyz, vec3(0., 1, 0.));\n\n  float scale = 1.;\n  float shadowProjectionScale = 1.;\n  #ifdef shadow\n  scale = 1.;\n  shadowProjectionScale = .1;\n  #endif\n\n  vec3 scaledPosition = vec3(\n    scale * aPosition.x,\n    aPosition.y * shadowProjectionScale,\n    scale * aPosition.z * (length(previousFourPosition.xyz - currentFourPosition.xyz) - pathicleGap));\n\n  vPosition = vec3(1., 1., 1.) * (((lookAtMat4 * vec4(scaledPosition, 1.)).xyz\n  + 0.5 * (currentFourPosition.xyz + previousFourPosition.xyz)));\n\n  vNormal = normalize((transpose(inverse(lookAtMat4)) * vec4(aNormal, 0.)).xyz);\n\n  vUv = aUV;\n\n#ifdef lighting\n\n  vDiffuseColor = get_color(aParticle).rgb;\n  float maxDistance = 4.;\n  vColorCorrection += vNormalOrig.z * vNormalOrig.z * .5;\n  vLightNDC = depthScaleMatrix * shadowProjectionMatrix * shadowViewMatrix_top * model * vec4(vPosition, 1.0);\n#endif\n\n#ifdef shadow\n    vPosition.y = stageGrid_y + 0.01 * abs(sin(aStep));\n    vDiffuseColor = shadowColor;\n//    if (aPosition.y < 0.) toBeDiscarded = 1.;\n#endif\n\n  toBeDiscarded = calculateToBeDiscarded(previousFourPosition, currentFourPosition);\n  gl_Position = projection * view * model * vec4(vPosition, 1.0);\n\n  gl_Position = projection * view * model * vec4(vPosition, 1.0);\n}\n\n"; // eslint-disable-line

var frag$1 = "precision highp float;\n#define GLSLIFY 1\n\nvarying float toBeDiscarded;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec2 vUv;\nvarying vec3 vAmbientColor;\nvarying vec3 vDiffuseColor;\nvarying float vColorCorrection;\n\nuniform vec3 lightPosition;\nuniform float ambientIntensity;\nuniform float stageGrid_size;\nuniform vec3 eye;\n\n#ifdef lighting\nvarying vec4 vLightNDC;\nuniform samplerCube shadowCube;\n#endif\nconst vec3 fogColor = vec3(1.0);\nconst float FogDensity = 0.7;\n\nvec4 packRGBA (float v) {\n  vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v);\n  pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;\n  return pack;\n}\nfloat unpackRGBA (vec4 v) {\n  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));\n}\n\nvoid main () {\n\n  if (toBeDiscarded > .0) discard;\n\n  //if (length(vPosition.z) > stageGrid_size/2. - .5) discard;\n//  vec3 hemisphereColor = hemisphere_light(vNormal, vec3(2., 2., 2.), vec3(.5,.5,.5), vec3(0.,1.,0.));\n\n//  vec3 materialColor = (1. + vColorCorrection) * vDiffuseColor;\n//  vec3 ambientColor = (ambientIntensity * vec3(1., 1., 1.) * materialColor).rgb;\n//  vec3 lightingColor = 3. * ambientColor;\n\n  float opacity = 1.;\n  #ifdef shadow\n  gl_FragColor = vec4(vDiffuseColor, .2/vPosition.z/vPosition.z); //vec4(lightingColor,\n  #endif\n\n#ifdef shadowCube\n\n   gl_FragColor = packRGBA(gl_FragCoord.z);\n\n#endif\n\n#ifdef lighting\n\n  float ambientLightAmount = .9;\n  float diffuseLightAmount = .5;\n\n  vec3 ambient = ambientLightAmount * vDiffuseColor;\n  vec3 diffuse = diffuseLightAmount * vDiffuseColor * clamp(dot(vNormal, normalize(vec3(10., 10., 10.))) , 0.0, 1.0 ) +\n                  diffuseLightAmount * vDiffuseColor * clamp(dot(vNormal, normalize(vec3(-10., 10., -10.))) , 0.0, 1.0 ) ;\n\n  float cosTheta2 = clamp(1. - 1. * cos(length(vPosition)) , .5, 2. );\n//  vec3 diffuse2 = 0.01 * vec3(1.) * clamp(cosTheta2 , 0.0, 1.0 ) ;\n  vec3 combinedDiffuse = clamp(diffuse * cosTheta2 , vec3(0.), vec3(1.));\n\n//  gl_FragColor =  vec4(pow( (1. - vColorCorrection) * (combinedDiffuse +  ambient), vec3(1.0/gamma)), 1.); //vec4(lightingColor, opacity);\n\n  vec3 texCoord = (vPosition - lightPosition);\n  float visibility = 0.0;\n   //do soft shadows:\n  for (int x = 0; x < 2; x++) {\n    for (int y = 0; y < 2; y++) {\n      for (int z = 0; z < 2; z++) {\n        float bias = 0.3;\n        vec4 env = textureCube(shadowCube, texCoord + vec3(x,y,z) * vec3(0.1));\n        vec3 lightPos = vLightNDC.xyz / vLightNDC.w;\n        float depth = lightPos.z - bias;\n        float occluder = unpackRGBA(textureCube(shadowCube, texCoord + vec3(x,y,z) * vec3(0.1)));\n\n        float shadow = mix(0.2, 1.0, step(depth, occluder));\n        visibility += shadow; //(env.x+bias) < (distance(vPosition, lightPos)) ? 0.0 : 1.0;\n      }\n    }\n  }\n  visibility *= 1.0 / 8.0;\n\n//  visibility = 1.0;\n\n  gl_FragColor =  vec4( visibility * (1. - 0.* vColorCorrection) * ( ambient), 1.);\n\n#endif  // lighting\n\n}\n\n"; // eslint-disable-line

var fromTranslation_1 = fromTranslation;
function fromTranslation(out, v) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = v[0];
  out[13] = v[1];
  out[14] = v[2];
  out[15] = 1;
  return out
}

var create_1 = create;
function create() {
    var out = new Float32Array(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

var clone_1 = clone;
function clone(a) {
    var out = new Float32Array(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}

var copy_1 = copy;
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}

var transpose_1 = transpose;
function transpose(out, a) {
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }
    return out;
}

var invert_1 = invert;
function invert(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    if (!det) {
        return null;
    }
    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
}

var adjoint_1 = adjoint;
function adjoint(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
}

var determinant_1 = determinant;
function determinant(a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}

var multiply_1 = multiply;
function multiply(out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
}

var translate_1 = translate;
function translate(out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;
    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];
        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;
        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }
    return out;
}

var scale_1 = scale;
function scale(out, a, v) {
    var x = v[0], y = v[1], z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}

var rotate_1 = rotate;
function rotate(out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;
    if (Math.abs(len) < 0.000001) { return null; }
    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;
    if (a !== out) {
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
}

var rotateX_1 = rotateX;
function rotateX(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    if (a !== out) {
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
}

var rotateY_1 = rotateY;
function rotateY(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    if (a !== out) {
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
}

var rotateZ_1 = rotateZ;
function rotateZ(out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    if (a !== out) {
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
}

var fromRotation_1 = fromRotation;
function fromRotation(out, rad, axis) {
  var s, c, t;
  var x = axis[0];
  var y = axis[1];
  var z = axis[2];
  var len = Math.sqrt(x * x + y * y + z * z);
  if (Math.abs(len) < 0.000001) {
    return null
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  out[0] = x * x * t + c;
  out[1] = y * x * t + z * s;
  out[2] = z * x * t - y * s;
  out[3] = 0;
  out[4] = x * y * t - z * s;
  out[5] = y * y * t + c;
  out[6] = z * y * t + x * s;
  out[7] = 0;
  out[8] = x * z * t + y * s;
  out[9] = y * z * t - x * s;
  out[10] = z * z * t + c;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out
}

var fromRotationTranslation_1 = fromRotationTranslation;
function fromRotationTranslation(out, q, v) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}

var fromScaling_1 = fromScaling;
function fromScaling(out, v) {
  out[0] = v[0];
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = v[1];
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = v[2];
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out
}

var fromXRotation_1 = fromXRotation;
function fromXRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out
}

var fromYRotation_1 = fromYRotation;
function fromYRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out
}

var fromZRotation_1 = fromZRotation;
function fromZRotation(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out
}

var fromQuat_1 = fromQuat;
function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,
        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

var frustum_1 = frustum;
function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
}

var perspectiveFromFieldOfView_1 = perspectiveFromFieldOfView;
function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);
    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}

var ortho_1 = ortho;
function ortho(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
}

var str_1 = str;
function str(a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
}

var glMat4 = {
  create: create_1
  , clone: clone_1
  , copy: copy_1
  , identity: identity_1
  , transpose: transpose_1
  , invert: invert_1
  , adjoint: adjoint_1
  , determinant: determinant_1
  , multiply: multiply_1
  , translate: translate_1
  , scale: scale_1
  , rotate: rotate_1
  , rotateX: rotateX_1
  , rotateY: rotateY_1
  , rotateZ: rotateZ_1
  , fromRotation: fromRotation_1
  , fromRotationTranslation: fromRotationTranslation_1
  , fromScaling: fromScaling_1
  , fromTranslation: fromTranslation_1
  , fromXRotation: fromXRotation_1
  , fromYRotation: fromYRotation_1
  , fromZRotation: fromZRotation_1
  , fromQuat: fromQuat_1
  , frustum: frustum_1
  , perspective: perspective_1
  , perspectiveFromFieldOfView: perspectiveFromFieldOfView_1
  , ortho: ortho_1
  , lookAt: lookAt_1
  , str: str_1
};
var glMat4_4 = glMat4.identity;
var glMat4_25 = glMat4.perspective;
var glMat4_28 = glMat4.lookAt;

var shadowBuilder = lightPosition => ({
  shadowViewMatrix_x: glMat4_28(
    [],
    lightPosition,
    [lightPosition[0] + 1.0, lightPosition[1], lightPosition[2]],
    [0.0, -1.0, 0.0]
  ),
  shadowViewMatrix_x_: glMat4_28(
    [],
    lightPosition,
    [lightPosition[0] - 1.0, lightPosition[1], lightPosition[2]],
    [0.0, -1.0, 0.0]
  ),
  shadowViewMatrix_y: glMat4_28(
    [],
    lightPosition,
    [lightPosition[0], lightPosition[1] + 1.0, lightPosition[2]],
    [0.0, 0.0, 1.0]
  ),
  shadowViewMatrix_y_: glMat4_28(
    [],
    lightPosition,
    [lightPosition[0], lightPosition[1] - 1.0, lightPosition[2]],
    [0.0, 0.0, -1.0]
  ),
  shadowViewMatrix_z: glMat4_28(
    [],
    lightPosition,
    [lightPosition[0], lightPosition[1], lightPosition[2] + 1.0],
    [0.0, -1.0, 0.0]
  ),
  shadowViewMatrix_z_: glMat4_28(
    [],
    lightPosition,
    [lightPosition[0], lightPosition[1], lightPosition[2] - 1.0],
    [0.0, -1.0, 0.0]
  ),
  shadowProjectionMatrix: glMat4_25([], Math.PI / 2.0, 1.0, 0.25, 70.0)
});

function drawModelCommands(regl, { variables, model, view }, cubeShadowFbo) {
  const createGeometry = ({ pathicleWidth, pathicleRelativeHeight }) =>
    primitiveCube(pathicleWidth, pathicleWidth * pathicleRelativeHeight, 1);
  const shadow = shadowBuilder(view.lightPosition);
  const geometry = createGeometry({
    pathicleWidth: view.pathicleWidth,
    pathicleRelativeHeight: view.pathicleRelativeHeight
  });
  Math.clip = function(number, min, max) {
    return Math.max(min, Math.min(number, max))
  };
  let modelMatrix = glMat4_4([]);
  const command = mode => {
    const framebuffer = {
      framebuffer: function(context, props, batchId) {
        return cubeShadowFbo.faces[batchId]
      }
    };
    return regl({
      depth: true,
      primitive: 'triangles',
      elements: geometry.cells,
      instances: () =>
        model.particleCount *
        Math.min(variables.tick.value, model.bufferLength),
      attributes: {
        aPosition: geometry.positions,
        aNormal: geometry.normals,
        aUV: geometry.uvs,
        aParticle: {
          buffer: regl.buffer(
            Array(model.particleCount * model.bufferLength)
              .fill(0)
              .map((_, i) => i % model.particleCount)
          ),
          divisor: 1
        },
        aColorCorrection: {
          buffer: regl.buffer(
            Array(model.particleCount * model.bufferLength)
              .fill(0)
              .map((_, i) => {
                const n = Math.sqrt(model.particleCount);
                const p = i % model.particleCount;
                const y = (p % Math.sqrt(model.particleCount)) - n / 2;
                return 1
              })
          ),
          divisor: 1
        },
        aStep: {
          buffer: regl.buffer(
            Array(model.particleCount * model.bufferLength)
              .fill(0)
              .map((_, i) => Math.floor(i / model.particleCount))
          ),
          divisor: 1
        }
      },
      vert: [`#define ${mode} 1`, vert$1].join('\n'),
      frag: [`#define ${mode} 1`, frag$1].join('\n'),
      ...(mode === 'shadowCube' && framebuffer),
      uniforms: {
        ...(mode === 'shadowCube' && {
          shadowViewMatrix: function(context, props, batchId) {
            switch (batchId) {
              case 0:
                return shadow.shadowViewMatrix_x
              case 1:
                return shadow.shadowViewMatrix_x_
              case 2:
                return shadow.shadowViewMatrix_y
              case 3:
                return shadow.shadowViewMatrix_y_
              case 4:
                return shadow.shadowViewMatrix_z
              case 5:
                return shadow.shadowViewMatrix_z_
            }
          }
        }),
        ...(mode === 'lighting' && { shadowCube: cubeShadowFbo }),
        uLight: [1, 1, 0, 1],
        ambientIntensity: view.ambientIntensity,
        utParticleColorAndType: () => variables.particleColorsAndTypes,
        utPositionBuffer: () => variables.position[0],
        viewRange: (ctx, props) => {
          return props.viewRange || [0, 1]
        },
        lightPosition: view.lightPosition,
        shadowProjectionMatrix: shadow.shadowProjectionMatrix,
        shadowViewMatrix_top: shadow.shadowViewMatrix_y_,
        stageGrid_y: view.stageGrid.y,
        shadowColor: view.shadowColor,
        stageGrid_size: view.stageGrid.size,
        model: (ctx, props) => {
          return fromTranslation_1(modelMatrix, [
            props.modelTranslateX || 0,
            props.modelTranslateY || 0,
            0
          ])
        }
      }
    })
  };
  return {
    lighting: command('lighting'),
    shadow: command('shadow'),
    shadowCube: command('shadowCube')
  }
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var INT_BITS = 32;
var INT_BITS_1  = INT_BITS;
var INT_MAX   =  0x7fffffff;
var INT_MIN   = -1<<(INT_BITS-1);
var sign = function(v) {
  return (v > 0) - (v < 0);
};
var abs = function(v) {
  var mask = v >> (INT_BITS-1);
  return (v ^ mask) - mask;
};
var min = function(x, y) {
  return y ^ ((x ^ y) & -(x < y));
};
var max = function(x, y) {
  return x ^ ((x ^ y) & -(x < y));
};
var isPow2 = function(v) {
  return !(v & (v-1)) && (!!v);
};
var log2 = function(v) {
  var r, shift;
  r =     (v > 0xFFFF) << 4; v >>>= r;
  shift = (v > 0xFF  ) << 3; v >>>= shift; r |= shift;
  shift = (v > 0xF   ) << 2; v >>>= shift; r |= shift;
  shift = (v > 0x3   ) << 1; v >>>= shift; r |= shift;
  return r | (v >> 1);
};
var log10 = function(v) {
  return  (v >= 1000000000) ? 9 : (v >= 100000000) ? 8 : (v >= 10000000) ? 7 :
          (v >= 1000000) ? 6 : (v >= 100000) ? 5 : (v >= 10000) ? 4 :
          (v >= 1000) ? 3 : (v >= 100) ? 2 : (v >= 10) ? 1 : 0;
};
var popCount = function(v) {
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
};
function countTrailingZeros(v) {
  var c = 32;
  v &= -v;
  if (v) c--;
  if (v & 0x0000FFFF) c -= 16;
  if (v & 0x00FF00FF) c -= 8;
  if (v & 0x0F0F0F0F) c -= 4;
  if (v & 0x33333333) c -= 2;
  if (v & 0x55555555) c -= 1;
  return c;
}
var countTrailingZeros_1 = countTrailingZeros;
var nextPow2 = function(v) {
  v += v === 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
};
var prevPow2 = function(v) {
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v - (v>>>1);
};
var parity = function(v) {
  v ^= v >>> 16;
  v ^= v >>> 8;
  v ^= v >>> 4;
  v &= 0xf;
  return (0x6996 >>> v) & 1;
};
var REVERSE_TABLE = new Array(256);
(function(tab) {
  for(var i=0; i<256; ++i) {
    var v = i, r = i, s = 7;
    for (v >>>= 1; v; v >>>= 1) {
      r <<= 1;
      r |= v & 1;
      --s;
    }
    tab[i] = (r << s) & 0xff;
  }
})(REVERSE_TABLE);
var reverse = function(v) {
  return  (REVERSE_TABLE[ v         & 0xff] << 24) |
          (REVERSE_TABLE[(v >>> 8)  & 0xff] << 16) |
          (REVERSE_TABLE[(v >>> 16) & 0xff] << 8)  |
           REVERSE_TABLE[(v >>> 24) & 0xff];
};
var interleave2 = function(x, y) {
  x &= 0xFFFF;
  x = (x | (x << 8)) & 0x00FF00FF;
  x = (x | (x << 4)) & 0x0F0F0F0F;
  x = (x | (x << 2)) & 0x33333333;
  x = (x | (x << 1)) & 0x55555555;
  y &= 0xFFFF;
  y = (y | (y << 8)) & 0x00FF00FF;
  y = (y | (y << 4)) & 0x0F0F0F0F;
  y = (y | (y << 2)) & 0x33333333;
  y = (y | (y << 1)) & 0x55555555;
  return x | (y << 1);
};
var deinterleave2 = function(v, n) {
  v = (v >>> n) & 0x55555555;
  v = (v | (v >>> 1))  & 0x33333333;
  v = (v | (v >>> 2))  & 0x0F0F0F0F;
  v = (v | (v >>> 4))  & 0x00FF00FF;
  v = (v | (v >>> 16)) & 0x000FFFF;
  return (v << 16) >> 16;
};
var interleave3 = function(x, y, z) {
  x &= 0x3FF;
  x  = (x | (x<<16)) & 4278190335;
  x  = (x | (x<<8))  & 251719695;
  x  = (x | (x<<4))  & 3272356035;
  x  = (x | (x<<2))  & 1227133513;
  y &= 0x3FF;
  y  = (y | (y<<16)) & 4278190335;
  y  = (y | (y<<8))  & 251719695;
  y  = (y | (y<<4))  & 3272356035;
  y  = (y | (y<<2))  & 1227133513;
  x |= (y << 1);
  z &= 0x3FF;
  z  = (z | (z<<16)) & 4278190335;
  z  = (z | (z<<8))  & 251719695;
  z  = (z | (z<<4))  & 3272356035;
  z  = (z | (z<<2))  & 1227133513;
  return x | (z << 2);
};
var deinterleave3 = function(v, n) {
  v = (v >>> n)       & 1227133513;
  v = (v | (v>>>2))   & 3272356035;
  v = (v | (v>>>4))   & 251719695;
  v = (v | (v>>>8))   & 4278190335;
  v = (v | (v>>>16))  & 0x3FF;
  return (v<<22)>>22;
};
var nextCombination = function(v) {
  var t = v | (v - 1);
  return (t + 1) | (((~t & -~t) - 1) >>> (countTrailingZeros(v) + 1));
};
var twiddle = {
	INT_BITS: INT_BITS_1,
	INT_MAX: INT_MAX,
	INT_MIN: INT_MIN,
	sign: sign,
	abs: abs,
	min: min,
	max: max,
	isPow2: isPow2,
	log2: log2,
	log10: log10,
	popCount: popCount,
	countTrailingZeros: countTrailingZeros_1,
	nextPow2: nextPow2,
	prevPow2: prevPow2,
	parity: parity,
	reverse: reverse,
	interleave2: interleave2,
	deinterleave2: deinterleave2,
	interleave3: interleave3,
	deinterleave3: deinterleave3,
	nextCombination: nextCombination
};

function dupe_array(count, value, i) {
  var c = count[i]|0;
  if(c <= 0) {
    return []
  }
  var result = new Array(c), j;
  if(i === count.length-1) {
    for(j=0; j<c; ++j) {
      result[j] = value;
    }
  } else {
    for(j=0; j<c; ++j) {
      result[j] = dupe_array(count, value, i+1);
    }
  }
  return result
}
function dupe_number(count, value) {
  var result, i;
  result = new Array(count);
  for(i=0; i<count; ++i) {
    result[i] = value;
  }
  return result
}
function dupe(count, value) {
  if(typeof value === "undefined") {
    value = 0;
  }
  switch(typeof count) {
    case "number":
      if(count > 0) {
        return dupe_number(count|0, value)
      }
    break
    case "object":
      if(typeof (count.length) === "number") {
        return dupe_array(count, value, 0)
      }
    break
  }
  return []
}
var dup = dupe;

var pool = createCommonjsModule(function (module, exports) {
var Buffer = buffer.Buffer;
if(!commonjsGlobal.__TYPEDARRAY_POOL) {
  commonjsGlobal.__TYPEDARRAY_POOL = {
      UINT8     : dup([32, 0])
    , UINT16    : dup([32, 0])
    , UINT32    : dup([32, 0])
    , BIGUINT64 : dup([32, 0])
    , INT8      : dup([32, 0])
    , INT16     : dup([32, 0])
    , INT32     : dup([32, 0])
    , BIGINT64  : dup([32, 0])
    , FLOAT     : dup([32, 0])
    , DOUBLE    : dup([32, 0])
    , DATA      : dup([32, 0])
    , UINT8C    : dup([32, 0])
    , BUFFER    : dup([32, 0])
  };
}
var hasUint8C = (typeof Uint8ClampedArray) !== 'undefined';
var hasBigUint64 = (typeof BigUint64Array) !== 'undefined';
var hasBigInt64 = (typeof BigInt64Array) !== 'undefined';
var POOL = commonjsGlobal.__TYPEDARRAY_POOL;
if(!POOL.UINT8C) {
  POOL.UINT8C = dup([32, 0]);
}
if(!POOL.BIGUINT64) {
  POOL.BIGUINT64 = dup([32, 0]);
}
if(!POOL.BIGINT64) {
  POOL.BIGINT64 = dup([32, 0]);
}
if(!POOL.BUFFER) {
  POOL.BUFFER = dup([32, 0]);
}
var DATA    = POOL.DATA
  , BUFFER  = POOL.BUFFER;
exports.free = function free(array) {
  if(Buffer.isBuffer(array)) {
    BUFFER[twiddle.log2(array.length)].push(array);
  } else {
    if(Object.prototype.toString.call(array) !== '[object ArrayBuffer]') {
      array = array.buffer;
    }
    if(!array) {
      return
    }
    var n = array.length || array.byteLength;
    var log_n = twiddle.log2(n)|0;
    DATA[log_n].push(array);
  }
};
function freeArrayBuffer(buffer) {
  if(!buffer) {
    return
  }
  var n = buffer.length || buffer.byteLength;
  var log_n = twiddle.log2(n);
  DATA[log_n].push(buffer);
}
function freeTypedArray(array) {
  freeArrayBuffer(array.buffer);
}
exports.freeUint8 =
exports.freeUint16 =
exports.freeUint32 =
exports.freeBigUint64 =
exports.freeInt8 =
exports.freeInt16 =
exports.freeInt32 =
exports.freeBigInt64 =
exports.freeFloat32 =
exports.freeFloat =
exports.freeFloat64 =
exports.freeDouble =
exports.freeUint8Clamped =
exports.freeDataView = freeTypedArray;
exports.freeArrayBuffer = freeArrayBuffer;
exports.freeBuffer = function freeBuffer(array) {
  BUFFER[twiddle.log2(array.length)].push(array);
};
exports.malloc = function malloc(n, dtype) {
  if(dtype === undefined || dtype === 'arraybuffer') {
    return mallocArrayBuffer(n)
  } else {
    switch(dtype) {
      case 'uint8':
        return mallocUint8(n)
      case 'uint16':
        return mallocUint16(n)
      case 'uint32':
        return mallocUint32(n)
      case 'int8':
        return mallocInt8(n)
      case 'int16':
        return mallocInt16(n)
      case 'int32':
        return mallocInt32(n)
      case 'float':
      case 'float32':
        return mallocFloat(n)
      case 'double':
      case 'float64':
        return mallocDouble(n)
      case 'uint8_clamped':
        return mallocUint8Clamped(n)
      case 'bigint64':
        return mallocBigInt64(n)
      case 'biguint64':
        return mallocBigUint64(n)
      case 'buffer':
        return mallocBuffer(n)
      case 'data':
      case 'dataview':
        return mallocDataView(n)
      default:
        return null
    }
  }
  return null
};
function mallocArrayBuffer(n) {
  var n = twiddle.nextPow2(n);
  var log_n = twiddle.log2(n);
  var d = DATA[log_n];
  if(d.length > 0) {
    return d.pop()
  }
  return new ArrayBuffer(n)
}
exports.mallocArrayBuffer = mallocArrayBuffer;
function mallocUint8(n) {
  return new Uint8Array(mallocArrayBuffer(n), 0, n)
}
exports.mallocUint8 = mallocUint8;
function mallocUint16(n) {
  return new Uint16Array(mallocArrayBuffer(2*n), 0, n)
}
exports.mallocUint16 = mallocUint16;
function mallocUint32(n) {
  return new Uint32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocUint32 = mallocUint32;
function mallocInt8(n) {
  return new Int8Array(mallocArrayBuffer(n), 0, n)
}
exports.mallocInt8 = mallocInt8;
function mallocInt16(n) {
  return new Int16Array(mallocArrayBuffer(2*n), 0, n)
}
exports.mallocInt16 = mallocInt16;
function mallocInt32(n) {
  return new Int32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocInt32 = mallocInt32;
function mallocFloat(n) {
  return new Float32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocFloat32 = exports.mallocFloat = mallocFloat;
function mallocDouble(n) {
  return new Float64Array(mallocArrayBuffer(8*n), 0, n)
}
exports.mallocFloat64 = exports.mallocDouble = mallocDouble;
function mallocUint8Clamped(n) {
  if(hasUint8C) {
    return new Uint8ClampedArray(mallocArrayBuffer(n), 0, n)
  } else {
    return mallocUint8(n)
  }
}
exports.mallocUint8Clamped = mallocUint8Clamped;
function mallocBigUint64(n) {
  if(hasBigUint64) {
    return new BigUint64Array(mallocArrayBuffer(8*n), 0, n)
  } else {
    return null;
  }
}
exports.mallocBigUint64 = mallocBigUint64;
function mallocBigInt64(n) {
  if (hasBigInt64) {
    return new BigInt64Array(mallocArrayBuffer(8*n), 0, n)
  } else {
    return null;
  }
}
exports.mallocBigInt64 = mallocBigInt64;
function mallocDataView(n) {
  return new DataView(mallocArrayBuffer(n), 0, n)
}
exports.mallocDataView = mallocDataView;
function mallocBuffer(n) {
  n = twiddle.nextPow2(n);
  var log_n = twiddle.log2(n);
  var cache = BUFFER[log_n];
  if(cache.length > 0) {
    return cache.pop()
  }
  return new Buffer(n)
}
exports.mallocBuffer = mallocBuffer;
exports.clearCache = function clearCache() {
  for(var i=0; i<32; ++i) {
    POOL.UINT8[i].length = 0;
    POOL.UINT16[i].length = 0;
    POOL.UINT32[i].length = 0;
    POOL.INT8[i].length = 0;
    POOL.INT16[i].length = 0;
    POOL.INT32[i].length = 0;
    POOL.FLOAT[i].length = 0;
    POOL.DOUBLE[i].length = 0;
    POOL.BIGUINT64[i].length = 0;
    POOL.BIGINT64[i].length = 0;
    POOL.UINT8C[i].length = 0;
    DATA[i].length = 0;
    BUFFER[i].length = 0;
  }
};
});
var pool_1 = pool.free;
var pool_2 = pool.freeUint8;
var pool_3 = pool.freeUint16;
var pool_4 = pool.freeUint32;
var pool_5 = pool.freeBigUint64;
var pool_6 = pool.freeInt8;
var pool_7 = pool.freeInt16;
var pool_8 = pool.freeInt32;
var pool_9 = pool.freeBigInt64;
var pool_10 = pool.freeFloat32;
var pool_11 = pool.freeFloat;
var pool_12 = pool.freeFloat64;
var pool_13 = pool.freeDouble;
var pool_14 = pool.freeUint8Clamped;
var pool_15 = pool.freeDataView;
var pool_16 = pool.freeArrayBuffer;
var pool_17 = pool.freeBuffer;
var pool_18 = pool.malloc;
var pool_19 = pool.mallocArrayBuffer;
var pool_20 = pool.mallocUint8;
var pool_21 = pool.mallocUint16;
var pool_22 = pool.mallocUint32;
var pool_23 = pool.mallocInt8;
var pool_24 = pool.mallocInt16;
var pool_25 = pool.mallocInt32;
var pool_26 = pool.mallocFloat32;
var pool_27 = pool.mallocFloat;
var pool_28 = pool.mallocFloat64;
var pool_29 = pool.mallocDouble;
var pool_30 = pool.mallocUint8Clamped;
var pool_31 = pool.mallocBigUint64;
var pool_32 = pool.mallocBigInt64;
var pool_33 = pool.mallocDataView;
var pool_34 = pool.mallocBuffer;
var pool_35 = pool.clearCache;

var contour = createSurfaceExtractor;
function array(i) {
  return "a" + i
}
function data(i) {
  return "d" + i
}
function cube(i,bitmask) {
  return "c" + i + "_" + bitmask
}
function shape(i) {
  return "s" + i
}
function stride(i,j) {
  return "t" + i + "_" + j
}
function offset(i) {
  return "o" + i
}
function scalar(i) {
  return "x" + i
}
function pointer(i) {
  return "p" + i
}
function delta(i,bitmask) {
  return "d" + i + "_" + bitmask
}
function index(i) {
  return "i" + i
}
function step(i,j) {
  return "u" + i + "_" + j
}
function pcube(bitmask) {
  return "b" + bitmask
}
function qcube(bitmask) {
  return "y" + bitmask
}
function pdelta(bitmask) {
  return "e" + bitmask
}
function vert$2(i) {
  return "v" + i
}
var VERTEX_IDS = "V";
var PHASES = "P";
var VERTEX_COUNT = "N";
var POOL_SIZE = "Q";
var POINTER = "X";
var TEMPORARY = "T";
function permBitmask(dimension, mask, order) {
  var r = 0;
  for(var i=0; i<dimension; ++i) {
    if(mask & (1<<i)) {
      r |= (1<<order[i]);
    }
  }
  return r
}
function compileSurfaceProcedure(vertexFunc, faceFunc, phaseFunc, scalarArgs, order, typesig) {
  var arrayArgs = typesig.length;
  var dimension = order.length;
  if(dimension < 2) {
    throw new Error("ndarray-extract-contour: Dimension must be at least 2")
  }
  var funcName = "extractContour" + order.join("_");
  var code = [];
  var vars = [];
  var args = [];
  for(var i=0; i<arrayArgs; ++i) {
    args.push(array(i));
  }
  for(var i=0; i<scalarArgs; ++i) {
    args.push(scalar(i));
  }
  for(var i=0; i<dimension; ++i) {
    vars.push(shape(i) + "=" + array(0) + ".shape[" + i + "]|0");
  }
  for(var i=0; i<arrayArgs; ++i) {
    vars.push(data(i) + "=" + array(i) + ".data",
              offset(i) + "=" + array(i) + ".offset|0");
    for(var j=0; j<dimension; ++j) {
      vars.push(stride(i,j) + "=" + array(i) + ".stride[" + j + "]|0");
    }
  }
  for(var i=0; i<arrayArgs; ++i) {
    vars.push(pointer(i) + "=" + offset(i));
    vars.push(cube(i,0));
    for(var j=1; j<(1<<dimension); ++j) {
      var ptrStr = [];
      for(var k=0; k<dimension; ++k) {
        if(j & (1<<k)) {
          ptrStr.push("-" + stride(i,k));
        }
      }
      vars.push(delta(i,j) + "=(" + ptrStr.join("") + ")|0");
      vars.push(cube(i,j) + "=0");
    }
  }
  for(var i=0; i<arrayArgs; ++i) {
    for(var j=0; j<dimension; ++j) {
      var stepVal = [ stride(i,order[j]) ];
      if(j > 0) {
        stepVal.push(stride(i, order[j-1]) + "*" + shape(order[j-1]) );
      }
      vars.push(step(i,order[j]) + "=(" + stepVal.join("-") + ")|0");
    }
  }
  for(var i=0; i<dimension; ++i) {
    vars.push(index(i) + "=0");
  }
  vars.push(VERTEX_COUNT + "=0");
  var sizeVariable = ["2"];
  for(var i=dimension-2; i>=0; --i) {
    sizeVariable.push(shape(order[i]));
  }
  vars.push(POOL_SIZE + "=(" + sizeVariable.join("*") + ")|0",
            PHASES + "=mallocUint32(" + POOL_SIZE + ")",
            VERTEX_IDS + "=mallocUint32(" + POOL_SIZE + ")",
            POINTER + "=0");
  vars.push(pcube(0) + "=0");
  for(var j=1; j<(1<<dimension); ++j) {
    var cubeDelta = [];
    var cubeStep = [ ];
    for(var k=0; k<dimension; ++k) {
      if(j & (1<<k)) {
        if(cubeStep.length === 0) {
          cubeDelta.push("1");
        } else {
          cubeDelta.unshift(cubeStep.join("*"));
        }
      }
      cubeStep.push(shape(order[k]));
    }
    var signFlag = "";
    if(cubeDelta[0].indexOf(shape(order[dimension-2])) < 0) {
      signFlag = "-";
    }
    var jperm = permBitmask(dimension, j, order);
    vars.push(pdelta(jperm) + "=(-" + cubeDelta.join("-") + ")|0",
              qcube(jperm) + "=(" + signFlag + cubeDelta.join("-") + ")|0",
              pcube(jperm) + "=0");
  }
  vars.push(vert$2(0) + "=0", TEMPORARY + "=0");
  function forLoopBegin(i, start) {
    code.push("for(", index(order[i]), "=", start, ";",
      index(order[i]), "<", shape(order[i]), ";",
      "++", index(order[i]), "){");
  }
  function forLoopEnd(i) {
    for(var j=0; j<arrayArgs; ++j) {
      code.push(pointer(j), "+=", step(j,order[i]), ";");
    }
    code.push("}");
  }
  function fillEmptySlice(k) {
    for(var i=k-1; i>=0; --i) {
      forLoopBegin(i, 0);
    }
    var phaseFuncArgs = [];
    for(var i=0; i<arrayArgs; ++i) {
      if(typesig[i]) {
        phaseFuncArgs.push(data(i) + ".get(" + pointer(i) + ")");
      } else {
        phaseFuncArgs.push(data(i) + "[" + pointer(i) + "]");
      }
    }
    for(var i=0; i<scalarArgs; ++i) {
      phaseFuncArgs.push(scalar(i));
    }
    code.push(PHASES, "[", POINTER, "++]=phase(", phaseFuncArgs.join(), ");");
    for(var i=0; i<k; ++i) {
      forLoopEnd(i);
    }
    for(var j=0; j<arrayArgs; ++j) {
      code.push(pointer(j), "+=", step(j,order[k]), ";");
    }
  }
  function processGridCell(mask) {
    for(var i=0; i<arrayArgs; ++i) {
      if(typesig[i]) {
        code.push(cube(i,0), "=", data(i), ".get(", pointer(i), ");");
      } else {
        code.push(cube(i,0), "=", data(i), "[", pointer(i), "];");
      }
    }
    var phaseFuncArgs = [];
    for(var i=0; i<arrayArgs; ++i) {
      phaseFuncArgs.push(cube(i,0));
    }
    for(var i=0; i<scalarArgs; ++i) {
      phaseFuncArgs.push(scalar(i));
    }
    code.push(pcube(0), "=", PHASES, "[", POINTER, "]=phase(", phaseFuncArgs.join(), ");");
    for(var j=1; j<(1<<dimension); ++j) {
      code.push(pcube(j), "=", PHASES, "[", POINTER, "+", pdelta(j), "];");
    }
    var vertexPredicate = [];
    for(var j=1; j<(1<<dimension); ++j) {
      vertexPredicate.push("(" + pcube(0) + "!==" + pcube(j) + ")");
    }
    code.push("if(", vertexPredicate.join("||"), "){");
    var vertexArgs = [];
    for(var i=0; i<dimension; ++i) {
      vertexArgs.push(index(i));
    }
    for(var i=0; i<arrayArgs; ++i) {
      vertexArgs.push(cube(i,0));
      for(var j=1; j<(1<<dimension); ++j) {
        if(typesig[i]) {
          code.push(cube(i,j), "=", data(i), ".get(", pointer(i), "+", delta(i,j), ");");
        } else {
          code.push(cube(i,j), "=", data(i), "[", pointer(i), "+", delta(i,j), "];");
        }
        vertexArgs.push(cube(i,j));
      }
    }
    for(var i=0; i<(1<<dimension); ++i) {
      vertexArgs.push(pcube(i));
    }
    for(var i=0; i<scalarArgs; ++i) {
      vertexArgs.push(scalar(i));
    }
    code.push("vertex(", vertexArgs.join(), ");",
      vert$2(0), "=", VERTEX_IDS, "[", POINTER, "]=", VERTEX_COUNT, "++;");
    var base = (1<<dimension)-1;
    var corner = pcube(base);
    for(var j=0; j<dimension; ++j) {
      if((mask & ~(1<<j))===0) {
        var subset = base^(1<<j);
        var edge = pcube(subset);
        var faceArgs = [ ];
        for(var k=subset; k>0; k=(k-1)&subset) {
          faceArgs.push(VERTEX_IDS + "[" + POINTER + "+" + pdelta(k) + "]");
        }
        faceArgs.push(vert$2(0));
        for(var k=0; k<arrayArgs; ++k) {
          if(j&1) {
            faceArgs.push(cube(k,base), cube(k,subset));
          } else {
            faceArgs.push(cube(k,subset), cube(k,base));
          }
        }
        if(j&1) {
          faceArgs.push(corner, edge);
        } else {
          faceArgs.push(edge, corner);
        }
        for(var k=0; k<scalarArgs; ++k) {
          faceArgs.push(scalar(k));
        }
        code.push("if(", corner, "!==", edge, "){",
          "face(", faceArgs.join(), ")}");
      }
    }
    code.push("}",
      POINTER, "+=1;");
  }
  function flip() {
    for(var j=1; j<(1<<dimension); ++j) {
      code.push(TEMPORARY, "=", pdelta(j), ";",
                pdelta(j), "=", qcube(j), ";",
                qcube(j), "=", TEMPORARY, ";");
    }
  }
  function createLoop(i, mask) {
    if(i < 0) {
      processGridCell(mask);
      return
    }
    fillEmptySlice(i);
    code.push("if(", shape(order[i]), ">0){",
      index(order[i]), "=1;");
    createLoop(i-1, mask|(1<<order[i]));
    for(var j=0; j<arrayArgs; ++j) {
      code.push(pointer(j), "+=", step(j,order[i]), ";");
    }
    if(i === dimension-1) {
      code.push(POINTER, "=0;");
      flip();
    }
    forLoopBegin(i, 2);
    createLoop(i-1, mask);
    if(i === dimension-1) {
      code.push("if(", index(order[dimension-1]), "&1){",
        POINTER, "=0;}");
      flip();
    }
    forLoopEnd(i);
    code.push("}");
  }
  createLoop(dimension-1, 0);
  code.push("freeUint32(", VERTEX_IDS, ");freeUint32(", PHASES, ");");
  var procedureCode = [
    "'use strict';",
    "function ", funcName, "(", args.join(), "){",
      "var ", vars.join(), ";",
      code.join(""),
    "}",
    "return ", funcName ].join("");
  var proc = new Function(
    "vertex",
    "face",
    "phase",
    "mallocUint32",
    "freeUint32",
    procedureCode);
  return proc(
    vertexFunc,
    faceFunc,
    phaseFunc,
    pool.mallocUint32,
    pool.freeUint32)
}
function createSurfaceExtractor(args) {
  function error(msg) {
    throw new Error("ndarray-extract-contour: " + msg)
  }
  if(typeof args !== "object") {
    error("Must specify arguments");
  }
  var order = args.order;
  if(!Array.isArray(order)) {
    error("Must specify order");
  }
  var arrays = args.arrayArguments||1;
  if(arrays < 1) {
    error("Must have at least one array argument");
  }
  var scalars = args.scalarArguments||0;
  if(scalars < 0) {
    error("Scalar arg count must be > 0");
  }
  if(typeof args.vertex !== "function") {
    error("Must specify vertex creation function");
  }
  if(typeof args.cell !== "function") {
    error("Must specify cell creation function");
  }
  if(typeof args.phase !== "function") {
    error("Must specify phase function");
  }
  var getters = args.getters || [];
  var typesig = new Array(arrays);
  for(var i=0; i<arrays; ++i) {
    if(getters.indexOf(i) >= 0) {
      typesig[i] = true;
    } else {
      typesig[i] = false;
    }
  }
  return compileSurfaceProcedure(
    args.vertex,
    args.cell,
    args.phase,
    scalars,
    order,
    typesig)
}

function invertPermutation(pi, result) {
  result = result || new Array(pi.length);
  for(var i=0; i<pi.length; ++i) {
    result[pi[i]] = i;
  }
  return result
}
var invertPermutation_1 = invertPermutation;

function rank(permutation) {
  var n = permutation.length;
  switch(n) {
    case 0:
    case 1:
      return 0
    case 2:
      return permutation[1]
  }
  var p = pool.mallocUint32(n);
  var pinv = pool.mallocUint32(n);
  var r = 0, s, t, i;
  invertPermutation_1(permutation, pinv);
  for(i=0; i<n; ++i) {
    p[i] = permutation[i];
  }
  for(i=n-1; i>0; --i) {
    t = pinv[i];
    s = p[i];
    p[i] = p[t];
    p[t] = s;
    pinv[i] = pinv[s];
    pinv[s] = t;
    r = (r + s) * i;
  }
  pool.freeUint32(pinv);
  pool.freeUint32(p);
  return r
}
function unrank(n, r, p) {
  switch(n) {
    case 0:
      if(p) { return p }
      return []
    case 1:
      if(p) {
        p[0] = 0;
        return p
      } else {
        return [0]
      }
    case 2:
      if(p) {
        if(r) {
          p[0] = 0;
          p[1] = 1;
        } else {
          p[0] = 1;
          p[1] = 0;
        }
        return p
      } else {
        return r ? [0,1] : [1,0]
      }
  }
  p = p || new Array(n);
  var s, t, i, nf=1;
  p[0] = 0;
  for(i=1; i<n; ++i) {
    p[i] = i;
    nf = (nf*i)|0;
  }
  for(i=n-1; i>0; --i) {
    s = (r / nf)|0;
    r = (r - s * nf)|0;
    nf = (nf / i)|0;
    t = p[i]|0;
    p[i] = p[s]|0;
    p[s] = t|0;
  }
  return p
}
var rank_1 = rank;
var unrank_1 = unrank;
var permutationRank = {
	rank: rank_1,
	unrank: unrank_1
};

var permutationSign_1 = permutationSign;
var BRUTE_FORCE_CUTOFF = 32;
function permutationSign(p) {
  var n = p.length;
  if(n < BRUTE_FORCE_CUTOFF) {
    var sgn = 1;
    for(var i=0; i<n; ++i) {
      for(var j=0; j<i; ++j) {
        if(p[i] < p[j]) {
          sgn = -sgn;
        } else if(p[i] === p[j]) {
          return 0
        }
      }
    }
    return sgn
  } else {
    var visited = pool.mallocUint8(n);
    for(var i=0; i<n; ++i) {
      visited[i] = 0;
    }
    var sgn = 1;
    for(var i=0; i<n; ++i) {
      if(!visited[i]) {
        var count = 1;
        visited[i] = 1;
        for(var j=p[i]; j!==i; j=p[j]) {
          if(visited[j]) {
            pool.freeUint8(visited);
            return 0
          }
          count += 1;
          visited[j] = 1;
        }
        if(!(count & 1)) {
          sgn = -sgn;
        }
      }
    }
    pool.freeUint8(visited);
    return sgn
  }
}

var g = 7;
var p = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
];
var g_ln = 607/128;
var p_ln = [
    0.99999999999999709182,
    57.156235665862923517,
    -59.597960355475491248,
    14.136097974741747174,
    -0.49191381609762019978,
    0.33994649984811888699e-4,
    0.46523628927048575665e-4,
    -0.98374475304879564677e-4,
    0.15808870322491248884e-3,
    -0.21026444172410488319e-3,
    0.21743961811521264320e-3,
    -0.16431810653676389022e-3,
    0.84418223983852743293e-4,
    -0.26190838401581408670e-4,
    0.36899182659531622704e-5
];
function lngamma(z) {
    if(z < 0) return Number('0/0');
    var x = p_ln[0];
    for(var i = p_ln.length - 1; i > 0; --i) x += p_ln[i] / (z + i);
    var t = z + g_ln + 0.5;
    return .5*Math.log(2*Math.PI)+(z+.5)*Math.log(t)-t+Math.log(x)-Math.log(z);
}
var gamma = function gamma (z) {
    if (z < 0.5) {
        return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    }
    else if(z > 100) return Math.exp(lngamma(z));
    else {
        z -= 1;
        var x = p[0];
        for (var i = 1; i < g + 2; i++) {
            x += p[i] / (z + i);
        }
        var t = z + g + 0.5;
        return Math.sqrt(2 * Math.PI)
            * Math.pow(t, z + 0.5)
            * Math.exp(-t)
            * x
        ;
    }
};
var log = lngamma;
gamma.log = log;

var triangulateCube_1 = triangulateCube;
function triangulateCube(dimension) {
  if(dimension < 0) {
    return [ ]
  }
  if(dimension === 0) {
    return [ [0] ]
  }
  var dfactorial = Math.round(gamma(dimension+1))|0;
  var result = [];
  for(var i=0; i<dfactorial; ++i) {
    var p = permutationRank.unrank(dimension, i);
    var cell = [ 0 ];
    var v = 0;
    for(var j=0; j<p.length; ++j) {
      v += (1<<p[j]);
      cell.push(v);
    }
    if(permutationSign_1(p) < 1) {
      cell[0] = v;
      cell[dimension] = 0;
    }
    result.push(cell);
  }
  return result
}

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0];
  for(var i=1; i<len; ++i) {
    b = a;
    a = list[i];
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++;
        continue
      }
      list[ptr++] = a;
    }
  }
  list.length = ptr;
  return list
}
function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0];
  for(var i=1; i<len; ++i, b=a) {
    b = a;
    a = list[i];
    if(a !== b) {
      if(i === ptr) {
        ptr++;
        continue
      }
      list[ptr++] = a;
    }
  }
  list.length = ptr;
  return list
}
function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare);
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort();
  }
  return unique_eq(list)
}
var uniq = unique;

function innerFill(order, proc, body) {
  var dimension = order.length
    , nargs = proc.arrayArgs.length
    , has_index = proc.indexArgs.length>0
    , code = []
    , vars = []
    , idx=0, pidx=0, i, j;
  for(i=0; i<dimension; ++i) {
    vars.push(["i",i,"=0"].join(""));
  }
  for(j=0; j<nargs; ++j) {
    for(i=0; i<dimension; ++i) {
      pidx = idx;
      idx = order[i];
      if(i === 0) {
        vars.push(["d",j,"s",i,"=t",j,"p",idx].join(""));
      } else {
        vars.push(["d",j,"s",i,"=(t",j,"p",idx,"-s",pidx,"*t",j,"p",pidx,")"].join(""));
      }
    }
  }
  if (vars.length > 0) {
    code.push("var " + vars.join(","));
  }
  for(i=dimension-1; i>=0; --i) {
    idx = order[i];
    code.push(["for(i",i,"=0;i",i,"<s",idx,";++i",i,"){"].join(""));
  }
  code.push(body);
  for(i=0; i<dimension; ++i) {
    pidx = idx;
    idx = order[i];
    for(j=0; j<nargs; ++j) {
      code.push(["p",j,"+=d",j,"s",i].join(""));
    }
    if(has_index) {
      if(i > 0) {
        code.push(["index[",pidx,"]-=s",pidx].join(""));
      }
      code.push(["++index[",idx,"]"].join(""));
    }
    code.push("}");
  }
  return code.join("\n")
}
function outerFill(matched, order, proc, body) {
  var dimension = order.length
    , nargs = proc.arrayArgs.length
    , blockSize = proc.blockSize
    , has_index = proc.indexArgs.length > 0
    , code = [];
  for(var i=0; i<nargs; ++i) {
    code.push(["var offset",i,"=p",i].join(""));
  }
  for(var i=matched; i<dimension; ++i) {
    code.push(["for(var j"+i+"=SS[", order[i], "]|0;j", i, ">0;){"].join(""));
    code.push(["if(j",i,"<",blockSize,"){"].join(""));
    code.push(["s",order[i],"=j",i].join(""));
    code.push(["j",i,"=0"].join(""));
    code.push(["}else{s",order[i],"=",blockSize].join(""));
    code.push(["j",i,"-=",blockSize,"}"].join(""));
    if(has_index) {
      code.push(["index[",order[i],"]=j",i].join(""));
    }
  }
  for(var i=0; i<nargs; ++i) {
    var indexStr = ["offset"+i];
    for(var j=matched; j<dimension; ++j) {
      indexStr.push(["j",j,"*t",i,"p",order[j]].join(""));
    }
    code.push(["p",i,"=(",indexStr.join("+"),")"].join(""));
  }
  code.push(innerFill(order, proc, body));
  for(var i=matched; i<dimension; ++i) {
    code.push("}");
  }
  return code.join("\n")
}
function countMatches(orders) {
  var matched = 0, dimension = orders[0].length;
  while(matched < dimension) {
    for(var j=1; j<orders.length; ++j) {
      if(orders[j][matched] !== orders[0][matched]) {
        return matched
      }
    }
    ++matched;
  }
  return matched
}
function processBlock(block, proc, dtypes) {
  var code = block.body;
  var pre = [];
  var post = [];
  for(var i=0; i<block.args.length; ++i) {
    var carg = block.args[i];
    if(carg.count <= 0) {
      continue
    }
    var re = new RegExp(carg.name, "g");
    var ptrStr = "";
    var arrNum = proc.arrayArgs.indexOf(i);
    switch(proc.argTypes[i]) {
      case "offset":
        var offArgIndex = proc.offsetArgIndex.indexOf(i);
        var offArg = proc.offsetArgs[offArgIndex];
        arrNum = offArg.array;
        ptrStr = "+q" + offArgIndex;
      case "array":
        ptrStr = "p" + arrNum + ptrStr;
        var localStr = "l" + i;
        var arrStr = "a" + arrNum;
        if (proc.arrayBlockIndices[arrNum] === 0) {
          if(carg.count === 1) {
            if(dtypes[arrNum] === "generic") {
              if(carg.lvalue) {
                pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join(""));
                code = code.replace(re, localStr);
                post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""));
              } else {
                code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""));
              }
            } else {
              code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""));
            }
          } else if(dtypes[arrNum] === "generic") {
            pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join(""));
            code = code.replace(re, localStr);
            if(carg.lvalue) {
              post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""));
            }
          } else {
            pre.push(["var ", localStr, "=", arrStr, "[", ptrStr, "]"].join(""));
            code = code.replace(re, localStr);
            if(carg.lvalue) {
              post.push([arrStr, "[", ptrStr, "]=", localStr].join(""));
            }
          }
        } else {
          var reStrArr = [carg.name], ptrStrArr = [ptrStr];
          for(var j=0; j<Math.abs(proc.arrayBlockIndices[arrNum]); j++) {
            reStrArr.push("\\s*\\[([^\\]]+)\\]");
            ptrStrArr.push("$" + (j+1) + "*t" + arrNum + "b" + j);
          }
          re = new RegExp(reStrArr.join(""), "g");
          ptrStr = ptrStrArr.join("+");
          if(dtypes[arrNum] === "generic") {
            throw new Error("cwise: Generic arrays not supported in combination with blocks!")
          } else {
            code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""));
          }
        }
      break
      case "scalar":
        code = code.replace(re, "Y" + proc.scalarArgs.indexOf(i));
      break
      case "index":
        code = code.replace(re, "index");
      break
      case "shape":
        code = code.replace(re, "shape");
      break
    }
  }
  return [pre.join("\n"), code, post.join("\n")].join("\n").trim()
}
function typeSummary(dtypes) {
  var summary = new Array(dtypes.length);
  var allEqual = true;
  for(var i=0; i<dtypes.length; ++i) {
    var t = dtypes[i];
    var digits = t.match(/\d+/);
    if(!digits) {
      digits = "";
    } else {
      digits = digits[0];
    }
    if(t.charAt(0) === 0) {
      summary[i] = "u" + t.charAt(1) + digits;
    } else {
      summary[i] = t.charAt(0) + digits;
    }
    if(i > 0) {
      allEqual = allEqual && summary[i] === summary[i-1];
    }
  }
  if(allEqual) {
    return summary[0]
  }
  return summary.join("")
}
function generateCWiseOp(proc, typesig) {
  var dimension = (typesig[1].length - Math.abs(proc.arrayBlockIndices[0]))|0;
  var orders = new Array(proc.arrayArgs.length);
  var dtypes = new Array(proc.arrayArgs.length);
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    dtypes[i] = typesig[2*i];
    orders[i] = typesig[2*i+1];
  }
  var blockBegin = [], blockEnd = [];
  var loopBegin = [], loopEnd = [];
  var loopOrders = [];
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    if (proc.arrayBlockIndices[i]<0) {
      loopBegin.push(0);
      loopEnd.push(dimension);
      blockBegin.push(dimension);
      blockEnd.push(dimension+proc.arrayBlockIndices[i]);
    } else {
      loopBegin.push(proc.arrayBlockIndices[i]);
      loopEnd.push(proc.arrayBlockIndices[i]+dimension);
      blockBegin.push(0);
      blockEnd.push(proc.arrayBlockIndices[i]);
    }
    var newOrder = [];
    for(var j=0; j<orders[i].length; j++) {
      if (loopBegin[i]<=orders[i][j] && orders[i][j]<loopEnd[i]) {
        newOrder.push(orders[i][j]-loopBegin[i]);
      }
    }
    loopOrders.push(newOrder);
  }
  var arglist = ["SS"];
  var code = ["'use strict'"];
  var vars = [];
  for(var j=0; j<dimension; ++j) {
    vars.push(["s", j, "=SS[", j, "]"].join(""));
  }
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    arglist.push("a"+i);
    arglist.push("t"+i);
    arglist.push("p"+i);
    for(var j=0; j<dimension; ++j) {
      vars.push(["t",i,"p",j,"=t",i,"[",loopBegin[i]+j,"]"].join(""));
    }
    for(var j=0; j<Math.abs(proc.arrayBlockIndices[i]); ++j) {
      vars.push(["t",i,"b",j,"=t",i,"[",blockBegin[i]+j,"]"].join(""));
    }
  }
  for(var i=0; i<proc.scalarArgs.length; ++i) {
    arglist.push("Y" + i);
  }
  if(proc.shapeArgs.length > 0) {
    vars.push("shape=SS.slice(0)");
  }
  if(proc.indexArgs.length > 0) {
    var zeros = new Array(dimension);
    for(var i=0; i<dimension; ++i) {
      zeros[i] = "0";
    }
    vars.push(["index=[", zeros.join(","), "]"].join(""));
  }
  for(var i=0; i<proc.offsetArgs.length; ++i) {
    var off_arg = proc.offsetArgs[i];
    var init_string = [];
    for(var j=0; j<off_arg.offset.length; ++j) {
      if(off_arg.offset[j] === 0) {
        continue
      } else if(off_arg.offset[j] === 1) {
        init_string.push(["t", off_arg.array, "p", j].join(""));
      } else {
        init_string.push([off_arg.offset[j], "*t", off_arg.array, "p", j].join(""));
      }
    }
    if(init_string.length === 0) {
      vars.push("q" + i + "=0");
    } else {
      vars.push(["q", i, "=", init_string.join("+")].join(""));
    }
  }
  var thisVars = uniq([].concat(proc.pre.thisVars)
                      .concat(proc.body.thisVars)
                      .concat(proc.post.thisVars));
  vars = vars.concat(thisVars);
  if (vars.length > 0) {
    code.push("var " + vars.join(","));
  }
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    code.push("p"+i+"|=0");
  }
  if(proc.pre.body.length > 3) {
    code.push(processBlock(proc.pre, proc, dtypes));
  }
  var body = processBlock(proc.body, proc, dtypes);
  var matched = countMatches(loopOrders);
  if(matched < dimension) {
    code.push(outerFill(matched, loopOrders[0], proc, body));
  } else {
    code.push(innerFill(loopOrders[0], proc, body));
  }
  if(proc.post.body.length > 3) {
    code.push(processBlock(proc.post, proc, dtypes));
  }
  if(proc.debug) {
    console.log("-----Generated cwise routine for ", typesig, ":\n" + code.join("\n") + "\n----------");
  }
  var loopName = [(proc.funcName||"unnamed"), "_cwise_loop_", orders[0].join("s"),"m",matched,typeSummary(dtypes)].join("");
  var f = new Function(["function ",loopName,"(", arglist.join(","),"){", code.join("\n"),"} return ", loopName].join(""));
  return f()
}
var compile = generateCWiseOp;

function createThunk(proc) {
  var code = ["'use strict'", "var CACHED={}"];
  var vars = [];
  var thunkName = proc.funcName + "_cwise_thunk";
  code.push(["return function ", thunkName, "(", proc.shimArgs.join(","), "){"].join(""));
  var typesig = [];
  var string_typesig = [];
  var proc_args = [["array",proc.arrayArgs[0],".shape.slice(",
                    Math.max(0,proc.arrayBlockIndices[0]),proc.arrayBlockIndices[0]<0?(","+proc.arrayBlockIndices[0]+")"):")"].join("")];
  var shapeLengthConditions = [], shapeConditions = [];
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    var j = proc.arrayArgs[i];
    vars.push(["t", j, "=array", j, ".dtype,",
               "r", j, "=array", j, ".order"].join(""));
    typesig.push("t" + j);
    typesig.push("r" + j);
    string_typesig.push("t"+j);
    string_typesig.push("r"+j+".join()");
    proc_args.push("array" + j + ".data");
    proc_args.push("array" + j + ".stride");
    proc_args.push("array" + j + ".offset|0");
    if (i>0) {
      shapeLengthConditions.push("array" + proc.arrayArgs[0] + ".shape.length===array" + j + ".shape.length+" + (Math.abs(proc.arrayBlockIndices[0])-Math.abs(proc.arrayBlockIndices[i])));
      shapeConditions.push("array" + proc.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0,proc.arrayBlockIndices[0]) + "]===array" + j + ".shape[shapeIndex+" + Math.max(0,proc.arrayBlockIndices[i]) + "]");
    }
  }
  if (proc.arrayArgs.length > 1) {
    code.push("if (!(" + shapeLengthConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')");
    code.push("for(var shapeIndex=array" + proc.arrayArgs[0] + ".shape.length-" + Math.abs(proc.arrayBlockIndices[0]) + "; shapeIndex-->0;) {");
    code.push("if (!(" + shapeConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')");
    code.push("}");
  }
  for(var i=0; i<proc.scalarArgs.length; ++i) {
    proc_args.push("scalar" + proc.scalarArgs[i]);
  }
  vars.push(["type=[", string_typesig.join(","), "].join()"].join(""));
  vars.push("proc=CACHED[type]");
  code.push("var " + vars.join(","));
  code.push(["if(!proc){",
             "CACHED[type]=proc=compile([", typesig.join(","), "])}",
             "return proc(", proc_args.join(","), ")}"].join(""));
  if(proc.debug) {
    console.log("-----Generated thunk:\n" + code.join("\n") + "\n----------");
  }
  var thunk = new Function("compile", code.join("\n"));
  return thunk(compile.bind(undefined, proc))
}
var thunk = createThunk;

function Procedure() {
  this.argTypes = [];
  this.shimArgs = [];
  this.arrayArgs = [];
  this.arrayBlockIndices = [];
  this.scalarArgs = [];
  this.offsetArgs = [];
  this.offsetArgIndex = [];
  this.indexArgs = [];
  this.shapeArgs = [];
  this.funcName = "";
  this.pre = null;
  this.body = null;
  this.post = null;
  this.debug = false;
}
function compileCwise(user_args) {
  var proc = new Procedure();
  proc.pre    = user_args.pre;
  proc.body   = user_args.body;
  proc.post   = user_args.post;
  var proc_args = user_args.args.slice(0);
  proc.argTypes = proc_args;
  for(var i=0; i<proc_args.length; ++i) {
    var arg_type = proc_args[i];
    if(arg_type === "array" || (typeof arg_type === "object" && arg_type.blockIndices)) {
      proc.argTypes[i] = "array";
      proc.arrayArgs.push(i);
      proc.arrayBlockIndices.push(arg_type.blockIndices ? arg_type.blockIndices : 0);
      proc.shimArgs.push("array" + i);
      if(i < proc.pre.args.length && proc.pre.args[i].count>0) {
        throw new Error("cwise: pre() block may not reference array args")
      }
      if(i < proc.post.args.length && proc.post.args[i].count>0) {
        throw new Error("cwise: post() block may not reference array args")
      }
    } else if(arg_type === "scalar") {
      proc.scalarArgs.push(i);
      proc.shimArgs.push("scalar" + i);
    } else if(arg_type === "index") {
      proc.indexArgs.push(i);
      if(i < proc.pre.args.length && proc.pre.args[i].count > 0) {
        throw new Error("cwise: pre() block may not reference array index")
      }
      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array index")
      }
      if(i < proc.post.args.length && proc.post.args[i].count > 0) {
        throw new Error("cwise: post() block may not reference array index")
      }
    } else if(arg_type === "shape") {
      proc.shapeArgs.push(i);
      if(i < proc.pre.args.length && proc.pre.args[i].lvalue) {
        throw new Error("cwise: pre() block may not write to array shape")
      }
      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array shape")
      }
      if(i < proc.post.args.length && proc.post.args[i].lvalue) {
        throw new Error("cwise: post() block may not write to array shape")
      }
    } else if(typeof arg_type === "object" && arg_type.offset) {
      proc.argTypes[i] = "offset";
      proc.offsetArgs.push({ array: arg_type.array, offset:arg_type.offset });
      proc.offsetArgIndex.push(i);
    } else {
      throw new Error("cwise: Unknown argument type " + proc_args[i])
    }
  }
  if(proc.arrayArgs.length <= 0) {
    throw new Error("cwise: No array arguments specified")
  }
  if(proc.pre.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in pre() block")
  }
  if(proc.body.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in body() block")
  }
  if(proc.post.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in post() block")
  }
  proc.debug = !!user_args.printCode || !!user_args.debug;
  proc.funcName = user_args.funcName || "cwise";
  proc.blockSize = user_args.blockSize || 64;
  return thunk(proc)
}
var compiler = compileCwise;

var zcCore = compiler({
    args: ['array', {
        offset: [1],
        array: 0
    }, 'scalar', 'scalar', 'index'],
    pre: {
        "body": "{}",
        "args": [],
        "thisVars": [],
        "localVars": []
    },
    post: {
        "body": "{}",
        "args": [],
        "thisVars": [],
        "localVars": []
    },
    body: {
        "body": "{\n        var _inline_1_da = _inline_1_arg0_ - _inline_1_arg3_\n        var _inline_1_db = _inline_1_arg1_ - _inline_1_arg3_\n        if((_inline_1_da >= 0) !== (_inline_1_db >= 0)) {\n          _inline_1_arg2_.push(_inline_1_arg4_[0] + 0.5 + 0.5 * (_inline_1_da + _inline_1_db) / (_inline_1_da - _inline_1_db))\n        }\n      }",
        "args": [{
            "name": "_inline_1_arg0_",
            "lvalue": false,
            "rvalue": true,
            "count": 1
        }, {
            "name": "_inline_1_arg1_",
            "lvalue": false,
            "rvalue": true,
            "count": 1
        }, {
            "name": "_inline_1_arg2_",
            "lvalue": false,
            "rvalue": true,
            "count": 1
        }, {
            "name": "_inline_1_arg3_",
            "lvalue": false,
            "rvalue": true,
            "count": 2
        }, {
            "name": "_inline_1_arg4_",
            "lvalue": false,
            "rvalue": true,
            "count": 1
        }],
        "thisVars": [],
        "localVars": ["_inline_1_da", "_inline_1_db"]
    },
    funcName: 'zeroCrossings'
});

var zc = findZeroCrossings;
function findZeroCrossings(array, level) {
  var cross = [];
  level = +level || 0.0;
  zcCore(array.hi(array.shape[0]-1), cross, level);
  return cross
}

var surfacenets = surfaceNets;
function buildSurfaceNets(order, dtype) {
  var dimension = order.length;
  var code = ["'use strict';"];
  var funcName = "surfaceNets" + order.join("_") + "d" + dtype;
  code.push(
    "var contour=genContour({",
      "order:[", order.join(), "],",
      "scalarArguments: 3,",
      "phase:function phaseFunc(p,a,b,c) { return (p > c)|0 },");
  if(dtype === "generic") {
    code.push("getters:[0],");
  }
  var cubeArgs = [];
  var extraArgs = [];
  for(var i=0; i<dimension; ++i) {
    cubeArgs.push("d" + i);
    extraArgs.push("d" + i);
  }
  for(var i=0; i<(1<<dimension); ++i) {
    cubeArgs.push("v" + i);
    extraArgs.push("v" + i);
  }
  for(var i=0; i<(1<<dimension); ++i) {
    cubeArgs.push("p" + i);
    extraArgs.push("p" + i);
  }
  cubeArgs.push("a", "b", "c");
  extraArgs.push("a", "c");
  code.push("vertex:function vertexFunc(", cubeArgs.join(), "){");
  var maskStr = [];
  for(var i=0; i<(1<<dimension); ++i) {
    maskStr.push("(p" + i + "<<" + i + ")");
  }
  code.push("var m=(", maskStr.join("+"), ")|0;if(m===0||m===", (1<<(1<<dimension))-1, "){return}");
  var extraFuncs = [];
  var currentFunc = [];
  if(1<<(1<<dimension) <= 128) {
    code.push("switch(m){");
    currentFunc = code;
  } else {
    code.push("switch(m>>>7){");
  }
  for(var i=0; i<1<<(1<<dimension); ++i) {
    if(1<<(1<<dimension) > 128) {
      if((i%128)===0) {
        if(extraFuncs.length > 0) {
          currentFunc.push("}}");
        }
        var efName = "vExtra" + extraFuncs.length;
        code.push("case ", (i>>>7), ":", efName, "(m&0x7f,", extraArgs.join(), ");break;");
        currentFunc = [
          "function ", efName, "(m,", extraArgs.join(), "){switch(m){"
        ];
        extraFuncs.push(currentFunc);
      }
    }
    currentFunc.push("case ", (i&0x7f), ":");
    var crossings = new Array(dimension);
    var denoms = new Array(dimension);
    var crossingCount = new Array(dimension);
    var bias = new Array(dimension);
    var totalCrossings = 0;
    for(var j=0; j<dimension; ++j) {
      crossings[j] = [];
      denoms[j] = [];
      crossingCount[j] = 0;
      bias[j] = 0;
    }
    for(var j=0; j<(1<<dimension); ++j) {
      for(var k=0; k<dimension; ++k) {
        var u = j ^ (1<<k);
        if(u > j) {
          continue
        }
        if(!(i&(1<<u)) !== !(i&(1<<j))) {
          var sign = 1;
          if(i&(1<<u)) {
            denoms[k].push("v" + u + "-v" + j);
          } else {
            denoms[k].push("v" + j + "-v" + u);
            sign = -sign;
          }
          if(sign < 0) {
            crossings[k].push("-v" + j + "-v" + u);
            crossingCount[k] += 2;
          } else {
            crossings[k].push("v" + j + "+v" + u);
            crossingCount[k] -= 2;
          }
          totalCrossings += 1;
          for(var l=0; l<dimension; ++l) {
            if(l === k) {
              continue
            }
            if(u&(1<<l)) {
              bias[l] += 1;
            } else {
              bias[l] -= 1;
            }
          }
        }
      }
    }
    var vertexStr = [];
    for(var k=0; k<dimension; ++k) {
      if(crossings[k].length === 0) {
        vertexStr.push("d" + k + "-0.5");
      } else {
        var cStr = "";
        if(crossingCount[k] < 0) {
          cStr = crossingCount[k] + "*c";
        } else if(crossingCount[k] > 0) {
          cStr = "+" + crossingCount[k] + "*c";
        }
        var weight = 0.5 * (crossings[k].length / totalCrossings);
        var shift = 0.5 + 0.5 * (bias[k] / totalCrossings);
        vertexStr.push("d" + k + "-" + shift + "-" + weight + "*(" + crossings[k].join("+") + cStr + ")/(" + denoms[k].join("+") + ")");
      }
    }
    currentFunc.push("a.push([", vertexStr.join(), "]);",
      "break;");
  }
  code.push("}},");
  if(extraFuncs.length > 0) {
    currentFunc.push("}}");
  }
  var faceArgs = [];
  for(var i=0; i<(1<<(dimension-1)); ++i) {
    faceArgs.push("v" + i);
  }
  faceArgs.push("c0", "c1", "p0", "p1", "a", "b", "c");
  code.push("cell:function cellFunc(", faceArgs.join(), "){");
  var facets = triangulateCube_1(dimension-1);
  code.push("if(p0){b.push(",
    facets.map(function(f) {
      return "[" + f.map(function(v) {
        return "v" + v
      }) + "]"
    }).join(), ")}else{b.push(",
    facets.map(function(f) {
      var e = f.slice();
      e.reverse();
      return "[" + e.map(function(v) {
        return "v" + v
      }) + "]"
    }).join(),
    ")}}});function ", funcName, "(array,level){var verts=[],cells=[];contour(array,verts,cells,level);return {positions:verts,cells:cells};} return ", funcName, ";");
  for(var i=0; i<extraFuncs.length; ++i) {
    code.push(extraFuncs[i].join(""));
  }
  var proc = new Function("genContour", code.join(""));
  return proc(contour)
}
function mesh1D(array, level) {
  var zc$1 = zc(array, level);
  var n = zc$1.length;
  var npos = new Array(n);
  var ncel = new Array(n);
  for(var i=0; i<n; ++i) {
    npos[i] = [ zc$1[i] ];
    ncel[i] = [ i ];
  }
  return {
    positions: npos,
    cells: ncel
  }
}
var CACHE = {};
function surfaceNets(array,level) {
  if(array.dimension <= 0) {
    return { positions: [], cells: [] }
  } else if(array.dimension === 1) {
    return mesh1D(array, level)
  }
  var typesig = array.order.join() + "-" + array.dtype;
  var proc = CACHE[typesig];
  var level = (+level) || 0.0;
  if(!proc) {
    proc = CACHE[typesig] = buildSurfaceNets(array.order, array.dtype);
  }
  return proc(array,level)
}

function iota(n) {
  var result = new Array(n);
  for(var i=0; i<n; ++i) {
    result[i] = i;
  }
  return result
}
var iota_1 = iota;

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var isBuffer_1 = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
};
function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

var hasTypedArrays  = ((typeof Float64Array) !== "undefined");
function compare1st(a, b) {
  return a[0] - b[0]
}
function order() {
  var stride = this.stride;
  var terms = new Array(stride.length);
  var i;
  for(i=0; i<terms.length; ++i) {
    terms[i] = [Math.abs(stride[i]), i];
  }
  terms.sort(compare1st);
  var result = new Array(terms.length);
  for(i=0; i<result.length; ++i) {
    result[i] = terms[i][1];
  }
  return result
}
function compileConstructor(dtype, dimension) {
  var className = ["View", dimension, "d", dtype].join("");
  if(dimension < 0) {
    className = "View_Nil" + dtype;
  }
  var useGetters = (dtype === "generic");
  if(dimension === -1) {
    var code =
      "function "+className+"(a){this.data=a;};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new "+className+"(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_"+className+"(a){return new "+className+"(a);}";
    var procedure = new Function(code);
    return procedure()
  } else if(dimension === 0) {
    var code =
      "function "+className+"(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function "+className+"_copy() {\
return new "+className+"(this.data,this.offset)\
};\
proto.pick=function "+className+"_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function "+className+"_get(){\
return "+(useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]")+
"};\
proto.set=function "+className+"_set(v){\
return "+(useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v")+"\
};\
return function construct_"+className+"(a,b,c,d){return new "+className+"(a,d)}";
    var procedure = new Function("TrivialArray", code);
    return procedure(CACHED_CONSTRUCTORS[dtype][0])
  }
  var code = ["'use strict'"];
  var indices = iota_1(dimension);
  var args = indices.map(function(i) { return "i"+i });
  var index_str = "this.offset+" + indices.map(function(i) {
        return "this.stride[" + i + "]*i" + i
      }).join("+");
  var shapeArg = indices.map(function(i) {
      return "b"+i
    }).join(",");
  var strideArg = indices.map(function(i) {
      return "c"+i
    }).join(",");
  code.push(
    "function "+className+"(a," + shapeArg + "," + strideArg + ",d){this.data=a",
      "this.shape=[" + shapeArg + "]",
      "this.stride=[" + strideArg + "]",
      "this.offset=d|0}",
    "var proto="+className+".prototype",
    "proto.dtype='"+dtype+"'",
    "proto.dimension="+dimension);
  code.push("Object.defineProperty(proto,'size',{get:function "+className+"_size(){\
return "+indices.map(function(i) { return "this.shape["+i+"]" }).join("*"),
"}})");
  if(dimension === 1) {
    code.push("proto.order=[0]");
  } else {
    code.push("Object.defineProperty(proto,'order',{get:");
    if(dimension < 4) {
      code.push("function "+className+"_order(){");
      if(dimension === 2) {
        code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})");
      } else if(dimension === 3) {
        code.push(
"var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})");
      }
    } else {
      code.push("ORDER})");
    }
  }
  code.push(
"proto.set=function "+className+"_set("+args.join(",")+",v){");
  if(useGetters) {
    code.push("return this.data.set("+index_str+",v)}");
  } else {
    code.push("return this.data["+index_str+"]=v}");
  }
  code.push("proto.get=function "+className+"_get("+args.join(",")+"){");
  if(useGetters) {
    code.push("return this.data.get("+index_str+")}");
  } else {
    code.push("return this.data["+index_str+"]}");
  }
  code.push(
    "proto.index=function "+className+"_index(", args.join(), "){return "+index_str+"}");
  code.push("proto.hi=function "+className+"_hi("+args.join(",")+"){return new "+className+"(this.data,"+
    indices.map(function(i) {
      return ["(typeof i",i,"!=='number'||i",i,"<0)?this.shape[", i, "]:i", i,"|0"].join("")
    }).join(",")+","+
    indices.map(function(i) {
      return "this.stride["+i + "]"
    }).join(",")+",this.offset)}");
  var a_vars = indices.map(function(i) { return "a"+i+"=this.shape["+i+"]" });
  var c_vars = indices.map(function(i) { return "c"+i+"=this.stride["+i+"]" });
  code.push("proto.lo=function "+className+"_lo("+args.join(",")+"){var b=this.offset,d=0,"+a_vars.join(",")+","+c_vars.join(","));
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'&&i"+i+">=0){\
d=i"+i+"|0;\
b+=c"+i+"*d;\
a"+i+"-=d}");
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a"+i
    }).join(",")+","+
    indices.map(function(i) {
      return "c"+i
    }).join(",")+",b)}");
  code.push("proto.step=function "+className+"_step("+args.join(",")+"){var "+
    indices.map(function(i) {
      return "a"+i+"=this.shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "b"+i+"=this.stride["+i+"]"
    }).join(",")+",c=this.offset,d=0,ceil=Math.ceil");
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'){\
d=i"+i+"|0;\
if(d<0){\
c+=b"+i+"*(a"+i+"-1);\
a"+i+"=ceil(-a"+i+"/d)\
}else{\
a"+i+"=ceil(a"+i+"/d)\
}\
b"+i+"*=d\
}");
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a" + i
    }).join(",")+","+
    indices.map(function(i) {
      return "b" + i
    }).join(",")+",c)}");
  var tShape = new Array(dimension);
  var tStride = new Array(dimension);
  for(var i=0; i<dimension; ++i) {
    tShape[i] = "a[i"+i+"]";
    tStride[i] = "b[i"+i+"]";
  }
  code.push("proto.transpose=function "+className+"_transpose("+args+"){"+
    args.map(function(n,idx) { return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)"}).join(";"),
    "var a=this.shape,b=this.stride;return new "+className+"(this.data,"+tShape.join(",")+","+tStride.join(",")+",this.offset)}");
  code.push("proto.pick=function "+className+"_pick("+args+"){var a=[],b=[],c=this.offset");
  for(var i=0; i<dimension; ++i) {
    code.push("if(typeof i"+i+"==='number'&&i"+i+">=0){c=(c+this.stride["+i+"]*i"+i+")|0}else{a.push(this.shape["+i+"]);b.push(this.stride["+i+"])}");
  }
  code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}");
  code.push("return function construct_"+className+"(data,shape,stride,offset){return new "+className+"(data,"+
    indices.map(function(i) {
      return "shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "stride["+i+"]"
    }).join(",")+",offset)}");
  var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"));
  return procedure(CACHED_CONSTRUCTORS[dtype], order)
}
function arrayDType(data) {
  if(isBuffer_1(data)) {
    return "buffer"
  }
  if(hasTypedArrays) {
    switch(Object.prototype.toString.call(data)) {
      case "[object Float64Array]":
        return "float64"
      case "[object Float32Array]":
        return "float32"
      case "[object Int8Array]":
        return "int8"
      case "[object Int16Array]":
        return "int16"
      case "[object Int32Array]":
        return "int32"
      case "[object Uint8Array]":
        return "uint8"
      case "[object Uint16Array]":
        return "uint16"
      case "[object Uint32Array]":
        return "uint32"
      case "[object Uint8ClampedArray]":
        return "uint8_clamped"
      case "[object BigInt64Array]":
        return "bigint64"
      case "[object BigUint64Array]":
        return "biguint64"
    }
  }
  if(Array.isArray(data)) {
    return "array"
  }
  return "generic"
}
var CACHED_CONSTRUCTORS = {
  "float32":[],
  "float64":[],
  "int8":[],
  "int16":[],
  "int32":[],
  "uint8":[],
  "uint16":[],
  "uint32":[],
  "array":[],
  "uint8_clamped":[],
  "bigint64": [],
  "biguint64": [],
  "buffer":[],
  "generic":[]
}
;function wrappedNDArrayCtor(data, shape, stride, offset) {
  if(data === undefined) {
    var ctor = CACHED_CONSTRUCTORS.array[0];
    return ctor([])
  } else if(typeof data === "number") {
    data = [data];
  }
  if(shape === undefined) {
    shape = [ data.length ];
  }
  var d = shape.length;
  if(stride === undefined) {
    stride = new Array(d);
    for(var i=d-1, sz=1; i>=0; --i) {
      stride[i] = sz;
      sz *= shape[i];
    }
  }
  if(offset === undefined) {
    offset = 0;
    for(var i=0; i<d; ++i) {
      if(stride[i] < 0) {
        offset -= (shape[i]-1)*stride[i];
      }
    }
  }
  var dtype = arrayDType(data);
  var ctor_list = CACHED_CONSTRUCTORS[dtype];
  while(ctor_list.length <= d+1) {
    ctor_list.push(compileConstructor(dtype, ctor_list.length-1));
  }
  var ctor = ctor_list[d+1];
  return ctor(data, shape, stride, offset)
}
var ndarray = wrappedNDArrayCtor;

var twoProduct_1 = twoProduct;
var SPLITTER = +(Math.pow(2, 27) + 1.0);
function twoProduct(a, b, result) {
  var x = a * b;
  var c = SPLITTER * a;
  var abig = c - a;
  var ahi = c - abig;
  var alo = a - ahi;
  var d = SPLITTER * b;
  var bbig = d - b;
  var bhi = d - bbig;
  var blo = b - bhi;
  var err1 = x - (ahi * bhi);
  var err2 = err1 - (alo * bhi);
  var err3 = err2 - (ahi * blo);
  var y = alo * blo - err3;
  if(result) {
    result[0] = y;
    result[1] = x;
    return result
  }
  return [ y, x ]
}

var robustSum = linearExpansionSum;
function scalarScalar(a, b) {
  var x = a + b;
  var bv = x - a;
  var av = x - bv;
  var br = b - bv;
  var ar = a - av;
  var y = ar + br;
  if(y) {
    return [y, x]
  }
  return [x]
}
function linearExpansionSum(e, f) {
  var ne = e.length|0;
  var nf = f.length|0;
  if(ne === 1 && nf === 1) {
    return scalarScalar(e[0], f[0])
  }
  var n = ne + nf;
  var g = new Array(n);
  var count = 0;
  var eptr = 0;
  var fptr = 0;
  var abs = Math.abs;
  var ei = e[eptr];
  var ea = abs(ei);
  var fi = f[fptr];
  var fa = abs(fi);
  var a, b;
  if(ea < fa) {
    b = ei;
    eptr += 1;
    if(eptr < ne) {
      ei = e[eptr];
      ea = abs(ei);
    }
  } else {
    b = fi;
    fptr += 1;
    if(fptr < nf) {
      fi = f[fptr];
      fa = abs(fi);
    }
  }
  if((eptr < ne && ea < fa) || (fptr >= nf)) {
    a = ei;
    eptr += 1;
    if(eptr < ne) {
      ei = e[eptr];
      ea = abs(ei);
    }
  } else {
    a = fi;
    fptr += 1;
    if(fptr < nf) {
      fi = f[fptr];
      fa = abs(fi);
    }
  }
  var x = a + b;
  var bv = x - a;
  var y = b - bv;
  var q0 = y;
  var q1 = x;
  var _x, _bv, _av, _br, _ar;
  while(eptr < ne && fptr < nf) {
    if(ea < fa) {
      a = ei;
      eptr += 1;
      if(eptr < ne) {
        ei = e[eptr];
        ea = abs(ei);
      }
    } else {
      a = fi;
      fptr += 1;
      if(fptr < nf) {
        fi = f[fptr];
        fa = abs(fi);
      }
    }
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if(y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
  }
  while(eptr < ne) {
    a = ei;
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if(y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
    eptr += 1;
    if(eptr < ne) {
      ei = e[eptr];
    }
  }
  while(fptr < nf) {
    a = fi;
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if(y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
    fptr += 1;
    if(fptr < nf) {
      fi = f[fptr];
    }
  }
  if(q0) {
    g[count++] = q0;
  }
  if(q1) {
    g[count++] = q1;
  }
  if(!count) {
    g[count++] = 0.0;
  }
  g.length = count;
  return g
}

var twoSum = fastTwoSum;
function fastTwoSum(a, b, result) {
	var x = a + b;
	var bv = x - a;
	var av = x - bv;
	var br = b - bv;
	var ar = a - av;
	if(result) {
		result[0] = ar + br;
		result[1] = x;
		return result
	}
	return [ar+br, x]
}

var robustScale = scaleLinearExpansion;
function scaleLinearExpansion(e, scale) {
  var n = e.length;
  if(n === 1) {
    var ts = twoProduct_1(e[0], scale);
    if(ts[0]) {
      return ts
    }
    return [ ts[1] ]
  }
  var g = new Array(2 * n);
  var q = [0.1, 0.1];
  var t = [0.1, 0.1];
  var count = 0;
  twoProduct_1(e[0], scale, q);
  if(q[0]) {
    g[count++] = q[0];
  }
  for(var i=1; i<n; ++i) {
    twoProduct_1(e[i], scale, t);
    var pq = q[1];
    twoSum(pq, t[0], q);
    if(q[0]) {
      g[count++] = q[0];
    }
    var a = t[1];
    var b = q[1];
    var x = a + b;
    var bv = x - a;
    var y = b - bv;
    q[1] = x;
    if(y) {
      g[count++] = y;
    }
  }
  if(q[1]) {
    g[count++] = q[1];
  }
  if(count === 0) {
    g[count++] = 0.0;
  }
  g.length = count;
  return g
}

var robustDiff = robustSubtract;
function scalarScalar$1(a, b) {
  var x = a + b;
  var bv = x - a;
  var av = x - bv;
  var br = b - bv;
  var ar = a - av;
  var y = ar + br;
  if(y) {
    return [y, x]
  }
  return [x]
}
function robustSubtract(e, f) {
  var ne = e.length|0;
  var nf = f.length|0;
  if(ne === 1 && nf === 1) {
    return scalarScalar$1(e[0], -f[0])
  }
  var n = ne + nf;
  var g = new Array(n);
  var count = 0;
  var eptr = 0;
  var fptr = 0;
  var abs = Math.abs;
  var ei = e[eptr];
  var ea = abs(ei);
  var fi = -f[fptr];
  var fa = abs(fi);
  var a, b;
  if(ea < fa) {
    b = ei;
    eptr += 1;
    if(eptr < ne) {
      ei = e[eptr];
      ea = abs(ei);
    }
  } else {
    b = fi;
    fptr += 1;
    if(fptr < nf) {
      fi = -f[fptr];
      fa = abs(fi);
    }
  }
  if((eptr < ne && ea < fa) || (fptr >= nf)) {
    a = ei;
    eptr += 1;
    if(eptr < ne) {
      ei = e[eptr];
      ea = abs(ei);
    }
  } else {
    a = fi;
    fptr += 1;
    if(fptr < nf) {
      fi = -f[fptr];
      fa = abs(fi);
    }
  }
  var x = a + b;
  var bv = x - a;
  var y = b - bv;
  var q0 = y;
  var q1 = x;
  var _x, _bv, _av, _br, _ar;
  while(eptr < ne && fptr < nf) {
    if(ea < fa) {
      a = ei;
      eptr += 1;
      if(eptr < ne) {
        ei = e[eptr];
        ea = abs(ei);
      }
    } else {
      a = fi;
      fptr += 1;
      if(fptr < nf) {
        fi = -f[fptr];
        fa = abs(fi);
      }
    }
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if(y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
  }
  while(eptr < ne) {
    a = ei;
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if(y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
    eptr += 1;
    if(eptr < ne) {
      ei = e[eptr];
    }
  }
  while(fptr < nf) {
    a = fi;
    b = q0;
    x = a + b;
    bv = x - a;
    y = b - bv;
    if(y) {
      g[count++] = y;
    }
    _x = q1 + x;
    _bv = _x - q1;
    _av = _x - _bv;
    _br = x - _bv;
    _ar = q1 - _av;
    q0 = _ar + _br;
    q1 = _x;
    fptr += 1;
    if(fptr < nf) {
      fi = -f[fptr];
    }
  }
  if(q0) {
    g[count++] = q0;
  }
  if(q1) {
    g[count++] = q1;
  }
  if(!count) {
    g[count++] = 0.0;
  }
  g.length = count;
  return g
}

var orientation_1 = createCommonjsModule(function (module) {
var NUM_EXPAND = 5;
var EPSILON     = 1.1102230246251565e-16;
var ERRBOUND3   = (3.0 + 16.0 * EPSILON) * EPSILON;
var ERRBOUND4   = (7.0 + 56.0 * EPSILON) * EPSILON;
function cofactor(m, c) {
  var result = new Array(m.length-1);
  for(var i=1; i<m.length; ++i) {
    var r = result[i-1] = new Array(m.length-1);
    for(var j=0,k=0; j<m.length; ++j) {
      if(j === c) {
        continue
      }
      r[k++] = m[i][j];
    }
  }
  return result
}
function matrix(n) {
  var result = new Array(n);
  for(var i=0; i<n; ++i) {
    result[i] = new Array(n);
    for(var j=0; j<n; ++j) {
      result[i][j] = ["m", j, "[", (n-i-1), "]"].join("");
    }
  }
  return result
}
function sign(n) {
  if(n & 1) {
    return "-"
  }
  return ""
}
function generateSum(expr) {
  if(expr.length === 1) {
    return expr[0]
  } else if(expr.length === 2) {
    return ["sum(", expr[0], ",", expr[1], ")"].join("")
  } else {
    var m = expr.length>>1;
    return ["sum(", generateSum(expr.slice(0, m)), ",", generateSum(expr.slice(m)), ")"].join("")
  }
}
function determinant(m) {
  if(m.length === 2) {
    return [["sum(prod(", m[0][0], ",", m[1][1], "),prod(-", m[0][1], ",", m[1][0], "))"].join("")]
  } else {
    var expr = [];
    for(var i=0; i<m.length; ++i) {
      expr.push(["scale(", generateSum(determinant(cofactor(m, i))), ",", sign(i), m[0][i], ")"].join(""));
    }
    return expr
  }
}
function orientation(n) {
  var pos = [];
  var neg = [];
  var m = matrix(n);
  var args = [];
  for(var i=0; i<n; ++i) {
    if((i&1)===0) {
      pos.push.apply(pos, determinant(cofactor(m, i)));
    } else {
      neg.push.apply(neg, determinant(cofactor(m, i)));
    }
    args.push("m" + i);
  }
  var posExpr = generateSum(pos);
  var negExpr = generateSum(neg);
  var funcName = "orientation" + n + "Exact";
  var code = ["function ", funcName, "(", args.join(), "){var p=", posExpr, ",n=", negExpr, ",d=sub(p,n);\
return d[d.length-1];};return ", funcName].join("");
  var proc = new Function("sum", "prod", "scale", "sub", code);
  return proc(robustSum, twoProduct_1, robustScale, robustDiff)
}
var orientation3Exact = orientation(3);
var orientation4Exact = orientation(4);
var CACHED = [
  function orientation0() { return 0 },
  function orientation1() { return 0 },
  function orientation2(a, b) {
    return b[0] - a[0]
  },
  function orientation3(a, b, c) {
    var l = (a[1] - c[1]) * (b[0] - c[0]);
    var r = (a[0] - c[0]) * (b[1] - c[1]);
    var det = l - r;
    var s;
    if(l > 0) {
      if(r <= 0) {
        return det
      } else {
        s = l + r;
      }
    } else if(l < 0) {
      if(r >= 0) {
        return det
      } else {
        s = -(l + r);
      }
    } else {
      return det
    }
    var tol = ERRBOUND3 * s;
    if(det >= tol || det <= -tol) {
      return det
    }
    return orientation3Exact(a, b, c)
  },
  function orientation4(a,b,c,d) {
    var adx = a[0] - d[0];
    var bdx = b[0] - d[0];
    var cdx = c[0] - d[0];
    var ady = a[1] - d[1];
    var bdy = b[1] - d[1];
    var cdy = c[1] - d[1];
    var adz = a[2] - d[2];
    var bdz = b[2] - d[2];
    var cdz = c[2] - d[2];
    var bdxcdy = bdx * cdy;
    var cdxbdy = cdx * bdy;
    var cdxady = cdx * ady;
    var adxcdy = adx * cdy;
    var adxbdy = adx * bdy;
    var bdxady = bdx * ady;
    var det = adz * (bdxcdy - cdxbdy)
            + bdz * (cdxady - adxcdy)
            + cdz * (adxbdy - bdxady);
    var permanent = (Math.abs(bdxcdy) + Math.abs(cdxbdy)) * Math.abs(adz)
                  + (Math.abs(cdxady) + Math.abs(adxcdy)) * Math.abs(bdz)
                  + (Math.abs(adxbdy) + Math.abs(bdxady)) * Math.abs(cdz);
    var tol = ERRBOUND4 * permanent;
    if ((det > tol) || (-det > tol)) {
      return det
    }
    return orientation4Exact(a,b,c,d)
  }
];
function slowOrient(args) {
  var proc = CACHED[args.length];
  if(!proc) {
    proc = CACHED[args.length] = orientation(args.length);
  }
  return proc.apply(undefined, args)
}
function generateOrientationProc() {
  while(CACHED.length <= NUM_EXPAND) {
    CACHED.push(orientation(CACHED.length));
  }
  var args = [];
  var procArgs = ["slow"];
  for(var i=0; i<=NUM_EXPAND; ++i) {
    args.push("a" + i);
    procArgs.push("o" + i);
  }
  var code = [
    "function getOrientation(", args.join(), "){switch(arguments.length){case 0:case 1:return 0;"
  ];
  for(var i=2; i<=NUM_EXPAND; ++i) {
    code.push("case ", i, ":return o", i, "(", args.slice(0, i).join(), ");");
  }
  code.push("}var s=new Array(arguments.length);for(var i=0;i<arguments.length;++i){s[i]=arguments[i]};return slow(s);}return getOrientation");
  procArgs.push(code.join(""));
  var proc = Function.apply(undefined, procArgs);
  module.exports = proc.apply(undefined, [slowOrient].concat(CACHED));
  for(var i=0; i<=NUM_EXPAND; ++i) {
    module.exports[i] = CACHED[i];
  }
}
generateOrientationProc();
});

var INT_BITS$1 = 32;
var INT_BITS_1$1  = INT_BITS$1;
var INT_MAX$1   =  0x7fffffff;
var INT_MIN$1   = -1<<(INT_BITS$1-1);
var sign$1 = function(v) {
  return (v > 0) - (v < 0);
};
var abs$1 = function(v) {
  var mask = v >> (INT_BITS$1-1);
  return (v ^ mask) - mask;
};
var min$1 = function(x, y) {
  return y ^ ((x ^ y) & -(x < y));
};
var max$1 = function(x, y) {
  return x ^ ((x ^ y) & -(x < y));
};
var isPow2$1 = function(v) {
  return !(v & (v-1)) && (!!v);
};
var log2$1 = function(v) {
  var r, shift;
  r =     (v > 0xFFFF) << 4; v >>>= r;
  shift = (v > 0xFF  ) << 3; v >>>= shift; r |= shift;
  shift = (v > 0xF   ) << 2; v >>>= shift; r |= shift;
  shift = (v > 0x3   ) << 1; v >>>= shift; r |= shift;
  return r | (v >> 1);
};
var log10$1 = function(v) {
  return  (v >= 1000000000) ? 9 : (v >= 100000000) ? 8 : (v >= 10000000) ? 7 :
          (v >= 1000000) ? 6 : (v >= 100000) ? 5 : (v >= 10000) ? 4 :
          (v >= 1000) ? 3 : (v >= 100) ? 2 : (v >= 10) ? 1 : 0;
};
var popCount$1 = function(v) {
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
};
function countTrailingZeros$1(v) {
  var c = 32;
  v &= -v;
  if (v) c--;
  if (v & 0x0000FFFF) c -= 16;
  if (v & 0x00FF00FF) c -= 8;
  if (v & 0x0F0F0F0F) c -= 4;
  if (v & 0x33333333) c -= 2;
  if (v & 0x55555555) c -= 1;
  return c;
}
var countTrailingZeros_1$1 = countTrailingZeros$1;
var nextPow2$1 = function(v) {
  v += v === 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
};
var prevPow2$1 = function(v) {
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v - (v>>>1);
};
var parity$1 = function(v) {
  v ^= v >>> 16;
  v ^= v >>> 8;
  v ^= v >>> 4;
  v &= 0xf;
  return (0x6996 >>> v) & 1;
};
var REVERSE_TABLE$1 = new Array(256);
(function(tab) {
  for(var i=0; i<256; ++i) {
    var v = i, r = i, s = 7;
    for (v >>>= 1; v; v >>>= 1) {
      r <<= 1;
      r |= v & 1;
      --s;
    }
    tab[i] = (r << s) & 0xff;
  }
})(REVERSE_TABLE$1);
var reverse$1 = function(v) {
  return  (REVERSE_TABLE$1[ v         & 0xff] << 24) |
          (REVERSE_TABLE$1[(v >>> 8)  & 0xff] << 16) |
          (REVERSE_TABLE$1[(v >>> 16) & 0xff] << 8)  |
           REVERSE_TABLE$1[(v >>> 24) & 0xff];
};
var interleave2$1 = function(x, y) {
  x &= 0xFFFF;
  x = (x | (x << 8)) & 0x00FF00FF;
  x = (x | (x << 4)) & 0x0F0F0F0F;
  x = (x | (x << 2)) & 0x33333333;
  x = (x | (x << 1)) & 0x55555555;
  y &= 0xFFFF;
  y = (y | (y << 8)) & 0x00FF00FF;
  y = (y | (y << 4)) & 0x0F0F0F0F;
  y = (y | (y << 2)) & 0x33333333;
  y = (y | (y << 1)) & 0x55555555;
  return x | (y << 1);
};
var deinterleave2$1 = function(v, n) {
  v = (v >>> n) & 0x55555555;
  v = (v | (v >>> 1))  & 0x33333333;
  v = (v | (v >>> 2))  & 0x0F0F0F0F;
  v = (v | (v >>> 4))  & 0x00FF00FF;
  v = (v | (v >>> 16)) & 0x000FFFF;
  return (v << 16) >> 16;
};
var interleave3$1 = function(x, y, z) {
  x &= 0x3FF;
  x  = (x | (x<<16)) & 4278190335;
  x  = (x | (x<<8))  & 251719695;
  x  = (x | (x<<4))  & 3272356035;
  x  = (x | (x<<2))  & 1227133513;
  y &= 0x3FF;
  y  = (y | (y<<16)) & 4278190335;
  y  = (y | (y<<8))  & 251719695;
  y  = (y | (y<<4))  & 3272356035;
  y  = (y | (y<<2))  & 1227133513;
  x |= (y << 1);
  z &= 0x3FF;
  z  = (z | (z<<16)) & 4278190335;
  z  = (z | (z<<8))  & 251719695;
  z  = (z | (z<<4))  & 3272356035;
  z  = (z | (z<<2))  & 1227133513;
  return x | (z << 2);
};
var deinterleave3$1 = function(v, n) {
  v = (v >>> n)       & 1227133513;
  v = (v | (v>>>2))   & 3272356035;
  v = (v | (v>>>4))   & 251719695;
  v = (v | (v>>>8))   & 4278190335;
  v = (v | (v>>>16))  & 0x3FF;
  return (v<<22)>>22;
};
var nextCombination$1 = function(v) {
  var t = v | (v - 1);
  return (t + 1) | (((~t & -~t) - 1) >>> (countTrailingZeros$1(v) + 1));
};
var twiddle$1 = {
	INT_BITS: INT_BITS_1$1,
	INT_MAX: INT_MAX$1,
	INT_MIN: INT_MIN$1,
	sign: sign$1,
	abs: abs$1,
	min: min$1,
	max: max$1,
	isPow2: isPow2$1,
	log2: log2$1,
	log10: log10$1,
	popCount: popCount$1,
	countTrailingZeros: countTrailingZeros_1$1,
	nextPow2: nextPow2$1,
	prevPow2: prevPow2$1,
	parity: parity$1,
	reverse: reverse$1,
	interleave2: interleave2$1,
	deinterleave2: deinterleave2$1,
	interleave3: interleave3$1,
	deinterleave3: deinterleave3$1,
	nextCombination: nextCombination$1
};

var unionFind = UnionFind;
function UnionFind(count) {
  this.roots = new Array(count);
  this.ranks = new Array(count);
  for(var i=0; i<count; ++i) {
    this.roots[i] = i;
    this.ranks[i] = 0;
  }
}
UnionFind.prototype.length = function() {
  return this.roots.length;
};
UnionFind.prototype.makeSet = function() {
  var n = this.roots.length;
  this.roots.push(n);
  this.ranks.push(0);
  return n;
};
UnionFind.prototype.find = function(x) {
  var roots = this.roots;
  while(roots[x] !== x) {
    var y = roots[x];
    roots[x] = roots[y];
    x = y;
  }
  return x;
};
UnionFind.prototype.link = function(x, y) {
  var xr = this.find(x)
    , yr = this.find(y);
  if(xr === yr) {
    return;
  }
  var ranks = this.ranks
    , roots = this.roots
    , xd    = ranks[xr]
    , yd    = ranks[yr];
  if(xd < yd) {
    roots[xr] = yr;
  } else if(yd < xd) {
    roots[yr] = xr;
  } else {
    roots[yr] = xr;
    ++ranks[xr];
  }
};

function dimension(cells) {
  var d = 0
    , max = Math.max;
  for(var i=0, il=cells.length; i<il; ++i) {
    d = max(d, cells[i].length);
  }
  return d-1
}
var dimension_1 = dimension;
function countVertices(cells) {
  var vc = -1
    , max = Math.max;
  for(var i=0, il=cells.length; i<il; ++i) {
    var c = cells[i];
    for(var j=0, jl=c.length; j<jl; ++j) {
      vc = max(vc, c[j]);
    }
  }
  return vc+1
}
var countVertices_1 = countVertices;
function cloneCells(cells) {
  var ncells = new Array(cells.length);
  for(var i=0, il=cells.length; i<il; ++i) {
    ncells[i] = cells[i].slice(0);
  }
  return ncells
}
var cloneCells_1 = cloneCells;
function compareCells(a, b) {
  var n = a.length
    , t = a.length - b.length
    , min = Math.min;
  if(t) {
    return t
  }
  switch(n) {
    case 0:
      return 0;
    case 1:
      return a[0] - b[0];
    case 2:
      var d = a[0]+a[1]-b[0]-b[1];
      if(d) {
        return d
      }
      return min(a[0],a[1]) - min(b[0],b[1])
    case 3:
      var l1 = a[0]+a[1]
        , m1 = b[0]+b[1];
      d = l1+a[2] - (m1+b[2]);
      if(d) {
        return d
      }
      var l0 = min(a[0], a[1])
        , m0 = min(b[0], b[1])
        , d  = min(l0, a[2]) - min(m0, b[2]);
      if(d) {
        return d
      }
      return min(l0+a[2], l1) - min(m0+b[2], m1)
    default:
      var as = a.slice(0);
      as.sort();
      var bs = b.slice(0);
      bs.sort();
      for(var i=0; i<n; ++i) {
        t = as[i] - bs[i];
        if(t) {
          return t
        }
      }
      return 0
  }
}
var compareCells_1 = compareCells;
function compareZipped(a, b) {
  return compareCells(a[0], b[0])
}
function normalize$1(cells, attr) {
  if(attr) {
    var len = cells.length;
    var zipped = new Array(len);
    for(var i=0; i<len; ++i) {
      zipped[i] = [cells[i], attr[i]];
    }
    zipped.sort(compareZipped);
    for(var i=0; i<len; ++i) {
      cells[i] = zipped[i][0];
      attr[i] = zipped[i][1];
    }
    return cells
  } else {
    cells.sort(compareCells);
    return cells
  }
}
var normalize_1$1 = normalize$1;
function unique$1(cells) {
  if(cells.length === 0) {
    return []
  }
  var ptr = 1
    , len = cells.length;
  for(var i=1; i<len; ++i) {
    var a = cells[i];
    if(compareCells(a, cells[i-1])) {
      if(i === ptr) {
        ptr++;
        continue
      }
      cells[ptr++] = a;
    }
  }
  cells.length = ptr;
  return cells
}
var unique_1 = unique$1;
function findCell(cells, c) {
  var lo = 0
    , hi = cells.length-1
    , r  = -1;
  while (lo <= hi) {
    var mid = (lo + hi) >> 1
      , s   = compareCells(cells[mid], c);
    if(s <= 0) {
      if(s === 0) {
        r = mid;
      }
      lo = mid + 1;
    } else if(s > 0) {
      hi = mid - 1;
    }
  }
  return r
}
var findCell_1 = findCell;
function incidence(from_cells, to_cells) {
  var index = new Array(from_cells.length);
  for(var i=0, il=index.length; i<il; ++i) {
    index[i] = [];
  }
  var b = [];
  for(var i=0, n=to_cells.length; i<n; ++i) {
    var c = to_cells[i];
    var cl = c.length;
    for(var k=1, kn=(1<<cl); k<kn; ++k) {
      b.length = twiddle$1.popCount(k);
      var l = 0;
      for(var j=0; j<cl; ++j) {
        if(k & (1<<j)) {
          b[l++] = c[j];
        }
      }
      var idx=findCell(from_cells, b);
      if(idx < 0) {
        continue
      }
      while(true) {
        index[idx++].push(i);
        if(idx >= from_cells.length || compareCells(from_cells[idx], b) !== 0) {
          break
        }
      }
    }
  }
  return index
}
var incidence_1 = incidence;
function dual(cells, vertex_count) {
  if(!vertex_count) {
    return incidence(unique$1(skeleton(cells, 0)), cells)
  }
  var res = new Array(vertex_count);
  for(var i=0; i<vertex_count; ++i) {
    res[i] = [];
  }
  for(var i=0, len=cells.length; i<len; ++i) {
    var c = cells[i];
    for(var j=0, cl=c.length; j<cl; ++j) {
      res[c[j]].push(i);
    }
  }
  return res
}
var dual_1 = dual;
function explode(cells) {
  var result = [];
  for(var i=0, il=cells.length; i<il; ++i) {
    var c = cells[i]
      , cl = c.length|0;
    for(var j=1, jl=(1<<cl); j<jl; ++j) {
      var b = [];
      for(var k=0; k<cl; ++k) {
        if((j >>> k) & 1) {
          b.push(c[k]);
        }
      }
      result.push(b);
    }
  }
  return normalize$1(result)
}
var explode_1 = explode;
function skeleton(cells, n) {
  if(n < 0) {
    return []
  }
  var result = []
    , k0     = (1<<(n+1))-1;
  for(var i=0; i<cells.length; ++i) {
    var c = cells[i];
    for(var k=k0; k<(1<<c.length); k=twiddle$1.nextCombination(k)) {
      var b = new Array(n+1)
        , l = 0;
      for(var j=0; j<c.length; ++j) {
        if(k & (1<<j)) {
          b[l++] = c[j];
        }
      }
      result.push(b);
    }
  }
  return normalize$1(result)
}
var skeleton_1 = skeleton;
function boundary(cells) {
  var res = [];
  for(var i=0,il=cells.length; i<il; ++i) {
    var c = cells[i];
    for(var j=0,cl=c.length; j<cl; ++j) {
      var b = new Array(c.length-1);
      for(var k=0, l=0; k<cl; ++k) {
        if(k !== j) {
          b[l++] = c[k];
        }
      }
      res.push(b);
    }
  }
  return normalize$1(res)
}
var boundary_1 = boundary;
function connectedComponents_dense(cells, vertex_count) {
  var labels = new unionFind(vertex_count);
  for(var i=0; i<cells.length; ++i) {
    var c = cells[i];
    for(var j=0; j<c.length; ++j) {
      for(var k=j+1; k<c.length; ++k) {
        labels.link(c[j], c[k]);
      }
    }
  }
  var components = []
    , component_labels = labels.ranks;
  for(var i=0; i<component_labels.length; ++i) {
    component_labels[i] = -1;
  }
  for(var i=0; i<cells.length; ++i) {
    var l = labels.find(cells[i][0]);
    if(component_labels[l] < 0) {
      component_labels[l] = components.length;
      components.push([cells[i].slice(0)]);
    } else {
      components[component_labels[l]].push(cells[i].slice(0));
    }
  }
  return components
}
function connectedComponents_sparse(cells) {
  var vertices  = unique$1(normalize$1(skeleton(cells, 0)))
    , labels    = new unionFind(vertices.length);
  for(var i=0; i<cells.length; ++i) {
    var c = cells[i];
    for(var j=0; j<c.length; ++j) {
      var vj = findCell(vertices, [c[j]]);
      for(var k=j+1; k<c.length; ++k) {
        labels.link(vj, findCell(vertices, [c[k]]));
      }
    }
  }
  var components        = []
    , component_labels  = labels.ranks;
  for(var i=0; i<component_labels.length; ++i) {
    component_labels[i] = -1;
  }
  for(var i=0; i<cells.length; ++i) {
    var l = labels.find(findCell(vertices, [cells[i][0]]));
    if(component_labels[l] < 0) {
      component_labels[l] = components.length;
      components.push([cells[i].slice(0)]);
    } else {
      components[component_labels[l]].push(cells[i].slice(0));
    }
  }
  return components
}
function connectedComponents(cells, vertex_count) {
  if(vertex_count) {
    return connectedComponents_dense(cells, vertex_count)
  }
  return connectedComponents_sparse(cells)
}
var connectedComponents_1 = connectedComponents;
var topology = {
	dimension: dimension_1,
	countVertices: countVertices_1,
	cloneCells: cloneCells_1,
	compareCells: compareCells_1,
	normalize: normalize_1$1,
	unique: unique_1,
	findCell: findCell_1,
	incidence: incidence_1,
	dual: dual_1,
	explode: explode_1,
	skeleton: skeleton_1,
	boundary: boundary_1,
	connectedComponents: connectedComponents_1
};

var simplify = simplifyPolygon;
function errorWeight(base, a, b) {
  var area = Math.abs(orientation_1(base, a, b));
  var perim = Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1]-b[1], 2));
  return area / perim
}
function simplifyPolygon(cells, positions, minArea) {
  var n = positions.length;
  var nc = cells.length;
  var inv = new Array(n);
  var outv = new Array(n);
  var weights = new Array(n);
  var dead = new Array(n);
  for(var i=0; i<n; ++i) {
    inv[i] = outv[i] = -1;
    weights[i] = Infinity;
    dead[i] = false;
  }
  for(var i=0; i<nc; ++i) {
    var c = cells[i];
    if(c.length !== 2) {
      throw new Error("Input must be a graph")
    }
    var s = c[1];
    var t = c[0];
    if(outv[t] !== -1) {
      outv[t] = -2;
    } else {
      outv[t] = s;
    }
    if(inv[s] !== -1) {
      inv[s] = -2;
    } else {
      inv[s] = t;
    }
  }
  function computeWeight(i) {
    if(dead[i]) {
      return Infinity
    }
    var s = inv[i];
    var t = outv[i];
    if((s<0) || (t<0)) {
      return Infinity
    } else {
      return errorWeight(positions[i], positions[s], positions[t])
    }
  }
  function heapSwap(i,j) {
    var a = heap[i];
    var b = heap[j];
    heap[i] = b;
    heap[j] = a;
    index[a] = j;
    index[b] = i;
  }
  function heapWeight(i) {
    return weights[heap[i]]
  }
  function heapParent(i) {
    if(i & 1) {
      return (i - 1) >> 1
    }
    return (i >> 1) - 1
  }
  function heapDown(i) {
    var w = heapWeight(i);
    while(true) {
      var tw = w;
      var left  = 2*i + 1;
      var right = 2*(i + 1);
      var next = i;
      if(left < heapCount) {
        var lw = heapWeight(left);
        if(lw < tw) {
          next = left;
          tw = lw;
        }
      }
      if(right < heapCount) {
        var rw = heapWeight(right);
        if(rw < tw) {
          next = right;
        }
      }
      if(next === i) {
        return i
      }
      heapSwap(i, next);
      i = next;
    }
  }
  function heapUp(i) {
    var w = heapWeight(i);
    while(i > 0) {
      var parent = heapParent(i);
      if(parent >= 0) {
        var pw = heapWeight(parent);
        if(w < pw) {
          heapSwap(i, parent);
          i = parent;
          continue
        }
      }
      return i
    }
  }
  function heapPop() {
    if(heapCount > 0) {
      var head = heap[0];
      heapSwap(0, heapCount-1);
      heapCount -= 1;
      heapDown(0);
      return head
    }
    return -1
  }
  function heapUpdate(i, w) {
    var a = heap[i];
    if(weights[a] === w) {
      return i
    }
    weights[a] = -Infinity;
    heapUp(i);
    heapPop();
    weights[a] = w;
    heapCount += 1;
    return heapUp(heapCount-1)
  }
  function kill(i) {
    if(dead[i]) {
      return
    }
    dead[i] = true;
    var s = inv[i];
    var t = outv[i];
    if(inv[t] >= 0) {
      inv[t] = s;
    }
    if(outv[s] >= 0) {
      outv[s] = t;
    }
    if(index[s] >= 0) {
      heapUpdate(index[s], computeWeight(s));
    }
    if(index[t] >= 0) {
      heapUpdate(index[t], computeWeight(t));
    }
  }
  var heap = [];
  var index = new Array(n);
  for(var i=0; i<n; ++i) {
    var w = weights[i] = computeWeight(i);
    if(w < Infinity) {
      index[i] = heap.length;
      heap.push(i);
    } else {
      index[i] = -1;
    }
  }
  var heapCount = heap.length;
  for(var i=heapCount>>1; i>=0; --i) {
    heapDown(i);
  }
  while(true) {
    var hmin = heapPop();
    if((hmin < 0) || (weights[hmin] > minArea)) {
      break
    }
    kill(hmin);
  }
  var npositions = [];
  for(var i=0; i<n; ++i) {
    if(!dead[i]) {
      index[i] = npositions.length;
      npositions.push(positions[i].slice());
    }
  }
  function tortoiseHare(seq, start) {
    if(seq[start] < 0) {
      return start
    }
    var t = start;
    var h = start;
    do {
      var nh = seq[h];
      if(!dead[h] || nh < 0 || nh === h) {
        break
      }
      h = nh;
      nh = seq[h];
      if(!dead[h] || nh < 0 || nh === h) {
        break
      }
      h = nh;
      t = seq[t];
    } while(t !== h)
    for(var v=start; v!==h; v = seq[v]) {
      seq[v] = h;
    }
    return h
  }
  var ncells = [];
  cells.forEach(function(c) {
    var tin = tortoiseHare(inv, c[0]);
    var tout = tortoiseHare(outv, c[1]);
    if(tin >= 0 && tout >= 0 && tin !== tout) {
      var cin = index[tin];
      var cout = index[tout];
      if(cin !== cout) {
        ncells.push([ cin, cout ]);
      }
    }
  });
  topology.unique(topology.normalize(ncells));
  return {
    positions: npositions,
    edges: ncells
  }
}

var unionFind$1 = UnionFind$1;
function UnionFind$1(count) {
  this.roots = new Array(count);
  this.ranks = new Array(count);
  for(var i=0; i<count; ++i) {
    this.roots[i] = i;
    this.ranks[i] = 0;
  }
}
var proto = UnionFind$1.prototype;
Object.defineProperty(proto, "length", {
  "get": function() {
    return this.roots.length
  }
});
proto.makeSet = function() {
  var n = this.roots.length;
  this.roots.push(n);
  this.ranks.push(0);
  return n;
};
proto.find = function(x) {
  var x0 = x;
  var roots = this.roots;
  while(roots[x] !== x) {
    x = roots[x];
  }
  while(roots[x0] !== x) {
    var y = roots[x0];
    roots[x0] = x;
    x0 = y;
  }
  return x;
};
proto.link = function(x, y) {
  var xr = this.find(x)
    , yr = this.find(y);
  if(xr === yr) {
    return;
  }
  var ranks = this.ranks
    , roots = this.roots
    , xd    = ranks[xr]
    , yd    = ranks[yr];
  if(xd < yd) {
    roots[xr] = yr;
  } else if(yd < xd) {
    roots[yr] = xr;
  } else {
    roots[yr] = xr;
    ++ranks[xr];
  }
};

var sort = wrapper;
var INSERT_SORT_CUTOFF = 32;
function wrapper(data, n0) {
  if (n0 <= 4*INSERT_SORT_CUTOFF) {
    insertionSort(0, n0 - 1, data);
  } else {
    quickSort(0, n0 - 1, data);
  }
}
function insertionSort(left, right, data) {
  var ptr = 2*(left+1);
  for(var i=left+1; i<=right; ++i) {
    var a = data[ptr++];
    var b = data[ptr++];
    var j = i;
    var jptr = ptr-2;
    while(j-- > left) {
      var x = data[jptr-2];
      var y = data[jptr-1];
      if(x < a) {
        break
      } else if(x === a && y < b) {
        break
      }
      data[jptr]   = x;
      data[jptr+1] = y;
      jptr -= 2;
    }
    data[jptr]   = a;
    data[jptr+1] = b;
  }
}
function swap(i, j, data) {
  i *= 2;
  j *= 2;
  var x = data[i];
  var y = data[i+1];
  data[i] = data[j];
  data[i+1] = data[j+1];
  data[j] = x;
  data[j+1] = y;
}
function move(i, j, data) {
  i *= 2;
  j *= 2;
  data[i] = data[j];
  data[i+1] = data[j+1];
}
function rotate(i, j, k, data) {
  i *= 2;
  j *= 2;
  k *= 2;
  var x = data[i];
  var y = data[i+1];
  data[i] = data[j];
  data[i+1] = data[j+1];
  data[j] = data[k];
  data[j+1] = data[k+1];
  data[k] = x;
  data[k+1] = y;
}
function shufflePivot(i, j, px, py, data) {
  i *= 2;
  j *= 2;
  data[i] = data[j];
  data[j] = px;
  data[i+1] = data[j+1];
  data[j+1] = py;
}
function compare(i, j, data) {
  i *= 2;
  j *= 2;
  var x = data[i],
      y = data[j];
  if(x < y) {
    return false
  } else if(x === y) {
    return data[i+1] > data[j+1]
  }
  return true
}
function comparePivot(i, y, b, data) {
  i *= 2;
  var x = data[i];
  if(x < y) {
    return true
  } else if(x === y) {
    return data[i+1] < b
  }
  return false
}
function quickSort(left, right, data) {
  var sixth = (right - left + 1) / 6 | 0,
      index1 = left + sixth,
      index5 = right - sixth,
      index3 = left + right >> 1,
      index2 = index3 - sixth,
      index4 = index3 + sixth,
      el1 = index1,
      el2 = index2,
      el3 = index3,
      el4 = index4,
      el5 = index5,
      less = left + 1,
      great = right - 1,
      tmp = 0;
  if(compare(el1, el2, data)) {
    tmp = el1;
    el1 = el2;
    el2 = tmp;
  }
  if(compare(el4, el5, data)) {
    tmp = el4;
    el4 = el5;
    el5 = tmp;
  }
  if(compare(el1, el3, data)) {
    tmp = el1;
    el1 = el3;
    el3 = tmp;
  }
  if(compare(el2, el3, data)) {
    tmp = el2;
    el2 = el3;
    el3 = tmp;
  }
  if(compare(el1, el4, data)) {
    tmp = el1;
    el1 = el4;
    el4 = tmp;
  }
  if(compare(el3, el4, data)) {
    tmp = el3;
    el3 = el4;
    el4 = tmp;
  }
  if(compare(el2, el5, data)) {
    tmp = el2;
    el2 = el5;
    el5 = tmp;
  }
  if(compare(el2, el3, data)) {
    tmp = el2;
    el2 = el3;
    el3 = tmp;
  }
  if(compare(el4, el5, data)) {
    tmp = el4;
    el4 = el5;
    el5 = tmp;
  }
  var pivot1X = data[2*el2];
  var pivot1Y = data[2*el2+1];
  var pivot2X = data[2*el4];
  var pivot2Y = data[2*el4+1];
  var ptr0 = 2 * el1;
  var ptr2 = 2 * el3;
  var ptr4 = 2 * el5;
  var ptr5 = 2 * index1;
  var ptr6 = 2 * index3;
  var ptr7 = 2 * index5;
  for (var i1 = 0; i1 < 2; ++i1) {
    var x = data[ptr0+i1];
    var y = data[ptr2+i1];
    var z = data[ptr4+i1];
    data[ptr5+i1] = x;
    data[ptr6+i1] = y;
    data[ptr7+i1] = z;
  }
  move(index2, left, data);
  move(index4, right, data);
  for (var k = less; k <= great; ++k) {
    if (comparePivot(k, pivot1X, pivot1Y, data)) {
      if (k !== less) {
        swap(k, less, data);
      }
      ++less;
    } else {
      if (!comparePivot(k, pivot2X, pivot2Y, data)) {
        while (true) {
          if (!comparePivot(great, pivot2X, pivot2Y, data)) {
            if (--great < k) {
              break;
            }
            continue;
          } else {
            if (comparePivot(great, pivot1X, pivot1Y, data)) {
              rotate(k, less, great, data);
              ++less;
              --great;
            } else {
              swap(k, great, data);
              --great;
            }
            break;
          }
        }
      }
    }
  }
  shufflePivot(left, less-1, pivot1X, pivot1Y, data);
  shufflePivot(right, great+1, pivot2X, pivot2Y, data);
  if (less - 2 - left <= INSERT_SORT_CUTOFF) {
    insertionSort(left, less - 2, data);
  } else {
    quickSort(left, less - 2, data);
  }
  if (right - (great + 2) <= INSERT_SORT_CUTOFF) {
    insertionSort(great + 2, right, data);
  } else {
    quickSort(great + 2, right, data);
  }
  if (great - less <= INSERT_SORT_CUTOFF) {
    insertionSort(less, great, data);
  } else {
    quickSort(less, great, data);
  }
}

var sweep = {
  init:           sqInit,
  sweepBipartite: sweepBipartite,
  sweepComplete:  sweepComplete,
  scanBipartite:  scanBipartite,
  scanComplete:   scanComplete
};
var BLUE_FLAG = (1<<28);
var INIT_CAPACITY      = 1024;
var RED_SWEEP_QUEUE    = pool.mallocInt32(INIT_CAPACITY);
var RED_SWEEP_INDEX    = pool.mallocInt32(INIT_CAPACITY);
var BLUE_SWEEP_QUEUE   = pool.mallocInt32(INIT_CAPACITY);
var BLUE_SWEEP_INDEX   = pool.mallocInt32(INIT_CAPACITY);
var COMMON_SWEEP_QUEUE = pool.mallocInt32(INIT_CAPACITY);
var COMMON_SWEEP_INDEX = pool.mallocInt32(INIT_CAPACITY);
var SWEEP_EVENTS       = pool.mallocDouble(INIT_CAPACITY * 8);
function sqInit(count) {
  var rcount = twiddle.nextPow2(count);
  if(RED_SWEEP_QUEUE.length < rcount) {
    pool.free(RED_SWEEP_QUEUE);
    RED_SWEEP_QUEUE = pool.mallocInt32(rcount);
  }
  if(RED_SWEEP_INDEX.length < rcount) {
    pool.free(RED_SWEEP_INDEX);
    RED_SWEEP_INDEX = pool.mallocInt32(rcount);
  }
  if(BLUE_SWEEP_QUEUE.length < rcount) {
    pool.free(BLUE_SWEEP_QUEUE);
    BLUE_SWEEP_QUEUE = pool.mallocInt32(rcount);
  }
  if(BLUE_SWEEP_INDEX.length < rcount) {
    pool.free(BLUE_SWEEP_INDEX);
    BLUE_SWEEP_INDEX = pool.mallocInt32(rcount);
  }
  if(COMMON_SWEEP_QUEUE.length < rcount) {
    pool.free(COMMON_SWEEP_QUEUE);
    COMMON_SWEEP_QUEUE = pool.mallocInt32(rcount);
  }
  if(COMMON_SWEEP_INDEX.length < rcount) {
    pool.free(COMMON_SWEEP_INDEX);
    COMMON_SWEEP_INDEX = pool.mallocInt32(rcount);
  }
  var eventLength = 8 * rcount;
  if(SWEEP_EVENTS.length < eventLength) {
    pool.free(SWEEP_EVENTS);
    SWEEP_EVENTS = pool.mallocDouble(eventLength);
  }
}
function sqPop(queue, index, count, item) {
  var idx = index[item];
  var top = queue[count-1];
  queue[idx] = top;
  index[top] = idx;
}
function sqPush(queue, index, count, item) {
  queue[count] = item;
  index[item]  = count;
}
function sweepBipartite(
    d, visit,
    redStart,  redEnd, red, redIndex,
    blueStart, blueEnd, blue, blueIndex) {
  var ptr      = 0;
  var elemSize = 2*d;
  var istart   = d-1;
  var iend     = elemSize-1;
  for(var i=redStart; i<redEnd; ++i) {
    var idx = redIndex[i];
    var redOffset = elemSize*i;
    SWEEP_EVENTS[ptr++] = red[redOffset+istart];
    SWEEP_EVENTS[ptr++] = -(idx+1);
    SWEEP_EVENTS[ptr++] = red[redOffset+iend];
    SWEEP_EVENTS[ptr++] = idx;
  }
  for(var i=blueStart; i<blueEnd; ++i) {
    var idx = blueIndex[i]+BLUE_FLAG;
    var blueOffset = elemSize*i;
    SWEEP_EVENTS[ptr++] = blue[blueOffset+istart];
    SWEEP_EVENTS[ptr++] = -idx;
    SWEEP_EVENTS[ptr++] = blue[blueOffset+iend];
    SWEEP_EVENTS[ptr++] = idx;
  }
  var n = ptr >>> 1;
  sort(SWEEP_EVENTS, n);
  var redActive  = 0;
  var blueActive = 0;
  for(var i=0; i<n; ++i) {
    var e = SWEEP_EVENTS[2*i+1]|0;
    if(e >= BLUE_FLAG) {
      e = (e-BLUE_FLAG)|0;
      sqPop(BLUE_SWEEP_QUEUE, BLUE_SWEEP_INDEX, blueActive--, e);
    } else if(e >= 0) {
      sqPop(RED_SWEEP_QUEUE, RED_SWEEP_INDEX, redActive--, e);
    } else if(e <= -BLUE_FLAG) {
      e = (-e-BLUE_FLAG)|0;
      for(var j=0; j<redActive; ++j) {
        var retval = visit(RED_SWEEP_QUEUE[j], e);
        if(retval !== void 0) {
          return retval
        }
      }
      sqPush(BLUE_SWEEP_QUEUE, BLUE_SWEEP_INDEX, blueActive++, e);
    } else {
      e = (-e-1)|0;
      for(var j=0; j<blueActive; ++j) {
        var retval = visit(e, BLUE_SWEEP_QUEUE[j]);
        if(retval !== void 0) {
          return retval
        }
      }
      sqPush(RED_SWEEP_QUEUE, RED_SWEEP_INDEX, redActive++, e);
    }
  }
}
function sweepComplete(d, visit,
  redStart, redEnd, red, redIndex,
  blueStart, blueEnd, blue, blueIndex) {
  var ptr      = 0;
  var elemSize = 2*d;
  var istart   = d-1;
  var iend     = elemSize-1;
  for(var i=redStart; i<redEnd; ++i) {
    var idx = (redIndex[i]+1)<<1;
    var redOffset = elemSize*i;
    SWEEP_EVENTS[ptr++] = red[redOffset+istart];
    SWEEP_EVENTS[ptr++] = -idx;
    SWEEP_EVENTS[ptr++] = red[redOffset+iend];
    SWEEP_EVENTS[ptr++] = idx;
  }
  for(var i=blueStart; i<blueEnd; ++i) {
    var idx = (blueIndex[i]+1)<<1;
    var blueOffset = elemSize*i;
    SWEEP_EVENTS[ptr++] = blue[blueOffset+istart];
    SWEEP_EVENTS[ptr++] = (-idx)|1;
    SWEEP_EVENTS[ptr++] = blue[blueOffset+iend];
    SWEEP_EVENTS[ptr++] = idx|1;
  }
  var n = ptr >>> 1;
  sort(SWEEP_EVENTS, n);
  var redActive    = 0;
  var blueActive   = 0;
  var commonActive = 0;
  for(var i=0; i<n; ++i) {
    var e     = SWEEP_EVENTS[2*i+1]|0;
    var color = e&1;
    if(i < n-1 && (e>>1) === (SWEEP_EVENTS[2*i+3]>>1)) {
      color = 2;
      i += 1;
    }
    if(e < 0) {
      var id = -(e>>1) - 1;
      for(var j=0; j<commonActive; ++j) {
        var retval = visit(COMMON_SWEEP_QUEUE[j], id);
        if(retval !== void 0) {
          return retval
        }
      }
      if(color !== 0) {
        for(var j=0; j<redActive; ++j) {
          var retval = visit(RED_SWEEP_QUEUE[j], id);
          if(retval !== void 0) {
            return retval
          }
        }
      }
      if(color !== 1) {
        for(var j=0; j<blueActive; ++j) {
          var retval = visit(BLUE_SWEEP_QUEUE[j], id);
          if(retval !== void 0) {
            return retval
          }
        }
      }
      if(color === 0) {
        sqPush(RED_SWEEP_QUEUE, RED_SWEEP_INDEX, redActive++, id);
      } else if(color === 1) {
        sqPush(BLUE_SWEEP_QUEUE, BLUE_SWEEP_INDEX, blueActive++, id);
      } else if(color === 2) {
        sqPush(COMMON_SWEEP_QUEUE, COMMON_SWEEP_INDEX, commonActive++, id);
      }
    } else {
      var id = (e>>1) - 1;
      if(color === 0) {
        sqPop(RED_SWEEP_QUEUE, RED_SWEEP_INDEX, redActive--, id);
      } else if(color === 1) {
        sqPop(BLUE_SWEEP_QUEUE, BLUE_SWEEP_INDEX, blueActive--, id);
      } else if(color === 2) {
        sqPop(COMMON_SWEEP_QUEUE, COMMON_SWEEP_INDEX, commonActive--, id);
      }
    }
  }
}
function scanBipartite(
  d, axis, visit, flip,
  redStart,  redEnd, red, redIndex,
  blueStart, blueEnd, blue, blueIndex) {
  var ptr      = 0;
  var elemSize = 2*d;
  var istart   = axis;
  var iend     = axis+d;
  var redShift  = 1;
  var blueShift = 1;
  if(flip) {
    blueShift = BLUE_FLAG;
  } else {
    redShift  = BLUE_FLAG;
  }
  for(var i=redStart; i<redEnd; ++i) {
    var idx = i + redShift;
    var redOffset = elemSize*i;
    SWEEP_EVENTS[ptr++] = red[redOffset+istart];
    SWEEP_EVENTS[ptr++] = -idx;
    SWEEP_EVENTS[ptr++] = red[redOffset+iend];
    SWEEP_EVENTS[ptr++] = idx;
  }
  for(var i=blueStart; i<blueEnd; ++i) {
    var idx = i + blueShift;
    var blueOffset = elemSize*i;
    SWEEP_EVENTS[ptr++] = blue[blueOffset+istart];
    SWEEP_EVENTS[ptr++] = -idx;
  }
  var n = ptr >>> 1;
  sort(SWEEP_EVENTS, n);
  var redActive    = 0;
  for(var i=0; i<n; ++i) {
    var e = SWEEP_EVENTS[2*i+1]|0;
    if(e < 0) {
      var idx   = -e;
      var isRed = false;
      if(idx >= BLUE_FLAG) {
        isRed = !flip;
        idx -= BLUE_FLAG;
      } else {
        isRed = !!flip;
        idx -= 1;
      }
      if(isRed) {
        sqPush(RED_SWEEP_QUEUE, RED_SWEEP_INDEX, redActive++, idx);
      } else {
        var blueId  = blueIndex[idx];
        var bluePtr = elemSize * idx;
        var b0 = blue[bluePtr+axis+1];
        var b1 = blue[bluePtr+axis+1+d];
red_loop:
        for(var j=0; j<redActive; ++j) {
          var oidx   = RED_SWEEP_QUEUE[j];
          var redPtr = elemSize * oidx;
          if(b1 < red[redPtr+axis+1] ||
             red[redPtr+axis+1+d] < b0) {
            continue
          }
          for(var k=axis+2; k<d; ++k) {
            if(blue[bluePtr + k + d] < red[redPtr + k] ||
               red[redPtr + k + d] < blue[bluePtr + k]) {
              continue red_loop
            }
          }
          var redId  = redIndex[oidx];
          var retval;
          if(flip) {
            retval = visit(blueId, redId);
          } else {
            retval = visit(redId, blueId);
          }
          if(retval !== void 0) {
            return retval
          }
        }
      }
    } else {
      sqPop(RED_SWEEP_QUEUE, RED_SWEEP_INDEX, redActive--, e - redShift);
    }
  }
}
function scanComplete(
  d, axis, visit,
  redStart,  redEnd, red, redIndex,
  blueStart, blueEnd, blue, blueIndex) {
  var ptr      = 0;
  var elemSize = 2*d;
  var istart   = axis;
  var iend     = axis+d;
  for(var i=redStart; i<redEnd; ++i) {
    var idx = i + BLUE_FLAG;
    var redOffset = elemSize*i;
    SWEEP_EVENTS[ptr++] = red[redOffset+istart];
    SWEEP_EVENTS[ptr++] = -idx;
    SWEEP_EVENTS[ptr++] = red[redOffset+iend];
    SWEEP_EVENTS[ptr++] = idx;
  }
  for(var i=blueStart; i<blueEnd; ++i) {
    var idx = i + 1;
    var blueOffset = elemSize*i;
    SWEEP_EVENTS[ptr++] = blue[blueOffset+istart];
    SWEEP_EVENTS[ptr++] = -idx;
  }
  var n = ptr >>> 1;
  sort(SWEEP_EVENTS, n);
  var redActive    = 0;
  for(var i=0; i<n; ++i) {
    var e = SWEEP_EVENTS[2*i+1]|0;
    if(e < 0) {
      var idx   = -e;
      if(idx >= BLUE_FLAG) {
        RED_SWEEP_QUEUE[redActive++] = idx - BLUE_FLAG;
      } else {
        idx -= 1;
        var blueId  = blueIndex[idx];
        var bluePtr = elemSize * idx;
        var b0 = blue[bluePtr+axis+1];
        var b1 = blue[bluePtr+axis+1+d];
red_loop:
        for(var j=0; j<redActive; ++j) {
          var oidx   = RED_SWEEP_QUEUE[j];
          var redId  = redIndex[oidx];
          if(redId === blueId) {
            break
          }
          var redPtr = elemSize * oidx;
          if(b1 < red[redPtr+axis+1] ||
            red[redPtr+axis+1+d] < b0) {
            continue
          }
          for(var k=axis+2; k<d; ++k) {
            if(blue[bluePtr + k + d] < red[redPtr + k] ||
               red[redPtr + k + d]   < blue[bluePtr + k]) {
              continue red_loop
            }
          }
          var retval = visit(redId, blueId);
          if(retval !== void 0) {
            return retval
          }
        }
      }
    } else {
      var idx = e - BLUE_FLAG;
      for(var j=redActive-1; j>=0; --j) {
        if(RED_SWEEP_QUEUE[j] === idx) {
          for(var k=j+1; k<redActive; ++k) {
            RED_SWEEP_QUEUE[k-1] = RED_SWEEP_QUEUE[k];
          }
          break
        }
      }
      --redActive;
    }
  }
}

var DIMENSION   = 'd';
var AXIS        = 'ax';
var VISIT       = 'vv';
var FLIP        = 'fp';
var ELEM_SIZE   = 'es';
var RED_START   = 'rs';
var RED_END     = 're';
var RED_BOXES   = 'rb';
var RED_INDEX   = 'ri';
var RED_PTR     = 'rp';
var BLUE_START  = 'bs';
var BLUE_END    = 'be';
var BLUE_BOXES  = 'bb';
var BLUE_INDEX  = 'bi';
var BLUE_PTR    = 'bp';
var RETVAL      = 'rv';
var INNER_LABEL = 'Q';
var ARGS = [
  DIMENSION,
  AXIS,
  VISIT,
  RED_START,
  RED_END,
  RED_BOXES,
  RED_INDEX,
  BLUE_START,
  BLUE_END,
  BLUE_BOXES,
  BLUE_INDEX
];
function generateBruteForce(redMajor, flip, full) {
  var funcName = 'bruteForce' +
    (redMajor ? 'Red' : 'Blue') +
    (flip ? 'Flip' : '') +
    (full ? 'Full' : '');
  var code = ['function ', funcName, '(', ARGS.join(), '){',
    'var ', ELEM_SIZE, '=2*', DIMENSION, ';'];
  var redLoop =
    'for(var i=' + RED_START + ',' + RED_PTR + '=' + ELEM_SIZE + '*' + RED_START + ';' +
        'i<' + RED_END +';' +
        '++i,' + RED_PTR + '+=' + ELEM_SIZE + '){' +
        'var x0=' + RED_BOXES + '[' + AXIS + '+' + RED_PTR + '],' +
            'x1=' + RED_BOXES + '[' + AXIS + '+' + RED_PTR + '+' + DIMENSION + '],' +
            'xi=' + RED_INDEX + '[i];';
  var blueLoop =
    'for(var j=' + BLUE_START + ',' + BLUE_PTR + '=' + ELEM_SIZE + '*' + BLUE_START + ';' +
        'j<' + BLUE_END + ';' +
        '++j,' + BLUE_PTR + '+=' + ELEM_SIZE + '){' +
        'var y0=' + BLUE_BOXES + '[' + AXIS + '+' + BLUE_PTR + '],' +
            (full ? 'y1=' + BLUE_BOXES + '[' + AXIS + '+' + BLUE_PTR + '+' + DIMENSION + '],' : '') +
            'yi=' + BLUE_INDEX + '[j];';
  if(redMajor) {
    code.push(redLoop, INNER_LABEL, ':', blueLoop);
  } else {
    code.push(blueLoop, INNER_LABEL, ':', redLoop);
  }
  if(full) {
    code.push('if(y1<x0||x1<y0)continue;');
  } else if(flip) {
    code.push('if(y0<=x0||x1<y0)continue;');
  } else {
    code.push('if(y0<x0||x1<y0)continue;');
  }
  code.push('for(var k='+AXIS+'+1;k<'+DIMENSION+';++k){'+
    'var r0='+RED_BOXES+'[k+'+RED_PTR+'],'+
        'r1='+RED_BOXES+'[k+'+DIMENSION+'+'+RED_PTR+'],'+
        'b0='+BLUE_BOXES+'[k+'+BLUE_PTR+'],'+
        'b1='+BLUE_BOXES+'[k+'+DIMENSION+'+'+BLUE_PTR+'];'+
      'if(r1<b0||b1<r0)continue ' + INNER_LABEL + ';}' +
      'var ' + RETVAL + '=' + VISIT + '(');
  if(flip) {
    code.push('yi,xi');
  } else {
    code.push('xi,yi');
  }
  code.push(');if(' + RETVAL + '!==void 0)return ' + RETVAL + ';}}}');
  return {
    name: funcName,
    code: code.join('')
  }
}
function bruteForcePlanner(full) {
  var funcName = 'bruteForce' + (full ? 'Full' : 'Partial');
  var prefix = [];
  var fargs = ARGS.slice();
  if(!full) {
    fargs.splice(3, 0, FLIP);
  }
  var code = ['function ' + funcName + '(' + fargs.join() + '){'];
  function invoke(redMajor, flip) {
    var res = generateBruteForce(redMajor, flip, full);
    prefix.push(res.code);
    code.push('return ' + res.name + '(' + ARGS.join() + ');');
  }
  code.push('if(' + RED_END + '-' + RED_START + '>' +
                    BLUE_END + '-' + BLUE_START + '){');
  if(full) {
    invoke(true, false);
    code.push('}else{');
    invoke(false, false);
  } else {
    code.push('if(' + FLIP + '){');
    invoke(true, true);
    code.push('}else{');
    invoke(true, false);
    code.push('}}else{if(' + FLIP + '){');
    invoke(false, true);
    code.push('}else{');
    invoke(false, false);
    code.push('}');
  }
  code.push('}}return ' + funcName);
  var codeStr = prefix.join('') + code.join('');
  var proc = new Function(codeStr);
  return proc()
}
var partial = bruteForcePlanner(false);
var full    = bruteForcePlanner(true);
var brute = {
	partial: partial,
	full: full
};

var partition = genPartition;
var code = 'for(var j=2*a,k=j*c,l=k,m=c,n=b,o=a+b,p=c;d>p;++p,k+=j){var _;if($)if(m===p)m+=1,l+=j;else{for(var s=0;j>s;++s){var t=e[k+s];e[k+s]=e[l],e[l++]=t}var u=f[p];f[p]=f[m],f[m++]=u}}return m';
function genPartition(predicate, args) {
  var fargs ='abcdef'.split('').concat(args);
  var reads = [];
  if(predicate.indexOf('lo') >= 0) {
    reads.push('lo=e[k+n]');
  }
  if(predicate.indexOf('hi') >= 0) {
    reads.push('hi=e[k+o]');
  }
  fargs.push(
    code.replace('_', reads.join())
        .replace('$', predicate));
  return Function.apply(void 0, fargs)
}

var median = findMedian;
var partitionStartLessThan = partition('lo<p0', ['p0']);
var PARTITION_THRESHOLD = 8;
function insertionSort$1(d, axis, start, end, boxes, ids) {
  var elemSize = 2 * d;
  var boxPtr = elemSize * (start+1) + axis;
  for(var i=start+1; i<end; ++i, boxPtr+=elemSize) {
    var x = boxes[boxPtr];
    for(var j=i, ptr=elemSize*(i-1);
        j>start && boxes[ptr+axis] > x;
        --j, ptr-=elemSize) {
      var aPtr = ptr;
      var bPtr = ptr+elemSize;
      for(var k=0; k<elemSize; ++k, ++aPtr, ++bPtr) {
        var y = boxes[aPtr];
        boxes[aPtr] = boxes[bPtr];
        boxes[bPtr] = y;
      }
      var tmp = ids[j];
      ids[j] = ids[j-1];
      ids[j-1] = tmp;
    }
  }
}
function findMedian(d, axis, start, end, boxes, ids) {
  if(end <= start+1) {
    return start
  }
  var lo       = start;
  var hi       = end;
  var mid      = ((end + start) >>> 1);
  var elemSize = 2*d;
  var pivot    = mid;
  var value    = boxes[elemSize*mid+axis];
  while(lo < hi) {
    if(hi - lo < PARTITION_THRESHOLD) {
      insertionSort$1(d, axis, lo, hi, boxes, ids);
      value = boxes[elemSize*mid+axis];
      break
    }
    var count  = hi - lo;
    var pivot0 = (Math.random()*count+lo)|0;
    var value0 = boxes[elemSize*pivot0 + axis];
    var pivot1 = (Math.random()*count+lo)|0;
    var value1 = boxes[elemSize*pivot1 + axis];
    var pivot2 = (Math.random()*count+lo)|0;
    var value2 = boxes[elemSize*pivot2 + axis];
    if(value0 <= value1) {
      if(value2 >= value1) {
        pivot = pivot1;
        value = value1;
      } else if(value0 >= value2) {
        pivot = pivot0;
        value = value0;
      } else {
        pivot = pivot2;
        value = value2;
      }
    } else {
      if(value1 >= value2) {
        pivot = pivot1;
        value = value1;
      } else if(value2 >= value0) {
        pivot = pivot0;
        value = value0;
      } else {
        pivot = pivot2;
        value = value2;
      }
    }
    var aPtr = elemSize * (hi-1);
    var bPtr = elemSize * pivot;
    for(var i=0; i<elemSize; ++i, ++aPtr, ++bPtr) {
      var x = boxes[aPtr];
      boxes[aPtr] = boxes[bPtr];
      boxes[bPtr] = x;
    }
    var y = ids[hi-1];
    ids[hi-1] = ids[pivot];
    ids[pivot] = y;
    pivot = partitionStartLessThan(
      d, axis,
      lo, hi-1, boxes, ids,
      value);
    var aPtr = elemSize * (hi-1);
    var bPtr = elemSize * pivot;
    for(var i=0; i<elemSize; ++i, ++aPtr, ++bPtr) {
      var x = boxes[aPtr];
      boxes[aPtr] = boxes[bPtr];
      boxes[bPtr] = x;
    }
    var y = ids[hi-1];
    ids[hi-1] = ids[pivot];
    ids[pivot] = y;
    if(mid < pivot) {
      hi = pivot-1;
      while(lo < hi &&
        boxes[elemSize*(hi-1)+axis] === value) {
        hi -= 1;
      }
      hi += 1;
    } else if(pivot < mid) {
      lo = pivot + 1;
      while(lo < hi &&
        boxes[elemSize*lo+axis] === value) {
        lo += 1;
      }
    } else {
      break
    }
  }
  return partitionStartLessThan(
    d, axis,
    start, mid, boxes, ids,
    boxes[elemSize*mid+axis])
}

var intersect = boxIntersectIter;
var bruteForcePartial = brute.partial;
var bruteForceFull = brute.full;
var BRUTE_FORCE_CUTOFF$1    = 128;
var SCAN_CUTOFF           = (1<<22);
var SCAN_COMPLETE_CUTOFF  = (1<<22);
var partitionInteriorContainsInterval = partition(
  '!(lo>=p0)&&!(p1>=hi)',
  ['p0', 'p1']);
var partitionStartEqual = partition(
  'lo===p0',
  ['p0']);
var partitionStartLessThan$1 = partition(
  'lo<p0',
  ['p0']);
var partitionEndLessThanEqual = partition(
  'hi<=p0',
  ['p0']);
var partitionContainsPoint = partition(
  'lo<=p0&&p0<=hi',
  ['p0']);
var partitionContainsPointProper = partition(
  'lo<p0&&p0<=hi',
  ['p0']);
var IFRAME_SIZE = 6;
var DFRAME_SIZE = 2;
var INIT_CAPACITY$1 = 1024;
var BOX_ISTACK  = pool.mallocInt32(INIT_CAPACITY$1);
var BOX_DSTACK  = pool.mallocDouble(INIT_CAPACITY$1);
function iterInit(d, count) {
  var levels = (8 * twiddle.log2(count+1) * (d+1))|0;
  var maxInts = twiddle.nextPow2(IFRAME_SIZE*levels);
  if(BOX_ISTACK.length < maxInts) {
    pool.free(BOX_ISTACK);
    BOX_ISTACK = pool.mallocInt32(maxInts);
  }
  var maxDoubles = twiddle.nextPow2(DFRAME_SIZE*levels);
  if(BOX_DSTACK.length < maxDoubles) {
    pool.free(BOX_DSTACK);
    BOX_DSTACK = pool.mallocDouble(maxDoubles);
  }
}
function iterPush(ptr,
  axis,
  redStart, redEnd,
  blueStart, blueEnd,
  state,
  lo, hi) {
  var iptr = IFRAME_SIZE * ptr;
  BOX_ISTACK[iptr]   = axis;
  BOX_ISTACK[iptr+1] = redStart;
  BOX_ISTACK[iptr+2] = redEnd;
  BOX_ISTACK[iptr+3] = blueStart;
  BOX_ISTACK[iptr+4] = blueEnd;
  BOX_ISTACK[iptr+5] = state;
  var dptr = DFRAME_SIZE * ptr;
  BOX_DSTACK[dptr]   = lo;
  BOX_DSTACK[dptr+1] = hi;
}
function onePointPartial(
  d, axis, visit, flip,
  redStart, redEnd, red, redIndex,
  blueOffset, blue, blueId) {
  var elemSize = 2 * d;
  var bluePtr  = blueOffset * elemSize;
  var blueX    = blue[bluePtr + axis];
red_loop:
  for(var i=redStart, redPtr=redStart*elemSize; i<redEnd; ++i, redPtr+=elemSize) {
    var r0 = red[redPtr+axis];
    var r1 = red[redPtr+axis+d];
    if(blueX < r0 || r1 < blueX) {
      continue
    }
    if(flip && blueX === r0) {
      continue
    }
    var redId = redIndex[i];
    for(var j=axis+1; j<d; ++j) {
      var r0 = red[redPtr+j];
      var r1 = red[redPtr+j+d];
      var b0 = blue[bluePtr+j];
      var b1 = blue[bluePtr+j+d];
      if(r1 < b0 || b1 < r0) {
        continue red_loop
      }
    }
    var retval;
    if(flip) {
      retval = visit(blueId, redId);
    } else {
      retval = visit(redId, blueId);
    }
    if(retval !== void 0) {
      return retval
    }
  }
}
function onePointFull(
  d, axis, visit,
  redStart, redEnd, red, redIndex,
  blueOffset, blue, blueId) {
  var elemSize = 2 * d;
  var bluePtr  = blueOffset * elemSize;
  var blueX    = blue[bluePtr + axis];
red_loop:
  for(var i=redStart, redPtr=redStart*elemSize; i<redEnd; ++i, redPtr+=elemSize) {
    var redId = redIndex[i];
    if(redId === blueId) {
      continue
    }
    var r0 = red[redPtr+axis];
    var r1 = red[redPtr+axis+d];
    if(blueX < r0 || r1 < blueX) {
      continue
    }
    for(var j=axis+1; j<d; ++j) {
      var r0 = red[redPtr+j];
      var r1 = red[redPtr+j+d];
      var b0 = blue[bluePtr+j];
      var b1 = blue[bluePtr+j+d];
      if(r1 < b0 || b1 < r0) {
        continue red_loop
      }
    }
    var retval = visit(redId, blueId);
    if(retval !== void 0) {
      return retval
    }
  }
}
function boxIntersectIter(
  d, visit, initFull,
  xSize, xBoxes, xIndex,
  ySize, yBoxes, yIndex) {
  iterInit(d, xSize + ySize);
  var top  = 0;
  var elemSize = 2 * d;
  var retval;
  iterPush(top++,
      0,
      0, xSize,
      0, ySize,
      initFull ? 16 : 0,
      -Infinity, Infinity);
  if(!initFull) {
    iterPush(top++,
      0,
      0, ySize,
      0, xSize,
      1,
      -Infinity, Infinity);
  }
  while(top > 0) {
    top  -= 1;
    var iptr = top * IFRAME_SIZE;
    var axis      = BOX_ISTACK[iptr];
    var redStart  = BOX_ISTACK[iptr+1];
    var redEnd    = BOX_ISTACK[iptr+2];
    var blueStart = BOX_ISTACK[iptr+3];
    var blueEnd   = BOX_ISTACK[iptr+4];
    var state     = BOX_ISTACK[iptr+5];
    var dptr = top * DFRAME_SIZE;
    var lo        = BOX_DSTACK[dptr];
    var hi        = BOX_DSTACK[dptr+1];
    var flip      = (state & 1);
    var full      = !!(state & 16);
    var red       = xBoxes;
    var redIndex  = xIndex;
    var blue      = yBoxes;
    var blueIndex = yIndex;
    if(flip) {
      red         = yBoxes;
      redIndex    = yIndex;
      blue        = xBoxes;
      blueIndex   = xIndex;
    }
    if(state & 2) {
      redEnd = partitionStartLessThan$1(
        d, axis,
        redStart, redEnd, red, redIndex,
        hi);
      if(redStart >= redEnd) {
        continue
      }
    }
    if(state & 4) {
      redStart = partitionEndLessThanEqual(
        d, axis,
        redStart, redEnd, red, redIndex,
        lo);
      if(redStart >= redEnd) {
        continue
      }
    }
    var redCount  = redEnd  - redStart;
    var blueCount = blueEnd - blueStart;
    if(full) {
      if(d * redCount * (redCount + blueCount) < SCAN_COMPLETE_CUTOFF) {
        retval = sweep.scanComplete(
          d, axis, visit,
          redStart, redEnd, red, redIndex,
          blueStart, blueEnd, blue, blueIndex);
        if(retval !== void 0) {
          return retval
        }
        continue
      }
    } else {
      if(d * Math.min(redCount, blueCount) < BRUTE_FORCE_CUTOFF$1) {
        retval = bruteForcePartial(
            d, axis, visit, flip,
            redStart,  redEnd,  red,  redIndex,
            blueStart, blueEnd, blue, blueIndex);
        if(retval !== void 0) {
          return retval
        }
        continue
      } else if(d * redCount * blueCount < SCAN_CUTOFF) {
        retval = sweep.scanBipartite(
          d, axis, visit, flip,
          redStart, redEnd, red, redIndex,
          blueStart, blueEnd, blue, blueIndex);
        if(retval !== void 0) {
          return retval
        }
        continue
      }
    }
    var red0 = partitionInteriorContainsInterval(
      d, axis,
      redStart, redEnd, red, redIndex,
      lo, hi);
    if(redStart < red0) {
      if(d * (red0 - redStart) < BRUTE_FORCE_CUTOFF$1) {
        retval = bruteForceFull(
          d, axis+1, visit,
          redStart, red0, red, redIndex,
          blueStart, blueEnd, blue, blueIndex);
        if(retval !== void 0) {
          return retval
        }
      } else if(axis === d-2) {
        if(flip) {
          retval = sweep.sweepBipartite(
            d, visit,
            blueStart, blueEnd, blue, blueIndex,
            redStart, red0, red, redIndex);
        } else {
          retval = sweep.sweepBipartite(
            d, visit,
            redStart, red0, red, redIndex,
            blueStart, blueEnd, blue, blueIndex);
        }
        if(retval !== void 0) {
          return retval
        }
      } else {
        iterPush(top++,
          axis+1,
          redStart, red0,
          blueStart, blueEnd,
          flip,
          -Infinity, Infinity);
        iterPush(top++,
          axis+1,
          blueStart, blueEnd,
          redStart, red0,
          flip^1,
          -Infinity, Infinity);
      }
    }
    if(red0 < redEnd) {
      var blue0 = median(
        d, axis,
        blueStart, blueEnd, blue, blueIndex);
      var mid = blue[elemSize * blue0 + axis];
      var blue1 = partitionStartEqual(
        d, axis,
        blue0, blueEnd, blue, blueIndex,
        mid);
      if(blue1 < blueEnd) {
        iterPush(top++,
          axis,
          red0, redEnd,
          blue1, blueEnd,
          (flip|4) + (full ? 16 : 0),
          mid, hi);
      }
      if(blueStart < blue0) {
        iterPush(top++,
          axis,
          red0, redEnd,
          blueStart, blue0,
          (flip|2) + (full ? 16 : 0),
          lo, mid);
      }
      if(blue0 + 1 === blue1) {
        if(full) {
          retval = onePointFull(
            d, axis, visit,
            red0, redEnd, red, redIndex,
            blue0, blue, blueIndex[blue0]);
        } else {
          retval = onePointPartial(
            d, axis, visit, flip,
            red0, redEnd, red, redIndex,
            blue0, blue, blueIndex[blue0]);
        }
        if(retval !== void 0) {
          return retval
        }
      } else if(blue0 < blue1) {
        var red1;
        if(full) {
          red1 = partitionContainsPoint(
            d, axis,
            red0, redEnd, red, redIndex,
            mid);
          if(red0 < red1) {
            var redX = partitionStartEqual(
              d, axis,
              red0, red1, red, redIndex,
              mid);
            if(axis === d-2) {
              if(red0 < redX) {
                retval = sweep.sweepComplete(
                  d, visit,
                  red0, redX, red, redIndex,
                  blue0, blue1, blue, blueIndex);
                if(retval !== void 0) {
                  return retval
                }
              }
              if(redX < red1) {
                retval = sweep.sweepBipartite(
                  d, visit,
                  redX, red1, red, redIndex,
                  blue0, blue1, blue, blueIndex);
                if(retval !== void 0) {
                  return retval
                }
              }
            } else {
              if(red0 < redX) {
                iterPush(top++,
                  axis+1,
                  red0, redX,
                  blue0, blue1,
                  16,
                  -Infinity, Infinity);
              }
              if(redX < red1) {
                iterPush(top++,
                  axis+1,
                  redX, red1,
                  blue0, blue1,
                  0,
                  -Infinity, Infinity);
                iterPush(top++,
                  axis+1,
                  blue0, blue1,
                  redX, red1,
                  1,
                  -Infinity, Infinity);
              }
            }
          }
        } else {
          if(flip) {
            red1 = partitionContainsPointProper(
              d, axis,
              red0, redEnd, red, redIndex,
              mid);
          } else {
            red1 = partitionContainsPoint(
              d, axis,
              red0, redEnd, red, redIndex,
              mid);
          }
          if(red0 < red1) {
            if(axis === d-2) {
              if(flip) {
                retval = sweep.sweepBipartite(
                  d, visit,
                  blue0, blue1, blue, blueIndex,
                  red0, red1, red, redIndex);
              } else {
                retval = sweep.sweepBipartite(
                  d, visit,
                  red0, red1, red, redIndex,
                  blue0, blue1, blue, blueIndex);
              }
            } else {
              iterPush(top++,
                axis+1,
                red0, red1,
                blue0, blue1,
                flip,
                -Infinity, Infinity);
              iterPush(top++,
                axis+1,
                blue0, blue1,
                red0, red1,
                flip^1,
                -Infinity, Infinity);
            }
          }
        }
      }
    }
  }
}

var boxIntersect_1 = boxIntersectWrapper;
function boxEmpty(d, box) {
  for(var j=0; j<d; ++j) {
    if(!(box[j] <= box[j+d])) {
      return true
    }
  }
  return false
}
function convertBoxes(boxes, d, data, ids) {
  var ptr = 0;
  var count = 0;
  for(var i=0, n=boxes.length; i<n; ++i) {
    var b = boxes[i];
    if(boxEmpty(d, b)) {
      continue
    }
    for(var j=0; j<2*d; ++j) {
      data[ptr++] = b[j];
    }
    ids[count++] = i;
  }
  return count
}
function boxIntersect(red, blue, visit, full) {
  var n = red.length;
  var m = blue.length;
  if(n <= 0 || m <= 0) {
    return
  }
  var d = (red[0].length)>>>1;
  if(d <= 0) {
    return
  }
  var retval;
  var redList  = pool.mallocDouble(2*d*n);
  var redIds   = pool.mallocInt32(n);
  n = convertBoxes(red, d, redList, redIds);
  if(n > 0) {
    if(d === 1 && full) {
      sweep.init(n);
      retval = sweep.sweepComplete(
        d, visit,
        0, n, redList, redIds,
        0, n, redList, redIds);
    } else {
      var blueList = pool.mallocDouble(2*d*m);
      var blueIds  = pool.mallocInt32(m);
      m = convertBoxes(blue, d, blueList, blueIds);
      if(m > 0) {
        sweep.init(n+m);
        if(d === 1) {
          retval = sweep.sweepBipartite(
            d, visit,
            0, n, redList,  redIds,
            0, m, blueList, blueIds);
        } else {
          retval = intersect(
            d, visit,    full,
            n, redList,  redIds,
            m, blueList, blueIds);
        }
        pool.free(blueList);
        pool.free(blueIds);
      }
    }
    pool.free(redList);
    pool.free(redIds);
  }
  return retval
}
var RESULT;
function appendItem(i,j) {
  RESULT.push([i,j]);
}
function intersectFullArray(x) {
  RESULT = [];
  boxIntersect(x, x, appendItem, true);
  return RESULT
}
function intersectBipartiteArray(x, y) {
  RESULT = [];
  boxIntersect(x, y, appendItem, false);
  return RESULT
}
function boxIntersectWrapper(arg0, arg1, arg2) {
  switch(arguments.length) {
    case 1:
      return intersectFullArray(arg0)
    case 2:
      if(typeof arg1 === 'function') {
        return boxIntersect(arg0, arg0, arg1, true)
      } else {
        return intersectBipartiteArray(arg0, arg1)
      }
    case 3:
      return boxIntersect(arg0, arg1, arg2, false)
    default:
      throw new Error('box-intersect: Invalid arguments')
  }
}

var segseg = segmentsIntersect;
var orient = orientation_1[3];
function checkCollinear(a0, a1, b0, b1) {
  for(var d=0; d<2; ++d) {
    var x0 = a0[d];
    var y0 = a1[d];
    var l0 = Math.min(x0, y0);
    var h0 = Math.max(x0, y0);
    var x1 = b0[d];
    var y1 = b1[d];
    var l1 = Math.min(x1, y1);
    var h1 = Math.max(x1, y1);
    if(h1 < l0 || h0 < l1) {
      return false
    }
  }
  return true
}
function segmentsIntersect(a0, a1, b0, b1) {
  var x0 = orient(a0, b0, b1);
  var y0 = orient(a1, b0, b1);
  if((x0 > 0 && y0 > 0) || (x0 < 0 && y0 < 0)) {
    return false
  }
  var x1 = orient(b0, a0, a1);
  var y1 = orient(b1, a0, a1);
  if((x1 > 0 && y1 > 0) || (x1 < 0 && y1 < 0)) {
    return false
  }
  if(x0 === 0 && y0 === 0 && x1 === 0 && y1 === 0) {
    return checkCollinear(a0, a1, b0, b1)
  }
  return true
}

var bn = createCommonjsModule(function (module) {
(function (module, exports) {
  function assert (val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }
  function inherits (ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }
  function BN (number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }
    this.negative = 0;
    this.words = null;
    this.length = 0;
    this.red = null;
    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }
      this._init(number || 0, base || 10, endian || 'be');
    }
  }
  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }
  BN.BN = BN;
  BN.wordSize = 26;
  var Buffer;
  try {
    Buffer = buffer.Buffer;
  } catch (e) {
  }
  BN.isBN = function isBN (num) {
    if (num instanceof BN) {
      return true;
    }
    return num !== null && typeof num === 'object' &&
      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };
  BN.max = function max (left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };
  BN.min = function min (left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };
  BN.prototype._init = function init (number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }
    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }
    if (base === 'hex') {
      base = 16;
    }
    assert(base === (base | 0) && base >= 2 && base <= 36);
    number = number.toString().replace(/\s+/g, '');
    var start = 0;
    if (number[0] === '-') {
      start++;
    }
    if (base === 16) {
      this._parseHex(number, start);
    } else {
      this._parseBase(number, base, start);
    }
    if (number[0] === '-') {
      this.negative = 1;
    }
    this.strip();
    if (endian !== 'le') return;
    this._initArray(this.toArray(), base, endian);
  };
  BN.prototype._initNumber = function _initNumber (number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }
    if (number < 0x4000000) {
      this.words = [ number & 0x3ffffff ];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff
      ];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000);
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff,
        1
      ];
      this.length = 3;
    }
    if (endian !== 'le') return;
    this._initArray(this.toArray(), base, endian);
  };
  BN.prototype._initArray = function _initArray (number, base, endian) {
    assert(typeof number.length === 'number');
    if (number.length <= 0) {
      this.words = [ 0 ];
      this.length = 1;
      return this;
    }
    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }
    var j, w;
    var off = 0;
    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }
    return this.strip();
  };
  function parseHex (str, start, end) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;
      r <<= 4;
      if (c >= 49 && c <= 54) {
        r |= c - 49 + 0xa;
      } else if (c >= 17 && c <= 22) {
        r |= c - 17 + 0xa;
      } else {
        r |= c & 0xf;
      }
    }
    return r;
  }
  BN.prototype._parseHex = function _parseHex (number, start) {
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }
    var j, w;
    var off = 0;
    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
      w = parseHex(number, i, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
      off += 24;
      if (off >= 26) {
        off -= 26;
        j++;
      }
    }
    if (i + 6 !== start) {
      w = parseHex(number, start, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
    }
    this.strip();
  };
  function parseBase (str, start, end, mul) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;
      r *= mul;
      if (c >= 49) {
        r += c - 49 + 0xa;
      } else if (c >= 17) {
        r += c - 17 + 0xa;
      } else {
        r += c;
      }
    }
    return r;
  }
  BN.prototype._parseBase = function _parseBase (number, base, start) {
    this.words = [ 0 ];
    this.length = 1;
    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }
    limbLen--;
    limbPow = (limbPow / base) | 0;
    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;
    var word = 0;
    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);
      this.imuln(limbPow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }
    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);
      for (i = 0; i < mod; i++) {
        pow *= base;
      }
      this.imuln(pow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }
  };
  BN.prototype.copy = function copy (dest) {
    dest.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }
    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };
  BN.prototype.clone = function clone () {
    var r = new BN(null);
    this.copy(r);
    return r;
  };
  BN.prototype._expand = function _expand (size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }
    return this;
  };
  BN.prototype.strip = function strip () {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }
    return this._normSign();
  };
  BN.prototype._normSign = function _normSign () {
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }
    return this;
  };
  BN.prototype.inspect = function inspect () {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  };
  var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
  ];
  var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
  ];
  var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
  ];
  BN.prototype.toString = function toString (base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;
    var out;
    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = (((w << off) | carry) & 0xffffff).toString(16);
        carry = (w >>> (24 - off)) & 0xffffff;
        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }
        off += 2;
        if (off >= 26) {
          off -= 26;
          i--;
        }
      }
      if (carry !== 0) {
        out = carry.toString(16) + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }
    if (base === (base | 0) && base >= 2 && base <= 36) {
      var groupSize = groupSizes[base];
      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;
      while (!c.isZero()) {
        var r = c.modn(groupBase).toString(base);
        c = c.idivn(groupBase);
        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }
      if (this.isZero()) {
        out = '0' + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }
    assert(false, 'Base should be between 2 and 36');
  };
  BN.prototype.toNumber = function toNumber () {
    var ret = this.words[0];
    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }
    return (this.negative !== 0) ? -ret : ret;
  };
  BN.prototype.toJSON = function toJSON () {
    return this.toString(16);
  };
  BN.prototype.toBuffer = function toBuffer (endian, length) {
    assert(typeof Buffer !== 'undefined');
    return this.toArrayLike(Buffer, endian, length);
  };
  BN.prototype.toArray = function toArray (endian, length) {
    return this.toArrayLike(Array, endian, length);
  };
  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');
    this.strip();
    var littleEndian = endian === 'le';
    var res = new ArrayType(reqLength);
    var b, i;
    var q = this.clone();
    if (!littleEndian) {
      for (i = 0; i < reqLength - byteLength; i++) {
        res[i] = 0;
      }
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);
        res[reqLength - i - 1] = b;
      }
    } else {
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);
        res[i] = b;
      }
      for (; i < reqLength; i++) {
        res[i] = 0;
      }
    }
    return res;
  };
  if (Math.clz32) {
    BN.prototype._countBits = function _countBits (w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits (w) {
      var t = w;
      var r = 0;
      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }
      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }
      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }
      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }
      return r + t;
    };
  }
  BN.prototype._zeroBits = function _zeroBits (w) {
    if (w === 0) return 26;
    var t = w;
    var r = 0;
    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }
    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }
    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }
    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }
    if ((t & 0x1) === 0) {
      r++;
    }
    return r;
  };
  BN.prototype.bitLength = function bitLength () {
    var w = this.words[this.length - 1];
    var hi = this._countBits(w);
    return (this.length - 1) * 26 + hi;
  };
  function toBitArray (num) {
    var w = new Array(num.bitLength());
    for (var bit = 0; bit < w.length; bit++) {
      var off = (bit / 26) | 0;
      var wbit = bit % 26;
      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
    }
    return w;
  }
  BN.prototype.zeroBits = function zeroBits () {
    if (this.isZero()) return 0;
    var r = 0;
    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);
      r += b;
      if (b !== 26) break;
    }
    return r;
  };
  BN.prototype.byteLength = function byteLength () {
    return Math.ceil(this.bitLength() / 8);
  };
  BN.prototype.toTwos = function toTwos (width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }
    return this.clone();
  };
  BN.prototype.fromTwos = function fromTwos (width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }
    return this.clone();
  };
  BN.prototype.isNeg = function isNeg () {
    return this.negative !== 0;
  };
  BN.prototype.neg = function neg () {
    return this.clone().ineg();
  };
  BN.prototype.ineg = function ineg () {
    if (!this.isZero()) {
      this.negative ^= 1;
    }
    return this;
  };
  BN.prototype.iuor = function iuor (num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }
    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }
    return this.strip();
  };
  BN.prototype.ior = function ior (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  };
  BN.prototype.or = function or (num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };
  BN.prototype.uor = function uor (num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  };
  BN.prototype.iuand = function iuand (num) {
    var b;
    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }
    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }
    this.length = b.length;
    return this.strip();
  };
  BN.prototype.iand = function iand (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  };
  BN.prototype.and = function and (num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };
  BN.prototype.uand = function uand (num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  };
  BN.prototype.iuxor = function iuxor (num) {
    var a;
    var b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }
    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }
    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }
    this.length = a.length;
    return this.strip();
  };
  BN.prototype.ixor = function ixor (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  };
  BN.prototype.xor = function xor (num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };
  BN.prototype.uxor = function uxor (num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  };
  BN.prototype.inotn = function inotn (width) {
    assert(typeof width === 'number' && width >= 0);
    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26;
    this._expand(bytesNeeded);
    if (bitsLeft > 0) {
      bytesNeeded--;
    }
    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    }
    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
    }
    return this.strip();
  };
  BN.prototype.notn = function notn (width) {
    return this.clone().inotn(width);
  };
  BN.prototype.setn = function setn (bit, val) {
    assert(typeof bit === 'number' && bit >= 0);
    var off = (bit / 26) | 0;
    var wbit = bit % 26;
    this._expand(off + 1);
    if (val) {
      this.words[off] = this.words[off] | (1 << wbit);
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }
    return this.strip();
  };
  BN.prototype.iadd = function iadd (num) {
    var r;
    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign();
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    }
    var a, b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }
    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    this.length = a.length;
    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++;
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }
    return this;
  };
  BN.prototype.add = function add (num) {
    var res;
    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }
    if (this.length > num.length) return this.clone().iadd(num);
    return num.clone().iadd(this);
  };
  BN.prototype.isub = function isub (num) {
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign();
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    }
    var cmp = this.cmp(num);
    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    }
    var a, b;
    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }
    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }
    this.length = Math.max(this.length, i);
    if (a !== this) {
      this.negative = 1;
    }
    return this.strip();
  };
  BN.prototype.sub = function sub (num) {
    return this.clone().isub(num);
  };
  function smallMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = (self.length + num.length) | 0;
    out.length = len;
    len = (len - 1) | 0;
    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;
    var lo = r & 0x3ffffff;
    var carry = (r / 0x4000000) | 0;
    out.words[0] = lo;
    for (var k = 1; k < len; k++) {
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = (k - j) | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += (r / 0x4000000) | 0;
        rword = r & 0x3ffffff;
      }
      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }
    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }
    return out.strip();
  }
  var comb10MulTo = function comb10MulTo (self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;
    out.negative = self.negative ^ num.negative;
    out.length = 19;
    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = (mid + Math.imul(ah0, bl0)) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
    w0 &= 0x3ffffff;
    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = (mid + Math.imul(ah1, bl0)) | 0;
    hi = Math.imul(ah1, bh0);
    lo = (lo + Math.imul(al0, bl1)) | 0;
    mid = (mid + Math.imul(al0, bh1)) | 0;
    mid = (mid + Math.imul(ah0, bl1)) | 0;
    hi = (hi + Math.imul(ah0, bh1)) | 0;
    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
    w1 &= 0x3ffffff;
    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = (mid + Math.imul(ah2, bl0)) | 0;
    hi = Math.imul(ah2, bh0);
    lo = (lo + Math.imul(al1, bl1)) | 0;
    mid = (mid + Math.imul(al1, bh1)) | 0;
    mid = (mid + Math.imul(ah1, bl1)) | 0;
    hi = (hi + Math.imul(ah1, bh1)) | 0;
    lo = (lo + Math.imul(al0, bl2)) | 0;
    mid = (mid + Math.imul(al0, bh2)) | 0;
    mid = (mid + Math.imul(ah0, bl2)) | 0;
    hi = (hi + Math.imul(ah0, bh2)) | 0;
    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
    w2 &= 0x3ffffff;
    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = (mid + Math.imul(ah3, bl0)) | 0;
    hi = Math.imul(ah3, bh0);
    lo = (lo + Math.imul(al2, bl1)) | 0;
    mid = (mid + Math.imul(al2, bh1)) | 0;
    mid = (mid + Math.imul(ah2, bl1)) | 0;
    hi = (hi + Math.imul(ah2, bh1)) | 0;
    lo = (lo + Math.imul(al1, bl2)) | 0;
    mid = (mid + Math.imul(al1, bh2)) | 0;
    mid = (mid + Math.imul(ah1, bl2)) | 0;
    hi = (hi + Math.imul(ah1, bh2)) | 0;
    lo = (lo + Math.imul(al0, bl3)) | 0;
    mid = (mid + Math.imul(al0, bh3)) | 0;
    mid = (mid + Math.imul(ah0, bl3)) | 0;
    hi = (hi + Math.imul(ah0, bh3)) | 0;
    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
    w3 &= 0x3ffffff;
    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = (mid + Math.imul(ah4, bl0)) | 0;
    hi = Math.imul(ah4, bh0);
    lo = (lo + Math.imul(al3, bl1)) | 0;
    mid = (mid + Math.imul(al3, bh1)) | 0;
    mid = (mid + Math.imul(ah3, bl1)) | 0;
    hi = (hi + Math.imul(ah3, bh1)) | 0;
    lo = (lo + Math.imul(al2, bl2)) | 0;
    mid = (mid + Math.imul(al2, bh2)) | 0;
    mid = (mid + Math.imul(ah2, bl2)) | 0;
    hi = (hi + Math.imul(ah2, bh2)) | 0;
    lo = (lo + Math.imul(al1, bl3)) | 0;
    mid = (mid + Math.imul(al1, bh3)) | 0;
    mid = (mid + Math.imul(ah1, bl3)) | 0;
    hi = (hi + Math.imul(ah1, bh3)) | 0;
    lo = (lo + Math.imul(al0, bl4)) | 0;
    mid = (mid + Math.imul(al0, bh4)) | 0;
    mid = (mid + Math.imul(ah0, bl4)) | 0;
    hi = (hi + Math.imul(ah0, bh4)) | 0;
    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
    w4 &= 0x3ffffff;
    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = (mid + Math.imul(ah5, bl0)) | 0;
    hi = Math.imul(ah5, bh0);
    lo = (lo + Math.imul(al4, bl1)) | 0;
    mid = (mid + Math.imul(al4, bh1)) | 0;
    mid = (mid + Math.imul(ah4, bl1)) | 0;
    hi = (hi + Math.imul(ah4, bh1)) | 0;
    lo = (lo + Math.imul(al3, bl2)) | 0;
    mid = (mid + Math.imul(al3, bh2)) | 0;
    mid = (mid + Math.imul(ah3, bl2)) | 0;
    hi = (hi + Math.imul(ah3, bh2)) | 0;
    lo = (lo + Math.imul(al2, bl3)) | 0;
    mid = (mid + Math.imul(al2, bh3)) | 0;
    mid = (mid + Math.imul(ah2, bl3)) | 0;
    hi = (hi + Math.imul(ah2, bh3)) | 0;
    lo = (lo + Math.imul(al1, bl4)) | 0;
    mid = (mid + Math.imul(al1, bh4)) | 0;
    mid = (mid + Math.imul(ah1, bl4)) | 0;
    hi = (hi + Math.imul(ah1, bh4)) | 0;
    lo = (lo + Math.imul(al0, bl5)) | 0;
    mid = (mid + Math.imul(al0, bh5)) | 0;
    mid = (mid + Math.imul(ah0, bl5)) | 0;
    hi = (hi + Math.imul(ah0, bh5)) | 0;
    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
    w5 &= 0x3ffffff;
    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = (mid + Math.imul(ah6, bl0)) | 0;
    hi = Math.imul(ah6, bh0);
    lo = (lo + Math.imul(al5, bl1)) | 0;
    mid = (mid + Math.imul(al5, bh1)) | 0;
    mid = (mid + Math.imul(ah5, bl1)) | 0;
    hi = (hi + Math.imul(ah5, bh1)) | 0;
    lo = (lo + Math.imul(al4, bl2)) | 0;
    mid = (mid + Math.imul(al4, bh2)) | 0;
    mid = (mid + Math.imul(ah4, bl2)) | 0;
    hi = (hi + Math.imul(ah4, bh2)) | 0;
    lo = (lo + Math.imul(al3, bl3)) | 0;
    mid = (mid + Math.imul(al3, bh3)) | 0;
    mid = (mid + Math.imul(ah3, bl3)) | 0;
    hi = (hi + Math.imul(ah3, bh3)) | 0;
    lo = (lo + Math.imul(al2, bl4)) | 0;
    mid = (mid + Math.imul(al2, bh4)) | 0;
    mid = (mid + Math.imul(ah2, bl4)) | 0;
    hi = (hi + Math.imul(ah2, bh4)) | 0;
    lo = (lo + Math.imul(al1, bl5)) | 0;
    mid = (mid + Math.imul(al1, bh5)) | 0;
    mid = (mid + Math.imul(ah1, bl5)) | 0;
    hi = (hi + Math.imul(ah1, bh5)) | 0;
    lo = (lo + Math.imul(al0, bl6)) | 0;
    mid = (mid + Math.imul(al0, bh6)) | 0;
    mid = (mid + Math.imul(ah0, bl6)) | 0;
    hi = (hi + Math.imul(ah0, bh6)) | 0;
    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
    w6 &= 0x3ffffff;
    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = (mid + Math.imul(ah7, bl0)) | 0;
    hi = Math.imul(ah7, bh0);
    lo = (lo + Math.imul(al6, bl1)) | 0;
    mid = (mid + Math.imul(al6, bh1)) | 0;
    mid = (mid + Math.imul(ah6, bl1)) | 0;
    hi = (hi + Math.imul(ah6, bh1)) | 0;
    lo = (lo + Math.imul(al5, bl2)) | 0;
    mid = (mid + Math.imul(al5, bh2)) | 0;
    mid = (mid + Math.imul(ah5, bl2)) | 0;
    hi = (hi + Math.imul(ah5, bh2)) | 0;
    lo = (lo + Math.imul(al4, bl3)) | 0;
    mid = (mid + Math.imul(al4, bh3)) | 0;
    mid = (mid + Math.imul(ah4, bl3)) | 0;
    hi = (hi + Math.imul(ah4, bh3)) | 0;
    lo = (lo + Math.imul(al3, bl4)) | 0;
    mid = (mid + Math.imul(al3, bh4)) | 0;
    mid = (mid + Math.imul(ah3, bl4)) | 0;
    hi = (hi + Math.imul(ah3, bh4)) | 0;
    lo = (lo + Math.imul(al2, bl5)) | 0;
    mid = (mid + Math.imul(al2, bh5)) | 0;
    mid = (mid + Math.imul(ah2, bl5)) | 0;
    hi = (hi + Math.imul(ah2, bh5)) | 0;
    lo = (lo + Math.imul(al1, bl6)) | 0;
    mid = (mid + Math.imul(al1, bh6)) | 0;
    mid = (mid + Math.imul(ah1, bl6)) | 0;
    hi = (hi + Math.imul(ah1, bh6)) | 0;
    lo = (lo + Math.imul(al0, bl7)) | 0;
    mid = (mid + Math.imul(al0, bh7)) | 0;
    mid = (mid + Math.imul(ah0, bl7)) | 0;
    hi = (hi + Math.imul(ah0, bh7)) | 0;
    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
    w7 &= 0x3ffffff;
    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = (mid + Math.imul(ah8, bl0)) | 0;
    hi = Math.imul(ah8, bh0);
    lo = (lo + Math.imul(al7, bl1)) | 0;
    mid = (mid + Math.imul(al7, bh1)) | 0;
    mid = (mid + Math.imul(ah7, bl1)) | 0;
    hi = (hi + Math.imul(ah7, bh1)) | 0;
    lo = (lo + Math.imul(al6, bl2)) | 0;
    mid = (mid + Math.imul(al6, bh2)) | 0;
    mid = (mid + Math.imul(ah6, bl2)) | 0;
    hi = (hi + Math.imul(ah6, bh2)) | 0;
    lo = (lo + Math.imul(al5, bl3)) | 0;
    mid = (mid + Math.imul(al5, bh3)) | 0;
    mid = (mid + Math.imul(ah5, bl3)) | 0;
    hi = (hi + Math.imul(ah5, bh3)) | 0;
    lo = (lo + Math.imul(al4, bl4)) | 0;
    mid = (mid + Math.imul(al4, bh4)) | 0;
    mid = (mid + Math.imul(ah4, bl4)) | 0;
    hi = (hi + Math.imul(ah4, bh4)) | 0;
    lo = (lo + Math.imul(al3, bl5)) | 0;
    mid = (mid + Math.imul(al3, bh5)) | 0;
    mid = (mid + Math.imul(ah3, bl5)) | 0;
    hi = (hi + Math.imul(ah3, bh5)) | 0;
    lo = (lo + Math.imul(al2, bl6)) | 0;
    mid = (mid + Math.imul(al2, bh6)) | 0;
    mid = (mid + Math.imul(ah2, bl6)) | 0;
    hi = (hi + Math.imul(ah2, bh6)) | 0;
    lo = (lo + Math.imul(al1, bl7)) | 0;
    mid = (mid + Math.imul(al1, bh7)) | 0;
    mid = (mid + Math.imul(ah1, bl7)) | 0;
    hi = (hi + Math.imul(ah1, bh7)) | 0;
    lo = (lo + Math.imul(al0, bl8)) | 0;
    mid = (mid + Math.imul(al0, bh8)) | 0;
    mid = (mid + Math.imul(ah0, bl8)) | 0;
    hi = (hi + Math.imul(ah0, bh8)) | 0;
    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
    w8 &= 0x3ffffff;
    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = (mid + Math.imul(ah9, bl0)) | 0;
    hi = Math.imul(ah9, bh0);
    lo = (lo + Math.imul(al8, bl1)) | 0;
    mid = (mid + Math.imul(al8, bh1)) | 0;
    mid = (mid + Math.imul(ah8, bl1)) | 0;
    hi = (hi + Math.imul(ah8, bh1)) | 0;
    lo = (lo + Math.imul(al7, bl2)) | 0;
    mid = (mid + Math.imul(al7, bh2)) | 0;
    mid = (mid + Math.imul(ah7, bl2)) | 0;
    hi = (hi + Math.imul(ah7, bh2)) | 0;
    lo = (lo + Math.imul(al6, bl3)) | 0;
    mid = (mid + Math.imul(al6, bh3)) | 0;
    mid = (mid + Math.imul(ah6, bl3)) | 0;
    hi = (hi + Math.imul(ah6, bh3)) | 0;
    lo = (lo + Math.imul(al5, bl4)) | 0;
    mid = (mid + Math.imul(al5, bh4)) | 0;
    mid = (mid + Math.imul(ah5, bl4)) | 0;
    hi = (hi + Math.imul(ah5, bh4)) | 0;
    lo = (lo + Math.imul(al4, bl5)) | 0;
    mid = (mid + Math.imul(al4, bh5)) | 0;
    mid = (mid + Math.imul(ah4, bl5)) | 0;
    hi = (hi + Math.imul(ah4, bh5)) | 0;
    lo = (lo + Math.imul(al3, bl6)) | 0;
    mid = (mid + Math.imul(al3, bh6)) | 0;
    mid = (mid + Math.imul(ah3, bl6)) | 0;
    hi = (hi + Math.imul(ah3, bh6)) | 0;
    lo = (lo + Math.imul(al2, bl7)) | 0;
    mid = (mid + Math.imul(al2, bh7)) | 0;
    mid = (mid + Math.imul(ah2, bl7)) | 0;
    hi = (hi + Math.imul(ah2, bh7)) | 0;
    lo = (lo + Math.imul(al1, bl8)) | 0;
    mid = (mid + Math.imul(al1, bh8)) | 0;
    mid = (mid + Math.imul(ah1, bl8)) | 0;
    hi = (hi + Math.imul(ah1, bh8)) | 0;
    lo = (lo + Math.imul(al0, bl9)) | 0;
    mid = (mid + Math.imul(al0, bh9)) | 0;
    mid = (mid + Math.imul(ah0, bl9)) | 0;
    hi = (hi + Math.imul(ah0, bh9)) | 0;
    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
    w9 &= 0x3ffffff;
    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = (mid + Math.imul(ah9, bl1)) | 0;
    hi = Math.imul(ah9, bh1);
    lo = (lo + Math.imul(al8, bl2)) | 0;
    mid = (mid + Math.imul(al8, bh2)) | 0;
    mid = (mid + Math.imul(ah8, bl2)) | 0;
    hi = (hi + Math.imul(ah8, bh2)) | 0;
    lo = (lo + Math.imul(al7, bl3)) | 0;
    mid = (mid + Math.imul(al7, bh3)) | 0;
    mid = (mid + Math.imul(ah7, bl3)) | 0;
    hi = (hi + Math.imul(ah7, bh3)) | 0;
    lo = (lo + Math.imul(al6, bl4)) | 0;
    mid = (mid + Math.imul(al6, bh4)) | 0;
    mid = (mid + Math.imul(ah6, bl4)) | 0;
    hi = (hi + Math.imul(ah6, bh4)) | 0;
    lo = (lo + Math.imul(al5, bl5)) | 0;
    mid = (mid + Math.imul(al5, bh5)) | 0;
    mid = (mid + Math.imul(ah5, bl5)) | 0;
    hi = (hi + Math.imul(ah5, bh5)) | 0;
    lo = (lo + Math.imul(al4, bl6)) | 0;
    mid = (mid + Math.imul(al4, bh6)) | 0;
    mid = (mid + Math.imul(ah4, bl6)) | 0;
    hi = (hi + Math.imul(ah4, bh6)) | 0;
    lo = (lo + Math.imul(al3, bl7)) | 0;
    mid = (mid + Math.imul(al3, bh7)) | 0;
    mid = (mid + Math.imul(ah3, bl7)) | 0;
    hi = (hi + Math.imul(ah3, bh7)) | 0;
    lo = (lo + Math.imul(al2, bl8)) | 0;
    mid = (mid + Math.imul(al2, bh8)) | 0;
    mid = (mid + Math.imul(ah2, bl8)) | 0;
    hi = (hi + Math.imul(ah2, bh8)) | 0;
    lo = (lo + Math.imul(al1, bl9)) | 0;
    mid = (mid + Math.imul(al1, bh9)) | 0;
    mid = (mid + Math.imul(ah1, bl9)) | 0;
    hi = (hi + Math.imul(ah1, bh9)) | 0;
    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
    w10 &= 0x3ffffff;
    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = (mid + Math.imul(ah9, bl2)) | 0;
    hi = Math.imul(ah9, bh2);
    lo = (lo + Math.imul(al8, bl3)) | 0;
    mid = (mid + Math.imul(al8, bh3)) | 0;
    mid = (mid + Math.imul(ah8, bl3)) | 0;
    hi = (hi + Math.imul(ah8, bh3)) | 0;
    lo = (lo + Math.imul(al7, bl4)) | 0;
    mid = (mid + Math.imul(al7, bh4)) | 0;
    mid = (mid + Math.imul(ah7, bl4)) | 0;
    hi = (hi + Math.imul(ah7, bh4)) | 0;
    lo = (lo + Math.imul(al6, bl5)) | 0;
    mid = (mid + Math.imul(al6, bh5)) | 0;
    mid = (mid + Math.imul(ah6, bl5)) | 0;
    hi = (hi + Math.imul(ah6, bh5)) | 0;
    lo = (lo + Math.imul(al5, bl6)) | 0;
    mid = (mid + Math.imul(al5, bh6)) | 0;
    mid = (mid + Math.imul(ah5, bl6)) | 0;
    hi = (hi + Math.imul(ah5, bh6)) | 0;
    lo = (lo + Math.imul(al4, bl7)) | 0;
    mid = (mid + Math.imul(al4, bh7)) | 0;
    mid = (mid + Math.imul(ah4, bl7)) | 0;
    hi = (hi + Math.imul(ah4, bh7)) | 0;
    lo = (lo + Math.imul(al3, bl8)) | 0;
    mid = (mid + Math.imul(al3, bh8)) | 0;
    mid = (mid + Math.imul(ah3, bl8)) | 0;
    hi = (hi + Math.imul(ah3, bh8)) | 0;
    lo = (lo + Math.imul(al2, bl9)) | 0;
    mid = (mid + Math.imul(al2, bh9)) | 0;
    mid = (mid + Math.imul(ah2, bl9)) | 0;
    hi = (hi + Math.imul(ah2, bh9)) | 0;
    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
    w11 &= 0x3ffffff;
    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = (mid + Math.imul(ah9, bl3)) | 0;
    hi = Math.imul(ah9, bh3);
    lo = (lo + Math.imul(al8, bl4)) | 0;
    mid = (mid + Math.imul(al8, bh4)) | 0;
    mid = (mid + Math.imul(ah8, bl4)) | 0;
    hi = (hi + Math.imul(ah8, bh4)) | 0;
    lo = (lo + Math.imul(al7, bl5)) | 0;
    mid = (mid + Math.imul(al7, bh5)) | 0;
    mid = (mid + Math.imul(ah7, bl5)) | 0;
    hi = (hi + Math.imul(ah7, bh5)) | 0;
    lo = (lo + Math.imul(al6, bl6)) | 0;
    mid = (mid + Math.imul(al6, bh6)) | 0;
    mid = (mid + Math.imul(ah6, bl6)) | 0;
    hi = (hi + Math.imul(ah6, bh6)) | 0;
    lo = (lo + Math.imul(al5, bl7)) | 0;
    mid = (mid + Math.imul(al5, bh7)) | 0;
    mid = (mid + Math.imul(ah5, bl7)) | 0;
    hi = (hi + Math.imul(ah5, bh7)) | 0;
    lo = (lo + Math.imul(al4, bl8)) | 0;
    mid = (mid + Math.imul(al4, bh8)) | 0;
    mid = (mid + Math.imul(ah4, bl8)) | 0;
    hi = (hi + Math.imul(ah4, bh8)) | 0;
    lo = (lo + Math.imul(al3, bl9)) | 0;
    mid = (mid + Math.imul(al3, bh9)) | 0;
    mid = (mid + Math.imul(ah3, bl9)) | 0;
    hi = (hi + Math.imul(ah3, bh9)) | 0;
    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
    w12 &= 0x3ffffff;
    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = (mid + Math.imul(ah9, bl4)) | 0;
    hi = Math.imul(ah9, bh4);
    lo = (lo + Math.imul(al8, bl5)) | 0;
    mid = (mid + Math.imul(al8, bh5)) | 0;
    mid = (mid + Math.imul(ah8, bl5)) | 0;
    hi = (hi + Math.imul(ah8, bh5)) | 0;
    lo = (lo + Math.imul(al7, bl6)) | 0;
    mid = (mid + Math.imul(al7, bh6)) | 0;
    mid = (mid + Math.imul(ah7, bl6)) | 0;
    hi = (hi + Math.imul(ah7, bh6)) | 0;
    lo = (lo + Math.imul(al6, bl7)) | 0;
    mid = (mid + Math.imul(al6, bh7)) | 0;
    mid = (mid + Math.imul(ah6, bl7)) | 0;
    hi = (hi + Math.imul(ah6, bh7)) | 0;
    lo = (lo + Math.imul(al5, bl8)) | 0;
    mid = (mid + Math.imul(al5, bh8)) | 0;
    mid = (mid + Math.imul(ah5, bl8)) | 0;
    hi = (hi + Math.imul(ah5, bh8)) | 0;
    lo = (lo + Math.imul(al4, bl9)) | 0;
    mid = (mid + Math.imul(al4, bh9)) | 0;
    mid = (mid + Math.imul(ah4, bl9)) | 0;
    hi = (hi + Math.imul(ah4, bh9)) | 0;
    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
    w13 &= 0x3ffffff;
    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = (mid + Math.imul(ah9, bl5)) | 0;
    hi = Math.imul(ah9, bh5);
    lo = (lo + Math.imul(al8, bl6)) | 0;
    mid = (mid + Math.imul(al8, bh6)) | 0;
    mid = (mid + Math.imul(ah8, bl6)) | 0;
    hi = (hi + Math.imul(ah8, bh6)) | 0;
    lo = (lo + Math.imul(al7, bl7)) | 0;
    mid = (mid + Math.imul(al7, bh7)) | 0;
    mid = (mid + Math.imul(ah7, bl7)) | 0;
    hi = (hi + Math.imul(ah7, bh7)) | 0;
    lo = (lo + Math.imul(al6, bl8)) | 0;
    mid = (mid + Math.imul(al6, bh8)) | 0;
    mid = (mid + Math.imul(ah6, bl8)) | 0;
    hi = (hi + Math.imul(ah6, bh8)) | 0;
    lo = (lo + Math.imul(al5, bl9)) | 0;
    mid = (mid + Math.imul(al5, bh9)) | 0;
    mid = (mid + Math.imul(ah5, bl9)) | 0;
    hi = (hi + Math.imul(ah5, bh9)) | 0;
    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
    w14 &= 0x3ffffff;
    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = (mid + Math.imul(ah9, bl6)) | 0;
    hi = Math.imul(ah9, bh6);
    lo = (lo + Math.imul(al8, bl7)) | 0;
    mid = (mid + Math.imul(al8, bh7)) | 0;
    mid = (mid + Math.imul(ah8, bl7)) | 0;
    hi = (hi + Math.imul(ah8, bh7)) | 0;
    lo = (lo + Math.imul(al7, bl8)) | 0;
    mid = (mid + Math.imul(al7, bh8)) | 0;
    mid = (mid + Math.imul(ah7, bl8)) | 0;
    hi = (hi + Math.imul(ah7, bh8)) | 0;
    lo = (lo + Math.imul(al6, bl9)) | 0;
    mid = (mid + Math.imul(al6, bh9)) | 0;
    mid = (mid + Math.imul(ah6, bl9)) | 0;
    hi = (hi + Math.imul(ah6, bh9)) | 0;
    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
    w15 &= 0x3ffffff;
    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = (mid + Math.imul(ah9, bl7)) | 0;
    hi = Math.imul(ah9, bh7);
    lo = (lo + Math.imul(al8, bl8)) | 0;
    mid = (mid + Math.imul(al8, bh8)) | 0;
    mid = (mid + Math.imul(ah8, bl8)) | 0;
    hi = (hi + Math.imul(ah8, bh8)) | 0;
    lo = (lo + Math.imul(al7, bl9)) | 0;
    mid = (mid + Math.imul(al7, bh9)) | 0;
    mid = (mid + Math.imul(ah7, bl9)) | 0;
    hi = (hi + Math.imul(ah7, bh9)) | 0;
    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
    w16 &= 0x3ffffff;
    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = (mid + Math.imul(ah9, bl8)) | 0;
    hi = Math.imul(ah9, bh8);
    lo = (lo + Math.imul(al8, bl9)) | 0;
    mid = (mid + Math.imul(al8, bh9)) | 0;
    mid = (mid + Math.imul(ah8, bl9)) | 0;
    hi = (hi + Math.imul(ah8, bh9)) | 0;
    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
    w17 &= 0x3ffffff;
    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = (mid + Math.imul(ah9, bl9)) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;
    if (c !== 0) {
      o[19] = c;
      out.length++;
    }
    return out;
  };
  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }
  function bigMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;
    var carry = 0;
    var hncarry = 0;
    for (var k = 0; k < out.length - 1; k++) {
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;
        var lo = r & 0x3ffffff;
        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
        lo = (lo + rword) | 0;
        rword = lo & 0x3ffffff;
        ncarry = (ncarry + (lo >>> 26)) | 0;
        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }
      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }
    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }
    return out.strip();
  }
  function jumboMulTo (self, num, out) {
    var fftm = new FFTM();
    return fftm.mulp(self, num, out);
  }
  BN.prototype.mulTo = function mulTo (num, out) {
    var res;
    var len = this.length + num.length;
    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }
    return res;
  };
  function FFTM (x, y) {
    this.x = x;
    this.y = y;
  }
  FFTM.prototype.makeRBT = function makeRBT (N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;
    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }
    return t;
  };
  FFTM.prototype.revBin = function revBin (x, l, N) {
    if (x === 0 || x === N - 1) return x;
    var rb = 0;
    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << (l - i - 1);
      x >>= 1;
    }
    return rb;
  };
  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };
  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);
    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;
      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);
      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;
        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];
          var ro = rtws[p + j + s];
          var io = itws[p + j + s];
          var rx = rtwdf_ * ro - itwdf_ * io;
          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;
          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;
          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;
          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;
            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };
  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;
    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }
    return 1 << i + 1 + odd;
  };
  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
    if (N <= 1) return;
    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];
      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;
      t = iws[i];
      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };
  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
    var carry = 0;
    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
        Math.round(ws[2 * i] / N) +
        carry;
      ws[i] = w & 0x3ffffff;
      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }
    return ws;
  };
  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
    var carry = 0;
    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);
      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
    }
    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }
    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };
  FFTM.prototype.stub = function stub (N) {
    var ph = new Array(N);
    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }
    return ph;
  };
  FFTM.prototype.mulp = function mulp (x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);
    var rbt = this.makeRBT(N);
    var _ = this.stub(N);
    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);
    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);
    var rmws = out.words;
    rmws.length = N;
    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);
    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);
    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }
    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);
    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out.strip();
  };
  BN.prototype.mul = function mul (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  };
  BN.prototype.mulf = function mulf (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  };
  BN.prototype.imul = function imul (num) {
    return this.clone().mulTo(num, this);
  };
  BN.prototype.imuln = function imuln (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += (w / 0x4000000) | 0;
      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };
  BN.prototype.muln = function muln (num) {
    return this.clone().imuln(num);
  };
  BN.prototype.sqr = function sqr () {
    return this.mul(this);
  };
  BN.prototype.isqr = function isqr () {
    return this.imul(this.clone());
  };
  BN.prototype.pow = function pow (num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1);
    var res = this;
    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }
    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;
        res = res.mul(q);
      }
    }
    return res;
  };
  BN.prototype.iushln = function iushln (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
    var i;
    if (r !== 0) {
      var carry = 0;
      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = ((this.words[i] | 0) - newCarry) << r;
        this.words[i] = c | carry;
        carry = newCarry >>> (26 - r);
      }
      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }
    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }
      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }
      this.length += s;
    }
    return this.strip();
  };
  BN.prototype.ishln = function ishln (bits) {
    assert(this.negative === 0);
    return this.iushln(bits);
  };
  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;
    if (hint) {
      h = (hint - (hint % 26)) / 26;
    } else {
      h = 0;
    }
    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
    var maskedWords = extended;
    h -= s;
    h = Math.max(0, h);
    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }
      maskedWords.length = s;
    }
    if (s === 0) ; else if (this.length > s) {
      this.length -= s;
      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }
    var carry = 0;
    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = (carry << (26 - r)) | (word >>> r);
      carry = word & mask;
    }
    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }
    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }
    return this.strip();
  };
  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  };
  BN.prototype.shln = function shln (bits) {
    return this.clone().ishln(bits);
  };
  BN.prototype.ushln = function ushln (bits) {
    return this.clone().iushln(bits);
  };
  BN.prototype.shrn = function shrn (bits) {
    return this.clone().ishrn(bits);
  };
  BN.prototype.ushrn = function ushrn (bits) {
    return this.clone().iushrn(bits);
  };
  BN.prototype.testn = function testn (bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;
    if (this.length <= s) return false;
    var w = this.words[s];
    return !!(w & q);
  };
  BN.prototype.imaskn = function imaskn (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    assert(this.negative === 0, 'imaskn works only with positive numbers');
    if (this.length <= s) {
      return this;
    }
    if (r !== 0) {
      s++;
    }
    this.length = Math.min(s, this.length);
    if (r !== 0) {
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      this.words[this.length - 1] &= mask;
    }
    return this.strip();
  };
  BN.prototype.maskn = function maskn (bits) {
    return this.clone().imaskn(bits);
  };
  BN.prototype.iaddn = function iaddn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num);
    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) < num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }
      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    }
    return this._iaddn(num);
  };
  BN.prototype._iaddn = function _iaddn (num) {
    this.words[0] += num;
    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;
      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }
    this.length = Math.max(this.length, i + 1);
    return this;
  };
  BN.prototype.isubn = function isubn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);
    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }
    this.words[0] -= num;
    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }
    return this.strip();
  };
  BN.prototype.addn = function addn (num) {
    return this.clone().iaddn(num);
  };
  BN.prototype.subn = function subn (num) {
    return this.clone().isubn(num);
  };
  BN.prototype.iabs = function iabs () {
    this.negative = 0;
    return this;
  };
  BN.prototype.abs = function abs () {
    return this.clone().iabs();
  };
  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
    var len = num.length + shift;
    var i;
    this._expand(len);
    var w;
    var carry = 0;
    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - ((right / 0x4000000) | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }
    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }
    if (carry === 0) return this.strip();
    assert(carry === -1);
    carry = 0;
    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }
    this.negative = 1;
    return this.strip();
  };
  BN.prototype._wordDiv = function _wordDiv (num, mode) {
    var shift = this.length - num.length;
    var a = this.clone();
    var b = num;
    var bhi = b.words[b.length - 1] | 0;
    var bhiBits = this._countBits(bhi);
    shift = 26 - bhiBits;
    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    }
    var m = a.length - b.length;
    var q;
    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);
      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }
    var diff = a.clone()._ishlnsubmul(b, 1, m);
    if (diff.negative === 0) {
      a = diff;
      if (q) {
        q.words[m] = 1;
      }
    }
    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
        (a.words[b.length + j - 1] | 0);
      qj = Math.min((qj / bhi) | 0, 0x3ffffff);
      a._ishlnsubmul(b, qj, j);
      while (a.negative !== 0) {
        qj--;
        a.negative = 0;
        a._ishlnsubmul(b, 1, j);
        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }
      if (q) {
        q.words[j] = qj;
      }
    }
    if (q) {
      q.strip();
    }
    a.strip();
    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }
    return {
      div: q || null,
      mod: a
    };
  };
  BN.prototype.divmod = function divmod (num, mode, positive) {
    assert(!num.isZero());
    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }
    var div, mod, res;
    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);
      if (mode !== 'mod') {
        div = res.div.neg();
      }
      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }
      return {
        div: div,
        mod: mod
      };
    }
    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);
      if (mode !== 'mod') {
        div = res.div.neg();
      }
      return {
        div: div,
        mod: res.mod
      };
    }
    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);
      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }
      return {
        div: res.div,
        mod: mod
      };
    }
    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    }
    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }
      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modn(num.words[0]))
        };
      }
      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modn(num.words[0]))
      };
    }
    return this._wordDiv(num, mode);
  };
  BN.prototype.div = function div (num) {
    return this.divmod(num, 'div', false).div;
  };
  BN.prototype.mod = function mod (num) {
    return this.divmod(num, 'mod', false).mod;
  };
  BN.prototype.umod = function umod (num) {
    return this.divmod(num, 'mod', true).mod;
  };
  BN.prototype.divRound = function divRound (num) {
    var dm = this.divmod(num);
    if (dm.mod.isZero()) return dm.div;
    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half);
    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;
    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };
  BN.prototype.modn = function modn (num) {
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;
    var acc = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }
    return acc;
  };
  BN.prototype.idivn = function idivn (num) {
    assert(num <= 0x3ffffff);
    var carry = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = (w / num) | 0;
      carry = w % num;
    }
    return this.strip();
  };
  BN.prototype.divn = function divn (num) {
    return this.clone().idivn(num);
  };
  BN.prototype.egcd = function egcd (p) {
    assert(p.negative === 0);
    assert(!p.isZero());
    var x = this;
    var y = p.clone();
    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    }
    var A = new BN(1);
    var B = new BN(0);
    var C = new BN(0);
    var D = new BN(1);
    var g = 0;
    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }
    var yp = y.clone();
    var xp = x.clone();
    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        x.iushrn(i);
        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }
          A.iushrn(1);
          B.iushrn(1);
        }
      }
      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        y.iushrn(j);
        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }
          C.iushrn(1);
          D.iushrn(1);
        }
      }
      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }
    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  };
  BN.prototype._invmp = function _invmp (p) {
    assert(p.negative === 0);
    assert(!p.isZero());
    var a = this;
    var b = p.clone();
    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }
    var x1 = new BN(1);
    var x2 = new BN(0);
    var delta = b.clone();
    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        a.iushrn(i);
        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }
          x1.iushrn(1);
        }
      }
      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        b.iushrn(j);
        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }
          x2.iushrn(1);
        }
      }
      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }
    var res;
    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }
    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }
    return res;
  };
  BN.prototype.gcd = function gcd (num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();
    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0;
    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }
    do {
      while (a.isEven()) {
        a.iushrn(1);
      }
      while (b.isEven()) {
        b.iushrn(1);
      }
      var r = a.cmp(b);
      if (r < 0) {
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }
      a.isub(b);
    } while (true);
    return b.iushln(shift);
  };
  BN.prototype.invm = function invm (num) {
    return this.egcd(num).a.umod(num);
  };
  BN.prototype.isEven = function isEven () {
    return (this.words[0] & 1) === 0;
  };
  BN.prototype.isOdd = function isOdd () {
    return (this.words[0] & 1) === 1;
  };
  BN.prototype.andln = function andln (num) {
    return this.words[0] & num;
  };
  BN.prototype.bincn = function bincn (bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;
    if (this.length <= s) {
      this._expand(s + 1);
      this.words[s] |= q;
      return this;
    }
    var carry = q;
    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };
  BN.prototype.isZero = function isZero () {
    return this.length === 1 && this.words[0] === 0;
  };
  BN.prototype.cmpn = function cmpn (num) {
    var negative = num < 0;
    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;
    this.strip();
    var res;
    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }
      assert(num <= 0x3ffffff, 'Number is too big');
      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }
    if (this.negative !== 0) return -res | 0;
    return res;
  };
  BN.prototype.cmp = function cmp (num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;
    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  };
  BN.prototype.ucmp = function ucmp (num) {
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;
    var res = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;
      if (a === b) continue;
      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }
      break;
    }
    return res;
  };
  BN.prototype.gtn = function gtn (num) {
    return this.cmpn(num) === 1;
  };
  BN.prototype.gt = function gt (num) {
    return this.cmp(num) === 1;
  };
  BN.prototype.gten = function gten (num) {
    return this.cmpn(num) >= 0;
  };
  BN.prototype.gte = function gte (num) {
    return this.cmp(num) >= 0;
  };
  BN.prototype.ltn = function ltn (num) {
    return this.cmpn(num) === -1;
  };
  BN.prototype.lt = function lt (num) {
    return this.cmp(num) === -1;
  };
  BN.prototype.lten = function lten (num) {
    return this.cmpn(num) <= 0;
  };
  BN.prototype.lte = function lte (num) {
    return this.cmp(num) <= 0;
  };
  BN.prototype.eqn = function eqn (num) {
    return this.cmpn(num) === 0;
  };
  BN.prototype.eq = function eq (num) {
    return this.cmp(num) === 0;
  };
  BN.red = function red (num) {
    return new Red(num);
  };
  BN.prototype.toRed = function toRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };
  BN.prototype.fromRed = function fromRed () {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };
  BN.prototype._forceRed = function _forceRed (ctx) {
    this.red = ctx;
    return this;
  };
  BN.prototype.forceRed = function forceRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };
  BN.prototype.redAdd = function redAdd (num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };
  BN.prototype.redIAdd = function redIAdd (num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };
  BN.prototype.redSub = function redSub (num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };
  BN.prototype.redISub = function redISub (num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };
  BN.prototype.redShl = function redShl (num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };
  BN.prototype.redMul = function redMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.mul(this, num);
  };
  BN.prototype.redIMul = function redIMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.imul(this, num);
  };
  BN.prototype.redSqr = function redSqr () {
    assert(this.red, 'redSqr works only with red numbers');
    this.red._verify1(this);
    return this.red.sqr(this);
  };
  BN.prototype.redISqr = function redISqr () {
    assert(this.red, 'redISqr works only with red numbers');
    this.red._verify1(this);
    return this.red.isqr(this);
  };
  BN.prototype.redSqrt = function redSqrt () {
    assert(this.red, 'redSqrt works only with red numbers');
    this.red._verify1(this);
    return this.red.sqrt(this);
  };
  BN.prototype.redInvm = function redInvm () {
    assert(this.red, 'redInvm works only with red numbers');
    this.red._verify1(this);
    return this.red.invm(this);
  };
  BN.prototype.redNeg = function redNeg () {
    assert(this.red, 'redNeg works only with red numbers');
    this.red._verify1(this);
    return this.red.neg(this);
  };
  BN.prototype.redPow = function redPow (num) {
    assert(this.red && !num.red, 'redPow(normalNum)');
    this.red._verify1(this);
    return this.red.pow(this, num);
  };
  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  };
  function MPrime (name, p) {
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);
    this.tmp = this._tmp();
  }
  MPrime.prototype._tmp = function _tmp () {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };
  MPrime.prototype.ireduce = function ireduce (num) {
    var r = num;
    var rlen;
    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);
    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      r.strip();
    }
    return r;
  };
  MPrime.prototype.split = function split (input, out) {
    input.iushrn(this.n, 0, out);
  };
  MPrime.prototype.imulK = function imulK (num) {
    return num.imul(this.k);
  };
  function K256 () {
    MPrime.call(
      this,
      'k256',
      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }
  inherits(K256, MPrime);
  K256.prototype.split = function split (input, output) {
    var mask = 0x3fffff;
    var outLen = Math.min(input.length, 9);
    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }
    output.length = outLen;
    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    }
    var prev = input.words[9];
    output.words[output.length++] = prev & mask;
    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
      prev = next;
    }
    prev >>>= 22;
    input.words[i - 10] = prev;
    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };
  K256.prototype.imulK = function imulK (num) {
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2;
    var lo = 0;
    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + ((lo / 0x4000000) | 0);
    }
    if (num.words[num.length - 1] === 0) {
      num.length--;
      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }
    return num;
  };
  function P224 () {
    MPrime.call(
      this,
      'p224',
      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }
  inherits(P224, MPrime);
  function P192 () {
    MPrime.call(
      this,
      'p192',
      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }
  inherits(P192, MPrime);
  function P25519 () {
    MPrime.call(
      this,
      '25519',
      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }
  inherits(P25519, MPrime);
  P25519.prototype.imulK = function imulK (num) {
    var carry = 0;
    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;
      num.words[i] = lo;
      carry = hi;
    }
    if (carry !== 0) {
      num.words[num.length++] = carry;
    }
    return num;
  };
  BN._prime = function prime (name) {
    if (primes[name]) return primes[name];
    var prime;
    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }
    primes[name] = prime;
    return prime;
  };
  function Red (m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);
      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }
  Red.prototype._verify1 = function _verify1 (a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };
  Red.prototype._verify2 = function _verify2 (a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red,
      'red works only with red numbers');
  };
  Red.prototype.imod = function imod (a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    return a.umod(this.m)._forceRed(this);
  };
  Red.prototype.neg = function neg (a) {
    if (a.isZero()) {
      return a.clone();
    }
    return this.m.sub(a)._forceRed(this);
  };
  Red.prototype.add = function add (a, b) {
    this._verify2(a, b);
    var res = a.add(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res._forceRed(this);
  };
  Red.prototype.iadd = function iadd (a, b) {
    this._verify2(a, b);
    var res = a.iadd(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res;
  };
  Red.prototype.sub = function sub (a, b) {
    this._verify2(a, b);
    var res = a.sub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res._forceRed(this);
  };
  Red.prototype.isub = function isub (a, b) {
    this._verify2(a, b);
    var res = a.isub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res;
  };
  Red.prototype.shl = function shl (a, num) {
    this._verify1(a);
    return this.imod(a.ushln(num));
  };
  Red.prototype.imul = function imul (a, b) {
    this._verify2(a, b);
    return this.imod(a.imul(b));
  };
  Red.prototype.mul = function mul (a, b) {
    this._verify2(a, b);
    return this.imod(a.mul(b));
  };
  Red.prototype.isqr = function isqr (a) {
    return this.imul(a, a.clone());
  };
  Red.prototype.sqr = function sqr (a) {
    return this.mul(a, a);
  };
  Red.prototype.sqrt = function sqrt (a) {
    if (a.isZero()) return a.clone();
    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1);
    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    }
    var q = this.m.subn(1);
    var s = 0;
    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }
    assert(!q.isZero());
    var one = new BN(1).toRed(this);
    var nOne = one.redNeg();
    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);
    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }
    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;
    while (t.cmp(one) !== 0) {
      var tmp = t;
      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }
      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));
      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }
    return r;
  };
  Red.prototype.invm = function invm (a) {
    var inv = a._invmp(this.m);
    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };
  Red.prototype.pow = function pow (a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();
    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;
    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }
    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;
    if (start === 0) {
      start = 26;
    }
    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];
      for (var j = start - 1; j >= 0; j--) {
        var bit = (word >> j) & 1;
        if (res !== wnd[0]) {
          res = this.sqr(res);
        }
        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }
        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;
        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }
      start = 26;
    }
    return res;
  };
  Red.prototype.convertTo = function convertTo (num) {
    var r = num.umod(this.m);
    return r === num ? r.clone() : r;
  };
  Red.prototype.convertFrom = function convertFrom (num) {
    var res = num.clone();
    res.red = null;
    return res;
  };
  BN.mont = function mont (num) {
    return new Mont(num);
  };
  function Mont (m) {
    Red.call(this, m);
    this.shift = this.m.bitLength();
    if (this.shift % 26 !== 0) {
      this.shift += 26 - (this.shift % 26);
    }
    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);
    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }
  inherits(Mont, Red);
  Mont.prototype.convertTo = function convertTo (num) {
    return this.imod(num.ushln(this.shift));
  };
  Mont.prototype.convertFrom = function convertFrom (num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };
  Mont.prototype.imul = function imul (a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }
    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }
    return res._forceRed(this);
  };
  Mont.prototype.mul = function mul (a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);
    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }
    return res._forceRed(this);
  };
  Mont.prototype.invm = function invm (a) {
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})( module, commonjsGlobal);
});

var isBn = isBN;
function isBN(x) {
  return x && typeof x === 'object' && Boolean(x.words)
}

var isRat_1 = isRat;
function isRat(x) {
  return Array.isArray(x) && x.length === 2 && isBn(x[0]) && isBn(x[1])
}

var double_1 = createCommonjsModule(function (module) {
var hasTypedArrays = false;
if(typeof Float64Array !== "undefined") {
  var DOUBLE_VIEW = new Float64Array(1)
    , UINT_VIEW   = new Uint32Array(DOUBLE_VIEW.buffer);
  DOUBLE_VIEW[0] = 1.0;
  hasTypedArrays = true;
  if(UINT_VIEW[1] === 0x3ff00000) {
    module.exports = function doubleBitsLE(n) {
      DOUBLE_VIEW[0] = n;
      return [ UINT_VIEW[0], UINT_VIEW[1] ]
    };
    function toDoubleLE(lo, hi) {
      UINT_VIEW[0] = lo;
      UINT_VIEW[1] = hi;
      return DOUBLE_VIEW[0]
    }
    module.exports.pack = toDoubleLE;
    function lowUintLE(n) {
      DOUBLE_VIEW[0] = n;
      return UINT_VIEW[0]
    }
    module.exports.lo = lowUintLE;
    function highUintLE(n) {
      DOUBLE_VIEW[0] = n;
      return UINT_VIEW[1]
    }
    module.exports.hi = highUintLE;
  } else if(UINT_VIEW[0] === 0x3ff00000) {
    module.exports = function doubleBitsBE(n) {
      DOUBLE_VIEW[0] = n;
      return [ UINT_VIEW[1], UINT_VIEW[0] ]
    };
    function toDoubleBE(lo, hi) {
      UINT_VIEW[1] = lo;
      UINT_VIEW[0] = hi;
      return DOUBLE_VIEW[0]
    }
    module.exports.pack = toDoubleBE;
    function lowUintBE(n) {
      DOUBLE_VIEW[0] = n;
      return UINT_VIEW[1]
    }
    module.exports.lo = lowUintBE;
    function highUintBE(n) {
      DOUBLE_VIEW[0] = n;
      return UINT_VIEW[0]
    }
    module.exports.hi = highUintBE;
  } else {
    hasTypedArrays = false;
  }
}
if(!hasTypedArrays) {
  var buffer = new Buffer(8);
  module.exports = function doubleBits(n) {
    buffer.writeDoubleLE(n, 0, true);
    return [ buffer.readUInt32LE(0, true), buffer.readUInt32LE(4, true) ]
  };
  function toDouble(lo, hi) {
    buffer.writeUInt32LE(lo, 0, true);
    buffer.writeUInt32LE(hi, 4, true);
    return buffer.readDoubleLE(0, true)
  }
  module.exports.pack = toDouble;
  function lowUint(n) {
    buffer.writeDoubleLE(n, 0, true);
    return buffer.readUInt32LE(0, true)
  }
  module.exports.lo = lowUint;
  function highUint(n) {
    buffer.writeDoubleLE(n, 0, true);
    return buffer.readUInt32LE(4, true)
  }
  module.exports.hi = highUint;
}
module.exports.sign = function(n) {
  return module.exports.hi(n) >>> 31
};
module.exports.exponent = function(n) {
  var b = module.exports.hi(n);
  return ((b<<1) >>> 21) - 1023
};
module.exports.fraction = function(n) {
  var lo = module.exports.lo(n);
  var hi = module.exports.hi(n);
  var b = hi & ((1<<20) - 1);
  if(hi & 0x7ff00000) {
    b += (1<<20);
  }
  return [lo, b]
};
module.exports.denormalized = function(n) {
  var hi = module.exports.hi(n);
  return !(hi & 0x7ff00000)
};
});
var double_2 = double_1.pack;
var double_3 = double_1.lo;
var double_4 = double_1.hi;
var double_5 = double_1.sign;
var double_6 = double_1.exponent;
var double_7 = double_1.fraction;
var double_8 = double_1.denormalized;

var numToBn = num2bn;
function num2bn(x) {
  var e = double_1.exponent(x);
  if(e < 52) {
    return new bn(x)
  } else {
    return (new bn(x * Math.pow(2, 52-e))).ushln(e-52)
  }
}

var strToBn = str2BN;
function str2BN(x) {
  return new bn(x)
}

var bnSign = sign$2;
function sign$2 (x) {
  return x.cmp(new bn(0))
}

var rationalize_1 = rationalize;
function rationalize(numer, denom) {
  var snumer = bnSign(numer);
  var sdenom = bnSign(denom);
  if(snumer === 0) {
    return [numToBn(0), numToBn(1)]
  }
  if(sdenom === 0) {
    return [numToBn(0), numToBn(0)]
  }
  if(sdenom < 0) {
    numer = numer.neg();
    denom = denom.neg();
  }
  var d = numer.gcd(denom);
  if(d.cmpn(1)) {
    return [ numer.div(d), denom.div(d) ]
  }
  return [ numer, denom ]
}

var div_1 = div;
function div(a, b) {
  return rationalize_1(a[0].mul(b[1]), a[1].mul(b[0]))
}

var bigRat = makeRational;
function makeRational(numer, denom) {
  if(isRat_1(numer)) {
    if(denom) {
      return div_1(numer, makeRational(denom))
    }
    return [numer[0].clone(), numer[1].clone()]
  }
  var shift = 0;
  var a, b;
  if(isBn(numer)) {
    a = numer.clone();
  } else if(typeof numer === 'string') {
    a = strToBn(numer);
  } else if(numer === 0) {
    return [numToBn(0), numToBn(1)]
  } else if(numer === Math.floor(numer)) {
    a = numToBn(numer);
  } else {
    while(numer !== Math.floor(numer)) {
      numer = numer * Math.pow(2, 256);
      shift -= 256;
    }
    a = numToBn(numer);
  }
  if(isRat_1(denom)) {
    a.mul(denom[1]);
    b = denom[0].clone();
  } else if(isBn(denom)) {
    b = denom.clone();
  } else if(typeof denom === 'string') {
    b = strToBn(denom);
  } else if(!denom) {
    b = numToBn(1);
  } else if(denom === Math.floor(denom)) {
    b = numToBn(denom);
  } else {
    while(denom !== Math.floor(denom)) {
      denom = denom * Math.pow(2, 256);
      shift += 256;
    }
    b = numToBn(denom);
  }
  if(shift > 0) {
    a = a.ushln(shift);
  } else if(shift < 0) {
    b = b.ushln(-shift);
  }
  return rationalize_1(a, b)
}

var cmp_1 = cmp;
function cmp(a, b) {
    return a[0].mul(b[1]).cmp(b[0].mul(a[1]))
}

var bnToNum = bn2num;
function bn2num(b) {
  var l = b.length;
  var words = b.words;
  var out = 0;
  if (l === 1) {
    out = words[0];
  } else if (l === 2) {
    out = words[0] + (words[1] * 0x4000000);
  } else {
    for (var i = 0; i < l; i++) {
      var w = words[i];
      out += w * Math.pow(0x4000000, i);
    }
  }
  return bnSign(b) * out
}

var ctz = twiddle.countTrailingZeros;
var ctz_1 = ctzNumber;
function ctzNumber(x) {
  var l = ctz(double_1.lo(x));
  if(l < 32) {
    return l
  }
  var h = ctz(double_1.hi(x));
  if(h > 20) {
    return 52
  }
  return h + 32
}

var toFloat = roundRat;
function roundRat (f) {
  var a = f[0];
  var b = f[1];
  if (a.cmpn(0) === 0) {
    return 0
  }
  var h = a.abs().divmod(b.abs());
  var iv = h.div;
  var x = bnToNum(iv);
  var ir = h.mod;
  var sgn = (a.negative !== b.negative) ? -1 : 1;
  if (ir.cmpn(0) === 0) {
    return sgn * x
  }
  if (x) {
    var s = ctz_1(x) + 4;
    var y = bnToNum(ir.ushln(s).divRound(b));
    return sgn * (x + y * Math.pow(2, -s))
  } else {
    var ybits = b.bitLength() - ir.bitLength() + 53;
    var y = bnToNum(ir.ushln(ybits).divRound(b));
    if (ybits < 1023) {
      return sgn * y * Math.pow(2, -ybits)
    }
    y *= Math.pow(2, -1023);
    return sgn * y * Math.pow(2, 1023 - ybits)
  }
}

var ratVec = float2rat;
function float2rat(v) {
  var result = new Array(v.length);
  for(var i=0; i<v.length; ++i) {
    result[i] = bigRat(v[i]);
  }
  return result
}

var SMALLEST_DENORM = Math.pow(2, -1074);
var UINT_MAX = (-1)>>>0;
var nextafter_1 = nextafter;
function nextafter(x, y) {
  if(isNaN(x) || isNaN(y)) {
    return NaN
  }
  if(x === y) {
    return x
  }
  if(x === 0) {
    if(y < 0) {
      return -SMALLEST_DENORM
    } else {
      return SMALLEST_DENORM
    }
  }
  var hi = double_1.hi(x);
  var lo = double_1.lo(x);
  if((y > x) === (x > 0)) {
    if(lo === UINT_MAX) {
      hi += 1;
      lo = 0;
    } else {
      lo += 1;
    }
  } else {
    if(lo === 0) {
      lo = UINT_MAX;
      hi -= 1;
    } else {
      lo -= 1;
    }
  }
  return double_1.pack(lo, hi)
}

var mul_1 = mul;
function mul(a, b) {
  return rationalize_1(a[0].mul(b[0]), a[1].mul(b[1]))
}

var sub_1 = sub;
function sub(a, b) {
  return rationalize_1(a[0].mul(b[1]).sub(a[1].mul(b[0])), a[1].mul(b[1]))
}

var sign_1 = sign$3;
function sign$3(x) {
  return bnSign(x[0]) * bnSign(x[1])
}

var sub_1$1 = sub$1;
function sub$1(a, b) {
  var n = a.length;
  var r = new Array(n);
    for(var i=0; i<n; ++i) {
    r[i] = sub_1(a[i], b[i]);
  }
  return r
}

var add_1 = add;
function add(a, b) {
  return rationalize_1(
    a[0].mul(b[1]).add(b[0].mul(a[1])),
    a[1].mul(b[1]))
}

var add_1$1 = add$1;
function add$1 (a, b) {
  var n = a.length;
  var r = new Array(n);
  for (var i=0; i<n; ++i) {
    r[i] = add_1(a[i], b[i]);
  }
  return r
}

var muls_1 = muls;
function muls(a, x) {
  var s = bigRat(x);
  var n = a.length;
  var r = new Array(n);
  for(var i=0; i<n; ++i) {
    r[i] = mul_1(a[i], s);
  }
  return r
}

var ratSegIntersect = solveIntersection;
function ratPerp (a, b) {
  return sub_1(mul_1(a[0], b[1]), mul_1(a[1], b[0]))
}
function solveIntersection (a, b, c, d) {
  var ba = sub_1$1(b, a);
  var dc = sub_1$1(d, c);
  var baXdc = ratPerp(ba, dc);
  if (sign_1(baXdc) === 0) {
    return null
  }
  var ac = sub_1$1(a, c);
  var dcXac = ratPerp(dc, ac);
  var t = div_1(dcXac, baXdc);
  var s = muls_1(ba, t);
  var r = add_1$1(a, s);
  return r
}

var cleanPslg = cleanPSLG;
function boundRat (r) {
  var f = toFloat(r);
  return [
    nextafter_1(f, -Infinity),
    nextafter_1(f, Infinity)
  ]
}
function boundEdges (points, edges) {
  var bounds = new Array(edges.length);
  for (var i = 0; i < edges.length; ++i) {
    var e = edges[i];
    var a = points[e[0]];
    var b = points[e[1]];
    bounds[i] = [
      nextafter_1(Math.min(a[0], b[0]), -Infinity),
      nextafter_1(Math.min(a[1], b[1]), -Infinity),
      nextafter_1(Math.max(a[0], b[0]), Infinity),
      nextafter_1(Math.max(a[1], b[1]), Infinity)
    ];
  }
  return bounds
}
function boundPoints (points) {
  var bounds = new Array(points.length);
  for (var i = 0; i < points.length; ++i) {
    var p = points[i];
    bounds[i] = [
      nextafter_1(p[0], -Infinity),
      nextafter_1(p[1], -Infinity),
      nextafter_1(p[0], Infinity),
      nextafter_1(p[1], Infinity)
    ];
  }
  return bounds
}
function getCrossings (points, edges, edgeBounds) {
  var result = [];
  boxIntersect_1(edgeBounds, function (i, j) {
    var e = edges[i];
    var f = edges[j];
    if (e[0] === f[0] || e[0] === f[1] ||
      e[1] === f[0] || e[1] === f[1]) {
      return
    }
    var a = points[e[0]];
    var b = points[e[1]];
    var c = points[f[0]];
    var d = points[f[1]];
    if (segseg(a, b, c, d)) {
      result.push([i, j]);
    }
  });
  return result
}
function getTJunctions (points, edges, edgeBounds, vertBounds) {
  var result = [];
  boxIntersect_1(edgeBounds, vertBounds, function (i, v) {
    var e = edges[i];
    if (e[0] === v || e[1] === v) {
      return
    }
    var p = points[v];
    var a = points[e[0]];
    var b = points[e[1]];
    if (segseg(a, b, p, p)) {
      result.push([i, v]);
    }
  });
  return result
}
function cutEdges (floatPoints, edges, crossings, junctions, useColor) {
  var i, e;
  var ratPoints = floatPoints.map(function(p) {
      return [
          bigRat(p[0]),
          bigRat(p[1])
      ]
  });
  for (i = 0; i < crossings.length; ++i) {
    var crossing = crossings[i];
    e = crossing[0];
    var f = crossing[1];
    var ee = edges[e];
    var ef = edges[f];
    var x = ratSegIntersect(
      ratVec(floatPoints[ee[0]]),
      ratVec(floatPoints[ee[1]]),
      ratVec(floatPoints[ef[0]]),
      ratVec(floatPoints[ef[1]]));
    if (!x) {
      continue
    }
    var idx = floatPoints.length;
    floatPoints.push([toFloat(x[0]), toFloat(x[1])]);
    ratPoints.push(x);
    junctions.push([e, idx], [f, idx]);
  }
  junctions.sort(function (a, b) {
    if (a[0] !== b[0]) {
      return a[0] - b[0]
    }
    var u = ratPoints[a[1]];
    var v = ratPoints[b[1]];
    return cmp_1(u[0], v[0]) || cmp_1(u[1], v[1])
  });
  for (i = junctions.length - 1; i >= 0; --i) {
    var junction = junctions[i];
    e = junction[0];
    var edge = edges[e];
    var s = edge[0];
    var t = edge[1];
    var a = floatPoints[s];
    var b = floatPoints[t];
    if (((a[0] - b[0]) || (a[1] - b[1])) < 0) {
      var tmp = s;
      s = t;
      t = tmp;
    }
    edge[0] = s;
    var last = edge[1] = junction[1];
    var color;
    if (useColor) {
      color = edge[2];
    }
    while (i > 0 && junctions[i - 1][0] === e) {
      var junction = junctions[--i];
      var next = junction[1];
      if (useColor) {
        edges.push([last, next, color]);
      } else {
        edges.push([last, next]);
      }
      last = next;
    }
    if (useColor) {
      edges.push([last, t, color]);
    } else {
      edges.push([last, t]);
    }
  }
  return ratPoints
}
function dedupPoints (floatPoints, ratPoints, floatBounds) {
  var numPoints = ratPoints.length;
  var uf = new unionFind$1(numPoints);
  var bounds = [];
  for (var i = 0; i < ratPoints.length; ++i) {
    var p = ratPoints[i];
    var xb = boundRat(p[0]);
    var yb = boundRat(p[1]);
    bounds.push([
      nextafter_1(xb[0], -Infinity),
      nextafter_1(yb[0], -Infinity),
      nextafter_1(xb[1], Infinity),
      nextafter_1(yb[1], Infinity)
    ]);
  }
  boxIntersect_1(bounds, function (i, j) {
    uf.link(i, j);
  });
  var noDupes = true;
  var labels = new Array(numPoints);
  for (var i = 0; i < numPoints; ++i) {
    var j = uf.find(i);
    if (j !== i) {
      noDupes = false;
      floatPoints[j] = [
        Math.min(floatPoints[i][0], floatPoints[j][0]),
        Math.min(floatPoints[i][1], floatPoints[j][1])
      ];
    }
  }
  if (noDupes) {
    return null
  }
  var ptr = 0;
  for (var i = 0; i < numPoints; ++i) {
    var j = uf.find(i);
    if (j === i) {
      labels[i] = ptr;
      floatPoints[ptr++] = floatPoints[i];
    } else {
      labels[i] = -1;
    }
  }
  floatPoints.length = ptr;
  for (var i = 0; i < numPoints; ++i) {
    if (labels[i] < 0) {
      labels[i] = labels[uf.find(i)];
    }
  }
  return labels
}
function compareLex2 (a, b) { return (a[0] - b[0]) || (a[1] - b[1]) }
function compareLex3 (a, b) {
  var d = (a[0] - b[0]) || (a[1] - b[1]);
  if (d) {
    return d
  }
  if (a[2] < b[2]) {
    return -1
  } else if (a[2] > b[2]) {
    return 1
  }
  return 0
}
function dedupEdges (edges, labels, useColor) {
  if (edges.length === 0) {
    return
  }
  if (labels) {
    for (var i = 0; i < edges.length; ++i) {
      var e = edges[i];
      var a = labels[e[0]];
      var b = labels[e[1]];
      e[0] = Math.min(a, b);
      e[1] = Math.max(a, b);
    }
  } else {
    for (var i = 0; i < edges.length; ++i) {
      var e = edges[i];
      var a = e[0];
      var b = e[1];
      e[0] = Math.min(a, b);
      e[1] = Math.max(a, b);
    }
  }
  if (useColor) {
    edges.sort(compareLex3);
  } else {
    edges.sort(compareLex2);
  }
  var ptr = 1;
  for (var i = 1; i < edges.length; ++i) {
    var prev = edges[i - 1];
    var next = edges[i];
    if (next[0] === prev[0] && next[1] === prev[1] &&
      (!useColor || next[2] === prev[2])) {
      continue
    }
    edges[ptr++] = next;
  }
  edges.length = ptr;
}
function preRound (points, edges, useColor) {
  var labels = dedupPoints(points, [], boundPoints(points));
  dedupEdges(edges, labels, useColor);
  return !!labels
}
function snapRound (points, edges, useColor) {
  var edgeBounds = boundEdges(points, edges);
  var crossings = getCrossings(points, edges, edgeBounds);
  var vertBounds = boundPoints(points);
  var tjunctions = getTJunctions(points, edges, edgeBounds, vertBounds);
  var ratPoints = cutEdges(points, edges, crossings, tjunctions, useColor);
  var labels = dedupPoints(points, ratPoints);
  dedupEdges(edges, labels, useColor);
  if (!labels) {
    return (crossings.length > 0 || tjunctions.length > 0)
  }
  return true
}
function cleanPSLG (points, edges, colors) {
  var prevEdges;
  if (colors) {
    prevEdges = edges;
    var augEdges = new Array(edges.length);
    for (var i = 0; i < edges.length; ++i) {
      var e = edges[i];
      augEdges[i] = [e[0], e[1], colors[i]];
    }
    edges = augEdges;
  }
  var modified = preRound(points, edges, !!colors);
  while (snapRound(points, edges, !!colors)) {
    modified = true;
  }
  if (!!colors && modified) {
    prevEdges.length = 0;
    colors.length = 0;
    for (var i = 0; i < edges.length; ++i) {
      var e = edges[i];
      prevEdges.push([e[0], e[1]]);
      colors.push(e[2]);
    }
  }
  return modified
}

function compileSearch(funcName, predicate, reversed, extraArgs, earlyOut) {
  var code = [
    "function ", funcName, "(a,l,h,", extraArgs.join(","),  "){",
    earlyOut ? "" : "var i=", (reversed ? "l-1" : "h+1"),
    ";while(l<=h){var m=(l+h)>>>1,x=a[m]"];
  if(earlyOut) {
    if(predicate.indexOf("c") < 0) {
      code.push(";if(x===y){return m}else if(x<=y){");
    } else {
      code.push(";var p=c(x,y);if(p===0){return m}else if(p<=0){");
    }
  } else {
    code.push(";if(", predicate, "){i=m;");
  }
  if(reversed) {
    code.push("l=m+1}else{h=m-1}");
  } else {
    code.push("h=m-1}else{l=m+1}");
  }
  code.push("}");
  if(earlyOut) {
    code.push("return -1};");
  } else {
    code.push("return i};");
  }
  return code.join("")
}
function compileBoundsSearch(predicate, reversed, suffix, earlyOut) {
  var result = new Function([
  compileSearch("A", "x" + predicate + "y", reversed, ["y"], earlyOut),
  compileSearch("P", "c(x,y)" + predicate + "0", reversed, ["y", "c"], earlyOut),
"function dispatchBsearch", suffix, "(a,y,c,l,h){\
if(typeof(c)==='function'){\
return P(a,(l===void 0)?0:l|0,(h===void 0)?a.length-1:h|0,y,c)\
}else{\
return A(a,(c===void 0)?0:c|0,(l===void 0)?a.length-1:l|0,y)\
}}\
return dispatchBsearch", suffix].join(""));
  return result()
}
var searchBounds = {
  ge: compileBoundsSearch(">=", false,  "GE"),
  gt: compileBoundsSearch(">",  false,  "GT"),
  lt: compileBoundsSearch("<",  true,   "LT"),
  le: compileBoundsSearch("<=", true,   "LE"),
  eq: compileBoundsSearch("-",  true,   "EQ", true)
};

var orient$1 = orientation_1[3];
var EVENT_POINT = 0;
var EVENT_END   = 1;
var EVENT_START = 2;
var monotone = monotoneTriangulate;
function PartialHull(a, b, idx, lowerIds, upperIds) {
  this.a = a;
  this.b = b;
  this.idx = idx;
  this.lowerIds = lowerIds;
  this.upperIds = upperIds;
}
function Event(a, b, type, idx) {
  this.a    = a;
  this.b    = b;
  this.type = type;
  this.idx  = idx;
}
function compareEvent(a, b) {
  var d =
    (a.a[0] - b.a[0]) ||
    (a.a[1] - b.a[1]) ||
    (a.type - b.type);
  if(d) { return d }
  if(a.type !== EVENT_POINT) {
    d = orient$1(a.a, a.b, b.b);
    if(d) { return d }
  }
  return a.idx - b.idx
}
function testPoint(hull, p) {
  return orient$1(hull.a, hull.b, p)
}
function addPoint(cells, hulls, points, p, idx) {
  var lo = searchBounds.lt(hulls, p, testPoint);
  var hi = searchBounds.gt(hulls, p, testPoint);
  for(var i=lo; i<hi; ++i) {
    var hull = hulls[i];
    var lowerIds = hull.lowerIds;
    var m = lowerIds.length;
    while(m > 1 && orient$1(
        points[lowerIds[m-2]],
        points[lowerIds[m-1]],
        p) > 0) {
      cells.push(
        [lowerIds[m-1],
         lowerIds[m-2],
         idx]);
      m -= 1;
    }
    lowerIds.length = m;
    lowerIds.push(idx);
    var upperIds = hull.upperIds;
    var m = upperIds.length;
    while(m > 1 && orient$1(
        points[upperIds[m-2]],
        points[upperIds[m-1]],
        p) < 0) {
      cells.push(
        [upperIds[m-2],
         upperIds[m-1],
         idx]);
      m -= 1;
    }
    upperIds.length = m;
    upperIds.push(idx);
  }
}
function findSplit(hull, edge) {
  var d;
  if(hull.a[0] < edge.a[0]) {
    d = orient$1(hull.a, hull.b, edge.a);
  } else {
    d = orient$1(edge.b, edge.a, hull.a);
  }
  if(d) { return d }
  if(edge.b[0] < hull.b[0]) {
    d = orient$1(hull.a, hull.b, edge.b);
  } else {
    d = orient$1(edge.b, edge.a, hull.b);
  }
  return d || hull.idx - edge.idx
}
function splitHulls(hulls, points, event) {
  var splitIdx = searchBounds.le(hulls, event, findSplit);
  var hull = hulls[splitIdx];
  var upperIds = hull.upperIds;
  var x = upperIds[upperIds.length-1];
  hull.upperIds = [x];
  hulls.splice(splitIdx+1, 0,
    new PartialHull(event.a, event.b, event.idx, [x], upperIds));
}
function mergeHulls(hulls, points, event) {
  var tmp = event.a;
  event.a = event.b;
  event.b = tmp;
  var mergeIdx = searchBounds.eq(hulls, event, findSplit);
  var upper = hulls[mergeIdx];
  var lower = hulls[mergeIdx-1];
  lower.upperIds = upper.upperIds;
  hulls.splice(mergeIdx, 1);
}
function monotoneTriangulate(points, edges) {
  var numPoints = points.length;
  var numEdges = edges.length;
  var events = [];
  for(var i=0; i<numPoints; ++i) {
    events.push(new Event(
      points[i],
      null,
      EVENT_POINT,
      i));
  }
  for(var i=0; i<numEdges; ++i) {
    var e = edges[i];
    var a = points[e[0]];
    var b = points[e[1]];
    if(a[0] < b[0]) {
      events.push(
        new Event(a, b, EVENT_START, i),
        new Event(b, a, EVENT_END, i));
    } else if(a[0] > b[0]) {
      events.push(
        new Event(b, a, EVENT_START, i),
        new Event(a, b, EVENT_END, i));
    }
  }
  events.sort(compareEvent);
  var minX = events[0].a[0] - (1 + Math.abs(events[0].a[0])) * Math.pow(2, -52);
  var hull = [ new PartialHull([minX, 1], [minX, 0], -1, [], [], [], []) ];
  var cells = [];
  for(var i=0, numEvents=events.length; i<numEvents; ++i) {
    var event = events[i];
    var type = event.type;
    if(type === EVENT_POINT) {
      addPoint(cells, hull, points, event.a, event.idx);
    } else if(type === EVENT_START) {
      splitHulls(hull, points, event);
    } else {
      mergeHulls(hull, points, event);
    }
  }
  return cells
}

var triangulation = createTriangulation;
function Triangulation(stars, edges) {
  this.stars = stars;
  this.edges = edges;
}
var proto$1 = Triangulation.prototype;
function removePair(list, j, k) {
  for(var i=1, n=list.length; i<n; i+=2) {
    if(list[i-1] === j && list[i] === k) {
      list[i-1] = list[n-2];
      list[i] = list[n-1];
      list.length = n - 2;
      return
    }
  }
}
proto$1.isConstraint = (function() {
  var e = [0,0];
  function compareLex(a, b) {
    return a[0] - b[0] || a[1] - b[1]
  }
  return function(i, j) {
    e[0] = Math.min(i,j);
    e[1] = Math.max(i,j);
    return searchBounds.eq(this.edges, e, compareLex) >= 0
  }
})();
proto$1.removeTriangle = function(i, j, k) {
  var stars = this.stars;
  removePair(stars[i], j, k);
  removePair(stars[j], k, i);
  removePair(stars[k], i, j);
};
proto$1.addTriangle = function(i, j, k) {
  var stars = this.stars;
  stars[i].push(j, k);
  stars[j].push(k, i);
  stars[k].push(i, j);
};
proto$1.opposite = function(j, i) {
  var list = this.stars[i];
  for(var k=1, n=list.length; k<n; k+=2) {
    if(list[k] === j) {
      return list[k-1]
    }
  }
  return -1
};
proto$1.flip = function(i, j) {
  var a = this.opposite(i, j);
  var b = this.opposite(j, i);
  this.removeTriangle(i, j, a);
  this.removeTriangle(j, i, b);
  this.addTriangle(i, b, a);
  this.addTriangle(j, a, b);
};
proto$1.edges = function() {
  var stars = this.stars;
  var result = [];
  for(var i=0, n=stars.length; i<n; ++i) {
    var list = stars[i];
    for(var j=0, m=list.length; j<m; j+=2) {
      result.push([list[j], list[j+1]]);
    }
  }
  return result
};
proto$1.cells = function() {
  var stars = this.stars;
  var result = [];
  for(var i=0, n=stars.length; i<n; ++i) {
    var list = stars[i];
    for(var j=0, m=list.length; j<m; j+=2) {
      var s = list[j];
      var t = list[j+1];
      if(i < Math.min(s, t)) {
        result.push([i, s, t]);
      }
    }
  }
  return result
};
function createTriangulation(numVerts, edges) {
  var stars = new Array(numVerts);
  for(var i=0; i<numVerts; ++i) {
    stars[i] = [];
  }
  return new Triangulation(stars, edges)
}

var inSphere = createCommonjsModule(function (module) {
var NUM_EXPAND = 6;
function cofactor(m, c) {
  var result = new Array(m.length-1);
  for(var i=1; i<m.length; ++i) {
    var r = result[i-1] = new Array(m.length-1);
    for(var j=0,k=0; j<m.length; ++j) {
      if(j === c) {
        continue
      }
      r[k++] = m[i][j];
    }
  }
  return result
}
function matrix(n) {
  var result = new Array(n);
  for(var i=0; i<n; ++i) {
    result[i] = new Array(n);
    for(var j=0; j<n; ++j) {
      result[i][j] = ["m", j, "[", (n-i-2), "]"].join("");
    }
  }
  return result
}
function generateSum(expr) {
  if(expr.length === 1) {
    return expr[0]
  } else if(expr.length === 2) {
    return ["sum(", expr[0], ",", expr[1], ")"].join("")
  } else {
    var m = expr.length>>1;
    return ["sum(", generateSum(expr.slice(0, m)), ",", generateSum(expr.slice(m)), ")"].join("")
  }
}
function makeProduct(a, b) {
  if(a.charAt(0) === "m") {
    if(b.charAt(0) === "w") {
      var toks = a.split("[");
      return ["w", b.substr(1), "m", toks[0].substr(1)].join("")
    } else {
      return ["prod(", a, ",", b, ")"].join("")
    }
  } else {
    return makeProduct(b, a)
  }
}
function sign(s) {
  if(s & 1 !== 0) {
    return "-"
  }
  return ""
}
function determinant(m) {
  if(m.length === 2) {
    return [["diff(", makeProduct(m[0][0], m[1][1]), ",", makeProduct(m[1][0], m[0][1]), ")"].join("")]
  } else {
    var expr = [];
    for(var i=0; i<m.length; ++i) {
      expr.push(["scale(", generateSum(determinant(cofactor(m, i))), ",", sign(i), m[0][i], ")"].join(""));
    }
    return expr
  }
}
function makeSquare(d, n) {
  var terms = [];
  for(var i=0; i<n-2; ++i) {
    terms.push(["prod(m", d, "[", i, "],m", d, "[", i, "])"].join(""));
  }
  return generateSum(terms)
}
function orientation(n) {
  var pos = [];
  var neg = [];
  var m = matrix(n);
  for(var i=0; i<n; ++i) {
    m[0][i] = "1";
    m[n-1][i] = "w"+i;
  }
  for(var i=0; i<n; ++i) {
    if((i&1)===0) {
      pos.push.apply(pos,determinant(cofactor(m, i)));
    } else {
      neg.push.apply(neg,determinant(cofactor(m, i)));
    }
  }
  var posExpr = generateSum(pos);
  var negExpr = generateSum(neg);
  var funcName = "exactInSphere" + n;
  var funcArgs = [];
  for(var i=0; i<n; ++i) {
    funcArgs.push("m" + i);
  }
  var code = ["function ", funcName, "(", funcArgs.join(), "){"];
  for(var i=0; i<n; ++i) {
    code.push("var w",i,"=",makeSquare(i,n),";");
    for(var j=0; j<n; ++j) {
      if(j !== i) {
        code.push("var w",i,"m",j,"=scale(w",i,",m",j,"[0]);");
      }
    }
  }
  code.push("var p=", posExpr, ",n=", negExpr, ",d=diff(p,n);return d[d.length-1];}return ", funcName);
  var proc = new Function("sum", "diff", "prod", "scale", code.join(""));
  return proc(robustSum, robustDiff, twoProduct_1, robustScale)
}
function inSphere0() { return 0 }
function inSphere1() { return 0 }
function inSphere2() { return 0 }
var CACHED = [
  inSphere0,
  inSphere1,
  inSphere2
];
function slowInSphere(args) {
  var proc = CACHED[args.length];
  if(!proc) {
    proc = CACHED[args.length] = orientation(args.length);
  }
  return proc.apply(undefined, args)
}
function generateInSphereTest() {
  while(CACHED.length <= NUM_EXPAND) {
    CACHED.push(orientation(CACHED.length));
  }
  var args = [];
  var procArgs = ["slow"];
  for(var i=0; i<=NUM_EXPAND; ++i) {
    args.push("a" + i);
    procArgs.push("o" + i);
  }
  var code = [
    "function testInSphere(", args.join(), "){switch(arguments.length){case 0:case 1:return 0;"
  ];
  for(var i=2; i<=NUM_EXPAND; ++i) {
    code.push("case ", i, ":return o", i, "(", args.slice(0, i).join(), ");");
  }
  code.push("}var s=new Array(arguments.length);for(var i=0;i<arguments.length;++i){s[i]=arguments[i]};return slow(s);}return testInSphere");
  procArgs.push(code.join(""));
  var proc = Function.apply(undefined, procArgs);
  module.exports = proc.apply(undefined, [slowInSphere].concat(CACHED));
  for(var i=0; i<=NUM_EXPAND; ++i) {
    module.exports[i] = CACHED[i];
  }
}
generateInSphereTest();
});

var inCircle = inSphere[4];
var delaunay = delaunayRefine;
function testFlip(points, triangulation, stack, a, b, x) {
  var y = triangulation.opposite(a, b);
  if(y < 0) {
    return
  }
  if(b < a) {
    var tmp = a;
    a = b;
    b = tmp;
    tmp = x;
    x = y;
    y = tmp;
  }
  if(triangulation.isConstraint(a, b)) {
    return
  }
  if(inCircle(points[a], points[b], points[x], points[y]) < 0) {
    stack.push(a, b);
  }
}
function delaunayRefine(points, triangulation) {
  var stack = [];
  var numPoints = points.length;
  var stars = triangulation.stars;
  for(var a=0; a<numPoints; ++a) {
    var star = stars[a];
    for(var j=1; j<star.length; j+=2) {
      var b = star[j];
      if(b < a) {
        continue
      }
      if(triangulation.isConstraint(a, b)) {
        continue
      }
      var x = star[j-1], y = -1;
      for(var k=1; k<star.length; k+=2) {
        if(star[k-1] === b) {
          y = star[k];
          break
        }
      }
      if(y < 0) {
        continue
      }
      if(inCircle(points[a], points[b], points[x], points[y]) < 0) {
        stack.push(a, b);
      }
    }
  }
  while(stack.length > 0) {
    var b = stack.pop();
    var a = stack.pop();
    var x = -1, y = -1;
    var star = stars[a];
    for(var i=1; i<star.length; i+=2) {
      var s = star[i-1];
      var t = star[i];
      if(s === b) {
        y = t;
      } else if(t === b) {
        x = s;
      }
    }
    if(x < 0 || y < 0) {
      continue
    }
    if(inCircle(points[a], points[b], points[x], points[y]) >= 0) {
      continue
    }
    triangulation.flip(a, b);
    testFlip(points, triangulation, stack, x, a, y);
    testFlip(points, triangulation, stack, a, y, x);
    testFlip(points, triangulation, stack, y, b, x);
    testFlip(points, triangulation, stack, b, x, y);
  }
}

var filter = classifyFaces;
function FaceIndex(cells, neighbor, constraint, flags, active, next, boundary) {
  this.cells       = cells;
  this.neighbor    = neighbor;
  this.flags       = flags;
  this.constraint  = constraint;
  this.active      = active;
  this.next        = next;
  this.boundary    = boundary;
}
var proto$2 = FaceIndex.prototype;
function compareCell(a, b) {
  return a[0] - b[0] ||
         a[1] - b[1] ||
         a[2] - b[2]
}
proto$2.locate = (function() {
  var key = [0,0,0];
  return function(a, b, c) {
    var x = a, y = b, z = c;
    if(b < c) {
      if(b < a) {
        x = b;
        y = c;
        z = a;
      }
    } else if(c < a) {
      x = c;
      y = a;
      z = b;
    }
    if(x < 0) {
      return -1
    }
    key[0] = x;
    key[1] = y;
    key[2] = z;
    return searchBounds.eq(this.cells, key, compareCell)
  }
})();
function indexCells(triangulation, infinity) {
  var cells = triangulation.cells();
  var nc = cells.length;
  for(var i=0; i<nc; ++i) {
    var c = cells[i];
    var x = c[0], y = c[1], z = c[2];
    if(y < z) {
      if(y < x) {
        c[0] = y;
        c[1] = z;
        c[2] = x;
      }
    } else if(z < x) {
      c[0] = z;
      c[1] = x;
      c[2] = y;
    }
  }
  cells.sort(compareCell);
  var flags = new Array(nc);
  for(var i=0; i<flags.length; ++i) {
    flags[i] = 0;
  }
  var active = [];
  var next   = [];
  var neighbor = new Array(3*nc);
  var constraint = new Array(3*nc);
  var boundary = null;
  if(infinity) {
    boundary = [];
  }
  var index = new FaceIndex(
    cells,
    neighbor,
    constraint,
    flags,
    active,
    next,
    boundary);
  for(var i=0; i<nc; ++i) {
    var c = cells[i];
    for(var j=0; j<3; ++j) {
      var x = c[j], y = c[(j+1)%3];
      var a = neighbor[3*i+j] = index.locate(y, x, triangulation.opposite(y, x));
      var b = constraint[3*i+j] = triangulation.isConstraint(x, y);
      if(a < 0) {
        if(b) {
          next.push(i);
        } else {
          active.push(i);
          flags[i] = 1;
        }
        if(infinity) {
          boundary.push([y, x, -1]);
        }
      }
    }
  }
  return index
}
function filterCells(cells, flags, target) {
  var ptr = 0;
  for(var i=0; i<cells.length; ++i) {
    if(flags[i] === target) {
      cells[ptr++] = cells[i];
    }
  }
  cells.length = ptr;
  return cells
}
function classifyFaces(triangulation, target, infinity) {
  var index = indexCells(triangulation, infinity);
  if(target === 0) {
    if(infinity) {
      return index.cells.concat(index.boundary)
    } else {
      return index.cells
    }
  }
  var side = 1;
  var active = index.active;
  var next = index.next;
  var flags = index.flags;
  var cells = index.cells;
  var constraint = index.constraint;
  var neighbor = index.neighbor;
  while(active.length > 0 || next.length > 0) {
    while(active.length > 0) {
      var t = active.pop();
      if(flags[t] === -side) {
        continue
      }
      flags[t] = side;
      var c = cells[t];
      for(var j=0; j<3; ++j) {
        var f = neighbor[3*t+j];
        if(f >= 0 && flags[f] === 0) {
          if(constraint[3*t+j]) {
            next.push(f);
          } else {
            active.push(f);
            flags[f] = side;
          }
        }
      }
    }
    var tmp = next;
    next = active;
    active = tmp;
    next.length = 0;
    side = -side;
  }
  var result = filterCells(cells, flags, target);
  if(infinity) {
    return result.concat(index.boundary)
  }
  return result
}

var cdt2d_1 = cdt2d;
function canonicalizeEdge(e) {
  return [Math.min(e[0], e[1]), Math.max(e[0], e[1])]
}
function compareEdge(a, b) {
  return a[0]-b[0] || a[1]-b[1]
}
function canonicalizeEdges(edges) {
  return edges.map(canonicalizeEdge).sort(compareEdge)
}
function getDefault(options, property, dflt) {
  if(property in options) {
    return options[property]
  }
  return dflt
}
function cdt2d(points, edges, options) {
  if(!Array.isArray(edges)) {
    options = edges || {};
    edges = [];
  } else {
    options = options || {};
    edges = edges || [];
  }
  var delaunay$1 = !!getDefault(options, 'delaunay', true);
  var interior = !!getDefault(options, 'interior', true);
  var exterior = !!getDefault(options, 'exterior', true);
  var infinity = !!getDefault(options, 'infinity', false);
  if((!interior && !exterior) || points.length === 0) {
    return []
  }
  var cells = monotone(points, edges);
  if(delaunay$1 || interior !== exterior || infinity) {
    var triangulation$1 = triangulation(points.length, canonicalizeEdges(edges));
    for(var i=0; i<cells.length; ++i) {
      var f = cells[i];
      triangulation$1.addTriangle(f[0], f[1], f[2]);
    }
    if(delaunay$1) {
      delaunay(points, triangulation$1);
    }
    if(!exterior) {
      return filter(triangulation$1, -1)
    } else if(!interior) {
      return filter(triangulation$1,  1, infinity)
    } else if(infinity) {
      return filter(triangulation$1, 0, infinity)
    } else {
      return triangulation$1.cells()
    }
  } else {
    return cells
  }
}

var e2a = edgeToAdjacency;
function edgeToAdjacency(edges, numVertices) {
  var numEdges = edges.length;
  if(typeof numVertices !== "number") {
    numVertices = 0;
    for(var i=0; i<numEdges; ++i) {
      var e = edges[i];
      numVertices = Math.max(numVertices, e[0], e[1]);
    }
    numVertices = (numVertices|0) + 1;
  }
  numVertices = numVertices|0;
  var adj = new Array(numVertices);
  for(var i=0; i<numVertices; ++i) {
    adj[i] = [];
  }
  for(var i=0; i<numEdges; ++i) {
    var e = edges[i];
    adj[e[0]].push(e[1]);
    adj[e[1]].push(e[0]);
  }
  for(var j=0; j<numVertices; ++j) {
    uniq(adj[j], function(a, b) {
      return a - b
    });
  }
  return adj
}

var sgn = function signum(x) {
  if(x < 0) { return -1 }
  if(x > 0) { return 1 }
  return 0.0
};

var product = robustProduct;
function robustProduct(a, b) {
  if(a.length === 1) {
    return robustScale(b, a[0])
  }
  if(b.length === 1) {
    return robustScale(a, b[0])
  }
  if(a.length === 0 || b.length === 0) {
    return [0]
  }
  var r = [0];
  if(a.length < b.length) {
    for(var i=0; i<a.length; ++i) {
      r = robustSum(r, robustScale(b, a[i]));
    }
  } else {
    for(var i=0; i<b.length; ++i) {
      r = robustSum(r, robustScale(a, b[i]));
    }
  }
  return r
}

var cmpangle = compareAngle;
function testInterior(a, b, c) {
  var x0 = twoSum(a[0], -b[0]);
  var y0 = twoSum(a[1], -b[1]);
  var x1 = twoSum(c[0], -b[0]);
  var y1 = twoSum(c[1], -b[1]);
  var d = robustSum(
    product(x0, x1),
    product(y0, y1));
  return d[d.length-1] >= 0
}
function compareAngle(a, b, c, d) {
  var bcd = orientation_1(b, c, d);
  if(bcd === 0) {
    var sabc = sgn(orientation_1(a, b, c));
    var sabd = sgn(orientation_1(a, b, d));
    if(sabc === sabd) {
      if(sabc === 0) {
        var ic = testInterior(a, b, c);
        var id = testInterior(a, b, d);
        if(ic === id) {
          return 0
        } else if(ic) {
          return 1
        } else {
          return -1
        }
      }
      return 0
    } else if(sabd === 0) {
      if(sabc > 0) {
        return -1
      } else if(testInterior(a, b, d)) {
        return -1
      } else {
        return 1
      }
    } else if(sabc === 0) {
      if(sabd > 0) {
        return 1
      } else if(testInterior(a, b, c)) {
        return 1
      } else {
        return -1
      }
    }
    return sgn(sabd - sabc)
  }
  var abc = orientation_1(a, b, c);
  if(abc > 0) {
    if(bcd > 0 && orientation_1(a, b, d) > 0) {
      return 1
    }
    return -1
  } else if(abc < 0) {
    if(bcd > 0 || orientation_1(a, b, d) > 0) {
      return 1
    }
    return -1
  } else {
    var abd = orientation_1(a, b, d);
    if(abd > 0) {
      return 1
    } else {
      if(testInterior(a, b, c)) {
        return 1
      } else {
        return -1
      }
    }
  }
}

var loops = planarDual;
function planarDual(cells, positions) {
  var numVertices = positions.length|0;
  var numEdges = cells.length;
  var adj = [new Array(numVertices), new Array(numVertices)];
  for(var i=0; i<numVertices; ++i) {
    adj[0][i] = [];
    adj[1][i] = [];
  }
  for(var i=0; i<numEdges; ++i) {
    var c = cells[i];
    adj[0][c[0]].push(c);
    adj[1][c[1]].push(c);
  }
  var cycles = [];
  for(var i=0; i<numVertices; ++i) {
    if(adj[0][i].length + adj[1][i].length === 0) {
      cycles.push( [i] );
    }
  }
  function cut(c, i) {
    var a = adj[i][c[i]];
    a.splice(a.indexOf(c), 1);
  }
  function next(a, b, noCut) {
    var nextCell, nextVertex, nextDir;
    for(var i=0; i<2; ++i) {
      if(adj[i][b].length > 0) {
        nextCell = adj[i][b][0];
        nextDir = i;
        break
      }
    }
    nextVertex = nextCell[nextDir^1];
    for(var dir=0; dir<2; ++dir) {
      var nbhd = adj[dir][b];
      for(var k=0; k<nbhd.length; ++k) {
        var e = nbhd[k];
        var p = e[dir^1];
        var cmp = cmpangle(
            positions[a],
            positions[b],
            positions[nextVertex],
            positions[p]);
        if(cmp > 0) {
          nextCell = e;
          nextVertex = p;
          nextDir = dir;
        }
      }
    }
    if(noCut) {
      return nextVertex
    }
    if(nextCell) {
      cut(nextCell, nextDir);
    }
    return nextVertex
  }
  function extractCycle(v, dir) {
    var e0 = adj[dir][v][0];
    var cycle = [v];
    cut(e0, dir);
    var u = e0[dir^1];
    while(true) {
      while(u !== v) {
        cycle.push(u);
        u = next(cycle[cycle.length-2], u, false);
      }
      if(adj[0][v].length + adj[1][v].length === 0) {
        break
      }
      var a = cycle[cycle.length-1];
      var b = v;
      var c = cycle[1];
      var d = next(a, b, true);
      if(cmpangle(positions[a], positions[b], positions[c], positions[d]) < 0) {
        break
      }
      cycle.push(v);
      u = next(a, b);
    }
    return cycle
  }
  function shouldGlue(pcycle, ncycle) {
    return (ncycle[1] === ncycle[ncycle.length-1])
  }
  for(var i=0; i<numVertices; ++i) {
    for(var j=0; j<2; ++j) {
      var pcycle = [];
      while(adj[j][i].length > 0) {
        var ni = adj[0][i].length;
        var ncycle = extractCycle(i,j);
        if(shouldGlue(pcycle, ncycle)) {
          pcycle.push.apply(pcycle, ncycle);
        } else {
          if(pcycle.length > 0) {
            cycles.push(pcycle);
          }
          pcycle = ncycle;
        }
      }
      if(pcycle.length > 0) {
        cycles.push(pcycle);
      }
    }
  }
  return cycles
}

function compileSearch$1(funcName, predicate, reversed, extraArgs, useNdarray, earlyOut) {
  var code = [
    "function ", funcName, "(a,l,h,", extraArgs.join(","),  "){",
earlyOut ? "" : "var i=", (reversed ? "l-1" : "h+1"),
";while(l<=h){\
var m=(l+h)>>>1,x=a", useNdarray ? ".get(m)" : "[m]"];
  if(earlyOut) {
    if(predicate.indexOf("c") < 0) {
      code.push(";if(x===y){return m}else if(x<=y){");
    } else {
      code.push(";var p=c(x,y);if(p===0){return m}else if(p<=0){");
    }
  } else {
    code.push(";if(", predicate, "){i=m;");
  }
  if(reversed) {
    code.push("l=m+1}else{h=m-1}");
  } else {
    code.push("h=m-1}else{l=m+1}");
  }
  code.push("}");
  if(earlyOut) {
    code.push("return -1};");
  } else {
    code.push("return i};");
  }
  return code.join("")
}
function compileBoundsSearch$1(predicate, reversed, suffix, earlyOut) {
  var result = new Function([
  compileSearch$1("A", "x" + predicate + "y", reversed, ["y"], false, earlyOut),
  compileSearch$1("B", "x" + predicate + "y", reversed, ["y"], true, earlyOut),
  compileSearch$1("P", "c(x,y)" + predicate + "0", reversed, ["y", "c"], false, earlyOut),
  compileSearch$1("Q", "c(x,y)" + predicate + "0", reversed, ["y", "c"], true, earlyOut),
"function dispatchBsearch", suffix, "(a,y,c,l,h){\
if(a.shape){\
if(typeof(c)==='function'){\
return Q(a,(l===undefined)?0:l|0,(h===undefined)?a.shape[0]-1:h|0,y,c)\
}else{\
return B(a,(c===undefined)?0:c|0,(l===undefined)?a.shape[0]-1:l|0,y)\
}}else{\
if(typeof(c)==='function'){\
return P(a,(l===undefined)?0:l|0,(h===undefined)?a.length-1:h|0,y,c)\
}else{\
return A(a,(c===undefined)?0:c|0,(l===undefined)?a.length-1:l|0,y)\
}}}\
return dispatchBsearch", suffix].join(""));
  return result()
}
var searchBounds$1 = {
  ge: compileBoundsSearch$1(">=", false, "GE"),
  gt: compileBoundsSearch$1(">", false, "GT"),
  lt: compileBoundsSearch$1("<", true, "LT"),
  le: compileBoundsSearch$1("<=", true, "LE"),
  eq: compileBoundsSearch$1("-", true, "EQ", true)
};

var rbtree = createRBTree;
var RED   = 0;
var BLACK = 1;
function RBNode(color, key, value, left, right, count) {
  this._color = color;
  this.key = key;
  this.value = value;
  this.left = left;
  this.right = right;
  this._count = count;
}
function cloneNode(node) {
  return new RBNode(node._color, node.key, node.value, node.left, node.right, node._count)
}
function repaint(color, node) {
  return new RBNode(color, node.key, node.value, node.left, node.right, node._count)
}
function recount(node) {
  node._count = 1 + (node.left ? node.left._count : 0) + (node.right ? node.right._count : 0);
}
function RedBlackTree(compare, root) {
  this._compare = compare;
  this.root = root;
}
var proto$3 = RedBlackTree.prototype;
Object.defineProperty(proto$3, "keys", {
  get: function() {
    var result = [];
    this.forEach(function(k,v) {
      result.push(k);
    });
    return result
  }
});
Object.defineProperty(proto$3, "values", {
  get: function() {
    var result = [];
    this.forEach(function(k,v) {
      result.push(v);
    });
    return result
  }
});
Object.defineProperty(proto$3, "length", {
  get: function() {
    if(this.root) {
      return this.root._count
    }
    return 0
  }
});
proto$3.insert = function(key, value) {
  var cmp = this._compare;
  var n = this.root;
  var n_stack = [];
  var d_stack = [];
  while(n) {
    var d = cmp(key, n.key);
    n_stack.push(n);
    d_stack.push(d);
    if(d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  n_stack.push(new RBNode(RED, key, value, null, null, 1));
  for(var s=n_stack.length-2; s>=0; --s) {
    var n = n_stack[s];
    if(d_stack[s] <= 0) {
      n_stack[s] = new RBNode(n._color, n.key, n.value, n_stack[s+1], n.right, n._count+1);
    } else {
      n_stack[s] = new RBNode(n._color, n.key, n.value, n.left, n_stack[s+1], n._count+1);
    }
  }
  for(var s=n_stack.length-1; s>1; --s) {
    var p = n_stack[s-1];
    var n = n_stack[s];
    if(p._color === BLACK || n._color === BLACK) {
      break
    }
    var pp = n_stack[s-2];
    if(pp.left === p) {
      if(p.left === n) {
        var y = pp.right;
        if(y && y._color === RED) {
          p._color = BLACK;
          pp.right = repaint(BLACK, y);
          pp._color = RED;
          s -= 1;
        } else {
          pp._color = RED;
          pp.left = p.right;
          p._color = BLACK;
          p.right = pp;
          n_stack[s-2] = p;
          n_stack[s-1] = n;
          recount(pp);
          recount(p);
          if(s >= 3) {
            var ppp = n_stack[s-3];
            if(ppp.left === pp) {
              ppp.left = p;
            } else {
              ppp.right = p;
            }
          }
          break
        }
      } else {
        var y = pp.right;
        if(y && y._color === RED) {
          p._color = BLACK;
          pp.right = repaint(BLACK, y);
          pp._color = RED;
          s -= 1;
        } else {
          p.right = n.left;
          pp._color = RED;
          pp.left = n.right;
          n._color = BLACK;
          n.left = p;
          n.right = pp;
          n_stack[s-2] = n;
          n_stack[s-1] = p;
          recount(pp);
          recount(p);
          recount(n);
          if(s >= 3) {
            var ppp = n_stack[s-3];
            if(ppp.left === pp) {
              ppp.left = n;
            } else {
              ppp.right = n;
            }
          }
          break
        }
      }
    } else {
      if(p.right === n) {
        var y = pp.left;
        if(y && y._color === RED) {
          p._color = BLACK;
          pp.left = repaint(BLACK, y);
          pp._color = RED;
          s -= 1;
        } else {
          pp._color = RED;
          pp.right = p.left;
          p._color = BLACK;
          p.left = pp;
          n_stack[s-2] = p;
          n_stack[s-1] = n;
          recount(pp);
          recount(p);
          if(s >= 3) {
            var ppp = n_stack[s-3];
            if(ppp.right === pp) {
              ppp.right = p;
            } else {
              ppp.left = p;
            }
          }
          break
        }
      } else {
        var y = pp.left;
        if(y && y._color === RED) {
          p._color = BLACK;
          pp.left = repaint(BLACK, y);
          pp._color = RED;
          s -= 1;
        } else {
          p.left = n.right;
          pp._color = RED;
          pp.right = n.left;
          n._color = BLACK;
          n.right = p;
          n.left = pp;
          n_stack[s-2] = n;
          n_stack[s-1] = p;
          recount(pp);
          recount(p);
          recount(n);
          if(s >= 3) {
            var ppp = n_stack[s-3];
            if(ppp.right === pp) {
              ppp.right = n;
            } else {
              ppp.left = n;
            }
          }
          break
        }
      }
    }
  }
  n_stack[0]._color = BLACK;
  return new RedBlackTree(cmp, n_stack[0])
};
function doVisitFull(visit, node) {
  if(node.left) {
    var v = doVisitFull(visit, node.left);
    if(v) { return v }
  }
  var v = visit(node.key, node.value);
  if(v) { return v }
  if(node.right) {
    return doVisitFull(visit, node.right)
  }
}
function doVisitHalf(lo, compare, visit, node) {
  var l = compare(lo, node.key);
  if(l <= 0) {
    if(node.left) {
      var v = doVisitHalf(lo, compare, visit, node.left);
      if(v) { return v }
    }
    var v = visit(node.key, node.value);
    if(v) { return v }
  }
  if(node.right) {
    return doVisitHalf(lo, compare, visit, node.right)
  }
}
function doVisit(lo, hi, compare, visit, node) {
  var l = compare(lo, node.key);
  var h = compare(hi, node.key);
  var v;
  if(l <= 0) {
    if(node.left) {
      v = doVisit(lo, hi, compare, visit, node.left);
      if(v) { return v }
    }
    if(h > 0) {
      v = visit(node.key, node.value);
      if(v) { return v }
    }
  }
  if(h > 0 && node.right) {
    return doVisit(lo, hi, compare, visit, node.right)
  }
}
proto$3.forEach = function rbTreeForEach(visit, lo, hi) {
  if(!this.root) {
    return
  }
  switch(arguments.length) {
    case 1:
      return doVisitFull(visit, this.root)
    case 2:
      return doVisitHalf(lo, this._compare, visit, this.root)
    case 3:
      if(this._compare(lo, hi) >= 0) {
        return
      }
      return doVisit(lo, hi, this._compare, visit, this.root)
  }
};
Object.defineProperty(proto$3, "begin", {
  get: function() {
    var stack = [];
    var n = this.root;
    while(n) {
      stack.push(n);
      n = n.left;
    }
    return new RedBlackTreeIterator(this, stack)
  }
});
Object.defineProperty(proto$3, "end", {
  get: function() {
    var stack = [];
    var n = this.root;
    while(n) {
      stack.push(n);
      n = n.right;
    }
    return new RedBlackTreeIterator(this, stack)
  }
});
proto$3.at = function(idx) {
  if(idx < 0) {
    return new RedBlackTreeIterator(this, [])
  }
  var n = this.root;
  var stack = [];
  while(true) {
    stack.push(n);
    if(n.left) {
      if(idx < n.left._count) {
        n = n.left;
        continue
      }
      idx -= n.left._count;
    }
    if(!idx) {
      return new RedBlackTreeIterator(this, stack)
    }
    idx -= 1;
    if(n.right) {
      if(idx >= n.right._count) {
        break
      }
      n = n.right;
    } else {
      break
    }
  }
  return new RedBlackTreeIterator(this, [])
};
proto$3.ge = function(key) {
  var cmp = this._compare;
  var n = this.root;
  var stack = [];
  var last_ptr = 0;
  while(n) {
    var d = cmp(key, n.key);
    stack.push(n);
    if(d <= 0) {
      last_ptr = stack.length;
    }
    if(d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  stack.length = last_ptr;
  return new RedBlackTreeIterator(this, stack)
};
proto$3.gt = function(key) {
  var cmp = this._compare;
  var n = this.root;
  var stack = [];
  var last_ptr = 0;
  while(n) {
    var d = cmp(key, n.key);
    stack.push(n);
    if(d < 0) {
      last_ptr = stack.length;
    }
    if(d < 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  stack.length = last_ptr;
  return new RedBlackTreeIterator(this, stack)
};
proto$3.lt = function(key) {
  var cmp = this._compare;
  var n = this.root;
  var stack = [];
  var last_ptr = 0;
  while(n) {
    var d = cmp(key, n.key);
    stack.push(n);
    if(d > 0) {
      last_ptr = stack.length;
    }
    if(d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  stack.length = last_ptr;
  return new RedBlackTreeIterator(this, stack)
};
proto$3.le = function(key) {
  var cmp = this._compare;
  var n = this.root;
  var stack = [];
  var last_ptr = 0;
  while(n) {
    var d = cmp(key, n.key);
    stack.push(n);
    if(d >= 0) {
      last_ptr = stack.length;
    }
    if(d < 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  stack.length = last_ptr;
  return new RedBlackTreeIterator(this, stack)
};
proto$3.find = function(key) {
  var cmp = this._compare;
  var n = this.root;
  var stack = [];
  while(n) {
    var d = cmp(key, n.key);
    stack.push(n);
    if(d === 0) {
      return new RedBlackTreeIterator(this, stack)
    }
    if(d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  return new RedBlackTreeIterator(this, [])
};
proto$3.remove = function(key) {
  var iter = this.find(key);
  if(iter) {
    return iter.remove()
  }
  return this
};
proto$3.get = function(key) {
  var cmp = this._compare;
  var n = this.root;
  while(n) {
    var d = cmp(key, n.key);
    if(d === 0) {
      return n.value
    }
    if(d <= 0) {
      n = n.left;
    } else {
      n = n.right;
    }
  }
  return
};
function RedBlackTreeIterator(tree, stack) {
  this.tree = tree;
  this._stack = stack;
}
var iproto = RedBlackTreeIterator.prototype;
Object.defineProperty(iproto, "valid", {
  get: function() {
    return this._stack.length > 0
  }
});
Object.defineProperty(iproto, "node", {
  get: function() {
    if(this._stack.length > 0) {
      return this._stack[this._stack.length-1]
    }
    return null
  },
  enumerable: true
});
iproto.clone = function() {
  return new RedBlackTreeIterator(this.tree, this._stack.slice())
};
function swapNode(n, v) {
  n.key = v.key;
  n.value = v.value;
  n.left = v.left;
  n.right = v.right;
  n._color = v._color;
  n._count = v._count;
}
function fixDoubleBlack(stack) {
  var n, p, s, z;
  for(var i=stack.length-1; i>=0; --i) {
    n = stack[i];
    if(i === 0) {
      n._color = BLACK;
      return
    }
    p = stack[i-1];
    if(p.left === n) {
      s = p.right;
      if(s.right && s.right._color === RED) {
        s = p.right = cloneNode(s);
        z = s.right = cloneNode(s.right);
        p.right = s.left;
        s.left = p;
        s.right = z;
        s._color = p._color;
        n._color = BLACK;
        p._color = BLACK;
        z._color = BLACK;
        recount(p);
        recount(s);
        if(i > 1) {
          var pp = stack[i-2];
          if(pp.left === p) {
            pp.left = s;
          } else {
            pp.right = s;
          }
        }
        stack[i-1] = s;
        return
      } else if(s.left && s.left._color === RED) {
        s = p.right = cloneNode(s);
        z = s.left = cloneNode(s.left);
        p.right = z.left;
        s.left = z.right;
        z.left = p;
        z.right = s;
        z._color = p._color;
        p._color = BLACK;
        s._color = BLACK;
        n._color = BLACK;
        recount(p);
        recount(s);
        recount(z);
        if(i > 1) {
          var pp = stack[i-2];
          if(pp.left === p) {
            pp.left = z;
          } else {
            pp.right = z;
          }
        }
        stack[i-1] = z;
        return
      }
      if(s._color === BLACK) {
        if(p._color === RED) {
          p._color = BLACK;
          p.right = repaint(RED, s);
          return
        } else {
          p.right = repaint(RED, s);
          continue
        }
      } else {
        s = cloneNode(s);
        p.right = s.left;
        s.left = p;
        s._color = p._color;
        p._color = RED;
        recount(p);
        recount(s);
        if(i > 1) {
          var pp = stack[i-2];
          if(pp.left === p) {
            pp.left = s;
          } else {
            pp.right = s;
          }
        }
        stack[i-1] = s;
        stack[i] = p;
        if(i+1 < stack.length) {
          stack[i+1] = n;
        } else {
          stack.push(n);
        }
        i = i+2;
      }
    } else {
      s = p.left;
      if(s.left && s.left._color === RED) {
        s = p.left = cloneNode(s);
        z = s.left = cloneNode(s.left);
        p.left = s.right;
        s.right = p;
        s.left = z;
        s._color = p._color;
        n._color = BLACK;
        p._color = BLACK;
        z._color = BLACK;
        recount(p);
        recount(s);
        if(i > 1) {
          var pp = stack[i-2];
          if(pp.right === p) {
            pp.right = s;
          } else {
            pp.left = s;
          }
        }
        stack[i-1] = s;
        return
      } else if(s.right && s.right._color === RED) {
        s = p.left = cloneNode(s);
        z = s.right = cloneNode(s.right);
        p.left = z.right;
        s.right = z.left;
        z.right = p;
        z.left = s;
        z._color = p._color;
        p._color = BLACK;
        s._color = BLACK;
        n._color = BLACK;
        recount(p);
        recount(s);
        recount(z);
        if(i > 1) {
          var pp = stack[i-2];
          if(pp.right === p) {
            pp.right = z;
          } else {
            pp.left = z;
          }
        }
        stack[i-1] = z;
        return
      }
      if(s._color === BLACK) {
        if(p._color === RED) {
          p._color = BLACK;
          p.left = repaint(RED, s);
          return
        } else {
          p.left = repaint(RED, s);
          continue
        }
      } else {
        s = cloneNode(s);
        p.left = s.right;
        s.right = p;
        s._color = p._color;
        p._color = RED;
        recount(p);
        recount(s);
        if(i > 1) {
          var pp = stack[i-2];
          if(pp.right === p) {
            pp.right = s;
          } else {
            pp.left = s;
          }
        }
        stack[i-1] = s;
        stack[i] = p;
        if(i+1 < stack.length) {
          stack[i+1] = n;
        } else {
          stack.push(n);
        }
        i = i+2;
      }
    }
  }
}
iproto.remove = function() {
  var stack = this._stack;
  if(stack.length === 0) {
    return this.tree
  }
  var cstack = new Array(stack.length);
  var n = stack[stack.length-1];
  cstack[cstack.length-1] = new RBNode(n._color, n.key, n.value, n.left, n.right, n._count);
  for(var i=stack.length-2; i>=0; --i) {
    var n = stack[i];
    if(n.left === stack[i+1]) {
      cstack[i] = new RBNode(n._color, n.key, n.value, cstack[i+1], n.right, n._count);
    } else {
      cstack[i] = new RBNode(n._color, n.key, n.value, n.left, cstack[i+1], n._count);
    }
  }
  n = cstack[cstack.length-1];
  if(n.left && n.right) {
    var split = cstack.length;
    n = n.left;
    while(n.right) {
      cstack.push(n);
      n = n.right;
    }
    var v = cstack[split-1];
    cstack.push(new RBNode(n._color, v.key, v.value, n.left, n.right, n._count));
    cstack[split-1].key = n.key;
    cstack[split-1].value = n.value;
    for(var i=cstack.length-2; i>=split; --i) {
      n = cstack[i];
      cstack[i] = new RBNode(n._color, n.key, n.value, n.left, cstack[i+1], n._count);
    }
    cstack[split-1].left = cstack[split];
  }
  n = cstack[cstack.length-1];
  if(n._color === RED) {
    var p = cstack[cstack.length-2];
    if(p.left === n) {
      p.left = null;
    } else if(p.right === n) {
      p.right = null;
    }
    cstack.pop();
    for(var i=0; i<cstack.length; ++i) {
      cstack[i]._count--;
    }
    return new RedBlackTree(this.tree._compare, cstack[0])
  } else {
    if(n.left || n.right) {
      if(n.left) {
        swapNode(n, n.left);
      } else if(n.right) {
        swapNode(n, n.right);
      }
      n._color = BLACK;
      for(var i=0; i<cstack.length-1; ++i) {
        cstack[i]._count--;
      }
      return new RedBlackTree(this.tree._compare, cstack[0])
    } else if(cstack.length === 1) {
      return new RedBlackTree(this.tree._compare, null)
    } else {
      for(var i=0; i<cstack.length; ++i) {
        cstack[i]._count--;
      }
      var parent = cstack[cstack.length-2];
      fixDoubleBlack(cstack);
      if(parent.left === n) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }
  }
  return new RedBlackTree(this.tree._compare, cstack[0])
};
Object.defineProperty(iproto, "key", {
  get: function() {
    if(this._stack.length > 0) {
      return this._stack[this._stack.length-1].key
    }
    return
  },
  enumerable: true
});
Object.defineProperty(iproto, "value", {
  get: function() {
    if(this._stack.length > 0) {
      return this._stack[this._stack.length-1].value
    }
    return
  },
  enumerable: true
});
Object.defineProperty(iproto, "index", {
  get: function() {
    var idx = 0;
    var stack = this._stack;
    if(stack.length === 0) {
      var r = this.tree.root;
      if(r) {
        return r._count
      }
      return 0
    } else if(stack[stack.length-1].left) {
      idx = stack[stack.length-1].left._count;
    }
    for(var s=stack.length-2; s>=0; --s) {
      if(stack[s+1] === stack[s].right) {
        ++idx;
        if(stack[s].left) {
          idx += stack[s].left._count;
        }
      }
    }
    return idx
  },
  enumerable: true
});
iproto.next = function() {
  var stack = this._stack;
  if(stack.length === 0) {
    return
  }
  var n = stack[stack.length-1];
  if(n.right) {
    n = n.right;
    while(n) {
      stack.push(n);
      n = n.left;
    }
  } else {
    stack.pop();
    while(stack.length > 0 && stack[stack.length-1].right === n) {
      n = stack[stack.length-1];
      stack.pop();
    }
  }
};
Object.defineProperty(iproto, "hasNext", {
  get: function() {
    var stack = this._stack;
    if(stack.length === 0) {
      return false
    }
    if(stack[stack.length-1].right) {
      return true
    }
    for(var s=stack.length-1; s>0; --s) {
      if(stack[s-1].left === stack[s]) {
        return true
      }
    }
    return false
  }
});
iproto.update = function(value) {
  var stack = this._stack;
  if(stack.length === 0) {
    throw new Error("Can't update empty node!")
  }
  var cstack = new Array(stack.length);
  var n = stack[stack.length-1];
  cstack[cstack.length-1] = new RBNode(n._color, n.key, value, n.left, n.right, n._count);
  for(var i=stack.length-2; i>=0; --i) {
    n = stack[i];
    if(n.left === stack[i+1]) {
      cstack[i] = new RBNode(n._color, n.key, n.value, cstack[i+1], n.right, n._count);
    } else {
      cstack[i] = new RBNode(n._color, n.key, n.value, n.left, cstack[i+1], n._count);
    }
  }
  return new RedBlackTree(this.tree._compare, cstack[0])
};
iproto.prev = function() {
  var stack = this._stack;
  if(stack.length === 0) {
    return
  }
  var n = stack[stack.length-1];
  if(n.left) {
    n = n.left;
    while(n) {
      stack.push(n);
      n = n.right;
    }
  } else {
    stack.pop();
    while(stack.length > 0 && stack[stack.length-1].left === n) {
      n = stack[stack.length-1];
      stack.pop();
    }
  }
};
Object.defineProperty(iproto, "hasPrev", {
  get: function() {
    var stack = this._stack;
    if(stack.length === 0) {
      return false
    }
    if(stack[stack.length-1].left) {
      return true
    }
    for(var s=stack.length-1; s>0; --s) {
      if(stack[s-1].right === stack[s]) {
        return true
      }
    }
    return false
  }
});
function defaultCompare(a, b) {
  if(a < b) {
    return -1
  }
  if(a > b) {
    return 1
  }
  return 0
}
function createRBTree(compare) {
  return new RedBlackTree(compare || defaultCompare, null)
}

var orderSegments_1 = orderSegments;
function horizontalOrder(a, b) {
  var bl, br;
  if(b[0][0] < b[1][0]) {
    bl = b[0];
    br = b[1];
  } else if(b[0][0] > b[1][0]) {
    bl = b[1];
    br = b[0];
  } else {
    var alo = Math.min(a[0][1], a[1][1]);
    var ahi = Math.max(a[0][1], a[1][1]);
    var blo = Math.min(b[0][1], b[1][1]);
    var bhi = Math.max(b[0][1], b[1][1]);
    if(ahi < blo) {
      return ahi - blo
    }
    if(alo > bhi) {
      return alo - bhi
    }
    return ahi - bhi
  }
  var al, ar;
  if(a[0][1] < a[1][1]) {
    al = a[0];
    ar = a[1];
  } else {
    al = a[1];
    ar = a[0];
  }
  var d = orientation_1(br, bl, al);
  if(d) {
    return d
  }
  d = orientation_1(br, bl, ar);
  if(d) {
    return d
  }
  return ar - br
}
function orderSegments(b, a) {
  var al, ar;
  if(a[0][0] < a[1][0]) {
    al = a[0];
    ar = a[1];
  } else if(a[0][0] > a[1][0]) {
    al = a[1];
    ar = a[0];
  } else {
    return horizontalOrder(a, b)
  }
  var bl, br;
  if(b[0][0] < b[1][0]) {
    bl = b[0];
    br = b[1];
  } else if(b[0][0] > b[1][0]) {
    bl = b[1];
    br = b[0];
  } else {
    return -horizontalOrder(b, a)
  }
  var d1 = orientation_1(al, ar, br);
  var d2 = orientation_1(al, ar, bl);
  if(d1 < 0) {
    if(d2 <= 0) {
      return d1
    }
  } else if(d1 > 0) {
    if(d2 >= 0) {
      return d1
    }
  } else if(d2) {
    return d2
  }
  d1 = orientation_1(br, bl, ar);
  d2 = orientation_1(br, bl, al);
  if(d1 < 0) {
    if(d2 <= 0) {
      return d1
    }
  } else if(d1 > 0) {
    if(d2 >= 0) {
      return d1
    }
  } else if(d2) {
    return d2
  }
  return ar[0] - br[0]
}

var slabs = createSlabDecomposition;
function SlabDecomposition(slabs, coordinates, horizontal) {
  this.slabs = slabs;
  this.coordinates = coordinates;
  this.horizontal = horizontal;
}
var proto$4 = SlabDecomposition.prototype;
function compareHorizontal(e, y) {
  return e.y - y
}
function searchBucket(root, p) {
  var lastNode = null;
  while(root) {
    var seg = root.key;
    var l, r;
    if(seg[0][0] < seg[1][0]) {
      l = seg[0];
      r = seg[1];
    } else {
      l = seg[1];
      r = seg[0];
    }
    var o = orientation_1(l, r, p);
    if(o < 0) {
      root = root.left;
    } else if(o > 0) {
      if(p[0] !== seg[1][0]) {
        lastNode = root;
        root = root.right;
      } else {
        var val = searchBucket(root.right, p);
        if(val) {
          return val
        }
        root = root.left;
      }
    } else {
      if(p[0] !== seg[1][0]) {
        return root
      } else {
        var val = searchBucket(root.right, p);
        if(val) {
          return val
        }
        root = root.left;
      }
    }
  }
  return lastNode
}
proto$4.castUp = function(p) {
  var bucket = searchBounds$1.le(this.coordinates, p[0]);
  if(bucket < 0) {
    return -1
  }
  var root = this.slabs[bucket];
  var hitNode = searchBucket(this.slabs[bucket], p);
  var lastHit = -1;
  if(hitNode) {
    lastHit = hitNode.value;
  }
  if(this.coordinates[bucket] === p[0]) {
    var lastSegment = null;
    if(hitNode) {
      lastSegment = hitNode.key;
    }
    if(bucket > 0) {
      var otherHitNode = searchBucket(this.slabs[bucket-1], p);
      if(otherHitNode) {
        if(lastSegment) {
          if(orderSegments_1(otherHitNode.key, lastSegment) > 0) {
            lastSegment = otherHitNode.key;
            lastHit = otherHitNode.value;
          }
        } else {
          lastHit = otherHitNode.value;
          lastSegment = otherHitNode.key;
        }
      }
    }
    var horiz = this.horizontal[bucket];
    if(horiz.length > 0) {
      var hbucket = searchBounds$1.ge(horiz, p[1], compareHorizontal);
      if(hbucket < horiz.length) {
        var e = horiz[hbucket];
        if(p[1] === e.y) {
          if(e.closed) {
            return e.index
          } else {
            while(hbucket < horiz.length-1 && horiz[hbucket+1].y === p[1]) {
              hbucket = hbucket+1;
              e = horiz[hbucket];
              if(e.closed) {
                return e.index
              }
            }
            if(e.y === p[1] && !e.start) {
              hbucket = hbucket+1;
              if(hbucket >= horiz.length) {
                return lastHit
              }
              e = horiz[hbucket];
            }
          }
        }
        if(e.start) {
          if(lastSegment) {
            var o = orientation_1(lastSegment[0], lastSegment[1], [p[0], e.y]);
            if(lastSegment[0][0] > lastSegment[1][0]) {
              o = -o;
            }
            if(o > 0) {
              lastHit = e.index;
            }
          } else {
            lastHit = e.index;
          }
        } else if(e.y !== p[1]) {
          lastHit = e.index;
        }
      }
    }
  }
  return lastHit
};
function IntervalSegment(y, index, start, closed) {
  this.y = y;
  this.index = index;
  this.start = start;
  this.closed = closed;
}
function Event$1(x, segment, create, index) {
  this.x = x;
  this.segment = segment;
  this.create = create;
  this.index = index;
}
function createSlabDecomposition(segments) {
  var numSegments = segments.length;
  var numEvents = 2 * numSegments;
  var events = new Array(numEvents);
  for(var i=0; i<numSegments; ++i) {
    var s = segments[i];
    var f = s[0][0] < s[1][0];
    events[2*i] = new Event$1(s[0][0], s, f, i);
    events[2*i+1] = new Event$1(s[1][0], s, !f, i);
  }
  events.sort(function(a,b) {
    var d = a.x - b.x;
    if(d) {
      return d
    }
    d = a.create - b.create;
    if(d) {
      return d
    }
    return Math.min(a.segment[0][1], a.segment[1][1]) - Math.min(b.segment[0][1], b.segment[1][1])
  });
  var tree = rbtree(orderSegments_1);
  var slabs = [];
  var lines = [];
  var horizontal = [];
  for(var i=0; i<numEvents; ) {
    var x = events[i].x;
    var horiz = [];
    while(i < numEvents) {
      var e = events[i];
      if(e.x !== x) {
        break
      }
      i += 1;
      if(e.segment[0][0] === e.x && e.segment[1][0] === e.x) {
        if(e.create) {
          if(e.segment[0][1] < e.segment[1][1]) {
            horiz.push(new IntervalSegment(
                e.segment[0][1],
                e.index,
                true,
                true));
            horiz.push(new IntervalSegment(
                e.segment[1][1],
                e.index,
                false,
                false));
          } else {
            horiz.push(new IntervalSegment(
                e.segment[1][1],
                e.index,
                true,
                false));
            horiz.push(new IntervalSegment(
                e.segment[0][1],
                e.index,
                false,
                true));
          }
        }
      } else {
        if(e.create) {
          tree = tree.insert(e.segment, e.index);
        } else {
          tree = tree.remove(e.segment);
        }
      }
    }
    slabs.push(tree.root);
    lines.push(x);
    horizontal.push(horiz);
  }
  return new SlabDecomposition(slabs, lines, horizontal)
}

var NOT_FOUND = 0;
var SUCCESS = 1;
var EMPTY = 2;
var intervalTree = createWrapper;
function IntervalTreeNode(mid, left, right, leftPoints, rightPoints) {
  this.mid = mid;
  this.left = left;
  this.right = right;
  this.leftPoints = leftPoints;
  this.rightPoints = rightPoints;
  this.count = (left ? left.count : 0) + (right ? right.count : 0) + leftPoints.length;
}
var proto$5 = IntervalTreeNode.prototype;
function copy(a, b) {
  a.mid = b.mid;
  a.left = b.left;
  a.right = b.right;
  a.leftPoints = b.leftPoints;
  a.rightPoints = b.rightPoints;
  a.count = b.count;
}
function rebuild(node, intervals) {
  var ntree = createIntervalTree(intervals);
  node.mid = ntree.mid;
  node.left = ntree.left;
  node.right = ntree.right;
  node.leftPoints = ntree.leftPoints;
  node.rightPoints = ntree.rightPoints;
  node.count = ntree.count;
}
function rebuildWithInterval(node, interval) {
  var intervals = node.intervals([]);
  intervals.push(interval);
  rebuild(node, intervals);
}
function rebuildWithoutInterval(node, interval) {
  var intervals = node.intervals([]);
  var idx = intervals.indexOf(interval);
  if(idx < 0) {
    return NOT_FOUND
  }
  intervals.splice(idx, 1);
  rebuild(node, intervals);
  return SUCCESS
}
proto$5.intervals = function(result) {
  result.push.apply(result, this.leftPoints);
  if(this.left) {
    this.left.intervals(result);
  }
  if(this.right) {
    this.right.intervals(result);
  }
  return result
};
proto$5.insert = function(interval) {
  var weight = this.count - this.leftPoints.length;
  this.count += 1;
  if(interval[1] < this.mid) {
    if(this.left) {
      if(4*(this.left.count+1) > 3*(weight+1)) {
        rebuildWithInterval(this, interval);
      } else {
        this.left.insert(interval);
      }
    } else {
      this.left = createIntervalTree([interval]);
    }
  } else if(interval[0] > this.mid) {
    if(this.right) {
      if(4*(this.right.count+1) > 3*(weight+1)) {
        rebuildWithInterval(this, interval);
      } else {
        this.right.insert(interval);
      }
    } else {
      this.right = createIntervalTree([interval]);
    }
  } else {
    var l = searchBounds$1.ge(this.leftPoints, interval, compareBegin);
    var r = searchBounds$1.ge(this.rightPoints, interval, compareEnd);
    this.leftPoints.splice(l, 0, interval);
    this.rightPoints.splice(r, 0, interval);
  }
};
proto$5.remove = function(interval) {
  var weight = this.count - this.leftPoints;
  if(interval[1] < this.mid) {
    if(!this.left) {
      return NOT_FOUND
    }
    var rw = this.right ? this.right.count : 0;
    if(4 * rw > 3 * (weight-1)) {
      return rebuildWithoutInterval(this, interval)
    }
    var r = this.left.remove(interval);
    if(r === EMPTY) {
      this.left = null;
      this.count -= 1;
      return SUCCESS
    } else if(r === SUCCESS) {
      this.count -= 1;
    }
    return r
  } else if(interval[0] > this.mid) {
    if(!this.right) {
      return NOT_FOUND
    }
    var lw = this.left ? this.left.count : 0;
    if(4 * lw > 3 * (weight-1)) {
      return rebuildWithoutInterval(this, interval)
    }
    var r = this.right.remove(interval);
    if(r === EMPTY) {
      this.right = null;
      this.count -= 1;
      return SUCCESS
    } else if(r === SUCCESS) {
      this.count -= 1;
    }
    return r
  } else {
    if(this.count === 1) {
      if(this.leftPoints[0] === interval) {
        return EMPTY
      } else {
        return NOT_FOUND
      }
    }
    if(this.leftPoints.length === 1 && this.leftPoints[0] === interval) {
      if(this.left && this.right) {
        var p = this;
        var n = this.left;
        while(n.right) {
          p = n;
          n = n.right;
        }
        if(p === this) {
          n.right = this.right;
        } else {
          var l = this.left;
          var r = this.right;
          p.count -= n.count;
          p.right = n.left;
          n.left = l;
          n.right = r;
        }
        copy(this, n);
        this.count = (this.left?this.left.count:0) + (this.right?this.right.count:0) + this.leftPoints.length;
      } else if(this.left) {
        copy(this, this.left);
      } else {
        copy(this, this.right);
      }
      return SUCCESS
    }
    for(var l = searchBounds$1.ge(this.leftPoints, interval, compareBegin); l<this.leftPoints.length; ++l) {
      if(this.leftPoints[l][0] !== interval[0]) {
        break
      }
      if(this.leftPoints[l] === interval) {
        this.count -= 1;
        this.leftPoints.splice(l, 1);
        for(var r = searchBounds$1.ge(this.rightPoints, interval, compareEnd); r<this.rightPoints.length; ++r) {
          if(this.rightPoints[r][1] !== interval[1]) {
            break
          } else if(this.rightPoints[r] === interval) {
            this.rightPoints.splice(r, 1);
            return SUCCESS
          }
        }
      }
    }
    return NOT_FOUND
  }
};
function reportLeftRange(arr, hi, cb) {
  for(var i=0; i<arr.length && arr[i][0] <= hi; ++i) {
    var r = cb(arr[i]);
    if(r) { return r }
  }
}
function reportRightRange(arr, lo, cb) {
  for(var i=arr.length-1; i>=0 && arr[i][1] >= lo; --i) {
    var r = cb(arr[i]);
    if(r) { return r }
  }
}
function reportRange(arr, cb) {
  for(var i=0; i<arr.length; ++i) {
    var r = cb(arr[i]);
    if(r) { return r }
  }
}
proto$5.queryPoint = function(x, cb) {
  if(x < this.mid) {
    if(this.left) {
      var r = this.left.queryPoint(x, cb);
      if(r) { return r }
    }
    return reportLeftRange(this.leftPoints, x, cb)
  } else if(x > this.mid) {
    if(this.right) {
      var r = this.right.queryPoint(x, cb);
      if(r) { return r }
    }
    return reportRightRange(this.rightPoints, x, cb)
  } else {
    return reportRange(this.leftPoints, cb)
  }
};
proto$5.queryInterval = function(lo, hi, cb) {
  if(lo < this.mid && this.left) {
    var r = this.left.queryInterval(lo, hi, cb);
    if(r) { return r }
  }
  if(hi > this.mid && this.right) {
    var r = this.right.queryInterval(lo, hi, cb);
    if(r) { return r }
  }
  if(hi < this.mid) {
    return reportLeftRange(this.leftPoints, hi, cb)
  } else if(lo > this.mid) {
    return reportRightRange(this.rightPoints, lo, cb)
  } else {
    return reportRange(this.leftPoints, cb)
  }
};
function compareNumbers(a, b) {
  return a - b
}
function compareBegin(a, b) {
  var d = a[0] - b[0];
  if(d) { return d }
  return a[1] - b[1]
}
function compareEnd(a, b) {
  var d = a[1] - b[1];
  if(d) { return d }
  return a[0] - b[0]
}
function createIntervalTree(intervals) {
  if(intervals.length === 0) {
    return null
  }
  var pts = [];
  for(var i=0; i<intervals.length; ++i) {
    pts.push(intervals[i][0], intervals[i][1]);
  }
  pts.sort(compareNumbers);
  var mid = pts[pts.length>>1];
  var leftIntervals = [];
  var rightIntervals = [];
  var centerIntervals = [];
  for(var i=0; i<intervals.length; ++i) {
    var s = intervals[i];
    if(s[1] < mid) {
      leftIntervals.push(s);
    } else if(mid < s[0]) {
      rightIntervals.push(s);
    } else {
      centerIntervals.push(s);
    }
  }
  var leftPoints = centerIntervals;
  var rightPoints = centerIntervals.slice();
  leftPoints.sort(compareBegin);
  rightPoints.sort(compareEnd);
  return new IntervalTreeNode(mid,
    createIntervalTree(leftIntervals),
    createIntervalTree(rightIntervals),
    leftPoints,
    rightPoints)
}
function IntervalTree(root) {
  this.root = root;
}
var tproto = IntervalTree.prototype;
tproto.insert = function(interval) {
  if(this.root) {
    this.root.insert(interval);
  } else {
    this.root = new IntervalTreeNode(interval[0], null, null, [interval], [interval]);
  }
};
tproto.remove = function(interval) {
  if(this.root) {
    var r = this.root.remove(interval);
    if(r === EMPTY) {
      this.root = null;
    }
    return r !== NOT_FOUND
  }
  return false
};
tproto.queryPoint = function(p, cb) {
  if(this.root) {
    return this.root.queryPoint(p, cb)
  }
};
tproto.queryInterval = function(lo, hi, cb) {
  if(lo <= hi && this.root) {
    return this.root.queryInterval(lo, hi, cb)
  }
};
Object.defineProperty(tproto, "count", {
  get: function() {
    if(this.root) {
      return this.root.count
    }
    return 0
  }
});
Object.defineProperty(tproto, "intervals", {
  get: function() {
    if(this.root) {
      return this.root.intervals([])
    }
    return []
  }
});
function createWrapper(intervals) {
  if(!intervals || intervals.length === 0) {
    return new IntervalTree(null)
  }
  return new IntervalTree(createIntervalTree(intervals))
}

var pnpBig = preprocessPolygon;
var orient$2 = orientation_1[3];
function visitInterval() {
  return true
}
function intervalSearch(table) {
  return function(x, y) {
    var tree = table[x];
    if(tree) {
      return !!tree.queryPoint(y, visitInterval)
    }
    return false
  }
}
function buildVerticalIndex(segments) {
  var table = {};
  for(var i=0; i<segments.length; ++i) {
    var s = segments[i];
    var x = s[0][0];
    var y0 = s[0][1];
    var y1 = s[1][1];
    var p = [ Math.min(y0, y1), Math.max(y0, y1) ];
    if(x in table) {
      table[x].push(p);
    } else {
      table[x] = [ p ];
    }
  }
  var intervalTable = {};
  var keys = Object.keys(table);
  for(var i=0; i<keys.length; ++i) {
    var segs = table[keys[i]];
    intervalTable[keys[i]] = intervalTree(segs);
  }
  return intervalSearch(intervalTable)
}
function buildSlabSearch(slabs, coordinates) {
  return function(p) {
    var bucket = searchBounds$1.le(coordinates, p[0]);
    if(bucket < 0) {
      return 1
    }
    var root = slabs[bucket];
    if(!root) {
      if(bucket > 0 && coordinates[bucket] === p[0]) {
        root = slabs[bucket-1];
      } else {
        return 1
      }
    }
    var lastOrientation = 1;
    while(root) {
      var s = root.key;
      var o = orient$2(p, s[0], s[1]);
      if(s[0][0] < s[1][0]) {
        if(o < 0) {
          root = root.left;
        } else if(o > 0) {
          lastOrientation = -1;
          root = root.right;
        } else {
          return 0
        }
      } else {
        if(o > 0) {
          root = root.left;
        } else if(o < 0) {
          lastOrientation = 1;
          root = root.right;
        } else {
          return 0
        }
      }
    }
    return lastOrientation
  }
}
function classifyEmpty(p) {
  return 1
}
function createClassifyVertical(testVertical) {
  return function classify(p) {
    if(testVertical(p[0], p[1])) {
      return 0
    }
    return 1
  }
}
function createClassifyPointDegen(testVertical, testNormal) {
  return function classify(p) {
    if(testVertical(p[0], p[1])) {
      return 0
    }
    return testNormal(p)
  }
}
function preprocessPolygon(loops) {
  var numLoops = loops.length;
  var segments = [];
  var vsegments = [];
  for(var i=0; i<numLoops; ++i) {
    var loop = loops[i];
    var numVertices = loop.length;
    for(var s=numVertices-1,t=0; t<numVertices; s=(t++)) {
      var a = loop[s];
      var b = loop[t];
      if(a[0] === b[0]) {
        vsegments.push([a,b]);
      } else {
        segments.push([a,b]);
      }
    }
  }
  if(segments.length === 0) {
    if(vsegments.length === 0) {
      return classifyEmpty
    } else {
      return createClassifyVertical(buildVerticalIndex(vsegments))
    }
  }
  var slabs$1 = slabs(segments);
  var testSlab = buildSlabSearch(slabs$1.slabs, slabs$1.coordinates);
  if(vsegments.length === 0) {
    return testSlab
  } else {
    return createClassifyPointDegen(
      buildVerticalIndex(vsegments),
      testSlab)
  }
}

var trimLeaves_1 = trimLeaves;
function trimLeaves(edges, positions) {
  var adj = e2a(edges, positions.length);
  var live = new Array(positions.length);
  var nbhd = new Array(positions.length);
  var dead = [];
  for(var i=0; i<positions.length; ++i) {
    var count = adj[i].length;
    nbhd[i] = count;
    live[i] = true;
    if(count <= 1) {
      dead.push(i);
    }
  }
  while(dead.length > 0) {
    var v = dead.pop();
    live[v] = false;
    var n = adj[v];
    for(var i=0; i<n.length; ++i) {
      var u = n[i];
      if(--nbhd[u] === 0) {
        dead.push(u);
      }
    }
  }
  var newIndex = new Array(positions.length);
  var npositions = [];
  for(var i=0; i<positions.length; ++i) {
    if(live[i]) {
      var v = npositions.length;
      newIndex[i] = v;
      npositions.push(positions[i]);
    } else {
      newIndex[i] = -1;
    }
  }
  var nedges = [];
  for(var i=0; i<edges.length; ++i) {
    var e = edges[i];
    if(live[e[0]] && live[e[1]]) {
      nedges.push([ newIndex[e[0]], newIndex[e[1]] ]);
    }
  }
  return [ nedges, npositions ]
}

var pg2pl = planarGraphToPolyline;
function makeArray(length, fill) {
  var result = new Array(length);
  for(var i=0; i<length; ++i) {
    result[i] = fill;
  }
  return result
}
function makeArrayOfArrays(length) {
  var result = new Array(length);
  for(var i=0; i<length; ++i) {
    result[i] = [];
  }
  return result
}
function planarGraphToPolyline(edges, positions) {
  var result = trimLeaves_1(edges, positions);
  edges = result[0];
  positions = result[1];
  var numVertices = positions.length;
  var numEdges = edges.length;
  var adj = e2a(edges, positions.length);
  for(var i=0; i<numVertices; ++i) {
    if(adj[i].length % 2 === 1) {
      throw new Error('planar-graph-to-polyline: graph must be manifold')
    }
  }
  var faces = loops(edges, positions);
  function ccw(c) {
    var n = c.length;
    var area = [0];
    for(var j=0; j<n; ++j) {
      var a = positions[c[j]];
      var b = positions[c[(j+1)%n]];
      var t00 = twoProduct_1(-a[0], a[1]);
      var t01 = twoProduct_1(-a[0], b[1]);
      var t10 = twoProduct_1( b[0], a[1]);
      var t11 = twoProduct_1( b[0], b[1]);
      area = robustSum(area, robustSum(robustSum(t00, t01), robustSum(t10, t11)));
    }
    return area[area.length-1] > 0
  }
  faces = faces.filter(ccw);
  var numFaces = faces.length;
  var parent = new Array(numFaces);
  var containment = new Array(numFaces);
  for(var i=0; i<numFaces; ++i) {
    parent[i] = i;
    var row = new Array(numFaces);
    var loopVertices = faces[i].map(function(v) {
      return positions[v]
    });
    var pmc = pnpBig([loopVertices]);
    var count = 0;
    outer:
    for(var j=0; j<numFaces; ++j) {
      row[j] = 0;
      if(i === j) {
        continue
      }
      var c = faces[j];
      var n = c.length;
      for(var k=0; k<n; ++k) {
        var d = pmc(positions[c[k]]);
        if(d !== 0) {
          if(d < 0) {
            row[j] = 1;
            count += 1;
          }
          continue outer
        }
      }
      row[j] = 1;
      count += 1;
    }
    containment[i] = [count, i, row];
  }
  containment.sort(function(a,b) {
    return b[0] - a[0]
  });
  for(var i=0; i<numFaces; ++i) {
    var row = containment[i];
    var idx = row[1];
    var children = row[2];
    for(var j=0; j<numFaces; ++j) {
      if(children[j]) {
        parent[j] = idx;
      }
    }
  }
  var fadj = makeArrayOfArrays(numFaces);
  for(var i=0; i<numFaces; ++i) {
    fadj[i].push(parent[i]);
    fadj[parent[i]].push(i);
  }
  var edgeAdjacency = {};
  var internalVertices = makeArray(numVertices, false);
  for(var i=0; i<numFaces; ++i) {
    var c = faces[i];
    var n = c.length;
    for(var j=0; j<n; ++j) {
      var a = c[j];
      var b = c[(j+1)%n];
      var key = Math.min(a,b) + ":" + Math.max(a,b);
      if(key in edgeAdjacency) {
        var neighbor = edgeAdjacency[key];
        fadj[neighbor].push(i);
        fadj[i].push(neighbor);
        internalVertices[a] = internalVertices[b] = true;
      } else {
        edgeAdjacency[key] = i;
      }
    }
  }
  function sharedBoundary(c) {
    var n = c.length;
    for(var i=0; i<n; ++i) {
      if(!internalVertices[c[i]]) {
        return false
      }
    }
    return true
  }
  var toVisit = [];
  var parity = makeArray(numFaces, -1);
  for(var i=0; i<numFaces; ++i) {
    if(parent[i] === i && !sharedBoundary(faces[i])) {
      toVisit.push(i);
      parity[i] = 0;
    } else {
      parity[i] = -1;
    }
  }
  var result = [];
  while(toVisit.length > 0) {
    var top = toVisit.pop();
    var nbhd = fadj[top];
    uniq(nbhd, function(a,b) {
      return a-b
    });
    var nnbhr = nbhd.length;
    var p = parity[top];
    var polyline;
    if(p === 0) {
      var c = faces[top];
      polyline = [c];
    }
    for(var i=0; i<nnbhr; ++i) {
      var f = nbhd[i];
      if(parity[f] >= 0) {
        continue
      }
      parity[f] = p^1;
      toVisit.push(f);
      if(p === 0) {
        var c = faces[f];
        if(!sharedBoundary(c)) {
          c.reverse();
          polyline.push(c);
        }
      }
    }
    if(p === 0) {
      result.push(polyline);
    }
  }
  return result
}

var vtext = vectorizeText;
var processPixels_1 = processPixels;
var TAG_bold = "b";
var CHR_bold = 'b|';
var TAG_italic = "i";
var CHR_italic = 'i|';
var TAG_super = "sup";
var CHR_super0 = '+';
var CHR_super = '+1';
var TAG_sub = "sub";
var CHR_sub0 = '-';
var CHR_sub = '-1';
function parseTag(tag, TAG_CHR, str, map) {
  var opnTag =  "<"  + tag + ">";
  var clsTag =  "</" + tag + ">";
  var nOPN = opnTag.length;
  var nCLS = clsTag.length;
  var isRecursive = (TAG_CHR[0] === CHR_super0) ||
                    (TAG_CHR[0] === CHR_sub0);
  var a = 0;
  var b = -nCLS;
  while (a > -1) {
    a = str.indexOf(opnTag, a);
    if(a === -1) break
    b = str.indexOf(clsTag, a + nOPN);
    if(b === -1) break
    if(b <= a) break
    for(var i = a; i < b + nCLS; ++i){
      if((i < a + nOPN) || (i >= b)) {
        map[i] = null;
        str = str.substr(0, i) + " " + str.substr(i + 1);
      } else {
        if(map[i] !== null) {
          var pos = map[i].indexOf(TAG_CHR[0]);
          if(pos === -1) {
            map[i] += TAG_CHR;
          } else {
            if(isRecursive) {
              map[i] = map[i].substr(0, pos + 1) + (1 + parseInt(map[i][pos + 1])) + map[i].substr(pos + 2);
            }
          }
        }
      }
    }
    var start = a + nOPN;
    var remainingStr = str.substr(start, b - start);
    var c = remainingStr.indexOf(opnTag);
    if(c !== -1) a = c;
    else a = b + nCLS;
  }
  return map
}
function transformPositions(positions, options, size) {
  var align = options.textAlign || "start";
  var baseline = options.textBaseline || "alphabetic";
  var lo = [1<<30, 1<<30];
  var hi = [0,0];
  var n = positions.length;
  for(var i=0; i<n; ++i) {
    var p = positions[i];
    for(var j=0; j<2; ++j) {
      lo[j] = Math.min(lo[j], p[j])|0;
      hi[j] = Math.max(hi[j], p[j])|0;
    }
  }
  var xShift = 0;
  switch(align) {
    case "center":
      xShift = -0.5 * (lo[0] + hi[0]);
    break
    case "right":
    case "end":
      xShift = -hi[0];
    break
    case "left":
    case "start":
      xShift = -lo[0];
    break
    default:
      throw new Error("vectorize-text: Unrecognized textAlign: '" + align + "'")
  }
  var yShift = 0;
  switch(baseline) {
    case "hanging":
    case "top":
      yShift = -lo[1];
    break
    case "middle":
      yShift = -0.5 * (lo[1] + hi[1]);
    break
    case "alphabetic":
    case "ideographic":
      yShift = -3 * size;
    break
    case "bottom":
      yShift = -hi[1];
    break
    default:
      throw new Error("vectorize-text: Unrecoginized textBaseline: '" + baseline + "'")
  }
  var scale = 1.0 / size;
  if("lineHeight" in options) {
    scale *= +options.lineHeight;
  } else if("width" in options) {
    scale = options.width / (hi[0] - lo[0]);
  } else if("height" in options) {
    scale = options.height / (hi[1] - lo[1]);
  }
  return positions.map(function(p) {
    return [ scale * (p[0] + xShift), scale * (p[1] + yShift) ]
  })
}
function getPixels(canvas, context, rawString, fontSize, lineSpacing, styletags) {
  rawString = rawString.replace(/\n/g, '');
  if(styletags.breaklines === true) {
    rawString = rawString.replace(/\<br\>/g, '\n');
  } else {
    rawString = rawString.replace(/\<br\>/g, ' ');
  }
  var activeStyle = "";
  var map = [];
  for(j = 0; j < rawString.length; ++j) {
    map[j] = activeStyle;
  }
  if(styletags.bolds === true) map = parseTag(TAG_bold, CHR_bold, rawString, map);
  if(styletags.italics === true) map = parseTag(TAG_italic, CHR_italic, rawString, map);
  if(styletags.superscripts === true) map = parseTag(TAG_super, CHR_super, rawString, map);
  if(styletags.subscripts === true) map = parseTag(TAG_sub, CHR_sub, rawString, map);
  var allStyles = [];
  var plainText = "";
  for(j = 0; j < rawString.length; ++j) {
    if(map[j] !== null) {
      plainText += rawString[j];
      allStyles.push(map[j]);
    }
  }
  var allTexts = plainText.split('\n');
  var numberOfLines = allTexts.length;
  var lineHeight = Math.round(lineSpacing * fontSize);
  var offsetX = fontSize;
  var offsetY = fontSize * 2;
  var maxWidth = 0;
  var minHeight = numberOfLines * lineHeight + offsetY;
  if(canvas.height < minHeight) {
    canvas.height = minHeight;
  }
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#fff";
  var i, j, xPos, yPos, zPos;
  var nDone = 0;
  var buffer = "";
  function writeBuffer() {
    if(buffer !== "") {
      var delta = context.measureText(buffer).width;
      context.fillText(buffer, offsetX + xPos, offsetY + yPos);
      xPos += delta;
    }
  }
  function getTextFontSize() {
    return "" + Math.round(zPos) + "px ";
  }
  function changeStyle(oldStyle, newStyle) {
    var ctxFont = "" + context.font;
    if(styletags.subscripts === true) {
      var oldIndex_Sub = oldStyle.indexOf(CHR_sub0);
      var newIndex_Sub = newStyle.indexOf(CHR_sub0);
      var oldSub = (oldIndex_Sub > -1) ? parseInt(oldStyle[1 + oldIndex_Sub]) : 0;
      var newSub = (newIndex_Sub > -1) ? parseInt(newStyle[1 + newIndex_Sub]) : 0;
      if(oldSub !== newSub) {
        ctxFont = ctxFont.replace(getTextFontSize(), "?px ");
        zPos *= Math.pow(0.75, (newSub - oldSub));
        ctxFont = ctxFont.replace("?px ", getTextFontSize());
      }
      yPos += 0.25 * lineHeight * (newSub - oldSub);
    }
    if(styletags.superscripts === true) {
      var oldIndex_Super = oldStyle.indexOf(CHR_super0);
      var newIndex_Super = newStyle.indexOf(CHR_super0);
      var oldSuper = (oldIndex_Super > -1) ? parseInt(oldStyle[1 + oldIndex_Super]) : 0;
      var newSuper = (newIndex_Super > -1) ? parseInt(newStyle[1 + newIndex_Super]) : 0;
      if(oldSuper !== newSuper) {
        ctxFont = ctxFont.replace(getTextFontSize(), "?px ");
        zPos *= Math.pow(0.75, (newSuper - oldSuper));
        ctxFont = ctxFont.replace("?px ", getTextFontSize());
      }
      yPos -= 0.25 * lineHeight * (newSuper - oldSuper);
    }
    if(styletags.bolds === true) {
      var wasBold = (oldStyle.indexOf(CHR_bold) > -1);
      var is_Bold = (newStyle.indexOf(CHR_bold) > -1);
      if(!wasBold && is_Bold) {
        if(wasItalic) {
          ctxFont = ctxFont.replace("italic ", "italic bold ");
        } else {
          ctxFont = "bold " + ctxFont;
        }
      }
      if(wasBold && !is_Bold) {
        ctxFont = ctxFont.replace("bold ", '');
      }
    }
    if(styletags.italics === true) {
      var wasItalic = (oldStyle.indexOf(CHR_italic) > -1);
      var is_Italic = (newStyle.indexOf(CHR_italic) > -1);
      if(!wasItalic && is_Italic) {
        ctxFont = "italic " + ctxFont;
      }
      if(wasItalic && !is_Italic) {
        ctxFont = ctxFont.replace("italic ", '');
      }
    }
    context.font = ctxFont;
  }
  for(i = 0; i < numberOfLines; ++i) {
    var txt = allTexts[i] + '\n';
    xPos = 0;
    yPos = i * lineHeight;
    zPos = fontSize;
    buffer = "";
    for(j = 0; j < txt.length; ++j) {
      var style = (j + nDone < allStyles.length) ? allStyles[j + nDone] : allStyles[allStyles.length - 1];
      if(activeStyle === style) {
        buffer += txt[j];
      } else {
        writeBuffer();
        buffer = txt[j];
        if(style !== undefined) {
          changeStyle(activeStyle, style);
          activeStyle = style;
        }
      }
    }
    writeBuffer();
    nDone += txt.length;
    var width = Math.round(xPos + 2 * offsetX) | 0;
    if(maxWidth < width) maxWidth = width;
  }
  var xCut = maxWidth;
  var yCut = offsetY + lineHeight * numberOfLines;
  var pixels = ndarray(context.getImageData(0, 0, xCut, yCut).data, [yCut, xCut, 4]);
  return pixels.pick(-1, -1, 0).transpose(1, 0)
}
function getContour(pixels, doSimplify) {
  var contour = surfacenets(pixels, 128);
  if(doSimplify) {
    return simplify(contour.cells, contour.positions, 0.25)
  }
  return {
    edges: contour.cells,
    positions: contour.positions
  }
}
function processPixelsImpl(pixels, options, size, simplify) {
  var contour = getContour(pixels, simplify);
  var positions = transformPositions(contour.positions, options, size);
  var edges     = contour.edges;
  var flip = "ccw" === options.orientation;
  cleanPslg(positions, edges);
  if(options.polygons || options.polygon || options.polyline) {
    var result = pg2pl(edges, positions);
    var nresult = new Array(result.length);
    for(var i=0; i<result.length; ++i) {
      var loops = result[i];
      var nloops = new Array(loops.length);
      for(var j=0; j<loops.length; ++j) {
        var loop = loops[j];
        var nloop = new Array(loop.length);
        for(var k=0; k<loop.length; ++k) {
          nloop[k] = positions[loop[k]].slice();
        }
        if(flip) {
          nloop.reverse();
        }
        nloops[j] = nloop;
      }
      nresult[i] = nloops;
    }
    return nresult
  } else if(options.triangles || options.triangulate || options.triangle) {
    return {
      cells: cdt2d_1(positions, edges, {
        delaunay: false,
        exterior: false,
        interior: true
      }),
      positions: positions
    }
  } else {
    return {
      edges:     edges,
      positions: positions
    }
  }
}
function processPixels(pixels, options, size) {
  try {
    return processPixelsImpl(pixels, options, size, true)
  } catch(e) {}
  try {
    return processPixelsImpl(pixels, options, size, false)
  } catch(e) {}
  if(options.polygons || options.polyline || options.polygon) {
    return []
  }
  if(options.triangles || options.triangulate || options.triangle) {
    return {
      cells: [],
      positions: []
    }
  }
  return {
    edges: [],
    positions: []
  }
}
function vectorizeText(str, canvas, context, options) {
  var size = 64;
  var lineSpacing = 1.25;
  var styletags = {
    breaklines: false,
    bolds: false,
    italics: false,
    subscripts: false,
    superscripts: false
  };
  if(options) {
    if(options.size &&
       options.size > 0) size =
       options.size;
    if(options.lineSpacing &&
       options.lineSpacing > 0) lineSpacing =
       options.lineSpacing;
    if(options.styletags &&
       options.styletags.breaklines) styletags.breaklines =
       options.styletags.breaklines ? true : false;
    if(options.styletags &&
       options.styletags.bolds) styletags.bolds =
       options.styletags.bolds ? true : false;
    if(options.styletags &&
       options.styletags.italics) styletags.italics =
       options.styletags.italics ? true : false;
    if(options.styletags &&
       options.styletags.subscripts) styletags.subscripts =
       options.styletags.subscripts ? true : false;
    if(options.styletags &&
       options.styletags.superscripts) styletags.superscripts =
       options.styletags.superscripts ? true : false;
  }
  context.font = [
    options.fontStyle,
    options.fontVariant,
    options.fontWeight,
    size + "px",
    options.font
  ].filter(function(d) {return d}).join(" ");
  context.textAlign = "start";
  context.textBaseline = "alphabetic";
  context.direction = "ltr";
  var pixels = getPixels(canvas, context, str, size, lineSpacing, styletags);
  return processPixels(pixels, options, size)
}
vtext.processPixels = processPixels_1;

var vectorizeText_1 = createText;
var defaultCanvas = null;
var defaultContext = null;
if(typeof document !== 'undefined') {
  defaultCanvas = document.createElement('canvas');
  defaultCanvas.width = 8192;
  defaultCanvas.height = 1024;
  defaultContext = defaultCanvas.getContext("2d");
}
function createText(str, options) {
  if((typeof options !== "object") || (options === null)) {
    options = {};
  }
  return vtext(
    str,
    options.canvas || defaultCanvas,
    options.context || defaultContext,
    options)
}

const complex = vectorizeText_1('Beschleunigung', {
  triangles: true,
  width: 1000,
  textBaseline: 'hanging',
  font: 'Arial'
});
complex.positions.forEach(position => position.push(0));

function createPlane(sx, sy, nx, ny, options) {
  sx = sx || 1;
  sy = sy || 1;
  nx = nx || 1;
  ny = ny || 1;
  const quads = options && options.quads ? options.quads : false;
  const positions = [];
  const uvs = [];
  const normals = [];
  const cells = [];
  for (let iy = 0; iy <= ny; iy++) {
    for (let ix = 0; ix <= nx; ix++) {
      const u = ix / nx;
      const v = iy / ny;
      const x = -sx / 2 + u * sx;
      const y = sy / 2 - v * sy;
      positions.push([x, 0, y]);
      uvs.push([u, 1.0 - v]);
      normals.push([0, 0, 1]);
      if (iy < ny && ix < nx) {
        if (quads) {
          cells.push([
            iy * (nx + 1) + ix,
            (iy + 1) * (nx + 1) + ix,
            (iy + 1) * (nx + 1) + ix + 1,
            iy * (nx + 1) + ix + 1
          ]);
        } else {
          cells.push([
            iy * (nx + 1) + ix,
            (iy + 1) * (nx + 1) + ix + 1,
            iy * (nx + 1) + ix + 1
          ]);
          cells.push([
            (iy + 1) * (nx + 1) + ix + 1,
            iy * (nx + 1) + ix,
            (iy + 1) * (nx + 1) + ix
          ]);
        }
      }
    }
  }
  return {
    positions: positions,
    normals: normals,
    uvs: uvs,
    cells: cells
  }
}

var frag$2 = "precision mediump float;\n#extension GL_OES_standard_derivatives : enable\n#define GLSLIFY 1\n#define FOG_DENSITY 0.1\nfloat fogFactorExp2(\n  const float dist,\n  const float density\n) {\n  const float LOG2 = -1.442695;\n  float d = density * dist;\n  return 1.0 - clamp(exp2(d * d * LOG2), 0.0, 1.0);\n}\n\nuniform vec2 uResolution;\nuniform vec3 eye;\nuniform sampler2D uTex;\nuniform float ambientIntensity;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n\nconst vec3 fogColor = vec3(1.0);\nconst float FogDensity = 0.3;\n\nvarying vec4 vLightNDC;\nuniform samplerCube shadowCube;\nuniform vec3 lightPosition;\n\nfloat unpackRGBA (vec4 v) {\n  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));\n}\n\nfloat grid(vec2 st, float res, float width) {\n  vec2 grid =  fract(st*res) / width;\n  grid /= fwidth(st);\n  return 1. - (step(res, grid.x) * step(res, grid.y));\n}\n\nvoid main() {\n\n  float resolution = 10.;\n  vec2 grid_st = vUv * uResolution * resolution;\n  vec3 color = vec3(.8);\n  color -= vec3(.75) * grid(grid_st, 1. / resolution, 3.);\n  color -= vec3(.5) * grid(grid_st, 10. / resolution, 1.);\n\n  vec3 texCoord = (vPosition - lightPosition);\n  float visibility = 0.0;\n  //do soft shadows:\n  for (int x = 0; x < 2; x++) {\n    for (int y = 0; y < 2; y++) {\n      for (int z = 0; z < 2; z++) {\n        float bias = 0.3;\n        vec4 env = textureCube(shadowCube, texCoord + vec3(x,y,z) * vec3(0.1));\n\n        vec3 lightPos = vLightNDC.xyz / vLightNDC.w;\n        float depth = lightPos.z - bias;\n        float occluder = unpackRGBA(env);\n\n        float shadow = mix(0.2, 1.0, step(depth, occluder));\n        visibility += (env.x+bias) < (distance(vPosition, lightPos)) ? 0.0 : 1.0;\n//        visibility += shadow; //(env.x+bias) < (distance(vPosition, lightPos)) ? 0.0 : 1.0;\n      }\n    }\n  }\n  visibility *= 1.0 / 8.0;\n\n  vec3 shadowedColor = (1.-visibility) * color.rgb;\n\n  float fogDistance = length(eye - vPosition);\n\n  gl_FragColor = vec4(mix(shadowedColor, fogColor, exp(- fogDistance * FogDensity)), exp(- fogDistance * FogDensity));\n//  gl_FragColor = vec4(color.rgb, 1.);\n\n}\n"; // eslint-disable-line

var vert$2 = "precision mediump float;\n#define GLSLIFY 1\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\n//\nuniform vec3 uOffset;\nuniform mat4 projection;\nuniform mat4 view;\n//\nvarying vec2 vUv;\nvarying vec3 vPosition;\n\nuniform mat4 shadowViewMatrix_top;\nuniform mat4 shadowViewMatrix;\nuniform mat4 shadowProjectionMatrix;\nvarying vec4 vLightNDC;\n// Matrix to shift range from -1->1 to 0->1\nconst mat4 depthScaleMatrix = mat4(\n0.5, 0, 0, 0,\n0, 0.5, 0, 0,\n0, 0, 0.5, 0,\n0.5, 0.5, 0.5, 1\n);\n\nvoid main () {\n  vUv = uv / 1.;\n  vPosition = position + uOffset;\n\n  vLightNDC = depthScaleMatrix * shadowProjectionMatrix * shadowViewMatrix_top  * vec4(vPosition, 1.0);\n\n  gl_Position = projection * view * vec4(vPosition, 1.);\n}\n"; // eslint-disable-line

function drawStageCommands(regl, view, cubeShadowFbo) {
  const stage = createPlane(
    view.stageGrid.size,
    view.stageGrid.size
  );
  const shadow = shadowBuilder(view.lightPosition);
  const command = mode => {
    return regl({
      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 1,
          dstRGB: 'one minus src alpha',
          dstAlpha: 1
        },
        equation: {
          rgb: 'add',
          alpha: 'add'
        },
        color: [0, 1, 0, 1]
      },
      cull: {
        enable: true,
        face: 'front'
      },
      depth: false,
      primitive: 'triangles',
      elements: stage.cells,
      attributes: {
        position: stage.positions,
        uv: stage.uvs
      },
      uniforms: {
        uOffset: [0, view.stageGrid.y - 0, 0],
        uResolution: [view.stageGrid.size, view.stageGrid.size],
        shadowCube: cubeShadowFbo,
        lightPosition: view.lightPosition,
        shadowProjectionMatrix: shadow.shadowProjectionMatrix,
        shadowViewMatrix_top: shadow.shadowViewMatrix_y_
      },
      vert: vert$3,
      frag: frag$2
    })
  };
  return {
    lighting: command()
  }
}

const CUBE_MAP_SIZE = 1024;
function boxesViewSimple(regl, { variables, model, config }) {
  const cubeShadowFbo = regl.framebufferCube({
    radius: CUBE_MAP_SIZE,
    colorFormat: 'rgba',
    colorType: 'uint8'
  });
  const uniforms = {
    bufferLength: model.bufferLength,
    particleCount: model.particleCount,
    stepCount: model.stepCount || model.bufferLength,
    pathicleGap: config.view.pathicleRelativeGap * config.view.pathicleWidth,
    pathicleWidth: config.view.pathicleWidth,
    viewRange: regl.prop('viewRange'),
    ambient: (ctx, props) => new Array(3).fill(props.ambientIntensity),
    pointLightPosition: config.view.lights[0].position,
    lightPos: config.view.lightPosition,
    dt: 2 * model.halfDeltaTOverC,
    rgbGamma: config.view.rgbGamma,
    cubeShadowFbo
  };
  const setParams = regl({
    uniforms: uniforms
  });
  const drawModel = drawModelCommands(
    regl,
    {
      variables,
      model,
      view: config.view
    },
    cubeShadowFbo
  );
  const drawStage = drawStageCommands(regl, config.view, cubeShadowFbo);
  const drawBackground = drawBackgroundCommand(regl, config.view);
  function drawDiffuse(props) {
    setParams(config.view, () => {
      drawBackground();
      config.view.isStageVisible && drawStage.lighting(props);
      drawModel.shadowCube(props);
      drawModel.lighting(props);
    });
  }
  const texelSize = 1;
  function drawShadowCubeFbo() {
    const command = regl({
      vert: `
      precision mediump float;
      attribute vec2 position;
      varying vec2 uv;
      void main () {
        uv = position;
        gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
      }`,
      frag: `
      precision mediump float;
      uniform samplerCube texture;
      varying vec2 uv;
      float unpackRGBA (vec4 v) {
        return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));
      }
      void main () {
        vec3 texCoord = vec3(uv.xy, 1.);
        vec4 texel = vec4(0.,0.,0., unpackRGBA(textureCube(texture, texCoord)));
        gl_FragColor = texel;
      }`,
      attributes: { position: [2, 0, 0, 2, -2, -2] },
      uniforms: {
        texture: cubeShadowFbo
      },
      viewport: {
        x: (_, __, batchId) => {
        },
        y: 0,
        width: CUBE_MAP_SIZE * texelSize,
        height: CUBE_MAP_SIZE * texelSize
      },
      depth: {
        enable: false
      },
      count: 3
    });
    return command()
  }
  const destroy = () => {};
  return {
    destroy,
    drawDiffuse,
    drawShadowCubeFbo
  }
}

function interpolate(t, degree, points, knots, weights, result) {
  var i,j,s,l;
  var n = points.length;
  var d = points[0].length;
  if(degree < 1) throw new Error('degree must be at least 1 (linear)');
  if(degree > (n-1)) throw new Error('degree must be less than or equal to point count - 1');
  if(!weights) {
    weights = [];
    for(i=0; i<n; i++) {
      weights[i] = 1;
    }
  }
  if(!knots) {
    var knots = [];
    for(i=0; i<n+degree+1; i++) {
      knots[i] = i;
    }
  } else {
    if(knots.length !== n+degree+1) throw new Error('bad knot vector length');
  }
  var domain = [
    degree,
    knots.length-1 - degree
  ];
  var low  = knots[domain[0]];
  var high = knots[domain[1]];
  t = t * (high - low) + low;
  if(t < low || t > high) throw new Error('out of bounds');
  for(s=domain[0]; s<domain[1]; s++) {
    if(t >= knots[s] && t <= knots[s+1]) {
      break;
    }
  }
  var v = [];
  for(i=0; i<n; i++) {
    v[i] = [];
    for(j=0; j<d; j++) {
      v[i][j] = points[i][j] * weights[i];
    }
    v[i][d] = weights[i];
  }
  var alpha;
  for(l=1; l<=degree+1; l++) {
    for(i=s; i>s-degree-1+l; i--) {
      alpha = (t - knots[i]) / (knots[i+degree+1-l] - knots[i]);
      for(j=0; j<d+1; j++) {
        v[i][j] = (1 - alpha) * v[i-1][j] + alpha * v[i][j];
      }
    }
  }
  var result = result || [];
  for(i=0; i<d; i++) {
    result[i] = v[s][i] / v[s][d];
  }
  return result;
}
var bSpline = interpolate;

var map;
try {
  map = Map;
} catch (_) {}
var set;
try {
  set = Set;
} catch (_) {}
function clone$1(src) {
  if (!src || typeof src !== 'object' || typeof src === 'function') {
    return src;
  }
  if (src.nodeType && 'cloneNode' in src) {
    return src.cloneNode(true);
  }
  if (src instanceof Date) {
    return new Date(src.getTime());
  }
  if (src instanceof RegExp) {
    return new RegExp(src);
  }
  if (Array.isArray(src)) {
    return src.map(clone$1);
  }
  if (map && src instanceof map) {
    return new Map(Array.from(src.entries()));
  }
  if (set && src instanceof set) {
    return new Set(Array.from(src.values()));
  }
  if (src instanceof Object) {
    var obj = {};
    for (var key in src) {
      obj[key] = clone$1(src[key]);
    }
    return obj;
  }
  return src;
}
var nanoclone = clone$1;
var types = [{
  name: "primitive",
  is: function (el) {
    var type = typeof el;
    return type === "number" || type === "string" || type === "boolean";
  },
  default: "default",
  merge: {
    default: function (merger, a, b) {
      return b;
    }
  }
}, {
  name: "object",
  is: function (el) {
    return el !== null && typeof el === "object";
  },
  default: "deep",
  merge: {
    deep: function (merger, a, b) {
      var result = {};
      var keys = {
        a: Object.keys(a),
        b: Object.keys(b)
      };
      keys.a.concat(keys.b).forEach(function (key) {
        result[key] = merger(a[key], b[key]);
      });
      return result;
    }
  }
}, {
  name: "array",
  is: function (el) {
    return Array.isArray(el);
  },
  default: "replace",
  merge: {
    merge: function (merger, a, b) {
      var result = [];
      for (var i = 0; i < Math.max(a.length, b.length); ++i) {
        result.push(merger(a[i], b[i]));
      }
      return result;
    },
    replace: function (merger, a, b) {
      return nanoclone(b);
    },
    concat: function (merger, a, b) {
      return [].concat(a).concat(b);
    }
  }
}];
var types_1 = types;
function normalizeConfig(config) {
  return {
    strategy: config.strategy || {},
    types: {
      mode: (config.types || {}).mode || "add",
      list: (config.types || {}).list || []
    }
  };
}
function Merge(config) {
  config = normalizeConfig(config || {});
  this.types = (config.types.mode === "add" ? types_1 : []).concat(config.types.list);
  this.config = config;
}
Merge.prototype.determineType = function (a, b) {
  for (var i = this.types.length - 1; i >= 0; --i) {
    var type = this.types[i];
    if (type.is(a) && type.is(b)) {
      return type;
    } else if (type.is(a) || type.is(b)) {
      break;
    }
  }
  return null;
};
Merge.prototype.step = function (a, b) {
  if (b === void 0) {
    return nanoclone(a);
  }
  var type = this.determineType(a, b);
  if (!type) {
    return nanoclone(b);
  }
  var strategy = this.config.strategy[type.name] || type.default;
  return type.merge[strategy](this.step.bind(this), a, b);
};
Merge.prototype.merge = function () {
  var elements = Array.prototype.slice.call(arguments);
  var result;
  for (var i = elements.length; i > 0; --i) {
    result = this.step(elements.pop(), result);
  }
  return result;
};
var merge = Merge;
var merger = new merge();
var nanomerge = function nanomerge() {
  return merger.merge.apply(merger, arguments);
};
var defaultConfig = {
  MAX_CANVAS_SIZE: 512,
  MAX_PARTICLE_COUNT: 512,
  MAX_BUFFER_LENGTH: 256,
  logPushing: false,
  logPerformance: false,
  stats: false,
  profile: false,
  colors: [[0.92, 0.75, 0.0], [0.12, 0.45, 0.65], [0.12, 0.45, 0.65], [0.77, 0.2, 0.2]],
  mass: [0, 510998.94, 510998.94, 938272081],
  charge: [0, -1, 1, 1],
  chargeMassRatio: [0, -1.75882004556243e11, 1.75882004556243e11, 9.57883323113770929296814695637e7],
  usePostProcessing: false,
  pusher: 'boris',
  simulateHalfFloat: false,
  runner: {
    prerender: true,
    looping: false,
    mode: 'framewise',
    stepsPerTick: 4,
    stepCount: 512
  },
  model: {
    bufferLength: 128,
    tickDurationOverC: 0.1,
    boundingBoxSize: -1,
    emitter: {
      particleType: 'ELECTRON',
      randomize: false,
      bunchShape: 'disc',
      particleCount: 128,
      particleSeparation: 0.1,
      gamma: 0,
      position: [0, 0, 0],
      direction: [0, 0, 1],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0]
    },
    interactions: {
      particleInteraction: false,
      gravityConstant: 0,
      electricField: [0, 0, 0],
      magneticField: [0, 0, 0]
    },
    lattice: {
      elements: {},
      beamline: []
    }
  },
  view: {
    lightPosition: [0, 3, 0],
    ssaoEnabled: false,
    stageGrid: {
      resolution: 256,
      y: 0,
      size: 30,
      dark: 1,
      light: 0.8
    },
    sky: [0.9, 1, 0, 1],
    shadowColor: [0.8, 0.8, 0.8],
    ambientIntensity: 0.6,
    diffuse: 0,
    exposure: 0.2,
    fresnel: 1.0,
    fxaa: false,
    rgbGamma: 1,
    isStageVisible: true,
    isShadowEnabled: true,
    isLatticeVisible: true,
    pathicleRelativeGap: 1,
    pathicleRelativeHeight: 5,
    pathicleWidth: 0.005,
    roughness: 0.7,
    specular: 1,
    ssaoBlurPower: 2,
    ssaoBlurRadius: 0.1,
    ssaoPower: 1,
    ssaoSampleCount: 32,
    showTextures: false,
    texelSize: 2,
    viewRange: [0, 1],
    lights: [{
      position: [0, 1, 0],
      direction: [1, 1, 0],
      color: new Array(3).fill(0)
    }, {
      position: [0, 1, 0],
      direction: [-1, -1, 0],
      color: new Array(3).fill(0)
    }],
    camera: {
      center: [0, 0, 0],
      theta: Math.PI / 2,
      phi: 0,
      distance: 3,
      fovY: Math.PI / 2.5,
      dTheta: 0.01,
      autorotate: true,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: .1,
      far: 50,
      near: 0.0001,
      minDistance: 0.1,
      maxDistance: 10
    }
  },
  dumpData: false
};
const DRIF = 'DRIF';
const QUAD = 'QUAD';
const SBEN = 'SBEN';
const LatticeElementTypes = {
  DRIF,
  SBEN,
  QUAD
};
const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      center: [0, 1, 0],
      theta: 2 * Math.PI / (360 / 90),
      phi: 2 * Math.PI / (360 / 5),
      distance: 5
    }
  },
  model: {
    emitter: {
      boundingBox: -1,
      particleType: 'ELECTRON',
      bunchShape: 'DISC',
      direction: [0, 0.3, -1],
      position: [0, -1.5, 0],
      directionJitter: [0.05, 0.0, 0.05],
      positionJitter: [0.5, 0.5, 0.1],
      gamma: 2
    },
    interactions: {
      magneticField: [0, 0, 0],
      particleInteraction: false
    },
    lattice: {
      elements: {
        l0: {
          type: LatticeElementTypes.SBEN,
          l: 20,
          strength: 0.002
        }
      },
      beamline: ['l0'],
      origin: {
        phi: 0,
        position: [0, 0, -10]
      }
    }
  }
};
const storyElectric = {
  name: 'story-electric',
  view: {
    camera: {
      center: [0, 1, -5],
      theta: 2 * Math.PI / (360 / 25),
      phi: 2 * Math.PI / (360 / 5),
      distance: 3
    }
  },
  model: {
    boundingBoxSize: -1,
    emitter: {
      particleType: 'ELECTRON PROTON  PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 2, -10],
      directionJitter: [0., 0., 0],
      positionJitter: [0.1, 0.1, 0],
      gamma: 1.2
    },
    interactions: {
      electricField: [0, 0, -0.00000000001],
      particleInteraction: false,
      magneticField: [0, 0, 0]
    },
    lattice: {
      elements: {},
      beamline: [],
      origin: {
        phi: 0,
        position: [0, 1, -6]
      }
    }
  }
};
const storyQuadrupole = {
  name: 'story-quadrupole',
  view: {
    camera: {
      center: [-1, 1, 0],
      theta: 2 * Math.PI / (360 / 75),
      phi: 2 * Math.PI / (360 / 5),
      distance: 5
    }
  },
  model: {
    tickDurationOverC: 0.1,
    emitter: {
      particleType: 'PROTON ',
      bunchShape: 'SQUARE_YZ',
      direction: [1, 0, 0],
      position: [-10, 1, 0],
      directionJitter: [0.0, 0.0, 0],
      positionJitter: [0.1, 0.1, 0],
      gamma: 7
    },
    lattice: {
      elements: {
        q1: {
          type: LatticeElementTypes.QUAD,
          strength: -.5,
          l: 5
        },
        q2: {
          type: LatticeElementTypes.QUAD,
          strength: .5,
          l: 5
        },
        l1: {
          type: LatticeElementTypes.DRIF,
          l: 5
        }
      },
      beamline: ['l1', 'q1', 'q2', 'l1'],
      origin: {
        phi: -Math.PI / 2,
        position: [-10, 0, 0]
      }
    }
  }
};
const random = {
  name: 'random',
  view: {
    camera: {
      center: [0, 0, 0],
      theta: -0.6163632477299,
      phi: 0.04608544417465289,
      distance: 5
    }
  },
  model: {
    boundingBoxSize: 2,
    emitter: {
      randomize: true,
      gamma: 100,
      particleType: 'PHOTON ELECTRON PROTON'
    },
    lattice: {
      elements: {
        l2: {
          type: 'DRIF',
          l: 5
        },
        bm: {
          type: 'SBEN',
          angle: 0.78539816,
          e1: 0.39269908,
          e2: 0.39269908,
          l: 1.8,
          k1: -0.4
        }
      },
      beamline: [],
      origin: {
        phi: -Math.PI,
        position: [0, 1, 5]
      }
    }
  }
};
const freeElectron = {
  name: 'free-electron',
  view: {
    camera: {
      center: [0, 0, 0.5],
      theta: 2 * Math.PI / (360 / 45),
      phi: 2 * Math.PI / (360 / 15),
      distance: 2,
      fovY: Math.PI / 3,
      dTheta: 0.001,
      autorotate: false,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: 1,
      far: 50,
      near: 0.0001
    }
  },
  runner: {
    prerender: true,
    looping: true,
    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 2
  },
  model: {
    bufferLength: 11,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 1,
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, -1, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 1
    },
    interactions: {
      electricField: [0, 0, 0],
      particleInteraction: false,
      magneticField: [0, 0, 0]
    }
  }
};
var gyrotest_1_electron = {
  name: 'gyrotest-1-electron',
  view: {
    camera: {
      center: [0.5, 0, 0],
      theta: 2 * Math.PI / (360 / 45),
      phi: 2 * Math.PI / (360 / 15),
      distance: .5
    }
  },
  runner: {
    stepsPerTick: 2,
    stepCount: 27
  },
  model: {
    bufferLength: 27,
    tickDurationOverC: .1,
    emitter: {
      particleCount: 1,
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 0, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 310
    },
    lattice: {
      elements: {
        l0: {
          type: LatticeElementTypes.SBEN,
          l: 20,
          strength: 1.3
        }
      },
      beamline: ['l0'],
      origin: {
        phi: 0,
        position: [0, 0, -10]
      }
    }
  }
};
const freePhoton = {
  name: 'free-photon',
  view: {
    camera: {
      center: [0, -1, 0.5],
      theta: 2 * Math.PI / (360 / 45),
      phi: 2 * Math.PI / (360 / 15),
      distance: 1,
      fovY: Math.PI / 3,
      dTheta: 0.001,
      autorotate: false,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: 1,
      far: 50,
      near: 0.0001
    }
  },
  runner: {
    prerender: true,
    looping: false,
    mode: 'framewise',
    stepsPerTick: 2,
    stepCount: 11
  },
  model: {
    bufferLength: 11,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 1,
      particleType: 'PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, -1, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 0
    },
    interactions: {
      electricField: [0, 0, 0.01],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
};
const freePhotons = {
  name: 'free-photons',
  view: {
    camera: {
      center: [0, 0, 0.5],
      theta: Math.PI / 4,
      phi: Math.PI / 8,
      distance: 1.5,
      fovY: Math.PI / 3,
      dTheta: 0.001,
      autorotate: false,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: 1,
      far: 50,
      near: 0.0001
    }
  },
  runner: {
    prerender: true,
    looping: true,
    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 11
  },
  model: {
    bufferLength: 11,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 64,
      particleType: 'PHOTON',
      bunchShape: 'DISC',
      direction: [0, 0, 1],
      position: [0, 0, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 10
    },
    interactions: {
      electricField: [0, 0, 0],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
};
const presets = {
  [storyDipole.name]: storyDipole,
  [storyElectric.name]: storyElectric,
  [storyQuadrupole.name]: storyQuadrupole,
  [freeElectron.name]: freeElectron,
  [freePhoton.name]: freePhoton,
  [freePhotons.name]: freePhotons,
  [random.name]: random,
  [gyrotest_1_electron.name]: gyrotest_1_electron
};
const config = presetName => {
  return nanomerge(defaultConfig, presets[presetName]) || defaultConfig;
};

var presets$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    config: config,
    defaultConfig: defaultConfig,
    presets: presets
});

function createVariableTexture(regl, particleCount, bufferLength) {
  return regl.texture({
    width: particleCount,
    height: bufferLength,
    min: 'nearest',
    mag: 'nearest',
    format: 'rgba',
    type: 'float32',
    data: new Float32Array(particleCount * bufferLength * 4)
  })
}

var map$1;
try {
  map$1 = Map;
} catch (_) {}
var set$1;
try {
  set$1 = Set;
} catch (_) {}
function clone$2 (src) {
  if (!src || typeof src !== 'object' || typeof src === 'function') {
    return src
  }
  if (src.nodeType && 'cloneNode' in src) {
    return src.cloneNode(true)
  }
  if (src instanceof Date) {
    return new Date(src.getTime())
  }
  if (src instanceof RegExp) {
    return new RegExp(src)
  }
  if (Array.isArray(src)) {
    return src.map(clone$2)
  }
  if (map$1 && src instanceof map$1) {
    return new Map(Array.from(src.entries()))
  }
  if (set$1 && src instanceof set$1) {
    return new Set(Array.from(src.values()))
  }
  if (src instanceof Object) {
    var obj = {};
    for (var key in src) {
      obj[key] = clone$2(src[key]);
    }
    return obj
  }
  return src
}
var nanoclone$1 = clone$2;

var types$1 = [
  {
    name: "primitive",
    is: function(el) {
      var type = typeof el;
      return type === "number" || type === "string" || type === "boolean";
    },
    default: "default",
    merge: {
      default: function(merger, a, b) {
        return b;
      }
    }
  },
  {
    name: "object",
    is: function(el) {
      return el !== null && typeof el === "object";
    },
    default: "deep",
    merge: {
      deep: function(merger, a, b) {
        var result = {};
        var keys = {
          a: Object.keys(a),
          b: Object.keys(b)
        };
        keys.a.concat(keys.b).forEach(function(key) {
          result[key] = merger(a[key], b[key]);
        });
        return result;
      }
    }
  },
  {
    name: "array",
    is: function(el) {
      return Array.isArray(el);
    },
    default: "replace",
    merge: {
      merge: function(merger, a, b) {
        var result = [];
        for (var i = 0; i < Math.max(a.length, b.length); ++i) {
          result.push(merger(a[i], b[i]));
        }
        return result;
      },
      replace: function(merger, a, b) {
        return nanoclone$1(b);
      },
      concat: function(merger, a, b) {
        return [].concat(a).concat(b);
      }
    }
  }
];
var types_1$1 = types$1;

function normalizeConfig$1(config) {
  return {
    strategy: config.strategy || {},
    types: {
      mode: (config.types || {}).mode || "add",
      list: (config.types || {}).list || []
    }
  };
}
function Merge$1(config) {
  config = normalizeConfig$1(config || {});
  this.types = (config.types.mode === "add" ? types_1$1 : []).concat(
    config.types.list
  );
  this.config = config;
}
Merge$1.prototype.determineType = function(a, b) {
  for (var i = this.types.length - 1; i >= 0; --i) {
    var type = this.types[i];
    if (type.is(a) && type.is(b)) {
      return type;
    } else if (type.is(a) || type.is(b)) {
      break;
    }
  }
  return null;
};
Merge$1.prototype.step = function(a, b) {
  if (b === void 0) {
    return nanoclone$1(a);
  }
  var type = this.determineType(a, b);
  if (!type) {
    return nanoclone$1(b);
  }
  var strategy = this.config.strategy[type.name] || type.default;
  return type.merge[strategy](this.step.bind(this), a, b);
};
Merge$1.prototype.merge = function() {
  var elements = Array.prototype.slice.call(arguments);
  var result;
  for (var i = elements.length; i > 0; --i) {
    result = this.step(elements.pop(), result);
  }
  return result;
};
var merge$1 = Merge$1;

var merger$1 = new merge$1();
var nanomerge$1 = function nanomerge() {
  return merger$1.merge.apply(merger$1, arguments);
};

function sequencer(regl, scenes, stateVars, onStateChange) {
  let t = 0;
  scenes.forEach((scene, s) => {
    scene.presetName = scene.preset;
    scene.preset =
      nanomerge$1(presets$1[scene.preset], defaultConfig) ||
      defaultConfig;
    scene.particleCount = scene.preset.model.emitter.particleCount;
    scene.bufferLength = scene.preset.model.bufferLength || 128;
    scene.position = [
      createVariableTexture(regl, scene.particleCount, scene.bufferLength)
    ];
    scene.particleColorsAndTypes = regl.texture({
      data: Array(scene.particleCount * 4),
      shape: [scene.particleCount, 1, 4]
    });
    if (scene.data) {
      scene.data().then(({ data }) => {
        performance.mark('scene data');
        scene.position[0]({
          width: scene.particleCount,
          height: scene.bufferLength,
          min: 'nearest',
          mag: 'nearest',
          format: 'rgba',
          data: new Float32Array(data.position.map(d => d / 1))
        });
        scene.particleColorsAndTypes({
          data: data.particleTypes
            .map(p => defaultConfig.colors[p].concat(p))
            .flat(),
          shape: [scene.particleCount, 1, 4],
          type: 'float'
        });
      });
    }
    scene.variables = {
      referencePoint: [0, 0, 0],
      pingPong: 0,
      tick: { value: scene.bufferLength },
      position: scene.position,
      particleColorsAndTypes: scene.particleColorsAndTypes
    };
    scene.model = {
      halfDeltaTOverC: scene.preset.model.tickDurationOverC / 2,
      particleCount: scene.particleCount,
      particleTypes: scene.data ? scene.data.particleTypes : [],
      bufferLength: scene.bufferLength,
      stepCount: scene.preset.runner.stepCount,
      boundingBoxSize: scene.preset.model.boundingBoxSize,
      interactions: {
        gravityConstant: scene.preset.model.interactions.gravityConstant,
        particleInteraction:
          scene.preset.model.interactions.particleInteraction,
        electricField: scene.preset.model.interactions.electricField,
        magneticField: scene.preset.model.interactions.magneticField
      }
    };
    scene._s = s;
    scene._t0 = t;
    scene._t0_normalized = t / scenes.duration;
    scene._t1 = t + scene.duration;
    scene._t1_normalized = scene._t1 / scenes.duration;
    t = scene._t1;
    if (scene.cameraSploints)
      if (scene.cameraSploints.position) {
        scene.cameraPositionBSpline = t =>
          bSpline(t, 2, scene.cameraSploints.position);
        if (scene.cameraSploints.target) {
          scene.cameraTargetBSpline = t =>
            bSpline(t, 2, scene.cameraSploints.target);
        }
      }
  });
  const state = {
    sceneIdx: 0,
    scene: scenes[0]
  };
  const changed = {};
  function computeState(t) {
    if (t > 1) t = 1;
    const sceneIdx = (
      scenes.find(
        scene => scene._t0_normalized <= t && t <= scene._t1_normalized
      ) || { _s: 0 }
    )._s;
    if (
      sceneIdx !== state.sceneIdx &&
      sceneIdx >= 0 &&
      sceneIdx < scenes.length
    ) {
      changed.sceneIdx = { from: state.sceneIdx, to: sceneIdx };
      state.sceneIdx = sceneIdx;
      state.scene = scenes[sceneIdx];
    } else {
      delete changed.sceneIdx;
    }
    state.activeSceneProgress =
      ((t - state.scene._t0_normalized) * scenes.duration) /
      state.scene.duration;
    state.viewRange =
      state.activeSceneProgress < 0.5
        ? [0, state.activeSceneProgress * 2]
        : [state.activeSceneProgress * 2 - 1, 1];
    let hasChanges = Object.keys(changed).length > 0;
    return hasChanges
  }
  let currentPosition = 0;
  computeState(currentPosition);
  const self = {
    setPosition: function(t) {
      currentPosition = t;
      const hasChanges = computeState(t);
      if (hasChanges) {
        onStateChange && onStateChange(state, changed);
      }
      return self
    },
    getPosition: function() {
      return currentPosition
    },
    getState: function() {
      return state
    }
  };
  return self
}

var regl_unchecked = createCommonjsModule(function (module, exports) {
(function (global, factory) {
     module.exports = factory() ;
}(commonjsGlobal, (function () {var extend = function (base, opts) {
  var keys = Object.keys(opts);
  for (var i = 0; i < keys.length; ++i) {
    base[keys[i]] = opts[keys[i]];
  }
  return base
};
var VARIABLE_COUNTER = 0;
var DYN_FUNC = 0;
function DynamicVariable (type, data) {
  this.id = (VARIABLE_COUNTER++);
  this.type = type;
  this.data = data;
}
function escapeStr (str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}
function splitParts (str) {
  if (str.length === 0) {
    return []
  }
  var firstChar = str.charAt(0);
  var lastChar = str.charAt(str.length - 1);
  if (str.length > 1 &&
      firstChar === lastChar &&
      (firstChar === '"' || firstChar === "'")) {
    return ['"' + escapeStr(str.substr(1, str.length - 2)) + '"']
  }
  var parts = /\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(str);
  if (parts) {
    return (
      splitParts(str.substr(0, parts.index))
        .concat(splitParts(parts[1]))
        .concat(splitParts(str.substr(parts.index + parts[0].length)))
    )
  }
  var subparts = str.split('.');
  if (subparts.length === 1) {
    return ['"' + escapeStr(str) + '"']
  }
  var result = [];
  for (var i = 0; i < subparts.length; ++i) {
    result = result.concat(splitParts(subparts[i]));
  }
  return result
}
function toAccessorString (str) {
  return '[' + splitParts(str).join('][') + ']'
}
function defineDynamic (type, data) {
  return new DynamicVariable(type, toAccessorString(data + ''))
}
function isDynamic (x) {
  return (typeof x === 'function' && !x._reglType) ||
         x instanceof DynamicVariable
}
function unbox (x, path) {
  if (typeof x === 'function') {
    return new DynamicVariable(DYN_FUNC, x)
  }
  return x
}
var dynamic = {
  DynamicVariable: DynamicVariable,
  define: defineDynamic,
  isDynamic: isDynamic,
  unbox: unbox,
  accessor: toAccessorString
};
var raf = {
  next: typeof requestAnimationFrame === 'function'
    ? function (cb) { return requestAnimationFrame(cb) }
    : function (cb) { return setTimeout(cb, 16) },
  cancel: typeof cancelAnimationFrame === 'function'
    ? function (raf) { return cancelAnimationFrame(raf) }
    : clearTimeout
};
var clock = (typeof performance !== 'undefined' && performance.now)
    ? function () { return performance.now() }
    : function () { return +(new Date()) };
function createStringStore () {
  var stringIds = { '': 0 };
  var stringValues = [''];
  return {
    id: function (str) {
      var result = stringIds[str];
      if (result) {
        return result
      }
      result = stringIds[str] = stringValues.length;
      stringValues.push(str);
      return result
    },
    str: function (id) {
      return stringValues[id]
    }
  }
}
function createCanvas (element, onDone, pixelRatio) {
  var canvas = document.createElement('canvas');
  extend(canvas.style, {
    border: 0,
    margin: 0,
    padding: 0,
    top: 0,
    left: 0
  });
  element.appendChild(canvas);
  if (element === document.body) {
    canvas.style.position = 'absolute';
    extend(element.style, {
      margin: 0,
      padding: 0
    });
  }
  function resize () {
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (element !== document.body) {
      var bounds = element.getBoundingClientRect();
      w = bounds.right - bounds.left;
      h = bounds.bottom - bounds.top;
    }
    canvas.width = pixelRatio * w;
    canvas.height = pixelRatio * h;
    extend(canvas.style, {
      width: w + 'px',
      height: h + 'px'
    });
  }
  window.addEventListener('resize', resize, false);
  function onDestroy () {
    window.removeEventListener('resize', resize);
    element.removeChild(canvas);
  }
  resize();
  return {
    canvas: canvas,
    onDestroy: onDestroy
  }
}
function createContext (canvas, contextAttributes) {
  function get (name) {
    try {
      return canvas.getContext(name, contextAttributes)
    } catch (e) {
      return null
    }
  }
  return (
    get('webgl') ||
    get('experimental-webgl') ||
    get('webgl-experimental')
  )
}
function isHTMLElement (obj) {
  return (
    typeof obj.nodeName === 'string' &&
    typeof obj.appendChild === 'function' &&
    typeof obj.getBoundingClientRect === 'function'
  )
}
function isWebGLContext (obj) {
  return (
    typeof obj.drawArrays === 'function' ||
    typeof obj.drawElements === 'function'
  )
}
function parseExtensions (input) {
  if (typeof input === 'string') {
    return input.split()
  }
  return input
}
function getElement (desc) {
  if (typeof desc === 'string') {
    return document.querySelector(desc)
  }
  return desc
}
function parseArgs (args_) {
  var args = args_ || {};
  var element, container, canvas, gl;
  var contextAttributes = {};
  var extensions = [];
  var optionalExtensions = [];
  var pixelRatio = (typeof window === 'undefined' ? 1 : window.devicePixelRatio);
  var profile = false;
  var onDone = function (err) {
  };
  var onDestroy = function () {};
  if (typeof args === 'string') {
    element = document.querySelector(args);
  } else if (typeof args === 'object') {
    if (isHTMLElement(args)) {
      element = args;
    } else if (isWebGLContext(args)) {
      gl = args;
      canvas = gl.canvas;
    } else {
      if ('gl' in args) {
        gl = args.gl;
      } else if ('canvas' in args) {
        canvas = getElement(args.canvas);
      } else if ('container' in args) {
        container = getElement(args.container);
      }
      if ('attributes' in args) {
        contextAttributes = args.attributes;
      }
      if ('extensions' in args) {
        extensions = parseExtensions(args.extensions);
      }
      if ('optionalExtensions' in args) {
        optionalExtensions = parseExtensions(args.optionalExtensions);
      }
      if ('onDone' in args) {
        onDone = args.onDone;
      }
      if ('profile' in args) {
        profile = !!args.profile;
      }
      if ('pixelRatio' in args) {
        pixelRatio = +args.pixelRatio;
      }
    }
  }
  if (element) {
    if (element.nodeName.toLowerCase() === 'canvas') {
      canvas = element;
    } else {
      container = element;
    }
  }
  if (!gl) {
    if (!canvas) {
      var result = createCanvas(container || document.body, onDone, pixelRatio);
      if (!result) {
        return null
      }
      canvas = result.canvas;
      onDestroy = result.onDestroy;
    }
    contextAttributes.premultipliedAlpha = contextAttributes.premultipliedAlpha || false;
    gl = createContext(canvas, contextAttributes);
  }
  if (!gl) {
    onDestroy();
    onDone('webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org');
    return null
  }
  return {
    gl: gl,
    canvas: canvas,
    container: container,
    extensions: extensions,
    optionalExtensions: optionalExtensions,
    pixelRatio: pixelRatio,
    profile: profile,
    onDone: onDone,
    onDestroy: onDestroy
  }
}
function createExtensionCache (gl, config) {
  var extensions = {};
  function tryLoadExtension (name_) {
    var name = name_.toLowerCase();
    var ext;
    try {
      ext = extensions[name] = gl.getExtension(name);
    } catch (e) {}
    return !!ext
  }
  for (var i = 0; i < config.extensions.length; ++i) {
    var name = config.extensions[i];
    if (!tryLoadExtension(name)) {
      config.onDestroy();
      config.onDone('"' + name + '" extension is not supported by the current WebGL context, try upgrading your system or a different browser');
      return null
    }
  }
  config.optionalExtensions.forEach(tryLoadExtension);
  return {
    extensions: extensions,
    restore: function () {
      Object.keys(extensions).forEach(function (name) {
        if (extensions[name] && !tryLoadExtension(name)) {
          throw new Error('(regl): error restoring extension ' + name)
        }
      });
    }
  }
}
function loop (n, f) {
  var result = Array(n);
  for (var i = 0; i < n; ++i) {
    result[i] = f(i);
  }
  return result
}
var GL_BYTE = 5120;
var GL_UNSIGNED_BYTE$1 = 5121;
var GL_SHORT = 5122;
var GL_UNSIGNED_SHORT = 5123;
var GL_INT = 5124;
var GL_UNSIGNED_INT = 5125;
var GL_FLOAT$1 = 5126;
function nextPow16 (v) {
  for (var i = 16; i <= (1 << 28); i *= 16) {
    if (v <= i) {
      return i
    }
  }
  return 0
}
function log2 (v) {
  var r, shift;
  r = (v > 0xFFFF) << 4;
  v >>>= r;
  shift = (v > 0xFF) << 3;
  v >>>= shift; r |= shift;
  shift = (v > 0xF) << 2;
  v >>>= shift; r |= shift;
  shift = (v > 0x3) << 1;
  v >>>= shift; r |= shift;
  return r | (v >> 1)
}
function createPool () {
  var bufferPool = loop(8, function () {
    return []
  });
  function alloc (n) {
    var sz = nextPow16(n);
    var bin = bufferPool[log2(sz) >> 2];
    if (bin.length > 0) {
      return bin.pop()
    }
    return new ArrayBuffer(sz)
  }
  function free (buf) {
    bufferPool[log2(buf.byteLength) >> 2].push(buf);
  }
  function allocType (type, n) {
    var result = null;
    switch (type) {
      case GL_BYTE:
        result = new Int8Array(alloc(n), 0, n);
        break
      case GL_UNSIGNED_BYTE$1:
        result = new Uint8Array(alloc(n), 0, n);
        break
      case GL_SHORT:
        result = new Int16Array(alloc(2 * n), 0, n);
        break
      case GL_UNSIGNED_SHORT:
        result = new Uint16Array(alloc(2 * n), 0, n);
        break
      case GL_INT:
        result = new Int32Array(alloc(4 * n), 0, n);
        break
      case GL_UNSIGNED_INT:
        result = new Uint32Array(alloc(4 * n), 0, n);
        break
      case GL_FLOAT$1:
        result = new Float32Array(alloc(4 * n), 0, n);
        break
      default:
        return null
    }
    if (result.length !== n) {
      return result.subarray(0, n)
    }
    return result
  }
  function freeType (array) {
    free(array.buffer);
  }
  return {
    alloc: alloc,
    free: free,
    allocType: allocType,
    freeType: freeType
  }
}
var pool = createPool();
pool.zero = createPool();
var GL_SUBPIXEL_BITS = 0x0D50;
var GL_RED_BITS = 0x0D52;
var GL_GREEN_BITS = 0x0D53;
var GL_BLUE_BITS = 0x0D54;
var GL_ALPHA_BITS = 0x0D55;
var GL_DEPTH_BITS = 0x0D56;
var GL_STENCIL_BITS = 0x0D57;
var GL_ALIASED_POINT_SIZE_RANGE = 0x846D;
var GL_ALIASED_LINE_WIDTH_RANGE = 0x846E;
var GL_MAX_TEXTURE_SIZE = 0x0D33;
var GL_MAX_VIEWPORT_DIMS = 0x0D3A;
var GL_MAX_VERTEX_ATTRIBS = 0x8869;
var GL_MAX_VERTEX_UNIFORM_VECTORS = 0x8DFB;
var GL_MAX_VARYING_VECTORS = 0x8DFC;
var GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D;
var GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C;
var GL_MAX_TEXTURE_IMAGE_UNITS = 0x8872;
var GL_MAX_FRAGMENT_UNIFORM_VECTORS = 0x8DFD;
var GL_MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C;
var GL_MAX_RENDERBUFFER_SIZE = 0x84E8;
var GL_VENDOR = 0x1F00;
var GL_RENDERER = 0x1F01;
var GL_VERSION = 0x1F02;
var GL_SHADING_LANGUAGE_VERSION = 0x8B8C;
var GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FF;
var GL_MAX_COLOR_ATTACHMENTS_WEBGL = 0x8CDF;
var GL_MAX_DRAW_BUFFERS_WEBGL = 0x8824;
var GL_TEXTURE_2D = 0x0DE1;
var GL_TEXTURE_CUBE_MAP = 0x8513;
var GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
var GL_TEXTURE0 = 0x84C0;
var GL_RGBA = 0x1908;
var GL_FLOAT = 0x1406;
var GL_UNSIGNED_BYTE = 0x1401;
var GL_FRAMEBUFFER = 0x8D40;
var GL_FRAMEBUFFER_COMPLETE = 0x8CD5;
var GL_COLOR_ATTACHMENT0 = 0x8CE0;
var GL_COLOR_BUFFER_BIT$1 = 0x4000;
var wrapLimits = function (gl, extensions) {
  var maxAnisotropic = 1;
  if (extensions.ext_texture_filter_anisotropic) {
    maxAnisotropic = gl.getParameter(GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT);
  }
  var maxDrawbuffers = 1;
  var maxColorAttachments = 1;
  if (extensions.webgl_draw_buffers) {
    maxDrawbuffers = gl.getParameter(GL_MAX_DRAW_BUFFERS_WEBGL);
    maxColorAttachments = gl.getParameter(GL_MAX_COLOR_ATTACHMENTS_WEBGL);
  }
  var readFloat = !!extensions.oes_texture_float;
  if (readFloat) {
    var readFloatTexture = gl.createTexture();
    gl.bindTexture(GL_TEXTURE_2D, readFloatTexture);
    gl.texImage2D(GL_TEXTURE_2D, 0, GL_RGBA, 1, 1, 0, GL_RGBA, GL_FLOAT, null);
    var fbo = gl.createFramebuffer();
    gl.bindFramebuffer(GL_FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, readFloatTexture, 0);
    gl.bindTexture(GL_TEXTURE_2D, null);
    if (gl.checkFramebufferStatus(GL_FRAMEBUFFER) !== GL_FRAMEBUFFER_COMPLETE) readFloat = false;
    else {
      gl.viewport(0, 0, 1, 1);
      gl.clearColor(1.0, 0.0, 0.0, 1.0);
      gl.clear(GL_COLOR_BUFFER_BIT$1);
      var pixels = pool.allocType(GL_FLOAT, 4);
      gl.readPixels(0, 0, 1, 1, GL_RGBA, GL_FLOAT, pixels);
      if (gl.getError()) readFloat = false;
      else {
        gl.deleteFramebuffer(fbo);
        gl.deleteTexture(readFloatTexture);
        readFloat = pixels[0] === 1.0;
      }
      pool.freeType(pixels);
    }
  }
  var isIE = typeof navigator !== 'undefined' && (/MSIE/.test(navigator.userAgent) || /Trident\//.test(navigator.appVersion) || /Edge/.test(navigator.userAgent));
  var npotTextureCube = true;
  if (!isIE) {
    var cubeTexture = gl.createTexture();
    var data = pool.allocType(GL_UNSIGNED_BYTE, 36);
    gl.activeTexture(GL_TEXTURE0);
    gl.bindTexture(GL_TEXTURE_CUBE_MAP, cubeTexture);
    gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X, 0, GL_RGBA, 3, 3, 0, GL_RGBA, GL_UNSIGNED_BYTE, data);
    pool.freeType(data);
    gl.bindTexture(GL_TEXTURE_CUBE_MAP, null);
    gl.deleteTexture(cubeTexture);
    npotTextureCube = !gl.getError();
  }
  return {
    colorBits: [
      gl.getParameter(GL_RED_BITS),
      gl.getParameter(GL_GREEN_BITS),
      gl.getParameter(GL_BLUE_BITS),
      gl.getParameter(GL_ALPHA_BITS)
    ],
    depthBits: gl.getParameter(GL_DEPTH_BITS),
    stencilBits: gl.getParameter(GL_STENCIL_BITS),
    subpixelBits: gl.getParameter(GL_SUBPIXEL_BITS),
    extensions: Object.keys(extensions).filter(function (ext) {
      return !!extensions[ext]
    }),
    maxAnisotropic: maxAnisotropic,
    maxDrawbuffers: maxDrawbuffers,
    maxColorAttachments: maxColorAttachments,
    pointSizeDims: gl.getParameter(GL_ALIASED_POINT_SIZE_RANGE),
    lineWidthDims: gl.getParameter(GL_ALIASED_LINE_WIDTH_RANGE),
    maxViewportDims: gl.getParameter(GL_MAX_VIEWPORT_DIMS),
    maxCombinedTextureUnits: gl.getParameter(GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS),
    maxCubeMapSize: gl.getParameter(GL_MAX_CUBE_MAP_TEXTURE_SIZE),
    maxRenderbufferSize: gl.getParameter(GL_MAX_RENDERBUFFER_SIZE),
    maxTextureUnits: gl.getParameter(GL_MAX_TEXTURE_IMAGE_UNITS),
    maxTextureSize: gl.getParameter(GL_MAX_TEXTURE_SIZE),
    maxAttributes: gl.getParameter(GL_MAX_VERTEX_ATTRIBS),
    maxVertexUniforms: gl.getParameter(GL_MAX_VERTEX_UNIFORM_VECTORS),
    maxVertexTextureUnits: gl.getParameter(GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    maxVaryingVectors: gl.getParameter(GL_MAX_VARYING_VECTORS),
    maxFragmentUniforms: gl.getParameter(GL_MAX_FRAGMENT_UNIFORM_VECTORS),
    glsl: gl.getParameter(GL_SHADING_LANGUAGE_VERSION),
    renderer: gl.getParameter(GL_RENDERER),
    vendor: gl.getParameter(GL_VENDOR),
    version: gl.getParameter(GL_VERSION),
    readFloat: readFloat,
    npotTextureCube: npotTextureCube
  }
};
var isTypedArray = function (x) {
  return (
    x instanceof Uint8Array ||
    x instanceof Uint16Array ||
    x instanceof Uint32Array ||
    x instanceof Int8Array ||
    x instanceof Int16Array ||
    x instanceof Int32Array ||
    x instanceof Float32Array ||
    x instanceof Float64Array ||
    x instanceof Uint8ClampedArray
  )
};
function isNDArrayLike (obj) {
  return (
    !!obj &&
    typeof obj === 'object' &&
    Array.isArray(obj.shape) &&
    Array.isArray(obj.stride) &&
    typeof obj.offset === 'number' &&
    obj.shape.length === obj.stride.length &&
    (Array.isArray(obj.data) ||
      isTypedArray(obj.data)))
}
var values = function (obj) {
  return Object.keys(obj).map(function (key) { return obj[key] })
};
var flattenUtils = {
  shape: arrayShape$1,
  flatten: flattenArray
};
function flatten1D (array, nx, out) {
  for (var i = 0; i < nx; ++i) {
    out[i] = array[i];
  }
}
function flatten2D (array, nx, ny, out) {
  var ptr = 0;
  for (var i = 0; i < nx; ++i) {
    var row = array[i];
    for (var j = 0; j < ny; ++j) {
      out[ptr++] = row[j];
    }
  }
}
function flatten3D (array, nx, ny, nz, out, ptr_) {
  var ptr = ptr_;
  for (var i = 0; i < nx; ++i) {
    var row = array[i];
    for (var j = 0; j < ny; ++j) {
      var col = row[j];
      for (var k = 0; k < nz; ++k) {
        out[ptr++] = col[k];
      }
    }
  }
}
function flattenRec (array, shape, level, out, ptr) {
  var stride = 1;
  for (var i = level + 1; i < shape.length; ++i) {
    stride *= shape[i];
  }
  var n = shape[level];
  if (shape.length - level === 4) {
    var nx = shape[level + 1];
    var ny = shape[level + 2];
    var nz = shape[level + 3];
    for (i = 0; i < n; ++i) {
      flatten3D(array[i], nx, ny, nz, out, ptr);
      ptr += stride;
    }
  } else {
    for (i = 0; i < n; ++i) {
      flattenRec(array[i], shape, level + 1, out, ptr);
      ptr += stride;
    }
  }
}
function flattenArray (array, shape, type, out_) {
  var sz = 1;
  if (shape.length) {
    for (var i = 0; i < shape.length; ++i) {
      sz *= shape[i];
    }
  } else {
    sz = 0;
  }
  var out = out_ || pool.allocType(type, sz);
  switch (shape.length) {
    case 0:
      break
    case 1:
      flatten1D(array, shape[0], out);
      break
    case 2:
      flatten2D(array, shape[0], shape[1], out);
      break
    case 3:
      flatten3D(array, shape[0], shape[1], shape[2], out, 0);
      break
    default:
      flattenRec(array, shape, 0, out, 0);
  }
  return out
}
function arrayShape$1 (array_) {
  var shape = [];
  for (var array = array_; array.length; array = array[0]) {
    shape.push(array.length);
  }
  return shape
}
var arrayTypes = {
	"[object Int8Array]": 5120,
	"[object Int16Array]": 5122,
	"[object Int32Array]": 5124,
	"[object Uint8Array]": 5121,
	"[object Uint8ClampedArray]": 5121,
	"[object Uint16Array]": 5123,
	"[object Uint32Array]": 5125,
	"[object Float32Array]": 5126,
	"[object Float64Array]": 5121,
	"[object ArrayBuffer]": 5121
};
var int8 = 5120;
var int16 = 5122;
var int32 = 5124;
var uint8 = 5121;
var uint16 = 5123;
var uint32 = 5125;
var float = 5126;
var float32 = 5126;
var glTypes = {
	int8: int8,
	int16: int16,
	int32: int32,
	uint8: uint8,
	uint16: uint16,
	uint32: uint32,
	float: float,
	float32: float32
};
var dynamic$1 = 35048;
var stream = 35040;
var usageTypes = {
	dynamic: dynamic$1,
	stream: stream,
	"static": 35044
};
var arrayFlatten = flattenUtils.flatten;
var arrayShape = flattenUtils.shape;
var GL_STATIC_DRAW = 0x88E4;
var GL_STREAM_DRAW = 0x88E0;
var GL_UNSIGNED_BYTE$2 = 5121;
var GL_FLOAT$2 = 5126;
var DTYPES_SIZES = [];
DTYPES_SIZES[5120] = 1;
DTYPES_SIZES[5122] = 2;
DTYPES_SIZES[5124] = 4;
DTYPES_SIZES[5121] = 1;
DTYPES_SIZES[5123] = 2;
DTYPES_SIZES[5125] = 4;
DTYPES_SIZES[5126] = 4;
function typedArrayCode (data) {
  return arrayTypes[Object.prototype.toString.call(data)] | 0
}
function copyArray (out, inp) {
  for (var i = 0; i < inp.length; ++i) {
    out[i] = inp[i];
  }
}
function transpose (
  result, data, shapeX, shapeY, strideX, strideY, offset) {
  var ptr = 0;
  for (var i = 0; i < shapeX; ++i) {
    for (var j = 0; j < shapeY; ++j) {
      result[ptr++] = data[strideX * i + strideY * j + offset];
    }
  }
}
function wrapBufferState (gl, stats, config, destroyBuffer) {
  var bufferCount = 0;
  var bufferSet = {};
  function REGLBuffer (type) {
    this.id = bufferCount++;
    this.buffer = gl.createBuffer();
    this.type = type;
    this.usage = GL_STATIC_DRAW;
    this.byteLength = 0;
    this.dimension = 1;
    this.dtype = GL_UNSIGNED_BYTE$2;
    this.persistentData = null;
    if (config.profile) {
      this.stats = { size: 0 };
    }
  }
  REGLBuffer.prototype.bind = function () {
    gl.bindBuffer(this.type, this.buffer);
  };
  REGLBuffer.prototype.destroy = function () {
    destroy(this);
  };
  var streamPool = [];
  function createStream (type, data) {
    var buffer = streamPool.pop();
    if (!buffer) {
      buffer = new REGLBuffer(type);
    }
    buffer.bind();
    initBufferFromData(buffer, data, GL_STREAM_DRAW, 0, 1, false);
    return buffer
  }
  function destroyStream (stream$$1) {
    streamPool.push(stream$$1);
  }
  function initBufferFromTypedArray (buffer, data, usage) {
    buffer.byteLength = data.byteLength;
    gl.bufferData(buffer.type, data, usage);
  }
  function initBufferFromData (buffer, data, usage, dtype, dimension, persist) {
    var shape;
    buffer.usage = usage;
    if (Array.isArray(data)) {
      buffer.dtype = dtype || GL_FLOAT$2;
      if (data.length > 0) {
        var flatData;
        if (Array.isArray(data[0])) {
          shape = arrayShape(data);
          var dim = 1;
          for (var i = 1; i < shape.length; ++i) {
            dim *= shape[i];
          }
          buffer.dimension = dim;
          flatData = arrayFlatten(data, shape, buffer.dtype);
          initBufferFromTypedArray(buffer, flatData, usage);
          if (persist) {
            buffer.persistentData = flatData;
          } else {
            pool.freeType(flatData);
          }
        } else if (typeof data[0] === 'number') {
          buffer.dimension = dimension;
          var typedData = pool.allocType(buffer.dtype, data.length);
          copyArray(typedData, data);
          initBufferFromTypedArray(buffer, typedData, usage);
          if (persist) {
            buffer.persistentData = typedData;
          } else {
            pool.freeType(typedData);
          }
        } else if (isTypedArray(data[0])) {
          buffer.dimension = data[0].length;
          buffer.dtype = dtype || typedArrayCode(data[0]) || GL_FLOAT$2;
          flatData = arrayFlatten(
            data,
            [data.length, data[0].length],
            buffer.dtype);
          initBufferFromTypedArray(buffer, flatData, usage);
          if (persist) {
            buffer.persistentData = flatData;
          } else {
            pool.freeType(flatData);
          }
        }
      }
    } else if (isTypedArray(data)) {
      buffer.dtype = dtype || typedArrayCode(data);
      buffer.dimension = dimension;
      initBufferFromTypedArray(buffer, data, usage);
      if (persist) {
        buffer.persistentData = new Uint8Array(new Uint8Array(data.buffer));
      }
    } else if (isNDArrayLike(data)) {
      shape = data.shape;
      var stride = data.stride;
      var offset = data.offset;
      var shapeX = 0;
      var shapeY = 0;
      var strideX = 0;
      var strideY = 0;
      if (shape.length === 1) {
        shapeX = shape[0];
        shapeY = 1;
        strideX = stride[0];
        strideY = 0;
      } else if (shape.length === 2) {
        shapeX = shape[0];
        shapeY = shape[1];
        strideX = stride[0];
        strideY = stride[1];
      }
      buffer.dtype = dtype || typedArrayCode(data.data) || GL_FLOAT$2;
      buffer.dimension = shapeY;
      var transposeData = pool.allocType(buffer.dtype, shapeX * shapeY);
      transpose(transposeData,
        data.data,
        shapeX, shapeY,
        strideX, strideY,
        offset);
      initBufferFromTypedArray(buffer, transposeData, usage);
      if (persist) {
        buffer.persistentData = transposeData;
      } else {
        pool.freeType(transposeData);
      }
    } else if (data instanceof ArrayBuffer) {
      buffer.dtype = GL_UNSIGNED_BYTE$2;
      buffer.dimension = dimension;
      initBufferFromTypedArray(buffer, data, usage);
      if (persist) {
        buffer.persistentData = new Uint8Array(new Uint8Array(data));
      }
    }
  }
  function destroy (buffer) {
    stats.bufferCount--;
    destroyBuffer(buffer);
    var handle = buffer.buffer;
    gl.deleteBuffer(handle);
    buffer.buffer = null;
    delete bufferSet[buffer.id];
  }
  function createBuffer (options, type, deferInit, persistent) {
    stats.bufferCount++;
    var buffer = new REGLBuffer(type);
    bufferSet[buffer.id] = buffer;
    function reglBuffer (options) {
      var usage = GL_STATIC_DRAW;
      var data = null;
      var byteLength = 0;
      var dtype = 0;
      var dimension = 1;
      if (Array.isArray(options) ||
          isTypedArray(options) ||
          isNDArrayLike(options) ||
          options instanceof ArrayBuffer) {
        data = options;
      } else if (typeof options === 'number') {
        byteLength = options | 0;
      } else if (options) {
        if ('data' in options) {
          data = options.data;
        }
        if ('usage' in options) {
          usage = usageTypes[options.usage];
        }
        if ('type' in options) {
          dtype = glTypes[options.type];
        }
        if ('dimension' in options) {
          dimension = options.dimension | 0;
        }
        if ('length' in options) {
          byteLength = options.length | 0;
        }
      }
      buffer.bind();
      if (!data) {
        if (byteLength) gl.bufferData(buffer.type, byteLength, usage);
        buffer.dtype = dtype || GL_UNSIGNED_BYTE$2;
        buffer.usage = usage;
        buffer.dimension = dimension;
        buffer.byteLength = byteLength;
      } else {
        initBufferFromData(buffer, data, usage, dtype, dimension, persistent);
      }
      if (config.profile) {
        buffer.stats.size = buffer.byteLength * DTYPES_SIZES[buffer.dtype];
      }
      return reglBuffer
    }
    function setSubData (data, offset) {
      gl.bufferSubData(buffer.type, offset, data);
    }
    function subdata (data, offset_) {
      var offset = (offset_ || 0) | 0;
      var shape;
      buffer.bind();
      if (isTypedArray(data) || data instanceof ArrayBuffer) {
        setSubData(data, offset);
      } else if (Array.isArray(data)) {
        if (data.length > 0) {
          if (typeof data[0] === 'number') {
            var converted = pool.allocType(buffer.dtype, data.length);
            copyArray(converted, data);
            setSubData(converted, offset);
            pool.freeType(converted);
          } else if (Array.isArray(data[0]) || isTypedArray(data[0])) {
            shape = arrayShape(data);
            var flatData = arrayFlatten(data, shape, buffer.dtype);
            setSubData(flatData, offset);
            pool.freeType(flatData);
          }
        }
      } else if (isNDArrayLike(data)) {
        shape = data.shape;
        var stride = data.stride;
        var shapeX = 0;
        var shapeY = 0;
        var strideX = 0;
        var strideY = 0;
        if (shape.length === 1) {
          shapeX = shape[0];
          shapeY = 1;
          strideX = stride[0];
          strideY = 0;
        } else if (shape.length === 2) {
          shapeX = shape[0];
          shapeY = shape[1];
          strideX = stride[0];
          strideY = stride[1];
        }
        var dtype = Array.isArray(data.data)
          ? buffer.dtype
          : typedArrayCode(data.data);
        var transposeData = pool.allocType(dtype, shapeX * shapeY);
        transpose(transposeData,
          data.data,
          shapeX, shapeY,
          strideX, strideY,
          data.offset);
        setSubData(transposeData, offset);
        pool.freeType(transposeData);
      }
      return reglBuffer
    }
    if (!deferInit) {
      reglBuffer(options);
    }
    reglBuffer._reglType = 'buffer';
    reglBuffer._buffer = buffer;
    reglBuffer.subdata = subdata;
    if (config.profile) {
      reglBuffer.stats = buffer.stats;
    }
    reglBuffer.destroy = function () { destroy(buffer); };
    return reglBuffer
  }
  function restoreBuffers () {
    values(bufferSet).forEach(function (buffer) {
      buffer.buffer = gl.createBuffer();
      gl.bindBuffer(buffer.type, buffer.buffer);
      gl.bufferData(
        buffer.type, buffer.persistentData || buffer.byteLength, buffer.usage);
    });
  }
  if (config.profile) {
    stats.getTotalBufferSize = function () {
      var total = 0;
      Object.keys(bufferSet).forEach(function (key) {
        total += bufferSet[key].stats.size;
      });
      return total
    };
  }
  return {
    create: createBuffer,
    createStream: createStream,
    destroyStream: destroyStream,
    clear: function () {
      values(bufferSet).forEach(destroy);
      streamPool.forEach(destroy);
    },
    getBuffer: function (wrapper) {
      if (wrapper && wrapper._buffer instanceof REGLBuffer) {
        return wrapper._buffer
      }
      return null
    },
    restore: restoreBuffers,
    _initBuffer: initBufferFromData
  }
}
var points = 0;
var point = 0;
var lines = 1;
var line = 1;
var triangles = 4;
var triangle = 4;
var primTypes = {
	points: points,
	point: point,
	lines: lines,
	line: line,
	triangles: triangles,
	triangle: triangle,
	"line loop": 2,
	"line strip": 3,
	"triangle strip": 5,
	"triangle fan": 6
};
var GL_POINTS = 0;
var GL_LINES = 1;
var GL_TRIANGLES = 4;
var GL_BYTE$1 = 5120;
var GL_UNSIGNED_BYTE$3 = 5121;
var GL_SHORT$1 = 5122;
var GL_UNSIGNED_SHORT$1 = 5123;
var GL_INT$1 = 5124;
var GL_UNSIGNED_INT$1 = 5125;
var GL_ELEMENT_ARRAY_BUFFER = 34963;
var GL_STREAM_DRAW$1 = 0x88E0;
var GL_STATIC_DRAW$1 = 0x88E4;
function wrapElementsState (gl, extensions, bufferState, stats) {
  var elementSet = {};
  var elementCount = 0;
  var elementTypes = {
    'uint8': GL_UNSIGNED_BYTE$3,
    'uint16': GL_UNSIGNED_SHORT$1
  };
  if (extensions.oes_element_index_uint) {
    elementTypes.uint32 = GL_UNSIGNED_INT$1;
  }
  function REGLElementBuffer (buffer) {
    this.id = elementCount++;
    elementSet[this.id] = this;
    this.buffer = buffer;
    this.primType = GL_TRIANGLES;
    this.vertCount = 0;
    this.type = 0;
  }
  REGLElementBuffer.prototype.bind = function () {
    this.buffer.bind();
  };
  var bufferPool = [];
  function createElementStream (data) {
    var result = bufferPool.pop();
    if (!result) {
      result = new REGLElementBuffer(bufferState.create(
        null,
        GL_ELEMENT_ARRAY_BUFFER,
        true,
        false)._buffer);
    }
    initElements(result, data, GL_STREAM_DRAW$1, -1, -1, 0, 0);
    return result
  }
  function destroyElementStream (elements) {
    bufferPool.push(elements);
  }
  function initElements (
    elements,
    data,
    usage,
    prim,
    count,
    byteLength,
    type) {
    elements.buffer.bind();
    var dtype;
    if (data) {
      var predictedType = type;
      if (!type && (
        !isTypedArray(data) ||
         (isNDArrayLike(data) && !isTypedArray(data.data)))) {
        predictedType = extensions.oes_element_index_uint
          ? GL_UNSIGNED_INT$1
          : GL_UNSIGNED_SHORT$1;
      }
      bufferState._initBuffer(
        elements.buffer,
        data,
        usage,
        predictedType,
        3);
    } else {
      gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, byteLength, usage);
      elements.buffer.dtype = dtype || GL_UNSIGNED_BYTE$3;
      elements.buffer.usage = usage;
      elements.buffer.dimension = 3;
      elements.buffer.byteLength = byteLength;
    }
    dtype = type;
    if (!type) {
      switch (elements.buffer.dtype) {
        case GL_UNSIGNED_BYTE$3:
        case GL_BYTE$1:
          dtype = GL_UNSIGNED_BYTE$3;
          break
        case GL_UNSIGNED_SHORT$1:
        case GL_SHORT$1:
          dtype = GL_UNSIGNED_SHORT$1;
          break
        case GL_UNSIGNED_INT$1:
        case GL_INT$1:
          dtype = GL_UNSIGNED_INT$1;
          break
      }
      elements.buffer.dtype = dtype;
    }
    elements.type = dtype;
    var vertCount = count;
    if (vertCount < 0) {
      vertCount = elements.buffer.byteLength;
      if (dtype === GL_UNSIGNED_SHORT$1) {
        vertCount >>= 1;
      } else if (dtype === GL_UNSIGNED_INT$1) {
        vertCount >>= 2;
      }
    }
    elements.vertCount = vertCount;
    var primType = prim;
    if (prim < 0) {
      primType = GL_TRIANGLES;
      var dimension = elements.buffer.dimension;
      if (dimension === 1) primType = GL_POINTS;
      if (dimension === 2) primType = GL_LINES;
      if (dimension === 3) primType = GL_TRIANGLES;
    }
    elements.primType = primType;
  }
  function destroyElements (elements) {
    stats.elementsCount--;
    delete elementSet[elements.id];
    elements.buffer.destroy();
    elements.buffer = null;
  }
  function createElements (options, persistent) {
    var buffer = bufferState.create(null, GL_ELEMENT_ARRAY_BUFFER, true);
    var elements = new REGLElementBuffer(buffer._buffer);
    stats.elementsCount++;
    function reglElements (options) {
      if (!options) {
        buffer();
        elements.primType = GL_TRIANGLES;
        elements.vertCount = 0;
        elements.type = GL_UNSIGNED_BYTE$3;
      } else if (typeof options === 'number') {
        buffer(options);
        elements.primType = GL_TRIANGLES;
        elements.vertCount = options | 0;
        elements.type = GL_UNSIGNED_BYTE$3;
      } else {
        var data = null;
        var usage = GL_STATIC_DRAW$1;
        var primType = -1;
        var vertCount = -1;
        var byteLength = 0;
        var dtype = 0;
        if (Array.isArray(options) ||
            isTypedArray(options) ||
            isNDArrayLike(options)) {
          data = options;
        } else {
          if ('data' in options) {
            data = options.data;
          }
          if ('usage' in options) {
            usage = usageTypes[options.usage];
          }
          if ('primitive' in options) {
            primType = primTypes[options.primitive];
          }
          if ('count' in options) {
            vertCount = options.count | 0;
          }
          if ('type' in options) {
            dtype = elementTypes[options.type];
          }
          if ('length' in options) {
            byteLength = options.length | 0;
          } else {
            byteLength = vertCount;
            if (dtype === GL_UNSIGNED_SHORT$1 || dtype === GL_SHORT$1) {
              byteLength *= 2;
            } else if (dtype === GL_UNSIGNED_INT$1 || dtype === GL_INT$1) {
              byteLength *= 4;
            }
          }
        }
        initElements(
          elements,
          data,
          usage,
          primType,
          vertCount,
          byteLength,
          dtype);
      }
      return reglElements
    }
    reglElements(options);
    reglElements._reglType = 'elements';
    reglElements._elements = elements;
    reglElements.subdata = function (data, offset) {
      buffer.subdata(data, offset);
      return reglElements
    };
    reglElements.destroy = function () {
      destroyElements(elements);
    };
    return reglElements
  }
  return {
    create: createElements,
    createStream: createElementStream,
    destroyStream: destroyElementStream,
    getElements: function (elements) {
      if (typeof elements === 'function' &&
          elements._elements instanceof REGLElementBuffer) {
        return elements._elements
      }
      return null
    },
    clear: function () {
      values(elementSet).forEach(destroyElements);
    }
  }
}
var FLOAT = new Float32Array(1);
var INT = new Uint32Array(FLOAT.buffer);
var GL_UNSIGNED_SHORT$3 = 5123;
function convertToHalfFloat (array) {
  var ushorts = pool.allocType(GL_UNSIGNED_SHORT$3, array.length);
  for (var i = 0; i < array.length; ++i) {
    if (isNaN(array[i])) {
      ushorts[i] = 0xffff;
    } else if (array[i] === Infinity) {
      ushorts[i] = 0x7c00;
    } else if (array[i] === -Infinity) {
      ushorts[i] = 0xfc00;
    } else {
      FLOAT[0] = array[i];
      var x = INT[0];
      var sgn = (x >>> 31) << 15;
      var exp = ((x << 1) >>> 24) - 127;
      var frac = (x >> 13) & ((1 << 10) - 1);
      if (exp < -24) {
        ushorts[i] = sgn;
      } else if (exp < -14) {
        var s = -14 - exp;
        ushorts[i] = sgn + ((frac + (1 << 10)) >> s);
      } else if (exp > 15) {
        ushorts[i] = sgn + 0x7c00;
      } else {
        ushorts[i] = sgn + ((exp + 15) << 10) + frac;
      }
    }
  }
  return ushorts
}
function isArrayLike (s) {
  return Array.isArray(s) || isTypedArray(s)
}
var GL_COMPRESSED_TEXTURE_FORMATS = 0x86A3;
var GL_TEXTURE_2D$1 = 0x0DE1;
var GL_TEXTURE_CUBE_MAP$1 = 0x8513;
var GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 = 0x8515;
var GL_RGBA$1 = 0x1908;
var GL_ALPHA = 0x1906;
var GL_RGB = 0x1907;
var GL_LUMINANCE = 0x1909;
var GL_LUMINANCE_ALPHA = 0x190A;
var GL_RGBA4 = 0x8056;
var GL_RGB5_A1 = 0x8057;
var GL_RGB565 = 0x8D62;
var GL_UNSIGNED_SHORT_4_4_4_4 = 0x8033;
var GL_UNSIGNED_SHORT_5_5_5_1 = 0x8034;
var GL_UNSIGNED_SHORT_5_6_5 = 0x8363;
var GL_UNSIGNED_INT_24_8_WEBGL = 0x84FA;
var GL_DEPTH_COMPONENT = 0x1902;
var GL_DEPTH_STENCIL = 0x84F9;
var GL_SRGB_EXT = 0x8C40;
var GL_SRGB_ALPHA_EXT = 0x8C42;
var GL_HALF_FLOAT_OES = 0x8D61;
var GL_COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;
var GL_COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83F1;
var GL_COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2;
var GL_COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3;
var GL_COMPRESSED_RGB_ATC_WEBGL = 0x8C92;
var GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 0x8C93;
var GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 0x87EE;
var GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 0x8C00;
var GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 0x8C01;
var GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 0x8C02;
var GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 0x8C03;
var GL_COMPRESSED_RGB_ETC1_WEBGL = 0x8D64;
var GL_UNSIGNED_BYTE$4 = 0x1401;
var GL_UNSIGNED_SHORT$2 = 0x1403;
var GL_UNSIGNED_INT$2 = 0x1405;
var GL_FLOAT$3 = 0x1406;
var GL_TEXTURE_WRAP_S = 0x2802;
var GL_TEXTURE_WRAP_T = 0x2803;
var GL_REPEAT = 0x2901;
var GL_CLAMP_TO_EDGE = 0x812F;
var GL_MIRRORED_REPEAT = 0x8370;
var GL_TEXTURE_MAG_FILTER = 0x2800;
var GL_TEXTURE_MIN_FILTER = 0x2801;
var GL_NEAREST = 0x2600;
var GL_LINEAR = 0x2601;
var GL_NEAREST_MIPMAP_NEAREST = 0x2700;
var GL_LINEAR_MIPMAP_NEAREST = 0x2701;
var GL_NEAREST_MIPMAP_LINEAR = 0x2702;
var GL_LINEAR_MIPMAP_LINEAR = 0x2703;
var GL_GENERATE_MIPMAP_HINT = 0x8192;
var GL_DONT_CARE = 0x1100;
var GL_FASTEST = 0x1101;
var GL_NICEST = 0x1102;
var GL_TEXTURE_MAX_ANISOTROPY_EXT = 0x84FE;
var GL_UNPACK_ALIGNMENT = 0x0CF5;
var GL_UNPACK_FLIP_Y_WEBGL = 0x9240;
var GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;
var GL_UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
var GL_BROWSER_DEFAULT_WEBGL = 0x9244;
var GL_TEXTURE0$1 = 0x84C0;
var MIPMAP_FILTERS = [
  GL_NEAREST_MIPMAP_NEAREST,
  GL_NEAREST_MIPMAP_LINEAR,
  GL_LINEAR_MIPMAP_NEAREST,
  GL_LINEAR_MIPMAP_LINEAR
];
var CHANNELS_FORMAT = [
  0,
  GL_LUMINANCE,
  GL_LUMINANCE_ALPHA,
  GL_RGB,
  GL_RGBA$1
];
var FORMAT_CHANNELS = {};
FORMAT_CHANNELS[GL_LUMINANCE] =
FORMAT_CHANNELS[GL_ALPHA] =
FORMAT_CHANNELS[GL_DEPTH_COMPONENT] = 1;
FORMAT_CHANNELS[GL_DEPTH_STENCIL] =
FORMAT_CHANNELS[GL_LUMINANCE_ALPHA] = 2;
FORMAT_CHANNELS[GL_RGB] =
FORMAT_CHANNELS[GL_SRGB_EXT] = 3;
FORMAT_CHANNELS[GL_RGBA$1] =
FORMAT_CHANNELS[GL_SRGB_ALPHA_EXT] = 4;
function objectName (str) {
  return '[object ' + str + ']'
}
var CANVAS_CLASS = objectName('HTMLCanvasElement');
var OFFSCREENCANVAS_CLASS = objectName('OffscreenCanvas');
var CONTEXT2D_CLASS = objectName('CanvasRenderingContext2D');
var BITMAP_CLASS = objectName('ImageBitmap');
var IMAGE_CLASS = objectName('HTMLImageElement');
var VIDEO_CLASS = objectName('HTMLVideoElement');
var PIXEL_CLASSES = Object.keys(arrayTypes).concat([
  CANVAS_CLASS,
  OFFSCREENCANVAS_CLASS,
  CONTEXT2D_CLASS,
  BITMAP_CLASS,
  IMAGE_CLASS,
  VIDEO_CLASS
]);
var TYPE_SIZES = [];
TYPE_SIZES[GL_UNSIGNED_BYTE$4] = 1;
TYPE_SIZES[GL_FLOAT$3] = 4;
TYPE_SIZES[GL_HALF_FLOAT_OES] = 2;
TYPE_SIZES[GL_UNSIGNED_SHORT$2] = 2;
TYPE_SIZES[GL_UNSIGNED_INT$2] = 4;
var FORMAT_SIZES_SPECIAL = [];
FORMAT_SIZES_SPECIAL[GL_RGBA4] = 2;
FORMAT_SIZES_SPECIAL[GL_RGB5_A1] = 2;
FORMAT_SIZES_SPECIAL[GL_RGB565] = 2;
FORMAT_SIZES_SPECIAL[GL_DEPTH_STENCIL] = 4;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_S3TC_DXT1_EXT] = 0.5;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_S3TC_DXT1_EXT] = 0.5;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_S3TC_DXT3_EXT] = 1;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_S3TC_DXT5_EXT] = 1;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_ATC_WEBGL] = 0.5;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL] = 1;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL] = 1;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG] = 0.5;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG] = 0.25;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG] = 0.5;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG] = 0.25;
FORMAT_SIZES_SPECIAL[GL_COMPRESSED_RGB_ETC1_WEBGL] = 0.5;
function isNumericArray (arr) {
  return (
    Array.isArray(arr) &&
    (arr.length === 0 ||
    typeof arr[0] === 'number'))
}
function isRectArray (arr) {
  if (!Array.isArray(arr)) {
    return false
  }
  var width = arr.length;
  if (width === 0 || !isArrayLike(arr[0])) {
    return false
  }
  return true
}
function classString (x) {
  return Object.prototype.toString.call(x)
}
function isCanvasElement (object) {
  return classString(object) === CANVAS_CLASS
}
function isOffscreenCanvas (object) {
  return classString(object) === OFFSCREENCANVAS_CLASS
}
function isContext2D (object) {
  return classString(object) === CONTEXT2D_CLASS
}
function isBitmap (object) {
  return classString(object) === BITMAP_CLASS
}
function isImageElement (object) {
  return classString(object) === IMAGE_CLASS
}
function isVideoElement (object) {
  return classString(object) === VIDEO_CLASS
}
function isPixelData (object) {
  if (!object) {
    return false
  }
  var className = classString(object);
  if (PIXEL_CLASSES.indexOf(className) >= 0) {
    return true
  }
  return (
    isNumericArray(object) ||
    isRectArray(object) ||
    isNDArrayLike(object))
}
function typedArrayCode$1 (data) {
  return arrayTypes[Object.prototype.toString.call(data)] | 0
}
function convertData (result, data) {
  var n = data.length;
  switch (result.type) {
    case GL_UNSIGNED_BYTE$4:
    case GL_UNSIGNED_SHORT$2:
    case GL_UNSIGNED_INT$2:
    case GL_FLOAT$3:
      var converted = pool.allocType(result.type, n);
      converted.set(data);
      result.data = converted;
      break
    case GL_HALF_FLOAT_OES:
      result.data = convertToHalfFloat(data);
      break
  }
}
function preConvert (image, n) {
  return pool.allocType(
    image.type === GL_HALF_FLOAT_OES
      ? GL_FLOAT$3
      : image.type, n)
}
function postConvert (image, data) {
  if (image.type === GL_HALF_FLOAT_OES) {
    image.data = convertToHalfFloat(data);
    pool.freeType(data);
  } else {
    image.data = data;
  }
}
function transposeData (image, array, strideX, strideY, strideC, offset) {
  var w = image.width;
  var h = image.height;
  var c = image.channels;
  var n = w * h * c;
  var data = preConvert(image, n);
  var p = 0;
  for (var i = 0; i < h; ++i) {
    for (var j = 0; j < w; ++j) {
      for (var k = 0; k < c; ++k) {
        data[p++] = array[strideX * j + strideY * i + strideC * k + offset];
      }
    }
  }
  postConvert(image, data);
}
function getTextureSize (format, type, width, height, isMipmap, isCube) {
  var s;
  if (typeof FORMAT_SIZES_SPECIAL[format] !== 'undefined') {
    s = FORMAT_SIZES_SPECIAL[format];
  } else {
    s = FORMAT_CHANNELS[format] * TYPE_SIZES[type];
  }
  if (isCube) {
    s *= 6;
  }
  if (isMipmap) {
    var total = 0;
    var w = width;
    while (w >= 1) {
      total += s * w * w;
      w /= 2;
    }
    return total
  } else {
    return s * width * height
  }
}
function createTextureSet (
  gl, extensions, limits, reglPoll, contextState, stats, config) {
  var mipmapHint = {
    "don't care": GL_DONT_CARE,
    'dont care': GL_DONT_CARE,
    'nice': GL_NICEST,
    'fast': GL_FASTEST
  };
  var wrapModes = {
    'repeat': GL_REPEAT,
    'clamp': GL_CLAMP_TO_EDGE,
    'mirror': GL_MIRRORED_REPEAT
  };
  var magFilters = {
    'nearest': GL_NEAREST,
    'linear': GL_LINEAR
  };
  var minFilters = extend({
    'mipmap': GL_LINEAR_MIPMAP_LINEAR,
    'nearest mipmap nearest': GL_NEAREST_MIPMAP_NEAREST,
    'linear mipmap nearest': GL_LINEAR_MIPMAP_NEAREST,
    'nearest mipmap linear': GL_NEAREST_MIPMAP_LINEAR,
    'linear mipmap linear': GL_LINEAR_MIPMAP_LINEAR
  }, magFilters);
  var colorSpace = {
    'none': 0,
    'browser': GL_BROWSER_DEFAULT_WEBGL
  };
  var textureTypes = {
    'uint8': GL_UNSIGNED_BYTE$4,
    'rgba4': GL_UNSIGNED_SHORT_4_4_4_4,
    'rgb565': GL_UNSIGNED_SHORT_5_6_5,
    'rgb5 a1': GL_UNSIGNED_SHORT_5_5_5_1
  };
  var textureFormats = {
    'alpha': GL_ALPHA,
    'luminance': GL_LUMINANCE,
    'luminance alpha': GL_LUMINANCE_ALPHA,
    'rgb': GL_RGB,
    'rgba': GL_RGBA$1,
    'rgba4': GL_RGBA4,
    'rgb5 a1': GL_RGB5_A1,
    'rgb565': GL_RGB565
  };
  var compressedTextureFormats = {};
  if (extensions.ext_srgb) {
    textureFormats.srgb = GL_SRGB_EXT;
    textureFormats.srgba = GL_SRGB_ALPHA_EXT;
  }
  if (extensions.oes_texture_float) {
    textureTypes.float32 = textureTypes.float = GL_FLOAT$3;
  }
  if (extensions.oes_texture_half_float) {
    textureTypes['float16'] = textureTypes['half float'] = GL_HALF_FLOAT_OES;
  }
  if (extensions.webgl_depth_texture) {
    extend(textureFormats, {
      'depth': GL_DEPTH_COMPONENT,
      'depth stencil': GL_DEPTH_STENCIL
    });
    extend(textureTypes, {
      'uint16': GL_UNSIGNED_SHORT$2,
      'uint32': GL_UNSIGNED_INT$2,
      'depth stencil': GL_UNSIGNED_INT_24_8_WEBGL
    });
  }
  if (extensions.webgl_compressed_texture_s3tc) {
    extend(compressedTextureFormats, {
      'rgb s3tc dxt1': GL_COMPRESSED_RGB_S3TC_DXT1_EXT,
      'rgba s3tc dxt1': GL_COMPRESSED_RGBA_S3TC_DXT1_EXT,
      'rgba s3tc dxt3': GL_COMPRESSED_RGBA_S3TC_DXT3_EXT,
      'rgba s3tc dxt5': GL_COMPRESSED_RGBA_S3TC_DXT5_EXT
    });
  }
  if (extensions.webgl_compressed_texture_atc) {
    extend(compressedTextureFormats, {
      'rgb atc': GL_COMPRESSED_RGB_ATC_WEBGL,
      'rgba atc explicit alpha': GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL,
      'rgba atc interpolated alpha': GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL
    });
  }
  if (extensions.webgl_compressed_texture_pvrtc) {
    extend(compressedTextureFormats, {
      'rgb pvrtc 4bppv1': GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
      'rgb pvrtc 2bppv1': GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG,
      'rgba pvrtc 4bppv1': GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
      'rgba pvrtc 2bppv1': GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
    });
  }
  if (extensions.webgl_compressed_texture_etc1) {
    compressedTextureFormats['rgb etc1'] = GL_COMPRESSED_RGB_ETC1_WEBGL;
  }
  var supportedCompressedFormats = Array.prototype.slice.call(
    gl.getParameter(GL_COMPRESSED_TEXTURE_FORMATS));
  Object.keys(compressedTextureFormats).forEach(function (name) {
    var format = compressedTextureFormats[name];
    if (supportedCompressedFormats.indexOf(format) >= 0) {
      textureFormats[name] = format;
    }
  });
  var supportedFormats = Object.keys(textureFormats);
  limits.textureFormats = supportedFormats;
  var textureFormatsInvert = [];
  Object.keys(textureFormats).forEach(function (key) {
    var val = textureFormats[key];
    textureFormatsInvert[val] = key;
  });
  var textureTypesInvert = [];
  Object.keys(textureTypes).forEach(function (key) {
    var val = textureTypes[key];
    textureTypesInvert[val] = key;
  });
  var magFiltersInvert = [];
  Object.keys(magFilters).forEach(function (key) {
    var val = magFilters[key];
    magFiltersInvert[val] = key;
  });
  var minFiltersInvert = [];
  Object.keys(minFilters).forEach(function (key) {
    var val = minFilters[key];
    minFiltersInvert[val] = key;
  });
  var wrapModesInvert = [];
  Object.keys(wrapModes).forEach(function (key) {
    var val = wrapModes[key];
    wrapModesInvert[val] = key;
  });
  var colorFormats = supportedFormats.reduce(function (color, key) {
    var glenum = textureFormats[key];
    if (glenum === GL_LUMINANCE ||
        glenum === GL_ALPHA ||
        glenum === GL_LUMINANCE ||
        glenum === GL_LUMINANCE_ALPHA ||
        glenum === GL_DEPTH_COMPONENT ||
        glenum === GL_DEPTH_STENCIL ||
        (extensions.ext_srgb &&
                (glenum === GL_SRGB_EXT ||
                 glenum === GL_SRGB_ALPHA_EXT))) {
      color[glenum] = glenum;
    } else if (glenum === GL_RGB5_A1 || key.indexOf('rgba') >= 0) {
      color[glenum] = GL_RGBA$1;
    } else {
      color[glenum] = GL_RGB;
    }
    return color
  }, {});
  function TexFlags () {
    this.internalformat = GL_RGBA$1;
    this.format = GL_RGBA$1;
    this.type = GL_UNSIGNED_BYTE$4;
    this.compressed = false;
    this.premultiplyAlpha = false;
    this.flipY = false;
    this.unpackAlignment = 1;
    this.colorSpace = GL_BROWSER_DEFAULT_WEBGL;
    this.width = 0;
    this.height = 0;
    this.channels = 0;
  }
  function copyFlags (result, other) {
    result.internalformat = other.internalformat;
    result.format = other.format;
    result.type = other.type;
    result.compressed = other.compressed;
    result.premultiplyAlpha = other.premultiplyAlpha;
    result.flipY = other.flipY;
    result.unpackAlignment = other.unpackAlignment;
    result.colorSpace = other.colorSpace;
    result.width = other.width;
    result.height = other.height;
    result.channels = other.channels;
  }
  function parseFlags (flags, options) {
    if (typeof options !== 'object' || !options) {
      return
    }
    if ('premultiplyAlpha' in options) {
      flags.premultiplyAlpha = options.premultiplyAlpha;
    }
    if ('flipY' in options) {
      flags.flipY = options.flipY;
    }
    if ('alignment' in options) {
      flags.unpackAlignment = options.alignment;
    }
    if ('colorSpace' in options) {
      flags.colorSpace = colorSpace[options.colorSpace];
    }
    if ('type' in options) {
      var type = options.type;
      flags.type = textureTypes[type];
    }
    var w = flags.width;
    var h = flags.height;
    var c = flags.channels;
    var hasChannels = false;
    if ('shape' in options) {
      w = options.shape[0];
      h = options.shape[1];
      if (options.shape.length === 3) {
        c = options.shape[2];
        hasChannels = true;
      }
    } else {
      if ('radius' in options) {
        w = h = options.radius;
      }
      if ('width' in options) {
        w = options.width;
      }
      if ('height' in options) {
        h = options.height;
      }
      if ('channels' in options) {
        c = options.channels;
        hasChannels = true;
      }
    }
    flags.width = w | 0;
    flags.height = h | 0;
    flags.channels = c | 0;
    var hasFormat = false;
    if ('format' in options) {
      var formatStr = options.format;
      var internalformat = flags.internalformat = textureFormats[formatStr];
      flags.format = colorFormats[internalformat];
      if (formatStr in textureTypes) {
        if (!('type' in options)) {
          flags.type = textureTypes[formatStr];
        }
      }
      if (formatStr in compressedTextureFormats) {
        flags.compressed = true;
      }
      hasFormat = true;
    }
    if (!hasChannels && hasFormat) {
      flags.channels = FORMAT_CHANNELS[flags.format];
    } else if (hasChannels && !hasFormat) {
      if (flags.channels !== CHANNELS_FORMAT[flags.format]) {
        flags.format = flags.internalformat = CHANNELS_FORMAT[flags.channels];
      }
    }
  }
  function setFlags (flags) {
    gl.pixelStorei(GL_UNPACK_FLIP_Y_WEBGL, flags.flipY);
    gl.pixelStorei(GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL, flags.premultiplyAlpha);
    gl.pixelStorei(GL_UNPACK_COLORSPACE_CONVERSION_WEBGL, flags.colorSpace);
    gl.pixelStorei(GL_UNPACK_ALIGNMENT, flags.unpackAlignment);
  }
  function TexImage () {
    TexFlags.call(this);
    this.xOffset = 0;
    this.yOffset = 0;
    this.data = null;
    this.needsFree = false;
    this.element = null;
    this.needsCopy = false;
  }
  function parseImage (image, options) {
    var data = null;
    if (isPixelData(options)) {
      data = options;
    } else if (options) {
      parseFlags(image, options);
      if ('x' in options) {
        image.xOffset = options.x | 0;
      }
      if ('y' in options) {
        image.yOffset = options.y | 0;
      }
      if (isPixelData(options.data)) {
        data = options.data;
      }
    }
    if (options.copy) {
      var viewW = contextState.viewportWidth;
      var viewH = contextState.viewportHeight;
      image.width = image.width || (viewW - image.xOffset);
      image.height = image.height || (viewH - image.yOffset);
      image.needsCopy = true;
    } else if (!data) {
      image.width = image.width || 1;
      image.height = image.height || 1;
      image.channels = image.channels || 4;
    } else if (isTypedArray(data)) {
      image.channels = image.channels || 4;
      image.data = data;
      if (!('type' in options) && image.type === GL_UNSIGNED_BYTE$4) {
        image.type = typedArrayCode$1(data);
      }
    } else if (isNumericArray(data)) {
      image.channels = image.channels || 4;
      convertData(image, data);
      image.alignment = 1;
      image.needsFree = true;
    } else if (isNDArrayLike(data)) {
      var array = data.data;
      if (!Array.isArray(array) && image.type === GL_UNSIGNED_BYTE$4) {
        image.type = typedArrayCode$1(array);
      }
      var shape = data.shape;
      var stride = data.stride;
      var shapeX, shapeY, shapeC, strideX, strideY, strideC;
      if (shape.length === 3) {
        shapeC = shape[2];
        strideC = stride[2];
      } else {
        shapeC = 1;
        strideC = 1;
      }
      shapeX = shape[0];
      shapeY = shape[1];
      strideX = stride[0];
      strideY = stride[1];
      image.alignment = 1;
      image.width = shapeX;
      image.height = shapeY;
      image.channels = shapeC;
      image.format = image.internalformat = CHANNELS_FORMAT[shapeC];
      image.needsFree = true;
      transposeData(image, array, strideX, strideY, strideC, data.offset);
    } else if (isCanvasElement(data) || isOffscreenCanvas(data) || isContext2D(data)) {
      if (isCanvasElement(data) || isOffscreenCanvas(data)) {
        image.element = data;
      } else {
        image.element = data.canvas;
      }
      image.width = image.element.width;
      image.height = image.element.height;
      image.channels = 4;
    } else if (isBitmap(data)) {
      image.element = data;
      image.width = data.width;
      image.height = data.height;
      image.channels = 4;
    } else if (isImageElement(data)) {
      image.element = data;
      image.width = data.naturalWidth;
      image.height = data.naturalHeight;
      image.channels = 4;
    } else if (isVideoElement(data)) {
      image.element = data;
      image.width = data.videoWidth;
      image.height = data.videoHeight;
      image.channels = 4;
    } else if (isRectArray(data)) {
      var w = image.width || data[0].length;
      var h = image.height || data.length;
      var c = image.channels;
      if (isArrayLike(data[0][0])) {
        c = c || data[0][0].length;
      } else {
        c = c || 1;
      }
      var arrayShape = flattenUtils.shape(data);
      var n = 1;
      for (var dd = 0; dd < arrayShape.length; ++dd) {
        n *= arrayShape[dd];
      }
      var allocData = preConvert(image, n);
      flattenUtils.flatten(data, arrayShape, '', allocData);
      postConvert(image, allocData);
      image.alignment = 1;
      image.width = w;
      image.height = h;
      image.channels = c;
      image.format = image.internalformat = CHANNELS_FORMAT[c];
      image.needsFree = true;
    }
    if (image.type === GL_FLOAT$3) ; else if (image.type === GL_HALF_FLOAT_OES) ;
  }
  function setImage (info, target, miplevel) {
    var element = info.element;
    var data = info.data;
    var internalformat = info.internalformat;
    var format = info.format;
    var type = info.type;
    var width = info.width;
    var height = info.height;
    setFlags(info);
    if (element) {
      gl.texImage2D(target, miplevel, format, format, type, element);
    } else if (info.compressed) {
      gl.compressedTexImage2D(target, miplevel, internalformat, width, height, 0, data);
    } else if (info.needsCopy) {
      reglPoll();
      gl.copyTexImage2D(
        target, miplevel, format, info.xOffset, info.yOffset, width, height, 0);
    } else {
      gl.texImage2D(target, miplevel, format, width, height, 0, format, type, data || null);
    }
  }
  function setSubImage (info, target, x, y, miplevel) {
    var element = info.element;
    var data = info.data;
    var internalformat = info.internalformat;
    var format = info.format;
    var type = info.type;
    var width = info.width;
    var height = info.height;
    setFlags(info);
    if (element) {
      gl.texSubImage2D(
        target, miplevel, x, y, format, type, element);
    } else if (info.compressed) {
      gl.compressedTexSubImage2D(
        target, miplevel, x, y, internalformat, width, height, data);
    } else if (info.needsCopy) {
      reglPoll();
      gl.copyTexSubImage2D(
        target, miplevel, x, y, info.xOffset, info.yOffset, width, height);
    } else {
      gl.texSubImage2D(
        target, miplevel, x, y, width, height, format, type, data);
    }
  }
  var imagePool = [];
  function allocImage () {
    return imagePool.pop() || new TexImage()
  }
  function freeImage (image) {
    if (image.needsFree) {
      pool.freeType(image.data);
    }
    TexImage.call(image);
    imagePool.push(image);
  }
  function MipMap () {
    TexFlags.call(this);
    this.genMipmaps = false;
    this.mipmapHint = GL_DONT_CARE;
    this.mipmask = 0;
    this.images = Array(16);
  }
  function parseMipMapFromShape (mipmap, width, height) {
    var img = mipmap.images[0] = allocImage();
    mipmap.mipmask = 1;
    img.width = mipmap.width = width;
    img.height = mipmap.height = height;
    img.channels = mipmap.channels = 4;
  }
  function parseMipMapFromObject (mipmap, options) {
    var imgData = null;
    if (isPixelData(options)) {
      imgData = mipmap.images[0] = allocImage();
      copyFlags(imgData, mipmap);
      parseImage(imgData, options);
      mipmap.mipmask = 1;
    } else {
      parseFlags(mipmap, options);
      if (Array.isArray(options.mipmap)) {
        var mipData = options.mipmap;
        for (var i = 0; i < mipData.length; ++i) {
          imgData = mipmap.images[i] = allocImage();
          copyFlags(imgData, mipmap);
          imgData.width >>= i;
          imgData.height >>= i;
          parseImage(imgData, mipData[i]);
          mipmap.mipmask |= (1 << i);
        }
      } else {
        imgData = mipmap.images[0] = allocImage();
        copyFlags(imgData, mipmap);
        parseImage(imgData, options);
        mipmap.mipmask = 1;
      }
    }
    copyFlags(mipmap, mipmap.images[0]);
    if (
      mipmap.compressed &&
      (
        mipmap.internalformat === GL_COMPRESSED_RGB_S3TC_DXT1_EXT ||
        mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT1_EXT ||
        mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT3_EXT ||
        mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT5_EXT
      )
    ) ;
  }
  function setMipMap (mipmap, target) {
    var images = mipmap.images;
    for (var i = 0; i < images.length; ++i) {
      if (!images[i]) {
        return
      }
      setImage(images[i], target, i);
    }
  }
  var mipPool = [];
  function allocMipMap () {
    var result = mipPool.pop() || new MipMap();
    TexFlags.call(result);
    result.mipmask = 0;
    for (var i = 0; i < 16; ++i) {
      result.images[i] = null;
    }
    return result
  }
  function freeMipMap (mipmap) {
    var images = mipmap.images;
    for (var i = 0; i < images.length; ++i) {
      if (images[i]) {
        freeImage(images[i]);
      }
      images[i] = null;
    }
    mipPool.push(mipmap);
  }
  function TexInfo () {
    this.minFilter = GL_NEAREST;
    this.magFilter = GL_NEAREST;
    this.wrapS = GL_CLAMP_TO_EDGE;
    this.wrapT = GL_CLAMP_TO_EDGE;
    this.anisotropic = 1;
    this.genMipmaps = false;
    this.mipmapHint = GL_DONT_CARE;
  }
  function parseTexInfo (info, options) {
    if ('min' in options) {
      var minFilter = options.min;
      info.minFilter = minFilters[minFilter];
      if (MIPMAP_FILTERS.indexOf(info.minFilter) >= 0 && !('faces' in options)) {
        info.genMipmaps = true;
      }
    }
    if ('mag' in options) {
      var magFilter = options.mag;
      info.magFilter = magFilters[magFilter];
    }
    var wrapS = info.wrapS;
    var wrapT = info.wrapT;
    if ('wrap' in options) {
      var wrap = options.wrap;
      if (typeof wrap === 'string') {
        wrapS = wrapT = wrapModes[wrap];
      } else if (Array.isArray(wrap)) {
        wrapS = wrapModes[wrap[0]];
        wrapT = wrapModes[wrap[1]];
      }
    } else {
      if ('wrapS' in options) {
        var optWrapS = options.wrapS;
        wrapS = wrapModes[optWrapS];
      }
      if ('wrapT' in options) {
        var optWrapT = options.wrapT;
        wrapT = wrapModes[optWrapT];
      }
    }
    info.wrapS = wrapS;
    info.wrapT = wrapT;
    if ('anisotropic' in options) {
      var anisotropic = options.anisotropic;
      info.anisotropic = options.anisotropic;
    }
    if ('mipmap' in options) {
      var hasMipMap = false;
      switch (typeof options.mipmap) {
        case 'string':
          info.mipmapHint = mipmapHint[options.mipmap];
          info.genMipmaps = true;
          hasMipMap = true;
          break
        case 'boolean':
          hasMipMap = info.genMipmaps = options.mipmap;
          break
        case 'object':
          info.genMipmaps = false;
          hasMipMap = true;
          break
      }
      if (hasMipMap && !('min' in options)) {
        info.minFilter = GL_NEAREST_MIPMAP_NEAREST;
      }
    }
  }
  function setTexInfo (info, target) {
    gl.texParameteri(target, GL_TEXTURE_MIN_FILTER, info.minFilter);
    gl.texParameteri(target, GL_TEXTURE_MAG_FILTER, info.magFilter);
    gl.texParameteri(target, GL_TEXTURE_WRAP_S, info.wrapS);
    gl.texParameteri(target, GL_TEXTURE_WRAP_T, info.wrapT);
    if (extensions.ext_texture_filter_anisotropic) {
      gl.texParameteri(target, GL_TEXTURE_MAX_ANISOTROPY_EXT, info.anisotropic);
    }
    if (info.genMipmaps) {
      gl.hint(GL_GENERATE_MIPMAP_HINT, info.mipmapHint);
      gl.generateMipmap(target);
    }
  }
  var textureCount = 0;
  var textureSet = {};
  var numTexUnits = limits.maxTextureUnits;
  var textureUnits = Array(numTexUnits).map(function () {
    return null
  });
  function REGLTexture (target) {
    TexFlags.call(this);
    this.mipmask = 0;
    this.internalformat = GL_RGBA$1;
    this.id = textureCount++;
    this.refCount = 1;
    this.target = target;
    this.texture = gl.createTexture();
    this.unit = -1;
    this.bindCount = 0;
    this.texInfo = new TexInfo();
    if (config.profile) {
      this.stats = { size: 0 };
    }
  }
  function tempBind (texture) {
    gl.activeTexture(GL_TEXTURE0$1);
    gl.bindTexture(texture.target, texture.texture);
  }
  function tempRestore () {
    var prev = textureUnits[0];
    if (prev) {
      gl.bindTexture(prev.target, prev.texture);
    } else {
      gl.bindTexture(GL_TEXTURE_2D$1, null);
    }
  }
  function destroy (texture) {
    var handle = texture.texture;
    var unit = texture.unit;
    var target = texture.target;
    if (unit >= 0) {
      gl.activeTexture(GL_TEXTURE0$1 + unit);
      gl.bindTexture(target, null);
      textureUnits[unit] = null;
    }
    gl.deleteTexture(handle);
    texture.texture = null;
    texture.params = null;
    texture.pixels = null;
    texture.refCount = 0;
    delete textureSet[texture.id];
    stats.textureCount--;
  }
  extend(REGLTexture.prototype, {
    bind: function () {
      var texture = this;
      texture.bindCount += 1;
      var unit = texture.unit;
      if (unit < 0) {
        for (var i = 0; i < numTexUnits; ++i) {
          var other = textureUnits[i];
          if (other) {
            if (other.bindCount > 0) {
              continue
            }
            other.unit = -1;
          }
          textureUnits[i] = texture;
          unit = i;
          break
        }
        if (config.profile && stats.maxTextureUnits < (unit + 1)) {
          stats.maxTextureUnits = unit + 1;
        }
        texture.unit = unit;
        gl.activeTexture(GL_TEXTURE0$1 + unit);
        gl.bindTexture(texture.target, texture.texture);
      }
      return unit
    },
    unbind: function () {
      this.bindCount -= 1;
    },
    decRef: function () {
      if (--this.refCount <= 0) {
        destroy(this);
      }
    }
  });
  function createTexture2D (a, b) {
    var texture = new REGLTexture(GL_TEXTURE_2D$1);
    textureSet[texture.id] = texture;
    stats.textureCount++;
    function reglTexture2D (a, b) {
      var texInfo = texture.texInfo;
      TexInfo.call(texInfo);
      var mipData = allocMipMap();
      if (typeof a === 'number') {
        if (typeof b === 'number') {
          parseMipMapFromShape(mipData, a | 0, b | 0);
        } else {
          parseMipMapFromShape(mipData, a | 0, a | 0);
        }
      } else if (a) {
        parseTexInfo(texInfo, a);
        parseMipMapFromObject(mipData, a);
      } else {
        parseMipMapFromShape(mipData, 1, 1);
      }
      if (texInfo.genMipmaps) {
        mipData.mipmask = (mipData.width << 1) - 1;
      }
      texture.mipmask = mipData.mipmask;
      copyFlags(texture, mipData);
      texture.internalformat = mipData.internalformat;
      reglTexture2D.width = mipData.width;
      reglTexture2D.height = mipData.height;
      tempBind(texture);
      setMipMap(mipData, GL_TEXTURE_2D$1);
      setTexInfo(texInfo, GL_TEXTURE_2D$1);
      tempRestore();
      freeMipMap(mipData);
      if (config.profile) {
        texture.stats.size = getTextureSize(
          texture.internalformat,
          texture.type,
          mipData.width,
          mipData.height,
          texInfo.genMipmaps,
          false);
      }
      reglTexture2D.format = textureFormatsInvert[texture.internalformat];
      reglTexture2D.type = textureTypesInvert[texture.type];
      reglTexture2D.mag = magFiltersInvert[texInfo.magFilter];
      reglTexture2D.min = minFiltersInvert[texInfo.minFilter];
      reglTexture2D.wrapS = wrapModesInvert[texInfo.wrapS];
      reglTexture2D.wrapT = wrapModesInvert[texInfo.wrapT];
      return reglTexture2D
    }
    function subimage (image, x_, y_, level_) {
      var x = x_ | 0;
      var y = y_ | 0;
      var level = level_ | 0;
      var imageData = allocImage();
      copyFlags(imageData, texture);
      imageData.width = 0;
      imageData.height = 0;
      parseImage(imageData, image);
      imageData.width = imageData.width || ((texture.width >> level) - x);
      imageData.height = imageData.height || ((texture.height >> level) - y);
      tempBind(texture);
      setSubImage(imageData, GL_TEXTURE_2D$1, x, y, level);
      tempRestore();
      freeImage(imageData);
      return reglTexture2D
    }
    function resize (w_, h_) {
      var w = w_ | 0;
      var h = (h_ | 0) || w;
      if (w === texture.width && h === texture.height) {
        return reglTexture2D
      }
      reglTexture2D.width = texture.width = w;
      reglTexture2D.height = texture.height = h;
      tempBind(texture);
      for (var i = 0; texture.mipmask >> i; ++i) {
        var _w = w >> i;
        var _h = h >> i;
        if (!_w || !_h) break
        gl.texImage2D(
          GL_TEXTURE_2D$1,
          i,
          texture.format,
          _w,
          _h,
          0,
          texture.format,
          texture.type,
          null);
      }
      tempRestore();
      if (config.profile) {
        texture.stats.size = getTextureSize(
          texture.internalformat,
          texture.type,
          w,
          h,
          false,
          false);
      }
      return reglTexture2D
    }
    reglTexture2D(a, b);
    reglTexture2D.subimage = subimage;
    reglTexture2D.resize = resize;
    reglTexture2D._reglType = 'texture2d';
    reglTexture2D._texture = texture;
    if (config.profile) {
      reglTexture2D.stats = texture.stats;
    }
    reglTexture2D.destroy = function () {
      texture.decRef();
    };
    return reglTexture2D
  }
  function createTextureCube (a0, a1, a2, a3, a4, a5) {
    var texture = new REGLTexture(GL_TEXTURE_CUBE_MAP$1);
    textureSet[texture.id] = texture;
    stats.cubeCount++;
    var faces = new Array(6);
    function reglTextureCube (a0, a1, a2, a3, a4, a5) {
      var i;
      var texInfo = texture.texInfo;
      TexInfo.call(texInfo);
      for (i = 0; i < 6; ++i) {
        faces[i] = allocMipMap();
      }
      if (typeof a0 === 'number' || !a0) {
        var s = (a0 | 0) || 1;
        for (i = 0; i < 6; ++i) {
          parseMipMapFromShape(faces[i], s, s);
        }
      } else if (typeof a0 === 'object') {
        if (a1) {
          parseMipMapFromObject(faces[0], a0);
          parseMipMapFromObject(faces[1], a1);
          parseMipMapFromObject(faces[2], a2);
          parseMipMapFromObject(faces[3], a3);
          parseMipMapFromObject(faces[4], a4);
          parseMipMapFromObject(faces[5], a5);
        } else {
          parseTexInfo(texInfo, a0);
          parseFlags(texture, a0);
          if ('faces' in a0) {
            var faceInput = a0.faces;
            for (i = 0; i < 6; ++i) {
              copyFlags(faces[i], texture);
              parseMipMapFromObject(faces[i], faceInput[i]);
            }
          } else {
            for (i = 0; i < 6; ++i) {
              parseMipMapFromObject(faces[i], a0);
            }
          }
        }
      }
      copyFlags(texture, faces[0]);
      if (!limits.npotTextureCube) ;
      if (texInfo.genMipmaps) {
        texture.mipmask = (faces[0].width << 1) - 1;
      } else {
        texture.mipmask = faces[0].mipmask;
      }
      texture.internalformat = faces[0].internalformat;
      reglTextureCube.width = faces[0].width;
      reglTextureCube.height = faces[0].height;
      tempBind(texture);
      for (i = 0; i < 6; ++i) {
        setMipMap(faces[i], GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + i);
      }
      setTexInfo(texInfo, GL_TEXTURE_CUBE_MAP$1);
      tempRestore();
      if (config.profile) {
        texture.stats.size = getTextureSize(
          texture.internalformat,
          texture.type,
          reglTextureCube.width,
          reglTextureCube.height,
          texInfo.genMipmaps,
          true);
      }
      reglTextureCube.format = textureFormatsInvert[texture.internalformat];
      reglTextureCube.type = textureTypesInvert[texture.type];
      reglTextureCube.mag = magFiltersInvert[texInfo.magFilter];
      reglTextureCube.min = minFiltersInvert[texInfo.minFilter];
      reglTextureCube.wrapS = wrapModesInvert[texInfo.wrapS];
      reglTextureCube.wrapT = wrapModesInvert[texInfo.wrapT];
      for (i = 0; i < 6; ++i) {
        freeMipMap(faces[i]);
      }
      return reglTextureCube
    }
    function subimage (face, image, x_, y_, level_) {
      var x = x_ | 0;
      var y = y_ | 0;
      var level = level_ | 0;
      var imageData = allocImage();
      copyFlags(imageData, texture);
      imageData.width = 0;
      imageData.height = 0;
      parseImage(imageData, image);
      imageData.width = imageData.width || ((texture.width >> level) - x);
      imageData.height = imageData.height || ((texture.height >> level) - y);
      tempBind(texture);
      setSubImage(imageData, GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + face, x, y, level);
      tempRestore();
      freeImage(imageData);
      return reglTextureCube
    }
    function resize (radius_) {
      var radius = radius_ | 0;
      if (radius === texture.width) {
        return
      }
      reglTextureCube.width = texture.width = radius;
      reglTextureCube.height = texture.height = radius;
      tempBind(texture);
      for (var i = 0; i < 6; ++i) {
        for (var j = 0; texture.mipmask >> j; ++j) {
          gl.texImage2D(
            GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + i,
            j,
            texture.format,
            radius >> j,
            radius >> j,
            0,
            texture.format,
            texture.type,
            null);
        }
      }
      tempRestore();
      if (config.profile) {
        texture.stats.size = getTextureSize(
          texture.internalformat,
          texture.type,
          reglTextureCube.width,
          reglTextureCube.height,
          false,
          true);
      }
      return reglTextureCube
    }
    reglTextureCube(a0, a1, a2, a3, a4, a5);
    reglTextureCube.subimage = subimage;
    reglTextureCube.resize = resize;
    reglTextureCube._reglType = 'textureCube';
    reglTextureCube._texture = texture;
    if (config.profile) {
      reglTextureCube.stats = texture.stats;
    }
    reglTextureCube.destroy = function () {
      texture.decRef();
    };
    return reglTextureCube
  }
  function destroyTextures () {
    for (var i = 0; i < numTexUnits; ++i) {
      gl.activeTexture(GL_TEXTURE0$1 + i);
      gl.bindTexture(GL_TEXTURE_2D$1, null);
      textureUnits[i] = null;
    }
    values(textureSet).forEach(destroy);
    stats.cubeCount = 0;
    stats.textureCount = 0;
  }
  if (config.profile) {
    stats.getTotalTextureSize = function () {
      var total = 0;
      Object.keys(textureSet).forEach(function (key) {
        total += textureSet[key].stats.size;
      });
      return total
    };
  }
  function restoreTextures () {
    for (var i = 0; i < numTexUnits; ++i) {
      var tex = textureUnits[i];
      if (tex) {
        tex.bindCount = 0;
        tex.unit = -1;
        textureUnits[i] = null;
      }
    }
    values(textureSet).forEach(function (texture) {
      texture.texture = gl.createTexture();
      gl.bindTexture(texture.target, texture.texture);
      for (var i = 0; i < 32; ++i) {
        if ((texture.mipmask & (1 << i)) === 0) {
          continue
        }
        if (texture.target === GL_TEXTURE_2D$1) {
          gl.texImage2D(GL_TEXTURE_2D$1,
            i,
            texture.internalformat,
            texture.width >> i,
            texture.height >> i,
            0,
            texture.internalformat,
            texture.type,
            null);
        } else {
          for (var j = 0; j < 6; ++j) {
            gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + j,
              i,
              texture.internalformat,
              texture.width >> i,
              texture.height >> i,
              0,
              texture.internalformat,
              texture.type,
              null);
          }
        }
      }
      setTexInfo(texture.texInfo, texture.target);
    });
  }
  return {
    create2D: createTexture2D,
    createCube: createTextureCube,
    clear: destroyTextures,
    getTexture: function (wrapper) {
      return null
    },
    restore: restoreTextures
  }
}
var GL_RENDERBUFFER = 0x8D41;
var GL_RGBA4$1 = 0x8056;
var GL_RGB5_A1$1 = 0x8057;
var GL_RGB565$1 = 0x8D62;
var GL_DEPTH_COMPONENT16 = 0x81A5;
var GL_STENCIL_INDEX8 = 0x8D48;
var GL_DEPTH_STENCIL$1 = 0x84F9;
var GL_SRGB8_ALPHA8_EXT = 0x8C43;
var GL_RGBA32F_EXT = 0x8814;
var GL_RGBA16F_EXT = 0x881A;
var GL_RGB16F_EXT = 0x881B;
var FORMAT_SIZES = [];
FORMAT_SIZES[GL_RGBA4$1] = 2;
FORMAT_SIZES[GL_RGB5_A1$1] = 2;
FORMAT_SIZES[GL_RGB565$1] = 2;
FORMAT_SIZES[GL_DEPTH_COMPONENT16] = 2;
FORMAT_SIZES[GL_STENCIL_INDEX8] = 1;
FORMAT_SIZES[GL_DEPTH_STENCIL$1] = 4;
FORMAT_SIZES[GL_SRGB8_ALPHA8_EXT] = 4;
FORMAT_SIZES[GL_RGBA32F_EXT] = 16;
FORMAT_SIZES[GL_RGBA16F_EXT] = 8;
FORMAT_SIZES[GL_RGB16F_EXT] = 6;
function getRenderbufferSize (format, width, height) {
  return FORMAT_SIZES[format] * width * height
}
var wrapRenderbuffers = function (gl, extensions, limits, stats, config) {
  var formatTypes = {
    'rgba4': GL_RGBA4$1,
    'rgb565': GL_RGB565$1,
    'rgb5 a1': GL_RGB5_A1$1,
    'depth': GL_DEPTH_COMPONENT16,
    'stencil': GL_STENCIL_INDEX8,
    'depth stencil': GL_DEPTH_STENCIL$1
  };
  if (extensions.ext_srgb) {
    formatTypes['srgba'] = GL_SRGB8_ALPHA8_EXT;
  }
  if (extensions.ext_color_buffer_half_float) {
    formatTypes['rgba16f'] = GL_RGBA16F_EXT;
    formatTypes['rgb16f'] = GL_RGB16F_EXT;
  }
  if (extensions.webgl_color_buffer_float) {
    formatTypes['rgba32f'] = GL_RGBA32F_EXT;
  }
  var formatTypesInvert = [];
  Object.keys(formatTypes).forEach(function (key) {
    var val = formatTypes[key];
    formatTypesInvert[val] = key;
  });
  var renderbufferCount = 0;
  var renderbufferSet = {};
  function REGLRenderbuffer (renderbuffer) {
    this.id = renderbufferCount++;
    this.refCount = 1;
    this.renderbuffer = renderbuffer;
    this.format = GL_RGBA4$1;
    this.width = 0;
    this.height = 0;
    if (config.profile) {
      this.stats = { size: 0 };
    }
  }
  REGLRenderbuffer.prototype.decRef = function () {
    if (--this.refCount <= 0) {
      destroy(this);
    }
  };
  function destroy (rb) {
    var handle = rb.renderbuffer;
    gl.bindRenderbuffer(GL_RENDERBUFFER, null);
    gl.deleteRenderbuffer(handle);
    rb.renderbuffer = null;
    rb.refCount = 0;
    delete renderbufferSet[rb.id];
    stats.renderbufferCount--;
  }
  function createRenderbuffer (a, b) {
    var renderbuffer = new REGLRenderbuffer(gl.createRenderbuffer());
    renderbufferSet[renderbuffer.id] = renderbuffer;
    stats.renderbufferCount++;
    function reglRenderbuffer (a, b) {
      var w = 0;
      var h = 0;
      var format = GL_RGBA4$1;
      if (typeof a === 'object' && a) {
        var options = a;
        if ('shape' in options) {
          var shape = options.shape;
          w = shape[0] | 0;
          h = shape[1] | 0;
        } else {
          if ('radius' in options) {
            w = h = options.radius | 0;
          }
          if ('width' in options) {
            w = options.width | 0;
          }
          if ('height' in options) {
            h = options.height | 0;
          }
        }
        if ('format' in options) {
          format = formatTypes[options.format];
        }
      } else if (typeof a === 'number') {
        w = a | 0;
        if (typeof b === 'number') {
          h = b | 0;
        } else {
          h = w;
        }
      } else if (!a) {
        w = h = 1;
      }
      if (w === renderbuffer.width &&
          h === renderbuffer.height &&
          format === renderbuffer.format) {
        return
      }
      reglRenderbuffer.width = renderbuffer.width = w;
      reglRenderbuffer.height = renderbuffer.height = h;
      renderbuffer.format = format;
      gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer.renderbuffer);
      gl.renderbufferStorage(GL_RENDERBUFFER, format, w, h);
      if (config.profile) {
        renderbuffer.stats.size = getRenderbufferSize(renderbuffer.format, renderbuffer.width, renderbuffer.height);
      }
      reglRenderbuffer.format = formatTypesInvert[renderbuffer.format];
      return reglRenderbuffer
    }
    function resize (w_, h_) {
      var w = w_ | 0;
      var h = (h_ | 0) || w;
      if (w === renderbuffer.width && h === renderbuffer.height) {
        return reglRenderbuffer
      }
      reglRenderbuffer.width = renderbuffer.width = w;
      reglRenderbuffer.height = renderbuffer.height = h;
      gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer.renderbuffer);
      gl.renderbufferStorage(GL_RENDERBUFFER, renderbuffer.format, w, h);
      if (config.profile) {
        renderbuffer.stats.size = getRenderbufferSize(
          renderbuffer.format, renderbuffer.width, renderbuffer.height);
      }
      return reglRenderbuffer
    }
    reglRenderbuffer(a, b);
    reglRenderbuffer.resize = resize;
    reglRenderbuffer._reglType = 'renderbuffer';
    reglRenderbuffer._renderbuffer = renderbuffer;
    if (config.profile) {
      reglRenderbuffer.stats = renderbuffer.stats;
    }
    reglRenderbuffer.destroy = function () {
      renderbuffer.decRef();
    };
    return reglRenderbuffer
  }
  if (config.profile) {
    stats.getTotalRenderbufferSize = function () {
      var total = 0;
      Object.keys(renderbufferSet).forEach(function (key) {
        total += renderbufferSet[key].stats.size;
      });
      return total
    };
  }
  function restoreRenderbuffers () {
    values(renderbufferSet).forEach(function (rb) {
      rb.renderbuffer = gl.createRenderbuffer();
      gl.bindRenderbuffer(GL_RENDERBUFFER, rb.renderbuffer);
      gl.renderbufferStorage(GL_RENDERBUFFER, rb.format, rb.width, rb.height);
    });
    gl.bindRenderbuffer(GL_RENDERBUFFER, null);
  }
  return {
    create: createRenderbuffer,
    clear: function () {
      values(renderbufferSet).forEach(destroy);
    },
    restore: restoreRenderbuffers
  }
};
var GL_FRAMEBUFFER$1 = 0x8D40;
var GL_RENDERBUFFER$1 = 0x8D41;
var GL_TEXTURE_2D$2 = 0x0DE1;
var GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 = 0x8515;
var GL_COLOR_ATTACHMENT0$1 = 0x8CE0;
var GL_DEPTH_ATTACHMENT = 0x8D00;
var GL_STENCIL_ATTACHMENT = 0x8D20;
var GL_DEPTH_STENCIL_ATTACHMENT = 0x821A;
var GL_FRAMEBUFFER_COMPLETE$1 = 0x8CD5;
var GL_HALF_FLOAT_OES$1 = 0x8D61;
var GL_UNSIGNED_BYTE$5 = 0x1401;
var GL_FLOAT$4 = 0x1406;
var GL_RGB$1 = 0x1907;
var GL_RGBA$2 = 0x1908;
var textureFormatChannels = [];
textureFormatChannels[GL_RGBA$2] = 4;
textureFormatChannels[GL_RGB$1] = 3;
var textureTypeSizes = [];
textureTypeSizes[GL_UNSIGNED_BYTE$5] = 1;
textureTypeSizes[GL_FLOAT$4] = 4;
textureTypeSizes[GL_HALF_FLOAT_OES$1] = 2;
function wrapFBOState (
  gl,
  extensions,
  limits,
  textureState,
  renderbufferState,
  stats) {
  var framebufferState = {
    cur: null,
    next: null,
    dirty: false,
    setFBO: null
  };
  var colorTextureFormats = ['rgba'];
  var colorRenderbufferFormats = ['rgba4', 'rgb565', 'rgb5 a1'];
  if (extensions.ext_srgb) {
    colorRenderbufferFormats.push('srgba');
  }
  if (extensions.ext_color_buffer_half_float) {
    colorRenderbufferFormats.push('rgba16f', 'rgb16f');
  }
  if (extensions.webgl_color_buffer_float) {
    colorRenderbufferFormats.push('rgba32f');
  }
  if (extensions.oes_texture_half_float) ;
  if (extensions.oes_texture_float) ;
  function FramebufferAttachment (target, texture, renderbuffer) {
    this.target = target;
    this.texture = texture;
    this.renderbuffer = renderbuffer;
    var w = 0;
    var h = 0;
    if (texture) {
      w = texture.width;
      h = texture.height;
    } else if (renderbuffer) {
      w = renderbuffer.width;
      h = renderbuffer.height;
    }
    this.width = w;
    this.height = h;
  }
  function decRef (attachment) {
    if (attachment) {
      if (attachment.texture) {
        attachment.texture._texture.decRef();
      }
      if (attachment.renderbuffer) {
        attachment.renderbuffer._renderbuffer.decRef();
      }
    }
  }
  function incRefAndCheckShape (attachment, width, height) {
    if (!attachment) {
      return
    }
    if (attachment.texture) {
      var texture = attachment.texture._texture;
      var tw = Math.max(1, texture.width);
      var th = Math.max(1, texture.height);
      texture.refCount += 1;
    } else {
      var renderbuffer = attachment.renderbuffer._renderbuffer;
      renderbuffer.refCount += 1;
    }
  }
  function attach (location, attachment) {
    if (attachment) {
      if (attachment.texture) {
        gl.framebufferTexture2D(
          GL_FRAMEBUFFER$1,
          location,
          attachment.target,
          attachment.texture._texture.texture,
          0);
      } else {
        gl.framebufferRenderbuffer(
          GL_FRAMEBUFFER$1,
          location,
          GL_RENDERBUFFER$1,
          attachment.renderbuffer._renderbuffer.renderbuffer);
      }
    }
  }
  function parseAttachment (attachment) {
    var target = GL_TEXTURE_2D$2;
    var texture = null;
    var renderbuffer = null;
    var data = attachment;
    if (typeof attachment === 'object') {
      data = attachment.data;
      if ('target' in attachment) {
        target = attachment.target | 0;
      }
    }
    var type = data._reglType;
    if (type === 'texture2d') {
      texture = data;
    } else if (type === 'textureCube') {
      texture = data;
    } else if (type === 'renderbuffer') {
      renderbuffer = data;
      target = GL_RENDERBUFFER$1;
    }
    return new FramebufferAttachment(target, texture, renderbuffer)
  }
  function allocAttachment (
    width,
    height,
    isTexture,
    format,
    type) {
    if (isTexture) {
      var texture = textureState.create2D({
        width: width,
        height: height,
        format: format,
        type: type
      });
      texture._texture.refCount = 0;
      return new FramebufferAttachment(GL_TEXTURE_2D$2, texture, null)
    } else {
      var rb = renderbufferState.create({
        width: width,
        height: height,
        format: format
      });
      rb._renderbuffer.refCount = 0;
      return new FramebufferAttachment(GL_RENDERBUFFER$1, null, rb)
    }
  }
  function unwrapAttachment (attachment) {
    return attachment && (attachment.texture || attachment.renderbuffer)
  }
  function resizeAttachment (attachment, w, h) {
    if (attachment) {
      if (attachment.texture) {
        attachment.texture.resize(w, h);
      } else if (attachment.renderbuffer) {
        attachment.renderbuffer.resize(w, h);
      }
      attachment.width = w;
      attachment.height = h;
    }
  }
  var framebufferCount = 0;
  var framebufferSet = {};
  function REGLFramebuffer () {
    this.id = framebufferCount++;
    framebufferSet[this.id] = this;
    this.framebuffer = gl.createFramebuffer();
    this.width = 0;
    this.height = 0;
    this.colorAttachments = [];
    this.depthAttachment = null;
    this.stencilAttachment = null;
    this.depthStencilAttachment = null;
  }
  function decFBORefs (framebuffer) {
    framebuffer.colorAttachments.forEach(decRef);
    decRef(framebuffer.depthAttachment);
    decRef(framebuffer.stencilAttachment);
    decRef(framebuffer.depthStencilAttachment);
  }
  function destroy (framebuffer) {
    var handle = framebuffer.framebuffer;
    gl.deleteFramebuffer(handle);
    framebuffer.framebuffer = null;
    stats.framebufferCount--;
    delete framebufferSet[framebuffer.id];
  }
  function updateFramebuffer (framebuffer) {
    var i;
    gl.bindFramebuffer(GL_FRAMEBUFFER$1, framebuffer.framebuffer);
    var colorAttachments = framebuffer.colorAttachments;
    for (i = 0; i < colorAttachments.length; ++i) {
      attach(GL_COLOR_ATTACHMENT0$1 + i, colorAttachments[i]);
    }
    for (i = colorAttachments.length; i < limits.maxColorAttachments; ++i) {
      gl.framebufferTexture2D(
        GL_FRAMEBUFFER$1,
        GL_COLOR_ATTACHMENT0$1 + i,
        GL_TEXTURE_2D$2,
        null,
        0);
    }
    gl.framebufferTexture2D(
      GL_FRAMEBUFFER$1,
      GL_DEPTH_STENCIL_ATTACHMENT,
      GL_TEXTURE_2D$2,
      null,
      0);
    gl.framebufferTexture2D(
      GL_FRAMEBUFFER$1,
      GL_DEPTH_ATTACHMENT,
      GL_TEXTURE_2D$2,
      null,
      0);
    gl.framebufferTexture2D(
      GL_FRAMEBUFFER$1,
      GL_STENCIL_ATTACHMENT,
      GL_TEXTURE_2D$2,
      null,
      0);
    attach(GL_DEPTH_ATTACHMENT, framebuffer.depthAttachment);
    attach(GL_STENCIL_ATTACHMENT, framebuffer.stencilAttachment);
    attach(GL_DEPTH_STENCIL_ATTACHMENT, framebuffer.depthStencilAttachment);
    var status = gl.checkFramebufferStatus(GL_FRAMEBUFFER$1);
    if (!gl.isContextLost() && status !== GL_FRAMEBUFFER_COMPLETE$1) ;
    gl.bindFramebuffer(GL_FRAMEBUFFER$1, framebufferState.next ? framebufferState.next.framebuffer : null);
    framebufferState.cur = framebufferState.next;
    gl.getError();
  }
  function createFBO (a0, a1) {
    var framebuffer = new REGLFramebuffer();
    stats.framebufferCount++;
    function reglFramebuffer (a, b) {
      var i;
      var width = 0;
      var height = 0;
      var needsDepth = true;
      var needsStencil = true;
      var colorBuffer = null;
      var colorTexture = true;
      var colorFormat = 'rgba';
      var colorType = 'uint8';
      var colorCount = 1;
      var depthBuffer = null;
      var stencilBuffer = null;
      var depthStencilBuffer = null;
      var depthStencilTexture = false;
      if (typeof a === 'number') {
        width = a | 0;
        height = (b | 0) || width;
      } else if (!a) {
        width = height = 1;
      } else {
        var options = a;
        if ('shape' in options) {
          var shape = options.shape;
          width = shape[0];
          height = shape[1];
        } else {
          if ('radius' in options) {
            width = height = options.radius;
          }
          if ('width' in options) {
            width = options.width;
          }
          if ('height' in options) {
            height = options.height;
          }
        }
        if ('color' in options ||
            'colors' in options) {
          colorBuffer =
            options.color ||
            options.colors;
        }
        if (!colorBuffer) {
          if ('colorCount' in options) {
            colorCount = options.colorCount | 0;
          }
          if ('colorTexture' in options) {
            colorTexture = !!options.colorTexture;
            colorFormat = 'rgba4';
          }
          if ('colorType' in options) {
            colorType = options.colorType;
            if (!colorTexture) {
              if (colorType === 'half float' || colorType === 'float16') {
                colorFormat = 'rgba16f';
              } else if (colorType === 'float' || colorType === 'float32') {
                colorFormat = 'rgba32f';
              }
            }
          }
          if ('colorFormat' in options) {
            colorFormat = options.colorFormat;
            if (colorTextureFormats.indexOf(colorFormat) >= 0) {
              colorTexture = true;
            } else if (colorRenderbufferFormats.indexOf(colorFormat) >= 0) {
              colorTexture = false;
            }
          }
        }
        if ('depthTexture' in options || 'depthStencilTexture' in options) {
          depthStencilTexture = !!(options.depthTexture ||
            options.depthStencilTexture);
        }
        if ('depth' in options) {
          if (typeof options.depth === 'boolean') {
            needsDepth = options.depth;
          } else {
            depthBuffer = options.depth;
            needsStencil = false;
          }
        }
        if ('stencil' in options) {
          if (typeof options.stencil === 'boolean') {
            needsStencil = options.stencil;
          } else {
            stencilBuffer = options.stencil;
            needsDepth = false;
          }
        }
        if ('depthStencil' in options) {
          if (typeof options.depthStencil === 'boolean') {
            needsDepth = needsStencil = options.depthStencil;
          } else {
            depthStencilBuffer = options.depthStencil;
            needsDepth = false;
            needsStencil = false;
          }
        }
      }
      var colorAttachments = null;
      var depthAttachment = null;
      var stencilAttachment = null;
      var depthStencilAttachment = null;
      if (Array.isArray(colorBuffer)) {
        colorAttachments = colorBuffer.map(parseAttachment);
      } else if (colorBuffer) {
        colorAttachments = [parseAttachment(colorBuffer)];
      } else {
        colorAttachments = new Array(colorCount);
        for (i = 0; i < colorCount; ++i) {
          colorAttachments[i] = allocAttachment(
            width,
            height,
            colorTexture,
            colorFormat,
            colorType);
        }
      }
      width = width || colorAttachments[0].width;
      height = height || colorAttachments[0].height;
      if (depthBuffer) {
        depthAttachment = parseAttachment(depthBuffer);
      } else if (needsDepth && !needsStencil) {
        depthAttachment = allocAttachment(
          width,
          height,
          depthStencilTexture,
          'depth',
          'uint32');
      }
      if (stencilBuffer) {
        stencilAttachment = parseAttachment(stencilBuffer);
      } else if (needsStencil && !needsDepth) {
        stencilAttachment = allocAttachment(
          width,
          height,
          false,
          'stencil',
          'uint8');
      }
      if (depthStencilBuffer) {
        depthStencilAttachment = parseAttachment(depthStencilBuffer);
      } else if (!depthBuffer && !stencilBuffer && needsStencil && needsDepth) {
        depthStencilAttachment = allocAttachment(
          width,
          height,
          depthStencilTexture,
          'depth stencil',
          'depth stencil');
      }
      for (i = 0; i < colorAttachments.length; ++i) {
        incRefAndCheckShape(colorAttachments[i]);
        if (colorAttachments[i] && colorAttachments[i].texture) {
          var colorAttachmentSize =
              textureFormatChannels[colorAttachments[i].texture._texture.format] *
              textureTypeSizes[colorAttachments[i].texture._texture.type];
        }
      }
      incRefAndCheckShape(depthAttachment);
      incRefAndCheckShape(stencilAttachment);
      incRefAndCheckShape(depthStencilAttachment);
      decFBORefs(framebuffer);
      framebuffer.width = width;
      framebuffer.height = height;
      framebuffer.colorAttachments = colorAttachments;
      framebuffer.depthAttachment = depthAttachment;
      framebuffer.stencilAttachment = stencilAttachment;
      framebuffer.depthStencilAttachment = depthStencilAttachment;
      reglFramebuffer.color = colorAttachments.map(unwrapAttachment);
      reglFramebuffer.depth = unwrapAttachment(depthAttachment);
      reglFramebuffer.stencil = unwrapAttachment(stencilAttachment);
      reglFramebuffer.depthStencil = unwrapAttachment(depthStencilAttachment);
      reglFramebuffer.width = framebuffer.width;
      reglFramebuffer.height = framebuffer.height;
      updateFramebuffer(framebuffer);
      return reglFramebuffer
    }
    function resize (w_, h_) {
      var w = Math.max(w_ | 0, 1);
      var h = Math.max((h_ | 0) || w, 1);
      if (w === framebuffer.width && h === framebuffer.height) {
        return reglFramebuffer
      }
      var colorAttachments = framebuffer.colorAttachments;
      for (var i = 0; i < colorAttachments.length; ++i) {
        resizeAttachment(colorAttachments[i], w, h);
      }
      resizeAttachment(framebuffer.depthAttachment, w, h);
      resizeAttachment(framebuffer.stencilAttachment, w, h);
      resizeAttachment(framebuffer.depthStencilAttachment, w, h);
      framebuffer.width = reglFramebuffer.width = w;
      framebuffer.height = reglFramebuffer.height = h;
      updateFramebuffer(framebuffer);
      return reglFramebuffer
    }
    reglFramebuffer(a0, a1);
    return extend(reglFramebuffer, {
      resize: resize,
      _reglType: 'framebuffer',
      _framebuffer: framebuffer,
      destroy: function () {
        destroy(framebuffer);
        decFBORefs(framebuffer);
      },
      use: function (block) {
        framebufferState.setFBO({
          framebuffer: reglFramebuffer
        }, block);
      }
    })
  }
  function createCubeFBO (options) {
    var faces = Array(6);
    function reglFramebufferCube (a) {
      var i;
      var params = {
        color: null
      };
      var radius = 0;
      var colorBuffer = null;
      var colorFormat = 'rgba';
      var colorType = 'uint8';
      var colorCount = 1;
      if (typeof a === 'number') {
        radius = a | 0;
      } else if (!a) {
        radius = 1;
      } else {
        var options = a;
        if ('shape' in options) {
          var shape = options.shape;
          radius = shape[0];
        } else {
          if ('radius' in options) {
            radius = options.radius | 0;
          }
          if ('width' in options) {
            radius = options.width | 0;
          } else if ('height' in options) {
            radius = options.height | 0;
          }
        }
        if ('color' in options ||
            'colors' in options) {
          colorBuffer =
            options.color ||
            options.colors;
        }
        if (!colorBuffer) {
          if ('colorCount' in options) {
            colorCount = options.colorCount | 0;
          }
          if ('colorType' in options) {
            colorType = options.colorType;
          }
          if ('colorFormat' in options) {
            colorFormat = options.colorFormat;
          }
        }
        if ('depth' in options) {
          params.depth = options.depth;
        }
        if ('stencil' in options) {
          params.stencil = options.stencil;
        }
        if ('depthStencil' in options) {
          params.depthStencil = options.depthStencil;
        }
      }
      var colorCubes;
      if (colorBuffer) {
        if (Array.isArray(colorBuffer)) {
          colorCubes = [];
          for (i = 0; i < colorBuffer.length; ++i) {
            colorCubes[i] = colorBuffer[i];
          }
        } else {
          colorCubes = [ colorBuffer ];
        }
      } else {
        colorCubes = Array(colorCount);
        var cubeMapParams = {
          radius: radius,
          format: colorFormat,
          type: colorType
        };
        for (i = 0; i < colorCount; ++i) {
          colorCubes[i] = textureState.createCube(cubeMapParams);
        }
      }
      params.color = Array(colorCubes.length);
      for (i = 0; i < colorCubes.length; ++i) {
        var cube = colorCubes[i];
        radius = radius || cube.width;
        params.color[i] = {
          target: GL_TEXTURE_CUBE_MAP_POSITIVE_X$2,
          data: colorCubes[i]
        };
      }
      for (i = 0; i < 6; ++i) {
        for (var j = 0; j < colorCubes.length; ++j) {
          params.color[j].target = GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 + i;
        }
        if (i > 0) {
          params.depth = faces[0].depth;
          params.stencil = faces[0].stencil;
          params.depthStencil = faces[0].depthStencil;
        }
        if (faces[i]) {
          (faces[i])(params);
        } else {
          faces[i] = createFBO(params);
        }
      }
      return extend(reglFramebufferCube, {
        width: radius,
        height: radius,
        color: colorCubes
      })
    }
    function resize (radius_) {
      var i;
      var radius = radius_ | 0;
      if (radius === reglFramebufferCube.width) {
        return reglFramebufferCube
      }
      var colors = reglFramebufferCube.color;
      for (i = 0; i < colors.length; ++i) {
        colors[i].resize(radius);
      }
      for (i = 0; i < 6; ++i) {
        faces[i].resize(radius);
      }
      reglFramebufferCube.width = reglFramebufferCube.height = radius;
      return reglFramebufferCube
    }
    reglFramebufferCube(options);
    return extend(reglFramebufferCube, {
      faces: faces,
      resize: resize,
      _reglType: 'framebufferCube',
      destroy: function () {
        faces.forEach(function (f) {
          f.destroy();
        });
      }
    })
  }
  function restoreFramebuffers () {
    framebufferState.cur = null;
    framebufferState.next = null;
    framebufferState.dirty = true;
    values(framebufferSet).forEach(function (fb) {
      fb.framebuffer = gl.createFramebuffer();
      updateFramebuffer(fb);
    });
  }
  return extend(framebufferState, {
    getFramebuffer: function (object) {
      if (typeof object === 'function' && object._reglType === 'framebuffer') {
        var fbo = object._framebuffer;
        if (fbo instanceof REGLFramebuffer) {
          return fbo
        }
      }
      return null
    },
    create: createFBO,
    createCube: createCubeFBO,
    clear: function () {
      values(framebufferSet).forEach(destroy);
    },
    restore: restoreFramebuffers
  })
}
var GL_FLOAT$5 = 5126;
var GL_ARRAY_BUFFER$1 = 34962;
function AttributeRecord () {
  this.state = 0;
  this.x = 0.0;
  this.y = 0.0;
  this.z = 0.0;
  this.w = 0.0;
  this.buffer = null;
  this.size = 0;
  this.normalized = false;
  this.type = GL_FLOAT$5;
  this.offset = 0;
  this.stride = 0;
  this.divisor = 0;
}
function wrapAttributeState (
  gl,
  extensions,
  limits,
  stats,
  bufferState) {
  var NUM_ATTRIBUTES = limits.maxAttributes;
  var attributeBindings = new Array(NUM_ATTRIBUTES);
  for (var i = 0; i < NUM_ATTRIBUTES; ++i) {
    attributeBindings[i] = new AttributeRecord();
  }
  var vaoCount = 0;
  var vaoSet = {};
  var state = {
    Record: AttributeRecord,
    scope: {},
    state: attributeBindings,
    currentVAO: null,
    targetVAO: null,
    restore: extVAO() ? restoreVAO : function () {},
    createVAO: createVAO,
    getVAO: getVAO,
    destroyBuffer: destroyBuffer,
    setVAO: extVAO() ? setVAOEXT : setVAOEmulated,
    clear: extVAO() ? destroyVAOEXT : function () {}
  };
  function destroyBuffer (buffer) {
    for (var i = 0; i < attributeBindings.length; ++i) {
      var record = attributeBindings[i];
      if (record.buffer === buffer) {
        gl.disableVertexAttribArray(i);
        record.buffer = null;
      }
    }
  }
  function extVAO () {
    return extensions.oes_vertex_array_object
  }
  function extInstanced () {
    return extensions.angle_instanced_arrays
  }
  function getVAO (vao) {
    if (typeof vao === 'function' && vao._vao) {
      return vao._vao
    }
    return null
  }
  function setVAOEXT (vao) {
    if (vao === state.currentVAO) {
      return
    }
    var ext = extVAO();
    if (vao) {
      ext.bindVertexArrayOES(vao.vao);
    } else {
      ext.bindVertexArrayOES(null);
    }
    state.currentVAO = vao;
  }
  function setVAOEmulated (vao) {
    if (vao === state.currentVAO) {
      return
    }
    if (vao) {
      vao.bindAttrs();
    } else {
      var exti = extInstanced();
      for (let i = 0; i < attributeBindings.length; ++i) {
        var binding = attributeBindings[i];
        if (binding.buffer) {
          gl.enableVertexAttribArray(i);
          gl.vertexAttribPointer(i, binding.size, binding.type, binding.normalized, binding.stride, binding.offfset);
          if (exti) {
            exti.vertexAttribDivisorANGLE(i, binding.divisor);
          }
        } else {
          gl.disableVertexAttribArray(i);
          gl.vertexAttrib4f(i, binding.x, binding.y, binding.z, binding.w);
        }
      }
    }
    state.currentVAO = vao;
  }
  function destroyVAOEXT (vao) {
    values(vaoSet).forEach((vao) => {
      vao.destroy();
    });
  }
  function REGLVAO () {
    this.id = ++vaoCount;
    this.attributes = [];
    var extension = extVAO();
    if (extension) {
      this.vao = extension.createVertexArrayOES();
    } else {
      this.vao = null;
    }
    vaoSet[this.id] = this;
    this.buffers = [];
  }
  REGLVAO.prototype.bindAttrs = function () {
    var exti = extInstanced();
    var attributes = this.attributes;
    for (var i = 0; i < attributes.length; ++i) {
      var attr = attributes[i];
      if (attr.buffer) {
        gl.enableVertexAttribArray(i);
        gl.bindBuffer(GL_ARRAY_BUFFER$1, attr.buffer.buffer);
        gl.vertexAttribPointer(i, attr.size, attr.type, attr.normalized, attr.stride, attr.offset);
        if (exti) {
          exti.vertexAttribDivisorANGLE(i, attr.divisor);
        }
      } else {
        gl.disableVertexAttribArray(i);
        gl.vertexAttrib4f(i, attr.x, attr.y, attr.z, attr.w);
      }
    }
    for (var j = attributes.length; j < NUM_ATTRIBUTES; ++j) {
      gl.disableVertexAttribArray(j);
    }
  };
  REGLVAO.prototype.refresh = function () {
    var ext = extVAO();
    if (ext) {
      ext.bindVertexArrayOES(this.vao);
      this.bindAttrs();
      state.currentVAO = this;
    }
  };
  REGLVAO.prototype.destroy = function () {
    if (this.vao) {
      var extension = extVAO();
      if (this === state.currentVAO) {
        state.currentVAO = null;
        extension.bindVertexArrayOES(null);
      }
      extension.deleteVertexArrayOES(this.vao);
      this.vao = null;
    }
    if (vaoSet[this.id]) {
      delete vaoSet[this.id];
      stats.vaoCount -= 1;
    }
  };
  function restoreVAO () {
    var ext = extVAO();
    if (ext) {
      values(vaoSet).forEach(function (vao) {
        vao.refresh();
      });
    }
  }
  function createVAO (_attr) {
    var vao = new REGLVAO();
    stats.vaoCount += 1;
    function updateVAO (attributes) {
      for (var j = 0; j < vao.buffers.length; ++j) {
        vao.buffers[j].destroy();
      }
      vao.buffers.length = 0;
      var nattributes = vao.attributes;
      nattributes.length = attributes.length;
      for (var i = 0; i < attributes.length; ++i) {
        var spec = attributes[i];
        var rec = nattributes[i] = new AttributeRecord();
        if (Array.isArray(spec) || isTypedArray(spec) || isNDArrayLike(spec)) {
          var buf = bufferState.create(spec, GL_ARRAY_BUFFER$1, false, true);
          rec.buffer = bufferState.getBuffer(buf);
          rec.size = rec.buffer.dimension | 0;
          rec.normalized = false;
          rec.type = rec.buffer.dtype;
          rec.offset = 0;
          rec.stride = 0;
          rec.divisor = 0;
          rec.state = 1;
          vao.buffers.push(buf);
        } else if (bufferState.getBuffer(spec)) {
          rec.buffer = bufferState.getBuffer(spec);
          rec.size = rec.buffer.dimension | 0;
          rec.normalized = false;
          rec.type = rec.buffer.dtype;
          rec.offset = 0;
          rec.stride = 0;
          rec.divisor = 0;
          rec.state = 1;
        } else if (bufferState.getBuffer(spec.buffer)) {
          rec.buffer = bufferState.getBuffer(spec.buffer);
          rec.size = ((+spec.size) || rec.buffer.dimension) | 0;
          rec.normalized = !!spec.normalized || false;
          if ('type' in spec) {
            rec.type = glTypes[spec.type];
          } else {
            rec.type = rec.buffer.dtype;
          }
          rec.offset = (spec.offset || 0) | 0;
          rec.stride = (spec.stride || 0) | 0;
          rec.divisor = (spec.divisor || 0) | 0;
          rec.state = 1;
        } else if ('x' in spec) {
          rec.x = +spec.x || 0;
          rec.y = +spec.y || 0;
          rec.z = +spec.z || 0;
          rec.w = +spec.w || 0;
          rec.state = 2;
        }
      }
      vao.refresh();
      return updateVAO
    }
    updateVAO.destroy = function () {
      vao.destroy();
    };
    updateVAO._vao = vao;
    updateVAO._reglType = 'vao';
    return updateVAO(_attr)
  }
  return state
}
var GL_FRAGMENT_SHADER = 35632;
var GL_VERTEX_SHADER = 35633;
var GL_ACTIVE_UNIFORMS = 0x8B86;
var GL_ACTIVE_ATTRIBUTES = 0x8B89;
function wrapShaderState (gl, stringStore, stats, config) {
  var fragShaders = {};
  var vertShaders = {};
  function ActiveInfo (name, id, location, info) {
    this.name = name;
    this.id = id;
    this.location = location;
    this.info = info;
  }
  function insertActiveInfo (list, info) {
    for (var i = 0; i < list.length; ++i) {
      if (list[i].id === info.id) {
        list[i].location = info.location;
        return
      }
    }
    list.push(info);
  }
  function getShader (type, id, command) {
    var cache = type === GL_FRAGMENT_SHADER ? fragShaders : vertShaders;
    var shader = cache[id];
    if (!shader) {
      var source = stringStore.str(id);
      shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      cache[id] = shader;
    }
    return shader
  }
  var programCache = {};
  var programList = [];
  var PROGRAM_COUNTER = 0;
  function REGLProgram (fragId, vertId) {
    this.id = PROGRAM_COUNTER++;
    this.fragId = fragId;
    this.vertId = vertId;
    this.program = null;
    this.uniforms = [];
    this.attributes = [];
    if (config.profile) {
      this.stats = {
        uniformsCount: 0,
        attributesCount: 0
      };
    }
  }
  function linkProgram (desc, command, attributeLocations) {
    var i, info;
    var fragShader = getShader(GL_FRAGMENT_SHADER, desc.fragId);
    var vertShader = getShader(GL_VERTEX_SHADER, desc.vertId);
    var program = desc.program = gl.createProgram();
    gl.attachShader(program, fragShader);
    gl.attachShader(program, vertShader);
    if (attributeLocations) {
      for (let i = 0; i < attributeLocations.length; ++i) {
        var binding = attributeLocations[i];
        gl.bindAttribLocation(program, binding[0], binding[1]);
      }
    }
    gl.linkProgram(program);
    var numUniforms = gl.getProgramParameter(program, GL_ACTIVE_UNIFORMS);
    if (config.profile) {
      desc.stats.uniformsCount = numUniforms;
    }
    var uniforms = desc.uniforms;
    for (i = 0; i < numUniforms; ++i) {
      info = gl.getActiveUniform(program, i);
      if (info) {
        if (info.size > 1) {
          for (var j = 0; j < info.size; ++j) {
            var name = info.name.replace('[0]', '[' + j + ']');
            insertActiveInfo(uniforms, new ActiveInfo(
              name,
              stringStore.id(name),
              gl.getUniformLocation(program, name),
              info));
          }
        } else {
          insertActiveInfo(uniforms, new ActiveInfo(
            info.name,
            stringStore.id(info.name),
            gl.getUniformLocation(program, info.name),
            info));
        }
      }
    }
    var numAttributes = gl.getProgramParameter(program, GL_ACTIVE_ATTRIBUTES);
    if (config.profile) {
      desc.stats.attributesCount = numAttributes;
    }
    var attributes = desc.attributes;
    for (i = 0; i < numAttributes; ++i) {
      info = gl.getActiveAttrib(program, i);
      if (info) {
        insertActiveInfo(attributes, new ActiveInfo(
          info.name,
          stringStore.id(info.name),
          gl.getAttribLocation(program, info.name),
          info));
      }
    }
  }
  if (config.profile) {
    stats.getMaxUniformsCount = function () {
      var m = 0;
      programList.forEach(function (desc) {
        if (desc.stats.uniformsCount > m) {
          m = desc.stats.uniformsCount;
        }
      });
      return m
    };
    stats.getMaxAttributesCount = function () {
      var m = 0;
      programList.forEach(function (desc) {
        if (desc.stats.attributesCount > m) {
          m = desc.stats.attributesCount;
        }
      });
      return m
    };
  }
  function restoreShaders () {
    fragShaders = {};
    vertShaders = {};
    for (var i = 0; i < programList.length; ++i) {
      linkProgram(programList[i], null, programList[i].attributes.map(function (info) {
        return [info.location, info.name]
      }));
    }
  }
  return {
    clear: function () {
      var deleteShader = gl.deleteShader.bind(gl);
      values(fragShaders).forEach(deleteShader);
      fragShaders = {};
      values(vertShaders).forEach(deleteShader);
      vertShaders = {};
      programList.forEach(function (desc) {
        gl.deleteProgram(desc.program);
      });
      programList.length = 0;
      programCache = {};
      stats.shaderCount = 0;
    },
    program: function (vertId, fragId, command, attribLocations) {
      var cache = programCache[fragId];
      if (!cache) {
        cache = programCache[fragId] = {};
      }
      var prevProgram = cache[vertId];
      if (prevProgram && !attribLocations) {
        return prevProgram
      }
      var program = new REGLProgram(fragId, vertId);
      stats.shaderCount++;
      linkProgram(program, command, attribLocations);
      if (!prevProgram) {
        cache[vertId] = program;
      }
      programList.push(program);
      return program
    },
    restore: restoreShaders,
    shader: getShader,
    frag: -1,
    vert: -1
  }
}
var GL_RGBA$3 = 6408;
var GL_UNSIGNED_BYTE$6 = 5121;
var GL_PACK_ALIGNMENT = 0x0D05;
var GL_FLOAT$6 = 0x1406;
function wrapReadPixels (
  gl,
  framebufferState,
  reglPoll,
  context,
  glAttributes,
  extensions,
  limits) {
  function readPixelsImpl (input) {
    var type;
    if (framebufferState.next === null) {
      type = GL_UNSIGNED_BYTE$6;
    } else {
      type = framebufferState.next.colorAttachments[0].texture._texture.type;
      if (extensions.oes_texture_float) ;
    }
    var x = 0;
    var y = 0;
    var width = context.framebufferWidth;
    var height = context.framebufferHeight;
    var data = null;
    if (isTypedArray(input)) {
      data = input;
    } else if (input) {
      x = input.x | 0;
      y = input.y | 0;
      width = (input.width || (context.framebufferWidth - x)) | 0;
      height = (input.height || (context.framebufferHeight - y)) | 0;
      data = input.data || null;
    }
    reglPoll();
    var size = width * height * 4;
    if (!data) {
      if (type === GL_UNSIGNED_BYTE$6) {
        data = new Uint8Array(size);
      } else if (type === GL_FLOAT$6) {
        data = data || new Float32Array(size);
      }
    }
    gl.pixelStorei(GL_PACK_ALIGNMENT, 4);
    gl.readPixels(x, y, width, height, GL_RGBA$3,
      type,
      data);
    return data
  }
  function readPixelsFBO (options) {
    var result;
    framebufferState.setFBO({
      framebuffer: options.framebuffer
    }, function () {
      result = readPixelsImpl(options);
    });
    return result
  }
  function readPixels (options) {
    if (!options || !('framebuffer' in options)) {
      return readPixelsImpl(options)
    } else {
      return readPixelsFBO(options)
    }
  }
  return readPixels
}
function slice (x) {
  return Array.prototype.slice.call(x)
}
function join (x) {
  return slice(x).join('')
}
function createEnvironment () {
  var varCounter = 0;
  var linkedNames = [];
  var linkedValues = [];
  function link (value) {
    for (var i = 0; i < linkedValues.length; ++i) {
      if (linkedValues[i] === value) {
        return linkedNames[i]
      }
    }
    var name = 'g' + (varCounter++);
    linkedNames.push(name);
    linkedValues.push(value);
    return name
  }
  function block () {
    var code = [];
    function push () {
      code.push.apply(code, slice(arguments));
    }
    var vars = [];
    function def () {
      var name = 'v' + (varCounter++);
      vars.push(name);
      if (arguments.length > 0) {
        code.push(name, '=');
        code.push.apply(code, slice(arguments));
        code.push(';');
      }
      return name
    }
    return extend(push, {
      def: def,
      toString: function () {
        return join([
          (vars.length > 0 ? 'var ' + vars.join(',') + ';' : ''),
          join(code)
        ])
      }
    })
  }
  function scope () {
    var entry = block();
    var exit = block();
    var entryToString = entry.toString;
    var exitToString = exit.toString;
    function save (object, prop) {
      exit(object, prop, '=', entry.def(object, prop), ';');
    }
    return extend(function () {
      entry.apply(entry, slice(arguments));
    }, {
      def: entry.def,
      entry: entry,
      exit: exit,
      save: save,
      set: function (object, prop, value) {
        save(object, prop);
        entry(object, prop, '=', value, ';');
      },
      toString: function () {
        return entryToString() + exitToString()
      }
    })
  }
  function conditional () {
    var pred = join(arguments);
    var thenBlock = scope();
    var elseBlock = scope();
    var thenToString = thenBlock.toString;
    var elseToString = elseBlock.toString;
    return extend(thenBlock, {
      then: function () {
        thenBlock.apply(thenBlock, slice(arguments));
        return this
      },
      else: function () {
        elseBlock.apply(elseBlock, slice(arguments));
        return this
      },
      toString: function () {
        var elseClause = elseToString();
        if (elseClause) {
          elseClause = 'else{' + elseClause + '}';
        }
        return join([
          'if(', pred, '){',
          thenToString(),
          '}', elseClause
        ])
      }
    })
  }
  var globalBlock = block();
  var procedures = {};
  function proc (name, count) {
    var args = [];
    function arg () {
      var name = 'a' + args.length;
      args.push(name);
      return name
    }
    count = count || 0;
    for (var i = 0; i < count; ++i) {
      arg();
    }
    var body = scope();
    var bodyToString = body.toString;
    var result = procedures[name] = extend(body, {
      arg: arg,
      toString: function () {
        return join([
          'function(', args.join(), '){',
          bodyToString(),
          '}'
        ])
      }
    });
    return result
  }
  function compile () {
    var code = ['"use strict";',
      globalBlock,
      'return {'];
    Object.keys(procedures).forEach(function (name) {
      code.push('"', name, '":', procedures[name].toString(), ',');
    });
    code.push('}');
    var src = join(code)
      .replace(/;/g, ';\n')
      .replace(/}/g, '}\n')
      .replace(/{/g, '{\n');
    var proc = Function.apply(null, linkedNames.concat(src));
    return proc.apply(null, linkedValues)
  }
  return {
    global: globalBlock,
    link: link,
    block: block,
    proc: proc,
    scope: scope,
    cond: conditional,
    compile: compile
  }
}
var CUTE_COMPONENTS = 'xyzw'.split('');
var GL_UNSIGNED_BYTE$7 = 5121;
var ATTRIB_STATE_POINTER = 1;
var ATTRIB_STATE_CONSTANT = 2;
var DYN_FUNC$1 = 0;
var DYN_PROP$1 = 1;
var DYN_CONTEXT$1 = 2;
var DYN_STATE$1 = 3;
var DYN_THUNK = 4;
var S_DITHER = 'dither';
var S_BLEND_ENABLE = 'blend.enable';
var S_BLEND_COLOR = 'blend.color';
var S_BLEND_EQUATION = 'blend.equation';
var S_BLEND_FUNC = 'blend.func';
var S_DEPTH_ENABLE = 'depth.enable';
var S_DEPTH_FUNC = 'depth.func';
var S_DEPTH_RANGE = 'depth.range';
var S_DEPTH_MASK = 'depth.mask';
var S_COLOR_MASK = 'colorMask';
var S_CULL_ENABLE = 'cull.enable';
var S_CULL_FACE = 'cull.face';
var S_FRONT_FACE = 'frontFace';
var S_LINE_WIDTH = 'lineWidth';
var S_POLYGON_OFFSET_ENABLE = 'polygonOffset.enable';
var S_POLYGON_OFFSET_OFFSET = 'polygonOffset.offset';
var S_SAMPLE_ALPHA = 'sample.alpha';
var S_SAMPLE_ENABLE = 'sample.enable';
var S_SAMPLE_COVERAGE = 'sample.coverage';
var S_STENCIL_ENABLE = 'stencil.enable';
var S_STENCIL_MASK = 'stencil.mask';
var S_STENCIL_FUNC = 'stencil.func';
var S_STENCIL_OPFRONT = 'stencil.opFront';
var S_STENCIL_OPBACK = 'stencil.opBack';
var S_SCISSOR_ENABLE = 'scissor.enable';
var S_SCISSOR_BOX = 'scissor.box';
var S_VIEWPORT = 'viewport';
var S_PROFILE = 'profile';
var S_FRAMEBUFFER = 'framebuffer';
var S_VERT = 'vert';
var S_FRAG = 'frag';
var S_ELEMENTS = 'elements';
var S_PRIMITIVE = 'primitive';
var S_COUNT = 'count';
var S_OFFSET = 'offset';
var S_INSTANCES = 'instances';
var S_VAO = 'vao';
var SUFFIX_WIDTH = 'Width';
var SUFFIX_HEIGHT = 'Height';
var S_FRAMEBUFFER_WIDTH = S_FRAMEBUFFER + SUFFIX_WIDTH;
var S_FRAMEBUFFER_HEIGHT = S_FRAMEBUFFER + SUFFIX_HEIGHT;
var S_VIEWPORT_WIDTH = S_VIEWPORT + SUFFIX_WIDTH;
var S_VIEWPORT_HEIGHT = S_VIEWPORT + SUFFIX_HEIGHT;
var S_DRAWINGBUFFER = 'drawingBuffer';
var S_DRAWINGBUFFER_WIDTH = S_DRAWINGBUFFER + SUFFIX_WIDTH;
var S_DRAWINGBUFFER_HEIGHT = S_DRAWINGBUFFER + SUFFIX_HEIGHT;
var NESTED_OPTIONS = [
  S_BLEND_FUNC,
  S_BLEND_EQUATION,
  S_STENCIL_FUNC,
  S_STENCIL_OPFRONT,
  S_STENCIL_OPBACK,
  S_SAMPLE_COVERAGE,
  S_VIEWPORT,
  S_SCISSOR_BOX,
  S_POLYGON_OFFSET_OFFSET
];
var GL_ARRAY_BUFFER$2 = 34962;
var GL_ELEMENT_ARRAY_BUFFER$1 = 34963;
var GL_CULL_FACE = 0x0B44;
var GL_BLEND = 0x0BE2;
var GL_DITHER = 0x0BD0;
var GL_STENCIL_TEST = 0x0B90;
var GL_DEPTH_TEST = 0x0B71;
var GL_SCISSOR_TEST = 0x0C11;
var GL_POLYGON_OFFSET_FILL = 0x8037;
var GL_SAMPLE_ALPHA_TO_COVERAGE = 0x809E;
var GL_SAMPLE_COVERAGE = 0x80A0;
var GL_FLOAT$7 = 5126;
var GL_FLOAT_VEC2 = 35664;
var GL_FLOAT_VEC3 = 35665;
var GL_FLOAT_VEC4 = 35666;
var GL_INT$2 = 5124;
var GL_INT_VEC2 = 35667;
var GL_INT_VEC3 = 35668;
var GL_INT_VEC4 = 35669;
var GL_BOOL = 35670;
var GL_BOOL_VEC2 = 35671;
var GL_BOOL_VEC3 = 35672;
var GL_BOOL_VEC4 = 35673;
var GL_FLOAT_MAT2 = 35674;
var GL_FLOAT_MAT3 = 35675;
var GL_FLOAT_MAT4 = 35676;
var GL_SAMPLER_2D = 35678;
var GL_SAMPLER_CUBE = 35680;
var GL_TRIANGLES$1 = 4;
var GL_FRONT = 1028;
var GL_BACK = 1029;
var GL_CW = 0x0900;
var GL_CCW = 0x0901;
var GL_MIN_EXT = 0x8007;
var GL_MAX_EXT = 0x8008;
var GL_ALWAYS = 519;
var GL_KEEP = 7680;
var GL_ZERO = 0;
var GL_ONE = 1;
var GL_FUNC_ADD = 0x8006;
var GL_LESS = 513;
var GL_FRAMEBUFFER$2 = 0x8D40;
var GL_COLOR_ATTACHMENT0$2 = 0x8CE0;
var blendFuncs = {
  '0': 0,
  '1': 1,
  'zero': 0,
  'one': 1,
  'src color': 768,
  'one minus src color': 769,
  'src alpha': 770,
  'one minus src alpha': 771,
  'dst color': 774,
  'one minus dst color': 775,
  'dst alpha': 772,
  'one minus dst alpha': 773,
  'constant color': 32769,
  'one minus constant color': 32770,
  'constant alpha': 32771,
  'one minus constant alpha': 32772,
  'src alpha saturate': 776
};
var compareFuncs = {
  'never': 512,
  'less': 513,
  '<': 513,
  'equal': 514,
  '=': 514,
  '==': 514,
  '===': 514,
  'lequal': 515,
  '<=': 515,
  'greater': 516,
  '>': 516,
  'notequal': 517,
  '!=': 517,
  '!==': 517,
  'gequal': 518,
  '>=': 518,
  'always': 519
};
var stencilOps = {
  '0': 0,
  'zero': 0,
  'keep': 7680,
  'replace': 7681,
  'increment': 7682,
  'decrement': 7683,
  'increment wrap': 34055,
  'decrement wrap': 34056,
  'invert': 5386
};
var orientationType = {
  'cw': GL_CW,
  'ccw': GL_CCW
};
function isBufferArgs (x) {
  return Array.isArray(x) ||
    isTypedArray(x) ||
    isNDArrayLike(x)
}
function sortState (state) {
  return state.sort(function (a, b) {
    if (a === S_VIEWPORT) {
      return -1
    } else if (b === S_VIEWPORT) {
      return 1
    }
    return (a < b) ? -1 : 1
  })
}
function Declaration (thisDep, contextDep, propDep, append) {
  this.thisDep = thisDep;
  this.contextDep = contextDep;
  this.propDep = propDep;
  this.append = append;
}
function isStatic (decl) {
  return decl && !(decl.thisDep || decl.contextDep || decl.propDep)
}
function createStaticDecl (append) {
  return new Declaration(false, false, false, append)
}
function createDynamicDecl (dyn, append) {
  var type = dyn.type;
  if (type === DYN_FUNC$1) {
    var numArgs = dyn.data.length;
    return new Declaration(
      true,
      numArgs >= 1,
      numArgs >= 2,
      append)
  } else if (type === DYN_THUNK) {
    var data = dyn.data;
    return new Declaration(
      data.thisDep,
      data.contextDep,
      data.propDep,
      append)
  } else {
    return new Declaration(
      type === DYN_STATE$1,
      type === DYN_CONTEXT$1,
      type === DYN_PROP$1,
      append)
  }
}
var SCOPE_DECL = new Declaration(false, false, false, function () {});
function reglCore (
  gl,
  stringStore,
  extensions,
  limits,
  bufferState,
  elementState,
  textureState,
  framebufferState,
  uniformState,
  attributeState,
  shaderState,
  drawState,
  contextState,
  timer,
  config) {
  var AttributeRecord = attributeState.Record;
  var blendEquations = {
    'add': 32774,
    'subtract': 32778,
    'reverse subtract': 32779
  };
  if (extensions.ext_blend_minmax) {
    blendEquations.min = GL_MIN_EXT;
    blendEquations.max = GL_MAX_EXT;
  }
  var extInstancing = extensions.angle_instanced_arrays;
  var extDrawBuffers = extensions.webgl_draw_buffers;
  var currentState = {
    dirty: true,
    profile: config.profile
  };
  var nextState = {};
  var GL_STATE_NAMES = [];
  var GL_FLAGS = {};
  var GL_VARIABLES = {};
  function propName (name) {
    return name.replace('.', '_')
  }
  function stateFlag (sname, cap, init) {
    var name = propName(sname);
    GL_STATE_NAMES.push(sname);
    nextState[name] = currentState[name] = !!init;
    GL_FLAGS[name] = cap;
  }
  function stateVariable (sname, func, init) {
    var name = propName(sname);
    GL_STATE_NAMES.push(sname);
    if (Array.isArray(init)) {
      currentState[name] = init.slice();
      nextState[name] = init.slice();
    } else {
      currentState[name] = nextState[name] = init;
    }
    GL_VARIABLES[name] = func;
  }
  stateFlag(S_DITHER, GL_DITHER);
  stateFlag(S_BLEND_ENABLE, GL_BLEND);
  stateVariable(S_BLEND_COLOR, 'blendColor', [0, 0, 0, 0]);
  stateVariable(S_BLEND_EQUATION, 'blendEquationSeparate',
    [GL_FUNC_ADD, GL_FUNC_ADD]);
  stateVariable(S_BLEND_FUNC, 'blendFuncSeparate',
    [GL_ONE, GL_ZERO, GL_ONE, GL_ZERO]);
  stateFlag(S_DEPTH_ENABLE, GL_DEPTH_TEST, true);
  stateVariable(S_DEPTH_FUNC, 'depthFunc', GL_LESS);
  stateVariable(S_DEPTH_RANGE, 'depthRange', [0, 1]);
  stateVariable(S_DEPTH_MASK, 'depthMask', true);
  stateVariable(S_COLOR_MASK, S_COLOR_MASK, [true, true, true, true]);
  stateFlag(S_CULL_ENABLE, GL_CULL_FACE);
  stateVariable(S_CULL_FACE, 'cullFace', GL_BACK);
  stateVariable(S_FRONT_FACE, S_FRONT_FACE, GL_CCW);
  stateVariable(S_LINE_WIDTH, S_LINE_WIDTH, 1);
  stateFlag(S_POLYGON_OFFSET_ENABLE, GL_POLYGON_OFFSET_FILL);
  stateVariable(S_POLYGON_OFFSET_OFFSET, 'polygonOffset', [0, 0]);
  stateFlag(S_SAMPLE_ALPHA, GL_SAMPLE_ALPHA_TO_COVERAGE);
  stateFlag(S_SAMPLE_ENABLE, GL_SAMPLE_COVERAGE);
  stateVariable(S_SAMPLE_COVERAGE, 'sampleCoverage', [1, false]);
  stateFlag(S_STENCIL_ENABLE, GL_STENCIL_TEST);
  stateVariable(S_STENCIL_MASK, 'stencilMask', -1);
  stateVariable(S_STENCIL_FUNC, 'stencilFunc', [GL_ALWAYS, 0, -1]);
  stateVariable(S_STENCIL_OPFRONT, 'stencilOpSeparate',
    [GL_FRONT, GL_KEEP, GL_KEEP, GL_KEEP]);
  stateVariable(S_STENCIL_OPBACK, 'stencilOpSeparate',
    [GL_BACK, GL_KEEP, GL_KEEP, GL_KEEP]);
  stateFlag(S_SCISSOR_ENABLE, GL_SCISSOR_TEST);
  stateVariable(S_SCISSOR_BOX, 'scissor',
    [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]);
  stateVariable(S_VIEWPORT, S_VIEWPORT,
    [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]);
  var sharedState = {
    gl: gl,
    context: contextState,
    strings: stringStore,
    next: nextState,
    current: currentState,
    draw: drawState,
    elements: elementState,
    buffer: bufferState,
    shader: shaderState,
    attributes: attributeState.state,
    vao: attributeState,
    uniforms: uniformState,
    framebuffer: framebufferState,
    extensions: extensions,
    timer: timer,
    isBufferArgs: isBufferArgs
  };
  var sharedConstants = {
    primTypes: primTypes,
    compareFuncs: compareFuncs,
    blendFuncs: blendFuncs,
    blendEquations: blendEquations,
    stencilOps: stencilOps,
    glTypes: glTypes,
    orientationType: orientationType
  };
  if (extDrawBuffers) {
    sharedConstants.backBuffer = [GL_BACK];
    sharedConstants.drawBuffer = loop(limits.maxDrawbuffers, function (i) {
      if (i === 0) {
        return [0]
      }
      return loop(i, function (j) {
        return GL_COLOR_ATTACHMENT0$2 + j
      })
    });
  }
  var drawCallCounter = 0;
  function createREGLEnvironment () {
    var env = createEnvironment();
    var link = env.link;
    var global = env.global;
    env.id = drawCallCounter++;
    env.batchId = '0';
    var SHARED = link(sharedState);
    var shared = env.shared = {
      props: 'a0'
    };
    Object.keys(sharedState).forEach(function (prop) {
      shared[prop] = global.def(SHARED, '.', prop);
    });
    var nextVars = env.next = {};
    var currentVars = env.current = {};
    Object.keys(GL_VARIABLES).forEach(function (variable) {
      if (Array.isArray(currentState[variable])) {
        nextVars[variable] = global.def(shared.next, '.', variable);
        currentVars[variable] = global.def(shared.current, '.', variable);
      }
    });
    var constants = env.constants = {};
    Object.keys(sharedConstants).forEach(function (name) {
      constants[name] = global.def(JSON.stringify(sharedConstants[name]));
    });
    env.invoke = function (block, x) {
      switch (x.type) {
        case DYN_FUNC$1:
          var argList = [
            'this',
            shared.context,
            shared.props,
            env.batchId
          ];
          return block.def(
            link(x.data), '.call(',
            argList.slice(0, Math.max(x.data.length + 1, 4)),
            ')')
        case DYN_PROP$1:
          return block.def(shared.props, x.data)
        case DYN_CONTEXT$1:
          return block.def(shared.context, x.data)
        case DYN_STATE$1:
          return block.def('this', x.data)
        case DYN_THUNK:
          x.data.append(env, block);
          return x.data.ref
      }
    };
    env.attribCache = {};
    var scopeAttribs = {};
    env.scopeAttrib = function (name) {
      var id = stringStore.id(name);
      if (id in scopeAttribs) {
        return scopeAttribs[id]
      }
      var binding = attributeState.scope[id];
      if (!binding) {
        binding = attributeState.scope[id] = new AttributeRecord();
      }
      var result = scopeAttribs[id] = link(binding);
      return result
    };
    return env
  }
  function parseProfile (options) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;
    var profileEnable;
    if (S_PROFILE in staticOptions) {
      var value = !!staticOptions[S_PROFILE];
      profileEnable = createStaticDecl(function (env, scope) {
        return value
      });
      profileEnable.enable = value;
    } else if (S_PROFILE in dynamicOptions) {
      var dyn = dynamicOptions[S_PROFILE];
      profileEnable = createDynamicDecl(dyn, function (env, scope) {
        return env.invoke(scope, dyn)
      });
    }
    return profileEnable
  }
  function parseFramebuffer (options, env) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;
    if (S_FRAMEBUFFER in staticOptions) {
      var framebuffer = staticOptions[S_FRAMEBUFFER];
      if (framebuffer) {
        framebuffer = framebufferState.getFramebuffer(framebuffer);
        return createStaticDecl(function (env, block) {
          var FRAMEBUFFER = env.link(framebuffer);
          var shared = env.shared;
          block.set(
            shared.framebuffer,
            '.next',
            FRAMEBUFFER);
          var CONTEXT = shared.context;
          block.set(
            CONTEXT,
            '.' + S_FRAMEBUFFER_WIDTH,
            FRAMEBUFFER + '.width');
          block.set(
            CONTEXT,
            '.' + S_FRAMEBUFFER_HEIGHT,
            FRAMEBUFFER + '.height');
          return FRAMEBUFFER
        })
      } else {
        return createStaticDecl(function (env, scope) {
          var shared = env.shared;
          scope.set(
            shared.framebuffer,
            '.next',
            'null');
          var CONTEXT = shared.context;
          scope.set(
            CONTEXT,
            '.' + S_FRAMEBUFFER_WIDTH,
            CONTEXT + '.' + S_DRAWINGBUFFER_WIDTH);
          scope.set(
            CONTEXT,
            '.' + S_FRAMEBUFFER_HEIGHT,
            CONTEXT + '.' + S_DRAWINGBUFFER_HEIGHT);
          return 'null'
        })
      }
    } else if (S_FRAMEBUFFER in dynamicOptions) {
      var dyn = dynamicOptions[S_FRAMEBUFFER];
      return createDynamicDecl(dyn, function (env, scope) {
        var FRAMEBUFFER_FUNC = env.invoke(scope, dyn);
        var shared = env.shared;
        var FRAMEBUFFER_STATE = shared.framebuffer;
        var FRAMEBUFFER = scope.def(
          FRAMEBUFFER_STATE, '.getFramebuffer(', FRAMEBUFFER_FUNC, ')');
        scope.set(
          FRAMEBUFFER_STATE,
          '.next',
          FRAMEBUFFER);
        var CONTEXT = shared.context;
        scope.set(
          CONTEXT,
          '.' + S_FRAMEBUFFER_WIDTH,
          FRAMEBUFFER + '?' + FRAMEBUFFER + '.width:' +
          CONTEXT + '.' + S_DRAWINGBUFFER_WIDTH);
        scope.set(
          CONTEXT,
          '.' + S_FRAMEBUFFER_HEIGHT,
          FRAMEBUFFER +
          '?' + FRAMEBUFFER + '.height:' +
          CONTEXT + '.' + S_DRAWINGBUFFER_HEIGHT);
        return FRAMEBUFFER
      })
    } else {
      return null
    }
  }
  function parseViewportScissor (options, framebuffer, env) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;
    function parseBox (param) {
      if (param in staticOptions) {
        var box = staticOptions[param];
        var isStatic = true;
        var x = box.x | 0;
        var y = box.y | 0;
        var w, h;
        if ('width' in box) {
          w = box.width | 0;
        } else {
          isStatic = false;
        }
        if ('height' in box) {
          h = box.height | 0;
        } else {
          isStatic = false;
        }
        return new Declaration(
          !isStatic && framebuffer && framebuffer.thisDep,
          !isStatic && framebuffer && framebuffer.contextDep,
          !isStatic && framebuffer && framebuffer.propDep,
          function (env, scope) {
            var CONTEXT = env.shared.context;
            var BOX_W = w;
            if (!('width' in box)) {
              BOX_W = scope.def(CONTEXT, '.', S_FRAMEBUFFER_WIDTH, '-', x);
            }
            var BOX_H = h;
            if (!('height' in box)) {
              BOX_H = scope.def(CONTEXT, '.', S_FRAMEBUFFER_HEIGHT, '-', y);
            }
            return [x, y, BOX_W, BOX_H]
          })
      } else if (param in dynamicOptions) {
        var dynBox = dynamicOptions[param];
        var result = createDynamicDecl(dynBox, function (env, scope) {
          var BOX = env.invoke(scope, dynBox);
          var CONTEXT = env.shared.context;
          var BOX_X = scope.def(BOX, '.x|0');
          var BOX_Y = scope.def(BOX, '.y|0');
          var BOX_W = scope.def(
            '"width" in ', BOX, '?', BOX, '.width|0:',
            '(', CONTEXT, '.', S_FRAMEBUFFER_WIDTH, '-', BOX_X, ')');
          var BOX_H = scope.def(
            '"height" in ', BOX, '?', BOX, '.height|0:',
            '(', CONTEXT, '.', S_FRAMEBUFFER_HEIGHT, '-', BOX_Y, ')');
          return [BOX_X, BOX_Y, BOX_W, BOX_H]
        });
        if (framebuffer) {
          result.thisDep = result.thisDep || framebuffer.thisDep;
          result.contextDep = result.contextDep || framebuffer.contextDep;
          result.propDep = result.propDep || framebuffer.propDep;
        }
        return result
      } else if (framebuffer) {
        return new Declaration(
          framebuffer.thisDep,
          framebuffer.contextDep,
          framebuffer.propDep,
          function (env, scope) {
            var CONTEXT = env.shared.context;
            return [
              0, 0,
              scope.def(CONTEXT, '.', S_FRAMEBUFFER_WIDTH),
              scope.def(CONTEXT, '.', S_FRAMEBUFFER_HEIGHT)]
          })
      } else {
        return null
      }
    }
    var viewport = parseBox(S_VIEWPORT);
    if (viewport) {
      var prevViewport = viewport;
      viewport = new Declaration(
        viewport.thisDep,
        viewport.contextDep,
        viewport.propDep,
        function (env, scope) {
          var VIEWPORT = prevViewport.append(env, scope);
          var CONTEXT = env.shared.context;
          scope.set(
            CONTEXT,
            '.' + S_VIEWPORT_WIDTH,
            VIEWPORT[2]);
          scope.set(
            CONTEXT,
            '.' + S_VIEWPORT_HEIGHT,
            VIEWPORT[3]);
          return VIEWPORT
        });
    }
    return {
      viewport: viewport,
      scissor_box: parseBox(S_SCISSOR_BOX)
    }
  }
  function parseAttribLocations (options, attributes) {
    var staticOptions = options.static;
    var staticProgram =
      typeof staticOptions[S_FRAG] === 'string' &&
      typeof staticOptions[S_VERT] === 'string';
    if (staticProgram) {
      if (Object.keys(attributes.dynamic).length > 0) {
        return null
      }
      var staticAttributes = attributes.static;
      var sAttributes = Object.keys(staticAttributes);
      if (sAttributes.length > 0 && typeof staticAttributes[sAttributes[0]] === 'number') {
        var bindings = [];
        for (var i = 0; i < sAttributes.length; ++i) {
          bindings.push([staticAttributes[sAttributes[i]] | 0, sAttributes[i]]);
        }
        return bindings
      }
    }
    return null
  }
  function parseProgram (options, env, attribLocations) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;
    function parseShader (name) {
      if (name in staticOptions) {
        var id = stringStore.id(staticOptions[name]);
        var result = createStaticDecl(function () {
          return id
        });
        result.id = id;
        return result
      } else if (name in dynamicOptions) {
        var dyn = dynamicOptions[name];
        return createDynamicDecl(dyn, function (env, scope) {
          var str = env.invoke(scope, dyn);
          var id = scope.def(env.shared.strings, '.id(', str, ')');
          return id
        })
      }
      return null
    }
    var frag = parseShader(S_FRAG);
    var vert = parseShader(S_VERT);
    var program = null;
    var progVar;
    if (isStatic(frag) && isStatic(vert)) {
      program = shaderState.program(vert.id, frag.id, null, attribLocations);
      progVar = createStaticDecl(function (env, scope) {
        return env.link(program)
      });
    } else {
      progVar = new Declaration(
        (frag && frag.thisDep) || (vert && vert.thisDep),
        (frag && frag.contextDep) || (vert && vert.contextDep),
        (frag && frag.propDep) || (vert && vert.propDep),
        function (env, scope) {
          var SHADER_STATE = env.shared.shader;
          var fragId;
          if (frag) {
            fragId = frag.append(env, scope);
          } else {
            fragId = scope.def(SHADER_STATE, '.', S_FRAG);
          }
          var vertId;
          if (vert) {
            vertId = vert.append(env, scope);
          } else {
            vertId = scope.def(SHADER_STATE, '.', S_VERT);
          }
          var progDef = SHADER_STATE + '.program(' + vertId + ',' + fragId;
          return scope.def(progDef + ')')
        });
    }
    return {
      frag: frag,
      vert: vert,
      progVar: progVar,
      program: program
    }
  }
  function parseDraw (options, env) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;
    function parseElements () {
      if (S_ELEMENTS in staticOptions) {
        var elements = staticOptions[S_ELEMENTS];
        if (isBufferArgs(elements)) {
          elements = elementState.getElements(elementState.create(elements, true));
        } else if (elements) {
          elements = elementState.getElements(elements);
        }
        var result = createStaticDecl(function (env, scope) {
          if (elements) {
            var result = env.link(elements);
            env.ELEMENTS = result;
            return result
          }
          env.ELEMENTS = null;
          return null
        });
        result.value = elements;
        return result
      } else if (S_ELEMENTS in dynamicOptions) {
        var dyn = dynamicOptions[S_ELEMENTS];
        return createDynamicDecl(dyn, function (env, scope) {
          var shared = env.shared;
          var IS_BUFFER_ARGS = shared.isBufferArgs;
          var ELEMENT_STATE = shared.elements;
          var elementDefn = env.invoke(scope, dyn);
          var elements = scope.def('null');
          var elementStream = scope.def(IS_BUFFER_ARGS, '(', elementDefn, ')');
          var ifte = env.cond(elementStream)
            .then(elements, '=', ELEMENT_STATE, '.createStream(', elementDefn, ');')
            .else(elements, '=', ELEMENT_STATE, '.getElements(', elementDefn, ');');
          scope.entry(ifte);
          scope.exit(
            env.cond(elementStream)
              .then(ELEMENT_STATE, '.destroyStream(', elements, ');'));
          env.ELEMENTS = elements;
          return elements
        })
      }
      return null
    }
    var elements = parseElements();
    function parsePrimitive () {
      if (S_PRIMITIVE in staticOptions) {
        var primitive = staticOptions[S_PRIMITIVE];
        return createStaticDecl(function (env, scope) {
          return primTypes[primitive]
        })
      } else if (S_PRIMITIVE in dynamicOptions) {
        var dynPrimitive = dynamicOptions[S_PRIMITIVE];
        return createDynamicDecl(dynPrimitive, function (env, scope) {
          var PRIM_TYPES = env.constants.primTypes;
          var prim = env.invoke(scope, dynPrimitive);
          return scope.def(PRIM_TYPES, '[', prim, ']')
        })
      } else if (elements) {
        if (isStatic(elements)) {
          if (elements.value) {
            return createStaticDecl(function (env, scope) {
              return scope.def(env.ELEMENTS, '.primType')
            })
          } else {
            return createStaticDecl(function () {
              return GL_TRIANGLES$1
            })
          }
        } else {
          return new Declaration(
            elements.thisDep,
            elements.contextDep,
            elements.propDep,
            function (env, scope) {
              var elements = env.ELEMENTS;
              return scope.def(elements, '?', elements, '.primType:', GL_TRIANGLES$1)
            })
        }
      }
      return null
    }
    function parseParam (param, isOffset) {
      if (param in staticOptions) {
        var value = staticOptions[param] | 0;
        return createStaticDecl(function (env, scope) {
          if (isOffset) {
            env.OFFSET = value;
          }
          return value
        })
      } else if (param in dynamicOptions) {
        var dynValue = dynamicOptions[param];
        return createDynamicDecl(dynValue, function (env, scope) {
          var result = env.invoke(scope, dynValue);
          if (isOffset) {
            env.OFFSET = result;
          }
          return result
        })
      } else if (isOffset && elements) {
        return createStaticDecl(function (env, scope) {
          env.OFFSET = '0';
          return 0
        })
      }
      return null
    }
    var OFFSET = parseParam(S_OFFSET, true);
    function parseVertCount () {
      if (S_COUNT in staticOptions) {
        var count = staticOptions[S_COUNT] | 0;
        return createStaticDecl(function () {
          return count
        })
      } else if (S_COUNT in dynamicOptions) {
        var dynCount = dynamicOptions[S_COUNT];
        return createDynamicDecl(dynCount, function (env, scope) {
          var result = env.invoke(scope, dynCount);
          return result
        })
      } else if (elements) {
        if (isStatic(elements)) {
          if (elements) {
            if (OFFSET) {
              return new Declaration(
                OFFSET.thisDep,
                OFFSET.contextDep,
                OFFSET.propDep,
                function (env, scope) {
                  var result = scope.def(
                    env.ELEMENTS, '.vertCount-', env.OFFSET);
                  return result
                })
            } else {
              return createStaticDecl(function (env, scope) {
                return scope.def(env.ELEMENTS, '.vertCount')
              })
            }
          } else {
            var result = createStaticDecl(function () {
              return -1
            });
            return result
          }
        } else {
          var variable = new Declaration(
            elements.thisDep || OFFSET.thisDep,
            elements.contextDep || OFFSET.contextDep,
            elements.propDep || OFFSET.propDep,
            function (env, scope) {
              var elements = env.ELEMENTS;
              if (env.OFFSET) {
                return scope.def(elements, '?', elements, '.vertCount-',
                  env.OFFSET, ':-1')
              }
              return scope.def(elements, '?', elements, '.vertCount:-1')
            });
          return variable
        }
      }
      return null
    }
    return {
      elements: elements,
      primitive: parsePrimitive(),
      count: parseVertCount(),
      instances: parseParam(S_INSTANCES, false),
      offset: OFFSET
    }
  }
  function parseGLState (options, env) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;
    var STATE = {};
    GL_STATE_NAMES.forEach(function (prop) {
      var param = propName(prop);
      function parseParam (parseStatic, parseDynamic) {
        if (prop in staticOptions) {
          var value = parseStatic(staticOptions[prop]);
          STATE[param] = createStaticDecl(function () {
            return value
          });
        } else if (prop in dynamicOptions) {
          var dyn = dynamicOptions[prop];
          STATE[param] = createDynamicDecl(dyn, function (env, scope) {
            return parseDynamic(env, scope, env.invoke(scope, dyn))
          });
        }
      }
      switch (prop) {
        case S_CULL_ENABLE:
        case S_BLEND_ENABLE:
        case S_DITHER:
        case S_STENCIL_ENABLE:
        case S_DEPTH_ENABLE:
        case S_SCISSOR_ENABLE:
        case S_POLYGON_OFFSET_ENABLE:
        case S_SAMPLE_ALPHA:
        case S_SAMPLE_ENABLE:
        case S_DEPTH_MASK:
          return parseParam(
            function (value) {
              return value
            },
            function (env, scope, value) {
              return value
            })
        case S_DEPTH_FUNC:
          return parseParam(
            function (value) {
              return compareFuncs[value]
            },
            function (env, scope, value) {
              var COMPARE_FUNCS = env.constants.compareFuncs;
              return scope.def(COMPARE_FUNCS, '[', value, ']')
            })
        case S_DEPTH_RANGE:
          return parseParam(
            function (value) {
              return value
            },
            function (env, scope, value) {
              var Z_NEAR = scope.def('+', value, '[0]');
              var Z_FAR = scope.def('+', value, '[1]');
              return [Z_NEAR, Z_FAR]
            })
        case S_BLEND_FUNC:
          return parseParam(
            function (value) {
              var srcRGB = ('srcRGB' in value ? value.srcRGB : value.src);
              var srcAlpha = ('srcAlpha' in value ? value.srcAlpha : value.src);
              var dstRGB = ('dstRGB' in value ? value.dstRGB : value.dst);
              var dstAlpha = ('dstAlpha' in value ? value.dstAlpha : value.dst);
              return [
                blendFuncs[srcRGB],
                blendFuncs[dstRGB],
                blendFuncs[srcAlpha],
                blendFuncs[dstAlpha]
              ]
            },
            function (env, scope, value) {
              var BLEND_FUNCS = env.constants.blendFuncs;
              function read (prefix, suffix) {
                var func = scope.def(
                  '"', prefix, suffix, '" in ', value,
                  '?', value, '.', prefix, suffix,
                  ':', value, '.', prefix);
                return func
              }
              var srcRGB = read('src', 'RGB');
              var dstRGB = read('dst', 'RGB');
              var SRC_RGB = scope.def(BLEND_FUNCS, '[', srcRGB, ']');
              var SRC_ALPHA = scope.def(BLEND_FUNCS, '[', read('src', 'Alpha'), ']');
              var DST_RGB = scope.def(BLEND_FUNCS, '[', dstRGB, ']');
              var DST_ALPHA = scope.def(BLEND_FUNCS, '[', read('dst', 'Alpha'), ']');
              return [SRC_RGB, DST_RGB, SRC_ALPHA, DST_ALPHA]
            })
        case S_BLEND_EQUATION:
          return parseParam(
            function (value) {
              if (typeof value === 'string') {
                return [
                  blendEquations[value],
                  blendEquations[value]
                ]
              } else if (typeof value === 'object') {
                return [
                  blendEquations[value.rgb],
                  blendEquations[value.alpha]
                ]
              }
            },
            function (env, scope, value) {
              var BLEND_EQUATIONS = env.constants.blendEquations;
              var RGB = scope.def();
              var ALPHA = scope.def();
              var ifte = env.cond('typeof ', value, '==="string"');
              ifte.then(
                RGB, '=', ALPHA, '=', BLEND_EQUATIONS, '[', value, '];');
              ifte.else(
                RGB, '=', BLEND_EQUATIONS, '[', value, '.rgb];',
                ALPHA, '=', BLEND_EQUATIONS, '[', value, '.alpha];');
              scope(ifte);
              return [RGB, ALPHA]
            })
        case S_BLEND_COLOR:
          return parseParam(
            function (value) {
              return loop(4, function (i) {
                return +value[i]
              })
            },
            function (env, scope, value) {
              return loop(4, function (i) {
                return scope.def('+', value, '[', i, ']')
              })
            })
        case S_STENCIL_MASK:
          return parseParam(
            function (value) {
              return value | 0
            },
            function (env, scope, value) {
              return scope.def(value, '|0')
            })
        case S_STENCIL_FUNC:
          return parseParam(
            function (value) {
              var cmp = value.cmp || 'keep';
              var ref = value.ref || 0;
              var mask = 'mask' in value ? value.mask : -1;
              return [
                compareFuncs[cmp],
                ref,
                mask
              ]
            },
            function (env, scope, value) {
              var COMPARE_FUNCS = env.constants.compareFuncs;
              var cmp = scope.def(
                '"cmp" in ', value,
                '?', COMPARE_FUNCS, '[', value, '.cmp]',
                ':', GL_KEEP);
              var ref = scope.def(value, '.ref|0');
              var mask = scope.def(
                '"mask" in ', value,
                '?', value, '.mask|0:-1');
              return [cmp, ref, mask]
            })
        case S_STENCIL_OPFRONT:
        case S_STENCIL_OPBACK:
          return parseParam(
            function (value) {
              var fail = value.fail || 'keep';
              var zfail = value.zfail || 'keep';
              var zpass = value.zpass || 'keep';
              return [
                prop === S_STENCIL_OPBACK ? GL_BACK : GL_FRONT,
                stencilOps[fail],
                stencilOps[zfail],
                stencilOps[zpass]
              ]
            },
            function (env, scope, value) {
              var STENCIL_OPS = env.constants.stencilOps;
              function read (name) {
                return scope.def(
                  '"', name, '" in ', value,
                  '?', STENCIL_OPS, '[', value, '.', name, ']:',
                  GL_KEEP)
              }
              return [
                prop === S_STENCIL_OPBACK ? GL_BACK : GL_FRONT,
                read('fail'),
                read('zfail'),
                read('zpass')
              ]
            })
        case S_POLYGON_OFFSET_OFFSET:
          return parseParam(
            function (value) {
              var factor = value.factor | 0;
              var units = value.units | 0;
              return [factor, units]
            },
            function (env, scope, value) {
              var FACTOR = scope.def(value, '.factor|0');
              var UNITS = scope.def(value, '.units|0');
              return [FACTOR, UNITS]
            })
        case S_CULL_FACE:
          return parseParam(
            function (value) {
              var face = 0;
              if (value === 'front') {
                face = GL_FRONT;
              } else if (value === 'back') {
                face = GL_BACK;
              }
              return face
            },
            function (env, scope, value) {
              return scope.def(value, '==="front"?', GL_FRONT, ':', GL_BACK)
            })
        case S_LINE_WIDTH:
          return parseParam(
            function (value) {
              return value
            },
            function (env, scope, value) {
              return value
            })
        case S_FRONT_FACE:
          return parseParam(
            function (value) {
              return orientationType[value]
            },
            function (env, scope, value) {
              return scope.def(value + '==="cw"?' + GL_CW + ':' + GL_CCW)
            })
        case S_COLOR_MASK:
          return parseParam(
            function (value) {
              return value.map(function (v) { return !!v })
            },
            function (env, scope, value) {
              return loop(4, function (i) {
                return '!!' + value + '[' + i + ']'
              })
            })
        case S_SAMPLE_COVERAGE:
          return parseParam(
            function (value) {
              var sampleValue = 'value' in value ? value.value : 1;
              var sampleInvert = !!value.invert;
              return [sampleValue, sampleInvert]
            },
            function (env, scope, value) {
              var VALUE = scope.def(
                '"value" in ', value, '?+', value, '.value:1');
              var INVERT = scope.def('!!', value, '.invert');
              return [VALUE, INVERT]
            })
      }
    });
    return STATE
  }
  function parseUniforms (uniforms, env) {
    var staticUniforms = uniforms.static;
    var dynamicUniforms = uniforms.dynamic;
    var UNIFORMS = {};
    Object.keys(staticUniforms).forEach(function (name) {
      var value = staticUniforms[name];
      var result;
      if (typeof value === 'number' ||
          typeof value === 'boolean') {
        result = createStaticDecl(function () {
          return value
        });
      } else if (typeof value === 'function') {
        var reglType = value._reglType;
        if (reglType === 'texture2d' ||
            reglType === 'textureCube') {
          result = createStaticDecl(function (env) {
            return env.link(value)
          });
        } else if (reglType === 'framebuffer' ||
                   reglType === 'framebufferCube') {
          result = createStaticDecl(function (env) {
            return env.link(value.color[0])
          });
        }
      } else if (isArrayLike(value)) {
        result = createStaticDecl(function (env) {
          var ITEM = env.global.def('[',
            loop(value.length, function (i) {
              return value[i]
            }), ']');
          return ITEM
        });
      }
      result.value = value;
      UNIFORMS[name] = result;
    });
    Object.keys(dynamicUniforms).forEach(function (key) {
      var dyn = dynamicUniforms[key];
      UNIFORMS[key] = createDynamicDecl(dyn, function (env, scope) {
        return env.invoke(scope, dyn)
      });
    });
    return UNIFORMS
  }
  function parseAttributes (attributes, env) {
    var staticAttributes = attributes.static;
    var dynamicAttributes = attributes.dynamic;
    var attributeDefs = {};
    Object.keys(staticAttributes).forEach(function (attribute) {
      var value = staticAttributes[attribute];
      var id = stringStore.id(attribute);
      var record = new AttributeRecord();
      if (isBufferArgs(value)) {
        record.state = ATTRIB_STATE_POINTER;
        record.buffer = bufferState.getBuffer(
          bufferState.create(value, GL_ARRAY_BUFFER$2, false, true));
        record.type = 0;
      } else {
        var buffer = bufferState.getBuffer(value);
        if (buffer) {
          record.state = ATTRIB_STATE_POINTER;
          record.buffer = buffer;
          record.type = 0;
        } else {
          if ('constant' in value) {
            var constant = value.constant;
            record.buffer = 'null';
            record.state = ATTRIB_STATE_CONSTANT;
            if (typeof constant === 'number') {
              record.x = constant;
            } else {
              CUTE_COMPONENTS.forEach(function (c, i) {
                if (i < constant.length) {
                  record[c] = constant[i];
                }
              });
            }
          } else {
            if (isBufferArgs(value.buffer)) {
              buffer = bufferState.getBuffer(
                bufferState.create(value.buffer, GL_ARRAY_BUFFER$2, false, true));
            } else {
              buffer = bufferState.getBuffer(value.buffer);
            }
            var offset = value.offset | 0;
            var stride = value.stride | 0;
            var size = value.size | 0;
            var normalized = !!value.normalized;
            var type = 0;
            if ('type' in value) {
              type = glTypes[value.type];
            }
            var divisor = value.divisor | 0;
            record.buffer = buffer;
            record.state = ATTRIB_STATE_POINTER;
            record.size = size;
            record.normalized = normalized;
            record.type = type || buffer.dtype;
            record.offset = offset;
            record.stride = stride;
            record.divisor = divisor;
          }
        }
      }
      attributeDefs[attribute] = createStaticDecl(function (env, scope) {
        var cache = env.attribCache;
        if (id in cache) {
          return cache[id]
        }
        var result = {
          isStream: false
        };
        Object.keys(record).forEach(function (key) {
          result[key] = record[key];
        });
        if (record.buffer) {
          result.buffer = env.link(record.buffer);
          result.type = result.type || (result.buffer + '.dtype');
        }
        cache[id] = result;
        return result
      });
    });
    Object.keys(dynamicAttributes).forEach(function (attribute) {
      var dyn = dynamicAttributes[attribute];
      function appendAttributeCode (env, block) {
        var VALUE = env.invoke(block, dyn);
        var shared = env.shared;
        var constants = env.constants;
        var IS_BUFFER_ARGS = shared.isBufferArgs;
        var BUFFER_STATE = shared.buffer;
        var result = {
          isStream: block.def(false)
        };
        var defaultRecord = new AttributeRecord();
        defaultRecord.state = ATTRIB_STATE_POINTER;
        Object.keys(defaultRecord).forEach(function (key) {
          result[key] = block.def('' + defaultRecord[key]);
        });
        var BUFFER = result.buffer;
        var TYPE = result.type;
        block(
          'if(', IS_BUFFER_ARGS, '(', VALUE, ')){',
          result.isStream, '=true;',
          BUFFER, '=', BUFFER_STATE, '.createStream(', GL_ARRAY_BUFFER$2, ',', VALUE, ');',
          TYPE, '=', BUFFER, '.dtype;',
          '}else{',
          BUFFER, '=', BUFFER_STATE, '.getBuffer(', VALUE, ');',
          'if(', BUFFER, '){',
          TYPE, '=', BUFFER, '.dtype;',
          '}else if("constant" in ', VALUE, '){',
          result.state, '=', ATTRIB_STATE_CONSTANT, ';',
          'if(typeof ' + VALUE + '.constant === "number"){',
          result[CUTE_COMPONENTS[0]], '=', VALUE, '.constant;',
          CUTE_COMPONENTS.slice(1).map(function (n) {
            return result[n]
          }).join('='), '=0;',
          '}else{',
          CUTE_COMPONENTS.map(function (name, i) {
            return (
              result[name] + '=' + VALUE + '.constant.length>' + i +
              '?' + VALUE + '.constant[' + i + ']:0;'
            )
          }).join(''),
          '}}else{',
          'if(', IS_BUFFER_ARGS, '(', VALUE, '.buffer)){',
          BUFFER, '=', BUFFER_STATE, '.createStream(', GL_ARRAY_BUFFER$2, ',', VALUE, '.buffer);',
          '}else{',
          BUFFER, '=', BUFFER_STATE, '.getBuffer(', VALUE, '.buffer);',
          '}',
          TYPE, '="type" in ', VALUE, '?',
          constants.glTypes, '[', VALUE, '.type]:', BUFFER, '.dtype;',
          result.normalized, '=!!', VALUE, '.normalized;');
        function emitReadRecord (name) {
          block(result[name], '=', VALUE, '.', name, '|0;');
        }
        emitReadRecord('size');
        emitReadRecord('offset');
        emitReadRecord('stride');
        emitReadRecord('divisor');
        block('}}');
        block.exit(
          'if(', result.isStream, '){',
          BUFFER_STATE, '.destroyStream(', BUFFER, ');',
          '}');
        return result
      }
      attributeDefs[attribute] = createDynamicDecl(dyn, appendAttributeCode);
    });
    return attributeDefs
  }
  function parseVAO (options, env) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;
    if (S_VAO in staticOptions) {
      var vao = staticOptions[S_VAO];
      if (vao !== null && attributeState.getVAO(vao) === null) {
        vao = attributeState.createVAO(vao);
      }
      return createStaticDecl(function (env) {
        return env.link(attributeState.getVAO(vao))
      })
    } else if (S_VAO in dynamicOptions) {
      var dyn = dynamicOptions[S_VAO];
      return createDynamicDecl(dyn, function (env, scope) {
        var vaoRef = env.invoke(scope, dyn);
        return scope.def(env.shared.vao + '.getVAO(' + vaoRef + ')')
      })
    }
    return null
  }
  function parseContext (context) {
    var staticContext = context.static;
    var dynamicContext = context.dynamic;
    var result = {};
    Object.keys(staticContext).forEach(function (name) {
      var value = staticContext[name];
      result[name] = createStaticDecl(function (env, scope) {
        if (typeof value === 'number' || typeof value === 'boolean') {
          return '' + value
        } else {
          return env.link(value)
        }
      });
    });
    Object.keys(dynamicContext).forEach(function (name) {
      var dyn = dynamicContext[name];
      result[name] = createDynamicDecl(dyn, function (env, scope) {
        return env.invoke(scope, dyn)
      });
    });
    return result
  }
  function parseArguments (options, attributes, uniforms, context, env) {
    var staticOptions = options.static;
    var dynamicOptions = options.dynamic;
    var attribLocations = parseAttribLocations(options, attributes);
    var framebuffer = parseFramebuffer(options);
    var viewportAndScissor = parseViewportScissor(options, framebuffer);
    var draw = parseDraw(options);
    var state = parseGLState(options);
    var shader = parseProgram(options, env, attribLocations);
    function copyBox (name) {
      var defn = viewportAndScissor[name];
      if (defn) {
        state[name] = defn;
      }
    }
    copyBox(S_VIEWPORT);
    copyBox(propName(S_SCISSOR_BOX));
    var dirty = Object.keys(state).length > 0;
    var result = {
      framebuffer: framebuffer,
      draw: draw,
      shader: shader,
      state: state,
      dirty: dirty,
      scopeVAO: null,
      drawVAO: null,
      useVAO: false,
      attributes: {}
    };
    result.profile = parseProfile(options);
    result.uniforms = parseUniforms(uniforms);
    result.drawVAO = result.scopeVAO = parseVAO(options);
    if (!result.drawVAO && shader.program && !attribLocations && extensions.angle_instanced_arrays) {
      var useVAO = true;
      var staticBindings = shader.program.attributes.map(function (attr) {
        var binding = attributes.static[attr];
        useVAO = useVAO && !!binding;
        return binding
      });
      if (useVAO && staticBindings.length > 0) {
        var vao = attributeState.getVAO(attributeState.createVAO(staticBindings));
        result.drawVAO = new Declaration(null, null, null, function (env, scope) {
          return env.link(vao)
        });
        result.useVAO = true;
      }
    }
    if (attribLocations) {
      result.useVAO = true;
    } else {
      result.attributes = parseAttributes(attributes);
    }
    result.context = parseContext(context);
    return result
  }
  function emitContext (env, scope, context) {
    var shared = env.shared;
    var CONTEXT = shared.context;
    var contextEnter = env.scope();
    Object.keys(context).forEach(function (name) {
      scope.save(CONTEXT, '.' + name);
      var defn = context[name];
      contextEnter(CONTEXT, '.', name, '=', defn.append(env, scope), ';');
    });
    scope(contextEnter);
  }
  function emitPollFramebuffer (env, scope, framebuffer, skipCheck) {
    var shared = env.shared;
    var GL = shared.gl;
    var FRAMEBUFFER_STATE = shared.framebuffer;
    var EXT_DRAW_BUFFERS;
    if (extDrawBuffers) {
      EXT_DRAW_BUFFERS = scope.def(shared.extensions, '.webgl_draw_buffers');
    }
    var constants = env.constants;
    var DRAW_BUFFERS = constants.drawBuffer;
    var BACK_BUFFER = constants.backBuffer;
    var NEXT;
    if (framebuffer) {
      NEXT = framebuffer.append(env, scope);
    } else {
      NEXT = scope.def(FRAMEBUFFER_STATE, '.next');
    }
    if (!skipCheck) {
      scope('if(', NEXT, '!==', FRAMEBUFFER_STATE, '.cur){');
    }
    scope(
      'if(', NEXT, '){',
      GL, '.bindFramebuffer(', GL_FRAMEBUFFER$2, ',', NEXT, '.framebuffer);');
    if (extDrawBuffers) {
      scope(EXT_DRAW_BUFFERS, '.drawBuffersWEBGL(',
        DRAW_BUFFERS, '[', NEXT, '.colorAttachments.length]);');
    }
    scope('}else{',
      GL, '.bindFramebuffer(', GL_FRAMEBUFFER$2, ',null);');
    if (extDrawBuffers) {
      scope(EXT_DRAW_BUFFERS, '.drawBuffersWEBGL(', BACK_BUFFER, ');');
    }
    scope(
      '}',
      FRAMEBUFFER_STATE, '.cur=', NEXT, ';');
    if (!skipCheck) {
      scope('}');
    }
  }
  function emitPollState (env, scope, args) {
    var shared = env.shared;
    var GL = shared.gl;
    var CURRENT_VARS = env.current;
    var NEXT_VARS = env.next;
    var CURRENT_STATE = shared.current;
    var NEXT_STATE = shared.next;
    var block = env.cond(CURRENT_STATE, '.dirty');
    GL_STATE_NAMES.forEach(function (prop) {
      var param = propName(prop);
      if (param in args.state) {
        return
      }
      var NEXT, CURRENT;
      if (param in NEXT_VARS) {
        NEXT = NEXT_VARS[param];
        CURRENT = CURRENT_VARS[param];
        var parts = loop(currentState[param].length, function (i) {
          return block.def(NEXT, '[', i, ']')
        });
        block(env.cond(parts.map(function (p, i) {
          return p + '!==' + CURRENT + '[' + i + ']'
        }).join('||'))
          .then(
            GL, '.', GL_VARIABLES[param], '(', parts, ');',
            parts.map(function (p, i) {
              return CURRENT + '[' + i + ']=' + p
            }).join(';'), ';'));
      } else {
        NEXT = block.def(NEXT_STATE, '.', param);
        var ifte = env.cond(NEXT, '!==', CURRENT_STATE, '.', param);
        block(ifte);
        if (param in GL_FLAGS) {
          ifte(
            env.cond(NEXT)
              .then(GL, '.enable(', GL_FLAGS[param], ');')
              .else(GL, '.disable(', GL_FLAGS[param], ');'),
            CURRENT_STATE, '.', param, '=', NEXT, ';');
        } else {
          ifte(
            GL, '.', GL_VARIABLES[param], '(', NEXT, ');',
            CURRENT_STATE, '.', param, '=', NEXT, ';');
        }
      }
    });
    if (Object.keys(args.state).length === 0) {
      block(CURRENT_STATE, '.dirty=false;');
    }
    scope(block);
  }
  function emitSetOptions (env, scope, options, filter) {
    var shared = env.shared;
    var CURRENT_VARS = env.current;
    var CURRENT_STATE = shared.current;
    var GL = shared.gl;
    sortState(Object.keys(options)).forEach(function (param) {
      var defn = options[param];
      if (filter && !filter(defn)) {
        return
      }
      var variable = defn.append(env, scope);
      if (GL_FLAGS[param]) {
        var flag = GL_FLAGS[param];
        if (isStatic(defn)) {
          if (variable) {
            scope(GL, '.enable(', flag, ');');
          } else {
            scope(GL, '.disable(', flag, ');');
          }
        } else {
          scope(env.cond(variable)
            .then(GL, '.enable(', flag, ');')
            .else(GL, '.disable(', flag, ');'));
        }
        scope(CURRENT_STATE, '.', param, '=', variable, ';');
      } else if (isArrayLike(variable)) {
        var CURRENT = CURRENT_VARS[param];
        scope(
          GL, '.', GL_VARIABLES[param], '(', variable, ');',
          variable.map(function (v, i) {
            return CURRENT + '[' + i + ']=' + v
          }).join(';'), ';');
      } else {
        scope(
          GL, '.', GL_VARIABLES[param], '(', variable, ');',
          CURRENT_STATE, '.', param, '=', variable, ';');
      }
    });
  }
  function injectExtensions (env, scope) {
    if (extInstancing) {
      env.instancing = scope.def(
        env.shared.extensions, '.angle_instanced_arrays');
    }
  }
  function emitProfile (env, scope, args, useScope, incrementCounter) {
    var shared = env.shared;
    var STATS = env.stats;
    var CURRENT_STATE = shared.current;
    var TIMER = shared.timer;
    var profileArg = args.profile;
    function perfCounter () {
      if (typeof performance === 'undefined') {
        return 'Date.now()'
      } else {
        return 'performance.now()'
      }
    }
    var CPU_START, QUERY_COUNTER;
    function emitProfileStart (block) {
      CPU_START = scope.def();
      block(CPU_START, '=', perfCounter(), ';');
      if (typeof incrementCounter === 'string') {
        block(STATS, '.count+=', incrementCounter, ';');
      } else {
        block(STATS, '.count++;');
      }
      if (timer) {
        if (useScope) {
          QUERY_COUNTER = scope.def();
          block(QUERY_COUNTER, '=', TIMER, '.getNumPendingQueries();');
        } else {
          block(TIMER, '.beginQuery(', STATS, ');');
        }
      }
    }
    function emitProfileEnd (block) {
      block(STATS, '.cpuTime+=', perfCounter(), '-', CPU_START, ';');
      if (timer) {
        if (useScope) {
          block(TIMER, '.pushScopeStats(',
            QUERY_COUNTER, ',',
            TIMER, '.getNumPendingQueries(),',
            STATS, ');');
        } else {
          block(TIMER, '.endQuery();');
        }
      }
    }
    function scopeProfile (value) {
      var prev = scope.def(CURRENT_STATE, '.profile');
      scope(CURRENT_STATE, '.profile=', value, ';');
      scope.exit(CURRENT_STATE, '.profile=', prev, ';');
    }
    var USE_PROFILE;
    if (profileArg) {
      if (isStatic(profileArg)) {
        if (profileArg.enable) {
          emitProfileStart(scope);
          emitProfileEnd(scope.exit);
          scopeProfile('true');
        } else {
          scopeProfile('false');
        }
        return
      }
      USE_PROFILE = profileArg.append(env, scope);
      scopeProfile(USE_PROFILE);
    } else {
      USE_PROFILE = scope.def(CURRENT_STATE, '.profile');
    }
    var start = env.block();
    emitProfileStart(start);
    scope('if(', USE_PROFILE, '){', start, '}');
    var end = env.block();
    emitProfileEnd(end);
    scope.exit('if(', USE_PROFILE, '){', end, '}');
  }
  function emitAttributes (env, scope, args, attributes, filter) {
    var shared = env.shared;
    function typeLength (x) {
      switch (x) {
        case GL_FLOAT_VEC2:
        case GL_INT_VEC2:
        case GL_BOOL_VEC2:
          return 2
        case GL_FLOAT_VEC3:
        case GL_INT_VEC3:
        case GL_BOOL_VEC3:
          return 3
        case GL_FLOAT_VEC4:
        case GL_INT_VEC4:
        case GL_BOOL_VEC4:
          return 4
        default:
          return 1
      }
    }
    function emitBindAttribute (ATTRIBUTE, size, record) {
      var GL = shared.gl;
      var LOCATION = scope.def(ATTRIBUTE, '.location');
      var BINDING = scope.def(shared.attributes, '[', LOCATION, ']');
      var STATE = record.state;
      var BUFFER = record.buffer;
      var CONST_COMPONENTS = [
        record.x,
        record.y,
        record.z,
        record.w
      ];
      var COMMON_KEYS = [
        'buffer',
        'normalized',
        'offset',
        'stride'
      ];
      function emitBuffer () {
        scope(
          'if(!', BINDING, '.buffer){',
          GL, '.enableVertexAttribArray(', LOCATION, ');}');
        var TYPE = record.type;
        var SIZE;
        if (!record.size) {
          SIZE = size;
        } else {
          SIZE = scope.def(record.size, '||', size);
        }
        scope('if(',
          BINDING, '.type!==', TYPE, '||',
          BINDING, '.size!==', SIZE, '||',
          COMMON_KEYS.map(function (key) {
            return BINDING + '.' + key + '!==' + record[key]
          }).join('||'),
          '){',
          GL, '.bindBuffer(', GL_ARRAY_BUFFER$2, ',', BUFFER, '.buffer);',
          GL, '.vertexAttribPointer(', [
            LOCATION,
            SIZE,
            TYPE,
            record.normalized,
            record.stride,
            record.offset
          ], ');',
          BINDING, '.type=', TYPE, ';',
          BINDING, '.size=', SIZE, ';',
          COMMON_KEYS.map(function (key) {
            return BINDING + '.' + key + '=' + record[key] + ';'
          }).join(''),
          '}');
        if (extInstancing) {
          var DIVISOR = record.divisor;
          scope(
            'if(', BINDING, '.divisor!==', DIVISOR, '){',
            env.instancing, '.vertexAttribDivisorANGLE(', [LOCATION, DIVISOR], ');',
            BINDING, '.divisor=', DIVISOR, ';}');
        }
      }
      function emitConstant () {
        scope(
          'if(', BINDING, '.buffer){',
          GL, '.disableVertexAttribArray(', LOCATION, ');',
          BINDING, '.buffer=null;',
          '}if(', CUTE_COMPONENTS.map(function (c, i) {
            return BINDING + '.' + c + '!==' + CONST_COMPONENTS[i]
          }).join('||'), '){',
          GL, '.vertexAttrib4f(', LOCATION, ',', CONST_COMPONENTS, ');',
          CUTE_COMPONENTS.map(function (c, i) {
            return BINDING + '.' + c + '=' + CONST_COMPONENTS[i] + ';'
          }).join(''),
          '}');
      }
      if (STATE === ATTRIB_STATE_POINTER) {
        emitBuffer();
      } else if (STATE === ATTRIB_STATE_CONSTANT) {
        emitConstant();
      } else {
        scope('if(', STATE, '===', ATTRIB_STATE_POINTER, '){');
        emitBuffer();
        scope('}else{');
        emitConstant();
        scope('}');
      }
    }
    attributes.forEach(function (attribute) {
      var name = attribute.name;
      var arg = args.attributes[name];
      var record;
      if (arg) {
        if (!filter(arg)) {
          return
        }
        record = arg.append(env, scope);
      } else {
        if (!filter(SCOPE_DECL)) {
          return
        }
        var scopeAttrib = env.scopeAttrib(name);
        record = {};
        Object.keys(new AttributeRecord()).forEach(function (key) {
          record[key] = scope.def(scopeAttrib, '.', key);
        });
      }
      emitBindAttribute(
        env.link(attribute), typeLength(attribute.info.type), record);
    });
  }
  function emitUniforms (env, scope, args, uniforms, filter) {
    var shared = env.shared;
    var GL = shared.gl;
    var infix;
    for (var i = 0; i < uniforms.length; ++i) {
      var uniform = uniforms[i];
      var name = uniform.name;
      var type = uniform.info.type;
      var arg = args.uniforms[name];
      var UNIFORM = env.link(uniform);
      var LOCATION = UNIFORM + '.location';
      var VALUE;
      if (arg) {
        if (!filter(arg)) {
          continue
        }
        if (isStatic(arg)) {
          var value = arg.value;
          if (type === GL_SAMPLER_2D || type === GL_SAMPLER_CUBE) {
            var TEX_VALUE = env.link(value._texture || value.color[0]._texture);
            scope(GL, '.uniform1i(', LOCATION, ',', TEX_VALUE + '.bind());');
            scope.exit(TEX_VALUE, '.unbind();');
          } else if (
            type === GL_FLOAT_MAT2 ||
            type === GL_FLOAT_MAT3 ||
            type === GL_FLOAT_MAT4) {
            var MAT_VALUE = env.global.def('new Float32Array([' +
              Array.prototype.slice.call(value) + '])');
            var dim = 2;
            if (type === GL_FLOAT_MAT3) {
              dim = 3;
            } else if (type === GL_FLOAT_MAT4) {
              dim = 4;
            }
            scope(
              GL, '.uniformMatrix', dim, 'fv(',
              LOCATION, ',false,', MAT_VALUE, ');');
          } else {
            switch (type) {
              case GL_FLOAT$7:
                infix = '1f';
                break
              case GL_FLOAT_VEC2:
                infix = '2f';
                break
              case GL_FLOAT_VEC3:
                infix = '3f';
                break
              case GL_FLOAT_VEC4:
                infix = '4f';
                break
              case GL_BOOL:
                infix = '1i';
                break
              case GL_INT$2:
                infix = '1i';
                break
              case GL_BOOL_VEC2:
                infix = '2i';
                break
              case GL_INT_VEC2:
                infix = '2i';
                break
              case GL_BOOL_VEC3:
                infix = '3i';
                break
              case GL_INT_VEC3:
                infix = '3i';
                break
              case GL_BOOL_VEC4:
                infix = '4i';
                break
              case GL_INT_VEC4:
                infix = '4i';
                break
            }
            scope(GL, '.uniform', infix, '(', LOCATION, ',',
              isArrayLike(value) ? Array.prototype.slice.call(value) : value,
              ');');
          }
          continue
        } else {
          VALUE = arg.append(env, scope);
        }
      } else {
        if (!filter(SCOPE_DECL)) {
          continue
        }
        VALUE = scope.def(shared.uniforms, '[', stringStore.id(name), ']');
      }
      if (type === GL_SAMPLER_2D) {
        scope(
          'if(', VALUE, '&&', VALUE, '._reglType==="framebuffer"){',
          VALUE, '=', VALUE, '.color[0];',
          '}');
      } else if (type === GL_SAMPLER_CUBE) {
        scope(
          'if(', VALUE, '&&', VALUE, '._reglType==="framebufferCube"){',
          VALUE, '=', VALUE, '.color[0];',
          '}');
      }
      var unroll = 1;
      switch (type) {
        case GL_SAMPLER_2D:
        case GL_SAMPLER_CUBE:
          var TEX = scope.def(VALUE, '._texture');
          scope(GL, '.uniform1i(', LOCATION, ',', TEX, '.bind());');
          scope.exit(TEX, '.unbind();');
          continue
        case GL_INT$2:
        case GL_BOOL:
          infix = '1i';
          break
        case GL_INT_VEC2:
        case GL_BOOL_VEC2:
          infix = '2i';
          unroll = 2;
          break
        case GL_INT_VEC3:
        case GL_BOOL_VEC3:
          infix = '3i';
          unroll = 3;
          break
        case GL_INT_VEC4:
        case GL_BOOL_VEC4:
          infix = '4i';
          unroll = 4;
          break
        case GL_FLOAT$7:
          infix = '1f';
          break
        case GL_FLOAT_VEC2:
          infix = '2f';
          unroll = 2;
          break
        case GL_FLOAT_VEC3:
          infix = '3f';
          unroll = 3;
          break
        case GL_FLOAT_VEC4:
          infix = '4f';
          unroll = 4;
          break
        case GL_FLOAT_MAT2:
          infix = 'Matrix2fv';
          break
        case GL_FLOAT_MAT3:
          infix = 'Matrix3fv';
          break
        case GL_FLOAT_MAT4:
          infix = 'Matrix4fv';
          break
      }
      scope(GL, '.uniform', infix, '(', LOCATION, ',');
      if (infix.charAt(0) === 'M') {
        var matSize = Math.pow(type - GL_FLOAT_MAT2 + 2, 2);
        var STORAGE = env.global.def('new Float32Array(', matSize, ')');
        scope(
          'false,(Array.isArray(', VALUE, ')||', VALUE, ' instanceof Float32Array)?', VALUE, ':(',
          loop(matSize, function (i) {
            return STORAGE + '[' + i + ']=' + VALUE + '[' + i + ']'
          }), ',', STORAGE, ')');
      } else if (unroll > 1) {
        scope(loop(unroll, function (i) {
          return VALUE + '[' + i + ']'
        }));
      } else {
        scope(VALUE);
      }
      scope(');');
    }
  }
  function emitDraw (env, outer, inner, args) {
    var shared = env.shared;
    var GL = shared.gl;
    var DRAW_STATE = shared.draw;
    var drawOptions = args.draw;
    function emitElements () {
      var defn = drawOptions.elements;
      var ELEMENTS;
      var scope = outer;
      if (defn) {
        if ((defn.contextDep && args.contextDynamic) || defn.propDep) {
          scope = inner;
        }
        ELEMENTS = defn.append(env, scope);
      } else {
        ELEMENTS = scope.def(DRAW_STATE, '.', S_ELEMENTS);
      }
      if (ELEMENTS) {
        scope(
          'if(' + ELEMENTS + ')' +
          GL + '.bindBuffer(' + GL_ELEMENT_ARRAY_BUFFER$1 + ',' + ELEMENTS + '.buffer.buffer);');
      }
      return ELEMENTS
    }
    function emitCount () {
      var defn = drawOptions.count;
      var COUNT;
      var scope = outer;
      if (defn) {
        if ((defn.contextDep && args.contextDynamic) || defn.propDep) {
          scope = inner;
        }
        COUNT = defn.append(env, scope);
      } else {
        COUNT = scope.def(DRAW_STATE, '.', S_COUNT);
      }
      return COUNT
    }
    var ELEMENTS = emitElements();
    function emitValue (name) {
      var defn = drawOptions[name];
      if (defn) {
        if ((defn.contextDep && args.contextDynamic) || defn.propDep) {
          return defn.append(env, inner)
        } else {
          return defn.append(env, outer)
        }
      } else {
        return outer.def(DRAW_STATE, '.', name)
      }
    }
    var PRIMITIVE = emitValue(S_PRIMITIVE);
    var OFFSET = emitValue(S_OFFSET);
    var COUNT = emitCount();
    if (typeof COUNT === 'number') {
      if (COUNT === 0) {
        return
      }
    } else {
      inner('if(', COUNT, '){');
      inner.exit('}');
    }
    var INSTANCES, EXT_INSTANCING;
    if (extInstancing) {
      INSTANCES = emitValue(S_INSTANCES);
      EXT_INSTANCING = env.instancing;
    }
    var ELEMENT_TYPE = ELEMENTS + '.type';
    var elementsStatic = drawOptions.elements && isStatic(drawOptions.elements);
    function emitInstancing () {
      function drawElements () {
        inner(EXT_INSTANCING, '.drawElementsInstancedANGLE(', [
          PRIMITIVE,
          COUNT,
          ELEMENT_TYPE,
          OFFSET + '<<((' + ELEMENT_TYPE + '-' + GL_UNSIGNED_BYTE$7 + ')>>1)',
          INSTANCES
        ], ');');
      }
      function drawArrays () {
        inner(EXT_INSTANCING, '.drawArraysInstancedANGLE(',
          [PRIMITIVE, OFFSET, COUNT, INSTANCES], ');');
      }
      if (ELEMENTS) {
        if (!elementsStatic) {
          inner('if(', ELEMENTS, '){');
          drawElements();
          inner('}else{');
          drawArrays();
          inner('}');
        } else {
          drawElements();
        }
      } else {
        drawArrays();
      }
    }
    function emitRegular () {
      function drawElements () {
        inner(GL + '.drawElements(' + [
          PRIMITIVE,
          COUNT,
          ELEMENT_TYPE,
          OFFSET + '<<((' + ELEMENT_TYPE + '-' + GL_UNSIGNED_BYTE$7 + ')>>1)'
        ] + ');');
      }
      function drawArrays () {
        inner(GL + '.drawArrays(' + [PRIMITIVE, OFFSET, COUNT] + ');');
      }
      if (ELEMENTS) {
        if (!elementsStatic) {
          inner('if(', ELEMENTS, '){');
          drawElements();
          inner('}else{');
          drawArrays();
          inner('}');
        } else {
          drawElements();
        }
      } else {
        drawArrays();
      }
    }
    if (extInstancing && (typeof INSTANCES !== 'number' || INSTANCES >= 0)) {
      if (typeof INSTANCES === 'string') {
        inner('if(', INSTANCES, '>0){');
        emitInstancing();
        inner('}else if(', INSTANCES, '<0){');
        emitRegular();
        inner('}');
      } else {
        emitInstancing();
      }
    } else {
      emitRegular();
    }
  }
  function createBody (emitBody, parentEnv, args, program, count) {
    var env = createREGLEnvironment();
    var scope = env.proc('body', count);
    if (extInstancing) {
      env.instancing = scope.def(
        env.shared.extensions, '.angle_instanced_arrays');
    }
    emitBody(env, scope, args, program);
    return env.compile().body
  }
  function emitDrawBody (env, draw, args, program) {
    injectExtensions(env, draw);
    if (args.useVAO) {
      if (args.drawVAO) {
        draw(env.shared.vao, '.setVAO(', args.drawVAO.append(env, draw), ');');
      } else {
        draw(env.shared.vao, '.setVAO(', env.shared.vao, '.targetVAO);');
      }
    } else {
      draw(env.shared.vao, '.setVAO(null);');
      emitAttributes(env, draw, args, program.attributes, function () {
        return true
      });
    }
    emitUniforms(env, draw, args, program.uniforms, function () {
      return true
    });
    emitDraw(env, draw, draw, args);
  }
  function emitDrawProc (env, args) {
    var draw = env.proc('draw', 1);
    injectExtensions(env, draw);
    emitContext(env, draw, args.context);
    emitPollFramebuffer(env, draw, args.framebuffer);
    emitPollState(env, draw, args);
    emitSetOptions(env, draw, args.state);
    emitProfile(env, draw, args, false, true);
    var program = args.shader.progVar.append(env, draw);
    draw(env.shared.gl, '.useProgram(', program, '.program);');
    if (args.shader.program) {
      emitDrawBody(env, draw, args, args.shader.program);
    } else {
      draw(env.shared.vao, '.setVAO(null);');
      var drawCache = env.global.def('{}');
      var PROG_ID = draw.def(program, '.id');
      var CACHED_PROC = draw.def(drawCache, '[', PROG_ID, ']');
      draw(
        env.cond(CACHED_PROC)
          .then(CACHED_PROC, '.call(this,a0);')
          .else(
            CACHED_PROC, '=', drawCache, '[', PROG_ID, ']=',
            env.link(function (program) {
              return createBody(emitDrawBody, env, args, program, 1)
            }), '(', program, ');',
            CACHED_PROC, '.call(this,a0);'));
    }
    if (Object.keys(args.state).length > 0) {
      draw(env.shared.current, '.dirty=true;');
    }
  }
  function emitBatchDynamicShaderBody (env, scope, args, program) {
    env.batchId = 'a1';
    injectExtensions(env, scope);
    function all () {
      return true
    }
    emitAttributes(env, scope, args, program.attributes, all);
    emitUniforms(env, scope, args, program.uniforms, all);
    emitDraw(env, scope, scope, args);
  }
  function emitBatchBody (env, scope, args, program) {
    injectExtensions(env, scope);
    var contextDynamic = args.contextDep;
    var BATCH_ID = scope.def();
    var PROP_LIST = 'a0';
    var NUM_PROPS = 'a1';
    var PROPS = scope.def();
    env.shared.props = PROPS;
    env.batchId = BATCH_ID;
    var outer = env.scope();
    var inner = env.scope();
    scope(
      outer.entry,
      'for(', BATCH_ID, '=0;', BATCH_ID, '<', NUM_PROPS, ';++', BATCH_ID, '){',
      PROPS, '=', PROP_LIST, '[', BATCH_ID, '];',
      inner,
      '}',
      outer.exit);
    function isInnerDefn (defn) {
      return ((defn.contextDep && contextDynamic) || defn.propDep)
    }
    function isOuterDefn (defn) {
      return !isInnerDefn(defn)
    }
    if (args.needsContext) {
      emitContext(env, inner, args.context);
    }
    if (args.needsFramebuffer) {
      emitPollFramebuffer(env, inner, args.framebuffer);
    }
    emitSetOptions(env, inner, args.state, isInnerDefn);
    if (args.profile && isInnerDefn(args.profile)) {
      emitProfile(env, inner, args, false, true);
    }
    if (!program) {
      var progCache = env.global.def('{}');
      var PROGRAM = args.shader.progVar.append(env, inner);
      var PROG_ID = inner.def(PROGRAM, '.id');
      var CACHED_PROC = inner.def(progCache, '[', PROG_ID, ']');
      inner(
        env.shared.gl, '.useProgram(', PROGRAM, '.program);',
        'if(!', CACHED_PROC, '){',
        CACHED_PROC, '=', progCache, '[', PROG_ID, ']=',
        env.link(function (program) {
          return createBody(
            emitBatchDynamicShaderBody, env, args, program, 2)
        }), '(', PROGRAM, ');}',
        CACHED_PROC, '.call(this,a0[', BATCH_ID, '],', BATCH_ID, ');');
    } else {
      if (args.useVAO) {
        if (args.drawVAO) {
          if (isInnerDefn(args.drawVAO)) {
            inner(env.shared.vao, '.setVAO(', args.drawVAO.append(env, inner), ');');
          } else {
            outer(env.shared.vao, '.setVAO(', args.drawVAO.append(env, outer), ');');
          }
        } else {
          outer(env.shared.vao, '.setVAO(', env.shared.vao, '.targetVAO);');
        }
      } else {
        outer(env.shared.vao, '.setVAO(null);');
        emitAttributes(env, outer, args, program.attributes, isOuterDefn);
        emitAttributes(env, inner, args, program.attributes, isInnerDefn);
      }
      emitUniforms(env, outer, args, program.uniforms, isOuterDefn);
      emitUniforms(env, inner, args, program.uniforms, isInnerDefn);
      emitDraw(env, outer, inner, args);
    }
  }
  function emitBatchProc (env, args) {
    var batch = env.proc('batch', 2);
    env.batchId = '0';
    injectExtensions(env, batch);
    var contextDynamic = false;
    var needsContext = true;
    Object.keys(args.context).forEach(function (name) {
      contextDynamic = contextDynamic || args.context[name].propDep;
    });
    if (!contextDynamic) {
      emitContext(env, batch, args.context);
      needsContext = false;
    }
    var framebuffer = args.framebuffer;
    var needsFramebuffer = false;
    if (framebuffer) {
      if (framebuffer.propDep) {
        contextDynamic = needsFramebuffer = true;
      } else if (framebuffer.contextDep && contextDynamic) {
        needsFramebuffer = true;
      }
      if (!needsFramebuffer) {
        emitPollFramebuffer(env, batch, framebuffer);
      }
    } else {
      emitPollFramebuffer(env, batch, null);
    }
    if (args.state.viewport && args.state.viewport.propDep) {
      contextDynamic = true;
    }
    function isInnerDefn (defn) {
      return (defn.contextDep && contextDynamic) || defn.propDep
    }
    emitPollState(env, batch, args);
    emitSetOptions(env, batch, args.state, function (defn) {
      return !isInnerDefn(defn)
    });
    if (!args.profile || !isInnerDefn(args.profile)) {
      emitProfile(env, batch, args, false, 'a1');
    }
    args.contextDep = contextDynamic;
    args.needsContext = needsContext;
    args.needsFramebuffer = needsFramebuffer;
    var progDefn = args.shader.progVar;
    if ((progDefn.contextDep && contextDynamic) || progDefn.propDep) {
      emitBatchBody(
        env,
        batch,
        args,
        null);
    } else {
      var PROGRAM = progDefn.append(env, batch);
      batch(env.shared.gl, '.useProgram(', PROGRAM, '.program);');
      if (args.shader.program) {
        emitBatchBody(
          env,
          batch,
          args,
          args.shader.program);
      } else {
        batch(env.shared.vao, '.setVAO(null);');
        var batchCache = env.global.def('{}');
        var PROG_ID = batch.def(PROGRAM, '.id');
        var CACHED_PROC = batch.def(batchCache, '[', PROG_ID, ']');
        batch(
          env.cond(CACHED_PROC)
            .then(CACHED_PROC, '.call(this,a0,a1);')
            .else(
              CACHED_PROC, '=', batchCache, '[', PROG_ID, ']=',
              env.link(function (program) {
                return createBody(emitBatchBody, env, args, program, 2)
              }), '(', PROGRAM, ');',
              CACHED_PROC, '.call(this,a0,a1);'));
      }
    }
    if (Object.keys(args.state).length > 0) {
      batch(env.shared.current, '.dirty=true;');
    }
  }
  function emitScopeProc (env, args) {
    var scope = env.proc('scope', 3);
    env.batchId = 'a2';
    var shared = env.shared;
    var CURRENT_STATE = shared.current;
    emitContext(env, scope, args.context);
    if (args.framebuffer) {
      args.framebuffer.append(env, scope);
    }
    sortState(Object.keys(args.state)).forEach(function (name) {
      var defn = args.state[name];
      var value = defn.append(env, scope);
      if (isArrayLike(value)) {
        value.forEach(function (v, i) {
          scope.set(env.next[name], '[' + i + ']', v);
        });
      } else {
        scope.set(shared.next, '.' + name, value);
      }
    });
    emitProfile(env, scope, args, true, true)
    ;[S_ELEMENTS, S_OFFSET, S_COUNT, S_INSTANCES, S_PRIMITIVE].forEach(
      function (opt) {
        var variable = args.draw[opt];
        if (!variable) {
          return
        }
        scope.set(shared.draw, '.' + opt, '' + variable.append(env, scope));
      });
    Object.keys(args.uniforms).forEach(function (opt) {
      scope.set(
        shared.uniforms,
        '[' + stringStore.id(opt) + ']',
        args.uniforms[opt].append(env, scope));
    });
    Object.keys(args.attributes).forEach(function (name) {
      var record = args.attributes[name].append(env, scope);
      var scopeAttrib = env.scopeAttrib(name);
      Object.keys(new AttributeRecord()).forEach(function (prop) {
        scope.set(scopeAttrib, '.' + prop, record[prop]);
      });
    });
    if (args.scopeVAO) {
      scope.set(shared.vao, '.targetVAO', args.scopeVAO.append(env, scope));
    }
    function saveShader (name) {
      var shader = args.shader[name];
      if (shader) {
        scope.set(shared.shader, '.' + name, shader.append(env, scope));
      }
    }
    saveShader(S_VERT);
    saveShader(S_FRAG);
    if (Object.keys(args.state).length > 0) {
      scope(CURRENT_STATE, '.dirty=true;');
      scope.exit(CURRENT_STATE, '.dirty=true;');
    }
    scope('a1(', env.shared.context, ',a0,', env.batchId, ');');
  }
  function isDynamicObject (object) {
    if (typeof object !== 'object' || isArrayLike(object)) {
      return
    }
    var props = Object.keys(object);
    for (var i = 0; i < props.length; ++i) {
      if (dynamic.isDynamic(object[props[i]])) {
        return true
      }
    }
    return false
  }
  function splatObject (env, options, name) {
    var object = options.static[name];
    if (!object || !isDynamicObject(object)) {
      return
    }
    var globals = env.global;
    var keys = Object.keys(object);
    var thisDep = false;
    var contextDep = false;
    var propDep = false;
    var objectRef = env.global.def('{}');
    keys.forEach(function (key) {
      var value = object[key];
      if (dynamic.isDynamic(value)) {
        if (typeof value === 'function') {
          value = object[key] = dynamic.unbox(value);
        }
        var deps = createDynamicDecl(value, null);
        thisDep = thisDep || deps.thisDep;
        propDep = propDep || deps.propDep;
        contextDep = contextDep || deps.contextDep;
      } else {
        globals(objectRef, '.', key, '=');
        switch (typeof value) {
          case 'number':
            globals(value);
            break
          case 'string':
            globals('"', value, '"');
            break
          case 'object':
            if (Array.isArray(value)) {
              globals('[', value.join(), ']');
            }
            break
          default:
            globals(env.link(value));
            break
        }
        globals(';');
      }
    });
    function appendBlock (env, block) {
      keys.forEach(function (key) {
        var value = object[key];
        if (!dynamic.isDynamic(value)) {
          return
        }
        var ref = env.invoke(block, value);
        block(objectRef, '.', key, '=', ref, ';');
      });
    }
    options.dynamic[name] = new dynamic.DynamicVariable(DYN_THUNK, {
      thisDep: thisDep,
      contextDep: contextDep,
      propDep: propDep,
      ref: objectRef,
      append: appendBlock
    });
    delete options.static[name];
  }
  function compileCommand (options, attributes, uniforms, context, stats) {
    var env = createREGLEnvironment();
    env.stats = env.link(stats);
    Object.keys(attributes.static).forEach(function (key) {
      splatObject(env, attributes, key);
    });
    NESTED_OPTIONS.forEach(function (name) {
      splatObject(env, options, name);
    });
    var args = parseArguments(options, attributes, uniforms, context, env);
    emitDrawProc(env, args);
    emitScopeProc(env, args);
    emitBatchProc(env, args);
    return env.compile()
  }
  return {
    next: nextState,
    current: currentState,
    procs: (function () {
      var env = createREGLEnvironment();
      var poll = env.proc('poll');
      var refresh = env.proc('refresh');
      var common = env.block();
      poll(common);
      refresh(common);
      var shared = env.shared;
      var GL = shared.gl;
      var NEXT_STATE = shared.next;
      var CURRENT_STATE = shared.current;
      common(CURRENT_STATE, '.dirty=false;');
      emitPollFramebuffer(env, poll);
      emitPollFramebuffer(env, refresh, null, true);
      var INSTANCING;
      if (extInstancing) {
        INSTANCING = env.link(extInstancing);
      }
      if (extensions.oes_vertex_array_object) {
        refresh(env.link(extensions.oes_vertex_array_object), '.bindVertexArrayOES(null);');
      }
      for (var i = 0; i < limits.maxAttributes; ++i) {
        var BINDING = refresh.def(shared.attributes, '[', i, ']');
        var ifte = env.cond(BINDING, '.buffer');
        ifte.then(
          GL, '.enableVertexAttribArray(', i, ');',
          GL, '.bindBuffer(',
          GL_ARRAY_BUFFER$2, ',',
          BINDING, '.buffer.buffer);',
          GL, '.vertexAttribPointer(',
          i, ',',
          BINDING, '.size,',
          BINDING, '.type,',
          BINDING, '.normalized,',
          BINDING, '.stride,',
          BINDING, '.offset);'
        ).else(
          GL, '.disableVertexAttribArray(', i, ');',
          GL, '.vertexAttrib4f(',
          i, ',',
          BINDING, '.x,',
          BINDING, '.y,',
          BINDING, '.z,',
          BINDING, '.w);',
          BINDING, '.buffer=null;');
        refresh(ifte);
        if (extInstancing) {
          refresh(
            INSTANCING, '.vertexAttribDivisorANGLE(',
            i, ',',
            BINDING, '.divisor);');
        }
      }
      refresh(
        env.shared.vao, '.currentVAO=null;',
        env.shared.vao, '.setVAO(', env.shared.vao, '.targetVAO);');
      Object.keys(GL_FLAGS).forEach(function (flag) {
        var cap = GL_FLAGS[flag];
        var NEXT = common.def(NEXT_STATE, '.', flag);
        var block = env.block();
        block('if(', NEXT, '){',
          GL, '.enable(', cap, ')}else{',
          GL, '.disable(', cap, ')}',
          CURRENT_STATE, '.', flag, '=', NEXT, ';');
        refresh(block);
        poll(
          'if(', NEXT, '!==', CURRENT_STATE, '.', flag, '){',
          block,
          '}');
      });
      Object.keys(GL_VARIABLES).forEach(function (name) {
        var func = GL_VARIABLES[name];
        var init = currentState[name];
        var NEXT, CURRENT;
        var block = env.block();
        block(GL, '.', func, '(');
        if (isArrayLike(init)) {
          var n = init.length;
          NEXT = env.global.def(NEXT_STATE, '.', name);
          CURRENT = env.global.def(CURRENT_STATE, '.', name);
          block(
            loop(n, function (i) {
              return NEXT + '[' + i + ']'
            }), ');',
            loop(n, function (i) {
              return CURRENT + '[' + i + ']=' + NEXT + '[' + i + '];'
            }).join(''));
          poll(
            'if(', loop(n, function (i) {
              return NEXT + '[' + i + ']!==' + CURRENT + '[' + i + ']'
            }).join('||'), '){',
            block,
            '}');
        } else {
          NEXT = common.def(NEXT_STATE, '.', name);
          CURRENT = common.def(CURRENT_STATE, '.', name);
          block(
            NEXT, ');',
            CURRENT_STATE, '.', name, '=', NEXT, ';');
          poll(
            'if(', NEXT, '!==', CURRENT, '){',
            block,
            '}');
        }
        refresh(block);
      });
      return env.compile()
    })(),
    compile: compileCommand
  }
}
function stats () {
  return {
    vaoCount: 0,
    bufferCount: 0,
    elementsCount: 0,
    framebufferCount: 0,
    shaderCount: 0,
    textureCount: 0,
    cubeCount: 0,
    renderbufferCount: 0,
    maxTextureUnits: 0
  }
}
var GL_QUERY_RESULT_EXT = 0x8866;
var GL_QUERY_RESULT_AVAILABLE_EXT = 0x8867;
var GL_TIME_ELAPSED_EXT = 0x88BF;
var createTimer = function (gl, extensions) {
  if (!extensions.ext_disjoint_timer_query) {
    return null
  }
  var queryPool = [];
  function allocQuery () {
    return queryPool.pop() || extensions.ext_disjoint_timer_query.createQueryEXT()
  }
  function freeQuery (query) {
    queryPool.push(query);
  }
  var pendingQueries = [];
  function beginQuery (stats) {
    var query = allocQuery();
    extensions.ext_disjoint_timer_query.beginQueryEXT(GL_TIME_ELAPSED_EXT, query);
    pendingQueries.push(query);
    pushScopeStats(pendingQueries.length - 1, pendingQueries.length, stats);
  }
  function endQuery () {
    extensions.ext_disjoint_timer_query.endQueryEXT(GL_TIME_ELAPSED_EXT);
  }
  function PendingStats () {
    this.startQueryIndex = -1;
    this.endQueryIndex = -1;
    this.sum = 0;
    this.stats = null;
  }
  var pendingStatsPool = [];
  function allocPendingStats () {
    return pendingStatsPool.pop() || new PendingStats()
  }
  function freePendingStats (pendingStats) {
    pendingStatsPool.push(pendingStats);
  }
  var pendingStats = [];
  function pushScopeStats (start, end, stats) {
    var ps = allocPendingStats();
    ps.startQueryIndex = start;
    ps.endQueryIndex = end;
    ps.sum = 0;
    ps.stats = stats;
    pendingStats.push(ps);
  }
  var timeSum = [];
  var queryPtr = [];
  function update () {
    var ptr, i;
    var n = pendingQueries.length;
    if (n === 0) {
      return
    }
    queryPtr.length = Math.max(queryPtr.length, n + 1);
    timeSum.length = Math.max(timeSum.length, n + 1);
    timeSum[0] = 0;
    queryPtr[0] = 0;
    var queryTime = 0;
    ptr = 0;
    for (i = 0; i < pendingQueries.length; ++i) {
      var query = pendingQueries[i];
      if (extensions.ext_disjoint_timer_query.getQueryObjectEXT(query, GL_QUERY_RESULT_AVAILABLE_EXT)) {
        queryTime += extensions.ext_disjoint_timer_query.getQueryObjectEXT(query, GL_QUERY_RESULT_EXT);
        freeQuery(query);
      } else {
        pendingQueries[ptr++] = query;
      }
      timeSum[i + 1] = queryTime;
      queryPtr[i + 1] = ptr;
    }
    pendingQueries.length = ptr;
    ptr = 0;
    for (i = 0; i < pendingStats.length; ++i) {
      var stats = pendingStats[i];
      var start = stats.startQueryIndex;
      var end = stats.endQueryIndex;
      stats.sum += timeSum[end] - timeSum[start];
      var startPtr = queryPtr[start];
      var endPtr = queryPtr[end];
      if (endPtr === startPtr) {
        stats.stats.gpuTime += stats.sum / 1e6;
        freePendingStats(stats);
      } else {
        stats.startQueryIndex = startPtr;
        stats.endQueryIndex = endPtr;
        pendingStats[ptr++] = stats;
      }
    }
    pendingStats.length = ptr;
  }
  return {
    beginQuery: beginQuery,
    endQuery: endQuery,
    pushScopeStats: pushScopeStats,
    update: update,
    getNumPendingQueries: function () {
      return pendingQueries.length
    },
    clear: function () {
      queryPool.push.apply(queryPool, pendingQueries);
      for (var i = 0; i < queryPool.length; i++) {
        extensions.ext_disjoint_timer_query.deleteQueryEXT(queryPool[i]);
      }
      pendingQueries.length = 0;
      queryPool.length = 0;
    },
    restore: function () {
      pendingQueries.length = 0;
      queryPool.length = 0;
    }
  }
};
var GL_COLOR_BUFFER_BIT = 16384;
var GL_DEPTH_BUFFER_BIT = 256;
var GL_STENCIL_BUFFER_BIT = 1024;
var GL_ARRAY_BUFFER = 34962;
var CONTEXT_LOST_EVENT = 'webglcontextlost';
var CONTEXT_RESTORED_EVENT = 'webglcontextrestored';
var DYN_PROP = 1;
var DYN_CONTEXT = 2;
var DYN_STATE = 3;
function find (haystack, needle) {
  for (var i = 0; i < haystack.length; ++i) {
    if (haystack[i] === needle) {
      return i
    }
  }
  return -1
}
function wrapREGL (args) {
  var config = parseArgs(args);
  if (!config) {
    return null
  }
  var gl = config.gl;
  var glAttributes = gl.getContextAttributes();
  var contextLost = gl.isContextLost();
  var extensionState = createExtensionCache(gl, config);
  if (!extensionState) {
    return null
  }
  var stringStore = createStringStore();
  var stats$$1 = stats();
  var extensions = extensionState.extensions;
  var timer = createTimer(gl, extensions);
  var START_TIME = clock();
  var WIDTH = gl.drawingBufferWidth;
  var HEIGHT = gl.drawingBufferHeight;
  var contextState = {
    tick: 0,
    time: 0,
    viewportWidth: WIDTH,
    viewportHeight: HEIGHT,
    framebufferWidth: WIDTH,
    framebufferHeight: HEIGHT,
    drawingBufferWidth: WIDTH,
    drawingBufferHeight: HEIGHT,
    pixelRatio: config.pixelRatio
  };
  var uniformState = {};
  var drawState = {
    elements: null,
    primitive: 4,
    count: -1,
    offset: 0,
    instances: -1
  };
  var limits = wrapLimits(gl, extensions);
  var bufferState = wrapBufferState(
    gl,
    stats$$1,
    config,
    destroyBuffer);
  var attributeState = wrapAttributeState(
    gl,
    extensions,
    limits,
    stats$$1,
    bufferState);
  function destroyBuffer (buffer) {
    return attributeState.destroyBuffer(buffer)
  }
  var elementState = wrapElementsState(gl, extensions, bufferState, stats$$1);
  var shaderState = wrapShaderState(gl, stringStore, stats$$1, config);
  var textureState = createTextureSet(
    gl,
    extensions,
    limits,
    function () { core.procs.poll(); },
    contextState,
    stats$$1,
    config);
  var renderbufferState = wrapRenderbuffers(gl, extensions, limits, stats$$1, config);
  var framebufferState = wrapFBOState(
    gl,
    extensions,
    limits,
    textureState,
    renderbufferState,
    stats$$1);
  var core = reglCore(
    gl,
    stringStore,
    extensions,
    limits,
    bufferState,
    elementState,
    textureState,
    framebufferState,
    uniformState,
    attributeState,
    shaderState,
    drawState,
    contextState,
    timer,
    config);
  var readPixels = wrapReadPixels(
    gl,
    framebufferState,
    core.procs.poll,
    contextState,
    glAttributes, extensions);
  var nextState = core.next;
  var canvas = gl.canvas;
  var rafCallbacks = [];
  var lossCallbacks = [];
  var restoreCallbacks = [];
  var destroyCallbacks = [config.onDestroy];
  var activeRAF = null;
  function handleRAF () {
    if (rafCallbacks.length === 0) {
      if (timer) {
        timer.update();
      }
      activeRAF = null;
      return
    }
    activeRAF = raf.next(handleRAF);
    poll();
    for (var i = rafCallbacks.length - 1; i >= 0; --i) {
      var cb = rafCallbacks[i];
      if (cb) {
        cb(contextState, null, 0);
      }
    }
    gl.flush();
    if (timer) {
      timer.update();
    }
  }
  function startRAF () {
    if (!activeRAF && rafCallbacks.length > 0) {
      activeRAF = raf.next(handleRAF);
    }
  }
  function stopRAF () {
    if (activeRAF) {
      raf.cancel(handleRAF);
      activeRAF = null;
    }
  }
  function handleContextLoss (event) {
    event.preventDefault();
    contextLost = true;
    stopRAF();
    lossCallbacks.forEach(function (cb) {
      cb();
    });
  }
  function handleContextRestored (event) {
    gl.getError();
    contextLost = false;
    extensionState.restore();
    shaderState.restore();
    bufferState.restore();
    textureState.restore();
    renderbufferState.restore();
    framebufferState.restore();
    attributeState.restore();
    if (timer) {
      timer.restore();
    }
    core.procs.refresh();
    startRAF();
    restoreCallbacks.forEach(function (cb) {
      cb();
    });
  }
  if (canvas) {
    canvas.addEventListener(CONTEXT_LOST_EVENT, handleContextLoss, false);
    canvas.addEventListener(CONTEXT_RESTORED_EVENT, handleContextRestored, false);
  }
  function destroy () {
    rafCallbacks.length = 0;
    stopRAF();
    if (canvas) {
      canvas.removeEventListener(CONTEXT_LOST_EVENT, handleContextLoss);
      canvas.removeEventListener(CONTEXT_RESTORED_EVENT, handleContextRestored);
    }
    shaderState.clear();
    framebufferState.clear();
    renderbufferState.clear();
    textureState.clear();
    elementState.clear();
    bufferState.clear();
    attributeState.clear();
    if (timer) {
      timer.clear();
    }
    destroyCallbacks.forEach(function (cb) {
      cb();
    });
  }
  function compileProcedure (options) {
    function flattenNestedOptions (options) {
      var result = extend({}, options);
      delete result.uniforms;
      delete result.attributes;
      delete result.context;
      delete result.vao;
      if ('stencil' in result && result.stencil.op) {
        result.stencil.opBack = result.stencil.opFront = result.stencil.op;
        delete result.stencil.op;
      }
      function merge (name) {
        if (name in result) {
          var child = result[name];
          delete result[name];
          Object.keys(child).forEach(function (prop) {
            result[name + '.' + prop] = child[prop];
          });
        }
      }
      merge('blend');
      merge('depth');
      merge('cull');
      merge('stencil');
      merge('polygonOffset');
      merge('scissor');
      merge('sample');
      if ('vao' in options) {
        result.vao = options.vao;
      }
      return result
    }
    function separateDynamic (object) {
      var staticItems = {};
      var dynamicItems = {};
      Object.keys(object).forEach(function (option) {
        var value = object[option];
        if (dynamic.isDynamic(value)) {
          dynamicItems[option] = dynamic.unbox(value, option);
        } else {
          staticItems[option] = value;
        }
      });
      return {
        dynamic: dynamicItems,
        static: staticItems
      }
    }
    var context = separateDynamic(options.context || {});
    var uniforms = separateDynamic(options.uniforms || {});
    var attributes = separateDynamic(options.attributes || {});
    var opts = separateDynamic(flattenNestedOptions(options));
    var stats$$1 = {
      gpuTime: 0.0,
      cpuTime: 0.0,
      count: 0
    };
    var compiled = core.compile(opts, attributes, uniforms, context, stats$$1);
    var draw = compiled.draw;
    var batch = compiled.batch;
    var scope = compiled.scope;
    var EMPTY_ARRAY = [];
    function reserve (count) {
      while (EMPTY_ARRAY.length < count) {
        EMPTY_ARRAY.push(null);
      }
      return EMPTY_ARRAY
    }
    function REGLCommand (args, body) {
      var i;
      if (typeof args === 'function') {
        return scope.call(this, null, args, 0)
      } else if (typeof body === 'function') {
        if (typeof args === 'number') {
          for (i = 0; i < args; ++i) {
            scope.call(this, null, body, i);
          }
        } else if (Array.isArray(args)) {
          for (i = 0; i < args.length; ++i) {
            scope.call(this, args[i], body, i);
          }
        } else {
          return scope.call(this, args, body, 0)
        }
      } else if (typeof args === 'number') {
        if (args > 0) {
          return batch.call(this, reserve(args | 0), args | 0)
        }
      } else if (Array.isArray(args)) {
        if (args.length) {
          return batch.call(this, args, args.length)
        }
      } else {
        return draw.call(this, args)
      }
    }
    return extend(REGLCommand, {
      stats: stats$$1
    })
  }
  var setFBO = framebufferState.setFBO = compileProcedure({
    framebuffer: dynamic.define.call(null, DYN_PROP, 'framebuffer')
  });
  function clearImpl (_, options) {
    var clearFlags = 0;
    core.procs.poll();
    var c = options.color;
    if (c) {
      gl.clearColor(+c[0] || 0, +c[1] || 0, +c[2] || 0, +c[3] || 0);
      clearFlags |= GL_COLOR_BUFFER_BIT;
    }
    if ('depth' in options) {
      gl.clearDepth(+options.depth);
      clearFlags |= GL_DEPTH_BUFFER_BIT;
    }
    if ('stencil' in options) {
      gl.clearStencil(options.stencil | 0);
      clearFlags |= GL_STENCIL_BUFFER_BIT;
    }
    gl.clear(clearFlags);
  }
  function clear (options) {
    if ('framebuffer' in options) {
      if (options.framebuffer &&
          options.framebuffer_reglType === 'framebufferCube') {
        for (var i = 0; i < 6; ++i) {
          setFBO(extend({
            framebuffer: options.framebuffer.faces[i]
          }, options), clearImpl);
        }
      } else {
        setFBO(options, clearImpl);
      }
    } else {
      clearImpl(null, options);
    }
  }
  function frame (cb) {
    rafCallbacks.push(cb);
    function cancel () {
      var i = find(rafCallbacks, cb);
      function pendingCancel () {
        var index = find(rafCallbacks, pendingCancel);
        rafCallbacks[index] = rafCallbacks[rafCallbacks.length - 1];
        rafCallbacks.length -= 1;
        if (rafCallbacks.length <= 0) {
          stopRAF();
        }
      }
      rafCallbacks[i] = pendingCancel;
    }
    startRAF();
    return {
      cancel: cancel
    }
  }
  function pollViewport () {
    var viewport = nextState.viewport;
    var scissorBox = nextState.scissor_box;
    viewport[0] = viewport[1] = scissorBox[0] = scissorBox[1] = 0;
    contextState.viewportWidth =
      contextState.framebufferWidth =
      contextState.drawingBufferWidth =
      viewport[2] =
      scissorBox[2] = gl.drawingBufferWidth;
    contextState.viewportHeight =
      contextState.framebufferHeight =
      contextState.drawingBufferHeight =
      viewport[3] =
      scissorBox[3] = gl.drawingBufferHeight;
  }
  function poll () {
    contextState.tick += 1;
    contextState.time = now();
    pollViewport();
    core.procs.poll();
  }
  function refresh () {
    pollViewport();
    core.procs.refresh();
    if (timer) {
      timer.update();
    }
  }
  function now () {
    return (clock() - START_TIME) / 1000.0
  }
  refresh();
  function addListener (event, callback) {
    var callbacks;
    switch (event) {
      case 'frame':
        return frame(callback)
      case 'lost':
        callbacks = lossCallbacks;
        break
      case 'restore':
        callbacks = restoreCallbacks;
        break
      case 'destroy':
        callbacks = destroyCallbacks;
        break
    }
    callbacks.push(callback);
    return {
      cancel: function () {
        for (var i = 0; i < callbacks.length; ++i) {
          if (callbacks[i] === callback) {
            callbacks[i] = callbacks[callbacks.length - 1];
            callbacks.pop();
            return
          }
        }
      }
    }
  }
  var regl = extend(compileProcedure, {
    clear: clear,
    prop: dynamic.define.bind(null, DYN_PROP),
    context: dynamic.define.bind(null, DYN_CONTEXT),
    this: dynamic.define.bind(null, DYN_STATE),
    draw: compileProcedure({}),
    buffer: function (options) {
      return bufferState.create(options, GL_ARRAY_BUFFER, false, false)
    },
    elements: function (options) {
      return elementState.create(options, false)
    },
    texture: textureState.create2D,
    cube: textureState.createCube,
    renderbuffer: renderbufferState.create,
    framebuffer: framebufferState.create,
    framebufferCube: framebufferState.createCube,
    vao: attributeState.createVAO,
    attributes: glAttributes,
    frame: frame,
    on: addListener,
    limits: limits,
    hasExtension: function (name) {
      return limits.extensions.indexOf(name.toLowerCase()) >= 0
    },
    read: readPixels,
    destroy: destroy,
    _gl: gl,
    _refresh: refresh,
    poll: function () {
      poll();
      if (timer) {
        timer.update();
      }
    },
    now: now,
    stats: stats$$1
  });
  config.onDone(null, regl);
  return regl
}
return wrapREGL;
})));
});

class ReglViewerInstance {
  constructor({ canvas, pixelRatio, control }) {
    this.config = defaultConfig;
    this.control = control;
    regl_unchecked({
      canvas,
      attributes: {
        preserveDrawingBuffer: true,
        antialiasing: true
      },
      pixelRatio,
      extensions: [
        'angle_instanced_arrays',
        'oes_texture_float',
        'OES_standard_derivatives'
      ],
      onDone: (err, regl) => {
        if (err) return console.error(err)
        try {
          this.regl = regl;
          this.init(regl);
          this.run(regl);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }
  destroy() {
    this.regl.destroy();
  }
  init(regl) {
    this.regl._commands = [];
    this.initStory();
    this.initCameras();
    this.loopTick = -1;
    this.view = boxesViewSimple(regl, {
      variables: this.variables,
      model: this.model,
      config: this.config
    });
  }
  initStory() {
    this.story = sequencer(
      this.regl,
      this.control.scenes,
      {
        sceneId: 0,
        viewRange: [0, 0]
      },
      state => {
        if (state.scene.position) this.variables.position = state.scene.position;
        if (state.scene.particleColorsAndTypes) {
          this.variables.particleColorsAndTypes =
            state.scene.particleColorsAndTypes;
        }
      }
    );
    this.story.setPosition(0);
    this.variables = this.control.scenes[0].variables;
    this.model = this.story.getState().scene.model;
  }
  initCameras() {
    this.cameras = [];
    this.setCameraUniforms = []
    ;[
      this.cameras['guided'],
      this.setCameraUniforms['guided']
    ] = guidedCameraFactory(
      { scenes: this.story.scenes, ...this.config.view },
      this.regl
    );
    this.camera = this.cameras['guided'];
    this.modelTranslateX = 0;
    this.modelTranslateY = 0;
  }
  run(regl) {
    const mainloop = () => {
      return regl.frame(() => {
        const storyState = this.story.getState();
        let activeSceneProgress;
        let viewRange;
        if (
          storyState.scene.pathicles &&
          storyState.scene.pathicles.preset === 'story-loop'
        ) {
          if (this.loopTick >= 128) {
            this.modelTranslateX = (Math.random() - 0.5) * 1;
            this.modelTranslateY = (Math.random() - 0.5) * 0.5;
          }
          this.loopTick = this.loopTick < 128 ? this.loopTick + 1 : 0;
          activeSceneProgress =
            this.loopTick < 16
              ? this.loopTick / 32
              : this.loopTick > 96
              ? (this.loopTick - 96) / 32 + 0.5
              : 0.5;
          viewRange =
            activeSceneProgress < 0.5
              ? [0, activeSceneProgress * 2]
              : [activeSceneProgress * 2 - 1, 1];
        } else {
          activeSceneProgress = storyState.activeSceneProgress;
          viewRange = storyState.viewRange;
          this.modelTranslateX = 0;
          this.modelTranslateY = 0;
        }
        this.setCameraUniforms[this.control.cameraMode](
          {
            ...this.cameras[this.control.cameraMode],
            scene: storyState.scene,
            activeSceneProgress
          },
          () => {
            regl.clear({
              color: [0, 0, 0, 1],
              depth: 1
            });
            this.view.drawDiffuse({
              modelTranslateX: this.modelTranslateX,
              modelTranslateY: this.modelTranslateY,
              viewRange
            });
          }
        );
      })
    };
    mainloop();
  }
}

export { ReglViewerInstance, boxesViewSimple };
