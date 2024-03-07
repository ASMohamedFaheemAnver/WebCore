// es6
import "./override.scss";
import hw from "./hw";
import Heading from "./components/Heading";
import { lowerFirst } from "lodash";

const heading = new Heading();
heading.render(lowerFirst("HEADING FROM LANDING"));
// heading.render("HEADING2");

// Legacy/es5
// const hw = require("./hw");
hw();
