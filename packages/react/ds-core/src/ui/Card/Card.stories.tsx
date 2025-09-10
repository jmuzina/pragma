/* @canonical/generator-ds 0.10.0-experimental.2 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import Component from "./Card.js";

const meta = {
  title: "Card",
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    titleContents: <>We'd love to have you join us as a partner.</>,
    children: (
      <p>
        If you are an independent software vendor or bundle author, it's easy to
        apply. You can find out more below.
      </p>
    ),
  },
};

export const WithThumbnail: Story = {
  args: {
    thumbnailProps: {
      src: "https://assets.ubuntu.com/v1/31bd2627-logo-raspberry-pi.svg",
      alt: "Raspberry Pi Logo",
    },
    titleContents: <>Raspberry Pi2 and Pi3</>,
    children: (
      <p>
        For fun, for education and for profit, the RPi makes device development
        personal and entertaining. With support for both the Pi2 and the new
        Pi3, Ubuntu Core supports the world’s most beloved board.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "To include a thumbnail in your Card, pass thumbnail information into `thumbnailProps`.",
      },
    },
  },
};

export const Highlighted: Story = {
  args: {
    titleContents: <>We'd love to have you join us as a partner.</>,
    children: (
      <>
        <p>
          If you are an independent software vendor or bundle author, it's easy
          to apply. You can find out more below.
        </p>
        {/** biome-ignore lint/a11y/useValidAnchor: We don't want to use a live link in the story demo */}
        <a href="#">Apply now &nbsp;&rsaquo;</a>
      </>
    ),
    emphasis: "highlighted",
  },
  parameters: {
    docs: {
      description: {
        story:
          "To draw further attention to a Card, apply `emphasis='highlighted'`. This is especially useful when your card has interactive content that you want to draw attention to.",
      },
    },
  },
};
