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
    open: true,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              localsConvention: 'camelCase',
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
           loader: 'css-loader',
           options: {
             localsConvention: 'camelCase',
             importLoaders: 1,
             modules: {
               localIdentName: '[name]__[local]__[hash:base64:5]'
             },
           }
          },
          MediaQueryPlugin.loader,
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  }
});
