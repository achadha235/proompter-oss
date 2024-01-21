import { authOptions } from "@/auth.config";
import ChatGPT from "@/components/ChatGPT";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const session = await getServerSession(authOptions);

  let conversationId: string | undefined;
  if (
    params.conversationId &&
    params.conversationId[0] === "c" &&
    params.conversationId.length === 2
  ) {
    conversationId = params.conversationId[1];
  }

  if (!session?.user) {
    redirect("/auth/login");
  }

  return <ChatGPT session={session} />;
}
