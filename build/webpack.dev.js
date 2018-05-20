require('./check-version')()

const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const baseConfig = require('./webpack.base')
const config = require('./config')
const mode = process.env.NODE_ENV

module.exports = merge(baseConfig(mode), {
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    publicPath: '/',
    hot: true,
    clientLogLevel: 'none',
    quiet: true,
    port: config.port || 3000,
    open: true,
    disableHostCheck: true,
    proxy: config.proxy || {}
  }
})
