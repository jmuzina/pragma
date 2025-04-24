import { hydrateRoot } from "react-dom/client"; // Import both
import "../index.css";
import { createRouter } from "../router.js";
import {createBrowserHistory, RouterProvider} from "@tanstack/react-router";
import {StartClient} from "@tanstack/react-start";
import EntryServer from "./entry-server.js";
import {StartServer} from "@tanstack/react-start/server";

export const clientRouter = createRouter();
clientRouter.update({history: createBrowserHistory()});

hydrateRoot(document.getElementById("root"),
    <RouterProvider router={clientRouter}>
        <StartClient router={clientRouter}/>
    </RouterProvider>
);
