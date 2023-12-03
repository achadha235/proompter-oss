import { Message } from "ai";
import { isNil } from "lodash";
import { ReactNode } from "react";
import { Examples } from "..";
import { Chat } from "@proompter/core";
import {
  ConversationHeader,
  ConversationHeaderProps,
} from "./ConversationHeader";

export function Conversation({
  conversationHeaderProps,
  messages,
  examples,
}: {
  conversationHeaderProps: ConversationHeaderProps;
  messages: Message[];
  examples: Chat.Example[];
}) {
  let content: ReactNode = null;

  if (isNil(messages) || messages.length === 0) {
    return (
      <div className="ai-h-full ai-flex ai-flex-col ai-justify-evenly">
        <ConversationHeader
          {...conversationHeaderProps}
          className=" ai-my-auto"
        />
        <Examples
          className=" ai-mx-auto ai-mt-auto ai-mb-10  ai-max-w-3xl"
          examples={examples}
        />
      </div>
    );
  }
  return <div className="ai-w-full ai-bg-green-200">{content}</div>;
}
