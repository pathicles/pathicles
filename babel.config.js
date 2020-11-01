/* eslint-env node */

module.exports = {
  env: {
    test: {
      presets: [['@babel/configuration-env', { targets: { node: 'current' } }]],
      plugins: []
    }
  }
}
