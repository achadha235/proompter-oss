import prisma from "@/database";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const githubProvider = GitHubProvider({
  clientId: process.env["GITHUB_AUTH_CLIENT_ID"]!,
  clientSecret: process.env["GITHUB_AUTH_CLIENT_SECRET"]!,
  authorization: {
    params: { scope: "read:user user:email" },
  },
  profile(profile) {
    return {
      id: profile.id.toString(),
      name: profile.name || profile.login,
      email: profile.email,
      image: profile.avatar_url,
    };
  },
});

const googleProvider = GoogleProvider({
  clientId: process.env["GOOGLE_AUTH_CLIENT_ID"]!,
  clientSecret: process.env["GOOGLE_AUTH_CLIENT_SECRET"]!,
});

export const authOptions: AuthOptions = {
  secret: process.env["NEXTAUTH_SECRET"],
  providers: [googleProvider, githubProvider],
  adapter: PrismaAdapter(prisma),
  debug: process.env["NODE_ENV"] === "development",
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
};

export const config = NextAuth(authOptions);
