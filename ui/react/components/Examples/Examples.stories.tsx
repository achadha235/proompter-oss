import type { Meta, StoryObj } from "@storybook/react";
import { Examples } from ".";

const meta = {
  title: "Components/Examples",
  component: Examples,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Examples>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    examples: [
      {
        title: "Recommend a dish",
        subtitle: "to bring to a potluck",
        chatMessage: "I want to make a dish for a potluck. What should I make?",
      },
      {
        title: "Brainstorm incentives",
        subtitle: "for a customer loyalty program in a small bookstore",
        chatMessage:
          "Can you help me brainstorm 7 ideas for a customer loyalty program? I work at a small bookstore.",
      },
      {
        title: "Write an email",
        subtitle: "requesting a deadline extension for my project",
        chatMessage:
          "Write a short email to my professor requesting a deadline extension for my project. I don't really have a good excuse, and I'm fine owning up to that – so please keep it real!",
      },
      {
        title: "Design a database schema",
        subtitle: "for an online merch store",
        chatMessage: "Design a database schema for an online merch store.",
      },
    ],
  },
};
