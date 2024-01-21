"use client";

import config from "@/proompter.config";
import { Conversation } from "@proompter/core";
import { App } from "@proompter/react";
import { first, isEqual, isNil, last } from "lodash";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function ChatGPT({ session }: { session: Session }) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const flowIdSearchParam = "flow";
  const urlParamFlowId = searchParams.get(flowIdSearchParam);

  const [currentChatflowId, setCurrentChatflowId] = useLocalStorage(
    flowIdSearchParam,
    (urlParamFlowId || first(config.chatflows)?.id)!
  );

  const shouldUpdateURL = useRef(false);
  useEffect(() => {
    if (shouldUpdateURL.current === true && currentChatflowId) {
      const url = new URL(window.location.href);
      url.searchParams.set(flowIdSearchParam, currentChatflowId);
      window.history.pushState({}, "", url);
    }
  }, [currentChatflowId, router]);

  async function onConversationSelected(conversation: Conversation | null) {
    if (isNil(conversation)) {
      if (params.conversationId) {
        window.history.pushState({}, "", "/chat");
      }
      return;
    }
    if (!isEqual(params.conversationId, ["c", conversation.id])) {
      window.history.pushState({}, "", "/chat/c/" + conversation.id);
      return;
    }
  }

  async function onChatflowSelected(chatflow) {
    if (currentChatflowId !== chatflow.id) {
      setCurrentChatflowId(chatflow.id);
      shouldUpdateURL.current = true;
    }
  }

  function onNewConversationClicked() {
    if (params.conversationId) {
      window.history.pushState({}, "", "/chat");
    }
  }

  function onLogoutPressed() {
    router.push("/auth/logout");
  }
  return (
    <SessionProvider session={session}>
      <App
        initialConversationId={last(params.conversationId)}
        onChatflowSelected={onChatflowSelected}
        onLogoutPressed={onLogoutPressed}
        onNewConversationClicked={onNewConversationClicked}
        proompterConfig={{
          ...config,
          onConversationSelected,
        }}
        user={{
          name: session.user?.name!,
          email: session.user?.email!,
          imageURL: session.user?.image!,
        }}
      />
    </SessionProvider>
  );
}
