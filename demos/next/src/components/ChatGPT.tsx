"use client";

import config from "@/proompter.config";
import { App } from "@proompter/react";
import { first } from "lodash";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function ChatGPT({ session }: { session: Session }) {
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
      router.replace(url.toString());
    }
  }, [currentChatflowId, router]);

  return (
    <SessionProvider session={session}>
      <App
        initialChatflowId={urlParamFlowId || currentChatflowId}
        onChatflowSelected={(chatflow) => {
          if (currentChatflowId !== chatflow.id) {
            setCurrentChatflowId(chatflow.id);
            shouldUpdateURL.current = true;
          }
        }}
        onLogoutPressed={() => router.push("/auth/logout")}
        proompterConfig={config}
        user={{
          name: session.user?.name!,
          email: session.user?.email!,
          imageURL: session.user?.image!,
        }}
      />
    </SessionProvider>
  );
}
