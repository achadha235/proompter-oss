import type { Meta, StoryObj } from "@storybook/react";

import { Conversation } from ".";
import { useState } from "react";

const meta: Meta = {
  title: "Component/Conversation",
  component: Conversation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Conversation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    messages: [],
  },
};
