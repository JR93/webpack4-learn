module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  env: {
    'browser': true,
    'es6': true
  },
  globals: {

  },
  extends: 'standard',
  plugins: ['html'],
  rules: {
    'no-console': 0,
    'func-names': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'linebreak-style': 0,
    'class-methods-use-this': 0
  }
};
