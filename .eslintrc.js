'use strict';

module.exports = {
  extends: ['ash-nazg/sauron-node-overrides'],
  parserOptions: {
    ecmaVersion: 2018
  },
  env: {
    browser: true,
    es6: true
  },
  settings: {
    polyfills: [
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
      'node/no-missing-import': 'off',
      'node/no-extraneous-import': ['error', {
        allowModules: ['regenerator-runtime']
      }],
      'node/no-unsupported-features/es-syntax': 'off'
    }
  }],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: {
  }
};
