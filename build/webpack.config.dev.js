const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const MediaQueryPlugin = require('media-query-plugin');

const fs = require('fs');
const pages =fs.readdirSync("./src/pages");


module.exports = merge(baseConfig.base, {
  mode: "development",
  devServer: {
    port: 9999,
    publicPath: '/dist',
    open: true,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          baseConfig.getCssLoaderOptions(),
          MediaQueryPlugin.loader,
          'postcss-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          baseConfig.getCssLoaderOptions(),
          MediaQueryPlugin.loader,
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  }
});
