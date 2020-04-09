const PHOTON = {
  name: "PHOTON",
  mass__eVc_2: 0,
  charge__qe: 0,
  chargeMassRatio__Ckg_1: 0,
  id: 0,
  color: [.92, .75, .0],
  intColor: [237, 197, 0]

}


const ELECTRON = {
  name: "ELECTRON",
  mass__eVc_2: 510998.94,
  chargeMassRatio__Ckg_1: -1.75882004556243e+11,
  charge__qe: -1,
  id: 1,
  color: [.12, .45, .65],
  intColor: [33, 116, 168],


}

const POSITRON = {
  name: "POSITRON",
  mass__eVc_2: 510998.94,
  chargeMassRatio__Ckg_1: 1.75882004556243e+11,
  charge__qe: 1,
  id: 2,
  color: [.22, .9, .9],
  intColor: [133, 116, 168]
}

const PROTON = {
  name: "PROTON",
  mass__eVc_2: 938272081,
  charge__qe: 1,
  chargeMassRatio__Ckg_1: 9.57883323113770929296814695637e+7,
  id: 3,
  color: [.77, .2, .2],
    intColor: [197, 50, 40]
}

export const LIST = [PHOTON, ELECTRON, POSITRON, PROTON]
export const ParticleTypesList = [PHOTON, ELECTRON, POSITRON, PROTON]
const BY_NAME_MAP = new Map(LIST.map(i => [i.name, i]))

const ParticleTypes = {
  PHOTON,
  ELECTRON,
  POSITRON,
  PROTON,

  byNameMap: BY_NAME_MAP,
  byName: (name) => BY_NAME_MAP.get(name),
  idByName: (name) => LIST.indexOf(BY_NAME_MAP.get(name))
}

export default ParticleTypes
