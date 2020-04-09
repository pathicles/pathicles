import { Box3 } from 'three'

const zero3D = [0, 0, 0]

export const FieldTypes = {
  ELECTRIC: 'ELECTRIC',
  MAGNETIC: 'MAGNETIC'
}

export class Field {
  constructor({ minLocation, maxLocation }) {
    this._minLocation = minLocation
    this._maxLocation = maxLocation
    this._fieldType = undefined
  }

  containsLocation(location) {
    const result =
      location[0] < this._minLocation[0] ||
      location[0] > this._maxLocation[0] ||
      location[1] < this._minLocation[1] ||
      location[1] > this._maxLocation[1] ||
      location[2] < this._minLocation[2] ||
      location[2] > this._maxLocation[2]
        ? false
        : true

    return result
  }
}

export class ParticleInteractionField extends Field {
  constructor() {
    super()
  }
}

export class ConstantField extends Field {
  constructor({ minLocation, maxLocation, fieldValue }) {
    super({ minLocation, maxLocation })

    this._fieldValue = fieldValue
  }

  value(location) {
    if (this.containsLocation(location)) {
      return {
        [this._fieldType]: this._fieldValue
      }
    } else {
      return {
        [this._fieldType]: zero3D
      }
    }
  }
}

export class MagneticConstantField extends ConstantField {
  constructor({ minLocation, maxLocation, fieldValue }) {
    super({ minLocation, maxLocation, fieldValue })

    this._fieldType = FieldTypes.MAGNETIC
  }
}

export class ElectricConstantField extends ConstantField {
  constructor({ minLocation, maxLocation, fieldValue }) {
    super({ minLocation, maxLocation, fieldValue })

    this._fieldType = FieldTypes.ELECTRIC
  }
}

export class QuadrupoleField extends Field {
  constructor({ minLocation, maxLocation, strength = 0, rotation }) {
    super({ minLocation, maxLocation })

    this._boundingBox = new Box3(minLocation, maxLocation)

    this._strength = strength
    this._rotation = rotation
  }

  value(location) {
    if (this.containsLocation(location)) {
      if (this._rotation) {
        return {
          [this._fieldType]: [
            -location[1] * this._strength,
            -location[0] * this._strength,
            0
          ]
        }
      } else {
        return {
          [this._fieldType]: [
            location[1] * this._strength,
            location[0] * this._strength,
            0
          ]
        }
      }
    } else {
      return {
        [this._fieldType]: zero3D
      }
    }
  }
}

export class MagneticQuadrupoleField extends QuadrupoleField {
  constructor({ minLocation, maxLocation, strength = 0, rotation }) {
    super({ minLocation, maxLocation, strength, rotation })

    this._fieldType = FieldTypes.MAGNETIC
  }
}
