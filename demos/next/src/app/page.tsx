import { authOptions } from "@/auth.config";
import Homepage from "@/components/Homepage";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <Homepage />;
  } else {
    redirect("/chat");
  }
}
