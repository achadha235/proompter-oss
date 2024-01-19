"use server";
import { Config } from "@proompter/core";

export async function setConversationName(config: Config, req: Request) {
  const user = await config.getRequestUser(req);
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await req.json();
  const name = data.name;
  const id = data.id;

  if (!name || !id) {
    return new Response("Not found", { status: 404 });
  }

  const conversation = await config.adapter.getConversation(id);
  if (!conversation) {
    return new Response("Not found", { status: 404 });
  }

  await config.adapter.setConversationName(id, name);

  return new Response("OK", { status: 200 });
}
