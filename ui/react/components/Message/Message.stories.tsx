import type { Meta, StoryObj } from "@storybook/react";
import { Message } from ".";

const testMarkdown = `
# GFM Feature Test
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


## Headers
Lorem Ipsum

# Header 1
Lorem Ipsum

## Header 2
Lorem Ipsum

### Header 3
Lorem Ipsum
#### Header 4
Lorem Ipsum
##### Header 5
Lorem Ipsum
###### Header 6
Lorem Ipsum

## Emphasis
*Italic* or _Italic_
**Bold** or __Bold__
~~Strikethrough~~

## Lists

### Ordered List
1. First item
2. Second item
3. Third item

## Links
[GitHub](http://github.com)

## Inline code
This is an inline code: \`var example = true;\`

## Fenced Code Blocks
\`\`\`javascript
function test() {
 console.log("notice the blank line before this function?");
}
\`\`\`

## Tables

| Header One     | Header Two     |
| -------------- | -------------- |
| Item One       | Item Two       |

## Horizontal Rule
---

## Strikethrough with nested items
~~The world is flat.~~ We now know that the world is round.

## References

### Inline-style link
[GitHub](http://github.com)

### Reference-style link
This is a [reference-style link][Arbitrary case-insensitive reference text].

[arbitrary case-insensitive reference text]: https://www.mozilla.org

### Reference-style link with a title
This is a [reference-style link with a title][Reference link title].

[reference link title]: https://www.mozilla.org "Mozilla Homepage"
`;

const meta = {
  title: "Components/Message",
  component: Message,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    name: "You",
    imageURL: "http://robohash.org/you",
    text: testMarkdown,
  },
};
