// .eslintrc.js

module.exports = {
  // parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
  //   sourceType: 'module' // Allows for the use of imports
  // },
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'prettier',
    'prettier/vue',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}
