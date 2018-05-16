const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const babelConfig = require('./babelrc')
const config = require('./config')

const entry = {}
glob.sync(path.join(__dirname, '../src/*.js')).forEach((filePath) => {
  const filename = path.basename(filePath, '.js')
  entry[filename] = `./src/${filename}.js`
})

module.exports = (mode) => {
  const isDev = mode === 'development'

  const webpackConfig = {
    context: path.resolve(__dirname, '../'),
    mode: mode === 'development' ? mode : 'production',
    entry,
    output: {
      path: config[mode].outputPath,
      filename: 'js/[name].[hash:8].js',
      chunkFilename: 'js/[name].[hash:8].js',
      publicPath: config[mode].publicPath
    },
    module: {
      noParse: [/common\/lib/],
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          options: {
            configFile: path.resolve(__dirname, '.eslintrc.js'),
            failOnError: !isDev,
            formatter: require('eslint-friendly-formatter')
          },
          include: path.resolve(__dirname, '../src')
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: { ...babelConfig },
          exclude: file => (
            /node_modules/.test(file) &&
            !/\.vue\.js/.test(file)
          )
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDev,
                minimize: !isDev
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDev,
                minimize: !isDev,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isDev,
                config: {
                  path: path.resolve(__dirname, 'postcss.config.js')
                }
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: isDev }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
          include: /inline|base64/,
          use: isDev ? ['url-loader'] : ['url-loader', 'image-webpack-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
          exclude: /inline|base64/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]',
                context: path.resolve(__dirname, '../src/')
              }
            }
          ].concat(isDev ? [] : ['image-webpack-loader'])
        },
        {
          test: /\.(ttf|otf|eot|woff2?|mp3|mp4)(\?.*)?$/i,
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
            limit: 8192,
            name: 'font/[name].[hash:8].[ext]',
            context: path.resolve(__dirname, '../src/')
          }
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
      ].concat(!isDev ? [
        new MiniCssExtractPlugin({
          filename: 'css/[name].[hash:8].css',
          chunkFilename: 'css/[name].[hash:8].css'
        })
      ] : []
    ),
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.js',
        '@': path.resolve(__dirname, '../src'),
        'common': path.resolve(__dirname, '../src/common'),
        'components': path.resolve(__dirname, '../src/components'),
        'assets': path.resolve(__dirname, '../src/assets')
      },
      extensions: ['.js', '.vue'],
      modules: ['node_modules']
    },
    externals: config.provide || {}
  };

  glob.sync(path.join(__dirname, '../src/html/*.html')).forEach((filePath) => {
    const filename = path.basename(filePath, '.html')
    const config = {
      filename: isDev ? `${filename}.html` : `html/${filename}.html`,
      template: `src/html/${filename}.html`,
      inject: true,
      minify: isDev ? false : {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        collapseWhitespace: true
      }
    }

    if (filename in webpackConfig.entry) {
      config.chunks = isDev ? [filename] : ['runtime', 'vendors', 'commons', filename];
    }

    webpackConfig.plugins.push(new HtmlWebpackPlugin(config))
  })

  return webpackConfig
}
