import type {
  ReactServerEntrypointComponent,
  RendererServerEntrypointProps,
} from "@canonical/react-ssr/renderer";
import React from "react";

import { createRouter } from "../router.js";
import { RouterProvider } from "@tanstack/react-router";
import Showcase from "../ui/Showcase/Showcase.js";

export const serverRouter = createRouter();
const serverApp = <Showcase/>;
// const serverApp = <RouterProvider router={serverRouter} />;

const EntryServer: ReactServerEntrypointComponent<
  RendererServerEntrypointProps
> = ({ lang = "en", scriptTags, linkTags }: RendererServerEntrypointProps) => {
  return (
    <html lang={lang}>
      <head>
        <title>Canonical React Vite Boilerplate</title>
        {scriptTags}
        {linkTags}
      </head>
      <body>
        <div id="root">
            {serverApp}
        </div>
      </body>
    </html>
  );
};

export default EntryServer;
