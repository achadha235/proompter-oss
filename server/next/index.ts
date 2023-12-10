import { Config, PredictArgs } from "@proompter/core";
import { NextResponse } from "next/server";
import { getChatflows } from "@proompter/runner-flowise";

export async function Chat(
  req: Request,
  context: { params: { endpoint: string[] } },
  config: Config
): Promise<Response> {
  console.log(context);
  // console.log(JSON.stringify(config));
  console.log(await config.adapter.test());
  const chatflows = await getChatflows();
  return Response.json({
    chatflows,
    hello: "world",
    name: config.name,
    t: typeof config.adapter,
  });
}

async function predict(
  { messages, userId, conversationId, chatflowId }: PredictArgs,
  config: Config
) {
  // Look up chatflow if it exists, throw an error if it dosnt

  // Look up conversation if it exists. If it dosn't, create it.

  // Pull up runner for this chatflow

  // Run the runner with the correct options and return a streaming response

  // Save the tokens to the database as the response is streaming back

  // In case the socket is terminated, stop the runner and save the message error state

  return;
}
