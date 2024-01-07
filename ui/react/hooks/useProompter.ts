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
    initialChatflowId: string | null;
  }
) {
  const [config, setConfig] = useState(intialConfig);

  const initialChatflow =
    find(config.chatflows, (chatflow) => chatflow.id === initialChatflowId) ||
    first(config.chatflows);

  const [chatflow, setChatflow] = useState(initialChatflow);

  const { conversations } = useConversations();

  // const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);

  const chat = useChat({
    api: "/api/proompter/chat",
    sendHistory: false,
    credentials: "include",
    body: {
      conversationId,
      chatflowId: chatflow?.id,
    },
    ...config?.chatOptions,
    onFinish(message) {
      console.log(message);
    },
    onResponse(response) {
      console.log(response);
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
    conversations,
    // setConversations,
    conversationId,
    setConversationId,
  };
}
