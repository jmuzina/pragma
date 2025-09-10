/* @canonical/generator-ds 0.10.0-experimental.2 */

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Component from "./Card.js";

describe("Card component", () => {
  it("renders", () => {
    render(<Component>Card</Component>);
    expect(screen.getByText("Card")).toBeInTheDocument();
  });

  it("renders with subcomponents", () => {
    render(
      <Component>
        <Component.Header>Header</Component.Header>
        <Component.Section>Content</Component.Section>
      </Component>,
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders with thumbnail", () => {
    render(
      <Component>
        <Component.Thumbnail src="test.jpg" alt="Test" />
        <Component.Section>Content</Component.Section>
      </Component>,
    );

    expect(screen.getByAltText("Test")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders with image", () => {
    render(
      <Component>
        <Component.Image src="test.jpg" alt="Test" />
        <Component.Section>Content</Component.Section>
      </Component>,
    );

    expect(screen.getByAltText("Test")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
