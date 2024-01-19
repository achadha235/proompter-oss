"use server";
import { Config } from "@proompter/core";
import { getConversation } from "./routes/getConversation";
import { getConversations } from "./routes/getConversations";
import { processChat } from "./routes/processChat";
import { setConversationName } from "./routes/setConversationName";

export interface Context {
  params: { endpoint: string[] };
}

export async function Chat(
  req: Request,
  context: Context,
  config: Config
): Promise<Response> {
  console.log(context.params.endpoint);

  const endpoint = "/" + context.params.endpoint.join("/");

  if (endpoint === "/chat") {
    return await processChat(req, config);
  }

  if (endpoint === "/chat/conversations") {
    return await getConversations(config, req);
  }

  if (endpoint === "/chat/conversation/name") {
    return await setConversationName(config, req);
  }

  if (
    endpoint.startsWith("/chat/conversation/") &&
    context.params.endpoint.length === 3
  ) {
    return getConversation(config, context, req);
  }
  return new Response("Not found", { status: 404 });
}
