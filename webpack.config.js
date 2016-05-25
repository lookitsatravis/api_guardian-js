var path = require("path");
var webpack = require("webpack");

var NODE_ENV = process.env.NODE_ENV || 'development';
var DEVELOPMENT = NODE_ENV === 'development';
var PRODUCTION = NODE_ENV === 'production';

var config = {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "api_guardian.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      __DEV__: DEVELOPMENT,
      __PRODUCTION__: PRODUCTION
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

module.exports = config;
