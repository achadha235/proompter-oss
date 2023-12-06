import { Config } from "@proompter/core";
import { useState } from "react";
import { first } from "lodash";
import { useChat } from "ai/react";

export function useProompter(intialConfig: Config) {
  const [config, setConfig] = useState(intialConfig);
  const [chatflow, setChatflow] = useState(first(config.chatflows)!);
  const [conversations, setConversations] = useState([]);
  const chat = useChat(config.chatOptions);

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
