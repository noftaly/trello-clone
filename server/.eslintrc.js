module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: 'noftalint',
  rules: {
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-unpublished-import': 'off',
    'node/no-process-exit': 'off',
    'capitalized-comments': 'off',
  },
  overrides: [
    {
      files: ['./src/services/**/*.class.js'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
};
