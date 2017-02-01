var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
      "vendor": "./app/vendor",
      "app": "./app/main"
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
        {
            test: /\.ts/,
            loaders: ['ts-loader'],
            exclude: /node_modules/
        },
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader'
        },
        {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        },
        {
            test: /\.png$/,
            loader: 'url-loader?limit=100000'
        },
        {
            test: /\.jpg$/,
            loader: 'file-loader'
        },
        {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader'
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
        }
    ]
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
     /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
     __dirname
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    }),

    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
