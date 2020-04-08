import nanomerge from 'nanomerge'

import { defaultConfig } from './presets/_default'
import { storyDipole } from './presets/story-dipole'
import { storyElectric } from './presets/story-electric'
import { storyQuadrupole } from './presets/story-quadrupole'
import { random } from './presets/random'
import { freeElectron } from './presets/free-electron'
import { freePhoton } from './presets/free-photon'
import { freePhotons } from './presets/free-photons'

const presets = {
  [storyDipole.name]: storyDipole,
  [storyElectric.name]: storyElectric,
  [storyQuadrupole.name]: storyQuadrupole,
  [freeElectron.name]: freeElectron,
  [freePhoton.name]: freePhoton,
  [freePhotons.name]: freePhotons,
  [random.name]: random
}

const config = presetName => {
  return nanomerge(defaultConfig, presets[presetName]) || defaultConfig
}

export { config, defaultConfig, presets }
