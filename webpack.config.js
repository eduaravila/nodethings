var path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "react_rest", "app", "src", "app.js"),
  output: {
    path: path.join(__dirname, "react_rest", "app", "public", "static"),
    publicPath: "/static",
    filename: "foo.bundle.js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.scss$|\.css$/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "react_rest", "app", "public"),
    compress: true,
    port: 9000,
    hotOnly: true,
    historyApiFallback: true
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],
  watch: true
};
