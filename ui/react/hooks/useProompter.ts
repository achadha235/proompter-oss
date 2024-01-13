import { Config, Chat } from "@proompter/core";
import { useEffect, useState } from "react";
import { find, first } from "lodash";
import { useChat } from "ai/react";
import useConversations from "./useConversations";

export function useProompter(
  intialConfig: Config,
  {
    onChatflowSelected,
    initialChatflowId,
  }: {
    onChatflowSelected?: (chatflow: Chat.Chatflow) => void;
    initialChatflowId?: string | null;
  }
) {
  const [config, setConfig] = useState(intialConfig);

  const initialChatflow =
    find(config.chatflows, (chatflow) => chatflow.id === initialChatflowId) ||
    first(config.chatflows);

  const [chatflow, setChatflow] = useState(initialChatflow);

  const conversationData = useConversations();

  const [conversationId, setConversationId] = useState<string | null>(null);

  const chat = useChat({
    ...(conversationId && { id: conversationId }),
    api: "/api/proompter/chat",
    sendHistory: false,
    credentials: "include",
    body: {
      conversationId,
      chatflowId: chatflow?.id,
    },
    ...config?.chatOptions,
    onFinish(_message) {
      conversationData.mutate();
    },
    onResponse(response) {
      const conversationId = response.headers.get("Conversation-ID");
      setConversationId(conversationId);
    },
  });

  useEffect(() => {
    if (!chatflow) {
      return;
    }
    onChatflowSelected?.(chatflow);
  }, [chatflow]);

  return {
    config,
    setConfig,
    chatflow,
    setChatflow,
    chat,
    conversationData,
    conversationId,
    setConversationId,
  };
}
