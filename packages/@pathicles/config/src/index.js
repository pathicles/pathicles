import nanomerge from 'nanomerge'

import { defaultConfig } from './presets/_default'
import { storyDipole } from './presets/story-dipole'
import { storyElectric } from './presets/story-electric'
import { storyQuadrupole } from './presets/story-quadrupole'
import { storyEmpty } from './presets/story-empty'
import { bird } from './presets/old/bird'
import { storyLoop } from './presets/story-loop'
import { random } from './presets/random'
import { freeElectron } from './presets/free-electron'
import { freePhoton } from './presets/free-photon'

const presets = {
  'story-dipole': storyDipole,
  'story-electric': storyElectric,
  'free-electrons': storyElectric,
  'story-quadrupole': storyQuadrupole,
  'story-empty': storyEmpty,
  'story-loop': storyLoop,
  freeElectron,
  freePhoton,
  random
}

const config = presetName => {
  return nanomerge(defaultConfig, presets[presetName]) || defaultConfig
}

export { config, defaultConfig, presets }
