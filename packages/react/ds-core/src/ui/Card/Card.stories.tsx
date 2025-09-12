/* @canonical/generator-ds 0.10.0-experimental.2 */

import { MODIFIER_FAMILIES } from "@canonical/ds-types";
import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";
import Component from "./Card.js";

const meta = {
  title: "Card",
  component: Component,
  argTypes: {
    children: {
      control: { type: "text" },
      description: "Content to display in the card.",
    },
    emphasis: {
      options: MODIFIER_FAMILIES.emphasis,
      control: { type: "radio" },
      description:
        "Emphasis modifier for the card.<br><br>Note: currently, only 'neutral' and 'highlighted' are supported; support for other modifiers is forthcoming.",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A Card component with subcomponents for different content types. Use Card.Thumbnail for small images, Card.Image for full-width images, and Card.Section for content sections.",
      },
    },
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: StoryFn = (props) => (
  <Component {...props}>
    <Component.Image src="https://discourse-maas-io-uploads.s3.us-east-1.amazonaws.com/optimized/2X/0/0cec65d4c1018c9fbf1ffab87f19a92429f5ffad_2_690x335.jpeg" />
    <Component.Section>
      <h3>
        Build your own bare metal cloud using a Raspberry Pi cluster with MAAS{" "}
      </h3>
      <p>Duration: 1:00</p>
    </Component.Section>
    <Component.Section>
      <p>
        The Raspberry Pi 4 (RPi) with it’s relatively fast CPU cores, up to 8 GB
        of RAM, and tiny physical footprint presents a great option to run a
        cluster on. Provisioning all those RPis can be a pain however, and
        people have wanted to use tools like <a href="https://maas.io">MAAS</a>.
      </p>
    </Component.Section>
  </Component>
);

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
