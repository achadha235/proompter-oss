import { Config, Chat, Conversation } from "@proompter/core";
import { useEffect, useState } from "react";
import { find, first } from "lodash";
import { useChat } from "ai/react";
import useConversations from "./useConversations";
import useSWR from "swr";

const getHeaders = (authToken?: string) => ({
  "Content-Type": "application/json",
  ...(authToken ? { "x-api-key": authToken } : {}),
});

export const getData =
  <Result>(authToken?: string) =>
  (url: string) =>
    fetch(url, {
      headers: getHeaders(authToken),
      credentials: "include",
    }).then((res) => res.json() as Promise<Result>);

export const postData =
  <PostArgs, Result = Response>(authToken?: string) =>
  async (url: string, { arg }: { arg: PostArgs }) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(arg),
      headers: getHeaders(authToken),
      credentials: "include",
    });
    return response.json() as Promise<Result>;
  };

export function useConversation(id: string | null) {
  return useSWR(
    id && "/api/proompter/chat/conversation/" + id,
    getData<Conversation>()
  );
}

export function useProompter(
  intialConfig: Config,
  {
    onChatflowSelected,
    initialChatflowId,
    initialConversationId,
  }: {
    onChatflowSelected?: (chatflow: Chat.Chatflow) => void;
    initialChatflowId?: string | null;
    initialConversationId?: string | null;
  }
) {
  const [config, setConfig] = useState(intialConfig);

  const initialChatflow =
    find(config.chatflows, (chatflow) => chatflow.id === initialChatflowId) ||
    first(config.chatflows);

  const [chatflow, setChatflow] = useState(initialChatflow);

  const conversationData = useConversations();

  const [conversationId, setConversationId] = useState<string | null>(
    initialConversationId || null
  );
  const currentConveration = useConversation(conversationId);

  useEffect(() => {
    if (!currentConveration.data) {
      return;
    }
    chat.setMessages(currentConveration.data.messages as any);
  }, [currentConveration.data]);

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
    if (!currentConveration.data) {
      return;
    }
    intialConfig?.onConversationSelected?.(currentConveration.data);
  }, [currentConveration.data]);

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
    currentConveration,
  };
}
