"use server";
import { Config } from "@proompter/core";
import { last } from "lodash";
import { Context } from "..";

export async function getConversation(
  config: Config,
  context: Context,
  req: Request
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
