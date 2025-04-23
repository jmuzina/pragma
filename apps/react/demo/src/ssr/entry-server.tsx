import type {
    ReactServerEntrypointComponent,
    RendererServerEntrypointProps,
} from "@canonical/react-ssr/renderer";
import React, {StrictMode} from "react";

import {RouterProvider} from "@tanstack/react-router";

const EntryServer: ReactServerEntrypointComponent<
    RendererServerEntrypointProps
> = ({lang = "en", scriptTags, linkTags, router}: RendererServerEntrypointProps) => {
    return (
        <html lang={lang}>
        <head>
            <title>Canonical React Vite Boilerplate</title>
            {scriptTags}
            {linkTags}
        </head>
        <body>
        <div id="root">
            <StrictMode><RouterProvider router={router}/></StrictMode>
        </div>
        </body>
        </html>
    );
};

export default EntryServer;
