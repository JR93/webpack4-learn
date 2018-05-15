require('./check-version')()

const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const baseConfig = require('./webpack.base')
const mode = process.env.NODE_ENV

module.exports = merge(baseConfig(mode), {
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../output'),
    publicPath: '/',
    hot: true,
    clientLogLevel: 'none',
    quiet: true,
    port: 7890,
    open: true,
    disableHostCheck: true,
    proxy: {}
  }
})
