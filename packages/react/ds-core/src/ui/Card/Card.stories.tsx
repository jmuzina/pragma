/* @canonical/generator-ds 0.10.0-experimental.2 */

import { MODIFIER_FAMILIES } from "@canonical/ds-types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Component from "./Card.js";

const meta = {
  title: "Card",
  component: Component,
  argTypes: {
    emphasis: {
      options: MODIFIER_FAMILIES.emphasis,
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Component.Section>
        <h3>We'd love to have you join us as a partner.</h3>
        <p>
          If you are an independent software vendor or bundle author, it's easy
          to apply. You can find out more below.
        </p>
      </Component.Section>
    ),
  },
};

export const WithThumbnail: Story = {
  args: {
    children: (
      <>
        <Component.Thumbnail
          src="https://assets.ubuntu.com/v1/31bd2627-logo-raspberry-pi.svg"
          alt="Raspberry Pi Logo"
        />
        <Component.Section>
          <h3>Raspberry Pi2 and Pi3</h3>
          <p>
            For fun, for education and for profit, the RPi makes device
            development personal and entertaining. With support for both the Pi2
            and the new Pi3, Ubuntu Core supports the world's most beloved
            board.
          </p>
        </Component.Section>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use Card.Thumbnail for small images. Thumbnails automatically get proper spacing and borders.",
      },
    },
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <>
        <Component.Image
          src="https://assets.ubuntu.com/v1/36f1139e-Design-and-Web-Team-Blog.jpg"
          alt="Design and Web Team Blog"
          height={185}
          width={330}
        />
        <Component.Section>
          <h3>Open Source Robotics Challenges</h3>
          <p>
            Open Source Robotics Challenges is a series of blogs in which we
            explore some of the challenges facing robotics developers and how
            open source software can help to address them.
          </p>
        </Component.Section>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Use Card.Image for images that span the width of the card.",
      },
    },
  },
};

export const MultipleSections: Story = {
  args: {
    children: (
      <>
        <Component.Section>
          <h3>Card with Multiple Sections</h3>
          <p>Published on 2024-01-01 • 5 min read</p>
        </Component.Section>
        <Component.Section>
          <h4>First Content Section</h4>
          <p>This is the first content section with a border below it.</p>
        </Component.Section>
        <Component.Section>
          <h4>Second Content Section</h4>
          <p>
            This is the second content section. Notice the automatic spacing and
            borders between sections.
          </p>
        </Component.Section>
        <Component.Section>
          <p>This is the last section with a border below it.</p>
        </Component.Section>
      </>
    ),
  },
};

export const Highlighted: Story = {
  args: {
    emphasis: "highlighted",
    children: (
      <Component.Section>
        <h3>Highlighted Card</h3>
        <p>This card has highlighted emphasis applied to the entire card.</p>
      </Component.Section>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Apply the highlighted emphasis modifier to a card to further contrast it from surrounding content. This is especially useful when the card contains interactive content.",
      },
    },
  },
};
