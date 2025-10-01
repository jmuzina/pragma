/* @canonical/generator-ds 0.10.0-experimental.4 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Component from "./Notification.js";

describe("Notification component", () => {
  it("renders", () => {
    render(<Component>Notification</Component>);
    expect(screen.getByText("Notification")).toBeInTheDocument();
  });

  it("applies className", () => {
    render(<Component className={"test-class"}>Notification</Component>);
    expect(screen.getByText("Notification")).toHaveClass("test-class");
  });
});
