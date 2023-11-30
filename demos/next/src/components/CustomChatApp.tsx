"use client";

import { App } from "@proompter/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function CustomChatApp() {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/auth/login");
    },
  });

  return <App />;
}
