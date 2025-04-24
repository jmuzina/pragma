import type {
    ReactServerEntrypointComponent,
    RendererServerEntrypointProps,
} from "@canonical/react-ssr/renderer";
import type {ReactNode} from "react";
import {
    createRequestHandler,
    defaultStreamHandler,
} from '@tanstack/react-start/server'

import {RouterProvider} from "@tanstack/react-router";

const EntryServer: ReactServerEntrypointComponent<
    RendererServerEntrypointProps & {children: ReactNode}
> = ({lang = "en", scriptTags, linkTags, children}: RendererServerEntrypointProps & {children: ReactNode}) => {
    return (
        <html lang={lang}>
        <head>
            <title>Canonical React Vite Boilerplate</title>
            {scriptTags}
            {linkTags}
        </head>
        <body>
        <div id="root">
            {children}
        </div>
        </body>
        </html>
    );
};

export default EntryServer;
