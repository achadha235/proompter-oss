"use client";

import config from "@/proompter.config";

import dynamic from "next/dynamic";
const App = dynamic(() => import("@proompter/react").then((mod) => mod.App), {
  ssr: false,
});
// import { App } from "@proompter/react";

import { SessionProvider } from "next-auth/react";
export default function ChatGPT({ session }) {
  return (
    <SessionProvider session={session}>
      <App proompterConfig={config} />
    </SessionProvider>
  );
}
