const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  target: 'node',
  devtool: false,
  watch: false,
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "deploy"),
    filename: "app.js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: false,
        terserOptions: {
          compress: true,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
