const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/landing.js",
  output: {
    // filename: "bundle.[contenthash].js",
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://192.168.1.100:5500/dist/",
  },
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all", // This will split reused libraries and make the bundle smaller
      minSize: 3000, // if more than ~3kb make it as separate bundle file
    },
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env"] },
        },
      },
      {
        test: /\.(hbs)$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        path.join(process.cwd(), "build/**/*"),
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
    new HtmlWebpackPlugin({
      filename: "landing.html",
      template: "./src/landing.hbs",
      title: "LANDING PAGE!",
      meta: {
        description: "LANDING META!",
      },
    }),
  ],
};
