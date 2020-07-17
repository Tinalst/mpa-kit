const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MediaQueryPlugin = require('media-query-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniSvgDataUrl = require('mini-svg-data-uri');

const fs = require('fs');
const path = require('path');
const pages =fs.readdirSync("./src/pages");
const outputPath = './assets/images/';


const base  = {
  entry: setEntry(pages),
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        exclude: /node_modules/,
        use:[
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:5].[ext]',
              outputPath: outputPath,
              limit: 2048
            }
          }
        ]
      },
      {
        test: /\.svg$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              generator: (content) => MiniSvgDataUrl(content.toString())
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MediaQueryPlugin({
      include: getPagesName(pages),
      queries:{
        'print, screen and (min-width: 768px) and (max-width: 1023px)': 'ipad',
        'print, screen and (min-width: 1024px)': 'desktop'
      }
    }),
    new CopyWebpackPlugin({
      patterns:[
        {from: path.join(process.cwd(), '/src/assets'), to: path.join(process.cwd(), '/dist/assets')}
      ]
    })
  ]
};

function setEntry(_pages) {
  const pagesObj = {};
  _pages.forEach(file => {
    const path = `./src/pages/${file}/${file}.js`;
    if(fs.existsSync(path)) {
      pagesObj[file] = path
    }
  });
  return pagesObj
}

(function(_pages) {
  _pages.forEach(v => {
    const _template = `./src/pages/${v}/${v}.html`;
    if(fs.existsSync(_template)){

      base.plugins.push(new HtmlWebpackPlugin({
       'meta': {
         'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
       },
       filename: `${v}.html`,
       template: _template,
       chunks: [v]
      }))
    }
  })
})(pages);

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

console.log('当前环境变量值', process.env.NODE_ENV, process.env.TINA);

