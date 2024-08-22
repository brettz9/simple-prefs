import ashNazg from 'eslint-config-ash-nazg';

export default [
  {
    ignores: [
      'dist'
    ]
  },
  ...ashNazg(['sauron', 'browser']),
  {
    files: ['**/*.md/*.js'],
    rules: {
      'eol-last': 'off',
      'no-console': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'padded-blocks': 'off',
      // 'import/unambiguous': 'off',
      // 'import/no-unresolved': 'off',
      // 'import/no-extraneous-dependencies': 'off',
      'n/no-missing-import': 'off',
      'n/no-extraneous-import': ['error'],
      'n/no-unsupported-features/es-syntax': 'off'
    }
  }
];
