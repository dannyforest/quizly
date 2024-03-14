/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: [
        '**/tests/.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/e2e//*.{cy,spec}.{js,ts,jsx,tsx}',
        'cypress/support//*.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ],
      rules: {

        'cypress/unsafe-to-chain-command': 'off',
        'no-undef' : 'off'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
