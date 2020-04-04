/* eslint-env jest */
import { Lattice, LatticeElementTypes } from './lattice'

describe('Lattice.js', () => {
  it('no default constructor', () => {
    expect(() => {
      new Lattice()
    }).toThrow(new Error('no default constructor'))
  })

  it('one drift tube', () => {
    const lattice = new Lattice({
      elements: {
        l0: {
          type: LatticeElementTypes.DRIF,
          l: 1
        }
      },
      beamline: ['l0']
    })
    expect(lattice.beamline).toEqual([
      { l: 1, type: 'DRIF', z_min: 0, z_max: 1 }
    ])
    expect(lattice.length()).toEqual(1)
    expect(lattice.transformations).toEqual([
      { phi: 0, scale: [0.1, 0.1, 1], translation: [0, 0, 0.5] }
    ])
  })

  it('five elements', () => {
    const lattice = new Lattice({
      elements: {
        l0: {
          type: LatticeElementTypes.DRIF,
          l: 0.5
        },

        q1: {
          type: LatticeElementTypes.QUAD,
          k1: 2.87506832355,
          l: 0.5
        },
        bm: {
          type: LatticeElementTypes.SBEN,
          angle: Math.PI / 2,
          e1: 0.39269908,
          e2: 0.39269908,
          l: Math.sqrt(2)
        }
      },
      beamline: ['l0', 'q1', 'bm', 'l0', 'q1']
    })

    expect(lattice.beamline).toEqual([
      {
        l: 0.5,
        type: 'DRIF',
        z_max: 0.5,
        z_min: 0
      },
      {
        k1: 2.87506832355,
        l: 0.5,
        type: 'QUAD',
        z_max: 1,
        z_min: 0.5
      },
      {
        angle: 1.5707963267948966,
        e1: 0.39269908,
        e2: 0.39269908,
        l: 1.4142135623730951,
        type: 'SBEN',
        z_max: 2.414213562373095,
        z_min: 0.9999999999999998
      },
      {
        l: 0.5,
        type: 'DRIF',
        z_max: 2.914213562373095,
        z_min: 2.414213562373095
      },
      {
        k1: 2.87506832355,
        l: 0.5,
        type: 'QUAD',
        z_max: 3.414213562373095,
        z_min: 2.914213562373095
      }
    ])

    expect(lattice.beamline.map(e => e.type)).toEqual([
      'DRIF',
      'QUAD',
      'SBEN',
      'DRIF',
      'QUAD'
    ])
    expect(lattice.transformations.map(e => e.phi)).toEqual([
      0,
      0,
      Math.PI / 4,
      Math.PI / 2,
      Math.PI / 2
    ])
    expect(lattice.transformations.map(e => e.translation)).toEqual([
      [0, 0, 0.25],
      [0, 0, 0.75],
      [-0.5, 0, 1.5],
      [-1.25, 0, 2],
      [-1.75, 0, 2]
    ])

    expect(lattice.segmentIndexForZ(0.25)).toEqual(0)
    expect(lattice.segmentIndexForZ(0.75)).toEqual(1)
    expect(lattice.segmentIndexForZ(1.25)).toEqual(2)

    expect(lattice.getClosestBeamlineElement([0, 0, 0]).z_min).toEqual(0)
    expect(lattice.getClosestBeamlineElement([0, 0, 2]).z_min).toEqual(0)
  })
})
