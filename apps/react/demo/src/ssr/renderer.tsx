import {JSXRenderer} from "@canonical/react-ssr/renderer";
import {createMemoryHistory} from "@tanstack/react-router";
import htmlString from "../../dist/client/index.html?raw";
import EntryServer from "./entry-server.js";
import {createRouter} from "../router.js"; // Your router setup
import { DehydrateRouter } from '@tanstack/react-router';

const Renderer = new JSXRenderer(EntryServer, {
    htmlString,
});

import {createStartHandler, createRequestHandler} from '@tanstack/react-start/server';

const render = async (req, res) => {
    const router = createRouter();
    router.update({history: createMemoryHistory({initialEntries: [req.url || req.originalUrl || "/"]})});
    await router.load();

    const startHandler = createRequestHandler({
        createRouter: () => router,
        getRouterManifest: () => router.manifest,
        request: req
    });

    const startResponse = await startHandler(cb => {
        return cb.router;
    });

    startResponse.body?.pipeTo(res);
    Renderer.render(req, res, {router});


};

export default render;