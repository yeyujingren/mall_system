const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: {
    platform: './client/src/manage-system/index.js',
    shop: './client/src/shop-system/index.js'
  },

  output: {
    path: path.join(__dirname, './app/public'),
    publicPath: '/',
    filename: (chunkData) => {
      return chunkData.chunk.name === 'common' ? 'common.[contenthash].js' : '[name].[chunkhash:8].bundle.js'
    },
    chunkFilename: '[id].[chunkhash:8].chunk.js'
  },

  module: {
    rules: [
      // Javascript & JSX
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, './client/src')]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        resolve: {
          extensions: ['.js', '.jsx']
        }
      },

      // LESS & CSS
      {
        test: /\.css|\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          // {
          //   loader: 'px2rem-loader',
          //   options: {
          //     remUnit: 100
          //   }
          // },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
              strictMath: true,
              noIeCompat: true
            }
          }
        ]
      },

      // Static Files - Images
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    // Multiple Entrances
    new HtmlWebpackPlugin({
      chunks: ['common', 'platform'],
      filename: 'platform.html',
      template: './client/public/platform.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['common', 'shop'],
      filename: 'shop.html',
      template: './client/public/shop.html'
    }),

    // Copy Public Files
    new CopyPlugin([
      './client/public/favicon.ico',
      './client/public/favicon.png',
      './client/public/manifest.json',
      './client/public/healthCheck.html',
      './client/public/non-healthCheck.html',
    ]),

    // LESS to CSS
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].[contenthash:8].chunk.css'
    }),

    new webpack.HotModuleReplacementPlugin()
  ],

  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin()
    ]
  },

  node: {
    net: 'empty'
  },

  resolve: {
    alias: {
      joi: 'joi-browser'
    }
  }
};
