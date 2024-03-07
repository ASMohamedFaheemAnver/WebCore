// es6
import "./index.css";
import Kiwi from "./components/Kiwi/kiwi";

const kiwi = new Kiwi();
kiwi.render();

import("Landing/Heading")
  .then((HeadingModule) => {
    const Heading = HeadingModule.default;
    const heading1 = new Heading();
    heading1.render("HEADING 1");
  })
  .catch((e) => {
    console.log({ e });
  }); // Remote bundles are loaded async
