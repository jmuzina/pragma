import serverless from "serverless-http";
import app from "../../src/ssr/server";

export const handler = serverless(app);