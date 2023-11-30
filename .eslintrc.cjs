'use strict';

module.exports = {
  extends: ['ash-nazg/sauron-node-overrides'],
  parserOptions: {
    ecmaVersion: 2022
  },
  env: {
    browser: true,
    es6: true
  },
  settings: {
    polyfills: [
      'console',
      'JSON',
      'Object.assign'
    ]
  },
  overrides: [{
    files: ['**/*.md/*.js'],
    rules: {
      'eol-last': 'off',
      'no-console': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'padded-blocks': 'off',
      'import/unambiguous': 'off',
      'import/no-unresolved': 'off',
      'import/no-extraneous-dependencies': 'off',
      'n/no-missing-import': 'off',
      'n/no-extraneous-import': ['error'],
      'n/no-unsupported-features/es-syntax': 'off'
    }
  }],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: {
  }
};
