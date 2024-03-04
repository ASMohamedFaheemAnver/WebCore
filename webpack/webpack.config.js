// Until webpack 5, config doesn't support es5 features
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/",
    publicPath: "http://192.168.1.100:5500/dist/",
  },
  // mode: "production",
  mode: "none",
  module: {
    // asset/inline, asset/resource, asset, asset/source
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // maxSize: 3 * 100 * 1024, //3kB
          },
        },
      }, // By default this will treat size<8kB it will be inline otherwise it will be resource
      // { test: /\.(png|jpg)$/, type: "asset/resource" },
      // { test: /\.(png|jpg)$/, type: "asset/inline" },
      // { test: /\.(ttf)$/, type: "asset/resource" },
      { test: /\.(txt)$/, type: "asset/source" },
      {
        test: /\.(css)$/,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"], // To output css separately
      }, // css-loader reads the contents and return it, This will be inside bundle.js rather than separate file, style-loader will inject it to the dom
      {
        test: /\.(scss)$/,
        // use: ["style-loader", "css-loader", "sass-loader"],
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
    ],
  },
  plugins: [
    new TerserPlugin() /* TerserPlugin is installed by default in webpack5, Which use to minify the bundle, but I see mode=production also giving same results */,
    new MiniCssExtractPlugin({ filename: "style.css" }),
  ],
};
