const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')


const NODE_ENV = process.env.NODE_ENV || 'development'
const production = (process.env.NODE_ENV === 'production')


module.exports = {
  entry: path.resolve(__dirname, './src/main.ts'),
  output: {
    path: path.resolve(__dirname, './homecontrol_frontend/www'),
    filename: 'static/main.[contenthash].js',
    chunkFilename: 'static/[id].[contenthash].js',
    publicPath: '/frontend/',
  },
  watch: !production,
  devtool: 'source-map',
  target: 'web',
  mode: NODE_ENV,
  optimization: {
    moduleIds: 'hashed',
    usedExports: true,
    sideEffects: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          ecma: '6'
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['raw-loader', 'pug-plain-loader']
          }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: !production
            }
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentedSyntax: true
              },
              additionalData: `
                @import "/styles/vars.sass"
              `
            }
          }
        ]
      },
      {
        test: /\.css/,
        use: [
          'vue-style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
              hmr: !production
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: { appendTsSuffixTo: [/\.vue$/] }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|txt|png)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'static/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue', '.sass', '.scss', '.css'],
    roots: [path.resolve('./src')]
  },
  plugins: [
    new ManifestPlugin(),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/[name].[contenthash].css'
    }),
    new HTMLWebpackPlugin({
      template: './src/index.pug',
      inject: true,
      minify: production,
      scriptLoading: 'defer'
    }),
    new WebpackPwaManifest({
      name: 'HomeControl Template Manifest',
      description: "HomeControl will fill in the fields",
      filename: 'manifest.webmanifest',
      icons: [
        {
          src: path.resolve('src/assets/branding/logo.png'),
          sizes: [120, 152, 167, 180, 1024],
          destination: 'static',
          ios: true
        },
        {
          src: path.resolve('src/assets/branding/logo.png'),
          size: 1024,
          destination: 'static',
          ios: 'startup'
        },
        {
          src: path.resolve('src/assets/branding/logo.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
          destination: 'static'
        }
      ]
    })
  ]
}
