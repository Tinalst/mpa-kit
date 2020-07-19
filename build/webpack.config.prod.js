const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MediaQueryPlugin = require('media-query-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = merge(baseConfig.base, {
  mode: "production",
  output: {
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          baseConfig.getCssLoaderOptions(),
          MediaQueryPlugin.loader,
          'postcss-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          baseConfig.getCssLoaderOptions(),
          MediaQueryPlugin.loader,
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name]_[id].css'
    }),
    new OptimizeCssAssetsWebpackPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      }
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
});
