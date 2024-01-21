import { Config, Chat, Conversation } from "@proompter/core";
import { useEffect, useState } from "react";
import { find, first, initial, isNil } from "lodash";
import { useChat } from "ai/react";
import useConversations from "./useConversations";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

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

    let result;
    if (response.headers.get("Content-Type") === "application/json") {
      result = response.json();
    } else {
      result = response.text();
    }
    return result as Promise<Result>;
  };

export function useConversation(id: string | null) {
  return useSWR(
    id && "/api/proompter/chat/conversation/" + id,
    getData<Conversation>()
  );
}

export function useRenameConversation() {
  return useSWRMutation(
    "/api/proompter/chat/conversation/name",
    postData<{ id: string; name: string }, string>()
  );
}

export function useProompter(
  intialConfig: Config,
  {
    onChatflowSelected,
    initialConversationId,
    initialChatflowId,
  }: {
    onChatflowSelected?: (chatflow: Chat.Chatflow) => void;
    initialConversationId?: string;
    initialChatflowId?: string | null;
  }
) {
  const [config, setConfig] = useState(intialConfig);

  const initialChatflow =
    find(config.chatflows, (chatflow) => chatflow.id === initialChatflowId) ||
    first(config.chatflows);

  debugger;
  const [chatflow, setChatflow] = useState(initialChatflow);

  const conversationData = useConversations();

  const [conversationId, setConversationId] = useState<string | null>(
    initialConversationId || null
  );
  const currentConveration = useConversation(conversationId);

  const renameConversationData = useRenameConversation();

  async function renameConversation(id: string, name: string) {
    await renameConversationData.trigger({ id, name });
    await conversationData.mutate();
  }

  useEffect(() => {
    if (currentConveration.isLoading || currentConveration.isValidating) {
      return;
    }
    if (isNil(currentConveration.data)) {
      if (conversationId) {
        intialConfig?.onConversationSelected?.(null);
        setConversationId(null);
      }
      return;
    }
    intialConfig?.onConversationSelected?.(currentConveration.data);
    chat.setMessages(currentConveration.data.messages as any);
  }, [
    currentConveration.data,
    currentConveration.isLoading,
    currentConveration.isValidating,
  ]);

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
    if (currentConveration.data?.flowId !== chatflow?.id) {
      setChatflow(
        find(
          config.chatflows,
          (chatflow) => chatflow.id === currentConveration.data?.flowId
        )
      );
    }
    if (!currentConveration.isLoading && !currentConveration.isValidating) {
      intialConfig?.onConversationSelected?.(currentConveration.data);
    }
  }, [currentConveration.data]);

  useEffect(() => {
    if (!chatflow) {
      return;
    }
    onChatflowSelected?.(chatflow);
  }, [chatflow]);

  useEffect(() => {
    if (!conversationId) {
      chat.setMessages([]);

      if (chat.isLoading) {
        chat.stop();
      }
      config.onNewConversationStarted?.();
    }
  }, [conversationId]);

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
    renameConversation,
    renameConversationData,
  };
}
