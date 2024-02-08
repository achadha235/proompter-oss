"use server";
import { Config } from "@proompter/core";

export async function getConversations(
  config: Config,
  req: Request
): Promise<Response> {
  const user = await config.getRequestUser(req);
  if (!user) {
    throw new Error("Not authenticated");
  }

  const url = new URL(req.url);
  const cursor = url.searchParams.get("cursor");
  const limit = parseInt(url.searchParams.get("limit") || "25");
  const conversations = await config.adapter.getConversations(
    user.id,
    cursor,
    limit
  );

  return new Response(JSON.stringify(conversations), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
