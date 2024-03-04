// es6
import { lowerFirst } from "lodash";
import Heading from "./components/Heading";
import Kiwi from "./components/Kiwi/kiwi";

const heading = new Heading();
heading.render(lowerFirst("HEADING FROM KIWI"));

const kiwi = new Kiwi();
kiwi.render();
