const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: path.resolve(__dirname),

  entry: "./index.js",

  resolve: {
    extensions: [".js"],
    modules: [path.resolve("./"), "node_modules"],
    fallback: {
      fs: false,
      path: false,
    },
  },
  output: {
    filename: "bundle.js",
    // the output bundle

    path: path.resolve(__dirname, "./" /*"./dist"*/),
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      Promise: "es6-promise",
      fetch:
        "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch",
    }),

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NoEmitOnErrorsPlugin(),
    // do not emit compiled assets that include errors
  ],

  devServer: {
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: false,
    hot: false,
    static: "./demo",
  },

  optimization: {
    minimize: false,
  },
};
