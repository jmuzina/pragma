/* @canonical/generator-ds 0.10.0-experimental.4 */

import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Component from "./Notification.js";

describe("Notification SSR", () => {
  it("doesn't throw", () => {
    expect(() => {
      renderToString(<Component />);
    }).not.toThrow();
  });

  it("renders", () => {
    const html = renderToString(<Component />);
    expect(html).toContain("<div");
    expect(html).toContain("</div>");
  });

  it("applies className", () => {
    const html = renderToString(<Component className="test-class" />);
    expect(html).toContain('class="ds notification test-class"');
  });
});
