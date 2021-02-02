const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components')
  .default;

const styledComponentsTransformer = createStyledComponentsTransformer();

const babelrc = JSON.parse(
  fs.readFileSync(path.join(__dirname, '.babelrc'), 'utf-8').toString()
);

const entry = ['babel-polyfill', './src/index.tsx'];

module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, 'static/dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: '../index.html',
      inject: 'body',
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: Object.assign({}, babelrc, {
              presets: babelrc.presets.map((p) =>
                p === 'es2015' ? ['es2015', { modules: false }] : p
              ),
            }),
          },
        ],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [styledComponentsTransformer],
          }),
        },
      },
      {
        test: /\.(bmp|gif|jpg|jpeg|png|svg|webp|eot|woff|ttf|otf)$/,
        use: { loader: 'url-loader', options: { limit: 8129 } },
      },
    ],
  },
};
