import { ReactNode } from "react";
import { Conversation } from "@proompter/core";
import { ConversationListItem } from "./ConversationListItem";

export default function ConversationManager({
  conversations,
}: {
  conversations: Conversation[];
}) {
  let content: ReactNode;

  if (conversations.length === 0) {
    content = (
      <span className="ai-text-center ai-text-base-content ai-text-opacity-60 ai-text-xs ai-line-clamp-1 ai-max-h-fit">
        No recent conversations
      </span>
    );
  } else {
    content = [...conversations].map((conversation, i) => {
      return (
        <ConversationListItem
          onConversationNameChanged={() => {
            return new Promise((resolve) => {
              setTimeout(resolve, 3000);
            });
          }}
          conversation={conversation}
        />
      );
    });
  }

  return (
    <span className="ai-block ai-h-[calc(100vh-120px)] ai-w-[290px] ai-overflow-y-auto ai-overflow-x-hidden">
      {content}
    </span>
  );
}
