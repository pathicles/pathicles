import createREGL$1 from 'regl';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var transformMat4_1 = transformMat4;
function transformMat4(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out
}

var rotateY_1$2 = rotateY$2;
function rotateY$2(out, a, b, c){
    var bx = b[0];
    var bz = b[2];
    var px = a[0] - bx;
    var pz = a[2] - bz;
    var sc = Math.sin(c);
    var cc = Math.cos(c);
    out[0] = bx + pz * sc + px * cc;
    out[1] = a[1];
    out[2] = bz + pz * cc - px * sc;
    return out
}

var rotateX_1$2 = rotateX$2;
function rotateX$2(out, a, b, c){
    var by = b[1];
    var bz = b[2];
    var py = a[1] - by;
    var pz = a[2] - bz;
    var sc = Math.sin(c);
    var cc = Math.cos(c);
    out[0] = a[0];
    out[1] = by + py * cc - pz * sc;
    out[2] = bz + py * sc + pz * cc;
    return out
}

var epsilon = 0.000001;

var equals_1 = equals;
var EPSILON = epsilon;
function equals(a, b) {
  var a0 = a[0];
  var a1 = a[1];
  var a2 = a[2];
  var b0 = b[0];
  var b1 = b[1];
  var b2 = b[2];
  return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)))
}

var add_1$1 = add$2;
function add$2(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out
}

var scaleAndAdd_1 = scaleAndAdd;
function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out
}

var copy_1$2 = copy$3;
function copy$3(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out
}

var normalize_1$1 = normalize$4;
function normalize$4(out, a) {
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

var identity_1$1 = identity$2;
function identity$2(out) {
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

var invert_1$1 = invert$1;
function invert$1(out, a) {
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

var scale_1$2 = scale$3;
function scale$3(out, a, v) {
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

var identity$1 = identity_1$1;
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
        return identity$1(out);
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

var MAX_PHI = Infinity;
var MIN_PHI = -Infinity;
function createCamera(opts) {
  opts = opts || {};
  var willBeDirty = true;
  var params = {
    aspectRatio: opts.aspectRatio ? opts.aspectRatio : 1,
    zoomAboutCursor:
      opts.zoomAboutCursor === undefined ? true : opts.zoomAboutCursor,
    distance: opts.distance === undefined ? 10 : opts.distance,
    phi: opts.phi === undefined ? 0 : opts.phi,
    theta: opts.theta === undefined ? 0 : opts.theta,
    fovY: opts.fovY === undefined ? Math.PI / 4 : opts.fovY,
    near: opts.near === undefined ? 0.1 : opts.near,
    far: opts.far === undefined ? 100 : opts.far,
    panDecayTime: opts.panDecayTime || 100,
    zoomDecayTime: opts.zoomDecayTime || 100,
    rotationDecayTime: opts.rotationDecayTime || 100,
    dirty: true,
    up: opts.up || new Float32Array([0, 1, 0]),
    center: opts.center || new Float32Array(3),
    rotationCenter:
      opts.rotationCenter ||
      (opts.center && opts.center.slice()) ||
      new Float32Array(3),
    zoom: 0,
    panX: 0,
    panY: 0,
    panZ: 0,
    pitch: 0,
    yaw: 0,
    dTheta: 0,
    dPhi: 0,
    mouseX: 0,
    mouseY: 0
  };
  var t0 = null;
  var camera = {
    tick: function (mergeState) {
      if (accumulator.zoom) params.zoom = accumulator.zoom;
      if (accumulator.dTheta) params.dTheta = accumulator.dTheta;
      if (accumulator.dPhi) params.dPhi = accumulator.dPhi;
      if (accumulator.panX) params.panX = accumulator.panX;
      if (accumulator.panY) params.panY = accumulator.panY;
      if (accumulator.panZ) params.panZ = accumulator.panZ;
      if (accumulator.yaw) params.yaw = accumulator.yaw;
      if (accumulator.pitch) params.pitch = accumulator.pitch;
      zeroChanges(accumulator);
      if (mergeState) {
        var cachedDPhi = params.dPhi;
        var cachedDTheta = params.dTheta;
        var cachedZoom = params.zoom;
        var cachedPanX = params.panX;
        var cachedPanY = params.panY;
        var cachedPanZ = params.panZ;
        var cachedPitch = params.pitch;
        var cachedYaw = params.yaw;
        Object.assign(params, mergeState);
        if (mergeState.dPhi !== undefined) params.dPhi += cachedDPhi;
        if (mergeState.dTheta !== undefined) params.dTheta += cachedDTheta;
        if (mergeState.zoom !== undefined) params.zoom += cachedZoom;
        if (mergeState.panX !== undefined) params.panX += cachedPanX;
        if (mergeState.panY !== undefined) params.panY += cachedPanY;
        if (mergeState.panZ !== undefined) params.panZ += cachedPanZ;
        if (mergeState.pitch !== undefined) params.pitch += cachedPitch;
        if (mergeState.yaw !== undefined) params.yaw += cachedYaw;
      }
      if (paramsVectorHasChanged()) {
        applyStateChanges();
      }
      if (viewIsChanging()) {
        applyViewChanges(params);
      } else {
        zeroChanges(params);
      }
      var t = Date.now();
      if (t0 !== null) decay(t - t0);
      t0 = t;
      camera.state.dirty = willBeDirty;
      willBeDirty = false;
      storeCurrentState();
    },
    taint: taint,
    resize: resize,
    params: params,
    rotate: rotate,
    pivot: pivot,
    pan: pan,
    zoom: zoom
  };
  camera.state = {};
  camera.state.projection = new Float32Array(16);
  camera.state.viewInv = new Float32Array(16);
  camera.state.view = new Float32Array(16);
  camera.state.width = null;
  camera.state.height = null;
  camera.state.eye = new Float32Array(3);
  var tmp = new Float32Array(3);
  var viewUp = new Float32Array(3);
  var viewRight = new Float32Array(3);
  var viewForward = new Float32Array(3);
  var origin = new Float32Array(3);
  var dView = new Float32Array(16);
  var previousState = {
    up: new Float32Array(3),
    center: new Float32Array(3)
  };
  storeCurrentState();
  function storeCurrentState() {
    copy_1$2(previousState.up, params.up);
    copy_1$2(previousState.center, params.center);
    previousState.near = params.near;
    previousState.far = params.far;
    previousState.distance = params.distance;
    previousState.phi = params.phi;
    previousState.theta = params.theta;
    previousState.fovY = params.fovY;
  }
  function paramsVectorHasChanged() {
    if (!equals_1(params.up, previousState.up)) return true
    if (!equals_1(params.center, previousState.center)) return true
    if (params.near !== previousState.near) return true
    if (params.far !== previousState.far) return true
    if (params.phi !== previousState.phi) return true
    if (params.theta !== previousState.theta) return true
    if (params.distance !== previousState.distance) return true
    if (params.fovY !== previousState.fovY) return true
    return false
  }
  var paramsChanges = {};
  function applyStateChanges() {
    paramsChanges.dPhi = params.phi - previousState.phi;
    paramsChanges.dTheta = params.theta - previousState.theta;
    paramsChanges.zoom = params.distance / previousState.distance - 1;
    params.theta = previousState.theta;
    params.distance = previousState.distance;
    params.phi = previousState.phi;
    paramsChanges.yaw = 0;
    paramsChanges.pitch = 0;
    paramsChanges.panX = 0;
    paramsChanges.panY = 0;
    paramsChanges.panZ = 0;
    paramsChanges.mouseX = 0;
    paramsChanges.mouseY = 0;
    applyViewChanges(paramsChanges);
  }
  function computeMatrices() {
    camera.state.eye[0] = 0;
    camera.state.eye[1] = 0;
    camera.state.eye[2] = params.distance;
    rotateX_1$2(camera.state.eye, camera.state.eye, origin, -params.phi);
    rotateY_1$2(camera.state.eye, camera.state.eye, origin, params.theta);
    add_1$1(camera.state.eye, camera.state.eye, params.center);
    lookAt_1(camera.state.view, camera.state.eye, params.center, params.up);
    perspective_1(
      camera.state.projection,
      params.fovY,
      camera.params.aspectRatio,
      params.near,
      params.far
    );
    invert_1$1(camera.state.viewInv, camera.state.view);
  }
  function taint() {
    willBeDirty = true;
  }
  function resize(aspectRatio) {
    camera.params.aspectRatio = aspectRatio;
    computeMatrices();
    taint();
  }
  function viewIsChanging() {
    if (Math.abs(params.zoom) > 1e-4) return true
    if (Math.abs(params.panX) > 1e-4) return true
    if (Math.abs(params.panY) > 1e-4) return true
    if (Math.abs(params.panZ) > 1e-4) return true
    if (Math.abs(params.dTheta) > 1e-4) return true
    if (Math.abs(params.dPhi) > 1e-4) return true
    if (Math.abs(params.yaw) > 1e-4) return true
    if (Math.abs(params.pitch) > 1e-4) return true
  }
  function zeroChanges(obj) {
    obj.zoom = 0;
    obj.dTheta = 0;
    obj.dPhi = 0;
    obj.panX = 0;
    obj.panY = 0;
    obj.panZ = 0;
    obj.yaw = 0;
    obj.pitch = 0;
  }
  function decay(dt) {
    var panDecay = params.panDecayTime
      ? Math.exp(-dt / params.panDecayTime / Math.LN2)
      : 0;
    var zoomDecay = params.zoomDecayTime
      ? Math.exp(-dt / params.zoomDecayTime / Math.LN2)
      : 0;
    var rotateDecay = params.rotationDecayTime
      ? Math.exp(-dt / params.rotationDecayTime / Math.LN2)
      : 0;
    params.zoom *= zoomDecay;
    params.panX *= panDecay;
    params.panY *= panDecay;
    params.panZ *= panDecay;
    params.dTheta *= rotateDecay;
    params.dPhi *= rotateDecay;
    params.yaw *= rotateDecay;
    params.pitch *= rotateDecay;
  }
  var accumulator = {};
  zeroChanges(accumulator);
  function pan(panX, panY) {
    var scaleFactor =
      camera.params.distance * Math.tan(camera.params.fovY * 0.5) * 2.0;
    accumulator.panX += panX * params.aspectRatio * scaleFactor;
    accumulator.panY += panY * scaleFactor;
    return camera
  }
  function zoom(mouseX, mouseY, zoom) {
    accumulator.zoom += zoom;
    params.mouseX = mouseX;
    params.mouseY = mouseY;
    return camera
  }
  function pivot(yaw, pitch) {
    var scaleFactor = camera.params.fovY;
    accumulator.yaw += yaw * scaleFactor * params.aspectRatio;
    accumulator.pitch += pitch * scaleFactor;
  }
  function rotate(dTheta, dPhi) {
    accumulator.dTheta += dTheta;
    accumulator.dPhi += dPhi;
  }
  function applyViewChanges(changes) {
    var zoomScaleFactor;
    identity_1$1(dView);
    if (params.zoomAboutCursor) {
      zoomScaleFactor = params.distance * Math.tan(params.fovY * 0.5);
      tmp[0] = changes.mouseX * params.aspectRatio * zoomScaleFactor;
      tmp[1] = changes.mouseY * zoomScaleFactor;
      tmp[2] = 0;
      translate_1(dView, dView, tmp);
    }
    tmp[0] = 1 + changes.zoom;
    tmp[1] = 1 + changes.zoom;
    tmp[2] = 1;
    scale_1$2(dView, dView, tmp);
    if (params.zoomAboutCursor) {
      zoomScaleFactor = params.distance * Math.tan(params.fovY * 0.5);
      tmp[0] = -changes.mouseX * params.aspectRatio * zoomScaleFactor;
      tmp[1] = -changes.mouseY * zoomScaleFactor;
      tmp[2] = 0;
      translate_1(dView, dView, tmp);
    }
    dView[12] -= changes.panX * 0.5;
    dView[13] -= changes.panY * 0.5;
    transformMat4_1(params.center, params.center, camera.state.view);
    transformMat4_1(params.center, params.center, dView);
    transformMat4_1(params.center, params.center, camera.state.viewInv);
    if (params.rotateAboutCenter) {
      copy_1$2(params.rotationCenter, params.center);
    }
    params.distance *= 1 + changes.zoom;
    var prevPhi = params.phi;
    params.phi += changes.dPhi;
    params.phi = Math.min(MAX_PHI, Math.max(MIN_PHI, params.phi));
    var dPhi = params.phi - prevPhi;
    var prevTheta = params.theta;
    params.theta += changes.dTheta;
    var dTheta = params.theta - prevTheta;
    rotateY_1$2(
      params.center,
      params.center,
      params.rotationCenter,
      dTheta - params.theta
    );
    rotateX_1$2(params.center, params.center, params.rotationCenter, -dPhi);
    rotateY_1$2(
      params.center,
      params.center,
      params.rotationCenter,
      params.theta
    );
    if (changes.yaw !== 0 || changes.pitch !== 0) {
      viewRight[0] = camera.state.view[0];
      viewRight[1] = camera.state.view[4];
      viewRight[2] = camera.state.view[8];
      normalize_1$1(viewRight, viewRight);
      viewUp[0] = camera.state.view[1];
      viewUp[1] = camera.state.view[5];
      viewUp[2] = camera.state.view[9];
      normalize_1$1(viewUp, viewUp);
      viewForward[0] = camera.state.view[2];
      viewForward[1] = camera.state.view[6];
      viewForward[2] = camera.state.view[10];
      normalize_1$1(viewForward, viewForward);
      var clippedPhi = Math.min(
        MAX_PHI,
        Math.max(MIN_PHI, params.phi + changes.pitch * 0.5)
      );
      var clippedPitch = clippedPhi - params.phi;
      scaleAndAdd_1(
        params.center,
        params.center,
        viewRight,
        -Math.sin(changes.yaw * 0.5) * params.distance
      );
      scaleAndAdd_1(
        params.center,
        params.center,
        viewUp,
        -Math.sin(clippedPitch) * params.distance
      );
      scaleAndAdd_1(
        params.center,
        params.center,
        viewForward,
        (2 - Math.cos(changes.yaw * 0.5) - Math.cos(clippedPitch)) *
          params.distance
      );
      params.phi = clippedPhi;
      params.theta += changes.yaw * 0.5;
    }
    computeMatrices();
    taint();
  }
  resize(camera.params.aspectRatio);
  return camera
}

var mouse$1 = {};

function mouseButtons(ev) {
  if(typeof ev === 'object') {
    if('buttons' in ev) {
      return ev.buttons
    } else if('which' in ev) {
      var b = ev.which;
      if(b === 2) {
        return 4
      } else if(b === 3) {
        return 2
      } else if(b > 0) {
        return 1<<(b-1)
      }
    } else if('button' in ev) {
      var b = ev.button;
      if(b === 1) {
        return 4
      } else if(b === 2) {
        return 2
      } else if(b >= 0) {
        return 1<<b
      }
    }
  }
  return 0
}
mouse$1.buttons = mouseButtons;
function mouseElement(ev) {
  return ev.target || ev.srcElement || window
}
mouse$1.element = mouseElement;
function mouseRelativeX(ev) {
  if(typeof ev === 'object') {
    if('offsetX' in ev) {
      return ev.offsetX
    }
    var target = mouseElement(ev);
    var bounds = target.getBoundingClientRect();
    return ev.clientX - bounds.left
  }
  return 0
}
mouse$1.x = mouseRelativeX;
function mouseRelativeY(ev) {
  if(typeof ev === 'object') {
    if('offsetY' in ev) {
      return ev.offsetY
    }
    var target = mouseElement(ev);
    var bounds = target.getBoundingClientRect();
    return ev.clientY - bounds.top
  }
  return 0
}
mouse$1.y = mouseRelativeY;

var mouseListen_1 = mouseListen;
var mouse = mouse$1;
function mouseListen (element, callback) {
  if (!callback) {
    callback = element;
    element = window;
  }
  var buttonState = 0;
  var x = 0;
  var y = 0;
  var mods = {
    shift: false,
    alt: false,
    control: false,
    meta: false
  };
  var attached = false;
  function updateMods (ev) {
    var changed = false;
    if ('altKey' in ev) {
      changed = changed || ev.altKey !== mods.alt;
      mods.alt = !!ev.altKey;
    }
    if ('shiftKey' in ev) {
      changed = changed || ev.shiftKey !== mods.shift;
      mods.shift = !!ev.shiftKey;
    }
    if ('ctrlKey' in ev) {
      changed = changed || ev.ctrlKey !== mods.control;
      mods.control = !!ev.ctrlKey;
    }
    if ('metaKey' in ev) {
      changed = changed || ev.metaKey !== mods.meta;
      mods.meta = !!ev.metaKey;
    }
    return changed
  }
  function handleEvent (nextButtons, ev) {
    var nextX = mouse.x(ev);
    var nextY = mouse.y(ev);
    if ('buttons' in ev) {
      nextButtons = ev.buttons | 0;
    }
    if (nextButtons !== buttonState ||
      nextX !== x ||
      nextY !== y ||
      updateMods(ev)) {
      buttonState = nextButtons | 0;
      x = nextX || 0;
      y = nextY || 0;
      callback && callback(buttonState, x, y, mods);
    }
  }
  function clearState (ev) {
    handleEvent(0, ev);
  }
  function handleBlur () {
    if (buttonState ||
      x ||
      y ||
      mods.shift ||
      mods.alt ||
      mods.meta ||
      mods.control) {
      x = y = 0;
      buttonState = 0;
      mods.shift = mods.alt = mods.control = mods.meta = false;
      callback && callback(0, 0, 0, mods);
    }
  }
  function handleMods (ev) {
    if (updateMods(ev)) {
      callback && callback(buttonState, x, y, mods);
    }
  }
  function handleMouseMove (ev) {
    if (mouse.buttons(ev) === 0) {
      handleEvent(0, ev);
    } else {
      handleEvent(buttonState, ev);
    }
  }
  function handleMouseDown (ev) {
    handleEvent(buttonState | mouse.buttons(ev), ev);
  }
  function handleMouseUp (ev) {
    handleEvent(buttonState & ~mouse.buttons(ev), ev);
  }
  function attachListeners () {
    if (attached) {
      return
    }
    attached = true;
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', clearState);
    element.addEventListener('mouseenter', clearState);
    element.addEventListener('mouseout', clearState);
    element.addEventListener('mouseover', clearState);
    element.addEventListener('blur', handleBlur);
    element.addEventListener('keyup', handleMods);
    element.addEventListener('keydown', handleMods);
    element.addEventListener('keypress', handleMods);
    if (element !== window) {
      window.addEventListener('blur', handleBlur);
      window.addEventListener('keyup', handleMods);
      window.addEventListener('keydown', handleMods);
      window.addEventListener('keypress', handleMods);
    }
  }
  function detachListeners () {
    if (!attached) {
      return
    }
    attached = false;
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mousedown', handleMouseDown);
    element.removeEventListener('mouseup', handleMouseUp);
    element.removeEventListener('mouseleave', clearState);
    element.removeEventListener('mouseenter', clearState);
    element.removeEventListener('mouseout', clearState);
    element.removeEventListener('mouseover', clearState);
    element.removeEventListener('blur', handleBlur);
    element.removeEventListener('keyup', handleMods);
    element.removeEventListener('keydown', handleMods);
    element.removeEventListener('keypress', handleMods);
    if (element !== window) {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('keyup', handleMods);
      window.removeEventListener('keydown', handleMods);
      window.removeEventListener('keypress', handleMods);
    }
  }
  attachListeners();
  var result = {
    element: element
  };
  Object.defineProperties(result, {
    enabled: {
      get: function () { return attached },
      set: function (f) {
        if (f) {
          attachListeners();
        } else {
          detachListeners();
        }
      },
      enumerable: true
    },
    buttons: {
      get: function () { return buttonState },
      enumerable: true
    },
    x: {
      get: function () { return x },
      enumerable: true
    },
    y: {
      get: function () { return y },
      enumerable: true
    },
    mods: {
      get: function () { return mods },
      enumerable: true
    }
  });
  return result
}

var rootPosition = { left: 0, top: 0 };
var mouseEventOffset_1 = mouseEventOffset;
function mouseEventOffset (ev, target, out) {
  target = target || ev.currentTarget || ev.srcElement;
  if (!Array.isArray(out)) {
    out = [ 0, 0 ];
  }
  var cx = ev.clientX || 0;
  var cy = ev.clientY || 0;
  var rect = getBoundingClientOffset(target);
  out[0] = cx - rect.left;
  out[1] = cy - rect.top;
  return out
}
function getBoundingClientOffset (element) {
  if (element === window ||
      element === document ||
      element === document.body) {
    return rootPosition
  } else {
    return element.getBoundingClientRect()
  }
}

var eventEmitter$1 = {exports: {}};

var d$1 = {exports: {}};

var _undefined$1 = void 0;
var is$4 = function (value) { return value !== _undefined$1 && value !== null; };

var isValue$5 = is$4;
var possibleTypes = { "object": true, "function": true, "undefined": true  };
var is$3 = function (value) {
	if (!isValue$5(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};

var isObject = is$3;
var is$2 = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};

var isPrototype = is$2;
var is$1 = function (value) {
	if (typeof value !== "function") return false;
	if (!hasOwnProperty.call(value, "length")) return false;
	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}
	return !isPrototype(value);
};

var isFunction = is$1;
var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;
var is = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};

var isImplemented$2 = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};

var isImplemented$1 = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};

var noop = function () {};

var _undefined = noop();
var isValue$4 = function (val) { return val !== _undefined && val !== null; };

var isValue$3 = isValue$4;
var keys$2 = Object.keys;
var shim$2 = function (object) { return keys$2(isValue$3(object) ? Object(object) : object); };

var keys$1 = isImplemented$1() ? Object.keys : shim$2;

var isValue$2 = isValue$4;
var validValue = function (value) {
	if (!isValue$2(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

var keys  = keys$1
  , value = validValue
  , max$2   = Math.max;
var shim$1 = function (dest, src) {
	var error, i, length = max$2(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

var assign$1 = isImplemented$2() ? Object.assign : shim$1;

var isValue$1 = isValue$4;
var forEach$1 = Array.prototype.forEach, create$4 = Object.create;
var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};
var normalizeOptions = function (opts1) {
	var result = create$4(null);
	forEach$1.call(arguments, function (options) {
		if (!isValue$1(options)) return;
		process(Object(options), result);
	});
	return result;
};

var str$1 = "razdwatrzy";
var isImplemented = function () {
	if (typeof str$1.contains !== "function") return false;
	return str$1.contains("dwa") === true && str$1.contains("foo") === false;
};

var indexOf = String.prototype.indexOf;
var shim = function (searchString) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

var contains$1 = isImplemented() ? String.prototype.contains : shim;

var isValue         = is$4
  , isPlainFunction = is
  , assign          = assign$1
  , normalizeOpts   = normalizeOptions
  , contains        = contains$1;
var d = (d$1.exports = function (dscr, value) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}
	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});
d.gs = function (dscr, get, set) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}
	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

var validCallable = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

(function (module, exports) {
var d        = d$1.exports
  , callable = validCallable
  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }
  , on, once, off, emit, methods, descriptors, base;
on = function (type, listener) {
	var data;
	callable(listener);
	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];
	return this;
};
once = function (type, listener) {
	var once, self;
	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});
	once.__eeOnceListener__ = listener;
	return this;
};
off = function (type, listener) {
	var data, listeners, candidate, i;
	callable(listener);
	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];
	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}
	return this;
};
emit = function (type) {
	var i, l, listener, listeners, args;
	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;
	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];
		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};
methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};
descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};
base = defineProperties({}, descriptors);
module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;
}(eventEmitter$1, eventEmitter$1.exports));

var eventEmitter = eventEmitter$1.exports;

const EVENT_LISTENER_OPTIONS = { passive: true, capture: false };
function normalizedInteractionEvents(element) {
  element = element || window;
  const emitter = eventEmitter();
  let previousPosition = [null, null];
  let previousFingerPosition = [null, null];
  let currentPosition = [null, null];
  let fingers = [null, null];
  let activeTouchCount = 0;
  let ev = {};
  let width, height;
  const getSize =
    element === window
      ? function () {
          width = window.innerWidth;
          height = window.innerHeight;
        }
      : function () {
          width = element.clientWidth;
          height = element.clientHeight;
        };
  let buttons = 0;
  let mouseX,
    mouseY,
    mods = {};
  const changeListener = mouseListen_1(
    element,
    function (pbuttons, px, py, pmods) {
      mouseX = px;
      mouseY = py;
      buttons = pbuttons;
      mods = pmods;
    }
  );
  function onWheel(event) {
    mouseEventOffset_1(event, element, currentPosition);
    getSize();
    ev.buttons = buttons;
    ev.mods = mods;
    ev.x0 = ev.x = ev.x1 = (2 * currentPosition[0]) / width - 1;
    ev.y0 = ev.y = ev.y1 = 1 - (2 * currentPosition[1]) / height;
    ev.x2 = null;
    ev.y2 = null;
    ev.dx = (2 * event.deltaX) / width;
    ev.dy = (-2 * event.deltaY) / height;
    ev.dz = (2 * event.deltaZ) / width;
    ev.active = 1;
    ev.zoomx = 1;
    ev.zoomy = 1;
    ev.theta = 0;
    ev.dtheta = 0;
    ev.originalEvent = event;
    emitter.emit('wheel', ev);
    previousPosition[0] = currentPosition[0];
    previousPosition[1] = currentPosition[1];
  }
  let x0 = null;
  let y0 = null;
  let active = 0;
  function onMouseUp(event) {
    mouseEventOffset_1(event, element, currentPosition);
    active = 0;
    getSize();
    ev.buttons = buttons;
    ev.mods = mods;
    ev.x = ev.x1 = (2 * currentPosition[0]) / width - 1;
    ev.y = ev.y1 = 1 - (2 * currentPosition[1]) / height;
    ev.x2 = null;
    ev.y2 = null;
    ev.active = active;
    ev.x0 = (2 * x0) / width - 1;
    ev.y0 = 1 - (2 * y0) / height;
    ev.dx = 0;
    ev.dy = 0;
    ev.dz = 0;
    ev.zoomx = 1;
    ev.zoomy = 1;
    ev.theta = 0;
    ev.dtheta = 0;
    ev.originalEvent = event;
    emitter.emit('mouseup', ev);
    x0 = y0 = null;
    previousPosition[0] = currentPosition[0];
    previousPosition[1] = currentPosition[1];
  }
  function onMouseDown(event) {
    mouseEventOffset_1(event, element, currentPosition);
    active = 1;
    getSize();
    x0 = mouseX;
    y0 = mouseY;
    ev.buttons = buttons;
    ev.mods = mods;
    ev.x = ev.x0 = ev.x1 = (2 * currentPosition[0]) / width - 1;
    ev.y = ev.y0 = ev.y1 = 1 - (2 * currentPosition[1]) / height;
    ev.x2 = null;
    ev.y2 = null;
    ev.active = active;
    ev.dx = 0;
    ev.dy = 0;
    ev.dz = 0;
    ev.zoomx = 1;
    ev.zoomy = 1;
    ev.theta = 0;
    ev.dtheta = 0;
    ev.originalEvent = event;
    emitter.emit('mousedown', ev);
    previousPosition[0] = currentPosition[0];
    previousPosition[1] = currentPosition[1];
  }
  function onMouseMove(event) {
    mouseEventOffset_1(event, element, currentPosition);
    getSize();
    ev.buttons = buttons;
    ev.mods = mods;
    ev.x0 = (2 * x0) / width - 1;
    ev.y0 = 1 - (2 * y0) / height;
    ev.x = ev.x1 = (2 * currentPosition[0]) / width - 1;
    ev.y = ev.y1 = 1 - (2 * currentPosition[1]) / height;
    ev.x2 = null;
    ev.y2 = null;
    ev.dx = (2 * (currentPosition[0] - previousPosition[0])) / width;
    ev.dy = (-2 * (currentPosition[1] - previousPosition[1])) / height;
    ev.active = active;
    ev.dz = 0;
    ev.zoomx = 1;
    ev.zoomy = 1;
    ev.theta = 0;
    ev.dtheta = 0;
    ev.originalEvent = event;
    emitter.emit('mousemove', ev);
    previousPosition[0] = currentPosition[0];
    previousPosition[1] = currentPosition[1];
  }
  function indexOfTouch(touch) {
    let id = touch.identifier;
    for (let i = 0; i < fingers.length; i++) {
      if (
        fingers[i] &&
        fingers[i].touch &&
        fingers[i].touch.identifier === id
      ) {
        return i
      }
    }
    return -1
  }
  function onTouchStart(event) {
    previousFingerPosition[0] = null;
    previousFingerPosition[1] = null;
    for (let i = 0; i < event.changedTouches.length; i++) {
      const newTouch = event.changedTouches[i];
      let id = newTouch.identifier;
      let idx = indexOfTouch(id);
      if (idx === -1 && activeTouchCount < 2) {
        const newIndex = fingers[0] ? 1 : 0;
        const newFinger = {
          position: [0, 0],
          touch: null
        };
        fingers[newIndex] = newFinger;
        activeTouchCount++;
        newFinger.touch = newTouch;
        mouseEventOffset_1(newTouch, element, newFinger.position);
      }
    }
    let xavg = 0;
    let yavg = 0;
    let fingerCount = 0;
    for (let i = 0; i < fingers.length; i++) {
      if (!fingers[i]) continue
      xavg += fingers[i].position[0];
      yavg += fingers[i].position[1];
      fingerCount++;
    }
    xavg /= fingerCount;
    yavg /= fingerCount;
    if (activeTouchCount > 0) {
      ev.theta = 0;
      if (fingerCount > 1) {
        const dx = fingers[1].position[0] - fingers[0].position[0];
        const dy =
          ((fingers[0].position[1] - fingers[1].position[1]) * width) / height;
        ev.theta = Math.atan2(dy, dx);
      }
      getSize();
      ev.buttons = 0;
      ev.mods = {};
      ev.active = activeTouchCount;
      x0 = xavg;
      y0 = yavg;
      ev.x0 = (2 * x0) / width - 1;
      ev.y0 = 1 - (2 * y0) / height;
      ev.x = (2 * xavg) / width - 1;
      ev.y = 1 - (2 * yavg) / height;
      ev.x1 = (2 * fingers[0].position[0]) / width - 1;
      ev.y1 = 1 - (2 * fingers[0].position[1]) / height;
      if (activeTouchCount > 1) {
        ev.x2 = (2 * fingers[1].position[0]) / width - 1;
        ev.y2 = 1 - (2 * fingers[1].position[1]) / height;
      }
      ev.active = activeTouchCount;
      ev.dx = 0;
      ev.dy = 0;
      ev.dz = 0;
      ev.zoomx = 1;
      ev.zoomy = 1;
      ev.dtheta = 0;
      ev.originalEvent = event;
      emitter.emit(activeTouchCount === 1 ? 'touchstart' : 'pinchstart', ev);
    }
  }
  function onTouchMove(event) {
    let idx;
    let changed = false;
    for (let i = 0; i < event.changedTouches.length; i++) {
      const movedTouch = event.changedTouches[i];
      idx = indexOfTouch(movedTouch);
      if (idx !== -1) {
        changed = true;
        fingers[idx].touch = movedTouch;
        mouseEventOffset_1(movedTouch, element, fingers[idx].position);
      }
    }
    if (changed) {
      if (activeTouchCount === 1) {
        for (idx = 0; idx < fingers.length; idx++) {
          if (fingers[idx]) break
        }
        if (fingers[idx] && previousFingerPosition[idx]) {
          const x = fingers[idx].position[0];
          const y = fingers[idx].position[1];
          const dx = x - previousFingerPosition[idx][0];
          const dy = y - previousFingerPosition[idx][1];
          ev.buttons = 0;
          ev.mods = {};
          ev.active = activeTouchCount;
          ev.x = ev.x1 = (2 * x) / width - 1;
          ev.y = ev.y1 = 1 - (2 * y) / height;
          ev.x2 = null;
          ev.y2 = null;
          ev.x0 = (2 * x0) / width - 1;
          ev.y0 = 1 - (2 * y0) / height;
          ev.dx = (2 * dx) / width;
          ev.dy = (-2 * dy) / height;
          ev.dz = 0;
          ev.zoomx = 1;
          ev.zoomy = 1;
          ev.theta = 0;
          ev.dtheta = 0;
          ev.originalEvent = event;
          emitter.emit('touchmove', ev);
        }
      } else if (activeTouchCount === 2) {
        if (previousFingerPosition[0] && previousFingerPosition[1]) {
          const pos0A = previousFingerPosition[0];
          const pos0B = previousFingerPosition[1];
          const dx0 = pos0B[0] - pos0A[0];
          const dy0 = ((pos0B[1] - pos0A[1]) * width) / height;
          const pos1A = fingers[0].position;
          const pos1B = fingers[1].position;
          const dx1 = pos1B[0] - pos1A[0];
          const dy1 = ((pos1A[1] - pos1B[1]) * width) / height;
          const r0 = Math.sqrt(dx0 * dx0 + dy0 * dy0) * 0.5;
          const theta0 = Math.atan2(dy0, dx0);
          const r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) * 0.5;
          const theta1 = Math.atan2(dy1, dx1);
          const xavg = (pos0B[0] + pos0A[0]) * 0.5;
          const yavg = (pos0B[1] + pos0A[1]) * 0.5;
          const dx = 0.5 * (pos1B[0] + pos1A[0] - pos0A[0] - pos0B[0]);
          const dy = 0.5 * (pos1B[1] + pos1A[1] - pos0A[1] - pos0B[1]);
          const dr = r1 / r0;
          const dtheta = theta1 - theta0;
          ev.buttons = 0;
          ev.mods = mods;
          ev.active = activeTouchCount;
          ev.x = (2 * xavg) / width - 1;
          ev.y = 1 - (2 * yavg) / height;
          ev.x0 = (2 * x0) / width - 1;
          ev.y0 = 1 - (2 * y0) / height;
          ev.x1 = (2 * pos1A[0]) / width - 1;
          ev.y1 = 1 - (2 * pos1A[1]) / height;
          ev.x2 = (2 * pos1B[0]) / width - 1;
          ev.y2 = 1 - (2 * pos1B[1]) / height;
          ev.dx = (2 * dx) / width;
          ev.dy = (-2 * dy) / height;
          ev.dz = 0;
          ev.zoomx = dr;
          ev.zoomy = dr;
          ev.theta = theta1;
          ev.dtheta = dtheta;
          ev.originalEvent = event;
          emitter.emit('pinchmove', ev);
        }
      }
    }
    if (fingers[0]) {
      previousFingerPosition[0] = fingers[0].position.slice();
    }
    if (fingers[1]) {
      previousFingerPosition[1] = fingers[1].position.slice();
    }
  }
  function onTouchRemoved(event) {
    let lastFinger;
    for (let i = 0; i < event.changedTouches.length; i++) {
      const removed = event.changedTouches[i];
      let idx = indexOfTouch(removed);
      if (idx !== -1) {
        lastFinger = fingers[idx];
        fingers[idx] = null;
        activeTouchCount--;
      }
    }
    let xavg = 0;
    let yavg = 0;
    if (activeTouchCount === 0) {
      if (lastFinger) {
        xavg = lastFinger.position[0];
        yavg = lastFinger.position[1];
      }
    } else {
      let fingerCount = 0;
      for (let i = 0; i < fingers.length; i++) {
        if (!fingers[i]) continue
        xavg += fingers[i].position[0];
        yavg += fingers[i].position[1];
        fingerCount++;
      }
      xavg /= fingerCount;
      yavg /= fingerCount;
    }
    if (activeTouchCount < 2) {
      ev.buttons = 0;
      ev.mods = mods;
      ev.active = activeTouchCount;
      ev.x = (2 * xavg) / width - 1;
      ev.y = 1 - (2 * yavg) / height;
      ev.x0 = (2 * x0) / width - 1;
      ev.y0 = 1 - (2 * y0) / height;
      ev.dx = 0;
      ev.dy = 0;
      ev.dz = 0;
      ev.zoomx = 1;
      ev.zoomy = 1;
      ev.theta = 0;
      ev.dtheta = 0;
      ev.originalEvent = event;
      emitter.emit(activeTouchCount === 0 ? 'touchend' : 'pinchend', ev);
    }
    if (activeTouchCount === 0) {
      x0 = y0 = null;
    }
  }
  let enabled = false;
  function enable() {
    if (enabled) return
    enabled = true;
    changeListener.enabled = true;
    element.addEventListener('wheel', onWheel, EVENT_LISTENER_OPTIONS);
    element.addEventListener('mousedown', onMouseDown, EVENT_LISTENER_OPTIONS);
    window.addEventListener('mousemove', onMouseMove, EVENT_LISTENER_OPTIONS);
    window.addEventListener('mouseup', onMouseUp, EVENT_LISTENER_OPTIONS);
    element.addEventListener('touchstart', onTouchStart, EVENT_LISTENER_OPTIONS);
    window.addEventListener('touchmove', onTouchMove, EVENT_LISTENER_OPTIONS);
    window.addEventListener('touchend', onTouchRemoved, EVENT_LISTENER_OPTIONS);
    window.addEventListener(
      'touchcancel',
      onTouchRemoved,
      EVENT_LISTENER_OPTIONS
    );
  }
  function disable() {
    if (!enabled) return
    enabled = false;
    changeListener.enabled = false;
    element.removeEventListener('wheel', onWheel, EVENT_LISTENER_OPTIONS);
    element.removeEventListener(
      'mousedown',
      onMouseDown,
      EVENT_LISTENER_OPTIONS
    );
    window.removeEventListener('mousemove', onMouseMove, EVENT_LISTENER_OPTIONS);
    window.removeEventListener('mouseup', onMouseUp, EVENT_LISTENER_OPTIONS);
    element.removeEventListener(
      'touchstart',
      onTouchStart,
      EVENT_LISTENER_OPTIONS
    );
    window.removeEventListener('touchmove', onTouchMove, EVENT_LISTENER_OPTIONS);
    window.removeEventListener(
      'touchend',
      onTouchRemoved,
      EVENT_LISTENER_OPTIONS
    );
    window.removeEventListener(
      'touchcancel',
      onTouchRemoved,
      EVENT_LISTENER_OPTIONS
    );
  }
  enable();
  emitter.enable = enable;
  emitter.disable = disable;
  return emitter
}

class Lethargy {
  constructor(stability, sensitivity, tolerance, delay) {
    this.stability = stability != null ? Math.abs(stability) : 8;
    this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 100;
    this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1;
    this.delay = delay != null ? delay : 150;
    this.lastUpDeltas = [];
    let i, ref;
    for (
      i = 1, ref = this.stability * 2;
      1 <= ref ? i <= ref : i >= ref;
      1 <= ref ? i++ : i--
    ) {
      this.lastUpDeltas.push(null);
    }
    this.lastDownDeltas = [];
    for (
      i = 1, ref = this.stability * 2;
      1 <= ref ? i <= ref : i >= ref;
      1 <= ref ? i++ : i--
    ) {
      this.lastDownDeltas.push(null);
    }
    this.deltasTimestamp = [];
    for (
      i = 1, ref = this.stability * 2;
      1 <= ref ? i <= ref : i >= ref;
      1 <= ref ? i++ : i--
    ) {
      this.deltasTimestamp.push(null);
    }
  }
  check(e) {
    var lastDelta;
    e = e.originalEvent || e;
    if (e.wheelDelta != null) {
      lastDelta = e.wheelDelta;
    } else if (e.deltaY != null) {
      lastDelta = e.deltaY * -40;
    } else if (e.detail != null || e.detail === 0) {
      lastDelta = e.detail * -40;
    }
    this.deltasTimestamp.push(Date.now());
    this.deltasTimestamp.shift();
    if (lastDelta > 0) {
      this.lastUpDeltas.push(lastDelta);
      this.lastUpDeltas.shift();
      return this.isInertia(1)
    } else {
      this.lastDownDeltas.push(lastDelta);
      this.lastDownDeltas.shift();
      return this.isInertia(-1)
    }
  }
  isInertia(direction) {
    var lastDeltas,
      lastDeltasNew,
      lastDeltasOld,
      newAverage,
      newSum,
      oldAverage,
      oldSum;
    lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;
    if (lastDeltas[0] === null) {
      return direction
    }
    if (
      this.deltasTimestamp[this.stability * 2 - 2] + this.delay > Date.now() &&
      lastDeltas[0] === lastDeltas[this.stability * 2 - 1]
    ) {
      return false
    }
    lastDeltasOld = lastDeltas.slice(0, this.stability);
    lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);
    oldSum = lastDeltasOld.reduce(function (t, s) {
      return t + s
    });
    newSum = lastDeltasNew.reduce(function (t, s) {
      return t + s
    });
    oldAverage = oldSum / lastDeltasOld.length;
    newAverage = newSum / lastDeltasNew.length;
    if (
      Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) &&
      this.sensitivity < Math.abs(newAverage)
    ) {
      return direction
    } else {
      return false
    }
  }
  showLastUpDeltas() {
    return this.lastUpDeltas
  }
  showLastDownDeltas() {
    return this.lastDownDeltas
  }
}

function freeCameraFactory (regl, options) {
  const {
    phi,
    theta,
    distance,
    autorotate,
    autorotateDistance,
    autorotateSpeedTheta,
    autorotateSpeedPhi
  } = options;
  const cameraOptions = Object.assign({}, options, {
    fovY: options.fovY,
    zoomDecayTime: 0,
    rotationDecayTime: 50,
    panDecayTime: 50,
    distance,
    phi,
    theta,
    center: options.center,
    ...(options.aspectRatio && { aspectRatio: options.aspectRatio })
  });
  const aCamera = createCamera(cameraOptions);
  initializeCameraControls(aCamera, regl && regl._gl.canvas, {
    minDistance: options.minDistance || 0.1,
    maxDistance: options.maxDistance || 50
  });
  aCamera.toConfig = () => {
    return {
      center: aCamera.params.center,
      theta: aCamera.params.theta,
      phi: aCamera.params.phi,
      distance: aCamera.params.distance
    }
  };
  aCamera.toggleAutorotate = () => {
    aCamera.autorotate = !aCamera.autorotate;
    if (aCamera.autorotate) {
      aCamera.startAutorotate();
    }
  };
  aCamera.startAutorotate = () => {
    aCamera.autorotate = true;
    aCamera.autorotateParams = { ...aCamera.params };
    aCamera.autorotateT0 = Date.now();
  };
  aCamera.stopAutorotate = () => {
    aCamera.autorotate = false;
    aCamera.autorotateParams = { ...aCamera.params };
    aCamera.autorotateT0 = Date.now();
  };
  aCamera.doAutorotate = () => {
    if (aCamera.autorotate) {
      const dt = (Date.now() - aCamera.autorotateT0) / 1000;
      aCamera.params.distance =
        aCamera.autorotateParams.distance +
        0.1 * Math.sin(autorotateDistance * dt);
      aCamera.params.theta =
        aCamera.autorotateParams.theta + autorotateSpeedTheta * dt;
      aCamera.params.phi =
        aCamera.autorotateParams.phi + 0.05 * Math.sin(autorotateSpeedPhi * dt);
    }
  };
  aCamera.autorotate = autorotate;
  if (autorotate) {
    aCamera.startAutorotate();
  }
  aCamera.setCameraUniforms = regl({
    uniforms: {
      projection: () => aCamera.state.projection,
      view: () => aCamera.state.view,
      eye: () => aCamera.state.eye
    }
  });
  return aCamera
}
function initializeCameraControls(
  camera,
  canvas,
  { minDistance, maxDistance }
) {
  const lethargy = new Lethargy();
  const radiansPerHalfScreenWidth = Math.PI * 0.5;
  normalizedInteractionEvents(canvas)
    .on('wheel', function (ev) {
      camera.autorotate = false;
      if (!ev.active) return
      if (lethargy.check(ev) !== false) {
        if (camera.params.distance <= maxDistance)
          camera.zoom(ev.x, ev.y, 0.2 * (Math.exp(-ev.dy) - 1.0));
        camera.params.distance = Math.max(
          minDistance,
          Math.min(maxDistance, camera.params.distance)
        );
      }
    })
    .on('mousemove', function (ev) {
      if (!ev.active || ev.buttons !== 1) return
      camera.autorotate = false;
      if (ev.mods.shift) {
        camera.pan(ev.dx, ev.dy);
      } else if (ev.mods.meta) ; else {
        camera.rotate(
          -ev.dx * radiansPerHalfScreenWidth,
          -ev.dy * radiansPerHalfScreenWidth
        );
      }
    })
    .on('touchmove', function (ev) {
      camera.autorotate = false;
      if (!ev.active) return
      camera.rotate(
        -ev.dx * radiansPerHalfScreenWidth,
        -ev.dy * radiansPerHalfScreenWidth
      );
    });
}

const ID = (x) => Math.sign(x) * Math.abs(x);
const line =
  ({ swizzle = (x) => [x, 0, 0], round = ID }) =>
  ({ n = 0, d = 0 }) => {
    const dOffset = (d * (n - 1)) / 2;
    return Array(n)
      .fill(0)
      .map((zero, i) => swizzle(round(i * d - dOffset)))
  };
const square =
  ({ swizzle = (x, y) => [x, y, 0], round = ID }) =>
  ({ n = 0, d = 0 }) => {
    const nx = Math.ceil(Math.sqrt(n));
    const ny = Math.ceil(n / nx);
    const dOffsetX = (d * (nx - 1)) / 2;
    const dOffsetY = (d * (ny - 1)) / 2;
    return Array(n)
      .fill(0)
      .map((zero, i) => {
        const ix = i % nx;
        const iy = Math.floor(i / nx);
        return swizzle(round(ix * d - dOffsetX), round(iy * d - dOffsetY))
      })
  };
const golden_angle = Math.PI * (3 - Math.sqrt(5));
const spiralDistribution =
  ({ swizzle = (x, y) => [x, y, 0], round = ID }) =>
  ({ n = 0, d = golden_angle }) => {
    return Array(n)
      .fill(0)
      .map((zero, i) => {
        const theta = i * golden_angle;
        const r = (Math.sqrt(i) / Math.sqrt(n)) * d * 3;
        return swizzle(round(r * Math.cos(theta)), round(r * Math.sin(theta)))
      })
  };
const DISTRIBUTIONS = {
  SQUARE_XY: square({
    swizzle: (a, b) => [a, b, 0]
  }),
  SQUARE_XZ: square({
    swizzle: (a, b) => [a, 0, b]
  }),
  SQUARE_YZ: square({
    swizzle: (a, b) => [0, a, b]
  }),
  ROW_X: line({
    swizzle: (x) => [x, 0, 0]
  }),
  ROW_Y: line({
    swizzle: (y) => [0, y, 0]
  }),
  ROW_Z: line({
    swizzle: (z) => [0, 0, z]
  }),
  COLUMN: line({
    swizzle: (y) => [0, y, 0]
  }),
  SPIRAL_XY: spiralDistribution({
    swizzle: (x, y) => [x, y, 0]
  }),
  SPIRAL_YZ: spiralDistribution({
    swizzle: (y, z) => [0, y, z]
  })
};
const RUNNER_MODE$1 = {
  NOBREAK: 'nobreak',
  STEPWISE: 'stepwise'
};
const C = 2.99792458e8;
var defaultConfig = {
  name: 'default',
  debug: {
    logPushing: false,
    logPerformance: true,
    showInfo: true,
    showTextures: false,
    showTextureScale: 10
  },
  runner: {
    pusher: 'glsl',
    factor: 1,
    enabled: true,
    packFloat2UInt8: false,
    prerender: true,
    loops: 0,
    mode: RUNNER_MODE$1.NOBREAK,
    snapshotsPerTick: 1,
    iterationsPerSnapshot: 2,
    iterationDurationOverC: 0.025,
    snapshotCount: 256
  },
  model: {
    boundingBoxSize: 0,
    emitter: {
      particleType: 'ELECTRON',
      bunchShape: 'SPIRAL_XY',
      particleCount: 128,
      particleSeparation: 0.05,
      gamma: () => 6,
      positionJitter: [0.0, 0.0, 0]
    },
    interactions: {
      particleInteraction: false,
      electricField: [0, 0, 0],
      magneticField: [0, 0, 0]
    },
    lattice: {
      elements: {},
      beamline: [],
      origin: {
        phi: 0,
        position: [0, 0, 0]
      }
    }
  },
  view: {
    lights: [
      {
        position: [0, 5, 0],
        near: -5,
        far: 10,
        size: 9
      }
    ],
    ambientLightAmount: 0.5,
    diffuseLightAmount: 0.5,
    stageGrid: {
      y: 0,
      size: 10
    },
    rgbGamma: 1,
    isStageVisible: true,
    isShadowEnabled: true,
    isLatticeVisible: true,
    isFieldVisible: true,
    pathicleRelativeGap: 3,
    pathicleRelativeHeight: 5,
    pathicleWidth: 0.0015,
    showAxes: true,
    showVignette: true,
    viewRange: [0, 1],
    camera: {
      center: [0, 0, 0],
      distance: 2,
      phi: (15 / 360) * 2 * Math.PI,
      theta: (45 / 360) * 2 * Math.PI,
      fovY: (5 * Math.PI) / (360 / 10),
      autorotate: false,
      autorotateDistance: 0.1 * 2 * Math.PI,
      autorotateSpeedTheta: 0.1 * 2 * Math.PI,
      autorotateSpeedPhi: 0.1 * 2 * Math.PI,
      zoomDecayTime: 1,
      far: 200,
      near: 0.0001,
      minDistance: 0.1,
      maxDistance: 20
    }
  }
};
({
  name: 'free-electron',
  view: {
    camera: {
      center: [0, 0, 0.5],
      distance: 3,
      phi: (15 / 360) * 2 * Math.PI,
      theta: (45 / 360) * 2 * Math.PI
    }
  },
  runner: {
    snapshotCount: 11,
    iterationDurationOverC: 0.1
  },
  model: {
    emitter: {
      gamma: 2,
      particleCount: 1,
      particleType: 'ELECTRON'
    },
    lattice: {
      origin: {
        position: [
          0,
          defaultConfig.view.pathicleWidth *
            defaultConfig.view.pathicleRelativeHeight,
          0
        ]
      }
    }
  }
});
({
  name: 'free-photon',
  view: {
    camera: {
      center: [0, 0, 0.5],
      distance: 2,
      phi: (5 / 360) * 2 * Math.PI,
      theta: (45 / 360) * 2 * Math.PI
    }
  },
  debug: {
    logPushing: false
  },
  runner: {
    iterationsPerSnapshot: 1,
    iterationCount: 10,
    snapshotCount: 11,
    iterationDurationOverC: 0.1
  },
  model: {
    emitter: {
      gamma: 1.1,
      particleCount: 1,
      bunchShape: 'ROW_X',
      particleType: 'PHOTON',
      positionJitter: [0, 0, 0]
    },
    lattice: {
      origin: {
        position: [
          0,
          defaultConfig.view.pathicleWidth *
            defaultConfig.view.pathicleRelativeHeight,
          0
        ]
      }
    }
  }
});
const PHOTON = {
  name: 'PHOTON',
  mass__eVc_2: 0,
  charge__qe: 0,
  chargeMassRatio__Ckg_1: 0,
  id: 0,
  color: [235, 192, 0]
};
const ELECTRON = {
  name: 'ELECTRON',
  mass__eVc_2: 0.5109989461e6,
  chargeMassRatio__Ckg_1: -1.75882001076e11,
  charge__qe: -1,
  id: 1,
  color: [31, 115, 166]
};
const POSITRON = {
  name: 'POSITRON',
  mass__eVc_2: 0.5109989461e6,
  chargeMassRatio__Ckg_1: 1.75882001076e11,
  charge__qe: 1,
  id: 2,
  color: [166, 115, 166]
};
const PROTON = {
  name: 'PROTON',
  mass__eVc_2: 0.938272081e9,
  charge__qe: 1,
  chargeMassRatio__Ckg_1: 9.578833156e7,
  id: 3,
  color: [197, 50, 51]
};
const PARTICLE_TYPES = [PHOTON, ELECTRON, POSITRON, PROTON];
const BY_NAME_MAP = new Map(PARTICLE_TYPES.map((i) => [i.name, i]));
const particleByName = (name) => BY_NAME_MAP.get(name);
function betaFromGamma$1(gamma = 0) {
  if (gamma === 0) return NaN
  return Math.sqrt(1 - 1 / Math.pow(gamma, 2))
}
const B_T = 0.01;
const gamma = 2;
const R$1 =
  ((gamma / B_T) * betaFromGamma$1(gamma) * C) / ELECTRON.chargeMassRatio__Ckg_1;
const T = (2 * Math.PI * R$1) / betaFromGamma$1(gamma) / C;
const iterationDurationOverC = 0.001;
const STEPS = 256;
console.log({ R: R$1, C, beta: betaFromGamma$1(gamma), T, STEPS });
({
  name: 'gyrotest-1-electron',
  view: {
    camera: {
      center: [0, 0.1, 0],
      distance: 3,
      theta: 90 * (Math.PI / 180),
      phi: 0 * (Math.PI / 180)
    }
  },
  runner: {
    prerender: true,
    loops: 0,
    mode: RUNNER_MODE$1.NOBREAK,
    snapshotsPerTick: 5,
    iterationsPerSnapshot: 5,
    iterationCount: undefined,
    snapshotCount: STEPS,
    iterationDurationOverC: iterationDurationOverC
  },
  model: {
    emitter: {
      particleCount: 1,
      particleType: 'ELECTRON',
      bunchShape: 'COLUMN',
      direction: [0, 0, 1],
      position: [
        0,
        defaultConfig.view.pathicleWidth *
          defaultConfig.view.pathicleRelativeHeight *
          2 +
          0.02,
        0
      ],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma
    },
    interactions: {
      particleInteraction: false,
      electricField: [0, 0, 0],
      magneticField: [0, B_T, 0]
    }
  }
});
({
  name: 'gyrotest-128-electrons',
  view: {
    camera: {
      center: [1, 2, 0],
      distance: 15,
      theta: -90 * (Math.PI / 180),
      phi: 5 * (Math.PI / 180)
    }
  },
  debug: {
    logPushing: false
  },
  runner: {
    prerender: true,
    loops: 0,
    mode: RUNNER_MODE$1.NOBREAK,
    iterationsPerSnapshot: 1,
    iterationCount: 511,
    snapshotCount: 512,
    iterationDurationOverC: 0.05
  },
  model: {
    emitter: {
      particleCount: 128,
      particleSeparation: 0.05,
      particleType: 'ELECTRON',
      bunchShape: 'ROW_Y',
      gamma: ({ p }) => Math.log10(1 * p + 1)
    },
    interactions: {
      particleInteraction: false,
      electricField: [0, 0, 0],
      magneticField: [0, 0.0005, 0]
    },
    lattice: {
      origin: {
        phi: 0,
        position: [
          0,
          defaultConfig.view.pathicleWidth *
            defaultConfig.view.pathicleRelativeHeight *
            2,
          0
        ]
      }
    }
  }
});

let seed = 1;
const random$1 = () => {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x)
};
const boundedRandom = (min = -1, max = 1) => random$1() * (max - min) + min;

const functionalize = (x) => (typeof x == 'function' ? x : () => x);
function particleTypesFromDescriptor(particleTypeDescriptor, n = 0) {
  const particleTypesArray = particleTypeDescriptor
    .trim()
    .split(/\s+/)
    .map((d) => {
      return particleByName(d)
    });
  if (n === 0) {
    return particleTypesArray
  }
  return Array(n)
    .fill(0)
    .map((x, p) => {
      return particleTypesArray[p % particleTypesArray.length]
    })
}
function jitterPosition({ position = [0, 0, 0], jitter = [0, 0, 0] }) {
  return position.map((d, i) => boundedRandom() * jitter[i])
}
function betaFromGamma(gamma = 0) {
  if (gamma === 0) return NaN
  return Math.sqrt(1 - 1 / Math.pow(gamma, 2))
}
function ParticleCollection({
  particleCount = 3,
  particleType = 'PHOTON ELECTRON PROTON',
  bunchShape = 'ROW',
  particleSeparation = 0.1,
  gamma = 1,
  position = [0, 0, 0],
  direction = [0, 0, 1],
  positionJitter = [0, 0, 0],
  directionJitter = [0, 0, 0]
}) {
  const gammaFn = functionalize(gamma);
  const directionFn = functionalize(direction);
  const positionFn = functionalize(position);
  const particles = particleTypesFromDescriptor(particleType, particleCount);
  const localPositions = DISTRIBUTIONS[bunchShape]({
    n: particleCount,
    d: particleSeparation
  });
  const fourPositions = localPositions.map((localPosition, p) => {
    const jitter = jitterPosition({
      jitter: positionJitter
    });
    return [
      (positionFn({ p })[0] + localPosition[0] + jitter[0]) * 1,
      (positionFn({ p })[1] + localPosition[1] + jitter[1]) * 1,
      (positionFn({ p })[2] + localPosition[2] + jitter[2]) * 1,
      0
    ]
  });
  const fourVelocities = particles.map((particle, p) => {
    const gamma = gammaFn({ p });
    const beta = particle.mass__eVc_2 === 0 ? 1 : betaFromGamma(gamma);
    const jitteredDirection = directionFn({ p, localPositions });
    return particle.mass__eVc_2 === 0
      ? [
          C * jitteredDirection[0],
          C * jitteredDirection[1],
          C * jitteredDirection[2],
          C
        ]
      : [
          gamma * beta * C * jitteredDirection[0],
          gamma * beta * C * jitteredDirection[1],
          gamma * beta * C * jitteredDirection[2],
          gamma * C
        ]
  });
  return {
    fourPositions: fourPositions.map((d) => d.map((e) => e * 1)),
    fourVelocities: fourVelocities.map((d) => d.map((e) => e * 1)),
    particleCount,
    particleTypes: particles.map((p) => p.id)
  }
}

var vert$5 = "precision highp float;\n#define GLSLIFY 1\nattribute vec2 aXY;\nvoid main() {\n  gl_Position = vec4(aXY, 0, 1);\n}\n"; // eslint-disable-line

var frag$6 = "precision highp float;\n#define GLSLIFY 1\nconst highp float c = 2.99792458e+8;\n\nuniform bool littleEndian;\nuniform float boundingBoxSize;\nuniform float deltaTOverC;\nuniform float particleInteraction;\nuniform int takeSnapshot;\nuniform int variableIdx;\nuniform sampler2D ut_particleChargesMassesChargeMassRatios;\nuniform sampler2D ut_position;\nuniform sampler2D ut_velocity;\nuniform vec2 resolution;\nuniform vec3 boundingBoxCenter;\nuniform vec3 electricField;\nuniform vec3 magneticField;\n\nstruct BeamlineElement {\n  vec3 middle;\n  vec3 size;\n  float phi;\n  int type; //0: drift, 1: dipole, 2: quadrupole, 3: esta\n  float strength;\n};\n\nconst int BEAMLINE_ELEMENT_TYPE_DRIFT = 0;\nconst int BEAMLINE_ELEMENT_TYPE_DIPOLE = 1;\nconst int BEAMLINE_ELEMENT_TYPE_QUADRUPOLE = 2;\nconst int BEAMLINE_ELEMENT_TYPE_ESTA = 3;\n\n/*__latticeSize__*/\n/*__latticeChunkGLSL__*/\n\nmat2 rot2D(float phi) {\n  float c = cos(phi);\n  float s = sin(phi);\n  return mat2(c, -s, s, c);\n}\nfloat sdBox(vec3 p, vec3 s) {\n  vec3 d = abs(p) - .5 * s;\n  return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));\n}\n#define FLOAT_MAX  1.70141184e38\n#define FLOAT_MIN  1.17549435e-38\n\nlowp vec4 packFloat(highp float v) {\n  highp float av = abs(v);\n\n  //Handle special cases\n  if(av < FLOAT_MIN) {\n    return vec4(0.0, 0.0, 0.0, 0.0);\n  } else if(v > FLOAT_MAX) {\n    return vec4(127.0, 128.0, 0.0, 0.0) / 255.0;\n  } else if(v < -FLOAT_MAX) {\n    return vec4(255.0, 128.0, 0.0, 0.0) / 255.0;\n  }\n\n  highp vec4 c = vec4(0,0,0,0);\n\n  //Compute exponent and mantissa\n  highp float e = floor(log2(av));\n  highp float m = av * pow(2.0, -e) - 1.0;\n\n  //Unpack mantissa\n  c[1] = floor(128.0 * m);\n  m -= c[1] / 128.0;\n  c[2] = floor(32768.0 * m);\n  m -= c[2] / 32768.0;\n  c[3] = floor(8388608.0 * m);\n\n  //Unpack exponent\n  highp float ebias = e + 127.0;\n  c[0] = floor(ebias / 2.0);\n  ebias -= c[0] * 2.0;\n  c[1] += floor(ebias) * 128.0;\n\n  //Unpack sign bit\n  c[0] += 128.0 * step(0.0, -v);\n\n  //Scale back to range\n  return c / 255.0;\n}\n\nfloat shiftRight(float v, float amt) {\n    v = floor(v) + 0.5;\n    return floor(v / exp2(amt));\n}\nfloat shiftLeft(float v, float amt) {\n    return floor(v * exp2(amt) + 0.5);\n}\nfloat maskLast(float v, float bits) {\n    return mod(v, shiftLeft(1.0, bits));\n}\nfloat extractBits(float num, float from, float to) {\n    from = floor(from + 0.5);\n    to = floor(to + 0.5);\n    return maskLast(shiftRight(num, from), to - from);\n}\nvec4 floatToRgba(float texelFloat, bool littleEndian) {\n    if(texelFloat == 0.0)\n        return vec4(0, 0, 0, 0);\n    float sign = texelFloat > 0.0 ? 0.0 : 1.0;\n    texelFloat = abs(texelFloat);\n    float exponent = floor(log2(texelFloat));\n    float biased_exponent = exponent + 127.0;\n    float fraction = ((texelFloat / exp2(exponent)) - 1.0) * 8388608.0;\n    float t = biased_exponent / 2.0;\n    float last_bit_of_biased_exponent = fract(t) * 2.0;\n    float remaining_bits_of_biased_exponent = floor(t);\n    float byte4 = extractBits(fraction, 0.0, 8.0) / 255.0;\n    float byte3 = extractBits(fraction, 8.0, 16.0) / 255.0;\n    float byte2 = (last_bit_of_biased_exponent * 128.0 + extractBits(fraction, 16.0, 23.0)) / 255.0;\n    float byte1 = (sign * 128.0 + remaining_bits_of_biased_exponent) / 255.0;\n    return (littleEndian ? vec4(byte4, byte3, byte2, byte1) : vec4(byte1, byte2, byte3, byte4));\n}\n\nstruct ParticleData {\n  float charge;\n  float mass;\n  float chargeMassRatio;\n  float particleType;\n};\n\nParticleData getParticleData(int p) {\n  vec2 coords = vec2(float(p), 0.) / vec2(float(resolution.y), 1.);\n  vec4 data = texture2D(ut_particleChargesMassesChargeMassRatios, coords);\n  return ParticleData(data.x, data.y, data.z, data.w);\n}\n\n#ifdef PACK_FLOAT\n\n// Denormalize 8-bit color channels to integers in the range 0 to 255.\nivec4 floatsToBytes(vec4 inputFloats, bool littleEndian) {\n  ivec4 bytes = ivec4(inputFloats * 255.0);\n  return (\n    littleEndian\n    ? bytes.abgr\n    : bytes\n  );\n}\n\n// Break the four bytes down into an array of 32 bits.\nvoid bytesToBits(const in ivec4 bytes, out bool bits[32]) {\n  for (int channelIndex = 0; channelIndex < 4; ++channelIndex) {\n    float acc = float(bytes[channelIndex]);\n    for (int indexInByte = 7; indexInByte >= 0; --indexInByte) {\n      float powerOfTwo = exp2(float(indexInByte));\n      bool bit = acc >= powerOfTwo;\n      bits[channelIndex * 8 + (7 - indexInByte)] = bit;\n      acc = mod(acc, powerOfTwo);\n    }\n  }\n}\n\n// Compute the exponent of the 32-bit float.\nfloat getExponent(bool bits[32]) {\n  const int startIndex = 1;\n  const int bitStringLength = 8;\n  const int endBeforeIndex = startIndex + bitStringLength;\n  float acc = 0.0;\n  int pow2 = bitStringLength - 1;\n  for (int bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {\n    acc += float(bits[bitIndex]) * exp2(float(pow2--));\n  }\n  return acc;\n}\n\n// Compute the mantissa of the 32-bit float.\nfloat getMantissa(bool bits[32], bool subnormal) {\n  const int startIndex = 9;\n  const int bitStringLength = 23;\n  const int endBeforeIndex = startIndex + bitStringLength;\n  // Leading/implicit/hidden bit convention:\n  // If the number is not subnormal (with exponent 0), we add a leading 1 digit.\n  float acc = float(!subnormal) * exp2(float(bitStringLength));\n  int pow2 = bitStringLength - 1;\n  for (int bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {\n    acc += float(bits[bitIndex]) * exp2(float(pow2--));\n  }\n  return acc;\n}\n\n// Parse the float from its 32 bits.\nfloat bitsToFloat(bool bits[32]) {\n  float signBit = float(bits[0]) * -2.0 + 1.0;\n  float exponent = getExponent(bits);\n  bool subnormal = abs(exponent - 0.0) < 0.01;\n  float mantissa = getMantissa(bits, subnormal);\n  float exponentBias = 127.0;\n  return signBit * mantissa * exp2(exponent - exponentBias - 23.0);\n}\n\n// Decode a 32-bit float from the RGBA color channels of a texel.\nfloat rgbaToFloat(vec4 texelRGBA, bool littleEndian) {\n  ivec4 rgbaBytes = floatsToBytes(texelRGBA, littleEndian);\n  bool bits[32];\n  bytesToBits(rgbaBytes, bits);\n  return bitsToFloat(bits);\n}\n\n#endif\n\nvec4 readVariable(sampler2D tex, int p, int s) {\n\n#ifdef PACK_FLOAT\n  return vec4(rgbaToFloat(texture2D(tex, vec2(4 * s, p) / resolution), littleEndian), \n  rgbaToFloat(texture2D(tex, vec2(4 * s + 1, p) / resolution), littleEndian), \n  rgbaToFloat(texture2D(tex, vec2(4 * s + 2, p) / resolution), littleEndian), \n  rgbaToFloat(texture2D(tex, vec2(4 * s + 3, p) / resolution), littleEndian));\n#else\n  return vec4(texture2D(tex, vec2(4 * s, p) / resolution).r, texture2D(tex, vec2(4 * s + 1, p) / resolution).r, texture2D(tex, vec2(4 * s + 2, p) / resolution).r, texture2D(tex, vec2(4 * s + 3, p) / resolution).r);\n#endif\n}\n\nvec3 reflection(vec3 v, vec3 bottomLeft, vec3 topRight) {\n  return 2. * (step(bottomLeft, v) - step(topRight, v)) - vec3(1.);\n}\nvec3 getE(vec3 position) {\n\n  vec3 E = electricField;\n\n  for(int i = 0; i < BEAMLINE_ELEMENT_COUNT; i++) {\n    BeamlineElement ble = beamline[i];\n    if(ble.type == BEAMLINE_ELEMENT_TYPE_ESTA) {\n      vec3 localPosition = position;\n      localPosition -= ble.middle;\n      localPosition.xz *= rot2D(ble.phi);\n      if(sdBox(localPosition, ble.size) <= 0.) {\n        E += vec3(0., 0., ble.strength);\n      }\n    }\n  }\n  return E;\n}\n\nvec3 getB(vec3 position) {\n  vec3 B = magneticField;\n\n  for(int i = 0; i < BEAMLINE_ELEMENT_COUNT; i++) {\n    BeamlineElement ble = beamline[i];\n    vec3 localPosition = position;\n    localPosition -= ble.middle;\n    localPosition.xz *= rot2D(ble.phi);\n    if(sdBox(localPosition, ble.size) <= 0.) {\n      if(ble.type == BEAMLINE_ELEMENT_TYPE_DIPOLE) {\n        B += vec3(0., ble.strength, 0.);\n      } else if(ble.type == BEAMLINE_ELEMENT_TYPE_QUADRUPOLE) {\n        B += abs(ble.strength) * ((ble.strength > 0.) ? vec3(localPosition.y, localPosition.x, 0) : vec3(-localPosition.y, -localPosition.x, 0.));\n      }\n    }\n  }\n\n  return B;\n}\n\nvec4 push_position(int p) {\n\n  ParticleData particleData = getParticleData(p);\n  vec4 fourPosition = readVariable(ut_position, p, 0);\n\n  vec3 position = fourPosition.xyz;\n  float time = fourPosition.w;\n\n  // vec4 fourVelocity_current = readVariable(ut_velocity, p, 1);\n  vec4 fourVelocity_next = readVariable(ut_velocity, p, 0);\n\n  float nextTime = time + deltaTOverC;\n\n  vec4 next = vec4(position + fourVelocity_next.xyz / fourVelocity_next.w * deltaTOverC, nextTime);\n\n  return next;\n}\n\nvec4 push_velocity(int p) {\n\n  ParticleData particleData = getParticleData(p);\n\n  vec4 fourPosition = readVariable(ut_position, p, 1);\n  vec4 fourVelocity = readVariable(ut_velocity, p, 0);\n\n  vec3 velocity =  fourVelocity.xyz / fourVelocity.w;\n\n  vec3 intermediatePosition = fourPosition.xyz + .5 * velocity * deltaTOverC;\n  vec3 E = getE(intermediatePosition);\n  vec3 B = getB(intermediatePosition);\n\n  float gamma = 1.;\n  vec3 u = fourVelocity.xyz;\n\n  if(particleData.particleType > .1) {\n\n    float chargeMassRatio = particleData.chargeMassRatio;\n    float hdtc_m = chargeMassRatio * deltaTOverC / c / 2.;\n\n    u += hdtc_m * E;\n    gamma = sqrt(1. + dot(u / c, u / c));\n\n    vec3 t_ = hdtc_m * B / gamma;\n    u += cross(u, t_);\n    vec3 s_ = 2.0 / (1.0 + t_ * t_) * t_;\n    u += cross(u, s_);\n    u += hdtc_m * E;\n    gamma = sqrt(1. + dot(u / c, u / c));\n  }\n\n  if(boundingBoxSize > 0.) {\n\n    velocity = (particleData.particleType > .1) ? u / gamma / c : velocity;\n    vec3 nextPosition = intermediatePosition.xyz + .5 * velocity * deltaTOverC;\n    vec3 ref = reflection(nextPosition.xyz, boundingBoxCenter - vec3(boundingBoxSize), boundingBoxCenter + vec3(boundingBoxSize));\n    u *= ref;\n\n  }\n  return vec4(u, gamma * c);\n}\nvec4 push(int p) {\n  return (variableIdx == 0) ? push_position(p) : push_velocity(p);\n}\n\nvec4 readVariable(int particle, int snapshot) {\n  return (variableIdx == 0) ? readVariable(ut_position, particle, snapshot) : readVariable(ut_velocity, particle, snapshot);\n}\n\nvoid main() {\n\n  int particle = int(gl_FragCoord.y - .5);\n  int snapshot = int(floor((gl_FragCoord.x - .5) / 4.));\n  int fourComponentIndex = int(floor(gl_FragCoord.x - .5)) - snapshot * 4;\n  initLatticeData();\n\n  vec4 value = (snapshot == 0) ? push(particle) : (takeSnapshot == 0) ? readVariable(particle, snapshot) : readVariable(particle, snapshot - 1);\n\n#ifdef PACK_FLOAT\n\n  gl_FragColor = (fourComponentIndex == 0) ? packFloat(value.x) : (fourComponentIndex == 1) ? packFloat(value.y) : (fourComponentIndex == 2) ? packFloat(value.z) : packFloat(value.w);\n\n#else\n\n  gl_FragColor = (fourComponentIndex == 0) ? vec4(value.x, 0., 0., 0.) : (fourComponentIndex == 1) ? vec4(value.y, 0., 0., 0.) : (fourComponentIndex == 2) ? vec4(value.z, 0., 0., 0.) : vec4(value.w, 0., 0., 0.);\n\n#endif\n\n}\n"; // eslint-disable-line

function latticeChunk(lattice) {
  return `

  ${
    lattice.activeBeamlineElements().length > 0
      ? 'BeamlineElement beamline[' +
        lattice.activeBeamlineElements().length +
        '];'
      : 'BeamlineElement beamline[1];'
  }
  void initLatticeData() {
    ${lattice.toGLSLDefinition()};
  }
  `
}

class PerformanceLogger {
  constructor(active = true, maxEntries = 100) {
    if (window.performanceLogger) return window.performanceLogger
    performance.clearMarks();
    performance.clearMeasures();
    this.current = null;
    this.active = active;
    this.running = false;
    this.maxEntries = maxEntries;
    this.entryCount = 0;
    this.entries = [];
    window.performanceLogger = this;
  }
  start(markName) {
    if (this.active && this.entryCount < this.maxEntries) {
      this.entryCount++;
      this.markName = markName;
      performance.mark(this.markName);
    }
  }
  stop() {
    if (this.active) {
      performance.mark(this.markName + ' (stop)');
      this.markName = null;
      this.running = false;
    }
  }
  report() {
    if (this.running) this.stop();
    const round = (x) => x.toFixed(1) * 1;
    const marks = performance.getEntriesByType('mark');
    const measures = marks.map((mark, m) => ({
      name: mark.name,
      Δt: round(
        marks[Math.min(m + 1, marks.length - 1)].startTime - mark.startTime
      )
    }));
    return measures.filter((m) => m.name.indexOf('stop') === -1)
  }
}

function isLittleEndian() {
  const uint8Array = new Uint8Array([0xaa, 0xbb]);
  const uint16array = new Uint16Array(uint8Array.buffer);
  return uint16array[0] === 0xbbaa
}

function glslBorisPush(regl, { variables, model }) {
  const performanceLogger = new PerformanceLogger();
  performanceLogger.entries = [];
  const pushFactory = (variableName, bufferVariableName, variableSlot) => {
    const latticeChunkGLSL = latticeChunk(model.lattice);
    return regl({
      profile: true,
      framebuffer: () => variables[variableName].value(),
      primitive: 'triangles',
      elements: null,
      offset: 0,
      dither: false,
      count: 3,
      attributes: {
        aXY: [-4, -4, 4, -4, 0, 4]
      },
      uniforms: {
        variableIdx: variableSlot,
        resolution: [variables.snapshotCount * 4, variables.particleCount],
        snapshotCount: variables.snapshotCount,
        particleCount: variables.particleCount,
        deltaTOverC: variables.iterationDurationOverC,
        particleInteraction: model.interactions.particleInteraction ? 1 : 0,
        electricField: model.interactions.electricField || [0, 0, 0],
        magneticField: model.interactions.magneticField || [0, 0, 1],
        takeSnapshot: () => variables.takeSnapshot,
        boundingBoxSize: model.boundingBoxSize,
        boundingBoxCenter: model.boundingBoxCenter || [0, 1, 0],
        littleEndian: isLittleEndian(),
        ut_particleChargesMassesChargeMassRatios: () =>
          variables.particleChargesMassesChargeMassRatios,
        ut_position: () =>
          variables.position.buffers[(variables.iteration + 1) % 2],
        ut_velocity: () =>
          variableName === 'position'
            ? variables.velocity.buffers[variables.iteration % 2]
            : variables.velocity.buffers[(variables.iteration + 1) % 2]
      },
      vert: vert$5,
      frag: [
        ...(variables.packFloat2UInt8
          ? [
              `#define PACK_FLOAT`
            ]
          : []),
        (variables.packFloat2UInt8 ? frag$6 : frag$6)
          .replace(
            '/*__latticeDefinition__*/',
            model.lattice.toGLSLDefinition()
          )
          .replace('/*__latticeChunkGLSL__*/', latticeChunkGLSL)
          .replace(
            '/*__latticeSize__*/',
            `const int BEAMLINE_ELEMENT_COUNT_OR_1 = ${
              model.lattice.activeBeamlineElements().length || 1
            }; const int BEAMLINE_ELEMENT_COUNT = ${
              model.lattice.activeBeamlineElements().length
            };`
          )
      ].join('\n')
    })
  };
  const pushVelocity = pushFactory('velocity', 'ut_velocity', 1);
  const pushPosition = pushFactory('position', 'ut_position', 0);
  return {
    push: (n = 1, profile = false) => {
      for (let i = 0; i < n; i++) {
        variables.iteration++;
        variables.position.pingPong = variables.iteration % 2;
        variables.velocity.pingPong = variables.iteration % 2;
        const snapshots = Math.floor(
          variables.iteration / variables.iterationsPerSnapshot
        );
        variables.segments =
          variables.particleCount *
          Math.min(
            snapshots +
              variables.iteration -
              snapshots * variables.iterationsPerSnapshot,
            variables.snapshotCount - 1
          );
        variables.takeSnapshot =
          variables.iterationsPerSnapshot === 1 ||
          variables.iteration % variables.iterationsPerSnapshot === 1
            ? 1
            : 0;
        pushVelocity();
        pushPosition();
      }
      if (profile) {
        regl.poll();
        performanceLogger.entries.push({
          name: 'pushVelocity',
          particleCount: variables.particleCount,
          snapshotCount: variables.snapshotCount,
          packFloat2UInt8: variables.packFloat2UInt8,
          iterations: variables.iteration,
          stats: pushVelocity.stats
        });
        performanceLogger.entries.push({
          name: 'pushPosition',
          particleCount: variables.particleCount,
          snapshotCount: variables.snapshotCount,
          packFloat2UInt8: variables.packFloat2UInt8,
          iterations: variables.iteration,
          stats: pushPosition.stats
        });
      }
    },
    reset() {}
  }
}

function vec3(x, y, z) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = x;
  }
  if (z == null) {
    z = y;
  }
  return [x, y, z]
}
vec3.add = function add(out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  return out
};
function dot$5(x, y) {
  var sum = 0;
  for (var i = 0; i < x.length; i++) {
    sum += x[i] * y[i];
  }
  return sum
}
function sqrt(x) {
  if (x.length) {
    return x.map(sqrt)
  }
  return Math.sqrt(x)
}
function cross$1(x, y) {
  var x0 = x[0],
    x1 = x[1],
    x2 = x[2],
    y0 = y[0],
    y1 = y[1],
    y2 = y[2];
  var out = [0, 0, 0];
  out[0] = x1 * y2 - x2 * y1;
  out[1] = x2 * y0 - x0 * y2;
  out[2] = x0 * y1 - x1 * y0;
  return out
}
function jsBorisPush({ runner, variables, model, debug, initialData }) {
  const performanceLogger = new PerformanceLogger();
  console.log(initialData);
  performanceLogger.entries = [];
  const snapshots = [
    {
      fourPositions: new Float32Array(variables.particleCount * 4),
      fourVelocities: new Float32Array(variables.particleCount * 4)
    }
  ];
  snapshots[0].fourPositions.set(initialData.fourPositions.flat(), 0);
  snapshots[0].fourVelocities.set(initialData.fourVelocities.flat(), 0);
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
    };
    return () => {
      let nextFourPositions = new Float32Array(variables.particleCount * 4);
      let nextFourVelocities = new Float32Array(variables.particleCount * 4);
      for (let p = 0; p < variables.particleCount; p++) {
        const fourPosition = snapshots[
          snapshots.length - 1
        ].fourPositions.subarray(p * 4, p * 4 + 4);
        const fourVelocity = snapshots[
          snapshots.length - 1
        ].fourVelocities.subarray(p * 4, p * 4 + 4);
        var velocity = [0, 1, 2]
          .map(function (x, i) {
            return this[x]
          }, fourVelocity)
          .map(function (_) {
            return _ / this
          }, fourVelocity[3]);
        const intermediateFourPosition = [
          fourPosition[0] + 0.5 * velocity[0] * uniforms.deltaTOverC,
          fourPosition[1] + 0.5 * velocity[1] * uniforms.deltaTOverC,
          fourPosition[2] + 0.5 * velocity[2] * uniforms.deltaTOverC,
          fourPosition[3] + 0.5 * uniforms.deltaTOverC
        ];
        const intermediatePosition = intermediateFourPosition.slice(0, 3);
        var E = uniforms.lattice.getE(
          intermediatePosition,
          uniforms.electricField
        );
        var B = uniforms.lattice.getB(
          intermediatePosition,
          uniforms.magneticField
        );
        var gamma = 1;
        var u = [0, 1, 2].map(function (x, i) {
          return this[x]
        }, fourVelocity);
        if (initialData.particleTypes[p] > 0) {
          const { mass__eVc_2, charge__qe, chargeMassRatio__Ckg_1 } =
            particleByName(initialData.particleTypes[p]);
          var hdtc_m = (chargeMassRatio__Ckg_1 * uniforms.deltaTOverC) / C / 2;
          u = [u[0] + hdtc_m * E[0], u[1] + hdtc_m * E[1], u[2] + hdtc_m * E[2]];
          gamma = sqrt(
            1 +
              dot$5(
                [u[0] / C, u[1] / C, u[2] / C],
                [u[0] / C, u[1] / C, u[2] / C]
              )
          );
          var t_ = [
            (hdtc_m * B[0]) / gamma,
            (hdtc_m * B[1]) / gamma,
            (hdtc_m * B[2]) / gamma
          ];
          u = vec3.add([], u, cross$1(u, t_));
          var s_ = [
            (2.0 / (1.0 + t_[0] * t_[0])) * t_[0],
            (2.0 / (1.0 + t_[1] * t_[1])) * t_[1],
            (2.0 / (1.0 + t_[2] * t_[2])) * t_[2]
          ];
          u = vec3.add([], u, cross$1(u, s_));
          u = [u[0] + hdtc_m * E[0], u[1] + hdtc_m * E[1], u[2] + hdtc_m * E[2]];
          gamma = sqrt(
            1 +
              dot$5(
                [u[0] / C, u[1] / C, u[2] / C],
                [u[0] / C, u[1] / C, u[2] / C]
              )
          );
        }
        if (uniforms.boundingBoxSize > 0) {
          velocity =
            particleData.particleType > 0.1
              ? [u[0] / gamma / c, u[1] / gamma / c, u[2] / gamma / c]
              : velocity;
          var nextPosition = [
            intermediatePosition[0] + 0.5 * velocity[0] * deltaTOverC,
            intermediatePosition[1] + 0.5 * velocity[1] * deltaTOverC,
            intermediatePosition[2] + 0.5 * velocity[2] * deltaTOverC
          ];
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
          );
          u = [u[0] * ref[0], u[1] * ref[1], u[2] * ref[2]];
        }
        const nextFourVelocity = [u[0], u[1], u[2], gamma * C];
        const nextVelocity = [
          nextFourVelocity[0] / nextFourVelocity[3],
          nextFourVelocity[1] / nextFourVelocity[3],
          nextFourVelocity[2] / nextFourVelocity[3]
        ];
        const nextFourPosition = [
          intermediateFourPosition[0] +
            0.5 * nextVelocity[0] * uniforms.deltaTOverC,
          intermediateFourPosition[1] +
            0.5 * nextVelocity[1] * uniforms.deltaTOverC,
          intermediateFourPosition[2] +
            0.5 * nextVelocity[2] * uniforms.deltaTOverC,
          intermediateFourPosition[3] + 0.5 * uniforms.deltaTOverC
        ];
        nextFourPositions.set(nextFourPosition, p * 4);
        nextFourVelocities.set(nextFourVelocity, p * 4);
      }
      snapshots.push({
        fourPositions: nextFourPositions,
        fourVelocities: nextFourVelocities
      });
    }
  };
  const push = pushFactory();
  return {
    push: (n = 1, profile = false) => {
      for (let i = 0; i < n; i++) {
        variables.iteration++;
        const snapshots = Math.floor(
          variables.iteration / variables.iterationsPerSnapshot
        );
        variables.segments =
          variables.particleCount *
          Math.min(
            snapshots +
              variables.iteration -
              snapshots * variables.iterationsPerSnapshot,
            variables.snapshotCount - 1
          );
        variables.takeSnapshot =
          variables.iterationsPerSnapshot === 1 ||
          variables.iteration % variables.iterationsPerSnapshot === 1
            ? 1
            : 0;
        push();
      }
      const fourPositions = [];
      for (let p = 0; p < variables.particleCount; p++) {
        for (
          let s = snapshots.length - 1;
          s >= Math.max(0, snapshots.length - variables.snapshotCount);
          s--
        ) {
          fourPositions.push(
            Array.from(snapshots[s].fourPositions.subarray(p * 4, p * 4 + 4))
          );
        }
      }
      variables.position.load(fourPositions);
    },
    reset: () => {
      snapshots.length = 0;
      snapshots.push({
        fourPositions: new Float32Array(variables.particleCount * 4),
        fourVelocities: new Float32Array(variables.particleCount * 4)
      });
      snapshots[0].fourPositions.set(initialData.fourPositions.flat(), 0);
      snapshots[0].fourVelocities.set(initialData.fourVelocities.flat(), 0);
    }
  }
}

const variableTexture = (
  regl,
  { width, height },
  numberType,
  data = undefined
) =>
  regl.texture({
    width,
    height,
    min: 'nearest',
    mag: 'nearest',
    format: 'rgba',
    type: numberType,
    data
  });

function abs$1(x) {
  if (x.length) {
    return x.map(abs$1)
  }
  return Math.abs(x)
}
function log2(x) {
  if (x.length) {
    return x.map(log2)
  }
  return Math.log2(x)
}
function floor$1(x) {
  if (x.length) {
    return x.map(floor$1)
  }
  return Math.floor(x)
}
function pow(x, y) {
  if (x.length) {
    return x.map(function (x, i) {
      return Math.pow(x, y[i])
    })
  }
  return Math.pow(x, y)
}
function step(edge, x) {
  if (!x && !edge) {
    return 0
  }
  if (x.length) {
    if (edge.length) {
      return x.map(function (x, i) {
        return step(edge[i], x)
      })
    }
    return x.map(function (x) {
      return step(edge, x)
    })
  }
  return x < edge ? 0.0 : 1.0
}
function packFloat(v) {
  var av = abs$1(v);
  if (av < 1.17549435e-38) {
    return [0, 0, 0, 0]
  } else {
    if (v > 1.70141184e38) {
      return [0.4980392156862745, 0.5019607843137255, 0, 0]
    } else {
      if (v < -1.70141184e38) {
        return [1, 0.5019607843137255, 0, 0]
      }
    }
  }
  var c = [0, 0, 0, 0];
  var e = floor$1(log2(av));
  var m = av * pow(2.0, -e) - 1.0;
  c[1] = floor$1(128.0 * m);
  m -= c[1] / 128.0;
  c[2] = floor$1(32768.0 * m);
  m -= c[2] / 32768.0;
  c[3] = floor$1(8388608.0 * m);
  var ebias = e + 127.0;
  c[0] = floor$1(ebias / 2.0);
  ebias -= c[0] * 2.0;
  c[1] += floor$1(ebias) * 128.0;
  c[0] += 128.0 * step(0.0, -v);
  return [c[0], c[1], c[2], c[3]]
}

const FOUR_VECTOR_COMPONENT_COUNT = 4;
class VariableBuffers {
  constructor(
    regl,
    canRenderToFloatTexture,
    particleCount,
    snapshotCount,
    numberType,
    initialData
  ) {
    this.regl = regl;
    this.canRenderToFloatTexture = canRenderToFloatTexture;
    this.particleCount = particleCount;
    this.snapshotCount = snapshotCount;
    this.numberType = numberType;
    this.initialData = initialData;
    this.pingPong = 0;
    this.data = [
      new Float32Array(
        snapshotCount * FOUR_VECTOR_COMPONENT_COUNT * particleCount
      ),
      new Float32Array(
        snapshotCount * FOUR_VECTOR_COMPONENT_COUNT * particleCount
      )
    ];
    const width = (this.width = snapshotCount * FOUR_VECTOR_COMPONENT_COUNT);
    const height = (this.height = particleCount);
    this.buffers = [0, 1].map(() => {
      return canRenderToFloatTexture
        ? regl.framebuffer({
            height: this.height,
            width: this.width,
            depthStencil: false,
            color: variableTexture(regl, { width, height }, numberType)
          })
        : variableTexture(regl, { width, height }, numberType)
    });
    if (initialData) this.load(initialData);
  }
  load(fourVectors) {
    this.data[0] = this.data[1] =
      this.numberType === 'float'
        ? new Float32Array(
            fourVectors
              .map((fourVector) =>
                fourVector.map((component) => [component, 0, 0, 0])
              )
              .flat(2)
          )
        : new Uint8Array(
            new Float32Array(
              fourVectors.flat(2).map((component) => packFloat(component))
            ).buffer
          );
    this.buffers.forEach((buffer, i) =>
      ((buffer.color && buffer.color[0]) || buffer).subimage({
        width:
          (FOUR_VECTOR_COMPONENT_COUNT * fourVectors.length) /
          this.particleCount,
        height: this.particleCount,
        data: this.data[i]
      })
    );
    return this
  }
  value() {
    return this.buffers[this.pingPong]
  }
  reset() {
    this.pingPong = 0;
    this.load(this.initialData);
  }
  toTypedArray(pingPong = this.pingPong, precision = 3) {
    let float32Array;
    let colorUint8Array;
    if (this.numberType === 'uint8') {
      let data = new Uint8Array(this.particleCount * this.snapshotCount * 4 * 4);
      this.regl({
        framebuffer: this.buffers[pingPong]
      })(() => {
        this.regl.read({ data: data });
      });
      colorUint8Array = Array.from(data);
      float32Array = new Float32Array(data.buffer);
    }
    if (this.numberType === 'float') {
      try {
        const colorFloat32Array = new Float32Array(
          this.particleCount * this.snapshotCount * 4 * 4
        );
        this.regl({
          framebuffer: this.buffers[pingPong]
        })(() => {
          this.regl.read({ data: colorFloat32Array });
        });
        float32Array = colorFloat32Array;
      } catch (e) {
        console.error(e);
      }
    }
    return {
      colorUint8Array,
      float32Array: Array.from(float32Array).map((d) =>
        precision
          ? Math.round(d * Math.pow(10, precision)) / Math.pow(10, precision)
          : d
      )
    }
  }
  pack(float32Array) {
    const packedFloat32Array = [];
    for (let p = 0; p < this.particleCount; p++) {
      const particle = [];
      packedFloat32Array.push(particle);
      for (let b = 0; b < this.snapshotCount; b++) {
        if (this.numberType === 'uint8') {
          const offset = (p * this.snapshotCount + b) * 4;
          particle.push([
            float32Array[offset],
            float32Array[offset + 1],
            float32Array[offset + 2],
            float32Array[offset + 3]
          ]);
        } else {
          const offset = (p * this.snapshotCount + b) * 4 * 4;
          particle.push([
            float32Array[offset],
            float32Array[offset + 4],
            float32Array[offset + 8],
            float32Array[offset + 12]
          ]);
        }
      }
    }
    return packedFloat32Array
  }
}

class ColorCorrector {
  constructor(regl, fourPositions, emitterPosition) {
    this.regl = regl;
    this.particleCount = fourPositions.length;
    const initialParticleDistances = fourPositions.map((fourPosition) => {
      return Math.sqrt(
        Math.pow(fourPosition[0] - emitterPosition[0], 2) +
          Math.pow(fourPosition[1] - emitterPosition[1], 2) +
          Math.pow(fourPosition[2] - emitterPosition[2], 2)
      )
    });
    const maxParticleDistance = Math.max(...initialParticleDistances);
    const relativeParticleDistances = initialParticleDistances.map((d) =>
      maxParticleDistance === 0 ? 0 : d / maxParticleDistance
    );
    this.corrections = relativeParticleDistances.map((d) => {
      return maxParticleDistance > 0 ? (d < 0.7 ? d : 1) : 1
    });
  }
  toTexture() {
    return this.regl.texture({
      data: this.corrections.map((c) => [c, 0, 0, 0]).flat(),
      shape: [this.particleCount, 1, 4],
      type: 'float'
    })
  }
}

const DRIF$1 = 'DRIF';
const QUAD$1 = 'QUAD';
const SBEN$1 = 'SBEN';
const ESTA$1 = 'ESTA';
function cos(angle) {
  if (angle.length) {
    return angle.map(cos)
  }
  return Math.cos(angle)
}
function sin(angle) {
  if (angle.length) {
    return angle.map(sin)
  }
  return Math.sin(angle)
}
function abs(x) {
  if (x.length) {
    return x.map(abs)
  }
  return Math.abs(x)
}
function max$1(x, y) {
  if (x.length) {
    if (y.length) {
      return x.map(function (x, i) {
        return Math.max(x, y[i])
      })
    }
    return x.map(function (x) {
      return Math.max(x, y)
    })
  }
  return Math.max(x, y)
}
function min$1(x, y) {
  if (x.length) {
    if (y.length) {
      return x.map(function (x, i) {
        return Math.min(x, y[i])
      })
    }
    return x.map(function (x) {
      return Math.min(x, y)
    })
  }
  return Math.min(x, y)
}
function length$3(x) {
  var sum = 0;
  for (var i = 0; i < x.length; i++) {
    sum += x[i] * x[i];
  }
  return Math.sqrt(sum)
}
function rot2D(phi) {
  var c = cos(phi);
  var s = sin(phi);
  return [c, -s, s, c]
}
function sdBox(p, s) {
  let absP = abs(p);
  var d = [0.5 * s[0] - absP[0], 0.5 * s[1] - absP[1], 0.5 * s[2] - absP[2]];
  return min$1(max$1(d[0], max$1(d[1], d[2])), 0.0) + length$3(max$1(d, 0.0))
}
function dot$4(x, y) {
  var sum = 0;
  for (var i = 0; i < x.length; i++) {
    sum += x[i] * y[i];
  }
  return sum
}
function signedDistanceToBox(p, size) {
  const offsetX = Math.abs(p[0]) - size[0] / 2;
  const offsetY = Math.abs(p[1]) - size[1] / 2;
  const offsetZ = Math.abs(p[2]) - size[2] / 2;
  const offsetMaxX = Math.max(offsetX, 0);
  const offsetMaxY = Math.max(offsetY, 0);
  const offsetMaxZ = Math.max(offsetZ, 0);
  const offsetMinX = Math.min(offsetX, 0);
  const offsetMinY = Math.min(offsetY, 0);
  const offsetMinZ = Math.min(offsetZ, 0);
  const unsignedDst = Math.sqrt(
    offsetMaxX * offsetMaxX + offsetMaxY * offsetMaxY + offsetMaxZ * offsetMaxZ
  );
  const dstInsideBox = Math.max(offsetMinX, offsetMinY, offsetMinZ);
  return unsignedDst + dstInsideBox
}
const LATTICE_ELEMENT_TYPES$1 = {
  DRIF: DRIF$1,
  SBEN: SBEN$1,
  QUAD: QUAD$1,
  ESTA: ESTA$1
};
const LATTICE_ELEMENTS = {
  DRIF: {
    color: [0.3, 0.3, 0.3],
    width: 0.1,
    height: 0.1,
    gap: 0
  },
  SBEN: { color: [0.55, 0, 0], width: 0.5, height: 0.5, gap: 0 },
  QUAD: {
    color: [1, 0.5, 0],
    color_minus: [0.5, 0.5, 0],
    width: 0.5,
    height: 0.5,
    gap: 0
  },
  ESTA: { color: [0, 0.8, 0], width: 0.5, height: 0.5, gap: 0 }
};
const LatticeElementTypesArray = [DRIF$1, SBEN$1, QUAD$1, ESTA$1];
class Lattice {
  constructor(latticeDescriptor) {
    if (typeof latticeDescriptor === 'undefined')
      throw new Error('no default constructor')
    this.origin = latticeDescriptor.origin || {
      phi: 0,
      position: [0, 1, 0]
    };
    let phi = this.origin.phi;
    let [x, y, z] = this.origin.position;
    let local_z = 0;
    this.beamline = latticeDescriptor.beamline.map((elementKey) => {
      if (!latticeDescriptor.elements[elementKey]) {
        throw new Error(`element ${elementKey} not defined`)
      }
      const element = latticeDescriptor.elements[elementKey];
      local_z += element.l;
      const phi_half = element.angle ? phi + element.angle / 2 : phi;
      const start = [x, y, z]
      ;[x, z] = [
        x - Math.sin(phi_half) * element.l,
        z + Math.cos(phi_half) * element.l
      ];
      phi = element.angle ? phi + element.angle : phi;
      return {
        color:
          element.type === LATTICE_ELEMENT_TYPES$1.QUAD && element.strength < 0
            ? LATTICE_ELEMENTS[element.type].color_minus
            : LATTICE_ELEMENTS[element.type].color,
        type: element.type,
        ...(element.strength && { strength: element.strength }),
        middle: [(start[0] + x) / 2, y, (start[2] + z) / 2],
        phi: phi_half,
        local_z_min: local_z - element.l,
        local_z_max: local_z,
        size: [
          LATTICE_ELEMENTS[element.type].width,
          LATTICE_ELEMENTS[element.type].height,
          element.l - LATTICE_ELEMENTS[element.type].gap
        ]
      }
    });
  }
  get transformations() {
    return this.beamline.map((element) => {
      return {
        type: element.type,
        translation: element.middle,
        phi: element.phi,
        theta:
          element.type === LATTICE_ELEMENT_TYPES$1.QUAD
            ? ((2 * Math.PI) / 360) * 45
            : 0,
        scale: element.size
      }
    })
  }
  get colors() {
    return this.beamline.map((element) => {
      return element.type === LATTICE_ELEMENT_TYPES$1.QUAD && element.strength < 0
        ? LATTICE_ELEMENTS[element.type].color_minus
        : LATTICE_ELEMENTS[element.type].color
    })
  }
  length() {
    return (
      this.beamline.length &&
      this.beamline[this.beamline.length - 1].local_z_max
    )
  }
  activeBeamlineElements() {
    return this.beamline.filter((element) => element.type != DRIF$1)
  }
  toGLSLDefinition() {
    return this.activeBeamlineElements()
      .map(
        (element, i) =>
          `beamline[${i}] = BeamlineElement(
vec3(${element.middle.join(',')}),
vec3(${element.size[0]}, ${element.size[1]}, ${element.size[2]}),
${element.phi ? -element.phi.toFixed(10) : '0.'},
${LatticeElementTypesArray.indexOf(element.type)},
${element.strength ? element.strength.toFixed(10) : '0.'})`
      )
      .join(';\n')
  }
  getE(position, E0 = [0, 0, 0]) {
    let E = E0;
    this.beamline
      .filter((element) => element.type === LATTICE_ELEMENT_TYPES$1.ESTA)
      .forEach((ble) => {
        let localPosition = position;
        localPosition = [
          localPosition[0] - ble.middle[0],
          localPosition[1] - ble.middle[1],
          localPosition[2] - ble.middle[2]
        ];
        localPosition = [
          dot$4([localPosition[0], localPosition[1]], rot2D(ble.phi).slice(0, 2)),
          dot$4([localPosition[0], localPosition[1]], rot2D(ble.phi).slice(2, 4)),
          localPosition[2]
        ];
        if (sdBox(localPosition, ble.size) <= 0) {
          E = [E[0], E[1], E[2] + ble.strength];
        }
      });
    return E
  }
  getB(position, B0 = [0, 0, 0]) {
    let B = B0;
    this.beamline
      .filter(
        (element) =>
          element.type === LATTICE_ELEMENT_TYPES$1.SBEN ||
          element.type === LATTICE_ELEMENT_TYPES$1.QUAD
      )
      .forEach((ble) => {
        let localPosition = position;
        localPosition = [
          localPosition[0] - ble.middle[0],
          localPosition[1] - ble.middle[1],
          localPosition[2] - ble.middle[2]
        ];
        localPosition = [
          dot$4([localPosition[0], localPosition[1]], rot2D(ble.phi).slice(0, 2)),
          dot$4([localPosition[0], localPosition[1]], rot2D(ble.phi).slice(2, 4)),
          localPosition[2]
        ];
        if (signedDistanceToBox(localPosition, ble.size) <= 0) {
          if (ble.type == LATTICE_ELEMENT_TYPES$1.SBEN) {
            B = [B[0], B[1] + ble.strength, B[2]];
          } else if (ble.type == LATTICE_ELEMENT_TYPES$1.QUAD) {
            B =
              ble.strength > 0
                ? [
                    B[0] + abs(ble.strength) * localPosition[1],
                    B[1] + abs(ble.strength) * localPosition[0],
                    B[2]
                  ]
                : [
                    B[0] - abs(ble.strength) * localPosition[1],
                    B[1] - abs(ble.strength) * localPosition[0],
                    B[2]
                  ];
          }
        }
      });
    return B
  }
}

class Simulation {
  constructor(regl, { model, runner, debug }) {
    this.performanceLogger = new PerformanceLogger(debug.logPerformance);
    this.performanceLogger.start('Simulation()');
    this._regl = regl;
    this.configuration = { model, runner, debug };
    if (!model.emitter.position)
      model.emitter.position = model.lattice.origin.position;
    if (!model.emitter.direction)
      model.emitter.direction = [
        Math.sin(model.lattice.origin.phi),
        0,
        Math.cos(model.lattice.origin.phi)
      ];
    const { snapshotCount } = runner;
    const { particleCount, particleTypes, fourPositions, fourVelocities } =
      (this.initialData = new ParticleCollection(model.emitter));
    this.configuration.runner.numberType = this.configuration.runner
      .packFloat2UInt8
      ? 'uint8'
      : 'float';
    this.configuration.runner.numberType = 'float';
    this.configuration.runner._iterationsPerRun = this.configuration.runner
      .iterationCount
      ? this.configuration.runner.iterationCount
      : (this.configuration.runner.snapshotCount - 1) *
        this.configuration.runner.iterationsPerSnapshot;
    this.colorCorrector = new ColorCorrector(
      regl,
      fourPositions,
      model.emitter.position
    );
    this.variables = {
      ...this.configuration.runner,
      particleCount,
      snapshotCount,
      iterations: this.configuration.runner._iterationsPerRun,
      particleTypes,
      position: new VariableBuffers(
        regl,
        this.configuration.runner.pusher === 'glsl',
        particleCount,
        snapshotCount,
        this.configuration.runner.numberType,
        fourPositions
      ),
      velocity: new VariableBuffers(
        regl,
        this.configuration.runner.pusher === 'glsl',
        particleCount,
        snapshotCount,
        this.configuration.runner.numberType,
        fourVelocities
      ),
      iteration: 0,
      particleColorsAndTypes: regl.texture({
        data: particleTypes.map((p) => PARTICLE_TYPES[p].color.concat(p)),
        shape: [particleCount, 1, 4],
        type: 'uint8'
      }),
      colorCorrections: this.colorCorrector.toTexture(),
      particleChargesMassesChargeMassRatios: regl.texture({
        data: particleTypes
          .map((p) => [
            PARTICLE_TYPES[p].charge__qe,
            PARTICLE_TYPES[p].mass__eVc_2,
            PARTICLE_TYPES[p].chargeMassRatio__Ckg_1,
            p
          ])
          .flat(),
        shape: [particleCount, 1, 4],
        type: 'float'
      })
    };
    this.model = {
      boundingBoxSize: model.boundingBoxSize,
      boundingBoxCenter: model.boundingBoxCenter,
      latticeConfig: model.lattice,
      lattice: new Lattice(model.lattice),
      interactions: {
        particleInteraction: model.interactions.particleInteraction,
        electricField: model.interactions.electricField,
        magneticField: model.interactions.magneticField
      }
    };
    this.log();
    this.pusher =
      this.configuration.runner.pusher === 'glsl'
        ? glslBorisPush(this._regl, {
            runner: this.configuration.runner,
            variables: this.variables,
            model: this.model,
            debug: this.debug
          })
        : jsBorisPush({
            runner: this.configuration.runner,
            variables: this.variables,
            model: this.model,
            debug: this.debug,
            initialData: this.initialData
          });
    this.performanceLogger.stop();
  }
  push(n = 1, profile = false) {
    this.performanceLogger.start(`simulation.push (n=${n})`);
    this.pusher.push(n, profile);
    this.log();
    this.performanceLogger.stop();
  }
  logEntry() {
    const positionData = this.variables.position.toTypedArray();
    const velocityData = this.variables.velocity.toTypedArray();
    return {
      iteration: this.variables.iteration,
      position: positionData,
      velocity: velocityData
    }
  }
  log() {
    if (this.configuration.debug.logPushing) {
      if (!this._logStore) this._logStore = [];
      this._logStore.push(this.dump());
    }
  }
  dump(precision = 3) {
    const packedPositions = this.variables.position.pack(
      this.variables.position.toTypedArray(
        this.variables.position.pingPong,
        precision
      ).float32Array
    );
    const packedVelocities = this.variables.position.pack(
      this.variables.velocity.toTypedArray(
        this.variables.position.pingPong,
        precision
      ).float32Array
    );
    return JSON.parse(
      JSON.stringify({
        logEntry: this.logEntry(),
        packedPositions,
        packedVelocities,
        colorCorrections: this.colorCorrector.corrections,
        configuration: this.configuration,
        particleTypes: this.variables.particleTypes
      })
    )
  }
  reset() {
    this.variables.position.reset();
    this.variables.velocity.reset();
    this.variables.iteration = 0;
    this.pusher.reset();
  }
  prerender() {
    this.push(this.configuration.runner._iterationsPerRun, false);
  }
}

const RUNNER_MODE = {
  NOBREAK: 'nobreak',
  STEPWISE: 'stepwise'
};
const DRIF = 'DRIF';
const QUAD = 'QUAD';
const SBEN = 'SBEN';
const ESTA = 'ESTA';
const LATTICE_ELEMENT_TYPES = {
  DRIF,
  SBEN,
  QUAD,
  ESTA
};

const INITIAL = 'initial';
const ACTIVE = 'active';
const PAUSED = 'paused';
const RESTART = 'restart';
const STATES = {
  INITIAL,
  ACTIVE,
  PAUSED,
  RESTART
};
class SimulationRunner {
  constructor(
    simulation,
    { prerender = false, loops = 0, mode = RUNNER_MODE.STEPWISE },
    debug
  ) {
    this.performanceLogger = new PerformanceLogger(debug.logPerformance);
    this._simulation = simulation;
    this._prerender = prerender;
    this._loopCountMax = loops;
    this._isLooping = loops > 0;
    this._mode = mode;
    this.fsm = { state: STATES.INITIAL };
  }
  toggleLooping() {
    this._loopCount = 0;
    this._loopCountMax = 10;
    this._isLooping = !this._isLooping;
  }
  toggleMode() {
    this._mode =
      this._mode === RUNNER_MODE.STEPWISE
        ? RUNNER_MODE.NOBREAK
        : RUNNER_MODE.STEPWISE;
  }
  toggleActivity() {
    if (this.fsm.state === STATES.ACTIVE) {
      this.fsm = { state: STATES.PAUSED };
    } else if (this.fsm.state === STATES.PAUSED) {
      this.fsm = { state: STATES.ACTIVE };
      if (this._isLooping) {
        this._loopCount = 1;
      }
    }
  }
  next() {
    const tick_before = this._simulation.variables.iteration;
    if (this.fsm.state === STATES.INITIAL) {
      this._loopCount = 1;
      if (this._prerender) {
        this._simulation.prerender();
        this.fsm =
          this._loopCountMax === 0
            ? { state: STATES.PAUSED }
            : { state: STATES.ACTIVE };
      } else {
        this.fsm = { state: STATES.ACTIVE };
      }
    }
    if (this.fsm.state === STATES.ACTIVE) {
      if (
        this._simulation.variables.iteration >
        this._simulation.configuration.runner._iterationsPerRun - 1
      ) {
        if (this._isLooping && this._loopCount <= this._loopCountMax) {
          this.fsm.state = 'restart';
        } else {
          this.fsm.state = STATES.PAUSED;
        }
      } else {
        this._simulation.push(
          this._simulation.configuration.runner.iterationsPerSnapshot
        );
        if (this._mode === RUNNER_MODE.STEPWISE) {
          this.fsm.state = STATES.PAUSED;
        }
      }
    } else if (this.fsm.state === STATES.RESTART) {
      this._loopCount++;
      this._simulation.reset();
      this._simulation.push(
        this._simulation.configuration.runner.iterationsPerSnapshot *
          this._simulation.configuration.runner.snapshotsPerTick
      );
      this.fsm.state = this.fsm.state.replace(
        /restart/,
        this._mode === RUNNER_MODE.STEPWISE ? STATES.PAUSED : STATES.ACTIVE
      );
    }
    const tick_after = this._simulation.variables.iteration;
    const changed = tick_after !== tick_before;
    return { changed, tick: tick_after }
  }
}

function createCylinderMesh(
  radiusTop,
  radiusBottom,
  height,
  radialSegments,
  heightSegments
) {
  var index = 0;
  var indexOffset = 0;
  var indexArray = [];
  radiusTop = typeof radiusTop !== 'undefined' ? radiusTop : 1;
  radiusBottom = typeof radiusBottom !== 'undefined' ? radiusBottom : 1;
  height = typeof height !== 'undefined' ? height : 5;
  radialSegments = typeof radialSegments !== 'undefined' ? radialSegments : 64;
  heightSegments = typeof heightSegments !== 'undefined' ? heightSegments : 8;
  var capCount = 0;
  if (radiusTop > 0) {
    capCount++;
  }
  if (radiusBottom > 0) {
    capCount++;
  }
  var vertexCount = ((radialSegments + 1) * (heightSegments + 1)) +
    ((radialSegments + 2) * capCount);
  var cellCount = (radialSegments * heightSegments * 2) + (radialSegments * capCount);
  var normals = new Array(vertexCount);
  var vertices = new Array(vertexCount);
  var uvs = new Array(vertexCount);
  var cells = new Array(cellCount);
  var slope = (radiusBottom - radiusTop) / height;
  var thetaLength = 2.0 * Math.PI;
  for (var y = 0; y <= heightSegments; y++) {
    var indexRow = [];
    var v = y / heightSegments;
    var radius = v * (radiusBottom - radiusTop) + radiusTop;
    for (var x = 0; x <= radialSegments; x++) {
      var u = x / radialSegments;
      var theta = u * thetaLength;
      var sinTheta = Math.sin(theta);
      var cosTheta = Math.cos(theta);
      vertices[index] = [radius * sinTheta, -v * height + (height / 2), radius * cosTheta];
      normals[index] = [sinTheta, slope, cosTheta];
      uvs[index] = [u, 1 - v];
      indexRow.push(index);
      index++;
    }
    indexArray.push(indexRow);
  }
  for (var x = 0; x < radialSegments; x++) {
    for (var y = 0; y < heightSegments; y++) {
      var i1 = indexArray[y][x];
      var i2 = indexArray[y + 1][x];
      var i3 = indexArray[y + 1][x + 1];
      var i4 = indexArray[y][x + 1];
      cells[indexOffset] = [i1, i2, i4];
      indexOffset++;
      cells[indexOffset] = [i2, i3, i4];
      indexOffset++;
    }
  }
  var generateCap = function (top) {
    new Array(3).fill(0);
    var radius = (top === true) ? radiusTop : radiusBottom;
    var sign = (top === true) ? 1 : -1;
    var centerIndexStart = index;
    for (var x = 1; x <= radialSegments; x++) {
      vertices[index] = [0, height * sign / 2, 0];
      normals[index] = [0, sign, 0];
      uvs[index] = [0.5, 0.5];
      index++;
    }
    var centerIndexEnd = index;
    for (var x = 0; x <= radialSegments; x++) {
      var u = x / radialSegments;
      var theta = u * thetaLength;
      var cosTheta = Math.cos(theta);
      var sinTheta = Math.sin(theta);
      vertices[index] = [radius * sinTheta, height * sign / 2, radius * cosTheta];
      normals[index] = [0, sign, 0];
      uvs[index] = [(cosTheta * 0.5) + 0.5, (sinTheta * 0.5 * sign) + 0.5];
      index++;
    }
    for (var x = 0; x < radialSegments; x++) {
      var c = centerIndexStart + x;
      var i = centerIndexEnd + x;
      if ( top === true ) {
        cells[indexOffset] = [i, i + 1, c];
        indexOffset++;
      } else {
        cells[indexOffset] = [i + 1, i, c];
        indexOffset++;
      }
    }
  };
  if (radiusTop > 0) {
    generateCap(true);
  }
  if (radiusBottom > 0) {
    generateCap(false);
  }
  return {
    uvs: uvs,
    cells: cells,
    normals: normals,
    positions: vertices
  }
}
var primitiveCylinder = createCylinderMesh;

function offsetCells(cells, offset) {
  return cells.map(function (cell) {
    return cell.map(function (index) {
      return index + offset
    })
  })
}
function mergeMeshes(meshes) {
  let positions = [];
  let uvs = [];
  let normals = [];
  let cells = [];
  let offset = 0;
  meshes.forEach(function (mesh) {
    uvs = uvs.concat(mesh.uvs);
    normals = normals.concat(mesh.normals);
    positions = positions.concat(mesh.positions);
    cells = cells.concat(offsetCells(mesh.cells, offset));
    offset += mesh.positions.length;
  });
  return {
    cells,
    positions,
    normals,
    uvs
  }
}

var vert$4 = "precision mediump float;\n#define GLSLIFY 1\nattribute vec3 aOffset;\nattribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aUV;\nvarying vec2 vUv;\nvarying float v_visibility;\n// These three are instanced attributes.\nuniform mat4 projection, view;\nuniform vec3 magneticField;\nvarying vec3 vPosition;\nvarying float vColorCorrection;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec3 vColor;\nvarying vec3 vScale;\n\nstruct BeamlineElement {\n  vec3 middle;\n  vec3 size;\n  float phi;\n  int type; //0: drift, 1: dipole, 2: quadrupole, 3: esta\n  float strength;\n};\n\n/*__latticeSize__*/\n\nconst int BEAMLINE_ELEMENT_TYPE_DRIFT = 0;\nconst int BEAMLINE_ELEMENT_TYPE_DIPOLE = 1;\nconst int BEAMLINE_ELEMENT_TYPE_QUADRUPOLE = 2;\n\nmat3 mat3LookAt(vec3 eye, vec3 target, float roll) {\n  vec3 rr = vec3(sin(roll), cos(roll), 0.0);\n  vec3 ww = normalize(target - eye);\n  vec3 uu = normalize(cross(ww, rr));\n  vec3 vv = normalize(cross(uu, ww));\n\n  return mat3(uu, vv, ww);\n}\n\n/*__latticeChunkGLSL__*/\n\nmat2 rot2D(float phi) {\n  float c = cos(phi);\n  float s = sin(phi);\n  return mat2(c, -s, s, c);\n}\nfloat sdBox(vec3 p, vec3 s) {\n  vec3 d = abs(p) - .5 * s;\n  return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));\n}\nBeamlineElement getBeamlineElement(float id) {\n  for(int i = 0; i < BEAMLINE_ELEMENT_COUNT; i++) {\n    if(float(i) == id)\n      return beamline[i];\n  }\n  return beamline[0];\n}\n\nvec3 getB(vec3 position) {\n\n  vec3 B = magneticField;\n  \n\n  for(int i = 0; i < BEAMLINE_ELEMENT_COUNT; i++) {\n    BeamlineElement ble = beamline[i];\n    vec3 localPosition = position;\n    localPosition -= ble.middle;\n    localPosition.xz *= rot2D(ble.phi);\n    if(sdBox(localPosition, ble.size) <= 0.) {\n      if(ble.type == BEAMLINE_ELEMENT_TYPE_DIPOLE) {\n        B += vec3(0., ble.strength, 0.);\n      } else if(ble.type == BEAMLINE_ELEMENT_TYPE_QUADRUPOLE) {\n        B += abs(ble.strength) *\n          ((ble.strength > 0.) ? vec3(localPosition.y, localPosition.x, 0) : vec3(-localPosition.y, -localPosition.x, 0.));\n      }\n    }\n  }\n\n  return B;\n}\n\nmat3 rotateAlign(vec3 v1, vec3 v2) {\n  vec3 axis = cross(v1, v2);\n\n  float cosA = dot(v1, v2);\n  float k = 1. / (1. + cosA);\n\n  return mat3((axis.x * axis.x * k) + cosA, (axis.y * axis.x * k) - axis.z, (axis.z * axis.x * k) + axis.y, (axis.x * axis.y * k) + axis.z, (axis.y * axis.y * k) + cosA, (axis.z * axis.y * k) - axis.x, (axis.x * axis.z * k) - axis.y, (axis.y * axis.z * k) + axis.x, (axis.z * axis.z * k) + cosA);\n\n}\n\nvoid main() {\n  initLatticeData();\n  vUv = aUV;\n  vNormal = aNormal;\n  vNormalOrig = aNormal;\n\n  vec3 b = getB(aOffset);\n\n  vColor = .1 * vec3(b);\n  float scale = length(b) == 0. ? .0 : min(length(b)*1000., 1.) / 1.;\n  vec3 direction = normalize(b);\n\n  // mat3 lookAt = mat3LookAt(vec3(0.), direction, 0.1);\n\n  // Translate\n  mat4 tPos = mat4(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0), vec4(aOffset, 1.0));\n\n  // float angleX = dot(b, vec3(1., 0., 0.));\n  // float angleZ = 0.;\n  // float angleY = 0.;\n\n// // Rotate\n//   mat4 rXPos = mat4(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, cos(angleX), -sin(angleX), 0.0), vec4(0.0, sin(angleX), cos(angleX), 0.0), vec4(0.0, 0.0, 0.0, 1.0));\n\n//   mat4 rYPos = mat4(vec4(cos(angleY), 0., -sin(angleY), 0.0), vec4(0.0, 1.0, 0.0, 0.0), vec4(sin(angleY), 0.0, cos(angleY), 0.0), vec4(0.0, 0.0, 0.0, 1.0));\n\n//   mat4 rZPos = mat4(vec4(cos(angleZ), -sin(angleZ), 0.0, 0.0), vec4(sin(angleZ), cos(angleZ), 0.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0));\n\n// Scale\n  // mat4 sScale = mat4(vec4(1., 0.0, 0.0, 0.0), vec4(0.0, scale, 0.0, 0.0), vec4(0.0, 0.0, 1., 0.0), vec4(0.0, 0.0, 0.0, 1.0));\n  mat3 sScale = mat3(vec3(1., 0.0, 0.0), vec3(0.0, scale, 0.0), vec3(0.0, 0.0, 1.));\n\n  // mat4 aModel = tPos * rotateAlign(b) * sScale;\n\n  vPosition = ( tPos *  vec4( sScale *  aPosition, 1.)).xyz;\n\n  gl_Position = projection * view * vec4(vPosition, 1.);\n}\n"; // eslint-disable-line

var frag$5 = "precision mediump float;\n#define GLSLIFY 1\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec3 vColor;\nvarying vec2 vUv;\nuniform float ambientLightAmount;\nuniform float vColorCorrection;\nuniform float diffuseLightAmount;\nuniform vec3 shadowDirection;\nuniform float pathicleWidth;\nuniform vec3 eye;\nvarying vec3 vScale;\n\nfloat edger(vec2 uv, vec3 boxScale, float edgeWidth, vec3 normal) {\n\n  float edgeXY =  smoothstep(0., edgeWidth, uv.x*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.z);\n  float edgeXZ =  smoothstep(0., edgeWidth, uv.y*boxScale.y) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.y);\n  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);\n\n  float edgeYX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);\n  float edgeYZ =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);\n  float edgeY = (1.-(edgeYX*edgeYZ))*abs(normal.y);\n\n  float edgeZX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);\n  float edgeZY =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);\n  float edgeZ = (1.-(edgeZX*edgeZY))*abs(normal.z);\n\n  return clamp(edgeX+edgeY, 0., 1.);\n}\n\n//\n//float edgerFeathered(vec2 uv, vec3 boxScale, float edgeWidth) {\n//\n//  float feather = .1;\n//\n//  float edgeXY =  smoothstep(edgeWidth, edgeWidth+feather, uv.x*boxScale.z) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.x)*boxScale.z);\n//  float edgeXZ =  smoothstep(edgeWidth, edgeWidth+feather, uv.y*boxScale.y) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.y)*boxScale.y);\n//  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);\n//\n//  return clamp(edgeX, 0., 1.);\n//}\n//\n//\n//float edgerHard(vec2 uv, vec3 boxScale, float edgeWidth) {\n//  float edgeXY =  step(edgeWidth*(1.+uv.x*boxScale.z), uv.x*boxScale.z) * step(edgeWidth, (1.-uv.x)*boxScale.z);\n//  float edgeXZ =  step(edgeWidth*(0.5+uv.x/2.), uv.y*boxScale.y) * step(edgeWidth*(0.5+uv.x/2.), (1.-uv.y)*boxScale.y);\n//  float edgeX = (1.-(edgeXZ))*abs(normal.x);\n//\n//  return clamp(edgeX, 0., 1.);\n//}\n\nfloat diffuse(vec3 lightDir, vec3 nrm)\n{\n  float diffAmt = max(0.0, dot(nrm, lightDir));\n  return diffAmt;\n}\nfloat specular(vec3 lightDir, vec3 viewDir, vec3 nrm, float shininess)\n{\n  vec3 halfVec = normalize(viewDir + lightDir);\n  float specAmt = max(0.0, dot(halfVec, nrm));\n  return pow(specAmt, shininess);\n}\n\nstruct DirectionalLight\n{\n  vec3 direction;\n  vec3 color;\n  float intensity;\n};\n#define NUM_DIR_LIGHTS 3\nDirectionalLight directionalLights[NUM_DIR_LIGHTS];\n\nvoid main () {\n\n  #ifdef lighting\n\n  if (length(vColor) == 0.) discard;\n  vec3 color = vColor;\n  gl_FragColor = vec4(vColor, 1.);\n\n  vec3 viewDir = normalize(eye - vPosition);\n  vec3 normal = normalize(vNormal);\n\n  directionalLights[0] = DirectionalLight(shadowDirection, vec3(1.), .15);\n  directionalLights[1] = DirectionalLight(shadowDirection+vec3(-5., 0., 5.), vec3(1.), .15);\n  directionalLights[2] = DirectionalLight(shadowDirection+vec3(5., 0., -5.), vec3(1.), .15);\n  vec3 edgedColor = vColor;\n  vec3 finalColor = ambientLightAmount * vColor;\n\n  for (int i = 0; i < NUM_DIR_LIGHTS; ++i)\n  {\n    DirectionalLight light = directionalLights[i];\n    vec3 sceneLight = mix(light.color, edgedColor.rgb + light.color * 0.5, 0.5);\n    float diffAmt = diffuse(light.direction, normal) * light.intensity;\n    float specAmt = specular(light.direction, viewDir, normal, 0.0) * light.intensity;\n\n    float shadow = 1.; //.9 * vColorCorrection;//clamp(vColorCorrection + abs(2.+v_position.y*5.), 0., 1.);\n    float specMask = edger(vUv, vScale, 1. * .02, vNormalOrig);\n//    float specMask = edger(vUv, vScale, 1. * .1, vNormalOrig) * smoothstep(5., 2., length(vPosition-eye));\n    vec3 specCol = specMask * sceneLight * specAmt;\n    finalColor += shadow * vColor * diffAmt * light.color;\n    finalColor += shadow * specCol * sceneLight;\n  }\n\n  gl_FragColor =vec4(finalColor, 1.);\n//  gl_FragColor = vec4(1., 0., 0., 1.);\n//  gl_FragColor = vec4(vColor, .5);\n  #endif\n\n}\n"; // eslint-disable-line

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

var create_1$3 = create$3;
function create$3() {
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

var clone_1$2 = clone$3;
function clone$3(a) {
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

var copy_1$1 = copy$2;
function copy$2(out, a) {
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

var multiply_1$2 = multiply$2;
function multiply$2(out, a, b) {
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

var rotateX_1$1 = rotateX$1;
function rotateX$1(out, a, rad) {
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

var rotateY_1$1 = rotateY$1;
function rotateY$1(out, a, rad) {
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

var rotateZ_1$2 = rotateZ$2;
function rotateZ$2(out, a, rad) {
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
  create: create_1$3
  , clone: clone_1$2
  , copy: copy_1$1
  , identity: identity_1$1
  , transpose: transpose_1
  , invert: invert_1$1
  , adjoint: adjoint_1
  , determinant: determinant_1
  , multiply: multiply_1$2
  , translate: translate_1
  , scale: scale_1$2
  , rotate: rotate_1
  , rotateX: rotateX_1$1
  , rotateY: rotateY_1$1
  , rotateZ: rotateZ_1$2
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

const X = 51;
const Y = 3;
const Z = 51;
const STEP_SIZE = 0.1;
const positionAttributes = () => {
  const out = [];
  for (let x = 0; x < X; x++)
    for (let y = 0; y < Y; y++)
      for (let z = 0; z < Z; z++) {
        out.push([
          (x - (X - 1) / 2) * STEP_SIZE,
          (y - (Y - 1) / 2) * STEP_SIZE + 1,
          (z - (Z - 1) / 2) * STEP_SIZE
        ]);
      }
  return out
};
function drawFieldsCommands (regl, { model, view }, shadow) {
  const coneGeometry = primitiveCylinder(0, 0.01, 0.05);
  const tailGeometry = primitiveCylinder(0.005, 0.005, 0.05);
  tailGeometry.positions = tailGeometry.positions.map(([x, y, z]) => [
    x,
    y - 0.05,
    z
  ]);
  const geometry = mergeMeshes([coneGeometry, tailGeometry]);
  let modelMatrix = glMat4.identity([]);
  const command = (mode) => {
    return regl({
      depth: {
        enable: true
      },
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
        color: [0, 0, 0, 1]
      },
      cull: {
        enable: true,
        face: 'back'
      },
      elements: geometry.cells,
      instances: () => X * Y * Z,
      attributes: {
        aPosition: geometry.positions,
        aNormal: geometry.normals,
        aUV: geometry.uvs,
        aOffset: {
          buffer: regl.buffer(positionAttributes()),
          divisor: 1
        }
      },
      vert: [
        `#define ${mode} 1`,
        vert$4
          .replace(
            '/*__latticeDefinition__*/',
            model.lattice.toGLSLDefinition()
          )
          .replace('/*__latticeChunkGLSL__*/', latticeChunk(model.lattice))
          .replace(
            '/*__latticeSize__*/',
            `const int BEAMLINE_ELEMENT_COUNT_OR_1 = ${
              model.lattice.activeBeamlineElements().length || 1
            }; const int BEAMLINE_ELEMENT_COUNT = ${
              model.lattice.activeBeamlineElements().length
            };`
          )
      ].join('\n'),
      frag: [`#define ${mode} 1`, frag$5].join('\n'),
      uniforms: {
        ...shadow.uniforms,
        stageSize: view.stageGrid.size,
        magneticField: model.interactions.magneticField,
        ...(mode === 'shadow' && {
          projection: shadow.shadowProjectionMatrix,
          view: shadow.shadowViewMatrix
        }),
        ...(mode === 'lighting' && { shadowMap: shadow.fbo }),
        utColorCorrections: (ctx, props) => {
          return props.colorCorrections
        },
        model: (ctx, props) => {
          modelMatrix = glMat4.identity([]);
          return fromTranslation_1(modelMatrix, [
            props.modelTranslateX || 0,
            props.modelTranslateY || 0,
            0
          ])
        }
      },
      ...(mode === 'shadow' && {
        framebuffer: shadow.fbo
      })
    })
  };
  return {
    lighting: command('lighting'),
    shadow: command('shadow')
  }
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

var vert$3 = "precision highp float;\n#define GLSLIFY 1\nattribute vec3 aPosition;\n\nattribute vec3 aNormal;\nattribute vec2 aUV;\n\nattribute float a_particle;\nattribute float a_snapshot;\n\nuniform int particleCount;\nuniform int snapshotCount;\nuniform int packFloat2UInt8;\n\nuniform vec2 viewRange;\n\nuniform float pathicleWidth;\nuniform float pathicleGap;\nuniform float pathicleHeight;\nuniform float stageGrid_size;\n\nuniform vec2 resolution;\nuniform sampler2D utColorCorrections;\nuniform sampler2D utParticleColorAndType;\nuniform sampler2D ut_position;\nuniform sampler2D ut_velocity;\nuniform mat4 projection, view, model;\nuniform vec3 eye;\n\nuniform mat4 shadowProjectionMatrix;\nuniform mat4 shadowViewMatrix;\nuniform vec3 shadowDirection;\nuniform bool littleEndian;\nvarying float v_visibility;\nvarying vec3 vScale;\nvarying vec3 v_position;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec2 vUv;\nvarying vec3 vShadowCoord;\nvarying vec3 vColor;\nvarying float vColorCorrection;\nvarying vec4 v_lightNDC;\nuniform sampler2D shadowMap;\n\nconst mat4 texUnitConverter = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);\n\nfloat inverse(float m) {\n  return 1.0 / m;\n}\n\nmat2 inverse(mat2 m) {\n  return mat2(m[1][1],-m[0][1],\n             -m[1][0], m[0][0]) / (m[0][0]*m[1][1] - m[0][1]*m[1][0]);\n}\n\nmat3 inverse(mat3 m) {\n  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2];\n  float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2];\n  float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2];\n\n  float b01 = a22 * a11 - a12 * a21;\n  float b11 = -a22 * a10 + a12 * a20;\n  float b21 = a21 * a10 - a11 * a20;\n\n  float det = a00 * b01 + a01 * b11 + a02 * b21;\n\n  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),\n              b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),\n              b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;\n}\n\nmat4 inverse(mat4 m) {\n  float\n      a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],\n      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],\n      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],\n      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],\n\n      b00 = a00 * a11 - a01 * a10,\n      b01 = a00 * a12 - a02 * a10,\n      b02 = a00 * a13 - a03 * a10,\n      b03 = a01 * a12 - a02 * a11,\n      b04 = a01 * a13 - a03 * a11,\n      b05 = a02 * a13 - a03 * a12,\n      b06 = a20 * a31 - a21 * a30,\n      b07 = a20 * a32 - a22 * a30,\n      b08 = a20 * a33 - a23 * a30,\n      b09 = a21 * a32 - a22 * a31,\n      b10 = a21 * a33 - a23 * a31,\n      b11 = a22 * a33 - a23 * a32,\n\n      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;\n\n  return mat4(\n      a11 * b11 - a12 * b10 + a13 * b09,\n      a02 * b10 - a01 * b11 - a03 * b09,\n      a31 * b05 - a32 * b04 + a33 * b03,\n      a22 * b04 - a21 * b05 - a23 * b03,\n      a12 * b08 - a10 * b11 - a13 * b07,\n      a00 * b11 - a02 * b08 + a03 * b07,\n      a32 * b02 - a30 * b05 - a33 * b01,\n      a20 * b05 - a22 * b02 + a23 * b01,\n      a10 * b10 - a11 * b08 + a13 * b06,\n      a01 * b08 - a00 * b10 - a03 * b06,\n      a30 * b04 - a31 * b02 + a33 * b00,\n      a21 * b02 - a20 * b04 - a23 * b00,\n      a11 * b07 - a10 * b09 - a12 * b06,\n      a00 * b09 - a01 * b07 + a02 * b06,\n      a31 * b01 - a30 * b03 - a32 * b00,\n      a20 * b03 - a21 * b01 + a22 * b00) / det;\n}\n\nfloat transpose(float m) {\n  return m;\n}\n\nmat2 transpose(mat2 m) {\n  return mat2(m[0][0], m[1][0],\n              m[0][1], m[1][1]);\n}\n\nmat3 transpose(mat3 m) {\n  return mat3(m[0][0], m[1][0], m[2][0],\n              m[0][1], m[1][1], m[2][1],\n              m[0][2], m[1][2], m[2][2]);\n}\n\nmat4 transpose(mat4 m) {\n  return mat4(m[0][0], m[1][0], m[2][0], m[3][0],\n              m[0][1], m[1][1], m[2][1], m[3][1],\n              m[0][2], m[1][2], m[2][2], m[3][2],\n              m[0][3], m[1][3], m[2][3], m[3][3]);\n}\n\nmat4 lookAt(vec3 eye, vec3 at, vec3 up) {\n  vec3 zaxis = normalize(eye - at);\n  vec3 xaxis = normalize(cross(zaxis, up));\n  vec3 yaxis = cross(xaxis, zaxis);\n  zaxis *= -1.;\n  return mat4(\n  vec4(xaxis.x, xaxis.y, xaxis.z, -dot(xaxis, eye)),\n  vec4(yaxis.x, yaxis.y, yaxis.z, -dot(yaxis, eye)),\n  vec4(zaxis.x, zaxis.y, zaxis.z, -dot(zaxis, eye)),\n  vec4(0, 0, 0, 1)\n  );\n}\n\n#ifdef PACK_FLOAT\n\n// Denormalize 8-bit color channels to integers in the range 0 to 255.\nivec4 floatsToBytes(vec4 inputFloats, bool littleEndian) {\n  ivec4 bytes = ivec4(inputFloats * 255.0);\n  return (\n    littleEndian\n    ? bytes.abgr\n    : bytes\n  );\n}\n\n// Break the four bytes down into an array of 32 bits.\nvoid bytesToBits(const in ivec4 bytes, out bool bits[32]) {\n  for (int channelIndex = 0; channelIndex < 4; ++channelIndex) {\n    float acc = float(bytes[channelIndex]);\n    for (int indexInByte = 7; indexInByte >= 0; --indexInByte) {\n      float powerOfTwo = exp2(float(indexInByte));\n      bool bit = acc >= powerOfTwo;\n      bits[channelIndex * 8 + (7 - indexInByte)] = bit;\n      acc = mod(acc, powerOfTwo);\n    }\n  }\n}\n\n// Compute the exponent of the 32-bit float.\nfloat getExponent(bool bits[32]) {\n  const int startIndex = 1;\n  const int bitStringLength = 8;\n  const int endBeforeIndex = startIndex + bitStringLength;\n  float acc = 0.0;\n  int pow2 = bitStringLength - 1;\n  for (int bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {\n    acc += float(bits[bitIndex]) * exp2(float(pow2--));\n  }\n  return acc;\n}\n\n// Compute the mantissa of the 32-bit float.\nfloat getMantissa(bool bits[32], bool subnormal) {\n  const int startIndex = 9;\n  const int bitStringLength = 23;\n  const int endBeforeIndex = startIndex + bitStringLength;\n  // Leading/implicit/hidden bit convention:\n  // If the number is not subnormal (with exponent 0), we add a leading 1 digit.\n  float acc = float(!subnormal) * exp2(float(bitStringLength));\n  int pow2 = bitStringLength - 1;\n  for (int bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {\n    acc += float(bits[bitIndex]) * exp2(float(pow2--));\n  }\n  return acc;\n}\n\n// Parse the float from its 32 bits.\nfloat bitsToFloat(bool bits[32]) {\n  float signBit = float(bits[0]) * -2.0 + 1.0;\n  float exponent = getExponent(bits);\n  bool subnormal = abs(exponent - 0.0) < 0.01;\n  float mantissa = getMantissa(bits, subnormal);\n  float exponentBias = 127.0;\n  return signBit * mantissa * exp2(exponent - exponentBias - 23.0);\n}\n\n// Decode a 32-bit float from the RGBA color channels of a texel.\nfloat rgbaToFloat(vec4 texelRGBA, bool littleEndian) {\n  ivec4 rgbaBytes = floatsToBytes(texelRGBA, littleEndian);\n  bool bits[32];\n  bytesToBits(rgbaBytes, bits);\n  return bitsToFloat(bits);\n}\n\n#endif\n\nvec4 readVariable(sampler2D tex, int p, int s) {\n\n#ifdef PACK_FLOAT\n  return vec4(rgbaToFloat(texture2D(tex, vec2(4 * s, p) / resolution), littleEndian), \n  rgbaToFloat(texture2D(tex, vec2(4 * s + 1, p) / resolution), littleEndian), \n  rgbaToFloat(texture2D(tex, vec2(4 * s + 2, p) / resolution), littleEndian), \n  rgbaToFloat(texture2D(tex, vec2(4 * s + 3, p) / resolution), littleEndian));\n#else\n  return vec4(texture2D(tex, vec2(4 * s, p) / resolution).r, texture2D(tex, vec2(4 * s + 1, p) / resolution).r, texture2D(tex, vec2(4 * s + 2, p) / resolution).r, texture2D(tex, vec2(4 * s + 3, p) / resolution).r);\n#endif\n}\n\nfloat unpackRGBA (vec4 v) {\n  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));\n}\nfloat shadowValue() {\n  vec3 tex = texture2D(shadowMap, vUv).rgb;\n\n  vec3 lightPos = v_lightNDC.xyz / v_lightNDC.w;\n\n  float bias = 0.001;\n  float depth = lightPos.z - bias;\n  float occluder = unpackRGBA(texture2D(shadowMap, lightPos.xy));\n\n  // Compare actual depth from light to the occluded depth rendered in the depth map\n  // If the occluded depth is smaller, we must be in shadow\n  return mix(.0, 1., occluder-depth);\n\n}\n\nfloat insideBox3D(vec3 v, vec3 bottomLeft, vec3 topRight) {\n  vec3 s = step(bottomLeft, v) - step(topRight, v);\n  return s.x * s.y * s.z;\n}\n\nfloat get_colorCorrection(int p) {\n  vec2 coords = vec2(float(p), 0.) / vec2(float(particleCount), 1.);\n  return texture2D(utColorCorrections, coords).r;\n}\n\nvec4 get_color(int p) {\n  vec2 coords = vec2(float(p), 0.) / vec2(float(particleCount), 1.);\n  return texture2D(utParticleColorAndType, coords);\n}\nfloat visibility(vec4 fourPosition) {\n\n  bool outsideBox = insideBox3D(fourPosition.xyz, vec3(stageGrid_size), vec3(-stageGrid_size)) == 0.;\n  bool beyondProgressLower = (viewRange[0] * float(snapshotCount) >= float(snapshotCount)-a_snapshot);\n  bool beyondProgressUpper =  (viewRange[1] * float(snapshotCount) < float(snapshotCount)-a_snapshot);\n  return  (outsideBox || beyondProgressLower || beyondProgressUpper ) ? 0. : 1.;\n}\n\nvoid main () {\n\n  vec4 fourPosition = readVariable(ut_position, int(a_particle), int(a_snapshot));\n  vec4 previousFourPosition = readVariable(ut_position, int(a_particle), int(a_snapshot) + 1);\n\n  mat4 lookAtMat4 = lookAt(fourPosition.xyz, previousFourPosition.xyz, vec3(0., 1., 0.));\n\n#ifdef lighting\n    vScale = vec3(\n      pathicleWidth  * 1.,\n      pathicleHeight,\n      length(previousFourPosition.xyz - fourPosition.xyz) - pathicleGap);\n#endif\n\n#ifdef shadow\n    vScale = vec3(\n      pathicleWidth * 10.,\n      pathicleHeight,\n      length(previousFourPosition.xyz - fourPosition.xyz) );\n#endif\n\n  vec3 scaledPosition = aPosition * vScale;\n\n  v_position = (((lookAtMat4 * vec4(scaledPosition, 1.)).xyz\n    + 0.5 * (fourPosition.xyz + previousFourPosition.xyz)));\n\n  vNormalOrig = aNormal;\n  vNormal = normalize((transpose(inverse(lookAtMat4)) * vec4(aNormal, 0.)).xyz);\n\n  vUv = aUV;\n\n  vShadowCoord = (shadowProjectionMatrix *  shadowViewMatrix * model * vec4(v_position, 1.0)).xyz;\n  vColor = get_color(int(a_particle)).rgb;\n  v_visibility = visibility(fourPosition);\n\n#ifdef lighting\n\n  v_lightNDC = texUnitConverter * shadowProjectionMatrix * shadowViewMatrix * model * vec4(v_position, 1.0);\n  vColorCorrection = get_colorCorrection(int(a_particle));\n  v_visibility = v_visibility; // * clamp(shadowValue(), 1., 1.);\n\n  gl_Position = projection * view *  model * vec4(v_position, 1.0);\n\n#endif// lighting\n\n#ifdef shadow\n\n  gl_Position =vec4(vShadowCoord, 1.0);\n\n#endif// shadow\n}\n\n"; // eslint-disable-line

var frag$4 = "precision highp float;\n#define GLSLIFY 1\n//#extension GL_OES_standard_derivatives : enable\n\nvarying float v_visibility;\nvarying vec3 v_position;\nvarying vec3 vScale;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec2 vUv;\nvarying vec4 vAmbientColor;\nvarying vec3 vColor;\nvarying float vColorCorrection;\nvarying vec4 v_lightNDC;\n\nuniform float ambientLightAmount;\nuniform float diffuseLightAmount;\nuniform float stageSize;\n\nuniform float pathicleWidth;\nuniform vec3 eye;\nuniform vec2 uResolution;\n\nvarying vec3 vShadowCoord;\nuniform vec3 shadowDirection;\nuniform sampler2D shadowMap;\nuniform float minBias;\nuniform float maxBias;\n\nfloat edger(vec2 uv, vec3 boxScale, float edgeWidth, vec3 normal) {\n\n  float edgeXY =  smoothstep(0., edgeWidth, uv.x*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.z);\n  float edgeXZ =  smoothstep(0., edgeWidth, uv.y*boxScale.y) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.y);\n  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);\n\n  float edgeYX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);\n  float edgeYZ =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);\n  float edgeY = (1.-(edgeYX*edgeYZ))*abs(normal.y);\n\n  float edgeZX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);\n  float edgeZY =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);\n  float edgeZ = (1.-(edgeZX*edgeZY))*abs(normal.z);\n\n  return clamp(edgeX+edgeY, 0., 1.);\n}\n\n//\n//float edgerFeathered(vec2 uv, vec3 boxScale, float edgeWidth) {\n//\n//  float feather = .1;\n//\n//  float edgeXY =  smoothstep(edgeWidth, edgeWidth+feather, uv.x*boxScale.z) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.x)*boxScale.z);\n//  float edgeXZ =  smoothstep(edgeWidth, edgeWidth+feather, uv.y*boxScale.y) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.y)*boxScale.y);\n//  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);\n//\n//  return clamp(edgeX, 0., 1.);\n//}\n//\n//\n//float edgerHard(vec2 uv, vec3 boxScale, float edgeWidth) {\n//  float edgeXY =  step(edgeWidth*(1.+uv.x*boxScale.z), uv.x*boxScale.z) * step(edgeWidth, (1.-uv.x)*boxScale.z);\n//  float edgeXZ =  step(edgeWidth*(0.5+uv.x/2.), uv.y*boxScale.y) * step(edgeWidth*(0.5+uv.x/2.), (1.-uv.y)*boxScale.y);\n//  float edgeX = (1.-(edgeXZ))*abs(normal.x);\n//\n//  return clamp(edgeX, 0., 1.);\n//}\n\nvec4 packRGBA (float v) {\n  vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v);\n  pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;\n  return pack;\n}\n\nfloat unpackRGBA (vec4 v) {\n  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));\n}\n\nfloat shadowValue() {\n  vec3 tex = texture2D(shadowMap, vUv).rgb;\n\n  vec3 lightPos = v_lightNDC.xyz / v_lightNDC.w;\n\n  float bias = 0.001;\n  float depth = lightPos.z - bias;\n  float occluder = unpackRGBA(texture2D(shadowMap, lightPos.xy));\n\n  // Compare actual depth from light to the occluded depth rendered in the depth map\n  // If the occluded depth is smaller, we must be in shadow\n  return mix(0.2, 1.0, step(depth, occluder));\n\n}\n\nfloat map(float value, float min1, float max1, float min2, float max2) {\n  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);\n}\n\nfloat diffuse(vec3 lightDir, vec3 nrm)\n{\n  float diffAmt = max(0.0, dot(nrm, lightDir));\n  return diffAmt;\n}\nfloat specular(vec3 lightDir, vec3 viewDir, vec3 nrm, float shininess)\n{\n  vec3 halfVec = normalize(viewDir + lightDir);\n  float specAmt = max(0.0, dot(halfVec, nrm));\n  return pow(specAmt, shininess);\n}\n\nstruct DirectionalLight\n{\n  vec3 direction;\n  vec3 color;\n  float intensity;\n};\n#define NUM_DIR_LIGHTS 3\nDirectionalLight directionalLights[NUM_DIR_LIGHTS];\n\nvoid main () {\n\n    if (v_visibility < .9) discard;\n\n  #ifdef lighting\n\n  vec3 viewDir = normalize(eye - v_position);\n  vec3 normal = normalize(vNormal);\n\n  directionalLights[0] = DirectionalLight(shadowDirection, vec3(1.), .15);\n  directionalLights[1] = DirectionalLight(shadowDirection+vec3(-5., 0., 5.), vec3(1.), .15);\n  directionalLights[2] = DirectionalLight(shadowDirection+vec3(5., 0., -5.), vec3(1.), .15);\n  vec3 edgedColor = vColor;\n  vec3 finalColor = ambientLightAmount * vColor;\n\n  for (int i = 0; i < NUM_DIR_LIGHTS; ++i)\n  {\n    DirectionalLight light = directionalLights[i];\n    vec3 sceneLight = mix(light.color, edgedColor.rgb + light.color * 0.5, 0.5);\n    float diffAmt = diffuse(light.direction, normal) * light.intensity;\n    float specAmt = specular(light.direction, viewDir, normal, 0.0) * light.intensity;\n\n    float shadow = .9 * vColorCorrection;//clamp(vColorCorrection + abs(2.+v_position.y*5.), 0., 1.);\n    float specMask = edger(vUv, vScale, 1. * pathicleWidth, vNormalOrig) * smoothstep(5., 2., length(v_position-eye));\n    vec3 specCol = specMask * sceneLight * specAmt;\n    finalColor += shadow * vColor * diffAmt * light.color;\n    finalColor += shadow * specCol * sceneLight;\n  }\n\n  gl_FragColor =vec4(finalColor, 1.); //map(v_visibility, 0.5, 1., 0.75, .9));\n\n  #endif// lighting\n\n  #ifdef shadow\n  gl_FragColor = packRGBA(vShadowCoord.z );\n  #endif\n\n}\n\n"; // eslint-disable-line

const stepAttributes = ({ particleCount, snapshotCount }) => {
  return Array(particleCount * snapshotCount)
    .fill(0)
    .map((_, i) => Math.floor(i / particleCount))
};
const particleAttributes = ({ particleCount, snapshotCount }) => {
  return Array(particleCount * snapshotCount)
    .fill(0)
    .map((_, i) => i % particleCount)
};
function drawModelCommands (regl, { variables, view }, shadow) {
  const geometry = primitiveCube();
  let modelMatrix = glMat4.identity([]);
  const command = (mode) => {
    return regl({
      depth: {
        enable: true
      },
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
        color: [0, 0, 0, 1]
      },
      cull: {
        enable: true,
        face: 'back'
      },
      elements: geometry.cells,
      instances: () => variables.segments,
      attributes: {
        aPosition: geometry.positions,
        aNormal: geometry.normals,
        aUV: geometry.uvs,
        a_particle: {
          buffer: regl.buffer(particleAttributes(variables)),
          divisor: 1
        },
        a_snapshot: {
          buffer: regl.buffer(stepAttributes(variables)),
          divisor: 1
        }
      },
      vert: [
        ...(variables.packFloat2UInt8 ? [`#define PACK_FLOAT`] : []),
        `#define ${mode} 1`,
        vert$3
      ].join('\n'),
      frag: [
        `#define ${mode} 1`,
        frag$4
      ].join('\n'),
      uniforms: {
        ...shadow.uniforms,
        stageSize: view.stageGrid.size,
        ...(mode === 'shadow' && {
          projection: shadow.shadowProjectionMatrix,
          view: shadow.shadowViewMatrix
        }),
        ...(mode === 'lighting' && { shadowMap: shadow.fbo }),
        utColorCorrections: (ctx, props) => {
          return props.colorCorrections
        },
        utParticleColorAndType: (ctx, props) => {
          return props.particleColorsAndTypes
        },
        ut_position: (ctx, props) => {
          return props.position
        },
        viewRange: (ctx, props) => props.viewRange || [0, 1],
        snapshotCount: variables.snapshotCount,
        packFloat2UInt8: variables.packFloat2UInt8 ? 1 : 0,
        littleEndian: isLittleEndian(),
        resolution: [variables.snapshotCount * 4, variables.particleCount],
        particleCount: variables.particleCount,
        pathicleGap: view.pathicleRelativeGap * view.pathicleWidth,
        pathicleHeight: view.pathicleWidth * view.pathicleRelativeHeight,
        pathicleWidth: view.pathicleWidth,
        model: (ctx, props) => {
          modelMatrix = glMat4.identity([]);
          return fromTranslation_1(modelMatrix, [
            props.modelTranslateX || 0,
            props.modelTranslateY || 0,
            0
          ])
        }
      },
      ...(mode === 'shadow' && {
        framebuffer: shadow.fbo
      })
    })
  };
  return {
    lighting: command('lighting'),
    shadow: command('shadow')
  }
}

var frag$3 = "precision highp float;\n#extension GL_OES_standard_derivatives : enable\n#define GLSLIFY 1\n\n#define SQRT2 1.41421356\n#define PI 3.14159\n\nuniform vec3 shadowDirection;\nuniform sampler2D shadowMap;\nuniform float minBias;\nuniform float maxBias;\nuniform float stageSize;\n\nvarying vec3 vShadowCoord;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n\nfloat unpackRGBA (vec4 v) {\n  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));\n}\n\n// Can go down to 10 or so, and still be usable, probably...\n#define ITERATIONS 5\n\n// Set this to 0.0 to stop the pixel movement.\n#define TIME iTime\n\n#define TAU  6.28318530718\n\n//-------------------------------------------------------------------------------------------\n// Use last part of hash function to generate new random radius and angle...\nvec2 Sample(inout vec2 r)\n{\n  r = fract(r * vec2(33.3983, 43.4427));\n  return r-.5;\n  //return sqrt(r.x+.001) * vec2(sin(r.y * TAU), cos(r.y * TAU))*.5; // <<=== circular sampling.\n}\n\n  //-------------------------------------------------------------------------------------------\n  #define HASHSCALE 443.8975\nvec2 Hash22(vec2 p)\n{\n  vec3 p3 = fract(vec3(p.xyx) * HASHSCALE);\n  p3 += dot(p3, p3.yzx+19.19);\n  return fract(vec2((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y));\n}\n\n//-------------------------------------------------------------------------------------------\nvec3 Blur(sampler2D tex, vec2 uv, float radius)\n{\n  radius = radius * .04;\n\n  vec2 circle = vec2(radius); // * vec2((iResolution.y / iResolution.x), 1.0);\n\n  // Remove the time reference to prevent random jittering if you don't like it.\n  vec2 random = Hash22(uv);\n\n  // Do the blur here...\n  vec3 acc = vec3(0.0);\n  for (int i = 0; i < ITERATIONS; i++) {\n    acc += texture2D(tex, uv+ circle * Sample(random), radius*1.0).xyz;\n  }\n  return acc / float(ITERATIONS);\n}\n\nfloat fBlur(sampler2D tex, vec2 uv, float radius)\n{\n  vec2 circle = vec2(radius);\n\n  // Remove the time reference to prevent random jittering if you don't like it.\n  vec2 random = Hash22(uv);\n\n  // Do the blur here...\n  float acc = 0.;\n  for (int i = 0; i < ITERATIONS; i++) {\n    acc += unpackRGBA(texture2D(tex, uv+ circle * Sample(random), radius*1.0));\n  }\n  return acc / float(ITERATIONS);\n}\n\nvec3 mainColor = vec3(1.);\nvec3 lineColor = vec3(.7);\nvec4 gridControl = vec4(.1, 10., .5, .99);\nvec3 gridOffset = vec3(0., 0., 0.);\nfloat getVisibility(float position) {\n  float majorGridFrequency=gridControl.y;\n  if (floor(position+0.5) == floor(position/majorGridFrequency+0.5)*majorGridFrequency)\n  {\n    return 1.0;\n  }\n  return gridControl.z;\n}\nfloat getAnisotropicAttenuation(float differentialLength) {\n  const float maxNumberOfLines=4.0;\n  return clamp(1.0/(differentialLength+1.0)-1.0/maxNumberOfLines, 0.0, 1.0);\n}\nfloat isPointOnLine(float position, float differentialLength) {\n  float fractionPartOfPosition = position-floor(position+0.5);\n  fractionPartOfPosition/=differentialLength;\n  fractionPartOfPosition=clamp(fractionPartOfPosition, -1., 1.);\n  float result=0.5+0.5*cos(fractionPartOfPosition*PI);\n  return result;\n}\nfloat contributionOnAxis(float position) {\n  float differentialLength=length(vec2(dFdx(position), dFdy(position)));\n  differentialLength*=SQRT2;\n  float result=isPointOnLine(position, differentialLength);\n  float visibility=getVisibility(position);\n  result*=visibility;\n  float anisotropicAttenuation=getAnisotropicAttenuation(differentialLength);\n  result*=anisotropicAttenuation;\n  return result;\n}\nfloat normalImpactOnAxis(float x) {\n  float normalImpact=clamp(1.0-3.0*abs(x*x*x), 0.0, 1.0);\n  return normalImpact;\n}\n\nvoid main(void) {\n\n  float amountInLight =1.-fBlur(shadowMap, vShadowCoord.xy, .01);\n\n  float gridRatio=gridControl.x;\n  vec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;\n  float x=contributionOnAxis(gridPos.x);\n  float y=contributionOnAxis(gridPos.y);\n  float z=contributionOnAxis(gridPos.z);\n  vec3 normal=normalize(vNormal);\n  float grid=clamp(x+y+z, 0., 1.);\n\n  vec3 color=mix(mainColor, lineColor, grid);\n  float opacity = clamp(grid, 0.2, gridControl.w*grid)*.5;\n  float fogDistance = length(vPosition);\n  float fogAmount = smoothstep(stageSize/2.*1., stageSize/2.*.5, fogDistance);\n\n  gl_FragColor =vec4(color.rgb, fogAmount*opacity)\n    + vec4(vec3(-.25*amountInLight), 1.);\n\n}\n\n"; // eslint-disable-line

var vert$2 = "precision highp float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec2 uv;\n//\nuniform vec3 uOffset;\nuniform mat4 projection;\nuniform mat4 view;\n\nuniform mat4 shadowProjectionMatrix;\nuniform mat4 shadowViewMatrix;\nuniform vec3 shadowDirection;\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vShadowCoord;\nconst mat4 texUnitConverter = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);\n\nvoid main () {\n  vUv = 0. * uv ;\n\n  vec4 worldPosition = vec4(position + uOffset, 1.0);\n  vPosition = worldPosition.xyz;\n  vShadowCoord = (texUnitConverter * shadowProjectionMatrix * shadowViewMatrix * worldPosition).xyz;\n\n  gl_Position = projection * view * vec4(vPosition, 1.);\n}\n"; // eslint-disable-line

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

function drawStageCommands (regl, view, shadow) {
  const stage = createPlane(view.stageGrid.size, view.stageGrid.size);
  const command = (mode) => {
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
        color: [0, 0, 0, 1]
      },
      cull: {
        enable: true,
        face: 'front'
      },
      depth: true,
      primitive: 'triangles',
      elements: stage.cells,
      attributes: {
        position: stage.positions,
        uv: stage.uvs
      },
      uniforms: {
        ...shadow.uniforms,
        stageSize: view.stageGrid.size,
        uOffset: [0, view.stageGrid.y, 0],
        ...(mode === 'lighting' && { shadowMap: shadow.fbo })
      },
      vert: [`#define ${mode} 1`, vert$2].join('\n'),
      frag: [`#define ${mode} 1`, frag$3].join('\n')
    })
  };
  return {
    lighting: command('lighting')
  }
}

var vert$1 = "precision mediump float;\n#define GLSLIFY 1\nattribute vec3 aPosition;\nattribute vec3 aColor;\nattribute vec3 aNormal;\nattribute vec2 aUV;\nvarying vec2 vUv;\nattribute vec3 aTranslation;\nattribute vec3 aScale;\nattribute float aPhi;\nattribute float aTheta;\nuniform mat4 projection, view;\n// These three are instanced attributes.\nvarying vec4 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec3 vColor;\nvarying vec3 vScale;\n\nfloat inverse(float m) {\n  return 1.0 / m;\n}\n\nmat2 inverse(mat2 m) {\n  return mat2(m[1][1],-m[0][1],\n             -m[1][0], m[0][0]) / (m[0][0]*m[1][1] - m[0][1]*m[1][0]);\n}\n\nmat3 inverse(mat3 m) {\n  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2];\n  float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2];\n  float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2];\n\n  float b01 = a22 * a11 - a12 * a21;\n  float b11 = -a22 * a10 + a12 * a20;\n  float b21 = a21 * a10 - a11 * a20;\n\n  float det = a00 * b01 + a01 * b11 + a02 * b21;\n\n  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),\n              b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),\n              b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;\n}\n\nmat4 inverse(mat4 m) {\n  float\n      a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],\n      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],\n      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],\n      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],\n\n      b00 = a00 * a11 - a01 * a10,\n      b01 = a00 * a12 - a02 * a10,\n      b02 = a00 * a13 - a03 * a10,\n      b03 = a01 * a12 - a02 * a11,\n      b04 = a01 * a13 - a03 * a11,\n      b05 = a02 * a13 - a03 * a12,\n      b06 = a20 * a31 - a21 * a30,\n      b07 = a20 * a32 - a22 * a30,\n      b08 = a20 * a33 - a23 * a30,\n      b09 = a21 * a32 - a22 * a31,\n      b10 = a21 * a33 - a23 * a31,\n      b11 = a22 * a33 - a23 * a32,\n\n      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;\n\n  return mat4(\n      a11 * b11 - a12 * b10 + a13 * b09,\n      a02 * b10 - a01 * b11 - a03 * b09,\n      a31 * b05 - a32 * b04 + a33 * b03,\n      a22 * b04 - a21 * b05 - a23 * b03,\n      a12 * b08 - a10 * b11 - a13 * b07,\n      a00 * b11 - a02 * b08 + a03 * b07,\n      a32 * b02 - a30 * b05 - a33 * b01,\n      a20 * b05 - a22 * b02 + a23 * b01,\n      a10 * b10 - a11 * b08 + a13 * b06,\n      a01 * b08 - a00 * b10 - a03 * b06,\n      a30 * b04 - a31 * b02 + a33 * b00,\n      a21 * b02 - a20 * b04 - a23 * b00,\n      a11 * b07 - a10 * b09 - a12 * b06,\n      a00 * b09 - a01 * b07 + a02 * b06,\n      a31 * b01 - a30 * b03 - a32 * b00,\n      a20 * b03 - a21 * b01 + a22 * b00) / det;\n}\n\nfloat transpose(float m) {\n  return m;\n}\n\nmat2 transpose(mat2 m) {\n  return mat2(m[0][0], m[1][0],\n              m[0][1], m[1][1]);\n}\n\nmat3 transpose(mat3 m) {\n  return mat3(m[0][0], m[1][0], m[2][0],\n              m[0][1], m[1][1], m[2][1],\n              m[0][2], m[1][2], m[2][2]);\n}\n\nmat4 transpose(mat4 m) {\n  return mat4(m[0][0], m[1][0], m[2][0], m[3][0],\n              m[0][1], m[1][1], m[2][1], m[3][1],\n              m[0][2], m[1][2], m[2][2], m[3][2],\n              m[0][3], m[1][3], m[2][3], m[3][3]);\n}\n\nmat4 fromYRotation (float phi) {\n  float s = sin(phi);\n  float c = cos(phi);\n  return mat4(\n  c,   0.,  -s,   0.,\n  0.,  1.,   0.,   0.,\n  s,   0.,   c,   0.,\n  0.,  0.,   0.,   1.);\n}\nmat4 fromZRotation (float theta) {\n  float s = sin(theta);\n  float c = cos(theta);\n  return mat4(\n  c,   -s,  0.,   0.,\n  s,   c,   0.,   0.,\n  0.,  0.,   1.,   0.,\n  0.,  0.,   0.,   1.);\n}\nvoid main () {\n\n  vUv = aUV;\n  vScale = aScale;\n\n// Translate\nmat4 tPos = mat4(vec4(1.0,0.0,0.0,0.0),\nvec4(0.0,1.0,0.0,0.0),\nvec4(0.0,0.0,1.0,0.0),\nvec4(aTranslation,1.0));\n\n//// Rotate\n//mat4 rXPos = mat4(vec4(1.0,0.0,0.0,0.0),\n//vec4(0.0,cos(rotationX),-sin(rotationX),0.0),\n//vec4(0.0,sin(rotationX),cos(rotationX),0.0),\n//vec4(0.0,0.0,0.0,1.0));\n\nmat4 rYPos = mat4(vec4(cos(aPhi),0.,-sin(aPhi),0.0),\nvec4(0.0,1.0,0.0,0.0),\nvec4(sin(aPhi),0.0,cos(aPhi),0.0),\nvec4(0.0,0.0,0.0,1.0));\n\nmat4 rZPos = mat4(vec4(cos(aTheta),-sin(aTheta),0.0,0.0),\nvec4(sin(aTheta),cos(aTheta),0.0,0.0),\nvec4(0.0,0.0,1.0,0.0),\nvec4(0.0,0.0,0.0,1.0));\n\n// Scale\nmat4 sScale = mat4(vec4(aScale.x,0.0,0.0,0.0),\nvec4(0.0,aScale.y,0.0,0.0),\nvec4(0.0,0.0,aScale.z,0.0),\nvec4(0.0,0.0,0.0,1.0));\n\n  mat4 aModel = tPos *  rYPos * rZPos  * sScale;\n  vPosition =  aModel * vec4(aPosition,1.0);\n  vColor = aColor;\n\n#ifdef lighting\n\n  vNormalOrig = aNormal;\n  vNormal = normalize((transpose(inverse(aModel)) * vec4(aNormal, 0.)).xyz);\n  gl_Position = projection * view  * vPosition;\n\n#endif// lighting\n\n#ifdef shadow\n\n//  gl_Position =vec4(vShadowCoord, 1.0);\n\n#endif// shadow\n}\n"; // eslint-disable-line

var frag$2 = "precision mediump float;\n#define GLSLIFY 1\nvarying vec4 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec3 vColor;\nvarying vec2 vUv;\nuniform float ambientLightAmount;\nuniform float diffuseLightAmount;\nuniform vec3 shadowDirection;\nuniform float pathicleWidth;\nuniform vec3 eye;\nvarying vec3 vScale;\n\nfloat edger(vec2 uv, vec3 boxScale, float edgeWidth, vec3 normal) {\n\n  float edgeXY =  smoothstep(0., edgeWidth, uv.x*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.z);\n  float edgeXZ =  smoothstep(0., edgeWidth, uv.y*boxScale.y) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.y);\n  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);\n\n  float edgeYX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);\n  float edgeYZ =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);\n  float edgeY = (1.-(edgeYX*edgeYZ))*abs(normal.y);\n\n  float edgeZX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);\n  float edgeZY =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);\n  float edgeZ = (1.-(edgeZX*edgeZY))*abs(normal.z);\n\n  return clamp(edgeX+edgeY, 0., 1.);\n}\n\n//\n//float edgerFeathered(vec2 uv, vec3 boxScale, float edgeWidth) {\n//\n//  float feather = .1;\n//\n//  float edgeXY =  smoothstep(edgeWidth, edgeWidth+feather, uv.x*boxScale.z) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.x)*boxScale.z);\n//  float edgeXZ =  smoothstep(edgeWidth, edgeWidth+feather, uv.y*boxScale.y) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.y)*boxScale.y);\n//  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);\n//\n//  return clamp(edgeX, 0., 1.);\n//}\n//\n//\n//float edgerHard(vec2 uv, vec3 boxScale, float edgeWidth) {\n//  float edgeXY =  step(edgeWidth*(1.+uv.x*boxScale.z), uv.x*boxScale.z) * step(edgeWidth, (1.-uv.x)*boxScale.z);\n//  float edgeXZ =  step(edgeWidth*(0.5+uv.x/2.), uv.y*boxScale.y) * step(edgeWidth*(0.5+uv.x/2.), (1.-uv.y)*boxScale.y);\n//  float edgeX = (1.-(edgeXZ))*abs(normal.x);\n//\n//  return clamp(edgeX, 0., 1.);\n//}\n\nfloat diffuse(vec3 lightDir, vec3 nrm)\n{\n  float diffAmt = max(0.0, dot(nrm, lightDir));\n  return diffAmt;\n}\nfloat specular(vec3 lightDir, vec3 viewDir, vec3 nrm, float shininess)\n{\n  vec3 halfVec = normalize(viewDir + lightDir);\n  float specAmt = max(0.0, dot(halfVec, nrm));\n  return pow(specAmt, shininess);\n}\n\nstruct DirectionalLight\n{\n  vec3 direction;\n  vec3 color;\n  float intensity;\n};\n#define NUM_DIR_LIGHTS 3\nDirectionalLight directionalLights[NUM_DIR_LIGHTS];\n\nvoid main () {\n\n  #ifdef lighting\n\n  if (vColor.r == vColor.g && vColor.r == vColor.b ) discard;\n  vec3 color = vColor;\n  gl_FragColor = vec4(vColor, 1.);\n\n  vec3 viewDir = normalize(eye - vPosition.xyz);\n  vec3 normal = normalize(vNormal);\n\n  directionalLights[0] = DirectionalLight(shadowDirection, vec3(1.), .5);\n  directionalLights[1] = DirectionalLight(shadowDirection+vec3(-1., 0., 1.), vec3(1.), .1);\n  directionalLights[2] = DirectionalLight(shadowDirection+vec3(1., 0., -1.), vec3(1.), .1);\n  vec3 edgedColor = vColor;\n  vec3 finalColor = ambientLightAmount * vColor;\n\n  for (int i = 0; i < NUM_DIR_LIGHTS; ++i)\n  {\n    DirectionalLight light = directionalLights[i];\n    vec3 sceneLight = mix(light.color, edgedColor.rgb + light.color * 0.5, 0.5);\n    float diffAmt = diffuse(light.direction, normal) * light.intensity;\n    float specAmt = specular(light.direction, viewDir, normal, 0.0) * light.intensity;\n\n    float shadow = 1.; //.9 * vColorCorrection;//clamp(vColorCorrection + abs(2.+v_position.y*5.), 0., 1.);\n    float specMask = .5*edger(vUv, vScale, 1. * .02, vNormalOrig);\n//    float specMask = edger(vUv, vScale, 1. * .1, vNormalOrig) * smoothstep(5., 2., length(vPosition-eye));\n    vec3 specCol = specMask * sceneLight * specAmt;\n    finalColor += shadow * vColor * diffAmt * light.color;\n    finalColor += shadow * specCol * sceneLight;\n  }\n\n  gl_FragColor =vec4(finalColor, 1.);\n  #endif\n\n}\n"; // eslint-disable-line

function estaGeometry() {
  const estaStart = primitiveCube(1, 1, 0.05);
  estaStart.positions = estaStart.positions.map(([x, y, z]) => [x, y, z - 1]);
  const estaEnd = primitiveCube(1, 1, 0.05);
  return mergeMeshes([estaStart, estaEnd])
}
function dipoleGeometry() {
  const geometryDipoleTop = primitiveCube(1, 0.25, 1);
  geometryDipoleTop.positions = geometryDipoleTop.positions.map(([x, y, z]) => [
    x,
    y + 0.4,
    z
  ]);
  const geometryDipoleBottom = primitiveCube(1, 0.25, 1);
  geometryDipoleBottom.positions = geometryDipoleBottom.positions.map(
    ([x, y, z]) => [x, y - 0.4, z]
  );
  return mergeMeshes([geometryDipoleTop, geometryDipoleBottom])
}
function quadrupoleGeometry() {
  const geometryDipoleTop = primitiveCube(0.75, 0.1, 1);
  geometryDipoleTop.positions = geometryDipoleTop.positions.map(([x, y, z]) => [
    x,
    y + 0.5,
    z
  ]);
  const geometryDipoleLeft = primitiveCube(0.1, 0.75, 1);
  geometryDipoleLeft.positions = geometryDipoleLeft.positions.map(
    ([x, y, z]) => [x - 0.5, y, z]
  );
  const geometryDipoleRight = primitiveCube(0.1, 0.75, 1);
  geometryDipoleRight.positions = geometryDipoleRight.positions.map(
    ([x, y, z]) => [x + 0.5, y, z]
  );
  const geometryDipoleBottom = primitiveCube(0.75, 0.1, 1);
  geometryDipoleBottom.positions = geometryDipoleBottom.positions.map(
    ([x, y, z]) => [x, y - 0.5, z]
  );
  return mergeMeshes([
    geometryDipoleTop,
    geometryDipoleBottom,
    geometryDipoleRight,
    geometryDipoleLeft
  ])
}
function drawLatticeCommands (regl, { model }, shadow) {
  const command = (type, mode) => {
    const geometry =
      type === LATTICE_ELEMENT_TYPES.ESTA
        ? estaGeometry()
        : type === LATTICE_ELEMENT_TYPES.QUAD
        ? quadrupoleGeometry()
        : dipoleGeometry();
    const blElements = model.lattice.beamline.filter((d) => d.type === type);
    const transformations = model.lattice.transformations.filter(
      (d) => d.type === type
    );
    return regl({
      depth: {
        enable: true
      },
      blend: {
        enable: false,
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
        color: [0, 0, 0, 1]
      },
      cull: {
        enable: true,
        face: 'back'
      },
      elements: geometry.cells,
      instances: blElements.length,
      attributes: {
        aPosition: geometry.positions,
        aNormal: geometry.normals,
        aUV: geometry.uvs,
        aColor: {
          buffer: regl.buffer(blElements.map((d) => d.color)),
          divisor: 1
        },
        aTranslation: {
          buffer: regl.buffer(transformations.map((t) => t.translation)),
          divisor: 1
        },
        aPhi: {
          buffer: regl.buffer(transformations.map((t) => -t.phi)),
          divisor: 1
        },
        aTheta: {
          buffer: regl.buffer(transformations.map((t) => -t.theta)),
          divisor: 1
        },
        aScale: {
          buffer: regl.buffer(transformations.map((t) => t.scale)),
          divisor: 1
        }
      },
      vert: [`#define ${mode} 1`, vert$1].join('\n'),
      frag: [`#define ${mode} 1`, frag$2].join('\n'),
      uniforms: {
        ...shadow.uniforms
      }
    })
  };
  return {
    quadLighting: command(LATTICE_ELEMENT_TYPES.QUAD, 'lighting'),
    quadShadow: command(LATTICE_ELEMENT_TYPES.QUAD, 'shadow'),
    sbenLighting: command(LATTICE_ELEMENT_TYPES.SBEN, 'lighting'),
    sbenShadow: command(LATTICE_ELEMENT_TYPES.SBEN, 'shadow'),
    estaLighting: command(LATTICE_ELEMENT_TYPES.ESTA, 'lighting'),
    estaShadow: command(LATTICE_ELEMENT_TYPES.ESTA, 'shadow')
  }
}

var create_1$2 = create$2;
function create$2() {
    var out = new Float32Array(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out
}

var clone_1$1 = clone$2;
function clone$2(a) {
    var out = new Float32Array(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out
}

var fromValues_1$1 = fromValues$3;
function fromValues$3(x, y, z) {
    var out = new Float32Array(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out
}

var dot_1$1 = dot$3;
function dot$3(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
}

var angle_1 = angle;
var fromValues$2 = fromValues_1$1;
var normalize$3 = normalize_1$1;
var dot$2 = dot_1$1;
function angle(a, b) {
    var tempA = fromValues$2(a[0], a[1], a[2]);
    var tempB = fromValues$2(b[0], b[1], b[2]);
    normalize$3(tempA, tempA);
    normalize$3(tempB, tempB);
    var cosine = dot$2(tempA, tempB);
    if(cosine > 1.0){
        return 0
    } else {
        return Math.acos(cosine)
    }
}

var set_1$1 = set$2;
function set$2(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out
}

var exactEquals_1 = exactEquals;
function exactEquals(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2]
}

var subtract_1 = subtract;
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out
}

var sub = subtract_1;

var multiply_1$1 = multiply$1;
function multiply$1(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out
}

var mul = multiply_1$1;

var divide_1 = divide;
function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out
}

var div = divide_1;

var min_1 = min;
function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out
}

var max_1 = max;
function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out
}

var floor_1 = floor;
function floor(out, a) {
  out[0] = Math.floor(a[0]);
  out[1] = Math.floor(a[1]);
  out[2] = Math.floor(a[2]);
  return out
}

var ceil_1 = ceil;
function ceil(out, a) {
  out[0] = Math.ceil(a[0]);
  out[1] = Math.ceil(a[1]);
  out[2] = Math.ceil(a[2]);
  return out
}

var round_1 = round;
function round(out, a) {
  out[0] = Math.round(a[0]);
  out[1] = Math.round(a[1]);
  out[2] = Math.round(a[2]);
  return out
}

var scale_1$1 = scale$2;
function scale$2(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out
}

var distance_1 = distance;
function distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z)
}

var dist = distance_1;

var squaredDistance_1 = squaredDistance;
function squaredDistance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z
}

var sqrDist = squaredDistance_1;

var length_1$1 = length$2;
function length$2(a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z)
}

var len = length_1$1;

var squaredLength_1$1 = squaredLength$2;
function squaredLength$2(a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z
}

var sqrLen = squaredLength_1$1;

var negate_1 = negate;
function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out
}

var inverse_1 = inverse;
function inverse(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
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

var lerp_1$1 = lerp$2;
function lerp$2(out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out
}

var random_1 = random;
function random(out, scale) {
    scale = scale || 1.0;
    var r = Math.random() * 2.0 * Math.PI;
    var z = (Math.random() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;
    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out
}

var transformMat3_1 = transformMat3;
function transformMat3(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out
}

var transformQuat_1 = transformQuat;
function transformQuat(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out
}

var rotateZ_1$1 = rotateZ$1;
function rotateZ$1(out, a, b, c){
    var bx = b[0];
    var by = b[1];
    var px = a[0] - bx;
    var py = a[1] - by;
    var sc = Math.sin(c);
    var cc = Math.cos(c);
    out[0] = bx + px * cc - py * sc;
    out[1] = by + px * sc + py * cc;
    out[2] = a[2];
    return out
}

var forEach_1 = forEach;
var vec = create_1$2();
function forEach(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }
        if(!offset) {
            offset = 0;
        }
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }
        for(i = offset; i < l; i += stride) {
            vec[0] = a[i];
            vec[1] = a[i+1];
            vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i+1] = vec[1];
            a[i+2] = vec[2];
        }
        return a
}

var glVec3 = {
  EPSILON: epsilon
  , create: create_1$2
  , clone: clone_1$1
  , angle: angle_1
  , fromValues: fromValues_1$1
  , copy: copy_1$2
  , set: set_1$1
  , equals: equals_1
  , exactEquals: exactEquals_1
  , add: add_1$1
  , subtract: subtract_1
  , sub: sub
  , multiply: multiply_1$1
  , mul: mul
  , divide: divide_1
  , div: div
  , min: min_1
  , max: max_1
  , floor: floor_1
  , ceil: ceil_1
  , round: round_1
  , scale: scale_1$1
  , scaleAndAdd: scaleAndAdd_1
  , distance: distance_1
  , dist: dist
  , squaredDistance: squaredDistance_1
  , sqrDist: sqrDist
  , length: length_1$1
  , len: len
  , squaredLength: squaredLength_1$1
  , sqrLen: sqrLen
  , negate: negate_1
  , inverse: inverse_1
  , normalize: normalize_1$1
  , dot: dot_1$1
  , cross: cross_1
  , lerp: lerp_1$1
  , random: random_1
  , transformMat4: transformMat4_1
  , transformMat3: transformMat3_1
  , transformQuat: transformQuat_1
  , rotateX: rotateX_1$2
  , rotateY: rotateY_1$2
  , rotateZ: rotateZ_1$1
  , forEach: forEach_1
};

const SHADOW_MAP_SIZE = 1024;
class Shadow {
  constructor(regl, { position, size, near, far }) {
    this.SHADOW_MAP_SIZE = SHADOW_MAP_SIZE;
    this.regl = regl;
    this.size = size;
    this.fbo = regl.framebuffer({
      color: regl.texture({
        radius: SHADOW_MAP_SIZE
      }),
      depth: false
    });
    this.fboBlurred = regl.framebuffer({
      color: regl.texture({
        radius: SHADOW_MAP_SIZE
      }),
      depth: true
    });
    this.update(position, this.size, near, far);
  }
  update(position, size = this.size, near = this.near, far = this.far) {
    this.shadowDirection = [...position];
    glVec3.normalize(this.shadowDirection, position);
    this.shadowViewMatrix = glMat4.lookAt(
      [],
      position,
      [0.0, 0.0, 0.0],
      [0.0, 0.0, 1.0]
    );
    this.size = size;
    this.near = near;
    this.far = far;
    this.shadowProjectionMatrix = glMat4.ortho(
      [],
      -size,
      size,
      -size,
      size,
      this.near,
      this.far
    );
  }
  get uniforms() {
    return {
      shadowProjectionMatrix: () => this.shadowProjectionMatrix,
      shadowViewMatrix: () => this.shadowViewMatrix,
      shadowDirection: () => this.shadowDirection,
      minBias: () => 0.001,
      maxBias: () => 0.3
    }
  }
}

var add_1 = add$1;
function add$1 (out, a, b) {
  out[0] = a[0] + b[0];
  out[1] = a[1] + b[1];
  out[2] = a[2] + b[2];
  out[3] = a[3] + b[3];
  return out
}

var add = add_1;

var calculateW_1 = calculateW;
function calculateW (out, a) {
  var x = a[0], y = a[1], z = a[2];
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
  return out
}

var clone_1 = clone$1;
function clone$1 (a) {
  var out = new Float32Array(4);
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out
}

var clone = clone_1;

var conjugate_1 = conjugate;
function conjugate (out, a) {
  out[0] = -a[0];
  out[1] = -a[1];
  out[2] = -a[2];
  out[3] = a[3];
  return out
}

var copy_1 = copy$1;
function copy$1 (out, a) {
  out[0] = a[0];
  out[1] = a[1];
  out[2] = a[2];
  out[3] = a[3];
  return out
}

var copy = copy_1;

var create_1$1 = create$1;
function create$1 () {
  var out = new Float32Array(4);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out
}

var dot_1 = dot$1;
function dot$1 (a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
}

var dot = dot_1;

var fromMat3_1 = fromMat3$1;
function fromMat3$1 (out, m) {
  var fTrace = m[0] + m[4] + m[8];
  var fRoot;
  if (fTrace > 0.0) {
    fRoot = Math.sqrt(fTrace + 1.0);
    out[3] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[0] = (m[5] - m[7]) * fRoot;
    out[1] = (m[6] - m[2]) * fRoot;
    out[2] = (m[1] - m[3]) * fRoot;
  } else {
    var i = 0;
    if (m[4] > m[0]) {
      i = 1;
    }
    if (m[8] > m[i * 3 + i]) {
      i = 2;
    }
    var j = (i + 1) % 3;
    var k = (i + 2) % 3;
    fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
    out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
    out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
  }
  return out
}

var fromValues_1 = fromValues$1;
function fromValues$1 (x, y, z, w) {
  var out = new Float32Array(4);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out
}

var fromValues = fromValues_1;

var identity_1 = identity;
function identity (out) {
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out
}

var invert_1 = invert;
function invert (out, a) {
  var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
    dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
    invDot = dot ? 1.0 / dot : 0;
  out[0] = -a0 * invDot;
  out[1] = -a1 * invDot;
  out[2] = -a2 * invDot;
  out[3] = a3 * invDot;
  return out
}

var length_1 = length$1;
function length$1 (a) {
  var x = a[0],
    y = a[1],
    z = a[2],
    w = a[3];
  return Math.sqrt(x * x + y * y + z * z + w * w)
}

var length = length_1;

var lerp_1 = lerp$1;
function lerp$1 (out, a, b, t) {
  var ax = a[0],
    ay = a[1],
    az = a[2],
    aw = a[3];
  out[0] = ax + t * (b[0] - ax);
  out[1] = ay + t * (b[1] - ay);
  out[2] = az + t * (b[2] - az);
  out[3] = aw + t * (b[3] - aw);
  return out
}

var lerp = lerp_1;

var multiply_1 = multiply;
function multiply (out, a, b) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3],
    bx = b[0], by = b[1], bz = b[2], bw = b[3];
  out[0] = ax * bw + aw * bx + ay * bz - az * by;
  out[1] = ay * bw + aw * by + az * bx - ax * bz;
  out[2] = az * bw + aw * bz + ax * by - ay * bx;
  out[3] = aw * bw - ax * bx - ay * by - az * bz;
  return out
}

var normalize_1 = normalize$2;
function normalize$2 (out, a) {
  var x = a[0],
    y = a[1],
    z = a[2],
    w = a[3];
  var len = x * x + y * y + z * z + w * w;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
  }
  return out
}

var normalize$1 = normalize_1;

var rotateX_1 = rotateX;
function rotateX (out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3],
    bx = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + aw * bx;
  out[1] = ay * bw + az * bx;
  out[2] = az * bw - ay * bx;
  out[3] = aw * bw - ax * bx;
  return out
}

var rotateY_1 = rotateY;
function rotateY (out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3],
    by = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw - az * by;
  out[1] = ay * bw + aw * by;
  out[2] = az * bw + ax * by;
  out[3] = aw * bw - ay * by;
  return out
}

var rotateZ_1 = rotateZ;
function rotateZ (out, a, rad) {
  rad *= 0.5;
  var ax = a[0], ay = a[1], az = a[2], aw = a[3],
    bz = Math.sin(rad), bw = Math.cos(rad);
  out[0] = ax * bw + ay * bz;
  out[1] = ay * bw - ax * bz;
  out[2] = az * bw + aw * bz;
  out[3] = aw * bw - az * bz;
  return out
}

var setAxisAngle_1 = setAxisAngle;
function setAxisAngle (out, axis, rad) {
  rad = rad * 0.5;
  var s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out
}

var vecDot = dot_1$1;
var vecCross = cross_1;
var vecLength = length_1$1;
var vecNormalize = normalize_1$1;
var quatNormalize = normalize$1;
var quatAxisAngle = setAxisAngle_1;
var rotationTo_1 = rotationTo;
var tmpvec3 = [0, 0, 0];
var xUnitVec3 = [1, 0, 0];
var yUnitVec3 = [0, 1, 0];
function rotationTo (out, a, b) {
  var dot = vecDot(a, b);
  if (dot < -0.999999) {
    vecCross(tmpvec3, xUnitVec3, a);
    if (vecLength(tmpvec3) < 0.000001) {
      vecCross(tmpvec3, yUnitVec3, a);
    }
    vecNormalize(tmpvec3, tmpvec3);
    quatAxisAngle(out, tmpvec3, Math.PI);
    return out
  } else if (dot > 0.999999) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out
  } else {
    vecCross(tmpvec3, a, b);
    out[0] = tmpvec3[0];
    out[1] = tmpvec3[1];
    out[2] = tmpvec3[2];
    out[3] = 1 + dot;
    return quatNormalize(out, out)
  }
}

var scale_1 = scale$1;
function scale$1 (out, a, b) {
  out[0] = a[0] * b;
  out[1] = a[1] * b;
  out[2] = a[2] * b;
  out[3] = a[3] * b;
  return out
}

var scale = scale_1;

var set_1 = set$1;
function set$1 (out, x, y, z, w) {
  out[0] = x;
  out[1] = y;
  out[2] = z;
  out[3] = w;
  return out
}

var set = set_1;

var create_1 = create;
function create() {
  var out = new Float32Array(9);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out
}

var mat3create = create_1;
var fromMat3 = fromMat3_1;
var normalize = normalize$1;
var setAxes_1 = setAxes;
var matr = mat3create();
function setAxes (out, view, right, up) {
  matr[0] = right[0];
  matr[3] = right[1];
  matr[6] = right[2];
  matr[1] = up[0];
  matr[4] = up[1];
  matr[7] = up[2];
  matr[2] = -view[0];
  matr[5] = -view[1];
  matr[8] = -view[2];
  return normalize(out, fromMat3(out, matr))
}

var slerp_1 = slerp$1;
function slerp$1 (out, a, b, t) {
  var ax = a[0], ay = a[1], az = a[2], aw = a[3],
    bx = b[0], by = b[1], bz = b[2], bw = b[3];
  var omega, cosom, sinom, scale0, scale1;
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  if (cosom < 0.0) {
    cosom = -cosom;
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
  }
  if ((1.0 - cosom) > 0.000001) {
    omega = Math.acos(cosom);
    sinom = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    scale0 = 1.0 - t;
    scale1 = t;
  }
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;
  return out
}

var slerp = slerp_1;
var sqlerp_1 = sqlerp;
var temp1 = [0, 0, 0, 1];
var temp2 = [0, 0, 0, 1];
function sqlerp (out, a, b, c, d, t) {
  slerp(temp1, a, d, t);
  slerp(temp2, b, c, t);
  slerp(out, temp1, temp2, 2 * t * (1 - t));
  return out
}

var squaredLength_1 = squaredLength$1;
function squaredLength$1 (a) {
  var x = a[0],
    y = a[1],
    z = a[2],
    w = a[3];
  return x * x + y * y + z * z + w * w
}

var squaredLength = squaredLength_1;

var glQuat = {
  add: add,
  calculateW: calculateW_1,
  clone: clone,
  conjugate: conjugate_1,
  copy: copy,
  create: create_1$1,
  dot: dot,
  fromMat3: fromMat3_1,
  fromValues: fromValues,
  identity: identity_1,
  invert: invert_1,
  length: length,
  lerp: lerp,
  multiply: multiply_1,
  normalize: normalize$1,
  rotateX: rotateX_1,
  rotateY: rotateY_1,
  rotateZ: rotateZ_1,
  rotationTo: rotationTo_1,
  scale: scale,
  set: set,
  setAxes: setAxes_1,
  setAxisAngle: setAxisAngle_1,
  slerp: slerp_1,
  sqlerp: sqlerp_1,
  squaredLength: squaredLength
};

function drawAxesCommand(regl, d) {
  const model = new Float32Array(16);
  return regl({
    frag: `
      precision highp float;
      uniform vec3 axis;
      void main () {
        gl_FragColor = vec4(axis,1);
      }
    `,
    vert: `
      precision highp float;
      uniform mat4 projection, view, model;
      uniform vec3 eye, center;
      attribute vec3 position;
      void main () {
        gl_Position = projection * view * model * vec4(position,1);
      }
    `,
    uniforms: {
      axis: regl.prop('axis'),
      model: function (context, props) {
        glMat4.identity(model);
        let angle = 0;
        glMat4.rotate(model, model, angle, props.axis);
        const tmpm = new Float32Array(16);
        let q = [0, 0, 0, 0];
        glQuat.rotationTo(q, [0, 1, 0], props.axis);
        glMat4.fromQuat(tmpm, q);
        glMat4.multiply(model, model, tmpm);
        return model
      }
    },
    attributes: {
      position: [
        [0, 0, 0],
        [0, d - 0.1, 0],
        [+0.05, d - 0.2, 0],
        [0, d, 0],
        [-0.05, d - 0.2, 0],
        [0, d - 0.1, 0]
      ],
      axis: regl.prop('axis')
    },
    depth: {
      enable: false
    },
    count: 6,
    primitive: 'line strip'
  })
}

var frag$1 = "precision highp float;\n#define GLSLIFY 1\n\n// Based on distance functions found at:\n// http://iquilezles.org/www/articles/distfunctions/distfunctions.htm\nfloat sdSquare(vec2 point, float width) {\n  vec2 d = abs(point) - width;\n  return min(max(d.x,d.y),0.0) + length(max(d,0.0));\n}\n\nfloat vignette(vec2 uv, vec2 size, float roundness, float smoothness) {\n  // Center UVs\n  uv -= 0.5;\n\n  // Shift UVs based on the larger of width or height\n  float minWidth = min(size.x, size.y);\n  uv.x = sign(uv.x) * clamp(abs(uv.x) - abs(minWidth - size.x), 0.0, 1.0);\n  uv.y = sign(uv.y) * clamp(abs(uv.y) - abs(minWidth - size.y), 0.0, 1.0);\n\n  // Signed distance calculation\n  float boxSize = minWidth * (1.0 - roundness);\n  float dist = sdSquare(uv, boxSize) - (minWidth * roundness);\n\n  return 1. - smoothstep(0.0, smoothness, dist);\n}\n\nuniform vec2 screenSize;\nuniform vec2 size;\nuniform float roundness;\nuniform float smoothness;\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / screenSize;\n  float v = vignette(uv, size, roundness, smoothness);\n  gl_FragColor = vec4(vec3(v), 1.-2.*v);\n}\n"; // eslint-disable-line

function drawVignetteCommandBuilder (regl) {
  const command = () => {
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
        color: [0, 0, 0, 1]
      },
      frag: frag$1,
      vert: `
    precision mediump float;
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0, 1);
    }`,
      attributes: {
        position: regl.buffer([-4, -4, 4, -4, 0, 4])
      },
      uniforms: {
        color: [1, 1, 0, 1],
        screenSize: ({ viewportWidth, viewportHeight }) => [
          viewportWidth,
          viewportHeight
        ],
        size: [0.1, 0.1],
        roundness: 0.9,
        smoothness: 0.9
      },
      count: 3,
      depth: {
        enable: true
      }
    })
  };
  return {
    lighting: command()
  }
}

class BoxesViewSimple {
  constructor(regl, { runner, variables, model, view, debug }) {
    this.regl = regl;
    this.performanceLogger = new PerformanceLogger(debug.logPerformance);
    this.performanceLogger.start('BoxesViewSimple()');
    this.lightPosition = view.lights[0].position;
    this.config = view;
    this.shadow = new Shadow(regl, this.config.lights[0]);
    this.setParams = regl({
      uniforms: {
        stageGrid_size: this.config.stageGrid.size / 2,
        viewRange: regl.prop('viewRange') || [0, 1],
        ambientLightAmount: this.config.ambientLightAmount,
        diffuseLightAmount: this.config.diffuseLightAmount
      }
    });
    this.drawModel = drawModelCommands(
      regl,
      {
        runner,
        variables,
        view
      },
      this.shadow
    );
    this.drawStage = drawStageCommands(regl, view, this.shadow);
    this.drawLattice = drawLatticeCommands(
      regl,
      {
        runner,
        model,
        view
      },
      this.shadow
    );
    this.drawFields = drawFieldsCommands(regl, { model, view }, this.shadow);
    this.drawAxis = drawAxesCommand(regl, 0.5);
    this.drawVignette = drawVignetteCommandBuilder(regl);
  }
  drawDiffuse(props) {
    this.performanceLogger.start(
      `BoxesViewSimple.drawDiffuse (t=${props.tick})`
    );
    this.regl.clear({
      color: [1, 1, 1, 1],
      depth: 1
    });
    this.setParams({}, () => {
      this.regl.clear({
        color: [1, 1, 1, 1],
        depth: 1,
        framebuffer: this.shadow.fbo
      });
      this.config.isShadowEnabled && this.drawModel.shadow(props);
      this.config.showAxes &&
        this.drawAxis([
          { axis: [1, 0, 0] },
          { axis: [0, 1, 0] },
          { axis: [0, 0, 1] }
        ]);
      this.config.isStageVisible && this.drawStage.lighting(props);
      this.config.isLatticeVisible && this.drawLattice.estaLighting(props);
      this.config.isLatticeVisible && this.drawLattice.quadLighting(props);
      this.config.isLatticeVisible && this.drawLattice.sbenLighting(props);
      this.drawModel.lighting(props);
      this.config.showVignette && this.drawVignette.lighting(props);
    });
    this.performanceLogger.stop('BoxesViewSimple.drawDiffuse');
  }
  destroy() {}
}

function getcolorType(glContext) {
  if (
    glContext.getExtension('WEBGL_color_buffer_float') &&
    glContext.getExtension('OES_texture_float')
  ) {
    return 'float'
  }
  if (
    glContext.getExtension('WEBGL_color_buffer_float') &&
    glContext.getExtension('OES_texture_half_float')
  ) {
    return 'half float'
  }
  return 'uint8'
}
function checkSupport(regl) {
  const support = {};
  try {
    const canvas = document.createElement('canvas');
    if (
      !!window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    ) {
      const glContext =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      support.canRenderToFloatTexture = regl.hasExtension(
        'WEBGL_color_buffer_float'
      );
      support.colorType = getcolorType(glContext);
      support.precision = {
        VERTEX_SHADER: {
          LOW_FLOAT: glContext.getShaderPrecisionFormat(
            glContext.VERTEX_SHADER,
            glContext.LOW_FLOAT
          ),
          MEDIUM_FLOAT: glContext.getShaderPrecisionFormat(
            glContext.VERTEX_SHADER,
            glContext.MEDIUM_FLOAT
          ),
          HIGH_FLOAT: glContext.getShaderPrecisionFormat(
            glContext.VERTEX_SHADER,
            glContext.HIGH_FLOAT
          ),
          LOW_INT: glContext.getShaderPrecisionFormat(
            glContext.VERTEX_SHADER,
            glContext.LOW_INT
          ),
          MEDIUM_INT: glContext.getShaderPrecisionFormat(
            glContext.VERTEX_SHADER,
            glContext.MEDIUM_INT
          ),
          HIGH_INT: glContext.getShaderPrecisionFormat(
            glContext.VERTEX_SHADER,
            glContext.HIGH_INT
          )
        },
        FRAGMENT_SHADER: {
          LOW_FLOAT: glContext.getShaderPrecisionFormat(
            glContext.FRAGMENT_SHADER,
            glContext.LOW_FLOAT
          ),
          MEDIUM_FLOAT: glContext.getShaderPrecisionFormat(
            glContext.FRAGMENT_SHADER,
            glContext.MEDIUM_FLOAT
          ),
          HIGH_FLOAT: glContext.getShaderPrecisionFormat(
            glContext.FRAGMENT_SHADER,
            glContext.HIGH_FLOAT
          ),
          LOW_INT: glContext.getShaderPrecisionFormat(
            glContext.FRAGMENT_SHADER,
            glContext.LOW_INT
          ),
          MEDIUM_INT: glContext.getShaderPrecisionFormat(
            glContext.FRAGMENT_SHADER,
            glContext.MEDIUM_INT
          ),
          HIGH_INT: glContext.getShaderPrecisionFormat(
            glContext.FRAGMENT_SHADER,
            glContext.HIGH_INT
          )
        }
      };
      return support
    }
  } catch (e) {
    throw e
  }
}

var frag = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D texture;\nuniform float decode;\nvarying vec2 uv;\nfloat unpackRGBA (vec4 v) {\n  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));\n}\nvoid main () {\n  vec4 texel = texture2D(texture, uv);\n  gl_FragColor = (decode == 0.) ? texel :\n    (decode == 1.) ?  vec4(unpackRGBA(texel),0.,0.,1.)\n    : vec4(texel.r,texel.r,texel.r,1.);\n}\n\n"; // eslint-disable-line

var vert = "precision mediump float;\n#define GLSLIFY 1\nattribute vec2 position;\nvarying vec2 uv;\nvoid main () {\n  uv = position;\n  gl_Position = vec4(1.0 - 2.0 * position, 0, 1);\n}\n"; // eslint-disable-line

const NONE = 0;
const UNPACK_RGBA = 1;
const R = 2;
const DECODE = {
  NONE,
  UNPACK_RGBA,
  R
};
function drawTextureCommand(regl) {
  return regl({
    vert,
    frag,
    attributes: {
      position: [-4, -4, 4, -4, 0, 4]
    },
    uniforms: {
      texture: (_, { texture }) => {
        return texture
      },
      decode: (_, { decode = DECODE.NONE }) => decode
    },
    viewport: {
      x: (_, props) => props.x0 || 50,
      y: (_, props) => props.y0 || 50,
      width: (_, props) => props.texture.width * (props.scale || 1),
      height: (_, props) => props.texture.height * (props.scale || 1)
    },
    depth: {
      enable: false
    },
    count: 3
  })
}

class ReglSimulatorInstance {
  constructor({ canvas, configuration }) {
    this.configuration = configuration;
    this.isDirty = true;
    window.performanceLogger = null;
    this.performanceLogger = new PerformanceLogger();
    this.regl = createREGL$1({
      canvas,
      profile: this.configuration.debug.profile,
      attributes: {
        preserveDrawingBuffer: true,
        antialiasing: true
      },
      extensions: [
        'angle_instanced_arrays',
        'oes_texture_float',
        'OES_standard_derivatives',
        'OES_texture_half_float',
        'WEBGL_depth_texture',
        'EXT_color_buffer_half_float'
      ],
      optionalExtensions: [
        'EXT_disjoint_timer_query',
        'WEBGL_color_buffer_float'
      ],
      onDone: (err, regl) => {
        if (err) return console.error(err)
        try {
          window.pathicles = this;
          this.regl = regl;
          this.support = checkSupport(regl);
          this.performanceLogger.start('init');
          this.loadConfig(this.configuration);
        } catch (e) {
          console.error(e);
        }
      }
    });
  }
  resize() {
    this.regl.poll();
    this.camera.resize(
      this.regl._gl.canvas.clientWidth / this.regl._gl.canvas.clientHeight
    );
    this.isDirty = true;
  }
  destroy() {
    this.regl.destroy();
  }
  loadConfig(config) {
    this.stop(this.regl);
    this.configuration = config;
    console.log({ support: this.support });
    if (!this.support.canRenderToFloatTexture) {
      console.warn('canRenderToFloatTexture = false');
      this.configuration.runner.pusher = 'js';
    }
    this.init(this.regl);
    this.run(this.regl);
    this.isDirty = true;
  }
  toggleShowTextures() {
    this.configuration.debug.showTextures =
      !this.configuration.debug.showTextures;
    this.isDirty = true;
  }
  init(regl) {
    this.camera = freeCameraFactory(regl, {
      ...this.configuration.view.camera,
      aspectRatio: regl._gl.canvas.clientWidth / regl._gl.canvas.clientHeight
    });
    this.drawTexture = drawTextureCommand(regl);
    this.simulation = new Simulation(regl, this.configuration, this.support);
    this.runner = new SimulationRunner(
      this.simulation,
      this.configuration.runner,
      this.configuration.debug
    );
    this.view = new BoxesViewSimple(regl, {
      variables: this.simulation.variables,
      runner: this.simulation.runner,
      model: this.simulation.model,
      view: this.configuration.view,
      debug: this.configuration.debug
    });
  }
  run(regl) {
    this.loop = regl.frame(({ viewportHeight, tick }) => {
      const { changed } = this.runner.next();
      this.camera.doAutorotate();
      this.camera.tick();
      if (tick < 3 || changed || this.isDirty || this.camera.state.dirty) {
        this.camera.setCameraUniforms(
          {
            ...this.camera
          },
          () => {
            this.view.drawDiffuse({
              tick,
              colorCorrections: this.simulation.variables.colorCorrections,
              particleColorsAndTypes:
                this.simulation.variables.particleColorsAndTypes,
              position: this.simulation.variables.position.value()
            });
            if (this.configuration.debug.showTextures) {
              this.drawTexture({
                decode: this.configuration.runner.packFloat2UInt8
                  ? DECODE.UNPACK_RGBA
                  : DECODE.R,
                y0:
                  viewportHeight -
                  this.simulation.variables.velocity.height *
                    this.configuration.debug.showTextureScale,
                texture: this.simulation.variables.position.value(),
                scale: 1 * this.configuration.debug.showTextureScale
              });
              this.drawTexture({
                decode: this.configuration.runner.packFloat2UInt8
                  ? DECODE.UNPACK_RGBA
                  : DECODE.R,
                texture: this.simulation.variables.velocity.value(),
                y0:
                  viewportHeight -
                  50 -
                  2 *
                    this.simulation.variables.velocity.height *
                    this.configuration.debug.showTextureScale,
                scale: this.configuration.debug.showTextureScale
              });
            }
          }
        );
      }
      this.performanceLogger.stop();
      this.isDirty = false;
    });
  }
  stop() {
    if (this.loop) this.loop.cancel();
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

function sequencer (regl, scenes, stateVars, onStateChange) {
  let t = 0;
  scenes.forEach((scene, s) => {
    scene.loaded = false;
    const numberType = 'float';
    const particleCount = 64;
    const snapshotCount = 128;
    scene.variables = {
      snapshotCount,
      particleCount,
      iterations: 127,
      pingPong: 0,
      segments: particleCount * (snapshotCount - 1),
      iteration: snapshotCount,
      littleEndian: isLittleEndian()
    };
    scene._s = s;
    scene._t0 = t;
    scene._t0_normalized = t / scenes.duration;
    scene._t1 = t + scene.duration;
    scene._t1_normalized = scene._t1 / scenes.duration;
    t = scene._t1;
    scene.data().then(({ data, name, configuration }) => {
      scene.preset = name;
      scene.configuration = configuration;
      scene.runner = scene.configuration.runner;
      scene.model = scene.configuration.model;
      scene.variables.position = {
        buffers: [
          variableTexture(
            regl,
            {
              width: scene.runner.snapshotCount * 4,
              height: scene.model.emitter.particleCount
            },
            numberType,
            new Float32Array(data.position.map((p) => [p, 0, 0, 0]).flat())
          )
        ]
      };
      scene.variables.particleColorsAndTypes = regl.texture({
        data: data.particleTypes
          .map((p) => PARTICLE_TYPES[p].color.concat(p))
          .flat(),
        shape: [particleCount, 1, 4]
      });
      scene.variables.colorCorrections = regl.texture({
        data: data.colorCorrections.map((c) => [c, 0, 0, 0]).flat(),
        shape: [particleCount, 1, 4],
        type: 'float'
      });
      scene.model = {
        lattice: new Lattice(scene.model.lattice),
        boundingBoxSize: configuration.model.boundingBoxSize,
        interactions: {
          particleInteraction:
            configuration.model.interactions.particleInteraction,
          electricField: configuration.model.interactions.electricField,
          magneticField: configuration.model.interactions.magneticField
        }
      };
      scene.cameraBSplines = {
        distance: (x) => bSpline(x, 2, scene.cameraSploints.distance),
        phi: (x) => bSpline(x, 2, scene.cameraSploints.phi),
        theta: (x) => bSpline(x, 2, scene.cameraSploints.theta),
        centerX: (x) => bSpline(x, 2, scene.cameraSploints.centerX),
        centerY: (x) => bSpline(x, 2, scene.cameraSploints.centerY),
        centerZ: (x) => bSpline(x, 2, scene.cameraSploints.centerZ)
      };
      scene.loaded = true;
    });
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
        (scene) => scene._t0_normalized <= t && t <= scene._t1_normalized
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
    state.sceneProgress =
      ((t - state.scene._t0_normalized) * scenes.duration) /
      state.scene.duration;
    state.viewRange = [state.sceneProgress - 0.5, state.sceneProgress];
    return Object.keys(changed).length > 0
  }
  let currentPosition = 0;
  computeState(currentPosition);
  const self = {
    setPosition: function (t) {
      currentPosition = t;
      const hasChanges = computeState(t);
      if (hasChanges) {
        onStateChange && onStateChange(state, changed);
      }
      return self
    },
    getPosition: function () {
      return currentPosition
    },
    getState: function () {
      return state
    }
  };
  return self
}

var regl_min = {exports: {}};

(function (module, exports) {
(function(Z,ka){module.exports=ka();})(commonjsGlobal,function(){function Z(a,b){this.id=Db++;this.type=a;this.data=b;}function ka(a){if(0===a.length)return [];var b=a.charAt(0),c=a.charAt(a.length-1);if(1<a.length&&b===c&&('"'===b||"'"===b))return ['"'+a.substr(1,a.length-2).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'];if(b=/\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(a))return ka(a.substr(0,
b.index)).concat(ka(b[1])).concat(ka(a.substr(b.index+b[0].length)));b=a.split(".");if(1===b.length)return ['"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'];a=[];for(c=0;c<b.length;++c)a=a.concat(ka(b[c]));return a}function cb(a){return "["+ka(a).join("][")+"]"}function db(a,b){if("function"===typeof a)return new Z(0,a);if("number"===typeof a||"boolean"===typeof a)return new Z(5,a);if(Array.isArray(a))return new Z(6,a.map(function(a,e){return db(a)}));if(a instanceof Z)return a}function Eb(){var a=
{"":0},b=[""];return {id:function(c){var e=a[c];if(e)return e;e=a[c]=b.length;b.push(c);return e},str:function(a){return b[a]}}}function Fb(a,b,c){function e(){var b=window.innerWidth,e=window.innerHeight;a!==document.body&&(e=f.getBoundingClientRect(),b=e.right-e.left,e=e.bottom-e.top);f.width=c*b;f.height=c*e;}var f=document.createElement("canvas");L(f.style,{border:0,margin:0,padding:0,top:0,left:0,width:"100%",height:"100%"});a.appendChild(f);a===document.body&&(f.style.position="absolute",L(a.style,
{margin:0,padding:0}));var d;a!==document.body&&"function"===typeof ResizeObserver?(d=new ResizeObserver(function(){setTimeout(e);}),d.observe(a)):window.addEventListener("resize",e,!1);e();return {canvas:f,onDestroy:function(){d?d.disconnect():window.removeEventListener("resize",e);a.removeChild(f);}}}function Gb(a,b){function c(c){try{return a.getContext(c,b)}catch(f){return null}}return c("webgl")||c("experimental-webgl")||c("webgl-experimental")}function eb(a){return "string"===typeof a?a.split():
a}function fb(a){return "string"===typeof a?document.querySelector(a):a}function Hb(a){var b=a||{},c,e,f,d;a={};var q=[],n=[],v="undefined"===typeof window?1:window.devicePixelRatio,k=!1,u=function(a){},m=function(){};"string"===typeof b?c=document.querySelector(b):"object"===typeof b&&("string"===typeof b.nodeName&&"function"===typeof b.appendChild&&"function"===typeof b.getBoundingClientRect?c=b:"function"===typeof b.drawArrays||"function"===typeof b.drawElements?(d=b,f=d.canvas):("gl"in b?d=b.gl:
"canvas"in b?f=fb(b.canvas):"container"in b&&(e=fb(b.container)),"attributes"in b&&(a=b.attributes),"extensions"in b&&(q=eb(b.extensions)),"optionalExtensions"in b&&(n=eb(b.optionalExtensions)),"onDone"in b&&(u=b.onDone),"profile"in b&&(k=!!b.profile),"pixelRatio"in b&&(v=+b.pixelRatio)));c&&("canvas"===c.nodeName.toLowerCase()?f=c:e=c);if(!d){if(!f){c=Fb(e||document.body,u,v);if(!c)return null;f=c.canvas;m=c.onDestroy;}void 0===a.premultipliedAlpha&&(a.premultipliedAlpha=!0);d=Gb(f,a);}return d?{gl:d,
canvas:f,container:e,extensions:q,optionalExtensions:n,pixelRatio:v,profile:k,onDone:u,onDestroy:m}:(m(),u("webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org"),null)}function Ib(a,b){function c(b){b=b.toLowerCase();var c;try{c=e[b]=a.getExtension(b);}catch(f){}return !!c}for(var e={},f=0;f<b.extensions.length;++f){var d=b.extensions[f];if(!c(d))return b.onDestroy(),b.onDone('"'+d+'" extension is not supported by the current WebGL context, try upgrading your system or a different browser'),
null}b.optionalExtensions.forEach(c);return {extensions:e,restore:function(){Object.keys(e).forEach(function(a){if(e[a]&&!c(a))throw Error("(regl): error restoring extension "+a);});}}}function R(a,b){for(var c=Array(a),e=0;e<a;++e)c[e]=b(e);return c}function gb(a){var b,c;b=(65535<a)<<4;a>>>=b;c=(255<a)<<3;a>>>=c;b|=c;c=(15<a)<<2;a>>>=c;b|=c;c=(3<a)<<1;return b|c|a>>>c>>1}function hb(){function a(a){a:{for(var b=16;268435456>=b;b*=16)if(a<=b){a=b;break a}a=0;}b=c[gb(a)>>2];return 0<b.length?b.pop():
new ArrayBuffer(a)}function b(a){c[gb(a.byteLength)>>2].push(a);}var c=R(8,function(){return []});return {alloc:a,free:b,allocType:function(b,c){var d=null;switch(b){case 5120:d=new Int8Array(a(c),0,c);break;case 5121:d=new Uint8Array(a(c),0,c);break;case 5122:d=new Int16Array(a(2*c),0,c);break;case 5123:d=new Uint16Array(a(2*c),0,c);break;case 5124:d=new Int32Array(a(4*c),0,c);break;case 5125:d=new Uint32Array(a(4*c),0,c);break;case 5126:d=new Float32Array(a(4*c),0,c);break;default:return null}return d.length!==
c?d.subarray(0,c):d},freeType:function(a){b(a.buffer);}}}function la(a){return !!a&&"object"===typeof a&&Array.isArray(a.shape)&&Array.isArray(a.stride)&&"number"===typeof a.offset&&a.shape.length===a.stride.length&&(Array.isArray(a.data)||O(a.data))}function ib(a,b,c,e,f,d){for(var q=0;q<b;++q)for(var n=a[q],v=0;v<c;++v)for(var k=n[v],u=0;u<e;++u)f[d++]=k[u];}function jb(a,b,c,e,f){for(var d=1,q=c+1;q<b.length;++q)d*=b[q];var n=b[c];if(4===b.length-c){var v=b[c+1],k=b[c+2];b=b[c+3];for(q=0;q<n;++q)ib(a[q],
v,k,b,e,f),f+=d;}else for(q=0;q<n;++q)jb(a[q],b,c+1,e,f),f+=d;}function Ha(a){return Ia[Object.prototype.toString.call(a)]|0}function kb(a,b){for(var c=0;c<b.length;++c)a[c]=b[c];}function lb(a,b,c,e,f,d,q){for(var n=0,v=0;v<c;++v)for(var k=0;k<e;++k)a[n++]=b[f*v+d*k+q];}function Jb(a,b,c,e){function f(b){this.id=v++;this.buffer=a.createBuffer();this.type=b;this.usage=35044;this.byteLength=0;this.dimension=1;this.dtype=5121;this.persistentData=null;c.profile&&(this.stats={size:0});}function d(b,c,l){b.byteLength=
c.byteLength;a.bufferData(b.type,c,l);}function q(a,b,c,g,h,r){a.usage=c;if(Array.isArray(b)){if(a.dtype=g||5126,0<b.length)if(Array.isArray(b[0])){h=mb(b);for(var p=g=1;p<h.length;++p)g*=h[p];a.dimension=g;b=Ua(b,h,a.dtype);d(a,b,c);r?a.persistentData=b:G.freeType(b);}else "number"===typeof b[0]?(a.dimension=h,h=G.allocType(a.dtype,b.length),kb(h,b),d(a,h,c),r?a.persistentData=h:G.freeType(h)):O(b[0])&&(a.dimension=b[0].length,a.dtype=g||Ha(b[0])||5126,b=Ua(b,[b.length,b[0].length],a.dtype),d(a,b,c),
r?a.persistentData=b:G.freeType(b));}else if(O(b))a.dtype=g||Ha(b),a.dimension=h,d(a,b,c),r&&(a.persistentData=new Uint8Array(new Uint8Array(b.buffer)));else if(la(b)){h=b.shape;var e=b.stride,p=b.offset,t=0,ma=0,f=0,k=0;1===h.length?(t=h[0],ma=1,f=e[0],k=0):2===h.length&&(t=h[0],ma=h[1],f=e[0],k=e[1]);a.dtype=g||Ha(b.data)||5126;a.dimension=ma;h=G.allocType(a.dtype,t*ma);lb(h,b.data,t,ma,f,k,p);d(a,h,c);r?a.persistentData=h:G.freeType(h);}else b instanceof ArrayBuffer&&(a.dtype=5121,a.dimension=h,
d(a,b,c),r&&(a.persistentData=new Uint8Array(new Uint8Array(b))));}function n(c){b.bufferCount--;e(c);a.deleteBuffer(c.buffer);c.buffer=null;delete k[c.id];}var v=0,k={};f.prototype.bind=function(){a.bindBuffer(this.type,this.buffer);};f.prototype.destroy=function(){n(this);};var u=[];c.profile&&(b.getTotalBufferSize=function(){var a=0;Object.keys(k).forEach(function(b){a+=k[b].stats.size;});return a});return {create:function(m,e,d,g){function h(b){var e=35044,t=null,d=0,m=0,f=1;Array.isArray(b)||O(b)||
la(b)||b instanceof ArrayBuffer?t=b:"number"===typeof b?d=b|0:b&&("data"in b&&(t=b.data),"usage"in b&&(e=nb[b.usage]),"type"in b&&(m=Ja[b.type]),"dimension"in b&&(f=b.dimension|0),"length"in b&&(d=b.length|0));r.bind();t?q(r,t,e,m,f,g):(d&&a.bufferData(r.type,d,e),r.dtype=m||5121,r.usage=e,r.dimension=f,r.byteLength=d);c.profile&&(r.stats.size=r.byteLength*na[r.dtype]);return h}b.bufferCount++;var r=new f(e);k[r.id]=r;d||h(m);h._reglType="buffer";h._buffer=r;h.subdata=function(b,c){var t=(c||0)|0,
d;r.bind();if(O(b)||b instanceof ArrayBuffer)a.bufferSubData(r.type,t,b);else if(Array.isArray(b)){if(0<b.length)if("number"===typeof b[0]){var e=G.allocType(r.dtype,b.length);kb(e,b);a.bufferSubData(r.type,t,e);G.freeType(e);}else if(Array.isArray(b[0])||O(b[0]))d=mb(b),e=Ua(b,d,r.dtype),a.bufferSubData(r.type,t,e),G.freeType(e);}else if(la(b)){d=b.shape;var m=b.stride,g=e=0,f=0,y=0;1===d.length?(e=d[0],g=1,f=m[0],y=0):2===d.length&&(e=d[0],g=d[1],f=m[0],y=m[1]);d=Array.isArray(b.data)?r.dtype:Ha(b.data);
d=G.allocType(d,e*g);lb(d,b.data,e,g,f,y,b.offset);a.bufferSubData(r.type,t,d);G.freeType(d);}return h};c.profile&&(h.stats=r.stats);h.destroy=function(){n(r);};return h},createStream:function(a,b){var c=u.pop();c||(c=new f(a));c.bind();q(c,b,35040,0,1,!1);return c},destroyStream:function(a){u.push(a);},clear:function(){I(k).forEach(n);u.forEach(n);},getBuffer:function(a){return a&&a._buffer instanceof f?a._buffer:null},restore:function(){I(k).forEach(function(b){b.buffer=a.createBuffer();a.bindBuffer(b.type,
b.buffer);a.bufferData(b.type,b.persistentData||b.byteLength,b.usage);});},_initBuffer:q}}function Kb(a,b,c,e){function f(a){this.id=v++;n[this.id]=this;this.buffer=a;this.primType=4;this.type=this.vertCount=0;}function d(d,e,f,g,h,r,p){d.buffer.bind();var k;e?((k=p)||O(e)&&(!la(e)||O(e.data))||(k=b.oes_element_index_uint?5125:5123),c._initBuffer(d.buffer,e,f,k,3)):(a.bufferData(34963,r,f),d.buffer.dtype=k||5121,d.buffer.usage=f,d.buffer.dimension=3,d.buffer.byteLength=r);k=p;if(!p){switch(d.buffer.dtype){case 5121:case 5120:k=
5121;break;case 5123:case 5122:k=5123;break;case 5125:case 5124:k=5125;}d.buffer.dtype=k;}d.type=k;e=h;0>e&&(e=d.buffer.byteLength,5123===k?e>>=1:5125===k&&(e>>=2));d.vertCount=e;e=g;0>g&&(e=4,g=d.buffer.dimension,1===g&&(e=0),2===g&&(e=1),3===g&&(e=4));d.primType=e;}function q(a){e.elementsCount--;delete n[a.id];a.buffer.destroy();a.buffer=null;}var n={},v=0,k={uint8:5121,uint16:5123};b.oes_element_index_uint&&(k.uint32=5125);f.prototype.bind=function(){this.buffer.bind();};var u=[];return {create:function(a,
b){function l(a){if(a)if("number"===typeof a)g(a),h.primType=4,h.vertCount=a|0,h.type=5121;else {var b=null,c=35044,e=-1,f=-1,m=0,n=0;if(Array.isArray(a)||O(a)||la(a))b=a;else if("data"in a&&(b=a.data),"usage"in a&&(c=nb[a.usage]),"primitive"in a&&(e=Ka[a.primitive]),"count"in a&&(f=a.count|0),"type"in a&&(n=k[a.type]),"length"in a)m=a.length|0;else if(m=f,5123===n||5122===n)m*=2;else if(5125===n||5124===n)m*=4;d(h,b,c,e,f,m,n);}else g(),h.primType=4,h.vertCount=0,h.type=5121;return l}var g=c.create(null,
34963,!0),h=new f(g._buffer);e.elementsCount++;l(a);l._reglType="elements";l._elements=h;l.subdata=function(a,b){g.subdata(a,b);return l};l.destroy=function(){q(h);};return l},createStream:function(a){var b=u.pop();b||(b=new f(c.create(null,34963,!0,!1)._buffer));d(b,a,35040,-1,-1,0,0);return b},destroyStream:function(a){u.push(a);},getElements:function(a){return "function"===typeof a&&a._elements instanceof f?a._elements:null},clear:function(){I(n).forEach(q);}}}function ob(a){for(var b=G.allocType(5123,
a.length),c=0;c<a.length;++c)if(isNaN(a[c]))b[c]=65535;else if(Infinity===a[c])b[c]=31744;else if(-Infinity===a[c])b[c]=64512;else {pb[0]=a[c];var e=Lb[0],f=e>>>31<<15,d=(e<<1>>>24)-127,e=e>>13&1023;b[c]=-24>d?f:-14>d?f+(e+1024>>-14-d):15<d?f+31744:f+(d+15<<10)+e;}return b}function ra(a){return Array.isArray(a)||O(a)}function sa(a){return "[object "+a+"]"}function qb(a){return Array.isArray(a)&&(0===a.length||"number"===typeof a[0])}function rb(a){return Array.isArray(a)&&0!==a.length&&ra(a[0])?!0:!1}
function aa(a){return Object.prototype.toString.call(a)}function Va(a){if(!a)return !1;var b=aa(a);return 0<=Mb.indexOf(b)?!0:qb(a)||rb(a)||la(a)}function sb(a,b){36193===a.type?(a.data=ob(b),G.freeType(b)):a.data=b;}function La(a,b,c,e,f,d){a="undefined"!==typeof C[a]?C[a]:U[a]*za[b];d&&(a*=6);if(f){for(e=0;1<=c;)e+=a*c*c,c/=2;return e}return a*c*e}function Nb(a,b,c,e,f,d,q){function n(){this.format=this.internalformat=6408;this.type=5121;this.flipY=this.premultiplyAlpha=this.compressed=!1;this.unpackAlignment=
1;this.colorSpace=37444;this.channels=this.height=this.width=0;}function v(a,b){a.internalformat=b.internalformat;a.format=b.format;a.type=b.type;a.compressed=b.compressed;a.premultiplyAlpha=b.premultiplyAlpha;a.flipY=b.flipY;a.unpackAlignment=b.unpackAlignment;a.colorSpace=b.colorSpace;a.width=b.width;a.height=b.height;a.channels=b.channels;}function k(a,b){if("object"===typeof b&&b){"premultiplyAlpha"in b&&(a.premultiplyAlpha=b.premultiplyAlpha);"flipY"in b&&(a.flipY=b.flipY);"alignment"in b&&(a.unpackAlignment=
b.alignment);"colorSpace"in b&&(a.colorSpace=Ob[b.colorSpace]);"type"in b&&(a.type=N[b.type]);var c=a.width,e=a.height,d=a.channels,f=!1;"shape"in b?(c=b.shape[0],e=b.shape[1],3===b.shape.length&&(d=b.shape[2],f=!0)):("radius"in b&&(c=e=b.radius),"width"in b&&(c=b.width),"height"in b&&(e=b.height),"channels"in b&&(d=b.channels,f=!0));a.width=c|0;a.height=e|0;a.channels=d|0;c=!1;"format"in b&&(c=b.format,e=a.internalformat=E[c],a.format=V[e],c in N&&!("type"in b)&&(a.type=N[c]),c in ga&&(a.compressed=
!0),c=!0);!f&&c?a.channels=U[a.format]:f&&!c&&a.channels!==Oa[a.format]&&(a.format=a.internalformat=Oa[a.channels]);}}function u(b){a.pixelStorei(37440,b.flipY);a.pixelStorei(37441,b.premultiplyAlpha);a.pixelStorei(37443,b.colorSpace);a.pixelStorei(3317,b.unpackAlignment);}function m(){n.call(this);this.yOffset=this.xOffset=0;this.data=null;this.needsFree=!1;this.element=null;this.needsCopy=!1;}function x(a,b){var c=null;Va(b)?c=b:b&&(k(a,b),"x"in b&&(a.xOffset=b.x|0),"y"in b&&(a.yOffset=b.y|0),Va(b.data)&&
(c=b.data));if(b.copy){var e=f.viewportWidth,d=f.viewportHeight;a.width=a.width||e-a.xOffset;a.height=a.height||d-a.yOffset;a.needsCopy=!0;}else if(!c)a.width=a.width||1,a.height=a.height||1,a.channels=a.channels||4;else if(O(c))a.channels=a.channels||4,a.data=c,"type"in b||5121!==a.type||(a.type=Ia[Object.prototype.toString.call(c)]|0);else if(qb(c)){a.channels=a.channels||4;e=c;d=e.length;switch(a.type){case 5121:case 5123:case 5125:case 5126:d=G.allocType(a.type,d);d.set(e);a.data=d;break;case 36193:a.data=
ob(e);}a.alignment=1;a.needsFree=!0;}else if(la(c)){e=c.data;Array.isArray(e)||5121!==a.type||(a.type=Ia[Object.prototype.toString.call(e)]|0);var d=c.shape,h=c.stride,y,t,g,p;3===d.length?(g=d[2],p=h[2]):p=g=1;y=d[0];t=d[1];d=h[0];h=h[1];a.alignment=1;a.width=y;a.height=t;a.channels=g;a.format=a.internalformat=Oa[g];a.needsFree=!0;y=p;c=c.offset;g=a.width;p=a.height;t=a.channels;for(var z=G.allocType(36193===a.type?5126:a.type,g*p*t),B=0,ha=0;ha<p;++ha)for(var oa=0;oa<g;++oa)for(var Wa=0;Wa<t;++Wa)z[B++]=
e[d*oa+h*ha+y*Wa+c];sb(a,z);}else if(aa(c)===Xa||aa(c)===Ya||aa(c)===ub)aa(c)===Xa||aa(c)===Ya?a.element=c:a.element=c.canvas,a.width=a.element.width,a.height=a.element.height,a.channels=4;else if(aa(c)===vb)a.element=c,a.width=c.width,a.height=c.height,a.channels=4;else if(aa(c)===wb)a.element=c,a.width=c.naturalWidth,a.height=c.naturalHeight,a.channels=4;else if(aa(c)===xb)a.element=c,a.width=c.videoWidth,a.height=c.videoHeight,a.channels=4;else if(rb(c)){e=a.width||c[0].length;d=a.height||c.length;
h=a.channels;h=ra(c[0][0])?h||c[0][0].length:h||1;y=Qa.shape(c);g=1;for(p=0;p<y.length;++p)g*=y[p];g=G.allocType(36193===a.type?5126:a.type,g);Qa.flatten(c,y,"",g);sb(a,g);a.alignment=1;a.width=e;a.height=d;a.channels=h;a.format=a.internalformat=Oa[h];a.needsFree=!0;}}function l(b,c,d,h,g){var y=b.element,f=b.data,p=b.internalformat,t=b.format,k=b.type,z=b.width,B=b.height;u(b);y?a.texSubImage2D(c,g,d,h,t,k,y):b.compressed?a.compressedTexSubImage2D(c,g,d,h,p,z,B,f):b.needsCopy?(e(),a.copyTexSubImage2D(c,
g,d,h,b.xOffset,b.yOffset,z,B)):a.texSubImage2D(c,g,d,h,z,B,t,k,f);}function g(){return R.pop()||new m}function h(a){a.needsFree&&G.freeType(a.data);m.call(a);R.push(a);}function r(){n.call(this);this.genMipmaps=!1;this.mipmapHint=4352;this.mipmask=0;this.images=Array(16);}function p(a,b,c){var d=a.images[0]=g();a.mipmask=1;d.width=a.width=b;d.height=a.height=c;d.channels=a.channels=4;}function P(a,b){var c=null;if(Va(b))c=a.images[0]=g(),v(c,a),x(c,b),a.mipmask=1;else if(k(a,b),Array.isArray(b.mipmap))for(var d=
b.mipmap,e=0;e<d.length;++e)c=a.images[e]=g(),v(c,a),c.width>>=e,c.height>>=e,x(c,d[e]),a.mipmask|=1<<e;else c=a.images[0]=g(),v(c,a),x(c,b),a.mipmask=1;v(a,a.images[0]);}function t(b,c){for(var d=b.images,h=0;h<d.length&&d[h];++h){var g=d[h],y=c,f=h,p=g.element,t=g.data,k=g.internalformat,z=g.format,B=g.type,ha=g.width,oa=g.height;u(g);p?a.texImage2D(y,f,z,z,B,p):g.compressed?a.compressedTexImage2D(y,f,k,ha,oa,0,t):g.needsCopy?(e(),a.copyTexImage2D(y,f,z,g.xOffset,g.yOffset,ha,oa,0)):a.texImage2D(y,
f,z,ha,oa,0,z,B,t||null);}}function ma(){var a=Y.pop()||new r;n.call(a);for(var b=a.mipmask=0;16>b;++b)a.images[b]=null;return a}function ya(a){for(var b=a.images,c=0;c<b.length;++c)b[c]&&h(b[c]),b[c]=null;Y.push(a);}function w(){this.magFilter=this.minFilter=9728;this.wrapT=this.wrapS=33071;this.anisotropic=1;this.genMipmaps=!1;this.mipmapHint=4352;}function H(a,b){"min"in b&&(a.minFilter=Aa[b.min],0<=Pb.indexOf(a.minFilter)&&!("faces"in b)&&(a.genMipmaps=!0));"mag"in b&&(a.magFilter=S[b.mag]);var c=
a.wrapS,d=a.wrapT;if("wrap"in b){var e=b.wrap;"string"===typeof e?c=d=ia[e]:Array.isArray(e)&&(c=ia[e[0]],d=ia[e[1]]);}else "wrapS"in b&&(c=ia[b.wrapS]),"wrapT"in b&&(d=ia[b.wrapT]);a.wrapS=c;a.wrapT=d;"anisotropic"in b&&(a.anisotropic=b.anisotropic);if("mipmap"in b){c=!1;switch(typeof b.mipmap){case "string":a.mipmapHint=A[b.mipmap];c=a.genMipmaps=!0;break;case "boolean":c=a.genMipmaps=b.mipmap;break;case "object":a.genMipmaps=!1,c=!0;}!c||"min"in b||(a.minFilter=9984);}}function M(c,d){a.texParameteri(d,
10241,c.minFilter);a.texParameteri(d,10240,c.magFilter);a.texParameteri(d,10242,c.wrapS);a.texParameteri(d,10243,c.wrapT);b.ext_texture_filter_anisotropic&&a.texParameteri(d,34046,c.anisotropic);c.genMipmaps&&(a.hint(33170,c.mipmapHint),a.generateMipmap(d));}function y(b){n.call(this);this.mipmask=0;this.internalformat=6408;this.id=Qb++;this.refCount=1;this.target=b;this.texture=a.createTexture();this.unit=-1;this.bindCount=0;this.texInfo=new w;q.profile&&(this.stats={size:0});}function T(b){a.activeTexture(33984);
a.bindTexture(b.target,b.texture);}function wa(){var b=W[0];b?a.bindTexture(b.target,b.texture):a.bindTexture(3553,null);}function F(b){var c=b.texture,e=b.unit,g=b.target;0<=e&&(a.activeTexture(33984+e),a.bindTexture(g,null),W[e]=null);a.deleteTexture(c);b.texture=null;b.params=null;b.pixels=null;b.refCount=0;delete ea[b.id];d.textureCount--;}var A={"don't care":4352,"dont care":4352,nice:4354,fast:4353},ia={repeat:10497,clamp:33071,mirror:33648},S={nearest:9728,linear:9729},Aa=L({mipmap:9987,"nearest mipmap nearest":9984,
"linear mipmap nearest":9985,"nearest mipmap linear":9986,"linear mipmap linear":9987},S),Ob={none:0,browser:37444},N={uint8:5121,rgba4:32819,rgb565:33635,"rgb5 a1":32820},E={alpha:6406,luminance:6409,"luminance alpha":6410,rgb:6407,rgba:6408,rgba4:32854,"rgb5 a1":32855,rgb565:36194},ga={};b.ext_srgb&&(E.srgb=35904,E.srgba=35906);b.oes_texture_float&&(N.float32=N["float"]=5126);b.oes_texture_half_float&&(N.float16=N["half float"]=36193);b.webgl_depth_texture&&(L(E,{depth:6402,"depth stencil":34041}),
L(N,{uint16:5123,uint32:5125,"depth stencil":34042}));b.webgl_compressed_texture_s3tc&&L(ga,{"rgb s3tc dxt1":33776,"rgba s3tc dxt1":33777,"rgba s3tc dxt3":33778,"rgba s3tc dxt5":33779});b.webgl_compressed_texture_atc&&L(ga,{"rgb atc":35986,"rgba atc explicit alpha":35987,"rgba atc interpolated alpha":34798});b.webgl_compressed_texture_pvrtc&&L(ga,{"rgb pvrtc 4bppv1":35840,"rgb pvrtc 2bppv1":35841,"rgba pvrtc 4bppv1":35842,"rgba pvrtc 2bppv1":35843});b.webgl_compressed_texture_etc1&&(ga["rgb etc1"]=
36196);var J=Array.prototype.slice.call(a.getParameter(34467));Object.keys(ga).forEach(function(a){var b=ga[a];0<=J.indexOf(b)&&(E[a]=b);});var C=Object.keys(E);c.textureFormats=C;var ca=[];Object.keys(E).forEach(function(a){ca[E[a]]=a;});var K=[];Object.keys(N).forEach(function(a){K[N[a]]=a;});var Fa=[];Object.keys(S).forEach(function(a){Fa[S[a]]=a;});var pa=[];Object.keys(Aa).forEach(function(a){pa[Aa[a]]=a;});var qa=[];Object.keys(ia).forEach(function(a){qa[ia[a]]=a;});var V=C.reduce(function(a,c){var d=
E[c];6409===d||6406===d||6409===d||6410===d||6402===d||34041===d||b.ext_srgb&&(35904===d||35906===d)?a[d]=d:32855===d||0<=c.indexOf("rgba")?a[d]=6408:a[d]=6407;return a},{}),R=[],Y=[],Qb=0,ea={},fa=c.maxTextureUnits,W=Array(fa).map(function(){return null});L(y.prototype,{bind:function(){this.bindCount+=1;var b=this.unit;if(0>b){for(var c=0;c<fa;++c){var e=W[c];if(e){if(0<e.bindCount)continue;e.unit=-1;}W[c]=this;b=c;break}q.profile&&d.maxTextureUnits<b+1&&(d.maxTextureUnits=b+1);this.unit=b;a.activeTexture(33984+
b);a.bindTexture(this.target,this.texture);}return b},unbind:function(){--this.bindCount;},decRef:function(){0>=--this.refCount&&F(this);}});q.profile&&(d.getTotalTextureSize=function(){var a=0;Object.keys(ea).forEach(function(b){a+=ea[b].stats.size;});return a});return {create2D:function(b,c){function e(a,b){var c=f.texInfo;w.call(c);var d=ma();"number"===typeof a?"number"===typeof b?p(d,a|0,b|0):p(d,a|0,a|0):a?(H(c,a),P(d,a)):p(d,1,1);c.genMipmaps&&(d.mipmask=(d.width<<1)-1);f.mipmask=d.mipmask;v(f,
d);f.internalformat=d.internalformat;e.width=d.width;e.height=d.height;T(f);t(d,3553);M(c,3553);wa();ya(d);q.profile&&(f.stats.size=La(f.internalformat,f.type,d.width,d.height,c.genMipmaps,!1));e.format=ca[f.internalformat];e.type=K[f.type];e.mag=Fa[c.magFilter];e.min=pa[c.minFilter];e.wrapS=qa[c.wrapS];e.wrapT=qa[c.wrapT];return e}var f=new y(3553);ea[f.id]=f;d.textureCount++;e(b,c);e.subimage=function(a,b,c,d){b|=0;c|=0;d|=0;var y=g();v(y,f);y.width=0;y.height=0;x(y,a);y.width=y.width||(f.width>>
d)-b;y.height=y.height||(f.height>>d)-c;T(f);l(y,3553,b,c,d);wa();h(y);return e};e.resize=function(b,c){var d=b|0,g=c|0||d;if(d===f.width&&g===f.height)return e;e.width=f.width=d;e.height=f.height=g;T(f);for(var y=0;f.mipmask>>y;++y){var h=d>>y,z=g>>y;if(!h||!z)break;a.texImage2D(3553,y,f.format,h,z,0,f.format,f.type,null);}wa();q.profile&&(f.stats.size=La(f.internalformat,f.type,d,g,!1,!1));return e};e._reglType="texture2d";e._texture=f;q.profile&&(e.stats=f.stats);e.destroy=function(){f.decRef();};
return e},createCube:function(b,c,e,f,n,r){function m(a,b,c,d,e,f){var g,da=A.texInfo;w.call(da);for(g=0;6>g;++g)F[g]=ma();if("number"===typeof a||!a)for(a=a|0||1,g=0;6>g;++g)p(F[g],a,a);else if("object"===typeof a)if(b)P(F[0],a),P(F[1],b),P(F[2],c),P(F[3],d),P(F[4],e),P(F[5],f);else if(H(da,a),k(A,a),"faces"in a)for(a=a.faces,g=0;6>g;++g)v(F[g],A),P(F[g],a[g]);else for(g=0;6>g;++g)P(F[g],a);v(A,F[0]);A.mipmask=da.genMipmaps?(F[0].width<<1)-1:F[0].mipmask;A.internalformat=F[0].internalformat;m.width=
F[0].width;m.height=F[0].height;T(A);for(g=0;6>g;++g)t(F[g],34069+g);M(da,34067);wa();q.profile&&(A.stats.size=La(A.internalformat,A.type,m.width,m.height,da.genMipmaps,!0));m.format=ca[A.internalformat];m.type=K[A.type];m.mag=Fa[da.magFilter];m.min=pa[da.minFilter];m.wrapS=qa[da.wrapS];m.wrapT=qa[da.wrapT];for(g=0;6>g;++g)ya(F[g]);return m}var A=new y(34067);ea[A.id]=A;d.cubeCount++;var F=Array(6);m(b,c,e,f,n,r);m.subimage=function(a,b,c,d,e){c|=0;d|=0;e|=0;var f=g();v(f,A);f.width=0;f.height=0;
x(f,b);f.width=f.width||(A.width>>e)-c;f.height=f.height||(A.height>>e)-d;T(A);l(f,34069+a,c,d,e);wa();h(f);return m};m.resize=function(b){b|=0;if(b!==A.width){m.width=A.width=b;m.height=A.height=b;T(A);for(var c=0;6>c;++c)for(var d=0;A.mipmask>>d;++d)a.texImage2D(34069+c,d,A.format,b>>d,b>>d,0,A.format,A.type,null);wa();q.profile&&(A.stats.size=La(A.internalformat,A.type,m.width,m.height,!1,!0));return m}};m._reglType="textureCube";m._texture=A;q.profile&&(m.stats=A.stats);m.destroy=function(){A.decRef();};
return m},clear:function(){for(var b=0;b<fa;++b)a.activeTexture(33984+b),a.bindTexture(3553,null),W[b]=null;I(ea).forEach(F);d.cubeCount=0;d.textureCount=0;},getTexture:function(a){return null},restore:function(){for(var b=0;b<fa;++b){var c=W[b];c&&(c.bindCount=0,c.unit=-1,W[b]=null);}I(ea).forEach(function(b){b.texture=a.createTexture();a.bindTexture(b.target,b.texture);for(var c=0;32>c;++c)if(0!==(b.mipmask&1<<c))if(3553===b.target)a.texImage2D(3553,c,b.internalformat,b.width>>c,b.height>>c,0,b.internalformat,
b.type,null);else for(var d=0;6>d;++d)a.texImage2D(34069+d,c,b.internalformat,b.width>>c,b.height>>c,0,b.internalformat,b.type,null);M(b.texInfo,b.target);});},refresh:function(){for(var b=0;b<fa;++b){var c=W[b];c&&(c.bindCount=0,c.unit=-1,W[b]=null);a.activeTexture(33984+b);a.bindTexture(3553,null);a.bindTexture(34067,null);}}}}function Rb(a,b,c,e,f,d){function q(a,b,c){this.target=a;this.texture=b;this.renderbuffer=c;var d=a=0;b?(a=b.width,d=b.height):c&&(a=c.width,d=c.height);this.width=a;this.height=
d;}function n(a){a&&(a.texture&&a.texture._texture.decRef(),a.renderbuffer&&a.renderbuffer._renderbuffer.decRef());}function v(a,b,c){a&&(a.texture?a.texture._texture.refCount+=1:a.renderbuffer._renderbuffer.refCount+=1);}function k(b,c){c&&(c.texture?a.framebufferTexture2D(36160,b,c.target,c.texture._texture.texture,0):a.framebufferRenderbuffer(36160,b,36161,c.renderbuffer._renderbuffer.renderbuffer));}function u(a){var b=3553,c=null,d=null,e=a;"object"===typeof a&&(e=a.data,"target"in a&&(b=a.target|
0));a=e._reglType;"texture2d"===a?c=e:"textureCube"===a?c=e:"renderbuffer"===a&&(d=e,b=36161);return new q(b,c,d)}function m(a,b,c,d,g){if(c)return a=e.create2D({width:a,height:b,format:d,type:g}),a._texture.refCount=0,new q(3553,a,null);a=f.create({width:a,height:b,format:d});a._renderbuffer.refCount=0;return new q(36161,null,a)}function x(a){return a&&(a.texture||a.renderbuffer)}function l(a,b,c){a&&(a.texture?a.texture.resize(b,c):a.renderbuffer&&a.renderbuffer.resize(b,c),a.width=b,a.height=c);}
function g(){this.id=H++;M[this.id]=this;this.framebuffer=a.createFramebuffer();this.height=this.width=0;this.colorAttachments=[];this.depthStencilAttachment=this.stencilAttachment=this.depthAttachment=null;}function h(a){a.colorAttachments.forEach(n);n(a.depthAttachment);n(a.stencilAttachment);n(a.depthStencilAttachment);}function r(b){a.deleteFramebuffer(b.framebuffer);b.framebuffer=null;d.framebufferCount--;delete M[b.id];}function p(b){var d;a.bindFramebuffer(36160,b.framebuffer);var e=b.colorAttachments;
for(d=0;d<e.length;++d)k(36064+d,e[d]);for(d=e.length;d<c.maxColorAttachments;++d)a.framebufferTexture2D(36160,36064+d,3553,null,0);a.framebufferTexture2D(36160,33306,3553,null,0);a.framebufferTexture2D(36160,36096,3553,null,0);a.framebufferTexture2D(36160,36128,3553,null,0);k(36096,b.depthAttachment);k(36128,b.stencilAttachment);k(33306,b.depthStencilAttachment);a.checkFramebufferStatus(36160);a.isContextLost();a.bindFramebuffer(36160,t.next?t.next.framebuffer:null);t.cur=t.next;a.getError();}function P(a,
b){function c(a,b){var d,g=0,f=0,t=!0,k=!0;d=null;var l=!0,n="rgba",r="uint8",y=1,q=null,P=null,pa=null,M=!1;if("number"===typeof a)g=a|0,f=b|0||g;else if(a){"shape"in a?(f=a.shape,g=f[0],f=f[1]):("radius"in a&&(g=f=a.radius),"width"in a&&(g=a.width),"height"in a&&(f=a.height));if("color"in a||"colors"in a)d=a.color||a.colors;if(!d){"colorCount"in a&&(y=a.colorCount|0);"colorTexture"in a&&(l=!!a.colorTexture,n="rgba4");if("colorType"in a&&(r=a.colorType,!l))if("half float"===r||"float16"===
r)n="rgba16f";else if("float"===r||"float32"===r)n="rgba32f";"colorFormat"in a&&(n=a.colorFormat,0<=ma.indexOf(n)?l=!0:0<=ya.indexOf(n)&&(l=!1));}if("depthTexture"in a||"depthStencilTexture"in a)M=!(!a.depthTexture&&!a.depthStencilTexture);"depth"in a&&("boolean"===typeof a.depth?t=a.depth:(q=a.depth,k=!1));"stencil"in a&&("boolean"===typeof a.stencil?k=a.stencil:(P=a.stencil,t=!1));"depthStencil"in a&&("boolean"===typeof a.depthStencil?t=k=a.depthStencil:(pa=a.depthStencil,k=t=!1));}else g=f=1;var V=
null,H=null,T=null,w=null;if(Array.isArray(d))V=d.map(u);else if(d)V=[u(d)];else for(V=Array(y),d=0;d<y;++d)V[d]=m(g,f,l,n,r);g=g||V[0].width;f=f||V[0].height;q?H=u(q):t&&!k&&(H=m(g,f,M,"depth","uint32"));P?T=u(P):k&&!t&&(T=m(g,f,!1,"stencil","uint8"));pa?w=u(pa):!q&&!P&&k&&t&&(w=m(g,f,M,"depth stencil","depth stencil"));t=null;for(d=0;d<V.length;++d)v(V[d]),V[d]&&V[d].texture&&(k=Za[V[d].texture._texture.format]*Ra[V[d].texture._texture.type],null===t&&(t=k));v(H);v(T);v(w);h(e);
e.width=g;e.height=f;e.colorAttachments=V;e.depthAttachment=H;e.stencilAttachment=T;e.depthStencilAttachment=w;c.color=V.map(x);c.depth=x(H);c.stencil=x(T);c.depthStencil=x(w);c.width=e.width;c.height=e.height;p(e);return c}var e=new g;d.framebufferCount++;c(a,b);return L(c,{resize:function(a,b){var d=Math.max(a|0,1),g=Math.max(b|0||d,1);if(d===e.width&&g===e.height)return c;for(var f=e.colorAttachments,h=0;h<f.length;++h)l(f[h],d,g);l(e.depthAttachment,d,g);l(e.stencilAttachment,d,g);l(e.depthStencilAttachment,
d,g);e.width=c.width=d;e.height=c.height=g;p(e);return c},_reglType:"framebuffer",_framebuffer:e,destroy:function(){r(e);h(e);},use:function(a){t.setFBO({framebuffer:c},a);}})}var t={cur:null,next:null,dirty:!1,setFBO:null},ma=["rgba"],ya=["rgba4","rgb565","rgb5 a1"];b.ext_srgb&&ya.push("srgba");b.ext_color_buffer_half_float&&ya.push("rgba16f","rgb16f");b.webgl_color_buffer_float&&ya.push("rgba32f");var w=["uint8"];b.oes_texture_half_float&&w.push("half float","float16");b.oes_texture_float&&w.push("float",
"float32");var H=0,M={};return L(t,{getFramebuffer:function(a){return "function"===typeof a&&"framebuffer"===a._reglType&&(a=a._framebuffer,a instanceof g)?a:null},create:P,createCube:function(a){function b(a){var d,g={color:null},f=0,h=null;d="rgba";var t="uint8",p=1;if("number"===typeof a)f=a|0;else if(a){"shape"in a?f=a.shape[0]:("radius"in a&&(f=a.radius|0),"width"in a?f=a.width|0:"height"in a&&(f=a.height|0));if("color"in a||"colors"in a)h=a.color||a.colors;h||("colorCount"in
a&&(p=a.colorCount|0),"colorType"in a&&(t=a.colorType),"colorFormat"in a&&(d=a.colorFormat));"depth"in a&&(g.depth=a.depth);"stencil"in a&&(g.stencil=a.stencil);"depthStencil"in a&&(g.depthStencil=a.depthStencil);}else f=1;if(h)if(Array.isArray(h))for(a=[],d=0;d<h.length;++d)a[d]=h[d];else a=[h];else for(a=Array(p),h={radius:f,format:d,type:t},d=0;d<p;++d)a[d]=e.createCube(h);g.color=Array(a.length);for(d=0;d<a.length;++d)p=a[d],f=f||p.width,g.color[d]={target:34069,data:a[d]};for(d=0;6>d;++d){for(p=
0;p<a.length;++p)g.color[p].target=34069+d;0<d&&(g.depth=c[0].depth,g.stencil=c[0].stencil,g.depthStencil=c[0].depthStencil);if(c[d])c[d](g);else c[d]=P(g);}return L(b,{width:f,height:f,color:a})}var c=Array(6);b(a);return L(b,{faces:c,resize:function(a){var d=a|0;if(d===b.width)return b;var e=b.color;for(a=0;a<e.length;++a)e[a].resize(d);for(a=0;6>a;++a)c[a].resize(d);b.width=b.height=d;return b},_reglType:"framebufferCube",destroy:function(){c.forEach(function(a){a.destroy();});}})},clear:function(){I(M).forEach(r);},
restore:function(){t.cur=null;t.next=null;t.dirty=!0;I(M).forEach(function(b){b.framebuffer=a.createFramebuffer();p(b);});}})}function $a(){this.w=this.z=this.y=this.x=this.state=0;this.buffer=null;this.size=0;this.normalized=!1;this.type=5126;this.divisor=this.stride=this.offset=0;}function Sb(a,b,c,e,f,d,q){function n(a){if(a!==r.currentVAO){var c=b.oes_vertex_array_object;a?c.bindVertexArrayOES(a.vao):c.bindVertexArrayOES(null);r.currentVAO=a;}}function v(c){if(c!==r.currentVAO){if(c)c.bindAttrs();
else {for(var d=b.angle_instanced_arrays,e=0;e<l.length;++e){var g=l[e];g.buffer?(a.enableVertexAttribArray(e),g.buffer.bind(),a.vertexAttribPointer(e,g.size,g.type,g.normalized,g.stride,g.offfset),d&&g.divisor&&d.vertexAttribDivisorANGLE(e,g.divisor)):(a.disableVertexAttribArray(e),a.vertexAttrib4f(e,g.x,g.y,g.z,g.w));}q.elements?a.bindBuffer(34963,q.elements.buffer.buffer):a.bindBuffer(34963,null);}r.currentVAO=c;}}function k(){I(h).forEach(function(a){a.destroy();});}function u(){this.id=++g;this.attributes=
[];this.elements=null;this.ownsElements=!1;this.offset=this.count=0;this.instances=-1;this.primitive=4;var a=b.oes_vertex_array_object;this.vao=a?a.createVertexArrayOES():null;h[this.id]=this;this.buffers=[];}function m(){b.oes_vertex_array_object&&I(h).forEach(function(a){a.refresh();});}var x=c.maxAttributes,l=Array(x);for(c=0;c<x;++c)l[c]=new $a;var g=0,h={},r={Record:$a,scope:{},state:l,currentVAO:null,targetVAO:null,restore:b.oes_vertex_array_object?m:function(){},createVAO:function(a){function b(a){var e;
Array.isArray(a)?(e=a,c.elements&&c.ownsElements&&c.elements.destroy(),c.elements=null,c.ownsElements=!1,c.offset=0,c.count=0,c.instances=-1,c.primitive=4):(a.elements?(e=a.elements,c.ownsElements?("function"===typeof e&&"elements"===e._reglType?c.elements.destroy():c.elements(e),c.ownsElements=!1):d.getElements(a.elements)?(c.elements=a.elements,c.ownsElements=!1):(c.elements=d.create(a.elements),c.ownsElements=!0)):(c.elements=null,c.ownsElements=!1),e=a.attributes,c.offset=0,c.count=-1,c.instances=
-1,c.primitive=4,c.elements&&(c.count=c.elements._elements.vertCount,c.primitive=c.elements._elements.primType),"offset"in a&&(c.offset=a.offset|0),"count"in a&&(c.count=a.count|0),"instances"in a&&(c.instances=a.instances|0),"primitive"in a&&(c.primitive=Ka[a.primitive]));a={};var g=c.attributes;g.length=e.length;for(var h=0;h<e.length;++h){var p=e[h],k=g[h]=new $a,m=p.data||p;if(Array.isArray(m)||O(m)||la(m)){var l;c.buffers[h]&&(l=c.buffers[h],O(m)&&l._buffer.byteLength>=m.byteLength?l.subdata(m):
(l.destroy(),c.buffers[h]=null));c.buffers[h]||(l=c.buffers[h]=f.create(p,34962,!1,!0));k.buffer=f.getBuffer(l);k.size=k.buffer.dimension|0;k.normalized=!1;k.type=k.buffer.dtype;k.offset=0;k.stride=0;k.divisor=0;k.state=1;a[h]=1;}else f.getBuffer(p)?(k.buffer=f.getBuffer(p),k.size=k.buffer.dimension|0,k.normalized=!1,k.type=k.buffer.dtype,k.offset=0,k.stride=0,k.divisor=0,k.state=1):f.getBuffer(p.buffer)?(k.buffer=f.getBuffer(p.buffer),k.size=(+p.size||k.buffer.dimension)|0,k.normalized=!!p.normalized||
!1,k.type="type"in p?Ja[p.type]:k.buffer.dtype,k.offset=(p.offset||0)|0,k.stride=(p.stride||0)|0,k.divisor=(p.divisor||0)|0,k.state=1):"x"in p&&(k.x=+p.x||0,k.y=+p.y||0,k.z=+p.z||0,k.w=+p.w||0,k.state=2);}for(l=0;l<c.buffers.length;++l)!a[l]&&c.buffers[l]&&(c.buffers[l].destroy(),c.buffers[l]=null);c.refresh();return b}var c=new u;e.vaoCount+=1;b.destroy=function(){for(var a=0;a<c.buffers.length;++a)c.buffers[a]&&c.buffers[a].destroy();c.buffers.length=0;c.ownsElements&&(c.elements.destroy(),c.elements=
null,c.ownsElements=!1);c.destroy();};b._vao=c;b._reglType="vao";return b(a)},getVAO:function(a){return "function"===typeof a&&a._vao?a._vao:null},destroyBuffer:function(b){for(var c=0;c<l.length;++c){var d=l[c];d.buffer===b&&(a.disableVertexAttribArray(c),d.buffer=null);}},setVAO:b.oes_vertex_array_object?n:v,clear:b.oes_vertex_array_object?k:function(){}};u.prototype.bindAttrs=function(){for(var c=b.angle_instanced_arrays,e=this.attributes,g=0;g<e.length;++g){var f=e[g];f.buffer?(a.enableVertexAttribArray(g),
a.bindBuffer(34962,f.buffer.buffer),a.vertexAttribPointer(g,f.size,f.type,f.normalized,f.stride,f.offset),c&&f.divisor&&c.vertexAttribDivisorANGLE(g,f.divisor)):(a.disableVertexAttribArray(g),a.vertexAttrib4f(g,f.x,f.y,f.z,f.w));}for(c=e.length;c<x;++c)a.disableVertexAttribArray(c);(c=d.getElements(this.elements))?a.bindBuffer(34963,c.buffer.buffer):a.bindBuffer(34963,null);};u.prototype.refresh=function(){var a=b.oes_vertex_array_object;a&&(a.bindVertexArrayOES(this.vao),this.bindAttrs(),r.currentVAO=
null,a.bindVertexArrayOES(null));};u.prototype.destroy=function(){if(this.vao){var a=b.oes_vertex_array_object;this===r.currentVAO&&(r.currentVAO=null,a.bindVertexArrayOES(null));a.deleteVertexArrayOES(this.vao);this.vao=null;}this.ownsElements&&(this.elements.destroy(),this.elements=null,this.ownsElements=!1);h[this.id]&&(delete h[this.id],--e.vaoCount);};return r}function Tb(a,b,c,e){function f(a,b,c,d){this.name=a;this.id=b;this.location=c;this.info=d;}function d(a,b){for(var c=0;c<a.length;++c)if(a[c].id===
b.id){a[c].location=b.location;return}a.push(b);}function q(c,d,e){e=35632===c?k:u;var f=e[d];if(!f){var m=b.str(d),f=a.createShader(c);a.shaderSource(f,m);a.compileShader(f);e[d]=f;}return f}function n(a,b){this.id=l++;this.fragId=a;this.vertId=b;this.program=null;this.uniforms=[];this.attributes=[];this.refCount=1;e.profile&&(this.stats={uniformsCount:0,attributesCount:0});}function v(c,h,k){var m;m=q(35632,c.fragId);var l=q(35633,c.vertId);h=c.program=a.createProgram();a.attachShader(h,m);a.attachShader(h,
l);if(k)for(m=0;m<k.length;++m)l=k[m],a.bindAttribLocation(h,l[0],l[1]);a.linkProgram(h);l=a.getProgramParameter(h,35718);e.profile&&(c.stats.uniformsCount=l);var n=c.uniforms;for(m=0;m<l;++m)if(k=a.getActiveUniform(h,m)){if(1<k.size)for(var v=0;v<k.size;++v){var u=k.name.replace("[0]","["+v+"]");d(n,new f(u,b.id(u),a.getUniformLocation(h,u),k));}v=k.name;1<k.size&&(v=v.replace("[0]",""));d(n,new f(v,b.id(v),a.getUniformLocation(h,v),k));}l=a.getProgramParameter(h,35721);e.profile&&(c.stats.attributesCount=
l);c=c.attributes;for(m=0;m<l;++m)(k=a.getActiveAttrib(h,m))&&d(c,new f(k.name,b.id(k.name),a.getAttribLocation(h,k.name),k));}var k={},u={},m={},x=[],l=0;e.profile&&(c.getMaxUniformsCount=function(){var a=0;x.forEach(function(b){b.stats.uniformsCount>a&&(a=b.stats.uniformsCount);});return a},c.getMaxAttributesCount=function(){var a=0;x.forEach(function(b){b.stats.attributesCount>a&&(a=b.stats.attributesCount);});return a});return {clear:function(){var b=a.deleteShader.bind(a);I(k).forEach(b);k={};I(u).forEach(b);
u={};x.forEach(function(b){a.deleteProgram(b.program);});x.length=0;m={};c.shaderCount=0;},program:function(b,d,e,f){var l=m[d];l||(l=m[d]={});var q=l[b];if(q&&(q.refCount++,!f))return q;var w=new n(d,b);c.shaderCount++;v(w,e,f);q||(l[b]=w);x.push(w);return L(w,{destroy:function(){w.refCount--;if(0>=w.refCount){a.deleteProgram(w.program);var b=x.indexOf(w);x.splice(b,1);c.shaderCount--;}0>=l[w.vertId].refCount&&(a.deleteShader(u[w.vertId]),delete u[w.vertId],delete m[w.fragId][w.vertId]);Object.keys(m[w.fragId]).length||
(a.deleteShader(k[w.fragId]),delete k[w.fragId],delete m[w.fragId]);}})},restore:function(){k={};u={};for(var a=0;a<x.length;++a)v(x[a],null,x[a].attributes.map(function(a){return [a.location,a.name]}));},shader:q,frag:-1,vert:-1}}function Ub(a,b,c,e,f,d,q){function n(d){var f;f=null===b.next?5121:b.next.colorAttachments[0].texture._texture.type;var m=0,n=0,l=e.framebufferWidth,g=e.framebufferHeight,h=null;O(d)?h=d:d&&(m=d.x|0,n=d.y|0,l=(d.width||e.framebufferWidth-m)|0,g=(d.height||e.framebufferHeight-
n)|0,h=d.data||null);c();d=l*g*4;h||(5121===f?h=new Uint8Array(d):5126===f&&(h=h||new Float32Array(d)));a.pixelStorei(3333,4);a.readPixels(m,n,l,g,6408,f,h);return h}function v(a){var c;b.setFBO({framebuffer:a.framebuffer},function(){c=n(a);});return c}return function(a){return a&&"framebuffer"in a?v(a):n(a)}}function Ba(a){return Array.prototype.slice.call(a)}function Ca(a){return Ba(a).join("")}function Vb(){function a(){var a=[],b=[];return L(function(){a.push.apply(a,Ba(arguments));},{def:function(){var d=
"v"+c++;b.push(d);0<arguments.length&&(a.push(d,"="),a.push.apply(a,Ba(arguments)),a.push(";"));return d},toString:function(){return Ca([0<b.length?"var "+b.join(",")+";":"",Ca(a)])}})}function b(){function b(a,e){d(a,e,"=",c.def(a,e),";");}var c=a(),d=a(),e=c.toString,f=d.toString;return L(function(){c.apply(c,Ba(arguments));},{def:c.def,entry:c,exit:d,save:b,set:function(a,d,e){b(a,d);c(a,d,"=",e,";");},toString:function(){return e()+f()}})}var c=0,e=[],f=[],d=a(),q={};return {global:d,link:function(a){for(var b=
0;b<f.length;++b)if(f[b]===a)return e[b];b="g"+c++;e.push(b);f.push(a);return b},block:a,proc:function(a,c){function d(){var a="a"+e.length;e.push(a);return a}var e=[];c=c||0;for(var f=0;f<c;++f)d();var f=b(),x=f.toString;return q[a]=L(f,{arg:d,toString:function(){return Ca(["function(",e.join(),"){",x(),"}"])}})},scope:b,cond:function(){var a=Ca(arguments),c=b(),d=b(),e=c.toString,f=d.toString;return L(c,{then:function(){c.apply(c,Ba(arguments));return this},"else":function(){d.apply(d,Ba(arguments));
return this},toString:function(){var b=f();b&&(b="else{"+b+"}");return Ca(["if(",a,"){",e(),"}",b])}})},compile:function(){var a=['"use strict";',d,"return {"];Object.keys(q).forEach(function(b){a.push('"',b,'":',q[b].toString(),",");});a.push("}");var b=Ca(a).replace(/;/g,";\n").replace(/}/g,"}\n").replace(/{/g,"{\n");return Function.apply(null,e.concat(b)).apply(null,f)}}}function Sa(a){return Array.isArray(a)||O(a)||la(a)}function yb(a){return a.sort(function(a,c){return "viewport"===a?-1:"viewport"===
c?1:a<c?-1:1})}function J(a,b,c,e){this.thisDep=a;this.contextDep=b;this.propDep=c;this.append=e;}function xa(a){return a&&!(a.thisDep||a.contextDep||a.propDep)}function w(a){return new J(!1,!1,!1,a)}function K(a,b){var c=a.type;if(0===c)return c=a.data.length,new J(!0,1<=c,2<=c,b);if(4===c)return c=a.data,new J(c.thisDep,c.contextDep,c.propDep,b);if(5===c)return new J(!1,!1,!1,b);if(6===c){for(var e=c=!1,f=!1,d=0;d<a.data.length;++d){var q=a.data[d];1===q.type?f=!0:2===q.type?e=!0:3===q.type?c=!0:
0===q.type?(c=!0,q=q.data,1<=q&&(e=!0),2<=q&&(f=!0)):4===q.type&&(c=c||q.data.thisDep,e=e||q.data.contextDep,f=f||q.data.propDep);}return new J(c,e,f,b)}return new J(3===c,2===c,1===c,b)}function Wb(a,b,c,e,f,d,q,n,v,k,u,m,x,l,g){function h(a){return a.replace(".","_")}function r(a,b,c){var d=h(a);Na.push(a);Ea[d]=ta[d]=!!c;ua[d]=b;}function p(a,b,c){var d=h(a);Na.push(a);Array.isArray(c)?(ta[d]=c.slice(),Ea[d]=c.slice()):ta[d]=Ea[d]=c;va[d]=b;}function P(){var a=Vb(),c=a.link,d=a.global;a.id=sa++;a.batchId=
"0";var e=c(tb),f=a.shared={props:"a0"};Object.keys(tb).forEach(function(a){f[a]=d.def(e,".",a);});var g=a.next={},da=a.current={};Object.keys(va).forEach(function(a){Array.isArray(ta[a])&&(g[a]=d.def(f.next,".",a),da[a]=d.def(f.current,".",a));});var D=a.constants={};Object.keys(Pa).forEach(function(a){D[a]=d.def(JSON.stringify(Pa[a]));});a.invoke=function(b,d){switch(d.type){case 0:var e=["this",f.context,f.props,a.batchId];return b.def(c(d.data),".call(",e.slice(0,Math.max(d.data.length+1,4)),")");
case 1:return b.def(f.props,d.data);case 2:return b.def(f.context,d.data);case 3:return b.def("this",d.data);case 4:return d.data.append(a,b),d.data.ref;case 5:return d.data.toString();case 6:return d.data.map(function(c){return a.invoke(b,c)})}};a.attribCache={};var ba={};a.scopeAttrib=function(a){a=b.id(a);if(a in ba)return ba[a];var d=k.scope[a];d||(d=k.scope[a]=new ea);return ba[a]=c(d)};return a}function t(a){var b=a["static"];a=a.dynamic;var c;if("profile"in b){var d=!!b.profile;c=w(function(a,
b){return d});c.enable=d;}else if("profile"in a){var e=a.profile;c=K(e,function(a,b){return a.invoke(b,e)});}return c}function G(a,b){var c=a["static"],d=a.dynamic;if("framebuffer"in c){var e=c.framebuffer;return e?(e=n.getFramebuffer(e),w(function(a,b){var c=a.link(e),d=a.shared;b.set(d.framebuffer,".next",c);d=d.context;b.set(d,".framebufferWidth",c+".width");b.set(d,".framebufferHeight",c+".height");return c})):w(function(a,b){var c=a.shared;b.set(c.framebuffer,".next","null");c=c.context;b.set(c,
".framebufferWidth",c+".drawingBufferWidth");b.set(c,".framebufferHeight",c+".drawingBufferHeight");return "null"})}if("framebuffer"in d){var f=d.framebuffer;return K(f,function(a,b){var c=a.invoke(b,f),d=a.shared,e=d.framebuffer,c=b.def(e,".getFramebuffer(",c,")");b.set(e,".next",c);d=d.context;b.set(d,".framebufferWidth",c+"?"+c+".width:"+d+".drawingBufferWidth");b.set(d,".framebufferHeight",c+"?"+c+".height:"+d+".drawingBufferHeight");return c})}return null}function C(a,b,c){function d(a){if(a in
e){var c=e[a];a=!0;var z=c.x|0,g=c.y|0,h,da;"width"in c?h=c.width|0:a=!1;"height"in c?da=c.height|0:a=!1;return new J(!a&&b&&b.thisDep,!a&&b&&b.contextDep,!a&&b&&b.propDep,function(a,b){var d=a.shared.context,e=h;"width"in c||(e=b.def(d,".","framebufferWidth","-",z));var f=da;"height"in c||(f=b.def(d,".","framebufferHeight","-",g));return [z,g,e,f]})}if(a in f){var ha=f[a];a=K(ha,function(a,b){var c=a.invoke(b,ha),d=a.shared.context,e=b.def(c,".x|0"),f=b.def(c,".y|0"),z=b.def('"width" in ',c,"?",c,
".width|0:","(",d,".","framebufferWidth","-",e,")"),c=b.def('"height" in ',c,"?",c,".height|0:","(",d,".","framebufferHeight","-",f,")");return [e,f,z,c]});b&&(a.thisDep=a.thisDep||b.thisDep,a.contextDep=a.contextDep||b.contextDep,a.propDep=a.propDep||b.propDep);return a}return b?new J(b.thisDep,b.contextDep,b.propDep,function(a,b){var c=a.shared.context;return [0,0,b.def(c,".","framebufferWidth"),b.def(c,".","framebufferHeight")]}):null}var e=a["static"],f=a.dynamic;if(a=d("viewport")){var g=a;a=new J(a.thisDep,
a.contextDep,a.propDep,function(a,b){var c=g.append(a,b),d=a.shared.context;b.set(d,".viewportWidth",c[2]);b.set(d,".viewportHeight",c[3]);return c});}return {viewport:a,scissor_box:d("scissor.box")}}function O(a,b){var c=a["static"];if("string"===typeof c.frag&&"string"===typeof c.vert){if(0<Object.keys(b.dynamic).length)return null;var c=b["static"],d=Object.keys(c);if(0<d.length&&"number"===typeof c[d[0]]){for(var e=[],f=0;f<d.length;++f)e.push([c[d[f]]|0,d[f]]);return e}}return null}function H(a,
c,d){function e(a){if(a in f){var c=b.id(f[a]);a=w(function(){return c});a.id=c;return a}if(a in g){var d=g[a];return K(d,function(a,b){var c=a.invoke(b,d);return b.def(a.shared.strings,".id(",c,")")})}return null}var f=a["static"],g=a.dynamic,h=e("frag"),D=e("vert"),ba=null;xa(h)&&xa(D)?(ba=u.program(D.id,h.id,null,d),a=w(function(a,b){return a.link(ba)})):a=new J(h&&h.thisDep||D&&D.thisDep,h&&h.contextDep||D&&D.contextDep,h&&h.propDep||D&&D.propDep,function(a,b){var c=a.shared.shader,d;d=h?h.append(a,
b):b.def(c,".","frag");var e;e=D?D.append(a,b):b.def(c,".","vert");return b.def(c+".program("+e+","+d+")")});return {frag:h,vert:D,progVar:a,program:ba}}function M(a,b){function c(a,b){if(a in e){var d=e[a]|0;b?g.offset=d:g.instances=d;return w(function(a,c){b&&(a.OFFSET=d);return d})}if(a in f){var z=f[a];return K(z,function(a,c){var d=a.invoke(c,z);b&&(a.OFFSET=d);return d})}if(b){if(ba)return w(function(a,b){return a.OFFSET=0});if(h)return new J(D.thisDep,D.contextDep,D.propDep,function(a,b){return b.def(a.shared.vao+
".currentVAO?"+a.shared.vao+".currentVAO.offset:0")})}else if(h)return new J(D.thisDep,D.contextDep,D.propDep,function(a,b){return b.def(a.shared.vao+".currentVAO?"+a.shared.vao+".currentVAO.instances:-1")});return null}var e=a["static"],f=a.dynamic,g={},h=!1,D=function(){if("vao"in e){var a=e.vao;null!==a&&null===k.getVAO(a)&&(a=k.createVAO(a));h=!0;g.vao=a;return w(function(b){var c=k.getVAO(a);return c?b.link(c):"null"})}if("vao"in f){h=!0;var b=f.vao;return K(b,function(a,c){var d=a.invoke(c,
b);return c.def(a.shared.vao+".getVAO("+d+")")})}return null}(),ba=!1,X=function(){if("elements"in e){var a=e.elements;g.elements=a;if(Sa(a)){var b=g.elements=d.create(a,!0),a=d.getElements(b);ba=!0;}else a&&(a=d.getElements(a),ba=!0);b=w(function(b,c){if(a){var d=b.link(a);return b.ELEMENTS=d}return b.ELEMENTS=null});b.value=a;return b}if("elements"in f){ba=!0;var c=f.elements;return K(c,function(a,b){var d=a.shared,e=d.isBufferArgs,d=d.elements,f=a.invoke(b,c),z=b.def("null"),e=b.def(e,"(",f,")"),
f=a.cond(e).then(z,"=",d,".createStream(",f,");")["else"](z,"=",d,".getElements(",f,");");b.entry(f);b.exit(a.cond(e).then(d,".destroyStream(",z,");"));return a.ELEMENTS=z})}return h?new J(D.thisDep,D.contextDep,D.propDep,function(a,b){return b.def(a.shared.vao+".currentVAO?"+a.shared.elements+".getElements("+a.shared.vao+".currentVAO.elements):null")}):null}(),ja=c("offset",!0),m=function(){if("primitive"in e){var a=e.primitive;g.primitive=a;return w(function(b,c){return Ka[a]})}if("primitive"in
f){var b=f.primitive;return K(b,function(a,c){var d=a.constants.primTypes,e=a.invoke(c,b);return c.def(d,"[",e,"]")})}return ba?xa(X)?X.value?w(function(a,b){return b.def(a.ELEMENTS,".primType")}):w(function(){return 4}):new J(X.thisDep,X.contextDep,X.propDep,function(a,b){var c=a.ELEMENTS;return b.def(c,"?",c,".primType:",4)}):h?new J(D.thisDep,D.contextDep,D.propDep,function(a,b){return b.def(a.shared.vao+".currentVAO?"+a.shared.vao+".currentVAO.primitive:4")}):null}(),l=function(){if("count"in
e){var a=e.count|0;g.count=a;return w(function(){return a})}if("count"in f){var b=f.count;return K(b,function(a,c){return a.invoke(c,b)})}return ba?xa(X)?X?ja?new J(ja.thisDep,ja.contextDep,ja.propDep,function(a,b){return b.def(a.ELEMENTS,".vertCount-",a.OFFSET)}):w(function(a,b){return b.def(a.ELEMENTS,".vertCount")}):w(function(){return -1}):new J(X.thisDep||ja.thisDep,X.contextDep||ja.contextDep,X.propDep||ja.propDep,function(a,b){var c=a.ELEMENTS;return a.OFFSET?b.def(c,"?",c,".vertCount-",a.OFFSET,
":-1"):b.def(c,"?",c,".vertCount:-1")}):h?new J(D.thisDep,D.contextDep,D.propDep,function(a,b){return b.def(a.shared.vao,".currentVAO?",a.shared.vao,".currentVAO.count:-1")}):null}(),p=c("instances",!1);return {elements:X,primitive:m,count:l,instances:p,offset:ja,vao:D,vaoActive:h,elementsActive:ba,"static":g}}function y(a,b){var c=a["static"],d=a.dynamic,e={};Na.forEach(function(a){function b(z,g){if(a in c){var B=z(c[a]);e[f]=w(function(){return B});}else if(a in d){var h=d[a];e[f]=K(h,function(a,
b){return g(a,b,a.invoke(b,h))});}}var f=h(a);switch(a){case "cull.enable":case "blend.enable":case "dither":case "stencil.enable":case "depth.enable":case "scissor.enable":case "polygonOffset.enable":case "sample.alpha":case "sample.enable":case "depth.mask":return b(function(a){return a},function(a,b,c){return c});case "depth.func":return b(function(a){return ab[a]},function(a,b,c){return b.def(a.constants.compareFuncs,"[",c,"]")});case "depth.range":return b(function(a){return a},function(a,b,c){a=
b.def("+",c,"[0]");b=b.def("+",c,"[1]");return [a,b]});case "blend.func":return b(function(a){return [Ga["srcRGB"in a?a.srcRGB:a.src],Ga["dstRGB"in a?a.dstRGB:a.dst],Ga["srcAlpha"in a?a.srcAlpha:a.src],Ga["dstAlpha"in a?a.dstAlpha:a.dst]]},function(a,b,c){function d(a,e){return b.def('"',a,e,'" in ',c,"?",c,".",a,e,":",c,".",a)}a=a.constants.blendFuncs;var e=d("src","RGB"),f=d("dst","RGB"),e=b.def(a,"[",e,"]"),z=b.def(a,"[",d("src","Alpha"),"]"),f=b.def(a,"[",f,"]");a=b.def(a,"[",d("dst","Alpha"),"]");
return [e,f,z,a]});case "blend.equation":return b(function(a){if("string"===typeof a)return [fa[a],fa[a]];if("object"===typeof a)return [fa[a.rgb],fa[a.alpha]]},function(a,b,c){var d=a.constants.blendEquations,e=b.def(),f=b.def();a=a.cond("typeof ",c,'==="string"');a.then(e,"=",f,"=",d,"[",c,"];");a["else"](e,"=",d,"[",c,".rgb];",f,"=",d,"[",c,".alpha];");b(a);return [e,f]});case "blend.color":return b(function(a){return R(4,function(b){return +a[b]})},function(a,b,c){return R(4,function(a){return b.def("+",
c,"[",a,"]")})});case "stencil.mask":return b(function(a){return a|0},function(a,b,c){return b.def(c,"|0")});case "stencil.func":return b(function(a){return [ab[a.cmp||"keep"],a.ref||0,"mask"in a?a.mask:-1]},function(a,b,c){a=b.def('"cmp" in ',c,"?",a.constants.compareFuncs,"[",c,".cmp]",":",7680);var d=b.def(c,".ref|0");b=b.def('"mask" in ',c,"?",c,".mask|0:-1");return [a,d,b]});case "stencil.opFront":case "stencil.opBack":return b(function(b){return ["stencil.opBack"===a?1029:1028,Ta[b.fail||"keep"],
Ta[b.zfail||"keep"],Ta[b.zpass||"keep"]]},function(b,c,d){function e(a){return c.def('"',a,'" in ',d,"?",f,"[",d,".",a,"]:",7680)}var f=b.constants.stencilOps;return ["stencil.opBack"===a?1029:1028,e("fail"),e("zfail"),e("zpass")]});case "polygonOffset.offset":return b(function(a){return [a.factor|0,a.units|0]},function(a,b,c){a=b.def(c,".factor|0");b=b.def(c,".units|0");return [a,b]});case "cull.face":return b(function(a){var b=0;"front"===a?b=1028:"back"===a&&(b=1029);return b},function(a,b,c){return b.def(c,
'==="front"?',1028,":",1029)});case "lineWidth":return b(function(a){return a},function(a,b,c){return c});case "frontFace":return b(function(a){return zb[a]},function(a,b,c){return b.def(c+'==="cw"?2304:2305')});case "colorMask":return b(function(a){return a.map(function(a){return !!a})},function(a,b,c){return R(4,function(a){return "!!"+c+"["+a+"]"})});case "sample.coverage":return b(function(a){return ["value"in a?a.value:1,!!a.invert]},function(a,b,c){a=b.def('"value" in ',c,"?+",c,".value:1");b=
b.def("!!",c,".invert");return [a,b]})}});return e}function T(a,b){var c=a["static"],d=a.dynamic,e={};Object.keys(c).forEach(function(a){var b=c[a],d;if("number"===typeof b||"boolean"===typeof b)d=w(function(){return b});else if("function"===typeof b){var f=b._reglType;if("texture2d"===f||"textureCube"===f)d=w(function(a){return a.link(b)});else if("framebuffer"===f||"framebufferCube"===f)d=w(function(a){return a.link(b.color[0])});}else ra(b)&&(d=w(function(a){return a.global.def("[",R(b.length,function(a){return b[a]}),
"]")}));d.value=b;e[a]=d;});Object.keys(d).forEach(function(a){var b=d[a];e[a]=K(b,function(a,c){return a.invoke(c,b)});});return e}function wa(a,c){var d=a["static"],e=a.dynamic,g={};Object.keys(d).forEach(function(a){var c=d[a],e=b.id(a),z=new ea;if(Sa(c))z.state=1,z.buffer=f.getBuffer(f.create(c,34962,!1,!0)),z.type=0;else {var B=f.getBuffer(c);if(B)z.state=1,z.buffer=B,z.type=0;else if("constant"in c){var h=c.constant;z.buffer="null";z.state=2;"number"===typeof h?z.x=h:Da.forEach(function(a,b){b<
h.length&&(z[a]=h[b]);});}else {var B=Sa(c.buffer)?f.getBuffer(f.create(c.buffer,34962,!1,!0)):f.getBuffer(c.buffer),k=c.offset|0,m=c.stride|0,l=c.size|0,oa=!!c.normalized,p=0;"type"in c&&(p=Ja[c.type]);c=c.divisor|0;z.buffer=B;z.state=1;z.size=l;z.normalized=oa;z.type=p||B.dtype;z.offset=k;z.stride=m;z.divisor=c;}}g[a]=w(function(a,b){var c=a.attribCache;if(e in c)return c[e];var d={isStream:!1};Object.keys(z).forEach(function(a){d[a]=z[a];});z.buffer&&(d.buffer=a.link(z.buffer),d.type=d.type||d.buffer+
".dtype");return c[e]=d});});Object.keys(e).forEach(function(a){var b=e[a];g[a]=K(b,function(a,c){function d(a){c(B[a],"=",e,".",a,"|0;");}var e=a.invoke(c,b),f=a.shared,z=a.constants,g=f.isBufferArgs,f=f.buffer,B={isStream:c.def(!1)},h=new ea;h.state=1;Object.keys(h).forEach(function(a){B[a]=c.def(""+h[a]);});var k=B.buffer,m=B.type;c("if(",g,"(",e,")){",B.isStream,"=true;",k,"=",f,".createStream(",34962,",",e,");",m,"=",k,".dtype;","}else{",k,"=",f,".getBuffer(",e,");","if(",k,"){",m,"=",k,".dtype;",
'}else if("constant" in ',e,"){",B.state,"=",2,";","if(typeof "+e+'.constant === "number"){',B[Da[0]],"=",e,".constant;",Da.slice(1).map(function(a){return B[a]}).join("="),"=0;","}else{",Da.map(function(a,b){return B[a]+"="+e+".constant.length>"+b+"?"+e+".constant["+b+"]:0;"}).join(""),"}}else{","if(",g,"(",e,".buffer)){",k,"=",f,".createStream(",34962,",",e,".buffer);","}else{",k,"=",f,".getBuffer(",e,".buffer);","}",m,'="type" in ',e,"?",z.glTypes,"[",e,".type]:",k,".dtype;",B.normalized,"=!!",
e,".normalized;");d("size");d("offset");d("stride");d("divisor");c("}}");c.exit("if(",B.isStream,"){",f,".destroyStream(",k,");","}");return B});});return g}function F(a){var b=a["static"],c=a.dynamic,d={};Object.keys(b).forEach(function(a){var c=b[a];d[a]=w(function(a,b){return "number"===typeof c||"boolean"===typeof c?""+c:a.link(c)});});Object.keys(c).forEach(function(a){var b=c[a];d[a]=K(b,function(a,c){return a.invoke(c,b)});});return d}function A(a,b,d,e,f){function g(a){var b=p[a];b&&(ja[a]=b);}
var m=O(a,b),l=G(a),p=C(a,l),X=M(a),ja=y(a),q=H(a,f,m);g("viewport");g(h("scissor.box"));var n=0<Object.keys(ja).length,l={framebuffer:l,draw:X,shader:q,state:ja,dirty:n,scopeVAO:null,drawVAO:null,useVAO:!1,attributes:{}};l.profile=t(a);l.uniforms=T(d);l.drawVAO=l.scopeVAO=X.vao;if(!l.drawVAO&&q.program&&!m&&c.angle_instanced_arrays&&X["static"].elements){var r=!0;a=q.program.attributes.map(function(a){a=b["static"][a];r=r&&!!a;return a});if(r&&0<a.length){var u=k.getVAO(k.createVAO({attributes:a,
elements:X["static"].elements}));l.drawVAO=new J(null,null,null,function(a,b){return a.link(u)});l.useVAO=!0;}}m?l.useVAO=!0:l.attributes=wa(b);l.context=F(e);return l}function ia(a,b,c){var d=a.shared.context,e=a.scope();Object.keys(c).forEach(function(f){b.save(d,"."+f);var g=c[f].append(a,b);Array.isArray(g)?e(d,".",f,"=[",g.join(),"];"):e(d,".",f,"=",g,";");});b(e);}function S(a,b,c,d){var e=a.shared,f=e.gl,g=e.framebuffer,h;Ma&&(h=b.def(e.extensions,".webgl_draw_buffers"));var k=a.constants,
e=k.drawBuffer,k=k.backBuffer;a=c?c.append(a,b):b.def(g,".next");d||b("if(",a,"!==",g,".cur){");b("if(",a,"){",f,".bindFramebuffer(",36160,",",a,".framebuffer);");Ma&&b(h,".drawBuffersWEBGL(",e,"[",a,".colorAttachments.length]);");b("}else{",f,".bindFramebuffer(",36160,",null);");Ma&&b(h,".drawBuffersWEBGL(",k,");");b("}",g,".cur=",a,";");d||b("}");}function Aa(a,b,c){var d=a.shared,e=d.gl,f=a.current,g=a.next,k=d.current,l=d.next,m=a.cond(k,".dirty");Na.forEach(function(b){b=h(b);if(!(b in c.state)){var d,
B;if(b in g){d=g[b];B=f[b];var p=R(ta[b].length,function(a){return m.def(d,"[",a,"]")});m(a.cond(p.map(function(a,b){return a+"!=="+B+"["+b+"]"}).join("||")).then(e,".",va[b],"(",p,");",p.map(function(a,b){return B+"["+b+"]="+a}).join(";"),";"));}else d=m.def(l,".",b),p=a.cond(d,"!==",k,".",b),m(p),b in ua?p(a.cond(d).then(e,".enable(",ua[b],");")["else"](e,".disable(",ua[b],");"),k,".",b,"=",d,";"):p(e,".",va[b],"(",d,");",k,".",b,"=",d,";");}});0===Object.keys(c.state).length&&m(k,".dirty=false;");
b(m);}function I(a,b,c,d){var e=a.shared,f=a.current,g=e.current,h=e.gl;yb(Object.keys(c)).forEach(function(e){var k=c[e];if(!d||d(k)){var m=k.append(a,b);if(ua[e]){var l=ua[e];xa(k)?m?b(h,".enable(",l,");"):b(h,".disable(",l,");"):b(a.cond(m).then(h,".enable(",l,");")["else"](h,".disable(",l,");"));b(g,".",e,"=",m,";");}else if(ra(m)){var p=f[e];b(h,".",va[e],"(",m,");",m.map(function(a,b){return p+"["+b+"]="+a}).join(";"),";");}else b(h,".",va[e],"(",m,");",g,".",e,"=",m,";");}});}function N(a,b){W&&
(a.instancing=b.def(a.shared.extensions,".angle_instanced_arrays"));}function E(a,b,c,d,e){function f(){return "undefined"===typeof performance?"Date.now()":"performance.now()"}function g(a){r=b.def();a(r,"=",f(),";");"string"===typeof e?a(p,".count+=",e,";"):a(p,".count++;");l&&(d?(u=b.def(),a(u,"=",n,".getNumPendingQueries();")):a(n,".beginQuery(",p,");"));}function h(a){a(p,".cpuTime+=",f(),"-",r,";");l&&(d?a(n,".pushScopeStats(",u,",",n,".getNumPendingQueries(),",p,");"):a(n,".endQuery();"));}function k(a){var c=
b.def(q,".profile");b(q,".profile=",a,";");b.exit(q,".profile=",c,";");}var m=a.shared,p=a.stats,q=m.current,n=m.timer;c=c.profile;var r,u;if(c){if(xa(c)){c.enable?(g(b),h(b.exit),k("true")):k("false");return}c=c.append(a,b);k(c);}else c=b.def(q,".profile");m=a.block();g(m);b("if(",c,"){",m,"}");a=a.block();h(a);b.exit("if(",c,"){",a,"}");}function ga(a,b,c,d,e){function f(a){switch(a){case 35664:case 35667:case 35671:return 2;case 35665:case 35668:case 35672:return 3;case 35666:case 35669:case 35673:return 4;
default:return 1}}function g(c,d,e){function f(){b("if(!",p,".buffer){",m,".enableVertexAttribArray(",l,");}");var c=e.type,g;g=e.size?b.def(e.size,"||",d):d;b("if(",p,".type!==",c,"||",p,".size!==",g,"||",n.map(function(a){return p+"."+a+"!=="+e[a]}).join("||"),"){",m,".bindBuffer(",34962,",",ha,".buffer);",m,".vertexAttribPointer(",[l,g,c,e.normalized,e.stride,e.offset],");",p,".type=",c,";",p,".size=",g,";",n.map(function(a){return p+"."+a+"="+e[a]+";"}).join(""),"}");W&&(c=e.divisor,b("if(",p,
".divisor!==",c,"){",a.instancing,".vertexAttribDivisorANGLE(",[l,c],");",p,".divisor=",c,";}"));}function k(){b("if(",p,".buffer){",m,".disableVertexAttribArray(",l,");",p,".buffer=null;","}if(",Da.map(function(a,b){return p+"."+a+"!=="+q[b]}).join("||"),"){",m,".vertexAttrib4f(",l,",",q,");",Da.map(function(a,b){return p+"."+a+"="+q[b]+";"}).join(""),"}");}var m=h.gl,l=b.def(c,".location"),p=b.def(h.attributes,"[",l,"]");c=e.state;var ha=e.buffer,q=[e.x,e.y,e.z,e.w],n=["buffer","normalized","offset",
"stride"];1===c?f():2===c?k():(b("if(",c,"===",1,"){"),f(),b("}else{"),k(),b("}"));}var h=a.shared;d.forEach(function(d){var h=d.name,k=c.attributes[h],m;if(k){if(!e(k))return;m=k.append(a,b);}else {if(!e(Ab))return;var l=a.scopeAttrib(h);m={};Object.keys(new ea).forEach(function(a){m[a]=b.def(l,".",a);});}g(a.link(d),f(d.info.type),m);});}function Q(a,c,d,e,f,g){for(var h=a.shared,k=h.gl,m={},l,p=0;p<e.length;++p){var q=e[p],n=q.name,r=q.info.type,u=q.info.size,t=d.uniforms[n];if(1<u){if(!t)continue;var v=
n.replace("[0]","");if(m[v])continue;m[v]=1;}var q=a.link(q)+".location",x;if(t){if(!f(t))continue;if(xa(t)){n=t.value;if(35678===r||35680===r)r=a.link(n._texture||n.color[0]._texture),c(k,".uniform1i(",q,",",r+".bind());"),c.exit(r,".unbind();");else if(35674===r||35675===r||35676===r)u=a.global.def("new Float32Array(["+Array.prototype.slice.call(n)+"])"),n=2,35675===r?n=3:35676===r&&(n=4),c(k,".uniformMatrix",n,"fv(",q,",false,",u,");");else {switch(r){case 5126:l="1f";break;case 35664:l="2f";break;
case 35665:l="3f";break;case 35666:l="4f";break;case 35670:l="1i";break;case 5124:l="1i";break;case 35671:l="2i";break;case 35667:l="2i";break;case 35672:l="3i";break;case 35668:l="3i";break;case 35673:l="4i";break;case 35669:l="4i";}1<u?(l+="v",n=a.global.def("["+Array.prototype.slice.call(n)+"]")):n=ra(n)?Array.prototype.slice.call(n):n;c(k,".uniform",l,"(",q,",",n,");");}continue}else x=t.append(a,c);}else {if(!f(Ab))continue;x=c.def(h.uniforms,"[",b.id(n),"]");}35678===r?c("if(",x,"&&",x,'._reglType==="framebuffer"){',
x,"=",x,".color[0];","}"):35680===r&&c("if(",x,"&&",x,'._reglType==="framebufferCube"){',x,"=",x,".color[0];","}");n=1;switch(r){case 35678:case 35680:r=c.def(x,"._texture");c(k,".uniform1i(",q,",",r,".bind());");c.exit(r,".unbind();");continue;case 5124:case 35670:l="1i";break;case 35667:case 35671:l="2i";n=2;break;case 35668:case 35672:l="3i";n=3;break;case 35669:case 35673:l="4i";n=4;break;case 5126:l="1f";break;case 35664:l="2f";n=2;break;case 35665:l="3f";n=3;break;case 35666:l="4f";n=4;break;
case 35674:l="Matrix2fv";break;case 35675:l="Matrix3fv";break;case 35676:l="Matrix4fv";}-1===l.indexOf("Matrix")&&1<u&&(l+="v",n=1);if("M"===l.charAt(0)){c(k,".uniform",l,"(",q,",");var q=Math.pow(r-35674+2,2),y=a.global.def("new Float32Array(",q,")");Array.isArray(x)?c("false,(",R(q,function(a){return y+"["+a+"]="+x[a]}),",",y,")"):c("false,(Array.isArray(",x,")||",x," instanceof Float32Array)?",x,":(",R(q,function(a){return y+"["+a+"]="+x+"["+a+"]"}),",",y,")");c(");");}else {if(1<n){for(var r=[],
w=[],u=0;u<n;++u)Array.isArray(x)?w.push(x[u]):w.push(c.def(x+"["+u+"]")),g&&r.push(c.def());g&&c("if(!",a.batchId,"||",r.map(function(a,b){return a+"!=="+w[b]}).join("||"),"){",r.map(function(a,b){return a+"="+w[b]+";"}).join(""));c(k,".uniform",l,"(",q,",",w.join(","),");");}else g&&(r=c.def(),c("if(!",a.batchId,"||",r,"!==",x,"){",r,"=",x,";")),c(k,".uniform",l,"(",q,",",x,");");g&&c("}");}}}function U(a,b,c,d){function e(f){var g=m[f];return g?g.contextDep&&d.contextDynamic||g.propDep?g.append(a,
c):g.append(a,b):b.def(k,".",f)}function f(){function a(){c(t,".drawElementsInstancedANGLE(",[n,r,x,q+"<<(("+x+"-5121)>>1)",u],");");}function b(){c(t,".drawArraysInstancedANGLE(",[n,q,r,u],");");}p&&"null"!==p?v?a():(c("if(",p,"){"),a(),c("}else{"),b(),c("}")):b();}function g(){function a(){c(l+".drawElements("+[n,r,x,q+"<<(("+x+"-5121)>>1)"]+");");}function b(){c(l+".drawArrays("+[n,q,r]+");");}p&&"null"!==p?v?a():(c("if(",p,"){"),a(),c("}else{"),b(),c("}")):b();}var h=a.shared,l=h.gl,k=h.draw,m=d.draw,
p=function(){var e=m.elements,f=b;if(e){if(e.contextDep&&d.contextDynamic||e.propDep)f=c;e=e.append(a,f);m.elementsActive&&f("if("+e+")"+l+".bindBuffer(34963,"+e+".buffer.buffer);");}else e=f.def(),f(e,"=",k,".","elements",";","if(",e,"){",l,".bindBuffer(",34963,",",e,".buffer.buffer);}","else if(",h.vao,".currentVAO){",e,"=",a.shared.elements+".getElements("+h.vao,".currentVAO.elements);",na?"":"if("+e+")"+l+".bindBuffer(34963,"+e+".buffer.buffer);","}");return e}(),n=e("primitive"),q=e("offset"),
r=function(){var e=m.count,f=b;if(e){if(e.contextDep&&d.contextDynamic||e.propDep)f=c;e=e.append(a,f);}else e=f.def(k,".","count");return e}();if("number"===typeof r){if(0===r)return}else c("if(",r,"){"),c.exit("}");var u,t;W&&(u=e("instances"),t=a.instancing);var x=p+".type",v=m.elements&&xa(m.elements)&&!m.vaoActive;W&&("number"!==typeof u||0<=u)?"string"===typeof u?(c("if(",u,">0){"),f(),c("}else if(",u,"<0){"),g(),c("}")):f():g();}function ca(a,b,c,d,e){b=P();e=b.proc("body",e);W&&(b.instancing=
e.def(b.shared.extensions,".angle_instanced_arrays"));a(b,e,c,d);return b.compile().body}function Z(a,b,c,d){N(a,b);c.useVAO?c.drawVAO?b(a.shared.vao,".setVAO(",c.drawVAO.append(a,b),");"):b(a.shared.vao,".setVAO(",a.shared.vao,".targetVAO);"):(b(a.shared.vao,".setVAO(null);"),ga(a,b,c,d.attributes,function(){return !0}));Q(a,b,c,d.uniforms,function(){return !0},!1);U(a,b,b,c);}function Fa(a,b){var c=a.proc("draw",1);N(a,c);ia(a,c,b.context);S(a,c,b.framebuffer);Aa(a,c,b);I(a,c,b.state);E(a,c,b,!1,!0);
var d=b.shader.progVar.append(a,c);c(a.shared.gl,".useProgram(",d,".program);");if(b.shader.program)Z(a,c,b,b.shader.program);else {c(a.shared.vao,".setVAO(null);");var e=a.global.def("{}"),f=c.def(d,".id"),g=c.def(e,"[",f,"]");c(a.cond(g).then(g,".call(this,a0);")["else"](g,"=",e,"[",f,"]=",a.link(function(c){return ca(Z,a,b,c,1)}),"(",d,");",g,".call(this,a0);"));}0<Object.keys(b.state).length&&c(a.shared.current,".dirty=true;");a.shared.vao&&c(a.shared.vao,".setVAO(null);");}function pa(a,b,c,d){function e(){return !0}
a.batchId="a1";N(a,b);ga(a,b,c,d.attributes,e);Q(a,b,c,d.uniforms,e,!1);U(a,b,b,c);}function qa(a,b,c,d){function e(a){return a.contextDep&&g||a.propDep}function f(a){return !e(a)}N(a,b);var g=c.contextDep,h=b.def(),l=b.def();a.shared.props=l;a.batchId=h;var k=a.scope(),m=a.scope();b(k.entry,"for(",h,"=0;",h,"<","a1",";++",h,"){",l,"=","a0","[",h,"];",m,"}",k.exit);c.needsContext&&ia(a,m,c.context);c.needsFramebuffer&&S(a,m,c.framebuffer);I(a,m,c.state,e);c.profile&&e(c.profile)&&E(a,m,c,!1,!0);d?(c.useVAO?
c.drawVAO?e(c.drawVAO)?m(a.shared.vao,".setVAO(",c.drawVAO.append(a,m),");"):k(a.shared.vao,".setVAO(",c.drawVAO.append(a,k),");"):k(a.shared.vao,".setVAO(",a.shared.vao,".targetVAO);"):(k(a.shared.vao,".setVAO(null);"),ga(a,k,c,d.attributes,f),ga(a,m,c,d.attributes,e)),Q(a,k,c,d.uniforms,f,!1),Q(a,m,c,d.uniforms,e,!0),U(a,k,m,c)):(b=a.global.def("{}"),d=c.shader.progVar.append(a,m),l=m.def(d,".id"),k=m.def(b,"[",l,"]"),m(a.shared.gl,".useProgram(",d,".program);","if(!",k,"){",k,"=",b,"[",l,"]=",
a.link(function(b){return ca(pa,a,c,b,2)}),"(",d,");}",k,".call(this,a0[",h,"],",h,");"));}function V(a,b){function c(a){return a.contextDep&&e||a.propDep}var d=a.proc("batch",2);a.batchId="0";N(a,d);var e=!1,f=!0;Object.keys(b.context).forEach(function(a){e=e||b.context[a].propDep;});e||(ia(a,d,b.context),f=!1);var g=b.framebuffer,h=!1;g?(g.propDep?e=h=!0:g.contextDep&&e&&(h=!0),h||S(a,d,g)):S(a,d,null);b.state.viewport&&b.state.viewport.propDep&&(e=!0);Aa(a,d,b);I(a,d,b.state,function(a){return !c(a)});
b.profile&&c(b.profile)||E(a,d,b,!1,"a1");b.contextDep=e;b.needsContext=f;b.needsFramebuffer=h;f=b.shader.progVar;if(f.contextDep&&e||f.propDep)qa(a,d,b,null);else if(f=f.append(a,d),d(a.shared.gl,".useProgram(",f,".program);"),b.shader.program)qa(a,d,b,b.shader.program);else {d(a.shared.vao,".setVAO(null);");var g=a.global.def("{}"),h=d.def(f,".id"),l=d.def(g,"[",h,"]");d(a.cond(l).then(l,".call(this,a0,a1);")["else"](l,"=",g,"[",h,"]=",a.link(function(c){return ca(qa,a,b,c,2)}),"(",f,");",l,".call(this,a0,a1);"));}0<
Object.keys(b.state).length&&d(a.shared.current,".dirty=true;");a.shared.vao&&d(a.shared.vao,".setVAO(null);");}function ka(a,c){function d(b){var g=c.shader[b];g&&e.set(f.shader,"."+b,g.append(a,e));}var e=a.proc("scope",3);a.batchId="a2";var f=a.shared,g=f.current;ia(a,e,c.context);c.framebuffer&&c.framebuffer.append(a,e);yb(Object.keys(c.state)).forEach(function(b){var d=c.state[b].append(a,e);ra(d)?d.forEach(function(c,d){e.set(a.next[b],"["+d+"]",c);}):e.set(f.next,"."+b,d);});E(a,e,c,!0,!0);["elements",
"offset","count","instances","primitive"].forEach(function(b){var d=c.draw[b];d&&e.set(f.draw,"."+b,""+d.append(a,e));});Object.keys(c.uniforms).forEach(function(d){var g=c.uniforms[d].append(a,e);Array.isArray(g)&&(g="["+g.join()+"]");e.set(f.uniforms,"["+b.id(d)+"]",g);});Object.keys(c.attributes).forEach(function(b){var d=c.attributes[b].append(a,e),f=a.scopeAttrib(b);Object.keys(new ea).forEach(function(a){e.set(f,"."+a,d[a]);});});c.scopeVAO&&e.set(f.vao,".targetVAO",c.scopeVAO.append(a,e));d("vert");
d("frag");0<Object.keys(c.state).length&&(e(g,".dirty=true;"),e.exit(g,".dirty=true;"));e("a1(",a.shared.context,",a0,",a.batchId,");");}function la(a){if("object"===typeof a&&!ra(a)){for(var b=Object.keys(a),c=0;c<b.length;++c)if(Y.isDynamic(a[b[c]]))return !0;return !1}}function aa(a,b,c){function d(a,b){g.forEach(function(c){var d=e[c];Y.isDynamic(d)&&(d=a.invoke(b,d),b(m,".",c,"=",d,";"));});}var e=b["static"][c];if(e&&la(e)){var f=a.global,g=Object.keys(e),h=!1,l=!1,k=!1,m=a.global.def("{}");g.forEach(function(b){var c=
e[b];if(Y.isDynamic(c))"function"===typeof c&&(c=e[b]=Y.unbox(c)),b=K(c,null),h=h||b.thisDep,k=k||b.propDep,l=l||b.contextDep;else {f(m,".",b,"=");switch(typeof c){case "number":f(c);break;case "string":f('"',c,'"');break;case "object":Array.isArray(c)&&f("[",c.join(),"]");break;default:f(a.link(c));}f(";");}});b.dynamic[c]=new Y.DynamicVariable(4,{thisDep:h,contextDep:l,propDep:k,ref:m,append:d});delete b["static"][c];}}var ea=k.Record,fa={add:32774,subtract:32778,"reverse subtract":32779};c.ext_blend_minmax&&
(fa.min=32775,fa.max=32776);var W=c.angle_instanced_arrays,Ma=c.webgl_draw_buffers,na=c.oes_vertex_array_object,ta={dirty:!0,profile:g.profile},Ea={},Na=[],ua={},va={};r("dither",3024);r("blend.enable",3042);p("blend.color","blendColor",[0,0,0,0]);p("blend.equation","blendEquationSeparate",[32774,32774]);p("blend.func","blendFuncSeparate",[1,0,1,0]);r("depth.enable",2929,!0);p("depth.func","depthFunc",513);p("depth.range","depthRange",[0,1]);p("depth.mask","depthMask",!0);p("colorMask","colorMask",
[!0,!0,!0,!0]);r("cull.enable",2884);p("cull.face","cullFace",1029);p("frontFace","frontFace",2305);p("lineWidth","lineWidth",1);r("polygonOffset.enable",32823);p("polygonOffset.offset","polygonOffset",[0,0]);r("sample.alpha",32926);r("sample.enable",32928);p("sample.coverage","sampleCoverage",[1,!1]);r("stencil.enable",2960);p("stencil.mask","stencilMask",-1);p("stencil.func","stencilFunc",[519,0,-1]);p("stencil.opFront","stencilOpSeparate",[1028,7680,7680,7680]);p("stencil.opBack","stencilOpSeparate",
[1029,7680,7680,7680]);r("scissor.enable",3089);p("scissor.box","scissor",[0,0,a.drawingBufferWidth,a.drawingBufferHeight]);p("viewport","viewport",[0,0,a.drawingBufferWidth,a.drawingBufferHeight]);var tb={gl:a,context:x,strings:b,next:Ea,current:ta,draw:m,elements:d,buffer:f,shader:u,attributes:k.state,vao:k,uniforms:v,framebuffer:n,extensions:c,timer:l,isBufferArgs:Sa},Pa={primTypes:Ka,compareFuncs:ab,blendFuncs:Ga,blendEquations:fa,stencilOps:Ta,glTypes:Ja,orientationType:zb};Ma&&(Pa.backBuffer=
[1029],Pa.drawBuffer=R(e.maxDrawbuffers,function(a){return 0===a?[0]:R(a,function(a){return 36064+a})}));var sa=0;return {next:Ea,current:ta,procs:function(){var a=P(),b=a.proc("poll"),d=a.proc("refresh"),f=a.block();b(f);d(f);var g=a.shared,h=g.gl,l=g.next,k=g.current;f(k,".dirty=false;");S(a,b);S(a,d,null,!0);var m;W&&(m=a.link(W));c.oes_vertex_array_object&&d(a.link(c.oes_vertex_array_object),".bindVertexArrayOES(null);");for(var p=0;p<e.maxAttributes;++p){var n=d.def(g.attributes,"[",p,"]"),q=
a.cond(n,".buffer");q.then(h,".enableVertexAttribArray(",p,");",h,".bindBuffer(",34962,",",n,".buffer.buffer);",h,".vertexAttribPointer(",p,",",n,".size,",n,".type,",n,".normalized,",n,".stride,",n,".offset);")["else"](h,".disableVertexAttribArray(",p,");",h,".vertexAttrib4f(",p,",",n,".x,",n,".y,",n,".z,",n,".w);",n,".buffer=null;");d(q);W&&d(m,".vertexAttribDivisorANGLE(",p,",",n,".divisor);");}d(a.shared.vao,".currentVAO=null;",a.shared.vao,".setVAO(",a.shared.vao,".targetVAO);");Object.keys(ua).forEach(function(c){var e=
ua[c],g=f.def(l,".",c),m=a.block();m("if(",g,"){",h,".enable(",e,")}else{",h,".disable(",e,")}",k,".",c,"=",g,";");d(m);b("if(",g,"!==",k,".",c,"){",m,"}");});Object.keys(va).forEach(function(c){var e=va[c],g=ta[c],m,p,n=a.block();n(h,".",e,"(");ra(g)?(e=g.length,m=a.global.def(l,".",c),p=a.global.def(k,".",c),n(R(e,function(a){return m+"["+a+"]"}),");",R(e,function(a){return p+"["+a+"]="+m+"["+a+"];"}).join("")),b("if(",R(e,function(a){return m+"["+a+"]!=="+p+"["+a+"]"}).join("||"),"){",n,"}")):(m=
f.def(l,".",c),p=f.def(k,".",c),n(m,");",k,".",c,"=",m,";"),b("if(",m,"!==",p,"){",n,"}"));d(n);});return a.compile()}(),compile:function(a,b,c,d,e){var f=P();f.stats=f.link(e);Object.keys(b["static"]).forEach(function(a){aa(f,b,a);});Xb.forEach(function(b){aa(f,a,b);});var g=A(a,b,c,d,f);Fa(f,g);ka(f,g);V(f,g);return L(f.compile(),{destroy:function(){g.shader.program.destroy();}})}}}function Bb(a,b){for(var c=0;c<a.length;++c)if(a[c]===b)return c;return -1}var L=function(a,b){for(var c=Object.keys(b),
e=0;e<c.length;++e)a[c[e]]=b[c[e]];return a},Db=0,Y={DynamicVariable:Z,define:function(a,b){return new Z(a,cb(b+""))},isDynamic:function(a){return "function"===typeof a&&!a._reglType||a instanceof Z},unbox:db,accessor:cb},bb={next:"function"===typeof requestAnimationFrame?function(a){return requestAnimationFrame(a)}:function(a){return setTimeout(a,16)},cancel:"function"===typeof cancelAnimationFrame?function(a){return cancelAnimationFrame(a)}:clearTimeout},Cb="undefined"!==typeof performance&&performance.now?
function(){return performance.now()}:function(){return +new Date},G=hb();G.zero=hb();var Yb=function(a,b){var c=1;b.ext_texture_filter_anisotropic&&(c=a.getParameter(34047));var e=1,f=1;b.webgl_draw_buffers&&(e=a.getParameter(34852),f=a.getParameter(36063));var d=!!b.oes_texture_float;if(d){d=a.createTexture();a.bindTexture(3553,d);a.texImage2D(3553,0,6408,1,1,0,6408,5126,null);var q=a.createFramebuffer();a.bindFramebuffer(36160,q);a.framebufferTexture2D(36160,36064,3553,d,0);a.bindTexture(3553,null);
if(36053!==a.checkFramebufferStatus(36160))d=!1;else {a.viewport(0,0,1,1);a.clearColor(1,0,0,1);a.clear(16384);var n=G.allocType(5126,4);a.readPixels(0,0,1,1,6408,5126,n);a.getError()?d=!1:(a.deleteFramebuffer(q),a.deleteTexture(d),d=1===n[0]);G.freeType(n);}}n=!0;"undefined"!==typeof navigator&&(/MSIE/.test(navigator.userAgent)||/Trident\//.test(navigator.appVersion)||/Edge/.test(navigator.userAgent))||(n=a.createTexture(),q=G.allocType(5121,36),a.activeTexture(33984),a.bindTexture(34067,n),a.texImage2D(34069,
0,6408,3,3,0,6408,5121,q),G.freeType(q),a.bindTexture(34067,null),a.deleteTexture(n),n=!a.getError());return {colorBits:[a.getParameter(3410),a.getParameter(3411),a.getParameter(3412),a.getParameter(3413)],depthBits:a.getParameter(3414),stencilBits:a.getParameter(3415),subpixelBits:a.getParameter(3408),extensions:Object.keys(b).filter(function(a){return !!b[a]}),maxAnisotropic:c,maxDrawbuffers:e,maxColorAttachments:f,pointSizeDims:a.getParameter(33901),lineWidthDims:a.getParameter(33902),maxViewportDims:a.getParameter(3386),
maxCombinedTextureUnits:a.getParameter(35661),maxCubeMapSize:a.getParameter(34076),maxRenderbufferSize:a.getParameter(34024),maxTextureUnits:a.getParameter(34930),maxTextureSize:a.getParameter(3379),maxAttributes:a.getParameter(34921),maxVertexUniforms:a.getParameter(36347),maxVertexTextureUnits:a.getParameter(35660),maxVaryingVectors:a.getParameter(36348),maxFragmentUniforms:a.getParameter(36349),glsl:a.getParameter(35724),renderer:a.getParameter(7937),vendor:a.getParameter(7936),version:a.getParameter(7938),
readFloat:d,npotTextureCube:n}},O=function(a){return a instanceof Uint8Array||a instanceof Uint16Array||a instanceof Uint32Array||a instanceof Int8Array||a instanceof Int16Array||a instanceof Int32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof Uint8ClampedArray},I=function(a){return Object.keys(a).map(function(b){return a[b]})},Qa={shape:function(a){for(var b=[];a.length;a=a[0])b.push(a.length);return b},flatten:function(a,b,c,e){var f=1;if(b.length)for(var d=0;d<b.length;++d)f*=
b[d];else f=0;c=e||G.allocType(c,f);switch(b.length){case 0:break;case 1:e=b[0];for(b=0;b<e;++b)c[b]=a[b];break;case 2:e=b[0];b=b[1];for(d=f=0;d<e;++d)for(var q=a[d],n=0;n<b;++n)c[f++]=q[n];break;case 3:ib(a,b[0],b[1],b[2],c,0);break;default:jb(a,b,0,c,0);}return c}},Ia={"[object Int8Array]":5120,"[object Int16Array]":5122,"[object Int32Array]":5124,"[object Uint8Array]":5121,"[object Uint8ClampedArray]":5121,"[object Uint16Array]":5123,"[object Uint32Array]":5125,"[object Float32Array]":5126,"[object Float64Array]":5121,
"[object ArrayBuffer]":5121},Ja={int8:5120,int16:5122,int32:5124,uint8:5121,uint16:5123,uint32:5125,"float":5126,float32:5126},nb={dynamic:35048,stream:35040,"static":35044},Ua=Qa.flatten,mb=Qa.shape,na=[];na[5120]=1;na[5122]=2;na[5124]=4;na[5121]=1;na[5123]=2;na[5125]=4;na[5126]=4;var Ka={points:0,point:0,lines:1,line:1,triangles:4,triangle:4,"line loop":2,"line strip":3,"triangle strip":5,"triangle fan":6},pb=new Float32Array(1),Lb=new Uint32Array(pb.buffer),Pb=[9984,9986,9985,9987],Oa=[0,6409,
6410,6407,6408],U={};U[6409]=U[6406]=U[6402]=1;U[34041]=U[6410]=2;U[6407]=U[35904]=3;U[6408]=U[35906]=4;var Xa=sa("HTMLCanvasElement"),Ya=sa("OffscreenCanvas"),ub=sa("CanvasRenderingContext2D"),vb=sa("ImageBitmap"),wb=sa("HTMLImageElement"),xb=sa("HTMLVideoElement"),Mb=Object.keys(Ia).concat([Xa,Ya,ub,vb,wb,xb]),za=[];za[5121]=1;za[5126]=4;za[36193]=2;za[5123]=2;za[5125]=4;var C=[];C[32854]=2;C[32855]=2;C[36194]=2;C[34041]=4;C[33776]=.5;C[33777]=.5;C[33778]=1;C[33779]=1;C[35986]=.5;C[35987]=1;C[34798]=
1;C[35840]=.5;C[35841]=.25;C[35842]=.5;C[35843]=.25;C[36196]=.5;var Q=[];Q[32854]=2;Q[32855]=2;Q[36194]=2;Q[33189]=2;Q[36168]=1;Q[34041]=4;Q[35907]=4;Q[34836]=16;Q[34842]=8;Q[34843]=6;var Zb=function(a,b,c,e,f){function d(a){this.id=k++;this.refCount=1;this.renderbuffer=a;this.format=32854;this.height=this.width=0;f.profile&&(this.stats={size:0});}function q(b){var c=b.renderbuffer;a.bindRenderbuffer(36161,null);a.deleteRenderbuffer(c);b.renderbuffer=null;b.refCount=0;delete u[b.id];e.renderbufferCount--;}
var n={rgba4:32854,rgb565:36194,"rgb5 a1":32855,depth:33189,stencil:36168,"depth stencil":34041};b.ext_srgb&&(n.srgba=35907);b.ext_color_buffer_half_float&&(n.rgba16f=34842,n.rgb16f=34843);b.webgl_color_buffer_float&&(n.rgba32f=34836);var v=[];Object.keys(n).forEach(function(a){v[n[a]]=a;});var k=0,u={};d.prototype.decRef=function(){0>=--this.refCount&&q(this);};f.profile&&(e.getTotalRenderbufferSize=function(){var a=0;Object.keys(u).forEach(function(b){a+=u[b].stats.size;});return a});return {create:function(b,
c){function l(b,c){var d=0,e=0,k=32854;"object"===typeof b&&b?("shape"in b?(e=b.shape,d=e[0]|0,e=e[1]|0):("radius"in b&&(d=e=b.radius|0),"width"in b&&(d=b.width|0),"height"in b&&(e=b.height|0)),"format"in b&&(k=n[b.format])):"number"===typeof b?(d=b|0,e="number"===typeof c?c|0:d):b||(d=e=1);if(d!==g.width||e!==g.height||k!==g.format)return l.width=g.width=d,l.height=g.height=e,g.format=k,a.bindRenderbuffer(36161,g.renderbuffer),a.renderbufferStorage(36161,k,d,e),f.profile&&(g.stats.size=Q[g.format]*
g.width*g.height),l.format=v[g.format],l}var g=new d(a.createRenderbuffer());u[g.id]=g;e.renderbufferCount++;l(b,c);l.resize=function(b,c){var d=b|0,e=c|0||d;if(d===g.width&&e===g.height)return l;l.width=g.width=d;l.height=g.height=e;a.bindRenderbuffer(36161,g.renderbuffer);a.renderbufferStorage(36161,g.format,d,e);f.profile&&(g.stats.size=Q[g.format]*g.width*g.height);return l};l._reglType="renderbuffer";l._renderbuffer=g;f.profile&&(l.stats=g.stats);l.destroy=function(){g.decRef();};return l},clear:function(){I(u).forEach(q);},
restore:function(){I(u).forEach(function(b){b.renderbuffer=a.createRenderbuffer();a.bindRenderbuffer(36161,b.renderbuffer);a.renderbufferStorage(36161,b.format,b.width,b.height);});a.bindRenderbuffer(36161,null);}}},Za=[];Za[6408]=4;Za[6407]=3;var Ra=[];Ra[5121]=1;Ra[5126]=4;Ra[36193]=2;var Da=["x","y","z","w"],Xb="blend.func blend.equation stencil.func stencil.opFront stencil.opBack sample.coverage viewport scissor.box polygonOffset.offset".split(" "),Ga={0:0,1:1,zero:0,one:1,"src color":768,"one minus src color":769,
"src alpha":770,"one minus src alpha":771,"dst color":774,"one minus dst color":775,"dst alpha":772,"one minus dst alpha":773,"constant color":32769,"one minus constant color":32770,"constant alpha":32771,"one minus constant alpha":32772,"src alpha saturate":776},ab={never:512,less:513,"<":513,equal:514,"=":514,"==":514,"===":514,lequal:515,"<=":515,greater:516,">":516,notequal:517,"!=":517,"!==":517,gequal:518,">=":518,always:519},Ta={0:0,zero:0,keep:7680,replace:7681,increment:7682,decrement:7683,
"increment wrap":34055,"decrement wrap":34056,invert:5386},zb={cw:2304,ccw:2305},Ab=new J(!1,!1,!1,function(){}),$b=function(a,b){function c(){this.endQueryIndex=this.startQueryIndex=-1;this.sum=0;this.stats=null;}function e(a,b,d){var e=q.pop()||new c;e.startQueryIndex=a;e.endQueryIndex=b;e.sum=0;e.stats=d;n.push(e);}if(!b.ext_disjoint_timer_query)return null;var f=[],d=[],q=[],n=[],v=[],k=[];return {beginQuery:function(a){var c=f.pop()||b.ext_disjoint_timer_query.createQueryEXT();b.ext_disjoint_timer_query.beginQueryEXT(35007,
c);d.push(c);e(d.length-1,d.length,a);},endQuery:function(){b.ext_disjoint_timer_query.endQueryEXT(35007);},pushScopeStats:e,update:function(){var a,c;a=d.length;if(0!==a){k.length=Math.max(k.length,a+1);v.length=Math.max(v.length,a+1);v[0]=0;var e=k[0]=0;for(c=a=0;c<d.length;++c){var l=d[c];b.ext_disjoint_timer_query.getQueryObjectEXT(l,34919)?(e+=b.ext_disjoint_timer_query.getQueryObjectEXT(l,34918),f.push(l)):d[a++]=l;v[c+1]=e;k[c+1]=a;}d.length=a;for(c=a=0;c<n.length;++c){var e=n[c],g=e.startQueryIndex,
l=e.endQueryIndex;e.sum+=v[l]-v[g];g=k[g];l=k[l];l===g?(e.stats.gpuTime+=e.sum/1E6,q.push(e)):(e.startQueryIndex=g,e.endQueryIndex=l,n[a++]=e);}n.length=a;}},getNumPendingQueries:function(){return d.length},clear:function(){f.push.apply(f,d);for(var a=0;a<f.length;a++)b.ext_disjoint_timer_query.deleteQueryEXT(f[a]);d.length=0;f.length=0;},restore:function(){d.length=0;f.length=0;}}};return function(a){function b(){if(0===E.length)t&&t.update(),ca=null;else {ca=bb.next(b);u();for(var a=E.length-1;0<=a;--a){var c=
E[a];c&&c(H,null,0);}l.flush();t&&t.update();}}function c(){!ca&&0<E.length&&(ca=bb.next(b));}function e(){ca&&(bb.cancel(b),ca=null);}function f(a){a.preventDefault();e();R.forEach(function(a){a();});}function d(a){l.getError();h.restore();F.restore();y.restore();A.restore();O.restore();S.restore();K.restore();t&&t.restore();I.procs.refresh();c();U.forEach(function(a){a();});}function q(a){function b(a,c){var d={},e={};Object.keys(a).forEach(function(b){var f=a[b];if(Y.isDynamic(f))e[b]=Y.unbox(f,b);else {if(c&&
Array.isArray(f))for(var g=0;g<f.length;++g)if(Y.isDynamic(f[g])){e[b]=Y.unbox(f,b);return}d[b]=f;}});return {dynamic:e,"static":d}}function c(a){for(;n.length<a;)n.push(null);return n}var d=b(a.context||{},!0),e=b(a.uniforms||{},!0),f=b(a.attributes||{},!1);a=b(function(a){function b(a){if(a in c){var d=c[a];delete c[a];Object.keys(d).forEach(function(b){c[a+"."+b]=d[b];});}}var c=L({},a);delete c.uniforms;delete c.attributes;delete c.context;delete c.vao;"stencil"in c&&c.stencil.op&&(c.stencil.opBack=
c.stencil.opFront=c.stencil.op,delete c.stencil.op);b("blend");b("depth");b("cull");b("stencil");b("polygonOffset");b("scissor");b("sample");"vao"in a&&(c.vao=a.vao);return c}(a),!1);var g={gpuTime:0,cpuTime:0,count:0},h=I.compile(a,f,e,d,g),k=h.draw,l=h.batch,m=h.scope,n=[];return L(function(a,b){var d;if("function"===typeof a)return m.call(this,null,a,0);if("function"===typeof b)if("number"===typeof a)for(d=0;d<a;++d)m.call(this,null,b,d);else if(Array.isArray(a))for(d=0;d<a.length;++d)m.call(this,
a[d],b,d);else return m.call(this,a,b,0);else if("number"===typeof a){if(0<a)return l.call(this,c(a|0),a|0)}else if(Array.isArray(a)){if(a.length)return l.call(this,a,a.length)}else return k.call(this,a)},{stats:g,destroy:function(){h.destroy();}})}function n(a,b){var c=0;I.procs.poll();var d=b.color;d&&(l.clearColor(+d[0]||0,+d[1]||0,+d[2]||0,+d[3]||0),c|=16384);"depth"in b&&(l.clearDepth(+b.depth),c|=256);"stencil"in b&&(l.clearStencil(b.stencil|0),c|=1024);l.clear(c);}function v(a){E.push(a);c();
return {cancel:function(){function b(){var a=Bb(E,b);E[a]=E[E.length-1];--E.length;0>=E.length&&e();}var c=Bb(E,a);E[c]=b;}}}function k(){var a=Q.viewport,b=Q.scissor_box;a[0]=a[1]=b[0]=b[1]=0;H.viewportWidth=H.framebufferWidth=H.drawingBufferWidth=a[2]=b[2]=l.drawingBufferWidth;H.viewportHeight=H.framebufferHeight=H.drawingBufferHeight=a[3]=b[3]=l.drawingBufferHeight;}function u(){H.tick+=1;H.time=x();k();I.procs.poll();}function m(){A.refresh();k();I.procs.refresh();t&&t.update();}function x(){return (Cb()-
G)/1E3}a=Hb(a);if(!a)return null;var l=a.gl,g=l.getContextAttributes();l.isContextLost();var h=Ib(l,a);if(!h)return null;var r=Eb(),p={vaoCount:0,bufferCount:0,elementsCount:0,framebufferCount:0,shaderCount:0,textureCount:0,cubeCount:0,renderbufferCount:0,maxTextureUnits:0},w=h.extensions,t=$b(l,w),G=Cb(),C=l.drawingBufferWidth,J=l.drawingBufferHeight,H={tick:0,time:0,viewportWidth:C,viewportHeight:J,framebufferWidth:C,framebufferHeight:J,drawingBufferWidth:C,drawingBufferHeight:J,pixelRatio:a.pixelRatio},
C={elements:null,primitive:4,count:-1,offset:0,instances:-1},M=Yb(l,w),y=Jb(l,p,a,function(a){return K.destroyBuffer(a)}),T=Kb(l,w,y,p),K=Sb(l,w,M,p,y,T,C),F=Tb(l,r,p,a),A=Nb(l,w,M,function(){I.procs.poll();},H,p,a),O=Zb(l,w,M,p,a),S=Rb(l,w,M,A,O,p),I=Wb(l,r,w,M,y,T,A,S,{},K,F,C,H,t,a),r=Ub(l,S,I.procs.poll,H),Q=I.next,N=l.canvas,E=[],R=[],U=[],Z=[a.onDestroy],ca=null;N&&(N.addEventListener("webglcontextlost",f,!1),N.addEventListener("webglcontextrestored",d,!1));var aa=S.setFBO=q({framebuffer:Y.define.call(null,
1,"framebuffer")});m();g=L(q,{clear:function(a){if("framebuffer"in a)if(a.framebuffer&&"framebufferCube"===a.framebuffer_reglType)for(var b=0;6>b;++b)aa(L({framebuffer:a.framebuffer.faces[b]},a),n);else aa(a,n);else n(null,a);},prop:Y.define.bind(null,1),context:Y.define.bind(null,2),"this":Y.define.bind(null,3),draw:q({}),buffer:function(a){return y.create(a,34962,!1,!1)},elements:function(a){return T.create(a,!1)},texture:A.create2D,cube:A.createCube,renderbuffer:O.create,framebuffer:S.create,framebufferCube:S.createCube,
vao:K.createVAO,attributes:g,frame:v,on:function(a,b){var c;switch(a){case "frame":return v(b);case "lost":c=R;break;case "restore":c=U;break;case "destroy":c=Z;}c.push(b);return {cancel:function(){for(var a=0;a<c.length;++a)if(c[a]===b){c[a]=c[c.length-1];c.pop();break}}}},limits:M,hasExtension:function(a){return 0<=M.extensions.indexOf(a.toLowerCase())},read:r,destroy:function(){E.length=0;e();N&&(N.removeEventListener("webglcontextlost",f),N.removeEventListener("webglcontextrestored",d));F.clear();
S.clear();O.clear();K.clear();A.clear();T.clear();y.clear();t&&t.clear();Z.forEach(function(a){a();});},_gl:l,_refresh:m,poll:function(){u();t&&t.update();},now:x,stats:p});a.onDone(null,g);return g}});
}(regl_min));

var createREGL = regl_min.exports;

class ReglViewerInstance {
  constructor({ canvas, pixelRatio, control }) {
    this.config = defaultConfig;
    this.control = control;
    this.regl = createREGL({
      canvas,
      attributes: {
        preserveDrawingBuffer: true,
        antialiasing: true
      },
      pixelRatio,
      extensions: [
        'angle_instanced_arrays',
        'oes_texture_float',
        'OES_standard_derivatives',
        'OES_texture_half_float',
        'EXT_color_buffer_half_float'
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
  resize() {
    this.regl.poll();
    this.isDirty = true;
  }
  destroy() {
    this.regl.destroy();
  }
  init(regl) {
    this.regl._commands = [];
    this.camera = freeCameraFactory(this.regl, {
      ...this.config.view.camera,
      aspectRatio:
        this.regl._gl.canvas.clientWidth / this.regl._gl.canvas.clientHeight
    });
    this.initStory();
    this.drawTexture = drawTextureCommand(regl);
    this.config.model.lattice = new Lattice(this.config.model.lattice);
    this.view = new BoxesViewSimple(regl, {
      variables: this.variables,
      model: this.config.model,
      view: this.config.view,
      debug: this.config.debug
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
      () => {}
    );
    this.variables = this.story.getState().scene.variables;
    this.model = this.story.getState().scene.model;
  }
  run(regl) {
    this.loop = regl.frame(({ time, tick }) => {
      const storyState = this.story.getState();
      if (storyState.scene.loaded) {
        let sceneProgress;
        let viewRange;
        sceneProgress = storyState.sceneProgress;
        const autoLoop =
          storyState.scene.pathicles && storyState.scene.pathicles.autoLoop;
        if (autoLoop) {
          if (tick % 127 === 0) {
            this.modelTranslateX = boundedRandom() * 0.1;
            this.modelTranslateY = boundedRandom() * 0.1;
          }
          viewRange = [(time % 2) - 0.5, (time % 2) + 0.1];
          this.modelTranslateX = 0;
          this.modelTranslateY = 0;
        }
        this.camera.params.phi =
          storyState.scene.cameraBSplines.phi(sceneProgress)[0];
        this.camera.params.distance =
          storyState.scene.cameraBSplines.distance(sceneProgress)[0];
        this.camera.params.theta =
          storyState.scene.cameraBSplines.theta(sceneProgress)[0];
        this.camera.params.center = [
          storyState.scene.cameraBSplines.centerX(sceneProgress)[0],
          storyState.scene.cameraBSplines.centerY(sceneProgress)[0],
          storyState.scene.cameraBSplines.centerZ(sceneProgress)[0]
        ];
        this.camera.tick();
        if (autoLoop || this.camera.state.dirty) {
          this.camera.setCameraUniforms(
            {
              ...this.camera,
              scene: storyState.scene,
              sceneProgress
            },
            () => {
              regl.clear({
                color: [0, 0, 0, 0],
                depth: 1
              });
              this.view.drawDiffuse({
                colorCorrections: storyState.scene.variables.colorCorrections,
                particleColorsAndTypes:
                  storyState.scene.variables.particleColorsAndTypes,
                position: storyState.scene.variables.position.buffers[0],
                modelTranslateX: this.modelTranslateX,
                modelTranslateY: this.modelTranslateY,
                viewRange
              });
              if (this.config.debug.showTextures) {
                this.drawTexture({
                  texture: storyState.scene.variables.position.buffers[0],
                  x0: 0
                });
              }
            }
          );
        }
      }
    });
  }
}

export { ReglSimulatorInstance, ReglViewerInstance };
