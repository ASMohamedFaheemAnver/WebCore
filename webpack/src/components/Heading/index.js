import "./heading.scss";

class Heading {
  render(content) {
    const h1 = document.createElement("h1");
    const body = document.querySelector("body");
    h1.textContent = content;
    body.appendChild(h1);
  }
}

export default Heading;
