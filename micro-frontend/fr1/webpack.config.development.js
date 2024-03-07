const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/landing.js",
  output: {
    // filename: "bundle.js",
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:5500/", // Assuming we serve the build using express
  },
  mode: "development",
  optimization: {
    // splitChunks: {
    //   chunks: "all", // This will split reused libraries and make the bundle smaller
    //   minSize: 3000, // if more than ~3kb make it as separate bundle file
    // },
    splitChunks: false, // To make Module federation work
    // https://stackoverflow.com/questions/72450607/webpack-module-federation-error-scriptexternalloaderror-loading-script-failed
    // This below idea not working, Check this with it
    // https://stackoverflow.com/questions/50055537/in-webpack-4-how-to-only-splitchunks-on-one-entry
  },
  devServer: {
    port: 5500,
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
