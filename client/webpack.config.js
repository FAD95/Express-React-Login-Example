const webpack = require('webpack')
const path = require('path')
const HtmlWP = require('html-webpack-plugin')
const MiniCSSExtract = require('mini-css-extract-plugin')
module.exports = {
  entry: {
    app: ['@babel/polyfill', './src/index.js'],
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWP({
      title: 'HMR',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new MiniCSSExtract({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
}
