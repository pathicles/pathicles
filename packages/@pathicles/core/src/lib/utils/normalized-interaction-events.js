/* eslint-env browser */
/* based on normalized-interaction-events@2.0.1 by Ricky Reusser */
'use strict'

import mouseChange from 'mouse-change'
import eventOffset from 'mouse-event-offset'
import eventEmitter from 'event-emitter'

const EVENT_LISTENER_OPTIONS = { passive: true, capture: false }

export default function normalizedInteractionEvents(element) {
  element = element || window

  const emitter = eventEmitter()
  let previousPosition = [null, null]
  let previousFingerPosition = [null, null]
  let currentPosition = [null, null]
  let fingers = [null, null]
  let activeTouchCount = 0
  let ev = {}

  let width, height

  const getSize =
    element === window
      ? function () {
          width = window.innerWidth
          height = window.innerHeight
        }
      : function () {
          width = element.clientWidth
          height = element.clientHeight
        }

  let buttons = 0
  let mouseX,
    mouseY,
    mods = {}
  const changeListener = mouseChange(
    element,
    function (pbuttons, px, py, pmods) {
      mouseX = px
      mouseY = py
      buttons = pbuttons
      mods = pmods
    }
  )

  function onWheel(event) {
    eventOffset(event, element, currentPosition)
    getSize()

    ev.buttons = buttons
    ev.mods = mods
    ev.x0 = ev.x = ev.x1 = (2 * currentPosition[0]) / width - 1
    ev.y0 = ev.y = ev.y1 = 1 - (2 * currentPosition[1]) / height
    ev.x2 = null
    ev.y2 = null
    ev.dx = (2 * event.deltaX) / width
    ev.dy = (-2 * event.deltaY) / height
    ev.dz = (2 * event.deltaZ) / width
    ev.active = 1
    ev.zoomx = 1
    ev.zoomy = 1
    ev.theta = 0
    ev.dtheta = 0
    ev.originalEvent = event

    emitter.emit('wheel', ev)

    previousPosition[0] = currentPosition[0]
    previousPosition[1] = currentPosition[1]
  }

  let x0 = null
  let y0 = null
  let active = 0

  function onMouseUp(event) {
    eventOffset(event, element, currentPosition)
    active = 0
    getSize()

    ev.buttons = buttons
    ev.mods = mods
    ev.x = ev.x1 = (2 * currentPosition[0]) / width - 1
    ev.y = ev.y1 = 1 - (2 * currentPosition[1]) / height
    ev.x2 = null
    ev.y2 = null
    ev.active = active
    ev.x0 = (2 * x0) / width - 1
    ev.y0 = 1 - (2 * y0) / height
    ev.dx = 0
    ev.dy = 0
    ev.dz = 0
    ev.zoomx = 1
    ev.zoomy = 1
    ev.theta = 0
    ev.dtheta = 0
    ev.originalEvent = event

    emitter.emit('mouseup', ev)

    x0 = y0 = null

    previousPosition[0] = currentPosition[0]
    previousPosition[1] = currentPosition[1]
  }

  function onMouseDown(event) {
    eventOffset(event, element, currentPosition)
    active = 1
    getSize()

    x0 = mouseX
    y0 = mouseY

    ev.buttons = buttons
    ev.mods = mods
    ev.x = ev.x0 = ev.x1 = (2 * currentPosition[0]) / width - 1
    ev.y = ev.y0 = ev.y1 = 1 - (2 * currentPosition[1]) / height
    ev.x2 = null
    ev.y2 = null
    ev.active = active
    ev.dx = 0
    ev.dy = 0
    ev.dz = 0
    ev.zoomx = 1
    ev.zoomy = 1
    ev.theta = 0
    ev.dtheta = 0
    ev.originalEvent = event

    emitter.emit('mousedown', ev)

    previousPosition[0] = currentPosition[0]
    previousPosition[1] = currentPosition[1]
  }

  function onMouseMove(event) {
    eventOffset(event, element, currentPosition)
    getSize()

    ev.buttons = buttons
    ev.mods = mods
    ev.x0 = (2 * x0) / width - 1
    ev.y0 = 1 - (2 * y0) / height
    ev.x = ev.x1 = (2 * currentPosition[0]) / width - 1
    ev.y = ev.y1 = 1 - (2 * currentPosition[1]) / height
    ev.x2 = null
    ev.y2 = null
    ev.dx = (2 * (currentPosition[0] - previousPosition[0])) / width
    ev.dy = (-2 * (currentPosition[1] - previousPosition[1])) / height
    ev.active = active
    ev.dz = 0
    ev.zoomx = 1
    ev.zoomy = 1
    ev.theta = 0
    ev.dtheta = 0
    ev.originalEvent = event

    emitter.emit('mousemove', ev)

    previousPosition[0] = currentPosition[0]
    previousPosition[1] = currentPosition[1]
  }

  function indexOfTouch(touch) {
    let id = touch.identifier
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
    previousFingerPosition[0] = null
    previousFingerPosition[1] = null

    for (let i = 0; i < event.changedTouches.length; i++) {
      const newTouch = event.changedTouches[i]
      let id = newTouch.identifier
      let idx = indexOfTouch(id)

      if (idx === -1 && activeTouchCount < 2) {
        // var first = activeTouchCount === 0

        // newest and previous finger (previous may be undefined)
        const newIndex = fingers[0] ? 1 : 0
        // var oldIndex = fingers[0] ? 0 : 1
        const newFinger = {
          position: [0, 0],
          touch: null
        }

        // add to stack
        fingers[newIndex] = newFinger
        activeTouchCount++

        // update touch event & position
        newFinger.touch = newTouch
        eventOffset(newTouch, element, newFinger.position)

        // var oldTouch = fingers[oldIndex] ? fingers[oldIndex].touch : undefined
      }
    }

    let xavg = 0
    let yavg = 0
    let fingerCount = 0
    for (let i = 0; i < fingers.length; i++) {
      if (!fingers[i]) continue
      xavg += fingers[i].position[0]
      yavg += fingers[i].position[1]
      fingerCount++
    }
    xavg /= fingerCount
    yavg /= fingerCount

    if (activeTouchCount > 0) {
      ev.theta = 0

      if (fingerCount > 1) {
        const dx = fingers[1].position[0] - fingers[0].position[0]
        const dy =
          ((fingers[0].position[1] - fingers[1].position[1]) * width) / height
        ev.theta = Math.atan2(dy, dx)
      }

      getSize()
      ev.buttons = 0
      ev.mods = {}
      ev.active = activeTouchCount
      x0 = xavg
      y0 = yavg
      ev.x0 = (2 * x0) / width - 1
      ev.y0 = 1 - (2 * y0) / height
      ev.x = (2 * xavg) / width - 1
      ev.y = 1 - (2 * yavg) / height
      ev.x1 = (2 * fingers[0].position[0]) / width - 1
      ev.y1 = 1 - (2 * fingers[0].position[1]) / height
      if (activeTouchCount > 1) {
        ev.x2 = (2 * fingers[1].position[0]) / width - 1
        ev.y2 = 1 - (2 * fingers[1].position[1]) / height
      }
      ev.active = activeTouchCount
      ev.dx = 0
      ev.dy = 0
      ev.dz = 0
      ev.zoomx = 1
      ev.zoomy = 1
      ev.dtheta = 0
      ev.originalEvent = event
      emitter.emit(activeTouchCount === 1 ? 'touchstart' : 'pinchstart', ev)
    }
  }

  function onTouchMove(event) {
    let idx
    let changed = false
    for (let i = 0; i < event.changedTouches.length; i++) {
      const movedTouch = event.changedTouches[i]
      idx = indexOfTouch(movedTouch)

      if (idx !== -1) {
        changed = true
        fingers[idx].touch = movedTouch // avoid caching touches
        eventOffset(movedTouch, element, fingers[idx].position)
      }
    }

    if (changed) {
      if (activeTouchCount === 1) {
        for (idx = 0; idx < fingers.length; idx++) {
          if (fingers[idx]) break
        }

        if (fingers[idx] && previousFingerPosition[idx]) {
          const x = fingers[idx].position[0]
          const y = fingers[idx].position[1]

          const dx = x - previousFingerPosition[idx][0]
          const dy = y - previousFingerPosition[idx][1]

          ev.buttons = 0
          ev.mods = {}
          ev.active = activeTouchCount
          ev.x = ev.x1 = (2 * x) / width - 1
          ev.y = ev.y1 = 1 - (2 * y) / height
          ev.x2 = null
          ev.y2 = null
          ev.x0 = (2 * x0) / width - 1
          ev.y0 = 1 - (2 * y0) / height
          ev.dx = (2 * dx) / width
          ev.dy = (-2 * dy) / height
          ev.dz = 0
          ev.zoomx = 1
          ev.zoomy = 1
          ev.theta = 0
          ev.dtheta = 0
          ev.originalEvent = event

          emitter.emit('touchmove', ev)
        }
      } else if (activeTouchCount === 2) {
        if (previousFingerPosition[0] && previousFingerPosition[1]) {
          // Previous two-finger vector:
          const pos0A = previousFingerPosition[0]
          const pos0B = previousFingerPosition[1]
          const dx0 = pos0B[0] - pos0A[0]
          const dy0 = ((pos0B[1] - pos0A[1]) * width) / height

          // Current two-finger vector:
          const pos1A = fingers[0].position
          const pos1B = fingers[1].position
          const dx1 = pos1B[0] - pos1A[0]
          const dy1 = ((pos1A[1] - pos1B[1]) * width) / height

          // r, theta for the previous two-finger touch:
          const r0 = Math.sqrt(dx0 * dx0 + dy0 * dy0) * 0.5
          const theta0 = Math.atan2(dy0, dx0)

          // r, theta for the current two-finger touch:
          const r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) * 0.5
          const theta1 = Math.atan2(dy1, dx1)

          const xavg = (pos0B[0] + pos0A[0]) * 0.5
          const yavg = (pos0B[1] + pos0A[1]) * 0.5
          const dx = 0.5 * (pos1B[0] + pos1A[0] - pos0A[0] - pos0B[0])
          const dy = 0.5 * (pos1B[1] + pos1A[1] - pos0A[1] - pos0B[1])

          const dr = r1 / r0
          const dtheta = theta1 - theta0

          ev.buttons = 0
          ev.mods = mods
          ev.active = activeTouchCount
          ev.x = (2 * xavg) / width - 1
          ev.y = 1 - (2 * yavg) / height
          ev.x0 = (2 * x0) / width - 1
          ev.y0 = 1 - (2 * y0) / height
          ev.x1 = (2 * pos1A[0]) / width - 1
          ev.y1 = 1 - (2 * pos1A[1]) / height
          ev.x2 = (2 * pos1B[0]) / width - 1
          ev.y2 = 1 - (2 * pos1B[1]) / height
          ev.dx = (2 * dx) / width
          ev.dy = (-2 * dy) / height
          ev.dz = 0
          ev.zoomx = dr
          ev.zoomy = dr
          ev.theta = theta1
          ev.dtheta = dtheta
          ev.originalEvent = event

          emitter.emit('pinchmove', ev)
        }
      }
    }

    if (fingers[0]) {
      previousFingerPosition[0] = fingers[0].position.slice()
    }

    if (fingers[1]) {
      previousFingerPosition[1] = fingers[1].position.slice()
    }
  }

  function onTouchRemoved(event) {
    let lastFinger
    for (let i = 0; i < event.changedTouches.length; i++) {
      const removed = event.changedTouches[i]
      let idx = indexOfTouch(removed)

      if (idx !== -1) {
        lastFinger = fingers[idx]
        fingers[idx] = null
        activeTouchCount--
        // var otherIdx = idx === 0 ? 1 : 0
        // var otherTouch = fingers[otherIdx] ? fingers[otherIdx].touch : undefined
      }
    }

    let xavg = 0
    let yavg = 0
    if (activeTouchCount === 0) {
      if (lastFinger) {
        xavg = lastFinger.position[0]
        yavg = lastFinger.position[1]
      }
    } else {
      let fingerCount = 0
      for (let i = 0; i < fingers.length; i++) {
        if (!fingers[i]) continue
        xavg += fingers[i].position[0]
        yavg += fingers[i].position[1]
        fingerCount++
      }
      xavg /= fingerCount
      yavg /= fingerCount
    }

    if (activeTouchCount < 2) {
      ev.buttons = 0
      ev.mods = mods
      ev.active = activeTouchCount
      ev.x = (2 * xavg) / width - 1
      ev.y = 1 - (2 * yavg) / height
      ev.x0 = (2 * x0) / width - 1
      ev.y0 = 1 - (2 * y0) / height
      ev.dx = 0
      ev.dy = 0
      ev.dz = 0
      ev.zoomx = 1
      ev.zoomy = 1
      ev.theta = 0
      ev.dtheta = 0
      ev.originalEvent = event
      emitter.emit(activeTouchCount === 0 ? 'touchend' : 'pinchend', ev)
    }
    if (activeTouchCount === 0) {
      x0 = y0 = null
    }
  }

  let enabled = false

  function enable() {
    if (enabled) return
    enabled = true
    changeListener.enabled = true
    element.addEventListener('wheel', onWheel, EVENT_LISTENER_OPTIONS)
    element.addEventListener('mousedown', onMouseDown, EVENT_LISTENER_OPTIONS)
    window.addEventListener('mousemove', onMouseMove, EVENT_LISTENER_OPTIONS)
    window.addEventListener('mouseup', onMouseUp, EVENT_LISTENER_OPTIONS)

    element.addEventListener('touchstart', onTouchStart, EVENT_LISTENER_OPTIONS)
    window.addEventListener('touchmove', onTouchMove, EVENT_LISTENER_OPTIONS)
    window.addEventListener('touchend', onTouchRemoved, EVENT_LISTENER_OPTIONS)
    window.addEventListener(
      'touchcancel',
      onTouchRemoved,
      EVENT_LISTENER_OPTIONS
    )
  }

  function disable() {
    if (!enabled) return
    enabled = false
    changeListener.enabled = false
    element.removeEventListener('wheel', onWheel, EVENT_LISTENER_OPTIONS)
    element.removeEventListener(
      'mousedown',
      onMouseDown,
      EVENT_LISTENER_OPTIONS
    )
    window.removeEventListener('mousemove', onMouseMove, EVENT_LISTENER_OPTIONS)
    window.removeEventListener('mouseup', onMouseUp, EVENT_LISTENER_OPTIONS)

    element.removeEventListener(
      'touchstart',
      onTouchStart,
      EVENT_LISTENER_OPTIONS
    )
    window.removeEventListener('touchmove', onTouchMove, EVENT_LISTENER_OPTIONS)
    window.removeEventListener(
      'touchend',
      onTouchRemoved,
      EVENT_LISTENER_OPTIONS
    )
    window.removeEventListener(
      'touchcancel',
      onTouchRemoved,
      EVENT_LISTENER_OPTIONS
    )
  }

  enable()

  emitter.enable = enable
  emitter.disable = disable

  return emitter
}
