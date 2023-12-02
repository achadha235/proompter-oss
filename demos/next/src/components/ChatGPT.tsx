"use client";
import config from "@/proompter.config";
import { App, ConfigProvider } from "@proompter/react";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function ChatGPT({ session }) {
  return (
    <SessionProvider session={session}>
      <ConfigProvider config={config}>
        <App />
      </ConfigProvider>
    </SessionProvider>
  );
}
