import serverless from "serverless-http";
import app from "../../api/server/server";

app.get("/hello", (req, res) => res.send("Hello World!"));

// // tmp, refactor me to just serve the app itself
// router.use("/ssr", serveStream(render));
// api.use("/(assets|public)", express.static("api/client/assets"));
//

export const handler = serverless(app);