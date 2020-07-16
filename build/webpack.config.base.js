const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const fs = require('fs');
const pages =fs.readdirSync("./src/pages");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MediaQueryPlugin = require('media-query-plugin');

const base  = {
  entry: setEntry(pages),
  plugins: [
    new CleanWebpackPlugin(),
    new MediaQueryPlugin({
      include: getPagesName(pages),
      queries:{
        'print, screen and (min-width: 768px)': 'ipad',
        'print, screen and (min-width: 1024px)': 'desktop'
      }
    })
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

function getPagesName(pages) {
  const _include = [];
  pages.forEach(v => {
    _include.push(v)
  });
  return _include
}

exports.base = base;
exports.getCssLoaderOptions = function () {
    return {
    loader: 'css-loader',
    options: {
      localsConvention: 'camelCase',
      importLoaders: 1,
      modules: {
        mode: (resourcePath) => {
          if(/-scop/i.test(resourcePath)){
            return 'local'
          }
          return 'global';
        },
        localIdentName: '[name]__[local]__[hash:base64:5]',
        exportGlobals: true
      }
    }
  }
};


