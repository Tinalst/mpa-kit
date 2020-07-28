const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MediaQueryPlugin = require('media-query-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniSvgDataUrl = require('mini-svg-data-uri');
const PreloadWepackPlugin = require('preload-webpack-plugin');

const fs = require('fs');
const path = require('path');
const outputPath = './assets/images/';
const MODULE_CONFIG = require('../module-config.js');


const base  = {
  entry: setEntry2(MODULE_CONFIG),
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
      },
      {
        test: /\.html$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false
            }
          }
        ]
      },
      {
        test: /\.(js|ts)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  externals: {
    'numeral': 'numeral'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MediaQueryPlugin({
      include: getPagesName2(MODULE_CONFIG),
      queries:{
        'print, screen and (min-width: 768px) and (max-width: 1023px)': 'ipad',
        'print, screen and (min-width: 1024px)': 'desktop'
      }
    }),
    new CopyWebpackPlugin({
      patterns:[
        {from: path.join(process.cwd(), '/src/assets/public/'), to: path.join(process.cwd(), '/dist/assets/public')}
      ]
    })
  ]
};

function setEntry2(_pages) {
  const pagesObj = {};
  if(_pages instanceof Object || (_pages instanceof Array && _pages.length < 1)) throw new Error('require entries');
  _pages.forEach((item, index) => {
    const _moduelUrl = item['moduelUrl'];
    if(!_moduelUrl) throw new Error('invaliad _moduelUrl value');
    if(!(/\/\w*\.(js|ts)$/ig.test(_moduelUrl))) throw new Error(`module-conifg[${index}]['moduelUrl'] must be js file`);

    const _file = _moduelUrl.match(/\w*\.(js|ts)$/ig)[0].split('.')[0];
    const path = generateAbsolutePath(item['moduelUrl']);

    if(fs.existsSync(path)) {
      pagesObj[_file] = path
    }else {
     throw new Error(`${path} doesn't exist.`)
    }
  });

  return pagesObj
}

(function(_pages) {
  if(_pages instanceof Object || (_pages instanceof Array && _pages.length < 1)) throw new Error('require entries');
  _pages.forEach((item, index) => {
    const _templateUrl = item['templateUrl'];
    const _moduelUrl = item['moduelUrl'];

    if(!_templateUrl) throw new Error('invalid templateUrl value');
    if(!(/\/\w*\.(html)$/ig.test(_templateUrl))) throw new Error(`module-conifg[${index}]['templateUrl'] must be html file`);

    const _templatePath = generateAbsolutePath(item['templateUrl']);
    const _fileName = _templateUrl.match(/\w*\.html$/ig)[0].split('.')[0];

    const _file = _moduelUrl.match(/\w*\.(js|ts)$/ig)[0].split('.')[0];
    if(fs.existsSync(_templatePath)){
      base.plugins.push(
        new HtmlWebpackPlugin({
          'meta': {
            'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
          },
          filename: `${_fileName}.html`,
          template: _templatePath,
          chunks: [_file]
        })
      )

    }else {
      throw new Error(`${path} doesn't exist.`)
    }

    if(index === _pages.length-1) {
      addPreloadPlugin(MODULE_CONFIG);
    }
  })
})(MODULE_CONFIG);

function addPreloadPlugin(_pages) {
  const _include = {
    isPrefetch: [],
    isPreload: []
  };
  if(_pages instanceof Object || (_pages instanceof Array && _pages.length < 1)) throw new Error('require entries');
  _pages.forEach((item) => {
    const _moduelUrl = item['moduelUrl'];
    if(item['isPrefetch']) _include.isPrefetch.push(getModuleName(_moduelUrl));
    if(item['isPreload']) _include.isPreload.push(getModuleName(_moduelUrl))
  });

  console.log(_include);
  if(_include.isPrefetch.length > 0) {
    base.plugins.push(
      new PreloadWepackPlugin({
        rel: 'prefetch',
        include: _include.isPrefetch,
        fileBlacklist: [/\.map/]
      })
    )
  }

  if(_include.isPreload.length > 0) {
    base.plugins.push(
      new PreloadWepackPlugin({
        rel: 'preload',
        include: _include.isPreload,
        fileBlacklist: [/\.map/]
      })
    )
  }
}

function getModuleName(moduleUrl) {
  return moduleUrl.match(/\w*\.(js|ts)$/ig)[0].split('.')[0];
}

function getPagesName2(_pages) {
  const _include = [];
  if(_pages instanceof Object || (_pages instanceof Array && _pages.length < 1)) throw new Error('require entries');

  _pages.forEach(item => {

    const _moduelUrl = item['moduelUrl'];
    const _file = _moduelUrl.match(/\w*\.(js|ts)$/ig)[0].split('.')[0];
    _include.push(_file)
  });
  return _include
}

function generateAbsolutePath(relativePath) {
  return path.join(__dirname, relativePath);
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

