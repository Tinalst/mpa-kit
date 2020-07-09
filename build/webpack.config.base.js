const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const fs = require('fs');
const pages =fs.readdirSync("./src/pages");
module.exports = {
  entry: () => {
    const pagesObj = {};
    pages.forEach(v => {
      pagesObj[v] = `./src/pages/${v}/index.js`
    });
    return pagesObj
  },
  // entry: ()=> {
  //   'home': './src/pages/home/index.js'
  // },
  plugins: [
    new CleanWebpackPlugin()
  ]
};
