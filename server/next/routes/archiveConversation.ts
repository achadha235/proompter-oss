"use server";
import { Config } from "@proompter/core";

export async function archiveConversation(config: Config, req: Request) {
  const user = await config.getRequestUser(req);
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await req.json();
  const archived = data.archived;
  const id = data.id;

  if (!id || typeof archived !== "boolean") {
    return new Response("Not found", { status: 404 });
  }

  const conversation = await config.adapter.getConversation(id);
  if (!conversation) {
    return new Response("Not found", { status: 404 });
  }

  await config.adapter.setConversationArchived(id, archived);

  return new Response("OK", { status: 200 });
}
