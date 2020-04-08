import Debug from 'debug';
import REGL from 'regl';

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

var rotateY_1 = rotateY;
function rotateY(out, a, b, c){
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

var rotateX_1 = rotateX;
function rotateX(out, a, b, c){
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
function equals(a, b) {
  var a0 = a[0];
  var a1 = a[1];
  var a2 = a[2];
  var b0 = b[0];
  var b1 = b[1];
  var b2 = b[2];
  return (Math.abs(a0 - b0) <= epsilon * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
          Math.abs(a1 - b1) <= epsilon * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
          Math.abs(a2 - b2) <= epsilon * Math.max(1.0, Math.abs(a2), Math.abs(b2)))
}

var add_1 = add;
function add(out, a, b) {
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

var copy_1 = copy;
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
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

var MAX_PHI = Math.PI * 0.5 - 1e-4;
var MIN_PHI = -Math.PI * 0.5 + 1e-4;
var inertialTurntableCamera = function createCamera (opts) {
  opts = opts || {};
  var willBeDirty = true;
  var params = {
    aspectRatio: opts.aspectRatio ? opts.aspectRatio : 1,
    zoomAboutCursor: opts.zoomAboutCursor === undefined ? true : opts.zoomAboutCursor,
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
    rotationCenter: opts.rotationCenter || opts.center && opts.center.slice() || new Float32Array(3),
    zoom: 0,
    panX: 0,
    panY: 0,
    panZ: 0,
    pitch: 0,
    yaw: 0,
    dTheta: 0,
    dPhi: 0,
    mouseX: 0,
    mouseY: 0,
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
    zoom: zoom,
  };
  camera.state = {
  };
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
  function storeCurrentState () {
    copy_1(previousState.up, params.up);
    copy_1(previousState.center, params.center);
    previousState.near = params.near;
    previousState.far = params.far;
    previousState.distance = params.distance;
    previousState.phi = params.phi;
    previousState.theta = params.theta;
    previousState.fovY = params.fovY;
  }
  function paramsVectorHasChanged () {
    if (!equals_1(params.up, previousState.up)) return true;
    if (!equals_1(params.center, previousState.center)) return true;
    if (params.near !== previousState.near) return true;
    if (params.far !== previousState.far) return true;
    if (params.phi !== previousState.phi) return true;
    if (params.theta !== previousState.theta) return true;
    if (params.distance !== previousState.distance) return true;
    if (params.fovY !== previousState.fovY) return true;
    return false;
  }
  var paramsChanges = {};
  function applyStateChanges () {
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
  function computeMatrices () {
    camera.state.eye[0] = 0;
    camera.state.eye[1] = 0;
    camera.state.eye[2] = params.distance;
    rotateX_1(camera.state.eye, camera.state.eye, origin, -params.phi);
    rotateY_1(camera.state.eye, camera.state.eye, origin, params.theta);
    add_1(camera.state.eye, camera.state.eye, params.center);
    lookAt_1(camera.state.view, camera.state.eye, params.center, params.up);
    perspective_1(camera.state.projection, params.fovY, camera.params.aspectRatio, params.near, params.far);
    invert_1(camera.state.viewInv, camera.state.view);
  }
  function taint () {
    willBeDirty = true;
  }
  function resize (aspectRatio) {
    camera.params.aspectRatio = aspectRatio;
    computeMatrices();
    taint();
  }
  function viewIsChanging () {
    if (Math.abs(params.zoom) > 1e-4) return true;
    if (Math.abs(params.panX) > 1e-4) return true;
    if (Math.abs(params.panY) > 1e-4) return true;
    if (Math.abs(params.panZ) > 1e-4) return true;
    if (Math.abs(params.dTheta) > 1e-4) return true;
    if (Math.abs(params.dPhi) > 1e-4) return true;
    if (Math.abs(params.yaw) > 1e-4) return true;
    if (Math.abs(params.pitch) > 1e-4) return true;
  }
  function zeroChanges (obj) {
    obj.zoom = 0;
    obj.dTheta = 0;
    obj.dPhi = 0;
    obj.panX = 0;
    obj.panY = 0;
    obj.panZ = 0;
    obj.yaw = 0;
    obj.pitch = 0;
  }
  function decay (dt) {
    var panDecay = params.panDecayTime ? Math.exp(-dt / params.panDecayTime / Math.LN2) : 0;
    var zoomDecay = params.zoomDecayTime ? Math.exp(-dt / params.zoomDecayTime / Math.LN2) : 0;
    var rotateDecay = params.rotationDecayTime ? Math.exp(-dt / params.rotationDecayTime / Math.LN2) : 0;
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
  function pan (panX, panY) {
    var scaleFactor = camera.params.distance * Math.tan(camera.params.fovY * 0.5) * 2.0;
    accumulator.panX += panX * params.aspectRatio * scaleFactor;
    accumulator.panY += panY * scaleFactor;
    return camera;
  }
  function zoom (mouseX, mouseY, zoom) {
    accumulator.zoom += zoom;
    params.mouseX = mouseX;
    params.mouseY = mouseY;
    return camera;
  }
  function pivot (yaw, pitch) {
    var scaleFactor = camera.params.fovY;
    accumulator.yaw += yaw * scaleFactor * params.aspectRatio;
    accumulator.pitch += pitch * scaleFactor;
  }
  function rotate (dTheta, dPhi) {
    accumulator.dTheta += dTheta;
    accumulator.dPhi += dPhi;
  }
  function applyViewChanges (changes) {
    var zoomScaleFactor;
    identity_1(dView);
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
    scale_1(dView, dView, tmp);
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
      copy_1(params.rotationCenter, params.center);
    }
    params.distance *= 1 + changes.zoom;
    var prevPhi = params.phi;
    params.phi += changes.dPhi;
    params.phi = Math.min(MAX_PHI, Math.max(MIN_PHI, params.phi));
    var dPhi = params.phi - prevPhi;
    var prevTheta = params.theta;
    params.theta += changes.dTheta;
    var dTheta = params.theta - prevTheta;
    rotateY_1(params.center, params.center, params.rotationCenter, dTheta - params.theta);
    rotateX_1(params.center, params.center, params.rotationCenter, -dPhi);
    rotateY_1(params.center, params.center, params.rotationCenter, params.theta);
    if (changes.yaw !== 0 || changes.pitch !== 0) {
      viewRight[0] = camera.state.view[0];
      viewRight[1] = camera.state.view[4];
      viewRight[2] = camera.state.view[8];
      normalize_1(viewRight, viewRight);
      viewUp[0] = camera.state.view[1];
      viewUp[1] = camera.state.view[5];
      viewUp[2] = camera.state.view[9];
      normalize_1(viewUp, viewUp);
      viewForward[0] = camera.state.view[2];
      viewForward[1] = camera.state.view[6];
      viewForward[2] = camera.state.view[10];
      normalize_1(viewForward, viewForward);
      var clippedPhi = Math.min(MAX_PHI, Math.max(MIN_PHI, params.phi + changes.pitch * 0.5));
      var clippedPitch = clippedPhi - params.phi;
      scaleAndAdd_1(params.center, params.center, viewRight, -Math.sin(changes.yaw * 0.5) * params.distance);
      scaleAndAdd_1(params.center, params.center, viewUp, -Math.sin(clippedPitch) * params.distance);
      scaleAndAdd_1(params.center, params.center, viewForward, (2 - Math.cos(changes.yaw * 0.5) - Math.cos(clippedPitch)) * params.distance);
      params.phi = clippedPhi;
      params.theta += changes.yaw * 0.5;
    }
    computeMatrices();
    taint();
  }
  resize(camera.params.aspectRatio);
  return camera;
};

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
var buttons = mouseButtons;
function mouseElement(ev) {
  return ev.target || ev.srcElement || window
}
var element = mouseElement;
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
var x = mouseRelativeX;
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
var y = mouseRelativeY;
var mouse = {
	buttons: buttons,
	element: element,
	x: x,
	y: y
};

var mouseListen_1 = mouseListen;
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

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _undefined = void 0;
var is = function (value) { return value !== _undefined && value !== null; };

var possibleTypes = { "object": true, "function": true, "undefined": true  };
var is$1 = function (value) {
	if (!is(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};

var is$2 = function (value) {
	if (!is$1(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};

var is$3 = function (value) {
	if (typeof value !== "function") return false;
	if (!hasOwnProperty.call(value, "length")) return false;
	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}
	return !is$2(value);
};

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;
var is$4 = function (value) {
	if (!is$3(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};

var isImplemented = function () {
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

var _undefined$1 = noop();
var isValue = function (val) { return val !== _undefined$1 && val !== null; };

var keys = Object.keys;
var shim = function (object) { return keys(isValue(object) ? Object(object) : object); };

var keys$1 = isImplemented$1() ? Object.keys : shim;

var validValue = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

var max   = Math.max;
var shim$1 = function (dest, src) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(validValue(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys$1(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

var assign = isImplemented() ? Object.assign : shim$1;

var forEach = Array.prototype.forEach, create = Object.create;
var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};
var normalizeOptions = function (opts1) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};

var str = "razdwatrzy";
var isImplemented$2 = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};

var indexOf = String.prototype.indexOf;
var shim$2 = function (searchString) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

var contains = isImplemented$2() ? String.prototype.contains : shim$2;

var d_1 = createCommonjsModule(function (module) {
var d = (module.exports = function (dscr, value) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (is(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}
	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOptions(options), desc);
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
	if (!is(get)) {
		get = undefined;
	} else if (!is$4(get)) {
		options = get;
		get = set = undefined;
	} else if (!is(set)) {
		set = undefined;
	} else if (!is$4(set)) {
		options = set;
		set = undefined;
	}
	if (is(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}
	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOptions(options), desc);
};
});

var validCallable = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

var eventEmitter = createCommonjsModule(function (module, exports) {
var apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }
  , on, once, off, emit, methods, descriptors, base;
on = function (type, listener) {
	var data;
	validCallable(listener);
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
	validCallable(listener);
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
	validCallable(listener);
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
	on: d_1(on),
	once: d_1(once),
	off: d_1(off),
	emit: d_1(emit)
};
base = defineProperties({}, descriptors);
module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;
});
var eventEmitter_1 = eventEmitter.methods;

var normalizedInteractionEvents_1 = normalizedInteractionEvents;
function normalizedInteractionEvents (element) {
  element = element || window;
  var emitter = eventEmitter();
  var previousPosition = [null, null];
  var previousFingerPosition = [null, null];
  var currentPosition = [null, null];
  var fingers = [null, null];
  var activeTouchCount = 0;
  var ev = {};
  var width, height;
  var getSize = element === window ? function () {
    width = window.innerWidth;
    height = window.innerHeight;
  } : function () {
    width = element.clientWidth;
    height = element.clientHeight;
  };
  var buttons = 0;
  var mouseX;
  var mouseY;
  var mods = {};
  var changeListener = mouseListen_1(element, function(pbuttons, px, py, pmods) {
    mouseX = px;
    mouseY = py;
    buttons = pbuttons;
    mods = pmods;
  });
  function onWheel (event) {
    mouseEventOffset_1(event, element, currentPosition);
    getSize();
    ev.buttons = buttons;
    ev.mods = mods;
    ev.x0 = ev.x = ev.x1 = 2 * currentPosition[0] / width - 1;
    ev.y0 = ev.y = ev.y1 = 1 - 2 * currentPosition[1] / height;
    ev.x2 = null;
    ev.y2 = null;
    ev.dx = 2 * event.deltaX / width;
    ev.dy = -2 * event.deltaY / height;
    ev.dz = 2 * event.deltaZ / width;
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
  var x0 = null;
  var y0 = null;
  var active = 0;
  function onMouseUp (event) {
    mouseEventOffset_1(event, element, currentPosition);
    active = 0;
    getSize();
    ev.buttons = buttons;
    ev.mods = mods;
    ev.x = ev.x1 = 2 * currentPosition[0] / width - 1;
    ev.y = ev.y1 = 1 - 2 * currentPosition[1] / height;
    ev.x2 = null;
    ev.y2 = null;
    ev.active = active;
    ev.x0 = 2 * x0 / width - 1;
    ev.y0 = 1 - 2 * y0 / height;
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
  function onMouseDown (event) {
    mouseEventOffset_1(event, element, currentPosition);
    active = 1;
    getSize();
    x0 = mouseX;
    y0 = mouseY;
    ev.buttons = buttons;
    ev.mods = mods;
    ev.x = ev.x0 = ev.x1 = 2 * currentPosition[0] / width - 1;
    ev.y = ev.y0 = ev.y1 = 1 - 2 * currentPosition[1] / height;
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
  function onMouseMove (event) {
    mouseEventOffset_1(event, element, currentPosition);
    getSize();
    ev.buttons = buttons;
    ev.mods = mods;
    ev.x0 = 2 * x0 / width - 1;
    ev.y0 = 1 - 2 * y0 / height;
    ev.x = ev.x1 = 2 * currentPosition[0] / width - 1;
    ev.y = ev.y1 = 1 - 2 * currentPosition[1] / height;
    ev.x2 = null;
    ev.y2 = null;
    ev.dx = 2 * (currentPosition[0] - previousPosition[0]) / width;
    ev.dy = -2 * (currentPosition[1] - previousPosition[1]) / height;
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
  function indexOfTouch (touch) {
    var id = touch.identifier;
    for (var i = 0; i < fingers.length; i++) {
      if (fingers[i] &&
        fingers[i].touch &&
        fingers[i].touch.identifier === id) {
        return i
      }
    }
    return -1
  }
  function onTouchStart (event) {
    previousFingerPosition[0] = null;
    previousFingerPosition[1] = null;
    for (var i = 0; i < event.changedTouches.length; i++) {
      var newTouch = event.changedTouches[i];
      var id = newTouch.identifier;
      var idx = indexOfTouch(id);
      if (idx === -1 && activeTouchCount < 2) {
        var newIndex = fingers[0] ? 1 : 0;
        var oldIndex = fingers[0] ? 0 : 1;
        var newFinger = {
          position: [0, 0],
          touch: null
        };
        fingers[newIndex] = newFinger;
        activeTouchCount++;
        newFinger.touch = newTouch;
        mouseEventOffset_1(newTouch, element, newFinger.position);
        var oldTouch = fingers[oldIndex] ? fingers[oldIndex].touch : undefined;
      }
    }
    var xavg = 0;
    var yavg = 0;
    var fingerCount = 0;
    for (var i = 0; i < fingers.length; i++) {
      if (!fingers[i]) continue;
      xavg += fingers[i].position[0];
      yavg += fingers[i].position[1];
      fingerCount++;
    }
    xavg /= fingerCount;
    yavg /= fingerCount;
    if (activeTouchCount > 0) {
      ev.theta = 0;
      if (fingerCount > 1) {
        var dx = fingers[1].position[0] - fingers[0].position[0];
        var dy = (fingers[0].position[1] - fingers[1].position[1]) * width / height;
        ev.theta = Math.atan2(dy, dx);
      }
      getSize();
      ev.buttons = 0;
      ev.mods = {};
      ev.active = activeTouchCount;
      x0 = xavg;
      y0 = yavg;
      ev.x0 = 2 * x0 / width - 1;
      ev.y0 = 1 - 2 * y0 / height;
      ev.x = 2 * xavg / width - 1;
      ev.y = 1 - 2 * yavg / height;
      ev.x1 = 2 * fingers[0].position[0] / width - 1;
      ev.y1 = 1 - 2 * fingers[0].position[1] / height;
      if (activeTouchCount > 1) {
        ev.x2 = 2 * fingers[1].position[0] / width - 1;
        ev.y2 = 1 - 2 * fingers[1].position[1] / height;
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
  function onTouchMove (event) {
    var idx;
    var changed = false;
    for (var i = 0; i < event.changedTouches.length; i++) {
      var movedTouch = event.changedTouches[i];
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
          if (fingers[idx]) break;
        }
        if (fingers[idx] && previousFingerPosition[idx]) {
          var x = fingers[idx].position[0];
          var y = fingers[idx].position[1];
          var dx = x - previousFingerPosition[idx][0];
          var dy = y - previousFingerPosition[idx][1];
          ev.buttons = 0;
          ev.mods = {};
          ev.active = activeTouchCount;
          ev.x = ev.x1 = 2 * x / width - 1;
          ev.y = ev.y1 = 1 - 2 * y / height;
          ev.x2 = null;
          ev.y2 = null;
          ev.x0 = 2 * x0 / width - 1;
          ev.y0 = 1 - 2 * y0 / height;
          ev.dx = 2 * dx / width;
          ev.dy = -2 * dy / height;
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
          var pos0A = previousFingerPosition[0];
          var pos0B = previousFingerPosition[1];
          var dx0 = pos0B[0] - pos0A[0];
          var dy0 = (pos0B[1] - pos0A[1]) * width / height;
          var pos1A = fingers[0].position;
          var pos1B = fingers[1].position;
          var dx1 = pos1B[0] - pos1A[0];
          var dy1 = (pos1A[1] - pos1B[1]) * width / height;
          var r0 = Math.sqrt(dx0 * dx0 + dy0 * dy0) * 0.5;
          var theta0 = Math.atan2(dy0, dx0);
          var r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) * 0.5;
          var theta1 = Math.atan2(dy1, dx1);
          var xavg = (pos0B[0] + pos0A[0]) * 0.5;
          var yavg = (pos0B[1] + pos0A[1]) * 0.5;
          var dx = 0.5 * (pos1B[0] + pos1A[0] - pos0A[0] - pos0B[0]);
          var dy = 0.5 * (pos1B[1] + pos1A[1] - pos0A[1] - pos0B[1]);
          var dr = r1 / r0;
          var dtheta = theta1 - theta0;
          ev.buttons = 0;
          ev.mods = mods;
          ev.active = activeTouchCount;
          ev.x = 2 * xavg / width - 1;
          ev.y = 1 - 2 * yavg / height;
          ev.x0 = 2 * x0 / width - 1;
          ev.y0 = 1 - 2 * y0 / height;
          ev.x1 = 2 * pos1A[0] / width - 1;
          ev.y1 = 1 - 2 * pos1A[1] / height;
          ev.x2 = 2 * pos1B[0] / width - 1;
          ev.y2 = 1 - 2 * pos1B[1] / height;
          ev.dx = 2 * dx / width;
          ev.dy = -2 * dy / height;
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
  function onTouchRemoved (event) {
    var lastFinger;
    for (var i = 0; i < event.changedTouches.length; i++) {
      var removed = event.changedTouches[i];
      var idx = indexOfTouch(removed);
      if (idx !== -1) {
        lastFinger = fingers[idx];
        fingers[idx] = null;
        activeTouchCount--;
        var otherIdx = idx === 0 ? 1 : 0;
        var otherTouch = fingers[otherIdx] ? fingers[otherIdx].touch : undefined;
      }
    }
    var xavg = 0;
    var yavg = 0;
    if (activeTouchCount === 0) {
      if (lastFinger) {
        xavg = lastFinger.position[0];
        yavg = lastFinger.position[1];
      }
    } else {
      var fingerCount = 0;
      for (var i = 0; i < fingers.length; i++) {
        if (!fingers[i]) continue;
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
      ev.x = 2 * xavg / width - 1;
      ev.y = 1 - 2 * yavg / height;
      ev.x0 = 2 * x0 / width - 1;
      ev.y0 = 1 - 2 * y0 / height;
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
  var enabled = false;
  function enable () {
    if (enabled) return;
    enabled = true;
    changeListener.enabled = true;
    element.addEventListener('wheel', onWheel, false);
    element.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('mouseup', onMouseUp, false);
    element.addEventListener('touchstart', onTouchStart, false);
    window.addEventListener('touchmove', onTouchMove, false);
    window.addEventListener('touchend', onTouchRemoved, false);
    window.addEventListener('touchcancel', onTouchRemoved, false);
  }
  function disable () {
    if (!enabled) return;
    enabled = false;
    changeListener.enabled = false;
    element.removeEventListener('wheel', onWheel, false);
    element.removeEventListener('mousedown', onMouseDown, false);
    window.removeEventListener('mousemove', onMouseMove, false);
    window.removeEventListener('mouseup', onMouseUp, false);
    element.removeEventListener('touchstart', onTouchStart, false);
    window.removeEventListener('touchmove', onTouchMove, false);
    window.removeEventListener('touchend', onTouchRemoved, false);
    window.removeEventListener('touchcancel', onTouchRemoved, false);
  }
  enable();
  emitter.enable = enable;
  emitter.disable = disable;
  return emitter;
}

var create_1 = create$1;
function create$1() {
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

var copy_1$1 = copy$1;
function copy$1(out, a) {
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

var str_1 = str$1;
function str$1(a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
}

var glMat4 = {
  create: create_1
  , clone: clone_1
  , copy: copy_1$1
  , identity: identity_1
  , transpose: transpose_1
  , invert: invert_1
  , adjoint: adjoint_1
  , determinant: determinant_1
  , multiply: multiply_1
  , translate: translate_1
  , scale: scale_1
  , rotate: rotate_1
  , rotateX: rotateX_1$1
  , rotateY: rotateY_1$1
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
var glMat4_6 = glMat4.invert;

function freeCameraFactory(options, regl) {
  const aCamera = inertialTurntableCamera({
    ...options,
    aspectRatio: regl._gl.canvas.clientWidth / regl._gl.canvas.clientHeight
  });
  initializeCameraControls(aCamera, regl._gl.canvas);
  aCamera.toConfig = () => {
    return {
      center: aCamera.params.center,
      theta: aCamera.params.theta,
      phi: aCamera.params.phi,
      distance: aCamera.params.distance
    }
  };
  const setCameraUniforms = regl({
    uniforms: {
      projection: (ctx, camera) => camera.state.projection,
      iProj: (ctx, camera) => glMat4_6([], camera.state.projection),
      view: (ctx, camera) => camera.state.view,
      eye: (ctx, camera) => camera.state.eye
    }
  });
  return [aCamera, setCameraUniforms]
}
function initializeCameraControls(camera, canvas) {
  const arrow = { left: 37, up: 38, right: 39, down: 40 };
  const delta = -0.01;
  window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
      case arrow.left:
        camera.pan(-delta, 0);
        break
      case arrow.up:
        camera.pan(0, +delta);
        break
      case arrow.right:
        camera.pan(+delta, 0);
        break
      case arrow.down:
        camera.pan(0, -delta);
        break
    }
  });
  const radiansPerHalfScreenWidth = Math.PI * 0.5;
  normalizedInteractionEvents_1(canvas)
    .on('wheel', function(ev) {
      {
        camera.zoom(ev.x, ev.y, Math.exp(-ev.dy) - 1.0);
      }
    })
    .on('mousemove', function(ev) {
      if (!ev.active || ev.buttons !== 1) return
      if (ev.mods.shift) {
        camera.pan(ev.dx, ev.dy);
      } else if (ev.mods.meta) ; else {
        camera.rotate(
          -ev.dx * radiansPerHalfScreenWidth,
          -ev.dy * radiansPerHalfScreenWidth
        );
      }
    })
    .on('touchmove', function(ev) {
      if (!ev.active) return
      camera.rotate(
        -ev.dx * radiansPerHalfScreenWidth,
        -ev.dy * radiansPerHalfScreenWidth
      );
    });
}

const PHOTON = {
  name: 'PHOTON',
  mass__eVc_2: 0,
  charge__qe: 0,
  chargeMassRatio__Ckg_1: 0,
  id: 0,
  color: [0.92, 0.75, 0.0],
  icolor: [237, 197, 0]
};
const ELECTRON = {
  name: 'ELECTRON',
  mass__eVc_2: 510998.94,
  chargeMassRatio__Ckg_1: -1.75882004556243e11,
  charge__qe: -1,
  id: 1,
  color: [0.12, 0.45, 0.65],
  icolor: [33, 116, 168]
};
const POSITRON = {
  name: 'POSITRON',
  mass__eVc_2: 510998.94,
  chargeMassRatio__Ckg_1: 1.75882004556243e11,
  charge__qe: 1,
  id: 2,
  color: [0.22, 0.9, 0.9],
  icolor: [133, 116, 168]
};
const PROTON = {
  name: 'PROTON',
  mass__eVc_2: 938272081,
  charge__qe: 1,
  chargeMassRatio__Ckg_1: 9.57883323113770929296814695637e7,
  id: 3,
  color: [0.77, 0.2, 0.2],
  icolor: [197, 50, 40]
};
const LIST = [PHOTON, ELECTRON, POSITRON, PROTON];
const BY_NAME_MAP = new Map(LIST.map(i => [i.name, i]));
var ParticleTypes = {
  PHOTON,
  ELECTRON,
  POSITRON,
  PROTON,
  byNameMap: BY_NAME_MAP,
  byName: name => BY_NAME_MAP.get(name),
  idByName: name => LIST.indexOf(BY_NAME_MAP.get(name))
};

function rowDistribution({ n = 0, d = 0 }) {
  const dOffset = (d * (n - 1)) / 2;
  return [...Array(n)]
    .fill(0)
    .map((zero, i) => [i * d - dOffset, 0, 0])
    .reduce((acc, val) => acc.concat(val), [])
}
function columnDistribution({ n = 0, d = 0 }) {
  const dOffset = (d * (n - 1)) / 2;
  return [...Array(n)]
    .fill(0)
    .map((zero, i) => [0, i * d - dOffset, 0])
    .reduce((acc, val) => acc.concat(val), [])
}
function squareDistributionXY({ n = 0, d = 0 }) {
  const nx = Math.ceil(Math.sqrt(n));
  const ny = Math.ceil(n / nx);
  const dOffsetX = (d * (nx - 1)) / 2;
  const dOffsetY = (d * (ny - 1)) / 2;
  return [...Array(n)]
    .fill(0)
    .map((zero, i) => {
      const ix = i % nx;
      const iy = Math.floor(i / nx);
      return [ix * d - dOffsetX, iy * d - dOffsetY, 0]
    })
    .reduce((acc, val) => acc.concat(val), [])
}
function squareDistributionXZ({ n = 0, d = 0 }) {
  const nx = Math.ceil(Math.sqrt(n));
  const ny = Math.ceil(n / nx);
  const dOffsetX = (d * (nx - 1)) / 2;
  const dOffsetY = (d * (ny - 1)) / 2;
  return Array(n)
    .fill(0)
    .map((zero, i) => {
      const ix = i % nx;
      const iy = Math.floor(i / nx);
      return [ix * d - dOffsetX, 0, iy * d - dOffsetY]
    })
    .reduce((acc, val) => acc.concat(val), [])
}
function squareDistributionYZ({ n = 0, d = 0 }) {
  const nx = Math.ceil(Math.sqrt(n));
  const ny = Math.ceil(n / nx);
  const dOffsetX = (d * (nx - 1)) / 2;
  const dOffsetY = (d * (ny - 1)) / 2;
  return Array(n)
    .fill(0)
    .map((zero, i) => {
      const ix = i % nx;
      const iy = Math.floor(i / nx);
      return [0, iy * d - dOffsetY, ix * d - dOffsetX]
    })
    .reduce((acc, val) => acc.concat(val), [])
}
function discDistributionXY({ n = 0, d = 0 }) {
  const nx = Math.ceil(Math.sqrt(n));
  const ny = Math.ceil(n / nx);
  const dOffsetX = (d * (nx - 1)) / 2;
  const dOffsetY = (d * (ny - 1)) / 2;
  return Array(n)
    .fill(0)
    .map((zero, i) => {
      const ix = i % nx;
      const iy = Math.floor(i / nx);
      if (
        (ix * d - dOffsetX) ** 2 + (iy * d - dOffsetY) ** 2 <
        ((nx * d) / 2) ** 2
      )
        return [ix * d - dOffsetX, iy * d - dOffsetY, 0]
      else return [ix * d - dOffsetX, iy * d - dOffsetY - 10, 0]
    })
    .reduce((acc, val) => acc.concat(val), [])
}
function discDistributionYZ({ n = 0, d = 0 }) {
  const nx = Math.ceil(Math.sqrt(n));
  const ny = Math.ceil(n / nx);
  const dOffsetX = (d * (nx - 1)) / 2;
  const dOffsetY = (d * (ny - 1)) / 2;
  return Array(n)
    .fill(0)
    .map((zero, i) => {
      const ix = i % nx;
      const iy = Math.floor(i / nx);
      if (
        (ix * d - dOffsetX) ** 2 + (iy * d - dOffsetY) ** 2 <
        ((nx * d) / 2) ** 2
      )
        return [0, iy * d - dOffsetY, ix * d - dOffsetX]
      else return [0, iy * d - dOffsetY - 10, ix * d - dOffsetX]
    })
    .reduce((acc, val) => acc.concat(val), [])
}

var normjs = {
    sum: function (o) {
        var s = 0;
        if (o.constructor === Array && o.length) {
            for (var i = 0, l = o.length; i < l; ++i) {
                s += o[i];
            }
        } else if (o.constructor === Object) {
            for (var k in o) {
                if (!o.hasOwnProperty(k)) continue;
                s += o[k];
            }
        }
        return s;
    },
    mean: function (o) {
        var l, m = this.sum(o);
        if (o.constructor === Array && o.length) {
            l = o.length;
        } else if (o.constructor === Object) {
            l = 0;
            for (var k in o) {
                if (!o.hasOwnProperty(k)) continue;
                ++l;
            }
        }
        return m / l;
    },
    variance: function (o, bessel) {
        bessel = (bessel) ? 1 : 0;
        var m = this.mean(o);
        var len = 0;
        var v = 0;
        if (o.constructor === Array && o.length) {
            len = o.length;
            for (var i = 0; i < len; ++i) {
                v += Math.pow(o[i] - m, 2);
            }
        } else if (o.constructor === Object) {
            len = 0;
            for (var k in o) {
                if (!o.hasOwnProperty(k)) continue;
                v += Math.pow(o[k] - m, 2);
                ++len;
            }
        }
        if (len < 2) {
            throw new Error("variance not defined for length < 2");
        } else {
            return v / (len - bessel);
        }
    },
    std: function (o, bessel) {
        return Math.sqrt(this.variance(o, bessel));
    },
    norm: function (o, type) {
        var i, k, l, s = 0;
        if (o) {
            if (type) {
                switch (type.toLowerCase()) {
                case "l1":
                    if (o.constructor === Array && o.length) {
                        l = o.length;
                        for (i = 0; i < l; ++i) {
                            s += Math.abs(o[i]);
                        }
                    } else if (o.constructor === Object) {
                        for (k in o) {
                            if (!o.hasOwnProperty(k)) continue;
                            s += Math.abs(o[k]);
                        }
                    }
                    break;
                case "euclidean":
                    if (o.constructor === Array && o.length) {
                        l = o.length;
                        for (i = 0; i < l; ++i) {
                            s += Math.pow(o[i], 2);
                        }
                    } else if (o.constructor === Object) {
                        for (k in o) {
                            if (!o.hasOwnProperty(k)) continue;
                            s += Math.pow(o[k], 2);
                        }
                    }
                    s = Math.sqrt(s);
                    break;
                case "max":
                    if (o.constructor === Array && o.length) {
                        s = Math.max.apply(null, o);
                    } else if (o.constructor === Object) {
                        s = null;
                        for (k in o) {
                            if (!o.hasOwnProperty(k)) continue;
                            if (s === null) {
                                s = o[k];
                            } else {
                                s = Math.max(s, o[k]);
                            }
                        }
                    }
                    break;
                case "min":
                    if (o.constructor === Array && o.length) {
                        s = Math.min.apply(null, o);
                    } else if (o.constructor === Object) {
                        s = null;
                        for (k in o) {
                            if (!o.hasOwnProperty(k)) continue;
                            if (s === null) {
                                s = o[k];
                            } else {
                                s = Math.min(s, o[k]);
                            }
                        }
                    }
                    break;
                default:
                    s = this.sum(o);
                }
            } else {
                s = this.sum(o);
            }
        }
        return s;
    },
    rescale: function (o, factor) {
        if (o && factor) {
            if (o.constructor === Array && o.length) {
                for (var i = 0, l = o.length; i < l; ++i) {
                    o[i] /= factor;
                }
            } else if (o.constructor === Object) {
                for (var k in o) {
                    if (!o.hasOwnProperty(k)) continue;
                    o[k] /= factor;
                }
            }
        }
        return o;
    },
    standardize: function (o, bessel) {
        return this.rescale(o, this.std(o, bessel));
    },
    normalize: function (o, type) {
        return this.rescale(o, this.norm(o, type));
    }
};
var norm_js = normjs;

let seed = 1;
const random = () => {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x)
};
const boundedRandom = (min = -1, max = 1) => random() * max + min;

function particleTypesArrayFromDescriptor(
  particleTypeDescriptor,
  n = 0
) {
  const particleTypesArray = particleTypeDescriptor
    .trim()
    .split(/\s+/)
    .map(d => {
      return ParticleTypes.byName(d)
    });
  if (n === 0) {
    return particleTypesArray
  }
  const filledParticleTypesArray = Array(n)
    .fill(0)
    .map((x, p) => {
      const particleType = particleTypesArray[p % particleTypesArray.length];
      return particleType
    });
  return filledParticleTypesArray
}
function jitterPosition({ position = [0, 0, 0], jitter = [0, 0, 0] }) {
  const jitteredPosition = position.map(
    (d, i) => d + Math.floor(boundedRandom() * jitter[i] * 100) / 100
  );
  return jitteredPosition
}
function jitterDirection({
  direction = [0, 0, 1],
  directionJitter = [0, 0, 0],
  localPosition = [0, 0, 0]
}) {
  const jitteredDirection = direction.map(
    (d, i) =>
      d +
      Math.floor(
        Math.abs(boundedRandom()) * localPosition[i] * directionJitter[i] * 100
      ) /
        100
  );
  return norm_js.normalize(jitteredDirection, 'Euclidean')
}
function betaFromGamma(gamma = 0) {
  if (gamma === 0) return NaN
  return Math.sqrt(1 - 1 / Math.pow(gamma, 2))
}
function createParticleCollection({
  particleCount = 3,
  particleTypeDescriptor = 'PHOTON ELECTRON PROTON',
  bunchShape = 'ROW',
  particleSeparation = 0.1,
  gamma = 1,
  position = [0, 0, 0],
  direction = [0, 0, 1],
  positionJitter = [0, 0, 0],
  directionJitter = [0, 0, 0]
}) {
  const particles = particleTypesArrayFromDescriptor(
    particleTypeDescriptor,
    particleCount
  );
  if (
    [
      'SQUARE',
      'ROW',
      'DISC',
      'DISC_YZ',
      'COLUMN',
      'SQUARE_YZ',
      'SQUARE_HORIZONTAL'
    ].indexOf(bunchShape) === -1
  ) {
    throw new Error('unknown distribution type')
  }
  const localPositions =
    bunchShape === 'SQUARE'
      ? squareDistributionXY({
          n: particleCount,
          d: particleSeparation
        })
      : bunchShape === 'SQUARE_YZ'
      ? squareDistributionYZ({
          n: particleCount,
          d: particleSeparation
        })
      : bunchShape === 'DISC'
      ? discDistributionXY({
          n: particleCount,
          d: particleSeparation
        })
      : bunchShape === 'DISC_YZ'
      ? discDistributionYZ({
          n: particleCount,
          d: particleSeparation
        })
      : bunchShape === 'SQUARE_HORIZONTAL'
      ? squareDistributionXZ({
          n: particleCount,
          d: particleSeparation
        })
      : bunchShape === 'ROW'
      ? rowDistribution({
          n: particleCount,
          d: particleSeparation
        })
      : bunchShape === 'COLUMN'
      ? columnDistribution({
          n: particleCount,
          d: particleSeparation
        })
      : columnDistribution({
          n: particleCount,
          d: particleSeparation
        });
  const fourPositions = particles
    .map((particle, p) => {
      const jitteredPosition = jitterPosition({
        position: position,
        jitter: positionJitter
      });
      return [
        localPositions[p * 3 + 0] + jitteredPosition[0],
        localPositions[p * 3 + 1] + jitteredPosition[1],
        localPositions[p * 3 + 2] + jitteredPosition[2],
        0
      ]
    })
    .reduce((acc, val) => acc.concat(val), []);
  const fourVelocities = particles
    .map((particle, p) => {
      const beta = particle.mass__eVc_2 === 0 ? 1 : betaFromGamma(gamma);
      const myDirection = jitterDirection({
        direction,
        directionJitter,
        localPosition: [
          localPositions[p * 3 + 0],
          localPositions[p * 3 + 1],
          localPositions[p * 3 + 2]
        ]
      });
      return [
        beta * myDirection[0],
        beta * myDirection[1],
        beta * myDirection[2],
        gamma
      ]
    })
    .reduce((acc, val) => acc.concat(val), []);
  return {
    fourPositions,
    fourVelocities,
    particleTypes: particles.map(p => p.id)
  }
}

function initialize(
  bufferLength,
  {
    randomize,
    bunchShape,
    particleCount,
    particleType,
    particleSeparation,
    direction,
    position,
    directionJitter,
    positionJitter,
    gamma
  },
  boundingBoxSize = -1
) {
  let fourPositions = new Float32Array(particleCount * bufferLength * 4);
  let fourVelocities = new Float32Array(particleCount * bufferLength * 4);
  let particleTypes = new Array(particleCount);
  if (randomize) {
    for (let p = 0; p < particleCount; p++) {
      fourPositions[p * 4] = boundedRandom() * boundingBoxSize;
      fourPositions[p * 4 + 1] = boundedRandom() * boundingBoxSize;
      fourPositions[p * 4 + 2] = boundedRandom() * boundingBoxSize;
      fourPositions[p * 4 + 3] = 0;
      fourVelocities[p * 4] = random();
      fourVelocities[p * 4 + 1] = random();
      fourVelocities[p * 4 + 2] = random();
      fourVelocities[p * 4 + 3] = 0;
      particleTypes[p] = Math.floor(random() * 4);
    }
  } else {
    const particleCollection = createParticleCollection({
      particleCount: particleCount,
      particleTypeDescriptor: particleType,
      bunchShape: bunchShape,
      particleSeparation: particleSeparation,
      gamma: gamma,
      position: position,
      positionJitter: positionJitter,
      direction: direction,
      directionJitter: directionJitter
    });
    fourPositions = new Float32Array(
      [
        ...particleCollection.fourPositions
      ].concat(new Array(particleCount * (bufferLength - 1) * 4).fill(0))
    );
    fourVelocities = new Float32Array(
      [
        ...particleCollection.fourVelocities
      ].concat(new Array(particleCount * (bufferLength - 1) * 4).fill(0))
    );
    particleTypes = particleCollection.particleTypes;
  }
  return {
    particleCount: particleCount,
    bufferLength: bufferLength,
    fourPositions,
    fourVelocities,
    particleTypes
  }
}

const getters = `
  struct ParticleData {
    float charge;
    float mass;
    float chargeMassRatio;
    float particleType;
  };
  vec4 EncodeFloatRGBA( float v ) {
    vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * v;
    enc = fract(enc);
    enc -= enc.yzww * vec4(1.0/255.0,1.0/255.0,1.0/255.0,0.0);
    return enc;
  }
  float DecodeFloatRGBA( vec4 rgba ) {
    return dot( rgba, vec4(1.0, 1./255.0, 1./65025.0, 1./16581375.0) );
  }
  ParticleData getParticleData(float p) {
    vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);
    vec4 data = texture2D(utParticleChargesMassesChargeMassRatios, coords);
    return ParticleData(data.x, data.y, data.z, data.w);
  }
  vec4 get_color(float p) {
    vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);
    return texture2D(utParticleColorAndType, coords);
  }
  vec4 get_position(float p, float b) {
    vec2 coords = vec2(p, b) / vec2(particleCount, bufferLength);
    return texture2D(utPositionBuffer, coords);
  }
  vec4 get_velocity(float p, float b) {
    vec2 coords = vec2(p, b) / vec2(particleCount, bufferLength);
    return texture2D(utVelocityBuffer, coords);
  }
`;
function latticeChunk(lattice) {
  return `
  int BEAMLINE_ELEMENT_TYPE_DRIFT = 0;
  int BEAMLINE_ELEMENT_TYPE_DIPOLE = 1;
  int BEAMLINE_ELEMENT_TYPE_QUADRUPOLE = 2;
  struct BeamlineElement {
    vec3 start;
    vec3 end;
    int type; //0: drift, 1: dipole, 2: quadrupole
    float strength;
  };

  ${
    lattice.beamline.length > 0
      ? 'BeamlineElement beamline[' + lattice.beamline.length + '];'
      : 'BeamlineElement beamline[1];'
  }

  BeamlineElement getBeamlineElement(float id) {
    for (int i=0; i < ${Math.min(lattice.beamline.length, 1000)}; i++) {
        if (float(i) == id) return beamline[i];
    }
  }

  BeamlineElement getClosestBeamlineElement(vec3 position) {

    float bestLength = 1000.;
    int bestIndex = 0;

    for (int i=0; i < ${lattice.beamline.length}; i++) {

      BeamlineElement bl = getBeamlineElement(float(i));
      float currentLength = length(position - (bl.start+bl.end)/2.) ;
      if (currentLength < bestLength) {

        bestIndex = i;
        bestLength = currentLength;
      }
  }
  return getBeamlineElement(float(bestIndex));
  }

  void initLatticeData() {
    ${lattice.toGLSLDefinition()};
  }
  `
}

function pushBoris(regl, { variables, model }) {
  const pushFactory = variableName =>
    regl({
      framebuffer: (context, props) =>
        variables[variableName][props.pathiclesTick % 2],
      primitive: 'triangles',
      elements: null,
      offset: 0,
      count: 3,
      attributes: {
        aPosition: [0, -4, 0, 4, 4, 0, -4, 4, 0]
      },
      uniforms: {
        boundingBoxSize: model.boundingBoxSize,
        bufferLength: model.bufferLength,
        particleCount: model.particleCount,
        tick: regl.prop('pathiclesTick'),
        halfDeltaTOverC: model.halfDeltaTOverC,
        particleInteraction: model.interactions.particleInteraction ? 1 : 0,
        gravityConstant: model.interactions.gravityConstant,
        electricField: model.interactions.electricField || [0, 0, 0],
        magneticField: model.interactions.magneticField || [0, 0, 1],
        utParticleChargesMassesChargeMassRatios: () =>
          variables.particleChargesMassesChargeMassRatios,
        utPositionBuffer: (context, props) =>
          variables.position[(props.pathiclesTick + 1) % 2],
        utVelocityBuffer: (context, props) =>
          variableName === 'position'
            ? variables.velocity[props.pathiclesTick % 2]
            : variables.velocity[(props.pathiclesTick + 1) % 2]
      },
      vert: `

        precision mediump float;
        attribute vec3 aPosition;

        void main () {
          gl_Position = vec4(aPosition, 1.);
        }
        `,
      frag: `
        precision highp float;

        const highp float c = 2.99792458e+8;
        uniform sampler2D utParticleColorAndType;
        uniform sampler2D utParticleChargesMassesChargeMassRatios;
        uniform sampler2D utPositionBuffer;
        uniform sampler2D utVelocityBuffer;
        uniform float tick;
        uniform float halfDeltaTOverC;
        uniform float boundingBoxSize;
        uniform float particleCount;
        uniform float bufferLength;
        uniform float gravityConstant;
        uniform vec3 electricField;
        uniform vec3 magneticField;

        uniform float particleInteraction;

        ${getters}

        ${latticeChunk(model.lattice)}


        vec3 get_efield(vec3 position, ParticleData particleData, float p, float previousBufferHead) {

          vec3 E = electricField * particleData.charge;



          // if (particleInteraction != 0.) {
          //
          //   for ( int p2 = 0; p2 < 24; p2++ ) {
          //
          //     if ( p == float(p2) ) { continue; }
          //
          //       ParticleData particleData2 = getParticleData(float(p2));
          //
          //     if (particleData2.charge > 0.) {
          //
          //       vec3 position2 = get_position(float(p2), previousBufferHead).xyz;
          //
          //       // float particleCharge2 = 1.; // POSITRON / PROTRON
          //       // if (particleType == 1.) { // ELECTRON
          //       //     particleCharge2 = charge_unit_qe[1];
          //       //  }
          //
          //       vec3 dPosition = position2 - position;
          //       float distance = length( dPosition );
          //
          //       E += .000000000001 *  particleData.charge * particleData2.charge / (distance * distance) * normalize(dPosition);
          //
          //     }
          //   }
          // }
          return E;
        }

        vec3 get_bfield(vec3 position) {

          BeamlineElement ble = getClosestBeamlineElement(position);

          vec3 B = magneticField;

          if (ble.type == BEAMLINE_ELEMENT_TYPE_DIPOLE) {
            B += vec3(0., ble.strength, 0.);
          } else if (ble.type == BEAMLINE_ELEMENT_TYPE_QUADRUPOLE) {
          B += (ble.strength > 0.) ?
              ble.strength * vec3(0, position.z, position.y-1.)
              : abs(ble.strength) * vec3(0, -position.z, -(position.y-1.));
              }

          // if (position.z > dipole_minZ && position.z < dipole_maxZ ) {
          //    B += vec3(0., dipole_strength, 0);
          //  }
          //
          //  if (position.z >  quadrupole_1_minZ && position.z < quadrupole_1_maxZ ) {
          //    float orientation = (quadrupole_1_rotated > 0.) ? -1. : 1.;
          //    B += quadrupole_1_strength * vec3(position.y-1., position.x, 0);
          //  }
          //
          // if (position.z >  quadrupole_2_minZ && position.z < quadrupole_2_maxZ ) {
          //    float orientation = (quadrupole_2_rotated > 0.) ? -1. : 1.;
          //    B +=  quadrupole_2_strength * vec3( position.y-1., -position.x, 0);
          //  }
           return B;

        }

        vec4 push_position(float p, float bufferHead, float previousBufferHead) {

          vec4 previousValue = get_position(p, previousBufferHead);

          vec3 previousPosition = previousValue.xyz;
          float previousTime  = previousValue.w;

          vec3 previousVelocity = get_velocity(p, previousBufferHead).xyz;
          vec3 currentVelocity = get_velocity(p, bufferHead).xyz;

          return vec4(
            previousPosition + previousVelocity * halfDeltaTOverC + currentVelocity * halfDeltaTOverC,
            previousTime + 2. * halfDeltaTOverC);
        }


        vec4 push_velocity(float p, float bufferHead, float previousBufferHead) {

          ParticleData particleData = getParticleData(p);

          vec4 previous4Position = get_position(p, previousBufferHead);

          vec4 previous4Velocity = get_velocity(p, previousBufferHead);
          vec3 previousVelocity = previous4Velocity.xyz;
          float previousGamma = previous4Velocity.w;


          vec3 intermediatePosition = previous4Position.xyz + previousVelocity * halfDeltaTOverC;

          vec3 E = get_efield(intermediatePosition, particleData, p, previousBufferHead);
          vec3 B = get_bfield(intermediatePosition);
          // vec3 G = vec3(0., -gravityConstant, 0.);


          vec3 dv_el_unit_c_1 = particleData.chargeMassRatio / c * E * halfDeltaTOverC;
          vec3 v_el1_unit_c_1 = previousVelocity + dv_el_unit_c_1;

          float gamma_el1_unit_c_1 = 1.0 / (sqrt(1.0 - dot( v_el1_unit_c_1, v_el1_unit_c_1)));
          gamma_el1_unit_c_1 = previousGamma;


          vec3 b_0_unit_c_1 =  particleData.chargeMassRatio / gamma_el1_unit_c_1 *  halfDeltaTOverC / c * B;
          float b_0_unit_c_1_square = dot(b_0_unit_c_1, b_0_unit_c_1);

          vec3 v_mag_unit_c_1 = v_el1_unit_c_1 + (2.0 / 1.0 + b_0_unit_c_1_square) * cross(  v_el1_unit_c_1 + cross(  v_el1_unit_c_1, b_0_unit_c_1), b_0_unit_c_1) ;

          vec3 nextVelocity_unit_c_1 = v_mag_unit_c_1 + dv_el_unit_c_1;





          //
          //
          // if (boundingBoxSize > 0.) {
          //   if (intermediatePosition.x < -boundingBoxSize || intermediatePosition.x > boundingBoxSize) {
          //     nextVelocity_unit_c_1.x *= -1.0;
          //   }
          //   if (intermediatePosition.y < -boundingBoxSize || intermediatePosition.y > boundingBoxSize) {
          //     nextVelocity_unit_c_1.y *= -1.0;
          //   }
          //   if (intermediatePosition.z < -boundingBoxSize || intermediatePosition.z > boundingBoxSize) {
          //     nextVelocity_unit_c_1.z *= -1.0;
          //   }
          // }

          //return vec4( nextVelocity_unit_c_1, gamma_el1_unit_c_1 );
          return vec4( nextVelocity_unit_c_1, previousGamma );
        }

        void main () {

          //initLatticeData();
          //initParticleData();
          float p, b;

          p = floor(gl_FragCoord.x);
          b = floor(gl_FragCoord.y);

          float currentBufferHead = floor(mod(tick, bufferLength + 1.));
          float previousBufferHead = (b == 0.) ? bufferLength : b - 1.;

          if (currentBufferHead == b) {

            gl_FragColor = push_${variableName}(p, currentBufferHead, previousBufferHead);

          } else {

            gl_FragColor = get_${variableName}(p, b);

          }
        }
        `
    });
  const pushVelocity = pushFactory('velocity');
  const pushPosition = pushFactory('position');
  return () => {
    variables.tick.value++;
    const z = variables.tick.value * model.halfDeltaTOverC * 2;
    variables.pingPong = variables.tick.value % 2;
    variables.referencePoint =
      model.lattice.beamline.length &&
      model.lattice.beamline[model.lattice.segmentIndexForZ(z)].start;
    pushVelocity({
      pathiclesTick: variables.tick.value
    });
    pushPosition({
      pathiclesTick: variables.tick.value
    });
  }
}

function readData(regl, { variables, model }) {
  const data = {};
  const variableNames = Object.keys(variables).filter(
    key => key === 'position' || key === 'velocity'
  );
  variableNames.forEach(key => {
    data[key] = [
      new Float32Array(model.particleCount * model.bufferLength * 4),
      new Float32Array(model.particleCount * model.bufferLength * 4)
    ];
  });
  variableNames.forEach(variableName => {
    regl({ framebuffer: variables[variableName][0] })(() => {
      regl.read({ data: data[variableName][0] });
    });
    regl({ framebuffer: variables[variableName][1] })(() => {
      regl.read({ data: data[variableName][1] });
    });
  });
  const position = Object.values(data.position[variables.tick.value % 2]).map(
    d => Math.floor(d * 1000) / 1000
  );
  const velocity = Object.values(data.velocity[variables.tick.value % 2]);
  return {
    tick: variables.tick.value,
    data: {
      position,
      particleTypes: variables.initialData.particleTypes
    }
  }
}

function createBuffers(regl, particleCount, bufferLength) {
  return [0, 1].map(() => {
    return regl.framebuffer({
      width: particleCount,
      height: bufferLength,
      format: 'rgba',
      colorType: 'float32',
      depthStencil: false,
      color: regl.texture({
        width: particleCount,
        height: bufferLength,
        min: 'nearest',
        mag: 'nearest',
        format: 'rgba',
        type: 'float32'
      })
    })
  })
}
function loadBuffers(buffers, data) {
[0, 1].forEach(b =>
    buffers[b].color[0].subimage({
      width: buffers[b].width,
      height: buffers[b].height,
      data
    })
  );
  return buffers
}

function drawVariableTexture(
  regl,
  { variables, texelSize = 1, y0 = 5 }
) {
  return regl({
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
      uniform sampler2D texture;
      varying vec2 uv;
      void main () {
        gl_FragColor = vec4(texture2D(texture, uv).xyz, texture2D(texture, uv).w + .5);
      }`,
    attributes: { position: [2, 0, 0, 2, -2, -2] },
    uniforms: {
      texture: ({ tick }, props) => variables[props.variableName][tick % 2]
    },
    viewport: {
      x: ({}, props) =>
        props.variableName === 'velocity'
          ? (variables.initialData.particleCount + 1) * texelSize
          : 0,
      y: y0,
      width: variables.initialData.particleCount * texelSize,
      height: variables.initialData.bufferLength * texelSize
    },
    depth: {
      enable: false
    },
    count: 3
  })
}

const DRIF = 'DRIF';
const QUAD = 'QUAD';
const SBEN = 'SBEN';
const LatticeElementTypes = {
  DRIF,
  SBEN,
  QUAD
};
const LatticeElementTypesArray = [DRIF, SBEN, QUAD];
const colors = {
  DRIF: [0.2, 0.2, 0.2],
  QUAD: [0.17, 0.03, 0.02],
  QUAD1: [0.27, 0.13, 0.12],
  SBEN: [0.6, 0.3, 0]
};
class Lattice {
  constructor(latticeDescriptor) {
    if (typeof latticeDescriptor === 'undefined')
      throw new Error('no default constructor')
    this.origin = latticeDescriptor.origin || {
      phi: 0,
      position: [0, 0, 0]
    };
    let z_l = 0;
    this.beamline = latticeDescriptor.beamline.map(elementKey => {
      if (!latticeDescriptor.elements[elementKey]) {
        throw new Error(`element ${elementKey} not defined`)
      }
      const element = latticeDescriptor.elements[elementKey];
      z_l += element.l;
      return {
        ...element,
        z_min: z_l - element.l,
        z_max: z_l
      }
    });
    const startEnds = this.startEnds;
    this.beamline.forEach((v, k) => {
      v.start = startEnds[k].start;
      v.end = startEnds[k].end;
    });
  }
  segmentIndexForZ(z) {
    const z_mod = z % this.length();
    for (let idx = 0; idx < Math.min(this.beamline.length, 1000); idx++) {
      if (
        z_mod >= this.beamline[idx].z_min &&
        z_mod <= this.beamline[idx].z_max
      )
        return idx
    }
  }
  length() {
    return this.beamline.length && this.beamline[this.beamline.length - 1].z_max
  }
  toGLSLDefinition() {
    const myStartEnds = this.startEnds;
    return this.beamline
      .map(
        (v, i) =>
          `beamline[${i}] = BeamlineElement(vec3(${myStartEnds[i].start.join(
            ','
          )}), vec3(${myStartEnds[i].end.join(
            ','
          )}), ${LatticeElementTypesArray.indexOf(v.type)},
          ${v.k1 ? v.k1.toFixed(2) : '0.'})`
      )
      .join(',')
  }
  getClosestBeamlineElement(position) {
    let bestLength = 1000;
    let bestIndex = 0;
    const startEnds = this.startEnds;
    for (let i = 0; i < this.beamline.length; i++) {
      const currentLength =
        Math.pow(position[0] - startEnds[i].start[0], 2) +
        Math.pow(position[1] - startEnds[i].start[1], 2) +
        Math.pow(position[2] - startEnds[i].start[2], 2);
      if (currentLength < bestLength) {
        bestIndex = i;
        bestLength = currentLength;
      }
    }
    return this.beamline[bestIndex]
  }
  get startEnds() {
    let phi = this.origin.phi;
    let [x, y, z] = this.origin.position;
    return this.beamline.map(element => {
      const start = [x, y, z];
      const phi_half = element.angle ? phi + element.angle / 2 : phi;
      const end = [
        x - Math.sin(phi_half) * element.l,
        y,
        z + Math.cos(phi_half) * element.l
      ]
      ;[x, y, z] = end;
      phi = element.angle ? phi + element.angle : phi;
      return {
        start,
        end
      }
    })
  }
  get transformations() {
    let phi = this.origin.phi;
    let [x, y, z] = this.origin.position;
    y = -1;
    return this.beamline.map(element => {
      const start = [x, y, z];
      const phi_half = element.angle ? phi + element.angle / 2 : phi;
      const end = [
        x - Math.sin(phi_half) * element.l,
        y,
        z + Math.cos(phi_half) * element.l
      ];
      const middle = [(start[0] + end[0]) / 2, y, (start[2] + end[2]) / 2]
      ;[x, y, z] = end;
      phi = element.angle ? phi + element.angle : phi;
      return {
        translation: middle,
        phi: phi_half,
        scale: [2, 0.15, element.l - 0.2 - (element.type === 'SBEN' ? 0.4 : 0)]
      }
    })
  }
  get colors() {
    return this.beamline.map(element => {
      if (element.type === LatticeElementTypes.QUAD && element.k1 < 0)
        return colors['QUAD1']
      return colors[element.type]
    })
  }
}

class Simulation {
  constructor(regl, configuration) {
    this._regl = regl;
    this._logStore = [];
    this.configuration = configuration;
    this.configuration.simulate = true;
    const {
      particleCount,
      bufferLength,
      fourPositions,
      particleTypes,
      fourVelocities
    } = (this.initialData = initialize(
      configuration.model.bufferLength,
      configuration.model.emitter
    ));
    const lattice = new Lattice(this.configuration.model.lattice);
    this.variables = {
      initialData: this.initialData,
      position: loadBuffers(
        createBuffers(regl, particleCount, bufferLength),
        fourPositions
      ),
      velocity: loadBuffers(
        createBuffers(regl, particleCount, bufferLength),
        fourVelocities
      ),
      tick: { value: 0 },
      referencePoint: [0, 0, 0],
      pingPong: 0,
      particleColorsAndTypes: regl.texture({
        data: particleTypes.map(p => configuration.colors[p].concat(p)).flat(),
        shape: [particleCount, 1, 4],
        type: 'float'
      }),
      particleChargesMassesChargeMassRatios: regl.texture({
        data: particleTypes
          .map(p => [
            configuration.charge[p],
            configuration.mass[p],
            configuration.chargeMassRatio[p],
            p
          ])
          .flat(),
        shape: [particleCount, 1, 4],
        type: 'float'
      })
    };
    this.model = {
      halfDeltaTOverC: this.configuration.model.tickDurationOverC / 2,
      particleCount: this.initialData.particleCount,
      particleTypes: this.initialData.particleTypes,
      bufferLength: this.initialData.bufferLength,
      stepCount: this.configuration.runner.stepCount,
      boundingBoxSize: this.configuration.model.boundingBoxSize,
      lattice: lattice,
      latticeConfig: this.configuration.model.lattice,
      interactions: {
        gravityConstant: this.configuration.model.interactions.gravityConstant,
        particleInteraction: this.configuration.model.interactions
          .particleInteraction,
        electricField: this.configuration.model.interactions.electricField,
        magneticField: this.configuration.model.interactions.magneticField
      }
    };
    if (configuration.simulate) {
      this.push = pushBoris(this._regl, {
        variables: this.variables,
        model: this.model
      });
    }
    this.drawVariableTexture = drawVariableTexture(regl, {
      variables: this.variables,
      particleCount: this.model.particleCount,
      bufferLength: this.model.bufferLength,
      texelSize: configuration.view.texelSize,
      x0: configuration.view.texelSize,
      y0: configuration.view.texelSize
    });
    this.log = () => {
      if (this.configuration.dumpData) {
        const data = readData(this._regl, {
          variables: this.variables,
          model: this.model
        });
        this._logStore.push({ tick: this.variables.tick.value, data: data });
      }
    };
    this.dump = () => {
      return readData(this._regl, {
        variables: this.variables,
        model: this.model
      })
    };
  }
  push(steps = 1) {
    Array(steps)
      .fill()
      .map(() => {
        this.push({});
      });
  }
  reset() {
    loadBuffers(this.variables.position, this.initialData.fourPositions);
    loadBuffers(this.variables.velocity, this.initialData.fourVelocities);
    this.variables.tick.value = 0;
  }
  prerender() {
    const batchSize = 1;
    const steps = this.model.bufferLength - 1;
    const batchSizes = Array(Math.floor(steps / batchSize)).fill(batchSize);
    if (steps % batchSize > 0) {
      batchSizes.push(steps % batchSize);
    }
    batchSizes.forEach(batchSize => {
      this.push(batchSize);
      this.log();
    });
  }
}

class PerformanceLogger {
  constructor(active = true) {
    if (window.performanceLogger) return window.performanceLogger
    this.current = null;
    this.active = active;
    this.entries = [];
    window.performanceLogger = this;
  }
  start(label) {
    if (this.active) {
      this.current = {
        label: label,
        t0: performance.now()
      };
    }
  }
  stop() {
    if (this.active) {
      this.current.t1 = performance.now();
      this.current.dt = this.current.t1 - this.current.t0;
      this.entries.push(this.current);
    }
  }
}
var PerformanceLogger$1 = new PerformanceLogger();

const log = Debug('pathicles:log');
const error = Debug('pathicles:error');

class SimulationFSM {
  constructor(
    simulation,
    {
      prerender = false,
      stepCount = -1,
      stepsPerTick = 1,
      looping = false,
      mode = 'stepwise',
      simulate = false
    }
  ) {
    this.simulate = simulate;
    this._simulation = simulation;
    this._prerender = prerender;
    this._stepCount =
      stepCount < 0
        ? this._simulation.constants.model.bufferLength - 1
        : stepCount;
    this._stepsPerTick = stepsPerTick;
    this._looping = looping;
    this._mode = mode;
    this.fsm = { state: 'initial' };
  }
  toggleLooping() {
    this._looping = !this._looping;
  }
  toggleMode() {
    this._mode = this._mode === 'stepwise' ? 'framewise' : 'stepwise';
  }
  toggleActivity() {
    if (this.fsm.state === 'active') {
      this.fsm = { state: 'paused' };
    } else if (this.fsm.state === 'paused') {
      this.fsm = { state: 'active' };
    }
    log('toggleActivity() for this.fsm.state: ' + this.fsm.state);
  }
  start() {
    if (this.fsm.state !== 'initial') {
      error('PathiclesRunner.start can be called in state initial only');
      throw new Error(
        'PathiclesRunner.start can be called in state initial only'
      )
    }
    if (this._prerender) {
      log('start.prerender');
      PerformanceLogger$1.start('prerender');
      if (this.simulate) {
        this._simulation.prerender();
        PerformanceLogger$1.stop();
      }
      this._simulation.variables.tick.value = this._stepCount;
      this.fsm = { state: 'paused' };
    } else {
      this.fsm = { state: 'restart' };
    }
  }
  next() {
    const stateInitial = this.fsm.state;
    if (this.fsm.state === 'active') {
      if (this._simulation.variables.tick.value >= this._stepCount - 1) {
        if (this._looping) {
          this.fsm.state = 'restart';
        } else {
          this.fsm.state = 'paused';
        }
      } else {
        for (let s = 0; s < this._stepsPerTick; s++) {
          this._simulation.push({});
          if (this._simulation.variables.tick.value >= this._stepCount) break
        }
        if (this._mode === 'stepwise') {
          this.fsm.state = 'paused';
        }
      }
    } else if (this.fsm.state === 'restart') {
      this._simulation.reset({});
      this.fsm.state = this.fsm.state.replace(/restart/, 'active');
    }
    if (stateInitial !== this.fsm.state) {
      log(
        stateInitial +
          ' ==> ' +
          this.fsm.state +
          ' // ' +
          this._simulation.variables.tick.value
      );
    }
  }
}

var identity_1$1 = identity$1;
function identity$1(out) {
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
var frag = "precision mediump float;\n#extension GL_OES_standard_derivatives : enable\n#define GLSLIFY 1\n\nuniform vec2 uResolution;\nuniform vec2 uSunPosition;\nvarying vec2 vUv;\nuniform vec3 eye;\nvarying vec3 vPosition;\n\nconst vec3 fogColor = vec3(1.0);\nconst float FogDensity = 0.;\n\nvec3 getSky(vec2 uv) {\n  float atmosphere = sqrt(1.0-uv.y);\n  vec3 skyColor = vec3(0., 0., 0.);\n\n  float scatter = pow(uSunPosition.y / uResolution.y, 1.0 / 15.0);\n  scatter = 1.0 - clamp(scatter, 0.8, 1.0);\n\n  vec3 scatterColor = mix(vec3(1.0), vec3(1.0, 0.3, 0.0) * 1.5, scatter);\n  return mix(skyColor, vec3(scatterColor), atmosphere / 1.);\n\n}\n\nvec3 getSun(vec2 uv){\n  float sun = 1. - distance(uv, uSunPosition.xy / uResolution.x);\n  sun = clamp(sun, 0.0, 1.0);\n\n  float glow = sun;\n  glow = clamp(glow, 0.0, 1.0);\n\n  sun = pow(sun, 200.0);\n  sun *= 1.0;\n  sun = clamp(sun, 0.0, 1.0);\n\n  glow = pow(glow, 10.0) * 1.0;\n  glow = pow(glow, (uv.y));\n  glow = clamp(glow, 0.0, 1.0);\n\n  sun *= pow(dot(uv.y, uv.y), 1.0 / 1.65);\n\n  glow *= pow(dot(uv.y, uv.y), 1.0 / 2.0);\n\n  sun += glow;\n\n  vec3 sunColor = vec3(1.0, 1., 1.) * sun;\n\n  return vec3(sunColor);\n}\n\nfloat grid(vec2 st, float res){\n  vec2 grid = fract(st*res);\n  grid /= fwidth(st);\n  return 1. - (step(res, grid.x) * step(res, grid.y));\n}\n\nvoid main () {\n  vec3 sky = getSky(vUv);\n  vec3 sun = getSun(vUv);\n\n//\n//  float resolution = 1000.;\n//  vec2 grid_st = vUv * uResolution * resolution;\n//  vec3 color = vec3(.5);\n//  color += vec3(.5, .5, 0.) * grid(grid_st, 1. / resolution);\n//  color += vec3(0.2) * grid(grid_st, 10. / resolution);\n//\n//  float fogDistance = length(eye - vPosition);\n//\n//  gl_FragColor = vec4(color.rgb, exp(- fogDistance * FogDensity));\n\n    gl_FragColor = vec4(sky + sun, 1.);\n}\n";
var vert = "precision highp float;\n#define GLSLIFY 1\nvarying vec3 vPosition;\nvarying vec2 vUv;\nattribute vec3 aPosition;\nattribute vec2 uv;\n\nuniform mat4 projection;\nuniform mat4 model;\nuniform mat4 view;\n\nvoid main()\n{\n  vUv = uv;\n  vec4 worldPosition = model * vec4(aPosition, 1.0);\n  vPosition = worldPosition.xyz;\n  gl_Position = projection * view * model * vec4(aPosition, 1.0);\n}\n";
function drawBackgroundCommand(regl, { stageGrid }) {
  const stage = primitiveCube(stageGrid.size * 2);
  let model = identity_1$1([]);
  return regl({
    primitive: 'triangles',
    elements: stage.cells,
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
var vert$1 = "precision highp float;\n#define GLSLIFY 1\nfloat inverse(float m) {\n  return 1.0 / m;\n}\n\nmat2 inverse(mat2 m) {\n  return mat2(m[1][1],-m[0][1],\n             -m[1][0], m[0][0]) / (m[0][0]*m[1][1] - m[0][1]*m[1][0]);\n}\n\nmat3 inverse(mat3 m) {\n  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2];\n  float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2];\n  float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2];\n\n  float b01 = a22 * a11 - a12 * a21;\n  float b11 = -a22 * a10 + a12 * a20;\n  float b21 = a21 * a10 - a11 * a20;\n\n  float det = a00 * b01 + a01 * b11 + a02 * b21;\n\n  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),\n              b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),\n              b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;\n}\n\nmat4 inverse(mat4 m) {\n  float\n      a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],\n      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],\n      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],\n      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],\n\n      b00 = a00 * a11 - a01 * a10,\n      b01 = a00 * a12 - a02 * a10,\n      b02 = a00 * a13 - a03 * a10,\n      b03 = a01 * a12 - a02 * a11,\n      b04 = a01 * a13 - a03 * a11,\n      b05 = a02 * a13 - a03 * a12,\n      b06 = a20 * a31 - a21 * a30,\n      b07 = a20 * a32 - a22 * a30,\n      b08 = a20 * a33 - a23 * a30,\n      b09 = a21 * a32 - a22 * a31,\n      b10 = a21 * a33 - a23 * a31,\n      b11 = a22 * a33 - a23 * a32,\n\n      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;\n\n  return mat4(\n      a11 * b11 - a12 * b10 + a13 * b09,\n      a02 * b10 - a01 * b11 - a03 * b09,\n      a31 * b05 - a32 * b04 + a33 * b03,\n      a22 * b04 - a21 * b05 - a23 * b03,\n      a12 * b08 - a10 * b11 - a13 * b07,\n      a00 * b11 - a02 * b08 + a03 * b07,\n      a32 * b02 - a30 * b05 - a33 * b01,\n      a20 * b05 - a22 * b02 + a23 * b01,\n      a10 * b10 - a11 * b08 + a13 * b06,\n      a01 * b08 - a00 * b10 - a03 * b06,\n      a30 * b04 - a31 * b02 + a33 * b00,\n      a21 * b02 - a20 * b04 - a23 * b00,\n      a11 * b07 - a10 * b09 - a12 * b06,\n      a00 * b09 - a01 * b07 + a02 * b06,\n      a31 * b01 - a30 * b03 - a32 * b00,\n      a20 * b03 - a21 * b01 + a22 * b00) / det;\n}\n\nfloat transpose(float m) {\n  return m;\n}\n\nmat2 transpose(mat2 m) {\n  return mat2(m[0][0], m[1][0],\n              m[0][1], m[1][1]);\n}\n\nmat3 transpose(mat3 m) {\n  return mat3(m[0][0], m[1][0], m[2][0],\n              m[0][1], m[1][1], m[2][1],\n              m[0][2], m[1][2], m[2][2]);\n}\n\nmat4 transpose(mat4 m) {\n  return mat4(m[0][0], m[1][0], m[2][0], m[3][0],\n              m[0][1], m[1][1], m[2][1], m[3][1],\n              m[0][2], m[1][2], m[2][2], m[3][2],\n              m[0][3], m[1][3], m[2][3], m[3][3]);\n}\n\nmat4 lookAt(vec3 eye, vec3 at, vec3 up) {\n  vec3 zaxis = normalize(eye - at);\n  vec3 xaxis = normalize(cross(zaxis, up));\n  vec3 yaxis = cross(xaxis, zaxis);\n  zaxis *= -1.;\n  return mat4(\n  vec4(xaxis.x, xaxis.y, xaxis.z, -dot(xaxis, eye)),\n  vec4(yaxis.x, yaxis.y, yaxis.z, -dot(yaxis, eye)),\n  vec4(zaxis.x, zaxis.y, zaxis.z, -dot(zaxis, eye)),\n  vec4(0, 0, 0, 1)\n  );\n}\n\nattribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute float aParticle;\nattribute float aColorCorrection;\nattribute float aStep;\n\nuniform float particleCount;\nuniform float bufferLength;\nuniform float stepCount;\n\nuniform float dt;\nuniform vec2 viewRange;\n\nuniform float pathicleWidth;\nuniform float pathicleGap;\nuniform float stageGrid_y;\nuniform float stageGrid_size;\nuniform vec3 shadowColor;\n\nuniform sampler2D utParticleColorAndType;\nuniform sampler2D utPositionBuffer;\nuniform sampler2D utVelocityBuffer;\nuniform mat4 projection, view, model;\n\nvarying float toBeDiscarded;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vDiffuseColor;\nvarying float vColorCorrection;\n\nvec4 get_color(float p) {\n  vec2 coords = vec2(p, 0.) / vec2(particleCount, 1.);\n  return texture2D(utParticleColorAndType, coords);\n}\nvec4 get_position(float p, float b) {\n  vec2 coords = vec2(p, b) / vec2(particleCount, bufferLength);\n  return texture2D(utPositionBuffer, coords);\n}\nfloat calculateToBeDiscarded(vec4 previousFourPosition, vec4 currentFourPosition) {\n\n  float undefinedBuffer = (currentFourPosition.w == 0. || previousFourPosition.w > currentFourPosition.w) ? 1.0 : 0.0;\n  float beyondProgressLower = (currentFourPosition.w / dt < viewRange[0] * stepCount) ? 1.0 : 0.0;\n  float beyondProgressUpper =  (currentFourPosition.w / dt > viewRange[1] * stepCount) ? 1.0 : 0.0;\n  float outsideGrid = (currentFourPosition.x > stageGrid_size || currentFourPosition.x < -stageGrid_size\n  || currentFourPosition.y > stageGrid_size || currentFourPosition.y < -stageGrid_size\n  || currentFourPosition.z > stageGrid_size || currentFourPosition.z < -stageGrid_size) ? 1.0 : 0.0;\n\n  return (outsideGrid > 0. || undefinedBuffer > 0. || beyondProgressLower > 0. || beyondProgressUpper > 0.) ? 1.0 : 0.0;\n\n}\n\nvoid main () {\n\n  #ifdef lighting\n  vDiffuseColor = get_color(aParticle).rgb;\n  #endif\n\n  #ifdef shadow\n  vDiffuseColor = shadowColor;\n  #endif\n\n  float previousBufferHead = (aStep < 1.) ? bufferLength : aStep - 1.;\n  vec4 previousFourPosition = get_position(aParticle, previousBufferHead);\n  vec4 currentFourPosition = get_position(aParticle, aStep);\n\n  mat4 lookAtMat4 = lookAt(currentFourPosition.xyz, previousFourPosition.xyz, vec3(0., 1, 0.));\n\n  float scale = 1.;\n  #ifdef lighting\n  scale = 1.;\n  #endif\n\n  #ifdef shadow\n//  scale = 2.;\n  if (aPosition.z < 0.) toBeDiscarded = 1.;\n  #endif\n\n  vec3 scaledPosition = vec3(\n  scale * aPosition.x,\n  aPosition.y,\n  scale * aPosition.z * (length(previousFourPosition.xyz - currentFourPosition.xyz) - pathicleGap));\n\n  vPosition = vec3(1., 1., 1.) * (((lookAtMat4 * vec4(scaledPosition, 1.)).xyz\n  + 0.5 * (currentFourPosition.xyz + previousFourPosition.xyz)));\n  #ifdef shadow\n  vPosition.y = vPosition.y * 0. + stageGrid_y + .1;\n  #endif\n  vNormal = normalize((transpose(inverse(lookAtMat4)) * vec4(aNormal, 0.)).xyz);\n\n  gl_Position = projection * view * model * vec4(vPosition, 1.0);\n\n  #ifdef lighting\n  vColorCorrection =  -1. * aColorCorrection;\n\n  if (\n  abs(dot(\n  aNormal,\n  vec3(0., 0., 1.)\n  )) == 1.) { vColorCorrection += -.2; }\n\n    #endif\n\n    #ifdef shadow\n  vColorCorrection = 0.;\n  #endif\n\n  toBeDiscarded = calculateToBeDiscarded(previousFourPosition, currentFourPosition);\n\n}\n\n";
var frag$1 = "precision highp float;\n#define GLSLIFY 1\n\nvarying float toBeDiscarded;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vDiffuseColor;\nvarying float vColorCorrection;\n\nuniform float ambientIntensity;\nuniform float stageGrid_size;\nuniform vec3 eye;\n\nvoid main () {\n\n  if (toBeDiscarded > .0) discard;\n\n  //if (length(vPosition.z) > stageGrid_size/2. - .5) discard;\n\n  vec3 materialColor = (1. + vColorCorrection) * vDiffuseColor;\n  vec3 ambientColor = (ambientIntensity * vec3(1., 1., 1.) * materialColor).rgb;\n  vec3 lightingColor = 3. * ambientColor;\n\n  float opacity = 1.;\n  #ifdef shadow\n  gl_FragColor = vec4(0.6, 0.6, 0.6, .5);\n  #endif\n  #ifdef lighting\n  gl_FragColor = vec4(lightingColor, opacity);\n  #endif\n\n}\n\n";
var fromTranslation_1$1 = fromTranslation$1;
function fromTranslation$1(out, v) {
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
  let modelMatrix = identity_1$1([]);
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
        Math.min(variables.tick.value, model.bufferLength),
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
          return fromTranslation_1$1(modelMatrix, [
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
var frag$2 = "precision mediump float;\n#extension GL_OES_standard_derivatives : enable\n#define GLSLIFY 1\n\nuniform vec2 uResolution;\nuniform vec3 eye;\nuniform sampler2D uTex;\nuniform float ambientIntensity;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n\nconst vec3 fogColor = vec3(1.0);\nconst float FogDensity = 0.3;\n\nfloat grid(vec2 st, float res, float width) {\n  vec2 grid =  fract(st*res) / width;\n  grid /= fwidth(st);\n  return 1. - (step(res, grid.x) * step(res, grid.y));\n}\n\nvoid main() {\n\n  float resolution = 1.;\n  vec2 grid_st = vUv * uResolution * resolution;\n  vec3 color = vec3(.6);\n  color -= vec3(.75) * grid(grid_st, 1. / resolution, 3.);\n  color -= vec3(.5) * grid(grid_st, 10. / resolution, 1.);\n\n  float fogDistance = length(eye - vPosition);\n\n  gl_FragColor = vec4(color.rgb, exp(- fogDistance * FogDensity));\n\n}\n";
var vert$2 = "precision mediump float;\n#define GLSLIFY 1\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\n//\nuniform vec3 uOffset;\nuniform mat4 projection;\nuniform mat4 view;\n//\nvarying vec2 vUv;\nvarying vec3 vPosition;\n\nvoid main () {\n  vUv = uv / 1.;\n  vPosition = position + uOffset;\n\n  gl_Position = projection * view * vec4(vPosition, 1.);\n}\n";
function drawStageCommands(regl, { stageGrid }) {
  const stage = createPlane(stageGrid.size, stageGrid.size);
  const command = () => {
    return regl({
      cull: {
        enable: true,
        face: 'front'
      },
      primitive: 'triangles',
      elements: stage.cells,
      attributes: {
        position: stage.positions,
        uv: stage.uvs
      },
      uniforms: {
        uOffset: [0, stageGrid.y - 0, 0],
        uResolution: [stageGrid.size, stageGrid.size]
      },
      vert: vert$2,
      frag: frag$2
    })
  };
  return {
    lighting: command()
  }
}
function boxesViewSimple(regl, { variables, model, config }) {
  const uniforms = {
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
  const drawBackground = drawBackgroundCommand(regl, config.view);
  function drawDiffuse(props) {
    setParams(config.view, () => {
      drawBackground();
      config.view.isStageVisible && drawStage.lighting(props);
      config.view.isShadowEnabled && drawModel.shadow(props);
      drawModel.lighting(props);
    });
  }
  const destroy = () => {};
  return {
    destroy,
    drawDiffuse
  }
}
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
const defaultConfig = {
  MAX_CANVAS_SIZE: 1024,
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
  runner: {
    prerender: false,
    looping: true,
    mode: 'framewise',
    stepsPerTick: 4,
    stepCount: 256
  },
  model: {
    bufferLength: 256 / 2,
    tickDurationOverC: 0.2,
    boundingBoxSize: -1,
    emitter: {
      particleType: 'ELECTRON',
      randomize: false,
      bunchShape: 'disc',
      particleCount: 256,
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
    ssaoEnabled: false,
    stageGrid: {
      resolution: 256,
      y: -1,
      size: 20,
      dark: 1,
      light: 0.8
    },
    sky: [0.9, 1, 0, 1],
    shadowColor: [0.3, 0.3, 0.3],
    ambientIntensity: 0.6,
    diffuse: 0,
    exposure: 0.2,
    fresnel: 1.0,
    fxaa: false,
    rgbGamma: 1,
    isStageVisible: true,
    isShadowEnabled: false,
    isLatticeVisible: false,
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
      distance: 10,
      fovY: Math.PI / 2.5,
      dTheta: 0.01,
      autorotate: true,
      rotateAboutCenter: true,
      zoomAboutCursor: false,
      zoomDecayTime: 1,
      far: 50,
      near: 0.0001
    }
  },
  dumpData: false
};
const storyDipole = {
  name: 'story-dipole',
  view: {
    camera: {
      center: [0, 0.1, 0],
      theta: 2 * Math.PI / (360 / 90),
      phi: 2 * Math.PI / (360 / 15),
      distance: 5
    }
  },
  model: {
    emitter: {
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE',
      direction: [0, 0.15, -1],
      position: [3.2, -1.5, 0],
      directionJitter: [0.05, 0.0, 0.05],
      positionJitter: [0.5, 0.5, 0.1],
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
const storyElectric = {
  name: 'story-electric',
  view: {
    camera: {
      center: [-2, 0, 0],
      theta: Math.PI / 4,
      phi: 0,
      distance: 5
    }
  },
  model: {
    emitter: {
      particleType: 'ELECTRON ELECTRON ELECTRON PROTON PROTON PROTON   PHOTON PHOTON PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 1, -10],
      directionJitter: [0.01, 0.01, 0],
      positionJitter: [0.1, 0.1, 0],
      gamma: 10
    },
    interactions: {
      electricField: [0, 0, 0.001],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
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
const storyQuadrupole = {
  name: 'story-quadrupole',
  view: {
    camera: {
      center: [0, 1, 0],
      theta: 2 * Math.PI / (360 / 45),
      phi: 2 * Math.PI / (360 / 5),
      distance: 6
    }
  },
  model: {
    emitter: {
      bunchShape: 'SQUARE_YZ',
      particleType: 'ELECTRON ELECTRON ELECTRON PROTON ELECTRON ELECTRON ELECTRON ELECTRON PHOTON',
      position: [-5, 1, 0],
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
const random$1 = {
  name: 'random',
  model: {
    boundingBoxSize: 5,
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
      center: [0, 0, 0],
      theta: Math.PI / 2,
      phi: 0,
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
    stepCount: 10
  },
  model: {
    bufferLength: 11,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 1,
      particleType: 'ELECTRON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 0, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 2
    },
    interactions: {
      electricField: [0, 0, 1],
      particleInteraction: false,
      magneticField: [0, 0.0, 0]
    }
  }
};
const freePhoton = {
  name: 'free-photon',
  view: {
    camera: {
      center: [0, -0.5, 0],
      theta: Math.PI / 2,
      phi: Math.PI / 4,
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
    looping: true,
    mode: 'framewise',
    stepsPerTick: 1,
    stepCount: 10
  },
  model: {
    bufferLength: 11,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 1,
      particleType: 'PHOTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, 0, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 10
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
      center: [0, 0, 0],
      theta: Math.PI / 2,
      phi: 0,
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
    stepCount: 8
  },
  model: {
    bufferLength: 8,
    tickDurationOverC: 0.1,
    emitter: {
      particleCount: 2,
      particleType: 'PHOTON ELECTRON PROTON',
      bunchShape: 'SQUARE',
      direction: [0, 0, 1],
      position: [0, -.5, 0],
      directionJitter: [0, 0, 0],
      positionJitter: [0, 0, 0],
      gamma: 1.1
    },
    interactions: {
      electricField: [0, 0, 0.091],
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
  [random$1.name]: random$1
};
const config = presetName => {
  return nanomerge(defaultConfig, presets[presetName]) || defaultConfig;
};
var presets$1 = Object.freeze({
    __proto__: null,
    config: config,
    defaultConfig: defaultConfig,
    presets: presets
});
var map$1;
try {
  map$1 = Map;
} catch (_) {}
var set$1;
try {
  set$1 = Set;
} catch (_) {}
function clone$1$1 (src) {
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
    return src.map(clone$1$1)
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
      obj[key] = clone$1$1(src[key]);
    }
    return obj
  }
  return src
}
var nanoclone$1 = clone$1$1;
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
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
function createCommonjsModule$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var regl_unchecked = createCommonjsModule$1(function (module, exports) {
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
const Type = require('js-binary').Type;
const binarySchema = new Type({
  tick: 'uint',
  data: {
    position: ['int'],
    particleTypes: ['uint']
  }
});

function saveCanvas(canvasElement, fileName, format = 'png') {
  let MIME_TYPE, FILE_EXTENTION;
  if (format.toLowerCase() === 'png') {
    MIME_TYPE = 'image/png';
    FILE_EXTENTION = 'png';
  } else if (format.toLowerCase() === 'webp') {
    MIME_TYPE = 'image/webp';
    FILE_EXTENTION = 'webp';
  } else if (format.toLowerCase() === 'gif') {
    MIME_TYPE = 'image/gif';
    FILE_EXTENTION = 'gif';
  } else {
    MIME_TYPE = 'image/jpeg';
    FILE_EXTENTION = 'jpg';
  }
  if (navigator.msSaveOrOpenBlob) {
    const blob = canvasElement.msToBlob(MIME_TYPE, 1);
    window.navigator.msSaveBlob(blob, fileName + '.' + FILE_EXTENTION);
  }
  else {
    const imgURL = canvasElement.toDataURL(MIME_TYPE, 1);
    const a = document.createElement('a');
    a.download = fileName + '.' + FILE_EXTENTION;
    a.href = imgURL;
    a.dataset.downloadurl = [MIME_TYPE, a.download, a.href].join(':');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

function keyControl(app) {
  document.addEventListener('keydown', onDocumentKeyDown, false);
  function onDocumentKeyDown(event) {
    event.stopPropagation();
    const keyCode = event.which;
    if (keyCode === 65) {
      app.config.view.camera.autorotate = !app.config.view.camera.autorotate;
    } else if (keyCode === 67) {
      if (app.camera) {
        const cameraConfig = app.camera.toConfig();
        Debug.log(JSON.stringify({ camera: cameraConfig }, null, 2));
      }
    } else if (keyCode === 68) {
      console.log(JSON.stringify(app.simulation.dump(), null, 2));
    } else if (keyCode === 77) {
      app.pathiclesRunner.toggleMode();
    } else if (keyCode === 84) {
      app.config.view.showTextures = !app.config.view.showTextures;
    } else if (keyCode === 71) {
      app.config.drawGrid = !app.config.drawGrid;
    } else if (keyCode === 83) {
      saveCanvas(
        app.regl._gl.canvas,
        'pathicles' + (app.presetName ? '--' + app.presetName : '')
      );
    } else if (keyCode === 78) {
      app.pathiclesRunner.next();
    } else if (keyCode === 76) {
      app.pathiclesRunner.toggleLooping();
    } else if (keyCode === 32) {
      app.pathiclesRunner.toggleActivity();
    }
    return false
  }
}

function canWriteToFBOOfType(regl, type = 'float') {
  if (!regl.hasExtension(`oes_texture_${type.replace(' ', '_')}`)) return false
  try {
    regl.framebuffer({
      colorType: type,
      colorFormat: 'rgba',
      radius: 1
    });
    const uintFBO = regl.framebuffer({
      colorType: 'uint8',
      colorFormat: 'rgba',
      radius: 1
    });
    const draw = regl({
      vert: `
      precision highp float;
      attribute vec2 aXY;
      void main () {
        gl_Position = vec4(aXY, 0, 1);
        gl_PointSize = 1.0;
      }`,
      frag: `
      precision highp float;
      void main () {
        gl_FragColor = vec4(1, 0, 0, 1);
      }`,
      primitive: 'points',
      count: 1,
      attributes: {
        aXY: [0, 0]
      },
      depth: { enable: false }
    });
    const transfer = regl({
      vert: `
      precision highp float;
      attribute vec2 aXY;
      void main () {
        gl_Position = vec4(aXY, 0, 1);
      }`,
      frag: `
      precision highp float;
      void main () {
        gl_FragColor = vec4(1, 0, 0, 1);
      }`,
      attributes: {
        aXY: [-4, -4, 4, -4, 0, 4]
      },
      count: 3,
      primitive: 'triangles',
      depth: { enable: false }
    });
    draw();
    let data;
    uintFBO.use(() => {
      transfer();
      data = regl.read();
    });
    return data[0] !== 0 && data[1] === 0 && data[2] === 0 && data[3] !== 0
  } catch (e) {
    return false
  }
}

const log$1 = require('debug')('pathicles:log');
class ReglSimulatorInstance {
  constructor({ canvas, config, pixelRatio, control, simulate = true }) {
    keyControl(this);
    this.config = config;
    this.simulate = simulate;
    this.control = control;
    REGL({
      canvas,
      profile: this.config.profile,
      attributes: {
        preserveDrawingBuffer: false,
        antialiasing: true
      },
      pixelRatio,
      onDone: (err, regl) => {
        if (err) return console.error(err)
        try {
          this.regl = regl;
          PerformanceLogger$1.start('canWriteToFBOOfType');
          log$1('canWriteToFBOOfType: ' + canWriteToFBOOfType(regl, 'float'));
          PerformanceLogger$1.stop();
          window.pathicles = this;
          PerformanceLogger$1.start('init');
          this.init(regl);
          PerformanceLogger$1.stop();
          this.run(regl);
        } catch (e) {
          console.error(e);
          log$1(e);
        }
      },
      extensions: simulate
        ? [
            'angle_instanced_arrays',
            'oes_texture_float',
            'OES_standard_derivatives'
          ]
        : [
            'angle_instanced_arrays',
            'oes_texture_float',
            'OES_standard_derivatives'
          ]
    });
  }
  destroy() {
    this.regl.destroy();
  }
  loadConfig(config) {
    this.stop(this.regl);
    this.config = config;
    this.init(this.regl);
    this.run(this.regl);
  }
  init(regl) {
    this.regl._commands = [];
    this.cameras = [];
    this.setCameraUniforms = []
    ;[this.cameras['free'], this.setCameraUniforms['free']] = freeCameraFactory(
      { ...this.config.view.camera },
      regl
    );
    this.camera = this.cameras['free'];
    PerformanceLogger$1.start('init.simulation');
    this.simulation = new Simulation(regl, {
      ...this.config
    });
    PerformanceLogger$1.stop();
    PerformanceLogger$1.start('init.view');
    this.view = boxesViewSimple(regl, {
      variables: this.simulation.variables,
      model: this.simulation.model,
      config: this.config
    });
    PerformanceLogger$1.stop();
    PerformanceLogger$1.start('init.runner');
    this.pathiclesRunner = new SimulationFSM(this.simulation, {
      ...this.config.runner,
      simulate: this.simulate
    });
    PerformanceLogger$1.stop();
  }
  run(regl) {
    log$1('run');
    if (this.simulate) this.pathiclesRunner.start();
    const mainloop = () => {
      return regl.frame(() => {
        if (this.simulate) this.pathiclesRunner.next();
        this.setCameraUniforms[this.control.cameraMode](
          {
            ...this.cameras[this.control.cameraMode]
          },
          () => {
            this.cameras['free'].tick({});
            this.view.drawDiffuse({ viewRange: [0, 1] });
            if (this.config.view.showTextures) {
              this.simulation.drawVariableTexture({ variableName: 'position' });
              this.simulation.drawVariableTexture({ variableName: 'velocity' });
            }
          }
        );
      })
    };
    this.loop = mainloop();
  }
  stop() {
    this.loop.cancel();
  }
}

export { ReglSimulatorInstance };
