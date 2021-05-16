const path = require('path')
const webpack = require('webpack');
const config = require("./config")
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const WebpackBar = require("webpackbar");
const os = require('os');
const threadPool = os.cpus().length - 1;
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

class Reporter {
  done(context) {
    if (config.isDev) {
      console.clear();
      console.log(`启动成功:${config.SERVER_HOST}:${config.SERVER_PORT}`);
    }
  }
}

const {
  getCssLoaders
} = require("./utils");

module.exports = {
  
  module: {
    rules: [{
        test: /\.(tsx?|js)$/,
        use: [{
            loader: 'thread-loader',
            options: {
              workers: threadPool // 进程2个
            }
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            },
          }
        ],

        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: getCssLoaders(1),
        // exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          ...getCssLoaders(2),
          {
            loader: 'sass-loader',
            options: {
              sourceMap: config.isDev
            },
          }
        ],
        exclude: /node_modules/
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [{
          loader: 'file-loader',
          options: {
            limit: 10 * 1024,
            name: "static/img/[name].[ext]",
            esModule: false
          },
        }],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: "static/font/[name].[ext]",
            esModule: false
          },
        }],
      },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        },
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        }
      }
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, '../src'),
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
      ignoreOrder: false,
    }),
    new WebpackBar({
      name: config.isDev ? "正在启动" : "正在打包",
      color: "#fa8c16",
      reporter: new Reporter()
    }),
		new FriendlyErrorsWebpackPlugin(),
    
  ],
	stats: "errors-only",

}