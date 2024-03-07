const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/landing.js",
  output: {
    // filename: "bundle.js",
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://192.168.1.100:5500/dist/",
  },
  mode: "development",
  optimization: {
    splitChunks: {
      chunks: "all", // This will split reused libraries and make the bundle smaller
      minSize: 3000, // if more than ~3kb make it as separate bundle file
    },
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
