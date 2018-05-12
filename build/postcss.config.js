module.exports = {
  plugins: {
    'postcss-cssnext': {},
    'postcss-pxtorem': {
      rootValue: 75,
      unitPrecision: 4,
      propList: ['*'],
      minPixelValue: 2
    }
  }
};
