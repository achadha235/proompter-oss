"use server";
import { Config } from "@proompter/core";

export async function setConversationName(config: Config, req: Request) {
  const user = await config.getRequestUser(req);
  if (!user) {
    throw new Error("Not authenticated");
  }
  const url = new URL(req.url);
  const conversationId = url.searchParams.get("conversationId");
  let name = url.searchParams.get("name");
  if (!name || !conversationId) {
    throw new Error("Missing conversationId");
  }

  const conversation = await config.adapter.getConversation(conversationId);
  if (!conversation) {
    return new Response("Not found", { status: 404 });
  }

  if (conversation.name) {
    return new Response("Already named", { status: 400 });
  }
  await config.adapter.setConversationName(conversationId, name);
  return new Response("OK", { status: 200 });
}
