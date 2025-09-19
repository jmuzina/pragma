/* @canonical/generator-ds 0.10.0-experimental.2 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import Component from "./Thumbnail.js";

const meta = {
  title: "Card/Thumbnail",
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    imageProps: {
      control: { type: "object" },
      description: "Props for the image element",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "`Card.Thumbnail` is used for small images within cards. It uses the `Card.Section` component to display the thumbnail with appropriate spacing and borders.<br><br>Any valid HTML image attribute can be passed to `Card.Thumbnail`'s `imageProps` prop, such as `src`, `alt`, `width`, and `height`. The rest of the props are applied to the wrapping `Card.Section` component.",
      },
    },
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageProps: {
      src: "https://assets.ubuntu.com/v1/31bd2627-logo-raspberry-pi.svg",
      alt: "Raspberry Pi Logo",
    },
  },
};
