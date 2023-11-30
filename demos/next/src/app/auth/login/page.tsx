import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { AuthHeader } from "@/components/AuthHeader";
import { LoginForm } from "@/components/LoginForm";
import { authOptions } from "@/auth.config";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  return (
    <div className="bg-background-paper w-full max-w-md shadow-lg h-fit min-h-[650px] py-8">
      <AuthHeader subtitle="Get started for free" />
      <br />
      <LoginForm session={session} />
    </div>
  );
}
