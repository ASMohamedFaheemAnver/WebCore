// webpack.config.js
module.exports = {
  entry: "./index.tsx",
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.css?$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
