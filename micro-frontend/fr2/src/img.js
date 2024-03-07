import Meme from "./meme.jpg";
import altText from "./text.txt";
function addImg() {
  const img = document.createElement("img");
  img.alt = altText;
  img.width = 300;
  img.src = Meme;
  const body = document.getElementById("body"); // Generated html don't have id body in it's dom
  body.appendChild(img);
}

export default addImg;
