import { hydrateRoot } from "react-dom/client";
import "../index.css";
import Application, { createRouter } from "../Application.js";

export const clientRouter = createRouter();

hydrateRoot(
  document.getElementById("root") as HTMLElement,
  <Application router={clientRouter} />,
);
console.log("hydrated");
