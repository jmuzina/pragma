/* @canonical/generator-ds 0.10.0-experimental.2 */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Notification from "./Notification.js";

describe("Notification component", () => {
  it("renders with information severity by default", () => {
    render(<Notification title="Info">Message</Notification>);
    const notification = screen
      .getByText("Message")
      .closest(".ds.notification");
    expect(notification).not.toBeNull();
    expect(notification).toHaveClass("notification--information");
  });

  it("renders with positive severity", () => {
    render(
      <Notification severity="positive" title="Success">
        Message
      </Notification>,
    );
    const notification = screen
      .getByText("Message")
      .closest(".ds.notification");
    expect(notification).not.toBeNull();
    expect(notification).toHaveClass("notification--positive");
  });

  it("renders with caution severity", () => {
    render(
      <Notification severity="caution" title="Warning">
        Message
      </Notification>,
    );
    const notification = screen
      .getByText("Message")
      .closest(".ds.notification");
    expect(notification).not.toBeNull();
    expect(notification).toHaveClass("notification--caution");
  });

  it("renders with negative severity", () => {
    render(
      <Notification severity="negative" title="Error">
        Message
      </Notification>,
    );
    const notification = screen
      .getByText("Message")
      .closest(".ds.notification");
    expect(notification).not.toBeNull();
    expect(notification).toHaveClass("notification--negative");
  });

  it("applies borderless modifier", () => {
    render(
      <Notification borderless title="Borderless">
        Message
      </Notification>,
    );
    const notification = screen
      .getByText("Message")
      .closest(".ds.notification");
    expect(notification).not.toBeNull();
    expect(notification).toHaveClass("is-borderless");
  });

  it("applies inline modifier", () => {
    render(
      <Notification inline title="Inline">
        Message
      </Notification>,
    );
    const notification = screen
      .getByText("Message")
      .closest(".ds.notification");
    expect(notification).not.toBeNull();
    expect(notification).toHaveClass("is-inline");
  });

  it("renders title and message", () => {
    render(<Notification title="Title">Message</Notification>);
    expect(screen.getByTestId("notification-title")).toHaveTextContent("Title");
    expect(screen.getByText("Message")).toBeInTheDocument();
  });

  it("renders actions", () => {
    const onClick = vi.fn();
    render(
      <Notification
        title="With Actions"
        actions={[{ label: "Action", onClick }]}
      >
        Message
      </Notification>,
    );
    const actionBtn = screen.getByTestId("notification-action");
    expect(actionBtn).toHaveTextContent("Action");
    fireEvent.click(actionBtn);
    expect(onClick).toHaveBeenCalled();
  });

  it("renders timestamp", () => {
    render(
      <Notification title="With Timestamp" timestamp="2025-10-01">
        Message
      </Notification>,
    );
    expect(screen.getByTestId("notification-timestamp")).toHaveTextContent(
      "2025-10-01",
    );
  });

  it("renders close button and calls onDismiss", () => {
    const onDismiss = vi.fn();
    render(
      <Notification title="Dismissible" onDismiss={onDismiss}>
        Message
      </Notification>,
    );
    const closeBtn = screen.getByTestId("notification-close-button");
    fireEvent.click(closeBtn);
    expect(onDismiss).toHaveBeenCalled();
  });

  it("applies custom className last", () => {
    render(
      <Notification className="custom" title="ClassName">
        Message
      </Notification>,
    );
    const notification = screen
      .getByText("Message")
      .closest(".ds.notification");
    expect(notification).not.toBeNull();
    if (notification) {
      expect(notification.className.split(" ").pop()).toBe("custom");
    }
  });
});
