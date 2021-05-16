const webpack = require('webpack')
const {
  merge
} = require('webpack-merge')
const nodeExternals = require('webpack-node-externals');
const common = require('./webpack.common.js')
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path= require('path')

module.exports = merge(common, {
  target: 'web',
  mode: 'production',
  entry: path.resolve(__dirname, "../src/index.js"),
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
    // publicPath: "/",
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"]
          }
        }
      }),
      new OptimizeCssAssetsPlugin()
    ]
  },
  plugins: [
    
  ]
})