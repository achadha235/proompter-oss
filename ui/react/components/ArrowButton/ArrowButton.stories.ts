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

export const Primary: Story = {};
