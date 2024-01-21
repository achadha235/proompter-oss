import type { Meta, StoryObj } from "@storybook/react";

import { Conversation } from ".";

const meta: Meta = {
  title: "Components/Conversation",
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
    messages: [
      {
        content: "I am your father",
        role: "user",
      },
      {
        content: "No. No! That's not true! That's impossible!",
        role: "assistant",
      },
    ],
    user: {
      imageURL: "https://robohash.org/1",
      name: "Dark Vader",
    },
    appUser: {
      imageURL: "https://robohash.org/2",
      name: "Luke Skywalker",
    },
  },
};
