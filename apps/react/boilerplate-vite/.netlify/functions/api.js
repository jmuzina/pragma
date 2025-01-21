import serverless from "serverless-http";
import app from "../../api/server/server";

export const handler = serverless(app);