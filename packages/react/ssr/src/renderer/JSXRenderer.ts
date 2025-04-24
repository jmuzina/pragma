// src/renderer.ts (Modified for Agnosticism)

import type {IncomingMessage, ServerResponse} from "node:http"; // Removed ServerResponse import here
import type * as React from "react";
import { type ReactElement, createElement } from "react";
import {
  type PipeableStream,
  type RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";
import { PassThrough } from "node:stream";
// Keep Extractor import if still used elsewhere
import Extractor from "./Extractor.js";

// Keep existing interfaces (RendererOptions, RendererServerEntrypointProps, etc.)
// Options might simplify slightly if not handling status/headers directly
export interface RendererOptions {
  htmlString?: string; // If Extractor is used
  renderToPipeableStreamOptions?: Omit<
      RenderToPipeableStreamOptions,
      "onShellReady" | "onError" | "onShellError"
  >;
}

export interface RendererServerEntrypointProps {
  lang?: string; // Locale/lang might be better handled by caller now
  scriptTags?: string;
  linkTags?: string;
}

export type RenderResult = PipeableStream;
export type RenderHandler = (
    req: IncomingMessage,
    res: ServerResponse
) => RenderResult;

export type ReactServerEntrypointComponent<
    TComponentProps extends RendererServerEntrypointProps,
> = React.ComponentType<TComponentProps>;


export default class Renderer<
    TComponent extends ReactServerEntrypointComponent<TComponentProps>,
    TComponentProps extends
        RendererServerEntrypointProps = RendererServerEntrypointProps,
> {
  private extractor: Extractor | undefined;

  // Constructor remains mostly the same
  constructor(
      // [Explain your changes]: Accept the component instance directly for simplicity
      private readonly Component: TComponent,
      private readonly options: RendererOptions = {},
  ) {
    this.extractor = this.options.htmlString
        ? new Extractor(this.options.htmlString)
        : undefined;
  }

  // getComponentProps remains similar, but source of props might change
  private getComponentProps(): TComponentProps {
    return {
      // lang: this.locale, // How is locale determined now? Passed via component props?
      scriptTags: this.extractor?.getScriptTags(),
      linkTags: this.extractor?.getLinkTags(),
    } as TComponentProps;
  }

  // for backwards compatibility
  render = this.renderComponentToResponse.bind(this);

  renderComponentToResponse(req: IncomingMessage, res: ServerResponse): ServerResponse {
    try {
      const stream = this.renderComponentToPassthrough(req);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      stream.pipe(res);
      res.on("finish", () => {
        res.end();
      });
    } catch(err) {
      res
          .writeHead(500, { "Content-Type": "text/html; charset=utf-8" })
          .end("<h1>Something went wrong</h1>");
    }
    return res;
  }

  /**
   * Renders this renderer's JSX component to a stream.
   * This method is framework-agnostic and returns the raw React render stream.
   * The caller is responsible for any further transformations (like state injection)
   * and piping the final stream to the HTTP response.
   * @param req Client's request (optional, if needed for context)
   * @return {PassThrough} A PassThrough stream containing the raw React render output.
   */
  renderComponentToPassthrough = (
      req?: IncomingMessage
  ): PassThrough => {

    const jsx = createElement(this.Component, this.getComponentProps());

    const passthrough = new PassThrough();

    let didError = false; // Flag to prevent piping after error

    const jsxStream = renderToPipeableStream(jsx, {
      ...this.options.renderToPipeableStreamOptions,

      onShellReady() {
        if (!didError) {
          jsxStream.pipe(passthrough);
        } else {
          console.log("Shell Ready: Error occurred before shell ready, not piping.");
          // Ensure stream is destroyed if error happened before pipe setup
          passthrough.destroy();
        }
      },
      onShellError(error) {
        didError = true;
        console.error("SSR Shell Error:", error);
        // Destroy the stream we were going to return, signaling error to consumer
        passthrough.destroy(error as Error);
      },
      onError(error) {
        // Error *after* shell was sent. Headers potentially sent by consumer.
        didError = true;
        console.error("SSR Stream Error (after shell):", error);
        // Destroy the stream to signal error
        passthrough.destroy(error as Error);
      },
    });

    return passthrough;
  };
}