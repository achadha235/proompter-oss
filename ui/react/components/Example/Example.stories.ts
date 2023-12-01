import type { Meta, StoryObj } from "@storybook/react";

import { Example } from ".";

const meta = {
  title: "Components/Example",
  component: Example,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Example>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    chatMessage: "Design a database schema for an online merch store.",
    title: "Design a database schema",
    subtitle: "for an online merch store",
  },
};
