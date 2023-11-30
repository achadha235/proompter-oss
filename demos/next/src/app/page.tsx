import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth.config";
import AppSession from "@/components/AppSession";
import CustomChatApp from "@/components/CustomChatApp";
import Homepage from "@/components/Homepage";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Homepage />;
  }
  return (
    <AppSession session={session}>
      <CustomChatApp />
    </AppSession>
  );
}
