// import serverless from "serverless-http";
// import app from "../../api/server/server";
//
// export const handler = serverless(app);

import express from "express";
import serverless from "serverless-http";

const api = express();

api.use("/hello", (req, res) => res.send("Hello World!"));

export const handler = serverless(api);