import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth.config";
import Logout from "@/components/Logout";

export default async function LogoutPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return <Logout />;
}
