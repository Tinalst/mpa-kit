const {merge} = require('webpack-merge');
const base = require('./webpack.config.base');
const fs = require('fs');
const MediaQueryPlugin = require('media-query-plugin');

const pages =fs.readdirSync("./src/pages");


module.exports = merge(base, {
  mode: "development",
  devServer: {
    port: 9999,
    publicPath: '/dist',
    open: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
           loader: 'css-loader',
           options: {
             // modules: true
           }
          },
          MediaQueryPlugin.loader,
          'sass-loader']
      }
    ]
  }
});
