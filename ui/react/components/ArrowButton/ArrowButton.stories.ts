import type { Meta, StoryObj } from "@storybook/react";

import { ArrowButton } from ".";

const meta = {
  title: "Components/ArrowButton",
  component: ArrowButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ArrowButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default state when the menu is open */
export const Open: Story = {};

/** State when the menu is closed. */
export const Closed: Story = {
  args: {
    className: "closed",
  },
};
