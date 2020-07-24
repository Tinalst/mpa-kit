const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MediaQueryPlugin = require('media-query-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const BundleBuddyWebpackPlugin  = require('bundle-buddy-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackMonitor = require('webpack-monitor');


module.exports = merge(baseConfig.base, {
  mode: "production",
  output: {
    filename: '[name].[chunkhash].js',
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
    }),
    // new WebpackMonitor({
    //   capture: true,
    //   launch: true
    // })
    new WebpackBundleAnalyzer()
    // new BundleBuddyWebpackPlugin({
    //   sam: true
    // })
  ],
  optimization: {
    // minimize: false,
    // runtimeChunk: {
    //   name: entrypoints => `runtime~${entrypoints.name}`
    // },
    namedChunks: true,
    namedModules: true,
    splitChunks: {
      chunks: "all"
    },
    concatenateModules: true
  }
});
