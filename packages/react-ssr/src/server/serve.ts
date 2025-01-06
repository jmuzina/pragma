#!/usr/bin/env node

import path from "path";
import { resolve } from "path";
import { parseArgs } from "util";
import express from "express";

// Parse command-line arguments using util.parseArgs
const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    port: {
      type: "string",
      alias: "p",
      default: "5173",
    },
    static: {
      type: "string",
      alias: "s",
      default: "dist/client",
    },
  },
  strict: true,
  allowPositionals: true,
});

const port = parseInt(values.port, 10) || 5173;
const rendererFilePath = positionals[0];

if (!rendererFilePath) {
  console.error(
    "Renderer file path is required. Usage: node script.js [--port <port>] <rendererFilePath>",
  );
  process.exit(1);
}

// Resolve renderer file path relative to the current working directory
const cwd = process.cwd();
const resolvedRendererFilePath = resolve(cwd, rendererFilePath);
console.log("Current working directory: ", cwd);
const staticDirs = [path.join(cwd, values.static), path.join(cwd, "public")];

const app = express();

// Serve static files from specified directories
staticDirs.forEach((dir) => {
  console.log(`Serving static files from: ${dir}`);
  app.use(express.static(dir));
});

// Dynamic request handling using renderer
app.use(async (req, res, next) => {
  try {
    const handler = await import(resolvedRendererFilePath).then(
      (module) => module.handler,
    );
    const stream = await handler(req, null);
    res.setHeader("Content-Type", "text/html");
    stream.pipe(res);
  } catch (error) {
    console.error("Error loading renderer:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
