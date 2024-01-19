"use server";
import { Config } from "@proompter/core";
import { isEqual, last } from "lodash";
import { getConversations } from "./routes/getConversations";
import { processChat } from "./routes/processChat";

export async function Chat(
  req: Request,
  context: { params: { endpoint: string } },
  config: Config
): Promise<Response> {
  console.log(context.params.endpoint);

  if (isEqual(context.params.endpoint, ["chat"])) {
    return await processChat(req, config);
  } else if (isEqual(context.params.endpoint, ["chat", "conversations"])) {
    return await getConversations(config, req);
  } else if (
    isEqual(context.params.endpoint, ["chat", "conversation", "name"])
  ) {
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
  } else if (
    isEqual(context.params.endpoint.slice(0, 2), ["chat", "conversation"]) &&
    context.params.endpoint.length === 3
  ) {
    const id = last(context.params.endpoint);
    if (!id) {
      return new Response("Not found", { status: 404 });
    }
    const converation = await config.adapter.getConversation(id);
    return new Response(JSON.stringify(converation), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return new Response("Not found", { status: 404 });
}
