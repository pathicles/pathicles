/* eslint-env jest */
import { Lattice, LATTICE_ELEMENT_TYPES, LATTICE_ELEMENTS } from './lattice'

describe('Lattice.js', () => {
  it('no default constructor', () => {
    expect(() => {
      new Lattice()
    }).toThrow(new Error('no default constructor'))
  })
})

describe('lattice with one drift tube', () => {
  const lattice = new Lattice({
    elements: {
      l0: {
        type: LATTICE_ELEMENT_TYPES.DRIF,
        l: 1
      }
    },
    beamline: ['l0']
  })
  it('has length 1', () => {
    expect(lattice.length()).toEqual(1)
  })
  it('has one beamline element', () => {
    expect(lattice.beamline).toEqual([
      {
        type: 'DRIF',
        local_z_min: 0,
        local_z_max: 1,
        middle: [0, 0, 0.5],
        phi: 0,
        size: [0.15, 0.1, 1]
      }
    ])
  })
  it('has correct default transformations', () => {
    expect(lattice.transformations).toEqual([
      {
        phi: 0,
        scale: [
          LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.DRIF].width,
          LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.DRIF].height,
          1 - LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.DRIF].gap
        ],
        translation: [0, 0, 0.5]
      }
    ])
  })
  it('has drift tube at 0,0,0', () => {
    expect(lattice.getElementForPosition([0, 0, 0])).toBeDefined()
  })
  it('has drift tube at 1,0,0', () => {
    expect(lattice.getElementForPosition([10, 0, 0])).toBeNull()
  })
})
describe('lattice with one bending magnet', () => {
  const lattice = new Lattice({
    elements: {
      l0: {
        type: LATTICE_ELEMENT_TYPES.DRIF,
        l: 1
      },
      sben: {
        type: LATTICE_ELEMENT_TYPES.SBEN,
        l: Math.sqrt(2),
        strength: 1,
        angle: (2 * Math.PI) / 4
      }
    },
    beamline: ['l0', 'sben', 'l0'],
    origin: {
      phi: 0,
      position: [0, 0, -1]
    }
  })
  it('has total length of sqrt(2)', () => {
    expect(lattice.length()).toEqual(2 + Math.sqrt(2))
  })
  it('has one bending magnet', () => {
    expect(lattice.beamline[1]).toEqual({
      type: LATTICE_ELEMENT_TYPES.SBEN,
      strength: 1,
      local_z_min: 0.9999999999999998,
      local_z_max: 1 + Math.sqrt(2),
      phi: (2 * Math.PI) / 8,
      middle: [-0.5, 0, 0.5000000000000001],
      size: [1, 0.1, Math.sqrt(2)]
    })
  })
  it('has correct end ', () => {
    expect(lattice.beamline[2]).toEqual({
      type: LATTICE_ELEMENT_TYPES.DRIF,
      local_z_min: 1 + Math.sqrt(2),
      local_z_max: 2 + Math.sqrt(2),
      phi: (2 * Math.PI) / 4,
      middle: [-1.5, 0, 1.0000000000000002],
      size: [0.15, 0.1, 1]
    })
  })
  it('with correct transformation', () => {
    expect(lattice.transformations[1]).toEqual({
      phi: (2 * Math.PI) / 8,
      scale: [
        LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.SBEN].width,
        LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.SBEN].height,
        Math.sqrt(2) - LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.SBEN].gap
      ],
      translation: [-0.5, 0, 0.5000000000000001]
    })
  })
})

describe('lattice with two quadrupoles', () => {
  const lattice = new Lattice({
    elements: {
      q1: {
        type: LATTICE_ELEMENT_TYPES.QUAD,
        l: 5,
        strength: 1
      },
      q2: {
        type: LATTICE_ELEMENT_TYPES.QUAD,
        l: 5,
        strength: -1
      }
    },
    beamline: ['q1', 'q2'],
    origin: {
      phi: 0,
      position: [0, 0, -5]
    }
  })
  it('has length of 10', () => {
    expect(lattice.length()).toEqual(10)
  })
  it('has two quadrupole elements 1', () => {
    expect(lattice.beamline[0]).toEqual({
      type: 'QUAD',
      strength: 1,
      phi: 0,
      local_z_min: 0,
      local_z_max: 5,
      middle: [0, 0, -2.5],
      size: [1, 0.1, 5]
    })
  })
  it('has two quadrupole elements 2', () => {
    expect(lattice.beamline[1]).toEqual({
      type: 'QUAD',
      strength: -1,
      phi: 0,
      local_z_min: 5,
      local_z_max: 10,
      middle: [0, 0, 2.5],
      size: [1, 0.1, 5]
    })
  })
  it('with correct transformations', () => {
    expect(lattice.transformations).toEqual([
      {
        phi: 0,
        scale: [
          LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.QUAD].width,
          LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.QUAD].height,
          5 - LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.QUAD].gap
        ],
        translation: [0, 0, -2.5]
      },
      {
        phi: 0,
        scale: [
          LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.QUAD].width,
          LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.QUAD].height,
          5 - LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.QUAD].gap
        ],
        translation: [0, 0, 2.5]
      }
    ])
  })
})

// describe('five elements', () => {
//   const lattice = new Lattice({
//     elements: {
//       l0: {
//         type: LATTICE_ELEMENT_TYPES.DRIF,
//         l: 0.5
//       },
//       q1: {
//         type: LATTICE_ELEMENT_TYPES.QUAD,
//         strength: 2.87506832355,
//         l: 0.5
//       },
//       bm: {
//         type: LATTICE_ELEMENT_TYPES.SBEN,
//         strength: 2,
//         angle: Math.PI / 2,
//         // e1: 0.39269908,
//         // e2: 0.39269908,
//         l: Math.sqrt(2)
//       }
//     },
//     beamline: ['l0', 'q1', 'bm', 'l0', 'q1']
//   })
//
//   // it('five elements', () => {
//   //   expect(lattice.beamline).toEqual([
//   //     {
//   //       l: 0.5,
//   //       type: 'DRIF',
//   //       local_z_max: 0.5,
//   //       local_z_min: 0,
//   //       start: [0, 0, 0],
//   //       end: [0, 0, 0.5]
//   //     },
//   //     {
//   //       strength: 2.87506832355,
//   //       l: 0.5,
//   //       type: 'QUAD',
//   //       local_z_min: 0.5,
//   //       local_z_max: 1,
//   //       start: [0, 0, 0.5],
//   //       end: [0, 0, 1]
//   //     },
//   //     {
//   //       angle: 1.5707963267948966,
//   //       strength: 2,
//   //       l: 1.4142135623730951,
//   //       type: 'SBEN',
//   //       local_z_max: 2.414213562373095,
//   //       local_z_min: 0.9999999999999998,
//   //       start: [0, 0, 1],
//   //       end: [-1, 0, 2]
//   //     },
//   //     {
//   //       l: 0.5,
//   //       type: 'DRIF',
//   //       local_z_max: 2.914213562373095,
//   //       local_z_min: 2.414213562373095,
//   //       start: [-1, 0, 2],
//   //       end: [-1.5, 0, 2]
//   //     },
//   //     {
//   //       strength: 2.87506832355,
//   //       l: 0.5,
//   //       type: 'QUAD',
//   //       local_z_max: 3.414213562373095,
//   //       local_z_min: 2.914213562373095,
//   //       start: [-1.5, 0, 2],
//   //       end: [-2, 0, 2]
//   //     }
//   //   ])
//   // })
//   // it('five other elements', () => {
//   //   expect(lattice.beamline.map((e) => e.type)).toEqual([
//   //     'DRIF',
//   //     'QUAD',
//   //     'SBEN',
//   //     'DRIF',
//   //     'QUAD'
//   //   ])
//   //   expect(lattice.transformations.map((e) => e.phi)).toEqual([
//   //     0,
//   //     0,
//   //     Math.PI / 4,
//   //     Math.PI / 2,
//   //     Math.PI / 2
//   //   ])
//   //   expect(lattice.transformations.map((e) => e.translation)).toEqual([
//   //     [0, 0, 0.25],
//   //     [0, 0, 0.75],
//   //     [-0.5, 0, 1.5],
//   //     [-1.25, 0, 2],
//   //     [-1.75, 0, 2]
//   //   ])
//   //
//   //   expect(lattice.segmentIndexForZ(0.25)).toEqual(0)
//   //   expect(lattice.segmentIndexForZ(0.75)).toEqual(1)
//   //   expect(lattice.segmentIndexForZ(1.25)).toEqual(2)
//   //
//   //   expect(lattice.getClosestBeamlineElement([0, 0, 0]).local_z_min).toEqual(0)
//   //   expect(lattice.getClosestBeamlineElement([0, 0, 2]).local_z_min).toEqual(0)
//   // })
// })
