/* eslint-env node */
module.exports = {
  extends: ['ash-nazg/sauron'],
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
    files: ['docs/jsdoc-config.js'],
    rules: {
      strict: 0,
      'import/unambiguous': 0,
      'import/no-commonjs': 0
    }
  }, {
    files: ['**/*.md'],
    rules: {
      'eol-last': ['off'],
      'no-console': ['off'],
      'no-undef': ['off'],
      'no-unused-vars': ['off'],
      'padded-blocks': ['off'],
      'import/unambiguous': ['off'],
      'import/no-unresolved': ['off'],
      'node/no-missing-import': ['off']
    }
  }],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  rules: {
  }
};
