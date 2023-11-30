"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    void signOut({ redirect: false }).then(() => {
      router.push("/");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <span className="loading loading-spinner"></span>;
}
