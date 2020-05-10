/* eslint-env node */
'use strict';

module.exports = {
  extends: ['ash-nazg/sauron-node'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
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
    extends: ['plugin:node/recommended-script'],
    files: ['docs/jsdoc-config.js', '.eslintrc.js'],
    rules: {
      strict: 0,
      'import/unambiguous': 0,
      'import/no-commonjs': 0
    }
  }, {
    files: ['**/*.md'],
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
