import type { Meta, StoryObj } from "@storybook/react";
import { App } from ".";
import { config } from "./proompter.config";
const meta: Meta<typeof App> = {
  title: "Components/App",
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    proompterConfig: config,
    user: {
      email: "johnnyappleseed@apple.com",
      imageURL: "http://robohash.org/johnny",
      name: "Johnny Appleseed",
    },
  },
};
