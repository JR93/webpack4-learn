const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const babelConfig = require('./babelrc');

module.exports = {
  context: path.resolve(__dirname, '../'),
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../output'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: { ...babelConfig },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['../output'], {
      allowExternal: true
    })
  ]
};
