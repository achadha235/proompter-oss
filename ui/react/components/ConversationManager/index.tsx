import { ReactNode, useRef } from "react";
import { Conversation } from "@proompter/core";
import { ConversationListItem } from "./ConversationListItem";
import { useScroll } from "framer-motion";

export default function ConversationManager({
  onScrolledToBottom,
  conversations,
  isLoadingInitialData,
  isLoadingMore,
  isLoading,
  activeConversationId,
  onConversationSelected,
  onConversationDeleted,
  onConversationArchived,
  onConversationShared,
  onConversationRenamed,
}: {
  onScrolledToBottom: () => void;
  conversations: Conversation[];
  isLoadingInitialData: boolean;
  isLoadingMore?: boolean;
  isLoading?: boolean;
  activeConversationId?: string | null;
  onConversationSelected?: (conversation: Conversation) => any;
  onConversationDeleted?: (conversation: Conversation) => any;
  onConversationArchived?: (conversation: Conversation) => any;
  onConversationShared?: (conversation: Conversation) => any;
  onConversationRenamed?: (conversation: Conversation, name: string) => any;
}) {
  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollContainerRef });

  const onScroll = () => {
    const scrollProgress = scrollYProgress.get();
    if (scrollProgress === 1) {
      onScrolledToBottom?.();
    }
  };
  scrollYProgress.on("change", onScroll);

  let content: ReactNode;
  if (isLoadingInitialData) {
    content = (
      <div className=" ai-h-full ai-w-full ai-flex ai-items-center ai-justify-center">
        <span className="ai-loading-spinner ai-loading" />
      </div>
    );
  } else if (conversations.length === 0) {
    content = (
      <span className="ai-text-center ai-text-base-content ai-text-opacity-60 ai-text-xs ai-line-clamp-1 ai-max-h-fit">
        No recent conversations
      </span>
    );
  } else {
    content = [...conversations].map((conversation, i) => {
      return (
        <ConversationListItem
          active={activeConversationId === conversation.id}
          key={conversation.id}
          onSelected={onConversationSelected}
          onArchived={onConversationArchived}
          onDeleted={onConversationDeleted}
          onShareClicked={onConversationShared}
          conversation={conversation}
          onConversationNameChanged={onConversationRenamed}
        />
      );
    });
  }

  return (
    <span
      ref={scrollContainerRef}
      className="ai-p-2 ai-block ai-h-[calc(100vh-120px)] ai-w-full ai-overflow-y-auto ai-overflow-x-hidden"
    >
      {content}
      {!isLoadingInitialData && isLoadingMore && (
        <div className=" ai-h-fit ai-w-full ai-flex ai-items-center ai-justify-center">
          <span className="ai-loading-spinner ai-loading" />
        </div>
      )}
    </span>
  );
}
