/* eslint-env node */
module.exports = {
  root: true,
  env: {
    es6: true
  },
  extends: [
    'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:json/recommended'
  ],
  // "plugins": ["syntax-dynamic-import"],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  // parser: 'babel-eslint',
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 8,
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['**/*.vue'],
      env: {},
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // "extends": ["plugin:jest/recommended"]
      plugins: ['jest'],
      rules: {
        'vue/component-name-in-template-casing': 'off',
        'vue/prop-name-casing': 'off'
      }
    },
    {
      files: ['**/*.test.js', '**/tests/**'],
      env: {
        jest: true,
        node: true
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // "extends": ["plugin:jest/recommended"]
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error'
      }
    },
    {
      files: ['**/*.ts'],
      env: {},
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // "extends": ["plugin:jest/recommended"]
      parser: '@typescript-eslint/parser'
    }
  ]
}
