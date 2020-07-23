const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const MediaQueryPlugin = require('media-query-plugin');

const path = require('path');

module.exports = merge(baseConfig.base, {
  mode: "development",
  devtool: 'cheap-source-map',
  devServer: {
    port: 9999,
    contentBase: path.join(process.cwd(), '/src'),
    open: true,
    host: '0.0.0.0',
    progress: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          baseConfig.getCssLoaderOptions(),
          MediaQueryPlugin.loader,
          'postcss-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
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

