const {merge} = require('webpack-merge');
const base = require('./webpack.config.base');

module.exports = merge(base, {
  mode: "production",
  output: {
    filename: '[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
});


