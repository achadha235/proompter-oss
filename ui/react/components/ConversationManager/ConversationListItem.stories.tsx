import type { Meta, StoryObj } from "@storybook/react";
import { ConversationListItem } from "./ConversationListItem";

const meta = {
  title: "Components/ConversationListItem",
  component: ConversationListItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 250 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConversationListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    className: " ai-min-w-96",
    conversation: {
      id: "1234",
      name: "My Conversation with a robot creature during Vietnam",
      messages: [],
    },
  },
};
