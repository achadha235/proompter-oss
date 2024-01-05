"use client";

import config from "@/proompter.config";
import { App } from "@proompter/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ChatGPT({ session }: { session: Session }) {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <App
        onLogoutPressed={() => router.push("/auth/logout")}
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
