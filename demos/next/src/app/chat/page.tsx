import { authOptions } from "@/auth.config";
import ChatGPT from "@/components/ChatGPT";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/login");
  }

  return <ChatGPT session={session} />;
}
