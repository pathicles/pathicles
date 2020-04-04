import REGL from 'regl';

var subtract_1 = subtract;

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out
}

var normalize_1 = normalize;

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out
}

var cross_1 = cross;

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out
}

var identity_1 = identity;

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
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

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
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

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
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

// eslint-disable-next-line no-unused-vars
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
      eye: (context, { scene, sceneTime }) => {
        guidedCamera.pEye = scene.cameraPositionBSpline(Math.min(sceneTime, 1));
        guidedCamera.pTarget = scene.cameraTargetBSpline(Math.min(sceneTime, 1));
        subtract_1(guidedCamera.vEye, guidedCamera.pTarget, guidedCamera.pEye);
        return guidedCamera.pEye
      },
      view: (context, { scene, sceneTime }) => {
        guidedCamera.pEye = scene.cameraPositionBSpline(Math.min(sceneTime, 1));
        guidedCamera.pTarget = scene.cameraTargetBSpline(Math.min(sceneTime, 1));

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

var rotateY_1 = rotateY;

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
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

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
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

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
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

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
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

var scale_1 = scale;

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out
}

var transformMat4_1 = transformMat4;

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out
}

var matRotY = identity_1([]);
var matRotZ = identity_1([]);
var up = [0, 1, 0];
var tmpVec3 = [0, 0, 0];

var primitiveSphere_1 = primitiveSphere;
function primitiveSphere (radius, opt) {
  opt = opt || {};
  radius = typeof radius !== 'undefined' ? radius : 1;
  var segments = typeof opt.segments !== 'undefined' ? opt.segments : 32;

  var totalZRotationSteps = 2 + segments;
  var totalYRotationSteps = 2 * totalZRotationSteps;

  var indices = [];
  var positions = [];
  var normals = [];
  var uvs = [];

  for (var zRotationStep = 0; zRotationStep <= totalZRotationSteps; zRotationStep++) {
    var normalizedZ = zRotationStep / totalZRotationSteps;
    var angleZ = (normalizedZ * Math.PI);

    for (var yRotationStep = 0; yRotationStep <= totalYRotationSteps; yRotationStep++) {
      var normalizedY = yRotationStep / totalYRotationSteps;
      var angleY = normalizedY * Math.PI * 2;

      identity_1(matRotZ);
      rotateZ_1(matRotZ, matRotZ, -angleZ);

      identity_1(matRotY);
      rotateY_1(matRotY, matRotY, angleY);

      transformMat4_1(tmpVec3, up, matRotZ);
      transformMat4_1(tmpVec3, tmpVec3, matRotY);

      scale_1(tmpVec3, tmpVec3, -radius);
      positions.push(tmpVec3.slice());

      normalize_1(tmpVec3, tmpVec3);
      normals.push(tmpVec3.slice());

      uvs.push([ normalizedY, normalizedZ ]);
    }

    if (zRotationStep > 0) {
      var verticesCount = positions.length;
      var firstIndex = verticesCount - 2 * (totalYRotationSteps + 1);
      for (; (firstIndex + totalYRotationSteps + 2) < verticesCount; firstIndex++) {
        indices.push([
          firstIndex,
          firstIndex + 1,
          firstIndex + totalYRotationSteps + 1
        ]);
        indices.push([
          firstIndex + totalYRotationSteps + 1,
          firstIndex + 1,
          firstIndex + totalYRotationSteps + 2
        ]);
      }
    }
  }

  return {
    cells: indices,
    positions: positions,
    normals: normals,
    uvs: uvs
  }
}

var rotateX_1 = rotateX;

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
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

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
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

var translate_1 = translate;

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
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

var frag = "precision highp float;\n#define GLSLIFY 1\nuniform vec2 iResolution;\nuniform vec2 iMouse;\nvarying vec2 vUv;\n\nvec3 getSky(vec2 uv)\n{\n float atmosphere = sqrt(1.0-uv.y);\n    vec3 skyColor = vec3(0.,0.,0.);\n\n    float scatter = pow(iMouse.y / iResolution.y,1.0 / 15.0);\n    scatter = 1.0 - clamp(scatter,0.8,1.0);\n\n    vec3 scatterColor = mix(vec3(1.0),vec3(1.0,0.3,0.0) * 1.5,scatter);\n    return mix(skyColor,vec3(scatterColor),atmosphere / 1.3);\n\n}\n\nvec3 getSun(vec2 uv){\n  float sun = 1.0 - distance(uv,iMouse.xy / iResolution.y);\n    sun = clamp(sun,0.0,1.0);\n\n    float glow = sun;\n    glow = clamp(glow,0.0,1.0);\n\n    sun = pow(sun,100.0);\n    sun *= 100.0;\n    sun = clamp(sun,0.0,1.0);\n\n    glow = pow(glow,6.0) * 1.0;\n    glow = pow(glow,(uv.y));\n    glow = clamp(glow,0.0,1.0);\n\n    sun *= pow(dot(uv.y, uv.y), 1.0 / 1.65);\n\n    glow *= pow(dot(uv.y, uv.y), 1.0 / 2.0);\n\n    sun += glow;\n\n    vec3 sunColor = vec3(1.0,1.,1.) * sun;\n\n    return vec3(sunColor);\n}\n\nvoid main () {\n  vec3 sky = getSky(vUv);\n  vec3 sun = getSun(vUv);\n\n  gl_FragColor = vec4(sky + sun, 1.);\n}\n"; // eslint-disable-line

var vert = "precision highp float;\n#define GLSLIFY 1\nvarying vec3 vWorldPosition;\nvarying vec2 vUv;\nattribute vec3 aPosition;\nattribute vec2 uv;\n\nuniform mat4 projection;\nuniform mat4 model;\nuniform mat4 view;\n\nvoid main()\n{\n  vUv = uv;\n  //vec4 worldPosition = model * vec4(aPosition, 1.0);\n  //  vWorldPosition = worldPosition.xyz;\n  gl_Position = projection * view * model * vec4(aPosition, 1.0);\n}\n"; // eslint-disable-line

function drawBackgroundCommand(regl) {
  const stage = primitiveSphere_1(20, { segments: 128 });

  let model = identity_1([]);
  // mat4.fromXRotation(model, 90)
  translate_1(model, model, [0, -3, 0]);
  rotateX_1(model, model, Math.PI / 2);

  return regl({
    primitive: 'triangles',
    elements: stage.cells,
    attributes: {
      aPosition: stage.positions,
      uv: stage.uvs
    },
    uniforms: {
      iResolution: context => [context.viewportHeight, context.viewportWidth],
      iMouse: context => [context.viewportHeight, context.viewportWidth],
      model
    },
    vert,
    frag
  })
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

     makePlane(0, 1, 2, sx, sy, nx, ny,  sz/2,  1, -1); //front
     makePlane(0, 1, 2, sx, sy, nx, ny, -sz/2, -1, -1); //back
     makePlane(2, 1, 0, sz, sy, nz, ny, -sx/2,  1, -1); //left
     makePlane(2, 1, 0, sz, sy, nz, ny,  sx/2, -1, -1); //right
     makePlane(0, 2, 1, sx, sz, nx, nz,  sy/2,  1,  1); //top
     makePlane(0, 2, 1, sx, sz, nx, nz, -sy/2,  1, -1); //bottom

    return {
        positions: positions,
        normals: normals,
        uvs: uvs,
        cells: cells
    }
}

var primitiveCube = createCube;

var vert$1 = "precision highp float;\n#define GLSLIFY 1\nfloat inverse(float m) {\n  return 1.0 / m;\n}\n\nmat2 inverse(mat2 m) {\n  return mat2(m[1][1],-m[0][1],\n             -m[1][0], m[0][0]) / (m[0][0]*m[1][1] - m[0][1]*m[1][0]);\n}\n\nmat3 inverse(mat3 m) {\n  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2];\n  float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2];\n  float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2];\n\n  float b01 = a22 * a11 - a12 * a21;\n  float b11 = -a22 * a10 + a12 * a20;\n  float b21 = a21 * a10 - a11 * a20;\n\n  float det = a00 * b01 + a01 * b11 + a02 * b21;\n\n  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),\n              b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),\n              b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;\n}\n\nmat4 inverse(mat4 m) {\n  float\n      a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],\n      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],\n      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],\n      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],\n\n      b00 = a00 * a11 - a01 * a10,\n      b01 = a00 * a12 - a02 * a10,\n      b02 = a00 * a13 - a03 * a10,\n      b03 = a01 * a12 - a02 * a11,\n      b04 = a01 * a13 - a03 * a11,\n      b05 = a02 * a13 - a03 * a12,\n      b06 = a20 * a31 - a21 * a30,\n      b07 = a20 * a32 - a22 * a30,\n      b08 = a20 * a33 - a23 * a30,\n      b09 = a21 * a32 - a22 * a31,\n      b10 = a21 * a33 - a23 * a31,\n      b11 = a22 * a33 - a23 * a32,\n\n      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;\n\n  return mat4(\n      a11 * b11 - a12 * b10 + a13 * b09,\n      a02 * b10 - a01 * b11 - a03 * b09,\n      a31 * b05 - a32 * b04 + a33 * b03,\n      a22 * b04 - a21 * b05 - a23 * b03,\n      a12 * b08 - a10 * b11 - a13 * b07,\n      a00 * b11 - a02 * b08 + a03 * b07,\n      a32 * b02 - a30 * b05 - a33 * b01,\n      a20 * b05 - a22 * b02 + a23 * b01,\n      a10 * b10 - a11 * b08 + a13 * b06,\n      a01 * b08 - a00 * b10 - a03 * b06,\n      a30 * b04 - a31 * b02 + a33 * b00,\n      a21 * b02 - a20 * b04 - a23 * b00,\n      a11 * b07 - a10 * b09 - a12 * b06,\n      a00 * b09 - a01 * b07 + a02 * b06,\n      a31 * b01 - a30 * b03 - a32 * b00,\n      a20 * b03 - a21 * b01 + a22 * b00) / det;\n}\n\nfloat transpose(float m) {\n  return m;\n}\n\nmat2 transpose(mat2 m) {\n  return mat2(m[0][0], m[1][0],\n              m[0][1], m[1][1]);\n}\n\nmat3 transpose(mat3 m) {\n  return mat3(m[0][0], m[1][0], m[2][0],\n              m[0][1], m[1][1], m[2][1],\n              m[0][2], m[1][2], m[2][2]);\n}\n\nmat4 transpose(mat4 m) {\n  return mat4(m[0][0], m[1][0], m[2][0], m[3][0],\n              m[0][1], m[1][1], m[2][1], m[3][1],\n              m[0][2], m[1][2], m[2][2], m[3][2],\n              m[0][3], m[1][3], m[2][3], m[3][3]);\n}\n\nmat4 lookAt(vec3 eye, vec3 at, vec3 up) {\n  vec3 zaxis = normalize(eye - at);\n  vec3 xaxis = normalize(cross(zaxis, up));\n  vec3 yaxis = cross(xaxis, zaxis);\n  zaxis *= -1.;\n  return mat4(\n  vec4(xaxis.x, xaxis.y, xaxis.z, -dot(xaxis, eye)),\n  vec4(yaxis.x, yaxis.y, yaxis.z, -dot(yaxis, eye)),\n  vec4(zaxis.x, zaxis.y, zaxis.z, -dot(zaxis, eye)),\n  vec4(0, 0, 0, 1)\n  );\n}\n\nattribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute float aParticle;\nattribute float aColorCorrection;\nattribute float aStep;\n\nuniform float particleCount;\nuniform float bufferLength;\nuniform float stepCount;\n\nuniform float dt;\nuniform vec2 viewRange;\n\nuniform float pathicleWidth;\nuniform float pathicleGap;\nuniform float stageGrid_y;\nuniform float stageGrid_size;\nuniform vec3 shadowColor;\n\nuniform sampler2D utParticleColorAndType;\nuniform sampler2D utPositionBuffer;\nuniform sampler2D utVelocityBuffer;\nuniform mat4 projection, view, model;\n\nvarying float toBeDiscarded;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vDiffuseColor;\nvarying float vColorCorrection;\n\nvec4 get_color(float p) {\n  vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);\n  return texture2D(utParticleColorAndType, coords);\n}\nvec4 get_position(float p, float b) {\n  vec2 coords = vec2(p, b) / vec2(particleCount, bufferLength);\n  return texture2D(utPositionBuffer, coords);\n}\nfloat calculateToBeDiscarded(vec4 previousFourPosition, vec4 currentFourPosition) {\n\n  float undefinedBuffer = (currentFourPosition.w == 0. || previousFourPosition.w > currentFourPosition.w) ? 1.0 : 0.0;\n  float beyondProgressLower = (currentFourPosition.w / dt < viewRange[0] * stepCount) ? 1.0 : 0.0;\n  float beyondProgressUpper =  (currentFourPosition.w / dt > viewRange[1] * stepCount) ? 1.0 : 0.0;\n  float outsideGrid = (currentFourPosition.x > stageGrid_size || currentFourPosition.x < -stageGrid_size\n  || currentFourPosition.y > stageGrid_size || currentFourPosition.y < -stageGrid_size\n  || currentFourPosition.z > stageGrid_size || currentFourPosition.z < -stageGrid_size) ? 1.0 : 0.0;\n\n  return (outsideGrid > 0. || undefinedBuffer > 0. || beyondProgressLower > 0. || beyondProgressUpper > 0.) ? 1.0 : 0.0;\n\n}\n\nvoid main () {\n\n  #ifdef lighting\n  vDiffuseColor = get_color(aParticle).rgb;\n  #endif\n\n  #ifdef shadow\n  vDiffuseColor = shadowColor;\n  #endif\n\n  float previousBufferHead = (aStep < 1.) ? bufferLength : aStep - 1.;\n  vec4 previousFourPosition = get_position(aParticle, previousBufferHead);\n  vec4 currentFourPosition = get_position(aParticle, aStep);\n\n  mat4 lookAtMat4 = lookAt(currentFourPosition.xyz, previousFourPosition.xyz, vec3(0., 1, 0.));\n\n  float scale = 1.;\n  #ifdef lighting\n  scale = 1.;\n  #endif\n\n  #ifdef shadow\n  scale = 2.;\n  if (aPosition.z < 0.) toBeDiscarded = 1.;\n  #endif\n\n  vec3 scaledPosition = vec3(\n  scale * aPosition.x,\n  aPosition.y,\n  scale * aPosition.z * (length(previousFourPosition.xyz - currentFourPosition.xyz) - pathicleGap));\n\n  vPosition = vec3(1., 1., 1.) * (((lookAtMat4 * vec4(scaledPosition, 1.)).xyz\n  + 0.5 * (currentFourPosition.xyz + previousFourPosition.xyz)));\n  #ifdef shadow\n  vPosition.y = vPosition.y * 0. + stageGrid_y + .1;\n  #endif\n  vNormal = normalize((transpose(inverse(lookAtMat4)) * vec4(aNormal, 0.)).xyz);\n\n  gl_Position = projection * view * model * vec4(vPosition, 1.0);\n\n  #ifdef lighting\n  vColorCorrection =  -1. * aColorCorrection;\n\n  if (\n  abs(dot(\n  aNormal,\n  vec3(0., 0., 1.)\n  )) == 1.) { vColorCorrection += -.2; }\n\n    #endif\n\n    #ifdef shadow\n  vColorCorrection = 0.;\n  #endif\n\n  toBeDiscarded = calculateToBeDiscarded(previousFourPosition, currentFourPosition);\n\n}\n\n"; // eslint-disable-line

var frag$1 = "precision highp float;\n#define GLSLIFY 1\n\nvarying float toBeDiscarded;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vDiffuseColor;\nvarying float vColorCorrection;\n\nuniform float ambientIntensity;\nuniform float stageGrid_size;\nuniform vec3 eye;\n\nvoid main () {\n\n  if (toBeDiscarded > .0) discard;\n\n  if (length(vPosition.z) > stageGrid_size/2. - .5) discard;\n\n  vec3 materialColor = (1. + vColorCorrection) * vDiffuseColor;\n  vec3 ambientColor = (ambientIntensity * vec3(1., 1., 1.) * materialColor).rgb;\n  vec3 lightingColor = 3. * ambientColor;\n\n  float opacity = 1.;\n  #ifdef shadow\n  gl_FragColor = vec4(0.6, 0.6, 0.6, .5);\n  #endif\n  #ifdef lighting\n  gl_FragColor = vec4(lightingColor, opacity);\n  #endif\n\n}\n\n"; // eslint-disable-line

var fromTranslation_1 = fromTranslation;

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.translate(dest, dest, vec)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
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

function drawModelCommands(regl, { variables, model, view }) {
  const createGeometry = ({ pathicleWidth, pathicleRelativeHeight }) =>
    primitiveCube(pathicleWidth, pathicleWidth * pathicleRelativeHeight, 1);

  const geometry = createGeometry({
    pathicleWidth: view.pathicleWidth,
    pathicleRelativeHeight: view.pathicleRelativeHeight
  });

  let modelMatrix = identity_1([]);

  const command = mode =>
    regl({
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
        color: [1, 1, 0, 1]
      },
      primitive: 'triangles',
      elements: geometry.cells,
      instances: () =>
        model.particleCount *
        Math.min(variables.tick.value + 1, model.bufferLength),

      attributes: {
        aPosition: geometry.positions,
        aNormal: geometry.normals,
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
                const x = Math.floor(p / n) - n / 2;
                const y = (p % Math.sqrt(model.particleCount)) - n / 2;

                const r = (y ** 2 + x ** 2) / n ** 2;

                return 0.5 * Math.pow(Math.cos(2 * r), 4)
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

      uniforms: {
        ambientIntensity: view.ambientIntensity,
        utParticleColorAndType: () => variables.particleColorsAndTypes,
        utPositionBuffer: () => variables.position[0],
        viewRange: (ctx, props) => {
          return props.viewRange || [0, 1]
        },
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
    });

  return {
    lighting: command('lighting'),
    shadow: command('shadow')
  }
}

var frag$2 = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D uTex;\nuniform float ambientIntensity;\n//\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n\nvoid main() {\n\n  vec4 materialColor = vec4(1. * texture2D(uTex, 10. * vUv).r  * vec3(1.), 1.);\n  vec4 ambientColor = (ambientIntensity * materialColor);\n  vec4 lightingColor = vec4(1.*materialColor.rgb, 1.);\n\n  gl_FragColor = vec4(lightingColor.rgb, 1.);\n\n}\n"; // eslint-disable-line

var vert$2 = "precision highp float;\n#define GLSLIFY 1\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\n//\nuniform vec3 uOffset;\nuniform mat4 projection;\nuniform mat4 view;\n//\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\n\nvoid main () {\n  vUv = uv;\n  vNormal = normal;\n  vPosition = position +  uOffset;\n\n  gl_Position = projection * view * vec4(vPosition, 1.);\n}\n"; // eslint-disable-line

function drawStageCommands(regl, { stageGrid }) {
  const stage = primitiveCube(stageGrid.size, 0.1, stageGrid.size);
  const texData = createTexture(stageGrid);

  const command = () => {
    return regl({
      blend: {
        enable: true,
        func: {
          srcRGB: 'src alpha',
          srcAlpha: 'src alpha',
          dstRGB: 'one minus src alpha',
          dstAlpha: 'one minus src alpha'
        },
        equation: {
          rgb: 'add',
          alpha: 'add'
        },
        color: [0, 0, 0, 1]
      },
      primitive: 'triangles',
      elements: stage.cells,
      attributes: {
        position: stage.positions,
        uv: stage.uvs,
        normal: stage.normals
      },
      uniforms: {
        uOffset: [0, stageGrid.y - 0.0, 0],
        uTex: regl.texture({
          width: stageGrid.resolution,
          height: stageGrid.resolution,
          min: 'linear mipmap linear',
          wrap: 'repeat',
          mag: 'linear',
          data: texData
        })
      },
      vert: vert$2,
      frag: frag$2
    })
  };

  return {
    lighting: command()
  }
}

function createTexture({ dark = 0, light = 1, resolution = 512 } = {}) {
  const dark255 = dark * 255;

  const texData = [];
  // make cube texture.
  for (let y = 0; y < resolution; ++y) {
    for (let x = 0; x < resolution; ++x) {
      let ind = 4 * (y * resolution + x);

      const borderWidth = 1 / resolution;
      const uvx = x / resolution;
      const uvy = y / resolution;

      const k = Math.min(uvx, Math.min(uvy, Math.min(1.0 - uvx, 1.0 - uvy)));

      if (k < borderWidth) {
        texData[ind + 0] = light * 255;
        texData[ind + 1] = light * 255;
        texData[ind + 2] = light * 255;
        texData[ind + 3] = 255;
      } else if (
        Math.abs(uvx - 0.125) < borderWidth ||
        Math.abs(uvx - 0.25) < borderWidth ||
        Math.abs(uvx - 0.375) < borderWidth ||
        Math.abs(uvx - 0.5) < borderWidth ||
        Math.abs(uvx - 0.625) < borderWidth ||
        Math.abs(uvx - 0.75) < borderWidth ||
        Math.abs(uvx - 0.875) < borderWidth ||
        Math.abs(uvy - 0.125) < borderWidth ||
        Math.abs(uvy - 0.25) < borderWidth ||
        Math.abs(uvy - 0.375) < borderWidth ||
        Math.abs(uvy - 0.5) < borderWidth ||
        Math.abs(uvy - 0.625) < borderWidth ||
        Math.abs(uvy - 0.75) < borderWidth ||
        Math.abs(uvy - 0.875) < borderWidth
      ) {
        texData[ind] = (light + dark) * 255;
        texData[ind + 1] = (light + dark) * 255;
        texData[ind + 2] = (light + dark) * 255;
        texData[ind + 3] = 255;
      } else {
        texData[ind] = dark255;
        texData[ind + 1] = dark255;
        texData[ind + 2] = dark255;
        texData[ind + 3] = 255;
      }
    }
  }

  return texData
}

function boxesView(regl, { variables, model, config }) {
  const uniforms = {
    //model
    bufferLength: model.bufferLength,
    particleCount: model.particleCount,
    stepCount: model.stepCount || model.bufferLength,
    pathicleGap: config.view.pathicleRelativeGap * config.view.pathicleWidth,
    pathicleWidth: config.view.pathicleWidth,
    viewRange: regl.prop('viewRange'),
    ambient: (ctx, props) => new Array(3).fill(props.ambientIntensity),
    pointLightPosition: config.view.lights[0].position,
    dt: 2 * model.halfDeltaTOverC,
    rgbGamma: config.view.rgbGamma
  };

  const setParams = regl({
    uniforms: uniforms
  });

  const drawModel = drawModelCommands(regl, {
    variables,
    model,
    view: config.view
  });
  const drawStage = drawStageCommands(regl, config.view);
  const drawBackground = drawBackgroundCommand(regl);
  // const drawTextCommand = drawTextCommands(regl)

  function drawDiffuse(props) {
    setParams(config.view, () => {
      drawBackground();
      config.view.isStageVisible && drawStage.lighting(props);
      config.view.isShadowEnabled && drawModel.shadow(props);
      drawModel.lighting(props);
      // drawTextCommand.lighting()
    });
  }

  const destroy = () => {};

  return {
    destroy,
    drawDiffuse
  }
}

function interpolate(t, degree, points, knots, weights, result) {

  var i,j,s,l;              // function-scoped iteration variables
  var n = points.length;    // points count
  var d = points[0].length; // point dimensionality

  if(degree < 1) throw new Error('degree must be at least 1 (linear)');
  if(degree > (n-1)) throw new Error('degree must be less than or equal to point count - 1');

  if(!weights) {
    // build weight vector of length [n]
    weights = [];
    for(i=0; i<n; i++) {
      weights[i] = 1;
    }
  }

  if(!knots) {
    // build knot vector of length [n + degree + 1]
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

  // remap t to the domain where the spline is defined
  var low  = knots[domain[0]];
  var high = knots[domain[1]];
  t = t * (high - low) + low;

  if(t < low || t > high) throw new Error('out of bounds');

  // find s (the spline segment) for the [t] value provided
  for(s=domain[0]; s<domain[1]; s++) {
    if(t >= knots[s] && t <= knots[s+1]) {
      break;
    }
  }

  // convert points to homogeneous coordinates
  var v = [];
  for(i=0; i<n; i++) {
    v[i] = [];
    for(j=0; j<d; j++) {
      v[i][j] = points[i][j] * weights[i];
    }
    v[i][d] = weights[i];
  }

  // l (level) goes from 1 to the curve degree + 1
  var alpha;
  for(l=1; l<=degree+1; l++) {
    // build level l of the pyramid
    for(i=s; i>s-degree-1+l; i--) {
      alpha = (t - knots[i]) / (knots[i+degree+1-l] - knots[i]);

      // interpolate each component
      for(j=0; j<d+1; j++) {
        v[i][j] = (1 - alpha) * v[i-1][j] + alpha * v[i][j];
      }
    }
  }

  // convert back to cartesian and return
  var result = result || [];
  for(i=0; i<d; i++) {
    result[i] = v[s][i] / v[s][d];
  }

  return result;
}


var bSpline = interpolate;

var defaultConfig = {
  MAX_CANVAS_SIZE: 1024,
  MAX_PARTICLE_COUNT: 512,
  MAX_BUFFER_LENGTH: 256,
  logPushing: false,
  logPerformance: false,

  stats: false,
  profile: false,

  colors: [
    [0.7, 0.7, 0.0],
    [0.12, 0.45, 0.65],
    [0.12, 0.45, 0.65],
    [0.77, 0.2, 0.2]
  ],
  usePostProcessing: false,
  pusher: 'boris', // "boris", "euler"

  // bunch
  // "row", "column", "cross", "square", "disc"

  runner: {
    prerender: true,
    looping: false,

    mode: 'framewise',
    stepsPerTick: 2,
    stepCount: 128
  },

  // view
  view: {
    // cameraPositionSploints: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    // cameraTargetSploints: [[0, 0, -5], [0, 0, -5], [0, 0, -5]],

    ssaoEnabled: false,

    stageGrid: {
      resolution: 128,
      y: -1,
      size: 20,
      dark: 1,
      light: 0.8
    },

    sky: [0.9, 0.9, 0.9, 1],

    shadowColor: [0.3, 0.3, 0.3],
    ambientIntensity: 0.6,
    diffuse: 0,
    //drawBoundingBox: true,
    exposure: 0.2,
    fresnel: 1.0,
    fxaa: false,
    rgbGamma: 1,

    isStageVisible: true,
    isShadowEnabled: true,
    isLatticeVisible: false,

    pathicleRelativeGap: 1,
    pathicleRelativeHeight: 5,
    pathicleWidth: 0.005,

    roughness: 0.7,
    showTextures: false,
    specular: 1,
    ssaoBlurPower: 2,
    ssaoBlurRadius: 0.1,
    ssaoPower: 1,
    ssaoSampleCount: 32,

    texelSize: 1,
    viewRange: [0, 1],
    lights: [
      {
        position: [0, 1, 0],
        direction: [1, 1, 0],
        color: new Array(3).fill(0)
      },
      {
        position: [0, 1, 0],
        direction: [-1, -1, 0],
        color: new Array(3).fill(0)
      }
    ],

    camera: {
      center: [0, 0, 0],
      theta: Math.PI / 2,
      phi: 0,
      distance: 5,

      fovY: Math.PI / 4,
      dTheta: 0.001,
      autorotate: false,
      // rotationDecayTime: 0,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: 1,
      // panDecayTime: 0,
      far: 50,
      near: 0.0001
    }
  },
  model: {
    bufferLength: 128,
    tickDurationOverC: 0.25,
    boundingBoxSize: -1,
    emitter: {
      // "electron", "photon", "proton", "mixed"
      particleType: 'ELECTRON',
      randomize: false,

      // "row", "column", "cross", "square", "disc"
      bunchShape: 'SQUARE',
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
  }
};

var storyDipole = {
  view: {
    camera: {
      center: [0, 0.1, 0],
      theta: 0.0,
      phi: 0.3,
      distance: 10
    }
  },

  model: {
    // tickDurationOverC: 0.25,
    emitter: {
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE',
      direction: [0, 0.2, -1],
      position: [3.2, -1, 0],
      directionJitter: [0.05, 0.0, 0.05],
      positionJitter: [0.1, 0.1, 0.1],

      gamma: 900
    },
    interactions: {
      magneticField: [0, 0.5, 0],
      particleInteraction: false
    },

    lattice: {
      elements: {
        l2: {
          type: 'DRIF',
          l: 0
        },
        bm: {
          type: 'SBEN',
          angle: 0.78539816,
          e1: 0.39269908,
          e2: 0.39269908,
          l: 10,
          k1: -0.5
        }
      },
      beamline: [],
      origin: {
        phi: 0,
        position: [-5, 1, 0]
      }
    }
  }
};

var storyElectric = {
  view: {
    camera: {
      center: [-2, 0.1, 0],
      theta: 0.4,
      phi: 0,
      distance: 6
    }
  },

  // runner: {
  //   prerender: false,
  //   looping: false,
  //
  //   mode: 'framewise',
  //   stepsPerTick: 1,
  //   stepCount: 256
  // },

  model: {
    // tickDurationOverC: 0.125,
    // bufferLength: 128,
    emitter: {
      particleType: 'PROTON ELECTRON  PHOTON',
      bunchShape: 'SQUARE',
      // particleCount: 3,
      direction: [0, 0, 1],
      position: [0, 1, -10],
      directionJitter: [0.01, 0.01, 0],
      positionJitter: [0.1, 0.1, 0],

      gamma: 1.1
    },

    interactions: {
      electricField: [0, 0, 0.0001],
      particleInteraction: false
    },
    lattice: {
      elements: {
        l1: {
          type: 'DRIF',
          l: 3
        },
        q1: {
          type: 'QUAD',
          k1: 0,
          l: 3
        },
        q2: {
          type: 'QUAD',
          k1: -0,
          l: 3
        },
        l2: {
          type: 'DRIF',
          l: 3
        }
      },
      beamline: ['l1', 'q1', 'q2', 'l2'],
      origin: {
        phi: 0,
        position: [0, 1, -6]
      }
    }
  }
};

var storyQuadrupole = {
  view: {
    camera: {
      center: [0, 1, 0],
      theta: (2 * Math.PI) / (360 / 90),
      phi: 0,
      distance: 10
    }
  },
  model: {
    emitter: {
      bunchShape: 'SQUARE_YZ',
      particleType:
        'ELECTRON ELECTRON ELECTRON PROTON ELECTRON ELECTRON ELECTRON ELECTRON  PHOTON',
      position: [-10, 1, 0],
      direction: [1, 0, 0],
      directionJitter: [0, 0.1, 0.1],
      positionJitter: [0, 0.1, 0.1],
      gamma: 1000
    },

    lattice: {
      elements: {
        l1: {
          type: 'DRIF',
          l: 3
        },
        q1: {
          type: 'QUAD',
          k1: -0.05,
          l: 3
        },
        q2: {
          type: 'QUAD',
          k1: 0.15,
          l: 3
        },
        l2: {
          type: 'DRIF',
          l: 3
        }
      },
      beamline: ['l1', 'q1', 'q2', 'l2'],
      origin: {
        phi: -Math.PI / 2,
        position: [-10, 1, 0]
      }
    }
  }
};

var storyEmpty = {
  view: {
    camera: {
      center: [-2, 0.1, 0],
      theta: 0.4,
      phi: 0,
      distance: 6
    }
  },

  // runner: {
  //   prerender: false,
  //   looping: false,
  //
  //   mode: 'framewise',
  //   stepsPerTick: 1,
  //   stepCount: 256
  // },

  model: {
    // tickDurationOverC: 0.125,
    // bufferLength: 128,
    emitter: {
      particleType: 'PROTON ELECTRON  PHOTON',
      bunchShape: 'SQUARE',
      // particleCount: 3,
      direction: [0, 0, 1],
      position: [0, 1, -10],
      directionJitter: [0.01, 0.01, 0],
      positionJitter: [0.1, 0.1, 0],

      gamma: 1.1
    },

    interactions: {
      electricField: [0, 0, 0],
      particleInteraction: false
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

var storyLoop = {
  view: {
    camera: {
      center: [-2, 0.1, 0],
      theta: 0.4,
      phi: 0,
      distance: 6
    }
  },

  runner: {
    looping: true
  },

  model: {
    // tickDurationOverC: 0.125,
    // bufferLength: 128,
    emitter: {
      particleType: 'PROTON ELECTRON  PHOTON',
      bunchShape: 'SQUARE',
      // particleCount: 3,
      direction: [0, 0, 1],
      position: [0, 1, -10],
      directionJitter: [0.01, 0.01, 0],
      positionJitter: [0.1, 0.1, 0],

      gamma: 1.1
    },

    interactions: {
      electricField: [0, 0, 0.0001],
      particleInteraction: false
    },
    lattice: {
      elements: {
        l1: {
          type: 'DRIF',
          l: 3
        },
        q1: {
          type: 'QUAD',
          k1: 0,
          l: 3
        },
        q2: {
          type: 'QUAD',
          k1: -0,
          l: 3
        },
        l2: {
          type: 'DRIF',
          l: 3
        }
      },
      beamline: ['l1', 'q1', 'q2', 'l2'],
      origin: {
        phi: 0,
        position: [0, 1, -6]
      }
    }
  }
};

// ES6 Map
var map;
try {
  map = Map;
} catch (_) {}
var set;

// ES6 Set
try {
  set = Set;
} catch (_) {}

function clone (src) {
  // Null/undefined/functions/etc
  if (!src || typeof src !== 'object' || typeof src === 'function') {
    return src
  }

  // DOM Node
  if (src.nodeType && 'cloneNode' in src) {
    return src.cloneNode(true)
  }

  // Date
  if (src instanceof Date) {
    return new Date(src.getTime())
  }

  // RegExp
  if (src instanceof RegExp) {
    return new RegExp(src)
  }

  // Arrays
  if (Array.isArray(src)) {
    return src.map(clone)
  }

  // ES6 Maps
  if (map && src instanceof map) {
    return new Map(Array.from(src.entries()))
  }

  // ES6 Sets
  if (set && src instanceof set) {
    return new Set(Array.from(src.values()))
  }

  // Object
  if (src instanceof Object) {
    var obj = {};
    for (var key in src) {
      obj[key] = clone(src[key]);
    }
    return obj
  }

  // ???
  return src
}

var nanoclone = clone;

var types = [
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
        return nanoclone(b);
      },

      concat: function(merger, a, b) {
        return [].concat(a).concat(b);
      }
    }
  }
];

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

  this.types = (config.types.mode === "add" ? types_1 : []).concat(
    config.types.list
  );

  this.config = config;
}

Merge.prototype.determineType = function(a, b) {
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

Merge.prototype.step = function(a, b) {
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

Merge.prototype.merge = function() {
  var elements = Array.prototype.slice.call(arguments);

  var result;

  for (var i = elements.length; i > 0; --i) {
    result = this.step(elements.pop(), result);
  }

  return result;
};

var merge = Merge;

var merger = new merge();

/**
 * Nanomerge wrapper
 *
 * @description - merges all the items passed to it into one using the default settings
 * @params {[*]} - Items to merge
 * @return {*} - merged item
 */
var nanomerge = function nanomerge() {
  return merger.merge.apply(merger, arguments);
};

var index = [
  nanomerge({ name: 'story-electric' }, defaultConfig, storyElectric),
  nanomerge({ name: 'story-dipole' }, defaultConfig, storyDipole),
  nanomerge({ name: 'story-quadrupole' }, defaultConfig, storyQuadrupole),
  nanomerge({ name: 'story-empty' }, defaultConfig, storyEmpty),
  nanomerge({ name: 'story-loop' }, defaultConfig, storyLoop)
];

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

// based on https://github.com/rreusser/rreusser.github.io/blob/master/src/src/flamms-paraboloid/sequencer.js

function sequencer(regl, scenes, stateVars, onStateChange) {
  const totalDuration = scenes.reduce((acc, itm) => acc + itm.dt, 0);

  let t = 0;
  scenes.forEach((scene, s) => {
    scene.presetName = scene.preset;
    scene.preset =
      index.find(p => p.name === scene.preset) ||
      index.find(p => p.name === 'story-empty');

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
        // console.log("imported data for " + scene)
        scene.position[0]({
          width: scene.particleCount,
          height: scene.bufferLength,
          min: 'nearest',
          mag: 'nearest',
          format: 'rgba',
          data: new Float32Array(data.position)
        });
        scene.particleColorsAndTypes({
          data: data.particleTypes
            .map(p => index[0].colors[p].concat(p))
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
      // lattice: new Lattice(scene.preset.model.lattice),
      // latticeConfig: scene.preset.model.lattice,
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
    scene._t0_normalized = t / totalDuration;
    scene._t1 = t + scene.dt;
    scene._t1_normalized = scene._t1 / totalDuration;
    t = scene._t1;
    if (scene.cameraPositionSploints) {
      scene.cameraPositionBSpline = t =>
        bSpline(t / scene.dt, 2, scene.cameraPositionSploints);

      if (scene.cameraTargetSploints) {
        scene.cameraTargetBSpline = t =>
          bSpline(t / scene.dt, 2, scene.cameraTargetSploints);
      }
    }
  });

  const state = {
    sceneIdx: 0,
    scene: scenes[0]
  };
  const changed = {};

  function computeState(t) {
    // let newValue
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
    state.sceneTime = (t - state.scene._t0_normalized) * totalDuration;

    state.viewRange =
      state.sceneTime < 0.5
        ? [0, state.sceneTime * 2]
        : [state.sceneTime * 2 - 1, 1];
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

/* eslint-env browser  */

class ReglViewerInstance {
  constructor({ canvas, pixelRatio, control }) {
    this.config = index[0];

    this.control = control;

    REGL({
      canvas,
      attributes: {
        preserveDrawingBuffer: true,
        antialiasing: true
      },
      pixelRatio,
      extensions: ['angle_instanced_arrays', 'oes_texture_float'],
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

    this.view = boxesView(regl, {
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
    // console.log(this.control.scenes)

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

        let sceneTime;
        let viewRange;
        if (
          storyState.scene.pathicles &&
          storyState.scene.pathicles.preset === 'story-loop'
        ) {
          // if (this.loopTick >= 1024) {
          //   this.modelTranslateX = (Math.random() - 0.5) * 2
          //   this.modelTranslateY = (Math.random() - 0.5) * 0.5
          // }
          // this.loopTick = this.loopTick < 1024 ? this.loopTick + 8 : 0
          // sceneTime =
          //   this.loopTick < 128
          //     ? this.loopTick / 256
          //     : this.loopTick > 768
          //     ? (this.loopTick - 768) / 256 + 0.5
          //     : 0.5
          if (this.loopTick >= 128) {
            this.modelTranslateX = (Math.random() - 0.5) * 1;
            this.modelTranslateY = (Math.random() - 0.5) * 0.5;
          }
          this.loopTick = this.loopTick < 128 ? this.loopTick + 1 : 0;
          sceneTime =
            this.loopTick < 16
              ? this.loopTick / 32
              : this.loopTick > 96
              ? (this.loopTick - 96) / 32 + 0.5
              : 0.5;

          viewRange =
            sceneTime < 0.5 ? [0, sceneTime * 2] : [sceneTime * 2 - 1, 1];
        } else {
          sceneTime = storyState.sceneTime;
          viewRange = storyState.viewRange;
          this.modelTranslateX = 0;
          this.modelTranslateY = 0;
        }

        this.setCameraUniforms[this.control.cameraMode](
          {
            ...this.cameras[this.control.cameraMode],
            scene: storyState.scene,
            sceneTime
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

export { ReglViewerInstance };
