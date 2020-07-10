const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const fs = require('fs');
const pages =fs.readdirSync("./src/pages");
const HtmlWebpackPlugin = require('html-webpack-plugin');


const base  = {
  entry: setEntry(pages),
  output: {
    // publicPath: "/assets/"
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
};

function setEntry(_pages) {
  const pagesObj = {};
  _pages.forEach(file => {
    pagesObj[file] = `./src/pages/${file}/${file}.js`
  });
  return pagesObj
}

function setHtmlWebpackPage(_pages) {
  _pages.forEach(v => {
    base.plugins.push(new HtmlWebpackPlugin({
      'meta': {
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      filename: `${v}.html`,
      template: `./src/pages/${v}/${v}.html`,
      chunks: [v]
    }))
  })
}

setHtmlWebpackPage(pages);

module.exports = base;
