import { Config, Chat } from "@proompter/core";
import { useEffect, useState } from "react";
import { first, last } from "lodash";
import { useChat } from "ai/react";

export function useProompter(
  intialConfig: Config,
  {
    onChatflowSelected,
  }: {
    onChatflowSelected?: (chatflow: Chat.Chatflow) => void;
  }
) {
  const [config, setConfig] = useState(intialConfig);
  const [chatflow, setChatflow] = useState(first(config.chatflows)!);
  const [conversations, setConversations] = useState([]);

  const chat = useChat({
    api: "/api/proompter/chat",
    sendHistory: false,
    ...config?.chatOptions,
  });

  useEffect(() => {
    onChatflowSelected?.(chatflow);
  }, [chatflow]);

  return {
    config,
    setConfig,
    chatflow,
    setChatflow,
    chat,
    conversations,
    setConversations,
  };
}
