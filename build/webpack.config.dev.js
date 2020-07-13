const {merge} = require('webpack-merge');
const base = require('./webpack.config.base');


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
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
});
