import type { Meta, StoryObj } from "@storybook/react";
import { SelectChatFlow } from ".";
import { Chat } from "@proompter/core";

const meta = {
  title: "Components/SelectChatFlow",
  component: SelectChatFlow,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SelectChatFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

const examples: Chat.Chatflow[] = [
  {
    id: "translate",
    name: "Simple Translation",
    icon: "bolt",
    description: ["Basic translations and transliterations"],
    runner: "flowise",
    options: {
      chatflowId: "9b6f5637-06da-43ac-ac67-a32787ff5be2",
    },
  },
  {
    id: "tutor",
    name: "Language Tutor",
    icon: "school",
    description: [
      "Full translations and transliterations",
      "with grammar, vocabulary and Q&A",
    ],
    runner: "flowise",
    options: {
      chatflowId: "fb079dba-bb53-465d-a2ba-48a7d60fd0d6",
    },
  },
];

export const Basic: Story = {
  args: {
    chatflow: examples[0],
    chatflows: examples,
  },
};
