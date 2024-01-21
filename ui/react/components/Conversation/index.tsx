import { Message as VercelAIMessage } from "ai";
import { isNil, last } from "lodash";
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
  activeConversationId,
  messages,
  user,
  appUser,
  examples,
  isLoading = false,
  conversationIsLoading = false,
  onExampleClicked,
}: {
  conversationHeaderProps: ConversationHeaderProps;
  activeConversationId?: string | null;
  messages: VercelAIMessage[];
  isLoading?: boolean;
  conversationIsLoading?: boolean;
  user?: User;
  appUser?: User;
  examples: Chat.Example[];
  onExampleClicked?: (example: Chat.Example) => void;
}) {
  let content: ReactNode = null;

  if (!messages || messages.length === 0) {
    if (conversationIsLoading) {
      return (
        <div className="ai-h-full ai-flex ai-flex-col ai-justify-center ai-items-center">
          <div className="ai-loading-spinner ai-loading" />
        </div>
      );
    }

    return (
      <div className="ai-h-full ai-flex ai-flex-col ai-justify-evenly">
        <ConversationHeader
          {...conversationHeaderProps}
          className=" ai-my-auto"
        />
        <Examples
          onExampleClicked={onExampleClicked}
          className=" ai-mx-auto ai-mt-auto ai-mb-10  ai-max-w-3xl"
          examples={examples}
        />
      </div>
    );
  }

  const loadingPlaceholder = isLoading && last(messages)?.role === "user" && (
    <Message
      isLoading={true}
      imageURL={appUser?.imageURL}
      name={appUser?.name}
      text=""
      key="loading-placeholder"
    />
  );

  content = (
    <>
      {messages.map((message, i) => {
        const msgUser = message.role === "user" ? user : appUser;
        return (
          <Message
            enableMarkdown={message.role !== "user"}
            imageURL={msgUser?.imageURL}
            name={msgUser?.name}
            key={message.id}
            text={message.content}
            isLoading={
              isLoading && i === messages.length - 1 && msgUser === appUser
            }
          />
        );
      })}
      {loadingPlaceholder}
    </>
  );

  return <div className="ai-w-full">{content}</div>;
}
