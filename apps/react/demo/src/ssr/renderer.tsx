import {JSXRenderer} from "@canonical/react-ssr/renderer";
import {createMemoryHistory, RouterProvider} from "@tanstack/react-router";
import htmlString from "../../dist/client/index.html?raw";
import {createRouter} from "../router.js";
import {StartServer} from "@tanstack/react-start/server"; // Use the component
import EntryServer from "./entry-server.js";
import {Connect} from "vite";
import IncomingMessage = Connect.IncomingMessage;
import {
    createRequestHandler,
    defaultStreamHandler,
} from '@tanstack/react-start/server'
import { transformPipeableStreamWithRouter } from '@tanstack/start-server-core';
import {PipeableStream} from "react-dom/server";

const render = async (req: IncomingMessage, res) => {
    console.log("renderer bingus res", res);
    const router = createRouter();
    router.update({history: createMemoryHistory({initialEntries: [req.url || req.originalUrl || "/"]})});

    try {
        await router.load();

        if (router.state.redirect) {
            res.statusCode = router.state.redirect.code || 301;
            res.setHeader('Location', router.state.redirect.href);
            res.end();
            return;
        }
        return createRequestHandler({createRouter, request: req, response: res})((({request, router, responseHeaders}) => {
            const renderer = new JSXRenderer(({children, ...props}) => (
                <EntryServer {...props}>
                    <RouterProvider router={router}>
                        <StartServer router={router}/>
                    </RouterProvider>
                </EntryServer>
            ), {
                htmlString,
            });

            const passthrough: PipeableStream = renderer.renderComponentToPassthrough(req);
            const stream = transformPipeableStreamWithRouter(router, passthrough);
            stream.pipe(res);
        }))

    } catch (error) {
        console.error("SSR Application Error:", error);
        if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end("Internal Server Error");
        }
    }
};

export default render;
