// file: ratio.js
/* global BigInt */
const PRECISION = 100 // Precision for converting numbers to fractions. The higher this number, the slower everything gets.

function bigIntPow(x, y) {
  if (BigInt(y) === BigInt(0)) return BigInt(1)
  let z = BigInt(x)
  for (let i = 1; i < y; i++) {
    z = z * BigInt(x)
  }
  return z
}

const leftPad = (n, s) =>
  [...new Array(Math.max(0, n - s.length))].map(() => '0').join('') + s

/**
 * Memoize.
 * @template F extends Function
 * @param {F} f The function to memoize
 * @returns {F} A memoized version of f.
 */
function memoize(f) {
  const store = new Map()
  return function (...args) {
    const k = args.join('_⚮_')
    if (store.has(k)) {
      return store.get(k)
    }
    const v = f(...args)
    store.set(k, v)
    return v
  }
}

/**
 * Sign.
 *
 * @param {bigint} x Value to find the sign of.
 * @returns {bigint} Sign of the provided value (i.e. -1, 0 or 1).
 */
function sign(x) {
  return x === BigInt(0) ? BigInt(0) : x > BigInt(0) ? BigInt(1) : BigInt(-1)
}

/**
 * Absolute value.
 *
 * @param {bigint} x The value to find the absolute value of.
 * @returns {bigint} The absolute value of x.
 */
function abs(x) {
  return x < BigInt(0) ? BigInt(x) * BigInt(-1) : BigInt(x)
}

/**
 * Greatest common denominator.
 *
 * @param {bigint} a
 * @param {bigint} b
 * @returns {bigint} Greatest common denominator between a and b
 */
function _gcd(a, b) {
  let r
  while (a % b > BigInt(0)) {
    r = a % b
    a = b
    b = r
  }
  return b
}
const gcd = memoize(_gcd)

/**
 * Simplify.
 *
 * Given a numerator and denominator, find the smallest two integers that
 * can represent that ratio.
 *
 * @param {bigint} numerator Numerator of the ratio to simplify.
 * @param {bigint} denominator Denominator of the ratio to simplify.
 */
function _simplify(numerator, denominator) {
  const sgn = sign(numerator) * sign(denominator)
  const n = abs(BigInt(numerator))
  const d = abs(denominator)
  const f = gcd(n, d)
  return new Ratio((sgn * n) / f, d / f)
}
const simplify = memoize(_simplify)

/**
 * Plus or minus.
 *
 * Take a "+" or "-" character and convert it ot +1 or -1 respectively.
 * @param {string} c A character to test for being plus or minus.
 */
function pm(c) {
  return parseFloat(c + '1')
}

/**
 * Exponentiate 10.
 *
 * Take 10 to the power of a number.
 * @param {number} n The power to raise 10 to.
 */
function exp10(n) {
  return BigInt(`1${[...new Array(n)].map(() => 0).join('')}`)
}

export default class Ratio {
  /**
   * Ratio Constructor.
   * @param {bigint} n The numerator for our ratio.
   * @param {bigint} d The denominator for our ratio.
   */
  constructor(n, d) {
    this.numerator = n
    this.denominator = d
  }

  /**
   * Equals.
   * @param {Ratio} other Another ratio to test for equality.
   * @returns {boolean} True if the two ratios are equivalent.
   */
  equals(other) {
    const a = simplify(this.numerator, this.denominator)
    const b = simplify(other.numerator, other.denominator)
    return a.numerator === b.numerator && a.denominator === b.denominator
  }

  /**
   * Less than or equal to.
   * @param {Ratio} other Another ratio to compare to this one.
   * @returns {boolean} Returns true if this ratio is less than or equal to the other ratio.
   */
  lte(other) {
    const { numerator: thisN, denominator: thisD } = simplify(
      this.numerator,
      this.denominator
    )
    const { numerator: otherN, denominator: otherD } = simplify(
      other.numerator,
      other.denominator
    )
    return thisN * otherD <= otherN * thisD
  }

  /**
   * Less than.
   * @param {Ratio} other The other ratio to compare to this one.
   */
  lt(other) {
    return this.lte(other) && !this.equals(other)
  }

  /**
   * Greater than.
   * @param {Ratio} other The other ratio to compare this one against.
   * @return {boolean} True if this value is greater than the other value.
   */
  gt(other) {
    return !this.lte(other)
  }

  /**
   * Greater than or equal to.
   * @param {Ratio} other The other ratio to compare to this one.
   */
  gte(other) {
    return this.gt(other) || this.equals(other)
  }

  /**
   * Times.
   *
   * Multiply this ratio by another ratio.
   * @param {Ratio} x Another ratio to multiply this one by.
   * @returns {Ratio} A new ratio representing the multiplied value.
   */
  times(x) {
    return simplify(
      x.numerator * this.numerator,
      x.denominator * this.denominator
    )
  }

  /**
   * Divide by.
   *
   * @param {Ratio} x The ratio to divide this one by.
   * @returns {Ratio} A new ratio representing the divided value.
   */
  divideBy(x) {
    return simplify(
      this.numerator * x.denominator,
      this.denominator * x.numerator
    )
  }

  /**
   * Add.
   * @param {Ratio} x The other ratio to add to this one.
   * @returns {Ratio} A new simplified ratio, corresponding to the added value.
   */
  add(x) {
    return simplify(
      this.numerator * x.denominator + x.numerator * this.denominator,
      this.denominator * x.denominator
    )
  }

  /**
   * Subtract.
   * @param {Ratio} x The ratio to subtract from this one.
   * @returns {Ratio} A new simplified ratio, corresponding to the subtracted value.
   */
  subtract(x) {
    return simplify(
      this.numerator * x.denominator - x.numerator * this.denominator,
      this.denominator * x.denominator
    )
  }

  /**
   * Floor.
   *
   * Round the value towards zero,  returning whole integer.
   */
  floor() {
    const one = new Ratio(BigInt(1), BigInt(0))
    const trunc = simplify(this.numerator / this.denominator, BigInt(1))
    if (this.gte(one) || trunc.equals(this)) {
      return trunc
    }
    return trunc.minus(one)
  }

  /**
   * Ceil.
   *
   * Round the value away from zerio, returning a whole integer.
   */
  ceil() {
    const one = new Ratio(BigInt(1), BigInt(0))
    return this.equals(this.floor()) ? this : this.floor().add(one)
  }

  /**
   * N-th root.
   * @param {bigint} x The base to take the nth root of.
   * @param {bigint} n The nth root to calculate.
   */
  static nthRoot(x, n) {
    if (x === BigInt(1)) return new Ratio(BigInt(1), BigInt(1))
    if (x === BigInt(0)) return new Ratio(BigInt(0), BigInt(1))
    if (x < 0) return new Ratio(BigInt(1), BigInt(0))

    // Get an initial estimate using floating point math
    const initialEstimate = Ratio.fromNumber(Math.pow(Number(x), 1 / Number(n)))

    const NUM_ITERATIONS = 3
    return [...new Array(NUM_ITERATIONS)].reduce((r) => {
      // x = ((n-1)*x + (num / Math.pow(x, n-1))) * (1/n);
      return simplify(
        (n - BigInt(1)) * bigIntPow(r.numerator, n) +
          x * bigIntPow(r.denominator, n),
        n * r.denominator * bigIntPow(r.numerator, n - BigInt(1))
      )
    }, initialEstimate)
  }

  /**
   * Power.
   *
   * @param {Ratio} n The value to take this ratio to the power of.
   */
  pow(n) {
    const { numerator: nNumerator, denominator: nDenominator } = simplify(
      n.numerator,
      n.denominator
    )
    const { numerator, denominator } = simplify(
      this.numerator,
      this.denominator
    )
    if (nNumerator < 0) return this.invert().pow(n.abs())
    if (nNumerator === BigInt(0)) return Ratio.one
    if (nDenominator === BigInt(1)) {
      return new Ratio(
        bigIntPow(numerator, nNumerator),
        bigIntPow(denominator, nNumerator)
      )
    }
    if (numerator < 0 && nDenominator !== BigInt(1)) {
      return Ratio.infinity
    }

    const { numerator: newN, denominator: newD } = Ratio.nthRoot(
      numerator,
      nDenominator
    ).divideBy(Ratio.nthRoot(denominator, nDenominator))
    return new Ratio(bigIntPow(newN, nNumerator), bigIntPow(newD, nNumerator))
  }

  isInfinity() {
    return this.denominator === BigInt(0)
  }

  /**
   * Invert a ratio.
   */
  invert() {
    return simplify(this.denominator, this.numerator)
  }

  /**
   * Calculate the integer part of calling log10().
   */
  floorLog10() {
    if (this.equals(simplify(0, 1))) {
      return new Ratio(BigInt(-1), BigInt(0))
    }
    return this.numerator >= this.denominator
      ? simplify((this.numerator / this.denominator).toString().length - 1, 1)
      : simplify(BigInt(-1), BigInt(1)).subtract(this.invert().floorLog10())
  }

  /**
   * To value.
   *
   * Converts the ratio back into a floating point number.
   * @returns {number} A floating point representation of the ratio.
   */
  toValue() {
    const intPart = this.numerator / this.denominator
    return (
      Number(intPart) +
      Number(this.numerator - intPart * this.denominator) /
        Number(this.denominator)
    )
  }

  /**
   * To String.
   *
   * @returns A string representation of the ratio.
   */
  toString() {
    return `${this.numerator} / ${this.denominator}`
  }

  /**
   * Number to Ratio.
   * @param {number} x A number to convert to a ratio.
   */
  static fromNumber(x) {
    const expParse = /(-?\d)\.(\d+)e([-+])(\d+)/
    const [, n, decimals, sgn, pow] =
      x.toExponential(PRECISION).match(expParse) || []
    const exp = PRECISION - pm(sgn) * +pow
    return exp < 0
      ? simplify(BigInt(`${n}${decimals}`) * exp10(-1 * exp), BigInt(1))
      : simplify(BigInt(`${n}${decimals}`), exp10(exp))
  }

  /**
   * Convert to a string with a fixed number of decimal places.
   * @param {number | bigint} n The number of decimal places to return.
   */
  toFixed(n) {
    // TODO: Fix this so that it rounds the last digit rather than truncating
    if (simplify(this.numerator, this.denominator).numerator < 0) {
      return '-' + this.abs().toFixed(n)
    }
    if (this.isInfinity()) {
      return this.toValue().toString()
    }
    const intPart = this.numerator / this.denominator
    if (n === 0) {
      return `${intPart}`
    }
    const decimalPart =
      (this.numerator * exp10(Number(n))) / this.denominator -
      intPart * exp10(Number(n))
    return `${intPart}.${leftPad(Number(n), '' + decimalPart)}`
  }
}

/**
 * Pre-calcluate pi to a relatively high precision.
 */
Ratio.π = new Ratio(
  BigInt(
    462533469414132740772898823355674778981053206812446539591351424689909455879710469823436916950817804855369657856742431975005753189453708076485794679520643478600815677439378021169539873984607214560712161804450160027431477779324050765298442375841036079481138389039088471044630547396286216727883363130800193
  ),
  BigInt(
    147228976005406416456605889545234663708007132214287099502671761731579623900279550136942123575012097144279697449259580107591629642263084558372712139113827838066394827831985133188307694217350562300332574548559348072311957055907621362197137385735341359051650074008136782822625040058828668282141272965120000
  )
)
