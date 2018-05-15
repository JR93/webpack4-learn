require('./check-version')()

const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const baseConfig = require('./webpack.base')
const mode = process.env.NODE_ENV
const isProd = mode === 'production'

module.exports = merge(baseConfig(mode), {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: isProd,
            warnings: isProd
          }
        }
      })
    ],
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['../output'], {
      allowExternal: true
    })
  ]
})
