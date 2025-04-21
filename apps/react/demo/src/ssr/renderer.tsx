import { JSXRenderer } from "@canonical/react-ssr/renderer";
import { createMemoryHistory } from "@tanstack/react-router";
import htmlString from "../../dist/client/index.html?raw";
import EntryServer, { serverRouter } from "./entry-server.js";

const Renderer = new JSXRenderer(EntryServer, {
  htmlString,
});

const render = async (req, res) => {
  const memoryHistory = createMemoryHistory({
    initialEntries: [req.originalUrl],
  });

  serverRouter.update({
    history: memoryHistory,
    context: {
      ...serverRouter.options.context,
    },
  });

  await serverRouter.load();

  if (serverRouter.hasNotFoundMatch()) {
    console.warn("not found", req);
    // 404?
  }

  return Renderer.render(req, res);
};

export default render;
