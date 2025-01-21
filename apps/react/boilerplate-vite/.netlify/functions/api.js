// import serverless from "serverless-http";
// import app from "../../api/server/server";
// export const handler = serverless(app);

import { serveStream } from "@canonical/react-ssr/server";
import express, { Router } from "express";
import serverless from "serverless-http";
import render from "../../src/ssr/renderer.js";

const api = express();
const router = Router();

router.get("/hello", (req, res) => res.send("Hello World!"));

// tmp, refactor me to just serve the app itself
router.use("/ssr", serveStream(render));
api.use("/(assets|public)", express.static("api/client/assets"));

api.use("/api/", router);

export const handler = serverless(api);