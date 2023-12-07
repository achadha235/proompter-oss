import { ReactNode } from "react";

export default function ConversationManager({
  conversations,
}: {
  conversations: any[];
}) {
  let content: ReactNode;

  if (conversations.length === 0) {
    content = (
      <span className="ai-text-center ai-text-base-content ai-text-opacity-60 ai-text-xs ai-line-clamp-1 ai-max-h-fit">
        No recent conversations
      </span>
    );
  }

  return <span className="ai-h-full ai-w-full">{content}</span>;
}
