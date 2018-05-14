const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelConfig = require('./babelrc');

const entry = {};
glob.sync(path.join(__dirname, '../src/*.js')).forEach((filePath) => {
  const filename = path.basename(filePath, '.js');
  entry[filename] = filePath;
});

const webpackConfig = {
  context: path.resolve(__dirname, '../'),
  mode: 'development',
  // mode: 'production',
  entry,
  output: {
    path: path.resolve(__dirname, '../output'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash:8].js',
    publicPath: 'http://web.yy.com/aaa/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        include: path.resolve(__dirname, '../src'),
        options: {
          configFile: path.resolve(__dirname, './.eslintrc.js'),
          failOnError: true,
          formatter: require('eslint-friendly-formatter')
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: { ...babelConfig },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // options: { sourceMap: true }
            options: { importLoaders: 2, minimize: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              // sourceMap: true,
              config: {
                path: path.resolve(__dirname, 'postcss.config.js')
              }
            }
          },
          {
            loader: 'sass-loader',
            // options: { sourceMap: true }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
        include: /inline|base64/,
        loader: 'url-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
        exclude: /inline|base64/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:8].[ext]',
          context: path.resolve(__dirname, '../src/')
        }
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
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
            warnings: true
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
          minChunks: Object.keys(entry).length,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['../output'], {
      allowExternal: true
    }),
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.vue'],
    modules: ['node_modules']
  },
  externals: {},
  devServer: {
    // contentBase: path.resolve(__dirname, '../output'),
    // contentBase: false,
    publicPath: '/',
    hot: true,
    quiet: true,
    port: 7890,
    open: true
  }
};

glob.sync(path.join(__dirname, '../src/html/*.html')).forEach((filePath) => {
  const filename = path.basename(filePath, '.html');
  const config = {
    filename: `html/${filename}.html`,
    template: `src/html/${filename}.html`,
    inject: true,
    minify: true
  };

  if (filename in webpackConfig.entry) {
    config.chunks = ['runtime', 'vendors', 'commons', filename];
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(config));
});

module.exports = webpackConfig;
