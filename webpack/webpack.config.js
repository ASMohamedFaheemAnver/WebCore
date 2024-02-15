// Until webpack 5, config doesn't support es5 features
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  mode: "production",
  // mode: "none",
  module: {
    // asset/inline, asset/resource, asset, asset/source
    rules: [
      { test: /\.(png|jpg)$/, type: "asset/resource" },
      // { test: /\.(ttf)$/, type: "asset/resource" },
    ],
  },
};