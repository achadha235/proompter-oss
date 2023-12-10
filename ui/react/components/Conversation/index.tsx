import { Message as VercelAIMessage } from "ai";
import { isNil } from "lodash";
import { ReactNode } from "react";
import { Examples } from "..";
import { Message } from "..";
import { Chat, User } from "@proompter/core";
import {
  ConversationHeader,
  ConversationHeaderProps,
} from "./ConversationHeader";

export function Conversation({
  conversationHeaderProps,
  messages,
  user,
  appUser,
  examples,
}: {
  conversationHeaderProps: ConversationHeaderProps;
  messages: VercelAIMessage[];
  user?: User;
  appUser?: User;
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

  content = (
    <>
      {messages.map((message) => {
        const msgUser = message.role === "user" ? user : appUser;
        return (
          <Message
            imageURL={msgUser?.imageURL}
            name={msgUser?.name}
            key={message.id}
            text={message.content}
          />
        );
      })}
    </>
  );

  return <div className="ai-w-full">{content}</div>;
}
