const PHOTON = {
  name: 'PHOTON',
  mass__eVc_2: 0,
  charge__qe: 0,
  chargeMassRatio__Ckg_1: 0,
  id: 0,
  color: [235, 192, 0]
}
const ELECTRON = {
  name: 'ELECTRON',
  mass__eVc_2: 510998.94,
  chargeMassRatio__Ckg_1: -1.75882004556243e11,
  charge__qe: -1,
  id: 1,
  color: [31, 115, 166]
}
const POSITRON = {
  name: 'POSITRON',
  mass__eVc_2: 510998.94,
  chargeMassRatio__Ckg_1: 1.75882004556243e11,
  charge__qe: 1,
  id: 2,
  color: [166, 115, 166]
}
const PROTON = {
  name: 'PROTON',
  mass__eVc_2: 938272081,
  charge__qe: 1,
  chargeMassRatio__Ckg_1: 9.57883323113770929296814695637e7,
  id: 3,
  color: [197, 50, 51]
}

const PARTICLE_TYPES = [PHOTON, ELECTRON, POSITRON, PROTON]

const BY_NAME_MAP = new Map(PARTICLE_TYPES.map((i) => [i.name, i]))

const particleByName = (name) => BY_NAME_MAP.get(name)

export { PHOTON, ELECTRON, POSITRON, PROTON, PARTICLE_TYPES, particleByName }
