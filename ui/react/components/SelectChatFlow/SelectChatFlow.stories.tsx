import type { Meta, StoryObj } from "@storybook/react";
import { SelectChatFlow } from ".";

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

export const Basic: Story = {
  args: {},
};
