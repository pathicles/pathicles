/* eslint-env jest */

import { config } from '../../../config/dist/pathicles-config.esm'

describe('config', () => {
  it('exists', () => {
    expect(config).not.toBeNull()
  })
})
