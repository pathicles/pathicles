import {
  Field,
  MagneticConstantField,
  MagneticQuadrupoleField
} from './ForceField'

describe('Field box', () => {
  const field = new Field({
    minLocation: [-100, -100, 50],
    maxLocation: [100, 100, 100]
  })

  it('correctly determines if location is inside box', () => {
    expect(field.containsLocation([0, 0, 0])).toBeFalsy()
  })
  it('correctly determines if location is outside box', () => {
    expect(field.containsLocation([10, 10, 75])).toBeTruthy()
  })
})

test('dipoleField', () => {
  const dipoleField = new MagneticConstantField({
    minLocation: [-100, -100, 50],
    maxLocation: [100, 100, 100],
    fieldValue: [0, -7, 0]
  })

  expect(dipoleField).toBeDefined()

  expect(dipoleField.value([0, 0, 0])).toEqual({ MAGNETIC: [0, 0, 0] })

  expect(dipoleField.value([0, 0, 75])).toEqual({ MAGNETIC: [0, -7, 0] })
})

test('MagneticQuadrupoleField', () => {
  const field = new MagneticQuadrupoleField({
    minLocation: [-100, -100, 150],
    maxLocation: [100, 100, 200],
    strength: 1,
    rotation: false
  })

  expect(field).toBeDefined()

  expect(field.value([0, 0, 150])).toEqual({ MAGNETIC: [0, 0, 0] })
  expect(field.value([1, 0, 150])).toEqual({ MAGNETIC: [0, 1, 0] })
  expect(field.value([-1, 0, 150])).toEqual({ MAGNETIC: [0, -1, 0] })
  expect(field.value([0, 1, 150])).toEqual({ MAGNETIC: [1, 0, 0] })
  expect(field.value([0, -1, 150])).toEqual({ MAGNETIC: [-1, 0, 0] })
})

test('MagneticQuadrupoleField rotated', () => {
  const field = new MagneticQuadrupoleField({
    minLocation: [-100, -100, 150],
    maxLocation: [100, 100, 200],
    strength: 1,
    rotation: true
  })

  expect(field).toBeDefined()

  expect(field.value([0, 0, 150])).toEqual({ MAGNETIC: [-0, -0, 0] })
  expect(field.value([1, 0, 150])).toEqual({ MAGNETIC: [-0, -1, 0] })
  expect(field.value([-1, 0, 150])).toEqual({ MAGNETIC: [-0, 1, 0] })
  expect(field.value([0, 1, 150])).toEqual({ MAGNETIC: [-1, -0, 0] })
  expect(field.value([0, -1, 150])).toEqual({ MAGNETIC: [1, -0, 0] })
})

//
// test('QuadrupoleField', () => {
//
//     let field = new QuadrupoleField(0, 1, 1, true);
//
//     expect(field).toBeDefined();
//
//     expect(field.getFieldValue([0,0,0])).toEqual([]);
//     expect(field.getFieldValue([.5,0,0])).toEqual([0,0,0]);
//     expect(field.getFieldValue([.5,1,0])).toEqual([0,0,-1]);
//
//     let particleFactory = new ParticleFactory();
//     let p1 = particleFactory.createParticle(ParticleFactory.ELECTRON, [.5,1,0],
//     [1,0,0]);
//
//     expect(field.getFieldValue(p1.location)).toEqual([0,0,-1]);
//     expect(field.getForce(p1)).toEqual([0,0,-1]);
// });
