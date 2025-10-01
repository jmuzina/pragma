import { MODIFIER_FAMILIES } from "@canonical/ds-types";
import type { Meta, StoryObj } from "@storybook/react";
import * as decorators from "storybook/decorators.js";
import Notification from "./Notification.js";

const meta: Meta<typeof Notification> = {
  title: "Notification",
  component: Notification,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Notification>;

export const Severities: Story = {
  render: (args) => (
    <div>
      {MODIFIER_FAMILIES.severity.map((severity) => (
        <Notification
          key={severity}
          severity={severity}
          title={severity.charAt(0).toUpperCase() + severity.slice(1)}
          {...args}
        >
          This is a(n) {severity} notification
        </Notification>
      ))}
    </div>
  ),
  args: {},
  decorators: [decorators.grid()],
};

export const Borderless: Story = {
  args: {
    severity: "information",
    borderless: true,
    title: "Borderless",
    children: "This notification has no border.",
  },
};

export const Inline: Story = {
  args: {
    severity: "information",
    inline: true,
    title: "Inline Title",
    children: "Inline message next to title.",
  },
};

export const WithActions: Story = {
  args: {
    severity: "information",
    title: "With Actions",
    children: "You can take action from here.",
    actions: [
      { label: "Action 1", onClick: () => alert("Action 1") },
      { label: "Action 2", onClick: () => alert("Action 2") },
    ],
  },
};

export const WithTimestamp: Story = {
  args: {
    severity: "information",
    title: "With Timestamp",
    children: "This notification has a timestamp.",
    timestamp: "2025-10-01 12:00",
  },
};

export const Dismissible: Story = {
  args: {
    severity: "information",
    title: "Dismissible",
    children: "You can dismiss this notification.",
    onDismiss: () => alert("Notification dismissed"),
  },
};
