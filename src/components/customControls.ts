import Control from "ol/control/Control";

// Create a custom control
class MyCustomControl extends Control {
  constructor() {
    const button = document.createElement("button");
    button.innerHTML = "Click Me";
    button.addEventListener("click", () => {
      alert("Custom control clicked!");
    });

    const element = document.createElement("div");
    element.className = "my-custom-control ol-unselectable ol-control";
    element.appendChild(button);

    super({
      element: element,
    });
  }
}

export const myControl = new MyCustomControl();
