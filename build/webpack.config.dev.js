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
          'css-loader',
          MediaQueryPlugin.loader,
          'sass-loader']
      }
    ]
  },
  // plugins:[
  //   new MediaQueryPlugin({
  //     include: getPagesName(pages),
  //     queries:{
  //       'print, screen and (min-width: 768px)': 'ipad',
  //       'print, screen and (min-width: 1024px)': 'desktop'
  //     }
  //   })
  // ]
});

// function getPagesName(pages) {
//   const _include = [];
//   pages.forEach(v => {
//     _include.push(v)
//   });
//   return _include
// }
