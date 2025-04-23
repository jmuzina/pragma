import { createRoot, hydrateRoot } from "react-dom/client"; // Import both
import "../index.css";
import { createRouter } from "../router.js";
import {createBrowserHistory, RouterProvider} from "@tanstack/react-router";
import { renderToString } from "react-dom/server";
import Showcase from "../ui/Showcase/Showcase.js";
import {StartClient} from "@tanstack/react-start";
import {StrictMode} from "react";

export const clientRouter = createRouter();
clientRouter.update({history: createBrowserHistory()});

hydrateRoot(document.getElementById("root"), <StrictMode><RouterProvider router={clientRouter}/></StrictMode>);
