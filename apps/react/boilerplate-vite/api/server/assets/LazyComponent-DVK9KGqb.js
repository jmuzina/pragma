import { jsx } from "react/jsx-runtime";
import { B as Button } from "../server.js";
import "node:process";
import "express";
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
