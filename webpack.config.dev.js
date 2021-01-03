const actualwebpack = require('./webpack.config');
const path = require('path');

module.exports = {
  ...actualwebpack,
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'chess_stats.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3001,
    publicPath: 'http://localhost:3001/dist/',
    hotOnly: true
  }
};