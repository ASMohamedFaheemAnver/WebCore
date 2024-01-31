// webpack.config.js
module.exports = {
  entry: "./index.js",
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: "babel-loader",
      },
    ],
  },
};
