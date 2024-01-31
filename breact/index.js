import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [count, setCount] = useState(0);

  return React.createElement("div", {}, [
    React.createElement("h1", { key: "h1" }, count),
    React.createElement(
      "button",
      {
        onClick: () => setCount((preCount) => preCount + 1),
        key: "button",
      },
      "Increment"
    ),
  ]);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App, { key: "app" }));
