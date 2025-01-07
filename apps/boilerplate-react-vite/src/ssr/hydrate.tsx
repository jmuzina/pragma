import { hydrateRoot } from "react-dom/client";
import "../index.css";
import { StrictMode } from "react";
import Application from "../Application.js";

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <StrictMode>
    <Application />
  </StrictMode>,
);

console.log("hydrated");
