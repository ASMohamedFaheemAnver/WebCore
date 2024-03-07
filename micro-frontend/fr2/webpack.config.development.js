const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/kiwi.js",
  output: {
    // filename: "bundle.js",
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:5505/",
  },
  mode: "development",
  optimization: {
    splitChunks: {
      chunks: "all", // This will split reused libraries and make the bundle smaller
      minSize: 3000, // if more than ~3kb make it as separate bundle file
    },
  },
  devServer: {
    port: 5505,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {},
        },
      },
      { test: /\.(txt)$/, type: "asset/source" },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
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
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: [
      //   "**/*",
      //   path.join(process.cwd(), "build/**/*"),
      // ],
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public" }],
    }),
    new HtmlWebpackPlugin({
      filename: "kiwi.html",
      template: "./src/kiwi.hbs",
      title: "KIWI PAGE!",
      meta: {
        description: "KIWI META!",
      },
    }),
    new ModuleFederationPlugin({
      name: "Kiwi",
      remotes: {
        Landing: "Landing@http://localhost:5500/remoteEntry.js",
      },
    }),
  ],
};
