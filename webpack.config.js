const path = require('path');

module.exports = {
  entry: './src/Init.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'prod'),
  },
  watch:true
};