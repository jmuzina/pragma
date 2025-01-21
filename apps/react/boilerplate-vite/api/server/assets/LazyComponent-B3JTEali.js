import { jsx } from "react/jsx-runtime";
import { B as Button } from "../renderer.js";
import "react";
import "react-dom/server";
import "htmlparser2";
function LazyComponent() {
  return /* @__PURE__ */ jsx(
    Button,
    {
      appearance: "positive",
      label: "Click me",
      onClick: () => alert("clicked!")
    }
  );
}
export {
  LazyComponent as default
};
