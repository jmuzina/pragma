// src/ssr/entry-client.tsx (Robust Version for Dev/Prod)

import { createRoot, hydrateRoot } from "react-dom/client"; // Import both
import "../index.css";
import { createRouter } from "../router.js";
import { RouterProvider } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";

export const clientRouter = createRouter();
const container = document.getElementById("root") as HTMLElement;

if (import.meta.env.DEV) {
  // Development: Use createRoot
  console.log("Running in DEV mode, using createRoot");
  const root = createRoot(container);
  root.render(
    // Optional: <React.StrictMode>
    <RouterProvider router={clientRouter} />,
    // </React.StrictMode>
  );
} else {
  // Production: Use hydrateRoot
  console.log("Running in PROD mode, using hydrateRoot");
  hydrateRoot(container, <RouterProvider router={clientRouter} />);
}
