const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    autoprefixer({
      grid: true,
    }),
    postcssPresetEnv({
      stage: 2
    })
  ]
};
