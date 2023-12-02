import type { Meta, StoryObj } from "@storybook/react";
import { Composer } from ".";

const meta = {
  title: "Components/Composer",
  component: Composer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Composer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
