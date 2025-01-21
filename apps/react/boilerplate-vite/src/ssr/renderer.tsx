import { JSXRenderer } from "@canonical/react-ssr/renderer";
import htmlString from "../../api/client/index.html?raw";
import EntryServer from "./entry-server.js";

const Renderer = new JSXRenderer(EntryServer, {
  htmlString,
});

//@ts-ignore
export async function GET(req, res) {
  // res.setHeader("Content-Type", "text/html");
  // res.setHeader("Transfer-Encoding", "chunked");
  // Renderer.render(req, res);
  res.send("this is a test");
}

export default Renderer.render;