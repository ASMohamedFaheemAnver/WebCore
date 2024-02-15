import Kiwi from "./kiwi.jpg";
import altText from "./text.txt";
function addImg() {
  const img = document.createElement("img");
  img.alt = altText;
  img.width = 300;
  img.src = Kiwi;
  const body = document.getElementById("body");
  body.appendChild(img);
}

export default addImg;
