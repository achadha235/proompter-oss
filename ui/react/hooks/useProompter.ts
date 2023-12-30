import { Config, Chat } from "@proompter/core";
import { useEffect, useState } from "react";
import { first } from "lodash";
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
  console.log("CHATFLOWOPTIONS", config?.chatOptions);
  const chat = useChat({
    api: "/api/proompter/chat",
    ...config?.chatOptions,
    sendHistory: false,
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
