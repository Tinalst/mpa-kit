const {merge} = require('webpack-merge');
const base = require('./webpack.config.base');


module.exports = merge(base, {
  mode: "development",
  devServer: {
    port: 9999,
    publicPath: '/dist',
    open: true
  }
});
