const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/landing.js",
  output: {
    // filename: "bundle.[contenthash].js",
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:5500/", // Assuming we serve the build using express
  },
  mode: "production",
  optimization: {
    // splitChunks: {
    //   chunks: "all", // This will split reused libraries and make the bundle smaller
    //   minSize: 3000, // if more than ~3kb make it as separate bundle file
    // },
    splitChunks: false, // To make Module federation work
    // https://stackoverflow.com/questions/72450607/webpack-module-federation-error-scriptexternalloaderror-loading-script-failed
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
    new ModuleFederationPlugin({
      name: "Landing",
      filename: "remoteEntry.js",
      exposes: {
        "./Heading": "./src/components/Heading/index.js", // This to expose the components
      },
    }),
  ],
};
