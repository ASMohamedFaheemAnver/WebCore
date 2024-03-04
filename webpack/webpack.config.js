// Until webpack 5, config doesn't support es5 features
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js", // contenthash will generate new file name only if the content inside the file changes
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "dist/",
    publicPath: "http://192.168.1.100:5500/dist/",
    // clean: true, // Same as CleanWebpackPlugin with default config
    // clean: {
    //   dry: true,
    //   keep: /\.css/,
    // },
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
    new MiniCssExtractPlugin({ filename: "style.[contenthash].css" }), // contenthash will generate new file name only if the content inside the file changes
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*", // Default paths
        path.join(process.cwd(), "build/**/*"), // Can add more paths like this
      ], // This patterns related to output path we gave above in output.path
    }), // To clean dist on restart
  ],
};
