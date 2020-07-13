const {merge} = require('webpack-merge');
const base = require('./webpack.config.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MediaQueryPlugin = require('media-query-plugin');

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          MediaQueryPlugin.loader,
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
});


