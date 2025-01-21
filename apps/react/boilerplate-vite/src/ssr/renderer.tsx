import { JSXRenderer } from "@canonical/react-ssr/renderer";
import htmlString from "../../api/client/index.html?raw";
import EntryServer from "./entry-server.js";

const Renderer = new JSXRenderer(EntryServer, {
  htmlString,
});

//@ts-ignore
export const GET = Renderer.render;

export default Renderer.render;