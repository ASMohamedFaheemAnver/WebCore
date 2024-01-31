// webpack.config.js
module.exports = {
  entry: "./index.jsx",
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
      },
    ],
  },
};
