"use client";

import config from "@/proompter.config";
import { App } from "@proompter/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function ChatGPT({ session }: { session: Session }) {
  return (
    <SessionProvider session={session}>
      <App
        user={{
          name: session.user?.name!,
          email: session.user?.email!,
          imageURL: session.user?.image!,
        }}
        proompterConfig={config}
      />
    </SessionProvider>
  );
}
