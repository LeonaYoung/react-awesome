const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    contentBase: './dist',
    port: 8080,
    hot: true,
    proxy: {
      '/user/list': 'http://localhost:3000',
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
};
