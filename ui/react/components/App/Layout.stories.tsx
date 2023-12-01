import type { Meta, StoryObj } from "@storybook/react";
import TextareaAutosize from "react-textarea-autosize";

import { Layout } from "./Layout";

const meta = {
  title: "Components/Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

const placeholders = {
  drawer: <div className="ai-box ai-w-full ai-h-[5000px]">Drawer</div>,
  main: <div className="ai-h-[5000px] ai-w-full ">Main Content</div>,
  footer: (
    <div className="ai-box ai-w-full ai-h-fit">
      <TextareaAutosize
        className=" ai-text-lg ai-bg-base-300 ai-p-1 ai-w-full ai-resize-none ai-rounded-none ai-outline-none ai-border-none"
        minRows={2}
        maxRows={12}
        name="text"
        id="text"
      />
    </div>
  ),
  header: (
    <div className="ai-bg-base-100 ai-bg-opacity-40 ai-shadow-sm ai-box ai-w-full ai-h-14">
      Header
    </div>
  ),
};

/** With scrolling enabled in the main content area. You can see the area is scrolled to the bottom by default */
export const WithScroll: Story = {
  args: {
    ...placeholders,
  },
};

/** Layout with scrolling disabled in the main area. Useful when showing an initial or error state. */
export const ScrollDisabled: Story = {
  args: {
    enableScroll: false,
    ...placeholders,
  },
};
