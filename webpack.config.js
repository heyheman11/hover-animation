const HtmlWebpackPlugin = require("html-webpack-plugin"); //installed via npm
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const copyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

console.log(process.env.GH_PATH);
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: process.env.NODE_ENV === "development" },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
  resolve: { extensions: [".js", ".css", ".scss"] },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.GH_PATH": JSON.stringify(process.env.GH_PATH),
    }),
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new MiniCssExtractPlugin({
      fileName: "[name].[hash].css",
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: "assets",
          to: "assets",
        },
      ],
    }),
  ],
};
