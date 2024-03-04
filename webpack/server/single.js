const express = require("express");
const { readFileSync } = require("fs");
const app = express();
const path = require("path");

const PORT = 5500;

app.use("/dist", express.static(path.resolve(__dirname, "../dist")));

app.get("/" /* "*" */, (req, res) => {
  // res.json({ msg: "200K OK!" });
  const pathToIndexHTML = path.join(__dirname, "../dist/index.html");
  const contentFromHTML = readFileSync(pathToIndexHTML, "utf-8");
  res.send(contentFromHTML);
});

app.listen(PORT, () => {
  console.log(`Application is running on port : ${PORT}`);
});
