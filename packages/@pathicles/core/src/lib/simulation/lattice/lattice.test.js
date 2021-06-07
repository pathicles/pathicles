/* eslint-env jest */
import { Lattice, LATTICE_ELEMENT_TYPES, LATTICE_ELEMENTS } from './lattice'

describe('Lattice.js', () => {
  it('no default constructor', () => {
    expect(() => {
      new Lattice()
    }).toThrow(new Error('no default constructor'))
  })
})

describe('one drift tube lattice', () => {
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
  it("has one beamline element { l: 1, type: 'DRIF', z_min: 0, local_z_max: 1 }", () => {
    expect(lattice.beamline).toEqual([
      {
        l: 1,
        type: 'DRIF',
        local_z_min: 0,
        local_z_max: 1,
        start: [0, 0, 0],
        startBottomRight: [-0.1, 0, 0],
        middle: [0, 0, 0.5],
        end: [0, 0, 1],
        endTopLeft: [0.1, 2, 1],
        phi: 0,
        phi_half: 0
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
})
describe('one bending magnet', () => {
  const lattice = new Lattice({
    elements: {
      l0: {
        type: LATTICE_ELEMENT_TYPES.SBEN,
        l: Math.sqrt(2),
        strength: 1,
        angle: (2 * Math.PI) / 4
      }
    },
    beamline: ['l0'],
    origin: {
      phi: 0,
      position: [0, 0, -1]
    }
  })
  it('has total length of 20', () => {
    expect(lattice.length()).toEqual(Math.sqrt(2))
  })
  it("has one bending magnet { l: 1, type: 'DRIF', local_z_min: 0, local_z_max: 1 }", () => {
    expect(lattice.beamline).toEqual([
      {
        type: LATTICE_ELEMENT_TYPES.SBEN,
        strength: 1,
        l: Math.sqrt(2),
        local_z_min: 0,
        local_z_max: Math.sqrt(2),
        angle: (2 * Math.PI) / 4,
        phi: (2 * Math.PI) / 4,
        phi_half: (2 * Math.PI) / 8,
        start: [0, 0, -1],
        startBottomRight: [-0.07071067811865477, 0, -1.0707106781186548],
        middle: [-0.5, 0, -0.4999999999999999],
        end: [-1, 0, 2.220446049250313e-16],
        endTopLeft: [-0.9292893218813453, +2, +0.07071067811865497]
      }
    ])
  })
  it('with correct transformation', () => {
    expect(lattice.transformations).toEqual([
      {
        phi: (2 * Math.PI) / 8,
        scale: [
          LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.SBEN].width,
          LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.SBEN].height,
          Math.sqrt(2) - LATTICE_ELEMENTS[LATTICE_ELEMENT_TYPES.SBEN].gap
        ],
        translation: [-0.5, 0, -0.4999999999999999]
      }
    ])
  })
})

describe('two quadrupoles ', () => {
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
      l: 5,
      type: 'QUAD',
      strength: 1,
      phi: 0,
      phi_half: 0,
      local_z_min: 0,
      local_z_max: 5,
      start: [0, 0, -5],
      startBottomRight: [-0.15, 0, -5],
      middle: [0, 0, -2.5],
      end: [0, 0, 0],
      endTopLeft: [0.15, 2, 0]
    })
  })
  it('has two quadrupole elements 2', () => {
    expect(lattice.beamline[1]).toEqual({
      l: 5,
      type: 'QUAD',
      strength: -1,
      phi: 0,
      phi_half: 0,
      local_z_min: 5,
      local_z_max: 10,
      start: [0, 0, 0],
      startBottomRight: [-0.15, 0, 0],
      middle: [0, 0, 2.5],
      end: [0, 0, 5],
      endTopLeft: [0.15, 2, 5]
    })
  })
  it('with correct transformations', () => {
    expect(lattice.transformations).toEqual([
      { phi: 0, scale: [0.3, 0.05, 5], translation: [0, 0, -2.5] },
      { phi: 0, scale: [0.3, 0.05, 5], translation: [0, 0, 2.5] }
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
