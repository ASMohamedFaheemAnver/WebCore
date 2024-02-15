import Kiwi from "./kiwi.jpg";
function addImg() {
  const img = document.createElement("img");
  img.alt = "Kiwi";
  img.width = 300;
  img.src = Kiwi;
  const body = document.getElementById("body");
  body.appendChild(img);
}

export default addImg;
