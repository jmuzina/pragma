import { createRoot, hydrateRoot } from "react-dom/client"; // Import both
import "../index.css";
import { createRouter } from "../router.js";
import { RouterProvider } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";
import Showcase from "../ui/Showcase/Showcase.js";

export const clientRouter = createRouter();
const container = document.getElementById("root") as HTMLElement;

const clientApp = <RouterProvider router={clientRouter}/>
// const clientApp = <Showcase/>;

if (import.meta.env.DEV) {
  console.log("Running in DEV mode, using createRoot");
  const root = createRoot(container);
  root.render(clientApp);
} else {
  console.log("Running in PROD mode, using hydrateRoot");
  hydrateRoot(container, clientApp);
}
