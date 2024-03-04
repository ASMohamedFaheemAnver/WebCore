import Kiwi from "./img.jpg";
import "./kiwi.scss";

class KiwiImage {
  render() {
    const img = document.createElement("img");
    const body = document.querySelector("body");
    img.src = Kiwi;
    img.classList.add("kiwi");
    body.appendChild(img);
  }
}

export default KiwiImage;
