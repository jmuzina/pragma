import type { IncomingMessage, ServerResponse } from "node:http";
import type * as React from "react";
import { createElement } from "react";
import { type PipeableStream, renderToPipeableStream } from "react-dom/server";
import Extractor from "./Extractor.js";

interface RendererOptions {
  defaultLocale?: string;
  loadMessages?: (locale: string) => string;
  htmlString?: string;
  bootstrapModules?: string[];
  bootstrapScriptContent?: string;
}

// Expose the types for the rendering function for better type-safety in server code and caller code
export type RenderResult = PipeableStream;
export type RenderHandler = (
  req: IncomingMessage,
  res: ServerResponse,
) => Promise<RenderResult>;

// This class is responsible for rendering a React component to a readable stream.
export default class Renderer {
  private locale: string | undefined;
  // private messages: any;
  private extractor: Extractor | undefined;

  constructor(
    // biome-ignore lint/suspicious/noExplicitAny: explicit any needed for the component props
    private readonly Component: React.ComponentType<any>,
    private readonly options: RendererOptions = {},
  ) {
    // this.prepareLocale = this.prepareLocale.bind(this);
    this.render = this.render.bind(this);
    this.extractor = this.options.htmlString
      ? new Extractor(this.options.htmlString)
      : undefined;
  }

  //async prepareLocale(header: string | undefined) {
  //  if (this.options.loadMessages) {
  //    this.locale = header
  //      ? header.slice(0, 2)
  //      : this.options.defaultLocale || "en";
  //    //this.messages = await this.options.loadMessages(this.locale);
  //  }
  //}

  /**
   * Renders this renderer's JSX component as a transmittable stream and sends it to the client
   * @param req Client's request
   * @param res Response object that will be sent to the client
   * @return {Promise<>RenderResult>} The stream that was sent to the client
   */
  render: RenderHandler = async (
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<RenderResult> => {
    return new Promise((resolve, reject) => {
      // await this.prepareLocale(req.headers.get("accept-language") || undefined);
      const jsx = createElement(this.Component, {
        lang: this.locale,
        scriptTags: this.extractor?.getScriptTags(),
        linkTags: this.extractor?.getLinkTags(),
        //messages: this.messages,
      });

      let renderingError: Error;

      const jsxStream = renderToPipeableStream(jsx, {
        // Early error, before the shell is prepared
        onShellError() {
          res
            .writeHead(500, { "Content-Type": "text/html; charset=utf-8" })
            .end("<h1>Something went wrong</h1>");
          reject(
            new Error("An error occurred while constructing the SSR shell"),
          );
        },
        onShellReady() {
          res.writeHead(renderingError ? 500 : 200, {
            "Content-Type": "text/html; charset=utf-8",
            "Transfer-Encoding": "chunked",
          });

          jsxStream.pipe(res);

          res.on("finish", () => {
            res.end();
            if (renderingError) reject(renderingError);
            else resolve(jsxStream);
          });
        },
        // Error occurred during rendering, after the shell & headers were sent - store the error for usage after stream is sent
        onError(error) {
          renderingError = error as Error;
        },
      });
    });
  };
}
