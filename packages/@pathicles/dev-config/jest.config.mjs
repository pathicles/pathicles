// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

export default {
  collectCoverage: true,
  moduleFileExtensions: ['js', 'mjs'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest'
  },

  testRegex: '((\\.|/*.)(\\.test))\\.js?$'
}
