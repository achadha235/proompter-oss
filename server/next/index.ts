"use server";
import { Config } from "@proompter/core";
import { getConversation } from "./routes/getConversation";
import { getConversations } from "./routes/getConversations";
import { processChat } from "./routes/processChat";
import { setConversationName } from "./routes/setConversationName";
import { pathToRegexp, match, parse, compile } from "path-to-regexp";

export interface Context {
  params: { endpoint: string[] };
}

// TODO: use regex based matching / parsing for routes
// const routes = {
//   chat: pathToRegexp("/chat"),
//   getConversations: pathToRegexp("/chat/conversations"),
//   getConversation: pathToRegexp("/chat/conversation/:conversationId"),
//   setConversationName: pathToRegexp("/chat/conversation/:conversationId/name"),
//   archiveConversation: pathToRegexp(
//     "/chat/conversation/:conversationId/archive"
//   ),
// };

export async function Chat(
  req: Request,
  context: Context,
  config: Config
): Promise<Response> {
  const endpoint = "/" + context.params.endpoint.join("/");

  if (endpoint === "/chat") {
    return await processChat(req, config);
  }

  if (endpoint.startsWith("/chat/conversations")) {
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
