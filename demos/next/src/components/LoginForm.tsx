"use client";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SignInResponse, signIn } from "next-auth/react";

export function LoginForm({ session }) {
  const searchParams = useSearchParams();
  const redirectURL = searchParams.get("redirect") || "/";
  const [isMutating, setIsMutating] = useState(false);
  const [data, setData] = useState<SignInResponse | undefined>(undefined);

  async function signInWithProvider(provider: string) {
    try {
      setIsMutating(true);
      const result = await signIn(provider, {
        redirect: false,
      });
      setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (data?.error) {
      return;
    }
    if (data?.ok && data.status === 200) {
      redirect(redirectURL || "/");
    }
  }, [data]);

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        onClick={() => {
          void signInWithProvider("github");
        }}
        disabled={isMutating}
        className="btn btn-lg"
      >
        <img alt="gh" src="/google.png" className="h-5 w-5" />
        Continue with Google
      </button>
      <button
        onClick={() => {
          signInWithProvider("google");
        }}
        disabled={isMutating}
        className="btn btn-lg"
      >
        <img alt="gh" src="/github-mark.svg" className="h-5 w-5" />
        Continue with GitHub
      </button>
    </div>
  );
}
