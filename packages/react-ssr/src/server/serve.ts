import type { IncomingMessage, ServerResponse } from "node:http";
import type { RenderHandler } from "../renderer/index.js";

export function serveStream(handler: RenderHandler) {
  return (req: IncomingMessage, res: ServerResponse) => {
    try {
      res.setHeader("Content-Type", "text/html");
      res.setHeader("Transfer-Encoding", "chunked");
      handler(req, res);
    } catch (error) {
      console.error("Error during rendering:", error);
      res.statusCode = 500;
      res.end("Internal server error");
    }
  };
}
