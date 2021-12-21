(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // ../../../node_modules/gl-vec3/transformMat4.js
  var require_transformMat4 = __commonJS({
    "../../../node_modules/gl-vec3/transformMat4.js"(exports, module) {
      module.exports = transformMat42;
      function transformMat42(out, a, m) {
        var x = a[0], y = a[1], z = a[2], w = m[3] * x + m[7] * y + m[11] * z + m[15];
        w = w || 1;
        out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
        out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
        out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/rotateY.js
  var require_rotateY = __commonJS({
    "../../../node_modules/gl-vec3/rotateY.js"(exports, module) {
      module.exports = rotateY;
      function rotateY(out, a, b, c2) {
        var bx = b[0];
        var bz = b[2];
        var px = a[0] - bx;
        var pz = a[2] - bz;
        var sc = Math.sin(c2);
        var cc = Math.cos(c2);
        out[0] = bx + pz * sc + px * cc;
        out[1] = a[1];
        out[2] = bz + pz * cc - px * sc;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/rotateX.js
  var require_rotateX = __commonJS({
    "../../../node_modules/gl-vec3/rotateX.js"(exports, module) {
      module.exports = rotateX;
      function rotateX(out, a, b, c2) {
        var by = b[1];
        var bz = b[2];
        var py = a[1] - by;
        var pz = a[2] - bz;
        var sc = Math.sin(c2);
        var cc = Math.cos(c2);
        out[0] = a[0];
        out[1] = by + py * cc - pz * sc;
        out[2] = bz + py * sc + pz * cc;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/epsilon.js
  var require_epsilon = __commonJS({
    "../../../node_modules/gl-vec3/epsilon.js"(exports, module) {
      module.exports = 1e-6;
    }
  });

  // ../../../node_modules/gl-vec3/equals.js
  var require_equals = __commonJS({
    "../../../node_modules/gl-vec3/equals.js"(exports, module) {
      module.exports = equals;
      var EPSILON = require_epsilon();
      function equals(a, b) {
        var a0 = a[0];
        var a1 = a[1];
        var a2 = a[2];
        var b0 = b[0];
        var b1 = b[1];
        var b2 = b[2];
        return Math.abs(a0 - b0) <= EPSILON * Math.max(1, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1, Math.abs(a2), Math.abs(b2));
      }
    }
  });

  // ../../../node_modules/gl-vec3/add.js
  var require_add = __commonJS({
    "../../../node_modules/gl-vec3/add.js"(exports, module) {
      module.exports = add2;
      function add2(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/scaleAndAdd.js
  var require_scaleAndAdd = __commonJS({
    "../../../node_modules/gl-vec3/scaleAndAdd.js"(exports, module) {
      module.exports = scaleAndAdd;
      function scaleAndAdd(out, a, b, scale) {
        out[0] = a[0] + b[0] * scale;
        out[1] = a[1] + b[1] * scale;
        out[2] = a[2] + b[2] * scale;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/copy.js
  var require_copy = __commonJS({
    "../../../node_modules/gl-vec3/copy.js"(exports, module) {
      module.exports = copy;
      function copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/normalize.js
  var require_normalize = __commonJS({
    "../../../node_modules/gl-vec3/normalize.js"(exports, module) {
      module.exports = normalize2;
      function normalize2(out, a) {
        var x = a[0], y = a[1], z = a[2];
        var len = x * x + y * y + z * z;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
          out[0] = a[0] * len;
          out[1] = a[1] * len;
          out[2] = a[2] * len;
        }
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/identity.js
  var require_identity = __commonJS({
    "../../../node_modules/gl-mat4/identity.js"(exports, module) {
      module.exports = identity4;
      function identity4(out) {
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
    }
  });

  // ../../../node_modules/gl-mat4/invert.js
  var require_invert = __commonJS({
    "../../../node_modules/gl-mat4/invert.js"(exports, module) {
      module.exports = invert;
      function invert(out, a) {
        var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
          return null;
        }
        det = 1 / det;
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
    }
  });

  // ../../../node_modules/gl-mat4/translate.js
  var require_translate = __commonJS({
    "../../../node_modules/gl-mat4/translate.js"(exports, module) {
      module.exports = translate;
      function translate(out, a, v) {
        var x = v[0], y = v[1], z = v[2], a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23;
        if (a === out) {
          out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
          out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
          out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
          out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
        } else {
          a00 = a[0];
          a01 = a[1];
          a02 = a[2];
          a03 = a[3];
          a10 = a[4];
          a11 = a[5];
          a12 = a[6];
          a13 = a[7];
          a20 = a[8];
          a21 = a[9];
          a22 = a[10];
          a23 = a[11];
          out[0] = a00;
          out[1] = a01;
          out[2] = a02;
          out[3] = a03;
          out[4] = a10;
          out[5] = a11;
          out[6] = a12;
          out[7] = a13;
          out[8] = a20;
          out[9] = a21;
          out[10] = a22;
          out[11] = a23;
          out[12] = a00 * x + a10 * y + a20 * z + a[12];
          out[13] = a01 * x + a11 * y + a21 * z + a[13];
          out[14] = a02 * x + a12 * y + a22 * z + a[14];
          out[15] = a03 * x + a13 * y + a23 * z + a[15];
        }
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/scale.js
  var require_scale = __commonJS({
    "../../../node_modules/gl-mat4/scale.js"(exports, module) {
      module.exports = scale;
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
    }
  });

  // ../../../node_modules/gl-mat4/lookAt.js
  var require_lookAt = __commonJS({
    "../../../node_modules/gl-mat4/lookAt.js"(exports, module) {
      var identity4 = require_identity();
      module.exports = lookAt3;
      function lookAt3(out, eye, center, up) {
        var x0, x1, x2, y0, y1, y2, z0, z1, z2, len, eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2], centerx = center[0], centery = center[1], centerz = center[2];
        if (Math.abs(eyex - centerx) < 1e-6 && Math.abs(eyey - centery) < 1e-6 && Math.abs(eyez - centerz) < 1e-6) {
          return identity4(out);
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
    }
  });

  // ../../../node_modules/gl-mat4/perspective.js
  var require_perspective = __commonJS({
    "../../../node_modules/gl-mat4/perspective.js"(exports, module) {
      module.exports = perspective2;
      function perspective2(out, fovy, aspect, near, far) {
        var f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
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
        out[14] = 2 * far * near * nf;
        out[15] = 0;
        return out;
      }
    }
  });

  // ../../../node_modules/mouse-event/mouse.js
  var require_mouse = __commonJS({
    "../../../node_modules/mouse-event/mouse.js"(exports) {
      "use strict";
      function mouseButtons(ev) {
        if (typeof ev === "object") {
          if ("buttons" in ev) {
            return ev.buttons;
          } else if ("which" in ev) {
            var b = ev.which;
            if (b === 2) {
              return 4;
            } else if (b === 3) {
              return 2;
            } else if (b > 0) {
              return 1 << b - 1;
            }
          } else if ("button" in ev) {
            var b = ev.button;
            if (b === 1) {
              return 4;
            } else if (b === 2) {
              return 2;
            } else if (b >= 0) {
              return 1 << b;
            }
          }
        }
        return 0;
      }
      exports.buttons = mouseButtons;
      function mouseElement(ev) {
        return ev.target || ev.srcElement || window;
      }
      exports.element = mouseElement;
      function mouseRelativeX(ev) {
        if (typeof ev === "object") {
          if ("offsetX" in ev) {
            return ev.offsetX;
          }
          var target = mouseElement(ev);
          var bounds = target.getBoundingClientRect();
          return ev.clientX - bounds.left;
        }
        return 0;
      }
      exports.x = mouseRelativeX;
      function mouseRelativeY(ev) {
        if (typeof ev === "object") {
          if ("offsetY" in ev) {
            return ev.offsetY;
          }
          var target = mouseElement(ev);
          var bounds = target.getBoundingClientRect();
          return ev.clientY - bounds.top;
        }
        return 0;
      }
      exports.y = mouseRelativeY;
    }
  });

  // ../../../node_modules/mouse-change/mouse-listen.js
  var require_mouse_listen = __commonJS({
    "../../../node_modules/mouse-change/mouse-listen.js"(exports, module) {
      "use strict";
      module.exports = mouseListen;
      var mouse = require_mouse();
      function mouseListen(element, callback) {
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
        function updateMods(ev) {
          var changed = false;
          if ("altKey" in ev) {
            changed = changed || ev.altKey !== mods.alt;
            mods.alt = !!ev.altKey;
          }
          if ("shiftKey" in ev) {
            changed = changed || ev.shiftKey !== mods.shift;
            mods.shift = !!ev.shiftKey;
          }
          if ("ctrlKey" in ev) {
            changed = changed || ev.ctrlKey !== mods.control;
            mods.control = !!ev.ctrlKey;
          }
          if ("metaKey" in ev) {
            changed = changed || ev.metaKey !== mods.meta;
            mods.meta = !!ev.metaKey;
          }
          return changed;
        }
        function handleEvent(nextButtons, ev) {
          var nextX = mouse.x(ev);
          var nextY = mouse.y(ev);
          if ("buttons" in ev) {
            nextButtons = ev.buttons | 0;
          }
          if (nextButtons !== buttonState || nextX !== x || nextY !== y || updateMods(ev)) {
            buttonState = nextButtons | 0;
            x = nextX || 0;
            y = nextY || 0;
            callback && callback(buttonState, x, y, mods);
          }
        }
        function clearState(ev) {
          handleEvent(0, ev);
        }
        function handleBlur() {
          if (buttonState || x || y || mods.shift || mods.alt || mods.meta || mods.control) {
            x = y = 0;
            buttonState = 0;
            mods.shift = mods.alt = mods.control = mods.meta = false;
            callback && callback(0, 0, 0, mods);
          }
        }
        function handleMods(ev) {
          if (updateMods(ev)) {
            callback && callback(buttonState, x, y, mods);
          }
        }
        function handleMouseMove(ev) {
          if (mouse.buttons(ev) === 0) {
            handleEvent(0, ev);
          } else {
            handleEvent(buttonState, ev);
          }
        }
        function handleMouseDown(ev) {
          handleEvent(buttonState | mouse.buttons(ev), ev);
        }
        function handleMouseUp(ev) {
          handleEvent(buttonState & ~mouse.buttons(ev), ev);
        }
        function attachListeners() {
          if (attached) {
            return;
          }
          attached = true;
          element.addEventListener("mousemove", handleMouseMove);
          element.addEventListener("mousedown", handleMouseDown);
          element.addEventListener("mouseup", handleMouseUp);
          element.addEventListener("mouseleave", clearState);
          element.addEventListener("mouseenter", clearState);
          element.addEventListener("mouseout", clearState);
          element.addEventListener("mouseover", clearState);
          element.addEventListener("blur", handleBlur);
          element.addEventListener("keyup", handleMods);
          element.addEventListener("keydown", handleMods);
          element.addEventListener("keypress", handleMods);
          if (element !== window) {
            window.addEventListener("blur", handleBlur);
            window.addEventListener("keyup", handleMods);
            window.addEventListener("keydown", handleMods);
            window.addEventListener("keypress", handleMods);
          }
        }
        function detachListeners() {
          if (!attached) {
            return;
          }
          attached = false;
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mousedown", handleMouseDown);
          element.removeEventListener("mouseup", handleMouseUp);
          element.removeEventListener("mouseleave", clearState);
          element.removeEventListener("mouseenter", clearState);
          element.removeEventListener("mouseout", clearState);
          element.removeEventListener("mouseover", clearState);
          element.removeEventListener("blur", handleBlur);
          element.removeEventListener("keyup", handleMods);
          element.removeEventListener("keydown", handleMods);
          element.removeEventListener("keypress", handleMods);
          if (element !== window) {
            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("keyup", handleMods);
            window.removeEventListener("keydown", handleMods);
            window.removeEventListener("keypress", handleMods);
          }
        }
        attachListeners();
        var result = {
          element
        };
        Object.defineProperties(result, {
          enabled: {
            get: function() {
              return attached;
            },
            set: function(f) {
              if (f) {
                attachListeners();
              } else {
                detachListeners();
              }
            },
            enumerable: true
          },
          buttons: {
            get: function() {
              return buttonState;
            },
            enumerable: true
          },
          x: {
            get: function() {
              return x;
            },
            enumerable: true
          },
          y: {
            get: function() {
              return y;
            },
            enumerable: true
          },
          mods: {
            get: function() {
              return mods;
            },
            enumerable: true
          }
        });
        return result;
      }
    }
  });

  // ../../../node_modules/mouse-event-offset/index.js
  var require_mouse_event_offset = __commonJS({
    "../../../node_modules/mouse-event-offset/index.js"(exports, module) {
      var rootPosition = { left: 0, top: 0 };
      module.exports = mouseEventOffset;
      function mouseEventOffset(ev, target, out) {
        target = target || ev.currentTarget || ev.srcElement;
        if (!Array.isArray(out)) {
          out = [0, 0];
        }
        var cx = ev.clientX || 0;
        var cy = ev.clientY || 0;
        var rect = getBoundingClientOffset(target);
        out[0] = cx - rect.left;
        out[1] = cy - rect.top;
        return out;
      }
      function getBoundingClientOffset(element) {
        if (element === window || element === document || element === document.body) {
          return rootPosition;
        } else {
          return element.getBoundingClientRect();
        }
      }
    }
  });

  // ../../../node_modules/type/value/is.js
  var require_is = __commonJS({
    "../../../node_modules/type/value/is.js"(exports, module) {
      "use strict";
      var _undefined = void 0;
      module.exports = function(value) {
        return value !== _undefined && value !== null;
      };
    }
  });

  // ../../../node_modules/type/object/is.js
  var require_is2 = __commonJS({
    "../../../node_modules/type/object/is.js"(exports, module) {
      "use strict";
      var isValue = require_is();
      var possibleTypes = { "object": true, "function": true, "undefined": true };
      module.exports = function(value) {
        if (!isValue(value))
          return false;
        return hasOwnProperty.call(possibleTypes, typeof value);
      };
    }
  });

  // ../../../node_modules/type/prototype/is.js
  var require_is3 = __commonJS({
    "../../../node_modules/type/prototype/is.js"(exports, module) {
      "use strict";
      var isObject = require_is2();
      module.exports = function(value) {
        if (!isObject(value))
          return false;
        try {
          if (!value.constructor)
            return false;
          return value.constructor.prototype === value;
        } catch (error) {
          return false;
        }
      };
    }
  });

  // ../../../node_modules/type/function/is.js
  var require_is4 = __commonJS({
    "../../../node_modules/type/function/is.js"(exports, module) {
      "use strict";
      var isPrototype = require_is3();
      module.exports = function(value) {
        if (typeof value !== "function")
          return false;
        if (!hasOwnProperty.call(value, "length"))
          return false;
        try {
          if (typeof value.length !== "number")
            return false;
          if (typeof value.call !== "function")
            return false;
          if (typeof value.apply !== "function")
            return false;
        } catch (error) {
          return false;
        }
        return !isPrototype(value);
      };
    }
  });

  // ../../../node_modules/type/plain-function/is.js
  var require_is5 = __commonJS({
    "../../../node_modules/type/plain-function/is.js"(exports, module) {
      "use strict";
      var isFunction = require_is4();
      var classRe = /^\s*class[\s{/}]/;
      var functionToString = Function.prototype.toString;
      module.exports = function(value) {
        if (!isFunction(value))
          return false;
        if (classRe.test(functionToString.call(value)))
          return false;
        return true;
      };
    }
  });

  // ../../../node_modules/es5-ext/object/assign/is-implemented.js
  var require_is_implemented = __commonJS({
    "../../../node_modules/es5-ext/object/assign/is-implemented.js"(exports, module) {
      "use strict";
      module.exports = function() {
        var assign = Object.assign, obj;
        if (typeof assign !== "function")
          return false;
        obj = { foo: "raz" };
        assign(obj, { bar: "dwa" }, { trzy: "trzy" });
        return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
      };
    }
  });

  // ../../../node_modules/es5-ext/object/keys/is-implemented.js
  var require_is_implemented2 = __commonJS({
    "../../../node_modules/es5-ext/object/keys/is-implemented.js"(exports, module) {
      "use strict";
      module.exports = function() {
        try {
          Object.keys("primitive");
          return true;
        } catch (e) {
          return false;
        }
      };
    }
  });

  // ../../../node_modules/es5-ext/function/noop.js
  var require_noop = __commonJS({
    "../../../node_modules/es5-ext/function/noop.js"(exports, module) {
      "use strict";
      module.exports = function() {
      };
    }
  });

  // ../../../node_modules/es5-ext/object/is-value.js
  var require_is_value = __commonJS({
    "../../../node_modules/es5-ext/object/is-value.js"(exports, module) {
      "use strict";
      var _undefined = require_noop()();
      module.exports = function(val) {
        return val !== _undefined && val !== null;
      };
    }
  });

  // ../../../node_modules/es5-ext/object/keys/shim.js
  var require_shim = __commonJS({
    "../../../node_modules/es5-ext/object/keys/shim.js"(exports, module) {
      "use strict";
      var isValue = require_is_value();
      var keys = Object.keys;
      module.exports = function(object) {
        return keys(isValue(object) ? Object(object) : object);
      };
    }
  });

  // ../../../node_modules/es5-ext/object/keys/index.js
  var require_keys = __commonJS({
    "../../../node_modules/es5-ext/object/keys/index.js"(exports, module) {
      "use strict";
      module.exports = require_is_implemented2()() ? Object.keys : require_shim();
    }
  });

  // ../../../node_modules/es5-ext/object/valid-value.js
  var require_valid_value = __commonJS({
    "../../../node_modules/es5-ext/object/valid-value.js"(exports, module) {
      "use strict";
      var isValue = require_is_value();
      module.exports = function(value) {
        if (!isValue(value))
          throw new TypeError("Cannot use null or undefined");
        return value;
      };
    }
  });

  // ../../../node_modules/es5-ext/object/assign/shim.js
  var require_shim2 = __commonJS({
    "../../../node_modules/es5-ext/object/assign/shim.js"(exports, module) {
      "use strict";
      var keys = require_keys();
      var value = require_valid_value();
      var max2 = Math.max;
      module.exports = function(dest, src) {
        var error, i, length2 = max2(arguments.length, 2), assign;
        dest = Object(value(dest));
        assign = function(key) {
          try {
            dest[key] = src[key];
          } catch (e) {
            if (!error)
              error = e;
          }
        };
        for (i = 1; i < length2; ++i) {
          src = arguments[i];
          keys(src).forEach(assign);
        }
        if (error !== void 0)
          throw error;
        return dest;
      };
    }
  });

  // ../../../node_modules/es5-ext/object/assign/index.js
  var require_assign = __commonJS({
    "../../../node_modules/es5-ext/object/assign/index.js"(exports, module) {
      "use strict";
      module.exports = require_is_implemented()() ? Object.assign : require_shim2();
    }
  });

  // ../../../node_modules/es5-ext/object/normalize-options.js
  var require_normalize_options = __commonJS({
    "../../../node_modules/es5-ext/object/normalize-options.js"(exports, module) {
      "use strict";
      var isValue = require_is_value();
      var forEach = Array.prototype.forEach;
      var create = Object.create;
      var process = function(src, obj) {
        var key;
        for (key in src)
          obj[key] = src[key];
      };
      module.exports = function(opts1) {
        var result = create(null);
        forEach.call(arguments, function(options) {
          if (!isValue(options))
            return;
          process(Object(options), result);
        });
        return result;
      };
    }
  });

  // ../../../node_modules/es5-ext/string/#/contains/is-implemented.js
  var require_is_implemented3 = __commonJS({
    "../../../node_modules/es5-ext/string/#/contains/is-implemented.js"(exports, module) {
      "use strict";
      var str = "razdwatrzy";
      module.exports = function() {
        if (typeof str.contains !== "function")
          return false;
        return str.contains("dwa") === true && str.contains("foo") === false;
      };
    }
  });

  // ../../../node_modules/es5-ext/string/#/contains/shim.js
  var require_shim3 = __commonJS({
    "../../../node_modules/es5-ext/string/#/contains/shim.js"(exports, module) {
      "use strict";
      var indexOf = String.prototype.indexOf;
      module.exports = function(searchString) {
        return indexOf.call(this, searchString, arguments[1]) > -1;
      };
    }
  });

  // ../../../node_modules/es5-ext/string/#/contains/index.js
  var require_contains = __commonJS({
    "../../../node_modules/es5-ext/string/#/contains/index.js"(exports, module) {
      "use strict";
      module.exports = require_is_implemented3()() ? String.prototype.contains : require_shim3();
    }
  });

  // ../../../node_modules/d/index.js
  var require_d = __commonJS({
    "../../../node_modules/d/index.js"(exports, module) {
      "use strict";
      var isValue = require_is();
      var isPlainFunction = require_is5();
      var assign = require_assign();
      var normalizeOpts = require_normalize_options();
      var contains = require_contains();
      var d = module.exports = function(dscr, value) {
        var c2, e, w, options, desc;
        if (arguments.length < 2 || typeof dscr !== "string") {
          options = value;
          value = dscr;
          dscr = null;
        } else {
          options = arguments[2];
        }
        if (isValue(dscr)) {
          c2 = contains.call(dscr, "c");
          e = contains.call(dscr, "e");
          w = contains.call(dscr, "w");
        } else {
          c2 = w = true;
          e = false;
        }
        desc = { value, configurable: c2, enumerable: e, writable: w };
        return !options ? desc : assign(normalizeOpts(options), desc);
      };
      d.gs = function(dscr, get, set) {
        var c2, e, options, desc;
        if (typeof dscr !== "string") {
          options = set;
          set = get;
          get = dscr;
          dscr = null;
        } else {
          options = arguments[3];
        }
        if (!isValue(get)) {
          get = void 0;
        } else if (!isPlainFunction(get)) {
          options = get;
          get = set = void 0;
        } else if (!isValue(set)) {
          set = void 0;
        } else if (!isPlainFunction(set)) {
          options = set;
          set = void 0;
        }
        if (isValue(dscr)) {
          c2 = contains.call(dscr, "c");
          e = contains.call(dscr, "e");
        } else {
          c2 = true;
          e = false;
        }
        desc = { get, set, configurable: c2, enumerable: e };
        return !options ? desc : assign(normalizeOpts(options), desc);
      };
    }
  });

  // ../../../node_modules/es5-ext/object/valid-callable.js
  var require_valid_callable = __commonJS({
    "../../../node_modules/es5-ext/object/valid-callable.js"(exports, module) {
      "use strict";
      module.exports = function(fn) {
        if (typeof fn !== "function")
          throw new TypeError(fn + " is not a function");
        return fn;
      };
    }
  });

  // ../../../node_modules/event-emitter/index.js
  var require_event_emitter = __commonJS({
    "../../../node_modules/event-emitter/index.js"(exports, module) {
      "use strict";
      var d = require_d();
      var callable = require_valid_callable();
      var apply = Function.prototype.apply;
      var call = Function.prototype.call;
      var create = Object.create;
      var defineProperty = Object.defineProperty;
      var defineProperties = Object.defineProperties;
      var hasOwnProperty2 = Object.prototype.hasOwnProperty;
      var descriptor = { configurable: true, enumerable: false, writable: true };
      var on;
      var once;
      var off;
      var emit;
      var methods;
      var descriptors;
      var base;
      on = function(type, listener) {
        var data;
        callable(listener);
        if (!hasOwnProperty2.call(this, "__ee__")) {
          data = descriptor.value = create(null);
          defineProperty(this, "__ee__", descriptor);
          descriptor.value = null;
        } else {
          data = this.__ee__;
        }
        if (!data[type])
          data[type] = listener;
        else if (typeof data[type] === "object")
          data[type].push(listener);
        else
          data[type] = [data[type], listener];
        return this;
      };
      once = function(type, listener) {
        var once2, self;
        callable(listener);
        self = this;
        on.call(this, type, once2 = function() {
          off.call(self, type, once2);
          apply.call(listener, this, arguments);
        });
        once2.__eeOnceListener__ = listener;
        return this;
      };
      off = function(type, listener) {
        var data, listeners, candidate, i;
        callable(listener);
        if (!hasOwnProperty2.call(this, "__ee__"))
          return this;
        data = this.__ee__;
        if (!data[type])
          return this;
        listeners = data[type];
        if (typeof listeners === "object") {
          for (i = 0; candidate = listeners[i]; ++i) {
            if (candidate === listener || candidate.__eeOnceListener__ === listener) {
              if (listeners.length === 2)
                data[type] = listeners[i ? 0 : 1];
              else
                listeners.splice(i, 1);
            }
          }
        } else {
          if (listeners === listener || listeners.__eeOnceListener__ === listener) {
            delete data[type];
          }
        }
        return this;
      };
      emit = function(type) {
        var i, l, listener, listeners, args;
        if (!hasOwnProperty2.call(this, "__ee__"))
          return;
        listeners = this.__ee__[type];
        if (!listeners)
          return;
        if (typeof listeners === "object") {
          l = arguments.length;
          args = new Array(l - 1);
          for (i = 1; i < l; ++i)
            args[i - 1] = arguments[i];
          listeners = listeners.slice();
          for (i = 0; listener = listeners[i]; ++i) {
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
        on,
        once,
        off,
        emit
      };
      descriptors = {
        on: d(on),
        once: d(once),
        off: d(off),
        emit: d(emit)
      };
      base = defineProperties({}, descriptors);
      module.exports = exports = function(o) {
        return o == null ? create(base) : defineProperties(Object(o), descriptors);
      };
      exports.methods = methods;
    }
  });

  // ../../../node_modules/ts-deepmerge/dist/index.js
  var require_dist = __commonJS({
    "../../../node_modules/ts-deepmerge/dist/index.js"(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      var __read = exports && exports.__read || function(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
          return o;
        var i = m.call(o), r, ar = [], e;
        try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
            ar.push(r.value);
        } catch (error) {
          e = { error };
        } finally {
          try {
            if (r && !r.done && (m = i["return"]))
              m.call(i);
          } finally {
            if (e)
              throw e.error;
          }
        }
        return ar;
      };
      var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var isObject = function(obj) {
        if (typeof obj === "object" && obj !== null) {
          if (typeof Object.getPrototypeOf === "function") {
            var prototype = Object.getPrototypeOf(obj);
            return prototype === Object.prototype || prototype === null;
          }
          return Object.prototype.toString.call(obj) === "[object Object]";
        }
        return false;
      };
      var merge2 = function() {
        var objects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          objects[_i] = arguments[_i];
        }
        return objects.reduce(function(result, current) {
          Object.keys(current).forEach(function(key) {
            if (Array.isArray(result[key]) && Array.isArray(current[key])) {
              result[key] = merge2.options.mergeArrays ? Array.from(new Set(result[key].concat(current[key]))) : current[key];
            } else if (isObject(result[key]) && isObject(current[key])) {
              result[key] = merge2(result[key], current[key]);
            } else {
              result[key] = current[key];
            }
          });
          return result;
        }, {});
      };
      var defaultOptions = {
        mergeArrays: true
      };
      merge2.options = defaultOptions;
      merge2.withOptions = function(options) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          objects[_i - 1] = arguments[_i];
        }
        merge2.options = __assign({ mergeArrays: true }, options);
        var result = merge2.apply(void 0, __spreadArray([], __read(objects), false));
        merge2.options = defaultOptions;
        return result;
      };
      exports.default = merge2;
    }
  });

  // ../../../node_modules/primitive-cylinder/index.js
  var require_primitive_cylinder = __commonJS({
    "../../../node_modules/primitive-cylinder/index.js"(exports, module) {
      function createCylinderMesh(radiusTop, radiusBottom, height, radialSegments, heightSegments) {
        var index = 0;
        var indexOffset = 0;
        var indexArray = [];
        radiusTop = typeof radiusTop !== "undefined" ? radiusTop : 1;
        radiusBottom = typeof radiusBottom !== "undefined" ? radiusBottom : 1;
        height = typeof height !== "undefined" ? height : 5;
        radialSegments = typeof radialSegments !== "undefined" ? radialSegments : 64;
        heightSegments = typeof heightSegments !== "undefined" ? heightSegments : 8;
        var capCount = 0;
        if (radiusTop > 0) {
          capCount++;
        }
        if (radiusBottom > 0) {
          capCount++;
        }
        var vertexCount = (radialSegments + 1) * (heightSegments + 1) + (radialSegments + 2) * capCount;
        var cellCount = radialSegments * heightSegments * 2 + radialSegments * capCount;
        var normals = new Array(vertexCount);
        var vertices = new Array(vertexCount);
        var uvs = new Array(vertexCount);
        var cells = new Array(cellCount);
        var slope = (radiusBottom - radiusTop) / height;
        var thetaLength = 2 * Math.PI;
        for (var y = 0; y <= heightSegments; y++) {
          var indexRow = [];
          var v = y / heightSegments;
          var radius = v * (radiusBottom - radiusTop) + radiusTop;
          for (var x = 0; x <= radialSegments; x++) {
            var u = x / radialSegments;
            var theta = u * thetaLength;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);
            vertices[index] = [radius * sinTheta, -v * height + height / 2, radius * cosTheta];
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
        var generateCap = function(top) {
          var vertex = new Array(3).fill(0);
          var radius2 = top === true ? radiusTop : radiusBottom;
          var sign = top === true ? 1 : -1;
          var centerIndexStart = index;
          for (var x2 = 1; x2 <= radialSegments; x2++) {
            vertices[index] = [0, height * sign / 2, 0];
            normals[index] = [0, sign, 0];
            uvs[index] = [0.5, 0.5];
            index++;
          }
          var centerIndexEnd = index;
          for (var x2 = 0; x2 <= radialSegments; x2++) {
            var u2 = x2 / radialSegments;
            var theta2 = u2 * thetaLength;
            var cosTheta2 = Math.cos(theta2);
            var sinTheta2 = Math.sin(theta2);
            vertices[index] = [radius2 * sinTheta2, height * sign / 2, radius2 * cosTheta2];
            normals[index] = [0, sign, 0];
            uvs[index] = [cosTheta2 * 0.5 + 0.5, sinTheta2 * 0.5 * sign + 0.5];
            index++;
          }
          for (var x2 = 0; x2 < radialSegments; x2++) {
            var c2 = centerIndexStart + x2;
            var i = centerIndexEnd + x2;
            if (top === true) {
              cells[indexOffset] = [i, i + 1, c2];
              indexOffset++;
            } else {
              cells[indexOffset] = [i + 1, i, c2];
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
          uvs,
          cells,
          normals,
          positions: vertices
        };
      }
      module.exports = createCylinderMesh;
    }
  });

  // ../../../node_modules/gl-mat4/fromTranslation.js
  var require_fromTranslation = __commonJS({
    "../../../node_modules/gl-mat4/fromTranslation.js"(exports, module) {
      module.exports = fromTranslation3;
      function fromTranslation3(out, v) {
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
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/create.js
  var require_create = __commonJS({
    "../../../node_modules/gl-mat4/create.js"(exports, module) {
      module.exports = create;
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
    }
  });

  // ../../../node_modules/gl-mat4/clone.js
  var require_clone = __commonJS({
    "../../../node_modules/gl-mat4/clone.js"(exports, module) {
      module.exports = clone;
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
    }
  });

  // ../../../node_modules/gl-mat4/copy.js
  var require_copy2 = __commonJS({
    "../../../node_modules/gl-mat4/copy.js"(exports, module) {
      module.exports = copy;
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
    }
  });

  // ../../../node_modules/gl-mat4/transpose.js
  var require_transpose = __commonJS({
    "../../../node_modules/gl-mat4/transpose.js"(exports, module) {
      module.exports = transpose;
      function transpose(out, a) {
        if (out === a) {
          var a01 = a[1], a02 = a[2], a03 = a[3], a12 = a[6], a13 = a[7], a23 = a[11];
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
    }
  });

  // ../../../node_modules/gl-mat4/adjoint.js
  var require_adjoint = __commonJS({
    "../../../node_modules/gl-mat4/adjoint.js"(exports, module) {
      module.exports = adjoint;
      function adjoint(out, a) {
        var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
        out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
        out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
        out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
        out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
        out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
        out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
        out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
        out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
        out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
        out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
        out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
        out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
        out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
        out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
        out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/determinant.js
  var require_determinant = __commonJS({
    "../../../node_modules/gl-mat4/determinant.js"(exports, module) {
      module.exports = determinant;
      function determinant(a) {
        var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32;
        return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      }
    }
  });

  // ../../../node_modules/gl-mat4/multiply.js
  var require_multiply = __commonJS({
    "../../../node_modules/gl-mat4/multiply.js"(exports, module) {
      module.exports = multiply2;
      function multiply2(out, a, b) {
        var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/rotate.js
  var require_rotate = __commonJS({
    "../../../node_modules/gl-mat4/rotate.js"(exports, module) {
      module.exports = rotate2;
      function rotate2(out, a, rad, axis) {
        var x = axis[0], y = axis[1], z = axis[2], len = Math.sqrt(x * x + y * y + z * z), s, c2, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;
        if (Math.abs(len) < 1e-6) {
          return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        s = Math.sin(rad);
        c2 = Math.cos(rad);
        t = 1 - c2;
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        b00 = x * x * t + c2;
        b01 = y * x * t + z * s;
        b02 = z * x * t - y * s;
        b10 = x * y * t - z * s;
        b11 = y * y * t + c2;
        b12 = z * y * t + x * s;
        b20 = x * z * t + y * s;
        b21 = y * z * t - x * s;
        b22 = z * z * t + c2;
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
    }
  });

  // ../../../node_modules/gl-mat4/rotateX.js
  var require_rotateX2 = __commonJS({
    "../../../node_modules/gl-mat4/rotateX.js"(exports, module) {
      module.exports = rotateX;
      function rotateX(out, a, rad) {
        var s = Math.sin(rad), c2 = Math.cos(rad), a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        if (a !== out) {
          out[0] = a[0];
          out[1] = a[1];
          out[2] = a[2];
          out[3] = a[3];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        out[4] = a10 * c2 + a20 * s;
        out[5] = a11 * c2 + a21 * s;
        out[6] = a12 * c2 + a22 * s;
        out[7] = a13 * c2 + a23 * s;
        out[8] = a20 * c2 - a10 * s;
        out[9] = a21 * c2 - a11 * s;
        out[10] = a22 * c2 - a12 * s;
        out[11] = a23 * c2 - a13 * s;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/rotateY.js
  var require_rotateY2 = __commonJS({
    "../../../node_modules/gl-mat4/rotateY.js"(exports, module) {
      module.exports = rotateY;
      function rotateY(out, a, rad) {
        var s = Math.sin(rad), c2 = Math.cos(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        if (a !== out) {
          out[4] = a[4];
          out[5] = a[5];
          out[6] = a[6];
          out[7] = a[7];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        out[0] = a00 * c2 - a20 * s;
        out[1] = a01 * c2 - a21 * s;
        out[2] = a02 * c2 - a22 * s;
        out[3] = a03 * c2 - a23 * s;
        out[8] = a00 * s + a20 * c2;
        out[9] = a01 * s + a21 * c2;
        out[10] = a02 * s + a22 * c2;
        out[11] = a03 * s + a23 * c2;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/rotateZ.js
  var require_rotateZ = __commonJS({
    "../../../node_modules/gl-mat4/rotateZ.js"(exports, module) {
      module.exports = rotateZ;
      function rotateZ(out, a, rad) {
        var s = Math.sin(rad), c2 = Math.cos(rad), a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        if (a !== out) {
          out[8] = a[8];
          out[9] = a[9];
          out[10] = a[10];
          out[11] = a[11];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        out[0] = a00 * c2 + a10 * s;
        out[1] = a01 * c2 + a11 * s;
        out[2] = a02 * c2 + a12 * s;
        out[3] = a03 * c2 + a13 * s;
        out[4] = a10 * c2 - a00 * s;
        out[5] = a11 * c2 - a01 * s;
        out[6] = a12 * c2 - a02 * s;
        out[7] = a13 * c2 - a03 * s;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/fromRotation.js
  var require_fromRotation = __commonJS({
    "../../../node_modules/gl-mat4/fromRotation.js"(exports, module) {
      module.exports = fromRotation;
      function fromRotation(out, rad, axis) {
        var s, c2, t;
        var x = axis[0];
        var y = axis[1];
        var z = axis[2];
        var len = Math.sqrt(x * x + y * y + z * z);
        if (Math.abs(len) < 1e-6) {
          return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        s = Math.sin(rad);
        c2 = Math.cos(rad);
        t = 1 - c2;
        out[0] = x * x * t + c2;
        out[1] = y * x * t + z * s;
        out[2] = z * x * t - y * s;
        out[3] = 0;
        out[4] = x * y * t - z * s;
        out[5] = y * y * t + c2;
        out[6] = z * y * t + x * s;
        out[7] = 0;
        out[8] = x * z * t + y * s;
        out[9] = y * z * t - x * s;
        out[10] = z * z * t + c2;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/fromRotationTranslation.js
  var require_fromRotationTranslation = __commonJS({
    "../../../node_modules/gl-mat4/fromRotationTranslation.js"(exports, module) {
      module.exports = fromRotationTranslation;
      function fromRotationTranslation(out, q, v) {
        var x = q[0], y = q[1], z = q[2], w = q[3], x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
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
    }
  });

  // ../../../node_modules/gl-mat4/fromScaling.js
  var require_fromScaling = __commonJS({
    "../../../node_modules/gl-mat4/fromScaling.js"(exports, module) {
      module.exports = fromScaling;
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
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/fromXRotation.js
  var require_fromXRotation = __commonJS({
    "../../../node_modules/gl-mat4/fromXRotation.js"(exports, module) {
      module.exports = fromXRotation;
      function fromXRotation(out, rad) {
        var s = Math.sin(rad), c2 = Math.cos(rad);
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = c2;
        out[6] = s;
        out[7] = 0;
        out[8] = 0;
        out[9] = -s;
        out[10] = c2;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/fromYRotation.js
  var require_fromYRotation = __commonJS({
    "../../../node_modules/gl-mat4/fromYRotation.js"(exports, module) {
      module.exports = fromYRotation;
      function fromYRotation(out, rad) {
        var s = Math.sin(rad), c2 = Math.cos(rad);
        out[0] = c2;
        out[1] = 0;
        out[2] = -s;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = s;
        out[9] = 0;
        out[10] = c2;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/fromZRotation.js
  var require_fromZRotation = __commonJS({
    "../../../node_modules/gl-mat4/fromZRotation.js"(exports, module) {
      module.exports = fromZRotation;
      function fromZRotation(out, rad) {
        var s = Math.sin(rad), c2 = Math.cos(rad);
        out[0] = c2;
        out[1] = s;
        out[2] = 0;
        out[3] = 0;
        out[4] = -s;
        out[5] = c2;
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
    }
  });

  // ../../../node_modules/gl-mat4/fromQuat.js
  var require_fromQuat = __commonJS({
    "../../../node_modules/gl-mat4/fromQuat.js"(exports, module) {
      module.exports = fromQuat2;
      function fromQuat2(out, q) {
        var x = q[0], y = q[1], z = q[2], w = q[3], x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, yx = y * x2, yy = y * y2, zx = z * x2, zy = z * y2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
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
    }
  });

  // ../../../node_modules/gl-mat4/frustum.js
  var require_frustum = __commonJS({
    "../../../node_modules/gl-mat4/frustum.js"(exports, module) {
      module.exports = frustum;
      function frustum(out, left, right, bottom, top, near, far) {
        var rl = 1 / (right - left), tb = 1 / (top - bottom), nf = 1 / (near - far);
        out[0] = near * 2 * rl;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = near * 2 * tb;
        out[6] = 0;
        out[7] = 0;
        out[8] = (right + left) * rl;
        out[9] = (top + bottom) * tb;
        out[10] = (far + near) * nf;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[14] = far * near * 2 * nf;
        out[15] = 0;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/perspectiveFromFieldOfView.js
  var require_perspectiveFromFieldOfView = __commonJS({
    "../../../node_modules/gl-mat4/perspectiveFromFieldOfView.js"(exports, module) {
      module.exports = perspectiveFromFieldOfView;
      function perspectiveFromFieldOfView(out, fov, near, far) {
        var upTan = Math.tan(fov.upDegrees * Math.PI / 180), downTan = Math.tan(fov.downDegrees * Math.PI / 180), leftTan = Math.tan(fov.leftDegrees * Math.PI / 180), rightTan = Math.tan(fov.rightDegrees * Math.PI / 180), xScale = 2 / (leftTan + rightTan), yScale = 2 / (upTan + downTan);
        out[0] = xScale;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = yScale;
        out[6] = 0;
        out[7] = 0;
        out[8] = -((leftTan - rightTan) * xScale * 0.5);
        out[9] = (upTan - downTan) * yScale * 0.5;
        out[10] = far / (near - far);
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[14] = far * near / (near - far);
        out[15] = 0;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-mat4/ortho.js
  var require_ortho = __commonJS({
    "../../../node_modules/gl-mat4/ortho.js"(exports, module) {
      module.exports = ortho2;
      function ortho2(out, left, right, bottom, top, near, far) {
        var lr = 1 / (left - right), bt = 1 / (bottom - top), nf = 1 / (near - far);
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
    }
  });

  // ../../../node_modules/gl-mat4/str.js
  var require_str = __commonJS({
    "../../../node_modules/gl-mat4/str.js"(exports, module) {
      module.exports = str;
      function str(a) {
        return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
      }
    }
  });

  // ../../../node_modules/gl-mat4/index.js
  var require_gl_mat4 = __commonJS({
    "../../../node_modules/gl-mat4/index.js"(exports, module) {
      module.exports = {
        create: require_create(),
        clone: require_clone(),
        copy: require_copy2(),
        identity: require_identity(),
        transpose: require_transpose(),
        invert: require_invert(),
        adjoint: require_adjoint(),
        determinant: require_determinant(),
        multiply: require_multiply(),
        translate: require_translate(),
        scale: require_scale(),
        rotate: require_rotate(),
        rotateX: require_rotateX2(),
        rotateY: require_rotateY2(),
        rotateZ: require_rotateZ(),
        fromRotation: require_fromRotation(),
        fromRotationTranslation: require_fromRotationTranslation(),
        fromScaling: require_fromScaling(),
        fromTranslation: require_fromTranslation(),
        fromXRotation: require_fromXRotation(),
        fromYRotation: require_fromYRotation(),
        fromZRotation: require_fromZRotation(),
        fromQuat: require_fromQuat(),
        frustum: require_frustum(),
        perspective: require_perspective(),
        perspectiveFromFieldOfView: require_perspectiveFromFieldOfView(),
        ortho: require_ortho(),
        lookAt: require_lookAt(),
        str: require_str()
      };
    }
  });

  // ../../../node_modules/primitive-cube/index.js
  var require_primitive_cube = __commonJS({
    "../../../node_modules/primitive-cube/index.js"(exports, module) {
      function createCube3(sx, sy, sz, nx, ny, nz) {
        if (sx === void 0)
          sx = 1;
        if (sy === void 0)
          sy = sx;
        if (sz === void 0)
          sz = sx;
        if (nx === void 0)
          nx = 1;
        if (ny === void 0)
          ny = nx;
        if (nz === void 0)
          nz = nx;
        var x = sx / 2;
        var y = sy / 2;
        var z = sz / 2;
        var numVertices = (nx + 1) * (ny + 1) * 2 + (nx + 1) * (nz + 1) * 2 + (nz + 1) * (ny + 1) * 2;
        var vertexIndex = 0;
        var positions = [];
        var normals = [];
        var uvs = [];
        var cells = [];
        function makePlane(u, v, w, su, sv, nu, nv, pw, flipu, flipv) {
          var vertShift = vertexIndex;
          for (var j = 0; j <= nv; j++) {
            for (var i = 0; i <= nu; i++) {
              var vert = positions[vertexIndex] = [0, 0, 0];
              vert[u] = (-su / 2 + i * su / nu) * flipu;
              vert[v] = (-sv / 2 + j * sv / nv) * flipv;
              vert[w] = pw;
              var normal = normals[vertexIndex] = [0, 0, 0];
              normal[u] = 0;
              normal[v] = 0;
              normal[w] = pw / Math.abs(pw);
              var texCoord = uvs[vertexIndex] = [0, 0];
              texCoord[0] = i / nu;
              texCoord[1] = 1 - j / nv;
              ++vertexIndex;
            }
          }
          for (var j = 0; j < nv; j++) {
            for (var i = 0; i < nu; i++) {
              var n = vertShift + j * (nu + 1) + i;
              cells.push([n, n + nu + 1, n + nu + 2]);
              cells.push([n, n + nu + 2, n + 1]);
            }
          }
        }
        makePlane(0, 1, 2, sx, sy, nx, ny, sz / 2, 1, -1);
        makePlane(0, 1, 2, sx, sy, nx, ny, -sz / 2, -1, -1);
        makePlane(2, 1, 0, sz, sy, nz, ny, -sx / 2, 1, -1);
        makePlane(2, 1, 0, sz, sy, nz, ny, sx / 2, -1, -1);
        makePlane(0, 2, 1, sx, sz, nx, nz, sy / 2, 1, 1);
        makePlane(0, 2, 1, sx, sz, nx, nz, -sy / 2, 1, -1);
        return {
          positions,
          normals,
          uvs,
          cells
        };
      }
      module.exports = createCube3;
    }
  });

  // ../../../node_modules/gl-vec3/create.js
  var require_create2 = __commonJS({
    "../../../node_modules/gl-vec3/create.js"(exports, module) {
      module.exports = create;
      function create() {
        var out = new Float32Array(3);
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/clone.js
  var require_clone2 = __commonJS({
    "../../../node_modules/gl-vec3/clone.js"(exports, module) {
      module.exports = clone;
      function clone(a) {
        var out = new Float32Array(3);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/fromValues.js
  var require_fromValues = __commonJS({
    "../../../node_modules/gl-vec3/fromValues.js"(exports, module) {
      module.exports = fromValues;
      function fromValues(x, y, z) {
        var out = new Float32Array(3);
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/dot.js
  var require_dot = __commonJS({
    "../../../node_modules/gl-vec3/dot.js"(exports, module) {
      module.exports = dot3;
      function dot3(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      }
    }
  });

  // ../../../node_modules/gl-vec3/angle.js
  var require_angle = __commonJS({
    "../../../node_modules/gl-vec3/angle.js"(exports, module) {
      module.exports = angle;
      var fromValues = require_fromValues();
      var normalize2 = require_normalize();
      var dot3 = require_dot();
      function angle(a, b) {
        var tempA = fromValues(a[0], a[1], a[2]);
        var tempB = fromValues(b[0], b[1], b[2]);
        normalize2(tempA, tempA);
        normalize2(tempB, tempB);
        var cosine = dot3(tempA, tempB);
        if (cosine > 1) {
          return 0;
        } else {
          return Math.acos(cosine);
        }
      }
    }
  });

  // ../../../node_modules/gl-vec3/set.js
  var require_set = __commonJS({
    "../../../node_modules/gl-vec3/set.js"(exports, module) {
      module.exports = set;
      function set(out, x, y, z) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/exactEquals.js
  var require_exactEquals = __commonJS({
    "../../../node_modules/gl-vec3/exactEquals.js"(exports, module) {
      module.exports = exactEquals;
      function exactEquals(a, b) {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
      }
    }
  });

  // ../../../node_modules/gl-vec3/subtract.js
  var require_subtract = __commonJS({
    "../../../node_modules/gl-vec3/subtract.js"(exports, module) {
      module.exports = subtract;
      function subtract(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/sub.js
  var require_sub = __commonJS({
    "../../../node_modules/gl-vec3/sub.js"(exports, module) {
      module.exports = require_subtract();
    }
  });

  // ../../../node_modules/gl-vec3/multiply.js
  var require_multiply2 = __commonJS({
    "../../../node_modules/gl-vec3/multiply.js"(exports, module) {
      module.exports = multiply2;
      function multiply2(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        out[2] = a[2] * b[2];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/mul.js
  var require_mul = __commonJS({
    "../../../node_modules/gl-vec3/mul.js"(exports, module) {
      module.exports = require_multiply2();
    }
  });

  // ../../../node_modules/gl-vec3/divide.js
  var require_divide = __commonJS({
    "../../../node_modules/gl-vec3/divide.js"(exports, module) {
      module.exports = divide;
      function divide(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        out[2] = a[2] / b[2];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/div.js
  var require_div = __commonJS({
    "../../../node_modules/gl-vec3/div.js"(exports, module) {
      module.exports = require_divide();
    }
  });

  // ../../../node_modules/gl-vec3/min.js
  var require_min = __commonJS({
    "../../../node_modules/gl-vec3/min.js"(exports, module) {
      module.exports = min2;
      function min2(out, a, b) {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        out[2] = Math.min(a[2], b[2]);
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/max.js
  var require_max = __commonJS({
    "../../../node_modules/gl-vec3/max.js"(exports, module) {
      module.exports = max2;
      function max2(out, a, b) {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        out[2] = Math.max(a[2], b[2]);
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/floor.js
  var require_floor = __commonJS({
    "../../../node_modules/gl-vec3/floor.js"(exports, module) {
      module.exports = floor2;
      function floor2(out, a) {
        out[0] = Math.floor(a[0]);
        out[1] = Math.floor(a[1]);
        out[2] = Math.floor(a[2]);
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/ceil.js
  var require_ceil = __commonJS({
    "../../../node_modules/gl-vec3/ceil.js"(exports, module) {
      module.exports = ceil;
      function ceil(out, a) {
        out[0] = Math.ceil(a[0]);
        out[1] = Math.ceil(a[1]);
        out[2] = Math.ceil(a[2]);
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/round.js
  var require_round = __commonJS({
    "../../../node_modules/gl-vec3/round.js"(exports, module) {
      module.exports = round;
      function round(out, a) {
        out[0] = Math.round(a[0]);
        out[1] = Math.round(a[1]);
        out[2] = Math.round(a[2]);
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/scale.js
  var require_scale2 = __commonJS({
    "../../../node_modules/gl-vec3/scale.js"(exports, module) {
      module.exports = scale;
      function scale(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/distance.js
  var require_distance = __commonJS({
    "../../../node_modules/gl-vec3/distance.js"(exports, module) {
      module.exports = distance;
      function distance(a, b) {
        var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2];
        return Math.sqrt(x * x + y * y + z * z);
      }
    }
  });

  // ../../../node_modules/gl-vec3/dist.js
  var require_dist2 = __commonJS({
    "../../../node_modules/gl-vec3/dist.js"(exports, module) {
      module.exports = require_distance();
    }
  });

  // ../../../node_modules/gl-vec3/squaredDistance.js
  var require_squaredDistance = __commonJS({
    "../../../node_modules/gl-vec3/squaredDistance.js"(exports, module) {
      module.exports = squaredDistance;
      function squaredDistance(a, b) {
        var x = b[0] - a[0], y = b[1] - a[1], z = b[2] - a[2];
        return x * x + y * y + z * z;
      }
    }
  });

  // ../../../node_modules/gl-vec3/sqrDist.js
  var require_sqrDist = __commonJS({
    "../../../node_modules/gl-vec3/sqrDist.js"(exports, module) {
      module.exports = require_squaredDistance();
    }
  });

  // ../../../node_modules/gl-vec3/length.js
  var require_length = __commonJS({
    "../../../node_modules/gl-vec3/length.js"(exports, module) {
      module.exports = length2;
      function length2(a) {
        var x = a[0], y = a[1], z = a[2];
        return Math.sqrt(x * x + y * y + z * z);
      }
    }
  });

  // ../../../node_modules/gl-vec3/len.js
  var require_len = __commonJS({
    "../../../node_modules/gl-vec3/len.js"(exports, module) {
      module.exports = require_length();
    }
  });

  // ../../../node_modules/gl-vec3/squaredLength.js
  var require_squaredLength = __commonJS({
    "../../../node_modules/gl-vec3/squaredLength.js"(exports, module) {
      module.exports = squaredLength;
      function squaredLength(a) {
        var x = a[0], y = a[1], z = a[2];
        return x * x + y * y + z * z;
      }
    }
  });

  // ../../../node_modules/gl-vec3/sqrLen.js
  var require_sqrLen = __commonJS({
    "../../../node_modules/gl-vec3/sqrLen.js"(exports, module) {
      module.exports = require_squaredLength();
    }
  });

  // ../../../node_modules/gl-vec3/negate.js
  var require_negate = __commonJS({
    "../../../node_modules/gl-vec3/negate.js"(exports, module) {
      module.exports = negate;
      function negate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/inverse.js
  var require_inverse = __commonJS({
    "../../../node_modules/gl-vec3/inverse.js"(exports, module) {
      module.exports = inverse;
      function inverse(out, a) {
        out[0] = 1 / a[0];
        out[1] = 1 / a[1];
        out[2] = 1 / a[2];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/cross.js
  var require_cross = __commonJS({
    "../../../node_modules/gl-vec3/cross.js"(exports, module) {
      module.exports = cross2;
      function cross2(out, a, b) {
        var ax = a[0], ay = a[1], az = a[2], bx = b[0], by = b[1], bz = b[2];
        out[0] = ay * bz - az * by;
        out[1] = az * bx - ax * bz;
        out[2] = ax * by - ay * bx;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/lerp.js
  var require_lerp = __commonJS({
    "../../../node_modules/gl-vec3/lerp.js"(exports, module) {
      module.exports = lerp;
      function lerp(out, a, b, t) {
        var ax = a[0], ay = a[1], az = a[2];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        out[2] = az + t * (b[2] - az);
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/random.js
  var require_random = __commonJS({
    "../../../node_modules/gl-vec3/random.js"(exports, module) {
      module.exports = random3;
      function random3(out, scale) {
        scale = scale || 1;
        var r = Math.random() * 2 * Math.PI;
        var z = Math.random() * 2 - 1;
        var zScale = Math.sqrt(1 - z * z) * scale;
        out[0] = Math.cos(r) * zScale;
        out[1] = Math.sin(r) * zScale;
        out[2] = z * scale;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/transformMat3.js
  var require_transformMat3 = __commonJS({
    "../../../node_modules/gl-vec3/transformMat3.js"(exports, module) {
      module.exports = transformMat3;
      function transformMat3(out, a, m) {
        var x = a[0], y = a[1], z = a[2];
        out[0] = x * m[0] + y * m[3] + z * m[6];
        out[1] = x * m[1] + y * m[4] + z * m[7];
        out[2] = x * m[2] + y * m[5] + z * m[8];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/transformQuat.js
  var require_transformQuat = __commonJS({
    "../../../node_modules/gl-vec3/transformQuat.js"(exports, module) {
      module.exports = transformQuat;
      function transformQuat(out, a, q) {
        var x = a[0], y = a[1], z = a[2], qx = q[0], qy = q[1], qz = q[2], qw = q[3], ix = qw * x + qy * z - qz * y, iy = qw * y + qz * x - qx * z, iz = qw * z + qx * y - qy * x, iw = -qx * x - qy * y - qz * z;
        out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/rotateZ.js
  var require_rotateZ2 = __commonJS({
    "../../../node_modules/gl-vec3/rotateZ.js"(exports, module) {
      module.exports = rotateZ;
      function rotateZ(out, a, b, c2) {
        var bx = b[0];
        var by = b[1];
        var px = a[0] - bx;
        var py = a[1] - by;
        var sc = Math.sin(c2);
        var cc = Math.cos(c2);
        out[0] = bx + px * cc - py * sc;
        out[1] = by + px * sc + py * cc;
        out[2] = a[2];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec3/forEach.js
  var require_forEach = __commonJS({
    "../../../node_modules/gl-vec3/forEach.js"(exports, module) {
      module.exports = forEach;
      var vec = require_create2()();
      function forEach(a, stride, offset, count, fn, arg) {
        var i, l;
        if (!stride) {
          stride = 3;
        }
        if (!offset) {
          offset = 0;
        }
        if (count) {
          l = Math.min(count * stride + offset, a.length);
        } else {
          l = a.length;
        }
        for (i = offset; i < l; i += stride) {
          vec[0] = a[i];
          vec[1] = a[i + 1];
          vec[2] = a[i + 2];
          fn(vec, vec, arg);
          a[i] = vec[0];
          a[i + 1] = vec[1];
          a[i + 2] = vec[2];
        }
        return a;
      }
    }
  });

  // ../../../node_modules/gl-vec3/index.js
  var require_gl_vec3 = __commonJS({
    "../../../node_modules/gl-vec3/index.js"(exports, module) {
      module.exports = {
        EPSILON: require_epsilon(),
        create: require_create2(),
        clone: require_clone2(),
        angle: require_angle(),
        fromValues: require_fromValues(),
        copy: require_copy(),
        set: require_set(),
        equals: require_equals(),
        exactEquals: require_exactEquals(),
        add: require_add(),
        subtract: require_subtract(),
        sub: require_sub(),
        multiply: require_multiply2(),
        mul: require_mul(),
        divide: require_divide(),
        div: require_div(),
        min: require_min(),
        max: require_max(),
        floor: require_floor(),
        ceil: require_ceil(),
        round: require_round(),
        scale: require_scale2(),
        scaleAndAdd: require_scaleAndAdd(),
        distance: require_distance(),
        dist: require_dist2(),
        squaredDistance: require_squaredDistance(),
        sqrDist: require_sqrDist(),
        length: require_length(),
        len: require_len(),
        squaredLength: require_squaredLength(),
        sqrLen: require_sqrLen(),
        negate: require_negate(),
        inverse: require_inverse(),
        normalize: require_normalize(),
        dot: require_dot(),
        cross: require_cross(),
        lerp: require_lerp(),
        random: require_random(),
        transformMat4: require_transformMat4(),
        transformMat3: require_transformMat3(),
        transformQuat: require_transformQuat(),
        rotateX: require_rotateX(),
        rotateY: require_rotateY(),
        rotateZ: require_rotateZ2(),
        forEach: require_forEach()
      };
    }
  });

  // ../../../node_modules/gl-vec4/add.js
  var require_add2 = __commonJS({
    "../../../node_modules/gl-vec4/add.js"(exports, module) {
      module.exports = add2;
      function add2(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/add.js
  var require_add3 = __commonJS({
    "../../../node_modules/gl-quat/add.js"(exports, module) {
      module.exports = require_add2();
    }
  });

  // ../../../node_modules/gl-quat/calculateW.js
  var require_calculateW = __commonJS({
    "../../../node_modules/gl-quat/calculateW.js"(exports, module) {
      module.exports = calculateW;
      function calculateW(out, a) {
        var x = a[0], y = a[1], z = a[2];
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = Math.sqrt(Math.abs(1 - x * x - y * y - z * z));
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec4/clone.js
  var require_clone3 = __commonJS({
    "../../../node_modules/gl-vec4/clone.js"(exports, module) {
      module.exports = clone;
      function clone(a) {
        var out = new Float32Array(4);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/clone.js
  var require_clone4 = __commonJS({
    "../../../node_modules/gl-quat/clone.js"(exports, module) {
      module.exports = require_clone3();
    }
  });

  // ../../../node_modules/gl-quat/conjugate.js
  var require_conjugate = __commonJS({
    "../../../node_modules/gl-quat/conjugate.js"(exports, module) {
      module.exports = conjugate;
      function conjugate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = a[3];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec4/copy.js
  var require_copy3 = __commonJS({
    "../../../node_modules/gl-vec4/copy.js"(exports, module) {
      module.exports = copy;
      function copy(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/copy.js
  var require_copy4 = __commonJS({
    "../../../node_modules/gl-quat/copy.js"(exports, module) {
      module.exports = require_copy3();
    }
  });

  // ../../../node_modules/gl-quat/create.js
  var require_create3 = __commonJS({
    "../../../node_modules/gl-quat/create.js"(exports, module) {
      module.exports = create;
      function create() {
        var out = new Float32Array(4);
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec4/dot.js
  var require_dot2 = __commonJS({
    "../../../node_modules/gl-vec4/dot.js"(exports, module) {
      module.exports = dot3;
      function dot3(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
      }
    }
  });

  // ../../../node_modules/gl-quat/dot.js
  var require_dot3 = __commonJS({
    "../../../node_modules/gl-quat/dot.js"(exports, module) {
      module.exports = require_dot2();
    }
  });

  // ../../../node_modules/gl-quat/fromMat3.js
  var require_fromMat3 = __commonJS({
    "../../../node_modules/gl-quat/fromMat3.js"(exports, module) {
      module.exports = fromMat3;
      function fromMat3(out, m) {
        var fTrace = m[0] + m[4] + m[8];
        var fRoot;
        if (fTrace > 0) {
          fRoot = Math.sqrt(fTrace + 1);
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
          fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1);
          out[i] = 0.5 * fRoot;
          fRoot = 0.5 / fRoot;
          out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
          out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
          out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
        }
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec4/fromValues.js
  var require_fromValues2 = __commonJS({
    "../../../node_modules/gl-vec4/fromValues.js"(exports, module) {
      module.exports = fromValues;
      function fromValues(x, y, z, w) {
        var out = new Float32Array(4);
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/fromValues.js
  var require_fromValues3 = __commonJS({
    "../../../node_modules/gl-quat/fromValues.js"(exports, module) {
      module.exports = require_fromValues2();
    }
  });

  // ../../../node_modules/gl-quat/identity.js
  var require_identity2 = __commonJS({
    "../../../node_modules/gl-quat/identity.js"(exports, module) {
      module.exports = identity4;
      function identity4(out) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/invert.js
  var require_invert2 = __commonJS({
    "../../../node_modules/gl-quat/invert.js"(exports, module) {
      module.exports = invert;
      function invert(out, a) {
        var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], dot3 = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3, invDot = dot3 ? 1 / dot3 : 0;
        out[0] = -a0 * invDot;
        out[1] = -a1 * invDot;
        out[2] = -a2 * invDot;
        out[3] = a3 * invDot;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec4/length.js
  var require_length2 = __commonJS({
    "../../../node_modules/gl-vec4/length.js"(exports, module) {
      module.exports = length2;
      function length2(a) {
        var x = a[0], y = a[1], z = a[2], w = a[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
      }
    }
  });

  // ../../../node_modules/gl-quat/length.js
  var require_length3 = __commonJS({
    "../../../node_modules/gl-quat/length.js"(exports, module) {
      module.exports = require_length2();
    }
  });

  // ../../../node_modules/gl-vec4/lerp.js
  var require_lerp2 = __commonJS({
    "../../../node_modules/gl-vec4/lerp.js"(exports, module) {
      module.exports = lerp;
      function lerp(out, a, b, t) {
        var ax = a[0], ay = a[1], az = a[2], aw = a[3];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        out[2] = az + t * (b[2] - az);
        out[3] = aw + t * (b[3] - aw);
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/lerp.js
  var require_lerp3 = __commonJS({
    "../../../node_modules/gl-quat/lerp.js"(exports, module) {
      module.exports = require_lerp2();
    }
  });

  // ../../../node_modules/gl-quat/multiply.js
  var require_multiply3 = __commonJS({
    "../../../node_modules/gl-quat/multiply.js"(exports, module) {
      module.exports = multiply2;
      function multiply2(out, a, b) {
        var ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = b[0], by = b[1], bz = b[2], bw = b[3];
        out[0] = ax * bw + aw * bx + ay * bz - az * by;
        out[1] = ay * bw + aw * by + az * bx - ax * bz;
        out[2] = az * bw + aw * bz + ax * by - ay * bx;
        out[3] = aw * bw - ax * bx - ay * by - az * bz;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec4/normalize.js
  var require_normalize2 = __commonJS({
    "../../../node_modules/gl-vec4/normalize.js"(exports, module) {
      module.exports = normalize2;
      function normalize2(out, a) {
        var x = a[0], y = a[1], z = a[2], w = a[3];
        var len = x * x + y * y + z * z + w * w;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
          out[0] = x * len;
          out[1] = y * len;
          out[2] = z * len;
          out[3] = w * len;
        }
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/normalize.js
  var require_normalize3 = __commonJS({
    "../../../node_modules/gl-quat/normalize.js"(exports, module) {
      module.exports = require_normalize2();
    }
  });

  // ../../../node_modules/gl-quat/rotateX.js
  var require_rotateX3 = __commonJS({
    "../../../node_modules/gl-quat/rotateX.js"(exports, module) {
      module.exports = rotateX;
      function rotateX(out, a, rad) {
        rad *= 0.5;
        var ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = Math.sin(rad), bw = Math.cos(rad);
        out[0] = ax * bw + aw * bx;
        out[1] = ay * bw + az * bx;
        out[2] = az * bw - ay * bx;
        out[3] = aw * bw - ax * bx;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/rotateY.js
  var require_rotateY3 = __commonJS({
    "../../../node_modules/gl-quat/rotateY.js"(exports, module) {
      module.exports = rotateY;
      function rotateY(out, a, rad) {
        rad *= 0.5;
        var ax = a[0], ay = a[1], az = a[2], aw = a[3], by = Math.sin(rad), bw = Math.cos(rad);
        out[0] = ax * bw - az * by;
        out[1] = ay * bw + aw * by;
        out[2] = az * bw + ax * by;
        out[3] = aw * bw - ay * by;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/rotateZ.js
  var require_rotateZ3 = __commonJS({
    "../../../node_modules/gl-quat/rotateZ.js"(exports, module) {
      module.exports = rotateZ;
      function rotateZ(out, a, rad) {
        rad *= 0.5;
        var ax = a[0], ay = a[1], az = a[2], aw = a[3], bz = Math.sin(rad), bw = Math.cos(rad);
        out[0] = ax * bw + ay * bz;
        out[1] = ay * bw - ax * bz;
        out[2] = az * bw + aw * bz;
        out[3] = aw * bw - az * bz;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/setAxisAngle.js
  var require_setAxisAngle = __commonJS({
    "../../../node_modules/gl-quat/setAxisAngle.js"(exports, module) {
      module.exports = setAxisAngle;
      function setAxisAngle(out, axis, rad) {
        rad = rad * 0.5;
        var s = Math.sin(rad);
        out[0] = s * axis[0];
        out[1] = s * axis[1];
        out[2] = s * axis[2];
        out[3] = Math.cos(rad);
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/rotationTo.js
  var require_rotationTo = __commonJS({
    "../../../node_modules/gl-quat/rotationTo.js"(exports, module) {
      var vecDot = require_dot();
      var vecCross = require_cross();
      var vecLength = require_length();
      var vecNormalize = require_normalize();
      var quatNormalize = require_normalize3();
      var quatAxisAngle = require_setAxisAngle();
      module.exports = rotationTo2;
      var tmpvec3 = [0, 0, 0];
      var xUnitVec3 = [1, 0, 0];
      var yUnitVec3 = [0, 1, 0];
      function rotationTo2(out, a, b) {
        var dot3 = vecDot(a, b);
        if (dot3 < -0.999999) {
          vecCross(tmpvec3, xUnitVec3, a);
          if (vecLength(tmpvec3) < 1e-6) {
            vecCross(tmpvec3, yUnitVec3, a);
          }
          vecNormalize(tmpvec3, tmpvec3);
          quatAxisAngle(out, tmpvec3, Math.PI);
          return out;
        } else if (dot3 > 0.999999) {
          out[0] = 0;
          out[1] = 0;
          out[2] = 0;
          out[3] = 1;
          return out;
        } else {
          vecCross(tmpvec3, a, b);
          out[0] = tmpvec3[0];
          out[1] = tmpvec3[1];
          out[2] = tmpvec3[2];
          out[3] = 1 + dot3;
          return quatNormalize(out, out);
        }
      }
    }
  });

  // ../../../node_modules/gl-vec4/scale.js
  var require_scale3 = __commonJS({
    "../../../node_modules/gl-vec4/scale.js"(exports, module) {
      module.exports = scale;
      function scale(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/scale.js
  var require_scale4 = __commonJS({
    "../../../node_modules/gl-quat/scale.js"(exports, module) {
      module.exports = require_scale3();
    }
  });

  // ../../../node_modules/gl-vec4/set.js
  var require_set2 = __commonJS({
    "../../../node_modules/gl-vec4/set.js"(exports, module) {
      module.exports = set;
      function set(out, x, y, z, w) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/set.js
  var require_set3 = __commonJS({
    "../../../node_modules/gl-quat/set.js"(exports, module) {
      module.exports = require_set2();
    }
  });

  // ../../../node_modules/gl-mat3/create.js
  var require_create4 = __commonJS({
    "../../../node_modules/gl-mat3/create.js"(exports, module) {
      module.exports = create;
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
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/setAxes.js
  var require_setAxes = __commonJS({
    "../../../node_modules/gl-quat/setAxes.js"(exports, module) {
      var mat3create = require_create4();
      var fromMat3 = require_fromMat3();
      var normalize2 = require_normalize3();
      module.exports = setAxes;
      var matr = mat3create();
      function setAxes(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];
        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];
        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];
        return normalize2(out, fromMat3(out, matr));
      }
    }
  });

  // ../../../node_modules/gl-quat/slerp.js
  var require_slerp = __commonJS({
    "../../../node_modules/gl-quat/slerp.js"(exports, module) {
      module.exports = slerp;
      function slerp(out, a, b, t) {
        var ax = a[0], ay = a[1], az = a[2], aw = a[3], bx = b[0], by = b[1], bz = b[2], bw = b[3];
        var omega, cosom, sinom, scale0, scale1;
        cosom = ax * bx + ay * by + az * bz + aw * bw;
        if (cosom < 0) {
          cosom = -cosom;
          bx = -bx;
          by = -by;
          bz = -bz;
          bw = -bw;
        }
        if (1 - cosom > 1e-6) {
          omega = Math.acos(cosom);
          sinom = Math.sin(omega);
          scale0 = Math.sin((1 - t) * omega) / sinom;
          scale1 = Math.sin(t * omega) / sinom;
        } else {
          scale0 = 1 - t;
          scale1 = t;
        }
        out[0] = scale0 * ax + scale1 * bx;
        out[1] = scale0 * ay + scale1 * by;
        out[2] = scale0 * az + scale1 * bz;
        out[3] = scale0 * aw + scale1 * bw;
        return out;
      }
    }
  });

  // ../../../node_modules/gl-quat/sqlerp.js
  var require_sqlerp = __commonJS({
    "../../../node_modules/gl-quat/sqlerp.js"(exports, module) {
      var slerp = require_slerp();
      module.exports = sqlerp;
      var temp1 = [0, 0, 0, 1];
      var temp2 = [0, 0, 0, 1];
      function sqlerp(out, a, b, c2, d, t) {
        slerp(temp1, a, d, t);
        slerp(temp2, b, c2, t);
        slerp(out, temp1, temp2, 2 * t * (1 - t));
        return out;
      }
    }
  });

  // ../../../node_modules/gl-vec4/squaredLength.js
  var require_squaredLength2 = __commonJS({
    "../../../node_modules/gl-vec4/squaredLength.js"(exports, module) {
      module.exports = squaredLength;
      function squaredLength(a) {
        var x = a[0], y = a[1], z = a[2], w = a[3];
        return x * x + y * y + z * z + w * w;
      }
    }
  });

  // ../../../node_modules/gl-quat/squaredLength.js
  var require_squaredLength3 = __commonJS({
    "../../../node_modules/gl-quat/squaredLength.js"(exports, module) {
      module.exports = require_squaredLength2();
    }
  });

  // ../../../node_modules/gl-quat/index.js
  var require_gl_quat = __commonJS({
    "../../../node_modules/gl-quat/index.js"(exports, module) {
      module.exports = {
        add: require_add3(),
        calculateW: require_calculateW(),
        clone: require_clone4(),
        conjugate: require_conjugate(),
        copy: require_copy4(),
        create: require_create3(),
        dot: require_dot3(),
        fromMat3: require_fromMat3(),
        fromValues: require_fromValues3(),
        identity: require_identity2(),
        invert: require_invert2(),
        length: require_length3(),
        lerp: require_lerp3(),
        multiply: require_multiply3(),
        normalize: require_normalize3(),
        rotateX: require_rotateX3(),
        rotateY: require_rotateY3(),
        rotateZ: require_rotateZ3(),
        rotationTo: require_rotationTo(),
        scale: require_scale4(),
        set: require_set3(),
        setAxes: require_setAxes(),
        setAxisAngle: require_setAxisAngle(),
        slerp: require_slerp(),
        sqlerp: require_sqlerp(),
        squaredLength: require_squaredLength3()
      };
    }
  });

  // ../../../node_modules/regl/dist/regl.js
  var require_regl = __commonJS({
    "../../../node_modules/regl/dist/regl.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global.createREGL = factory();
      })(exports, function() {
        "use strict";
        var isTypedArray = function(x) {
          return x instanceof Uint8Array || x instanceof Uint16Array || x instanceof Uint32Array || x instanceof Int8Array || x instanceof Int16Array || x instanceof Int32Array || x instanceof Float32Array || x instanceof Float64Array || x instanceof Uint8ClampedArray;
        };
        var extend = function(base, opts) {
          var keys = Object.keys(opts);
          for (var i = 0; i < keys.length; ++i) {
            base[keys[i]] = opts[keys[i]];
          }
          return base;
        };
        var endl = "\n";
        function decodeB64(str) {
          if (typeof atob !== "undefined") {
            return atob(str);
          }
          return "base64:" + str;
        }
        function raise(message) {
          var error = new Error("(regl) " + message);
          console.error(error);
          throw error;
        }
        function check(pred, message) {
          if (!pred) {
            raise(message);
          }
        }
        function encolon(message) {
          if (message) {
            return ": " + message;
          }
          return "";
        }
        function checkParameter(param, possibilities, message) {
          if (!(param in possibilities)) {
            raise("unknown parameter (" + param + ")" + encolon(message) + ". possible values: " + Object.keys(possibilities).join());
          }
        }
        function checkIsTypedArray(data, message) {
          if (!isTypedArray(data)) {
            raise("invalid parameter type" + encolon(message) + ". must be a typed array");
          }
        }
        function standardTypeEh(value, type) {
          switch (type) {
            case "number":
              return typeof value === "number";
            case "object":
              return typeof value === "object";
            case "string":
              return typeof value === "string";
            case "boolean":
              return typeof value === "boolean";
            case "function":
              return typeof value === "function";
            case "undefined":
              return typeof value === "undefined";
            case "symbol":
              return typeof value === "symbol";
          }
        }
        function checkTypeOf(value, type, message) {
          if (!standardTypeEh(value, type)) {
            raise("invalid parameter type" + encolon(message) + ". expected " + type + ", got " + typeof value);
          }
        }
        function checkNonNegativeInt(value, message) {
          if (!(value >= 0 && (value | 0) === value)) {
            raise("invalid parameter type, (" + value + ")" + encolon(message) + ". must be a nonnegative integer");
          }
        }
        function checkOneOf(value, list, message) {
          if (list.indexOf(value) < 0) {
            raise("invalid value" + encolon(message) + ". must be one of: " + list);
          }
        }
        var constructorKeys = [
          "gl",
          "canvas",
          "container",
          "attributes",
          "pixelRatio",
          "extensions",
          "optionalExtensions",
          "profile",
          "onDone"
        ];
        function checkConstructor(obj) {
          Object.keys(obj).forEach(function(key) {
            if (constructorKeys.indexOf(key) < 0) {
              raise('invalid regl constructor argument "' + key + '". must be one of ' + constructorKeys);
            }
          });
        }
        function leftPad(str, n) {
          str = str + "";
          while (str.length < n) {
            str = " " + str;
          }
          return str;
        }
        function ShaderFile() {
          this.name = "unknown";
          this.lines = [];
          this.index = {};
          this.hasErrors = false;
        }
        function ShaderLine(number, line3) {
          this.number = number;
          this.line = line3;
          this.errors = [];
        }
        function ShaderError(fileNumber, lineNumber, message) {
          this.file = fileNumber;
          this.line = lineNumber;
          this.message = message;
        }
        function guessCommand() {
          var error = new Error();
          var stack = (error.stack || error).toString();
          var pat = /compileProcedure.*\n\s*at.*\((.*)\)/.exec(stack);
          if (pat) {
            return pat[1];
          }
          var pat2 = /compileProcedure.*\n\s*at\s+(.*)(\n|$)/.exec(stack);
          if (pat2) {
            return pat2[1];
          }
          return "unknown";
        }
        function guessCallSite() {
          var error = new Error();
          var stack = (error.stack || error).toString();
          var pat = /at REGLCommand.*\n\s+at.*\((.*)\)/.exec(stack);
          if (pat) {
            return pat[1];
          }
          var pat2 = /at REGLCommand.*\n\s+at\s+(.*)\n/.exec(stack);
          if (pat2) {
            return pat2[1];
          }
          return "unknown";
        }
        function parseSource(source, command) {
          var lines2 = source.split("\n");
          var lineNumber = 1;
          var fileNumber = 0;
          var files = {
            unknown: new ShaderFile(),
            0: new ShaderFile()
          };
          files.unknown.name = files[0].name = command || guessCommand();
          files.unknown.lines.push(new ShaderLine(0, ""));
          for (var i = 0; i < lines2.length; ++i) {
            var line3 = lines2[i];
            var parts = /^\s*#\s*(\w+)\s+(.+)\s*$/.exec(line3);
            if (parts) {
              switch (parts[1]) {
                case "line":
                  var lineNumberInfo = /(\d+)(\s+\d+)?/.exec(parts[2]);
                  if (lineNumberInfo) {
                    lineNumber = lineNumberInfo[1] | 0;
                    if (lineNumberInfo[2]) {
                      fileNumber = lineNumberInfo[2] | 0;
                      if (!(fileNumber in files)) {
                        files[fileNumber] = new ShaderFile();
                      }
                    }
                  }
                  break;
                case "define":
                  var nameInfo = /SHADER_NAME(_B64)?\s+(.*)$/.exec(parts[2]);
                  if (nameInfo) {
                    files[fileNumber].name = nameInfo[1] ? decodeB64(nameInfo[2]) : nameInfo[2];
                  }
                  break;
              }
            }
            files[fileNumber].lines.push(new ShaderLine(lineNumber++, line3));
          }
          Object.keys(files).forEach(function(fileNumber2) {
            var file = files[fileNumber2];
            file.lines.forEach(function(line4) {
              file.index[line4.number] = line4;
            });
          });
          return files;
        }
        function parseErrorLog(errLog) {
          var result = [];
          errLog.split("\n").forEach(function(errMsg) {
            if (errMsg.length < 5) {
              return;
            }
            var parts = /^ERROR:\s+(\d+):(\d+):\s*(.*)$/.exec(errMsg);
            if (parts) {
              result.push(new ShaderError(parts[1] | 0, parts[2] | 0, parts[3].trim()));
            } else if (errMsg.length > 0) {
              result.push(new ShaderError("unknown", 0, errMsg));
            }
          });
          return result;
        }
        function annotateFiles(files, errors) {
          errors.forEach(function(error) {
            var file = files[error.file];
            if (file) {
              var line3 = file.index[error.line];
              if (line3) {
                line3.errors.push(error);
                file.hasErrors = true;
                return;
              }
            }
            files.unknown.hasErrors = true;
            files.unknown.lines[0].errors.push(error);
          });
        }
        function checkShaderError(gl, shader, source, type, command) {
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            var errLog = gl.getShaderInfoLog(shader);
            var typeName = type === gl.FRAGMENT_SHADER ? "fragment" : "vertex";
            checkCommandType(source, "string", typeName + " shader source must be a string", command);
            var files = parseSource(source, command);
            var errors = parseErrorLog(errLog);
            annotateFiles(files, errors);
            Object.keys(files).forEach(function(fileNumber) {
              var file = files[fileNumber];
              if (!file.hasErrors) {
                return;
              }
              var strings = [""];
              var styles = [""];
              function push(str, style) {
                strings.push(str);
                styles.push(style || "");
              }
              push("file number " + fileNumber + ": " + file.name + "\n", "color:red;text-decoration:underline;font-weight:bold");
              file.lines.forEach(function(line3) {
                if (line3.errors.length > 0) {
                  push(leftPad(line3.number, 4) + "|  ", "background-color:yellow; font-weight:bold");
                  push(line3.line + endl, "color:red; background-color:yellow; font-weight:bold");
                  var offset = 0;
                  line3.errors.forEach(function(error) {
                    var message = error.message;
                    var token = /^\s*'(.*)'\s*:\s*(.*)$/.exec(message);
                    if (token) {
                      var tokenPat = token[1];
                      message = token[2];
                      switch (tokenPat) {
                        case "assign":
                          tokenPat = "=";
                          break;
                      }
                      offset = Math.max(line3.line.indexOf(tokenPat, offset), 0);
                    } else {
                      offset = 0;
                    }
                    push(leftPad("| ", 6));
                    push(leftPad("^^^", offset + 3) + endl, "font-weight:bold");
                    push(leftPad("| ", 6));
                    push(message + endl, "font-weight:bold");
                  });
                  push(leftPad("| ", 6) + endl);
                } else {
                  push(leftPad(line3.number, 4) + "|  ");
                  push(line3.line + endl, "color:red");
                }
              });
              if (typeof document !== "undefined" && !window.chrome) {
                styles[0] = strings.join("%c");
                console.log.apply(console, styles);
              } else {
                console.log(strings.join(""));
              }
            });
            check.raise("Error compiling " + typeName + " shader, " + files[0].name);
          }
        }
        function checkLinkError(gl, program, fragShader, vertShader, command) {
          if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            var errLog = gl.getProgramInfoLog(program);
            var fragParse = parseSource(fragShader, command);
            var vertParse = parseSource(vertShader, command);
            var header = 'Error linking program with vertex shader, "' + vertParse[0].name + '", and fragment shader "' + fragParse[0].name + '"';
            if (typeof document !== "undefined") {
              console.log("%c" + header + endl + "%c" + errLog, "color:red;text-decoration:underline;font-weight:bold", "color:red");
            } else {
              console.log(header + endl + errLog);
            }
            check.raise(header);
          }
        }
        function saveCommandRef(object) {
          object._commandRef = guessCommand();
        }
        function saveDrawCommandInfo(opts, uniforms, attributes, stringStore) {
          saveCommandRef(opts);
          function id(str) {
            if (str) {
              return stringStore.id(str);
            }
            return 0;
          }
          opts._fragId = id(opts.static.frag);
          opts._vertId = id(opts.static.vert);
          function addProps(dict, set) {
            Object.keys(set).forEach(function(u) {
              dict[stringStore.id(u)] = true;
            });
          }
          var uniformSet = opts._uniformSet = {};
          addProps(uniformSet, uniforms.static);
          addProps(uniformSet, uniforms.dynamic);
          var attributeSet = opts._attributeSet = {};
          addProps(attributeSet, attributes.static);
          addProps(attributeSet, attributes.dynamic);
          opts._hasCount = "count" in opts.static || "count" in opts.dynamic || "elements" in opts.static || "elements" in opts.dynamic;
        }
        function commandRaise(message, command) {
          var callSite = guessCallSite();
          raise(message + " in command " + (command || guessCommand()) + (callSite === "unknown" ? "" : " called from " + callSite));
        }
        function checkCommand(pred, message, command) {
          if (!pred) {
            commandRaise(message, command || guessCommand());
          }
        }
        function checkParameterCommand(param, possibilities, message, command) {
          if (!(param in possibilities)) {
            commandRaise("unknown parameter (" + param + ")" + encolon(message) + ". possible values: " + Object.keys(possibilities).join(), command || guessCommand());
          }
        }
        function checkCommandType(value, type, message, command) {
          if (!standardTypeEh(value, type)) {
            commandRaise("invalid parameter type" + encolon(message) + ". expected " + type + ", got " + typeof value, command || guessCommand());
          }
        }
        function checkOptional(block) {
          block();
        }
        function checkFramebufferFormat(attachment, texFormats, rbFormats) {
          if (attachment.texture) {
            checkOneOf(attachment.texture._texture.internalformat, texFormats, "unsupported texture format for attachment");
          } else {
            checkOneOf(attachment.renderbuffer._renderbuffer.format, rbFormats, "unsupported renderbuffer format for attachment");
          }
        }
        var GL_CLAMP_TO_EDGE = 33071;
        var GL_NEAREST = 9728;
        var GL_NEAREST_MIPMAP_NEAREST = 9984;
        var GL_LINEAR_MIPMAP_NEAREST = 9985;
        var GL_NEAREST_MIPMAP_LINEAR = 9986;
        var GL_LINEAR_MIPMAP_LINEAR = 9987;
        var GL_BYTE = 5120;
        var GL_UNSIGNED_BYTE = 5121;
        var GL_SHORT = 5122;
        var GL_UNSIGNED_SHORT = 5123;
        var GL_INT = 5124;
        var GL_UNSIGNED_INT = 5125;
        var GL_FLOAT = 5126;
        var GL_UNSIGNED_SHORT_4_4_4_4 = 32819;
        var GL_UNSIGNED_SHORT_5_5_5_1 = 32820;
        var GL_UNSIGNED_SHORT_5_6_5 = 33635;
        var GL_UNSIGNED_INT_24_8_WEBGL = 34042;
        var GL_HALF_FLOAT_OES = 36193;
        var TYPE_SIZE = {};
        TYPE_SIZE[GL_BYTE] = TYPE_SIZE[GL_UNSIGNED_BYTE] = 1;
        TYPE_SIZE[GL_SHORT] = TYPE_SIZE[GL_UNSIGNED_SHORT] = TYPE_SIZE[GL_HALF_FLOAT_OES] = TYPE_SIZE[GL_UNSIGNED_SHORT_5_6_5] = TYPE_SIZE[GL_UNSIGNED_SHORT_4_4_4_4] = TYPE_SIZE[GL_UNSIGNED_SHORT_5_5_5_1] = 2;
        TYPE_SIZE[GL_INT] = TYPE_SIZE[GL_UNSIGNED_INT] = TYPE_SIZE[GL_FLOAT] = TYPE_SIZE[GL_UNSIGNED_INT_24_8_WEBGL] = 4;
        function pixelSize(type, channels) {
          if (type === GL_UNSIGNED_SHORT_5_5_5_1 || type === GL_UNSIGNED_SHORT_4_4_4_4 || type === GL_UNSIGNED_SHORT_5_6_5) {
            return 2;
          } else if (type === GL_UNSIGNED_INT_24_8_WEBGL) {
            return 4;
          } else {
            return TYPE_SIZE[type] * channels;
          }
        }
        function isPow2(v) {
          return !(v & v - 1) && !!v;
        }
        function checkTexture2D(info, mipData, limits) {
          var i;
          var w = mipData.width;
          var h = mipData.height;
          var c2 = mipData.channels;
          check(w > 0 && w <= limits.maxTextureSize && h > 0 && h <= limits.maxTextureSize, "invalid texture shape");
          if (info.wrapS !== GL_CLAMP_TO_EDGE || info.wrapT !== GL_CLAMP_TO_EDGE) {
            check(isPow2(w) && isPow2(h), "incompatible wrap mode for texture, both width and height must be power of 2");
          }
          if (mipData.mipmask === 1) {
            if (w !== 1 && h !== 1) {
              check(info.minFilter !== GL_NEAREST_MIPMAP_NEAREST && info.minFilter !== GL_NEAREST_MIPMAP_LINEAR && info.minFilter !== GL_LINEAR_MIPMAP_NEAREST && info.minFilter !== GL_LINEAR_MIPMAP_LINEAR, "min filter requires mipmap");
            }
          } else {
            check(isPow2(w) && isPow2(h), "texture must be a square power of 2 to support mipmapping");
            check(mipData.mipmask === (w << 1) - 1, "missing or incomplete mipmap data");
          }
          if (mipData.type === GL_FLOAT) {
            if (limits.extensions.indexOf("oes_texture_float_linear") < 0) {
              check(info.minFilter === GL_NEAREST && info.magFilter === GL_NEAREST, "filter not supported, must enable oes_texture_float_linear");
            }
            check(!info.genMipmaps, "mipmap generation not supported with float textures");
          }
          var mipimages = mipData.images;
          for (i = 0; i < 16; ++i) {
            if (mipimages[i]) {
              var mw = w >> i;
              var mh = h >> i;
              check(mipData.mipmask & 1 << i, "missing mipmap data");
              var img = mipimages[i];
              check(img.width === mw && img.height === mh, "invalid shape for mip images");
              check(img.format === mipData.format && img.internalformat === mipData.internalformat && img.type === mipData.type, "incompatible type for mip image");
              if (img.compressed) {
              } else if (img.data) {
                var rowSize = Math.ceil(pixelSize(img.type, c2) * mw / img.unpackAlignment) * img.unpackAlignment;
                check(img.data.byteLength === rowSize * mh, "invalid data for image, buffer size is inconsistent with image format");
              } else if (img.element) {
              } else if (img.copy) {
              }
            } else if (!info.genMipmaps) {
              check((mipData.mipmask & 1 << i) === 0, "extra mipmap data");
            }
          }
          if (mipData.compressed) {
            check(!info.genMipmaps, "mipmap generation for compressed images not supported");
          }
        }
        function checkTextureCube(texture, info, faces, limits) {
          var w = texture.width;
          var h = texture.height;
          var c2 = texture.channels;
          check(w > 0 && w <= limits.maxTextureSize && h > 0 && h <= limits.maxTextureSize, "invalid texture shape");
          check(w === h, "cube map must be square");
          check(info.wrapS === GL_CLAMP_TO_EDGE && info.wrapT === GL_CLAMP_TO_EDGE, "wrap mode not supported by cube map");
          for (var i = 0; i < faces.length; ++i) {
            var face = faces[i];
            check(face.width === w && face.height === h, "inconsistent cube map face shape");
            if (info.genMipmaps) {
              check(!face.compressed, "can not generate mipmap for compressed textures");
              check(face.mipmask === 1, "can not specify mipmaps and generate mipmaps");
            } else {
            }
            var mipmaps = face.images;
            for (var j = 0; j < 16; ++j) {
              var img = mipmaps[j];
              if (img) {
                var mw = w >> j;
                var mh = h >> j;
                check(face.mipmask & 1 << j, "missing mipmap data");
                check(img.width === mw && img.height === mh, "invalid shape for mip images");
                check(img.format === texture.format && img.internalformat === texture.internalformat && img.type === texture.type, "incompatible type for mip image");
                if (img.compressed) {
                } else if (img.data) {
                  check(img.data.byteLength === mw * mh * Math.max(pixelSize(img.type, c2), img.unpackAlignment), "invalid data for image, buffer size is inconsistent with image format");
                } else if (img.element) {
                } else if (img.copy) {
                }
              }
            }
          }
        }
        var check$1 = extend(check, {
          optional: checkOptional,
          raise,
          commandRaise,
          command: checkCommand,
          parameter: checkParameter,
          commandParameter: checkParameterCommand,
          constructor: checkConstructor,
          type: checkTypeOf,
          commandType: checkCommandType,
          isTypedArray: checkIsTypedArray,
          nni: checkNonNegativeInt,
          oneOf: checkOneOf,
          shaderError: checkShaderError,
          linkError: checkLinkError,
          callSite: guessCallSite,
          saveCommandRef,
          saveDrawInfo: saveDrawCommandInfo,
          framebufferFormat: checkFramebufferFormat,
          guessCommand,
          texture2D: checkTexture2D,
          textureCube: checkTextureCube
        });
        var VARIABLE_COUNTER = 0;
        var DYN_FUNC = 0;
        var DYN_CONSTANT = 5;
        var DYN_ARRAY = 6;
        function DynamicVariable(type, data) {
          this.id = VARIABLE_COUNTER++;
          this.type = type;
          this.data = data;
        }
        function escapeStr(str) {
          return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        }
        function splitParts(str) {
          if (str.length === 0) {
            return [];
          }
          var firstChar = str.charAt(0);
          var lastChar = str.charAt(str.length - 1);
          if (str.length > 1 && firstChar === lastChar && (firstChar === '"' || firstChar === "'")) {
            return ['"' + escapeStr(str.substr(1, str.length - 2)) + '"'];
          }
          var parts = /\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(str);
          if (parts) {
            return splitParts(str.substr(0, parts.index)).concat(splitParts(parts[1])).concat(splitParts(str.substr(parts.index + parts[0].length)));
          }
          var subparts = str.split(".");
          if (subparts.length === 1) {
            return ['"' + escapeStr(str) + '"'];
          }
          var result = [];
          for (var i = 0; i < subparts.length; ++i) {
            result = result.concat(splitParts(subparts[i]));
          }
          return result;
        }
        function toAccessorString(str) {
          return "[" + splitParts(str).join("][") + "]";
        }
        function defineDynamic(type, data) {
          return new DynamicVariable(type, toAccessorString(data + ""));
        }
        function isDynamic(x) {
          return typeof x === "function" && !x._reglType || x instanceof DynamicVariable;
        }
        function unbox(x, path) {
          if (typeof x === "function") {
            return new DynamicVariable(DYN_FUNC, x);
          } else if (typeof x === "number" || typeof x === "boolean") {
            return new DynamicVariable(DYN_CONSTANT, x);
          } else if (Array.isArray(x)) {
            return new DynamicVariable(DYN_ARRAY, x.map(function(y, i) {
              return unbox(y, path + "[" + i + "]");
            }));
          } else if (x instanceof DynamicVariable) {
            return x;
          }
          check$1(false, "invalid option type in uniform " + path);
        }
        var dynamic = {
          DynamicVariable,
          define: defineDynamic,
          isDynamic,
          unbox,
          accessor: toAccessorString
        };
        var raf = {
          next: typeof requestAnimationFrame === "function" ? function(cb) {
            return requestAnimationFrame(cb);
          } : function(cb) {
            return setTimeout(cb, 16);
          },
          cancel: typeof cancelAnimationFrame === "function" ? function(raf2) {
            return cancelAnimationFrame(raf2);
          } : clearTimeout
        };
        var clock = typeof performance !== "undefined" && performance.now ? function() {
          return performance.now();
        } : function() {
          return +new Date();
        };
        function createStringStore() {
          var stringIds = { "": 0 };
          var stringValues = [""];
          return {
            id: function(str) {
              var result = stringIds[str];
              if (result) {
                return result;
              }
              result = stringIds[str] = stringValues.length;
              stringValues.push(str);
              return result;
            },
            str: function(id) {
              return stringValues[id];
            }
          };
        }
        function createCanvas(element, onDone, pixelRatio) {
          var canvas = document.createElement("canvas");
          extend(canvas.style, {
            border: 0,
            margin: 0,
            padding: 0,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          });
          element.appendChild(canvas);
          if (element === document.body) {
            canvas.style.position = "absolute";
            extend(element.style, {
              margin: 0,
              padding: 0
            });
          }
          function resize() {
            var w = window.innerWidth;
            var h = window.innerHeight;
            if (element !== document.body) {
              var bounds = canvas.getBoundingClientRect();
              w = bounds.right - bounds.left;
              h = bounds.bottom - bounds.top;
            }
            canvas.width = pixelRatio * w;
            canvas.height = pixelRatio * h;
          }
          var resizeObserver;
          if (element !== document.body && typeof ResizeObserver === "function") {
            resizeObserver = new ResizeObserver(function() {
              setTimeout(resize);
            });
            resizeObserver.observe(element);
          } else {
            window.addEventListener("resize", resize, false);
          }
          function onDestroy() {
            if (resizeObserver) {
              resizeObserver.disconnect();
            } else {
              window.removeEventListener("resize", resize);
            }
            element.removeChild(canvas);
          }
          resize();
          return {
            canvas,
            onDestroy
          };
        }
        function createContext(canvas, contextAttributes) {
          function get(name) {
            try {
              return canvas.getContext(name, contextAttributes);
            } catch (e) {
              return null;
            }
          }
          return get("webgl") || get("experimental-webgl") || get("webgl-experimental");
        }
        function isHTMLElement(obj) {
          return typeof obj.nodeName === "string" && typeof obj.appendChild === "function" && typeof obj.getBoundingClientRect === "function";
        }
        function isWebGLContext(obj) {
          return typeof obj.drawArrays === "function" || typeof obj.drawElements === "function";
        }
        function parseExtensions(input) {
          if (typeof input === "string") {
            return input.split();
          }
          check$1(Array.isArray(input), "invalid extension array");
          return input;
        }
        function getElement(desc) {
          if (typeof desc === "string") {
            check$1(typeof document !== "undefined", "not supported outside of DOM");
            return document.querySelector(desc);
          }
          return desc;
        }
        function parseArgs(args_) {
          var args = args_ || {};
          var element, container, canvas, gl;
          var contextAttributes = {};
          var extensions = [];
          var optionalExtensions = [];
          var pixelRatio = typeof window === "undefined" ? 1 : window.devicePixelRatio;
          var profile = false;
          var onDone = function(err) {
            if (err) {
              check$1.raise(err);
            }
          };
          var onDestroy = function() {
          };
          if (typeof args === "string") {
            check$1(typeof document !== "undefined", "selector queries only supported in DOM enviroments");
            element = document.querySelector(args);
            check$1(element, "invalid query string for element");
          } else if (typeof args === "object") {
            if (isHTMLElement(args)) {
              element = args;
            } else if (isWebGLContext(args)) {
              gl = args;
              canvas = gl.canvas;
            } else {
              check$1.constructor(args);
              if ("gl" in args) {
                gl = args.gl;
              } else if ("canvas" in args) {
                canvas = getElement(args.canvas);
              } else if ("container" in args) {
                container = getElement(args.container);
              }
              if ("attributes" in args) {
                contextAttributes = args.attributes;
                check$1.type(contextAttributes, "object", "invalid context attributes");
              }
              if ("extensions" in args) {
                extensions = parseExtensions(args.extensions);
              }
              if ("optionalExtensions" in args) {
                optionalExtensions = parseExtensions(args.optionalExtensions);
              }
              if ("onDone" in args) {
                check$1.type(args.onDone, "function", "invalid or missing onDone callback");
                onDone = args.onDone;
              }
              if ("profile" in args) {
                profile = !!args.profile;
              }
              if ("pixelRatio" in args) {
                pixelRatio = +args.pixelRatio;
                check$1(pixelRatio > 0, "invalid pixel ratio");
              }
            }
          } else {
            check$1.raise("invalid arguments to regl");
          }
          if (element) {
            if (element.nodeName.toLowerCase() === "canvas") {
              canvas = element;
            } else {
              container = element;
            }
          }
          if (!gl) {
            if (!canvas) {
              check$1(typeof document !== "undefined", "must manually specify webgl context outside of DOM environments");
              var result = createCanvas(container || document.body, onDone, pixelRatio);
              if (!result) {
                return null;
              }
              canvas = result.canvas;
              onDestroy = result.onDestroy;
            }
            if (contextAttributes.premultipliedAlpha === void 0)
              contextAttributes.premultipliedAlpha = true;
            gl = createContext(canvas, contextAttributes);
          }
          if (!gl) {
            onDestroy();
            onDone("webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org");
            return null;
          }
          return {
            gl,
            canvas,
            container,
            extensions,
            optionalExtensions,
            pixelRatio,
            profile,
            onDone,
            onDestroy
          };
        }
        function createExtensionCache(gl, config2) {
          var extensions = {};
          function tryLoadExtension(name_) {
            check$1.type(name_, "string", "extension name must be string");
            var name2 = name_.toLowerCase();
            var ext;
            try {
              ext = extensions[name2] = gl.getExtension(name2);
            } catch (e) {
            }
            return !!ext;
          }
          for (var i = 0; i < config2.extensions.length; ++i) {
            var name = config2.extensions[i];
            if (!tryLoadExtension(name)) {
              config2.onDestroy();
              config2.onDone('"' + name + '" extension is not supported by the current WebGL context, try upgrading your system or a different browser');
              return null;
            }
          }
          config2.optionalExtensions.forEach(tryLoadExtension);
          return {
            extensions,
            restore: function() {
              Object.keys(extensions).forEach(function(name2) {
                if (extensions[name2] && !tryLoadExtension(name2)) {
                  throw new Error("(regl): error restoring extension " + name2);
                }
              });
            }
          };
        }
        function loop(n, f) {
          var result = Array(n);
          for (var i = 0; i < n; ++i) {
            result[i] = f(i);
          }
          return result;
        }
        var GL_BYTE$1 = 5120;
        var GL_UNSIGNED_BYTE$2 = 5121;
        var GL_SHORT$1 = 5122;
        var GL_UNSIGNED_SHORT$1 = 5123;
        var GL_INT$1 = 5124;
        var GL_UNSIGNED_INT$1 = 5125;
        var GL_FLOAT$2 = 5126;
        function nextPow16(v) {
          for (var i = 16; i <= 1 << 28; i *= 16) {
            if (v <= i) {
              return i;
            }
          }
          return 0;
        }
        function log22(v) {
          var r, shift;
          r = (v > 65535) << 4;
          v >>>= r;
          shift = (v > 255) << 3;
          v >>>= shift;
          r |= shift;
          shift = (v > 15) << 2;
          v >>>= shift;
          r |= shift;
          shift = (v > 3) << 1;
          v >>>= shift;
          r |= shift;
          return r | v >> 1;
        }
        function createPool() {
          var bufferPool = loop(8, function() {
            return [];
          });
          function alloc(n) {
            var sz = nextPow16(n);
            var bin = bufferPool[log22(sz) >> 2];
            if (bin.length > 0) {
              return bin.pop();
            }
            return new ArrayBuffer(sz);
          }
          function free(buf) {
            bufferPool[log22(buf.byteLength) >> 2].push(buf);
          }
          function allocType(type, n) {
            var result = null;
            switch (type) {
              case GL_BYTE$1:
                result = new Int8Array(alloc(n), 0, n);
                break;
              case GL_UNSIGNED_BYTE$2:
                result = new Uint8Array(alloc(n), 0, n);
                break;
              case GL_SHORT$1:
                result = new Int16Array(alloc(2 * n), 0, n);
                break;
              case GL_UNSIGNED_SHORT$1:
                result = new Uint16Array(alloc(2 * n), 0, n);
                break;
              case GL_INT$1:
                result = new Int32Array(alloc(4 * n), 0, n);
                break;
              case GL_UNSIGNED_INT$1:
                result = new Uint32Array(alloc(4 * n), 0, n);
                break;
              case GL_FLOAT$2:
                result = new Float32Array(alloc(4 * n), 0, n);
                break;
              default:
                return null;
            }
            if (result.length !== n) {
              return result.subarray(0, n);
            }
            return result;
          }
          function freeType(array) {
            free(array.buffer);
          }
          return {
            alloc,
            free,
            allocType,
            freeType
          };
        }
        var pool = createPool();
        pool.zero = createPool();
        var GL_SUBPIXEL_BITS = 3408;
        var GL_RED_BITS = 3410;
        var GL_GREEN_BITS = 3411;
        var GL_BLUE_BITS = 3412;
        var GL_ALPHA_BITS = 3413;
        var GL_DEPTH_BITS = 3414;
        var GL_STENCIL_BITS = 3415;
        var GL_ALIASED_POINT_SIZE_RANGE = 33901;
        var GL_ALIASED_LINE_WIDTH_RANGE = 33902;
        var GL_MAX_TEXTURE_SIZE = 3379;
        var GL_MAX_VIEWPORT_DIMS = 3386;
        var GL_MAX_VERTEX_ATTRIBS = 34921;
        var GL_MAX_VERTEX_UNIFORM_VECTORS = 36347;
        var GL_MAX_VARYING_VECTORS = 36348;
        var GL_MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
        var GL_MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
        var GL_MAX_TEXTURE_IMAGE_UNITS = 34930;
        var GL_MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
        var GL_MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
        var GL_MAX_RENDERBUFFER_SIZE = 34024;
        var GL_VENDOR = 7936;
        var GL_RENDERER = 7937;
        var GL_VERSION = 7938;
        var GL_SHADING_LANGUAGE_VERSION = 35724;
        var GL_MAX_TEXTURE_MAX_ANISOTROPY_EXT = 34047;
        var GL_MAX_COLOR_ATTACHMENTS_WEBGL = 36063;
        var GL_MAX_DRAW_BUFFERS_WEBGL = 34852;
        var GL_TEXTURE_2D = 3553;
        var GL_TEXTURE_CUBE_MAP = 34067;
        var GL_TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
        var GL_TEXTURE0 = 33984;
        var GL_RGBA = 6408;
        var GL_FLOAT$1 = 5126;
        var GL_UNSIGNED_BYTE$1 = 5121;
        var GL_FRAMEBUFFER = 36160;
        var GL_FRAMEBUFFER_COMPLETE = 36053;
        var GL_COLOR_ATTACHMENT0 = 36064;
        var GL_COLOR_BUFFER_BIT$1 = 16384;
        var wrapLimits = function(gl, extensions) {
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
            gl.texImage2D(GL_TEXTURE_2D, 0, GL_RGBA, 1, 1, 0, GL_RGBA, GL_FLOAT$1, null);
            var fbo = gl.createFramebuffer();
            gl.bindFramebuffer(GL_FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, readFloatTexture, 0);
            gl.bindTexture(GL_TEXTURE_2D, null);
            if (gl.checkFramebufferStatus(GL_FRAMEBUFFER) !== GL_FRAMEBUFFER_COMPLETE)
              readFloat = false;
            else {
              gl.viewport(0, 0, 1, 1);
              gl.clearColor(1, 0, 0, 1);
              gl.clear(GL_COLOR_BUFFER_BIT$1);
              var pixels = pool.allocType(GL_FLOAT$1, 4);
              gl.readPixels(0, 0, 1, 1, GL_RGBA, GL_FLOAT$1, pixels);
              if (gl.getError())
                readFloat = false;
              else {
                gl.deleteFramebuffer(fbo);
                gl.deleteTexture(readFloatTexture);
                readFloat = pixels[0] === 1;
              }
              pool.freeType(pixels);
            }
          }
          var isIE = typeof navigator !== "undefined" && (/MSIE/.test(navigator.userAgent) || /Trident\//.test(navigator.appVersion) || /Edge/.test(navigator.userAgent));
          var npotTextureCube = true;
          if (!isIE) {
            var cubeTexture = gl.createTexture();
            var data = pool.allocType(GL_UNSIGNED_BYTE$1, 36);
            gl.activeTexture(GL_TEXTURE0);
            gl.bindTexture(GL_TEXTURE_CUBE_MAP, cubeTexture);
            gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X, 0, GL_RGBA, 3, 3, 0, GL_RGBA, GL_UNSIGNED_BYTE$1, data);
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
            extensions: Object.keys(extensions).filter(function(ext) {
              return !!extensions[ext];
            }),
            maxAnisotropic,
            maxDrawbuffers,
            maxColorAttachments,
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
            readFloat,
            npotTextureCube
          };
        };
        function isNDArrayLike(obj) {
          return !!obj && typeof obj === "object" && Array.isArray(obj.shape) && Array.isArray(obj.stride) && typeof obj.offset === "number" && obj.shape.length === obj.stride.length && (Array.isArray(obj.data) || isTypedArray(obj.data));
        }
        var values = function(obj) {
          return Object.keys(obj).map(function(key) {
            return obj[key];
          });
        };
        var flattenUtils = {
          shape: arrayShape$1,
          flatten: flattenArray
        };
        function flatten1D(array, nx, out) {
          for (var i = 0; i < nx; ++i) {
            out[i] = array[i];
          }
        }
        function flatten2D(array, nx, ny, out) {
          var ptr = 0;
          for (var i = 0; i < nx; ++i) {
            var row = array[i];
            for (var j = 0; j < ny; ++j) {
              out[ptr++] = row[j];
            }
          }
        }
        function flatten3D(array, nx, ny, nz, out, ptr_) {
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
        function flattenRec(array, shape, level, out, ptr) {
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
        function flattenArray(array, shape, type, out_) {
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
              break;
            case 1:
              flatten1D(array, shape[0], out);
              break;
            case 2:
              flatten2D(array, shape[0], shape[1], out);
              break;
            case 3:
              flatten3D(array, shape[0], shape[1], shape[2], out, 0);
              break;
            default:
              flattenRec(array, shape, 0, out, 0);
          }
          return out;
        }
        function arrayShape$1(array_) {
          var shape = [];
          for (var array = array_; array.length; array = array[0]) {
            shape.push(array.length);
          }
          return shape;
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
          int8,
          int16,
          int32,
          uint8,
          uint16,
          uint32,
          float,
          float32
        };
        var dynamic$1 = 35048;
        var stream = 35040;
        var usageTypes = {
          dynamic: dynamic$1,
          stream,
          "static": 35044
        };
        var arrayFlatten = flattenUtils.flatten;
        var arrayShape = flattenUtils.shape;
        var GL_STATIC_DRAW = 35044;
        var GL_STREAM_DRAW = 35040;
        var GL_UNSIGNED_BYTE$3 = 5121;
        var GL_FLOAT$3 = 5126;
        var DTYPES_SIZES = [];
        DTYPES_SIZES[5120] = 1;
        DTYPES_SIZES[5122] = 2;
        DTYPES_SIZES[5124] = 4;
        DTYPES_SIZES[5121] = 1;
        DTYPES_SIZES[5123] = 2;
        DTYPES_SIZES[5125] = 4;
        DTYPES_SIZES[5126] = 4;
        function typedArrayCode(data) {
          return arrayTypes[Object.prototype.toString.call(data)] | 0;
        }
        function copyArray(out, inp) {
          for (var i = 0; i < inp.length; ++i) {
            out[i] = inp[i];
          }
        }
        function transpose(result, data, shapeX, shapeY, strideX, strideY, offset) {
          var ptr = 0;
          for (var i = 0; i < shapeX; ++i) {
            for (var j = 0; j < shapeY; ++j) {
              result[ptr++] = data[strideX * i + strideY * j + offset];
            }
          }
        }
        function wrapBufferState(gl, stats2, config2, destroyBuffer) {
          var bufferCount = 0;
          var bufferSet = {};
          function REGLBuffer(type) {
            this.id = bufferCount++;
            this.buffer = gl.createBuffer();
            this.type = type;
            this.usage = GL_STATIC_DRAW;
            this.byteLength = 0;
            this.dimension = 1;
            this.dtype = GL_UNSIGNED_BYTE$3;
            this.persistentData = null;
            if (config2.profile) {
              this.stats = { size: 0 };
            }
          }
          REGLBuffer.prototype.bind = function() {
            gl.bindBuffer(this.type, this.buffer);
          };
          REGLBuffer.prototype.destroy = function() {
            destroy(this);
          };
          var streamPool = [];
          function createStream(type, data) {
            var buffer = streamPool.pop();
            if (!buffer) {
              buffer = new REGLBuffer(type);
            }
            buffer.bind();
            initBufferFromData(buffer, data, GL_STREAM_DRAW, 0, 1, false);
            return buffer;
          }
          function destroyStream(stream$$1) {
            streamPool.push(stream$$1);
          }
          function initBufferFromTypedArray(buffer, data, usage) {
            buffer.byteLength = data.byteLength;
            gl.bufferData(buffer.type, data, usage);
          }
          function initBufferFromData(buffer, data, usage, dtype, dimension, persist) {
            var shape;
            buffer.usage = usage;
            if (Array.isArray(data)) {
              buffer.dtype = dtype || GL_FLOAT$3;
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
                } else if (typeof data[0] === "number") {
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
                  buffer.dtype = dtype || typedArrayCode(data[0]) || GL_FLOAT$3;
                  flatData = arrayFlatten(data, [data.length, data[0].length], buffer.dtype);
                  initBufferFromTypedArray(buffer, flatData, usage);
                  if (persist) {
                    buffer.persistentData = flatData;
                  } else {
                    pool.freeType(flatData);
                  }
                } else {
                  check$1.raise("invalid buffer data");
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
              } else {
                check$1.raise("invalid shape");
              }
              buffer.dtype = dtype || typedArrayCode(data.data) || GL_FLOAT$3;
              buffer.dimension = shapeY;
              var transposeData2 = pool.allocType(buffer.dtype, shapeX * shapeY);
              transpose(transposeData2, data.data, shapeX, shapeY, strideX, strideY, offset);
              initBufferFromTypedArray(buffer, transposeData2, usage);
              if (persist) {
                buffer.persistentData = transposeData2;
              } else {
                pool.freeType(transposeData2);
              }
            } else if (data instanceof ArrayBuffer) {
              buffer.dtype = GL_UNSIGNED_BYTE$3;
              buffer.dimension = dimension;
              initBufferFromTypedArray(buffer, data, usage);
              if (persist) {
                buffer.persistentData = new Uint8Array(new Uint8Array(data));
              }
            } else {
              check$1.raise("invalid buffer data");
            }
          }
          function destroy(buffer) {
            stats2.bufferCount--;
            destroyBuffer(buffer);
            var handle = buffer.buffer;
            check$1(handle, "buffer must not be deleted already");
            gl.deleteBuffer(handle);
            buffer.buffer = null;
            delete bufferSet[buffer.id];
          }
          function createBuffer(options, type, deferInit, persistent) {
            stats2.bufferCount++;
            var buffer = new REGLBuffer(type);
            bufferSet[buffer.id] = buffer;
            function reglBuffer(options2) {
              var usage = GL_STATIC_DRAW;
              var data = null;
              var byteLength = 0;
              var dtype = 0;
              var dimension = 1;
              if (Array.isArray(options2) || isTypedArray(options2) || isNDArrayLike(options2) || options2 instanceof ArrayBuffer) {
                data = options2;
              } else if (typeof options2 === "number") {
                byteLength = options2 | 0;
              } else if (options2) {
                check$1.type(options2, "object", "buffer arguments must be an object, a number or an array");
                if ("data" in options2) {
                  check$1(data === null || Array.isArray(data) || isTypedArray(data) || isNDArrayLike(data), "invalid data for buffer");
                  data = options2.data;
                }
                if ("usage" in options2) {
                  check$1.parameter(options2.usage, usageTypes, "invalid buffer usage");
                  usage = usageTypes[options2.usage];
                }
                if ("type" in options2) {
                  check$1.parameter(options2.type, glTypes, "invalid buffer type");
                  dtype = glTypes[options2.type];
                }
                if ("dimension" in options2) {
                  check$1.type(options2.dimension, "number", "invalid dimension");
                  dimension = options2.dimension | 0;
                }
                if ("length" in options2) {
                  check$1.nni(byteLength, "buffer length must be a nonnegative integer");
                  byteLength = options2.length | 0;
                }
              }
              buffer.bind();
              if (!data) {
                if (byteLength)
                  gl.bufferData(buffer.type, byteLength, usage);
                buffer.dtype = dtype || GL_UNSIGNED_BYTE$3;
                buffer.usage = usage;
                buffer.dimension = dimension;
                buffer.byteLength = byteLength;
              } else {
                initBufferFromData(buffer, data, usage, dtype, dimension, persistent);
              }
              if (config2.profile) {
                buffer.stats.size = buffer.byteLength * DTYPES_SIZES[buffer.dtype];
              }
              return reglBuffer;
            }
            function setSubData(data, offset) {
              check$1(offset + data.byteLength <= buffer.byteLength, "invalid buffer subdata call, buffer is too small.  Can't write data of size " + data.byteLength + " starting from offset " + offset + " to a buffer of size " + buffer.byteLength);
              gl.bufferSubData(buffer.type, offset, data);
            }
            function subdata(data, offset_) {
              var offset = (offset_ || 0) | 0;
              var shape;
              buffer.bind();
              if (isTypedArray(data) || data instanceof ArrayBuffer) {
                setSubData(data, offset);
              } else if (Array.isArray(data)) {
                if (data.length > 0) {
                  if (typeof data[0] === "number") {
                    var converted = pool.allocType(buffer.dtype, data.length);
                    copyArray(converted, data);
                    setSubData(converted, offset);
                    pool.freeType(converted);
                  } else if (Array.isArray(data[0]) || isTypedArray(data[0])) {
                    shape = arrayShape(data);
                    var flatData = arrayFlatten(data, shape, buffer.dtype);
                    setSubData(flatData, offset);
                    pool.freeType(flatData);
                  } else {
                    check$1.raise("invalid buffer data");
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
                } else {
                  check$1.raise("invalid shape");
                }
                var dtype = Array.isArray(data.data) ? buffer.dtype : typedArrayCode(data.data);
                var transposeData2 = pool.allocType(dtype, shapeX * shapeY);
                transpose(transposeData2, data.data, shapeX, shapeY, strideX, strideY, data.offset);
                setSubData(transposeData2, offset);
                pool.freeType(transposeData2);
              } else {
                check$1.raise("invalid data for buffer subdata");
              }
              return reglBuffer;
            }
            if (!deferInit) {
              reglBuffer(options);
            }
            reglBuffer._reglType = "buffer";
            reglBuffer._buffer = buffer;
            reglBuffer.subdata = subdata;
            if (config2.profile) {
              reglBuffer.stats = buffer.stats;
            }
            reglBuffer.destroy = function() {
              destroy(buffer);
            };
            return reglBuffer;
          }
          function restoreBuffers() {
            values(bufferSet).forEach(function(buffer) {
              buffer.buffer = gl.createBuffer();
              gl.bindBuffer(buffer.type, buffer.buffer);
              gl.bufferData(buffer.type, buffer.persistentData || buffer.byteLength, buffer.usage);
            });
          }
          if (config2.profile) {
            stats2.getTotalBufferSize = function() {
              var total = 0;
              Object.keys(bufferSet).forEach(function(key) {
                total += bufferSet[key].stats.size;
              });
              return total;
            };
          }
          return {
            create: createBuffer,
            createStream,
            destroyStream,
            clear: function() {
              values(bufferSet).forEach(destroy);
              streamPool.forEach(destroy);
            },
            getBuffer: function(wrapper) {
              if (wrapper && wrapper._buffer instanceof REGLBuffer) {
                return wrapper._buffer;
              }
              return null;
            },
            restore: restoreBuffers,
            _initBuffer: initBufferFromData
          };
        }
        var points = 0;
        var point = 0;
        var lines = 1;
        var line2 = 1;
        var triangles = 4;
        var triangle = 4;
        var primTypes = {
          points,
          point,
          lines,
          line: line2,
          triangles,
          triangle,
          "line loop": 2,
          "line strip": 3,
          "triangle strip": 5,
          "triangle fan": 6
        };
        var GL_POINTS = 0;
        var GL_LINES = 1;
        var GL_TRIANGLES = 4;
        var GL_BYTE$2 = 5120;
        var GL_UNSIGNED_BYTE$4 = 5121;
        var GL_SHORT$2 = 5122;
        var GL_UNSIGNED_SHORT$2 = 5123;
        var GL_INT$2 = 5124;
        var GL_UNSIGNED_INT$2 = 5125;
        var GL_ELEMENT_ARRAY_BUFFER = 34963;
        var GL_STREAM_DRAW$1 = 35040;
        var GL_STATIC_DRAW$1 = 35044;
        function wrapElementsState(gl, extensions, bufferState, stats2) {
          var elementSet = {};
          var elementCount = 0;
          var elementTypes = {
            "uint8": GL_UNSIGNED_BYTE$4,
            "uint16": GL_UNSIGNED_SHORT$2
          };
          if (extensions.oes_element_index_uint) {
            elementTypes.uint32 = GL_UNSIGNED_INT$2;
          }
          function REGLElementBuffer(buffer) {
            this.id = elementCount++;
            elementSet[this.id] = this;
            this.buffer = buffer;
            this.primType = GL_TRIANGLES;
            this.vertCount = 0;
            this.type = 0;
          }
          REGLElementBuffer.prototype.bind = function() {
            this.buffer.bind();
          };
          var bufferPool = [];
          function createElementStream(data) {
            var result = bufferPool.pop();
            if (!result) {
              result = new REGLElementBuffer(bufferState.create(null, GL_ELEMENT_ARRAY_BUFFER, true, false)._buffer);
            }
            initElements(result, data, GL_STREAM_DRAW$1, -1, -1, 0, 0);
            return result;
          }
          function destroyElementStream(elements) {
            bufferPool.push(elements);
          }
          function initElements(elements, data, usage, prim, count, byteLength, type) {
            elements.buffer.bind();
            var dtype;
            if (data) {
              var predictedType = type;
              if (!type && (!isTypedArray(data) || isNDArrayLike(data) && !isTypedArray(data.data))) {
                predictedType = extensions.oes_element_index_uint ? GL_UNSIGNED_INT$2 : GL_UNSIGNED_SHORT$2;
              }
              bufferState._initBuffer(elements.buffer, data, usage, predictedType, 3);
            } else {
              gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, byteLength, usage);
              elements.buffer.dtype = dtype || GL_UNSIGNED_BYTE$4;
              elements.buffer.usage = usage;
              elements.buffer.dimension = 3;
              elements.buffer.byteLength = byteLength;
            }
            dtype = type;
            if (!type) {
              switch (elements.buffer.dtype) {
                case GL_UNSIGNED_BYTE$4:
                case GL_BYTE$2:
                  dtype = GL_UNSIGNED_BYTE$4;
                  break;
                case GL_UNSIGNED_SHORT$2:
                case GL_SHORT$2:
                  dtype = GL_UNSIGNED_SHORT$2;
                  break;
                case GL_UNSIGNED_INT$2:
                case GL_INT$2:
                  dtype = GL_UNSIGNED_INT$2;
                  break;
                default:
                  check$1.raise("unsupported type for element array");
              }
              elements.buffer.dtype = dtype;
            }
            elements.type = dtype;
            check$1(dtype !== GL_UNSIGNED_INT$2 || !!extensions.oes_element_index_uint, "32 bit element buffers not supported, enable oes_element_index_uint first");
            var vertCount = count;
            if (vertCount < 0) {
              vertCount = elements.buffer.byteLength;
              if (dtype === GL_UNSIGNED_SHORT$2) {
                vertCount >>= 1;
              } else if (dtype === GL_UNSIGNED_INT$2) {
                vertCount >>= 2;
              }
            }
            elements.vertCount = vertCount;
            var primType = prim;
            if (prim < 0) {
              primType = GL_TRIANGLES;
              var dimension = elements.buffer.dimension;
              if (dimension === 1)
                primType = GL_POINTS;
              if (dimension === 2)
                primType = GL_LINES;
              if (dimension === 3)
                primType = GL_TRIANGLES;
            }
            elements.primType = primType;
          }
          function destroyElements(elements) {
            stats2.elementsCount--;
            check$1(elements.buffer !== null, "must not double destroy elements");
            delete elementSet[elements.id];
            elements.buffer.destroy();
            elements.buffer = null;
          }
          function createElements(options, persistent) {
            var buffer = bufferState.create(null, GL_ELEMENT_ARRAY_BUFFER, true);
            var elements = new REGLElementBuffer(buffer._buffer);
            stats2.elementsCount++;
            function reglElements(options2) {
              if (!options2) {
                buffer();
                elements.primType = GL_TRIANGLES;
                elements.vertCount = 0;
                elements.type = GL_UNSIGNED_BYTE$4;
              } else if (typeof options2 === "number") {
                buffer(options2);
                elements.primType = GL_TRIANGLES;
                elements.vertCount = options2 | 0;
                elements.type = GL_UNSIGNED_BYTE$4;
              } else {
                var data = null;
                var usage = GL_STATIC_DRAW$1;
                var primType = -1;
                var vertCount = -1;
                var byteLength = 0;
                var dtype = 0;
                if (Array.isArray(options2) || isTypedArray(options2) || isNDArrayLike(options2)) {
                  data = options2;
                } else {
                  check$1.type(options2, "object", "invalid arguments for elements");
                  if ("data" in options2) {
                    data = options2.data;
                    check$1(Array.isArray(data) || isTypedArray(data) || isNDArrayLike(data), "invalid data for element buffer");
                  }
                  if ("usage" in options2) {
                    check$1.parameter(options2.usage, usageTypes, "invalid element buffer usage");
                    usage = usageTypes[options2.usage];
                  }
                  if ("primitive" in options2) {
                    check$1.parameter(options2.primitive, primTypes, "invalid element buffer primitive");
                    primType = primTypes[options2.primitive];
                  }
                  if ("count" in options2) {
                    check$1(typeof options2.count === "number" && options2.count >= 0, "invalid vertex count for elements");
                    vertCount = options2.count | 0;
                  }
                  if ("type" in options2) {
                    check$1.parameter(options2.type, elementTypes, "invalid buffer type");
                    dtype = elementTypes[options2.type];
                  }
                  if ("length" in options2) {
                    byteLength = options2.length | 0;
                  } else {
                    byteLength = vertCount;
                    if (dtype === GL_UNSIGNED_SHORT$2 || dtype === GL_SHORT$2) {
                      byteLength *= 2;
                    } else if (dtype === GL_UNSIGNED_INT$2 || dtype === GL_INT$2) {
                      byteLength *= 4;
                    }
                  }
                }
                initElements(elements, data, usage, primType, vertCount, byteLength, dtype);
              }
              return reglElements;
            }
            reglElements(options);
            reglElements._reglType = "elements";
            reglElements._elements = elements;
            reglElements.subdata = function(data, offset) {
              buffer.subdata(data, offset);
              return reglElements;
            };
            reglElements.destroy = function() {
              destroyElements(elements);
            };
            return reglElements;
          }
          return {
            create: createElements,
            createStream: createElementStream,
            destroyStream: destroyElementStream,
            getElements: function(elements) {
              if (typeof elements === "function" && elements._elements instanceof REGLElementBuffer) {
                return elements._elements;
              }
              return null;
            },
            clear: function() {
              values(elementSet).forEach(destroyElements);
            }
          };
        }
        var FLOAT = new Float32Array(1);
        var INT = new Uint32Array(FLOAT.buffer);
        var GL_UNSIGNED_SHORT$4 = 5123;
        function convertToHalfFloat(array) {
          var ushorts = pool.allocType(GL_UNSIGNED_SHORT$4, array.length);
          for (var i = 0; i < array.length; ++i) {
            if (isNaN(array[i])) {
              ushorts[i] = 65535;
            } else if (array[i] === Infinity) {
              ushorts[i] = 31744;
            } else if (array[i] === -Infinity) {
              ushorts[i] = 64512;
            } else {
              FLOAT[0] = array[i];
              var x = INT[0];
              var sgn = x >>> 31 << 15;
              var exp = (x << 1 >>> 24) - 127;
              var frac = x >> 13 & (1 << 10) - 1;
              if (exp < -24) {
                ushorts[i] = sgn;
              } else if (exp < -14) {
                var s = -14 - exp;
                ushorts[i] = sgn + (frac + (1 << 10) >> s);
              } else if (exp > 15) {
                ushorts[i] = sgn + 31744;
              } else {
                ushorts[i] = sgn + (exp + 15 << 10) + frac;
              }
            }
          }
          return ushorts;
        }
        function isArrayLike(s) {
          return Array.isArray(s) || isTypedArray(s);
        }
        var isPow2$1 = function(v) {
          return !(v & v - 1) && !!v;
        };
        var GL_COMPRESSED_TEXTURE_FORMATS = 34467;
        var GL_TEXTURE_2D$1 = 3553;
        var GL_TEXTURE_CUBE_MAP$1 = 34067;
        var GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 = 34069;
        var GL_RGBA$1 = 6408;
        var GL_ALPHA = 6406;
        var GL_RGB = 6407;
        var GL_LUMINANCE = 6409;
        var GL_LUMINANCE_ALPHA = 6410;
        var GL_RGBA4 = 32854;
        var GL_RGB5_A1 = 32855;
        var GL_RGB565 = 36194;
        var GL_UNSIGNED_SHORT_4_4_4_4$1 = 32819;
        var GL_UNSIGNED_SHORT_5_5_5_1$1 = 32820;
        var GL_UNSIGNED_SHORT_5_6_5$1 = 33635;
        var GL_UNSIGNED_INT_24_8_WEBGL$1 = 34042;
        var GL_DEPTH_COMPONENT = 6402;
        var GL_DEPTH_STENCIL = 34041;
        var GL_SRGB_EXT = 35904;
        var GL_SRGB_ALPHA_EXT = 35906;
        var GL_HALF_FLOAT_OES$1 = 36193;
        var GL_COMPRESSED_RGB_S3TC_DXT1_EXT = 33776;
        var GL_COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777;
        var GL_COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778;
        var GL_COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779;
        var GL_COMPRESSED_RGB_ATC_WEBGL = 35986;
        var GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 35987;
        var GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 34798;
        var GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840;
        var GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841;
        var GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842;
        var GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843;
        var GL_COMPRESSED_RGB_ETC1_WEBGL = 36196;
        var GL_UNSIGNED_BYTE$5 = 5121;
        var GL_UNSIGNED_SHORT$3 = 5123;
        var GL_UNSIGNED_INT$3 = 5125;
        var GL_FLOAT$4 = 5126;
        var GL_TEXTURE_WRAP_S = 10242;
        var GL_TEXTURE_WRAP_T = 10243;
        var GL_REPEAT = 10497;
        var GL_CLAMP_TO_EDGE$1 = 33071;
        var GL_MIRRORED_REPEAT = 33648;
        var GL_TEXTURE_MAG_FILTER = 10240;
        var GL_TEXTURE_MIN_FILTER = 10241;
        var GL_NEAREST$1 = 9728;
        var GL_LINEAR = 9729;
        var GL_NEAREST_MIPMAP_NEAREST$1 = 9984;
        var GL_LINEAR_MIPMAP_NEAREST$1 = 9985;
        var GL_NEAREST_MIPMAP_LINEAR$1 = 9986;
        var GL_LINEAR_MIPMAP_LINEAR$1 = 9987;
        var GL_GENERATE_MIPMAP_HINT = 33170;
        var GL_DONT_CARE = 4352;
        var GL_FASTEST = 4353;
        var GL_NICEST = 4354;
        var GL_TEXTURE_MAX_ANISOTROPY_EXT = 34046;
        var GL_UNPACK_ALIGNMENT = 3317;
        var GL_UNPACK_FLIP_Y_WEBGL = 37440;
        var GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
        var GL_UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
        var GL_BROWSER_DEFAULT_WEBGL = 37444;
        var GL_TEXTURE0$1 = 33984;
        var MIPMAP_FILTERS = [
          GL_NEAREST_MIPMAP_NEAREST$1,
          GL_NEAREST_MIPMAP_LINEAR$1,
          GL_LINEAR_MIPMAP_NEAREST$1,
          GL_LINEAR_MIPMAP_LINEAR$1
        ];
        var CHANNELS_FORMAT = [
          0,
          GL_LUMINANCE,
          GL_LUMINANCE_ALPHA,
          GL_RGB,
          GL_RGBA$1
        ];
        var FORMAT_CHANNELS = {};
        FORMAT_CHANNELS[GL_LUMINANCE] = FORMAT_CHANNELS[GL_ALPHA] = FORMAT_CHANNELS[GL_DEPTH_COMPONENT] = 1;
        FORMAT_CHANNELS[GL_DEPTH_STENCIL] = FORMAT_CHANNELS[GL_LUMINANCE_ALPHA] = 2;
        FORMAT_CHANNELS[GL_RGB] = FORMAT_CHANNELS[GL_SRGB_EXT] = 3;
        FORMAT_CHANNELS[GL_RGBA$1] = FORMAT_CHANNELS[GL_SRGB_ALPHA_EXT] = 4;
        function objectName(str) {
          return "[object " + str + "]";
        }
        var CANVAS_CLASS = objectName("HTMLCanvasElement");
        var OFFSCREENCANVAS_CLASS = objectName("OffscreenCanvas");
        var CONTEXT2D_CLASS = objectName("CanvasRenderingContext2D");
        var BITMAP_CLASS = objectName("ImageBitmap");
        var IMAGE_CLASS = objectName("HTMLImageElement");
        var VIDEO_CLASS = objectName("HTMLVideoElement");
        var PIXEL_CLASSES = Object.keys(arrayTypes).concat([
          CANVAS_CLASS,
          OFFSCREENCANVAS_CLASS,
          CONTEXT2D_CLASS,
          BITMAP_CLASS,
          IMAGE_CLASS,
          VIDEO_CLASS
        ]);
        var TYPE_SIZES = [];
        TYPE_SIZES[GL_UNSIGNED_BYTE$5] = 1;
        TYPE_SIZES[GL_FLOAT$4] = 4;
        TYPE_SIZES[GL_HALF_FLOAT_OES$1] = 2;
        TYPE_SIZES[GL_UNSIGNED_SHORT$3] = 2;
        TYPE_SIZES[GL_UNSIGNED_INT$3] = 4;
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
        function isNumericArray(arr) {
          return Array.isArray(arr) && (arr.length === 0 || typeof arr[0] === "number");
        }
        function isRectArray(arr) {
          if (!Array.isArray(arr)) {
            return false;
          }
          var width = arr.length;
          if (width === 0 || !isArrayLike(arr[0])) {
            return false;
          }
          return true;
        }
        function classString(x) {
          return Object.prototype.toString.call(x);
        }
        function isCanvasElement(object) {
          return classString(object) === CANVAS_CLASS;
        }
        function isOffscreenCanvas(object) {
          return classString(object) === OFFSCREENCANVAS_CLASS;
        }
        function isContext2D(object) {
          return classString(object) === CONTEXT2D_CLASS;
        }
        function isBitmap(object) {
          return classString(object) === BITMAP_CLASS;
        }
        function isImageElement(object) {
          return classString(object) === IMAGE_CLASS;
        }
        function isVideoElement(object) {
          return classString(object) === VIDEO_CLASS;
        }
        function isPixelData(object) {
          if (!object) {
            return false;
          }
          var className = classString(object);
          if (PIXEL_CLASSES.indexOf(className) >= 0) {
            return true;
          }
          return isNumericArray(object) || isRectArray(object) || isNDArrayLike(object);
        }
        function typedArrayCode$1(data) {
          return arrayTypes[Object.prototype.toString.call(data)] | 0;
        }
        function convertData(result, data) {
          var n = data.length;
          switch (result.type) {
            case GL_UNSIGNED_BYTE$5:
            case GL_UNSIGNED_SHORT$3:
            case GL_UNSIGNED_INT$3:
            case GL_FLOAT$4:
              var converted = pool.allocType(result.type, n);
              converted.set(data);
              result.data = converted;
              break;
            case GL_HALF_FLOAT_OES$1:
              result.data = convertToHalfFloat(data);
              break;
            default:
              check$1.raise("unsupported texture type, must specify a typed array");
          }
        }
        function preConvert(image, n) {
          return pool.allocType(image.type === GL_HALF_FLOAT_OES$1 ? GL_FLOAT$4 : image.type, n);
        }
        function postConvert(image, data) {
          if (image.type === GL_HALF_FLOAT_OES$1) {
            image.data = convertToHalfFloat(data);
            pool.freeType(data);
          } else {
            image.data = data;
          }
        }
        function transposeData(image, array, strideX, strideY, strideC, offset) {
          var w = image.width;
          var h = image.height;
          var c2 = image.channels;
          var n = w * h * c2;
          var data = preConvert(image, n);
          var p = 0;
          for (var i = 0; i < h; ++i) {
            for (var j = 0; j < w; ++j) {
              for (var k = 0; k < c2; ++k) {
                data[p++] = array[strideX * j + strideY * i + strideC * k + offset];
              }
            }
          }
          postConvert(image, data);
        }
        function getTextureSize(format, type, width, height, isMipmap, isCube) {
          var s;
          if (typeof FORMAT_SIZES_SPECIAL[format] !== "undefined") {
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
            return total;
          } else {
            return s * width * height;
          }
        }
        function createTextureSet(gl, extensions, limits, reglPoll, contextState, stats2, config2) {
          var mipmapHint = {
            "don't care": GL_DONT_CARE,
            "dont care": GL_DONT_CARE,
            "nice": GL_NICEST,
            "fast": GL_FASTEST
          };
          var wrapModes = {
            "repeat": GL_REPEAT,
            "clamp": GL_CLAMP_TO_EDGE$1,
            "mirror": GL_MIRRORED_REPEAT
          };
          var magFilters = {
            "nearest": GL_NEAREST$1,
            "linear": GL_LINEAR
          };
          var minFilters = extend({
            "mipmap": GL_LINEAR_MIPMAP_LINEAR$1,
            "nearest mipmap nearest": GL_NEAREST_MIPMAP_NEAREST$1,
            "linear mipmap nearest": GL_LINEAR_MIPMAP_NEAREST$1,
            "nearest mipmap linear": GL_NEAREST_MIPMAP_LINEAR$1,
            "linear mipmap linear": GL_LINEAR_MIPMAP_LINEAR$1
          }, magFilters);
          var colorSpace = {
            "none": 0,
            "browser": GL_BROWSER_DEFAULT_WEBGL
          };
          var textureTypes = {
            "uint8": GL_UNSIGNED_BYTE$5,
            "rgba4": GL_UNSIGNED_SHORT_4_4_4_4$1,
            "rgb565": GL_UNSIGNED_SHORT_5_6_5$1,
            "rgb5 a1": GL_UNSIGNED_SHORT_5_5_5_1$1
          };
          var textureFormats = {
            "alpha": GL_ALPHA,
            "luminance": GL_LUMINANCE,
            "luminance alpha": GL_LUMINANCE_ALPHA,
            "rgb": GL_RGB,
            "rgba": GL_RGBA$1,
            "rgba4": GL_RGBA4,
            "rgb5 a1": GL_RGB5_A1,
            "rgb565": GL_RGB565
          };
          var compressedTextureFormats = {};
          if (extensions.ext_srgb) {
            textureFormats.srgb = GL_SRGB_EXT;
            textureFormats.srgba = GL_SRGB_ALPHA_EXT;
          }
          if (extensions.oes_texture_float) {
            textureTypes.float32 = textureTypes.float = GL_FLOAT$4;
          }
          if (extensions.oes_texture_half_float) {
            textureTypes["float16"] = textureTypes["half float"] = GL_HALF_FLOAT_OES$1;
          }
          if (extensions.webgl_depth_texture) {
            extend(textureFormats, {
              "depth": GL_DEPTH_COMPONENT,
              "depth stencil": GL_DEPTH_STENCIL
            });
            extend(textureTypes, {
              "uint16": GL_UNSIGNED_SHORT$3,
              "uint32": GL_UNSIGNED_INT$3,
              "depth stencil": GL_UNSIGNED_INT_24_8_WEBGL$1
            });
          }
          if (extensions.webgl_compressed_texture_s3tc) {
            extend(compressedTextureFormats, {
              "rgb s3tc dxt1": GL_COMPRESSED_RGB_S3TC_DXT1_EXT,
              "rgba s3tc dxt1": GL_COMPRESSED_RGBA_S3TC_DXT1_EXT,
              "rgba s3tc dxt3": GL_COMPRESSED_RGBA_S3TC_DXT3_EXT,
              "rgba s3tc dxt5": GL_COMPRESSED_RGBA_S3TC_DXT5_EXT
            });
          }
          if (extensions.webgl_compressed_texture_atc) {
            extend(compressedTextureFormats, {
              "rgb atc": GL_COMPRESSED_RGB_ATC_WEBGL,
              "rgba atc explicit alpha": GL_COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL,
              "rgba atc interpolated alpha": GL_COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL
            });
          }
          if (extensions.webgl_compressed_texture_pvrtc) {
            extend(compressedTextureFormats, {
              "rgb pvrtc 4bppv1": GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG,
              "rgb pvrtc 2bppv1": GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG,
              "rgba pvrtc 4bppv1": GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
              "rgba pvrtc 2bppv1": GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
            });
          }
          if (extensions.webgl_compressed_texture_etc1) {
            compressedTextureFormats["rgb etc1"] = GL_COMPRESSED_RGB_ETC1_WEBGL;
          }
          var supportedCompressedFormats = Array.prototype.slice.call(gl.getParameter(GL_COMPRESSED_TEXTURE_FORMATS));
          Object.keys(compressedTextureFormats).forEach(function(name) {
            var format = compressedTextureFormats[name];
            if (supportedCompressedFormats.indexOf(format) >= 0) {
              textureFormats[name] = format;
            }
          });
          var supportedFormats = Object.keys(textureFormats);
          limits.textureFormats = supportedFormats;
          var textureFormatsInvert = [];
          Object.keys(textureFormats).forEach(function(key) {
            var val = textureFormats[key];
            textureFormatsInvert[val] = key;
          });
          var textureTypesInvert = [];
          Object.keys(textureTypes).forEach(function(key) {
            var val = textureTypes[key];
            textureTypesInvert[val] = key;
          });
          var magFiltersInvert = [];
          Object.keys(magFilters).forEach(function(key) {
            var val = magFilters[key];
            magFiltersInvert[val] = key;
          });
          var minFiltersInvert = [];
          Object.keys(minFilters).forEach(function(key) {
            var val = minFilters[key];
            minFiltersInvert[val] = key;
          });
          var wrapModesInvert = [];
          Object.keys(wrapModes).forEach(function(key) {
            var val = wrapModes[key];
            wrapModesInvert[val] = key;
          });
          var colorFormats = supportedFormats.reduce(function(color, key) {
            var glenum = textureFormats[key];
            if (glenum === GL_LUMINANCE || glenum === GL_ALPHA || glenum === GL_LUMINANCE || glenum === GL_LUMINANCE_ALPHA || glenum === GL_DEPTH_COMPONENT || glenum === GL_DEPTH_STENCIL || extensions.ext_srgb && (glenum === GL_SRGB_EXT || glenum === GL_SRGB_ALPHA_EXT)) {
              color[glenum] = glenum;
            } else if (glenum === GL_RGB5_A1 || key.indexOf("rgba") >= 0) {
              color[glenum] = GL_RGBA$1;
            } else {
              color[glenum] = GL_RGB;
            }
            return color;
          }, {});
          function TexFlags() {
            this.internalformat = GL_RGBA$1;
            this.format = GL_RGBA$1;
            this.type = GL_UNSIGNED_BYTE$5;
            this.compressed = false;
            this.premultiplyAlpha = false;
            this.flipY = false;
            this.unpackAlignment = 1;
            this.colorSpace = GL_BROWSER_DEFAULT_WEBGL;
            this.width = 0;
            this.height = 0;
            this.channels = 0;
          }
          function copyFlags(result, other) {
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
          function parseFlags(flags, options) {
            if (typeof options !== "object" || !options) {
              return;
            }
            if ("premultiplyAlpha" in options) {
              check$1.type(options.premultiplyAlpha, "boolean", "invalid premultiplyAlpha");
              flags.premultiplyAlpha = options.premultiplyAlpha;
            }
            if ("flipY" in options) {
              check$1.type(options.flipY, "boolean", "invalid texture flip");
              flags.flipY = options.flipY;
            }
            if ("alignment" in options) {
              check$1.oneOf(options.alignment, [1, 2, 4, 8], "invalid texture unpack alignment");
              flags.unpackAlignment = options.alignment;
            }
            if ("colorSpace" in options) {
              check$1.parameter(options.colorSpace, colorSpace, "invalid colorSpace");
              flags.colorSpace = colorSpace[options.colorSpace];
            }
            if ("type" in options) {
              var type = options.type;
              check$1(extensions.oes_texture_float || !(type === "float" || type === "float32"), "you must enable the OES_texture_float extension in order to use floating point textures.");
              check$1(extensions.oes_texture_half_float || !(type === "half float" || type === "float16"), "you must enable the OES_texture_half_float extension in order to use 16-bit floating point textures.");
              check$1(extensions.webgl_depth_texture || !(type === "uint16" || type === "uint32" || type === "depth stencil"), "you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures.");
              check$1.parameter(type, textureTypes, "invalid texture type");
              flags.type = textureTypes[type];
            }
            var w = flags.width;
            var h = flags.height;
            var c2 = flags.channels;
            var hasChannels = false;
            if ("shape" in options) {
              check$1(Array.isArray(options.shape) && options.shape.length >= 2, "shape must be an array");
              w = options.shape[0];
              h = options.shape[1];
              if (options.shape.length === 3) {
                c2 = options.shape[2];
                check$1(c2 > 0 && c2 <= 4, "invalid number of channels");
                hasChannels = true;
              }
              check$1(w >= 0 && w <= limits.maxTextureSize, "invalid width");
              check$1(h >= 0 && h <= limits.maxTextureSize, "invalid height");
            } else {
              if ("radius" in options) {
                w = h = options.radius;
                check$1(w >= 0 && w <= limits.maxTextureSize, "invalid radius");
              }
              if ("width" in options) {
                w = options.width;
                check$1(w >= 0 && w <= limits.maxTextureSize, "invalid width");
              }
              if ("height" in options) {
                h = options.height;
                check$1(h >= 0 && h <= limits.maxTextureSize, "invalid height");
              }
              if ("channels" in options) {
                c2 = options.channels;
                check$1(c2 > 0 && c2 <= 4, "invalid number of channels");
                hasChannels = true;
              }
            }
            flags.width = w | 0;
            flags.height = h | 0;
            flags.channels = c2 | 0;
            var hasFormat = false;
            if ("format" in options) {
              var formatStr = options.format;
              check$1(extensions.webgl_depth_texture || !(formatStr === "depth" || formatStr === "depth stencil"), "you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures.");
              check$1.parameter(formatStr, textureFormats, "invalid texture format");
              var internalformat = flags.internalformat = textureFormats[formatStr];
              flags.format = colorFormats[internalformat];
              if (formatStr in textureTypes) {
                if (!("type" in options)) {
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
            } else if (hasFormat && hasChannels) {
              check$1(flags.channels === FORMAT_CHANNELS[flags.format], "number of channels inconsistent with specified format");
            }
          }
          function setFlags(flags) {
            gl.pixelStorei(GL_UNPACK_FLIP_Y_WEBGL, flags.flipY);
            gl.pixelStorei(GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL, flags.premultiplyAlpha);
            gl.pixelStorei(GL_UNPACK_COLORSPACE_CONVERSION_WEBGL, flags.colorSpace);
            gl.pixelStorei(GL_UNPACK_ALIGNMENT, flags.unpackAlignment);
          }
          function TexImage() {
            TexFlags.call(this);
            this.xOffset = 0;
            this.yOffset = 0;
            this.data = null;
            this.needsFree = false;
            this.element = null;
            this.needsCopy = false;
          }
          function parseImage(image, options) {
            var data = null;
            if (isPixelData(options)) {
              data = options;
            } else if (options) {
              check$1.type(options, "object", "invalid pixel data type");
              parseFlags(image, options);
              if ("x" in options) {
                image.xOffset = options.x | 0;
              }
              if ("y" in options) {
                image.yOffset = options.y | 0;
              }
              if (isPixelData(options.data)) {
                data = options.data;
              }
            }
            check$1(!image.compressed || data instanceof Uint8Array, "compressed texture data must be stored in a uint8array");
            if (options.copy) {
              check$1(!data, "can not specify copy and data field for the same texture");
              var viewW = contextState.viewportWidth;
              var viewH = contextState.viewportHeight;
              image.width = image.width || viewW - image.xOffset;
              image.height = image.height || viewH - image.yOffset;
              image.needsCopy = true;
              check$1(image.xOffset >= 0 && image.xOffset < viewW && image.yOffset >= 0 && image.yOffset < viewH && image.width > 0 && image.width <= viewW && image.height > 0 && image.height <= viewH, "copy texture read out of bounds");
            } else if (!data) {
              image.width = image.width || 1;
              image.height = image.height || 1;
              image.channels = image.channels || 4;
            } else if (isTypedArray(data)) {
              image.channels = image.channels || 4;
              image.data = data;
              if (!("type" in options) && image.type === GL_UNSIGNED_BYTE$5) {
                image.type = typedArrayCode$1(data);
              }
            } else if (isNumericArray(data)) {
              image.channels = image.channels || 4;
              convertData(image, data);
              image.alignment = 1;
              image.needsFree = true;
            } else if (isNDArrayLike(data)) {
              var array = data.data;
              if (!Array.isArray(array) && image.type === GL_UNSIGNED_BYTE$5) {
                image.type = typedArrayCode$1(array);
              }
              var shape = data.shape;
              var stride = data.stride;
              var shapeX, shapeY, shapeC, strideX, strideY, strideC;
              if (shape.length === 3) {
                shapeC = shape[2];
                strideC = stride[2];
              } else {
                check$1(shape.length === 2, "invalid ndarray pixel data, must be 2 or 3D");
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
              var c2 = image.channels;
              if (isArrayLike(data[0][0])) {
                c2 = c2 || data[0][0].length;
              } else {
                c2 = c2 || 1;
              }
              var arrayShape2 = flattenUtils.shape(data);
              var n = 1;
              for (var dd = 0; dd < arrayShape2.length; ++dd) {
                n *= arrayShape2[dd];
              }
              var allocData = preConvert(image, n);
              flattenUtils.flatten(data, arrayShape2, "", allocData);
              postConvert(image, allocData);
              image.alignment = 1;
              image.width = w;
              image.height = h;
              image.channels = c2;
              image.format = image.internalformat = CHANNELS_FORMAT[c2];
              image.needsFree = true;
            }
            if (image.type === GL_FLOAT$4) {
              check$1(limits.extensions.indexOf("oes_texture_float") >= 0, "oes_texture_float extension not enabled");
            } else if (image.type === GL_HALF_FLOAT_OES$1) {
              check$1(limits.extensions.indexOf("oes_texture_half_float") >= 0, "oes_texture_half_float extension not enabled");
            }
          }
          function setImage(info, target, miplevel) {
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
              gl.copyTexImage2D(target, miplevel, format, info.xOffset, info.yOffset, width, height, 0);
            } else {
              gl.texImage2D(target, miplevel, format, width, height, 0, format, type, data || null);
            }
          }
          function setSubImage(info, target, x, y, miplevel) {
            var element = info.element;
            var data = info.data;
            var internalformat = info.internalformat;
            var format = info.format;
            var type = info.type;
            var width = info.width;
            var height = info.height;
            setFlags(info);
            if (element) {
              gl.texSubImage2D(target, miplevel, x, y, format, type, element);
            } else if (info.compressed) {
              gl.compressedTexSubImage2D(target, miplevel, x, y, internalformat, width, height, data);
            } else if (info.needsCopy) {
              reglPoll();
              gl.copyTexSubImage2D(target, miplevel, x, y, info.xOffset, info.yOffset, width, height);
            } else {
              gl.texSubImage2D(target, miplevel, x, y, width, height, format, type, data);
            }
          }
          var imagePool = [];
          function allocImage() {
            return imagePool.pop() || new TexImage();
          }
          function freeImage(image) {
            if (image.needsFree) {
              pool.freeType(image.data);
            }
            TexImage.call(image);
            imagePool.push(image);
          }
          function MipMap() {
            TexFlags.call(this);
            this.genMipmaps = false;
            this.mipmapHint = GL_DONT_CARE;
            this.mipmask = 0;
            this.images = Array(16);
          }
          function parseMipMapFromShape(mipmap, width, height) {
            var img = mipmap.images[0] = allocImage();
            mipmap.mipmask = 1;
            img.width = mipmap.width = width;
            img.height = mipmap.height = height;
            img.channels = mipmap.channels = 4;
          }
          function parseMipMapFromObject(mipmap, options) {
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
                  mipmap.mipmask |= 1 << i;
                }
              } else {
                imgData = mipmap.images[0] = allocImage();
                copyFlags(imgData, mipmap);
                parseImage(imgData, options);
                mipmap.mipmask = 1;
              }
            }
            copyFlags(mipmap, mipmap.images[0]);
            if (mipmap.compressed && (mipmap.internalformat === GL_COMPRESSED_RGB_S3TC_DXT1_EXT || mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT1_EXT || mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT3_EXT || mipmap.internalformat === GL_COMPRESSED_RGBA_S3TC_DXT5_EXT)) {
              check$1(mipmap.width % 4 === 0 && mipmap.height % 4 === 0, "for compressed texture formats, mipmap level 0 must have width and height that are a multiple of 4");
            }
          }
          function setMipMap(mipmap, target) {
            var images = mipmap.images;
            for (var i = 0; i < images.length; ++i) {
              if (!images[i]) {
                return;
              }
              setImage(images[i], target, i);
            }
          }
          var mipPool = [];
          function allocMipMap() {
            var result = mipPool.pop() || new MipMap();
            TexFlags.call(result);
            result.mipmask = 0;
            for (var i = 0; i < 16; ++i) {
              result.images[i] = null;
            }
            return result;
          }
          function freeMipMap(mipmap) {
            var images = mipmap.images;
            for (var i = 0; i < images.length; ++i) {
              if (images[i]) {
                freeImage(images[i]);
              }
              images[i] = null;
            }
            mipPool.push(mipmap);
          }
          function TexInfo() {
            this.minFilter = GL_NEAREST$1;
            this.magFilter = GL_NEAREST$1;
            this.wrapS = GL_CLAMP_TO_EDGE$1;
            this.wrapT = GL_CLAMP_TO_EDGE$1;
            this.anisotropic = 1;
            this.genMipmaps = false;
            this.mipmapHint = GL_DONT_CARE;
          }
          function parseTexInfo(info, options) {
            if ("min" in options) {
              var minFilter = options.min;
              check$1.parameter(minFilter, minFilters);
              info.minFilter = minFilters[minFilter];
              if (MIPMAP_FILTERS.indexOf(info.minFilter) >= 0 && !("faces" in options)) {
                info.genMipmaps = true;
              }
            }
            if ("mag" in options) {
              var magFilter = options.mag;
              check$1.parameter(magFilter, magFilters);
              info.magFilter = magFilters[magFilter];
            }
            var wrapS = info.wrapS;
            var wrapT = info.wrapT;
            if ("wrap" in options) {
              var wrap = options.wrap;
              if (typeof wrap === "string") {
                check$1.parameter(wrap, wrapModes);
                wrapS = wrapT = wrapModes[wrap];
              } else if (Array.isArray(wrap)) {
                check$1.parameter(wrap[0], wrapModes);
                check$1.parameter(wrap[1], wrapModes);
                wrapS = wrapModes[wrap[0]];
                wrapT = wrapModes[wrap[1]];
              }
            } else {
              if ("wrapS" in options) {
                var optWrapS = options.wrapS;
                check$1.parameter(optWrapS, wrapModes);
                wrapS = wrapModes[optWrapS];
              }
              if ("wrapT" in options) {
                var optWrapT = options.wrapT;
                check$1.parameter(optWrapT, wrapModes);
                wrapT = wrapModes[optWrapT];
              }
            }
            info.wrapS = wrapS;
            info.wrapT = wrapT;
            if ("anisotropic" in options) {
              var anisotropic = options.anisotropic;
              check$1(typeof anisotropic === "number" && anisotropic >= 1 && anisotropic <= limits.maxAnisotropic, "aniso samples must be between 1 and ");
              info.anisotropic = options.anisotropic;
            }
            if ("mipmap" in options) {
              var hasMipMap = false;
              switch (typeof options.mipmap) {
                case "string":
                  check$1.parameter(options.mipmap, mipmapHint, "invalid mipmap hint");
                  info.mipmapHint = mipmapHint[options.mipmap];
                  info.genMipmaps = true;
                  hasMipMap = true;
                  break;
                case "boolean":
                  hasMipMap = info.genMipmaps = options.mipmap;
                  break;
                case "object":
                  check$1(Array.isArray(options.mipmap), "invalid mipmap type");
                  info.genMipmaps = false;
                  hasMipMap = true;
                  break;
                default:
                  check$1.raise("invalid mipmap type");
              }
              if (hasMipMap && !("min" in options)) {
                info.minFilter = GL_NEAREST_MIPMAP_NEAREST$1;
              }
            }
          }
          function setTexInfo(info, target) {
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
          var textureUnits = Array(numTexUnits).map(function() {
            return null;
          });
          function REGLTexture(target) {
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
            if (config2.profile) {
              this.stats = { size: 0 };
            }
          }
          function tempBind(texture) {
            gl.activeTexture(GL_TEXTURE0$1);
            gl.bindTexture(texture.target, texture.texture);
          }
          function tempRestore() {
            var prev = textureUnits[0];
            if (prev) {
              gl.bindTexture(prev.target, prev.texture);
            } else {
              gl.bindTexture(GL_TEXTURE_2D$1, null);
            }
          }
          function destroy(texture) {
            var handle = texture.texture;
            check$1(handle, "must not double destroy texture");
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
            stats2.textureCount--;
          }
          extend(REGLTexture.prototype, {
            bind: function() {
              var texture = this;
              texture.bindCount += 1;
              var unit = texture.unit;
              if (unit < 0) {
                for (var i = 0; i < numTexUnits; ++i) {
                  var other = textureUnits[i];
                  if (other) {
                    if (other.bindCount > 0) {
                      continue;
                    }
                    other.unit = -1;
                  }
                  textureUnits[i] = texture;
                  unit = i;
                  break;
                }
                if (unit >= numTexUnits) {
                  check$1.raise("insufficient number of texture units");
                }
                if (config2.profile && stats2.maxTextureUnits < unit + 1) {
                  stats2.maxTextureUnits = unit + 1;
                }
                texture.unit = unit;
                gl.activeTexture(GL_TEXTURE0$1 + unit);
                gl.bindTexture(texture.target, texture.texture);
              }
              return unit;
            },
            unbind: function() {
              this.bindCount -= 1;
            },
            decRef: function() {
              if (--this.refCount <= 0) {
                destroy(this);
              }
            }
          });
          function createTexture2D(a, b) {
            var texture = new REGLTexture(GL_TEXTURE_2D$1);
            textureSet[texture.id] = texture;
            stats2.textureCount++;
            function reglTexture2D(a2, b2) {
              var texInfo = texture.texInfo;
              TexInfo.call(texInfo);
              var mipData = allocMipMap();
              if (typeof a2 === "number") {
                if (typeof b2 === "number") {
                  parseMipMapFromShape(mipData, a2 | 0, b2 | 0);
                } else {
                  parseMipMapFromShape(mipData, a2 | 0, a2 | 0);
                }
              } else if (a2) {
                check$1.type(a2, "object", "invalid arguments to regl.texture");
                parseTexInfo(texInfo, a2);
                parseMipMapFromObject(mipData, a2);
              } else {
                parseMipMapFromShape(mipData, 1, 1);
              }
              if (texInfo.genMipmaps) {
                mipData.mipmask = (mipData.width << 1) - 1;
              }
              texture.mipmask = mipData.mipmask;
              copyFlags(texture, mipData);
              check$1.texture2D(texInfo, mipData, limits);
              texture.internalformat = mipData.internalformat;
              reglTexture2D.width = mipData.width;
              reglTexture2D.height = mipData.height;
              tempBind(texture);
              setMipMap(mipData, GL_TEXTURE_2D$1);
              setTexInfo(texInfo, GL_TEXTURE_2D$1);
              tempRestore();
              freeMipMap(mipData);
              if (config2.profile) {
                texture.stats.size = getTextureSize(texture.internalformat, texture.type, mipData.width, mipData.height, texInfo.genMipmaps, false);
              }
              reglTexture2D.format = textureFormatsInvert[texture.internalformat];
              reglTexture2D.type = textureTypesInvert[texture.type];
              reglTexture2D.mag = magFiltersInvert[texInfo.magFilter];
              reglTexture2D.min = minFiltersInvert[texInfo.minFilter];
              reglTexture2D.wrapS = wrapModesInvert[texInfo.wrapS];
              reglTexture2D.wrapT = wrapModesInvert[texInfo.wrapT];
              return reglTexture2D;
            }
            function subimage(image, x_, y_, level_) {
              check$1(!!image, "must specify image data");
              var x = x_ | 0;
              var y = y_ | 0;
              var level = level_ | 0;
              var imageData = allocImage();
              copyFlags(imageData, texture);
              imageData.width = 0;
              imageData.height = 0;
              parseImage(imageData, image);
              imageData.width = imageData.width || (texture.width >> level) - x;
              imageData.height = imageData.height || (texture.height >> level) - y;
              check$1(texture.type === imageData.type && texture.format === imageData.format && texture.internalformat === imageData.internalformat, "incompatible format for texture.subimage");
              check$1(x >= 0 && y >= 0 && x + imageData.width <= texture.width && y + imageData.height <= texture.height, "texture.subimage write out of bounds");
              check$1(texture.mipmask & 1 << level, "missing mipmap data");
              check$1(imageData.data || imageData.element || imageData.needsCopy, "missing image data");
              tempBind(texture);
              setSubImage(imageData, GL_TEXTURE_2D$1, x, y, level);
              tempRestore();
              freeImage(imageData);
              return reglTexture2D;
            }
            function resize(w_, h_) {
              var w = w_ | 0;
              var h = h_ | 0 || w;
              if (w === texture.width && h === texture.height) {
                return reglTexture2D;
              }
              reglTexture2D.width = texture.width = w;
              reglTexture2D.height = texture.height = h;
              tempBind(texture);
              for (var i = 0; texture.mipmask >> i; ++i) {
                var _w = w >> i;
                var _h = h >> i;
                if (!_w || !_h)
                  break;
                gl.texImage2D(GL_TEXTURE_2D$1, i, texture.format, _w, _h, 0, texture.format, texture.type, null);
              }
              tempRestore();
              if (config2.profile) {
                texture.stats.size = getTextureSize(texture.internalformat, texture.type, w, h, false, false);
              }
              return reglTexture2D;
            }
            reglTexture2D(a, b);
            reglTexture2D.subimage = subimage;
            reglTexture2D.resize = resize;
            reglTexture2D._reglType = "texture2d";
            reglTexture2D._texture = texture;
            if (config2.profile) {
              reglTexture2D.stats = texture.stats;
            }
            reglTexture2D.destroy = function() {
              texture.decRef();
            };
            return reglTexture2D;
          }
          function createTextureCube(a0, a1, a2, a3, a4, a5) {
            var texture = new REGLTexture(GL_TEXTURE_CUBE_MAP$1);
            textureSet[texture.id] = texture;
            stats2.cubeCount++;
            var faces = new Array(6);
            function reglTextureCube(a02, a12, a22, a32, a42, a52) {
              var i;
              var texInfo = texture.texInfo;
              TexInfo.call(texInfo);
              for (i = 0; i < 6; ++i) {
                faces[i] = allocMipMap();
              }
              if (typeof a02 === "number" || !a02) {
                var s = a02 | 0 || 1;
                for (i = 0; i < 6; ++i) {
                  parseMipMapFromShape(faces[i], s, s);
                }
              } else if (typeof a02 === "object") {
                if (a12) {
                  parseMipMapFromObject(faces[0], a02);
                  parseMipMapFromObject(faces[1], a12);
                  parseMipMapFromObject(faces[2], a22);
                  parseMipMapFromObject(faces[3], a32);
                  parseMipMapFromObject(faces[4], a42);
                  parseMipMapFromObject(faces[5], a52);
                } else {
                  parseTexInfo(texInfo, a02);
                  parseFlags(texture, a02);
                  if ("faces" in a02) {
                    var faceInput = a02.faces;
                    check$1(Array.isArray(faceInput) && faceInput.length === 6, "cube faces must be a length 6 array");
                    for (i = 0; i < 6; ++i) {
                      check$1(typeof faceInput[i] === "object" && !!faceInput[i], "invalid input for cube map face");
                      copyFlags(faces[i], texture);
                      parseMipMapFromObject(faces[i], faceInput[i]);
                    }
                  } else {
                    for (i = 0; i < 6; ++i) {
                      parseMipMapFromObject(faces[i], a02);
                    }
                  }
                }
              } else {
                check$1.raise("invalid arguments to cube map");
              }
              copyFlags(texture, faces[0]);
              check$1.optional(function() {
                if (!limits.npotTextureCube) {
                  check$1(isPow2$1(texture.width) && isPow2$1(texture.height), "your browser does not support non power or two texture dimensions");
                }
              });
              if (texInfo.genMipmaps) {
                texture.mipmask = (faces[0].width << 1) - 1;
              } else {
                texture.mipmask = faces[0].mipmask;
              }
              check$1.textureCube(texture, texInfo, faces, limits);
              texture.internalformat = faces[0].internalformat;
              reglTextureCube.width = faces[0].width;
              reglTextureCube.height = faces[0].height;
              tempBind(texture);
              for (i = 0; i < 6; ++i) {
                setMipMap(faces[i], GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + i);
              }
              setTexInfo(texInfo, GL_TEXTURE_CUBE_MAP$1);
              tempRestore();
              if (config2.profile) {
                texture.stats.size = getTextureSize(texture.internalformat, texture.type, reglTextureCube.width, reglTextureCube.height, texInfo.genMipmaps, true);
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
              return reglTextureCube;
            }
            function subimage(face, image, x_, y_, level_) {
              check$1(!!image, "must specify image data");
              check$1(typeof face === "number" && face === (face | 0) && face >= 0 && face < 6, "invalid face");
              var x = x_ | 0;
              var y = y_ | 0;
              var level = level_ | 0;
              var imageData = allocImage();
              copyFlags(imageData, texture);
              imageData.width = 0;
              imageData.height = 0;
              parseImage(imageData, image);
              imageData.width = imageData.width || (texture.width >> level) - x;
              imageData.height = imageData.height || (texture.height >> level) - y;
              check$1(texture.type === imageData.type && texture.format === imageData.format && texture.internalformat === imageData.internalformat, "incompatible format for texture.subimage");
              check$1(x >= 0 && y >= 0 && x + imageData.width <= texture.width && y + imageData.height <= texture.height, "texture.subimage write out of bounds");
              check$1(texture.mipmask & 1 << level, "missing mipmap data");
              check$1(imageData.data || imageData.element || imageData.needsCopy, "missing image data");
              tempBind(texture);
              setSubImage(imageData, GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + face, x, y, level);
              tempRestore();
              freeImage(imageData);
              return reglTextureCube;
            }
            function resize(radius_) {
              var radius = radius_ | 0;
              if (radius === texture.width) {
                return;
              }
              reglTextureCube.width = texture.width = radius;
              reglTextureCube.height = texture.height = radius;
              tempBind(texture);
              for (var i = 0; i < 6; ++i) {
                for (var j = 0; texture.mipmask >> j; ++j) {
                  gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + i, j, texture.format, radius >> j, radius >> j, 0, texture.format, texture.type, null);
                }
              }
              tempRestore();
              if (config2.profile) {
                texture.stats.size = getTextureSize(texture.internalformat, texture.type, reglTextureCube.width, reglTextureCube.height, false, true);
              }
              return reglTextureCube;
            }
            reglTextureCube(a0, a1, a2, a3, a4, a5);
            reglTextureCube.subimage = subimage;
            reglTextureCube.resize = resize;
            reglTextureCube._reglType = "textureCube";
            reglTextureCube._texture = texture;
            if (config2.profile) {
              reglTextureCube.stats = texture.stats;
            }
            reglTextureCube.destroy = function() {
              texture.decRef();
            };
            return reglTextureCube;
          }
          function destroyTextures() {
            for (var i = 0; i < numTexUnits; ++i) {
              gl.activeTexture(GL_TEXTURE0$1 + i);
              gl.bindTexture(GL_TEXTURE_2D$1, null);
              textureUnits[i] = null;
            }
            values(textureSet).forEach(destroy);
            stats2.cubeCount = 0;
            stats2.textureCount = 0;
          }
          if (config2.profile) {
            stats2.getTotalTextureSize = function() {
              var total = 0;
              Object.keys(textureSet).forEach(function(key) {
                total += textureSet[key].stats.size;
              });
              return total;
            };
          }
          function restoreTextures() {
            for (var i = 0; i < numTexUnits; ++i) {
              var tex = textureUnits[i];
              if (tex) {
                tex.bindCount = 0;
                tex.unit = -1;
                textureUnits[i] = null;
              }
            }
            values(textureSet).forEach(function(texture) {
              texture.texture = gl.createTexture();
              gl.bindTexture(texture.target, texture.texture);
              for (var i2 = 0; i2 < 32; ++i2) {
                if ((texture.mipmask & 1 << i2) === 0) {
                  continue;
                }
                if (texture.target === GL_TEXTURE_2D$1) {
                  gl.texImage2D(GL_TEXTURE_2D$1, i2, texture.internalformat, texture.width >> i2, texture.height >> i2, 0, texture.internalformat, texture.type, null);
                } else {
                  for (var j = 0; j < 6; ++j) {
                    gl.texImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X$1 + j, i2, texture.internalformat, texture.width >> i2, texture.height >> i2, 0, texture.internalformat, texture.type, null);
                  }
                }
              }
              setTexInfo(texture.texInfo, texture.target);
            });
          }
          function refreshTextures() {
            for (var i = 0; i < numTexUnits; ++i) {
              var tex = textureUnits[i];
              if (tex) {
                tex.bindCount = 0;
                tex.unit = -1;
                textureUnits[i] = null;
              }
              gl.activeTexture(GL_TEXTURE0$1 + i);
              gl.bindTexture(GL_TEXTURE_2D$1, null);
              gl.bindTexture(GL_TEXTURE_CUBE_MAP$1, null);
            }
          }
          return {
            create2D: createTexture2D,
            createCube: createTextureCube,
            clear: destroyTextures,
            getTexture: function(wrapper) {
              return null;
            },
            restore: restoreTextures,
            refresh: refreshTextures
          };
        }
        var GL_RENDERBUFFER = 36161;
        var GL_RGBA4$1 = 32854;
        var GL_RGB5_A1$1 = 32855;
        var GL_RGB565$1 = 36194;
        var GL_DEPTH_COMPONENT16 = 33189;
        var GL_STENCIL_INDEX8 = 36168;
        var GL_DEPTH_STENCIL$1 = 34041;
        var GL_SRGB8_ALPHA8_EXT = 35907;
        var GL_RGBA32F_EXT = 34836;
        var GL_RGBA16F_EXT = 34842;
        var GL_RGB16F_EXT = 34843;
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
        function getRenderbufferSize(format, width, height) {
          return FORMAT_SIZES[format] * width * height;
        }
        var wrapRenderbuffers = function(gl, extensions, limits, stats2, config2) {
          var formatTypes = {
            "rgba4": GL_RGBA4$1,
            "rgb565": GL_RGB565$1,
            "rgb5 a1": GL_RGB5_A1$1,
            "depth": GL_DEPTH_COMPONENT16,
            "stencil": GL_STENCIL_INDEX8,
            "depth stencil": GL_DEPTH_STENCIL$1
          };
          if (extensions.ext_srgb) {
            formatTypes["srgba"] = GL_SRGB8_ALPHA8_EXT;
          }
          if (extensions.ext_color_buffer_half_float) {
            formatTypes["rgba16f"] = GL_RGBA16F_EXT;
            formatTypes["rgb16f"] = GL_RGB16F_EXT;
          }
          if (extensions.webgl_color_buffer_float) {
            formatTypes["rgba32f"] = GL_RGBA32F_EXT;
          }
          var formatTypesInvert = [];
          Object.keys(formatTypes).forEach(function(key) {
            var val = formatTypes[key];
            formatTypesInvert[val] = key;
          });
          var renderbufferCount = 0;
          var renderbufferSet = {};
          function REGLRenderbuffer(renderbuffer) {
            this.id = renderbufferCount++;
            this.refCount = 1;
            this.renderbuffer = renderbuffer;
            this.format = GL_RGBA4$1;
            this.width = 0;
            this.height = 0;
            if (config2.profile) {
              this.stats = { size: 0 };
            }
          }
          REGLRenderbuffer.prototype.decRef = function() {
            if (--this.refCount <= 0) {
              destroy(this);
            }
          };
          function destroy(rb) {
            var handle = rb.renderbuffer;
            check$1(handle, "must not double destroy renderbuffer");
            gl.bindRenderbuffer(GL_RENDERBUFFER, null);
            gl.deleteRenderbuffer(handle);
            rb.renderbuffer = null;
            rb.refCount = 0;
            delete renderbufferSet[rb.id];
            stats2.renderbufferCount--;
          }
          function createRenderbuffer(a, b) {
            var renderbuffer = new REGLRenderbuffer(gl.createRenderbuffer());
            renderbufferSet[renderbuffer.id] = renderbuffer;
            stats2.renderbufferCount++;
            function reglRenderbuffer(a2, b2) {
              var w = 0;
              var h = 0;
              var format = GL_RGBA4$1;
              if (typeof a2 === "object" && a2) {
                var options = a2;
                if ("shape" in options) {
                  var shape = options.shape;
                  check$1(Array.isArray(shape) && shape.length >= 2, "invalid renderbuffer shape");
                  w = shape[0] | 0;
                  h = shape[1] | 0;
                } else {
                  if ("radius" in options) {
                    w = h = options.radius | 0;
                  }
                  if ("width" in options) {
                    w = options.width | 0;
                  }
                  if ("height" in options) {
                    h = options.height | 0;
                  }
                }
                if ("format" in options) {
                  check$1.parameter(options.format, formatTypes, "invalid renderbuffer format");
                  format = formatTypes[options.format];
                }
              } else if (typeof a2 === "number") {
                w = a2 | 0;
                if (typeof b2 === "number") {
                  h = b2 | 0;
                } else {
                  h = w;
                }
              } else if (!a2) {
                w = h = 1;
              } else {
                check$1.raise("invalid arguments to renderbuffer constructor");
              }
              check$1(w > 0 && h > 0 && w <= limits.maxRenderbufferSize && h <= limits.maxRenderbufferSize, "invalid renderbuffer size");
              if (w === renderbuffer.width && h === renderbuffer.height && format === renderbuffer.format) {
                return;
              }
              reglRenderbuffer.width = renderbuffer.width = w;
              reglRenderbuffer.height = renderbuffer.height = h;
              renderbuffer.format = format;
              gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer.renderbuffer);
              gl.renderbufferStorage(GL_RENDERBUFFER, format, w, h);
              check$1(gl.getError() === 0, "invalid render buffer format");
              if (config2.profile) {
                renderbuffer.stats.size = getRenderbufferSize(renderbuffer.format, renderbuffer.width, renderbuffer.height);
              }
              reglRenderbuffer.format = formatTypesInvert[renderbuffer.format];
              return reglRenderbuffer;
            }
            function resize(w_, h_) {
              var w = w_ | 0;
              var h = h_ | 0 || w;
              if (w === renderbuffer.width && h === renderbuffer.height) {
                return reglRenderbuffer;
              }
              check$1(w > 0 && h > 0 && w <= limits.maxRenderbufferSize && h <= limits.maxRenderbufferSize, "invalid renderbuffer size");
              reglRenderbuffer.width = renderbuffer.width = w;
              reglRenderbuffer.height = renderbuffer.height = h;
              gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer.renderbuffer);
              gl.renderbufferStorage(GL_RENDERBUFFER, renderbuffer.format, w, h);
              check$1(gl.getError() === 0, "invalid render buffer format");
              if (config2.profile) {
                renderbuffer.stats.size = getRenderbufferSize(renderbuffer.format, renderbuffer.width, renderbuffer.height);
              }
              return reglRenderbuffer;
            }
            reglRenderbuffer(a, b);
            reglRenderbuffer.resize = resize;
            reglRenderbuffer._reglType = "renderbuffer";
            reglRenderbuffer._renderbuffer = renderbuffer;
            if (config2.profile) {
              reglRenderbuffer.stats = renderbuffer.stats;
            }
            reglRenderbuffer.destroy = function() {
              renderbuffer.decRef();
            };
            return reglRenderbuffer;
          }
          if (config2.profile) {
            stats2.getTotalRenderbufferSize = function() {
              var total = 0;
              Object.keys(renderbufferSet).forEach(function(key) {
                total += renderbufferSet[key].stats.size;
              });
              return total;
            };
          }
          function restoreRenderbuffers() {
            values(renderbufferSet).forEach(function(rb) {
              rb.renderbuffer = gl.createRenderbuffer();
              gl.bindRenderbuffer(GL_RENDERBUFFER, rb.renderbuffer);
              gl.renderbufferStorage(GL_RENDERBUFFER, rb.format, rb.width, rb.height);
            });
            gl.bindRenderbuffer(GL_RENDERBUFFER, null);
          }
          return {
            create: createRenderbuffer,
            clear: function() {
              values(renderbufferSet).forEach(destroy);
            },
            restore: restoreRenderbuffers
          };
        };
        var GL_FRAMEBUFFER$1 = 36160;
        var GL_RENDERBUFFER$1 = 36161;
        var GL_TEXTURE_2D$2 = 3553;
        var GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 = 34069;
        var GL_COLOR_ATTACHMENT0$1 = 36064;
        var GL_DEPTH_ATTACHMENT = 36096;
        var GL_STENCIL_ATTACHMENT = 36128;
        var GL_DEPTH_STENCIL_ATTACHMENT = 33306;
        var GL_FRAMEBUFFER_COMPLETE$1 = 36053;
        var GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
        var GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
        var GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
        var GL_FRAMEBUFFER_UNSUPPORTED = 36061;
        var GL_HALF_FLOAT_OES$2 = 36193;
        var GL_UNSIGNED_BYTE$6 = 5121;
        var GL_FLOAT$5 = 5126;
        var GL_RGB$1 = 6407;
        var GL_RGBA$2 = 6408;
        var GL_DEPTH_COMPONENT$1 = 6402;
        var colorTextureFormatEnums = [
          GL_RGB$1,
          GL_RGBA$2
        ];
        var textureFormatChannels = [];
        textureFormatChannels[GL_RGBA$2] = 4;
        textureFormatChannels[GL_RGB$1] = 3;
        var textureTypeSizes = [];
        textureTypeSizes[GL_UNSIGNED_BYTE$6] = 1;
        textureTypeSizes[GL_FLOAT$5] = 4;
        textureTypeSizes[GL_HALF_FLOAT_OES$2] = 2;
        var GL_RGBA4$2 = 32854;
        var GL_RGB5_A1$2 = 32855;
        var GL_RGB565$2 = 36194;
        var GL_DEPTH_COMPONENT16$1 = 33189;
        var GL_STENCIL_INDEX8$1 = 36168;
        var GL_DEPTH_STENCIL$2 = 34041;
        var GL_SRGB8_ALPHA8_EXT$1 = 35907;
        var GL_RGBA32F_EXT$1 = 34836;
        var GL_RGBA16F_EXT$1 = 34842;
        var GL_RGB16F_EXT$1 = 34843;
        var colorRenderbufferFormatEnums = [
          GL_RGBA4$2,
          GL_RGB5_A1$2,
          GL_RGB565$2,
          GL_SRGB8_ALPHA8_EXT$1,
          GL_RGBA16F_EXT$1,
          GL_RGB16F_EXT$1,
          GL_RGBA32F_EXT$1
        ];
        var statusCode = {};
        statusCode[GL_FRAMEBUFFER_COMPLETE$1] = "complete";
        statusCode[GL_FRAMEBUFFER_INCOMPLETE_ATTACHMENT] = "incomplete attachment";
        statusCode[GL_FRAMEBUFFER_INCOMPLETE_DIMENSIONS] = "incomplete dimensions";
        statusCode[GL_FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT] = "incomplete, missing attachment";
        statusCode[GL_FRAMEBUFFER_UNSUPPORTED] = "unsupported";
        function wrapFBOState(gl, extensions, limits, textureState, renderbufferState, stats2) {
          var framebufferState = {
            cur: null,
            next: null,
            dirty: false,
            setFBO: null
          };
          var colorTextureFormats = ["rgba"];
          var colorRenderbufferFormats = ["rgba4", "rgb565", "rgb5 a1"];
          if (extensions.ext_srgb) {
            colorRenderbufferFormats.push("srgba");
          }
          if (extensions.ext_color_buffer_half_float) {
            colorRenderbufferFormats.push("rgba16f", "rgb16f");
          }
          if (extensions.webgl_color_buffer_float) {
            colorRenderbufferFormats.push("rgba32f");
          }
          var colorTypes = ["uint8"];
          if (extensions.oes_texture_half_float) {
            colorTypes.push("half float", "float16");
          }
          if (extensions.oes_texture_float) {
            colorTypes.push("float", "float32");
          }
          function FramebufferAttachment(target, texture, renderbuffer) {
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
          function decRef(attachment) {
            if (attachment) {
              if (attachment.texture) {
                attachment.texture._texture.decRef();
              }
              if (attachment.renderbuffer) {
                attachment.renderbuffer._renderbuffer.decRef();
              }
            }
          }
          function incRefAndCheckShape(attachment, width, height) {
            if (!attachment) {
              return;
            }
            if (attachment.texture) {
              var texture = attachment.texture._texture;
              var tw = Math.max(1, texture.width);
              var th = Math.max(1, texture.height);
              check$1(tw === width && th === height, "inconsistent width/height for supplied texture");
              texture.refCount += 1;
            } else {
              var renderbuffer = attachment.renderbuffer._renderbuffer;
              check$1(renderbuffer.width === width && renderbuffer.height === height, "inconsistent width/height for renderbuffer");
              renderbuffer.refCount += 1;
            }
          }
          function attach(location, attachment) {
            if (attachment) {
              if (attachment.texture) {
                gl.framebufferTexture2D(GL_FRAMEBUFFER$1, location, attachment.target, attachment.texture._texture.texture, 0);
              } else {
                gl.framebufferRenderbuffer(GL_FRAMEBUFFER$1, location, GL_RENDERBUFFER$1, attachment.renderbuffer._renderbuffer.renderbuffer);
              }
            }
          }
          function parseAttachment(attachment) {
            var target = GL_TEXTURE_2D$2;
            var texture = null;
            var renderbuffer = null;
            var data = attachment;
            if (typeof attachment === "object") {
              data = attachment.data;
              if ("target" in attachment) {
                target = attachment.target | 0;
              }
            }
            check$1.type(data, "function", "invalid attachment data");
            var type = data._reglType;
            if (type === "texture2d") {
              texture = data;
              check$1(target === GL_TEXTURE_2D$2);
            } else if (type === "textureCube") {
              texture = data;
              check$1(target >= GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 && target < GL_TEXTURE_CUBE_MAP_POSITIVE_X$2 + 6, "invalid cube map target");
            } else if (type === "renderbuffer") {
              renderbuffer = data;
              target = GL_RENDERBUFFER$1;
            } else {
              check$1.raise("invalid regl object for attachment");
            }
            return new FramebufferAttachment(target, texture, renderbuffer);
          }
          function allocAttachment(width, height, isTexture, format, type) {
            if (isTexture) {
              var texture = textureState.create2D({
                width,
                height,
                format,
                type
              });
              texture._texture.refCount = 0;
              return new FramebufferAttachment(GL_TEXTURE_2D$2, texture, null);
            } else {
              var rb = renderbufferState.create({
                width,
                height,
                format
              });
              rb._renderbuffer.refCount = 0;
              return new FramebufferAttachment(GL_RENDERBUFFER$1, null, rb);
            }
          }
          function unwrapAttachment(attachment) {
            return attachment && (attachment.texture || attachment.renderbuffer);
          }
          function resizeAttachment(attachment, w, h) {
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
          function REGLFramebuffer() {
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
          function decFBORefs(framebuffer) {
            framebuffer.colorAttachments.forEach(decRef);
            decRef(framebuffer.depthAttachment);
            decRef(framebuffer.stencilAttachment);
            decRef(framebuffer.depthStencilAttachment);
          }
          function destroy(framebuffer) {
            var handle = framebuffer.framebuffer;
            check$1(handle, "must not double destroy framebuffer");
            gl.deleteFramebuffer(handle);
            framebuffer.framebuffer = null;
            stats2.framebufferCount--;
            delete framebufferSet[framebuffer.id];
          }
          function updateFramebuffer(framebuffer) {
            var i;
            gl.bindFramebuffer(GL_FRAMEBUFFER$1, framebuffer.framebuffer);
            var colorAttachments = framebuffer.colorAttachments;
            for (i = 0; i < colorAttachments.length; ++i) {
              attach(GL_COLOR_ATTACHMENT0$1 + i, colorAttachments[i]);
            }
            for (i = colorAttachments.length; i < limits.maxColorAttachments; ++i) {
              gl.framebufferTexture2D(GL_FRAMEBUFFER$1, GL_COLOR_ATTACHMENT0$1 + i, GL_TEXTURE_2D$2, null, 0);
            }
            gl.framebufferTexture2D(GL_FRAMEBUFFER$1, GL_DEPTH_STENCIL_ATTACHMENT, GL_TEXTURE_2D$2, null, 0);
            gl.framebufferTexture2D(GL_FRAMEBUFFER$1, GL_DEPTH_ATTACHMENT, GL_TEXTURE_2D$2, null, 0);
            gl.framebufferTexture2D(GL_FRAMEBUFFER$1, GL_STENCIL_ATTACHMENT, GL_TEXTURE_2D$2, null, 0);
            attach(GL_DEPTH_ATTACHMENT, framebuffer.depthAttachment);
            attach(GL_STENCIL_ATTACHMENT, framebuffer.stencilAttachment);
            attach(GL_DEPTH_STENCIL_ATTACHMENT, framebuffer.depthStencilAttachment);
            var status = gl.checkFramebufferStatus(GL_FRAMEBUFFER$1);
            if (!gl.isContextLost() && status !== GL_FRAMEBUFFER_COMPLETE$1) {
              check$1.raise("framebuffer configuration not supported, status = " + statusCode[status]);
            }
            gl.bindFramebuffer(GL_FRAMEBUFFER$1, framebufferState.next ? framebufferState.next.framebuffer : null);
            framebufferState.cur = framebufferState.next;
            gl.getError();
          }
          function createFBO(a0, a1) {
            var framebuffer = new REGLFramebuffer();
            stats2.framebufferCount++;
            function reglFramebuffer(a, b) {
              var i;
              check$1(framebufferState.next !== framebuffer, "can not update framebuffer which is currently in use");
              var width = 0;
              var height = 0;
              var needsDepth = true;
              var needsStencil = true;
              var colorBuffer = null;
              var colorTexture = true;
              var colorFormat = "rgba";
              var colorType = "uint8";
              var colorCount = 1;
              var depthBuffer = null;
              var stencilBuffer = null;
              var depthStencilBuffer = null;
              var depthStencilTexture = false;
              if (typeof a === "number") {
                width = a | 0;
                height = b | 0 || width;
              } else if (!a) {
                width = height = 1;
              } else {
                check$1.type(a, "object", "invalid arguments for framebuffer");
                var options = a;
                if ("shape" in options) {
                  var shape = options.shape;
                  check$1(Array.isArray(shape) && shape.length >= 2, "invalid shape for framebuffer");
                  width = shape[0];
                  height = shape[1];
                } else {
                  if ("radius" in options) {
                    width = height = options.radius;
                  }
                  if ("width" in options) {
                    width = options.width;
                  }
                  if ("height" in options) {
                    height = options.height;
                  }
                }
                if ("color" in options || "colors" in options) {
                  colorBuffer = options.color || options.colors;
                  if (Array.isArray(colorBuffer)) {
                    check$1(colorBuffer.length === 1 || extensions.webgl_draw_buffers, "multiple render targets not supported");
                  }
                }
                if (!colorBuffer) {
                  if ("colorCount" in options) {
                    colorCount = options.colorCount | 0;
                    check$1(colorCount > 0, "invalid color buffer count");
                  }
                  if ("colorTexture" in options) {
                    colorTexture = !!options.colorTexture;
                    colorFormat = "rgba4";
                  }
                  if ("colorType" in options) {
                    colorType = options.colorType;
                    if (!colorTexture) {
                      if (colorType === "half float" || colorType === "float16") {
                        check$1(extensions.ext_color_buffer_half_float, "you must enable EXT_color_buffer_half_float to use 16-bit render buffers");
                        colorFormat = "rgba16f";
                      } else if (colorType === "float" || colorType === "float32") {
                        check$1(extensions.webgl_color_buffer_float, "you must enable WEBGL_color_buffer_float in order to use 32-bit floating point renderbuffers");
                        colorFormat = "rgba32f";
                      }
                    } else {
                      check$1(extensions.oes_texture_float || !(colorType === "float" || colorType === "float32"), "you must enable OES_texture_float in order to use floating point framebuffer objects");
                      check$1(extensions.oes_texture_half_float || !(colorType === "half float" || colorType === "float16"), "you must enable OES_texture_half_float in order to use 16-bit floating point framebuffer objects");
                    }
                    check$1.oneOf(colorType, colorTypes, "invalid color type");
                  }
                  if ("colorFormat" in options) {
                    colorFormat = options.colorFormat;
                    if (colorTextureFormats.indexOf(colorFormat) >= 0) {
                      colorTexture = true;
                    } else if (colorRenderbufferFormats.indexOf(colorFormat) >= 0) {
                      colorTexture = false;
                    } else {
                      check$1.optional(function() {
                        if (colorTexture) {
                          check$1.oneOf(options.colorFormat, colorTextureFormats, "invalid color format for texture");
                        } else {
                          check$1.oneOf(options.colorFormat, colorRenderbufferFormats, "invalid color format for renderbuffer");
                        }
                      });
                    }
                  }
                }
                if ("depthTexture" in options || "depthStencilTexture" in options) {
                  depthStencilTexture = !!(options.depthTexture || options.depthStencilTexture);
                  check$1(!depthStencilTexture || extensions.webgl_depth_texture, "webgl_depth_texture extension not supported");
                }
                if ("depth" in options) {
                  if (typeof options.depth === "boolean") {
                    needsDepth = options.depth;
                  } else {
                    depthBuffer = options.depth;
                    needsStencil = false;
                  }
                }
                if ("stencil" in options) {
                  if (typeof options.stencil === "boolean") {
                    needsStencil = options.stencil;
                  } else {
                    stencilBuffer = options.stencil;
                    needsDepth = false;
                  }
                }
                if ("depthStencil" in options) {
                  if (typeof options.depthStencil === "boolean") {
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
                  colorAttachments[i] = allocAttachment(width, height, colorTexture, colorFormat, colorType);
                }
              }
              check$1(extensions.webgl_draw_buffers || colorAttachments.length <= 1, "you must enable the WEBGL_draw_buffers extension in order to use multiple color buffers.");
              check$1(colorAttachments.length <= limits.maxColorAttachments, "too many color attachments, not supported");
              width = width || colorAttachments[0].width;
              height = height || colorAttachments[0].height;
              if (depthBuffer) {
                depthAttachment = parseAttachment(depthBuffer);
              } else if (needsDepth && !needsStencil) {
                depthAttachment = allocAttachment(width, height, depthStencilTexture, "depth", "uint32");
              }
              if (stencilBuffer) {
                stencilAttachment = parseAttachment(stencilBuffer);
              } else if (needsStencil && !needsDepth) {
                stencilAttachment = allocAttachment(width, height, false, "stencil", "uint8");
              }
              if (depthStencilBuffer) {
                depthStencilAttachment = parseAttachment(depthStencilBuffer);
              } else if (!depthBuffer && !stencilBuffer && needsStencil && needsDepth) {
                depthStencilAttachment = allocAttachment(width, height, depthStencilTexture, "depth stencil", "depth stencil");
              }
              check$1(!!depthBuffer + !!stencilBuffer + !!depthStencilBuffer <= 1, "invalid framebuffer configuration, can specify exactly one depth/stencil attachment");
              var commonColorAttachmentSize = null;
              for (i = 0; i < colorAttachments.length; ++i) {
                incRefAndCheckShape(colorAttachments[i], width, height);
                check$1(!colorAttachments[i] || colorAttachments[i].texture && colorTextureFormatEnums.indexOf(colorAttachments[i].texture._texture.format) >= 0 || colorAttachments[i].renderbuffer && colorRenderbufferFormatEnums.indexOf(colorAttachments[i].renderbuffer._renderbuffer.format) >= 0, "framebuffer color attachment " + i + " is invalid");
                if (colorAttachments[i] && colorAttachments[i].texture) {
                  var colorAttachmentSize = textureFormatChannels[colorAttachments[i].texture._texture.format] * textureTypeSizes[colorAttachments[i].texture._texture.type];
                  if (commonColorAttachmentSize === null) {
                    commonColorAttachmentSize = colorAttachmentSize;
                  } else {
                    check$1(commonColorAttachmentSize === colorAttachmentSize, "all color attachments much have the same number of bits per pixel.");
                  }
                }
              }
              incRefAndCheckShape(depthAttachment, width, height);
              check$1(!depthAttachment || depthAttachment.texture && depthAttachment.texture._texture.format === GL_DEPTH_COMPONENT$1 || depthAttachment.renderbuffer && depthAttachment.renderbuffer._renderbuffer.format === GL_DEPTH_COMPONENT16$1, "invalid depth attachment for framebuffer object");
              incRefAndCheckShape(stencilAttachment, width, height);
              check$1(!stencilAttachment || stencilAttachment.renderbuffer && stencilAttachment.renderbuffer._renderbuffer.format === GL_STENCIL_INDEX8$1, "invalid stencil attachment for framebuffer object");
              incRefAndCheckShape(depthStencilAttachment, width, height);
              check$1(!depthStencilAttachment || depthStencilAttachment.texture && depthStencilAttachment.texture._texture.format === GL_DEPTH_STENCIL$2 || depthStencilAttachment.renderbuffer && depthStencilAttachment.renderbuffer._renderbuffer.format === GL_DEPTH_STENCIL$2, "invalid depth-stencil attachment for framebuffer object");
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
              return reglFramebuffer;
            }
            function resize(w_, h_) {
              check$1(framebufferState.next !== framebuffer, "can not resize a framebuffer which is currently in use");
              var w = Math.max(w_ | 0, 1);
              var h = Math.max(h_ | 0 || w, 1);
              if (w === framebuffer.width && h === framebuffer.height) {
                return reglFramebuffer;
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
              return reglFramebuffer;
            }
            reglFramebuffer(a0, a1);
            return extend(reglFramebuffer, {
              resize,
              _reglType: "framebuffer",
              _framebuffer: framebuffer,
              destroy: function() {
                destroy(framebuffer);
                decFBORefs(framebuffer);
              },
              use: function(block) {
                framebufferState.setFBO({
                  framebuffer: reglFramebuffer
                }, block);
              }
            });
          }
          function createCubeFBO(options) {
            var faces = Array(6);
            function reglFramebufferCube(a) {
              var i;
              check$1(faces.indexOf(framebufferState.next) < 0, "can not update framebuffer which is currently in use");
              var params = {
                color: null
              };
              var radius = 0;
              var colorBuffer = null;
              var colorFormat = "rgba";
              var colorType = "uint8";
              var colorCount = 1;
              if (typeof a === "number") {
                radius = a | 0;
              } else if (!a) {
                radius = 1;
              } else {
                check$1.type(a, "object", "invalid arguments for framebuffer");
                var options2 = a;
                if ("shape" in options2) {
                  var shape = options2.shape;
                  check$1(Array.isArray(shape) && shape.length >= 2, "invalid shape for framebuffer");
                  check$1(shape[0] === shape[1], "cube framebuffer must be square");
                  radius = shape[0];
                } else {
                  if ("radius" in options2) {
                    radius = options2.radius | 0;
                  }
                  if ("width" in options2) {
                    radius = options2.width | 0;
                    if ("height" in options2) {
                      check$1(options2.height === radius, "must be square");
                    }
                  } else if ("height" in options2) {
                    radius = options2.height | 0;
                  }
                }
                if ("color" in options2 || "colors" in options2) {
                  colorBuffer = options2.color || options2.colors;
                  if (Array.isArray(colorBuffer)) {
                    check$1(colorBuffer.length === 1 || extensions.webgl_draw_buffers, "multiple render targets not supported");
                  }
                }
                if (!colorBuffer) {
                  if ("colorCount" in options2) {
                    colorCount = options2.colorCount | 0;
                    check$1(colorCount > 0, "invalid color buffer count");
                  }
                  if ("colorType" in options2) {
                    check$1.oneOf(options2.colorType, colorTypes, "invalid color type");
                    colorType = options2.colorType;
                  }
                  if ("colorFormat" in options2) {
                    colorFormat = options2.colorFormat;
                    check$1.oneOf(options2.colorFormat, colorTextureFormats, "invalid color format for texture");
                  }
                }
                if ("depth" in options2) {
                  params.depth = options2.depth;
                }
                if ("stencil" in options2) {
                  params.stencil = options2.stencil;
                }
                if ("depthStencil" in options2) {
                  params.depthStencil = options2.depthStencil;
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
                  colorCubes = [colorBuffer];
                }
              } else {
                colorCubes = Array(colorCount);
                var cubeMapParams = {
                  radius,
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
                check$1(typeof cube === "function" && cube._reglType === "textureCube", "invalid cube map");
                radius = radius || cube.width;
                check$1(cube.width === radius && cube.height === radius, "invalid cube map shape");
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
                  faces[i](params);
                } else {
                  faces[i] = createFBO(params);
                }
              }
              return extend(reglFramebufferCube, {
                width: radius,
                height: radius,
                color: colorCubes
              });
            }
            function resize(radius_) {
              var i;
              var radius = radius_ | 0;
              check$1(radius > 0 && radius <= limits.maxCubeMapSize, "invalid radius for cube fbo");
              if (radius === reglFramebufferCube.width) {
                return reglFramebufferCube;
              }
              var colors = reglFramebufferCube.color;
              for (i = 0; i < colors.length; ++i) {
                colors[i].resize(radius);
              }
              for (i = 0; i < 6; ++i) {
                faces[i].resize(radius);
              }
              reglFramebufferCube.width = reglFramebufferCube.height = radius;
              return reglFramebufferCube;
            }
            reglFramebufferCube(options);
            return extend(reglFramebufferCube, {
              faces,
              resize,
              _reglType: "framebufferCube",
              destroy: function() {
                faces.forEach(function(f) {
                  f.destroy();
                });
              }
            });
          }
          function restoreFramebuffers() {
            framebufferState.cur = null;
            framebufferState.next = null;
            framebufferState.dirty = true;
            values(framebufferSet).forEach(function(fb) {
              fb.framebuffer = gl.createFramebuffer();
              updateFramebuffer(fb);
            });
          }
          return extend(framebufferState, {
            getFramebuffer: function(object) {
              if (typeof object === "function" && object._reglType === "framebuffer") {
                var fbo = object._framebuffer;
                if (fbo instanceof REGLFramebuffer) {
                  return fbo;
                }
              }
              return null;
            },
            create: createFBO,
            createCube: createCubeFBO,
            clear: function() {
              values(framebufferSet).forEach(destroy);
            },
            restore: restoreFramebuffers
          });
        }
        var GL_FLOAT$6 = 5126;
        var GL_ARRAY_BUFFER$1 = 34962;
        var GL_ELEMENT_ARRAY_BUFFER$1 = 34963;
        var VAO_OPTIONS = [
          "attributes",
          "elements",
          "offset",
          "count",
          "primitive",
          "instances"
        ];
        function AttributeRecord() {
          this.state = 0;
          this.x = 0;
          this.y = 0;
          this.z = 0;
          this.w = 0;
          this.buffer = null;
          this.size = 0;
          this.normalized = false;
          this.type = GL_FLOAT$6;
          this.offset = 0;
          this.stride = 0;
          this.divisor = 0;
        }
        function wrapAttributeState(gl, extensions, limits, stats2, bufferState, elementState, drawState) {
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
            restore: extVAO() ? restoreVAO : function() {
            },
            createVAO,
            getVAO,
            destroyBuffer,
            setVAO: extVAO() ? setVAOEXT : setVAOEmulated,
            clear: extVAO() ? destroyVAOEXT : function() {
            }
          };
          function destroyBuffer(buffer) {
            for (var i2 = 0; i2 < attributeBindings.length; ++i2) {
              var record = attributeBindings[i2];
              if (record.buffer === buffer) {
                gl.disableVertexAttribArray(i2);
                record.buffer = null;
              }
            }
          }
          function extVAO() {
            return extensions.oes_vertex_array_object;
          }
          function extInstanced() {
            return extensions.angle_instanced_arrays;
          }
          function getVAO(vao) {
            if (typeof vao === "function" && vao._vao) {
              return vao._vao;
            }
            return null;
          }
          function setVAOEXT(vao) {
            if (vao === state.currentVAO) {
              return;
            }
            var ext = extVAO();
            if (vao) {
              ext.bindVertexArrayOES(vao.vao);
            } else {
              ext.bindVertexArrayOES(null);
            }
            state.currentVAO = vao;
          }
          function setVAOEmulated(vao) {
            if (vao === state.currentVAO) {
              return;
            }
            if (vao) {
              vao.bindAttrs();
            } else {
              var exti = extInstanced();
              for (var i2 = 0; i2 < attributeBindings.length; ++i2) {
                var binding = attributeBindings[i2];
                if (binding.buffer) {
                  gl.enableVertexAttribArray(i2);
                  binding.buffer.bind();
                  gl.vertexAttribPointer(i2, binding.size, binding.type, binding.normalized, binding.stride, binding.offfset);
                  if (exti && binding.divisor) {
                    exti.vertexAttribDivisorANGLE(i2, binding.divisor);
                  }
                } else {
                  gl.disableVertexAttribArray(i2);
                  gl.vertexAttrib4f(i2, binding.x, binding.y, binding.z, binding.w);
                }
              }
              if (drawState.elements) {
                gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER$1, drawState.elements.buffer.buffer);
              } else {
                gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER$1, null);
              }
            }
            state.currentVAO = vao;
          }
          function destroyVAOEXT() {
            values(vaoSet).forEach(function(vao) {
              vao.destroy();
            });
          }
          function REGLVAO() {
            this.id = ++vaoCount;
            this.attributes = [];
            this.elements = null;
            this.ownsElements = false;
            this.count = 0;
            this.offset = 0;
            this.instances = -1;
            this.primitive = 4;
            var extension = extVAO();
            if (extension) {
              this.vao = extension.createVertexArrayOES();
            } else {
              this.vao = null;
            }
            vaoSet[this.id] = this;
            this.buffers = [];
          }
          REGLVAO.prototype.bindAttrs = function() {
            var exti = extInstanced();
            var attributes = this.attributes;
            for (var i2 = 0; i2 < attributes.length; ++i2) {
              var attr = attributes[i2];
              if (attr.buffer) {
                gl.enableVertexAttribArray(i2);
                gl.bindBuffer(GL_ARRAY_BUFFER$1, attr.buffer.buffer);
                gl.vertexAttribPointer(i2, attr.size, attr.type, attr.normalized, attr.stride, attr.offset);
                if (exti && attr.divisor) {
                  exti.vertexAttribDivisorANGLE(i2, attr.divisor);
                }
              } else {
                gl.disableVertexAttribArray(i2);
                gl.vertexAttrib4f(i2, attr.x, attr.y, attr.z, attr.w);
              }
            }
            for (var j = attributes.length; j < NUM_ATTRIBUTES; ++j) {
              gl.disableVertexAttribArray(j);
            }
            var elements = elementState.getElements(this.elements);
            if (elements) {
              gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER$1, elements.buffer.buffer);
            } else {
              gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER$1, null);
            }
          };
          REGLVAO.prototype.refresh = function() {
            var ext = extVAO();
            if (ext) {
              ext.bindVertexArrayOES(this.vao);
              this.bindAttrs();
              state.currentVAO = null;
              ext.bindVertexArrayOES(null);
            }
          };
          REGLVAO.prototype.destroy = function() {
            if (this.vao) {
              var extension = extVAO();
              if (this === state.currentVAO) {
                state.currentVAO = null;
                extension.bindVertexArrayOES(null);
              }
              extension.deleteVertexArrayOES(this.vao);
              this.vao = null;
            }
            if (this.ownsElements) {
              this.elements.destroy();
              this.elements = null;
              this.ownsElements = false;
            }
            if (vaoSet[this.id]) {
              delete vaoSet[this.id];
              stats2.vaoCount -= 1;
            }
          };
          function restoreVAO() {
            var ext = extVAO();
            if (ext) {
              values(vaoSet).forEach(function(vao) {
                vao.refresh();
              });
            }
          }
          function createVAO(_attr) {
            var vao = new REGLVAO();
            stats2.vaoCount += 1;
            function updateVAO(options) {
              var attributes;
              if (Array.isArray(options)) {
                attributes = options;
                if (vao.elements && vao.ownsElements) {
                  vao.elements.destroy();
                }
                vao.elements = null;
                vao.ownsElements = false;
                vao.offset = 0;
                vao.count = 0;
                vao.instances = -1;
                vao.primitive = 4;
              } else {
                check$1(typeof options === "object", "invalid arguments for create vao");
                check$1("attributes" in options, "must specify attributes for vao");
                if (options.elements) {
                  var elements = options.elements;
                  if (vao.ownsElements) {
                    if (typeof elements === "function" && elements._reglType === "elements") {
                      vao.elements.destroy();
                      vao.ownsElements = false;
                    } else {
                      vao.elements(elements);
                      vao.ownsElements = false;
                    }
                  } else if (elementState.getElements(options.elements)) {
                    vao.elements = options.elements;
                    vao.ownsElements = false;
                  } else {
                    vao.elements = elementState.create(options.elements);
                    vao.ownsElements = true;
                  }
                } else {
                  vao.elements = null;
                  vao.ownsElements = false;
                }
                attributes = options.attributes;
                vao.offset = 0;
                vao.count = -1;
                vao.instances = -1;
                vao.primitive = 4;
                if (vao.elements) {
                  vao.count = vao.elements._elements.vertCount;
                  vao.primitive = vao.elements._elements.primType;
                }
                if ("offset" in options) {
                  vao.offset = options.offset | 0;
                }
                if ("count" in options) {
                  vao.count = options.count | 0;
                }
                if ("instances" in options) {
                  vao.instances = options.instances | 0;
                }
                if ("primitive" in options) {
                  check$1(options.primitive in primTypes, "bad primitive type: " + options.primitive);
                  vao.primitive = primTypes[options.primitive];
                }
                check$1.optional(() => {
                  var keys = Object.keys(options);
                  for (var i3 = 0; i3 < keys.length; ++i3) {
                    check$1(VAO_OPTIONS.indexOf(keys[i3]) >= 0, 'invalid option for vao: "' + keys[i3] + '" valid options are ' + VAO_OPTIONS);
                  }
                });
                check$1(Array.isArray(attributes), "attributes must be an array");
              }
              check$1(attributes.length < NUM_ATTRIBUTES, "too many attributes");
              check$1(attributes.length > 0, "must specify at least one attribute");
              var bufUpdated = {};
              var nattributes = vao.attributes;
              nattributes.length = attributes.length;
              for (var i2 = 0; i2 < attributes.length; ++i2) {
                var spec = attributes[i2];
                var rec = nattributes[i2] = new AttributeRecord();
                var data = spec.data || spec;
                if (Array.isArray(data) || isTypedArray(data) || isNDArrayLike(data)) {
                  var buf;
                  if (vao.buffers[i2]) {
                    buf = vao.buffers[i2];
                    if (isTypedArray(data) && buf._buffer.byteLength >= data.byteLength) {
                      buf.subdata(data);
                    } else {
                      buf.destroy();
                      vao.buffers[i2] = null;
                    }
                  }
                  if (!vao.buffers[i2]) {
                    buf = vao.buffers[i2] = bufferState.create(spec, GL_ARRAY_BUFFER$1, false, true);
                  }
                  rec.buffer = bufferState.getBuffer(buf);
                  rec.size = rec.buffer.dimension | 0;
                  rec.normalized = false;
                  rec.type = rec.buffer.dtype;
                  rec.offset = 0;
                  rec.stride = 0;
                  rec.divisor = 0;
                  rec.state = 1;
                  bufUpdated[i2] = 1;
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
                  rec.size = (+spec.size || rec.buffer.dimension) | 0;
                  rec.normalized = !!spec.normalized || false;
                  if ("type" in spec) {
                    check$1.parameter(spec.type, glTypes, "invalid buffer type");
                    rec.type = glTypes[spec.type];
                  } else {
                    rec.type = rec.buffer.dtype;
                  }
                  rec.offset = (spec.offset || 0) | 0;
                  rec.stride = (spec.stride || 0) | 0;
                  rec.divisor = (spec.divisor || 0) | 0;
                  rec.state = 1;
                  check$1(rec.size >= 1 && rec.size <= 4, "size must be between 1 and 4");
                  check$1(rec.offset >= 0, "invalid offset");
                  check$1(rec.stride >= 0 && rec.stride <= 255, "stride must be between 0 and 255");
                  check$1(rec.divisor >= 0, "divisor must be positive");
                  check$1(!rec.divisor || !!extensions.angle_instanced_arrays, "ANGLE_instanced_arrays must be enabled to use divisor");
                } else if ("x" in spec) {
                  check$1(i2 > 0, "first attribute must not be a constant");
                  rec.x = +spec.x || 0;
                  rec.y = +spec.y || 0;
                  rec.z = +spec.z || 0;
                  rec.w = +spec.w || 0;
                  rec.state = 2;
                } else {
                  check$1(false, "invalid attribute spec for location " + i2);
                }
              }
              for (var j = 0; j < vao.buffers.length; ++j) {
                if (!bufUpdated[j] && vao.buffers[j]) {
                  vao.buffers[j].destroy();
                  vao.buffers[j] = null;
                }
              }
              vao.refresh();
              return updateVAO;
            }
            updateVAO.destroy = function() {
              for (var j = 0; j < vao.buffers.length; ++j) {
                if (vao.buffers[j]) {
                  vao.buffers[j].destroy();
                }
              }
              vao.buffers.length = 0;
              if (vao.ownsElements) {
                vao.elements.destroy();
                vao.elements = null;
                vao.ownsElements = false;
              }
              vao.destroy();
            };
            updateVAO._vao = vao;
            updateVAO._reglType = "vao";
            return updateVAO(_attr);
          }
          return state;
        }
        var GL_FRAGMENT_SHADER = 35632;
        var GL_VERTEX_SHADER = 35633;
        var GL_ACTIVE_UNIFORMS = 35718;
        var GL_ACTIVE_ATTRIBUTES = 35721;
        function wrapShaderState(gl, stringStore, stats2, config2) {
          var fragShaders = {};
          var vertShaders = {};
          function ActiveInfo(name, id, location, info) {
            this.name = name;
            this.id = id;
            this.location = location;
            this.info = info;
          }
          function insertActiveInfo(list, info) {
            for (var i = 0; i < list.length; ++i) {
              if (list[i].id === info.id) {
                list[i].location = info.location;
                return;
              }
            }
            list.push(info);
          }
          function getShader(type, id, command) {
            var cache = type === GL_FRAGMENT_SHADER ? fragShaders : vertShaders;
            var shader = cache[id];
            if (!shader) {
              var source = stringStore.str(id);
              shader = gl.createShader(type);
              gl.shaderSource(shader, source);
              gl.compileShader(shader);
              check$1.shaderError(gl, shader, source, type, command);
              cache[id] = shader;
            }
            return shader;
          }
          var programCache = {};
          var programList = [];
          var PROGRAM_COUNTER = 0;
          function REGLProgram(fragId, vertId) {
            this.id = PROGRAM_COUNTER++;
            this.fragId = fragId;
            this.vertId = vertId;
            this.program = null;
            this.uniforms = [];
            this.attributes = [];
            this.refCount = 1;
            if (config2.profile) {
              this.stats = {
                uniformsCount: 0,
                attributesCount: 0
              };
            }
          }
          function linkProgram(desc, command, attributeLocations) {
            var i, info;
            var fragShader = getShader(GL_FRAGMENT_SHADER, desc.fragId);
            var vertShader = getShader(GL_VERTEX_SHADER, desc.vertId);
            var program = desc.program = gl.createProgram();
            gl.attachShader(program, fragShader);
            gl.attachShader(program, vertShader);
            if (attributeLocations) {
              for (i = 0; i < attributeLocations.length; ++i) {
                var binding = attributeLocations[i];
                gl.bindAttribLocation(program, binding[0], binding[1]);
              }
            }
            gl.linkProgram(program);
            check$1.linkError(gl, program, stringStore.str(desc.fragId), stringStore.str(desc.vertId), command);
            var numUniforms = gl.getProgramParameter(program, GL_ACTIVE_UNIFORMS);
            if (config2.profile) {
              desc.stats.uniformsCount = numUniforms;
            }
            var uniforms = desc.uniforms;
            for (i = 0; i < numUniforms; ++i) {
              info = gl.getActiveUniform(program, i);
              if (info) {
                if (info.size > 1) {
                  for (var j = 0; j < info.size; ++j) {
                    var name = info.name.replace("[0]", "[" + j + "]");
                    insertActiveInfo(uniforms, new ActiveInfo(name, stringStore.id(name), gl.getUniformLocation(program, name), info));
                  }
                }
                var uniName = info.name;
                if (info.size > 1) {
                  uniName = uniName.replace("[0]", "");
                }
                insertActiveInfo(uniforms, new ActiveInfo(uniName, stringStore.id(uniName), gl.getUniformLocation(program, uniName), info));
              }
            }
            var numAttributes = gl.getProgramParameter(program, GL_ACTIVE_ATTRIBUTES);
            if (config2.profile) {
              desc.stats.attributesCount = numAttributes;
            }
            var attributes = desc.attributes;
            for (i = 0; i < numAttributes; ++i) {
              info = gl.getActiveAttrib(program, i);
              if (info) {
                insertActiveInfo(attributes, new ActiveInfo(info.name, stringStore.id(info.name), gl.getAttribLocation(program, info.name), info));
              }
            }
          }
          if (config2.profile) {
            stats2.getMaxUniformsCount = function() {
              var m = 0;
              programList.forEach(function(desc) {
                if (desc.stats.uniformsCount > m) {
                  m = desc.stats.uniformsCount;
                }
              });
              return m;
            };
            stats2.getMaxAttributesCount = function() {
              var m = 0;
              programList.forEach(function(desc) {
                if (desc.stats.attributesCount > m) {
                  m = desc.stats.attributesCount;
                }
              });
              return m;
            };
          }
          function restoreShaders() {
            fragShaders = {};
            vertShaders = {};
            for (var i = 0; i < programList.length; ++i) {
              linkProgram(programList[i], null, programList[i].attributes.map(function(info) {
                return [info.location, info.name];
              }));
            }
          }
          return {
            clear: function() {
              var deleteShader = gl.deleteShader.bind(gl);
              values(fragShaders).forEach(deleteShader);
              fragShaders = {};
              values(vertShaders).forEach(deleteShader);
              vertShaders = {};
              programList.forEach(function(desc) {
                gl.deleteProgram(desc.program);
              });
              programList.length = 0;
              programCache = {};
              stats2.shaderCount = 0;
            },
            program: function(vertId, fragId, command, attribLocations) {
              check$1.command(vertId >= 0, "missing vertex shader", command);
              check$1.command(fragId >= 0, "missing fragment shader", command);
              var cache = programCache[fragId];
              if (!cache) {
                cache = programCache[fragId] = {};
              }
              var prevProgram = cache[vertId];
              if (prevProgram) {
                prevProgram.refCount++;
                if (!attribLocations) {
                  return prevProgram;
                }
              }
              var program = new REGLProgram(fragId, vertId);
              stats2.shaderCount++;
              linkProgram(program, command, attribLocations);
              if (!prevProgram) {
                cache[vertId] = program;
              }
              programList.push(program);
              return extend(program, {
                destroy: function() {
                  program.refCount--;
                  if (program.refCount <= 0) {
                    gl.deleteProgram(program.program);
                    var idx = programList.indexOf(program);
                    programList.splice(idx, 1);
                    stats2.shaderCount--;
                  }
                  if (cache[program.vertId].refCount <= 0) {
                    gl.deleteShader(vertShaders[program.vertId]);
                    delete vertShaders[program.vertId];
                    delete programCache[program.fragId][program.vertId];
                  }
                  if (!Object.keys(programCache[program.fragId]).length) {
                    gl.deleteShader(fragShaders[program.fragId]);
                    delete fragShaders[program.fragId];
                    delete programCache[program.fragId];
                  }
                }
              });
            },
            restore: restoreShaders,
            shader: getShader,
            frag: -1,
            vert: -1
          };
        }
        var GL_RGBA$3 = 6408;
        var GL_UNSIGNED_BYTE$7 = 5121;
        var GL_PACK_ALIGNMENT = 3333;
        var GL_FLOAT$7 = 5126;
        function wrapReadPixels(gl, framebufferState, reglPoll, context, glAttributes, extensions, limits) {
          function readPixelsImpl(input) {
            var type;
            if (framebufferState.next === null) {
              check$1(glAttributes.preserveDrawingBuffer, 'you must create a webgl context with "preserveDrawingBuffer":true in order to read pixels from the drawing buffer');
              type = GL_UNSIGNED_BYTE$7;
            } else {
              check$1(framebufferState.next.colorAttachments[0].texture !== null, "You cannot read from a renderbuffer");
              type = framebufferState.next.colorAttachments[0].texture._texture.type;
              check$1.optional(function() {
                if (extensions.oes_texture_float) {
                  check$1(type === GL_UNSIGNED_BYTE$7 || type === GL_FLOAT$7, "Reading from a framebuffer is only allowed for the types 'uint8' and 'float'");
                  if (type === GL_FLOAT$7) {
                    check$1(limits.readFloat, "Reading 'float' values is not permitted in your browser. For a fallback, please see: https://www.npmjs.com/package/glsl-read-float");
                  }
                } else {
                  check$1(type === GL_UNSIGNED_BYTE$7, "Reading from a framebuffer is only allowed for the type 'uint8'");
                }
              });
            }
            var x = 0;
            var y = 0;
            var width = context.framebufferWidth;
            var height = context.framebufferHeight;
            var data = null;
            if (isTypedArray(input)) {
              data = input;
            } else if (input) {
              check$1.type(input, "object", "invalid arguments to regl.read()");
              x = input.x | 0;
              y = input.y | 0;
              check$1(x >= 0 && x < context.framebufferWidth, "invalid x offset for regl.read");
              check$1(y >= 0 && y < context.framebufferHeight, "invalid y offset for regl.read");
              width = (input.width || context.framebufferWidth - x) | 0;
              height = (input.height || context.framebufferHeight - y) | 0;
              data = input.data || null;
            }
            if (data) {
              if (type === GL_UNSIGNED_BYTE$7) {
                check$1(data instanceof Uint8Array, "buffer must be 'Uint8Array' when reading from a framebuffer of type 'uint8'");
              } else if (type === GL_FLOAT$7) {
                check$1(data instanceof Float32Array, "buffer must be 'Float32Array' when reading from a framebuffer of type 'float'");
              }
            }
            check$1(width > 0 && width + x <= context.framebufferWidth, "invalid width for read pixels");
            check$1(height > 0 && height + y <= context.framebufferHeight, "invalid height for read pixels");
            reglPoll();
            var size = width * height * 4;
            if (!data) {
              if (type === GL_UNSIGNED_BYTE$7) {
                data = new Uint8Array(size);
              } else if (type === GL_FLOAT$7) {
                data = data || new Float32Array(size);
              }
            }
            check$1.isTypedArray(data, "data buffer for regl.read() must be a typedarray");
            check$1(data.byteLength >= size, "data buffer for regl.read() too small");
            gl.pixelStorei(GL_PACK_ALIGNMENT, 4);
            gl.readPixels(x, y, width, height, GL_RGBA$3, type, data);
            return data;
          }
          function readPixelsFBO(options) {
            var result;
            framebufferState.setFBO({
              framebuffer: options.framebuffer
            }, function() {
              result = readPixelsImpl(options);
            });
            return result;
          }
          function readPixels(options) {
            if (!options || !("framebuffer" in options)) {
              return readPixelsImpl(options);
            } else {
              return readPixelsFBO(options);
            }
          }
          return readPixels;
        }
        function slice(x) {
          return Array.prototype.slice.call(x);
        }
        function join(x) {
          return slice(x).join("");
        }
        function createEnvironment() {
          var varCounter = 0;
          var linkedNames = [];
          var linkedValues = [];
          function link(value) {
            for (var i = 0; i < linkedValues.length; ++i) {
              if (linkedValues[i] === value) {
                return linkedNames[i];
              }
            }
            var name = "g" + varCounter++;
            linkedNames.push(name);
            linkedValues.push(value);
            return name;
          }
          function block() {
            var code = [];
            function push() {
              code.push.apply(code, slice(arguments));
            }
            var vars = [];
            function def() {
              var name = "v" + varCounter++;
              vars.push(name);
              if (arguments.length > 0) {
                code.push(name, "=");
                code.push.apply(code, slice(arguments));
                code.push(";");
              }
              return name;
            }
            return extend(push, {
              def,
              toString: function() {
                return join([
                  vars.length > 0 ? "var " + vars.join(",") + ";" : "",
                  join(code)
                ]);
              }
            });
          }
          function scope() {
            var entry = block();
            var exit = block();
            var entryToString = entry.toString;
            var exitToString = exit.toString;
            function save(object, prop) {
              exit(object, prop, "=", entry.def(object, prop), ";");
            }
            return extend(function() {
              entry.apply(entry, slice(arguments));
            }, {
              def: entry.def,
              entry,
              exit,
              save,
              set: function(object, prop, value) {
                save(object, prop);
                entry(object, prop, "=", value, ";");
              },
              toString: function() {
                return entryToString() + exitToString();
              }
            });
          }
          function conditional() {
            var pred = join(arguments);
            var thenBlock = scope();
            var elseBlock = scope();
            var thenToString = thenBlock.toString;
            var elseToString = elseBlock.toString;
            return extend(thenBlock, {
              then: function() {
                thenBlock.apply(thenBlock, slice(arguments));
                return this;
              },
              else: function() {
                elseBlock.apply(elseBlock, slice(arguments));
                return this;
              },
              toString: function() {
                var elseClause = elseToString();
                if (elseClause) {
                  elseClause = "else{" + elseClause + "}";
                }
                return join([
                  "if(",
                  pred,
                  "){",
                  thenToString(),
                  "}",
                  elseClause
                ]);
              }
            });
          }
          var globalBlock = block();
          var procedures = {};
          function proc(name, count) {
            var args = [];
            function arg() {
              var name2 = "a" + args.length;
              args.push(name2);
              return name2;
            }
            count = count || 0;
            for (var i = 0; i < count; ++i) {
              arg();
            }
            var body = scope();
            var bodyToString = body.toString;
            var result = procedures[name] = extend(body, {
              arg,
              toString: function() {
                return join([
                  "function(",
                  args.join(),
                  "){",
                  bodyToString(),
                  "}"
                ]);
              }
            });
            return result;
          }
          function compile() {
            var code = [
              '"use strict";',
              globalBlock,
              "return {"
            ];
            Object.keys(procedures).forEach(function(name) {
              code.push('"', name, '":', procedures[name].toString(), ",");
            });
            code.push("}");
            var src = join(code).replace(/;/g, ";\n").replace(/}/g, "}\n").replace(/{/g, "{\n");
            var proc2 = Function.apply(null, linkedNames.concat(src));
            return proc2.apply(null, linkedValues);
          }
          return {
            global: globalBlock,
            link,
            block,
            proc,
            scope,
            cond: conditional,
            compile
          };
        }
        var CUTE_COMPONENTS = "xyzw".split("");
        var GL_UNSIGNED_BYTE$8 = 5121;
        var ATTRIB_STATE_POINTER = 1;
        var ATTRIB_STATE_CONSTANT = 2;
        var DYN_FUNC$1 = 0;
        var DYN_PROP$1 = 1;
        var DYN_CONTEXT$1 = 2;
        var DYN_STATE$1 = 3;
        var DYN_THUNK = 4;
        var DYN_CONSTANT$1 = 5;
        var DYN_ARRAY$1 = 6;
        var S_DITHER = "dither";
        var S_BLEND_ENABLE = "blend.enable";
        var S_BLEND_COLOR = "blend.color";
        var S_BLEND_EQUATION = "blend.equation";
        var S_BLEND_FUNC = "blend.func";
        var S_DEPTH_ENABLE = "depth.enable";
        var S_DEPTH_FUNC = "depth.func";
        var S_DEPTH_RANGE = "depth.range";
        var S_DEPTH_MASK = "depth.mask";
        var S_COLOR_MASK = "colorMask";
        var S_CULL_ENABLE = "cull.enable";
        var S_CULL_FACE = "cull.face";
        var S_FRONT_FACE = "frontFace";
        var S_LINE_WIDTH = "lineWidth";
        var S_POLYGON_OFFSET_ENABLE = "polygonOffset.enable";
        var S_POLYGON_OFFSET_OFFSET = "polygonOffset.offset";
        var S_SAMPLE_ALPHA = "sample.alpha";
        var S_SAMPLE_ENABLE = "sample.enable";
        var S_SAMPLE_COVERAGE = "sample.coverage";
        var S_STENCIL_ENABLE = "stencil.enable";
        var S_STENCIL_MASK = "stencil.mask";
        var S_STENCIL_FUNC = "stencil.func";
        var S_STENCIL_OPFRONT = "stencil.opFront";
        var S_STENCIL_OPBACK = "stencil.opBack";
        var S_SCISSOR_ENABLE = "scissor.enable";
        var S_SCISSOR_BOX = "scissor.box";
        var S_VIEWPORT = "viewport";
        var S_PROFILE = "profile";
        var S_FRAMEBUFFER = "framebuffer";
        var S_VERT = "vert";
        var S_FRAG = "frag";
        var S_ELEMENTS = "elements";
        var S_PRIMITIVE = "primitive";
        var S_COUNT = "count";
        var S_OFFSET = "offset";
        var S_INSTANCES = "instances";
        var S_VAO = "vao";
        var SUFFIX_WIDTH = "Width";
        var SUFFIX_HEIGHT = "Height";
        var S_FRAMEBUFFER_WIDTH = S_FRAMEBUFFER + SUFFIX_WIDTH;
        var S_FRAMEBUFFER_HEIGHT = S_FRAMEBUFFER + SUFFIX_HEIGHT;
        var S_VIEWPORT_WIDTH = S_VIEWPORT + SUFFIX_WIDTH;
        var S_VIEWPORT_HEIGHT = S_VIEWPORT + SUFFIX_HEIGHT;
        var S_DRAWINGBUFFER = "drawingBuffer";
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
        var GL_ELEMENT_ARRAY_BUFFER$2 = 34963;
        var GL_FRAGMENT_SHADER$1 = 35632;
        var GL_VERTEX_SHADER$1 = 35633;
        var GL_TEXTURE_2D$3 = 3553;
        var GL_TEXTURE_CUBE_MAP$2 = 34067;
        var GL_CULL_FACE = 2884;
        var GL_BLEND = 3042;
        var GL_DITHER = 3024;
        var GL_STENCIL_TEST = 2960;
        var GL_DEPTH_TEST = 2929;
        var GL_SCISSOR_TEST = 3089;
        var GL_POLYGON_OFFSET_FILL = 32823;
        var GL_SAMPLE_ALPHA_TO_COVERAGE = 32926;
        var GL_SAMPLE_COVERAGE = 32928;
        var GL_FLOAT$8 = 5126;
        var GL_FLOAT_VEC2 = 35664;
        var GL_FLOAT_VEC3 = 35665;
        var GL_FLOAT_VEC4 = 35666;
        var GL_INT$3 = 5124;
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
        var GL_CW = 2304;
        var GL_CCW = 2305;
        var GL_MIN_EXT = 32775;
        var GL_MAX_EXT = 32776;
        var GL_ALWAYS = 519;
        var GL_KEEP = 7680;
        var GL_ZERO = 0;
        var GL_ONE = 1;
        var GL_FUNC_ADD = 32774;
        var GL_LESS = 513;
        var GL_FRAMEBUFFER$2 = 36160;
        var GL_COLOR_ATTACHMENT0$2 = 36064;
        var blendFuncs = {
          "0": 0,
          "1": 1,
          "zero": 0,
          "one": 1,
          "src color": 768,
          "one minus src color": 769,
          "src alpha": 770,
          "one minus src alpha": 771,
          "dst color": 774,
          "one minus dst color": 775,
          "dst alpha": 772,
          "one minus dst alpha": 773,
          "constant color": 32769,
          "one minus constant color": 32770,
          "constant alpha": 32771,
          "one minus constant alpha": 32772,
          "src alpha saturate": 776
        };
        var invalidBlendCombinations = [
          "constant color, constant alpha",
          "one minus constant color, constant alpha",
          "constant color, one minus constant alpha",
          "one minus constant color, one minus constant alpha",
          "constant alpha, constant color",
          "constant alpha, one minus constant color",
          "one minus constant alpha, constant color",
          "one minus constant alpha, one minus constant color"
        ];
        var compareFuncs = {
          "never": 512,
          "less": 513,
          "<": 513,
          "equal": 514,
          "=": 514,
          "==": 514,
          "===": 514,
          "lequal": 515,
          "<=": 515,
          "greater": 516,
          ">": 516,
          "notequal": 517,
          "!=": 517,
          "!==": 517,
          "gequal": 518,
          ">=": 518,
          "always": 519
        };
        var stencilOps = {
          "0": 0,
          "zero": 0,
          "keep": 7680,
          "replace": 7681,
          "increment": 7682,
          "decrement": 7683,
          "increment wrap": 34055,
          "decrement wrap": 34056,
          "invert": 5386
        };
        var shaderType = {
          "frag": GL_FRAGMENT_SHADER$1,
          "vert": GL_VERTEX_SHADER$1
        };
        var orientationType = {
          "cw": GL_CW,
          "ccw": GL_CCW
        };
        function isBufferArgs(x) {
          return Array.isArray(x) || isTypedArray(x) || isNDArrayLike(x);
        }
        function sortState(state) {
          return state.sort(function(a, b) {
            if (a === S_VIEWPORT) {
              return -1;
            } else if (b === S_VIEWPORT) {
              return 1;
            }
            return a < b ? -1 : 1;
          });
        }
        function Declaration(thisDep, contextDep, propDep, append) {
          this.thisDep = thisDep;
          this.contextDep = contextDep;
          this.propDep = propDep;
          this.append = append;
        }
        function isStatic(decl) {
          return decl && !(decl.thisDep || decl.contextDep || decl.propDep);
        }
        function createStaticDecl(append) {
          return new Declaration(false, false, false, append);
        }
        function createDynamicDecl(dyn, append) {
          var type = dyn.type;
          if (type === DYN_FUNC$1) {
            var numArgs = dyn.data.length;
            return new Declaration(true, numArgs >= 1, numArgs >= 2, append);
          } else if (type === DYN_THUNK) {
            var data = dyn.data;
            return new Declaration(data.thisDep, data.contextDep, data.propDep, append);
          } else if (type === DYN_CONSTANT$1) {
            return new Declaration(false, false, false, append);
          } else if (type === DYN_ARRAY$1) {
            var thisDep = false;
            var contextDep = false;
            var propDep = false;
            for (var i = 0; i < dyn.data.length; ++i) {
              var subDyn = dyn.data[i];
              if (subDyn.type === DYN_PROP$1) {
                propDep = true;
              } else if (subDyn.type === DYN_CONTEXT$1) {
                contextDep = true;
              } else if (subDyn.type === DYN_STATE$1) {
                thisDep = true;
              } else if (subDyn.type === DYN_FUNC$1) {
                thisDep = true;
                var subArgs = subDyn.data;
                if (subArgs >= 1) {
                  contextDep = true;
                }
                if (subArgs >= 2) {
                  propDep = true;
                }
              } else if (subDyn.type === DYN_THUNK) {
                thisDep = thisDep || subDyn.data.thisDep;
                contextDep = contextDep || subDyn.data.contextDep;
                propDep = propDep || subDyn.data.propDep;
              }
            }
            return new Declaration(thisDep, contextDep, propDep, append);
          } else {
            return new Declaration(type === DYN_STATE$1, type === DYN_CONTEXT$1, type === DYN_PROP$1, append);
          }
        }
        var SCOPE_DECL = new Declaration(false, false, false, function() {
        });
        function reglCore(gl, stringStore, extensions, limits, bufferState, elementState, textureState, framebufferState, uniformState, attributeState, shaderState, drawState, contextState, timer, config2) {
          var AttributeRecord2 = attributeState.Record;
          var blendEquations = {
            "add": 32774,
            "subtract": 32778,
            "reverse subtract": 32779
          };
          if (extensions.ext_blend_minmax) {
            blendEquations.min = GL_MIN_EXT;
            blendEquations.max = GL_MAX_EXT;
          }
          var extInstancing = extensions.angle_instanced_arrays;
          var extDrawBuffers = extensions.webgl_draw_buffers;
          var extVertexArrays = extensions.oes_vertex_array_object;
          var currentState = {
            dirty: true,
            profile: config2.profile
          };
          var nextState = {};
          var GL_STATE_NAMES = [];
          var GL_FLAGS = {};
          var GL_VARIABLES = {};
          function propName(name) {
            return name.replace(".", "_");
          }
          function stateFlag(sname, cap, init) {
            var name = propName(sname);
            GL_STATE_NAMES.push(sname);
            nextState[name] = currentState[name] = !!init;
            GL_FLAGS[name] = cap;
          }
          function stateVariable(sname, func, init) {
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
          stateVariable(S_BLEND_COLOR, "blendColor", [0, 0, 0, 0]);
          stateVariable(S_BLEND_EQUATION, "blendEquationSeparate", [GL_FUNC_ADD, GL_FUNC_ADD]);
          stateVariable(S_BLEND_FUNC, "blendFuncSeparate", [GL_ONE, GL_ZERO, GL_ONE, GL_ZERO]);
          stateFlag(S_DEPTH_ENABLE, GL_DEPTH_TEST, true);
          stateVariable(S_DEPTH_FUNC, "depthFunc", GL_LESS);
          stateVariable(S_DEPTH_RANGE, "depthRange", [0, 1]);
          stateVariable(S_DEPTH_MASK, "depthMask", true);
          stateVariable(S_COLOR_MASK, S_COLOR_MASK, [true, true, true, true]);
          stateFlag(S_CULL_ENABLE, GL_CULL_FACE);
          stateVariable(S_CULL_FACE, "cullFace", GL_BACK);
          stateVariable(S_FRONT_FACE, S_FRONT_FACE, GL_CCW);
          stateVariable(S_LINE_WIDTH, S_LINE_WIDTH, 1);
          stateFlag(S_POLYGON_OFFSET_ENABLE, GL_POLYGON_OFFSET_FILL);
          stateVariable(S_POLYGON_OFFSET_OFFSET, "polygonOffset", [0, 0]);
          stateFlag(S_SAMPLE_ALPHA, GL_SAMPLE_ALPHA_TO_COVERAGE);
          stateFlag(S_SAMPLE_ENABLE, GL_SAMPLE_COVERAGE);
          stateVariable(S_SAMPLE_COVERAGE, "sampleCoverage", [1, false]);
          stateFlag(S_STENCIL_ENABLE, GL_STENCIL_TEST);
          stateVariable(S_STENCIL_MASK, "stencilMask", -1);
          stateVariable(S_STENCIL_FUNC, "stencilFunc", [GL_ALWAYS, 0, -1]);
          stateVariable(S_STENCIL_OPFRONT, "stencilOpSeparate", [GL_FRONT, GL_KEEP, GL_KEEP, GL_KEEP]);
          stateVariable(S_STENCIL_OPBACK, "stencilOpSeparate", [GL_BACK, GL_KEEP, GL_KEEP, GL_KEEP]);
          stateFlag(S_SCISSOR_ENABLE, GL_SCISSOR_TEST);
          stateVariable(S_SCISSOR_BOX, "scissor", [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]);
          stateVariable(S_VIEWPORT, S_VIEWPORT, [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]);
          var sharedState = {
            gl,
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
            extensions,
            timer,
            isBufferArgs
          };
          var sharedConstants = {
            primTypes,
            compareFuncs,
            blendFuncs,
            blendEquations,
            stencilOps,
            glTypes,
            orientationType
          };
          check$1.optional(function() {
            sharedState.isArrayLike = isArrayLike;
          });
          if (extDrawBuffers) {
            sharedConstants.backBuffer = [GL_BACK];
            sharedConstants.drawBuffer = loop(limits.maxDrawbuffers, function(i) {
              if (i === 0) {
                return [0];
              }
              return loop(i, function(j) {
                return GL_COLOR_ATTACHMENT0$2 + j;
              });
            });
          }
          var drawCallCounter = 0;
          function createREGLEnvironment() {
            var env = createEnvironment();
            var link = env.link;
            var global = env.global;
            env.id = drawCallCounter++;
            env.batchId = "0";
            var SHARED = link(sharedState);
            var shared = env.shared = {
              props: "a0"
            };
            Object.keys(sharedState).forEach(function(prop) {
              shared[prop] = global.def(SHARED, ".", prop);
            });
            check$1.optional(function() {
              env.CHECK = link(check$1);
              env.commandStr = check$1.guessCommand();
              env.command = link(env.commandStr);
              env.assert = function(block, pred, message) {
                block("if(!(", pred, "))", this.CHECK, ".commandRaise(", link(message), ",", this.command, ");");
              };
              sharedConstants.invalidBlendCombinations = invalidBlendCombinations;
            });
            var nextVars = env.next = {};
            var currentVars = env.current = {};
            Object.keys(GL_VARIABLES).forEach(function(variable) {
              if (Array.isArray(currentState[variable])) {
                nextVars[variable] = global.def(shared.next, ".", variable);
                currentVars[variable] = global.def(shared.current, ".", variable);
              }
            });
            var constants = env.constants = {};
            Object.keys(sharedConstants).forEach(function(name) {
              constants[name] = global.def(JSON.stringify(sharedConstants[name]));
            });
            env.invoke = function(block, x) {
              switch (x.type) {
                case DYN_FUNC$1:
                  var argList = [
                    "this",
                    shared.context,
                    shared.props,
                    env.batchId
                  ];
                  return block.def(link(x.data), ".call(", argList.slice(0, Math.max(x.data.length + 1, 4)), ")");
                case DYN_PROP$1:
                  return block.def(shared.props, x.data);
                case DYN_CONTEXT$1:
                  return block.def(shared.context, x.data);
                case DYN_STATE$1:
                  return block.def("this", x.data);
                case DYN_THUNK:
                  x.data.append(env, block);
                  return x.data.ref;
                case DYN_CONSTANT$1:
                  return x.data.toString();
                case DYN_ARRAY$1:
                  return x.data.map(function(y) {
                    return env.invoke(block, y);
                  });
              }
            };
            env.attribCache = {};
            var scopeAttribs = {};
            env.scopeAttrib = function(name) {
              var id = stringStore.id(name);
              if (id in scopeAttribs) {
                return scopeAttribs[id];
              }
              var binding = attributeState.scope[id];
              if (!binding) {
                binding = attributeState.scope[id] = new AttributeRecord2();
              }
              var result = scopeAttribs[id] = link(binding);
              return result;
            };
            return env;
          }
          function parseProfile(options) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            var profileEnable;
            if (S_PROFILE in staticOptions) {
              var value = !!staticOptions[S_PROFILE];
              profileEnable = createStaticDecl(function(env, scope) {
                return value;
              });
              profileEnable.enable = value;
            } else if (S_PROFILE in dynamicOptions) {
              var dyn = dynamicOptions[S_PROFILE];
              profileEnable = createDynamicDecl(dyn, function(env, scope) {
                return env.invoke(scope, dyn);
              });
            }
            return profileEnable;
          }
          function parseFramebuffer(options, env) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            if (S_FRAMEBUFFER in staticOptions) {
              var framebuffer = staticOptions[S_FRAMEBUFFER];
              if (framebuffer) {
                framebuffer = framebufferState.getFramebuffer(framebuffer);
                check$1.command(framebuffer, "invalid framebuffer object");
                return createStaticDecl(function(env2, block) {
                  var FRAMEBUFFER = env2.link(framebuffer);
                  var shared = env2.shared;
                  block.set(shared.framebuffer, ".next", FRAMEBUFFER);
                  var CONTEXT = shared.context;
                  block.set(CONTEXT, "." + S_FRAMEBUFFER_WIDTH, FRAMEBUFFER + ".width");
                  block.set(CONTEXT, "." + S_FRAMEBUFFER_HEIGHT, FRAMEBUFFER + ".height");
                  return FRAMEBUFFER;
                });
              } else {
                return createStaticDecl(function(env2, scope) {
                  var shared = env2.shared;
                  scope.set(shared.framebuffer, ".next", "null");
                  var CONTEXT = shared.context;
                  scope.set(CONTEXT, "." + S_FRAMEBUFFER_WIDTH, CONTEXT + "." + S_DRAWINGBUFFER_WIDTH);
                  scope.set(CONTEXT, "." + S_FRAMEBUFFER_HEIGHT, CONTEXT + "." + S_DRAWINGBUFFER_HEIGHT);
                  return "null";
                });
              }
            } else if (S_FRAMEBUFFER in dynamicOptions) {
              var dyn = dynamicOptions[S_FRAMEBUFFER];
              return createDynamicDecl(dyn, function(env2, scope) {
                var FRAMEBUFFER_FUNC = env2.invoke(scope, dyn);
                var shared = env2.shared;
                var FRAMEBUFFER_STATE = shared.framebuffer;
                var FRAMEBUFFER = scope.def(FRAMEBUFFER_STATE, ".getFramebuffer(", FRAMEBUFFER_FUNC, ")");
                check$1.optional(function() {
                  env2.assert(scope, "!" + FRAMEBUFFER_FUNC + "||" + FRAMEBUFFER, "invalid framebuffer object");
                });
                scope.set(FRAMEBUFFER_STATE, ".next", FRAMEBUFFER);
                var CONTEXT = shared.context;
                scope.set(CONTEXT, "." + S_FRAMEBUFFER_WIDTH, FRAMEBUFFER + "?" + FRAMEBUFFER + ".width:" + CONTEXT + "." + S_DRAWINGBUFFER_WIDTH);
                scope.set(CONTEXT, "." + S_FRAMEBUFFER_HEIGHT, FRAMEBUFFER + "?" + FRAMEBUFFER + ".height:" + CONTEXT + "." + S_DRAWINGBUFFER_HEIGHT);
                return FRAMEBUFFER;
              });
            } else {
              return null;
            }
          }
          function parseViewportScissor(options, framebuffer, env) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            function parseBox(param) {
              if (param in staticOptions) {
                var box = staticOptions[param];
                check$1.commandType(box, "object", "invalid " + param, env.commandStr);
                var isStatic2 = true;
                var x = box.x | 0;
                var y = box.y | 0;
                var w, h;
                if ("width" in box) {
                  w = box.width | 0;
                  check$1.command(w >= 0, "invalid " + param, env.commandStr);
                } else {
                  isStatic2 = false;
                }
                if ("height" in box) {
                  h = box.height | 0;
                  check$1.command(h >= 0, "invalid " + param, env.commandStr);
                } else {
                  isStatic2 = false;
                }
                return new Declaration(!isStatic2 && framebuffer && framebuffer.thisDep, !isStatic2 && framebuffer && framebuffer.contextDep, !isStatic2 && framebuffer && framebuffer.propDep, function(env2, scope) {
                  var CONTEXT = env2.shared.context;
                  var BOX_W = w;
                  if (!("width" in box)) {
                    BOX_W = scope.def(CONTEXT, ".", S_FRAMEBUFFER_WIDTH, "-", x);
                  }
                  var BOX_H = h;
                  if (!("height" in box)) {
                    BOX_H = scope.def(CONTEXT, ".", S_FRAMEBUFFER_HEIGHT, "-", y);
                  }
                  return [x, y, BOX_W, BOX_H];
                });
              } else if (param in dynamicOptions) {
                var dynBox = dynamicOptions[param];
                var result = createDynamicDecl(dynBox, function(env2, scope) {
                  var BOX = env2.invoke(scope, dynBox);
                  check$1.optional(function() {
                    env2.assert(scope, BOX + "&&typeof " + BOX + '==="object"', "invalid " + param);
                  });
                  var CONTEXT = env2.shared.context;
                  var BOX_X = scope.def(BOX, ".x|0");
                  var BOX_Y = scope.def(BOX, ".y|0");
                  var BOX_W = scope.def('"width" in ', BOX, "?", BOX, ".width|0:", "(", CONTEXT, ".", S_FRAMEBUFFER_WIDTH, "-", BOX_X, ")");
                  var BOX_H = scope.def('"height" in ', BOX, "?", BOX, ".height|0:", "(", CONTEXT, ".", S_FRAMEBUFFER_HEIGHT, "-", BOX_Y, ")");
                  check$1.optional(function() {
                    env2.assert(scope, BOX_W + ">=0&&" + BOX_H + ">=0", "invalid " + param);
                  });
                  return [BOX_X, BOX_Y, BOX_W, BOX_H];
                });
                if (framebuffer) {
                  result.thisDep = result.thisDep || framebuffer.thisDep;
                  result.contextDep = result.contextDep || framebuffer.contextDep;
                  result.propDep = result.propDep || framebuffer.propDep;
                }
                return result;
              } else if (framebuffer) {
                return new Declaration(framebuffer.thisDep, framebuffer.contextDep, framebuffer.propDep, function(env2, scope) {
                  var CONTEXT = env2.shared.context;
                  return [
                    0,
                    0,
                    scope.def(CONTEXT, ".", S_FRAMEBUFFER_WIDTH),
                    scope.def(CONTEXT, ".", S_FRAMEBUFFER_HEIGHT)
                  ];
                });
              } else {
                return null;
              }
            }
            var viewport = parseBox(S_VIEWPORT);
            if (viewport) {
              var prevViewport = viewport;
              viewport = new Declaration(viewport.thisDep, viewport.contextDep, viewport.propDep, function(env2, scope) {
                var VIEWPORT = prevViewport.append(env2, scope);
                var CONTEXT = env2.shared.context;
                scope.set(CONTEXT, "." + S_VIEWPORT_WIDTH, VIEWPORT[2]);
                scope.set(CONTEXT, "." + S_VIEWPORT_HEIGHT, VIEWPORT[3]);
                return VIEWPORT;
              });
            }
            return {
              viewport,
              scissor_box: parseBox(S_SCISSOR_BOX)
            };
          }
          function parseAttribLocations(options, attributes) {
            var staticOptions = options.static;
            var staticProgram = typeof staticOptions[S_FRAG] === "string" && typeof staticOptions[S_VERT] === "string";
            if (staticProgram) {
              if (Object.keys(attributes.dynamic).length > 0) {
                return null;
              }
              var staticAttributes = attributes.static;
              var sAttributes = Object.keys(staticAttributes);
              if (sAttributes.length > 0 && typeof staticAttributes[sAttributes[0]] === "number") {
                var bindings = [];
                for (var i = 0; i < sAttributes.length; ++i) {
                  check$1(typeof staticAttributes[sAttributes[i]] === "number", "must specify all vertex attribute locations when using vaos");
                  bindings.push([staticAttributes[sAttributes[i]] | 0, sAttributes[i]]);
                }
                return bindings;
              }
            }
            return null;
          }
          function parseProgram(options, env, attribLocations) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            function parseShader(name) {
              if (name in staticOptions) {
                var id = stringStore.id(staticOptions[name]);
                check$1.optional(function() {
                  shaderState.shader(shaderType[name], id, check$1.guessCommand());
                });
                var result = createStaticDecl(function() {
                  return id;
                });
                result.id = id;
                return result;
              } else if (name in dynamicOptions) {
                var dyn = dynamicOptions[name];
                return createDynamicDecl(dyn, function(env2, scope) {
                  var str = env2.invoke(scope, dyn);
                  var id2 = scope.def(env2.shared.strings, ".id(", str, ")");
                  check$1.optional(function() {
                    scope(env2.shared.shader, ".shader(", shaderType[name], ",", id2, ",", env2.command, ");");
                  });
                  return id2;
                });
              }
              return null;
            }
            var frag = parseShader(S_FRAG);
            var vert = parseShader(S_VERT);
            var program = null;
            var progVar;
            if (isStatic(frag) && isStatic(vert)) {
              program = shaderState.program(vert.id, frag.id, null, attribLocations);
              progVar = createStaticDecl(function(env2, scope) {
                return env2.link(program);
              });
            } else {
              progVar = new Declaration(frag && frag.thisDep || vert && vert.thisDep, frag && frag.contextDep || vert && vert.contextDep, frag && frag.propDep || vert && vert.propDep, function(env2, scope) {
                var SHADER_STATE = env2.shared.shader;
                var fragId;
                if (frag) {
                  fragId = frag.append(env2, scope);
                } else {
                  fragId = scope.def(SHADER_STATE, ".", S_FRAG);
                }
                var vertId;
                if (vert) {
                  vertId = vert.append(env2, scope);
                } else {
                  vertId = scope.def(SHADER_STATE, ".", S_VERT);
                }
                var progDef = SHADER_STATE + ".program(" + vertId + "," + fragId;
                check$1.optional(function() {
                  progDef += "," + env2.command;
                });
                return scope.def(progDef + ")");
              });
            }
            return {
              frag,
              vert,
              progVar,
              program
            };
          }
          function parseDraw(options, env) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            var staticDraw = {};
            var vaoActive = false;
            function parseVAO() {
              if (S_VAO in staticOptions) {
                var vao2 = staticOptions[S_VAO];
                if (vao2 !== null && attributeState.getVAO(vao2) === null) {
                  vao2 = attributeState.createVAO(vao2);
                }
                vaoActive = true;
                staticDraw.vao = vao2;
                return createStaticDecl(function(env2) {
                  var vaoRef = attributeState.getVAO(vao2);
                  if (vaoRef) {
                    return env2.link(vaoRef);
                  } else {
                    return "null";
                  }
                });
              } else if (S_VAO in dynamicOptions) {
                vaoActive = true;
                var dyn = dynamicOptions[S_VAO];
                return createDynamicDecl(dyn, function(env2, scope) {
                  var vaoRef = env2.invoke(scope, dyn);
                  return scope.def(env2.shared.vao + ".getVAO(" + vaoRef + ")");
                });
              }
              return null;
            }
            var vao = parseVAO();
            var elementsActive = false;
            function parseElements() {
              if (S_ELEMENTS in staticOptions) {
                var elements2 = staticOptions[S_ELEMENTS];
                staticDraw.elements = elements2;
                if (isBufferArgs(elements2)) {
                  var e = staticDraw.elements = elementState.create(elements2, true);
                  elements2 = elementState.getElements(e);
                  elementsActive = true;
                } else if (elements2) {
                  elements2 = elementState.getElements(elements2);
                  elementsActive = true;
                  check$1.command(elements2, "invalid elements", env.commandStr);
                }
                var result = createStaticDecl(function(env2, scope) {
                  if (elements2) {
                    var result2 = env2.link(elements2);
                    env2.ELEMENTS = result2;
                    return result2;
                  }
                  env2.ELEMENTS = null;
                  return null;
                });
                result.value = elements2;
                return result;
              } else if (S_ELEMENTS in dynamicOptions) {
                elementsActive = true;
                var dyn = dynamicOptions[S_ELEMENTS];
                return createDynamicDecl(dyn, function(env2, scope) {
                  var shared = env2.shared;
                  var IS_BUFFER_ARGS = shared.isBufferArgs;
                  var ELEMENT_STATE = shared.elements;
                  var elementDefn = env2.invoke(scope, dyn);
                  var elements3 = scope.def("null");
                  var elementStream = scope.def(IS_BUFFER_ARGS, "(", elementDefn, ")");
                  var ifte = env2.cond(elementStream).then(elements3, "=", ELEMENT_STATE, ".createStream(", elementDefn, ");").else(elements3, "=", ELEMENT_STATE, ".getElements(", elementDefn, ");");
                  check$1.optional(function() {
                    env2.assert(ifte.else, "!" + elementDefn + "||" + elements3, "invalid elements");
                  });
                  scope.entry(ifte);
                  scope.exit(env2.cond(elementStream).then(ELEMENT_STATE, ".destroyStream(", elements3, ");"));
                  env2.ELEMENTS = elements3;
                  return elements3;
                });
              } else if (vaoActive) {
                return new Declaration(vao.thisDep, vao.contextDep, vao.propDep, function(env2, scope) {
                  return scope.def(env2.shared.vao + ".currentVAO?" + env2.shared.elements + ".getElements(" + env2.shared.vao + ".currentVAO.elements):null");
                });
              }
              return null;
            }
            var elements = parseElements();
            function parsePrimitive() {
              if (S_PRIMITIVE in staticOptions) {
                var primitive2 = staticOptions[S_PRIMITIVE];
                staticDraw.primitive = primitive2;
                check$1.commandParameter(primitive2, primTypes, "invalid primitve", env.commandStr);
                return createStaticDecl(function(env2, scope) {
                  return primTypes[primitive2];
                });
              } else if (S_PRIMITIVE in dynamicOptions) {
                var dynPrimitive = dynamicOptions[S_PRIMITIVE];
                return createDynamicDecl(dynPrimitive, function(env2, scope) {
                  var PRIM_TYPES = env2.constants.primTypes;
                  var prim = env2.invoke(scope, dynPrimitive);
                  check$1.optional(function() {
                    env2.assert(scope, prim + " in " + PRIM_TYPES, "invalid primitive, must be one of " + Object.keys(primTypes));
                  });
                  return scope.def(PRIM_TYPES, "[", prim, "]");
                });
              } else if (elementsActive) {
                if (isStatic(elements)) {
                  if (elements.value) {
                    return createStaticDecl(function(env2, scope) {
                      return scope.def(env2.ELEMENTS, ".primType");
                    });
                  } else {
                    return createStaticDecl(function() {
                      return GL_TRIANGLES$1;
                    });
                  }
                } else {
                  return new Declaration(elements.thisDep, elements.contextDep, elements.propDep, function(env2, scope) {
                    var elements2 = env2.ELEMENTS;
                    return scope.def(elements2, "?", elements2, ".primType:", GL_TRIANGLES$1);
                  });
                }
              } else if (vaoActive) {
                return new Declaration(vao.thisDep, vao.contextDep, vao.propDep, function(env2, scope) {
                  return scope.def(env2.shared.vao + ".currentVAO?" + env2.shared.vao + ".currentVAO.primitive:" + GL_TRIANGLES$1);
                });
              }
              return null;
            }
            function parseParam(param, isOffset) {
              if (param in staticOptions) {
                var value = staticOptions[param] | 0;
                if (isOffset) {
                  staticDraw.offset = value;
                } else {
                  staticDraw.instances = value;
                }
                check$1.command(!isOffset || value >= 0, "invalid " + param, env.commandStr);
                return createStaticDecl(function(env2, scope) {
                  if (isOffset) {
                    env2.OFFSET = value;
                  }
                  return value;
                });
              } else if (param in dynamicOptions) {
                var dynValue = dynamicOptions[param];
                return createDynamicDecl(dynValue, function(env2, scope) {
                  var result = env2.invoke(scope, dynValue);
                  if (isOffset) {
                    env2.OFFSET = result;
                    check$1.optional(function() {
                      env2.assert(scope, result + ">=0", "invalid " + param);
                    });
                  }
                  return result;
                });
              } else if (isOffset) {
                if (elementsActive) {
                  return createStaticDecl(function(env2, scope) {
                    env2.OFFSET = 0;
                    return 0;
                  });
                } else if (vaoActive) {
                  return new Declaration(vao.thisDep, vao.contextDep, vao.propDep, function(env2, scope) {
                    return scope.def(env2.shared.vao + ".currentVAO?" + env2.shared.vao + ".currentVAO.offset:0");
                  });
                }
              } else if (vaoActive) {
                return new Declaration(vao.thisDep, vao.contextDep, vao.propDep, function(env2, scope) {
                  return scope.def(env2.shared.vao + ".currentVAO?" + env2.shared.vao + ".currentVAO.instances:-1");
                });
              }
              return null;
            }
            var OFFSET = parseParam(S_OFFSET, true);
            function parseVertCount() {
              if (S_COUNT in staticOptions) {
                var count2 = staticOptions[S_COUNT] | 0;
                staticDraw.count = count2;
                check$1.command(typeof count2 === "number" && count2 >= 0, "invalid vertex count", env.commandStr);
                return createStaticDecl(function() {
                  return count2;
                });
              } else if (S_COUNT in dynamicOptions) {
                var dynCount = dynamicOptions[S_COUNT];
                return createDynamicDecl(dynCount, function(env2, scope) {
                  var result2 = env2.invoke(scope, dynCount);
                  check$1.optional(function() {
                    env2.assert(scope, "typeof " + result2 + '==="number"&&' + result2 + ">=0&&" + result2 + "===(" + result2 + "|0)", "invalid vertex count");
                  });
                  return result2;
                });
              } else if (elementsActive) {
                if (isStatic(elements)) {
                  if (elements) {
                    if (OFFSET) {
                      return new Declaration(OFFSET.thisDep, OFFSET.contextDep, OFFSET.propDep, function(env2, scope) {
                        var result2 = scope.def(env2.ELEMENTS, ".vertCount-", env2.OFFSET);
                        check$1.optional(function() {
                          env2.assert(scope, result2 + ">=0", "invalid vertex offset/element buffer too small");
                        });
                        return result2;
                      });
                    } else {
                      return createStaticDecl(function(env2, scope) {
                        return scope.def(env2.ELEMENTS, ".vertCount");
                      });
                    }
                  } else {
                    var result = createStaticDecl(function() {
                      return -1;
                    });
                    check$1.optional(function() {
                      result.MISSING = true;
                    });
                    return result;
                  }
                } else {
                  var variable = new Declaration(elements.thisDep || OFFSET.thisDep, elements.contextDep || OFFSET.contextDep, elements.propDep || OFFSET.propDep, function(env2, scope) {
                    var elements2 = env2.ELEMENTS;
                    if (env2.OFFSET) {
                      return scope.def(elements2, "?", elements2, ".vertCount-", env2.OFFSET, ":-1");
                    }
                    return scope.def(elements2, "?", elements2, ".vertCount:-1");
                  });
                  check$1.optional(function() {
                    variable.DYNAMIC = true;
                  });
                  return variable;
                }
              } else if (vaoActive) {
                var countVariable = new Declaration(vao.thisDep, vao.contextDep, vao.propDep, function(env2, scope) {
                  return scope.def(env2.shared.vao, ".currentVAO?", env2.shared.vao, ".currentVAO.count:-1");
                });
                return countVariable;
              }
              return null;
            }
            var primitive = parsePrimitive();
            var count = parseVertCount();
            var instances = parseParam(S_INSTANCES, false);
            return {
              elements,
              primitive,
              count,
              instances,
              offset: OFFSET,
              vao,
              vaoActive,
              elementsActive,
              static: staticDraw
            };
          }
          function parseGLState(options, env) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            var STATE = {};
            GL_STATE_NAMES.forEach(function(prop) {
              var param = propName(prop);
              function parseParam(parseStatic, parseDynamic) {
                if (prop in staticOptions) {
                  var value = parseStatic(staticOptions[prop]);
                  STATE[param] = createStaticDecl(function() {
                    return value;
                  });
                } else if (prop in dynamicOptions) {
                  var dyn = dynamicOptions[prop];
                  STATE[param] = createDynamicDecl(dyn, function(env2, scope) {
                    return parseDynamic(env2, scope, env2.invoke(scope, dyn));
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
                  return parseParam(function(value) {
                    check$1.commandType(value, "boolean", prop, env.commandStr);
                    return value;
                  }, function(env2, scope, value) {
                    check$1.optional(function() {
                      env2.assert(scope, "typeof " + value + '==="boolean"', "invalid flag " + prop, env2.commandStr);
                    });
                    return value;
                  });
                case S_DEPTH_FUNC:
                  return parseParam(function(value) {
                    check$1.commandParameter(value, compareFuncs, "invalid " + prop, env.commandStr);
                    return compareFuncs[value];
                  }, function(env2, scope, value) {
                    var COMPARE_FUNCS = env2.constants.compareFuncs;
                    check$1.optional(function() {
                      env2.assert(scope, value + " in " + COMPARE_FUNCS, "invalid " + prop + ", must be one of " + Object.keys(compareFuncs));
                    });
                    return scope.def(COMPARE_FUNCS, "[", value, "]");
                  });
                case S_DEPTH_RANGE:
                  return parseParam(function(value) {
                    check$1.command(isArrayLike(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number" && value[0] <= value[1], "depth range is 2d array", env.commandStr);
                    return value;
                  }, function(env2, scope, value) {
                    check$1.optional(function() {
                      env2.assert(scope, env2.shared.isArrayLike + "(" + value + ")&&" + value + ".length===2&&typeof " + value + '[0]==="number"&&typeof ' + value + '[1]==="number"&&' + value + "[0]<=" + value + "[1]", "depth range must be a 2d array");
                    });
                    var Z_NEAR = scope.def("+", value, "[0]");
                    var Z_FAR = scope.def("+", value, "[1]");
                    return [Z_NEAR, Z_FAR];
                  });
                case S_BLEND_FUNC:
                  return parseParam(function(value) {
                    check$1.commandType(value, "object", "blend.func", env.commandStr);
                    var srcRGB = "srcRGB" in value ? value.srcRGB : value.src;
                    var srcAlpha = "srcAlpha" in value ? value.srcAlpha : value.src;
                    var dstRGB = "dstRGB" in value ? value.dstRGB : value.dst;
                    var dstAlpha = "dstAlpha" in value ? value.dstAlpha : value.dst;
                    check$1.commandParameter(srcRGB, blendFuncs, param + ".srcRGB", env.commandStr);
                    check$1.commandParameter(srcAlpha, blendFuncs, param + ".srcAlpha", env.commandStr);
                    check$1.commandParameter(dstRGB, blendFuncs, param + ".dstRGB", env.commandStr);
                    check$1.commandParameter(dstAlpha, blendFuncs, param + ".dstAlpha", env.commandStr);
                    check$1.command(invalidBlendCombinations.indexOf(srcRGB + ", " + dstRGB) === -1, "unallowed blending combination (srcRGB, dstRGB) = (" + srcRGB + ", " + dstRGB + ")", env.commandStr);
                    return [
                      blendFuncs[srcRGB],
                      blendFuncs[dstRGB],
                      blendFuncs[srcAlpha],
                      blendFuncs[dstAlpha]
                    ];
                  }, function(env2, scope, value) {
                    var BLEND_FUNCS = env2.constants.blendFuncs;
                    check$1.optional(function() {
                      env2.assert(scope, value + "&&typeof " + value + '==="object"', "invalid blend func, must be an object");
                    });
                    function read(prefix, suffix) {
                      var func = scope.def('"', prefix, suffix, '" in ', value, "?", value, ".", prefix, suffix, ":", value, ".", prefix);
                      check$1.optional(function() {
                        env2.assert(scope, func + " in " + BLEND_FUNCS, "invalid " + prop + "." + prefix + suffix + ", must be one of " + Object.keys(blendFuncs));
                      });
                      return func;
                    }
                    var srcRGB = read("src", "RGB");
                    var dstRGB = read("dst", "RGB");
                    check$1.optional(function() {
                      var INVALID_BLEND_COMBINATIONS = env2.constants.invalidBlendCombinations;
                      env2.assert(scope, INVALID_BLEND_COMBINATIONS + ".indexOf(" + srcRGB + '+", "+' + dstRGB + ") === -1 ", "unallowed blending combination for (srcRGB, dstRGB)");
                    });
                    var SRC_RGB = scope.def(BLEND_FUNCS, "[", srcRGB, "]");
                    var SRC_ALPHA = scope.def(BLEND_FUNCS, "[", read("src", "Alpha"), "]");
                    var DST_RGB = scope.def(BLEND_FUNCS, "[", dstRGB, "]");
                    var DST_ALPHA = scope.def(BLEND_FUNCS, "[", read("dst", "Alpha"), "]");
                    return [SRC_RGB, DST_RGB, SRC_ALPHA, DST_ALPHA];
                  });
                case S_BLEND_EQUATION:
                  return parseParam(function(value) {
                    if (typeof value === "string") {
                      check$1.commandParameter(value, blendEquations, "invalid " + prop, env.commandStr);
                      return [
                        blendEquations[value],
                        blendEquations[value]
                      ];
                    } else if (typeof value === "object") {
                      check$1.commandParameter(value.rgb, blendEquations, prop + ".rgb", env.commandStr);
                      check$1.commandParameter(value.alpha, blendEquations, prop + ".alpha", env.commandStr);
                      return [
                        blendEquations[value.rgb],
                        blendEquations[value.alpha]
                      ];
                    } else {
                      check$1.commandRaise("invalid blend.equation", env.commandStr);
                    }
                  }, function(env2, scope, value) {
                    var BLEND_EQUATIONS = env2.constants.blendEquations;
                    var RGB = scope.def();
                    var ALPHA = scope.def();
                    var ifte = env2.cond("typeof ", value, '==="string"');
                    check$1.optional(function() {
                      function checkProp(block, name, value2) {
                        env2.assert(block, value2 + " in " + BLEND_EQUATIONS, "invalid " + name + ", must be one of " + Object.keys(blendEquations));
                      }
                      checkProp(ifte.then, prop, value);
                      env2.assert(ifte.else, value + "&&typeof " + value + '==="object"', "invalid " + prop);
                      checkProp(ifte.else, prop + ".rgb", value + ".rgb");
                      checkProp(ifte.else, prop + ".alpha", value + ".alpha");
                    });
                    ifte.then(RGB, "=", ALPHA, "=", BLEND_EQUATIONS, "[", value, "];");
                    ifte.else(RGB, "=", BLEND_EQUATIONS, "[", value, ".rgb];", ALPHA, "=", BLEND_EQUATIONS, "[", value, ".alpha];");
                    scope(ifte);
                    return [RGB, ALPHA];
                  });
                case S_BLEND_COLOR:
                  return parseParam(function(value) {
                    check$1.command(isArrayLike(value) && value.length === 4, "blend.color must be a 4d array", env.commandStr);
                    return loop(4, function(i) {
                      return +value[i];
                    });
                  }, function(env2, scope, value) {
                    check$1.optional(function() {
                      env2.assert(scope, env2.shared.isArrayLike + "(" + value + ")&&" + value + ".length===4", "blend.color must be a 4d array");
                    });
                    return loop(4, function(i) {
                      return scope.def("+", value, "[", i, "]");
                    });
                  });
                case S_STENCIL_MASK:
                  return parseParam(function(value) {
                    check$1.commandType(value, "number", param, env.commandStr);
                    return value | 0;
                  }, function(env2, scope, value) {
                    check$1.optional(function() {
                      env2.assert(scope, "typeof " + value + '==="number"', "invalid stencil.mask");
                    });
                    return scope.def(value, "|0");
                  });
                case S_STENCIL_FUNC:
                  return parseParam(function(value) {
                    check$1.commandType(value, "object", param, env.commandStr);
                    var cmp = value.cmp || "keep";
                    var ref = value.ref || 0;
                    var mask = "mask" in value ? value.mask : -1;
                    check$1.commandParameter(cmp, compareFuncs, prop + ".cmp", env.commandStr);
                    check$1.commandType(ref, "number", prop + ".ref", env.commandStr);
                    check$1.commandType(mask, "number", prop + ".mask", env.commandStr);
                    return [
                      compareFuncs[cmp],
                      ref,
                      mask
                    ];
                  }, function(env2, scope, value) {
                    var COMPARE_FUNCS = env2.constants.compareFuncs;
                    check$1.optional(function() {
                      function assert() {
                        env2.assert(scope, Array.prototype.join.call(arguments, ""), "invalid stencil.func");
                      }
                      assert(value + "&&typeof ", value, '==="object"');
                      assert('!("cmp" in ', value, ")||(", value, ".cmp in ", COMPARE_FUNCS, ")");
                    });
                    var cmp = scope.def('"cmp" in ', value, "?", COMPARE_FUNCS, "[", value, ".cmp]", ":", GL_KEEP);
                    var ref = scope.def(value, ".ref|0");
                    var mask = scope.def('"mask" in ', value, "?", value, ".mask|0:-1");
                    return [cmp, ref, mask];
                  });
                case S_STENCIL_OPFRONT:
                case S_STENCIL_OPBACK:
                  return parseParam(function(value) {
                    check$1.commandType(value, "object", param, env.commandStr);
                    var fail = value.fail || "keep";
                    var zfail = value.zfail || "keep";
                    var zpass = value.zpass || "keep";
                    check$1.commandParameter(fail, stencilOps, prop + ".fail", env.commandStr);
                    check$1.commandParameter(zfail, stencilOps, prop + ".zfail", env.commandStr);
                    check$1.commandParameter(zpass, stencilOps, prop + ".zpass", env.commandStr);
                    return [
                      prop === S_STENCIL_OPBACK ? GL_BACK : GL_FRONT,
                      stencilOps[fail],
                      stencilOps[zfail],
                      stencilOps[zpass]
                    ];
                  }, function(env2, scope, value) {
                    var STENCIL_OPS = env2.constants.stencilOps;
                    check$1.optional(function() {
                      env2.assert(scope, value + "&&typeof " + value + '==="object"', "invalid " + prop);
                    });
                    function read(name) {
                      check$1.optional(function() {
                        env2.assert(scope, '!("' + name + '" in ' + value + ")||(" + value + "." + name + " in " + STENCIL_OPS + ")", "invalid " + prop + "." + name + ", must be one of " + Object.keys(stencilOps));
                      });
                      return scope.def('"', name, '" in ', value, "?", STENCIL_OPS, "[", value, ".", name, "]:", GL_KEEP);
                    }
                    return [
                      prop === S_STENCIL_OPBACK ? GL_BACK : GL_FRONT,
                      read("fail"),
                      read("zfail"),
                      read("zpass")
                    ];
                  });
                case S_POLYGON_OFFSET_OFFSET:
                  return parseParam(function(value) {
                    check$1.commandType(value, "object", param, env.commandStr);
                    var factor = value.factor | 0;
                    var units = value.units | 0;
                    check$1.commandType(factor, "number", param + ".factor", env.commandStr);
                    check$1.commandType(units, "number", param + ".units", env.commandStr);
                    return [factor, units];
                  }, function(env2, scope, value) {
                    check$1.optional(function() {
                      env2.assert(scope, value + "&&typeof " + value + '==="object"', "invalid " + prop);
                    });
                    var FACTOR = scope.def(value, ".factor|0");
                    var UNITS = scope.def(value, ".units|0");
                    return [FACTOR, UNITS];
                  });
                case S_CULL_FACE:
                  return parseParam(function(value) {
                    var face = 0;
                    if (value === "front") {
                      face = GL_FRONT;
                    } else if (value === "back") {
                      face = GL_BACK;
                    }
                    check$1.command(!!face, param, env.commandStr);
                    return face;
                  }, function(env2, scope, value) {
                    check$1.optional(function() {
                      env2.assert(scope, value + '==="front"||' + value + '==="back"', "invalid cull.face");
                    });
                    return scope.def(value, '==="front"?', GL_FRONT, ":", GL_BACK);
                  });
                case S_LINE_WIDTH:
                  return parseParam(function(value) {
                    check$1.command(typeof value === "number" && value >= limits.lineWidthDims[0] && value <= limits.lineWidthDims[1], "invalid line width, must be a positive number between " + limits.lineWidthDims[0] + " and " + limits.lineWidthDims[1], env.commandStr);
                    return value;
                  }, function(env2, scope, value) {
                    check$1.optional(function() {
                      env2.assert(scope, "typeof " + value + '==="number"&&' + value + ">=" + limits.lineWidthDims[0] + "&&" + value + "<=" + limits.lineWidthDims[1], "invalid line width");
                    });
                    return value;
                  });
                case S_FRONT_FACE:
                  return parseParam(function(value) {
                    check$1.commandParameter(value, orientationType, param, env.commandStr);
                    return orientationType[value];
                  }, function(env2, scope, value) {
                    check$1.optional(function() {
                      env2.assert(scope, value + '==="cw"||' + value + '==="ccw"', "invalid frontFace, must be one of cw,ccw");
                    });
                    return scope.def(value + '==="cw"?' + GL_CW + ":" + GL_CCW);
                  });
                case S_COLOR_MASK:
                  return parseParam(function(value) {
                    check$1.command(isArrayLike(value) && value.length === 4, "color.mask must be length 4 array", env.commandStr);
                    return value.map(function(v) {
                      return !!v;
                    });
                  }, function(env2, scope, value) {
                    check$1.optional(function() {
                      env2.assert(scope, env2.shared.isArrayLike + "(" + value + ")&&" + value + ".length===4", "invalid color.mask");
                    });
                    return loop(4, function(i) {
                      return "!!" + value + "[" + i + "]";
                    });
                  });
                case S_SAMPLE_COVERAGE:
                  return parseParam(function(value) {
                    check$1.command(typeof value === "object" && value, param, env.commandStr);
                    var sampleValue = "value" in value ? value.value : 1;
                    var sampleInvert = !!value.invert;
                    check$1.command(typeof sampleValue === "number" && sampleValue >= 0 && sampleValue <= 1, "sample.coverage.value must be a number between 0 and 1", env.commandStr);
                    return [sampleValue, sampleInvert];
                  }, function(env2, scope, value) {
                    check$1.optional(function() {
                      env2.assert(scope, value + "&&typeof " + value + '==="object"', "invalid sample.coverage");
                    });
                    var VALUE = scope.def('"value" in ', value, "?+", value, ".value:1");
                    var INVERT = scope.def("!!", value, ".invert");
                    return [VALUE, INVERT];
                  });
              }
            });
            return STATE;
          }
          function parseUniforms(uniforms, env) {
            var staticUniforms = uniforms.static;
            var dynamicUniforms = uniforms.dynamic;
            var UNIFORMS = {};
            Object.keys(staticUniforms).forEach(function(name) {
              var value = staticUniforms[name];
              var result;
              if (typeof value === "number" || typeof value === "boolean") {
                result = createStaticDecl(function() {
                  return value;
                });
              } else if (typeof value === "function") {
                var reglType = value._reglType;
                if (reglType === "texture2d" || reglType === "textureCube") {
                  result = createStaticDecl(function(env2) {
                    return env2.link(value);
                  });
                } else if (reglType === "framebuffer" || reglType === "framebufferCube") {
                  check$1.command(value.color.length > 0, 'missing color attachment for framebuffer sent to uniform "' + name + '"', env.commandStr);
                  result = createStaticDecl(function(env2) {
                    return env2.link(value.color[0]);
                  });
                } else {
                  check$1.commandRaise('invalid data for uniform "' + name + '"', env.commandStr);
                }
              } else if (isArrayLike(value)) {
                result = createStaticDecl(function(env2) {
                  var ITEM = env2.global.def("[", loop(value.length, function(i) {
                    check$1.command(typeof value[i] === "number" || typeof value[i] === "boolean", "invalid uniform " + name, env2.commandStr);
                    return value[i];
                  }), "]");
                  return ITEM;
                });
              } else {
                check$1.commandRaise('invalid or missing data for uniform "' + name + '"', env.commandStr);
              }
              result.value = value;
              UNIFORMS[name] = result;
            });
            Object.keys(dynamicUniforms).forEach(function(key) {
              var dyn = dynamicUniforms[key];
              UNIFORMS[key] = createDynamicDecl(dyn, function(env2, scope) {
                return env2.invoke(scope, dyn);
              });
            });
            return UNIFORMS;
          }
          function parseAttributes(attributes, env) {
            var staticAttributes = attributes.static;
            var dynamicAttributes = attributes.dynamic;
            var attributeDefs = {};
            Object.keys(staticAttributes).forEach(function(attribute) {
              var value = staticAttributes[attribute];
              var id = stringStore.id(attribute);
              var record = new AttributeRecord2();
              if (isBufferArgs(value)) {
                record.state = ATTRIB_STATE_POINTER;
                record.buffer = bufferState.getBuffer(bufferState.create(value, GL_ARRAY_BUFFER$2, false, true));
                record.type = 0;
              } else {
                var buffer = bufferState.getBuffer(value);
                if (buffer) {
                  record.state = ATTRIB_STATE_POINTER;
                  record.buffer = buffer;
                  record.type = 0;
                } else {
                  check$1.command(typeof value === "object" && value, "invalid data for attribute " + attribute, env.commandStr);
                  if ("constant" in value) {
                    var constant = value.constant;
                    record.buffer = "null";
                    record.state = ATTRIB_STATE_CONSTANT;
                    if (typeof constant === "number") {
                      record.x = constant;
                    } else {
                      check$1.command(isArrayLike(constant) && constant.length > 0 && constant.length <= 4, "invalid constant for attribute " + attribute, env.commandStr);
                      CUTE_COMPONENTS.forEach(function(c2, i) {
                        if (i < constant.length) {
                          record[c2] = constant[i];
                        }
                      });
                    }
                  } else {
                    if (isBufferArgs(value.buffer)) {
                      buffer = bufferState.getBuffer(bufferState.create(value.buffer, GL_ARRAY_BUFFER$2, false, true));
                    } else {
                      buffer = bufferState.getBuffer(value.buffer);
                    }
                    check$1.command(!!buffer, 'missing buffer for attribute "' + attribute + '"', env.commandStr);
                    var offset = value.offset | 0;
                    check$1.command(offset >= 0, 'invalid offset for attribute "' + attribute + '"', env.commandStr);
                    var stride = value.stride | 0;
                    check$1.command(stride >= 0 && stride < 256, 'invalid stride for attribute "' + attribute + '", must be integer betweeen [0, 255]', env.commandStr);
                    var size = value.size | 0;
                    check$1.command(!("size" in value) || size > 0 && size <= 4, 'invalid size for attribute "' + attribute + '", must be 1,2,3,4', env.commandStr);
                    var normalized = !!value.normalized;
                    var type = 0;
                    if ("type" in value) {
                      check$1.commandParameter(value.type, glTypes, "invalid type for attribute " + attribute, env.commandStr);
                      type = glTypes[value.type];
                    }
                    var divisor = value.divisor | 0;
                    check$1.optional(function() {
                      if ("divisor" in value) {
                        check$1.command(divisor === 0 || extInstancing, 'cannot specify divisor for attribute "' + attribute + '", instancing not supported', env.commandStr);
                        check$1.command(divisor >= 0, 'invalid divisor for attribute "' + attribute + '"', env.commandStr);
                      }
                      var command = env.commandStr;
                      var VALID_KEYS = [
                        "buffer",
                        "offset",
                        "divisor",
                        "normalized",
                        "type",
                        "size",
                        "stride"
                      ];
                      Object.keys(value).forEach(function(prop) {
                        check$1.command(VALID_KEYS.indexOf(prop) >= 0, 'unknown parameter "' + prop + '" for attribute pointer "' + attribute + '" (valid parameters are ' + VALID_KEYS + ")", command);
                      });
                    });
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
              attributeDefs[attribute] = createStaticDecl(function(env2, scope) {
                var cache = env2.attribCache;
                if (id in cache) {
                  return cache[id];
                }
                var result = {
                  isStream: false
                };
                Object.keys(record).forEach(function(key) {
                  result[key] = record[key];
                });
                if (record.buffer) {
                  result.buffer = env2.link(record.buffer);
                  result.type = result.type || result.buffer + ".dtype";
                }
                cache[id] = result;
                return result;
              });
            });
            Object.keys(dynamicAttributes).forEach(function(attribute) {
              var dyn = dynamicAttributes[attribute];
              function appendAttributeCode(env2, block) {
                var VALUE = env2.invoke(block, dyn);
                var shared = env2.shared;
                var constants = env2.constants;
                var IS_BUFFER_ARGS = shared.isBufferArgs;
                var BUFFER_STATE = shared.buffer;
                check$1.optional(function() {
                  env2.assert(block, VALUE + "&&(typeof " + VALUE + '==="object"||typeof ' + VALUE + '==="function")&&(' + IS_BUFFER_ARGS + "(" + VALUE + ")||" + BUFFER_STATE + ".getBuffer(" + VALUE + ")||" + BUFFER_STATE + ".getBuffer(" + VALUE + ".buffer)||" + IS_BUFFER_ARGS + "(" + VALUE + '.buffer)||("constant" in ' + VALUE + "&&(typeof " + VALUE + '.constant==="number"||' + shared.isArrayLike + "(" + VALUE + ".constant))))", 'invalid dynamic attribute "' + attribute + '"');
                });
                var result = {
                  isStream: block.def(false)
                };
                var defaultRecord = new AttributeRecord2();
                defaultRecord.state = ATTRIB_STATE_POINTER;
                Object.keys(defaultRecord).forEach(function(key) {
                  result[key] = block.def("" + defaultRecord[key]);
                });
                var BUFFER = result.buffer;
                var TYPE = result.type;
                block("if(", IS_BUFFER_ARGS, "(", VALUE, ")){", result.isStream, "=true;", BUFFER, "=", BUFFER_STATE, ".createStream(", GL_ARRAY_BUFFER$2, ",", VALUE, ");", TYPE, "=", BUFFER, ".dtype;", "}else{", BUFFER, "=", BUFFER_STATE, ".getBuffer(", VALUE, ");", "if(", BUFFER, "){", TYPE, "=", BUFFER, ".dtype;", '}else if("constant" in ', VALUE, "){", result.state, "=", ATTRIB_STATE_CONSTANT, ";", "if(typeof " + VALUE + '.constant === "number"){', result[CUTE_COMPONENTS[0]], "=", VALUE, ".constant;", CUTE_COMPONENTS.slice(1).map(function(n) {
                  return result[n];
                }).join("="), "=0;", "}else{", CUTE_COMPONENTS.map(function(name, i) {
                  return result[name] + "=" + VALUE + ".constant.length>" + i + "?" + VALUE + ".constant[" + i + "]:0;";
                }).join(""), "}}else{", "if(", IS_BUFFER_ARGS, "(", VALUE, ".buffer)){", BUFFER, "=", BUFFER_STATE, ".createStream(", GL_ARRAY_BUFFER$2, ",", VALUE, ".buffer);", "}else{", BUFFER, "=", BUFFER_STATE, ".getBuffer(", VALUE, ".buffer);", "}", TYPE, '="type" in ', VALUE, "?", constants.glTypes, "[", VALUE, ".type]:", BUFFER, ".dtype;", result.normalized, "=!!", VALUE, ".normalized;");
                function emitReadRecord(name) {
                  block(result[name], "=", VALUE, ".", name, "|0;");
                }
                emitReadRecord("size");
                emitReadRecord("offset");
                emitReadRecord("stride");
                emitReadRecord("divisor");
                block("}}");
                block.exit("if(", result.isStream, "){", BUFFER_STATE, ".destroyStream(", BUFFER, ");", "}");
                return result;
              }
              attributeDefs[attribute] = createDynamicDecl(dyn, appendAttributeCode);
            });
            return attributeDefs;
          }
          function parseContext(context) {
            var staticContext = context.static;
            var dynamicContext = context.dynamic;
            var result = {};
            Object.keys(staticContext).forEach(function(name) {
              var value = staticContext[name];
              result[name] = createStaticDecl(function(env, scope) {
                if (typeof value === "number" || typeof value === "boolean") {
                  return "" + value;
                } else {
                  return env.link(value);
                }
              });
            });
            Object.keys(dynamicContext).forEach(function(name) {
              var dyn = dynamicContext[name];
              result[name] = createDynamicDecl(dyn, function(env, scope) {
                return env.invoke(scope, dyn);
              });
            });
            return result;
          }
          function parseArguments(options, attributes, uniforms, context, env) {
            var staticOptions = options.static;
            var dynamicOptions = options.dynamic;
            check$1.optional(function() {
              var KEY_NAMES = [
                S_FRAMEBUFFER,
                S_VERT,
                S_FRAG,
                S_ELEMENTS,
                S_PRIMITIVE,
                S_OFFSET,
                S_COUNT,
                S_INSTANCES,
                S_PROFILE,
                S_VAO
              ].concat(GL_STATE_NAMES);
              function checkKeys(dict) {
                Object.keys(dict).forEach(function(key) {
                  check$1.command(KEY_NAMES.indexOf(key) >= 0, 'unknown parameter "' + key + '"', env.commandStr);
                });
              }
              checkKeys(staticOptions);
              checkKeys(dynamicOptions);
            });
            var attribLocations = parseAttribLocations(options, attributes);
            var framebuffer = parseFramebuffer(options, env);
            var viewportAndScissor = parseViewportScissor(options, framebuffer, env);
            var draw = parseDraw(options, env);
            var state = parseGLState(options, env);
            var shader = parseProgram(options, env, attribLocations);
            function copyBox(name) {
              var defn = viewportAndScissor[name];
              if (defn) {
                state[name] = defn;
              }
            }
            copyBox(S_VIEWPORT);
            copyBox(propName(S_SCISSOR_BOX));
            var dirty = Object.keys(state).length > 0;
            var result = {
              framebuffer,
              draw,
              shader,
              state,
              dirty,
              scopeVAO: null,
              drawVAO: null,
              useVAO: false,
              attributes: {}
            };
            result.profile = parseProfile(options, env);
            result.uniforms = parseUniforms(uniforms, env);
            result.drawVAO = result.scopeVAO = draw.vao;
            if (!result.drawVAO && shader.program && !attribLocations && extensions.angle_instanced_arrays && draw.static.elements) {
              var useVAO = true;
              var staticBindings = shader.program.attributes.map(function(attr) {
                var binding = attributes.static[attr];
                useVAO = useVAO && !!binding;
                return binding;
              });
              if (useVAO && staticBindings.length > 0) {
                var vao = attributeState.getVAO(attributeState.createVAO({
                  attributes: staticBindings,
                  elements: draw.static.elements
                }));
                result.drawVAO = new Declaration(null, null, null, function(env2, scope) {
                  return env2.link(vao);
                });
                result.useVAO = true;
              }
            }
            if (attribLocations) {
              result.useVAO = true;
            } else {
              result.attributes = parseAttributes(attributes, env);
            }
            result.context = parseContext(context, env);
            return result;
          }
          function emitContext(env, scope, context) {
            var shared = env.shared;
            var CONTEXT = shared.context;
            var contextEnter = env.scope();
            Object.keys(context).forEach(function(name) {
              scope.save(CONTEXT, "." + name);
              var defn = context[name];
              var value = defn.append(env, scope);
              if (Array.isArray(value)) {
                contextEnter(CONTEXT, ".", name, "=[", value.join(), "];");
              } else {
                contextEnter(CONTEXT, ".", name, "=", value, ";");
              }
            });
            scope(contextEnter);
          }
          function emitPollFramebuffer(env, scope, framebuffer, skipCheck) {
            var shared = env.shared;
            var GL = shared.gl;
            var FRAMEBUFFER_STATE = shared.framebuffer;
            var EXT_DRAW_BUFFERS;
            if (extDrawBuffers) {
              EXT_DRAW_BUFFERS = scope.def(shared.extensions, ".webgl_draw_buffers");
            }
            var constants = env.constants;
            var DRAW_BUFFERS = constants.drawBuffer;
            var BACK_BUFFER = constants.backBuffer;
            var NEXT;
            if (framebuffer) {
              NEXT = framebuffer.append(env, scope);
            } else {
              NEXT = scope.def(FRAMEBUFFER_STATE, ".next");
            }
            if (!skipCheck) {
              scope("if(", NEXT, "!==", FRAMEBUFFER_STATE, ".cur){");
            }
            scope("if(", NEXT, "){", GL, ".bindFramebuffer(", GL_FRAMEBUFFER$2, ",", NEXT, ".framebuffer);");
            if (extDrawBuffers) {
              scope(EXT_DRAW_BUFFERS, ".drawBuffersWEBGL(", DRAW_BUFFERS, "[", NEXT, ".colorAttachments.length]);");
            }
            scope("}else{", GL, ".bindFramebuffer(", GL_FRAMEBUFFER$2, ",null);");
            if (extDrawBuffers) {
              scope(EXT_DRAW_BUFFERS, ".drawBuffersWEBGL(", BACK_BUFFER, ");");
            }
            scope("}", FRAMEBUFFER_STATE, ".cur=", NEXT, ";");
            if (!skipCheck) {
              scope("}");
            }
          }
          function emitPollState(env, scope, args) {
            var shared = env.shared;
            var GL = shared.gl;
            var CURRENT_VARS = env.current;
            var NEXT_VARS = env.next;
            var CURRENT_STATE = shared.current;
            var NEXT_STATE = shared.next;
            var block = env.cond(CURRENT_STATE, ".dirty");
            GL_STATE_NAMES.forEach(function(prop) {
              var param = propName(prop);
              if (param in args.state) {
                return;
              }
              var NEXT, CURRENT;
              if (param in NEXT_VARS) {
                NEXT = NEXT_VARS[param];
                CURRENT = CURRENT_VARS[param];
                var parts = loop(currentState[param].length, function(i) {
                  return block.def(NEXT, "[", i, "]");
                });
                block(env.cond(parts.map(function(p, i) {
                  return p + "!==" + CURRENT + "[" + i + "]";
                }).join("||")).then(GL, ".", GL_VARIABLES[param], "(", parts, ");", parts.map(function(p, i) {
                  return CURRENT + "[" + i + "]=" + p;
                }).join(";"), ";"));
              } else {
                NEXT = block.def(NEXT_STATE, ".", param);
                var ifte = env.cond(NEXT, "!==", CURRENT_STATE, ".", param);
                block(ifte);
                if (param in GL_FLAGS) {
                  ifte(env.cond(NEXT).then(GL, ".enable(", GL_FLAGS[param], ");").else(GL, ".disable(", GL_FLAGS[param], ");"), CURRENT_STATE, ".", param, "=", NEXT, ";");
                } else {
                  ifte(GL, ".", GL_VARIABLES[param], "(", NEXT, ");", CURRENT_STATE, ".", param, "=", NEXT, ";");
                }
              }
            });
            if (Object.keys(args.state).length === 0) {
              block(CURRENT_STATE, ".dirty=false;");
            }
            scope(block);
          }
          function emitSetOptions(env, scope, options, filter) {
            var shared = env.shared;
            var CURRENT_VARS = env.current;
            var CURRENT_STATE = shared.current;
            var GL = shared.gl;
            sortState(Object.keys(options)).forEach(function(param) {
              var defn = options[param];
              if (filter && !filter(defn)) {
                return;
              }
              var variable = defn.append(env, scope);
              if (GL_FLAGS[param]) {
                var flag = GL_FLAGS[param];
                if (isStatic(defn)) {
                  if (variable) {
                    scope(GL, ".enable(", flag, ");");
                  } else {
                    scope(GL, ".disable(", flag, ");");
                  }
                } else {
                  scope(env.cond(variable).then(GL, ".enable(", flag, ");").else(GL, ".disable(", flag, ");"));
                }
                scope(CURRENT_STATE, ".", param, "=", variable, ";");
              } else if (isArrayLike(variable)) {
                var CURRENT = CURRENT_VARS[param];
                scope(GL, ".", GL_VARIABLES[param], "(", variable, ");", variable.map(function(v, i) {
                  return CURRENT + "[" + i + "]=" + v;
                }).join(";"), ";");
              } else {
                scope(GL, ".", GL_VARIABLES[param], "(", variable, ");", CURRENT_STATE, ".", param, "=", variable, ";");
              }
            });
          }
          function injectExtensions(env, scope) {
            if (extInstancing) {
              env.instancing = scope.def(env.shared.extensions, ".angle_instanced_arrays");
            }
          }
          function emitProfile(env, scope, args, useScope, incrementCounter) {
            var shared = env.shared;
            var STATS = env.stats;
            var CURRENT_STATE = shared.current;
            var TIMER = shared.timer;
            var profileArg = args.profile;
            function perfCounter() {
              if (typeof performance === "undefined") {
                return "Date.now()";
              } else {
                return "performance.now()";
              }
            }
            var CPU_START, QUERY_COUNTER;
            function emitProfileStart(block) {
              CPU_START = scope.def();
              block(CPU_START, "=", perfCounter(), ";");
              if (typeof incrementCounter === "string") {
                block(STATS, ".count+=", incrementCounter, ";");
              } else {
                block(STATS, ".count++;");
              }
              if (timer) {
                if (useScope) {
                  QUERY_COUNTER = scope.def();
                  block(QUERY_COUNTER, "=", TIMER, ".getNumPendingQueries();");
                } else {
                  block(TIMER, ".beginQuery(", STATS, ");");
                }
              }
            }
            function emitProfileEnd(block) {
              block(STATS, ".cpuTime+=", perfCounter(), "-", CPU_START, ";");
              if (timer) {
                if (useScope) {
                  block(TIMER, ".pushScopeStats(", QUERY_COUNTER, ",", TIMER, ".getNumPendingQueries(),", STATS, ");");
                } else {
                  block(TIMER, ".endQuery();");
                }
              }
            }
            function scopeProfile(value) {
              var prev = scope.def(CURRENT_STATE, ".profile");
              scope(CURRENT_STATE, ".profile=", value, ";");
              scope.exit(CURRENT_STATE, ".profile=", prev, ";");
            }
            var USE_PROFILE;
            if (profileArg) {
              if (isStatic(profileArg)) {
                if (profileArg.enable) {
                  emitProfileStart(scope);
                  emitProfileEnd(scope.exit);
                  scopeProfile("true");
                } else {
                  scopeProfile("false");
                }
                return;
              }
              USE_PROFILE = profileArg.append(env, scope);
              scopeProfile(USE_PROFILE);
            } else {
              USE_PROFILE = scope.def(CURRENT_STATE, ".profile");
            }
            var start = env.block();
            emitProfileStart(start);
            scope("if(", USE_PROFILE, "){", start, "}");
            var end = env.block();
            emitProfileEnd(end);
            scope.exit("if(", USE_PROFILE, "){", end, "}");
          }
          function emitAttributes(env, scope, args, attributes, filter) {
            var shared = env.shared;
            function typeLength(x) {
              switch (x) {
                case GL_FLOAT_VEC2:
                case GL_INT_VEC2:
                case GL_BOOL_VEC2:
                  return 2;
                case GL_FLOAT_VEC3:
                case GL_INT_VEC3:
                case GL_BOOL_VEC3:
                  return 3;
                case GL_FLOAT_VEC4:
                case GL_INT_VEC4:
                case GL_BOOL_VEC4:
                  return 4;
                default:
                  return 1;
              }
            }
            function emitBindAttribute(ATTRIBUTE, size, record) {
              var GL = shared.gl;
              var LOCATION = scope.def(ATTRIBUTE, ".location");
              var BINDING = scope.def(shared.attributes, "[", LOCATION, "]");
              var STATE = record.state;
              var BUFFER = record.buffer;
              var CONST_COMPONENTS = [
                record.x,
                record.y,
                record.z,
                record.w
              ];
              var COMMON_KEYS = [
                "buffer",
                "normalized",
                "offset",
                "stride"
              ];
              function emitBuffer() {
                scope("if(!", BINDING, ".buffer){", GL, ".enableVertexAttribArray(", LOCATION, ");}");
                var TYPE = record.type;
                var SIZE;
                if (!record.size) {
                  SIZE = size;
                } else {
                  SIZE = scope.def(record.size, "||", size);
                }
                scope("if(", BINDING, ".type!==", TYPE, "||", BINDING, ".size!==", SIZE, "||", COMMON_KEYS.map(function(key) {
                  return BINDING + "." + key + "!==" + record[key];
                }).join("||"), "){", GL, ".bindBuffer(", GL_ARRAY_BUFFER$2, ",", BUFFER, ".buffer);", GL, ".vertexAttribPointer(", [
                  LOCATION,
                  SIZE,
                  TYPE,
                  record.normalized,
                  record.stride,
                  record.offset
                ], ");", BINDING, ".type=", TYPE, ";", BINDING, ".size=", SIZE, ";", COMMON_KEYS.map(function(key) {
                  return BINDING + "." + key + "=" + record[key] + ";";
                }).join(""), "}");
                if (extInstancing) {
                  var DIVISOR = record.divisor;
                  scope("if(", BINDING, ".divisor!==", DIVISOR, "){", env.instancing, ".vertexAttribDivisorANGLE(", [LOCATION, DIVISOR], ");", BINDING, ".divisor=", DIVISOR, ";}");
                }
              }
              function emitConstant() {
                scope("if(", BINDING, ".buffer){", GL, ".disableVertexAttribArray(", LOCATION, ");", BINDING, ".buffer=null;", "}if(", CUTE_COMPONENTS.map(function(c2, i) {
                  return BINDING + "." + c2 + "!==" + CONST_COMPONENTS[i];
                }).join("||"), "){", GL, ".vertexAttrib4f(", LOCATION, ",", CONST_COMPONENTS, ");", CUTE_COMPONENTS.map(function(c2, i) {
                  return BINDING + "." + c2 + "=" + CONST_COMPONENTS[i] + ";";
                }).join(""), "}");
              }
              if (STATE === ATTRIB_STATE_POINTER) {
                emitBuffer();
              } else if (STATE === ATTRIB_STATE_CONSTANT) {
                emitConstant();
              } else {
                scope("if(", STATE, "===", ATTRIB_STATE_POINTER, "){");
                emitBuffer();
                scope("}else{");
                emitConstant();
                scope("}");
              }
            }
            attributes.forEach(function(attribute) {
              var name = attribute.name;
              var arg = args.attributes[name];
              var record;
              if (arg) {
                if (!filter(arg)) {
                  return;
                }
                record = arg.append(env, scope);
              } else {
                if (!filter(SCOPE_DECL)) {
                  return;
                }
                var scopeAttrib = env.scopeAttrib(name);
                check$1.optional(function() {
                  env.assert(scope, scopeAttrib + ".state", "missing attribute " + name);
                });
                record = {};
                Object.keys(new AttributeRecord2()).forEach(function(key) {
                  record[key] = scope.def(scopeAttrib, ".", key);
                });
              }
              emitBindAttribute(env.link(attribute), typeLength(attribute.info.type), record);
            });
          }
          function emitUniforms(env, scope, args, uniforms, filter, isBatchInnerLoop) {
            var shared = env.shared;
            var GL = shared.gl;
            var definedArrUniforms = {};
            var infix;
            for (var i = 0; i < uniforms.length; ++i) {
              var uniform = uniforms[i];
              var name = uniform.name;
              var type = uniform.info.type;
              var size = uniform.info.size;
              var arg = args.uniforms[name];
              if (size > 1) {
                if (!arg) {
                  continue;
                }
                var arrUniformName = name.replace("[0]", "");
                if (definedArrUniforms[arrUniformName]) {
                  continue;
                }
                definedArrUniforms[arrUniformName] = 1;
              }
              var UNIFORM = env.link(uniform);
              var LOCATION = UNIFORM + ".location";
              var VALUE;
              if (arg) {
                if (!filter(arg)) {
                  continue;
                }
                if (isStatic(arg)) {
                  var value = arg.value;
                  check$1.command(value !== null && typeof value !== "undefined", 'missing uniform "' + name + '"', env.commandStr);
                  if (type === GL_SAMPLER_2D || type === GL_SAMPLER_CUBE) {
                    check$1.command(typeof value === "function" && (type === GL_SAMPLER_2D && (value._reglType === "texture2d" || value._reglType === "framebuffer") || type === GL_SAMPLER_CUBE && (value._reglType === "textureCube" || value._reglType === "framebufferCube")), "invalid texture for uniform " + name, env.commandStr);
                    var TEX_VALUE = env.link(value._texture || value.color[0]._texture);
                    scope(GL, ".uniform1i(", LOCATION, ",", TEX_VALUE + ".bind());");
                    scope.exit(TEX_VALUE, ".unbind();");
                  } else if (type === GL_FLOAT_MAT2 || type === GL_FLOAT_MAT3 || type === GL_FLOAT_MAT4) {
                    check$1.optional(function() {
                      check$1.command(isArrayLike(value), "invalid matrix for uniform " + name, env.commandStr);
                      check$1.command(type === GL_FLOAT_MAT2 && value.length === 4 || type === GL_FLOAT_MAT3 && value.length === 9 || type === GL_FLOAT_MAT4 && value.length === 16, "invalid length for matrix uniform " + name, env.commandStr);
                    });
                    var MAT_VALUE = env.global.def("new Float32Array([" + Array.prototype.slice.call(value) + "])");
                    var dim = 2;
                    if (type === GL_FLOAT_MAT3) {
                      dim = 3;
                    } else if (type === GL_FLOAT_MAT4) {
                      dim = 4;
                    }
                    scope(GL, ".uniformMatrix", dim, "fv(", LOCATION, ",false,", MAT_VALUE, ");");
                  } else {
                    switch (type) {
                      case GL_FLOAT$8:
                        if (size === 1) {
                          check$1.commandType(value, "number", "uniform " + name, env.commandStr);
                        } else {
                          check$1.command(isArrayLike(value) && value.length === size, "uniform " + name, env.commandStr);
                        }
                        infix = "1f";
                        break;
                      case GL_FLOAT_VEC2:
                        check$1.command(isArrayLike(value) && (value.length && value.length % 2 === 0 && value.length <= size * 2), "uniform " + name, env.commandStr);
                        infix = "2f";
                        break;
                      case GL_FLOAT_VEC3:
                        check$1.command(isArrayLike(value) && (value.length && value.length % 3 === 0 && value.length <= size * 3), "uniform " + name, env.commandStr);
                        infix = "3f";
                        break;
                      case GL_FLOAT_VEC4:
                        check$1.command(isArrayLike(value) && (value.length && value.length % 4 === 0 && value.length <= size * 4), "uniform " + name, env.commandStr);
                        infix = "4f";
                        break;
                      case GL_BOOL:
                        if (size === 1) {
                          check$1.commandType(value, "boolean", "uniform " + name, env.commandStr);
                        } else {
                          check$1.command(isArrayLike(value) && value.length === size, "uniform " + name, env.commandStr);
                        }
                        infix = "1i";
                        break;
                      case GL_INT$3:
                        if (size === 1) {
                          check$1.commandType(value, "number", "uniform " + name, env.commandStr);
                        } else {
                          check$1.command(isArrayLike(value) && value.length === size, "uniform " + name, env.commandStr);
                        }
                        infix = "1i";
                        break;
                      case GL_BOOL_VEC2:
                        check$1.command(isArrayLike(value) && (value.length && value.length % 2 === 0 && value.length <= size * 2), "uniform " + name, env.commandStr);
                        infix = "2i";
                        break;
                      case GL_INT_VEC2:
                        check$1.command(isArrayLike(value) && (value.length && value.length % 2 === 0 && value.length <= size * 2), "uniform " + name, env.commandStr);
                        infix = "2i";
                        break;
                      case GL_BOOL_VEC3:
                        check$1.command(isArrayLike(value) && (value.length && value.length % 3 === 0 && value.length <= size * 3), "uniform " + name, env.commandStr);
                        infix = "3i";
                        break;
                      case GL_INT_VEC3:
                        check$1.command(isArrayLike(value) && (value.length && value.length % 3 === 0 && value.length <= size * 3), "uniform " + name, env.commandStr);
                        infix = "3i";
                        break;
                      case GL_BOOL_VEC4:
                        check$1.command(isArrayLike(value) && (value.length && value.length % 4 === 0 && value.length <= size * 4), "uniform " + name, env.commandStr);
                        infix = "4i";
                        break;
                      case GL_INT_VEC4:
                        check$1.command(isArrayLike(value) && (value.length && value.length % 4 === 0 && value.length <= size * 4), "uniform " + name, env.commandStr);
                        infix = "4i";
                        break;
                    }
                    if (size > 1) {
                      infix += "v";
                      value = env.global.def("[" + Array.prototype.slice.call(value) + "]");
                    } else {
                      value = isArrayLike(value) ? Array.prototype.slice.call(value) : value;
                    }
                    scope(GL, ".uniform", infix, "(", LOCATION, ",", value, ");");
                  }
                  continue;
                } else {
                  VALUE = arg.append(env, scope);
                }
              } else {
                if (!filter(SCOPE_DECL)) {
                  continue;
                }
                VALUE = scope.def(shared.uniforms, "[", stringStore.id(name), "]");
              }
              if (type === GL_SAMPLER_2D) {
                check$1(!Array.isArray(VALUE), "must specify a scalar prop for textures");
                scope("if(", VALUE, "&&", VALUE, '._reglType==="framebuffer"){', VALUE, "=", VALUE, ".color[0];", "}");
              } else if (type === GL_SAMPLER_CUBE) {
                check$1(!Array.isArray(VALUE), "must specify a scalar prop for cube maps");
                scope("if(", VALUE, "&&", VALUE, '._reglType==="framebufferCube"){', VALUE, "=", VALUE, ".color[0];", "}");
              }
              check$1.optional(function() {
                function emitCheck(pred, message) {
                  env.assert(scope, pred, 'bad data or missing for uniform "' + name + '".  ' + message);
                }
                function checkType(type2, size2) {
                  if (size2 === 1) {
                    check$1(!Array.isArray(VALUE), "must not specify an array type for uniform");
                  }
                  emitCheck("Array.isArray(" + VALUE + ") && typeof " + VALUE + '[0]===" ' + type2 + '" || typeof ' + VALUE + '==="' + type2 + '"', "invalid type, expected " + type2);
                }
                function checkVector(n, type2, size2) {
                  if (Array.isArray(VALUE)) {
                    check$1(VALUE.length && VALUE.length % n === 0 && VALUE.length <= n * size2, "must have length of " + (size2 === 1 ? "" : "n * ") + n);
                  } else {
                    emitCheck(shared.isArrayLike + "(" + VALUE + ")&&" + VALUE + ".length && " + VALUE + ".length % " + n + " === 0 && " + VALUE + ".length<=" + n * size2, "invalid vector, should have length of " + (size2 === 1 ? "" : "n * ") + n, env.commandStr);
                  }
                }
                function checkTexture(target) {
                  check$1(!Array.isArray(VALUE), "must not specify a value type");
                  emitCheck("typeof " + VALUE + '==="function"&&' + VALUE + '._reglType==="texture' + (target === GL_TEXTURE_2D$3 ? "2d" : "Cube") + '"', "invalid texture type", env.commandStr);
                }
                switch (type) {
                  case GL_INT$3:
                    checkType("number", size);
                    break;
                  case GL_INT_VEC2:
                    checkVector(2, "number", size);
                    break;
                  case GL_INT_VEC3:
                    checkVector(3, "number", size);
                    break;
                  case GL_INT_VEC4:
                    checkVector(4, "number", size);
                    break;
                  case GL_FLOAT$8:
                    checkType("number", size);
                    break;
                  case GL_FLOAT_VEC2:
                    checkVector(2, "number", size);
                    break;
                  case GL_FLOAT_VEC3:
                    checkVector(3, "number", size);
                    break;
                  case GL_FLOAT_VEC4:
                    checkVector(4, "number", size);
                    break;
                  case GL_BOOL:
                    checkType("boolean", size);
                    break;
                  case GL_BOOL_VEC2:
                    checkVector(2, "boolean", size);
                    break;
                  case GL_BOOL_VEC3:
                    checkVector(3, "boolean", size);
                    break;
                  case GL_BOOL_VEC4:
                    checkVector(4, "boolean", size);
                    break;
                  case GL_FLOAT_MAT2:
                    checkVector(4, "number", size);
                    break;
                  case GL_FLOAT_MAT3:
                    checkVector(9, "number", size);
                    break;
                  case GL_FLOAT_MAT4:
                    checkVector(16, "number", size);
                    break;
                  case GL_SAMPLER_2D:
                    checkTexture(GL_TEXTURE_2D$3);
                    break;
                  case GL_SAMPLER_CUBE:
                    checkTexture(GL_TEXTURE_CUBE_MAP$2);
                    break;
                }
              });
              var unroll = 1;
              switch (type) {
                case GL_SAMPLER_2D:
                case GL_SAMPLER_CUBE:
                  var TEX = scope.def(VALUE, "._texture");
                  scope(GL, ".uniform1i(", LOCATION, ",", TEX, ".bind());");
                  scope.exit(TEX, ".unbind();");
                  continue;
                case GL_INT$3:
                case GL_BOOL:
                  infix = "1i";
                  break;
                case GL_INT_VEC2:
                case GL_BOOL_VEC2:
                  infix = "2i";
                  unroll = 2;
                  break;
                case GL_INT_VEC3:
                case GL_BOOL_VEC3:
                  infix = "3i";
                  unroll = 3;
                  break;
                case GL_INT_VEC4:
                case GL_BOOL_VEC4:
                  infix = "4i";
                  unroll = 4;
                  break;
                case GL_FLOAT$8:
                  infix = "1f";
                  break;
                case GL_FLOAT_VEC2:
                  infix = "2f";
                  unroll = 2;
                  break;
                case GL_FLOAT_VEC3:
                  infix = "3f";
                  unroll = 3;
                  break;
                case GL_FLOAT_VEC4:
                  infix = "4f";
                  unroll = 4;
                  break;
                case GL_FLOAT_MAT2:
                  infix = "Matrix2fv";
                  break;
                case GL_FLOAT_MAT3:
                  infix = "Matrix3fv";
                  break;
                case GL_FLOAT_MAT4:
                  infix = "Matrix4fv";
                  break;
              }
              if (infix.indexOf("Matrix") === -1 && size > 1) {
                infix += "v";
                unroll = 1;
              }
              if (infix.charAt(0) === "M") {
                scope(GL, ".uniform", infix, "(", LOCATION, ",");
                var matSize = Math.pow(type - GL_FLOAT_MAT2 + 2, 2);
                var STORAGE = env.global.def("new Float32Array(", matSize, ")");
                if (Array.isArray(VALUE)) {
                  scope("false,(", loop(matSize, function(i2) {
                    return STORAGE + "[" + i2 + "]=" + VALUE[i2];
                  }), ",", STORAGE, ")");
                } else {
                  scope("false,(Array.isArray(", VALUE, ")||", VALUE, " instanceof Float32Array)?", VALUE, ":(", loop(matSize, function(i2) {
                    return STORAGE + "[" + i2 + "]=" + VALUE + "[" + i2 + "]";
                  }), ",", STORAGE, ")");
                }
                scope(");");
              } else if (unroll > 1) {
                var prev = [];
                var cur = [];
                for (var j = 0; j < unroll; ++j) {
                  if (Array.isArray(VALUE)) {
                    cur.push(VALUE[j]);
                  } else {
                    cur.push(scope.def(VALUE + "[" + j + "]"));
                  }
                  if (isBatchInnerLoop) {
                    prev.push(scope.def());
                  }
                }
                if (isBatchInnerLoop) {
                  scope("if(!", env.batchId, "||", prev.map(function(p, i2) {
                    return p + "!==" + cur[i2];
                  }).join("||"), "){", prev.map(function(p, i2) {
                    return p + "=" + cur[i2] + ";";
                  }).join(""));
                }
                scope(GL, ".uniform", infix, "(", LOCATION, ",", cur.join(","), ");");
                if (isBatchInnerLoop) {
                  scope("}");
                }
              } else {
                check$1(!Array.isArray(VALUE), "uniform value must not be an array");
                if (isBatchInnerLoop) {
                  var prevS = scope.def();
                  scope("if(!", env.batchId, "||", prevS, "!==", VALUE, "){", prevS, "=", VALUE, ";");
                }
                scope(GL, ".uniform", infix, "(", LOCATION, ",", VALUE, ");");
                if (isBatchInnerLoop) {
                  scope("}");
                }
              }
            }
          }
          function emitDraw(env, outer, inner, args) {
            var shared = env.shared;
            var GL = shared.gl;
            var DRAW_STATE = shared.draw;
            var drawOptions = args.draw;
            function emitElements() {
              var defn = drawOptions.elements;
              var ELEMENTS2;
              var scope = outer;
              if (defn) {
                if (defn.contextDep && args.contextDynamic || defn.propDep) {
                  scope = inner;
                }
                ELEMENTS2 = defn.append(env, scope);
                if (drawOptions.elementsActive) {
                  scope("if(" + ELEMENTS2 + ")" + GL + ".bindBuffer(" + GL_ELEMENT_ARRAY_BUFFER$2 + "," + ELEMENTS2 + ".buffer.buffer);");
                }
              } else {
                ELEMENTS2 = scope.def();
                scope(ELEMENTS2, "=", DRAW_STATE, ".", S_ELEMENTS, ";", "if(", ELEMENTS2, "){", GL, ".bindBuffer(", GL_ELEMENT_ARRAY_BUFFER$2, ",", ELEMENTS2, ".buffer.buffer);}", "else if(", shared.vao, ".currentVAO){", ELEMENTS2, "=", env.shared.elements + ".getElements(" + shared.vao, ".currentVAO.elements);", !extVertexArrays ? "if(" + ELEMENTS2 + ")" + GL + ".bindBuffer(" + GL_ELEMENT_ARRAY_BUFFER$2 + "," + ELEMENTS2 + ".buffer.buffer);" : "", "}");
              }
              return ELEMENTS2;
            }
            function emitCount() {
              var defn = drawOptions.count;
              var COUNT2;
              var scope = outer;
              if (defn) {
                if (defn.contextDep && args.contextDynamic || defn.propDep) {
                  scope = inner;
                }
                COUNT2 = defn.append(env, scope);
                check$1.optional(function() {
                  if (defn.MISSING) {
                    env.assert(outer, "false", "missing vertex count");
                  }
                  if (defn.DYNAMIC) {
                    env.assert(scope, COUNT2 + ">=0", "missing vertex count");
                  }
                });
              } else {
                COUNT2 = scope.def(DRAW_STATE, ".", S_COUNT);
                check$1.optional(function() {
                  env.assert(scope, COUNT2 + ">=0", "missing vertex count");
                });
              }
              return COUNT2;
            }
            var ELEMENTS = emitElements();
            function emitValue(name) {
              var defn = drawOptions[name];
              if (defn) {
                if (defn.contextDep && args.contextDynamic || defn.propDep) {
                  return defn.append(env, inner);
                } else {
                  return defn.append(env, outer);
                }
              } else {
                return outer.def(DRAW_STATE, ".", name);
              }
            }
            var PRIMITIVE = emitValue(S_PRIMITIVE);
            var OFFSET = emitValue(S_OFFSET);
            var COUNT = emitCount();
            if (typeof COUNT === "number") {
              if (COUNT === 0) {
                return;
              }
            } else {
              inner("if(", COUNT, "){");
              inner.exit("}");
            }
            var INSTANCES, EXT_INSTANCING;
            if (extInstancing) {
              INSTANCES = emitValue(S_INSTANCES);
              EXT_INSTANCING = env.instancing;
            }
            var ELEMENT_TYPE = ELEMENTS + ".type";
            var elementsStatic = drawOptions.elements && isStatic(drawOptions.elements) && !drawOptions.vaoActive;
            function emitInstancing() {
              function drawElements() {
                inner(EXT_INSTANCING, ".drawElementsInstancedANGLE(", [
                  PRIMITIVE,
                  COUNT,
                  ELEMENT_TYPE,
                  OFFSET + "<<((" + ELEMENT_TYPE + "-" + GL_UNSIGNED_BYTE$8 + ")>>1)",
                  INSTANCES
                ], ");");
              }
              function drawArrays() {
                inner(EXT_INSTANCING, ".drawArraysInstancedANGLE(", [PRIMITIVE, OFFSET, COUNT, INSTANCES], ");");
              }
              if (ELEMENTS && ELEMENTS !== "null") {
                if (!elementsStatic) {
                  inner("if(", ELEMENTS, "){");
                  drawElements();
                  inner("}else{");
                  drawArrays();
                  inner("}");
                } else {
                  drawElements();
                }
              } else {
                drawArrays();
              }
            }
            function emitRegular() {
              function drawElements() {
                inner(GL + ".drawElements(" + [
                  PRIMITIVE,
                  COUNT,
                  ELEMENT_TYPE,
                  OFFSET + "<<((" + ELEMENT_TYPE + "-" + GL_UNSIGNED_BYTE$8 + ")>>1)"
                ] + ");");
              }
              function drawArrays() {
                inner(GL + ".drawArrays(" + [PRIMITIVE, OFFSET, COUNT] + ");");
              }
              if (ELEMENTS && ELEMENTS !== "null") {
                if (!elementsStatic) {
                  inner("if(", ELEMENTS, "){");
                  drawElements();
                  inner("}else{");
                  drawArrays();
                  inner("}");
                } else {
                  drawElements();
                }
              } else {
                drawArrays();
              }
            }
            if (extInstancing && (typeof INSTANCES !== "number" || INSTANCES >= 0)) {
              if (typeof INSTANCES === "string") {
                inner("if(", INSTANCES, ">0){");
                emitInstancing();
                inner("}else if(", INSTANCES, "<0){");
                emitRegular();
                inner("}");
              } else {
                emitInstancing();
              }
            } else {
              emitRegular();
            }
          }
          function createBody(emitBody, parentEnv, args, program, count) {
            var env = createREGLEnvironment();
            var scope = env.proc("body", count);
            check$1.optional(function() {
              env.commandStr = parentEnv.commandStr;
              env.command = env.link(parentEnv.commandStr);
            });
            if (extInstancing) {
              env.instancing = scope.def(env.shared.extensions, ".angle_instanced_arrays");
            }
            emitBody(env, scope, args, program);
            return env.compile().body;
          }
          function emitDrawBody(env, draw, args, program) {
            injectExtensions(env, draw);
            if (args.useVAO) {
              if (args.drawVAO) {
                draw(env.shared.vao, ".setVAO(", args.drawVAO.append(env, draw), ");");
              } else {
                draw(env.shared.vao, ".setVAO(", env.shared.vao, ".targetVAO);");
              }
            } else {
              draw(env.shared.vao, ".setVAO(null);");
              emitAttributes(env, draw, args, program.attributes, function() {
                return true;
              });
            }
            emitUniforms(env, draw, args, program.uniforms, function() {
              return true;
            }, false);
            emitDraw(env, draw, draw, args);
          }
          function emitDrawProc(env, args) {
            var draw = env.proc("draw", 1);
            injectExtensions(env, draw);
            emitContext(env, draw, args.context);
            emitPollFramebuffer(env, draw, args.framebuffer);
            emitPollState(env, draw, args);
            emitSetOptions(env, draw, args.state);
            emitProfile(env, draw, args, false, true);
            var program = args.shader.progVar.append(env, draw);
            draw(env.shared.gl, ".useProgram(", program, ".program);");
            if (args.shader.program) {
              emitDrawBody(env, draw, args, args.shader.program);
            } else {
              draw(env.shared.vao, ".setVAO(null);");
              var drawCache = env.global.def("{}");
              var PROG_ID = draw.def(program, ".id");
              var CACHED_PROC = draw.def(drawCache, "[", PROG_ID, "]");
              draw(env.cond(CACHED_PROC).then(CACHED_PROC, ".call(this,a0);").else(CACHED_PROC, "=", drawCache, "[", PROG_ID, "]=", env.link(function(program2) {
                return createBody(emitDrawBody, env, args, program2, 1);
              }), "(", program, ");", CACHED_PROC, ".call(this,a0);"));
            }
            if (Object.keys(args.state).length > 0) {
              draw(env.shared.current, ".dirty=true;");
            }
            if (env.shared.vao) {
              draw(env.shared.vao, ".setVAO(null);");
            }
          }
          function emitBatchDynamicShaderBody(env, scope, args, program) {
            env.batchId = "a1";
            injectExtensions(env, scope);
            function all() {
              return true;
            }
            emitAttributes(env, scope, args, program.attributes, all);
            emitUniforms(env, scope, args, program.uniforms, all, false);
            emitDraw(env, scope, scope, args);
          }
          function emitBatchBody(env, scope, args, program) {
            injectExtensions(env, scope);
            var contextDynamic = args.contextDep;
            var BATCH_ID = scope.def();
            var PROP_LIST = "a0";
            var NUM_PROPS = "a1";
            var PROPS = scope.def();
            env.shared.props = PROPS;
            env.batchId = BATCH_ID;
            var outer = env.scope();
            var inner = env.scope();
            scope(outer.entry, "for(", BATCH_ID, "=0;", BATCH_ID, "<", NUM_PROPS, ";++", BATCH_ID, "){", PROPS, "=", PROP_LIST, "[", BATCH_ID, "];", inner, "}", outer.exit);
            function isInnerDefn(defn) {
              return defn.contextDep && contextDynamic || defn.propDep;
            }
            function isOuterDefn(defn) {
              return !isInnerDefn(defn);
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
              var progCache = env.global.def("{}");
              var PROGRAM = args.shader.progVar.append(env, inner);
              var PROG_ID = inner.def(PROGRAM, ".id");
              var CACHED_PROC = inner.def(progCache, "[", PROG_ID, "]");
              inner(env.shared.gl, ".useProgram(", PROGRAM, ".program);", "if(!", CACHED_PROC, "){", CACHED_PROC, "=", progCache, "[", PROG_ID, "]=", env.link(function(program2) {
                return createBody(emitBatchDynamicShaderBody, env, args, program2, 2);
              }), "(", PROGRAM, ");}", CACHED_PROC, ".call(this,a0[", BATCH_ID, "],", BATCH_ID, ");");
            } else {
              if (args.useVAO) {
                if (args.drawVAO) {
                  if (isInnerDefn(args.drawVAO)) {
                    inner(env.shared.vao, ".setVAO(", args.drawVAO.append(env, inner), ");");
                  } else {
                    outer(env.shared.vao, ".setVAO(", args.drawVAO.append(env, outer), ");");
                  }
                } else {
                  outer(env.shared.vao, ".setVAO(", env.shared.vao, ".targetVAO);");
                }
              } else {
                outer(env.shared.vao, ".setVAO(null);");
                emitAttributes(env, outer, args, program.attributes, isOuterDefn);
                emitAttributes(env, inner, args, program.attributes, isInnerDefn);
              }
              emitUniforms(env, outer, args, program.uniforms, isOuterDefn, false);
              emitUniforms(env, inner, args, program.uniforms, isInnerDefn, true);
              emitDraw(env, outer, inner, args);
            }
          }
          function emitBatchProc(env, args) {
            var batch = env.proc("batch", 2);
            env.batchId = "0";
            injectExtensions(env, batch);
            var contextDynamic = false;
            var needsContext = true;
            Object.keys(args.context).forEach(function(name) {
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
            function isInnerDefn(defn) {
              return defn.contextDep && contextDynamic || defn.propDep;
            }
            emitPollState(env, batch, args);
            emitSetOptions(env, batch, args.state, function(defn) {
              return !isInnerDefn(defn);
            });
            if (!args.profile || !isInnerDefn(args.profile)) {
              emitProfile(env, batch, args, false, "a1");
            }
            args.contextDep = contextDynamic;
            args.needsContext = needsContext;
            args.needsFramebuffer = needsFramebuffer;
            var progDefn = args.shader.progVar;
            if (progDefn.contextDep && contextDynamic || progDefn.propDep) {
              emitBatchBody(env, batch, args, null);
            } else {
              var PROGRAM = progDefn.append(env, batch);
              batch(env.shared.gl, ".useProgram(", PROGRAM, ".program);");
              if (args.shader.program) {
                emitBatchBody(env, batch, args, args.shader.program);
              } else {
                batch(env.shared.vao, ".setVAO(null);");
                var batchCache = env.global.def("{}");
                var PROG_ID = batch.def(PROGRAM, ".id");
                var CACHED_PROC = batch.def(batchCache, "[", PROG_ID, "]");
                batch(env.cond(CACHED_PROC).then(CACHED_PROC, ".call(this,a0,a1);").else(CACHED_PROC, "=", batchCache, "[", PROG_ID, "]=", env.link(function(program) {
                  return createBody(emitBatchBody, env, args, program, 2);
                }), "(", PROGRAM, ");", CACHED_PROC, ".call(this,a0,a1);"));
              }
            }
            if (Object.keys(args.state).length > 0) {
              batch(env.shared.current, ".dirty=true;");
            }
            if (env.shared.vao) {
              batch(env.shared.vao, ".setVAO(null);");
            }
          }
          function emitScopeProc(env, args) {
            var scope = env.proc("scope", 3);
            env.batchId = "a2";
            var shared = env.shared;
            var CURRENT_STATE = shared.current;
            emitContext(env, scope, args.context);
            if (args.framebuffer) {
              args.framebuffer.append(env, scope);
            }
            sortState(Object.keys(args.state)).forEach(function(name) {
              var defn = args.state[name];
              var value = defn.append(env, scope);
              if (isArrayLike(value)) {
                value.forEach(function(v, i) {
                  scope.set(env.next[name], "[" + i + "]", v);
                });
              } else {
                scope.set(shared.next, "." + name, value);
              }
            });
            emitProfile(env, scope, args, true, true);
            [S_ELEMENTS, S_OFFSET, S_COUNT, S_INSTANCES, S_PRIMITIVE].forEach(function(opt) {
              var variable = args.draw[opt];
              if (!variable) {
                return;
              }
              scope.set(shared.draw, "." + opt, "" + variable.append(env, scope));
            });
            Object.keys(args.uniforms).forEach(function(opt) {
              var value = args.uniforms[opt].append(env, scope);
              if (Array.isArray(value)) {
                value = "[" + value.join() + "]";
              }
              scope.set(shared.uniforms, "[" + stringStore.id(opt) + "]", value);
            });
            Object.keys(args.attributes).forEach(function(name) {
              var record = args.attributes[name].append(env, scope);
              var scopeAttrib = env.scopeAttrib(name);
              Object.keys(new AttributeRecord2()).forEach(function(prop) {
                scope.set(scopeAttrib, "." + prop, record[prop]);
              });
            });
            if (args.scopeVAO) {
              scope.set(shared.vao, ".targetVAO", args.scopeVAO.append(env, scope));
            }
            function saveShader(name) {
              var shader = args.shader[name];
              if (shader) {
                scope.set(shared.shader, "." + name, shader.append(env, scope));
              }
            }
            saveShader(S_VERT);
            saveShader(S_FRAG);
            if (Object.keys(args.state).length > 0) {
              scope(CURRENT_STATE, ".dirty=true;");
              scope.exit(CURRENT_STATE, ".dirty=true;");
            }
            scope("a1(", env.shared.context, ",a0,", env.batchId, ");");
          }
          function isDynamicObject(object) {
            if (typeof object !== "object" || isArrayLike(object)) {
              return;
            }
            var props = Object.keys(object);
            for (var i = 0; i < props.length; ++i) {
              if (dynamic.isDynamic(object[props[i]])) {
                return true;
              }
            }
            return false;
          }
          function splatObject(env, options, name) {
            var object = options.static[name];
            if (!object || !isDynamicObject(object)) {
              return;
            }
            var globals = env.global;
            var keys = Object.keys(object);
            var thisDep = false;
            var contextDep = false;
            var propDep = false;
            var objectRef = env.global.def("{}");
            keys.forEach(function(key) {
              var value = object[key];
              if (dynamic.isDynamic(value)) {
                if (typeof value === "function") {
                  value = object[key] = dynamic.unbox(value);
                }
                var deps = createDynamicDecl(value, null);
                thisDep = thisDep || deps.thisDep;
                propDep = propDep || deps.propDep;
                contextDep = contextDep || deps.contextDep;
              } else {
                globals(objectRef, ".", key, "=");
                switch (typeof value) {
                  case "number":
                    globals(value);
                    break;
                  case "string":
                    globals('"', value, '"');
                    break;
                  case "object":
                    if (Array.isArray(value)) {
                      globals("[", value.join(), "]");
                    }
                    break;
                  default:
                    globals(env.link(value));
                    break;
                }
                globals(";");
              }
            });
            function appendBlock(env2, block) {
              keys.forEach(function(key) {
                var value = object[key];
                if (!dynamic.isDynamic(value)) {
                  return;
                }
                var ref = env2.invoke(block, value);
                block(objectRef, ".", key, "=", ref, ";");
              });
            }
            options.dynamic[name] = new dynamic.DynamicVariable(DYN_THUNK, {
              thisDep,
              contextDep,
              propDep,
              ref: objectRef,
              append: appendBlock
            });
            delete options.static[name];
          }
          function compileCommand(options, attributes, uniforms, context, stats2) {
            var env = createREGLEnvironment();
            env.stats = env.link(stats2);
            Object.keys(attributes.static).forEach(function(key) {
              splatObject(env, attributes, key);
            });
            NESTED_OPTIONS.forEach(function(name) {
              splatObject(env, options, name);
            });
            var args = parseArguments(options, attributes, uniforms, context, env);
            emitDrawProc(env, args);
            emitScopeProc(env, args);
            emitBatchProc(env, args);
            return extend(env.compile(), {
              destroy: function() {
                args.shader.program.destroy();
              }
            });
          }
          return {
            next: nextState,
            current: currentState,
            procs: function() {
              var env = createREGLEnvironment();
              var poll = env.proc("poll");
              var refresh = env.proc("refresh");
              var common = env.block();
              poll(common);
              refresh(common);
              var shared = env.shared;
              var GL = shared.gl;
              var NEXT_STATE = shared.next;
              var CURRENT_STATE = shared.current;
              common(CURRENT_STATE, ".dirty=false;");
              emitPollFramebuffer(env, poll);
              emitPollFramebuffer(env, refresh, null, true);
              var INSTANCING;
              if (extInstancing) {
                INSTANCING = env.link(extInstancing);
              }
              if (extensions.oes_vertex_array_object) {
                refresh(env.link(extensions.oes_vertex_array_object), ".bindVertexArrayOES(null);");
              }
              for (var i = 0; i < limits.maxAttributes; ++i) {
                var BINDING = refresh.def(shared.attributes, "[", i, "]");
                var ifte = env.cond(BINDING, ".buffer");
                ifte.then(GL, ".enableVertexAttribArray(", i, ");", GL, ".bindBuffer(", GL_ARRAY_BUFFER$2, ",", BINDING, ".buffer.buffer);", GL, ".vertexAttribPointer(", i, ",", BINDING, ".size,", BINDING, ".type,", BINDING, ".normalized,", BINDING, ".stride,", BINDING, ".offset);").else(GL, ".disableVertexAttribArray(", i, ");", GL, ".vertexAttrib4f(", i, ",", BINDING, ".x,", BINDING, ".y,", BINDING, ".z,", BINDING, ".w);", BINDING, ".buffer=null;");
                refresh(ifte);
                if (extInstancing) {
                  refresh(INSTANCING, ".vertexAttribDivisorANGLE(", i, ",", BINDING, ".divisor);");
                }
              }
              refresh(env.shared.vao, ".currentVAO=null;", env.shared.vao, ".setVAO(", env.shared.vao, ".targetVAO);");
              Object.keys(GL_FLAGS).forEach(function(flag) {
                var cap = GL_FLAGS[flag];
                var NEXT = common.def(NEXT_STATE, ".", flag);
                var block = env.block();
                block("if(", NEXT, "){", GL, ".enable(", cap, ")}else{", GL, ".disable(", cap, ")}", CURRENT_STATE, ".", flag, "=", NEXT, ";");
                refresh(block);
                poll("if(", NEXT, "!==", CURRENT_STATE, ".", flag, "){", block, "}");
              });
              Object.keys(GL_VARIABLES).forEach(function(name) {
                var func = GL_VARIABLES[name];
                var init = currentState[name];
                var NEXT, CURRENT;
                var block = env.block();
                block(GL, ".", func, "(");
                if (isArrayLike(init)) {
                  var n = init.length;
                  NEXT = env.global.def(NEXT_STATE, ".", name);
                  CURRENT = env.global.def(CURRENT_STATE, ".", name);
                  block(loop(n, function(i2) {
                    return NEXT + "[" + i2 + "]";
                  }), ");", loop(n, function(i2) {
                    return CURRENT + "[" + i2 + "]=" + NEXT + "[" + i2 + "];";
                  }).join(""));
                  poll("if(", loop(n, function(i2) {
                    return NEXT + "[" + i2 + "]!==" + CURRENT + "[" + i2 + "]";
                  }).join("||"), "){", block, "}");
                } else {
                  NEXT = common.def(NEXT_STATE, ".", name);
                  CURRENT = common.def(CURRENT_STATE, ".", name);
                  block(NEXT, ");", CURRENT_STATE, ".", name, "=", NEXT, ";");
                  poll("if(", NEXT, "!==", CURRENT, "){", block, "}");
                }
                refresh(block);
              });
              return env.compile();
            }(),
            compile: compileCommand
          };
        }
        function stats() {
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
          };
        }
        var GL_QUERY_RESULT_EXT = 34918;
        var GL_QUERY_RESULT_AVAILABLE_EXT = 34919;
        var GL_TIME_ELAPSED_EXT = 35007;
        var createTimer = function(gl, extensions) {
          if (!extensions.ext_disjoint_timer_query) {
            return null;
          }
          var queryPool = [];
          function allocQuery() {
            return queryPool.pop() || extensions.ext_disjoint_timer_query.createQueryEXT();
          }
          function freeQuery(query) {
            queryPool.push(query);
          }
          var pendingQueries = [];
          function beginQuery(stats2) {
            var query = allocQuery();
            extensions.ext_disjoint_timer_query.beginQueryEXT(GL_TIME_ELAPSED_EXT, query);
            pendingQueries.push(query);
            pushScopeStats(pendingQueries.length - 1, pendingQueries.length, stats2);
          }
          function endQuery() {
            extensions.ext_disjoint_timer_query.endQueryEXT(GL_TIME_ELAPSED_EXT);
          }
          function PendingStats() {
            this.startQueryIndex = -1;
            this.endQueryIndex = -1;
            this.sum = 0;
            this.stats = null;
          }
          var pendingStatsPool = [];
          function allocPendingStats() {
            return pendingStatsPool.pop() || new PendingStats();
          }
          function freePendingStats(pendingStats2) {
            pendingStatsPool.push(pendingStats2);
          }
          var pendingStats = [];
          function pushScopeStats(start, end, stats2) {
            var ps = allocPendingStats();
            ps.startQueryIndex = start;
            ps.endQueryIndex = end;
            ps.sum = 0;
            ps.stats = stats2;
            pendingStats.push(ps);
          }
          var timeSum = [];
          var queryPtr = [];
          function update() {
            var ptr, i;
            var n = pendingQueries.length;
            if (n === 0) {
              return;
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
              var stats2 = pendingStats[i];
              var start = stats2.startQueryIndex;
              var end = stats2.endQueryIndex;
              stats2.sum += timeSum[end] - timeSum[start];
              var startPtr = queryPtr[start];
              var endPtr = queryPtr[end];
              if (endPtr === startPtr) {
                stats2.stats.gpuTime += stats2.sum / 1e6;
                freePendingStats(stats2);
              } else {
                stats2.startQueryIndex = startPtr;
                stats2.endQueryIndex = endPtr;
                pendingStats[ptr++] = stats2;
              }
            }
            pendingStats.length = ptr;
          }
          return {
            beginQuery,
            endQuery,
            pushScopeStats,
            update,
            getNumPendingQueries: function() {
              return pendingQueries.length;
            },
            clear: function() {
              queryPool.push.apply(queryPool, pendingQueries);
              for (var i = 0; i < queryPool.length; i++) {
                extensions.ext_disjoint_timer_query.deleteQueryEXT(queryPool[i]);
              }
              pendingQueries.length = 0;
              queryPool.length = 0;
            },
            restore: function() {
              pendingQueries.length = 0;
              queryPool.length = 0;
            }
          };
        };
        var GL_COLOR_BUFFER_BIT = 16384;
        var GL_DEPTH_BUFFER_BIT = 256;
        var GL_STENCIL_BUFFER_BIT = 1024;
        var GL_ARRAY_BUFFER = 34962;
        var CONTEXT_LOST_EVENT = "webglcontextlost";
        var CONTEXT_RESTORED_EVENT = "webglcontextrestored";
        var DYN_PROP = 1;
        var DYN_CONTEXT = 2;
        var DYN_STATE = 3;
        function find(haystack, needle) {
          for (var i = 0; i < haystack.length; ++i) {
            if (haystack[i] === needle) {
              return i;
            }
          }
          return -1;
        }
        function wrapREGL(args) {
          var config2 = parseArgs(args);
          if (!config2) {
            return null;
          }
          var gl = config2.gl;
          var glAttributes = gl.getContextAttributes();
          var contextLost = gl.isContextLost();
          var extensionState = createExtensionCache(gl, config2);
          if (!extensionState) {
            return null;
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
            pixelRatio: config2.pixelRatio
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
          var bufferState = wrapBufferState(gl, stats$$1, config2, destroyBuffer);
          var elementState = wrapElementsState(gl, extensions, bufferState, stats$$1);
          var attributeState = wrapAttributeState(gl, extensions, limits, stats$$1, bufferState, elementState, drawState);
          function destroyBuffer(buffer) {
            return attributeState.destroyBuffer(buffer);
          }
          var shaderState = wrapShaderState(gl, stringStore, stats$$1, config2);
          var textureState = createTextureSet(gl, extensions, limits, function() {
            core.procs.poll();
          }, contextState, stats$$1, config2);
          var renderbufferState = wrapRenderbuffers(gl, extensions, limits, stats$$1, config2);
          var framebufferState = wrapFBOState(gl, extensions, limits, textureState, renderbufferState, stats$$1);
          var core = reglCore(gl, stringStore, extensions, limits, bufferState, elementState, textureState, framebufferState, uniformState, attributeState, shaderState, drawState, contextState, timer, config2);
          var readPixels = wrapReadPixels(gl, framebufferState, core.procs.poll, contextState, glAttributes, extensions, limits);
          var nextState = core.next;
          var canvas = gl.canvas;
          var rafCallbacks = [];
          var lossCallbacks = [];
          var restoreCallbacks = [];
          var destroyCallbacks = [config2.onDestroy];
          var activeRAF = null;
          function handleRAF() {
            if (rafCallbacks.length === 0) {
              if (timer) {
                timer.update();
              }
              activeRAF = null;
              return;
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
          function startRAF() {
            if (!activeRAF && rafCallbacks.length > 0) {
              activeRAF = raf.next(handleRAF);
            }
          }
          function stopRAF() {
            if (activeRAF) {
              raf.cancel(handleRAF);
              activeRAF = null;
            }
          }
          function handleContextLoss(event) {
            event.preventDefault();
            contextLost = true;
            stopRAF();
            lossCallbacks.forEach(function(cb) {
              cb();
            });
          }
          function handleContextRestored(event) {
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
            restoreCallbacks.forEach(function(cb) {
              cb();
            });
          }
          if (canvas) {
            canvas.addEventListener(CONTEXT_LOST_EVENT, handleContextLoss, false);
            canvas.addEventListener(CONTEXT_RESTORED_EVENT, handleContextRestored, false);
          }
          function destroy() {
            rafCallbacks.length = 0;
            stopRAF();
            if (canvas) {
              canvas.removeEventListener(CONTEXT_LOST_EVENT, handleContextLoss);
              canvas.removeEventListener(CONTEXT_RESTORED_EVENT, handleContextRestored);
            }
            shaderState.clear();
            framebufferState.clear();
            renderbufferState.clear();
            attributeState.clear();
            textureState.clear();
            elementState.clear();
            bufferState.clear();
            if (timer) {
              timer.clear();
            }
            destroyCallbacks.forEach(function(cb) {
              cb();
            });
          }
          function compileProcedure(options) {
            check$1(!!options, "invalid args to regl({...})");
            check$1.type(options, "object", "invalid args to regl({...})");
            function flattenNestedOptions(options2) {
              var result = extend({}, options2);
              delete result.uniforms;
              delete result.attributes;
              delete result.context;
              delete result.vao;
              if ("stencil" in result && result.stencil.op) {
                result.stencil.opBack = result.stencil.opFront = result.stencil.op;
                delete result.stencil.op;
              }
              function merge2(name) {
                if (name in result) {
                  var child = result[name];
                  delete result[name];
                  Object.keys(child).forEach(function(prop) {
                    result[name + "." + prop] = child[prop];
                  });
                }
              }
              merge2("blend");
              merge2("depth");
              merge2("cull");
              merge2("stencil");
              merge2("polygonOffset");
              merge2("scissor");
              merge2("sample");
              if ("vao" in options2) {
                result.vao = options2.vao;
              }
              return result;
            }
            function separateDynamic(object, useArrays) {
              var staticItems = {};
              var dynamicItems = {};
              Object.keys(object).forEach(function(option) {
                var value = object[option];
                if (dynamic.isDynamic(value)) {
                  dynamicItems[option] = dynamic.unbox(value, option);
                  return;
                } else if (useArrays && Array.isArray(value)) {
                  for (var i = 0; i < value.length; ++i) {
                    if (dynamic.isDynamic(value[i])) {
                      dynamicItems[option] = dynamic.unbox(value, option);
                      return;
                    }
                  }
                }
                staticItems[option] = value;
              });
              return {
                dynamic: dynamicItems,
                static: staticItems
              };
            }
            var context = separateDynamic(options.context || {}, true);
            var uniforms = separateDynamic(options.uniforms || {}, true);
            var attributes = separateDynamic(options.attributes || {}, false);
            var opts = separateDynamic(flattenNestedOptions(options), false);
            var stats$$12 = {
              gpuTime: 0,
              cpuTime: 0,
              count: 0
            };
            var compiled = core.compile(opts, attributes, uniforms, context, stats$$12);
            var draw = compiled.draw;
            var batch = compiled.batch;
            var scope = compiled.scope;
            var EMPTY_ARRAY = [];
            function reserve(count) {
              while (EMPTY_ARRAY.length < count) {
                EMPTY_ARRAY.push(null);
              }
              return EMPTY_ARRAY;
            }
            function REGLCommand(args2, body) {
              var i;
              if (contextLost) {
                check$1.raise("context lost");
              }
              if (typeof args2 === "function") {
                return scope.call(this, null, args2, 0);
              } else if (typeof body === "function") {
                if (typeof args2 === "number") {
                  for (i = 0; i < args2; ++i) {
                    scope.call(this, null, body, i);
                  }
                } else if (Array.isArray(args2)) {
                  for (i = 0; i < args2.length; ++i) {
                    scope.call(this, args2[i], body, i);
                  }
                } else {
                  return scope.call(this, args2, body, 0);
                }
              } else if (typeof args2 === "number") {
                if (args2 > 0) {
                  return batch.call(this, reserve(args2 | 0), args2 | 0);
                }
              } else if (Array.isArray(args2)) {
                if (args2.length) {
                  return batch.call(this, args2, args2.length);
                }
              } else {
                return draw.call(this, args2);
              }
            }
            return extend(REGLCommand, {
              stats: stats$$12,
              destroy: function() {
                compiled.destroy();
              }
            });
          }
          var setFBO = framebufferState.setFBO = compileProcedure({
            framebuffer: dynamic.define.call(null, DYN_PROP, "framebuffer")
          });
          function clearImpl(_, options) {
            var clearFlags = 0;
            core.procs.poll();
            var c2 = options.color;
            if (c2) {
              gl.clearColor(+c2[0] || 0, +c2[1] || 0, +c2[2] || 0, +c2[3] || 0);
              clearFlags |= GL_COLOR_BUFFER_BIT;
            }
            if ("depth" in options) {
              gl.clearDepth(+options.depth);
              clearFlags |= GL_DEPTH_BUFFER_BIT;
            }
            if ("stencil" in options) {
              gl.clearStencil(options.stencil | 0);
              clearFlags |= GL_STENCIL_BUFFER_BIT;
            }
            check$1(!!clearFlags, "called regl.clear with no buffer specified");
            gl.clear(clearFlags);
          }
          function clear(options) {
            check$1(typeof options === "object" && options, "regl.clear() takes an object as input");
            if ("framebuffer" in options) {
              if (options.framebuffer && options.framebuffer_reglType === "framebufferCube") {
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
          function frame(cb) {
            check$1.type(cb, "function", "regl.frame() callback must be a function");
            rafCallbacks.push(cb);
            function cancel() {
              var i = find(rafCallbacks, cb);
              check$1(i >= 0, "cannot cancel a frame twice");
              function pendingCancel() {
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
              cancel
            };
          }
          function pollViewport() {
            var viewport = nextState.viewport;
            var scissorBox = nextState.scissor_box;
            viewport[0] = viewport[1] = scissorBox[0] = scissorBox[1] = 0;
            contextState.viewportWidth = contextState.framebufferWidth = contextState.drawingBufferWidth = viewport[2] = scissorBox[2] = gl.drawingBufferWidth;
            contextState.viewportHeight = contextState.framebufferHeight = contextState.drawingBufferHeight = viewport[3] = scissorBox[3] = gl.drawingBufferHeight;
          }
          function poll() {
            contextState.tick += 1;
            contextState.time = now();
            pollViewport();
            core.procs.poll();
          }
          function refresh() {
            textureState.refresh();
            pollViewport();
            core.procs.refresh();
            if (timer) {
              timer.update();
            }
          }
          function now() {
            return (clock() - START_TIME) / 1e3;
          }
          refresh();
          function addListener(event, callback) {
            check$1.type(callback, "function", "listener callback must be a function");
            var callbacks;
            switch (event) {
              case "frame":
                return frame(callback);
              case "lost":
                callbacks = lossCallbacks;
                break;
              case "restore":
                callbacks = restoreCallbacks;
                break;
              case "destroy":
                callbacks = destroyCallbacks;
                break;
              default:
                check$1.raise("invalid event, must be one of frame,lost,restore,destroy");
            }
            callbacks.push(callback);
            return {
              cancel: function() {
                for (var i = 0; i < callbacks.length; ++i) {
                  if (callbacks[i] === callback) {
                    callbacks[i] = callbacks[callbacks.length - 1];
                    callbacks.pop();
                    return;
                  }
                }
              }
            };
          }
          var regl = extend(compileProcedure, {
            clear,
            prop: dynamic.define.bind(null, DYN_PROP),
            context: dynamic.define.bind(null, DYN_CONTEXT),
            this: dynamic.define.bind(null, DYN_STATE),
            draw: compileProcedure({}),
            buffer: function(options) {
              return bufferState.create(options, GL_ARRAY_BUFFER, false, false);
            },
            elements: function(options) {
              return elementState.create(options, false);
            },
            texture: textureState.create2D,
            cube: textureState.createCube,
            renderbuffer: renderbufferState.create,
            framebuffer: framebufferState.create,
            framebufferCube: framebufferState.createCube,
            vao: attributeState.createVAO,
            attributes: glAttributes,
            frame,
            on: addListener,
            limits,
            hasExtension: function(name) {
              return limits.extensions.indexOf(name.toLowerCase()) >= 0;
            },
            read: readPixels,
            destroy,
            _gl: gl,
            _refresh: refresh,
            poll: function() {
              poll();
              if (timer) {
                timer.update();
              }
            },
            now,
            stats: stats$$1
          });
          config2.onDone(null, regl);
          return regl;
        }
        return wrapREGL;
      });
    }
  });

  // ../../../node_modules/b-spline/index.js
  var require_b_spline = __commonJS({
    "../../../node_modules/b-spline/index.js"(exports, module) {
      function interpolate(t, degree, points, knots, weights, result) {
        var i, j, s, l;
        var n = points.length;
        var d = points[0].length;
        if (degree < 1)
          throw new Error("degree must be at least 1 (linear)");
        if (degree > n - 1)
          throw new Error("degree must be less than or equal to point count - 1");
        if (!weights) {
          weights = [];
          for (i = 0; i < n; i++) {
            weights[i] = 1;
          }
        }
        if (!knots) {
          var knots = [];
          for (i = 0; i < n + degree + 1; i++) {
            knots[i] = i;
          }
        } else {
          if (knots.length !== n + degree + 1)
            throw new Error("bad knot vector length");
        }
        var domain = [
          degree,
          knots.length - 1 - degree
        ];
        var low = knots[domain[0]];
        var high = knots[domain[1]];
        t = t * (high - low) + low;
        if (t < low || t > high)
          throw new Error("out of bounds");
        for (s = domain[0]; s < domain[1]; s++) {
          if (t >= knots[s] && t <= knots[s + 1]) {
            break;
          }
        }
        var v = [];
        for (i = 0; i < n; i++) {
          v[i] = [];
          for (j = 0; j < d; j++) {
            v[i][j] = points[i][j] * weights[i];
          }
          v[i][d] = weights[i];
        }
        var alpha;
        for (l = 1; l <= degree + 1; l++) {
          for (i = s; i > s - degree - 1 + l; i--) {
            alpha = (t - knots[i]) / (knots[i + degree + 1 - l] - knots[i]);
            for (j = 0; j < d + 1; j++) {
              v[i][j] = (1 - alpha) * v[i - 1][j] + alpha * v[i][j];
            }
          }
        }
        var result = result || [];
        for (i = 0; i < d; i++) {
          result[i] = v[s][i] / v[s][d];
        }
        return result;
      }
      module.exports = interpolate;
    }
  });

  // ../../../node_modules/regl/dist/regl.min.js
  var require_regl_min = __commonJS({
    "../../../node_modules/regl/dist/regl.min.js"(exports, module) {
      (function(Z2, ka) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = ka() : typeof define === "function" && define.amd ? define(ka) : Z2.createREGL = ka();
      })(exports, function() {
        function Z2(a, b) {
          this.id = Db++;
          this.type = a;
          this.data = b;
        }
        function ka(a) {
          if (a.length === 0)
            return [];
          var b = a.charAt(0), c2 = a.charAt(a.length - 1);
          if (1 < a.length && b === c2 && (b === '"' || b === "'"))
            return ['"' + a.substr(1, a.length - 2).replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'];
          if (b = /\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(a))
            return ka(a.substr(0, b.index)).concat(ka(b[1])).concat(ka(a.substr(b.index + b[0].length)));
          b = a.split(".");
          if (b.length === 1)
            return ['"' + a.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"'];
          a = [];
          for (c2 = 0; c2 < b.length; ++c2)
            a = a.concat(ka(b[c2]));
          return a;
        }
        function cb(a) {
          return "[" + ka(a).join("][") + "]";
        }
        function db(a, b) {
          if (typeof a === "function")
            return new Z2(0, a);
          if (typeof a === "number" || typeof a === "boolean")
            return new Z2(5, a);
          if (Array.isArray(a))
            return new Z2(6, a.map(function(a2, e) {
              return db(a2, b + "[" + e + "]");
            }));
          if (a instanceof Z2)
            return a;
        }
        function Eb() {
          var a = { "": 0 }, b = [""];
          return { id: function(c2) {
            var e = a[c2];
            if (e)
              return e;
            e = a[c2] = b.length;
            b.push(c2);
            return e;
          }, str: function(a2) {
            return b[a2];
          } };
        }
        function Fb(a, b, c2) {
          function e() {
            var b2 = window.innerWidth, e2 = window.innerHeight;
            a !== document.body && (e2 = f.getBoundingClientRect(), b2 = e2.right - e2.left, e2 = e2.bottom - e2.top);
            f.width = c2 * b2;
            f.height = c2 * e2;
          }
          var f = document.createElement("canvas");
          L(f.style, { border: 0, margin: 0, padding: 0, top: 0, left: 0, width: "100%", height: "100%" });
          a.appendChild(f);
          a === document.body && (f.style.position = "absolute", L(a.style, { margin: 0, padding: 0 }));
          var d;
          a !== document.body && typeof ResizeObserver === "function" ? (d = new ResizeObserver(function() {
            setTimeout(e);
          }), d.observe(a)) : window.addEventListener("resize", e, false);
          e();
          return { canvas: f, onDestroy: function() {
            d ? d.disconnect() : window.removeEventListener("resize", e);
            a.removeChild(f);
          } };
        }
        function Gb(a, b) {
          function c2(c3) {
            try {
              return a.getContext(c3, b);
            } catch (f) {
              return null;
            }
          }
          return c2("webgl") || c2("experimental-webgl") || c2("webgl-experimental");
        }
        function eb(a) {
          return typeof a === "string" ? a.split() : a;
        }
        function fb(a) {
          return typeof a === "string" ? document.querySelector(a) : a;
        }
        function Hb(a) {
          var b = a || {}, c2, e, f, d;
          a = {};
          var q = [], n = [], v = typeof window === "undefined" ? 1 : window.devicePixelRatio, k = false, u = function(a2) {
          }, m = function() {
          };
          typeof b === "string" ? c2 = document.querySelector(b) : typeof b === "object" && (typeof b.nodeName === "string" && typeof b.appendChild === "function" && typeof b.getBoundingClientRect === "function" ? c2 = b : typeof b.drawArrays === "function" || typeof b.drawElements === "function" ? (d = b, f = d.canvas) : ("gl" in b ? d = b.gl : "canvas" in b ? f = fb(b.canvas) : "container" in b && (e = fb(b.container)), "attributes" in b && (a = b.attributes), "extensions" in b && (q = eb(b.extensions)), "optionalExtensions" in b && (n = eb(b.optionalExtensions)), "onDone" in b && (u = b.onDone), "profile" in b && (k = !!b.profile), "pixelRatio" in b && (v = +b.pixelRatio)));
          c2 && (c2.nodeName.toLowerCase() === "canvas" ? f = c2 : e = c2);
          if (!d) {
            if (!f) {
              c2 = Fb(e || document.body, u, v);
              if (!c2)
                return null;
              f = c2.canvas;
              m = c2.onDestroy;
            }
            a.premultipliedAlpha === void 0 && (a.premultipliedAlpha = true);
            d = Gb(f, a);
          }
          return d ? {
            gl: d,
            canvas: f,
            container: e,
            extensions: q,
            optionalExtensions: n,
            pixelRatio: v,
            profile: k,
            onDone: u,
            onDestroy: m
          } : (m(), u("webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org"), null);
        }
        function Ib(a, b) {
          function c2(b2) {
            b2 = b2.toLowerCase();
            var c3;
            try {
              c3 = e[b2] = a.getExtension(b2);
            } catch (f2) {
            }
            return !!c3;
          }
          for (var e = {}, f = 0; f < b.extensions.length; ++f) {
            var d = b.extensions[f];
            if (!c2(d))
              return b.onDestroy(), b.onDone('"' + d + '" extension is not supported by the current WebGL context, try upgrading your system or a different browser'), null;
          }
          b.optionalExtensions.forEach(c2);
          return { extensions: e, restore: function() {
            Object.keys(e).forEach(function(a2) {
              if (e[a2] && !c2(a2))
                throw Error("(regl): error restoring extension " + a2);
            });
          } };
        }
        function R3(a, b) {
          for (var c2 = Array(a), e = 0; e < a; ++e)
            c2[e] = b(e);
          return c2;
        }
        function gb(a) {
          var b, c2;
          b = (65535 < a) << 4;
          a >>>= b;
          c2 = (255 < a) << 3;
          a >>>= c2;
          b |= c2;
          c2 = (15 < a) << 2;
          a >>>= c2;
          b |= c2;
          c2 = (3 < a) << 1;
          return b | c2 | a >>> c2 >> 1;
        }
        function hb() {
          function a(a2) {
            a: {
              for (var b2 = 16; 268435456 >= b2; b2 *= 16)
                if (a2 <= b2) {
                  a2 = b2;
                  break a;
                }
              a2 = 0;
            }
            b2 = c2[gb(a2) >> 2];
            return 0 < b2.length ? b2.pop() : new ArrayBuffer(a2);
          }
          function b(a2) {
            c2[gb(a2.byteLength) >> 2].push(a2);
          }
          var c2 = R3(8, function() {
            return [];
          });
          return { alloc: a, free: b, allocType: function(b2, c3) {
            var d = null;
            switch (b2) {
              case 5120:
                d = new Int8Array(a(c3), 0, c3);
                break;
              case 5121:
                d = new Uint8Array(a(c3), 0, c3);
                break;
              case 5122:
                d = new Int16Array(a(2 * c3), 0, c3);
                break;
              case 5123:
                d = new Uint16Array(a(2 * c3), 0, c3);
                break;
              case 5124:
                d = new Int32Array(a(4 * c3), 0, c3);
                break;
              case 5125:
                d = new Uint32Array(a(4 * c3), 0, c3);
                break;
              case 5126:
                d = new Float32Array(a(4 * c3), 0, c3);
                break;
              default:
                return null;
            }
            return d.length !== c3 ? d.subarray(0, c3) : d;
          }, freeType: function(a2) {
            b(a2.buffer);
          } };
        }
        function la(a) {
          return !!a && typeof a === "object" && Array.isArray(a.shape) && Array.isArray(a.stride) && typeof a.offset === "number" && a.shape.length === a.stride.length && (Array.isArray(a.data) || O(a.data));
        }
        function ib(a, b, c2, e, f, d) {
          for (var q = 0; q < b; ++q)
            for (var n = a[q], v = 0; v < c2; ++v)
              for (var k = n[v], u = 0; u < e; ++u)
                f[d++] = k[u];
        }
        function jb(a, b, c2, e, f) {
          for (var d = 1, q = c2 + 1; q < b.length; ++q)
            d *= b[q];
          var n = b[c2];
          if (b.length - c2 === 4) {
            var v = b[c2 + 1], k = b[c2 + 2];
            b = b[c2 + 3];
            for (q = 0; q < n; ++q)
              ib(a[q], v, k, b, e, f), f += d;
          } else
            for (q = 0; q < n; ++q)
              jb(a[q], b, c2 + 1, e, f), f += d;
        }
        function Ha(a) {
          return Ia[Object.prototype.toString.call(a)] | 0;
        }
        function kb(a, b) {
          for (var c2 = 0; c2 < b.length; ++c2)
            a[c2] = b[c2];
        }
        function lb(a, b, c2, e, f, d, q) {
          for (var n = 0, v = 0; v < c2; ++v)
            for (var k = 0; k < e; ++k)
              a[n++] = b[f * v + d * k + q];
        }
        function Jb(a, b, c2, e) {
          function f(b2) {
            this.id = v++;
            this.buffer = a.createBuffer();
            this.type = b2;
            this.usage = 35044;
            this.byteLength = 0;
            this.dimension = 1;
            this.dtype = 5121;
            this.persistentData = null;
            c2.profile && (this.stats = { size: 0 });
          }
          function d(b2, c3, l) {
            b2.byteLength = c3.byteLength;
            a.bufferData(b2.type, c3, l);
          }
          function q(a2, b2, c3, g, h, r) {
            a2.usage = c3;
            if (Array.isArray(b2)) {
              if (a2.dtype = g || 5126, 0 < b2.length)
                if (Array.isArray(b2[0])) {
                  h = mb(b2);
                  for (var p = g = 1; p < h.length; ++p)
                    g *= h[p];
                  a2.dimension = g;
                  b2 = Ua(b2, h, a2.dtype);
                  d(a2, b2, c3);
                  r ? a2.persistentData = b2 : G.freeType(b2);
                } else
                  typeof b2[0] === "number" ? (a2.dimension = h, h = G.allocType(a2.dtype, b2.length), kb(h, b2), d(a2, h, c3), r ? a2.persistentData = h : G.freeType(h)) : O(b2[0]) && (a2.dimension = b2[0].length, a2.dtype = g || Ha(b2[0]) || 5126, b2 = Ua(b2, [b2.length, b2[0].length], a2.dtype), d(a2, b2, c3), r ? a2.persistentData = b2 : G.freeType(b2));
            } else if (O(b2))
              a2.dtype = g || Ha(b2), a2.dimension = h, d(a2, b2, c3), r && (a2.persistentData = new Uint8Array(new Uint8Array(b2.buffer)));
            else if (la(b2)) {
              h = b2.shape;
              var e2 = b2.stride, p = b2.offset, t = 0, ma = 0, f2 = 0, k2 = 0;
              h.length === 1 ? (t = h[0], ma = 1, f2 = e2[0], k2 = 0) : h.length === 2 && (t = h[0], ma = h[1], f2 = e2[0], k2 = e2[1]);
              a2.dtype = g || Ha(b2.data) || 5126;
              a2.dimension = ma;
              h = G.allocType(a2.dtype, t * ma);
              lb(h, b2.data, t, ma, f2, k2, p);
              d(a2, h, c3);
              r ? a2.persistentData = h : G.freeType(h);
            } else
              b2 instanceof ArrayBuffer && (a2.dtype = 5121, a2.dimension = h, d(a2, b2, c3), r && (a2.persistentData = new Uint8Array(new Uint8Array(b2))));
          }
          function n(c3) {
            b.bufferCount--;
            e(c3);
            a.deleteBuffer(c3.buffer);
            c3.buffer = null;
            delete k[c3.id];
          }
          var v = 0, k = {};
          f.prototype.bind = function() {
            a.bindBuffer(this.type, this.buffer);
          };
          f.prototype.destroy = function() {
            n(this);
          };
          var u = [];
          c2.profile && (b.getTotalBufferSize = function() {
            var a2 = 0;
            Object.keys(k).forEach(function(b2) {
              a2 += k[b2].stats.size;
            });
            return a2;
          });
          return { create: function(m, e2, d2, g) {
            function h(b2) {
              var e3 = 35044, t = null, d3 = 0, m2 = 0, f2 = 1;
              Array.isArray(b2) || O(b2) || la(b2) || b2 instanceof ArrayBuffer ? t = b2 : typeof b2 === "number" ? d3 = b2 | 0 : b2 && ("data" in b2 && (t = b2.data), "usage" in b2 && (e3 = nb[b2.usage]), "type" in b2 && (m2 = Ja[b2.type]), "dimension" in b2 && (f2 = b2.dimension | 0), "length" in b2 && (d3 = b2.length | 0));
              r.bind();
              t ? q(r, t, e3, m2, f2, g) : (d3 && a.bufferData(r.type, d3, e3), r.dtype = m2 || 5121, r.usage = e3, r.dimension = f2, r.byteLength = d3);
              c2.profile && (r.stats.size = r.byteLength * na[r.dtype]);
              return h;
            }
            b.bufferCount++;
            var r = new f(e2);
            k[r.id] = r;
            d2 || h(m);
            h._reglType = "buffer";
            h._buffer = r;
            h.subdata = function(b2, c3) {
              var t = (c3 || 0) | 0, d3;
              r.bind();
              if (O(b2) || b2 instanceof ArrayBuffer)
                a.bufferSubData(r.type, t, b2);
              else if (Array.isArray(b2)) {
                if (0 < b2.length) {
                  if (typeof b2[0] === "number") {
                    var e3 = G.allocType(r.dtype, b2.length);
                    kb(e3, b2);
                    a.bufferSubData(r.type, t, e3);
                    G.freeType(e3);
                  } else if (Array.isArray(b2[0]) || O(b2[0]))
                    d3 = mb(b2), e3 = Ua(b2, d3, r.dtype), a.bufferSubData(r.type, t, e3), G.freeType(e3);
                }
              } else if (la(b2)) {
                d3 = b2.shape;
                var m2 = b2.stride, g2 = e3 = 0, f2 = 0, y = 0;
                d3.length === 1 ? (e3 = d3[0], g2 = 1, f2 = m2[0], y = 0) : d3.length === 2 && (e3 = d3[0], g2 = d3[1], f2 = m2[0], y = m2[1]);
                d3 = Array.isArray(b2.data) ? r.dtype : Ha(b2.data);
                d3 = G.allocType(d3, e3 * g2);
                lb(d3, b2.data, e3, g2, f2, y, b2.offset);
                a.bufferSubData(r.type, t, d3);
                G.freeType(d3);
              }
              return h;
            };
            c2.profile && (h.stats = r.stats);
            h.destroy = function() {
              n(r);
            };
            return h;
          }, createStream: function(a2, b2) {
            var c3 = u.pop();
            c3 || (c3 = new f(a2));
            c3.bind();
            q(c3, b2, 35040, 0, 1, false);
            return c3;
          }, destroyStream: function(a2) {
            u.push(a2);
          }, clear: function() {
            I(k).forEach(n);
            u.forEach(n);
          }, getBuffer: function(a2) {
            return a2 && a2._buffer instanceof f ? a2._buffer : null;
          }, restore: function() {
            I(k).forEach(function(b2) {
              b2.buffer = a.createBuffer();
              a.bindBuffer(b2.type, b2.buffer);
              a.bufferData(b2.type, b2.persistentData || b2.byteLength, b2.usage);
            });
          }, _initBuffer: q };
        }
        function Kb(a, b, c2, e) {
          function f(a2) {
            this.id = v++;
            n[this.id] = this;
            this.buffer = a2;
            this.primType = 4;
            this.type = this.vertCount = 0;
          }
          function d(d2, e2, f2, g, h, r, p) {
            d2.buffer.bind();
            var k2;
            e2 ? ((k2 = p) || O(e2) && (!la(e2) || O(e2.data)) || (k2 = b.oes_element_index_uint ? 5125 : 5123), c2._initBuffer(d2.buffer, e2, f2, k2, 3)) : (a.bufferData(34963, r, f2), d2.buffer.dtype = k2 || 5121, d2.buffer.usage = f2, d2.buffer.dimension = 3, d2.buffer.byteLength = r);
            k2 = p;
            if (!p) {
              switch (d2.buffer.dtype) {
                case 5121:
                case 5120:
                  k2 = 5121;
                  break;
                case 5123:
                case 5122:
                  k2 = 5123;
                  break;
                case 5125:
                case 5124:
                  k2 = 5125;
              }
              d2.buffer.dtype = k2;
            }
            d2.type = k2;
            e2 = h;
            0 > e2 && (e2 = d2.buffer.byteLength, k2 === 5123 ? e2 >>= 1 : k2 === 5125 && (e2 >>= 2));
            d2.vertCount = e2;
            e2 = g;
            0 > g && (e2 = 4, g = d2.buffer.dimension, g === 1 && (e2 = 0), g === 2 && (e2 = 1), g === 3 && (e2 = 4));
            d2.primType = e2;
          }
          function q(a2) {
            e.elementsCount--;
            delete n[a2.id];
            a2.buffer.destroy();
            a2.buffer = null;
          }
          var n = {}, v = 0, k = { uint8: 5121, uint16: 5123 };
          b.oes_element_index_uint && (k.uint32 = 5125);
          f.prototype.bind = function() {
            this.buffer.bind();
          };
          var u = [];
          return { create: function(a2, b2) {
            function l(a3) {
              if (a3)
                if (typeof a3 === "number")
                  g(a3), h.primType = 4, h.vertCount = a3 | 0, h.type = 5121;
                else {
                  var b3 = null, c3 = 35044, e2 = -1, f2 = -1, m = 0, n2 = 0;
                  if (Array.isArray(a3) || O(a3) || la(a3))
                    b3 = a3;
                  else if ("data" in a3 && (b3 = a3.data), "usage" in a3 && (c3 = nb[a3.usage]), "primitive" in a3 && (e2 = Ka[a3.primitive]), "count" in a3 && (f2 = a3.count | 0), "type" in a3 && (n2 = k[a3.type]), "length" in a3)
                    m = a3.length | 0;
                  else if (m = f2, n2 === 5123 || n2 === 5122)
                    m *= 2;
                  else if (n2 === 5125 || n2 === 5124)
                    m *= 4;
                  d(h, b3, c3, e2, f2, m, n2);
                }
              else
                g(), h.primType = 4, h.vertCount = 0, h.type = 5121;
              return l;
            }
            var g = c2.create(null, 34963, true), h = new f(g._buffer);
            e.elementsCount++;
            l(a2);
            l._reglType = "elements";
            l._elements = h;
            l.subdata = function(a3, b3) {
              g.subdata(a3, b3);
              return l;
            };
            l.destroy = function() {
              q(h);
            };
            return l;
          }, createStream: function(a2) {
            var b2 = u.pop();
            b2 || (b2 = new f(c2.create(null, 34963, true, false)._buffer));
            d(b2, a2, 35040, -1, -1, 0, 0);
            return b2;
          }, destroyStream: function(a2) {
            u.push(a2);
          }, getElements: function(a2) {
            return typeof a2 === "function" && a2._elements instanceof f ? a2._elements : null;
          }, clear: function() {
            I(n).forEach(q);
          } };
        }
        function ob(a) {
          for (var b = G.allocType(5123, a.length), c2 = 0; c2 < a.length; ++c2)
            if (isNaN(a[c2]))
              b[c2] = 65535;
            else if (a[c2] === Infinity)
              b[c2] = 31744;
            else if (a[c2] === -Infinity)
              b[c2] = 64512;
            else {
              pb[0] = a[c2];
              var e = Lb[0], f = e >>> 31 << 15, d = (e << 1 >>> 24) - 127, e = e >> 13 & 1023;
              b[c2] = -24 > d ? f : -14 > d ? f + (e + 1024 >> -14 - d) : 15 < d ? f + 31744 : f + (d + 15 << 10) + e;
            }
          return b;
        }
        function ra(a) {
          return Array.isArray(a) || O(a);
        }
        function sa(a) {
          return "[object " + a + "]";
        }
        function qb(a) {
          return Array.isArray(a) && (a.length === 0 || typeof a[0] === "number");
        }
        function rb(a) {
          return Array.isArray(a) && a.length !== 0 && ra(a[0]) ? true : false;
        }
        function aa(a) {
          return Object.prototype.toString.call(a);
        }
        function Va(a) {
          if (!a)
            return false;
          var b = aa(a);
          return 0 <= Mb.indexOf(b) ? true : qb(a) || rb(a) || la(a);
        }
        function sb(a, b) {
          a.type === 36193 ? (a.data = ob(b), G.freeType(b)) : a.data = b;
        }
        function La(a, b, c2, e, f, d) {
          a = typeof C2[a] !== "undefined" ? C2[a] : U[a] * za[b];
          d && (a *= 6);
          if (f) {
            for (e = 0; 1 <= c2; )
              e += a * c2 * c2, c2 /= 2;
            return e;
          }
          return a * c2 * e;
        }
        function Nb(a, b, c2, e, f, d, q) {
          function n() {
            this.format = this.internalformat = 6408;
            this.type = 5121;
            this.flipY = this.premultiplyAlpha = this.compressed = false;
            this.unpackAlignment = 1;
            this.colorSpace = 37444;
            this.channels = this.height = this.width = 0;
          }
          function v(a2, b2) {
            a2.internalformat = b2.internalformat;
            a2.format = b2.format;
            a2.type = b2.type;
            a2.compressed = b2.compressed;
            a2.premultiplyAlpha = b2.premultiplyAlpha;
            a2.flipY = b2.flipY;
            a2.unpackAlignment = b2.unpackAlignment;
            a2.colorSpace = b2.colorSpace;
            a2.width = b2.width;
            a2.height = b2.height;
            a2.channels = b2.channels;
          }
          function k(a2, b2) {
            if (typeof b2 === "object" && b2) {
              "premultiplyAlpha" in b2 && (a2.premultiplyAlpha = b2.premultiplyAlpha);
              "flipY" in b2 && (a2.flipY = b2.flipY);
              "alignment" in b2 && (a2.unpackAlignment = b2.alignment);
              "colorSpace" in b2 && (a2.colorSpace = Ob[b2.colorSpace]);
              "type" in b2 && (a2.type = N[b2.type]);
              var c3 = a2.width, e2 = a2.height, d2 = a2.channels, f2 = false;
              "shape" in b2 ? (c3 = b2.shape[0], e2 = b2.shape[1], b2.shape.length === 3 && (d2 = b2.shape[2], f2 = true)) : ("radius" in b2 && (c3 = e2 = b2.radius), "width" in b2 && (c3 = b2.width), "height" in b2 && (e2 = b2.height), "channels" in b2 && (d2 = b2.channels, f2 = true));
              a2.width = c3 | 0;
              a2.height = e2 | 0;
              a2.channels = d2 | 0;
              c3 = false;
              "format" in b2 && (c3 = b2.format, e2 = a2.internalformat = E[c3], a2.format = V[e2], c3 in N && !("type" in b2) && (a2.type = N[c3]), c3 in ga && (a2.compressed = true), c3 = true);
              !f2 && c3 ? a2.channels = U[a2.format] : f2 && !c3 && a2.channels !== Oa[a2.format] && (a2.format = a2.internalformat = Oa[a2.channels]);
            }
          }
          function u(b2) {
            a.pixelStorei(37440, b2.flipY);
            a.pixelStorei(37441, b2.premultiplyAlpha);
            a.pixelStorei(37443, b2.colorSpace);
            a.pixelStorei(3317, b2.unpackAlignment);
          }
          function m() {
            n.call(this);
            this.yOffset = this.xOffset = 0;
            this.data = null;
            this.needsFree = false;
            this.element = null;
            this.needsCopy = false;
          }
          function x(a2, b2) {
            var c3 = null;
            Va(b2) ? c3 = b2 : b2 && (k(a2, b2), "x" in b2 && (a2.xOffset = b2.x | 0), "y" in b2 && (a2.yOffset = b2.y | 0), Va(b2.data) && (c3 = b2.data));
            if (b2.copy) {
              var e2 = f.viewportWidth, d2 = f.viewportHeight;
              a2.width = a2.width || e2 - a2.xOffset;
              a2.height = a2.height || d2 - a2.yOffset;
              a2.needsCopy = true;
            } else if (!c3)
              a2.width = a2.width || 1, a2.height = a2.height || 1, a2.channels = a2.channels || 4;
            else if (O(c3))
              a2.channels = a2.channels || 4, a2.data = c3, "type" in b2 || a2.type !== 5121 || (a2.type = Ia[Object.prototype.toString.call(c3)] | 0);
            else if (qb(c3)) {
              a2.channels = a2.channels || 4;
              e2 = c3;
              d2 = e2.length;
              switch (a2.type) {
                case 5121:
                case 5123:
                case 5125:
                case 5126:
                  d2 = G.allocType(a2.type, d2);
                  d2.set(e2);
                  a2.data = d2;
                  break;
                case 36193:
                  a2.data = ob(e2);
              }
              a2.alignment = 1;
              a2.needsFree = true;
            } else if (la(c3)) {
              e2 = c3.data;
              Array.isArray(e2) || a2.type !== 5121 || (a2.type = Ia[Object.prototype.toString.call(e2)] | 0);
              var d2 = c3.shape, h2 = c3.stride, y2, t2, g2, p2;
              d2.length === 3 ? (g2 = d2[2], p2 = h2[2]) : p2 = g2 = 1;
              y2 = d2[0];
              t2 = d2[1];
              d2 = h2[0];
              h2 = h2[1];
              a2.alignment = 1;
              a2.width = y2;
              a2.height = t2;
              a2.channels = g2;
              a2.format = a2.internalformat = Oa[g2];
              a2.needsFree = true;
              y2 = p2;
              c3 = c3.offset;
              g2 = a2.width;
              p2 = a2.height;
              t2 = a2.channels;
              for (var z = G.allocType(a2.type === 36193 ? 5126 : a2.type, g2 * p2 * t2), B = 0, ha = 0; ha < p2; ++ha)
                for (var oa = 0; oa < g2; ++oa)
                  for (var Wa = 0; Wa < t2; ++Wa)
                    z[B++] = e2[d2 * oa + h2 * ha + y2 * Wa + c3];
              sb(a2, z);
            } else if (aa(c3) === Xa || aa(c3) === Ya || aa(c3) === ub)
              aa(c3) === Xa || aa(c3) === Ya ? a2.element = c3 : a2.element = c3.canvas, a2.width = a2.element.width, a2.height = a2.element.height, a2.channels = 4;
            else if (aa(c3) === vb)
              a2.element = c3, a2.width = c3.width, a2.height = c3.height, a2.channels = 4;
            else if (aa(c3) === wb)
              a2.element = c3, a2.width = c3.naturalWidth, a2.height = c3.naturalHeight, a2.channels = 4;
            else if (aa(c3) === xb)
              a2.element = c3, a2.width = c3.videoWidth, a2.height = c3.videoHeight, a2.channels = 4;
            else if (rb(c3)) {
              e2 = a2.width || c3[0].length;
              d2 = a2.height || c3.length;
              h2 = a2.channels;
              h2 = ra(c3[0][0]) ? h2 || c3[0][0].length : h2 || 1;
              y2 = Qa.shape(c3);
              g2 = 1;
              for (p2 = 0; p2 < y2.length; ++p2)
                g2 *= y2[p2];
              g2 = G.allocType(a2.type === 36193 ? 5126 : a2.type, g2);
              Qa.flatten(c3, y2, "", g2);
              sb(a2, g2);
              a2.alignment = 1;
              a2.width = e2;
              a2.height = d2;
              a2.channels = h2;
              a2.format = a2.internalformat = Oa[h2];
              a2.needsFree = true;
            }
          }
          function l(b2, c3, d2, h2, g2) {
            var y2 = b2.element, f2 = b2.data, p2 = b2.internalformat, t2 = b2.format, k2 = b2.type, z = b2.width, B = b2.height;
            u(b2);
            y2 ? a.texSubImage2D(c3, g2, d2, h2, t2, k2, y2) : b2.compressed ? a.compressedTexSubImage2D(c3, g2, d2, h2, p2, z, B, f2) : b2.needsCopy ? (e(), a.copyTexSubImage2D(c3, g2, d2, h2, b2.xOffset, b2.yOffset, z, B)) : a.texSubImage2D(c3, g2, d2, h2, z, B, t2, k2, f2);
          }
          function g() {
            return R4.pop() || new m();
          }
          function h(a2) {
            a2.needsFree && G.freeType(a2.data);
            m.call(a2);
            R4.push(a2);
          }
          function r() {
            n.call(this);
            this.genMipmaps = false;
            this.mipmapHint = 4352;
            this.mipmask = 0;
            this.images = Array(16);
          }
          function p(a2, b2, c3) {
            var d2 = a2.images[0] = g();
            a2.mipmask = 1;
            d2.width = a2.width = b2;
            d2.height = a2.height = c3;
            d2.channels = a2.channels = 4;
          }
          function P(a2, b2) {
            var c3 = null;
            if (Va(b2))
              c3 = a2.images[0] = g(), v(c3, a2), x(c3, b2), a2.mipmask = 1;
            else if (k(a2, b2), Array.isArray(b2.mipmap))
              for (var d2 = b2.mipmap, e2 = 0; e2 < d2.length; ++e2)
                c3 = a2.images[e2] = g(), v(c3, a2), c3.width >>= e2, c3.height >>= e2, x(c3, d2[e2]), a2.mipmask |= 1 << e2;
            else
              c3 = a2.images[0] = g(), v(c3, a2), x(c3, b2), a2.mipmask = 1;
            v(a2, a2.images[0]);
          }
          function t(b2, c3) {
            for (var d2 = b2.images, h2 = 0; h2 < d2.length && d2[h2]; ++h2) {
              var g2 = d2[h2], y2 = c3, f2 = h2, p2 = g2.element, t2 = g2.data, k2 = g2.internalformat, z = g2.format, B = g2.type, ha = g2.width, oa = g2.height;
              u(g2);
              p2 ? a.texImage2D(y2, f2, z, z, B, p2) : g2.compressed ? a.compressedTexImage2D(y2, f2, k2, ha, oa, 0, t2) : g2.needsCopy ? (e(), a.copyTexImage2D(y2, f2, z, g2.xOffset, g2.yOffset, ha, oa, 0)) : a.texImage2D(y2, f2, z, ha, oa, 0, z, B, t2 || null);
            }
          }
          function ma() {
            var a2 = Y3.pop() || new r();
            n.call(a2);
            for (var b2 = a2.mipmask = 0; 16 > b2; ++b2)
              a2.images[b2] = null;
            return a2;
          }
          function ya(a2) {
            for (var b2 = a2.images, c3 = 0; c3 < b2.length; ++c3)
              b2[c3] && h(b2[c3]), b2[c3] = null;
            Y3.push(a2);
          }
          function w2() {
            this.magFilter = this.minFilter = 9728;
            this.wrapT = this.wrapS = 33071;
            this.anisotropic = 1;
            this.genMipmaps = false;
            this.mipmapHint = 4352;
          }
          function H(a2, b2) {
            "min" in b2 && (a2.minFilter = Aa[b2.min], 0 <= Pb.indexOf(a2.minFilter) && !("faces" in b2) && (a2.genMipmaps = true));
            "mag" in b2 && (a2.magFilter = S[b2.mag]);
            var c3 = a2.wrapS, d2 = a2.wrapT;
            if ("wrap" in b2) {
              var e2 = b2.wrap;
              typeof e2 === "string" ? c3 = d2 = ia[e2] : Array.isArray(e2) && (c3 = ia[e2[0]], d2 = ia[e2[1]]);
            } else
              "wrapS" in b2 && (c3 = ia[b2.wrapS]), "wrapT" in b2 && (d2 = ia[b2.wrapT]);
            a2.wrapS = c3;
            a2.wrapT = d2;
            "anisotropic" in b2 && (a2.anisotropic = b2.anisotropic);
            if ("mipmap" in b2) {
              c3 = false;
              switch (typeof b2.mipmap) {
                case "string":
                  a2.mipmapHint = A[b2.mipmap];
                  c3 = a2.genMipmaps = true;
                  break;
                case "boolean":
                  c3 = a2.genMipmaps = b2.mipmap;
                  break;
                case "object":
                  a2.genMipmaps = false, c3 = true;
              }
              !c3 || "min" in b2 || (a2.minFilter = 9984);
            }
          }
          function M(c3, d2) {
            a.texParameteri(d2, 10241, c3.minFilter);
            a.texParameteri(d2, 10240, c3.magFilter);
            a.texParameteri(d2, 10242, c3.wrapS);
            a.texParameteri(d2, 10243, c3.wrapT);
            b.ext_texture_filter_anisotropic && a.texParameteri(d2, 34046, c3.anisotropic);
            c3.genMipmaps && (a.hint(33170, c3.mipmapHint), a.generateMipmap(d2));
          }
          function y(b2) {
            n.call(this);
            this.mipmask = 0;
            this.internalformat = 6408;
            this.id = Qb++;
            this.refCount = 1;
            this.target = b2;
            this.texture = a.createTexture();
            this.unit = -1;
            this.bindCount = 0;
            this.texInfo = new w2();
            q.profile && (this.stats = { size: 0 });
          }
          function T2(b2) {
            a.activeTexture(33984);
            a.bindTexture(b2.target, b2.texture);
          }
          function wa() {
            var b2 = W[0];
            b2 ? a.bindTexture(b2.target, b2.texture) : a.bindTexture(3553, null);
          }
          function F(b2) {
            var c3 = b2.texture, e2 = b2.unit, g2 = b2.target;
            0 <= e2 && (a.activeTexture(33984 + e2), a.bindTexture(g2, null), W[e2] = null);
            a.deleteTexture(c3);
            b2.texture = null;
            b2.params = null;
            b2.pixels = null;
            b2.refCount = 0;
            delete ea[b2.id];
            d.textureCount--;
          }
          var A = { "don't care": 4352, "dont care": 4352, nice: 4354, fast: 4353 }, ia = { repeat: 10497, clamp: 33071, mirror: 33648 }, S = { nearest: 9728, linear: 9729 }, Aa = L({
            mipmap: 9987,
            "nearest mipmap nearest": 9984,
            "linear mipmap nearest": 9985,
            "nearest mipmap linear": 9986,
            "linear mipmap linear": 9987
          }, S), Ob = { none: 0, browser: 37444 }, N = { uint8: 5121, rgba4: 32819, rgb565: 33635, "rgb5 a1": 32820 }, E = { alpha: 6406, luminance: 6409, "luminance alpha": 6410, rgb: 6407, rgba: 6408, rgba4: 32854, "rgb5 a1": 32855, rgb565: 36194 }, ga = {};
          b.ext_srgb && (E.srgb = 35904, E.srgba = 35906);
          b.oes_texture_float && (N.float32 = N["float"] = 5126);
          b.oes_texture_half_float && (N.float16 = N["half float"] = 36193);
          b.webgl_depth_texture && (L(E, { depth: 6402, "depth stencil": 34041 }), L(N, { uint16: 5123, uint32: 5125, "depth stencil": 34042 }));
          b.webgl_compressed_texture_s3tc && L(ga, { "rgb s3tc dxt1": 33776, "rgba s3tc dxt1": 33777, "rgba s3tc dxt3": 33778, "rgba s3tc dxt5": 33779 });
          b.webgl_compressed_texture_atc && L(ga, { "rgb atc": 35986, "rgba atc explicit alpha": 35987, "rgba atc interpolated alpha": 34798 });
          b.webgl_compressed_texture_pvrtc && L(ga, { "rgb pvrtc 4bppv1": 35840, "rgb pvrtc 2bppv1": 35841, "rgba pvrtc 4bppv1": 35842, "rgba pvrtc 2bppv1": 35843 });
          b.webgl_compressed_texture_etc1 && (ga["rgb etc1"] = 36196);
          var J2 = Array.prototype.slice.call(a.getParameter(34467));
          Object.keys(ga).forEach(function(a2) {
            var b2 = ga[a2];
            0 <= J2.indexOf(b2) && (E[a2] = b2);
          });
          var C3 = Object.keys(E);
          c2.textureFormats = C3;
          var ca = [];
          Object.keys(E).forEach(function(a2) {
            ca[E[a2]] = a2;
          });
          var K2 = [];
          Object.keys(N).forEach(function(a2) {
            K2[N[a2]] = a2;
          });
          var Fa = [];
          Object.keys(S).forEach(function(a2) {
            Fa[S[a2]] = a2;
          });
          var pa = [];
          Object.keys(Aa).forEach(function(a2) {
            pa[Aa[a2]] = a2;
          });
          var qa = [];
          Object.keys(ia).forEach(function(a2) {
            qa[ia[a2]] = a2;
          });
          var V = C3.reduce(function(a2, c3) {
            var d2 = E[c3];
            d2 === 6409 || d2 === 6406 || d2 === 6409 || d2 === 6410 || d2 === 6402 || d2 === 34041 || b.ext_srgb && (d2 === 35904 || d2 === 35906) ? a2[d2] = d2 : d2 === 32855 || 0 <= c3.indexOf("rgba") ? a2[d2] = 6408 : a2[d2] = 6407;
            return a2;
          }, {}), R4 = [], Y3 = [], Qb = 0, ea = {}, fa = c2.maxTextureUnits, W = Array(fa).map(function() {
            return null;
          });
          L(y.prototype, { bind: function() {
            this.bindCount += 1;
            var b2 = this.unit;
            if (0 > b2) {
              for (var c3 = 0; c3 < fa; ++c3) {
                var e2 = W[c3];
                if (e2) {
                  if (0 < e2.bindCount)
                    continue;
                  e2.unit = -1;
                }
                W[c3] = this;
                b2 = c3;
                break;
              }
              q.profile && d.maxTextureUnits < b2 + 1 && (d.maxTextureUnits = b2 + 1);
              this.unit = b2;
              a.activeTexture(33984 + b2);
              a.bindTexture(this.target, this.texture);
            }
            return b2;
          }, unbind: function() {
            --this.bindCount;
          }, decRef: function() {
            0 >= --this.refCount && F(this);
          } });
          q.profile && (d.getTotalTextureSize = function() {
            var a2 = 0;
            Object.keys(ea).forEach(function(b2) {
              a2 += ea[b2].stats.size;
            });
            return a2;
          });
          return { create2D: function(b2, c3) {
            function e2(a2, b3) {
              var c4 = f2.texInfo;
              w2.call(c4);
              var d2 = ma();
              typeof a2 === "number" ? typeof b3 === "number" ? p(d2, a2 | 0, b3 | 0) : p(d2, a2 | 0, a2 | 0) : a2 ? (H(c4, a2), P(d2, a2)) : p(d2, 1, 1);
              c4.genMipmaps && (d2.mipmask = (d2.width << 1) - 1);
              f2.mipmask = d2.mipmask;
              v(f2, d2);
              f2.internalformat = d2.internalformat;
              e2.width = d2.width;
              e2.height = d2.height;
              T2(f2);
              t(d2, 3553);
              M(c4, 3553);
              wa();
              ya(d2);
              q.profile && (f2.stats.size = La(f2.internalformat, f2.type, d2.width, d2.height, c4.genMipmaps, false));
              e2.format = ca[f2.internalformat];
              e2.type = K2[f2.type];
              e2.mag = Fa[c4.magFilter];
              e2.min = pa[c4.minFilter];
              e2.wrapS = qa[c4.wrapS];
              e2.wrapT = qa[c4.wrapT];
              return e2;
            }
            var f2 = new y(3553);
            ea[f2.id] = f2;
            d.textureCount++;
            e2(b2, c3);
            e2.subimage = function(a2, b3, c4, d2) {
              b3 |= 0;
              c4 |= 0;
              d2 |= 0;
              var y2 = g();
              v(y2, f2);
              y2.width = 0;
              y2.height = 0;
              x(y2, a2);
              y2.width = y2.width || (f2.width >> d2) - b3;
              y2.height = y2.height || (f2.height >> d2) - c4;
              T2(f2);
              l(y2, 3553, b3, c4, d2);
              wa();
              h(y2);
              return e2;
            };
            e2.resize = function(b3, c4) {
              var d2 = b3 | 0, g2 = c4 | 0 || d2;
              if (d2 === f2.width && g2 === f2.height)
                return e2;
              e2.width = f2.width = d2;
              e2.height = f2.height = g2;
              T2(f2);
              for (var y2 = 0; f2.mipmask >> y2; ++y2) {
                var h2 = d2 >> y2, z = g2 >> y2;
                if (!h2 || !z)
                  break;
                a.texImage2D(3553, y2, f2.format, h2, z, 0, f2.format, f2.type, null);
              }
              wa();
              q.profile && (f2.stats.size = La(f2.internalformat, f2.type, d2, g2, false, false));
              return e2;
            };
            e2._reglType = "texture2d";
            e2._texture = f2;
            q.profile && (e2.stats = f2.stats);
            e2.destroy = function() {
              f2.decRef();
            };
            return e2;
          }, createCube: function(b2, c3, e2, f2, n2, r2) {
            function m2(a2, b3, c4, d2, e3, f3) {
              var g2, da = A2.texInfo;
              w2.call(da);
              for (g2 = 0; 6 > g2; ++g2)
                F2[g2] = ma();
              if (typeof a2 === "number" || !a2)
                for (a2 = a2 | 0 || 1, g2 = 0; 6 > g2; ++g2)
                  p(F2[g2], a2, a2);
              else if (typeof a2 === "object")
                if (b3)
                  P(F2[0], a2), P(F2[1], b3), P(F2[2], c4), P(F2[3], d2), P(F2[4], e3), P(F2[5], f3);
                else if (H(da, a2), k(A2, a2), "faces" in a2)
                  for (a2 = a2.faces, g2 = 0; 6 > g2; ++g2)
                    v(F2[g2], A2), P(F2[g2], a2[g2]);
                else
                  for (g2 = 0; 6 > g2; ++g2)
                    P(F2[g2], a2);
              v(A2, F2[0]);
              A2.mipmask = da.genMipmaps ? (F2[0].width << 1) - 1 : F2[0].mipmask;
              A2.internalformat = F2[0].internalformat;
              m2.width = F2[0].width;
              m2.height = F2[0].height;
              T2(A2);
              for (g2 = 0; 6 > g2; ++g2)
                t(F2[g2], 34069 + g2);
              M(da, 34067);
              wa();
              q.profile && (A2.stats.size = La(A2.internalformat, A2.type, m2.width, m2.height, da.genMipmaps, true));
              m2.format = ca[A2.internalformat];
              m2.type = K2[A2.type];
              m2.mag = Fa[da.magFilter];
              m2.min = pa[da.minFilter];
              m2.wrapS = qa[da.wrapS];
              m2.wrapT = qa[da.wrapT];
              for (g2 = 0; 6 > g2; ++g2)
                ya(F2[g2]);
              return m2;
            }
            var A2 = new y(34067);
            ea[A2.id] = A2;
            d.cubeCount++;
            var F2 = Array(6);
            m2(b2, c3, e2, f2, n2, r2);
            m2.subimage = function(a2, b3, c4, d2, e3) {
              c4 |= 0;
              d2 |= 0;
              e3 |= 0;
              var f3 = g();
              v(f3, A2);
              f3.width = 0;
              f3.height = 0;
              x(f3, b3);
              f3.width = f3.width || (A2.width >> e3) - c4;
              f3.height = f3.height || (A2.height >> e3) - d2;
              T2(A2);
              l(f3, 34069 + a2, c4, d2, e3);
              wa();
              h(f3);
              return m2;
            };
            m2.resize = function(b3) {
              b3 |= 0;
              if (b3 !== A2.width) {
                m2.width = A2.width = b3;
                m2.height = A2.height = b3;
                T2(A2);
                for (var c4 = 0; 6 > c4; ++c4)
                  for (var d2 = 0; A2.mipmask >> d2; ++d2)
                    a.texImage2D(34069 + c4, d2, A2.format, b3 >> d2, b3 >> d2, 0, A2.format, A2.type, null);
                wa();
                q.profile && (A2.stats.size = La(A2.internalformat, A2.type, m2.width, m2.height, false, true));
                return m2;
              }
            };
            m2._reglType = "textureCube";
            m2._texture = A2;
            q.profile && (m2.stats = A2.stats);
            m2.destroy = function() {
              A2.decRef();
            };
            return m2;
          }, clear: function() {
            for (var b2 = 0; b2 < fa; ++b2)
              a.activeTexture(33984 + b2), a.bindTexture(3553, null), W[b2] = null;
            I(ea).forEach(F);
            d.cubeCount = 0;
            d.textureCount = 0;
          }, getTexture: function(a2) {
            return null;
          }, restore: function() {
            for (var b2 = 0; b2 < fa; ++b2) {
              var c3 = W[b2];
              c3 && (c3.bindCount = 0, c3.unit = -1, W[b2] = null);
            }
            I(ea).forEach(function(b3) {
              b3.texture = a.createTexture();
              a.bindTexture(b3.target, b3.texture);
              for (var c4 = 0; 32 > c4; ++c4)
                if ((b3.mipmask & 1 << c4) !== 0)
                  if (b3.target === 3553)
                    a.texImage2D(3553, c4, b3.internalformat, b3.width >> c4, b3.height >> c4, 0, b3.internalformat, b3.type, null);
                  else
                    for (var d2 = 0; 6 > d2; ++d2)
                      a.texImage2D(34069 + d2, c4, b3.internalformat, b3.width >> c4, b3.height >> c4, 0, b3.internalformat, b3.type, null);
              M(b3.texInfo, b3.target);
            });
          }, refresh: function() {
            for (var b2 = 0; b2 < fa; ++b2) {
              var c3 = W[b2];
              c3 && (c3.bindCount = 0, c3.unit = -1, W[b2] = null);
              a.activeTexture(33984 + b2);
              a.bindTexture(3553, null);
              a.bindTexture(34067, null);
            }
          } };
        }
        function Rb(a, b, c2, e, f, d) {
          function q(a2, b2, c3) {
            this.target = a2;
            this.texture = b2;
            this.renderbuffer = c3;
            var d2 = a2 = 0;
            b2 ? (a2 = b2.width, d2 = b2.height) : c3 && (a2 = c3.width, d2 = c3.height);
            this.width = a2;
            this.height = d2;
          }
          function n(a2) {
            a2 && (a2.texture && a2.texture._texture.decRef(), a2.renderbuffer && a2.renderbuffer._renderbuffer.decRef());
          }
          function v(a2, b2, c3) {
            a2 && (a2.texture ? a2.texture._texture.refCount += 1 : a2.renderbuffer._renderbuffer.refCount += 1);
          }
          function k(b2, c3) {
            c3 && (c3.texture ? a.framebufferTexture2D(36160, b2, c3.target, c3.texture._texture.texture, 0) : a.framebufferRenderbuffer(36160, b2, 36161, c3.renderbuffer._renderbuffer.renderbuffer));
          }
          function u(a2) {
            var b2 = 3553, c3 = null, d2 = null, e2 = a2;
            typeof a2 === "object" && (e2 = a2.data, "target" in a2 && (b2 = a2.target | 0));
            a2 = e2._reglType;
            a2 === "texture2d" ? c3 = e2 : a2 === "textureCube" ? c3 = e2 : a2 === "renderbuffer" && (d2 = e2, b2 = 36161);
            return new q(b2, c3, d2);
          }
          function m(a2, b2, c3, d2, g2) {
            if (c3)
              return a2 = e.create2D({ width: a2, height: b2, format: d2, type: g2 }), a2._texture.refCount = 0, new q(3553, a2, null);
            a2 = f.create({ width: a2, height: b2, format: d2 });
            a2._renderbuffer.refCount = 0;
            return new q(36161, null, a2);
          }
          function x(a2) {
            return a2 && (a2.texture || a2.renderbuffer);
          }
          function l(a2, b2, c3) {
            a2 && (a2.texture ? a2.texture.resize(b2, c3) : a2.renderbuffer && a2.renderbuffer.resize(b2, c3), a2.width = b2, a2.height = c3);
          }
          function g() {
            this.id = H++;
            M[this.id] = this;
            this.framebuffer = a.createFramebuffer();
            this.height = this.width = 0;
            this.colorAttachments = [];
            this.depthStencilAttachment = this.stencilAttachment = this.depthAttachment = null;
          }
          function h(a2) {
            a2.colorAttachments.forEach(n);
            n(a2.depthAttachment);
            n(a2.stencilAttachment);
            n(a2.depthStencilAttachment);
          }
          function r(b2) {
            a.deleteFramebuffer(b2.framebuffer);
            b2.framebuffer = null;
            d.framebufferCount--;
            delete M[b2.id];
          }
          function p(b2) {
            var d2;
            a.bindFramebuffer(36160, b2.framebuffer);
            var e2 = b2.colorAttachments;
            for (d2 = 0; d2 < e2.length; ++d2)
              k(36064 + d2, e2[d2]);
            for (d2 = e2.length; d2 < c2.maxColorAttachments; ++d2)
              a.framebufferTexture2D(36160, 36064 + d2, 3553, null, 0);
            a.framebufferTexture2D(36160, 33306, 3553, null, 0);
            a.framebufferTexture2D(36160, 36096, 3553, null, 0);
            a.framebufferTexture2D(36160, 36128, 3553, null, 0);
            k(36096, b2.depthAttachment);
            k(36128, b2.stencilAttachment);
            k(33306, b2.depthStencilAttachment);
            a.checkFramebufferStatus(36160);
            a.isContextLost();
            a.bindFramebuffer(36160, t.next ? t.next.framebuffer : null);
            t.cur = t.next;
            a.getError();
          }
          function P(a2, b2) {
            function c3(a3, b3) {
              var d2, g2 = 0, f2 = 0, t2 = true, k2 = true;
              d2 = null;
              var l2 = true, n2 = "rgba", r2 = "uint8", y = 1, q2 = null, P2 = null, pa = null, M2 = false;
              if (typeof a3 === "number")
                g2 = a3 | 0, f2 = b3 | 0 || g2;
              else if (a3) {
                "shape" in a3 ? (f2 = a3.shape, g2 = f2[0], f2 = f2[1]) : ("radius" in a3 && (g2 = f2 = a3.radius), "width" in a3 && (g2 = a3.width), "height" in a3 && (f2 = a3.height));
                if ("color" in a3 || "colors" in a3)
                  d2 = a3.color || a3.colors, Array.isArray(d2);
                if (!d2) {
                  "colorCount" in a3 && (y = a3.colorCount | 0);
                  "colorTexture" in a3 && (l2 = !!a3.colorTexture, n2 = "rgba4");
                  if ("colorType" in a3 && (r2 = a3.colorType, !l2)) {
                    if (r2 === "half float" || r2 === "float16")
                      n2 = "rgba16f";
                    else if (r2 === "float" || r2 === "float32")
                      n2 = "rgba32f";
                  }
                  "colorFormat" in a3 && (n2 = a3.colorFormat, 0 <= ma.indexOf(n2) ? l2 = true : 0 <= ya.indexOf(n2) && (l2 = false));
                }
                if ("depthTexture" in a3 || "depthStencilTexture" in a3)
                  M2 = !(!a3.depthTexture && !a3.depthStencilTexture);
                "depth" in a3 && (typeof a3.depth === "boolean" ? t2 = a3.depth : (q2 = a3.depth, k2 = false));
                "stencil" in a3 && (typeof a3.stencil === "boolean" ? k2 = a3.stencil : (P2 = a3.stencil, t2 = false));
                "depthStencil" in a3 && (typeof a3.depthStencil === "boolean" ? t2 = k2 = a3.depthStencil : (pa = a3.depthStencil, k2 = t2 = false));
              } else
                g2 = f2 = 1;
              var V = null, H2 = null, T2 = null, w3 = null;
              if (Array.isArray(d2))
                V = d2.map(u);
              else if (d2)
                V = [u(d2)];
              else
                for (V = Array(y), d2 = 0; d2 < y; ++d2)
                  V[d2] = m(g2, f2, l2, n2, r2);
              g2 = g2 || V[0].width;
              f2 = f2 || V[0].height;
              q2 ? H2 = u(q2) : t2 && !k2 && (H2 = m(g2, f2, M2, "depth", "uint32"));
              P2 ? T2 = u(P2) : k2 && !t2 && (T2 = m(g2, f2, false, "stencil", "uint8"));
              pa ? w3 = u(pa) : !q2 && !P2 && k2 && t2 && (w3 = m(g2, f2, M2, "depth stencil", "depth stencil"));
              t2 = null;
              for (d2 = 0; d2 < V.length; ++d2)
                v(V[d2], g2, f2), V[d2] && V[d2].texture && (k2 = Za[V[d2].texture._texture.format] * Ra[V[d2].texture._texture.type], t2 === null && (t2 = k2));
              v(H2, g2, f2);
              v(T2, g2, f2);
              v(w3, g2, f2);
              h(e2);
              e2.width = g2;
              e2.height = f2;
              e2.colorAttachments = V;
              e2.depthAttachment = H2;
              e2.stencilAttachment = T2;
              e2.depthStencilAttachment = w3;
              c3.color = V.map(x);
              c3.depth = x(H2);
              c3.stencil = x(T2);
              c3.depthStencil = x(w3);
              c3.width = e2.width;
              c3.height = e2.height;
              p(e2);
              return c3;
            }
            var e2 = new g();
            d.framebufferCount++;
            c3(a2, b2);
            return L(c3, { resize: function(a3, b3) {
              var d2 = Math.max(a3 | 0, 1), g2 = Math.max(b3 | 0 || d2, 1);
              if (d2 === e2.width && g2 === e2.height)
                return c3;
              for (var f2 = e2.colorAttachments, h2 = 0; h2 < f2.length; ++h2)
                l(f2[h2], d2, g2);
              l(e2.depthAttachment, d2, g2);
              l(e2.stencilAttachment, d2, g2);
              l(e2.depthStencilAttachment, d2, g2);
              e2.width = c3.width = d2;
              e2.height = c3.height = g2;
              p(e2);
              return c3;
            }, _reglType: "framebuffer", _framebuffer: e2, destroy: function() {
              r(e2);
              h(e2);
            }, use: function(a3) {
              t.setFBO({ framebuffer: c3 }, a3);
            } });
          }
          var t = { cur: null, next: null, dirty: false, setFBO: null }, ma = ["rgba"], ya = ["rgba4", "rgb565", "rgb5 a1"];
          b.ext_srgb && ya.push("srgba");
          b.ext_color_buffer_half_float && ya.push("rgba16f", "rgb16f");
          b.webgl_color_buffer_float && ya.push("rgba32f");
          var w2 = ["uint8"];
          b.oes_texture_half_float && w2.push("half float", "float16");
          b.oes_texture_float && w2.push("float", "float32");
          var H = 0, M = {};
          return L(t, {
            getFramebuffer: function(a2) {
              return typeof a2 === "function" && a2._reglType === "framebuffer" && (a2 = a2._framebuffer, a2 instanceof g) ? a2 : null;
            },
            create: P,
            createCube: function(a2) {
              function b2(a3) {
                var d2, g2 = { color: null }, f2 = 0, h2 = null;
                d2 = "rgba";
                var t2 = "uint8", p2 = 1;
                if (typeof a3 === "number")
                  f2 = a3 | 0;
                else if (a3) {
                  "shape" in a3 ? f2 = a3.shape[0] : ("radius" in a3 && (f2 = a3.radius | 0), "width" in a3 ? f2 = a3.width | 0 : "height" in a3 && (f2 = a3.height | 0));
                  if ("color" in a3 || "colors" in a3)
                    h2 = a3.color || a3.colors, Array.isArray(h2);
                  h2 || ("colorCount" in a3 && (p2 = a3.colorCount | 0), "colorType" in a3 && (t2 = a3.colorType), "colorFormat" in a3 && (d2 = a3.colorFormat));
                  "depth" in a3 && (g2.depth = a3.depth);
                  "stencil" in a3 && (g2.stencil = a3.stencil);
                  "depthStencil" in a3 && (g2.depthStencil = a3.depthStencil);
                } else
                  f2 = 1;
                if (h2)
                  if (Array.isArray(h2))
                    for (a3 = [], d2 = 0; d2 < h2.length; ++d2)
                      a3[d2] = h2[d2];
                  else
                    a3 = [h2];
                else
                  for (a3 = Array(p2), h2 = { radius: f2, format: d2, type: t2 }, d2 = 0; d2 < p2; ++d2)
                    a3[d2] = e.createCube(h2);
                g2.color = Array(a3.length);
                for (d2 = 0; d2 < a3.length; ++d2)
                  p2 = a3[d2], f2 = f2 || p2.width, g2.color[d2] = { target: 34069, data: a3[d2] };
                for (d2 = 0; 6 > d2; ++d2) {
                  for (p2 = 0; p2 < a3.length; ++p2)
                    g2.color[p2].target = 34069 + d2;
                  0 < d2 && (g2.depth = c3[0].depth, g2.stencil = c3[0].stencil, g2.depthStencil = c3[0].depthStencil);
                  if (c3[d2])
                    c3[d2](g2);
                  else
                    c3[d2] = P(g2);
                }
                return L(b2, { width: f2, height: f2, color: a3 });
              }
              var c3 = Array(6);
              b2(a2);
              return L(b2, { faces: c3, resize: function(a3) {
                var d2 = a3 | 0;
                if (d2 === b2.width)
                  return b2;
                var e2 = b2.color;
                for (a3 = 0; a3 < e2.length; ++a3)
                  e2[a3].resize(d2);
                for (a3 = 0; 6 > a3; ++a3)
                  c3[a3].resize(d2);
                b2.width = b2.height = d2;
                return b2;
              }, _reglType: "framebufferCube", destroy: function() {
                c3.forEach(function(a3) {
                  a3.destroy();
                });
              } });
            },
            clear: function() {
              I(M).forEach(r);
            },
            restore: function() {
              t.cur = null;
              t.next = null;
              t.dirty = true;
              I(M).forEach(function(b2) {
                b2.framebuffer = a.createFramebuffer();
                p(b2);
              });
            }
          });
        }
        function $a() {
          this.w = this.z = this.y = this.x = this.state = 0;
          this.buffer = null;
          this.size = 0;
          this.normalized = false;
          this.type = 5126;
          this.divisor = this.stride = this.offset = 0;
        }
        function Sb(a, b, c2, e, f, d, q) {
          function n(a2) {
            if (a2 !== r.currentVAO) {
              var c3 = b.oes_vertex_array_object;
              a2 ? c3.bindVertexArrayOES(a2.vao) : c3.bindVertexArrayOES(null);
              r.currentVAO = a2;
            }
          }
          function v(c3) {
            if (c3 !== r.currentVAO) {
              if (c3)
                c3.bindAttrs();
              else {
                for (var d2 = b.angle_instanced_arrays, e2 = 0; e2 < l.length; ++e2) {
                  var g2 = l[e2];
                  g2.buffer ? (a.enableVertexAttribArray(e2), g2.buffer.bind(), a.vertexAttribPointer(e2, g2.size, g2.type, g2.normalized, g2.stride, g2.offfset), d2 && g2.divisor && d2.vertexAttribDivisorANGLE(e2, g2.divisor)) : (a.disableVertexAttribArray(e2), a.vertexAttrib4f(e2, g2.x, g2.y, g2.z, g2.w));
                }
                q.elements ? a.bindBuffer(34963, q.elements.buffer.buffer) : a.bindBuffer(34963, null);
              }
              r.currentVAO = c3;
            }
          }
          function k() {
            I(h).forEach(function(a2) {
              a2.destroy();
            });
          }
          function u() {
            this.id = ++g;
            this.attributes = [];
            this.elements = null;
            this.ownsElements = false;
            this.offset = this.count = 0;
            this.instances = -1;
            this.primitive = 4;
            var a2 = b.oes_vertex_array_object;
            this.vao = a2 ? a2.createVertexArrayOES() : null;
            h[this.id] = this;
            this.buffers = [];
          }
          function m() {
            b.oes_vertex_array_object && I(h).forEach(function(a2) {
              a2.refresh();
            });
          }
          var x = c2.maxAttributes, l = Array(x);
          for (c2 = 0; c2 < x; ++c2)
            l[c2] = new $a();
          var g = 0, h = {}, r = { Record: $a, scope: {}, state: l, currentVAO: null, targetVAO: null, restore: b.oes_vertex_array_object ? m : function() {
          }, createVAO: function(a2) {
            function b2(a3) {
              var e2;
              Array.isArray(a3) ? (e2 = a3, c3.elements && c3.ownsElements && c3.elements.destroy(), c3.elements = null, c3.ownsElements = false, c3.offset = 0, c3.count = 0, c3.instances = -1, c3.primitive = 4) : (a3.elements ? (e2 = a3.elements, c3.ownsElements ? (typeof e2 === "function" && e2._reglType === "elements" ? c3.elements.destroy() : c3.elements(e2), c3.ownsElements = false) : d.getElements(a3.elements) ? (c3.elements = a3.elements, c3.ownsElements = false) : (c3.elements = d.create(a3.elements), c3.ownsElements = true)) : (c3.elements = null, c3.ownsElements = false), e2 = a3.attributes, c3.offset = 0, c3.count = -1, c3.instances = -1, c3.primitive = 4, c3.elements && (c3.count = c3.elements._elements.vertCount, c3.primitive = c3.elements._elements.primType), "offset" in a3 && (c3.offset = a3.offset | 0), "count" in a3 && (c3.count = a3.count | 0), "instances" in a3 && (c3.instances = a3.instances | 0), "primitive" in a3 && (c3.primitive = Ka[a3.primitive]));
              a3 = {};
              var g2 = c3.attributes;
              g2.length = e2.length;
              for (var h2 = 0; h2 < e2.length; ++h2) {
                var p = e2[h2], k2 = g2[h2] = new $a(), m2 = p.data || p;
                if (Array.isArray(m2) || O(m2) || la(m2)) {
                  var l2;
                  c3.buffers[h2] && (l2 = c3.buffers[h2], O(m2) && l2._buffer.byteLength >= m2.byteLength ? l2.subdata(m2) : (l2.destroy(), c3.buffers[h2] = null));
                  c3.buffers[h2] || (l2 = c3.buffers[h2] = f.create(p, 34962, false, true));
                  k2.buffer = f.getBuffer(l2);
                  k2.size = k2.buffer.dimension | 0;
                  k2.normalized = false;
                  k2.type = k2.buffer.dtype;
                  k2.offset = 0;
                  k2.stride = 0;
                  k2.divisor = 0;
                  k2.state = 1;
                  a3[h2] = 1;
                } else
                  f.getBuffer(p) ? (k2.buffer = f.getBuffer(p), k2.size = k2.buffer.dimension | 0, k2.normalized = false, k2.type = k2.buffer.dtype, k2.offset = 0, k2.stride = 0, k2.divisor = 0, k2.state = 1) : f.getBuffer(p.buffer) ? (k2.buffer = f.getBuffer(p.buffer), k2.size = (+p.size || k2.buffer.dimension) | 0, k2.normalized = !!p.normalized || false, k2.type = "type" in p ? Ja[p.type] : k2.buffer.dtype, k2.offset = (p.offset || 0) | 0, k2.stride = (p.stride || 0) | 0, k2.divisor = (p.divisor || 0) | 0, k2.state = 1) : "x" in p && (k2.x = +p.x || 0, k2.y = +p.y || 0, k2.z = +p.z || 0, k2.w = +p.w || 0, k2.state = 2);
              }
              for (l2 = 0; l2 < c3.buffers.length; ++l2)
                !a3[l2] && c3.buffers[l2] && (c3.buffers[l2].destroy(), c3.buffers[l2] = null);
              c3.refresh();
              return b2;
            }
            var c3 = new u();
            e.vaoCount += 1;
            b2.destroy = function() {
              for (var a3 = 0; a3 < c3.buffers.length; ++a3)
                c3.buffers[a3] && c3.buffers[a3].destroy();
              c3.buffers.length = 0;
              c3.ownsElements && (c3.elements.destroy(), c3.elements = null, c3.ownsElements = false);
              c3.destroy();
            };
            b2._vao = c3;
            b2._reglType = "vao";
            return b2(a2);
          }, getVAO: function(a2) {
            return typeof a2 === "function" && a2._vao ? a2._vao : null;
          }, destroyBuffer: function(b2) {
            for (var c3 = 0; c3 < l.length; ++c3) {
              var d2 = l[c3];
              d2.buffer === b2 && (a.disableVertexAttribArray(c3), d2.buffer = null);
            }
          }, setVAO: b.oes_vertex_array_object ? n : v, clear: b.oes_vertex_array_object ? k : function() {
          } };
          u.prototype.bindAttrs = function() {
            for (var c3 = b.angle_instanced_arrays, e2 = this.attributes, g2 = 0; g2 < e2.length; ++g2) {
              var f2 = e2[g2];
              f2.buffer ? (a.enableVertexAttribArray(g2), a.bindBuffer(34962, f2.buffer.buffer), a.vertexAttribPointer(g2, f2.size, f2.type, f2.normalized, f2.stride, f2.offset), c3 && f2.divisor && c3.vertexAttribDivisorANGLE(g2, f2.divisor)) : (a.disableVertexAttribArray(g2), a.vertexAttrib4f(g2, f2.x, f2.y, f2.z, f2.w));
            }
            for (c3 = e2.length; c3 < x; ++c3)
              a.disableVertexAttribArray(c3);
            (c3 = d.getElements(this.elements)) ? a.bindBuffer(34963, c3.buffer.buffer) : a.bindBuffer(34963, null);
          };
          u.prototype.refresh = function() {
            var a2 = b.oes_vertex_array_object;
            a2 && (a2.bindVertexArrayOES(this.vao), this.bindAttrs(), r.currentVAO = null, a2.bindVertexArrayOES(null));
          };
          u.prototype.destroy = function() {
            if (this.vao) {
              var a2 = b.oes_vertex_array_object;
              this === r.currentVAO && (r.currentVAO = null, a2.bindVertexArrayOES(null));
              a2.deleteVertexArrayOES(this.vao);
              this.vao = null;
            }
            this.ownsElements && (this.elements.destroy(), this.elements = null, this.ownsElements = false);
            h[this.id] && (delete h[this.id], --e.vaoCount);
          };
          return r;
        }
        function Tb(a, b, c2, e) {
          function f(a2, b2, c3, d2) {
            this.name = a2;
            this.id = b2;
            this.location = c3;
            this.info = d2;
          }
          function d(a2, b2) {
            for (var c3 = 0; c3 < a2.length; ++c3)
              if (a2[c3].id === b2.id) {
                a2[c3].location = b2.location;
                return;
              }
            a2.push(b2);
          }
          function q(c3, d2, e2) {
            e2 = c3 === 35632 ? k : u;
            var f2 = e2[d2];
            if (!f2) {
              var m2 = b.str(d2), f2 = a.createShader(c3);
              a.shaderSource(f2, m2);
              a.compileShader(f2);
              e2[d2] = f2;
            }
            return f2;
          }
          function n(a2, b2) {
            this.id = l++;
            this.fragId = a2;
            this.vertId = b2;
            this.program = null;
            this.uniforms = [];
            this.attributes = [];
            this.refCount = 1;
            e.profile && (this.stats = { uniformsCount: 0, attributesCount: 0 });
          }
          function v(c3, h, k2) {
            var m2;
            m2 = q(35632, c3.fragId);
            var l2 = q(35633, c3.vertId);
            h = c3.program = a.createProgram();
            a.attachShader(h, m2);
            a.attachShader(h, l2);
            if (k2)
              for (m2 = 0; m2 < k2.length; ++m2)
                l2 = k2[m2], a.bindAttribLocation(h, l2[0], l2[1]);
            a.linkProgram(h);
            l2 = a.getProgramParameter(h, 35718);
            e.profile && (c3.stats.uniformsCount = l2);
            var n2 = c3.uniforms;
            for (m2 = 0; m2 < l2; ++m2)
              if (k2 = a.getActiveUniform(h, m2)) {
                if (1 < k2.size)
                  for (var v2 = 0; v2 < k2.size; ++v2) {
                    var u2 = k2.name.replace("[0]", "[" + v2 + "]");
                    d(n2, new f(u2, b.id(u2), a.getUniformLocation(h, u2), k2));
                  }
                v2 = k2.name;
                1 < k2.size && (v2 = v2.replace("[0]", ""));
                d(n2, new f(v2, b.id(v2), a.getUniformLocation(h, v2), k2));
              }
            l2 = a.getProgramParameter(h, 35721);
            e.profile && (c3.stats.attributesCount = l2);
            c3 = c3.attributes;
            for (m2 = 0; m2 < l2; ++m2)
              (k2 = a.getActiveAttrib(h, m2)) && d(c3, new f(k2.name, b.id(k2.name), a.getAttribLocation(h, k2.name), k2));
          }
          var k = {}, u = {}, m = {}, x = [], l = 0;
          e.profile && (c2.getMaxUniformsCount = function() {
            var a2 = 0;
            x.forEach(function(b2) {
              b2.stats.uniformsCount > a2 && (a2 = b2.stats.uniformsCount);
            });
            return a2;
          }, c2.getMaxAttributesCount = function() {
            var a2 = 0;
            x.forEach(function(b2) {
              b2.stats.attributesCount > a2 && (a2 = b2.stats.attributesCount);
            });
            return a2;
          });
          return { clear: function() {
            var b2 = a.deleteShader.bind(a);
            I(k).forEach(b2);
            k = {};
            I(u).forEach(b2);
            u = {};
            x.forEach(function(b3) {
              a.deleteProgram(b3.program);
            });
            x.length = 0;
            m = {};
            c2.shaderCount = 0;
          }, program: function(b2, d2, e2, f2) {
            var l2 = m[d2];
            l2 || (l2 = m[d2] = {});
            var q2 = l2[b2];
            if (q2 && (q2.refCount++, !f2))
              return q2;
            var w2 = new n(d2, b2);
            c2.shaderCount++;
            v(w2, e2, f2);
            q2 || (l2[b2] = w2);
            x.push(w2);
            return L(w2, { destroy: function() {
              w2.refCount--;
              if (0 >= w2.refCount) {
                a.deleteProgram(w2.program);
                var b3 = x.indexOf(w2);
                x.splice(b3, 1);
                c2.shaderCount--;
              }
              0 >= l2[w2.vertId].refCount && (a.deleteShader(u[w2.vertId]), delete u[w2.vertId], delete m[w2.fragId][w2.vertId]);
              Object.keys(m[w2.fragId]).length || (a.deleteShader(k[w2.fragId]), delete k[w2.fragId], delete m[w2.fragId]);
            } });
          }, restore: function() {
            k = {};
            u = {};
            for (var a2 = 0; a2 < x.length; ++a2)
              v(x[a2], null, x[a2].attributes.map(function(a3) {
                return [a3.location, a3.name];
              }));
          }, shader: q, frag: -1, vert: -1 };
        }
        function Ub(a, b, c2, e, f, d, q) {
          function n(d2) {
            var f2;
            f2 = b.next === null ? 5121 : b.next.colorAttachments[0].texture._texture.type;
            var m = 0, n2 = 0, l = e.framebufferWidth, g = e.framebufferHeight, h = null;
            O(d2) ? h = d2 : d2 && (m = d2.x | 0, n2 = d2.y | 0, l = (d2.width || e.framebufferWidth - m) | 0, g = (d2.height || e.framebufferHeight - n2) | 0, h = d2.data || null);
            c2();
            d2 = l * g * 4;
            h || (f2 === 5121 ? h = new Uint8Array(d2) : f2 === 5126 && (h = h || new Float32Array(d2)));
            a.pixelStorei(3333, 4);
            a.readPixels(m, n2, l, g, 6408, f2, h);
            return h;
          }
          function v(a2) {
            var c3;
            b.setFBO({ framebuffer: a2.framebuffer }, function() {
              c3 = n(a2);
            });
            return c3;
          }
          return function(a2) {
            return a2 && "framebuffer" in a2 ? v(a2) : n(a2);
          };
        }
        function Ba(a) {
          return Array.prototype.slice.call(a);
        }
        function Ca(a) {
          return Ba(a).join("");
        }
        function Vb() {
          function a() {
            var a2 = [], b2 = [];
            return L(function() {
              a2.push.apply(a2, Ba(arguments));
            }, { def: function() {
              var d2 = "v" + c2++;
              b2.push(d2);
              0 < arguments.length && (a2.push(d2, "="), a2.push.apply(a2, Ba(arguments)), a2.push(";"));
              return d2;
            }, toString: function() {
              return Ca([0 < b2.length ? "var " + b2.join(",") + ";" : "", Ca(a2)]);
            } });
          }
          function b() {
            function b2(a2, e3) {
              d2(a2, e3, "=", c3.def(a2, e3), ";");
            }
            var c3 = a(), d2 = a(), e2 = c3.toString, f2 = d2.toString;
            return L(function() {
              c3.apply(c3, Ba(arguments));
            }, { def: c3.def, entry: c3, exit: d2, save: b2, set: function(a2, d3, e3) {
              b2(a2, d3);
              c3(a2, d3, "=", e3, ";");
            }, toString: function() {
              return e2() + f2();
            } });
          }
          var c2 = 0, e = [], f = [], d = a(), q = {};
          return { global: d, link: function(a2) {
            for (var b2 = 0; b2 < f.length; ++b2)
              if (f[b2] === a2)
                return e[b2];
            b2 = "g" + c2++;
            e.push(b2);
            f.push(a2);
            return b2;
          }, block: a, proc: function(a2, c3) {
            function d2() {
              var a3 = "a" + e2.length;
              e2.push(a3);
              return a3;
            }
            var e2 = [];
            c3 = c3 || 0;
            for (var f2 = 0; f2 < c3; ++f2)
              d2();
            var f2 = b(), x = f2.toString;
            return q[a2] = L(f2, { arg: d2, toString: function() {
              return Ca(["function(", e2.join(), "){", x(), "}"]);
            } });
          }, scope: b, cond: function() {
            var a2 = Ca(arguments), c3 = b(), d2 = b(), e2 = c3.toString, f2 = d2.toString;
            return L(c3, { then: function() {
              c3.apply(c3, Ba(arguments));
              return this;
            }, "else": function() {
              d2.apply(d2, Ba(arguments));
              return this;
            }, toString: function() {
              var b2 = f2();
              b2 && (b2 = "else{" + b2 + "}");
              return Ca(["if(", a2, "){", e2(), "}", b2]);
            } });
          }, compile: function() {
            var a2 = ['"use strict";', d, "return {"];
            Object.keys(q).forEach(function(b3) {
              a2.push('"', b3, '":', q[b3].toString(), ",");
            });
            a2.push("}");
            var b2 = Ca(a2).replace(/;/g, ";\n").replace(/}/g, "}\n").replace(/{/g, "{\n");
            return Function.apply(null, e.concat(b2)).apply(null, f);
          } };
        }
        function Sa(a) {
          return Array.isArray(a) || O(a) || la(a);
        }
        function yb(a) {
          return a.sort(function(a2, c2) {
            return a2 === "viewport" ? -1 : c2 === "viewport" ? 1 : a2 < c2 ? -1 : 1;
          });
        }
        function J(a, b, c2, e) {
          this.thisDep = a;
          this.contextDep = b;
          this.propDep = c2;
          this.append = e;
        }
        function xa(a) {
          return a && !(a.thisDep || a.contextDep || a.propDep);
        }
        function w(a) {
          return new J(false, false, false, a);
        }
        function K(a, b) {
          var c2 = a.type;
          if (c2 === 0)
            return c2 = a.data.length, new J(true, 1 <= c2, 2 <= c2, b);
          if (c2 === 4)
            return c2 = a.data, new J(c2.thisDep, c2.contextDep, c2.propDep, b);
          if (c2 === 5)
            return new J(false, false, false, b);
          if (c2 === 6) {
            for (var e = c2 = false, f = false, d = 0; d < a.data.length; ++d) {
              var q = a.data[d];
              q.type === 1 ? f = true : q.type === 2 ? e = true : q.type === 3 ? c2 = true : q.type === 0 ? (c2 = true, q = q.data, 1 <= q && (e = true), 2 <= q && (f = true)) : q.type === 4 && (c2 = c2 || q.data.thisDep, e = e || q.data.contextDep, f = f || q.data.propDep);
            }
            return new J(c2, e, f, b);
          }
          return new J(c2 === 3, c2 === 2, c2 === 1, b);
        }
        function Wb(a, b, c2, e, f, d, q, n, v, k, u, m, x, l, g) {
          function h(a2) {
            return a2.replace(".", "_");
          }
          function r(a2, b2, c3) {
            var d2 = h(a2);
            Na.push(a2);
            Ea[d2] = ta[d2] = !!c3;
            ua[d2] = b2;
          }
          function p(a2, b2, c3) {
            var d2 = h(a2);
            Na.push(a2);
            Array.isArray(c3) ? (ta[d2] = c3.slice(), Ea[d2] = c3.slice()) : ta[d2] = Ea[d2] = c3;
            va[d2] = b2;
          }
          function P() {
            var a2 = Vb(), c3 = a2.link, d2 = a2.global;
            a2.id = sa2++;
            a2.batchId = "0";
            var e2 = c3(tb), f2 = a2.shared = { props: "a0" };
            Object.keys(tb).forEach(function(a3) {
              f2[a3] = d2.def(e2, ".", a3);
            });
            var g2 = a2.next = {}, da = a2.current = {};
            Object.keys(va).forEach(function(a3) {
              Array.isArray(ta[a3]) && (g2[a3] = d2.def(f2.next, ".", a3), da[a3] = d2.def(f2.current, ".", a3));
            });
            var D = a2.constants = {};
            Object.keys(Pa).forEach(function(a3) {
              D[a3] = d2.def(JSON.stringify(Pa[a3]));
            });
            a2.invoke = function(b2, d3) {
              switch (d3.type) {
                case 0:
                  var e3 = ["this", f2.context, f2.props, a2.batchId];
                  return b2.def(c3(d3.data), ".call(", e3.slice(0, Math.max(d3.data.length + 1, 4)), ")");
                case 1:
                  return b2.def(f2.props, d3.data);
                case 2:
                  return b2.def(f2.context, d3.data);
                case 3:
                  return b2.def("this", d3.data);
                case 4:
                  return d3.data.append(a2, b2), d3.data.ref;
                case 5:
                  return d3.data.toString();
                case 6:
                  return d3.data.map(function(c4) {
                    return a2.invoke(b2, c4);
                  });
              }
            };
            a2.attribCache = {};
            var ba = {};
            a2.scopeAttrib = function(a3) {
              a3 = b.id(a3);
              if (a3 in ba)
                return ba[a3];
              var d3 = k.scope[a3];
              d3 || (d3 = k.scope[a3] = new ea());
              return ba[a3] = c3(d3);
            };
            return a2;
          }
          function t(a2) {
            var b2 = a2["static"];
            a2 = a2.dynamic;
            var c3;
            if ("profile" in b2) {
              var d2 = !!b2.profile;
              c3 = w(function(a3, b3) {
                return d2;
              });
              c3.enable = d2;
            } else if ("profile" in a2) {
              var e2 = a2.profile;
              c3 = K(e2, function(a3, b3) {
                return a3.invoke(b3, e2);
              });
            }
            return c3;
          }
          function G2(a2, b2) {
            var c3 = a2["static"], d2 = a2.dynamic;
            if ("framebuffer" in c3) {
              var e2 = c3.framebuffer;
              return e2 ? (e2 = n.getFramebuffer(e2), w(function(a3, b3) {
                var c4 = a3.link(e2), d3 = a3.shared;
                b3.set(d3.framebuffer, ".next", c4);
                d3 = d3.context;
                b3.set(d3, ".framebufferWidth", c4 + ".width");
                b3.set(d3, ".framebufferHeight", c4 + ".height");
                return c4;
              })) : w(function(a3, b3) {
                var c4 = a3.shared;
                b3.set(c4.framebuffer, ".next", "null");
                c4 = c4.context;
                b3.set(c4, ".framebufferWidth", c4 + ".drawingBufferWidth");
                b3.set(c4, ".framebufferHeight", c4 + ".drawingBufferHeight");
                return "null";
              });
            }
            if ("framebuffer" in d2) {
              var f2 = d2.framebuffer;
              return K(f2, function(a3, b3) {
                var c4 = a3.invoke(b3, f2), d3 = a3.shared, e3 = d3.framebuffer, c4 = b3.def(e3, ".getFramebuffer(", c4, ")");
                b3.set(e3, ".next", c4);
                d3 = d3.context;
                b3.set(d3, ".framebufferWidth", c4 + "?" + c4 + ".width:" + d3 + ".drawingBufferWidth");
                b3.set(d3, ".framebufferHeight", c4 + "?" + c4 + ".height:" + d3 + ".drawingBufferHeight");
                return c4;
              });
            }
            return null;
          }
          function C3(a2, b2, c3) {
            function d2(a3) {
              if (a3 in e2) {
                var c4 = e2[a3];
                a3 = true;
                var z = c4.x | 0, g3 = c4.y | 0, h2, da;
                "width" in c4 ? h2 = c4.width | 0 : a3 = false;
                "height" in c4 ? da = c4.height | 0 : a3 = false;
                return new J(!a3 && b2 && b2.thisDep, !a3 && b2 && b2.contextDep, !a3 && b2 && b2.propDep, function(a4, b3) {
                  var d3 = a4.shared.context, e3 = h2;
                  "width" in c4 || (e3 = b3.def(d3, ".", "framebufferWidth", "-", z));
                  var f3 = da;
                  "height" in c4 || (f3 = b3.def(d3, ".", "framebufferHeight", "-", g3));
                  return [z, g3, e3, f3];
                });
              }
              if (a3 in f2) {
                var ha = f2[a3];
                a3 = K(ha, function(a4, b3) {
                  var c5 = a4.invoke(b3, ha), d3 = a4.shared.context, e3 = b3.def(c5, ".x|0"), f3 = b3.def(c5, ".y|0"), z2 = b3.def('"width" in ', c5, "?", c5, ".width|0:", "(", d3, ".", "framebufferWidth", "-", e3, ")"), c5 = b3.def('"height" in ', c5, "?", c5, ".height|0:", "(", d3, ".", "framebufferHeight", "-", f3, ")");
                  return [e3, f3, z2, c5];
                });
                b2 && (a3.thisDep = a3.thisDep || b2.thisDep, a3.contextDep = a3.contextDep || b2.contextDep, a3.propDep = a3.propDep || b2.propDep);
                return a3;
              }
              return b2 ? new J(b2.thisDep, b2.contextDep, b2.propDep, function(a4, b3) {
                var c5 = a4.shared.context;
                return [0, 0, b3.def(c5, ".", "framebufferWidth"), b3.def(c5, ".", "framebufferHeight")];
              }) : null;
            }
            var e2 = a2["static"], f2 = a2.dynamic;
            if (a2 = d2("viewport")) {
              var g2 = a2;
              a2 = new J(a2.thisDep, a2.contextDep, a2.propDep, function(a3, b3) {
                var c4 = g2.append(a3, b3), d3 = a3.shared.context;
                b3.set(d3, ".viewportWidth", c4[2]);
                b3.set(d3, ".viewportHeight", c4[3]);
                return c4;
              });
            }
            return { viewport: a2, scissor_box: d2("scissor.box") };
          }
          function O2(a2, b2) {
            var c3 = a2["static"];
            if (typeof c3.frag === "string" && typeof c3.vert === "string") {
              if (0 < Object.keys(b2.dynamic).length)
                return null;
              var c3 = b2["static"], d2 = Object.keys(c3);
              if (0 < d2.length && typeof c3[d2[0]] === "number") {
                for (var e2 = [], f2 = 0; f2 < d2.length; ++f2)
                  e2.push([c3[d2[f2]] | 0, d2[f2]]);
                return e2;
              }
            }
            return null;
          }
          function H(a2, c3, d2) {
            function e2(a3) {
              if (a3 in f2) {
                var c4 = b.id(f2[a3]);
                a3 = w(function() {
                  return c4;
                });
                a3.id = c4;
                return a3;
              }
              if (a3 in g2) {
                var d3 = g2[a3];
                return K(d3, function(a4, b2) {
                  var c5 = a4.invoke(b2, d3);
                  return b2.def(a4.shared.strings, ".id(", c5, ")");
                });
              }
              return null;
            }
            var f2 = a2["static"], g2 = a2.dynamic, h2 = e2("frag"), D = e2("vert"), ba = null;
            xa(h2) && xa(D) ? (ba = u.program(D.id, h2.id, null, d2), a2 = w(function(a3, b2) {
              return a3.link(ba);
            })) : a2 = new J(h2 && h2.thisDep || D && D.thisDep, h2 && h2.contextDep || D && D.contextDep, h2 && h2.propDep || D && D.propDep, function(a3, b2) {
              var c4 = a3.shared.shader, d3;
              d3 = h2 ? h2.append(a3, b2) : b2.def(c4, ".", "frag");
              var e3;
              e3 = D ? D.append(a3, b2) : b2.def(c4, ".", "vert");
              return b2.def(c4 + ".program(" + e3 + "," + d3 + ")");
            });
            return { frag: h2, vert: D, progVar: a2, program: ba };
          }
          function M(a2, b2) {
            function c3(a3, b3) {
              if (a3 in e2) {
                var d2 = e2[a3] | 0;
                b3 ? g2.offset = d2 : g2.instances = d2;
                return w(function(a4, c4) {
                  b3 && (a4.OFFSET = d2);
                  return d2;
                });
              }
              if (a3 in f2) {
                var z = f2[a3];
                return K(z, function(a4, c4) {
                  var d3 = a4.invoke(c4, z);
                  b3 && (a4.OFFSET = d3);
                  return d3;
                });
              }
              if (b3) {
                if (ba)
                  return w(function(a4, b4) {
                    return a4.OFFSET = 0;
                  });
                if (h2)
                  return new J(D.thisDep, D.contextDep, D.propDep, function(a4, b4) {
                    return b4.def(a4.shared.vao + ".currentVAO?" + a4.shared.vao + ".currentVAO.offset:0");
                  });
              } else if (h2)
                return new J(D.thisDep, D.contextDep, D.propDep, function(a4, b4) {
                  return b4.def(a4.shared.vao + ".currentVAO?" + a4.shared.vao + ".currentVAO.instances:-1");
                });
              return null;
            }
            var e2 = a2["static"], f2 = a2.dynamic, g2 = {}, h2 = false, D = function() {
              if ("vao" in e2) {
                var a3 = e2.vao;
                a3 !== null && k.getVAO(a3) === null && (a3 = k.createVAO(a3));
                h2 = true;
                g2.vao = a3;
                return w(function(b4) {
                  var c4 = k.getVAO(a3);
                  return c4 ? b4.link(c4) : "null";
                });
              }
              if ("vao" in f2) {
                h2 = true;
                var b3 = f2.vao;
                return K(b3, function(a4, c4) {
                  var d2 = a4.invoke(c4, b3);
                  return c4.def(a4.shared.vao + ".getVAO(" + d2 + ")");
                });
              }
              return null;
            }(), ba = false, X2 = function() {
              if ("elements" in e2) {
                var a3 = e2.elements;
                g2.elements = a3;
                if (Sa(a3)) {
                  var b3 = g2.elements = d.create(a3, true), a3 = d.getElements(b3);
                  ba = true;
                } else
                  a3 && (a3 = d.getElements(a3), ba = true);
                b3 = w(function(b4, c5) {
                  if (a3) {
                    var d2 = b4.link(a3);
                    return b4.ELEMENTS = d2;
                  }
                  return b4.ELEMENTS = null;
                });
                b3.value = a3;
                return b3;
              }
              if ("elements" in f2) {
                ba = true;
                var c4 = f2.elements;
                return K(c4, function(a4, b4) {
                  var d2 = a4.shared, e3 = d2.isBufferArgs, d2 = d2.elements, f3 = a4.invoke(b4, c4), z = b4.def("null"), e3 = b4.def(e3, "(", f3, ")"), f3 = a4.cond(e3).then(z, "=", d2, ".createStream(", f3, ");")["else"](z, "=", d2, ".getElements(", f3, ");");
                  b4.entry(f3);
                  b4.exit(a4.cond(e3).then(d2, ".destroyStream(", z, ");"));
                  return a4.ELEMENTS = z;
                });
              }
              return h2 ? new J(D.thisDep, D.contextDep, D.propDep, function(a4, b4) {
                return b4.def(a4.shared.vao + ".currentVAO?" + a4.shared.elements + ".getElements(" + a4.shared.vao + ".currentVAO.elements):null");
              }) : null;
            }(), ja = c3("offset", true), m2 = function() {
              if ("primitive" in e2) {
                var a3 = e2.primitive;
                g2.primitive = a3;
                return w(function(b4, c4) {
                  return Ka[a3];
                });
              }
              if ("primitive" in f2) {
                var b3 = f2.primitive;
                return K(b3, function(a4, c4) {
                  var d2 = a4.constants.primTypes, e3 = a4.invoke(c4, b3);
                  return c4.def(d2, "[", e3, "]");
                });
              }
              return ba ? xa(X2) ? X2.value ? w(function(a4, b4) {
                return b4.def(a4.ELEMENTS, ".primType");
              }) : w(function() {
                return 4;
              }) : new J(X2.thisDep, X2.contextDep, X2.propDep, function(a4, b4) {
                var c4 = a4.ELEMENTS;
                return b4.def(c4, "?", c4, ".primType:", 4);
              }) : h2 ? new J(D.thisDep, D.contextDep, D.propDep, function(a4, b4) {
                return b4.def(a4.shared.vao + ".currentVAO?" + a4.shared.vao + ".currentVAO.primitive:4");
              }) : null;
            }(), l2 = function() {
              if ("count" in e2) {
                var a3 = e2.count | 0;
                g2.count = a3;
                return w(function() {
                  return a3;
                });
              }
              if ("count" in f2) {
                var b3 = f2.count;
                return K(b3, function(a4, c4) {
                  return a4.invoke(c4, b3);
                });
              }
              return ba ? xa(X2) ? X2 ? ja ? new J(ja.thisDep, ja.contextDep, ja.propDep, function(a4, b4) {
                return b4.def(a4.ELEMENTS, ".vertCount-", a4.OFFSET);
              }) : w(function(a4, b4) {
                return b4.def(a4.ELEMENTS, ".vertCount");
              }) : w(function() {
                return -1;
              }) : new J(X2.thisDep || ja.thisDep, X2.contextDep || ja.contextDep, X2.propDep || ja.propDep, function(a4, b4) {
                var c4 = a4.ELEMENTS;
                return a4.OFFSET ? b4.def(c4, "?", c4, ".vertCount-", a4.OFFSET, ":-1") : b4.def(c4, "?", c4, ".vertCount:-1");
              }) : h2 ? new J(D.thisDep, D.contextDep, D.propDep, function(a4, b4) {
                return b4.def(a4.shared.vao, ".currentVAO?", a4.shared.vao, ".currentVAO.count:-1");
              }) : null;
            }(), p2 = c3("instances", false);
            return { elements: X2, primitive: m2, count: l2, instances: p2, offset: ja, vao: D, vaoActive: h2, elementsActive: ba, "static": g2 };
          }
          function y(a2, b2) {
            var c3 = a2["static"], d2 = a2.dynamic, e2 = {};
            Na.forEach(function(a3) {
              function b3(z, g2) {
                if (a3 in c3) {
                  var B = z(c3[a3]);
                  e2[f2] = w(function() {
                    return B;
                  });
                } else if (a3 in d2) {
                  var h2 = d2[a3];
                  e2[f2] = K(h2, function(a4, b4) {
                    return g2(a4, b4, a4.invoke(b4, h2));
                  });
                }
              }
              var f2 = h(a3);
              switch (a3) {
                case "cull.enable":
                case "blend.enable":
                case "dither":
                case "stencil.enable":
                case "depth.enable":
                case "scissor.enable":
                case "polygonOffset.enable":
                case "sample.alpha":
                case "sample.enable":
                case "depth.mask":
                  return b3(function(a4) {
                    return a4;
                  }, function(a4, b4, c4) {
                    return c4;
                  });
                case "depth.func":
                  return b3(function(a4) {
                    return ab[a4];
                  }, function(a4, b4, c4) {
                    return b4.def(a4.constants.compareFuncs, "[", c4, "]");
                  });
                case "depth.range":
                  return b3(function(a4) {
                    return a4;
                  }, function(a4, b4, c4) {
                    a4 = b4.def("+", c4, "[0]");
                    b4 = b4.def("+", c4, "[1]");
                    return [a4, b4];
                  });
                case "blend.func":
                  return b3(function(a4) {
                    return [Ga["srcRGB" in a4 ? a4.srcRGB : a4.src], Ga["dstRGB" in a4 ? a4.dstRGB : a4.dst], Ga["srcAlpha" in a4 ? a4.srcAlpha : a4.src], Ga["dstAlpha" in a4 ? a4.dstAlpha : a4.dst]];
                  }, function(a4, b4, c4) {
                    function d3(a5, e4) {
                      return b4.def('"', a5, e4, '" in ', c4, "?", c4, ".", a5, e4, ":", c4, ".", a5);
                    }
                    a4 = a4.constants.blendFuncs;
                    var e3 = d3("src", "RGB"), f3 = d3("dst", "RGB"), e3 = b4.def(a4, "[", e3, "]"), z = b4.def(a4, "[", d3("src", "Alpha"), "]"), f3 = b4.def(a4, "[", f3, "]");
                    a4 = b4.def(a4, "[", d3("dst", "Alpha"), "]");
                    return [e3, f3, z, a4];
                  });
                case "blend.equation":
                  return b3(function(a4) {
                    if (typeof a4 === "string")
                      return [fa[a4], fa[a4]];
                    if (typeof a4 === "object")
                      return [fa[a4.rgb], fa[a4.alpha]];
                  }, function(a4, b4, c4) {
                    var d3 = a4.constants.blendEquations, e3 = b4.def(), f3 = b4.def();
                    a4 = a4.cond("typeof ", c4, '==="string"');
                    a4.then(e3, "=", f3, "=", d3, "[", c4, "];");
                    a4["else"](e3, "=", d3, "[", c4, ".rgb];", f3, "=", d3, "[", c4, ".alpha];");
                    b4(a4);
                    return [e3, f3];
                  });
                case "blend.color":
                  return b3(function(a4) {
                    return R3(4, function(b4) {
                      return +a4[b4];
                    });
                  }, function(a4, b4, c4) {
                    return R3(4, function(a5) {
                      return b4.def("+", c4, "[", a5, "]");
                    });
                  });
                case "stencil.mask":
                  return b3(function(a4) {
                    return a4 | 0;
                  }, function(a4, b4, c4) {
                    return b4.def(c4, "|0");
                  });
                case "stencil.func":
                  return b3(function(a4) {
                    return [ab[a4.cmp || "keep"], a4.ref || 0, "mask" in a4 ? a4.mask : -1];
                  }, function(a4, b4, c4) {
                    a4 = b4.def('"cmp" in ', c4, "?", a4.constants.compareFuncs, "[", c4, ".cmp]", ":", 7680);
                    var d3 = b4.def(c4, ".ref|0");
                    b4 = b4.def('"mask" in ', c4, "?", c4, ".mask|0:-1");
                    return [a4, d3, b4];
                  });
                case "stencil.opFront":
                case "stencil.opBack":
                  return b3(function(b4) {
                    return [
                      a3 === "stencil.opBack" ? 1029 : 1028,
                      Ta[b4.fail || "keep"],
                      Ta[b4.zfail || "keep"],
                      Ta[b4.zpass || "keep"]
                    ];
                  }, function(b4, c4, d3) {
                    function e3(a4) {
                      return c4.def('"', a4, '" in ', d3, "?", f3, "[", d3, ".", a4, "]:", 7680);
                    }
                    var f3 = b4.constants.stencilOps;
                    return [a3 === "stencil.opBack" ? 1029 : 1028, e3("fail"), e3("zfail"), e3("zpass")];
                  });
                case "polygonOffset.offset":
                  return b3(function(a4) {
                    return [a4.factor | 0, a4.units | 0];
                  }, function(a4, b4, c4) {
                    a4 = b4.def(c4, ".factor|0");
                    b4 = b4.def(c4, ".units|0");
                    return [a4, b4];
                  });
                case "cull.face":
                  return b3(function(a4) {
                    var b4 = 0;
                    a4 === "front" ? b4 = 1028 : a4 === "back" && (b4 = 1029);
                    return b4;
                  }, function(a4, b4, c4) {
                    return b4.def(c4, '==="front"?', 1028, ":", 1029);
                  });
                case "lineWidth":
                  return b3(function(a4) {
                    return a4;
                  }, function(a4, b4, c4) {
                    return c4;
                  });
                case "frontFace":
                  return b3(function(a4) {
                    return zb[a4];
                  }, function(a4, b4, c4) {
                    return b4.def(c4 + '==="cw"?2304:2305');
                  });
                case "colorMask":
                  return b3(function(a4) {
                    return a4.map(function(a5) {
                      return !!a5;
                    });
                  }, function(a4, b4, c4) {
                    return R3(4, function(a5) {
                      return "!!" + c4 + "[" + a5 + "]";
                    });
                  });
                case "sample.coverage":
                  return b3(function(a4) {
                    return ["value" in a4 ? a4.value : 1, !!a4.invert];
                  }, function(a4, b4, c4) {
                    a4 = b4.def('"value" in ', c4, "?+", c4, ".value:1");
                    b4 = b4.def("!!", c4, ".invert");
                    return [a4, b4];
                  });
              }
            });
            return e2;
          }
          function T2(a2, b2) {
            var c3 = a2["static"], d2 = a2.dynamic, e2 = {};
            Object.keys(c3).forEach(function(a3) {
              var b3 = c3[a3], d3;
              if (typeof b3 === "number" || typeof b3 === "boolean")
                d3 = w(function() {
                  return b3;
                });
              else if (typeof b3 === "function") {
                var f2 = b3._reglType;
                if (f2 === "texture2d" || f2 === "textureCube")
                  d3 = w(function(a4) {
                    return a4.link(b3);
                  });
                else if (f2 === "framebuffer" || f2 === "framebufferCube")
                  d3 = w(function(a4) {
                    return a4.link(b3.color[0]);
                  });
              } else
                ra(b3) && (d3 = w(function(a4) {
                  return a4.global.def("[", R3(b3.length, function(a5) {
                    return b3[a5];
                  }), "]");
                }));
              d3.value = b3;
              e2[a3] = d3;
            });
            Object.keys(d2).forEach(function(a3) {
              var b3 = d2[a3];
              e2[a3] = K(b3, function(a4, c4) {
                return a4.invoke(c4, b3);
              });
            });
            return e2;
          }
          function wa(a2, c3) {
            var d2 = a2["static"], e2 = a2.dynamic, g2 = {};
            Object.keys(d2).forEach(function(a3) {
              var c4 = d2[a3], e3 = b.id(a3), z = new ea();
              if (Sa(c4))
                z.state = 1, z.buffer = f.getBuffer(f.create(c4, 34962, false, true)), z.type = 0;
              else {
                var B = f.getBuffer(c4);
                if (B)
                  z.state = 1, z.buffer = B, z.type = 0;
                else if ("constant" in c4) {
                  var h2 = c4.constant;
                  z.buffer = "null";
                  z.state = 2;
                  typeof h2 === "number" ? z.x = h2 : Da.forEach(function(a4, b2) {
                    b2 < h2.length && (z[a4] = h2[b2]);
                  });
                } else {
                  var B = Sa(c4.buffer) ? f.getBuffer(f.create(c4.buffer, 34962, false, true)) : f.getBuffer(c4.buffer), k2 = c4.offset | 0, m2 = c4.stride | 0, l2 = c4.size | 0, oa = !!c4.normalized, p2 = 0;
                  "type" in c4 && (p2 = Ja[c4.type]);
                  c4 = c4.divisor | 0;
                  z.buffer = B;
                  z.state = 1;
                  z.size = l2;
                  z.normalized = oa;
                  z.type = p2 || B.dtype;
                  z.offset = k2;
                  z.stride = m2;
                  z.divisor = c4;
                }
              }
              g2[a3] = w(function(a4, b2) {
                var c5 = a4.attribCache;
                if (e3 in c5)
                  return c5[e3];
                var d3 = { isStream: false };
                Object.keys(z).forEach(function(a5) {
                  d3[a5] = z[a5];
                });
                z.buffer && (d3.buffer = a4.link(z.buffer), d3.type = d3.type || d3.buffer + ".dtype");
                return c5[e3] = d3;
              });
            });
            Object.keys(e2).forEach(function(a3) {
              var b2 = e2[a3];
              g2[a3] = K(b2, function(a4, c4) {
                function d3(a5) {
                  c4(B[a5], "=", e3, ".", a5, "|0;");
                }
                var e3 = a4.invoke(c4, b2), f2 = a4.shared, z = a4.constants, g3 = f2.isBufferArgs, f2 = f2.buffer, B = { isStream: c4.def(false) }, h2 = new ea();
                h2.state = 1;
                Object.keys(h2).forEach(function(a5) {
                  B[a5] = c4.def("" + h2[a5]);
                });
                var k2 = B.buffer, m2 = B.type;
                c4("if(", g3, "(", e3, ")){", B.isStream, "=true;", k2, "=", f2, ".createStream(", 34962, ",", e3, ");", m2, "=", k2, ".dtype;", "}else{", k2, "=", f2, ".getBuffer(", e3, ");", "if(", k2, "){", m2, "=", k2, ".dtype;", '}else if("constant" in ', e3, "){", B.state, "=", 2, ";", "if(typeof " + e3 + '.constant === "number"){', B[Da[0]], "=", e3, ".constant;", Da.slice(1).map(function(a5) {
                  return B[a5];
                }).join("="), "=0;", "}else{", Da.map(function(a5, b3) {
                  return B[a5] + "=" + e3 + ".constant.length>" + b3 + "?" + e3 + ".constant[" + b3 + "]:0;";
                }).join(""), "}}else{", "if(", g3, "(", e3, ".buffer)){", k2, "=", f2, ".createStream(", 34962, ",", e3, ".buffer);", "}else{", k2, "=", f2, ".getBuffer(", e3, ".buffer);", "}", m2, '="type" in ', e3, "?", z.glTypes, "[", e3, ".type]:", k2, ".dtype;", B.normalized, "=!!", e3, ".normalized;");
                d3("size");
                d3("offset");
                d3("stride");
                d3("divisor");
                c4("}}");
                c4.exit("if(", B.isStream, "){", f2, ".destroyStream(", k2, ");", "}");
                return B;
              });
            });
            return g2;
          }
          function F(a2) {
            var b2 = a2["static"], c3 = a2.dynamic, d2 = {};
            Object.keys(b2).forEach(function(a3) {
              var c4 = b2[a3];
              d2[a3] = w(function(a4, b3) {
                return typeof c4 === "number" || typeof c4 === "boolean" ? "" + c4 : a4.link(c4);
              });
            });
            Object.keys(c3).forEach(function(a3) {
              var b3 = c3[a3];
              d2[a3] = K(b3, function(a4, c4) {
                return a4.invoke(c4, b3);
              });
            });
            return d2;
          }
          function A(a2, b2, d2, e2, f2) {
            function g2(a3) {
              var b3 = p2[a3];
              b3 && (ja[a3] = b3);
            }
            var m2 = O2(a2, b2), l2 = G2(a2, f2), p2 = C3(a2, l2, f2), X2 = M(a2, f2), ja = y(a2, f2), q2 = H(a2, f2, m2);
            g2("viewport");
            g2(h("scissor.box"));
            var n2 = 0 < Object.keys(ja).length, l2 = { framebuffer: l2, draw: X2, shader: q2, state: ja, dirty: n2, scopeVAO: null, drawVAO: null, useVAO: false, attributes: {} };
            l2.profile = t(a2, f2);
            l2.uniforms = T2(d2, f2);
            l2.drawVAO = l2.scopeVAO = X2.vao;
            if (!l2.drawVAO && q2.program && !m2 && c2.angle_instanced_arrays && X2["static"].elements) {
              var r2 = true;
              a2 = q2.program.attributes.map(function(a3) {
                a3 = b2["static"][a3];
                r2 = r2 && !!a3;
                return a3;
              });
              if (r2 && 0 < a2.length) {
                var u2 = k.getVAO(k.createVAO({
                  attributes: a2,
                  elements: X2["static"].elements
                }));
                l2.drawVAO = new J(null, null, null, function(a3, b3) {
                  return a3.link(u2);
                });
                l2.useVAO = true;
              }
            }
            m2 ? l2.useVAO = true : l2.attributes = wa(b2, f2);
            l2.context = F(e2, f2);
            return l2;
          }
          function ia(a2, b2, c3) {
            var d2 = a2.shared.context, e2 = a2.scope();
            Object.keys(c3).forEach(function(f2) {
              b2.save(d2, "." + f2);
              var g2 = c3[f2].append(a2, b2);
              Array.isArray(g2) ? e2(d2, ".", f2, "=[", g2.join(), "];") : e2(d2, ".", f2, "=", g2, ";");
            });
            b2(e2);
          }
          function S(a2, b2, c3, d2) {
            var e2 = a2.shared, f2 = e2.gl, g2 = e2.framebuffer, h2;
            Ma && (h2 = b2.def(e2.extensions, ".webgl_draw_buffers"));
            var k2 = a2.constants, e2 = k2.drawBuffer, k2 = k2.backBuffer;
            a2 = c3 ? c3.append(a2, b2) : b2.def(g2, ".next");
            d2 || b2("if(", a2, "!==", g2, ".cur){");
            b2("if(", a2, "){", f2, ".bindFramebuffer(", 36160, ",", a2, ".framebuffer);");
            Ma && b2(h2, ".drawBuffersWEBGL(", e2, "[", a2, ".colorAttachments.length]);");
            b2("}else{", f2, ".bindFramebuffer(", 36160, ",null);");
            Ma && b2(h2, ".drawBuffersWEBGL(", k2, ");");
            b2("}", g2, ".cur=", a2, ";");
            d2 || b2("}");
          }
          function Aa(a2, b2, c3) {
            var d2 = a2.shared, e2 = d2.gl, f2 = a2.current, g2 = a2.next, k2 = d2.current, l2 = d2.next, m2 = a2.cond(k2, ".dirty");
            Na.forEach(function(b3) {
              b3 = h(b3);
              if (!(b3 in c3.state)) {
                var d3, B;
                if (b3 in g2) {
                  d3 = g2[b3];
                  B = f2[b3];
                  var p2 = R3(ta[b3].length, function(a3) {
                    return m2.def(d3, "[", a3, "]");
                  });
                  m2(a2.cond(p2.map(function(a3, b4) {
                    return a3 + "!==" + B + "[" + b4 + "]";
                  }).join("||")).then(e2, ".", va[b3], "(", p2, ");", p2.map(function(a3, b4) {
                    return B + "[" + b4 + "]=" + a3;
                  }).join(";"), ";"));
                } else
                  d3 = m2.def(l2, ".", b3), p2 = a2.cond(d3, "!==", k2, ".", b3), m2(p2), b3 in ua ? p2(a2.cond(d3).then(e2, ".enable(", ua[b3], ");")["else"](e2, ".disable(", ua[b3], ");"), k2, ".", b3, "=", d3, ";") : p2(e2, ".", va[b3], "(", d3, ");", k2, ".", b3, "=", d3, ";");
              }
            });
            Object.keys(c3.state).length === 0 && m2(k2, ".dirty=false;");
            b2(m2);
          }
          function I2(a2, b2, c3, d2) {
            var e2 = a2.shared, f2 = a2.current, g2 = e2.current, h2 = e2.gl;
            yb(Object.keys(c3)).forEach(function(e3) {
              var k2 = c3[e3];
              if (!d2 || d2(k2)) {
                var m2 = k2.append(a2, b2);
                if (ua[e3]) {
                  var l2 = ua[e3];
                  xa(k2) ? m2 ? b2(h2, ".enable(", l2, ");") : b2(h2, ".disable(", l2, ");") : b2(a2.cond(m2).then(h2, ".enable(", l2, ");")["else"](h2, ".disable(", l2, ");"));
                  b2(g2, ".", e3, "=", m2, ";");
                } else if (ra(m2)) {
                  var p2 = f2[e3];
                  b2(h2, ".", va[e3], "(", m2, ");", m2.map(function(a3, b3) {
                    return p2 + "[" + b3 + "]=" + a3;
                  }).join(";"), ";");
                } else
                  b2(h2, ".", va[e3], "(", m2, ");", g2, ".", e3, "=", m2, ";");
              }
            });
          }
          function N(a2, b2) {
            W && (a2.instancing = b2.def(a2.shared.extensions, ".angle_instanced_arrays"));
          }
          function E(a2, b2, c3, d2, e2) {
            function f2() {
              return typeof performance === "undefined" ? "Date.now()" : "performance.now()";
            }
            function g2(a3) {
              r2 = b2.def();
              a3(r2, "=", f2(), ";");
              typeof e2 === "string" ? a3(p2, ".count+=", e2, ";") : a3(p2, ".count++;");
              l && (d2 ? (u2 = b2.def(), a3(u2, "=", n2, ".getNumPendingQueries();")) : a3(n2, ".beginQuery(", p2, ");"));
            }
            function h2(a3) {
              a3(p2, ".cpuTime+=", f2(), "-", r2, ";");
              l && (d2 ? a3(n2, ".pushScopeStats(", u2, ",", n2, ".getNumPendingQueries(),", p2, ");") : a3(n2, ".endQuery();"));
            }
            function k2(a3) {
              var c4 = b2.def(q2, ".profile");
              b2(q2, ".profile=", a3, ";");
              b2.exit(q2, ".profile=", c4, ";");
            }
            var m2 = a2.shared, p2 = a2.stats, q2 = m2.current, n2 = m2.timer;
            c3 = c3.profile;
            var r2, u2;
            if (c3) {
              if (xa(c3)) {
                c3.enable ? (g2(b2), h2(b2.exit), k2("true")) : k2("false");
                return;
              }
              c3 = c3.append(a2, b2);
              k2(c3);
            } else
              c3 = b2.def(q2, ".profile");
            m2 = a2.block();
            g2(m2);
            b2("if(", c3, "){", m2, "}");
            a2 = a2.block();
            h2(a2);
            b2.exit("if(", c3, "){", a2, "}");
          }
          function ga(a2, b2, c3, d2, e2) {
            function f2(a3) {
              switch (a3) {
                case 35664:
                case 35667:
                case 35671:
                  return 2;
                case 35665:
                case 35668:
                case 35672:
                  return 3;
                case 35666:
                case 35669:
                case 35673:
                  return 4;
                default:
                  return 1;
              }
            }
            function g2(c4, d3, e3) {
              function f3() {
                b2("if(!", p2, ".buffer){", m2, ".enableVertexAttribArray(", l2, ");}");
                var c5 = e3.type, g3;
                g3 = e3.size ? b2.def(e3.size, "||", d3) : d3;
                b2("if(", p2, ".type!==", c5, "||", p2, ".size!==", g3, "||", n2.map(function(a3) {
                  return p2 + "." + a3 + "!==" + e3[a3];
                }).join("||"), "){", m2, ".bindBuffer(", 34962, ",", ha, ".buffer);", m2, ".vertexAttribPointer(", [l2, g3, c5, e3.normalized, e3.stride, e3.offset], ");", p2, ".type=", c5, ";", p2, ".size=", g3, ";", n2.map(function(a3) {
                  return p2 + "." + a3 + "=" + e3[a3] + ";";
                }).join(""), "}");
                W && (c5 = e3.divisor, b2("if(", p2, ".divisor!==", c5, "){", a2.instancing, ".vertexAttribDivisorANGLE(", [l2, c5], ");", p2, ".divisor=", c5, ";}"));
              }
              function k2() {
                b2("if(", p2, ".buffer){", m2, ".disableVertexAttribArray(", l2, ");", p2, ".buffer=null;", "}if(", Da.map(function(a3, b3) {
                  return p2 + "." + a3 + "!==" + q2[b3];
                }).join("||"), "){", m2, ".vertexAttrib4f(", l2, ",", q2, ");", Da.map(function(a3, b3) {
                  return p2 + "." + a3 + "=" + q2[b3] + ";";
                }).join(""), "}");
              }
              var m2 = h2.gl, l2 = b2.def(c4, ".location"), p2 = b2.def(h2.attributes, "[", l2, "]");
              c4 = e3.state;
              var ha = e3.buffer, q2 = [e3.x, e3.y, e3.z, e3.w], n2 = [
                "buffer",
                "normalized",
                "offset",
                "stride"
              ];
              c4 === 1 ? f3() : c4 === 2 ? k2() : (b2("if(", c4, "===", 1, "){"), f3(), b2("}else{"), k2(), b2("}"));
            }
            var h2 = a2.shared;
            d2.forEach(function(d3) {
              var h3 = d3.name, k2 = c3.attributes[h3], m2;
              if (k2) {
                if (!e2(k2))
                  return;
                m2 = k2.append(a2, b2);
              } else {
                if (!e2(Ab))
                  return;
                var l2 = a2.scopeAttrib(h3);
                m2 = {};
                Object.keys(new ea()).forEach(function(a3) {
                  m2[a3] = b2.def(l2, ".", a3);
                });
              }
              g2(a2.link(d3), f2(d3.info.type), m2);
            });
          }
          function Q2(a2, c3, d2, e2, f2, g2) {
            for (var h2 = a2.shared, k2 = h2.gl, m2 = {}, l2, p2 = 0; p2 < e2.length; ++p2) {
              var q2 = e2[p2], n2 = q2.name, r2 = q2.info.type, u2 = q2.info.size, t2 = d2.uniforms[n2];
              if (1 < u2) {
                if (!t2)
                  continue;
                var v2 = n2.replace("[0]", "");
                if (m2[v2])
                  continue;
                m2[v2] = 1;
              }
              var q2 = a2.link(q2) + ".location", x2;
              if (t2) {
                if (!f2(t2))
                  continue;
                if (xa(t2)) {
                  n2 = t2.value;
                  if (r2 === 35678 || r2 === 35680)
                    r2 = a2.link(n2._texture || n2.color[0]._texture), c3(k2, ".uniform1i(", q2, ",", r2 + ".bind());"), c3.exit(r2, ".unbind();");
                  else if (r2 === 35674 || r2 === 35675 || r2 === 35676)
                    u2 = a2.global.def("new Float32Array([" + Array.prototype.slice.call(n2) + "])"), n2 = 2, r2 === 35675 ? n2 = 3 : r2 === 35676 && (n2 = 4), c3(k2, ".uniformMatrix", n2, "fv(", q2, ",false,", u2, ");");
                  else {
                    switch (r2) {
                      case 5126:
                        l2 = "1f";
                        break;
                      case 35664:
                        l2 = "2f";
                        break;
                      case 35665:
                        l2 = "3f";
                        break;
                      case 35666:
                        l2 = "4f";
                        break;
                      case 35670:
                        l2 = "1i";
                        break;
                      case 5124:
                        l2 = "1i";
                        break;
                      case 35671:
                        l2 = "2i";
                        break;
                      case 35667:
                        l2 = "2i";
                        break;
                      case 35672:
                        l2 = "3i";
                        break;
                      case 35668:
                        l2 = "3i";
                        break;
                      case 35673:
                        l2 = "4i";
                        break;
                      case 35669:
                        l2 = "4i";
                    }
                    1 < u2 ? (l2 += "v", n2 = a2.global.def("[" + Array.prototype.slice.call(n2) + "]")) : n2 = ra(n2) ? Array.prototype.slice.call(n2) : n2;
                    c3(k2, ".uniform", l2, "(", q2, ",", n2, ");");
                  }
                  continue;
                } else
                  x2 = t2.append(a2, c3);
              } else {
                if (!f2(Ab))
                  continue;
                x2 = c3.def(h2.uniforms, "[", b.id(n2), "]");
              }
              r2 === 35678 ? c3("if(", x2, "&&", x2, '._reglType==="framebuffer"){', x2, "=", x2, ".color[0];", "}") : r2 === 35680 && c3("if(", x2, "&&", x2, '._reglType==="framebufferCube"){', x2, "=", x2, ".color[0];", "}");
              n2 = 1;
              switch (r2) {
                case 35678:
                case 35680:
                  r2 = c3.def(x2, "._texture");
                  c3(k2, ".uniform1i(", q2, ",", r2, ".bind());");
                  c3.exit(r2, ".unbind();");
                  continue;
                case 5124:
                case 35670:
                  l2 = "1i";
                  break;
                case 35667:
                case 35671:
                  l2 = "2i";
                  n2 = 2;
                  break;
                case 35668:
                case 35672:
                  l2 = "3i";
                  n2 = 3;
                  break;
                case 35669:
                case 35673:
                  l2 = "4i";
                  n2 = 4;
                  break;
                case 5126:
                  l2 = "1f";
                  break;
                case 35664:
                  l2 = "2f";
                  n2 = 2;
                  break;
                case 35665:
                  l2 = "3f";
                  n2 = 3;
                  break;
                case 35666:
                  l2 = "4f";
                  n2 = 4;
                  break;
                case 35674:
                  l2 = "Matrix2fv";
                  break;
                case 35675:
                  l2 = "Matrix3fv";
                  break;
                case 35676:
                  l2 = "Matrix4fv";
              }
              l2.indexOf("Matrix") === -1 && 1 < u2 && (l2 += "v", n2 = 1);
              if (l2.charAt(0) === "M") {
                c3(k2, ".uniform", l2, "(", q2, ",");
                var q2 = Math.pow(r2 - 35674 + 2, 2), y2 = a2.global.def("new Float32Array(", q2, ")");
                Array.isArray(x2) ? c3("false,(", R3(q2, function(a3) {
                  return y2 + "[" + a3 + "]=" + x2[a3];
                }), ",", y2, ")") : c3("false,(Array.isArray(", x2, ")||", x2, " instanceof Float32Array)?", x2, ":(", R3(q2, function(a3) {
                  return y2 + "[" + a3 + "]=" + x2 + "[" + a3 + "]";
                }), ",", y2, ")");
                c3(");");
              } else {
                if (1 < n2) {
                  for (var r2 = [], w2 = [], u2 = 0; u2 < n2; ++u2)
                    Array.isArray(x2) ? w2.push(x2[u2]) : w2.push(c3.def(x2 + "[" + u2 + "]")), g2 && r2.push(c3.def());
                  g2 && c3("if(!", a2.batchId, "||", r2.map(function(a3, b2) {
                    return a3 + "!==" + w2[b2];
                  }).join("||"), "){", r2.map(function(a3, b2) {
                    return a3 + "=" + w2[b2] + ";";
                  }).join(""));
                  c3(k2, ".uniform", l2, "(", q2, ",", w2.join(","), ");");
                } else
                  g2 && (r2 = c3.def(), c3("if(!", a2.batchId, "||", r2, "!==", x2, "){", r2, "=", x2, ";")), c3(k2, ".uniform", l2, "(", q2, ",", x2, ");");
                g2 && c3("}");
              }
            }
          }
          function U2(a2, b2, c3, d2) {
            function e2(f3) {
              var g3 = m2[f3];
              return g3 ? g3.contextDep && d2.contextDynamic || g3.propDep ? g3.append(a2, c3) : g3.append(a2, b2) : b2.def(k2, ".", f3);
            }
            function f2() {
              function a3() {
                c3(t2, ".drawElementsInstancedANGLE(", [n2, r2, x2, q2 + "<<((" + x2 + "-5121)>>1)", u2], ");");
              }
              function b3() {
                c3(t2, ".drawArraysInstancedANGLE(", [n2, q2, r2, u2], ");");
              }
              p2 && p2 !== "null" ? v2 ? a3() : (c3("if(", p2, "){"), a3(), c3("}else{"), b3(), c3("}")) : b3();
            }
            function g2() {
              function a3() {
                c3(l2 + ".drawElements(" + [n2, r2, x2, q2 + "<<((" + x2 + "-5121)>>1)"] + ");");
              }
              function b3() {
                c3(l2 + ".drawArrays(" + [n2, q2, r2] + ");");
              }
              p2 && p2 !== "null" ? v2 ? a3() : (c3("if(", p2, "){"), a3(), c3("}else{"), b3(), c3("}")) : b3();
            }
            var h2 = a2.shared, l2 = h2.gl, k2 = h2.draw, m2 = d2.draw, p2 = function() {
              var e3 = m2.elements, f3 = b2;
              if (e3) {
                if (e3.contextDep && d2.contextDynamic || e3.propDep)
                  f3 = c3;
                e3 = e3.append(a2, f3);
                m2.elementsActive && f3("if(" + e3 + ")" + l2 + ".bindBuffer(34963," + e3 + ".buffer.buffer);");
              } else
                e3 = f3.def(), f3(e3, "=", k2, ".", "elements", ";", "if(", e3, "){", l2, ".bindBuffer(", 34963, ",", e3, ".buffer.buffer);}", "else if(", h2.vao, ".currentVAO){", e3, "=", a2.shared.elements + ".getElements(" + h2.vao, ".currentVAO.elements);", na2 ? "" : "if(" + e3 + ")" + l2 + ".bindBuffer(34963," + e3 + ".buffer.buffer);", "}");
              return e3;
            }(), n2 = e2("primitive"), q2 = e2("offset"), r2 = function() {
              var e3 = m2.count, f3 = b2;
              if (e3) {
                if (e3.contextDep && d2.contextDynamic || e3.propDep)
                  f3 = c3;
                e3 = e3.append(a2, f3);
              } else
                e3 = f3.def(k2, ".", "count");
              return e3;
            }();
            if (typeof r2 === "number") {
              if (r2 === 0)
                return;
            } else
              c3("if(", r2, "){"), c3.exit("}");
            var u2, t2;
            W && (u2 = e2("instances"), t2 = a2.instancing);
            var x2 = p2 + ".type", v2 = m2.elements && xa(m2.elements) && !m2.vaoActive;
            W && (typeof u2 !== "number" || 0 <= u2) ? typeof u2 === "string" ? (c3("if(", u2, ">0){"), f2(), c3("}else if(", u2, "<0){"), g2(), c3("}")) : f2() : g2();
          }
          function ca(a2, b2, c3, d2, e2) {
            b2 = P();
            e2 = b2.proc("body", e2);
            W && (b2.instancing = e2.def(b2.shared.extensions, ".angle_instanced_arrays"));
            a2(b2, e2, c3, d2);
            return b2.compile().body;
          }
          function Z3(a2, b2, c3, d2) {
            N(a2, b2);
            c3.useVAO ? c3.drawVAO ? b2(a2.shared.vao, ".setVAO(", c3.drawVAO.append(a2, b2), ");") : b2(a2.shared.vao, ".setVAO(", a2.shared.vao, ".targetVAO);") : (b2(a2.shared.vao, ".setVAO(null);"), ga(a2, b2, c3, d2.attributes, function() {
              return true;
            }));
            Q2(a2, b2, c3, d2.uniforms, function() {
              return true;
            }, false);
            U2(a2, b2, b2, c3);
          }
          function Fa(a2, b2) {
            var c3 = a2.proc("draw", 1);
            N(a2, c3);
            ia(a2, c3, b2.context);
            S(a2, c3, b2.framebuffer);
            Aa(a2, c3, b2);
            I2(a2, c3, b2.state);
            E(a2, c3, b2, false, true);
            var d2 = b2.shader.progVar.append(a2, c3);
            c3(a2.shared.gl, ".useProgram(", d2, ".program);");
            if (b2.shader.program)
              Z3(a2, c3, b2, b2.shader.program);
            else {
              c3(a2.shared.vao, ".setVAO(null);");
              var e2 = a2.global.def("{}"), f2 = c3.def(d2, ".id"), g2 = c3.def(e2, "[", f2, "]");
              c3(a2.cond(g2).then(g2, ".call(this,a0);")["else"](g2, "=", e2, "[", f2, "]=", a2.link(function(c4) {
                return ca(Z3, a2, b2, c4, 1);
              }), "(", d2, ");", g2, ".call(this,a0);"));
            }
            0 < Object.keys(b2.state).length && c3(a2.shared.current, ".dirty=true;");
            a2.shared.vao && c3(a2.shared.vao, ".setVAO(null);");
          }
          function pa(a2, b2, c3, d2) {
            function e2() {
              return true;
            }
            a2.batchId = "a1";
            N(a2, b2);
            ga(a2, b2, c3, d2.attributes, e2);
            Q2(a2, b2, c3, d2.uniforms, e2, false);
            U2(a2, b2, b2, c3);
          }
          function qa(a2, b2, c3, d2) {
            function e2(a3) {
              return a3.contextDep && g2 || a3.propDep;
            }
            function f2(a3) {
              return !e2(a3);
            }
            N(a2, b2);
            var g2 = c3.contextDep, h2 = b2.def(), l2 = b2.def();
            a2.shared.props = l2;
            a2.batchId = h2;
            var k2 = a2.scope(), m2 = a2.scope();
            b2(k2.entry, "for(", h2, "=0;", h2, "<", "a1", ";++", h2, "){", l2, "=", "a0", "[", h2, "];", m2, "}", k2.exit);
            c3.needsContext && ia(a2, m2, c3.context);
            c3.needsFramebuffer && S(a2, m2, c3.framebuffer);
            I2(a2, m2, c3.state, e2);
            c3.profile && e2(c3.profile) && E(a2, m2, c3, false, true);
            d2 ? (c3.useVAO ? c3.drawVAO ? e2(c3.drawVAO) ? m2(a2.shared.vao, ".setVAO(", c3.drawVAO.append(a2, m2), ");") : k2(a2.shared.vao, ".setVAO(", c3.drawVAO.append(a2, k2), ");") : k2(a2.shared.vao, ".setVAO(", a2.shared.vao, ".targetVAO);") : (k2(a2.shared.vao, ".setVAO(null);"), ga(a2, k2, c3, d2.attributes, f2), ga(a2, m2, c3, d2.attributes, e2)), Q2(a2, k2, c3, d2.uniforms, f2, false), Q2(a2, m2, c3, d2.uniforms, e2, true), U2(a2, k2, m2, c3)) : (b2 = a2.global.def("{}"), d2 = c3.shader.progVar.append(a2, m2), l2 = m2.def(d2, ".id"), k2 = m2.def(b2, "[", l2, "]"), m2(a2.shared.gl, ".useProgram(", d2, ".program);", "if(!", k2, "){", k2, "=", b2, "[", l2, "]=", a2.link(function(b3) {
              return ca(pa, a2, c3, b3, 2);
            }), "(", d2, ");}", k2, ".call(this,a0[", h2, "],", h2, ");"));
          }
          function V(a2, b2) {
            function c3(a3) {
              return a3.contextDep && e2 || a3.propDep;
            }
            var d2 = a2.proc("batch", 2);
            a2.batchId = "0";
            N(a2, d2);
            var e2 = false, f2 = true;
            Object.keys(b2.context).forEach(function(a3) {
              e2 = e2 || b2.context[a3].propDep;
            });
            e2 || (ia(a2, d2, b2.context), f2 = false);
            var g2 = b2.framebuffer, h2 = false;
            g2 ? (g2.propDep ? e2 = h2 = true : g2.contextDep && e2 && (h2 = true), h2 || S(a2, d2, g2)) : S(a2, d2, null);
            b2.state.viewport && b2.state.viewport.propDep && (e2 = true);
            Aa(a2, d2, b2);
            I2(a2, d2, b2.state, function(a3) {
              return !c3(a3);
            });
            b2.profile && c3(b2.profile) || E(a2, d2, b2, false, "a1");
            b2.contextDep = e2;
            b2.needsContext = f2;
            b2.needsFramebuffer = h2;
            f2 = b2.shader.progVar;
            if (f2.contextDep && e2 || f2.propDep)
              qa(a2, d2, b2, null);
            else if (f2 = f2.append(a2, d2), d2(a2.shared.gl, ".useProgram(", f2, ".program);"), b2.shader.program)
              qa(a2, d2, b2, b2.shader.program);
            else {
              d2(a2.shared.vao, ".setVAO(null);");
              var g2 = a2.global.def("{}"), h2 = d2.def(f2, ".id"), l2 = d2.def(g2, "[", h2, "]");
              d2(a2.cond(l2).then(l2, ".call(this,a0,a1);")["else"](l2, "=", g2, "[", h2, "]=", a2.link(function(c4) {
                return ca(qa, a2, b2, c4, 2);
              }), "(", f2, ");", l2, ".call(this,a0,a1);"));
            }
            0 < Object.keys(b2.state).length && d2(a2.shared.current, ".dirty=true;");
            a2.shared.vao && d2(a2.shared.vao, ".setVAO(null);");
          }
          function ka2(a2, c3) {
            function d2(b2) {
              var g3 = c3.shader[b2];
              g3 && e2.set(f2.shader, "." + b2, g3.append(a2, e2));
            }
            var e2 = a2.proc("scope", 3);
            a2.batchId = "a2";
            var f2 = a2.shared, g2 = f2.current;
            ia(a2, e2, c3.context);
            c3.framebuffer && c3.framebuffer.append(a2, e2);
            yb(Object.keys(c3.state)).forEach(function(b2) {
              var d3 = c3.state[b2].append(a2, e2);
              ra(d3) ? d3.forEach(function(c4, d4) {
                e2.set(a2.next[b2], "[" + d4 + "]", c4);
              }) : e2.set(f2.next, "." + b2, d3);
            });
            E(a2, e2, c3, true, true);
            [
              "elements",
              "offset",
              "count",
              "instances",
              "primitive"
            ].forEach(function(b2) {
              var d3 = c3.draw[b2];
              d3 && e2.set(f2.draw, "." + b2, "" + d3.append(a2, e2));
            });
            Object.keys(c3.uniforms).forEach(function(d3) {
              var g3 = c3.uniforms[d3].append(a2, e2);
              Array.isArray(g3) && (g3 = "[" + g3.join() + "]");
              e2.set(f2.uniforms, "[" + b.id(d3) + "]", g3);
            });
            Object.keys(c3.attributes).forEach(function(b2) {
              var d3 = c3.attributes[b2].append(a2, e2), f3 = a2.scopeAttrib(b2);
              Object.keys(new ea()).forEach(function(a3) {
                e2.set(f3, "." + a3, d3[a3]);
              });
            });
            c3.scopeVAO && e2.set(f2.vao, ".targetVAO", c3.scopeVAO.append(a2, e2));
            d2("vert");
            d2("frag");
            0 < Object.keys(c3.state).length && (e2(g2, ".dirty=true;"), e2.exit(g2, ".dirty=true;"));
            e2("a1(", a2.shared.context, ",a0,", a2.batchId, ");");
          }
          function la2(a2) {
            if (typeof a2 === "object" && !ra(a2)) {
              for (var b2 = Object.keys(a2), c3 = 0; c3 < b2.length; ++c3)
                if (Y2.isDynamic(a2[b2[c3]]))
                  return true;
              return false;
            }
          }
          function aa2(a2, b2, c3) {
            function d2(a3, b3) {
              g2.forEach(function(c4) {
                var d3 = e2[c4];
                Y2.isDynamic(d3) && (d3 = a3.invoke(b3, d3), b3(m2, ".", c4, "=", d3, ";"));
              });
            }
            var e2 = b2["static"][c3];
            if (e2 && la2(e2)) {
              var f2 = a2.global, g2 = Object.keys(e2), h2 = false, l2 = false, k2 = false, m2 = a2.global.def("{}");
              g2.forEach(function(b3) {
                var c4 = e2[b3];
                if (Y2.isDynamic(c4))
                  typeof c4 === "function" && (c4 = e2[b3] = Y2.unbox(c4)), b3 = K(c4, null), h2 = h2 || b3.thisDep, k2 = k2 || b3.propDep, l2 = l2 || b3.contextDep;
                else {
                  f2(m2, ".", b3, "=");
                  switch (typeof c4) {
                    case "number":
                      f2(c4);
                      break;
                    case "string":
                      f2('"', c4, '"');
                      break;
                    case "object":
                      Array.isArray(c4) && f2("[", c4.join(), "]");
                      break;
                    default:
                      f2(a2.link(c4));
                  }
                  f2(";");
                }
              });
              b2.dynamic[c3] = new Y2.DynamicVariable(4, { thisDep: h2, contextDep: l2, propDep: k2, ref: m2, append: d2 });
              delete b2["static"][c3];
            }
          }
          var ea = k.Record, fa = { add: 32774, subtract: 32778, "reverse subtract": 32779 };
          c2.ext_blend_minmax && (fa.min = 32775, fa.max = 32776);
          var W = c2.angle_instanced_arrays, Ma = c2.webgl_draw_buffers, na2 = c2.oes_vertex_array_object, ta = { dirty: true, profile: g.profile }, Ea = {}, Na = [], ua = {}, va = {};
          r("dither", 3024);
          r("blend.enable", 3042);
          p("blend.color", "blendColor", [0, 0, 0, 0]);
          p("blend.equation", "blendEquationSeparate", [32774, 32774]);
          p("blend.func", "blendFuncSeparate", [1, 0, 1, 0]);
          r("depth.enable", 2929, true);
          p("depth.func", "depthFunc", 513);
          p("depth.range", "depthRange", [0, 1]);
          p("depth.mask", "depthMask", true);
          p("colorMask", "colorMask", [true, true, true, true]);
          r("cull.enable", 2884);
          p("cull.face", "cullFace", 1029);
          p("frontFace", "frontFace", 2305);
          p("lineWidth", "lineWidth", 1);
          r("polygonOffset.enable", 32823);
          p("polygonOffset.offset", "polygonOffset", [0, 0]);
          r("sample.alpha", 32926);
          r("sample.enable", 32928);
          p("sample.coverage", "sampleCoverage", [1, false]);
          r("stencil.enable", 2960);
          p("stencil.mask", "stencilMask", -1);
          p("stencil.func", "stencilFunc", [519, 0, -1]);
          p("stencil.opFront", "stencilOpSeparate", [1028, 7680, 7680, 7680]);
          p("stencil.opBack", "stencilOpSeparate", [1029, 7680, 7680, 7680]);
          r("scissor.enable", 3089);
          p("scissor.box", "scissor", [0, 0, a.drawingBufferWidth, a.drawingBufferHeight]);
          p("viewport", "viewport", [0, 0, a.drawingBufferWidth, a.drawingBufferHeight]);
          var tb = { gl: a, context: x, strings: b, next: Ea, current: ta, draw: m, elements: d, buffer: f, shader: u, attributes: k.state, vao: k, uniforms: v, framebuffer: n, extensions: c2, timer: l, isBufferArgs: Sa }, Pa = { primTypes: Ka, compareFuncs: ab, blendFuncs: Ga, blendEquations: fa, stencilOps: Ta, glTypes: Ja, orientationType: zb };
          Ma && (Pa.backBuffer = [1029], Pa.drawBuffer = R3(e.maxDrawbuffers, function(a2) {
            return a2 === 0 ? [0] : R3(a2, function(a3) {
              return 36064 + a3;
            });
          }));
          var sa2 = 0;
          return { next: Ea, current: ta, procs: function() {
            var a2 = P(), b2 = a2.proc("poll"), d2 = a2.proc("refresh"), f2 = a2.block();
            b2(f2);
            d2(f2);
            var g2 = a2.shared, h2 = g2.gl, l2 = g2.next, k2 = g2.current;
            f2(k2, ".dirty=false;");
            S(a2, b2);
            S(a2, d2, null, true);
            var m2;
            W && (m2 = a2.link(W));
            c2.oes_vertex_array_object && d2(a2.link(c2.oes_vertex_array_object), ".bindVertexArrayOES(null);");
            for (var p2 = 0; p2 < e.maxAttributes; ++p2) {
              var n2 = d2.def(g2.attributes, "[", p2, "]"), q2 = a2.cond(n2, ".buffer");
              q2.then(h2, ".enableVertexAttribArray(", p2, ");", h2, ".bindBuffer(", 34962, ",", n2, ".buffer.buffer);", h2, ".vertexAttribPointer(", p2, ",", n2, ".size,", n2, ".type,", n2, ".normalized,", n2, ".stride,", n2, ".offset);")["else"](h2, ".disableVertexAttribArray(", p2, ");", h2, ".vertexAttrib4f(", p2, ",", n2, ".x,", n2, ".y,", n2, ".z,", n2, ".w);", n2, ".buffer=null;");
              d2(q2);
              W && d2(m2, ".vertexAttribDivisorANGLE(", p2, ",", n2, ".divisor);");
            }
            d2(a2.shared.vao, ".currentVAO=null;", a2.shared.vao, ".setVAO(", a2.shared.vao, ".targetVAO);");
            Object.keys(ua).forEach(function(c3) {
              var e2 = ua[c3], g3 = f2.def(l2, ".", c3), m3 = a2.block();
              m3("if(", g3, "){", h2, ".enable(", e2, ")}else{", h2, ".disable(", e2, ")}", k2, ".", c3, "=", g3, ";");
              d2(m3);
              b2("if(", g3, "!==", k2, ".", c3, "){", m3, "}");
            });
            Object.keys(va).forEach(function(c3) {
              var e2 = va[c3], g3 = ta[c3], m3, p3, n3 = a2.block();
              n3(h2, ".", e2, "(");
              ra(g3) ? (e2 = g3.length, m3 = a2.global.def(l2, ".", c3), p3 = a2.global.def(k2, ".", c3), n3(R3(e2, function(a3) {
                return m3 + "[" + a3 + "]";
              }), ");", R3(e2, function(a3) {
                return p3 + "[" + a3 + "]=" + m3 + "[" + a3 + "];";
              }).join("")), b2("if(", R3(e2, function(a3) {
                return m3 + "[" + a3 + "]!==" + p3 + "[" + a3 + "]";
              }).join("||"), "){", n3, "}")) : (m3 = f2.def(l2, ".", c3), p3 = f2.def(k2, ".", c3), n3(m3, ");", k2, ".", c3, "=", m3, ";"), b2("if(", m3, "!==", p3, "){", n3, "}"));
              d2(n3);
            });
            return a2.compile();
          }(), compile: function(a2, b2, c3, d2, e2) {
            var f2 = P();
            f2.stats = f2.link(e2);
            Object.keys(b2["static"]).forEach(function(a3) {
              aa2(f2, b2, a3);
            });
            Xb.forEach(function(b3) {
              aa2(f2, a2, b3);
            });
            var g2 = A(a2, b2, c3, d2, f2);
            Fa(f2, g2);
            ka2(f2, g2);
            V(f2, g2);
            return L(f2.compile(), { destroy: function() {
              g2.shader.program.destroy();
            } });
          } };
        }
        function Bb(a, b) {
          for (var c2 = 0; c2 < a.length; ++c2)
            if (a[c2] === b)
              return c2;
          return -1;
        }
        var L = function(a, b) {
          for (var c2 = Object.keys(b), e = 0; e < c2.length; ++e)
            a[c2[e]] = b[c2[e]];
          return a;
        }, Db = 0, Y2 = { DynamicVariable: Z2, define: function(a, b) {
          return new Z2(a, cb(b + ""));
        }, isDynamic: function(a) {
          return typeof a === "function" && !a._reglType || a instanceof Z2;
        }, unbox: db, accessor: cb }, bb = { next: typeof requestAnimationFrame === "function" ? function(a) {
          return requestAnimationFrame(a);
        } : function(a) {
          return setTimeout(a, 16);
        }, cancel: typeof cancelAnimationFrame === "function" ? function(a) {
          return cancelAnimationFrame(a);
        } : clearTimeout }, Cb = typeof performance !== "undefined" && performance.now ? function() {
          return performance.now();
        } : function() {
          return +new Date();
        }, G = hb();
        G.zero = hb();
        var Yb = function(a, b) {
          var c2 = 1;
          b.ext_texture_filter_anisotropic && (c2 = a.getParameter(34047));
          var e = 1, f = 1;
          b.webgl_draw_buffers && (e = a.getParameter(34852), f = a.getParameter(36063));
          var d = !!b.oes_texture_float;
          if (d) {
            d = a.createTexture();
            a.bindTexture(3553, d);
            a.texImage2D(3553, 0, 6408, 1, 1, 0, 6408, 5126, null);
            var q = a.createFramebuffer();
            a.bindFramebuffer(36160, q);
            a.framebufferTexture2D(36160, 36064, 3553, d, 0);
            a.bindTexture(3553, null);
            if (a.checkFramebufferStatus(36160) !== 36053)
              d = false;
            else {
              a.viewport(0, 0, 1, 1);
              a.clearColor(1, 0, 0, 1);
              a.clear(16384);
              var n = G.allocType(5126, 4);
              a.readPixels(0, 0, 1, 1, 6408, 5126, n);
              a.getError() ? d = false : (a.deleteFramebuffer(q), a.deleteTexture(d), d = n[0] === 1);
              G.freeType(n);
            }
          }
          n = true;
          typeof navigator !== "undefined" && (/MSIE/.test(navigator.userAgent) || /Trident\//.test(navigator.appVersion) || /Edge/.test(navigator.userAgent)) || (n = a.createTexture(), q = G.allocType(5121, 36), a.activeTexture(33984), a.bindTexture(34067, n), a.texImage2D(34069, 0, 6408, 3, 3, 0, 6408, 5121, q), G.freeType(q), a.bindTexture(34067, null), a.deleteTexture(n), n = !a.getError());
          return {
            colorBits: [a.getParameter(3410), a.getParameter(3411), a.getParameter(3412), a.getParameter(3413)],
            depthBits: a.getParameter(3414),
            stencilBits: a.getParameter(3415),
            subpixelBits: a.getParameter(3408),
            extensions: Object.keys(b).filter(function(a2) {
              return !!b[a2];
            }),
            maxAnisotropic: c2,
            maxDrawbuffers: e,
            maxColorAttachments: f,
            pointSizeDims: a.getParameter(33901),
            lineWidthDims: a.getParameter(33902),
            maxViewportDims: a.getParameter(3386),
            maxCombinedTextureUnits: a.getParameter(35661),
            maxCubeMapSize: a.getParameter(34076),
            maxRenderbufferSize: a.getParameter(34024),
            maxTextureUnits: a.getParameter(34930),
            maxTextureSize: a.getParameter(3379),
            maxAttributes: a.getParameter(34921),
            maxVertexUniforms: a.getParameter(36347),
            maxVertexTextureUnits: a.getParameter(35660),
            maxVaryingVectors: a.getParameter(36348),
            maxFragmentUniforms: a.getParameter(36349),
            glsl: a.getParameter(35724),
            renderer: a.getParameter(7937),
            vendor: a.getParameter(7936),
            version: a.getParameter(7938),
            readFloat: d,
            npotTextureCube: n
          };
        }, O = function(a) {
          return a instanceof Uint8Array || a instanceof Uint16Array || a instanceof Uint32Array || a instanceof Int8Array || a instanceof Int16Array || a instanceof Int32Array || a instanceof Float32Array || a instanceof Float64Array || a instanceof Uint8ClampedArray;
        }, I = function(a) {
          return Object.keys(a).map(function(b) {
            return a[b];
          });
        }, Qa = { shape: function(a) {
          for (var b = []; a.length; a = a[0])
            b.push(a.length);
          return b;
        }, flatten: function(a, b, c2, e) {
          var f = 1;
          if (b.length)
            for (var d = 0; d < b.length; ++d)
              f *= b[d];
          else
            f = 0;
          c2 = e || G.allocType(c2, f);
          switch (b.length) {
            case 0:
              break;
            case 1:
              e = b[0];
              for (b = 0; b < e; ++b)
                c2[b] = a[b];
              break;
            case 2:
              e = b[0];
              b = b[1];
              for (d = f = 0; d < e; ++d)
                for (var q = a[d], n = 0; n < b; ++n)
                  c2[f++] = q[n];
              break;
            case 3:
              ib(a, b[0], b[1], b[2], c2, 0);
              break;
            default:
              jb(a, b, 0, c2, 0);
          }
          return c2;
        } }, Ia = {
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
        }, Ja = { int8: 5120, int16: 5122, int32: 5124, uint8: 5121, uint16: 5123, uint32: 5125, "float": 5126, float32: 5126 }, nb = { dynamic: 35048, stream: 35040, "static": 35044 }, Ua = Qa.flatten, mb = Qa.shape, na = [];
        na[5120] = 1;
        na[5122] = 2;
        na[5124] = 4;
        na[5121] = 1;
        na[5123] = 2;
        na[5125] = 4;
        na[5126] = 4;
        var Ka = { points: 0, point: 0, lines: 1, line: 1, triangles: 4, triangle: 4, "line loop": 2, "line strip": 3, "triangle strip": 5, "triangle fan": 6 }, pb = new Float32Array(1), Lb = new Uint32Array(pb.buffer), Pb = [9984, 9986, 9985, 9987], Oa = [
          0,
          6409,
          6410,
          6407,
          6408
        ], U = {};
        U[6409] = U[6406] = U[6402] = 1;
        U[34041] = U[6410] = 2;
        U[6407] = U[35904] = 3;
        U[6408] = U[35906] = 4;
        var Xa = sa("HTMLCanvasElement"), Ya = sa("OffscreenCanvas"), ub = sa("CanvasRenderingContext2D"), vb = sa("ImageBitmap"), wb = sa("HTMLImageElement"), xb = sa("HTMLVideoElement"), Mb = Object.keys(Ia).concat([Xa, Ya, ub, vb, wb, xb]), za = [];
        za[5121] = 1;
        za[5126] = 4;
        za[36193] = 2;
        za[5123] = 2;
        za[5125] = 4;
        var C2 = [];
        C2[32854] = 2;
        C2[32855] = 2;
        C2[36194] = 2;
        C2[34041] = 4;
        C2[33776] = 0.5;
        C2[33777] = 0.5;
        C2[33778] = 1;
        C2[33779] = 1;
        C2[35986] = 0.5;
        C2[35987] = 1;
        C2[34798] = 1;
        C2[35840] = 0.5;
        C2[35841] = 0.25;
        C2[35842] = 0.5;
        C2[35843] = 0.25;
        C2[36196] = 0.5;
        var Q = [];
        Q[32854] = 2;
        Q[32855] = 2;
        Q[36194] = 2;
        Q[33189] = 2;
        Q[36168] = 1;
        Q[34041] = 4;
        Q[35907] = 4;
        Q[34836] = 16;
        Q[34842] = 8;
        Q[34843] = 6;
        var Zb = function(a, b, c2, e, f) {
          function d(a2) {
            this.id = k++;
            this.refCount = 1;
            this.renderbuffer = a2;
            this.format = 32854;
            this.height = this.width = 0;
            f.profile && (this.stats = { size: 0 });
          }
          function q(b2) {
            var c3 = b2.renderbuffer;
            a.bindRenderbuffer(36161, null);
            a.deleteRenderbuffer(c3);
            b2.renderbuffer = null;
            b2.refCount = 0;
            delete u[b2.id];
            e.renderbufferCount--;
          }
          var n = { rgba4: 32854, rgb565: 36194, "rgb5 a1": 32855, depth: 33189, stencil: 36168, "depth stencil": 34041 };
          b.ext_srgb && (n.srgba = 35907);
          b.ext_color_buffer_half_float && (n.rgba16f = 34842, n.rgb16f = 34843);
          b.webgl_color_buffer_float && (n.rgba32f = 34836);
          var v = [];
          Object.keys(n).forEach(function(a2) {
            v[n[a2]] = a2;
          });
          var k = 0, u = {};
          d.prototype.decRef = function() {
            0 >= --this.refCount && q(this);
          };
          f.profile && (e.getTotalRenderbufferSize = function() {
            var a2 = 0;
            Object.keys(u).forEach(function(b2) {
              a2 += u[b2].stats.size;
            });
            return a2;
          });
          return {
            create: function(b2, c3) {
              function l(b3, c4) {
                var d2 = 0, e2 = 0, k2 = 32854;
                typeof b3 === "object" && b3 ? ("shape" in b3 ? (e2 = b3.shape, d2 = e2[0] | 0, e2 = e2[1] | 0) : ("radius" in b3 && (d2 = e2 = b3.radius | 0), "width" in b3 && (d2 = b3.width | 0), "height" in b3 && (e2 = b3.height | 0)), "format" in b3 && (k2 = n[b3.format])) : typeof b3 === "number" ? (d2 = b3 | 0, e2 = typeof c4 === "number" ? c4 | 0 : d2) : b3 || (d2 = e2 = 1);
                if (d2 !== g.width || e2 !== g.height || k2 !== g.format)
                  return l.width = g.width = d2, l.height = g.height = e2, g.format = k2, a.bindRenderbuffer(36161, g.renderbuffer), a.renderbufferStorage(36161, k2, d2, e2), f.profile && (g.stats.size = Q[g.format] * g.width * g.height), l.format = v[g.format], l;
              }
              var g = new d(a.createRenderbuffer());
              u[g.id] = g;
              e.renderbufferCount++;
              l(b2, c3);
              l.resize = function(b3, c4) {
                var d2 = b3 | 0, e2 = c4 | 0 || d2;
                if (d2 === g.width && e2 === g.height)
                  return l;
                l.width = g.width = d2;
                l.height = g.height = e2;
                a.bindRenderbuffer(36161, g.renderbuffer);
                a.renderbufferStorage(36161, g.format, d2, e2);
                f.profile && (g.stats.size = Q[g.format] * g.width * g.height);
                return l;
              };
              l._reglType = "renderbuffer";
              l._renderbuffer = g;
              f.profile && (l.stats = g.stats);
              l.destroy = function() {
                g.decRef();
              };
              return l;
            },
            clear: function() {
              I(u).forEach(q);
            },
            restore: function() {
              I(u).forEach(function(b2) {
                b2.renderbuffer = a.createRenderbuffer();
                a.bindRenderbuffer(36161, b2.renderbuffer);
                a.renderbufferStorage(36161, b2.format, b2.width, b2.height);
              });
              a.bindRenderbuffer(36161, null);
            }
          };
        }, Za = [];
        Za[6408] = 4;
        Za[6407] = 3;
        var Ra = [];
        Ra[5121] = 1;
        Ra[5126] = 4;
        Ra[36193] = 2;
        var Da = ["x", "y", "z", "w"], Xb = "blend.func blend.equation stencil.func stencil.opFront stencil.opBack sample.coverage viewport scissor.box polygonOffset.offset".split(" "), Ga = {
          0: 0,
          1: 1,
          zero: 0,
          one: 1,
          "src color": 768,
          "one minus src color": 769,
          "src alpha": 770,
          "one minus src alpha": 771,
          "dst color": 774,
          "one minus dst color": 775,
          "dst alpha": 772,
          "one minus dst alpha": 773,
          "constant color": 32769,
          "one minus constant color": 32770,
          "constant alpha": 32771,
          "one minus constant alpha": 32772,
          "src alpha saturate": 776
        }, ab = { never: 512, less: 513, "<": 513, equal: 514, "=": 514, "==": 514, "===": 514, lequal: 515, "<=": 515, greater: 516, ">": 516, notequal: 517, "!=": 517, "!==": 517, gequal: 518, ">=": 518, always: 519 }, Ta = {
          0: 0,
          zero: 0,
          keep: 7680,
          replace: 7681,
          increment: 7682,
          decrement: 7683,
          "increment wrap": 34055,
          "decrement wrap": 34056,
          invert: 5386
        }, zb = { cw: 2304, ccw: 2305 }, Ab = new J(false, false, false, function() {
        }), $b = function(a, b) {
          function c2() {
            this.endQueryIndex = this.startQueryIndex = -1;
            this.sum = 0;
            this.stats = null;
          }
          function e(a2, b2, d2) {
            var e2 = q.pop() || new c2();
            e2.startQueryIndex = a2;
            e2.endQueryIndex = b2;
            e2.sum = 0;
            e2.stats = d2;
            n.push(e2);
          }
          if (!b.ext_disjoint_timer_query)
            return null;
          var f = [], d = [], q = [], n = [], v = [], k = [];
          return { beginQuery: function(a2) {
            var c3 = f.pop() || b.ext_disjoint_timer_query.createQueryEXT();
            b.ext_disjoint_timer_query.beginQueryEXT(35007, c3);
            d.push(c3);
            e(d.length - 1, d.length, a2);
          }, endQuery: function() {
            b.ext_disjoint_timer_query.endQueryEXT(35007);
          }, pushScopeStats: e, update: function() {
            var a2, c3;
            a2 = d.length;
            if (a2 !== 0) {
              k.length = Math.max(k.length, a2 + 1);
              v.length = Math.max(v.length, a2 + 1);
              v[0] = 0;
              var e2 = k[0] = 0;
              for (c3 = a2 = 0; c3 < d.length; ++c3) {
                var l = d[c3];
                b.ext_disjoint_timer_query.getQueryObjectEXT(l, 34919) ? (e2 += b.ext_disjoint_timer_query.getQueryObjectEXT(l, 34918), f.push(l)) : d[a2++] = l;
                v[c3 + 1] = e2;
                k[c3 + 1] = a2;
              }
              d.length = a2;
              for (c3 = a2 = 0; c3 < n.length; ++c3) {
                var e2 = n[c3], g = e2.startQueryIndex, l = e2.endQueryIndex;
                e2.sum += v[l] - v[g];
                g = k[g];
                l = k[l];
                l === g ? (e2.stats.gpuTime += e2.sum / 1e6, q.push(e2)) : (e2.startQueryIndex = g, e2.endQueryIndex = l, n[a2++] = e2);
              }
              n.length = a2;
            }
          }, getNumPendingQueries: function() {
            return d.length;
          }, clear: function() {
            f.push.apply(f, d);
            for (var a2 = 0; a2 < f.length; a2++)
              b.ext_disjoint_timer_query.deleteQueryEXT(f[a2]);
            d.length = 0;
            f.length = 0;
          }, restore: function() {
            d.length = 0;
            f.length = 0;
          } };
        };
        return function(a) {
          function b() {
            if (E.length === 0)
              t && t.update(), ca = null;
            else {
              ca = bb.next(b);
              u();
              for (var a2 = E.length - 1; 0 <= a2; --a2) {
                var c3 = E[a2];
                c3 && c3(H, null, 0);
              }
              l.flush();
              t && t.update();
            }
          }
          function c2() {
            !ca && 0 < E.length && (ca = bb.next(b));
          }
          function e() {
            ca && (bb.cancel(b), ca = null);
          }
          function f(a2) {
            a2.preventDefault();
            e();
            R4.forEach(function(a3) {
              a3();
            });
          }
          function d(a2) {
            l.getError();
            h.restore();
            F.restore();
            y.restore();
            A.restore();
            O2.restore();
            S.restore();
            K2.restore();
            t && t.restore();
            I2.procs.refresh();
            c2();
            U2.forEach(function(a3) {
              a3();
            });
          }
          function q(a2) {
            function b2(a3, c4) {
              var d3 = {}, e3 = {};
              Object.keys(a3).forEach(function(b3) {
                var f3 = a3[b3];
                if (Y2.isDynamic(f3))
                  e3[b3] = Y2.unbox(f3, b3);
                else {
                  if (c4 && Array.isArray(f3)) {
                    for (var g3 = 0; g3 < f3.length; ++g3)
                      if (Y2.isDynamic(f3[g3])) {
                        e3[b3] = Y2.unbox(f3, b3);
                        return;
                      }
                  }
                  d3[b3] = f3;
                }
              });
              return { dynamic: e3, "static": d3 };
            }
            function c3(a3) {
              for (; n2.length < a3; )
                n2.push(null);
              return n2;
            }
            var d2 = b2(a2.context || {}, true), e2 = b2(a2.uniforms || {}, true), f2 = b2(a2.attributes || {}, false);
            a2 = b2(function(a3) {
              function b3(a4) {
                if (a4 in c4) {
                  var d3 = c4[a4];
                  delete c4[a4];
                  Object.keys(d3).forEach(function(b4) {
                    c4[a4 + "." + b4] = d3[b4];
                  });
                }
              }
              var c4 = L({}, a3);
              delete c4.uniforms;
              delete c4.attributes;
              delete c4.context;
              delete c4.vao;
              "stencil" in c4 && c4.stencil.op && (c4.stencil.opBack = c4.stencil.opFront = c4.stencil.op, delete c4.stencil.op);
              b3("blend");
              b3("depth");
              b3("cull");
              b3("stencil");
              b3("polygonOffset");
              b3("scissor");
              b3("sample");
              "vao" in a3 && (c4.vao = a3.vao);
              return c4;
            }(a2), false);
            var g2 = { gpuTime: 0, cpuTime: 0, count: 0 }, h2 = I2.compile(a2, f2, e2, d2, g2), k2 = h2.draw, l2 = h2.batch, m2 = h2.scope, n2 = [];
            return L(function(a3, b3) {
              var d3;
              if (typeof a3 === "function")
                return m2.call(this, null, a3, 0);
              if (typeof b3 === "function")
                if (typeof a3 === "number")
                  for (d3 = 0; d3 < a3; ++d3)
                    m2.call(this, null, b3, d3);
                else if (Array.isArray(a3))
                  for (d3 = 0; d3 < a3.length; ++d3)
                    m2.call(this, a3[d3], b3, d3);
                else
                  return m2.call(this, a3, b3, 0);
              else if (typeof a3 === "number") {
                if (0 < a3)
                  return l2.call(this, c3(a3 | 0), a3 | 0);
              } else if (Array.isArray(a3)) {
                if (a3.length)
                  return l2.call(this, a3, a3.length);
              } else
                return k2.call(this, a3);
            }, { stats: g2, destroy: function() {
              h2.destroy();
            } });
          }
          function n(a2, b2) {
            var c3 = 0;
            I2.procs.poll();
            var d2 = b2.color;
            d2 && (l.clearColor(+d2[0] || 0, +d2[1] || 0, +d2[2] || 0, +d2[3] || 0), c3 |= 16384);
            "depth" in b2 && (l.clearDepth(+b2.depth), c3 |= 256);
            "stencil" in b2 && (l.clearStencil(b2.stencil | 0), c3 |= 1024);
            l.clear(c3);
          }
          function v(a2) {
            E.push(a2);
            c2();
            return { cancel: function() {
              function b2() {
                var a3 = Bb(E, b2);
                E[a3] = E[E.length - 1];
                --E.length;
                0 >= E.length && e();
              }
              var c3 = Bb(E, a2);
              E[c3] = b2;
            } };
          }
          function k() {
            var a2 = Q2.viewport, b2 = Q2.scissor_box;
            a2[0] = a2[1] = b2[0] = b2[1] = 0;
            H.viewportWidth = H.framebufferWidth = H.drawingBufferWidth = a2[2] = b2[2] = l.drawingBufferWidth;
            H.viewportHeight = H.framebufferHeight = H.drawingBufferHeight = a2[3] = b2[3] = l.drawingBufferHeight;
          }
          function u() {
            H.tick += 1;
            H.time = x();
            k();
            I2.procs.poll();
          }
          function m() {
            A.refresh();
            k();
            I2.procs.refresh();
            t && t.update();
          }
          function x() {
            return (Cb() - G2) / 1e3;
          }
          a = Hb(a);
          if (!a)
            return null;
          var l = a.gl, g = l.getContextAttributes();
          l.isContextLost();
          var h = Ib(l, a);
          if (!h)
            return null;
          var r = Eb(), p = { vaoCount: 0, bufferCount: 0, elementsCount: 0, framebufferCount: 0, shaderCount: 0, textureCount: 0, cubeCount: 0, renderbufferCount: 0, maxTextureUnits: 0 }, w2 = h.extensions, t = $b(l, w2), G2 = Cb(), C3 = l.drawingBufferWidth, J2 = l.drawingBufferHeight, H = { tick: 0, time: 0, viewportWidth: C3, viewportHeight: J2, framebufferWidth: C3, framebufferHeight: J2, drawingBufferWidth: C3, drawingBufferHeight: J2, pixelRatio: a.pixelRatio }, C3 = { elements: null, primitive: 4, count: -1, offset: 0, instances: -1 }, M = Yb(l, w2), y = Jb(l, p, a, function(a2) {
            return K2.destroyBuffer(a2);
          }), T2 = Kb(l, w2, y, p), K2 = Sb(l, w2, M, p, y, T2, C3), F = Tb(l, r, p, a), A = Nb(l, w2, M, function() {
            I2.procs.poll();
          }, H, p, a), O2 = Zb(l, w2, M, p, a), S = Rb(l, w2, M, A, O2, p), I2 = Wb(l, r, w2, M, y, T2, A, S, {}, K2, F, C3, H, t, a), r = Ub(l, S, I2.procs.poll, H, g, w2, M), Q2 = I2.next, N = l.canvas, E = [], R4 = [], U2 = [], Z3 = [a.onDestroy], ca = null;
          N && (N.addEventListener("webglcontextlost", f, false), N.addEventListener("webglcontextrestored", d, false));
          var aa2 = S.setFBO = q({ framebuffer: Y2.define.call(null, 1, "framebuffer") });
          m();
          g = L(q, {
            clear: function(a2) {
              if ("framebuffer" in a2)
                if (a2.framebuffer && a2.framebuffer_reglType === "framebufferCube")
                  for (var b2 = 0; 6 > b2; ++b2)
                    aa2(L({ framebuffer: a2.framebuffer.faces[b2] }, a2), n);
                else
                  aa2(a2, n);
              else
                n(null, a2);
            },
            prop: Y2.define.bind(null, 1),
            context: Y2.define.bind(null, 2),
            "this": Y2.define.bind(null, 3),
            draw: q({}),
            buffer: function(a2) {
              return y.create(a2, 34962, false, false);
            },
            elements: function(a2) {
              return T2.create(a2, false);
            },
            texture: A.create2D,
            cube: A.createCube,
            renderbuffer: O2.create,
            framebuffer: S.create,
            framebufferCube: S.createCube,
            vao: K2.createVAO,
            attributes: g,
            frame: v,
            on: function(a2, b2) {
              var c3;
              switch (a2) {
                case "frame":
                  return v(b2);
                case "lost":
                  c3 = R4;
                  break;
                case "restore":
                  c3 = U2;
                  break;
                case "destroy":
                  c3 = Z3;
              }
              c3.push(b2);
              return { cancel: function() {
                for (var a3 = 0; a3 < c3.length; ++a3)
                  if (c3[a3] === b2) {
                    c3[a3] = c3[c3.length - 1];
                    c3.pop();
                    break;
                  }
              } };
            },
            limits: M,
            hasExtension: function(a2) {
              return 0 <= M.extensions.indexOf(a2.toLowerCase());
            },
            read: r,
            destroy: function() {
              E.length = 0;
              e();
              N && (N.removeEventListener("webglcontextlost", f), N.removeEventListener("webglcontextrestored", d));
              F.clear();
              S.clear();
              O2.clear();
              K2.clear();
              A.clear();
              T2.clear();
              y.clear();
              t && t.clear();
              Z3.forEach(function(a2) {
                a2();
              });
            },
            _gl: l,
            _refresh: m,
            poll: function() {
              u();
              t && t.update();
            },
            now: x,
            stats: p
          });
          a.onDone(null, g);
          return g;
        };
      });
    }
  });

  // src/lib/utils/inertial-turntable-camera.ts
  var import_transformMat4 = __toModule(require_transformMat4());
  var import_rotateY = __toModule(require_rotateY());
  var import_rotateX = __toModule(require_rotateX());
  var import_equals = __toModule(require_equals());
  var import_add = __toModule(require_add());
  var import_scaleAndAdd = __toModule(require_scaleAndAdd());
  var import_copy = __toModule(require_copy());
  var import_normalize = __toModule(require_normalize());
  var import_identity = __toModule(require_identity());
  var import_invert = __toModule(require_invert());
  var import_translate = __toModule(require_translate());
  var import_scale = __toModule(require_scale());
  var import_lookAt = __toModule(require_lookAt());
  var import_perspective = __toModule(require_perspective());
  "use strict";
  var MAX_PHI = Infinity;
  var MIN_PHI = -Infinity;
  function createCamera(opts) {
    opts = opts || {};
    let willBeDirty = true;
    const params = {
      aspectRatio: opts.aspectRatio ? opts.aspectRatio : 1,
      zoomAboutCursor: opts.zoomAboutCursor === void 0 ? true : opts.zoomAboutCursor,
      distance: opts.distance === void 0 ? 10 : opts.distance,
      phi: opts.phi === void 0 ? 0 : opts.phi,
      theta: opts.theta === void 0 ? 0 : opts.theta,
      fovY: opts.fovY === void 0 ? Math.PI / 4 : opts.fovY,
      near: opts.near === void 0 ? 0.1 : opts.near,
      far: opts.far === void 0 ? 100 : opts.far,
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
      mouseY: 0
    };
    let t0 = null;
    var camera = {
      tick: function(mergeState) {
        if (accumulator.zoom)
          params.zoom = accumulator.zoom;
        if (accumulator.dTheta)
          params.dTheta = accumulator.dTheta;
        if (accumulator.dPhi)
          params.dPhi = accumulator.dPhi;
        if (accumulator.panX)
          params.panX = accumulator.panX;
        if (accumulator.panY)
          params.panY = accumulator.panY;
        if (accumulator.panZ)
          params.panZ = accumulator.panZ;
        if (accumulator.yaw)
          params.yaw = accumulator.yaw;
        if (accumulator.pitch)
          params.pitch = accumulator.pitch;
        zeroChanges(accumulator);
        if (mergeState) {
          const cachedDPhi = params.dPhi;
          const cachedDTheta = params.dTheta;
          const cachedZoom = params.zoom;
          const cachedPanX = params.panX;
          const cachedPanY = params.panY;
          const cachedPanZ = params.panZ;
          const cachedPitch = params.pitch;
          const cachedYaw = params.yaw;
          Object.assign(params, mergeState);
          if (mergeState.dPhi !== void 0)
            params.dPhi += cachedDPhi;
          if (mergeState.dTheta !== void 0)
            params.dTheta += cachedDTheta;
          if (mergeState.zoom !== void 0)
            params.zoom += cachedZoom;
          if (mergeState.panX !== void 0)
            params.panX += cachedPanX;
          if (mergeState.panY !== void 0)
            params.panY += cachedPanY;
          if (mergeState.panZ !== void 0)
            params.panZ += cachedPanZ;
          if (mergeState.pitch !== void 0)
            params.pitch += cachedPitch;
          if (mergeState.yaw !== void 0)
            params.yaw += cachedYaw;
        }
        if (paramsVectorHasChanged()) {
          applyStateChanges();
        }
        if (viewIsChanging()) {
          applyViewChanges(params);
        } else {
          zeroChanges(params);
        }
        const t = Date.now();
        if (t0 !== null)
          decay(t - t0);
        t0 = t;
        camera.state.dirty = willBeDirty;
        willBeDirty = false;
        storeCurrentState();
      },
      taint,
      resize,
      params,
      rotate: rotate2,
      pivot,
      pan,
      zoom
    };
    camera.state = {};
    camera.state.projection = new Float32Array(16);
    camera.state.viewInv = new Float32Array(16);
    camera.state.view = new Float32Array(16);
    camera.state.width = null;
    camera.state.height = null;
    camera.state.eye = new Float32Array(3);
    const tmp = new Float32Array(3);
    const viewUp = new Float32Array(3);
    const viewRight = new Float32Array(3);
    const viewForward = new Float32Array(3);
    const origin = new Float32Array(3);
    const dView = new Float32Array(16);
    const previousState = {
      up: new Float32Array(3),
      center: new Float32Array(3)
    };
    storeCurrentState();
    function storeCurrentState() {
      (0, import_copy.default)(previousState.up, params.up);
      (0, import_copy.default)(previousState.center, params.center);
      previousState.near = params.near;
      previousState.far = params.far;
      previousState.distance = params.distance;
      previousState.phi = params.phi;
      previousState.theta = params.theta;
      previousState.fovY = params.fovY;
    }
    function paramsVectorHasChanged() {
      if (!(0, import_equals.default)(params.up, previousState.up))
        return true;
      if (!(0, import_equals.default)(params.center, previousState.center))
        return true;
      if (params.near !== previousState.near)
        return true;
      if (params.far !== previousState.far)
        return true;
      if (params.phi !== previousState.phi)
        return true;
      if (params.theta !== previousState.theta)
        return true;
      if (params.distance !== previousState.distance)
        return true;
      if (params.fovY !== previousState.fovY)
        return true;
      return false;
    }
    const paramsChanges = {};
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
      (0, import_rotateX.default)(camera.state.eye, camera.state.eye, origin, -params.phi);
      (0, import_rotateY.default)(camera.state.eye, camera.state.eye, origin, params.theta);
      (0, import_add.default)(camera.state.eye, camera.state.eye, params.center);
      (0, import_lookAt.default)(camera.state.view, camera.state.eye, params.center, params.up);
      (0, import_perspective.default)(camera.state.projection, params.fovY, camera.params.aspectRatio, params.near, params.far);
      (0, import_invert.default)(camera.state.viewInv, camera.state.view);
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
      if (Math.abs(params.zoom) > 1e-4)
        return true;
      if (Math.abs(params.panX) > 1e-4)
        return true;
      if (Math.abs(params.panY) > 1e-4)
        return true;
      if (Math.abs(params.panZ) > 1e-4)
        return true;
      if (Math.abs(params.dTheta) > 1e-4)
        return true;
      if (Math.abs(params.dPhi) > 1e-4)
        return true;
      if (Math.abs(params.yaw) > 1e-4)
        return true;
      if (Math.abs(params.pitch) > 1e-4)
        return true;
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
      const panDecay = params.panDecayTime ? Math.exp(-dt / params.panDecayTime / Math.LN2) : 0;
      const zoomDecay = params.zoomDecayTime ? Math.exp(-dt / params.zoomDecayTime / Math.LN2) : 0;
      const rotateDecay = params.rotationDecayTime ? Math.exp(-dt / params.rotationDecayTime / Math.LN2) : 0;
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
      const scaleFactor = camera.params.distance * Math.tan(camera.params.fovY * 0.5) * 2;
      accumulator.panX += panX * params.aspectRatio * scaleFactor;
      accumulator.panY += panY * scaleFactor;
      return camera;
    }
    function zoom(mouseX, mouseY, zoom2) {
      accumulator.zoom += zoom2;
      params.mouseX = mouseX;
      params.mouseY = mouseY;
      return camera;
    }
    function pivot(yaw, pitch) {
      const scaleFactor = camera.params.fovY;
      accumulator.yaw += yaw * scaleFactor * params.aspectRatio;
      accumulator.pitch += pitch * scaleFactor;
    }
    function rotate2(dTheta, dPhi) {
      accumulator.dTheta += dTheta;
      accumulator.dPhi += dPhi;
    }
    function applyViewChanges(changes) {
      let zoomScaleFactor;
      (0, import_identity.default)(dView);
      if (params.zoomAboutCursor) {
        zoomScaleFactor = params.distance * Math.tan(params.fovY * 0.5);
        tmp[0] = changes.mouseX * params.aspectRatio * zoomScaleFactor;
        tmp[1] = changes.mouseY * zoomScaleFactor;
        tmp[2] = 0;
        (0, import_translate.default)(dView, dView, tmp);
      }
      tmp[0] = 1 + changes.zoom;
      tmp[1] = 1 + changes.zoom;
      tmp[2] = 1;
      (0, import_scale.default)(dView, dView, tmp);
      if (params.zoomAboutCursor) {
        zoomScaleFactor = params.distance * Math.tan(params.fovY * 0.5);
        tmp[0] = -changes.mouseX * params.aspectRatio * zoomScaleFactor;
        tmp[1] = -changes.mouseY * zoomScaleFactor;
        tmp[2] = 0;
        (0, import_translate.default)(dView, dView, tmp);
      }
      dView[12] -= changes.panX * 0.5;
      dView[13] -= changes.panY * 0.5;
      (0, import_transformMat4.default)(params.center, params.center, camera.state.view);
      (0, import_transformMat4.default)(params.center, params.center, dView);
      (0, import_transformMat4.default)(params.center, params.center, camera.state.viewInv);
      if (params.rotateAboutCenter) {
        (0, import_copy.default)(params.rotationCenter, params.center);
      }
      params.distance *= 1 + changes.zoom;
      const prevPhi = params.phi;
      params.phi += changes.dPhi;
      params.phi = Math.min(MAX_PHI, Math.max(MIN_PHI, params.phi));
      const dPhi = params.phi - prevPhi;
      const prevTheta = params.theta;
      params.theta += changes.dTheta;
      const dTheta = params.theta - prevTheta;
      (0, import_rotateY.default)(params.center, params.center, params.rotationCenter, dTheta - params.theta);
      (0, import_rotateX.default)(params.center, params.center, params.rotationCenter, -dPhi);
      (0, import_rotateY.default)(params.center, params.center, params.rotationCenter, params.theta);
      if (changes.yaw !== 0 || changes.pitch !== 0) {
        viewRight[0] = camera.state.view[0];
        viewRight[1] = camera.state.view[4];
        viewRight[2] = camera.state.view[8];
        (0, import_normalize.default)(viewRight, viewRight);
        viewUp[0] = camera.state.view[1];
        viewUp[1] = camera.state.view[5];
        viewUp[2] = camera.state.view[9];
        (0, import_normalize.default)(viewUp, viewUp);
        viewForward[0] = camera.state.view[2];
        viewForward[1] = camera.state.view[6];
        viewForward[2] = camera.state.view[10];
        (0, import_normalize.default)(viewForward, viewForward);
        const clippedPhi = Math.min(MAX_PHI, Math.max(MIN_PHI, params.phi + changes.pitch * 0.5));
        const clippedPitch = clippedPhi - params.phi;
        (0, import_scaleAndAdd.default)(params.center, params.center, viewRight, -Math.sin(changes.yaw * 0.5) * params.distance);
        (0, import_scaleAndAdd.default)(params.center, params.center, viewUp, -Math.sin(clippedPitch) * params.distance);
        (0, import_scaleAndAdd.default)(params.center, params.center, viewForward, (2 - Math.cos(changes.yaw * 0.5) - Math.cos(clippedPitch)) * params.distance);
        params.phi = clippedPhi;
        params.theta += changes.yaw * 0.5;
      }
      computeMatrices();
      taint();
    }
    resize(camera.params.aspectRatio);
    return camera;
  }

  // src/lib/utils/normalized-interaction-events.ts
  var import_mouse_change = __toModule(require_mouse_listen());
  var import_mouse_event_offset = __toModule(require_mouse_event_offset());
  var import_event_emitter = __toModule(require_event_emitter());
  "use strict";
  var EVENT_LISTENER_OPTIONS = { passive: true, capture: false };
  function normalizedInteractionEvents(element) {
    element = element || window;
    const emitter = (0, import_event_emitter.default)();
    const previousPosition = [null, null];
    const previousFingerPosition = [null, null];
    const currentPosition = [null, null];
    const fingers = [null, null];
    let activeTouchCount = 0;
    const ev = {};
    let width, height;
    const getSize = element === window ? function() {
      width = window.innerWidth;
      height = window.innerHeight;
    } : function() {
      width = element.clientWidth;
      height = element.clientHeight;
    };
    let buttons = 0;
    let mouseX, mouseY, mods = {};
    const changeListener = (0, import_mouse_change.default)(element, function(pbuttons, px, py, pmods) {
      mouseX = px;
      mouseY = py;
      buttons = pbuttons;
      mods = pmods;
    });
    function onWheel(event) {
      (0, import_mouse_event_offset.default)(event, element, currentPosition);
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
      emitter.emit("wheel", ev);
      previousPosition[0] = currentPosition[0];
      previousPosition[1] = currentPosition[1];
    }
    let x0 = null;
    let y0 = null;
    let active = 0;
    function onMouseUp(event) {
      (0, import_mouse_event_offset.default)(event, element, currentPosition);
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
      emitter.emit("mouseup", ev);
      x0 = y0 = null;
      previousPosition[0] = currentPosition[0];
      previousPosition[1] = currentPosition[1];
    }
    function onMouseDown(event) {
      (0, import_mouse_event_offset.default)(event, element, currentPosition);
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
      emitter.emit("mousedown", ev);
      previousPosition[0] = currentPosition[0];
      previousPosition[1] = currentPosition[1];
    }
    function onMouseMove(event) {
      (0, import_mouse_event_offset.default)(event, element, currentPosition);
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
      emitter.emit("mousemove", ev);
      previousPosition[0] = currentPosition[0];
      previousPosition[1] = currentPosition[1];
    }
    function indexOfTouch(touch) {
      const id = touch.identifier;
      for (let i = 0; i < fingers.length; i++) {
        if (fingers[i] && fingers[i].touch && fingers[i].touch.identifier === id) {
          return i;
        }
      }
      return -1;
    }
    function onTouchStart(event) {
      previousFingerPosition[0] = null;
      previousFingerPosition[1] = null;
      for (let i = 0; i < event.changedTouches.length; i++) {
        const newTouch = event.changedTouches[i];
        const id = newTouch.identifier;
        const idx = indexOfTouch(id);
        if (idx === -1 && activeTouchCount < 2) {
          const newIndex = fingers[0] ? 1 : 0;
          const newFinger = {
            position: [0, 0],
            touch: null
          };
          fingers[newIndex] = newFinger;
          activeTouchCount++;
          newFinger.touch = newTouch;
          (0, import_mouse_event_offset.default)(newTouch, element, newFinger.position);
        }
      }
      let xavg = 0;
      let yavg = 0;
      let fingerCount = 0;
      for (let i = 0; i < fingers.length; i++) {
        if (!fingers[i])
          continue;
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
          const dy = (fingers[0].position[1] - fingers[1].position[1]) * width / height;
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
        emitter.emit(activeTouchCount === 1 ? "touchstart" : "pinchstart", ev);
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
          (0, import_mouse_event_offset.default)(movedTouch, element, fingers[idx].position);
        }
      }
      if (changed) {
        if (activeTouchCount === 1) {
          for (idx = 0; idx < fingers.length; idx++) {
            if (fingers[idx])
              break;
          }
          if (fingers[idx] && previousFingerPosition[idx]) {
            const x = fingers[idx].position[0];
            const y = fingers[idx].position[1];
            const dx = x - previousFingerPosition[idx][0];
            const dy = y - previousFingerPosition[idx][1];
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
            emitter.emit("touchmove", ev);
          }
        } else if (activeTouchCount === 2) {
          if (previousFingerPosition[0] && previousFingerPosition[1]) {
            const pos0A = previousFingerPosition[0];
            const pos0B = previousFingerPosition[1];
            const dx0 = pos0B[0] - pos0A[0];
            const dy0 = (pos0B[1] - pos0A[1]) * width / height;
            const pos1A = fingers[0].position;
            const pos1B = fingers[1].position;
            const dx1 = pos1B[0] - pos1A[0];
            const dy1 = (pos1A[1] - pos1B[1]) * width / height;
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
            emitter.emit("pinchmove", ev);
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
        const idx = indexOfTouch(removed);
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
          if (!fingers[i])
            continue;
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
        emitter.emit(activeTouchCount === 0 ? "touchend" : "pinchend", ev);
      }
      if (activeTouchCount === 0) {
        x0 = y0 = null;
      }
    }
    let enabled = false;
    function enable() {
      if (enabled)
        return;
      enabled = true;
      changeListener.enabled = true;
      element.addEventListener("wheel", onWheel, EVENT_LISTENER_OPTIONS);
      element.addEventListener("mousedown", onMouseDown, EVENT_LISTENER_OPTIONS);
      window.addEventListener("mousemove", onMouseMove, EVENT_LISTENER_OPTIONS);
      window.addEventListener("mouseup", onMouseUp, EVENT_LISTENER_OPTIONS);
      element.addEventListener("touchstart", onTouchStart, EVENT_LISTENER_OPTIONS);
      window.addEventListener("touchmove", onTouchMove, EVENT_LISTENER_OPTIONS);
      window.addEventListener("touchend", onTouchRemoved, EVENT_LISTENER_OPTIONS);
      window.addEventListener("touchcancel", onTouchRemoved, EVENT_LISTENER_OPTIONS);
    }
    function disable() {
      if (!enabled)
        return;
      enabled = false;
      changeListener.enabled = false;
      element.removeEventListener("wheel", onWheel, EVENT_LISTENER_OPTIONS);
      element.removeEventListener("mousedown", onMouseDown, EVENT_LISTENER_OPTIONS);
      window.removeEventListener("mousemove", onMouseMove, EVENT_LISTENER_OPTIONS);
      window.removeEventListener("mouseup", onMouseUp, EVENT_LISTENER_OPTIONS);
      element.removeEventListener("touchstart", onTouchStart, EVENT_LISTENER_OPTIONS);
      window.removeEventListener("touchmove", onTouchMove, EVENT_LISTENER_OPTIONS);
      window.removeEventListener("touchend", onTouchRemoved, EVENT_LISTENER_OPTIONS);
      window.removeEventListener("touchcancel", onTouchRemoved, EVENT_LISTENER_OPTIONS);
    }
    enable();
    emitter.enable = enable;
    emitter.disable = disable;
    return emitter;
  }

  // src/lib/utils/Lethargy.ts
  var Lethargy = class {
    constructor(stability, sensitivity, tolerance, delay) {
      this.stability = stability != null ? Math.abs(stability) : 8;
      this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 100;
      this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1;
      this.delay = delay != null ? delay : 150;
      this.lastUpDeltas = [];
      let i, ref;
      for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
        this.lastUpDeltas.push(null);
      }
      this.lastDownDeltas = [];
      for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
        this.lastDownDeltas.push(null);
      }
      this.deltasTimestamp = [];
      for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {
        this.deltasTimestamp.push(null);
      }
    }
    check(e) {
      let lastDelta;
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
        return this.isInertia(1);
      } else {
        this.lastDownDeltas.push(lastDelta);
        this.lastDownDeltas.shift();
        return this.isInertia(-1);
      }
    }
    isInertia(direction) {
      let lastDeltas, lastDeltasNew, lastDeltasOld, newAverage, newSum, oldAverage, oldSum;
      lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;
      if (lastDeltas[0] === null) {
        return direction;
      }
      if (this.deltasTimestamp[this.stability * 2 - 2] + this.delay > Date.now() && lastDeltas[0] === lastDeltas[this.stability * 2 - 1]) {
        return false;
      }
      lastDeltasOld = lastDeltas.slice(0, this.stability);
      lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);
      oldSum = lastDeltasOld.reduce(function(t, s) {
        return t + s;
      });
      newSum = lastDeltasNew.reduce(function(t, s) {
        return t + s;
      });
      oldAverage = oldSum / lastDeltasOld.length;
      newAverage = newSum / lastDeltasNew.length;
      if (Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) && this.sensitivity < Math.abs(newAverage)) {
        return direction;
      } else {
        return false;
      }
    }
    showLastUpDeltas() {
      return this.lastUpDeltas;
    }
    showLastDownDeltas() {
      return this.lastDownDeltas;
    }
  };

  // src/lib/utils/freeCameraFactory.mjs
  function freeCameraFactory_default(regl, options) {
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
      ...options.aspectRatio && { aspectRatio: options.aspectRatio }
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
      };
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
        const dt = (Date.now() - aCamera.autorotateT0) / 1e3;
        aCamera.params.distance = aCamera.autorotateParams.distance + 0.1 * Math.sin(autorotateDistance * dt);
        aCamera.params.theta = aCamera.autorotateParams.theta + autorotateSpeedTheta * dt;
        aCamera.params.phi = aCamera.autorotateParams.phi + 0.05 * Math.sin(autorotateSpeedPhi * dt);
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
    return aCamera;
  }
  function initializeCameraControls(camera, canvas, { minDistance, maxDistance }) {
    const lethargy = new Lethargy();
    const radiansPerHalfScreenWidth = Math.PI * 0.5;
    normalizedInteractionEvents(canvas).on("wheel", function(ev) {
      camera.autorotate = false;
      if (!ev.active)
        return;
      if (lethargy.check(ev) !== false) {
        if (camera.params.distance <= maxDistance)
          camera.zoom(ev.x, ev.y, 0.2 * (Math.exp(-ev.dy) - 1));
        camera.params.distance = Math.max(minDistance, Math.min(maxDistance, camera.params.distance));
      }
    }).on("mousemove", function(ev) {
      if (!ev.active || ev.buttons !== 1)
        return;
      camera.autorotate = false;
      if (ev.mods.shift) {
        camera.pan(ev.dx, ev.dy);
      } else if (ev.mods.meta) {
      } else {
        camera.rotate(-ev.dx * radiansPerHalfScreenWidth, -ev.dy * radiansPerHalfScreenWidth);
      }
    }).on("touchmove", function(ev) {
      camera.autorotate = false;
      if (!ev.active)
        return;
      camera.rotate(-ev.dx * radiansPerHalfScreenWidth, -ev.dy * radiansPerHalfScreenWidth);
    });
  }

  // ../config/src/distributions/distributions.ts
  var ID = (x) => Math.sign(x) * Math.abs(x);
  var line = ({ swizzle = (x) => [x, 0, 0], round = ID }) => (n = 0, d = 0) => {
    const dOffset = d * (n - 1) / 2;
    return Array(n).fill(0).map((zero, i) => swizzle(round(i * d - dOffset)));
  };
  var square = ({ swizzle = (x, y) => [x, y, 0], round = ID }) => ({ n = 0, d = 0 }) => {
    const nx = Math.ceil(Math.sqrt(n));
    const ny = Math.ceil(n / nx);
    const dOffsetX = d * (nx - 1) / 2;
    const dOffsetY = d * (ny - 1) / 2;
    return Array(n).fill(0).map((zero, i) => {
      const ix = i % nx;
      const iy = Math.floor(i / nx);
      return swizzle(round(ix * d - dOffsetX), round(iy * d - dOffsetY));
    });
  };
  var golden_angle = Math.PI * (3 - Math.sqrt(5));
  var spiralDistribution = ({ swizzle = (x, y) => [x, y, 0], round = ID }) => ({ n = 0, d = golden_angle }) => {
    return Array(n).fill(0).map((zero, i) => {
      const theta = i * golden_angle;
      const r = Math.sqrt(i) / Math.sqrt(n) * d * 3;
      return swizzle(round(r * Math.cos(theta)), round(r * Math.sin(theta)));
    });
  };
  var DISTRIBUTIONS = new Map();
  DISTRIBUTIONS.set("SQUARE_XY", square({
    swizzle: (a, b) => [a, b, 0]
  }));
  DISTRIBUTIONS.set("SQUARE_XZ", square({
    swizzle: (a, b) => [a, 0, b]
  }));
  DISTRIBUTIONS.set("SQUARE_YZ", square({
    swizzle: (a, b) => [0, a, b]
  }));
  DISTRIBUTIONS.set("ROW_X", line({
    swizzle: (x) => [x, 0, 0]
  }));
  DISTRIBUTIONS.set("ROW_Y", line({
    swizzle: (y) => [0, y, 0]
  }));
  DISTRIBUTIONS.set("ROW_Z", line({
    swizzle: (z) => [0, 0, z]
  }));
  DISTRIBUTIONS.set("COLUMN", line({
    swizzle: (y) => [0, y, 0]
  }));
  DISTRIBUTIONS.set("SPIRAL_XY", square({
    swizzle: (a, b) => [a, b, 0]
  }));
  DISTRIBUTIONS.set("SPIRAL_XY", spiralDistribution({
    swizzle: (x, y) => [x, y, 0]
  }));
  DISTRIBUTIONS.set("SPIRAL_YZ", spiralDistribution({
    swizzle: (y, z) => [0, y, z]
  }));

  // ../config/src/constants.ts
  var RUNNER_MODE = {
    NOBREAK: "nobreak",
    STEPWISE: "stepwise"
  };
  var DRIF = "DRIF";
  var QUAD = "QUAD";
  var SBEN = "SBEN";
  var ESTA = "ESTA";
  var LATTICE_ELEMENT_TYPES = {
    DRIF,
    SBEN,
    QUAD,
    ESTA
  };
  var C = 299792458;

  // ../config/src/presets/_default.ts
  var default_default = {
    name: "default",
    debug: {
      logPushing: false,
      logPerformance: true,
      showInfo: true,
      showTextures: false,
      showTextureScale: 10
    },
    runner: {
      pusher: "glsl",
      factor: 1,
      enabled: true,
      packFloat2UInt8: false,
      prerender: true,
      loops: 0,
      mode: RUNNER_MODE.NOBREAK,
      snapshotsPerTick: 1,
      iterationsPerSnapshot: 2,
      iterationDurationOverC: 0.025,
      snapshotCount: 256
    },
    model: {
      boundingBoxSize: 0,
      emitter: {
        particleType: "ELECTRON",
        bunchShape: "SPIRAL_XY",
        particleCount: 128,
        particleSeparation: 0.05,
        gamma: () => 6,
        positionJitter: [0, 0, 0]
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
      pathicleWidth: 15e-4,
      showAxes: true,
      showVignette: true,
      viewRange: [0, 1],
      camera: {
        center: [0, 0, 0],
        distance: 2,
        phi: 15 / 360 * 2 * Math.PI,
        theta: 45 / 360 * 2 * Math.PI,
        fovY: 5 * Math.PI / (360 / 10),
        autorotate: false,
        autorotateDistance: 0.1 * 2 * Math.PI,
        autorotateSpeedTheta: 0.1 * 2 * Math.PI,
        autorotateSpeedPhi: 0.1 * 2 * Math.PI,
        zoomDecayTime: 1,
        far: 200,
        near: 1e-4,
        minDistance: 0.1,
        maxDistance: 20
      }
    }
  };

  // ../config/src/presets/csr.ts
  var csr_default = {
    name: "csr",
    view: {
      camera: {
        center: [0, 1, 0],
        distance: 15,
        phi: 15 / 360 * 2 * Math.PI,
        theta: 90 / 360 * 2 * Math.PI
      }
    },
    runner: {
      loops: 0,
      iterationDurationOverC: 0.01,
      snapshotCount: 128
    },
    model: {
      emitter: {
        particleType: "ELECTRON",
        bunchShape: "SPIRAL_XY",
        gamma: 2.5
      },
      interactions: {
        magneticField: [0, 0, 0],
        particleInteraction: false
      },
      lattice: {
        elements: {
          l0: {
            type: LATTICE_ELEMENT_TYPES.DRIF,
            l: 1.43
          },
          l1: {
            type: LATTICE_ELEMENT_TYPES.DRIF,
            l: 1
          },
          l_: {
            type: LATTICE_ELEMENT_TYPES.DRIF,
            l: 0.25
          },
          l2: {
            type: LATTICE_ELEMENT_TYPES.DRIF,
            l: 0.35
          },
          q1: {
            type: LATTICE_ELEMENT_TYPES.QUAD,
            k1: 2.87506832355,
            l: 0.25
          },
          q2: {
            type: LATTICE_ELEMENT_TYPES.QUAD,
            k1: -6.31393492954,
            l: 0.25
          },
          q3: {
            type: LATTICE_ELEMENT_TYPES.QUAD,
            k1: 4.36962492724,
            l: 0.25
          },
          q4: {
            type: LATTICE_ELEMENT_TYPES.QUAD,
            strength: 0.01,
            l: 0.25
          },
          d1: {
            type: LATTICE_ELEMENT_TYPES.SBEN,
            l: 1,
            strength: 21e-4,
            angle: -(2 * Math.PI / 360) * 45
          },
          bm: {
            type: LATTICE_ELEMENT_TYPES.SBEN,
            angle: 0.78539816,
            e1: 0.39269908,
            e2: 0.39269908,
            l: 1.8,
            strength: 1e-4
          }
        },
        beamline: [
          "l1",
          "d1",
          "l1",
          "d1",
          "l1",
          "d1",
          "l1",
          "d1",
          "l1",
          "d1",
          "l1",
          "d1",
          "l1",
          "d1",
          "l1",
          "d1"
        ],
        origin: {
          phi: 0,
          position: [-0.5, 1, -0.5]
        }
      }
    }
  };

  // ../config/src/presets/story-dipole.ts
  var story_dipole_default = {
    name: "story-dipole",
    view: {
      camera: {
        center: [0, 1, 0],
        distance: 7,
        theta: 0 / 360 * 2 * Math.PI,
        phi: 8 / 360 * 2 * Math.PI
      }
    },
    runner: {},
    model: {
      emitter: {
        particleType: "ELECTRON"
      },
      lattice: {
        elements: {
          l1: {
            type: LATTICE_ELEMENT_TYPES.DRIF,
            l: 4.5
          },
          d1: {
            type: LATTICE_ELEMENT_TYPES.SBEN,
            l: 1,
            strength: 75e-5,
            angle: 2 * Math.PI / 360 * 0
          }
        },
        beamline: [
          "l1",
          "d1"
        ],
        origin: {
          phi: 0 / 360 * 2 * Math.PI,
          position: [0, 1, -5]
        }
      }
    }
  };

  // ../config/src/presets/spiral.ts
  var spiral_default = {
    name: "spiral",
    view: {
      camera: {
        center: [0, 1.5, 0],
        distance: 2,
        theta: 95 * (Math.PI / 180),
        phi: 2 * (Math.PI / 180)
      }
    },
    runner: {
      iterationCount: 1024 * 1 - 1,
      snapshotCount: 1024
    },
    model: {
      emitter: {
        bunchShape: "SPIRAL_XY",
        direction: [0, 0.15, 1],
        particleCount: 256,
        gamma: 5
      },
      interactions: {
        magneticField: [0, 0.01, 0],
        particleInteraction: false
      },
      lattice: {
        beamline: [],
        origin: {
          phi: 0,
          position: [0, 0, 0]
        }
      }
    }
  };

  // ../config/src/presets/pathicles-logo.ts
  var pathicles_logo_default = {
    name: "pathicles-logo",
    view: {
      camera: {
        center: [0.12, 0.5, 0],
        distance: 2,
        theta: -5 / 360 * 2 * Math.PI,
        phi: -2 / 360 * 2 * Math.PI
      }
    },
    runner: {
      iterationDurationOverC: 0.05
    },
    model: {
      emitter: {
        particleType: "ELECTRON PHOTON PROTON",
        position: [0, 0.5, -10],
        direction: [0, 0, 1]
      },
      lattice: {},
      beamline: [],
      origin: {
        phi: 0 / 360 * 2 * Math.PI,
        position: [0, 1, -5]
      }
    }
  };

  // ../config/src/presets/story-electric.ts
  var story_electric_default = {
    name: "story-electric",
    view: {
      camera: {
        center: [0, 1, 0],
        distance: 5,
        theta: 45 / 360 * 2 * Math.PI,
        phi: 10 / 360 * 2 * Math.PI
      }
    },
    model: {
      emitter: {
        particleType: "ELECTRON PHOTON PROTON"
      },
      lattice: {
        elements: {
          l: {
            type: LATTICE_ELEMENT_TYPES.DRIF,
            l: 4.75
          },
          e: {
            type: LATTICE_ELEMENT_TYPES.ESTA,
            l: 0.5,
            strength: -10
          }
        },
        beamline: ["l", "e", "l"],
        origin: {
          phi: 0,
          position: [0, 1, -5]
        }
      }
    }
  };

  // ../config/src/presets/story-quadrupole.ts
  var quadLength = 0.5;
  var quadF = 0.5;
  var quadStrength = 2 * 0.5 / quadF / quadLength;
  var story_quadrupole_default = {
    name: "story-quadrupole",
    view: {
      camera: {
        center: [0, 1, 0],
        distance: 7,
        theta: 45 / 360 * 2 * Math.PI,
        phi: 5 / 360 * 2 * Math.PI
      }
    },
    model: {
      emitter: {
        particleType: "PROTON"
      },
      lattice: {
        elements: {
          q1: {
            type: LATTICE_ELEMENT_TYPES.QUAD,
            strength: quadStrength,
            l: quadLength
          },
          q2: {
            type: LATTICE_ELEMENT_TYPES.QUAD,
            strength: -quadStrength,
            l: quadLength
          },
          l_5: {
            type: LATTICE_ELEMENT_TYPES.DRIF,
            l: 5
          },
          l_20: {
            type: LATTICE_ELEMENT_TYPES.DRIF,
            l: 20
          },
          l_1: {
            type: LATTICE_ELEMENT_TYPES.DRIF,
            l: 1
          }
        },
        beamline: [
          "l_1",
          "q1",
          "l_1",
          "q2",
          "l_1",
          "q1",
          "l_1",
          "q2",
          "l_1",
          "q1",
          "l_1",
          "q2",
          "l_1"
        ],
        origin: {
          phi: 0,
          position: [0, 1, -5]
        }
      }
    }
  };

  // ../config/src/presets/random.ts
  var seed = 1;
  var random = () => {
    const x = Math.sin(seed++) * 1e4;
    return x - Math.floor(x);
  };
  var boundedRandom = (min2 = -1, max2 = 1) => random() * (max2 - min2) + min2;
  var random_default = {
    name: "random",
    view: {
      camera: {
        center: [0, 0.5, 0],
        distance: 5,
        theta: 45 * (Math.PI / 180),
        phi: 5 * (Math.PI / 180)
      }
    },
    runner: {
      loops: 0,
      snapshotsPerTick: 1,
      iterationsPerSnapshot: 1,
      iterationDurationOverC: 0.1,
      iterationCount: 128,
      snapshotCount: 128
    },
    model: {
      boundingBoxSize: 1,
      boundingBoxCenter: [0, 1, 0],
      emitter: {
        position: [0, 1, 0],
        direction: () => [boundedRandom(), boundedRandom(), boundedRandom()],
        particleSeparation: 0.1,
        gamma: 10,
        bunchShape: "SQUARE_YZ",
        particleCount: 256,
        particleType: "PHOTON ELECTRON PROTON"
      }
    }
  };

  // ../config/src/presets/free-electron.ts
  var free_electron_default = {
    name: "free-electron",
    view: {
      camera: {
        center: [0, 0, 0.5],
        distance: 3,
        phi: 15 / 360 * 2 * Math.PI,
        theta: 45 / 360 * 2 * Math.PI
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
        particleType: "ELECTRON"
      },
      lattice: {
        origin: {
          position: [
            0,
            default_default.view.pathicleWidth * default_default.view.pathicleRelativeHeight,
            0
          ]
        }
      }
    }
  };

  // ../config/src/presets/free-electrons.ts
  var free_electrons_default = {
    name: "free-electrons",
    view: {
      camera: {
        center: [0, 1, 0],
        theta: 0,
        phi: 0,
        distance: 2
      }
    },
    runner: {
      snapshotCount: 35,
      iterationDurationOverC: 0.1
    },
    model: {
      emitter: {
        particleCount: 129,
        particleType: "ELECTRON",
        gamma: 10
      },
      lattice: {
        elements: {},
        beamline: [],
        origin: {
          phi: 0,
          position: [0, 1, -5]
        }
      }
    }
  };

  // ../config/src/presets/different-gammas.ts
  var different_gammas_default = {
    name: "different-gammas",
    view: {
      pathicleRelativeGap: 1,
      pathicleRelativeHeight: 3,
      pathicleWidth: 5e-3,
      camera: {
        center: [0, 0.5, -0.8],
        distance: 4,
        theta: 0 * (Math.PI / 180),
        phi: 20 * (Math.PI / 180)
      }
    },
    runner: {
      prerender: true,
      mode: RUNNER_MODE.NOBREAK,
      loops: 0,
      iterationsPerSnapshot: 1,
      iterationCount: 10,
      snapshotCount: 11,
      iterationDurationOverC: 0.1
    },
    debug: {
      logPushing: false
    },
    model: {
      emitter: {
        particleCount: 60,
        particleSeparation: 0,
        particleType: "PHOTON ELECTRON PROTON",
        bunchShape: "ROW_X",
        direction: [0, 0, -1],
        position: ({ p }) => [
          (Math.floor(p / 3) - 10) / 10 + p % 3 * 0.025,
          default_default.view.pathicleWidth * default_default.view.pathicleRelativeHeight / 2 * 2,
          0
        ],
        directionJitter: [0, 0, 0],
        positionJitter: [0, 0, 0],
        gamma: ({ p }) => 1 + Math.floor(p / 3) / 50
      }
    }
  };

  // ../config/src/presets/different-gammas-E-1e-10.ts
  var different_gammas_E_1e_10_default = {
    name: "different-gammas-E-1e-10",
    view: {
      pathicleRelativeGap: 1,
      pathicleRelativeHeight: 3,
      pathicleWidth: 5e-3,
      camera: {
        center: [0, 0.5, -0.8],
        distance: 4,
        theta: 0 * (Math.PI / 180),
        phi: 20 * (Math.PI / 180)
      }
    },
    runner: {
      prerender: true,
      mode: RUNNER_MODE.NOBREAK,
      loops: 0,
      iterationsPerSnapshot: 1,
      iterationCount: 10,
      snapshotCount: 11,
      iterationDurationOverC: 0.1
    },
    debug: {
      logPushing: false
    },
    model: {
      emitter: {
        particleCount: 60,
        particleSeparation: 0,
        particleType: "PHOTON ELECTRON PROTON",
        bunchShape: "ROW_X",
        direction: [0, 0, -1],
        position: ({ p }) => [
          (Math.floor(p / 3) - 10) / 10 + p % 3 * 0.025,
          default_default.view.pathicleWidth * default_default.view.pathicleRelativeHeight / 2 * 2,
          0
        ],
        directionJitter: [0, 0, 0],
        positionJitter: [0, 0, 0],
        gamma: ({ p }) => 1 + Math.floor(p / 3) / 50
      },
      interactions: {
        electricField: [0, 0, -1e-10],
        particleInteraction: false,
        magneticField: [0, 0, 0]
      }
    }
  };

  // ../config/src/presets/different-gammas-E-1e-11.ts
  var different_gammas_E_1e_11_default = {
    name: "different-gammas-E-1e-11",
    view: {
      pathicleRelativeGap: 1,
      pathicleRelativeHeight: 3,
      pathicleWidth: 5e-3,
      camera: {
        center: [0, 0.5, -0.8],
        distance: 4,
        theta: 0 * (Math.PI / 180),
        phi: 20 * (Math.PI / 180)
      }
    },
    runner: {
      prerender: true,
      mode: RUNNER_MODE.NOBREAK,
      loops: 0,
      iterationsPerSnapshot: 1,
      iterationCount: 10,
      snapshotCount: 11,
      iterationDurationOverC: 0.1
    },
    debug: {
      logPushing: false
    },
    model: {
      emitter: {
        particleCount: 60,
        particleSeparation: 0,
        particleType: "PHOTON ELECTRON PROTON",
        bunchShape: "ROW_X",
        direction: [0, 0, -1],
        position: ({ p }) => [
          (Math.floor(p / 3) - 10) / 10 + p % 3 * 0.025,
          default_default.view.pathicleWidth * default_default.view.pathicleRelativeHeight / 2 * 2,
          0
        ],
        directionJitter: [0, 0, 0],
        positionJitter: [0, 0, 0],
        gamma: ({ p }) => 1 + Math.floor(p / 3) / 50
      },
      interactions: {
        electricField: [0, 0, -1e-11]
      }
    }
  };

  // ../config/src/presets/different-gammas-E-1e-12.ts
  var different_gammas_E_1e_12_default = {
    name: "different-gammas-E-1e-12",
    view: {
      pathicleRelativeGap: 1,
      pathicleRelativeHeight: 3,
      pathicleWidth: 5e-3,
      camera: {
        center: [0, 0.5, -0.8],
        distance: 4,
        theta: 0 * (Math.PI / 180),
        phi: 20 * (Math.PI / 180)
      }
    },
    runner: {
      prerender: true,
      mode: RUNNER_MODE.NOBREAK,
      loops: 0,
      iterationsPerSnapshot: 1,
      iterationCount: 10,
      snapshotCount: 11,
      iterationDurationOverC: 0.1
    },
    debug: {
      logPushing: false
    },
    model: {
      emitter: {
        particleCount: 60,
        particleSeparation: 0,
        particleType: "PHOTON ELECTRON PROTON",
        bunchShape: "ROW_X",
        direction: [0, 0, -1],
        position: ({ p }) => [
          (Math.floor(p / 3) - 10) / 10 + p % 3 * 0.025,
          default_default.view.pathicleWidth * default_default.view.pathicleRelativeHeight / 2 * 2,
          0
        ],
        directionJitter: [0, 0, 0],
        positionJitter: [0, 0, 0],
        gamma: ({ p }) => 1 + Math.floor(p / 3) / 50
      },
      interactions: {
        electricField: [0, 0, -1e-12],
        particleInteraction: false,
        magneticField: [0, 0, 0]
      }
    }
  };

  // ../config/src/presets/free-photon.ts
  var free_photon_default = {
    name: "free-photon",
    view: {
      camera: {
        center: [0, 0, 0.5],
        distance: 2,
        phi: 5 / 360 * 2 * Math.PI,
        theta: 45 / 360 * 2 * Math.PI
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
        bunchShape: "ROW_X",
        particleType: "PHOTON",
        positionJitter: [0, 0, 0]
      },
      lattice: {
        origin: {
          position: [
            0,
            default_default.view.pathicleWidth * default_default.view.pathicleRelativeHeight,
            0
          ]
        }
      }
    }
  };

  // ../config/src/presets/free-photons.ts
  var free_photons_default = {
    name: "free-photons",
    view: {
      camera: {
        center: [0, 0.4, 2],
        phi: 10 / 360 * 2 * Math.PI,
        theta: 10 / 360 * 2 * Math.PI
      }
    },
    runner: {
      pusher: "glsl",
      packFloat2UInt8: false,
      prerender: true,
      loops: 0,
      iterationsPerSnapshot: 1,
      snapshotCount: 85,
      iterationDurationOverC: 0.1
    },
    model: {
      emitter: {
        particleType: "PHOTON",
        bunchShape: "SPIRAL_XY",
        position: [0, 0.5, -5],
        gamma: 1,
        particleCount: 512
      }
    }
  };

  // ../config/src/particle-types.ts
  var PHOTON = {
    name: "PHOTON",
    mass__eVc_2: 0,
    charge__qe: 0,
    chargeMassRatio__Ckg_1: 0,
    id: 0,
    color: [235, 192, 0]
  };
  var ELECTRON = {
    name: "ELECTRON",
    mass__eVc_2: 510998.9461,
    chargeMassRatio__Ckg_1: -175882001076,
    charge__qe: -1,
    id: 1,
    color: [31, 115, 166]
  };
  var POSITRON = {
    name: "POSITRON",
    mass__eVc_2: 510998.9461,
    chargeMassRatio__Ckg_1: 175882001076,
    charge__qe: 1,
    id: 2,
    color: [166, 115, 166]
  };
  var PROTON = {
    name: "PROTON",
    mass__eVc_2: 938272081,
    charge__qe: 1,
    chargeMassRatio__Ckg_1: 9578833156e-2,
    id: 3,
    color: [197, 50, 51]
  };
  var PARTICLE_TYPES = [PHOTON, ELECTRON, POSITRON, PROTON];
  var BY_NAME_MAP = new Map(PARTICLE_TYPES.map((i) => [i.name, i]));
  var particleByName = (name) => BY_NAME_MAP.get(name);

  // ../config/src/presets/gyrotest-1-electron.ts
  function betaFromGamma(gamma2 = 0) {
    if (gamma2 === 0)
      return NaN;
    return Math.sqrt(1 - 1 / Math.pow(gamma2, 2));
  }
  var B_T = 0.01;
  var gamma = 2;
  var R = gamma / B_T * betaFromGamma(gamma) * C / ELECTRON.chargeMassRatio__Ckg_1;
  var T = 2 * Math.PI * R / betaFromGamma(gamma) / C;
  var iterationDurationOverC = 1e-3;
  var STEPS = 256;
  console.log({ R, C, beta: betaFromGamma(gamma), T, STEPS });
  var gyrotest_1_electron_default = {
    name: "gyrotest-1-electron",
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
      mode: RUNNER_MODE.NOBREAK,
      snapshotsPerTick: 5,
      iterationsPerSnapshot: 5,
      iterationCount: void 0,
      snapshotCount: STEPS,
      iterationDurationOverC
    },
    model: {
      emitter: {
        particleCount: 1,
        particleType: "ELECTRON",
        bunchShape: "COLUMN",
        direction: [0, 0, 1],
        position: [
          0,
          default_default.view.pathicleWidth * default_default.view.pathicleRelativeHeight * 2 + 0.02,
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
  };

  // ../config/src/presets/gyrotest-128-electrons.ts
  var gyrotest_128_electrons_default = {
    name: "gyrotest-128-electrons",
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
      mode: RUNNER_MODE.NOBREAK,
      iterationsPerSnapshot: 1,
      iterationCount: 511,
      snapshotCount: 512,
      iterationDurationOverC: 0.05
    },
    model: {
      emitter: {
        particleCount: 128,
        particleSeparation: 0.05,
        particleType: "ELECTRON",
        bunchShape: "ROW_Y",
        gamma: ({ p }) => Math.log10(1 * p + 1)
      },
      interactions: {
        particleInteraction: false,
        electricField: [0, 0, 0],
        magneticField: [0, 5e-4, 0]
      },
      lattice: {
        origin: {
          phi: 0,
          position: [
            0,
            default_default.view.pathicleWidth * default_default.view.pathicleRelativeHeight * 2,
            0
          ]
        }
      }
    }
  };

  // ../config/src/presets/index.ts
  var import_ts_deepmerge = __toModule(require_dist());
  var presets = {
    [csr_default.name]: csr_default,
    [different_gammas_default.name]: different_gammas_default,
    [different_gammas_E_1e_10_default.name]: different_gammas_E_1e_10_default,
    [different_gammas_E_1e_11_default.name]: different_gammas_E_1e_11_default,
    [different_gammas_E_1e_12_default.name]: different_gammas_E_1e_12_default,
    [free_electron_default.name]: free_electron_default,
    [free_electrons_default.name]: free_electrons_default,
    [free_photon_default.name]: free_photon_default,
    [free_photons_default.name]: free_photons_default,
    [gyrotest_1_electron_default.name]: gyrotest_1_electron_default,
    [gyrotest_128_electrons_default.name]: gyrotest_128_electrons_default,
    [pathicles_logo_default.name]: pathicles_logo_default,
    [random_default.name]: random_default,
    [spiral_default.name]: spiral_default,
    [story_dipole_default.name]: story_dipole_default,
    [story_dipole_default.name]: story_dipole_default,
    [story_electric_default.name]: story_electric_default,
    [story_quadrupole_default.name]: story_quadrupole_default
  };

  // src/lib/utils/random.ts
  var seed2 = 1;
  var random2 = () => {
    const x = Math.sin(seed2++) * 1e4;
    return x - Math.floor(x);
  };
  var boundedRandom2 = (min2 = -1, max2 = 1) => random2() * (max2 - min2) + min2;

  // src/lib/particle-collection/particle-collection.ts
  var functionalize = (x) => typeof x == "function" ? x : () => x;
  function particleTypesFromDescriptor(particleTypeDescriptor = "", n = 0) {
    const particleTypesArray = particleTypeDescriptor.trim().split(/\s+/).map((d) => {
      return particleByName(d);
    });
    if (n === 0) {
      return particleTypesArray;
    }
    return Array(n).fill(0).map((x, p) => {
      return particleTypesArray[p % particleTypesArray.length];
    });
  }
  function jitterPosition({ position = [0, 0, 0], jitter = [0, 0, 0] }) {
    return position.map((d, i) => boundedRandom2() * jitter[i]);
  }
  function betaFromGamma2(gamma2 = 0) {
    if (gamma2 === 0)
      return NaN;
    return Math.sqrt(1 - 1 / Math.pow(gamma2, 2));
  }
  function ParticleCollection({
    particleCount = 3,
    particleType = "PHOTON ELECTRON PROTON",
    bunchShape = "ROW",
    particleSeparation = 0.1,
    gamma: gamma2 = 1,
    position = [0, 0, 0],
    direction = [0, 0, 1],
    positionJitter = [0, 0, 0]
  }) {
    const gammaFn = functionalize(gamma2);
    const directionFn = functionalize(direction);
    const positionFn = functionalize(position);
    const particles = particleTypesFromDescriptor(particleType, particleCount);
    const localPositions = DISTRIBUTIONS[bunchShape]({
      n: particleCount,
      d: particleSeparation
    });
    const fourPositions = localPositions.map(([x1, x2, x3], p) => {
      const jitter = jitterPosition({
        jitter: positionJitter
      });
      return [
        (positionFn({ p })[0] + x1 + jitter[0]) * 1,
        (positionFn({ p })[1] + x2 + jitter[1]) * 1,
        (positionFn({ p })[2] + x3 + jitter[2]) * 1,
        0
      ];
    });
    const fourVelocities = particles.map((particle, p) => {
      const gamma3 = gammaFn({ p });
      const beta = particle.mass__eVc_2 === 0 ? 1 : betaFromGamma2(gamma3);
      const jitteredDirection = directionFn({ p, localPositions });
      return particle.mass__eVc_2 === 0 ? [
        C * jitteredDirection[0],
        C * jitteredDirection[1],
        C * jitteredDirection[2],
        C
      ] : [
        gamma3 * beta * C * jitteredDirection[0],
        gamma3 * beta * C * jitteredDirection[1],
        gamma3 * beta * C * jitteredDirection[2],
        gamma3 * C
      ];
    });
    return {
      fourPositions: fourPositions.map((d) => d.map((e) => e * 1)),
      fourVelocities: fourVelocities.map((d) => d.map((e) => e * 1)),
      particleCount,
      particleTypes: particles.map((p) => p.id)
    };
  }

  // src/lib/simulation/pusher/glsl/boris.vert.glsl
  var boris_vert_default = "precision highp float;\n#define GLSLIFY 1\nattribute vec2 aXY;\nvoid main() {\n  gl_Position = vec4(aXY, 0, 1);\n}\n";

  // src/lib/simulation/pusher/glsl/boris.frag.glsl
  var boris_frag_default = "precision highp float;\n#define GLSLIFY 1\nconst highp float c = 2.99792458e+8;\n\nuniform bool littleEndian;\nuniform float boundingBoxSize;\nuniform float deltaTOverC;\nuniform float particleInteraction;\nuniform int takeSnapshot;\nuniform int variableIdx;\nuniform sampler2D ut_particleChargesMassesChargeMassRatios;\nuniform sampler2D ut_position;\nuniform sampler2D ut_velocity;\nuniform vec2 resolution;\nuniform vec3 boundingBoxCenter;\nuniform vec3 electricField;\nuniform vec3 magneticField;\n\nstruct BeamlineElement {\n  vec3 middle;\n  vec3 size;\n  float phi;\n  int type; //0: drift, 1: dipole, 2: quadrupole, 3: esta\n  float strength;\n};\n\nconst int BEAMLINE_ELEMENT_TYPE_DRIFT = 0;\nconst int BEAMLINE_ELEMENT_TYPE_DIPOLE = 1;\nconst int BEAMLINE_ELEMENT_TYPE_QUADRUPOLE = 2;\nconst int BEAMLINE_ELEMENT_TYPE_ESTA = 3;\n\n/*__latticeSize__*/\n/*__latticeChunkGLSL__*/\n\nmat2 rot2D(float phi) {\n  float c = cos(phi);\n  float s = sin(phi);\n  return mat2(c, -s, s, c);\n}\nfloat sdBox(vec3 p, vec3 s) {\n  vec3 d = abs(p) - .5 * s;\n  return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));\n}\n#define FLOAT_MAX  1.70141184e38\n#define FLOAT_MIN  1.17549435e-38\n\nlowp vec4 packFloat(highp float v) {\n  highp float av = abs(v);\n\n  //Handle special cases\n  if(av < FLOAT_MIN) {\n    return vec4(0.0, 0.0, 0.0, 0.0);\n  } else if(v > FLOAT_MAX) {\n    return vec4(127.0, 128.0, 0.0, 0.0) / 255.0;\n  } else if(v < -FLOAT_MAX) {\n    return vec4(255.0, 128.0, 0.0, 0.0) / 255.0;\n  }\n\n  highp vec4 c = vec4(0,0,0,0);\n\n  //Compute exponent and mantissa\n  highp float e = floor(log2(av));\n  highp float m = av * pow(2.0, -e) - 1.0;\n\n  //Unpack mantissa\n  c[1] = floor(128.0 * m);\n  m -= c[1] / 128.0;\n  c[2] = floor(32768.0 * m);\n  m -= c[2] / 32768.0;\n  c[3] = floor(8388608.0 * m);\n\n  //Unpack exponent\n  highp float ebias = e + 127.0;\n  c[0] = floor(ebias / 2.0);\n  ebias -= c[0] * 2.0;\n  c[1] += floor(ebias) * 128.0;\n\n  //Unpack sign bit\n  c[0] += 128.0 * step(0.0, -v);\n\n  //Scale back to range\n  return c / 255.0;\n}\n\nfloat shiftRight(float v, float amt) {\n    v = floor(v) + 0.5;\n    return floor(v / exp2(amt));\n}\nfloat shiftLeft(float v, float amt) {\n    return floor(v * exp2(amt) + 0.5);\n}\nfloat maskLast(float v, float bits) {\n    return mod(v, shiftLeft(1.0, bits));\n}\nfloat extractBits(float num, float from, float to) {\n    from = floor(from + 0.5);\n    to = floor(to + 0.5);\n    return maskLast(shiftRight(num, from), to - from);\n}\nvec4 floatToRgba(float texelFloat, bool littleEndian) {\n    if(texelFloat == 0.0)\n        return vec4(0, 0, 0, 0);\n    float sign = texelFloat > 0.0 ? 0.0 : 1.0;\n    texelFloat = abs(texelFloat);\n    float exponent = floor(log2(texelFloat));\n    float biased_exponent = exponent + 127.0;\n    float fraction = ((texelFloat / exp2(exponent)) - 1.0) * 8388608.0;\n    float t = biased_exponent / 2.0;\n    float last_bit_of_biased_exponent = fract(t) * 2.0;\n    float remaining_bits_of_biased_exponent = floor(t);\n    float byte4 = extractBits(fraction, 0.0, 8.0) / 255.0;\n    float byte3 = extractBits(fraction, 8.0, 16.0) / 255.0;\n    float byte2 = (last_bit_of_biased_exponent * 128.0 + extractBits(fraction, 16.0, 23.0)) / 255.0;\n    float byte1 = (sign * 128.0 + remaining_bits_of_biased_exponent) / 255.0;\n    return (littleEndian ? vec4(byte4, byte3, byte2, byte1) : vec4(byte1, byte2, byte3, byte4));\n}\n\nstruct ParticleData {\n  float charge;\n  float mass;\n  float chargeMassRatio;\n  float particleType;\n};\n\nParticleData getParticleData(int p) {\n  vec2 coords = vec2(float(p), 0.) / vec2(float(resolution.y), 1.);\n  vec4 data = texture2D(ut_particleChargesMassesChargeMassRatios, coords);\n  return ParticleData(data.x, data.y, data.z, data.w);\n}\n\n#ifdef PACK_FLOAT\n\n// Denormalize 8-bit color channels to integers in the range 0 to 255.\nivec4 floatsToBytes(vec4 inputFloats, bool littleEndian) {\n  ivec4 bytes = ivec4(inputFloats * 255.0);\n  return (\n    littleEndian\n    ? bytes.abgr\n    : bytes\n  );\n}\n\n// Break the four bytes down into an array of 32 bits.\nvoid bytesToBits(const in ivec4 bytes, out bool bits[32]) {\n  for (int channelIndex = 0; channelIndex < 4; ++channelIndex) {\n    float acc = float(bytes[channelIndex]);\n    for (int indexInByte = 7; indexInByte >= 0; --indexInByte) {\n      float powerOfTwo = exp2(float(indexInByte));\n      bool bit = acc >= powerOfTwo;\n      bits[channelIndex * 8 + (7 - indexInByte)] = bit;\n      acc = mod(acc, powerOfTwo);\n    }\n  }\n}\n\n// Compute the exponent of the 32-bit float.\nfloat getExponent(bool bits[32]) {\n  const int startIndex = 1;\n  const int bitStringLength = 8;\n  const int endBeforeIndex = startIndex + bitStringLength;\n  float acc = 0.0;\n  int pow2 = bitStringLength - 1;\n  for (int bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {\n    acc += float(bits[bitIndex]) * exp2(float(pow2--));\n  }\n  return acc;\n}\n\n// Compute the mantissa of the 32-bit float.\nfloat getMantissa(bool bits[32], bool subnormal) {\n  const int startIndex = 9;\n  const int bitStringLength = 23;\n  const int endBeforeIndex = startIndex + bitStringLength;\n  // Leading/implicit/hidden bit convention:\n  // If the number is not subnormal (with exponent 0), we add a leading 1 digit.\n  float acc = float(!subnormal) * exp2(float(bitStringLength));\n  int pow2 = bitStringLength - 1;\n  for (int bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {\n    acc += float(bits[bitIndex]) * exp2(float(pow2--));\n  }\n  return acc;\n}\n\n// Parse the float from its 32 bits.\nfloat bitsToFloat(bool bits[32]) {\n  float signBit = float(bits[0]) * -2.0 + 1.0;\n  float exponent = getExponent(bits);\n  bool subnormal = abs(exponent - 0.0) < 0.01;\n  float mantissa = getMantissa(bits, subnormal);\n  float exponentBias = 127.0;\n  return signBit * mantissa * exp2(exponent - exponentBias - 23.0);\n}\n\n// Decode a 32-bit float from the RGBA color channels of a texel.\nfloat rgbaToFloat(vec4 texelRGBA, bool littleEndian) {\n  ivec4 rgbaBytes = floatsToBytes(texelRGBA, littleEndian);\n  bool bits[32];\n  bytesToBits(rgbaBytes, bits);\n  return bitsToFloat(bits);\n}\n\n#endif\n\nvec4 readVariable(sampler2D tex, int p, int s) {\n\n#ifdef PACK_FLOAT\n  return vec4(rgbaToFloat(texture2D(tex, vec2(4 * s, p) / resolution), littleEndian), \n  rgbaToFloat(texture2D(tex, vec2(4 * s + 1, p) / resolution), littleEndian), \n  rgbaToFloat(texture2D(tex, vec2(4 * s + 2, p) / resolution), littleEndian), \n  rgbaToFloat(texture2D(tex, vec2(4 * s + 3, p) / resolution), littleEndian));\n#else\n  return vec4(texture2D(tex, vec2(4 * s, p) / resolution).r, texture2D(tex, vec2(4 * s + 1, p) / resolution).r, texture2D(tex, vec2(4 * s + 2, p) / resolution).r, texture2D(tex, vec2(4 * s + 3, p) / resolution).r);\n#endif\n}\n\nvec3 reflection(vec3 v, vec3 bottomLeft, vec3 topRight) {\n  return 2. * (step(bottomLeft, v) - step(topRight, v)) - vec3(1.);\n}\nvec3 getE(vec3 position) {\n\n  vec3 E = electricField;\n\n  for(int i = 0; i < BEAMLINE_ELEMENT_COUNT; i++) {\n    BeamlineElement ble = beamline[i];\n    if(ble.type == BEAMLINE_ELEMENT_TYPE_ESTA) {\n      vec3 localPosition = position;\n      localPosition -= ble.middle;\n      localPosition.xz *= rot2D(ble.phi);\n      if(sdBox(localPosition, ble.size) <= 0.) {\n        E += vec3(0., 0., ble.strength);\n      }\n    }\n  }\n  return E;\n}\n\nvec3 getB(vec3 position) {\n  vec3 B = magneticField;\n\n  for(int i = 0; i < BEAMLINE_ELEMENT_COUNT; i++) {\n    BeamlineElement ble = beamline[i];\n    vec3 localPosition = position;\n    localPosition -= ble.middle;\n    localPosition.xz *= rot2D(ble.phi);\n    if(sdBox(localPosition, ble.size) <= 0.) {\n      if(ble.type == BEAMLINE_ELEMENT_TYPE_DIPOLE) {\n        B += vec3(0., ble.strength, 0.);\n      } else if(ble.type == BEAMLINE_ELEMENT_TYPE_QUADRUPOLE) {\n        B += abs(ble.strength) * ((ble.strength > 0.) ? vec3(localPosition.y, localPosition.x, 0) : vec3(-localPosition.y, -localPosition.x, 0.));\n      }\n    }\n  }\n\n  return B;\n}\n\nvec4 push_position(int p) {\n\n  ParticleData particleData = getParticleData(p);\n  vec4 fourPosition = readVariable(ut_position, p, 0);\n\n  vec3 position = fourPosition.xyz;\n  float time = fourPosition.w;\n\n  // vec4 fourVelocity_current = readVariable(ut_velocity, p, 1);\n  vec4 fourVelocity_next = readVariable(ut_velocity, p, 0);\n\n  float nextTime = time + deltaTOverC;\n\n  vec4 next = vec4(position + fourVelocity_next.xyz / fourVelocity_next.w * deltaTOverC, nextTime);\n\n  return next;\n}\n\nvec4 push_velocity(int p) {\n\n  ParticleData particleData = getParticleData(p);\n\n  vec4 fourPosition = readVariable(ut_position, p, 1);\n  vec4 fourVelocity = readVariable(ut_velocity, p, 0);\n\n  vec3 velocity =  fourVelocity.xyz / fourVelocity.w;\n\n  vec3 intermediatePosition = fourPosition.xyz + .5 * velocity * deltaTOverC;\n  vec3 E = getE(intermediatePosition);\n  vec3 B = getB(intermediatePosition);\n\n  float gamma = 1.;\n  vec3 u = fourVelocity.xyz;\n\n  if(particleData.particleType > .1) {\n\n    float chargeMassRatio = particleData.chargeMassRatio;\n    float hdtc_m = chargeMassRatio * deltaTOverC / c / 2.;\n\n    u += hdtc_m * E;\n    gamma = sqrt(1. + dot(u / c, u / c));\n\n    vec3 t_ = hdtc_m * B / gamma;\n    u += cross(u, t_);\n    vec3 s_ = 2.0 / (1.0 + t_ * t_) * t_;\n    u += cross(u, s_);\n    u += hdtc_m * E;\n    gamma = sqrt(1. + dot(u / c, u / c));\n  }\n\n  if(boundingBoxSize > 0.) {\n\n    velocity = (particleData.particleType > .1) ? u / gamma / c : velocity;\n    vec3 nextPosition = intermediatePosition.xyz + .5 * velocity * deltaTOverC;\n    vec3 ref = reflection(nextPosition.xyz, boundingBoxCenter - vec3(boundingBoxSize), boundingBoxCenter + vec3(boundingBoxSize));\n    u *= ref;\n\n  }\n  return vec4(u, gamma * c);\n}\nvec4 push(int p) {\n  return (variableIdx == 0) ? push_position(p) : push_velocity(p);\n}\n\nvec4 readVariable(int particle, int snapshot) {\n  return (variableIdx == 0) ? readVariable(ut_position, particle, snapshot) : readVariable(ut_velocity, particle, snapshot);\n}\n\nvoid main() {\n\n  int particle = int(gl_FragCoord.y - .5);\n  int snapshot = int(floor((gl_FragCoord.x - .5) / 4.));\n  int fourComponentIndex = int(floor(gl_FragCoord.x - .5)) - snapshot * 4;\n  initLatticeData();\n\n  vec4 value = (snapshot == 0) ? push(particle) : (takeSnapshot == 0) ? readVariable(particle, snapshot) : readVariable(particle, snapshot - 1);\n\n#ifdef PACK_FLOAT\n\n  gl_FragColor = (fourComponentIndex == 0) ? packFloat(value.x) : (fourComponentIndex == 1) ? packFloat(value.y) : (fourComponentIndex == 2) ? packFloat(value.z) : packFloat(value.w);\n\n#else\n\n  gl_FragColor = (fourComponentIndex == 0) ? vec4(value.x, 0., 0., 0.) : (fourComponentIndex == 1) ? vec4(value.y, 0., 0., 0.) : (fourComponentIndex == 2) ? vec4(value.z, 0., 0., 0.) : vec4(value.w, 0., 0., 0.);\n\n#endif\n\n}\n";

  // src/lib/simulation/lattice/lattice.gsls.ts
  function latticeChunk(lattice) {
    return `

  ${lattice.activeBeamlineElements().length > 0 ? "BeamlineElement beamline[" + lattice.activeBeamlineElements().length + "];" : "BeamlineElement beamline[1];"}
  void initLatticeData() {
    ${lattice.toGLSLDefinition()};
  }
  `;
  }

  // src/lib/utils/PerformanceLogger.ts
  var PerformanceLogger = class {
    constructor(active = true, maxEntries = 100) {
      if (window.performanceLogger)
        return window.performanceLogger;
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
        performance.mark(this.markName + " (stop)");
        this.markName = null;
        this.running = false;
      }
    }
    report() {
      if (this.running)
        this.stop();
      const round = (x) => x.toFixed(1) * 1;
      const marks = performance.getEntriesByType("mark");
      const measures = marks.map((mark, m) => ({
        name: mark.name,
        \u0394t: round(marks[Math.min(m + 1, marks.length - 1)].startTime - mark.startTime)
      }));
      return measures.filter((m) => m.name.indexOf("stop") === -1);
    }
  };

  // src/lib/utils/little-endian.ts
  function isLittleEndian() {
    const uint8Array = new Uint8Array([170, 187]);
    const uint16array = new Uint16Array(uint8Array.buffer);
    return uint16array[0] === 48042;
  }

  // src/lib/simulation/pusher/glsl/glslBorisPush.ts
  function glslBorisPush(regl, { variables, model }) {
    const performanceLogger = new PerformanceLogger();
    performanceLogger.entries = [];
    const pushFactory = (variableName, bufferVariableName, variableSlot) => {
      const latticeChunkGLSL = latticeChunk(model.lattice);
      return regl({
        profile: true,
        framebuffer: () => variables[variableName].value(),
        primitive: "triangles",
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
          ut_particleChargesMassesChargeMassRatios: () => variables.particleChargesMassesChargeMassRatios,
          ut_position: () => variables.position.buffers[(variables.iteration + 1) % 2],
          ut_velocity: () => variableName === "position" ? variables.velocity.buffers[variables.iteration % 2] : variables.velocity.buffers[(variables.iteration + 1) % 2]
        },
        vert: boris_vert_default,
        frag: [
          ...variables.packFloat2UInt8 ? [
            `#define PACK_FLOAT`
          ] : [],
          (variables.packFloat2UInt8 ? boris_frag_default : boris_frag_default).replace("/*__latticeDefinition__*/", model.lattice.toGLSLDefinition()).replace("/*__latticeChunkGLSL__*/", latticeChunkGLSL).replace("/*__latticeSize__*/", `const int BEAMLINE_ELEMENT_COUNT_OR_1 = ${model.lattice.activeBeamlineElements().length || 1}; const int BEAMLINE_ELEMENT_COUNT = ${model.lattice.activeBeamlineElements().length};`)
        ].join("\n")
      });
    };
    const pushVelocity = pushFactory("velocity", "ut_velocity", 1);
    const pushPosition = pushFactory("position", "ut_position", 0);
    return {
      push: (n = 1, profile = false) => {
        for (let i = 0; i < n; i++) {
          variables.iteration++;
          variables.position.pingPong = variables.iteration % 2;
          variables.velocity.pingPong = variables.iteration % 2;
          const snapshots = Math.floor(variables.iteration / variables.iterationsPerSnapshot);
          variables.segments = variables.particleCount * Math.min(snapshots + variables.iteration - snapshots * variables.iterationsPerSnapshot, variables.snapshotCount - 1);
          variables.takeSnapshot = variables.iterationsPerSnapshot === 1 || variables.iteration % variables.iterationsPerSnapshot === 1 ? 1 : 0;
          pushVelocity();
          pushPosition();
        }
        if (profile) {
          regl.poll();
          performanceLogger.entries.push({
            name: "pushVelocity",
            particleCount: variables.particleCount,
            snapshotCount: variables.snapshotCount,
            packFloat2UInt8: variables.packFloat2UInt8,
            iterations: variables.iteration,
            stats: pushVelocity.stats
          });
          performanceLogger.entries.push({
            name: "pushPosition",
            particleCount: variables.particleCount,
            snapshotCount: variables.snapshotCount,
            packFloat2UInt8: variables.packFloat2UInt8,
            iterations: variables.iteration,
            stats: pushPosition.stats
          });
        }
      },
      reset() {
      }
    };
  }

  // src/lib/simulation/pusher/js/jsBorisPush.ts
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
    return [x, y, z];
  }
  vec3.add = function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  };
  function dot(x, y) {
    var sum = 0;
    for (var i = 0; i < x.length; i++) {
      sum += x[i] * y[i];
    }
    return sum;
  }
  function sqrt(x) {
    if (x.length) {
      return x.map(sqrt);
    }
    return Math.sqrt(x);
  }
  function cross(x, y) {
    var x0 = x[0], x1 = x[1], x2 = x[2], y0 = y[0], y1 = y[1], y2 = y[2];
    var out = [0, 0, 0];
    out[0] = x1 * y2 - x2 * y1;
    out[1] = x2 * y0 - x0 * y2;
    out[2] = x0 * y1 - x1 * y0;
    return out;
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
          const fourPosition = snapshots[snapshots.length - 1].fourPositions.subarray(p * 4, p * 4 + 4);
          const fourVelocity = snapshots[snapshots.length - 1].fourVelocities.subarray(p * 4, p * 4 + 4);
          var velocity = [0, 1, 2].map(function(x, i) {
            return this[x];
          }, fourVelocity).map(function(_) {
            return _ / this;
          }, fourVelocity[3]);
          const intermediateFourPosition = [
            fourPosition[0] + 0.5 * velocity[0] * uniforms.deltaTOverC,
            fourPosition[1] + 0.5 * velocity[1] * uniforms.deltaTOverC,
            fourPosition[2] + 0.5 * velocity[2] * uniforms.deltaTOverC,
            fourPosition[3] + 0.5 * uniforms.deltaTOverC
          ];
          const intermediatePosition = intermediateFourPosition.slice(0, 3);
          var E = uniforms.lattice.getE(intermediatePosition, uniforms.electricField);
          var B = uniforms.lattice.getB(intermediatePosition, uniforms.magneticField);
          var gamma2 = 1;
          var u = [0, 1, 2].map(function(x, i) {
            return this[x];
          }, fourVelocity);
          if (initialData.particleTypes[p] > 0) {
            const { mass__eVc_2, charge__qe, chargeMassRatio__Ckg_1 } = particleByName(initialData.particleTypes[p]);
            var hdtc_m = chargeMassRatio__Ckg_1 * uniforms.deltaTOverC / C / 2;
            u = [u[0] + hdtc_m * E[0], u[1] + hdtc_m * E[1], u[2] + hdtc_m * E[2]];
            gamma2 = sqrt(1 + dot([u[0] / C, u[1] / C, u[2] / C], [u[0] / C, u[1] / C, u[2] / C]));
            var t_ = [
              hdtc_m * B[0] / gamma2,
              hdtc_m * B[1] / gamma2,
              hdtc_m * B[2] / gamma2
            ];
            u = vec3.add([], u, cross(u, t_));
            var s_ = [
              2 / (1 + t_[0] * t_[0]) * t_[0],
              2 / (1 + t_[1] * t_[1]) * t_[1],
              2 / (1 + t_[2] * t_[2]) * t_[2]
            ];
            u = vec3.add([], u, cross(u, s_));
            u = [u[0] + hdtc_m * E[0], u[1] + hdtc_m * E[1], u[2] + hdtc_m * E[2]];
            gamma2 = sqrt(1 + dot([u[0] / C, u[1] / C, u[2] / C], [u[0] / C, u[1] / C, u[2] / C]));
          }
          if (uniforms.boundingBoxSize > 0) {
            velocity = particleData.particleType > 0.1 ? [u[0] / gamma2 / c, u[1] / gamma2 / c, u[2] / gamma2 / c] : velocity;
            var nextPosition = [
              intermediatePosition[0] + 0.5 * velocity[0] * deltaTOverC,
              intermediatePosition[1] + 0.5 * velocity[1] * deltaTOverC,
              intermediatePosition[2] + 0.5 * velocity[2] * deltaTOverC
            ];
            var ref = reflection(nextPosition, [
              uniforms.boundingBoxCenter - +uniforms.boundingBoxSize,
              uniforms.boundingBoxCenter - +uniforms.boundingBoxSize,
              uniforms.boundingBoxCenter - +uniforms.boundingBoxSize
            ], [
              uniforms.boundingBoxCenter + +uniforms.boundingBoxSize,
              uniforms.boundingBoxCenter + +uniforms.boundingBoxSize,
              uniforms.boundingBoxCenter + +uniforms.boundingBoxSize
            ]);
            u = [u[0] * ref[0], u[1] * ref[1], u[2] * ref[2]];
          }
          const nextFourVelocity = [u[0], u[1], u[2], gamma2 * C];
          const nextVelocity = [
            nextFourVelocity[0] / nextFourVelocity[3],
            nextFourVelocity[1] / nextFourVelocity[3],
            nextFourVelocity[2] / nextFourVelocity[3]
          ];
          const nextFourPosition = [
            intermediateFourPosition[0] + 0.5 * nextVelocity[0] * uniforms.deltaTOverC,
            intermediateFourPosition[1] + 0.5 * nextVelocity[1] * uniforms.deltaTOverC,
            intermediateFourPosition[2] + 0.5 * nextVelocity[2] * uniforms.deltaTOverC,
            intermediateFourPosition[3] + 0.5 * uniforms.deltaTOverC
          ];
          nextFourPositions.set(nextFourPosition, p * 4);
          nextFourVelocities.set(nextFourVelocity, p * 4);
        }
        snapshots.push({
          fourPositions: nextFourPositions,
          fourVelocities: nextFourVelocities
        });
      };
    };
    const push = pushFactory();
    return {
      push: (n = 1, profile = false) => {
        for (let i = 0; i < n; i++) {
          variables.iteration++;
          const snapshots2 = Math.floor(variables.iteration / variables.iterationsPerSnapshot);
          variables.segments = variables.particleCount * Math.min(snapshots2 + variables.iteration - snapshots2 * variables.iterationsPerSnapshot, variables.snapshotCount - 1);
          variables.takeSnapshot = variables.iterationsPerSnapshot === 1 || variables.iteration % variables.iterationsPerSnapshot === 1 ? 1 : 0;
          push();
        }
        const fourPositions = [];
        for (let p = 0; p < variables.particleCount; p++) {
          for (let s = snapshots.length - 1; s >= Math.max(0, snapshots.length - variables.snapshotCount); s--) {
            fourPositions.push(Array.from(snapshots[s].fourPositions.subarray(p * 4, p * 4 + 4)));
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
    };
  }

  // src/lib/simulation/utils/variableTexture.ts
  var variableTexture = (regl, { width, height }, numberType, data = void 0) => regl.texture({
    width,
    height,
    min: "nearest",
    mag: "nearest",
    format: "rgba",
    type: numberType,
    data
  });

  // src/lib/simulation/utils/packFloat.ts
  function abs(x) {
    if (x.length) {
      return x.map(abs);
    }
    return Math.abs(x);
  }
  function log2(x) {
    if (x.length) {
      return x.map(log2);
    }
    return Math.log2(x);
  }
  function floor(x) {
    if (x.length) {
      return x.map(floor);
    }
    return Math.floor(x);
  }
  function pow(x, y) {
    if (x.length) {
      return x.map(function(x2, i) {
        return Math.pow(x2, y[i]);
      });
    }
    return Math.pow(x, y);
  }
  function step(edge, x) {
    if (!x && !edge) {
      return 0;
    }
    if (x.length) {
      if (edge.length) {
        return x.map(function(x2, i) {
          return step(edge[i], x2);
        });
      }
      return x.map(function(x2) {
        return step(edge, x2);
      });
    }
    return x < edge ? 0 : 1;
  }
  function packFloat(v) {
    const av = abs(v);
    if (av < 117549435e-46) {
      return [0, 0, 0, 0];
    } else {
      if (v > 170141184e30) {
        return [0.4980392156862745, 0.5019607843137255, 0, 0];
      } else {
        if (v < -170141184e30) {
          return [1, 0.5019607843137255, 0, 0];
        }
      }
    }
    const c2 = [0, 0, 0, 0];
    const e = floor(log2(av));
    let m = av * pow(2, -e) - 1;
    c2[1] = floor(128 * m);
    m -= c2[1] / 128;
    c2[2] = floor(32768 * m);
    m -= c2[2] / 32768;
    c2[3] = floor(8388608 * m);
    let ebias = e + 127;
    c2[0] = floor(ebias / 2);
    ebias -= c2[0] * 2;
    c2[1] += floor(ebias) * 128;
    c2[0] += 128 * step(0, -v);
    return [c2[0], c2[1], c2[2], c2[3]];
  }

  // src/lib/simulation/utils/pingPongVariableBuffers.ts
  var FOUR_VECTOR_COMPONENT_COUNT = 4;
  var VariableBuffers = class {
    constructor(regl, canRenderToFloatTexture, particleCount, snapshotCount, numberType, initialData) {
      this.regl = regl;
      this.canRenderToFloatTexture = canRenderToFloatTexture;
      this.particleCount = particleCount;
      this.snapshotCount = snapshotCount;
      this.numberType = numberType;
      this.initialData = initialData;
      this.pingPong = 0;
      this.data = [
        new Float32Array(snapshotCount * FOUR_VECTOR_COMPONENT_COUNT * particleCount),
        new Float32Array(snapshotCount * FOUR_VECTOR_COMPONENT_COUNT * particleCount)
      ];
      const width = this.width = snapshotCount * FOUR_VECTOR_COMPONENT_COUNT;
      const height = this.height = particleCount;
      this.buffers = [0, 1].map(() => {
        return canRenderToFloatTexture ? regl.framebuffer({
          height: this.height,
          width: this.width,
          depthStencil: false,
          color: variableTexture(regl, { width, height }, numberType)
        }) : variableTexture(regl, { width, height }, numberType);
      });
      if (initialData)
        this.load(initialData);
    }
    load(fourVectors) {
      this.data[0] = this.data[1] = this.numberType === "float" ? new Float32Array(fourVectors.map((fourVector) => fourVector.map((component) => [component, 0, 0, 0])).flat(2)) : new Uint8Array(new Float32Array(fourVectors.flat(2).map((component) => packFloat(component))).buffer);
      this.buffers.forEach((buffer, i) => (buffer.color && buffer.color[0] || buffer).subimage({
        width: FOUR_VECTOR_COMPONENT_COUNT * fourVectors.length / this.particleCount,
        height: this.particleCount,
        data: this.data[i]
      }));
      return this;
    }
    value() {
      return this.buffers[this.pingPong];
    }
    reset() {
      this.pingPong = 0;
      this.load(this.initialData);
    }
    toTypedArray(pingPong = this.pingPong, precision = 3) {
      let float32Array;
      let colorUint8Array;
      if (this.numberType === "uint8") {
        const data = new Uint8Array(this.particleCount * this.snapshotCount * 4 * 4);
        this.regl({
          framebuffer: this.buffers[pingPong]
        })(() => {
          this.regl.read({ data });
        });
        colorUint8Array = Array.from(data);
        float32Array = new Float32Array(data.buffer);
      }
      if (this.numberType === "float") {
        try {
          const colorFloat32Array = new Float32Array(this.particleCount * this.snapshotCount * 4 * 4);
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
        float32Array: Array.from(float32Array).map((d) => precision ? Math.round(d * Math.pow(10, precision)) / Math.pow(10, precision) : d)
      };
    }
    pack(float32Array) {
      const packedFloat32Array = [];
      for (let p = 0; p < this.particleCount; p++) {
        const particle = [];
        packedFloat32Array.push(particle);
        for (let b = 0; b < this.snapshotCount; b++) {
          if (this.numberType === "uint8") {
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
      return packedFloat32Array;
    }
  };

  // src/lib/simulation/utils/colorCorrection.ts
  var ColorCorrector = class {
    constructor(regl, fourPositions, emitterPosition) {
      this.regl = regl;
      this.particleCount = fourPositions.length;
      const initialParticleDistances = fourPositions.map((fourPosition) => {
        return Math.sqrt(Math.pow(fourPosition[0] - emitterPosition[0], 2) + Math.pow(fourPosition[1] - emitterPosition[1], 2) + Math.pow(fourPosition[2] - emitterPosition[2], 2));
      });
      const maxParticleDistance = Math.max(...initialParticleDistances);
      const relativeParticleDistances = initialParticleDistances.map((d) => maxParticleDistance === 0 ? 0 : d / maxParticleDistance);
      this.corrections = relativeParticleDistances.map((d) => {
        return maxParticleDistance > 0 ? d < 0.7 ? d : 1 : 1;
      });
    }
    toTexture() {
      return this.regl.texture({
        data: this.corrections.map((c2) => [c2, 0, 0, 0]).flat(),
        shape: [this.particleCount, 1, 4],
        type: "float"
      });
    }
  };

  // src/lib/simulation/lattice/lattice.ts
  var DRIF2 = "DRIF";
  var QUAD2 = "QUAD";
  var SBEN2 = "SBEN";
  var ESTA2 = "ESTA";
  function cos(angle) {
    if (angle.length) {
      return angle.map(cos);
    }
    return Math.cos(angle);
  }
  function sin(angle) {
    if (angle.length) {
      return angle.map(sin);
    }
    return Math.sin(angle);
  }
  function abs2(x) {
    if (x.length) {
      return x.map(abs2);
    }
    return Math.abs(x);
  }
  function max(x, y) {
    if (x.length) {
      if (y.length) {
        return x.map(function(x2, i) {
          return Math.max(x2, y[i]);
        });
      }
      return x.map(function(x2) {
        return Math.max(x2, y);
      });
    }
    return Math.max(x, y);
  }
  function min(x, y) {
    if (x.length) {
      if (y.length) {
        return x.map(function(x2, i) {
          return Math.min(x2, y[i]);
        });
      }
      return x.map(function(x2) {
        return Math.min(x2, y);
      });
    }
    return Math.min(x, y);
  }
  function length(x) {
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
      sum += x[i] * x[i];
    }
    return Math.sqrt(sum);
  }
  function rot2D(phi) {
    const c2 = cos(phi);
    const s = sin(phi);
    return [c2, -s, s, c2];
  }
  function sdBox(p, s) {
    const absP = abs2(p);
    const d = [0.5 * s[0] - absP[0], 0.5 * s[1] - absP[1], 0.5 * s[2] - absP[2]];
    return min(max(d[0], max(d[1], d[2])), 0) + length(max(d, 0));
  }
  function dot2(x, y) {
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
      sum += x[i] * y[i];
    }
    return sum;
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
    const unsignedDst = Math.sqrt(offsetMaxX * offsetMaxX + offsetMaxY * offsetMaxY + offsetMaxZ * offsetMaxZ);
    const dstInsideBox = Math.max(offsetMinX, offsetMinY, offsetMinZ);
    return unsignedDst + dstInsideBox;
  }
  var LATTICE_ELEMENT_TYPES2 = {
    DRIF: DRIF2,
    SBEN: SBEN2,
    QUAD: QUAD2,
    ESTA: ESTA2
  };
  var LATTICE_ELEMENTS = {
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
  var LatticeElementTypesArray = [DRIF2, SBEN2, QUAD2, ESTA2];
  var Lattice = class {
    constructor(latticeDescriptor) {
      if (typeof latticeDescriptor === "undefined")
        throw new Error("no default constructor");
      this.origin = latticeDescriptor.origin || {
        phi: 0,
        position: [0, 1, 0]
      };
      let phi = this.origin.phi;
      let [x, y, z] = this.origin.position;
      let local_z = 0;
      this.beamline = latticeDescriptor.beamline.map((elementKey) => {
        if (!latticeDescriptor.elements[elementKey]) {
          throw new Error(`element ${elementKey} not defined`);
        }
        const element = latticeDescriptor.elements[elementKey];
        local_z += element.l;
        const phi_half = element.angle ? phi + element.angle / 2 : phi;
        const start = [x, y, z];
        [x, z] = [
          x - Math.sin(phi_half) * element.l,
          z + Math.cos(phi_half) * element.l
        ];
        phi = element.angle ? phi + element.angle : phi;
        return {
          color: element.type === LATTICE_ELEMENT_TYPES2.QUAD && element.strength < 0 ? LATTICE_ELEMENTS[element.type].color_minus : LATTICE_ELEMENTS[element.type].color,
          type: element.type,
          ...element.strength && { strength: element.strength },
          middle: [(start[0] + x) / 2, y, (start[2] + z) / 2],
          phi: phi_half,
          local_z_min: local_z - element.l,
          local_z_max: local_z,
          size: [
            LATTICE_ELEMENTS[element.type].width,
            LATTICE_ELEMENTS[element.type].height,
            element.l - LATTICE_ELEMENTS[element.type].gap
          ]
        };
      });
    }
    get transformations() {
      return this.beamline.map((element) => {
        return {
          type: element.type,
          translation: element.middle,
          phi: element.phi,
          theta: element.type === LATTICE_ELEMENT_TYPES2.QUAD ? 2 * Math.PI / 360 * 45 : 0,
          scale: element.size
        };
      });
    }
    get colors() {
      return this.beamline.map((element) => {
        return element.type === LATTICE_ELEMENT_TYPES2.QUAD && element.strength < 0 ? LATTICE_ELEMENTS[element.type].color_minus : LATTICE_ELEMENTS[element.type].color;
      });
    }
    length() {
      return this.beamline.length && this.beamline[this.beamline.length - 1].local_z_max;
    }
    activeBeamlineElements() {
      return this.beamline.filter((element) => element.type != DRIF2);
    }
    toGLSLDefinition() {
      return this.activeBeamlineElements().map((element, i) => `beamline[${i}] = BeamlineElement(
vec3(${element.middle.join(",")}),
vec3(${element.size[0]}, ${element.size[1]}, ${element.size[2]}),
${element.phi ? -element.phi.toFixed(10) : "0."},
${LatticeElementTypesArray.indexOf(element.type)},
${element.strength ? element.strength.toFixed(10) : "0."})`).join(";\n");
    }
    getE(position, E0 = [0, 0, 0]) {
      let E = E0;
      this.beamline.filter((element) => element.type === LATTICE_ELEMENT_TYPES2.ESTA).forEach((ble) => {
        let localPosition = position;
        localPosition = [
          localPosition[0] - ble.middle[0],
          localPosition[1] - ble.middle[1],
          localPosition[2] - ble.middle[2]
        ];
        localPosition = [
          dot2([localPosition[0], localPosition[1]], rot2D(ble.phi).slice(0, 2)),
          dot2([localPosition[0], localPosition[1]], rot2D(ble.phi).slice(2, 4)),
          localPosition[2]
        ];
        if (sdBox(localPosition, ble.size) <= 0) {
          E = [E[0], E[1], E[2] + ble.strength];
        }
      });
      return E;
    }
    getB(position, B0 = [0, 0, 0]) {
      let B = B0;
      this.beamline.filter((element) => element.type === LATTICE_ELEMENT_TYPES2.SBEN || element.type === LATTICE_ELEMENT_TYPES2.QUAD).forEach((ble) => {
        let localPosition = position;
        localPosition = [
          localPosition[0] - ble.middle[0],
          localPosition[1] - ble.middle[1],
          localPosition[2] - ble.middle[2]
        ];
        localPosition = [
          dot2([localPosition[0], localPosition[1]], rot2D(ble.phi).slice(0, 2)),
          dot2([localPosition[0], localPosition[1]], rot2D(ble.phi).slice(2, 4)),
          localPosition[2]
        ];
        if (signedDistanceToBox(localPosition, ble.size) <= 0) {
          if (ble.type == LATTICE_ELEMENT_TYPES2.SBEN) {
            B = [B[0], B[1] + ble.strength, B[2]];
          } else if (ble.type == LATTICE_ELEMENT_TYPES2.QUAD) {
            B = ble.strength > 0 ? [
              B[0] + abs2(ble.strength) * localPosition[1],
              B[1] + abs2(ble.strength) * localPosition[0],
              B[2]
            ] : [
              B[0] - abs2(ble.strength) * localPosition[1],
              B[1] - abs2(ble.strength) * localPosition[0],
              B[2]
            ];
          }
        }
      });
      return B;
    }
  };

  // src/lib/simulation/simulation.ts
  var Simulation = class {
    constructor(regl, { model, runner, debug }) {
      this.performanceLogger = new PerformanceLogger(debug.logPerformance);
      this.performanceLogger.start("Simulation()");
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
      const { particleCount, particleTypes, fourPositions, fourVelocities } = this.initialData = new ParticleCollection(model.emitter);
      this.configuration.runner.numberType = this.configuration.runner.packFloat2UInt8 ? "uint8" : "float";
      this.configuration.runner.numberType = "float";
      this.configuration.runner._iterationsPerRun = this.configuration.runner.iterationCount ? this.configuration.runner.iterationCount : (this.configuration.runner.snapshotCount - 1) * this.configuration.runner.iterationsPerSnapshot;
      this.colorCorrector = new ColorCorrector(regl, fourPositions, model.emitter.position);
      this.variables = {
        ...this.configuration.runner,
        particleCount,
        snapshotCount,
        iterations: this.configuration.runner._iterationsPerRun,
        particleTypes,
        position: new VariableBuffers(regl, this.configuration.runner.pusher === "glsl", particleCount, snapshotCount, this.configuration.runner.numberType, fourPositions),
        velocity: new VariableBuffers(regl, this.configuration.runner.pusher === "glsl", particleCount, snapshotCount, this.configuration.runner.numberType, fourVelocities),
        iteration: 0,
        particleColorsAndTypes: regl.texture({
          data: particleTypes.map((p) => PARTICLE_TYPES[p].color.concat(p)),
          shape: [particleCount, 1, 4],
          type: "uint8"
        }),
        colorCorrections: this.colorCorrector.toTexture(),
        particleChargesMassesChargeMassRatios: regl.texture({
          data: particleTypes.map((p) => [
            PARTICLE_TYPES[p].charge__qe,
            PARTICLE_TYPES[p].mass__eVc_2,
            PARTICLE_TYPES[p].chargeMassRatio__Ckg_1,
            p
          ]).flat(),
          shape: [particleCount, 1, 4],
          type: "float"
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
      this.pusher = this.configuration.runner.pusher === "glsl" ? glslBorisPush(this._regl, {
        runner: this.configuration.runner,
        variables: this.variables,
        model: this.model,
        debug: this.debug
      }) : jsBorisPush({
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
      };
    }
    log() {
      if (this.configuration.debug.logPushing) {
        if (!this._logStore)
          this._logStore = [];
        this._logStore.push(this.dump());
      }
    }
    dump(precision = 3) {
      const packedPositions = this.variables.position.pack(this.variables.position.toTypedArray(this.variables.position.pingPong, precision).float32Array);
      const packedVelocities = this.variables.position.pack(this.variables.velocity.toTypedArray(this.variables.position.pingPong, precision).float32Array);
      return JSON.parse(JSON.stringify({
        logEntry: this.logEntry(),
        packedPositions,
        packedVelocities,
        colorCorrections: this.colorCorrector.corrections,
        configuration: this.configuration,
        particleTypes: this.variables.particleTypes
      }));
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
  };

  // src/lib/simulation/simulationRunner.ts
  var INITIAL = "initial";
  var ACTIVE = "active";
  var PAUSED = "paused";
  var RESTART = "restart";
  var STATES = {
    INITIAL,
    ACTIVE,
    PAUSED,
    RESTART
  };
  var SimulationRunner = class {
    constructor(simulation, { prerender = false, loops = 0, mode = RUNNER_MODE.STEPWISE }, debug) {
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
      this._mode = this._mode === RUNNER_MODE.STEPWISE ? RUNNER_MODE.NOBREAK : RUNNER_MODE.STEPWISE;
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
          this.fsm = this._loopCountMax === 0 ? { state: STATES.PAUSED } : { state: STATES.ACTIVE };
        } else {
          this.fsm = { state: STATES.ACTIVE };
        }
      }
      if (this.fsm.state === STATES.ACTIVE) {
        if (this._simulation.variables.iteration > this._simulation.configuration.runner._iterationsPerRun - 1) {
          if (this._isLooping && this._loopCount <= this._loopCountMax) {
            this.fsm.state = "restart";
          } else {
            this.fsm.state = STATES.PAUSED;
          }
        } else {
          this._simulation.push(this._simulation.configuration.runner.iterationsPerSnapshot);
          if (this._mode === RUNNER_MODE.STEPWISE) {
            this.fsm.state = STATES.PAUSED;
          }
        }
      } else if (this.fsm.state === STATES.RESTART) {
        this._loopCount++;
        this._simulation.reset();
        this._simulation.push(this._simulation.configuration.runner.iterationsPerSnapshot * this._simulation.configuration.runner.snapshotsPerTick);
        this.fsm.state = this.fsm.state.replace(/restart/, this._mode === RUNNER_MODE.STEPWISE ? STATES.PAUSED : STATES.ACTIVE);
      }
      const tick_after = this._simulation.variables.iteration;
      const changed = tick_after !== tick_before;
      return { changed, tick: tick_after };
    }
  };

  // src/lib/views/boxesViewSimple/fields/drawFieldsCommands.ts
  var import_primitive_cylinder = __toModule(require_primitive_cylinder());

  // src/lib/views/boxesViewSimple/lattice/mergeMeshes.ts
  function offsetCells(cells, offset) {
    return cells.map(function(cell) {
      return cell.map(function(index) {
        return index + offset;
      });
    });
  }
  function mergeMeshes(meshes) {
    let positions = [];
    let uvs = [];
    let normals = [];
    let cells = [];
    let offset = 0;
    meshes.forEach(function(mesh) {
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
    };
  }

  // src/lib/views/boxesViewSimple/fields/fieldValue.vert
  var fieldValue_default = "precision mediump float;\n#define GLSLIFY 1\nattribute vec3 aOffset;\nattribute vec3 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aUV;\nvarying vec2 vUv;\nvarying float v_visibility;\n// These three are instanced attributes.\nuniform mat4 projection, view;\nuniform vec3 magneticField;\nvarying vec3 vPosition;\nvarying float vColorCorrection;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec3 vColor;\nvarying vec3 vScale;\n\nstruct BeamlineElement {\n  vec3 middle;\n  vec3 size;\n  float phi;\n  int type; //0: drift, 1: dipole, 2: quadrupole, 3: esta\n  float strength;\n};\n\n/*__latticeSize__*/\n\nconst int BEAMLINE_ELEMENT_TYPE_DRIFT = 0;\nconst int BEAMLINE_ELEMENT_TYPE_DIPOLE = 1;\nconst int BEAMLINE_ELEMENT_TYPE_QUADRUPOLE = 2;\n\nmat3 mat3LookAt(vec3 eye, vec3 target, float roll) {\n  vec3 rr = vec3(sin(roll), cos(roll), 0.0);\n  vec3 ww = normalize(target - eye);\n  vec3 uu = normalize(cross(ww, rr));\n  vec3 vv = normalize(cross(uu, ww));\n\n  return mat3(uu, vv, ww);\n}\n\n/*__latticeChunkGLSL__*/\n\nmat2 rot2D(float phi) {\n  float c = cos(phi);\n  float s = sin(phi);\n  return mat2(c, -s, s, c);\n}\nfloat sdBox(vec3 p, vec3 s) {\n  vec3 d = abs(p) - .5 * s;\n  return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));\n}\nBeamlineElement getBeamlineElement(float id) {\n  for(int i = 0; i < BEAMLINE_ELEMENT_COUNT; i++) {\n    if(float(i) == id)\n      return beamline[i];\n  }\n  return beamline[0];\n}\n\nvec3 getB(vec3 position) {\n\n  vec3 B = magneticField;\n  \n\n  for(int i = 0; i < BEAMLINE_ELEMENT_COUNT; i++) {\n    BeamlineElement ble = beamline[i];\n    vec3 localPosition = position;\n    localPosition -= ble.middle;\n    localPosition.xz *= rot2D(ble.phi);\n    if(sdBox(localPosition, ble.size) <= 0.) {\n      if(ble.type == BEAMLINE_ELEMENT_TYPE_DIPOLE) {\n        B += vec3(0., ble.strength, 0.);\n      } else if(ble.type == BEAMLINE_ELEMENT_TYPE_QUADRUPOLE) {\n        B += abs(ble.strength) *\n          ((ble.strength > 0.) ? vec3(localPosition.y, localPosition.x, 0) : vec3(-localPosition.y, -localPosition.x, 0.));\n      }\n    }\n  }\n\n  return B;\n}\n\nmat3 rotateAlign(vec3 v1, vec3 v2) {\n  vec3 axis = cross(v1, v2);\n\n  float cosA = dot(v1, v2);\n  float k = 1. / (1. + cosA);\n\n  return mat3((axis.x * axis.x * k) + cosA, (axis.y * axis.x * k) - axis.z, (axis.z * axis.x * k) + axis.y, (axis.x * axis.y * k) + axis.z, (axis.y * axis.y * k) + cosA, (axis.z * axis.y * k) - axis.x, (axis.x * axis.z * k) - axis.y, (axis.y * axis.z * k) + axis.x, (axis.z * axis.z * k) + cosA);\n\n}\n\nvoid main() {\n  initLatticeData();\n  vUv = aUV;\n  vNormal = aNormal;\n  vNormalOrig = aNormal;\n\n  vec3 b = getB(aOffset);\n\n  vColor = .1 * vec3(b);\n  float scale = length(b) == 0. ? .0 : min(length(b)*1000., 1.) / 1.;\n  vec3 direction = normalize(b);\n\n  // mat3 lookAt = mat3LookAt(vec3(0.), direction, 0.1);\n\n  // Translate\n  mat4 tPos = mat4(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0), vec4(aOffset, 1.0));\n\n  // float angleX = dot(b, vec3(1., 0., 0.));\n  // float angleZ = 0.;\n  // float angleY = 0.;\n\n// // Rotate\n//   mat4 rXPos = mat4(vec4(1.0, 0.0, 0.0, 0.0), vec4(0.0, cos(angleX), -sin(angleX), 0.0), vec4(0.0, sin(angleX), cos(angleX), 0.0), vec4(0.0, 0.0, 0.0, 1.0));\n\n//   mat4 rYPos = mat4(vec4(cos(angleY), 0., -sin(angleY), 0.0), vec4(0.0, 1.0, 0.0, 0.0), vec4(sin(angleY), 0.0, cos(angleY), 0.0), vec4(0.0, 0.0, 0.0, 1.0));\n\n//   mat4 rZPos = mat4(vec4(cos(angleZ), -sin(angleZ), 0.0, 0.0), vec4(sin(angleZ), cos(angleZ), 0.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0));\n\n// Scale\n  // mat4 sScale = mat4(vec4(1., 0.0, 0.0, 0.0), vec4(0.0, scale, 0.0, 0.0), vec4(0.0, 0.0, 1., 0.0), vec4(0.0, 0.0, 0.0, 1.0));\n  mat3 sScale = mat3(vec3(1., 0.0, 0.0), vec3(0.0, scale, 0.0), vec3(0.0, 0.0, 1.));\n\n  // mat4 aModel = tPos * rotateAlign(b) * sScale;\n\n  vPosition = ( tPos *  vec4( sScale *  aPosition, 1.)).xyz;\n\n  gl_Position = projection * view * vec4(vPosition, 1.);\n}\n";

  // src/lib/views/boxesViewSimple/fields/fieldValue.frag
  var fieldValue_default2 = "precision mediump float;\n#define GLSLIFY 1\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec3 vColor;\nvarying vec2 vUv;\nuniform float ambientLightAmount;\nuniform float vColorCorrection;\nuniform float diffuseLightAmount;\nuniform vec3 shadowDirection;\nuniform float pathicleWidth;\nuniform vec3 eye;\nvarying vec3 vScale;\n\nfloat edger(vec2 uv, vec3 boxScale, float edgeWidth, vec3 normal) {\n\n  float edgeXY =  smoothstep(0., edgeWidth, uv.x*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.z);\n  float edgeXZ =  smoothstep(0., edgeWidth, uv.y*boxScale.y) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.y);\n  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);\n\n  float edgeYX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);\n  float edgeYZ =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);\n  float edgeY = (1.-(edgeYX*edgeYZ))*abs(normal.y);\n\n  float edgeZX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);\n  float edgeZY =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);\n  float edgeZ = (1.-(edgeZX*edgeZY))*abs(normal.z);\n\n  return clamp(edgeX+edgeY, 0., 1.);\n}\n\n//\n//float edgerFeathered(vec2 uv, vec3 boxScale, float edgeWidth) {\n//\n//  float feather = .1;\n//\n//  float edgeXY =  smoothstep(edgeWidth, edgeWidth+feather, uv.x*boxScale.z) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.x)*boxScale.z);\n//  float edgeXZ =  smoothstep(edgeWidth, edgeWidth+feather, uv.y*boxScale.y) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.y)*boxScale.y);\n//  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);\n//\n//  return clamp(edgeX, 0., 1.);\n//}\n//\n//\n//float edgerHard(vec2 uv, vec3 boxScale, float edgeWidth) {\n//  float edgeXY =  step(edgeWidth*(1.+uv.x*boxScale.z), uv.x*boxScale.z) * step(edgeWidth, (1.-uv.x)*boxScale.z);\n//  float edgeXZ =  step(edgeWidth*(0.5+uv.x/2.), uv.y*boxScale.y) * step(edgeWidth*(0.5+uv.x/2.), (1.-uv.y)*boxScale.y);\n//  float edgeX = (1.-(edgeXZ))*abs(normal.x);\n//\n//  return clamp(edgeX, 0., 1.);\n//}\n\nfloat diffuse(vec3 lightDir, vec3 nrm)\n{\n  float diffAmt = max(0.0, dot(nrm, lightDir));\n  return diffAmt;\n}\nfloat specular(vec3 lightDir, vec3 viewDir, vec3 nrm, float shininess)\n{\n  vec3 halfVec = normalize(viewDir + lightDir);\n  float specAmt = max(0.0, dot(halfVec, nrm));\n  return pow(specAmt, shininess);\n}\n\nstruct DirectionalLight\n{\n  vec3 direction;\n  vec3 color;\n  float intensity;\n};\n#define NUM_DIR_LIGHTS 3\nDirectionalLight directionalLights[NUM_DIR_LIGHTS];\n\nvoid main () {\n\n  #ifdef lighting\n\n  if (length(vColor) == 0.) discard;\n  vec3 color = vColor;\n  gl_FragColor = vec4(vColor, 1.);\n\n  vec3 viewDir = normalize(eye - vPosition);\n  vec3 normal = normalize(vNormal);\n\n  directionalLights[0] = DirectionalLight(shadowDirection, vec3(1.), .15);\n  directionalLights[1] = DirectionalLight(shadowDirection+vec3(-5., 0., 5.), vec3(1.), .15);\n  directionalLights[2] = DirectionalLight(shadowDirection+vec3(5., 0., -5.), vec3(1.), .15);\n  vec3 edgedColor = vColor;\n  vec3 finalColor = ambientLightAmount * vColor;\n\n  for (int i = 0; i < NUM_DIR_LIGHTS; ++i)\n  {\n    DirectionalLight light = directionalLights[i];\n    vec3 sceneLight = mix(light.color, edgedColor.rgb + light.color * 0.5, 0.5);\n    float diffAmt = diffuse(light.direction, normal) * light.intensity;\n    float specAmt = specular(light.direction, viewDir, normal, 0.0) * light.intensity;\n\n    float shadow = 1.; //.9 * vColorCorrection;//clamp(vColorCorrection + abs(2.+v_position.y*5.), 0., 1.);\n    float specMask = edger(vUv, vScale, 1. * .02, vNormalOrig);\n//    float specMask = edger(vUv, vScale, 1. * .1, vNormalOrig) * smoothstep(5., 2., length(vPosition-eye));\n    vec3 specCol = specMask * sceneLight * specAmt;\n    finalColor += shadow * vColor * diffAmt * light.color;\n    finalColor += shadow * specCol * sceneLight;\n  }\n\n  gl_FragColor =vec4(finalColor, 1.);\n//  gl_FragColor = vec4(1., 0., 0., 1.);\n//  gl_FragColor = vec4(vColor, .5);\n  #endif\n\n}\n";

  // src/lib/views/boxesViewSimple/fields/drawFieldsCommands.ts
  var import_fromTranslation = __toModule(require_fromTranslation());
  var import_gl_mat4 = __toModule(require_gl_mat4());
  var X = 51;
  var Y = 3;
  var Z = 51;
  var STEP_SIZE = 0.1;
  var positionAttributes = () => {
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
    return out;
  };
  function drawFieldsCommands_default(regl, { model, view }, shadow) {
    const coneGeometry = (0, import_primitive_cylinder.default)(0, 0.01, 0.05);
    const tailGeometry = (0, import_primitive_cylinder.default)(5e-3, 5e-3, 0.05);
    tailGeometry.positions = tailGeometry.positions.map(([x, y, z]) => [
      x,
      y - 0.05,
      z
    ]);
    const geometry = mergeMeshes([coneGeometry, tailGeometry]);
    let modelMatrix = (0, import_gl_mat4.identity)([]);
    const command = (mode) => {
      return regl({
        depth: {
          enable: true
        },
        blend: {
          enable: true,
          func: {
            srcRGB: "src alpha",
            srcAlpha: 1,
            dstRGB: "one minus src alpha",
            dstAlpha: 1
          },
          equation: {
            rgb: "add",
            alpha: "add"
          },
          color: [0, 0, 0, 1]
        },
        cull: {
          enable: true,
          face: "back"
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
          fieldValue_default.replace("/*__latticeDefinition__*/", model.lattice.toGLSLDefinition()).replace("/*__latticeChunkGLSL__*/", latticeChunk(model.lattice)).replace("/*__latticeSize__*/", `const int BEAMLINE_ELEMENT_COUNT_OR_1 = ${model.lattice.activeBeamlineElements().length || 1}; const int BEAMLINE_ELEMENT_COUNT = ${model.lattice.activeBeamlineElements().length};`)
        ].join("\n"),
        frag: [`#define ${mode} 1`, fieldValue_default2].join("\n"),
        uniforms: {
          ...shadow.uniforms,
          stageSize: view.stageGrid.size,
          magneticField: model.interactions.magneticField,
          ...mode === "shadow" && {
            projection: shadow.shadowProjectionMatrix,
            view: shadow.shadowViewMatrix
          },
          ...mode === "lighting" && { shadowMap: shadow.fbo },
          utColorCorrections: (ctx, props) => {
            return props.colorCorrections;
          },
          model: (ctx, props) => {
            modelMatrix = (0, import_gl_mat4.identity)([]);
            return (0, import_fromTranslation.default)(modelMatrix, [
              props.modelTranslateX || 0,
              props.modelTranslateY || 0,
              0
            ]);
          }
        },
        ...mode === "shadow" && {
          framebuffer: shadow.fbo
        }
      });
    };
    return {
      lighting: command("lighting"),
      shadow: command("shadow")
    };
  }

  // src/lib/views/boxesViewSimple/model/drawModelCommands.ts
  var import_primitive_cube = __toModule(require_primitive_cube());

  // src/lib/views/boxesViewSimple/model/model.vert
  var model_default = "precision highp float;\n#define GLSLIFY 1\nattribute vec3 aPosition;\n\nattribute vec3 aNormal;\nattribute vec2 aUV;\n\nattribute float a_particle;\nattribute float a_snapshot;\n\nuniform int particleCount;\nuniform int snapshotCount;\nuniform int packFloat2UInt8;\n\nuniform vec2 viewRange;\n\nuniform float pathicleWidth;\nuniform float pathicleGap;\nuniform float pathicleHeight;\nuniform float stageGrid_size;\n\nuniform vec2 resolution;\nuniform sampler2D utColorCorrections;\nuniform sampler2D utParticleColorAndType;\nuniform sampler2D ut_position;\nuniform sampler2D ut_velocity;\nuniform mat4 projection, view, model;\nuniform vec3 eye;\n\nuniform mat4 shadowProjectionMatrix;\nuniform mat4 shadowViewMatrix;\nuniform vec3 shadowDirection;\nuniform bool littleEndian;\nvarying float v_visibility;\nvarying vec3 vScale;\nvarying vec3 v_position;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec2 vUv;\nvarying vec3 vShadowCoord;\nvarying vec3 vColor;\nvarying float vColorCorrection;\nvarying vec4 v_lightNDC;\nuniform sampler2D shadowMap;\n\nconst mat4 texUnitConverter = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);\n\nfloat inverse(float m) {\n  return 1.0 / m;\n}\n\nmat2 inverse(mat2 m) {\n  return mat2(m[1][1],-m[0][1],\n             -m[1][0], m[0][0]) / (m[0][0]*m[1][1] - m[0][1]*m[1][0]);\n}\n\nmat3 inverse(mat3 m) {\n  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2];\n  float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2];\n  float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2];\n\n  float b01 = a22 * a11 - a12 * a21;\n  float b11 = -a22 * a10 + a12 * a20;\n  float b21 = a21 * a10 - a11 * a20;\n\n  float det = a00 * b01 + a01 * b11 + a02 * b21;\n\n  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),\n              b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),\n              b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;\n}\n\nmat4 inverse(mat4 m) {\n  float\n      a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],\n      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],\n      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],\n      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],\n\n      b00 = a00 * a11 - a01 * a10,\n      b01 = a00 * a12 - a02 * a10,\n      b02 = a00 * a13 - a03 * a10,\n      b03 = a01 * a12 - a02 * a11,\n      b04 = a01 * a13 - a03 * a11,\n      b05 = a02 * a13 - a03 * a12,\n      b06 = a20 * a31 - a21 * a30,\n      b07 = a20 * a32 - a22 * a30,\n      b08 = a20 * a33 - a23 * a30,\n      b09 = a21 * a32 - a22 * a31,\n      b10 = a21 * a33 - a23 * a31,\n      b11 = a22 * a33 - a23 * a32,\n\n      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;\n\n  return mat4(\n      a11 * b11 - a12 * b10 + a13 * b09,\n      a02 * b10 - a01 * b11 - a03 * b09,\n      a31 * b05 - a32 * b04 + a33 * b03,\n      a22 * b04 - a21 * b05 - a23 * b03,\n      a12 * b08 - a10 * b11 - a13 * b07,\n      a00 * b11 - a02 * b08 + a03 * b07,\n      a32 * b02 - a30 * b05 - a33 * b01,\n      a20 * b05 - a22 * b02 + a23 * b01,\n      a10 * b10 - a11 * b08 + a13 * b06,\n      a01 * b08 - a00 * b10 - a03 * b06,\n      a30 * b04 - a31 * b02 + a33 * b00,\n      a21 * b02 - a20 * b04 - a23 * b00,\n      a11 * b07 - a10 * b09 - a12 * b06,\n      a00 * b09 - a01 * b07 + a02 * b06,\n      a31 * b01 - a30 * b03 - a32 * b00,\n      a20 * b03 - a21 * b01 + a22 * b00) / det;\n}\n\nfloat transpose(float m) {\n  return m;\n}\n\nmat2 transpose(mat2 m) {\n  return mat2(m[0][0], m[1][0],\n              m[0][1], m[1][1]);\n}\n\nmat3 transpose(mat3 m) {\n  return mat3(m[0][0], m[1][0], m[2][0],\n              m[0][1], m[1][1], m[2][1],\n              m[0][2], m[1][2], m[2][2]);\n}\n\nmat4 transpose(mat4 m) {\n  return mat4(m[0][0], m[1][0], m[2][0], m[3][0],\n              m[0][1], m[1][1], m[2][1], m[3][1],\n              m[0][2], m[1][2], m[2][2], m[3][2],\n              m[0][3], m[1][3], m[2][3], m[3][3]);\n}\n\nmat4 lookAt(vec3 eye, vec3 at, vec3 up) {\n  vec3 zaxis = normalize(eye - at);\n  vec3 xaxis = normalize(cross(zaxis, up));\n  vec3 yaxis = cross(xaxis, zaxis);\n  zaxis *= -1.;\n  return mat4(\n  vec4(xaxis.x, xaxis.y, xaxis.z, -dot(xaxis, eye)),\n  vec4(yaxis.x, yaxis.y, yaxis.z, -dot(yaxis, eye)),\n  vec4(zaxis.x, zaxis.y, zaxis.z, -dot(zaxis, eye)),\n  vec4(0, 0, 0, 1)\n  );\n}\n\n#ifdef PACK_FLOAT\n\n// Denormalize 8-bit color channels to integers in the range 0 to 255.\nivec4 floatsToBytes(vec4 inputFloats, bool littleEndian) {\n  ivec4 bytes = ivec4(inputFloats * 255.0);\n  return (\n    littleEndian\n    ? bytes.abgr\n    : bytes\n  );\n}\n\n// Break the four bytes down into an array of 32 bits.\nvoid bytesToBits(const in ivec4 bytes, out bool bits[32]) {\n  for (int channelIndex = 0; channelIndex < 4; ++channelIndex) {\n    float acc = float(bytes[channelIndex]);\n    for (int indexInByte = 7; indexInByte >= 0; --indexInByte) {\n      float powerOfTwo = exp2(float(indexInByte));\n      bool bit = acc >= powerOfTwo;\n      bits[channelIndex * 8 + (7 - indexInByte)] = bit;\n      acc = mod(acc, powerOfTwo);\n    }\n  }\n}\n\n// Compute the exponent of the 32-bit float.\nfloat getExponent(bool bits[32]) {\n  const int startIndex = 1;\n  const int bitStringLength = 8;\n  const int endBeforeIndex = startIndex + bitStringLength;\n  float acc = 0.0;\n  int pow2 = bitStringLength - 1;\n  for (int bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {\n    acc += float(bits[bitIndex]) * exp2(float(pow2--));\n  }\n  return acc;\n}\n\n// Compute the mantissa of the 32-bit float.\nfloat getMantissa(bool bits[32], bool subnormal) {\n  const int startIndex = 9;\n  const int bitStringLength = 23;\n  const int endBeforeIndex = startIndex + bitStringLength;\n  // Leading/implicit/hidden bit convention:\n  // If the number is not subnormal (with exponent 0), we add a leading 1 digit.\n  float acc = float(!subnormal) * exp2(float(bitStringLength));\n  int pow2 = bitStringLength - 1;\n  for (int bitIndex = startIndex; bitIndex < endBeforeIndex; ++bitIndex) {\n    acc += float(bits[bitIndex]) * exp2(float(pow2--));\n  }\n  return acc;\n}\n\n// Parse the float from its 32 bits.\nfloat bitsToFloat(bool bits[32]) {\n  float signBit = float(bits[0]) * -2.0 + 1.0;\n  float exponent = getExponent(bits);\n  bool subnormal = abs(exponent - 0.0) < 0.01;\n  float mantissa = getMantissa(bits, subnormal);\n  float exponentBias = 127.0;\n  return signBit * mantissa * exp2(exponent - exponentBias - 23.0);\n}\n\n// Decode a 32-bit float from the RGBA color channels of a texel.\nfloat rgbaToFloat(vec4 texelRGBA, bool littleEndian) {\n  ivec4 rgbaBytes = floatsToBytes(texelRGBA, littleEndian);\n  bool bits[32];\n  bytesToBits(rgbaBytes, bits);\n  return bitsToFloat(bits);\n}\n\n#endif\n\nvec4 readVariable(sampler2D tex, int p, int s) {\n\n#ifdef PACK_FLOAT\n  return vec4(rgbaToFloat(texture2D(tex, vec2(4 * s, p) / resolution), littleEndian), \n  rgbaToFloat(texture2D(tex, vec2(4 * s + 1, p) / resolution), littleEndian), \n  rgbaToFloat(texture2D(tex, vec2(4 * s + 2, p) / resolution), littleEndian), \n  rgbaToFloat(texture2D(tex, vec2(4 * s + 3, p) / resolution), littleEndian));\n#else\n  return vec4(texture2D(tex, vec2(4 * s, p) / resolution).r, texture2D(tex, vec2(4 * s + 1, p) / resolution).r, texture2D(tex, vec2(4 * s + 2, p) / resolution).r, texture2D(tex, vec2(4 * s + 3, p) / resolution).r);\n#endif\n}\n\nfloat unpackRGBA (vec4 v) {\n  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));\n}\nfloat shadowValue() {\n  vec3 tex = texture2D(shadowMap, vUv).rgb;\n\n  vec3 lightPos = v_lightNDC.xyz / v_lightNDC.w;\n\n  float bias = 0.001;\n  float depth = lightPos.z - bias;\n  float occluder = unpackRGBA(texture2D(shadowMap, lightPos.xy));\n\n  // Compare actual depth from light to the occluded depth rendered in the depth map\n  // If the occluded depth is smaller, we must be in shadow\n  return mix(.0, 1., occluder-depth);\n\n}\n\nfloat insideBox3D(vec3 v, vec3 bottomLeft, vec3 topRight) {\n  vec3 s = step(bottomLeft, v) - step(topRight, v);\n  return s.x * s.y * s.z;\n}\n\nfloat get_colorCorrection(int p) {\n  vec2 coords = vec2(float(p), 0.) / vec2(float(particleCount), 1.);\n  return texture2D(utColorCorrections, coords).r;\n}\n\nvec4 get_color(int p) {\n  vec2 coords = vec2(float(p), 0.) / vec2(float(particleCount), 1.);\n  return texture2D(utParticleColorAndType, coords);\n}\nfloat visibility(vec4 fourPosition) {\n\n  bool outsideBox = insideBox3D(fourPosition.xyz, vec3(stageGrid_size), vec3(-stageGrid_size)) == 0.;\n  bool beyondProgressLower = (viewRange[0] * float(snapshotCount) >= float(snapshotCount)-a_snapshot);\n  bool beyondProgressUpper =  (viewRange[1] * float(snapshotCount) < float(snapshotCount)-a_snapshot);\n  return  (outsideBox || beyondProgressLower || beyondProgressUpper ) ? 0. : 1.;\n}\n\nvoid main () {\n\n  vec4 fourPosition = readVariable(ut_position, int(a_particle), int(a_snapshot));\n  vec4 previousFourPosition = readVariable(ut_position, int(a_particle), int(a_snapshot) + 1);\n\n  mat4 lookAtMat4 = lookAt(fourPosition.xyz, previousFourPosition.xyz, vec3(0., 1., 0.));\n\n#ifdef lighting\n    vScale = vec3(\n      pathicleWidth  * 1.,\n      pathicleHeight,\n      length(previousFourPosition.xyz - fourPosition.xyz) - pathicleGap);\n#endif\n\n#ifdef shadow\n    vScale = vec3(\n      pathicleWidth * 10.,\n      pathicleHeight,\n      length(previousFourPosition.xyz - fourPosition.xyz) );\n#endif\n\n  vec3 scaledPosition = aPosition * vScale;\n\n  v_position = (((lookAtMat4 * vec4(scaledPosition, 1.)).xyz\n    + 0.5 * (fourPosition.xyz + previousFourPosition.xyz)));\n\n  vNormalOrig = aNormal;\n  vNormal = normalize((transpose(inverse(lookAtMat4)) * vec4(aNormal, 0.)).xyz);\n\n  vUv = aUV;\n\n  vShadowCoord = (shadowProjectionMatrix *  shadowViewMatrix * model * vec4(v_position, 1.0)).xyz;\n  vColor = get_color(int(a_particle)).rgb;\n  v_visibility = visibility(fourPosition);\n\n#ifdef lighting\n\n  v_lightNDC = texUnitConverter * shadowProjectionMatrix * shadowViewMatrix * model * vec4(v_position, 1.0);\n  vColorCorrection = get_colorCorrection(int(a_particle));\n  v_visibility = v_visibility; // * clamp(shadowValue(), 1., 1.);\n\n  gl_Position = projection * view *  model * vec4(v_position, 1.0);\n\n#endif// lighting\n\n#ifdef shadow\n\n  gl_Position =vec4(vShadowCoord, 1.0);\n\n#endif// shadow\n}\n\n";

  // src/lib/views/boxesViewSimple/model/model.frag
  var model_default2 = "precision highp float;\n#define GLSLIFY 1\n//#extension GL_OES_standard_derivatives : enable\n\nvarying float v_visibility;\nvarying vec3 v_position;\nvarying vec3 vScale;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec2 vUv;\nvarying vec4 vAmbientColor;\nvarying vec3 vColor;\nvarying float vColorCorrection;\nvarying vec4 v_lightNDC;\n\nuniform float ambientLightAmount;\nuniform float diffuseLightAmount;\nuniform float stageSize;\n\nuniform float pathicleWidth;\nuniform vec3 eye;\nuniform vec2 uResolution;\n\nvarying vec3 vShadowCoord;\nuniform vec3 shadowDirection;\nuniform sampler2D shadowMap;\nuniform float minBias;\nuniform float maxBias;\n\nfloat edger(vec2 uv, vec3 boxScale, float edgeWidth, vec3 normal) {\n\n  float edgeXY =  smoothstep(0., edgeWidth, uv.x*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.z);\n  float edgeXZ =  smoothstep(0., edgeWidth, uv.y*boxScale.y) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.y);\n  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);\n\n  float edgeYX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);\n  float edgeYZ =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);\n  float edgeY = (1.-(edgeYX*edgeYZ))*abs(normal.y);\n\n  float edgeZX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);\n  float edgeZY =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);\n  float edgeZ = (1.-(edgeZX*edgeZY))*abs(normal.z);\n\n  return clamp(edgeX+edgeY, 0., 1.);\n}\n\n//\n//float edgerFeathered(vec2 uv, vec3 boxScale, float edgeWidth) {\n//\n//  float feather = .1;\n//\n//  float edgeXY =  smoothstep(edgeWidth, edgeWidth+feather, uv.x*boxScale.z) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.x)*boxScale.z);\n//  float edgeXZ =  smoothstep(edgeWidth, edgeWidth+feather, uv.y*boxScale.y) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.y)*boxScale.y);\n//  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);\n//\n//  return clamp(edgeX, 0., 1.);\n//}\n//\n//\n//float edgerHard(vec2 uv, vec3 boxScale, float edgeWidth) {\n//  float edgeXY =  step(edgeWidth*(1.+uv.x*boxScale.z), uv.x*boxScale.z) * step(edgeWidth, (1.-uv.x)*boxScale.z);\n//  float edgeXZ =  step(edgeWidth*(0.5+uv.x/2.), uv.y*boxScale.y) * step(edgeWidth*(0.5+uv.x/2.), (1.-uv.y)*boxScale.y);\n//  float edgeX = (1.-(edgeXZ))*abs(normal.x);\n//\n//  return clamp(edgeX, 0., 1.);\n//}\n\nvec4 packRGBA (float v) {\n  vec4 pack = fract(vec4(1.0, 255.0, 65025.0, 16581375.0) * v);\n  pack -= pack.yzww * vec2(1.0 / 255.0, 0.0).xxxy;\n  return pack;\n}\n\nfloat unpackRGBA (vec4 v) {\n  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));\n}\n\nfloat shadowValue() {\n  vec3 tex = texture2D(shadowMap, vUv).rgb;\n\n  vec3 lightPos = v_lightNDC.xyz / v_lightNDC.w;\n\n  float bias = 0.001;\n  float depth = lightPos.z - bias;\n  float occluder = unpackRGBA(texture2D(shadowMap, lightPos.xy));\n\n  // Compare actual depth from light to the occluded depth rendered in the depth map\n  // If the occluded depth is smaller, we must be in shadow\n  return mix(0.2, 1.0, step(depth, occluder));\n\n}\n\nfloat map(float value, float min1, float max1, float min2, float max2) {\n  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);\n}\n\nfloat diffuse(vec3 lightDir, vec3 nrm)\n{\n  float diffAmt = max(0.0, dot(nrm, lightDir));\n  return diffAmt;\n}\nfloat specular(vec3 lightDir, vec3 viewDir, vec3 nrm, float shininess)\n{\n  vec3 halfVec = normalize(viewDir + lightDir);\n  float specAmt = max(0.0, dot(halfVec, nrm));\n  return pow(specAmt, shininess);\n}\n\nstruct DirectionalLight\n{\n  vec3 direction;\n  vec3 color;\n  float intensity;\n};\n#define NUM_DIR_LIGHTS 3\nDirectionalLight directionalLights[NUM_DIR_LIGHTS];\n\nvoid main () {\n\n    if (v_visibility < .9) discard;\n\n  #ifdef lighting\n\n  vec3 viewDir = normalize(eye - v_position);\n  vec3 normal = normalize(vNormal);\n\n  directionalLights[0] = DirectionalLight(shadowDirection, vec3(1.), .15);\n  directionalLights[1] = DirectionalLight(shadowDirection+vec3(-5., 0., 5.), vec3(1.), .15);\n  directionalLights[2] = DirectionalLight(shadowDirection+vec3(5., 0., -5.), vec3(1.), .15);\n  vec3 edgedColor = vColor;\n  vec3 finalColor = ambientLightAmount * vColor;\n\n  for (int i = 0; i < NUM_DIR_LIGHTS; ++i)\n  {\n    DirectionalLight light = directionalLights[i];\n    vec3 sceneLight = mix(light.color, edgedColor.rgb + light.color * 0.5, 0.5);\n    float diffAmt = diffuse(light.direction, normal) * light.intensity;\n    float specAmt = specular(light.direction, viewDir, normal, 0.0) * light.intensity;\n\n    float shadow = .9 * vColorCorrection;//clamp(vColorCorrection + abs(2.+v_position.y*5.), 0., 1.);\n    float specMask = edger(vUv, vScale, 1. * pathicleWidth, vNormalOrig) * smoothstep(5., 2., length(v_position-eye));\n    vec3 specCol = specMask * sceneLight * specAmt;\n    finalColor += shadow * vColor * diffAmt * light.color;\n    finalColor += shadow * specCol * sceneLight;\n  }\n\n  gl_FragColor =vec4(finalColor, 1.); //map(v_visibility, 0.5, 1., 0.75, .9));\n\n  #endif// lighting\n\n  #ifdef shadow\n  gl_FragColor = packRGBA(vShadowCoord.z );\n  #endif\n\n}\n\n";

  // src/lib/views/boxesViewSimple/model/drawModelCommands.ts
  var import_fromTranslation2 = __toModule(require_fromTranslation());
  var import_gl_mat42 = __toModule(require_gl_mat4());
  var stepAttributes = ({ particleCount, snapshotCount }) => {
    return Array(particleCount * snapshotCount).fill(0).map((_, i) => Math.floor(i / particleCount));
  };
  var particleAttributes = ({ particleCount, snapshotCount }) => {
    return Array(particleCount * snapshotCount).fill(0).map((_, i) => i % particleCount);
  };
  function drawModelCommands_default(regl, { variables, view }, shadow) {
    const geometry = (0, import_primitive_cube.default)();
    let modelMatrix = (0, import_gl_mat42.identity)([]);
    const command = (mode) => {
      return regl({
        depth: {
          enable: true
        },
        blend: {
          enable: true,
          func: {
            srcRGB: "src alpha",
            srcAlpha: 1,
            dstRGB: "one minus src alpha",
            dstAlpha: 1
          },
          equation: {
            rgb: "add",
            alpha: "add"
          },
          color: [0, 0, 0, 1]
        },
        cull: {
          enable: true,
          face: "back"
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
          ...variables.packFloat2UInt8 ? [`#define PACK_FLOAT`] : [],
          `#define ${mode} 1`,
          model_default
        ].join("\n"),
        frag: [
          `#define ${mode} 1`,
          model_default2
        ].join("\n"),
        uniforms: {
          ...shadow.uniforms,
          stageSize: view.stageGrid.size,
          ...mode === "shadow" && {
            projection: shadow.shadowProjectionMatrix,
            view: shadow.shadowViewMatrix
          },
          ...mode === "lighting" && { shadowMap: shadow.fbo },
          utColorCorrections: (ctx, props) => {
            return props.colorCorrections;
          },
          utParticleColorAndType: (ctx, props) => {
            return props.particleColorsAndTypes;
          },
          ut_position: (ctx, props) => {
            return props.position;
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
            modelMatrix = (0, import_gl_mat42.identity)([]);
            return (0, import_fromTranslation2.default)(modelMatrix, [
              props.modelTranslateX || 0,
              props.modelTranslateY || 0,
              0
            ]);
          }
        },
        ...mode === "shadow" && {
          framebuffer: shadow.fbo
        }
      });
    };
    return {
      lighting: command("lighting"),
      shadow: command("shadow")
    };
  }

  // src/lib/views/boxesViewSimple/stage/stage.frag
  var stage_default = "precision highp float;\n#extension GL_OES_standard_derivatives : enable\n#define GLSLIFY 1\n\n#define SQRT2 1.41421356\n#define PI 3.14159\n\nuniform vec3 shadowDirection;\nuniform sampler2D shadowMap;\nuniform float minBias;\nuniform float maxBias;\nuniform float stageSize;\n\nvarying vec3 vShadowCoord;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec2 vUv;\n\nfloat unpackRGBA (vec4 v) {\n  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));\n}\n\n// Can go down to 10 or so, and still be usable, probably...\n#define ITERATIONS 5\n\n// Set this to 0.0 to stop the pixel movement.\n#define TIME iTime\n\n#define TAU  6.28318530718\n\n//-------------------------------------------------------------------------------------------\n// Use last part of hash function to generate new random radius and angle...\nvec2 Sample(inout vec2 r)\n{\n  r = fract(r * vec2(33.3983, 43.4427));\n  return r-.5;\n  //return sqrt(r.x+.001) * vec2(sin(r.y * TAU), cos(r.y * TAU))*.5; // <<=== circular sampling.\n}\n\n  //-------------------------------------------------------------------------------------------\n  #define HASHSCALE 443.8975\nvec2 Hash22(vec2 p)\n{\n  vec3 p3 = fract(vec3(p.xyx) * HASHSCALE);\n  p3 += dot(p3, p3.yzx+19.19);\n  return fract(vec2((p3.x + p3.y)*p3.z, (p3.x+p3.z)*p3.y));\n}\n\n//-------------------------------------------------------------------------------------------\nvec3 Blur(sampler2D tex, vec2 uv, float radius)\n{\n  radius = radius * .04;\n\n  vec2 circle = vec2(radius); // * vec2((iResolution.y / iResolution.x), 1.0);\n\n  // Remove the time reference to prevent random jittering if you don't like it.\n  vec2 random = Hash22(uv);\n\n  // Do the blur here...\n  vec3 acc = vec3(0.0);\n  for (int i = 0; i < ITERATIONS; i++) {\n    acc += texture2D(tex, uv+ circle * Sample(random), radius*1.0).xyz;\n  }\n  return acc / float(ITERATIONS);\n}\n\nfloat fBlur(sampler2D tex, vec2 uv, float radius)\n{\n  vec2 circle = vec2(radius);\n\n  // Remove the time reference to prevent random jittering if you don't like it.\n  vec2 random = Hash22(uv);\n\n  // Do the blur here...\n  float acc = 0.;\n  for (int i = 0; i < ITERATIONS; i++) {\n    acc += unpackRGBA(texture2D(tex, uv+ circle * Sample(random), radius*1.0));\n  }\n  return acc / float(ITERATIONS);\n}\n\nvec3 mainColor = vec3(1.);\nvec3 lineColor = vec3(.7);\nvec4 gridControl = vec4(.1, 10., .5, .99);\nvec3 gridOffset = vec3(0., 0., 0.);\nfloat getVisibility(float position) {\n  float majorGridFrequency=gridControl.y;\n  if (floor(position+0.5) == floor(position/majorGridFrequency+0.5)*majorGridFrequency)\n  {\n    return 1.0;\n  }\n  return gridControl.z;\n}\nfloat getAnisotropicAttenuation(float differentialLength) {\n  const float maxNumberOfLines=4.0;\n  return clamp(1.0/(differentialLength+1.0)-1.0/maxNumberOfLines, 0.0, 1.0);\n}\nfloat isPointOnLine(float position, float differentialLength) {\n  float fractionPartOfPosition = position-floor(position+0.5);\n  fractionPartOfPosition/=differentialLength;\n  fractionPartOfPosition=clamp(fractionPartOfPosition, -1., 1.);\n  float result=0.5+0.5*cos(fractionPartOfPosition*PI);\n  return result;\n}\nfloat contributionOnAxis(float position) {\n  float differentialLength=length(vec2(dFdx(position), dFdy(position)));\n  differentialLength*=SQRT2;\n  float result=isPointOnLine(position, differentialLength);\n  float visibility=getVisibility(position);\n  result*=visibility;\n  float anisotropicAttenuation=getAnisotropicAttenuation(differentialLength);\n  result*=anisotropicAttenuation;\n  return result;\n}\nfloat normalImpactOnAxis(float x) {\n  float normalImpact=clamp(1.0-3.0*abs(x*x*x), 0.0, 1.0);\n  return normalImpact;\n}\n\nvoid main(void) {\n\n  float amountInLight =1.-fBlur(shadowMap, vShadowCoord.xy, .01);\n\n  float gridRatio=gridControl.x;\n  vec3 gridPos=(vPosition+gridOffset.xyz)/gridRatio;\n  float x=contributionOnAxis(gridPos.x);\n  float y=contributionOnAxis(gridPos.y);\n  float z=contributionOnAxis(gridPos.z);\n  vec3 normal=normalize(vNormal);\n  float grid=clamp(x+y+z, 0., 1.);\n\n  vec3 color=mix(mainColor, lineColor, grid);\n  float opacity = clamp(grid, 0.2, gridControl.w*grid)*.5;\n  float fogDistance = length(vPosition);\n  float fogAmount = smoothstep(stageSize/2.*1., stageSize/2.*.5, fogDistance);\n\n  gl_FragColor =vec4(color.rgb, fogAmount*opacity)\n    + vec4(vec3(-.25*amountInLight), 1.);\n\n}\n\n";

  // src/lib/views/boxesViewSimple/stage/stage.vert
  var stage_default2 = "precision highp float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec2 uv;\n//\nuniform vec3 uOffset;\nuniform mat4 projection;\nuniform mat4 view;\n\nuniform mat4 shadowProjectionMatrix;\nuniform mat4 shadowViewMatrix;\nuniform vec3 shadowDirection;\nvarying vec2 vUv;\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vShadowCoord;\nconst mat4 texUnitConverter = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.5, 0.5, 0.5, 1.0);\n\nvoid main () {\n  vUv = 0. * uv ;\n\n  vec4 worldPosition = vec4(position + uOffset, 1.0);\n  vPosition = worldPosition.xyz;\n  vShadowCoord = (texUnitConverter * shadowProjectionMatrix * shadowViewMatrix * worldPosition).xyz;\n\n  gl_Position = projection * view * vec4(vPosition, 1.);\n}\n";

  // src/lib/views/boxesViewSimple/stage/plane.ts
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
        uvs.push([u, 1 - v]);
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
      positions,
      normals,
      uvs,
      cells
    };
  }

  // src/lib/views/boxesViewSimple/stage/drawStageCommands.ts
  function drawStageCommands_default(regl, view, shadow) {
    const stage = createPlane(view.stageGrid.size, view.stageGrid.size);
    const command = (mode) => {
      return regl({
        blend: {
          enable: true,
          func: {
            srcRGB: "src alpha",
            srcAlpha: 1,
            dstRGB: "one minus src alpha",
            dstAlpha: 1
          },
          equation: {
            rgb: "add",
            alpha: "add"
          },
          color: [0, 0, 0, 1]
        },
        cull: {
          enable: true,
          face: "front"
        },
        depth: true,
        primitive: "triangles",
        elements: stage.cells,
        attributes: {
          position: stage.positions,
          uv: stage.uvs
        },
        uniforms: {
          ...shadow.uniforms,
          stageSize: view.stageGrid.size,
          uOffset: [0, view.stageGrid.y, 0],
          ...mode === "lighting" && { shadowMap: shadow.fbo }
        },
        vert: [`#define ${mode} 1`, stage_default2].join("\n"),
        frag: [`#define ${mode} 1`, stage_default].join("\n")
      });
    };
    return {
      lighting: command("lighting")
    };
  }

  // src/lib/views/boxesViewSimple/lattice/drawLatticeCommands.ts
  var import_primitive_cube2 = __toModule(require_primitive_cube());

  // src/lib/views/boxesViewSimple/lattice/lattice.vert
  var lattice_default = "precision mediump float;\n#define GLSLIFY 1\nattribute vec3 aPosition;\nattribute vec3 aColor;\nattribute vec3 aNormal;\nattribute vec2 aUV;\nvarying vec2 vUv;\nattribute vec3 aTranslation;\nattribute vec3 aScale;\nattribute float aPhi;\nattribute float aTheta;\nuniform mat4 projection, view;\n// These three are instanced attributes.\nvarying vec4 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec3 vColor;\nvarying vec3 vScale;\n\nfloat inverse(float m) {\n  return 1.0 / m;\n}\n\nmat2 inverse(mat2 m) {\n  return mat2(m[1][1],-m[0][1],\n             -m[1][0], m[0][0]) / (m[0][0]*m[1][1] - m[0][1]*m[1][0]);\n}\n\nmat3 inverse(mat3 m) {\n  float a00 = m[0][0], a01 = m[0][1], a02 = m[0][2];\n  float a10 = m[1][0], a11 = m[1][1], a12 = m[1][2];\n  float a20 = m[2][0], a21 = m[2][1], a22 = m[2][2];\n\n  float b01 = a22 * a11 - a12 * a21;\n  float b11 = -a22 * a10 + a12 * a20;\n  float b21 = a21 * a10 - a11 * a20;\n\n  float det = a00 * b01 + a01 * b11 + a02 * b21;\n\n  return mat3(b01, (-a22 * a01 + a02 * a21), (a12 * a01 - a02 * a11),\n              b11, (a22 * a00 - a02 * a20), (-a12 * a00 + a02 * a10),\n              b21, (-a21 * a00 + a01 * a20), (a11 * a00 - a01 * a10)) / det;\n}\n\nmat4 inverse(mat4 m) {\n  float\n      a00 = m[0][0], a01 = m[0][1], a02 = m[0][2], a03 = m[0][3],\n      a10 = m[1][0], a11 = m[1][1], a12 = m[1][2], a13 = m[1][3],\n      a20 = m[2][0], a21 = m[2][1], a22 = m[2][2], a23 = m[2][3],\n      a30 = m[3][0], a31 = m[3][1], a32 = m[3][2], a33 = m[3][3],\n\n      b00 = a00 * a11 - a01 * a10,\n      b01 = a00 * a12 - a02 * a10,\n      b02 = a00 * a13 - a03 * a10,\n      b03 = a01 * a12 - a02 * a11,\n      b04 = a01 * a13 - a03 * a11,\n      b05 = a02 * a13 - a03 * a12,\n      b06 = a20 * a31 - a21 * a30,\n      b07 = a20 * a32 - a22 * a30,\n      b08 = a20 * a33 - a23 * a30,\n      b09 = a21 * a32 - a22 * a31,\n      b10 = a21 * a33 - a23 * a31,\n      b11 = a22 * a33 - a23 * a32,\n\n      det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;\n\n  return mat4(\n      a11 * b11 - a12 * b10 + a13 * b09,\n      a02 * b10 - a01 * b11 - a03 * b09,\n      a31 * b05 - a32 * b04 + a33 * b03,\n      a22 * b04 - a21 * b05 - a23 * b03,\n      a12 * b08 - a10 * b11 - a13 * b07,\n      a00 * b11 - a02 * b08 + a03 * b07,\n      a32 * b02 - a30 * b05 - a33 * b01,\n      a20 * b05 - a22 * b02 + a23 * b01,\n      a10 * b10 - a11 * b08 + a13 * b06,\n      a01 * b08 - a00 * b10 - a03 * b06,\n      a30 * b04 - a31 * b02 + a33 * b00,\n      a21 * b02 - a20 * b04 - a23 * b00,\n      a11 * b07 - a10 * b09 - a12 * b06,\n      a00 * b09 - a01 * b07 + a02 * b06,\n      a31 * b01 - a30 * b03 - a32 * b00,\n      a20 * b03 - a21 * b01 + a22 * b00) / det;\n}\n\nfloat transpose(float m) {\n  return m;\n}\n\nmat2 transpose(mat2 m) {\n  return mat2(m[0][0], m[1][0],\n              m[0][1], m[1][1]);\n}\n\nmat3 transpose(mat3 m) {\n  return mat3(m[0][0], m[1][0], m[2][0],\n              m[0][1], m[1][1], m[2][1],\n              m[0][2], m[1][2], m[2][2]);\n}\n\nmat4 transpose(mat4 m) {\n  return mat4(m[0][0], m[1][0], m[2][0], m[3][0],\n              m[0][1], m[1][1], m[2][1], m[3][1],\n              m[0][2], m[1][2], m[2][2], m[3][2],\n              m[0][3], m[1][3], m[2][3], m[3][3]);\n}\n\nmat4 fromYRotation (float phi) {\n  float s = sin(phi);\n  float c = cos(phi);\n  return mat4(\n  c,   0.,  -s,   0.,\n  0.,  1.,   0.,   0.,\n  s,   0.,   c,   0.,\n  0.,  0.,   0.,   1.);\n}\nmat4 fromZRotation (float theta) {\n  float s = sin(theta);\n  float c = cos(theta);\n  return mat4(\n  c,   -s,  0.,   0.,\n  s,   c,   0.,   0.,\n  0.,  0.,   1.,   0.,\n  0.,  0.,   0.,   1.);\n}\nvoid main () {\n\n  vUv = aUV;\n  vScale = aScale;\n\n// Translate\nmat4 tPos = mat4(vec4(1.0,0.0,0.0,0.0),\nvec4(0.0,1.0,0.0,0.0),\nvec4(0.0,0.0,1.0,0.0),\nvec4(aTranslation,1.0));\n\n//// Rotate\n//mat4 rXPos = mat4(vec4(1.0,0.0,0.0,0.0),\n//vec4(0.0,cos(rotationX),-sin(rotationX),0.0),\n//vec4(0.0,sin(rotationX),cos(rotationX),0.0),\n//vec4(0.0,0.0,0.0,1.0));\n\nmat4 rYPos = mat4(vec4(cos(aPhi),0.,-sin(aPhi),0.0),\nvec4(0.0,1.0,0.0,0.0),\nvec4(sin(aPhi),0.0,cos(aPhi),0.0),\nvec4(0.0,0.0,0.0,1.0));\n\nmat4 rZPos = mat4(vec4(cos(aTheta),-sin(aTheta),0.0,0.0),\nvec4(sin(aTheta),cos(aTheta),0.0,0.0),\nvec4(0.0,0.0,1.0,0.0),\nvec4(0.0,0.0,0.0,1.0));\n\n// Scale\nmat4 sScale = mat4(vec4(aScale.x,0.0,0.0,0.0),\nvec4(0.0,aScale.y,0.0,0.0),\nvec4(0.0,0.0,aScale.z,0.0),\nvec4(0.0,0.0,0.0,1.0));\n\n  mat4 aModel = tPos *  rYPos * rZPos  * sScale;\n  vPosition =  aModel * vec4(aPosition,1.0);\n  vColor = aColor;\n\n#ifdef lighting\n\n  vNormalOrig = aNormal;\n  vNormal = normalize((transpose(inverse(aModel)) * vec4(aNormal, 0.)).xyz);\n  gl_Position = projection * view  * vPosition;\n\n#endif// lighting\n\n#ifdef shadow\n\n//  gl_Position =vec4(vShadowCoord, 1.0);\n\n#endif// shadow\n}\n";

  // src/lib/views/boxesViewSimple/lattice/lattice.frag
  var lattice_default2 = "precision mediump float;\n#define GLSLIFY 1\nvarying vec4 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vNormalOrig;\nvarying vec3 vColor;\nvarying vec2 vUv;\nuniform float ambientLightAmount;\nuniform float diffuseLightAmount;\nuniform vec3 shadowDirection;\nuniform float pathicleWidth;\nuniform vec3 eye;\nvarying vec3 vScale;\n\nfloat edger(vec2 uv, vec3 boxScale, float edgeWidth, vec3 normal) {\n\n  float edgeXY =  smoothstep(0., edgeWidth, uv.x*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.z);\n  float edgeXZ =  smoothstep(0., edgeWidth, uv.y*boxScale.y) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.y);\n  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);\n\n  float edgeYX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);\n  float edgeYZ =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);\n  float edgeY = (1.-(edgeYX*edgeYZ))*abs(normal.y);\n\n  float edgeZX =  smoothstep(0., edgeWidth, uv.x*boxScale.x) * smoothstep(0., edgeWidth, (1.-uv.x)*boxScale.x);\n  float edgeZY =  smoothstep(0., edgeWidth, uv.y*boxScale.z) * smoothstep(0., edgeWidth, (1.-uv.y)*boxScale.z);\n  float edgeZ = (1.-(edgeZX*edgeZY))*abs(normal.z);\n\n  return clamp(edgeX+edgeY, 0., 1.);\n}\n\n//\n//float edgerFeathered(vec2 uv, vec3 boxScale, float edgeWidth) {\n//\n//  float feather = .1;\n//\n//  float edgeXY =  smoothstep(edgeWidth, edgeWidth+feather, uv.x*boxScale.z) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.x)*boxScale.z);\n//  float edgeXZ =  smoothstep(edgeWidth, edgeWidth+feather, uv.y*boxScale.y) * smoothstep(edgeWidth, edgeWidth+feather, (1.-uv.y)*boxScale.y);\n//  float edgeX = (1.-(edgeXY*edgeXZ))*abs(normal.x);\n//\n//  return clamp(edgeX, 0., 1.);\n//}\n//\n//\n//float edgerHard(vec2 uv, vec3 boxScale, float edgeWidth) {\n//  float edgeXY =  step(edgeWidth*(1.+uv.x*boxScale.z), uv.x*boxScale.z) * step(edgeWidth, (1.-uv.x)*boxScale.z);\n//  float edgeXZ =  step(edgeWidth*(0.5+uv.x/2.), uv.y*boxScale.y) * step(edgeWidth*(0.5+uv.x/2.), (1.-uv.y)*boxScale.y);\n//  float edgeX = (1.-(edgeXZ))*abs(normal.x);\n//\n//  return clamp(edgeX, 0., 1.);\n//}\n\nfloat diffuse(vec3 lightDir, vec3 nrm)\n{\n  float diffAmt = max(0.0, dot(nrm, lightDir));\n  return diffAmt;\n}\nfloat specular(vec3 lightDir, vec3 viewDir, vec3 nrm, float shininess)\n{\n  vec3 halfVec = normalize(viewDir + lightDir);\n  float specAmt = max(0.0, dot(halfVec, nrm));\n  return pow(specAmt, shininess);\n}\n\nstruct DirectionalLight\n{\n  vec3 direction;\n  vec3 color;\n  float intensity;\n};\n#define NUM_DIR_LIGHTS 3\nDirectionalLight directionalLights[NUM_DIR_LIGHTS];\n\nvoid main () {\n\n  #ifdef lighting\n\n  if (vColor.r == vColor.g && vColor.r == vColor.b ) discard;\n  vec3 color = vColor;\n  gl_FragColor = vec4(vColor, 1.);\n\n  vec3 viewDir = normalize(eye - vPosition.xyz);\n  vec3 normal = normalize(vNormal);\n\n  directionalLights[0] = DirectionalLight(shadowDirection, vec3(1.), .5);\n  directionalLights[1] = DirectionalLight(shadowDirection+vec3(-1., 0., 1.), vec3(1.), .1);\n  directionalLights[2] = DirectionalLight(shadowDirection+vec3(1., 0., -1.), vec3(1.), .1);\n  vec3 edgedColor = vColor;\n  vec3 finalColor = ambientLightAmount * vColor;\n\n  for (int i = 0; i < NUM_DIR_LIGHTS; ++i)\n  {\n    DirectionalLight light = directionalLights[i];\n    vec3 sceneLight = mix(light.color, edgedColor.rgb + light.color * 0.5, 0.5);\n    float diffAmt = diffuse(light.direction, normal) * light.intensity;\n    float specAmt = specular(light.direction, viewDir, normal, 0.0) * light.intensity;\n\n    float shadow = 1.; //.9 * vColorCorrection;//clamp(vColorCorrection + abs(2.+v_position.y*5.), 0., 1.);\n    float specMask = .5*edger(vUv, vScale, 1. * .02, vNormalOrig);\n//    float specMask = edger(vUv, vScale, 1. * .1, vNormalOrig) * smoothstep(5., 2., length(vPosition-eye));\n    vec3 specCol = specMask * sceneLight * specAmt;\n    finalColor += shadow * vColor * diffAmt * light.color;\n    finalColor += shadow * specCol * sceneLight;\n  }\n\n  gl_FragColor =vec4(finalColor, 1.);\n  #endif\n\n}\n";

  // src/lib/views/boxesViewSimple/lattice/drawLatticeCommands.ts
  function estaGeometry() {
    const estaStart = (0, import_primitive_cube2.default)(1, 1, 0.05);
    estaStart.positions = estaStart.positions.map(([x, y, z]) => [x, y, z - 1]);
    const estaEnd = (0, import_primitive_cube2.default)(1, 1, 0.05);
    return mergeMeshes([estaStart, estaEnd]);
  }
  function dipoleGeometry() {
    const geometryDipoleTop = (0, import_primitive_cube2.default)(1, 0.25, 1);
    geometryDipoleTop.positions = geometryDipoleTop.positions.map(([x, y, z]) => [
      x,
      y + 0.4,
      z
    ]);
    const geometryDipoleBottom = (0, import_primitive_cube2.default)(1, 0.25, 1);
    geometryDipoleBottom.positions = geometryDipoleBottom.positions.map(([x, y, z]) => [x, y - 0.4, z]);
    return mergeMeshes([geometryDipoleTop, geometryDipoleBottom]);
  }
  function quadrupoleGeometry() {
    const geometryDipoleTop = (0, import_primitive_cube2.default)(0.75, 0.1, 1);
    geometryDipoleTop.positions = geometryDipoleTop.positions.map(([x, y, z]) => [
      x,
      y + 0.5,
      z
    ]);
    const geometryDipoleLeft = (0, import_primitive_cube2.default)(0.1, 0.75, 1);
    geometryDipoleLeft.positions = geometryDipoleLeft.positions.map(([x, y, z]) => [x - 0.5, y, z]);
    const geometryDipoleRight = (0, import_primitive_cube2.default)(0.1, 0.75, 1);
    geometryDipoleRight.positions = geometryDipoleRight.positions.map(([x, y, z]) => [x + 0.5, y, z]);
    const geometryDipoleBottom = (0, import_primitive_cube2.default)(0.75, 0.1, 1);
    geometryDipoleBottom.positions = geometryDipoleBottom.positions.map(([x, y, z]) => [x, y - 0.5, z]);
    return mergeMeshes([
      geometryDipoleTop,
      geometryDipoleBottom,
      geometryDipoleRight,
      geometryDipoleLeft
    ]);
  }
  function drawLatticeCommands_default(regl, { model }, shadow) {
    const command = (type, mode) => {
      const geometry = type === LATTICE_ELEMENT_TYPES.ESTA ? estaGeometry() : type === LATTICE_ELEMENT_TYPES.QUAD ? quadrupoleGeometry() : dipoleGeometry();
      const blElements = model.lattice.beamline.filter((d) => d.type === type);
      const transformations = model.lattice.transformations.filter((d) => d.type === type);
      return regl({
        depth: {
          enable: true
        },
        blend: {
          enable: false,
          func: {
            srcRGB: "src alpha",
            srcAlpha: 1,
            dstRGB: "one minus src alpha",
            dstAlpha: 1
          },
          equation: {
            rgb: "add",
            alpha: "add"
          },
          color: [0, 0, 0, 1]
        },
        cull: {
          enable: true,
          face: "back"
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
        vert: [`#define ${mode} 1`, lattice_default].join("\n"),
        frag: [`#define ${mode} 1`, lattice_default2].join("\n"),
        uniforms: {
          ...shadow.uniforms
        }
      });
    };
    return {
      quadLighting: command(LATTICE_ELEMENT_TYPES.QUAD, "lighting"),
      quadShadow: command(LATTICE_ELEMENT_TYPES.QUAD, "shadow"),
      sbenLighting: command(LATTICE_ELEMENT_TYPES.SBEN, "lighting"),
      sbenShadow: command(LATTICE_ELEMENT_TYPES.SBEN, "shadow"),
      estaLighting: command(LATTICE_ELEMENT_TYPES.ESTA, "lighting"),
      estaShadow: command(LATTICE_ELEMENT_TYPES.ESTA, "shadow")
    };
  }

  // src/lib/views/boxesViewSimple/shadow/Shadow.ts
  var import_gl_mat43 = __toModule(require_gl_mat4());
  var import_gl_vec3 = __toModule(require_gl_vec3());
  var SHADOW_MAP_SIZE = 1024;
  var Shadow = class {
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
      (0, import_gl_vec3.normalize)(this.shadowDirection, position);
      this.shadowViewMatrix = (0, import_gl_mat43.lookAt)([], position, [0, 0, 0], [0, 0, 1]);
      this.size = size;
      this.near = near;
      this.far = far;
      this.shadowProjectionMatrix = (0, import_gl_mat43.ortho)([], -size, size, -size, size, this.near, this.far);
    }
    get uniforms() {
      return {
        shadowProjectionMatrix: () => this.shadowProjectionMatrix,
        shadowViewMatrix: () => this.shadowViewMatrix,
        shadowDirection: () => this.shadowDirection,
        minBias: () => 1e-3,
        maxBias: () => 0.3
      };
    }
  };

  // src/lib/views/boxesViewSimple/axes.ts
  var mat4 = __toModule(require_gl_mat4());
  var import_gl_quat = __toModule(require_gl_quat());
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
        axis: regl.prop("axis"),
        model: function(context, props) {
          mat4.identity(model);
          const angle = 0;
          mat4.rotate(model, model, angle, props.axis);
          const tmpm = new Float32Array(16);
          const q = [0, 0, 0, 0];
          (0, import_gl_quat.rotationTo)(q, [0, 1, 0], props.axis);
          mat4.fromQuat(tmpm, q);
          mat4.multiply(model, model, tmpm);
          return model;
        }
      },
      attributes: {
        position: [
          [0, 0, 0],
          [0, d - 0.1, 0],
          [0.05, d - 0.2, 0],
          [0, d, 0],
          [-0.05, d - 0.2, 0],
          [0, d - 0.1, 0]
        ],
        axis: regl.prop("axis")
      },
      depth: {
        enable: false
      },
      count: 6,
      primitive: "line strip"
    });
  }

  // src/lib/views/boxesViewSimple/vignette/vignette.frag
  var vignette_default = "precision highp float;\n#define GLSLIFY 1\n\n// Based on distance functions found at:\n// http://iquilezles.org/www/articles/distfunctions/distfunctions.htm\nfloat sdSquare(vec2 point, float width) {\n  vec2 d = abs(point) - width;\n  return min(max(d.x,d.y),0.0) + length(max(d,0.0));\n}\n\nfloat vignette(vec2 uv, vec2 size, float roundness, float smoothness) {\n  // Center UVs\n  uv -= 0.5;\n\n  // Shift UVs based on the larger of width or height\n  float minWidth = min(size.x, size.y);\n  uv.x = sign(uv.x) * clamp(abs(uv.x) - abs(minWidth - size.x), 0.0, 1.0);\n  uv.y = sign(uv.y) * clamp(abs(uv.y) - abs(minWidth - size.y), 0.0, 1.0);\n\n  // Signed distance calculation\n  float boxSize = minWidth * (1.0 - roundness);\n  float dist = sdSquare(uv, boxSize) - (minWidth * roundness);\n\n  return 1. - smoothstep(0.0, smoothness, dist);\n}\n\nuniform vec2 screenSize;\nuniform vec2 size;\nuniform float roundness;\nuniform float smoothness;\n\nvoid main() {\n  vec2 uv = gl_FragCoord.xy / screenSize;\n  float v = vignette(uv, size, roundness, smoothness);\n  gl_FragColor = vec4(vec3(v), 1.-2.*v);\n}\n";

  // src/lib/views/boxesViewSimple/vignette/drawVignetteCommandBuilder.ts
  function drawVignetteCommandBuilder_default(regl) {
    const command = () => {
      return regl({
        blend: {
          enable: true,
          func: {
            srcRGB: "src alpha",
            srcAlpha: 1,
            dstRGB: "one minus src alpha",
            dstAlpha: 1
          },
          equation: {
            rgb: "add",
            alpha: "add"
          },
          color: [0, 0, 0, 1]
        },
        frag: vignette_default,
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
      });
    };
    return {
      lighting: command()
    };
  }

  // src/lib/views/boxesViewSimple/index.ts
  var BoxesViewSimple = class {
    constructor(regl, { runner, variables, model, view, debug }) {
      this.regl = regl;
      this.performanceLogger = new PerformanceLogger(debug.logPerformance);
      this.performanceLogger.start("BoxesViewSimple()");
      this.lightPosition = view.lights[0].position;
      this.config = view;
      this.shadow = new Shadow(regl, this.config.lights[0]);
      this.setParams = regl({
        uniforms: {
          stageGrid_size: this.config.stageGrid.size / 2,
          viewRange: regl.prop("viewRange") || [0, 1],
          ambientLightAmount: this.config.ambientLightAmount,
          diffuseLightAmount: this.config.diffuseLightAmount
        }
      });
      this.drawModel = drawModelCommands_default(regl, {
        runner,
        variables,
        view
      }, this.shadow);
      this.drawStage = drawStageCommands_default(regl, view, this.shadow);
      this.drawLattice = drawLatticeCommands_default(regl, {
        runner,
        model,
        view
      }, this.shadow);
      this.drawFields = drawFieldsCommands_default(regl, { model, view }, this.shadow);
      this.drawAxis = drawAxesCommand(regl, 0.5);
      this.drawVignette = drawVignetteCommandBuilder_default(regl);
    }
    drawDiffuse(props) {
      this.performanceLogger.start(`BoxesViewSimple.drawDiffuse (t=${props.tick})`);
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
        this.config.showAxes && this.drawAxis([
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
      this.performanceLogger.stop("BoxesViewSimple.drawDiffuse");
    }
    destroy() {
    }
  };

  // src/lib/utils/checkSupport.ts
  function getcolorType(glContext) {
    if (glContext.getExtension("WEBGL_color_buffer_float") && glContext.getExtension("OES_texture_float")) {
      return "float";
    }
    if (glContext.getExtension("WEBGL_color_buffer_float") && glContext.getExtension("OES_texture_half_float")) {
      return "half float";
    }
    return "uint8";
  }
  function checkSupport(regl) {
    const support = {};
    try {
      const canvas = document.createElement("canvas");
      if (!!window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))) {
        const glContext = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        support.canRenderToFloatTexture = regl.hasExtension("WEBGL_color_buffer_float");
        support.colorType = getcolorType(glContext);
        support.precision = {
          VERTEX_SHADER: {
            LOW_FLOAT: glContext.getShaderPrecisionFormat(glContext.VERTEX_SHADER, glContext.LOW_FLOAT),
            MEDIUM_FLOAT: glContext.getShaderPrecisionFormat(glContext.VERTEX_SHADER, glContext.MEDIUM_FLOAT),
            HIGH_FLOAT: glContext.getShaderPrecisionFormat(glContext.VERTEX_SHADER, glContext.HIGH_FLOAT),
            LOW_INT: glContext.getShaderPrecisionFormat(glContext.VERTEX_SHADER, glContext.LOW_INT),
            MEDIUM_INT: glContext.getShaderPrecisionFormat(glContext.VERTEX_SHADER, glContext.MEDIUM_INT),
            HIGH_INT: glContext.getShaderPrecisionFormat(glContext.VERTEX_SHADER, glContext.HIGH_INT)
          },
          FRAGMENT_SHADER: {
            LOW_FLOAT: glContext.getShaderPrecisionFormat(glContext.FRAGMENT_SHADER, glContext.LOW_FLOAT),
            MEDIUM_FLOAT: glContext.getShaderPrecisionFormat(glContext.FRAGMENT_SHADER, glContext.MEDIUM_FLOAT),
            HIGH_FLOAT: glContext.getShaderPrecisionFormat(glContext.FRAGMENT_SHADER, glContext.HIGH_FLOAT),
            LOW_INT: glContext.getShaderPrecisionFormat(glContext.FRAGMENT_SHADER, glContext.LOW_INT),
            MEDIUM_INT: glContext.getShaderPrecisionFormat(glContext.FRAGMENT_SHADER, glContext.MEDIUM_INT),
            HIGH_INT: glContext.getShaderPrecisionFormat(glContext.FRAGMENT_SHADER, glContext.HIGH_INT)
          }
        };
        return support;
      }
    } catch (e) {
      throw e;
    }
  }

  // src/lib/simulation/simulator.ts
  var import_regl = __toModule(require_regl());

  // src/lib/webgl-utils/drawTextureCommand.frag
  var drawTextureCommand_default = "precision highp float;\n#define GLSLIFY 1\nuniform sampler2D texture;\nuniform float decode;\nvarying vec2 uv;\nfloat unpackRGBA (vec4 v) {\n  return dot(v, 1.0 / vec4(1.0, 255.0, 65025.0, 16581375.0));\n}\nvoid main () {\n  vec4 texel = texture2D(texture, uv);\n  gl_FragColor = (decode == 0.) ? texel :\n    (decode == 1.) ?  vec4(unpackRGBA(texel),0.,0.,1.)\n    : vec4(texel.r,texel.r,texel.r,1.);\n}\n\n";

  // src/lib/webgl-utils/drawTextureCommand.vert
  var drawTextureCommand_default2 = "precision mediump float;\n#define GLSLIFY 1\nattribute vec2 position;\nvarying vec2 uv;\nvoid main () {\n  uv = position;\n  gl_Position = vec4(1.0 - 2.0 * position, 0, 1);\n}\n";

  // src/lib/webgl-utils/drawTextureCommand.ts
  var NONE = 0;
  var UNPACK_RGBA = 1;
  var R2 = 2;
  var DECODE = {
    NONE,
    UNPACK_RGBA,
    R: R2
  };
  function drawTextureCommand(regl) {
    return regl({
      vert: drawTextureCommand_default2,
      frag: drawTextureCommand_default,
      attributes: {
        position: [-4, -4, 4, -4, 0, 4]
      },
      uniforms: {
        texture: (_, { texture }) => {
          return texture;
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
    });
  }

  // src/lib/simulation/simulator.ts
  var ReglSimulatorInstance = class {
    constructor({ canvas, configuration }) {
      this.configuration = configuration;
      this.isDirty = true;
      window.performanceLogger = null;
      this.performanceLogger = new PerformanceLogger();
      this.regl = (0, import_regl.default)({
        canvas,
        profile: this.configuration.debug.profile,
        attributes: {
          preserveDrawingBuffer: true,
          antialiasing: true
        },
        extensions: [
          "angle_instanced_arrays",
          "oes_texture_float",
          "OES_standard_derivatives",
          "OES_texture_half_float",
          "WEBGL_depth_texture",
          "EXT_color_buffer_half_float"
        ],
        optionalExtensions: [
          "EXT_disjoint_timer_query",
          "WEBGL_color_buffer_float"
        ],
        onDone: (err, regl) => {
          if (err)
            return console.error(err);
          try {
            window.pathicles = this;
            this.regl = regl;
            this.support = checkSupport(regl);
            this.performanceLogger.start("init");
            this.loadConfig(this.configuration);
          } catch (e) {
            console.error(e);
          }
        }
      });
    }
    resize() {
      this.regl.poll();
      this.camera.resize(this.regl._gl.canvas.clientWidth / this.regl._gl.canvas.clientHeight);
      this.isDirty = true;
    }
    destroy() {
      this.regl.destroy();
    }
    loadConfig(config2) {
      this.stop(this.regl);
      this.configuration = config2;
      console.log({ support: this.support });
      if (!this.support.canRenderToFloatTexture) {
        console.warn("canRenderToFloatTexture = false");
        this.configuration.runner.pusher = "js";
      }
      this.init(this.regl);
      this.run(this.regl);
      this.isDirty = true;
    }
    toggleShowTextures() {
      this.configuration.debug.showTextures = !this.configuration.debug.showTextures;
      this.isDirty = true;
    }
    init(regl) {
      this.camera = freeCameraFactory_default(regl, {
        ...this.configuration.view.camera,
        aspectRatio: regl._gl.canvas.clientWidth / regl._gl.canvas.clientHeight
      });
      this.drawTexture = drawTextureCommand(regl);
      this.simulation = new Simulation(regl, this.configuration, this.support);
      this.runner = new SimulationRunner(this.simulation, this.configuration.runner, this.configuration.debug);
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
          this.camera.setCameraUniforms({
            ...this.camera
          }, () => {
            this.view.drawDiffuse({
              tick,
              colorCorrections: this.simulation.variables.colorCorrections,
              particleColorsAndTypes: this.simulation.variables.particleColorsAndTypes,
              position: this.simulation.variables.position.value()
            });
            if (this.configuration.debug.showTextures) {
              this.drawTexture({
                decode: this.configuration.runner.packFloat2UInt8 ? DECODE.UNPACK_RGBA : DECODE.R,
                y0: viewportHeight - this.simulation.variables.velocity.height * this.configuration.debug.showTextureScale,
                texture: this.simulation.variables.position.value(),
                scale: 1 * this.configuration.debug.showTextureScale
              });
              this.drawTexture({
                decode: this.configuration.runner.packFloat2UInt8 ? DECODE.UNPACK_RGBA : DECODE.R,
                texture: this.simulation.variables.velocity.value(),
                y0: viewportHeight - 50 - 2 * this.simulation.variables.velocity.height * this.configuration.debug.showTextureScale,
                scale: this.configuration.debug.showTextureScale
              });
            }
          });
        }
        this.performanceLogger.stop();
        this.isDirty = false;
      });
    }
    stop() {
      if (this.loop)
        this.loop.cancel();
    }
  };

  // src/lib/story/sequencer.ts
  var import_b_spline = __toModule(require_b_spline());
  function sequencer_default(regl, scenes, stateVars, onStateChange) {
    let t = 0;
    scenes.forEach((scene, s) => {
      scene.loaded = false;
      const numberType = "float";
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
            variableTexture(regl, {
              width: scene.runner.snapshotCount * 4,
              height: scene.model.emitter.particleCount
            }, numberType, new Float32Array(data.position.map((p) => [p, 0, 0, 0]).flat()))
          ]
        };
        scene.variables.particleColorsAndTypes = regl.texture({
          data: data.particleTypes.map((p) => PARTICLE_TYPES[p].color.concat(p)).flat(),
          shape: [particleCount, 1, 4]
        });
        scene.variables.colorCorrections = regl.texture({
          data: data.colorCorrections.map((c2) => [c2, 0, 0, 0]).flat(),
          shape: [particleCount, 1, 4],
          type: "float"
        });
        scene.model = {
          lattice: new Lattice(scene.model.lattice),
          boundingBoxSize: configuration.model.boundingBoxSize,
          interactions: {
            particleInteraction: configuration.model.interactions.particleInteraction,
            electricField: configuration.model.interactions.electricField,
            magneticField: configuration.model.interactions.magneticField
          }
        };
        scene.cameraBSplines = {
          distance: (x) => (0, import_b_spline.default)(x, 2, scene.cameraSploints.distance),
          phi: (x) => (0, import_b_spline.default)(x, 2, scene.cameraSploints.phi),
          theta: (x) => (0, import_b_spline.default)(x, 2, scene.cameraSploints.theta),
          centerX: (x) => (0, import_b_spline.default)(x, 2, scene.cameraSploints.centerX),
          centerY: (x) => (0, import_b_spline.default)(x, 2, scene.cameraSploints.centerY),
          centerZ: (x) => (0, import_b_spline.default)(x, 2, scene.cameraSploints.centerZ)
        };
        scene.loaded = true;
      });
    });
    const state = {
      sceneIdx: 0,
      scene: scenes[0]
    };
    const changed = {};
    function computeState(t2) {
      if (t2 > 1)
        t2 = 1;
      const sceneIdx = (scenes.find((scene) => scene._t0_normalized <= t2 && t2 <= scene._t1_normalized) || { _s: 0 })._s;
      if (sceneIdx !== state.sceneIdx && sceneIdx >= 0 && sceneIdx < scenes.length) {
        changed.sceneIdx = { from: state.sceneIdx, to: sceneIdx };
        state.sceneIdx = sceneIdx;
        state.scene = scenes[sceneIdx];
      } else {
        delete changed.sceneIdx;
      }
      state.sceneProgress = (t2 - state.scene._t0_normalized) * scenes.duration / state.scene.duration;
      state.viewRange = [state.sceneProgress - 0.5, state.sceneProgress];
      return Object.keys(changed).length > 0;
    }
    let currentPosition = 0;
    computeState(currentPosition);
    const self = {
      setPosition: function(t2) {
        currentPosition = t2;
        const hasChanges = computeState(t2);
        if (hasChanges) {
          onStateChange && onStateChange(state, changed);
        }
        return self;
      },
      getPosition: function() {
        return currentPosition;
      },
      getState: function() {
        return state;
      }
    };
    return self;
  }

  // src/lib/story/story.ts
  var import_regl_min = __toModule(require_regl_min());
  var ReglViewerInstance = class {
    constructor({ canvas, pixelRatio, control }) {
      this.config = default_default;
      this.control = control;
      this.regl = (0, import_regl_min.default)({
        canvas,
        attributes: {
          preserveDrawingBuffer: true,
          antialiasing: true
        },
        pixelRatio,
        extensions: [
          "angle_instanced_arrays",
          "oes_texture_float",
          "OES_standard_derivatives",
          "OES_texture_half_float",
          "EXT_color_buffer_half_float"
        ],
        onDone: (err, regl) => {
          if (err)
            return console.error(err);
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
      this.camera = freeCameraFactory_default(this.regl, {
        ...this.config.view.camera,
        aspectRatio: this.regl._gl.canvas.clientWidth / this.regl._gl.canvas.clientHeight
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
      this.story = sequencer_default(this.regl, this.control.scenes, {
        sceneId: 0,
        viewRange: [0, 0]
      }, () => {
      });
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
          const autoLoop = storyState.scene.pathicles && storyState.scene.pathicles.autoLoop;
          if (autoLoop) {
            if (tick % 127 === 0) {
              this.modelTranslateX = boundedRandom2() * 0.1;
              this.modelTranslateY = boundedRandom2() * 0.1;
            }
            viewRange = [time % 2 - 0.5, time % 2 + 0.1];
            this.modelTranslateX = 0;
            this.modelTranslateY = 0;
          }
          this.camera.params.phi = storyState.scene.cameraBSplines.phi(sceneProgress)[0];
          this.camera.params.distance = storyState.scene.cameraBSplines.distance(sceneProgress)[0];
          this.camera.params.theta = storyState.scene.cameraBSplines.theta(sceneProgress)[0];
          this.camera.params.center = [
            storyState.scene.cameraBSplines.centerX(sceneProgress)[0],
            storyState.scene.cameraBSplines.centerY(sceneProgress)[0],
            storyState.scene.cameraBSplines.centerZ(sceneProgress)[0]
          ];
          this.camera.tick();
          if (autoLoop || this.camera.state.dirty) {
            this.camera.setCameraUniforms({
              ...this.camera,
              scene: storyState.scene,
              sceneProgress
            }, () => {
              regl.clear({
                color: [0, 0, 0, 0],
                depth: 1
              });
              this.view.drawDiffuse({
                colorCorrections: storyState.scene.variables.colorCorrections,
                particleColorsAndTypes: storyState.scene.variables.particleColorsAndTypes,
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
            });
          }
        }
      });
    }
  };
})();
