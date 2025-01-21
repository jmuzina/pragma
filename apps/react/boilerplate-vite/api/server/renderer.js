var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import React, { createElement, lazy, useState, Suspense } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { parseDocument } from "htmlparser2";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
const toPascalCase = (s) => {
  if (!s)
    return "";
  const camelCased = toCamelCase(s);
  return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
};
const toKebabCase = (s) => {
  if (!s)
    return "";
  return s.trim().replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};
const toCamelCase = (s) => {
  if (!s)
    return "";
  return s.replace(/-([a-z])/g, (g) => g[1].toUpperCase()).replaceAll("-", "").replaceAll("_", "").replaceAll(" ", "");
};
const casing = {
  toPascalCase,
  toKebabCase,
  toCamelCase
};
class Extractor {
  constructor(html) {
    // biome-ignore lint/suspicious/noExplicitAny: explicit any needed for the document type
    __publicField(this, "document");
    this.document = parseDocument(html);
  }
  getElementsByTagName(tagName) {
    const elements = [];
    const stack = [this.document];
    while (stack.length) {
      const node = stack.pop();
      if (!node)
        continue;
      if (node.type === "tag" && node.name === tagName) {
        elements.push(node);
      }
      if (node.type === "script" && tagName === "script") {
        elements.push(node);
      }
      if (node.children) {
        stack.push(...node.children);
      }
    }
    console.log(`Found ${elements.length} <${tagName}> tags`);
    return elements;
  }
  convertKeyToReactKey(key) {
    switch (key.toLowerCase()) {
      case "class":
        return "className";
      case "for":
        return "htmlFor";
      case "crossorigin":
        return "crossOrigin";
      default:
        return casing.toCamelCase(key);
    }
  }
  convertToReactElement(element) {
    const props = {};
    for (const [key, value] of Object.entries(element.attribs)) {
      props[this.convertKeyToReactKey(key)] = value;
    }
    return React.createElement(element.name, props);
  }
  getLinkTags() {
    const linkElements = this.getElementsByTagName("link");
    return linkElements.map(this.convertToReactElement, this);
  }
  getScriptTags() {
    const scriptElements = this.getElementsByTagName("script");
    return scriptElements.map(this.convertToReactElement, this);
  }
}
let Renderer$1 = class Renderer {
  constructor(Component, options = {}) {
    __publicField(this, "Component");
    __publicField(this, "options");
    __publicField(this, "locale");
    // private messages: any;
    __publicField(this, "extractor");
    /**
     * Renders this renderer's JSX component as a transmittable stream and sends it to the client
     * TODO add a render function for ReadableStream, and rename this to be focused on PipeableStream
     * @param req Client's request
     * @param res Response object that will be sent to the client
     * @return {RenderResult} The stream that was sent to the client
     */
    __publicField(this, "render", (req, res) => {
      const jsx2 = createElement(this.Component, this.getComponentProps());
      let renderingError;
      const jsxStream = renderToPipeableStream(jsx2, {
        ...this.options.renderToPipeableStreamOptions,
        // Early error, before the shell is prepared
        onShellError() {
          res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" }).end("<h1>Something went wrong</h1>");
          throw new Error("An error occurred while constructing the SSR shell");
        },
        onShellReady() {
          res.writeHead(renderingError ? 500 : 200, {
            "Content-Type": "text/html; charset=utf-8"
          });
          jsxStream.pipe(res);
          res.on("finish", () => {
            res.end();
          });
        },
        // Error occurred during rendering, after the shell & headers were sent - store the error for usage after stream is sent
        onError(error) {
          renderingError = error;
        }
      });
      return jsxStream;
    });
    this.Component = Component;
    this.options = options;
    this.render = this.render.bind(this);
    this.extractor = this.options.htmlString ? new Extractor(this.options.htmlString) : void 0;
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
   * Gets the props needed to render the component
   * @return The props needed to render the component
   * @private
   */
  getComponentProps() {
    var _a, _b;
    return {
      lang: this.locale,
      scriptTags: (_a = this.extractor) == null ? void 0 : _a.getScriptTags(),
      linkTags: (_b = this.extractor) == null ? void 0 : _b.getLinkTags()
      // todo implement message passing
      // messages: this.messages,
    };
  }
};
const htmlString = '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <link rel="icon" type="image/png" sizes="32x32" href="https://assets.ubuntu.com/v1/be7e4cc6-COF-favicon-32x32.png">\n    <title>Vite + React + TS</title>\n    <script type="module" crossorigin src="/assets/index-6NNeD-Da.js"><\/script>\n    <link rel="stylesheet" crossorigin href="/assets/index-CJ23gZzA.css">\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>\n';
const Button = ({ id, className, appearance, label, ...props }) => {
  return jsx("button", { id, className: ["ds", "button", appearance, className].filter(Boolean).join(" "), ...props, "aria-label": label, children: label });
};
const canonicalLogo = "/assets/canonical-CY3gGFbg.svg";
const reactLogo = "/assets/react-CHdo91hT.svg";
const LazyButton = lazy(
  () => new Promise((resolve) => {
    setTimeout(() => resolve(import("./assets/LazyComponent-B3JTEali.js")), 2e3);
  })
);
function App() {
  const [count, setCount] = useState(0);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://canonical.com",
          target: "_blank",
          referrerPolicy: "no-referrer",
          rel: "noreferrer",
          children: /* @__PURE__ */ jsx("img", { src: canonicalLogo, className: "logo", alt: "Canonical logo" })
        }
      ),
      /* @__PURE__ */ jsx("a", { href: "https://react.dev", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsx("img", { src: reactLogo, className: "logo react", alt: "React logo" }) })
    ] }),
    /* @__PURE__ */ jsx("h1", { children: "Canonical Design System" }),
    /* @__PURE__ */ jsx("h2", { children: "React Vite template" }),
    /* @__PURE__ */ jsx(Suspense, { fallback: "Loading...", children: /* @__PURE__ */ jsx(LazyButton, {}) }),
    /* @__PURE__ */ jsxs("div", { className: "card", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          label: `Count: ${count}`,
          onClick: () => setCount((count2) => count2 + 1)
        }
      ),
      /* @__PURE__ */ jsxs("p", { children: [
        "Edit ",
        /* @__PURE__ */ jsx("code", { children: "src/App.tsx" }),
        " and save to test HMR"
      ] })
    ] })
  ] });
}
const EntryServer = ({ lang = "en", scriptTags, linkTags }) => {
  return /* @__PURE__ */ jsxs("html", { lang, children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("title", { children: "Canonical React Vite Boilerplate" }),
      scriptTags,
      linkTags
    ] }),
    /* @__PURE__ */ jsx("body", { children: /* @__PURE__ */ jsx("div", { id: "root", children: /* @__PURE__ */ jsx(App, {}) }) })
  ] });
};
const Renderer2 = new Renderer$1(EntryServer, {
  htmlString
});
const GET = Renderer2.render;
const renderer = Renderer2.render;
export {
  Button as B,
  GET,
  renderer as default
};
