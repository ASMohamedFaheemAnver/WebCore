// es6
import "./index.css";
import "./override.scss";
import hw from "./hw";
import addImg from "./img";
import Heading from "./components/Heading";

// Legacy/es5
// const hw = require("./hw");
hw();
addImg();

const heading = new Heading();
heading.render("HEADING1");
heading.render("HEADING2");
