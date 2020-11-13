const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
const Visualizer = require('webpack-visualizer-plugin')
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'
const production = (process.env.NODE_ENV === 'production')

const postCssConfig = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: ['autoprefixer', 'cssnano']
    }
  }
}


module.exports = {
  entry: path.resolve(__dirname, './src/main.ts'),
  output: {
    path: path.resolve(__dirname, './homecontrol_frontend/www'),
    filename: 'static/main.[contenthash].js',
    chunkFilename: 'static/[id].[contenthash].js',
    publicPath: '/frontend/',
  },
  watch: !production,
  devtool: production ? 'source-map' : 'eval',
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
          postCssConfig,
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
          'css-loader',
          postCssConfig
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
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
        test: /\.(woff(2)?|ttf|otf|eot|svg|txt|png)(\?v=\d+\.\d+\.\d+)?$/,
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
    new Visualizer({ filename: './bundlestats.html' }),
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
      ios: true,
      icons: [
        {
          src: path.resolve('src/assets/branding/logo.png'),
          sizes: [48, 120, 152, 167, 180, 192, 512, 1024],
          destination: 'static',
          ios: true
        },
        {
          src: path.resolve('src/assets/branding/logo.png'),
          size: 1024,
          destination: 'static',
          ios: 'startup',
          purpose: 'any maskable'
        }
      ]
    }),
    new DuplicatePackageCheckerPlugin(),
    new WorkboxPlugin.InjectManifest({
      swSrc: path.join(__dirname, 'src/sw.js'),
      swDest: path.join(__dirname, 'homecontrol_frontend/www/sw.js'),
      dontCacheBustURLsMatching: /static/,
      manifestTransforms: [
        async (manifestEntries) => {
          const manifest = manifestEntries.filter(entry => entry.url !== '/frontend/index.html')
          return { manifest }
        }
      ],
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024
    })
  ]
}
