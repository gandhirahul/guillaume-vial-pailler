const { merge } = require('webpack-merge');

const common = require('./webpack.common.js');

const port = process.env.NODE_PORT || 8081;
const host = process.env.IP || 'localhost';

const devtool = process.env.DEVTOOL || 'eval-source-map';

module.exports = merge(common, {
  mode: 'development',
  devtool,
  devServer: {
    host,
    contentBase: 'static/',
    historyApiFallback: true,
    disableHostCheck: true,
    port,
  },
});
