const HtmlWebpackPlugin = require("html-webpack-plugin"); //installed via npm
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
const path = require("path");
const copyWebpackPlugin = require("copy-webpack-plugin");

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
    ],
  },
  resolve: { extensions: [".js", ".css", ".scss"] },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new MiniCssExtractPlugin({
      fileName: "[name].[hash].css",
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: "assets",
          to: "assets"
        }
      ]
    })
  ],
};
