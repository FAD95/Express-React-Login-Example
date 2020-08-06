const webpack = require('webpack')
const path = require('path')
const HtmlWP = require('html-webpack-plugin')
module.exports = {
  entry: {
    home: path.resolve(__dirname, 'src/index.js'),
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  devServer: {
    hot: true,
    open: true,
    port: 9000,
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
    new webpack.HotModuleReplacementPlugin(),
    // new MCssEP({
    //   filename: 'css/[name].css'
    // }),
    new HtmlWP({
      title: 'HMR',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
  ],
}
