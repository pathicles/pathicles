import { speedOfLight__ms_1, bigNumberMath } from './../index.js'

export class Pusher {
  /**
   * Create a pusher for a system
   * @param {ParticleSystem} system - The particle system the pusher is applied to.
   * @param {number} dt__s - The default time step. @defaultvalue = 1/c
   */
  constructor({ system, dt__s }) {
    if (!system) {
      throw "The constructor of class Pusher has a mandatory argument 'system'"
    }

    if (typeof dt__s === 'undefined') {
      dt__s = speedOfLight__ms_1.pow(-1)
    } else {
      // dt__s = bigmath.bignumber(0)
    }

    this._system = system
    this._dt__s = dt__s
    this._dt = bigNumberMath.unit(this._dt__s, 's')

    this._half_dt__s = bigNumberMath.bignumber(dt__s).times(0.5)
    this._half_dt = bigNumberMath.unit(this._half_dt__s, 's')

    this._t0 = 0
  }

  get system() {
    return this._system
  }

  // eslint-disable-next-line no-unused-vars
  push({ dt }) {
    throw new Error('abstract class')
  }
}
