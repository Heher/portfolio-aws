/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended'
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'tailwindcss/no-custom-classname': 'off'
  }
};
