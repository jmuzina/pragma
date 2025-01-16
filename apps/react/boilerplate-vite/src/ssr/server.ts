import * as process from "node:process";
import { serveStream } from "@canonical/react-ssr/server";
import express from "express";
import render from "./renderer.js";

const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

app.use("/(assets|public)", express.static("dist/client/assets"));

export const GET = serveStream(render);

app.use(GET);

// In development, directly listen with express.
// In production, Vercel will serve the named `GET` export.
if (NODE_ENV === "development") {
  const PORT = process.env.PORT || 5173;
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`);
  });
}

export default app;
