"use server";
import { Config, PredictArgs } from "@proompter/core";
import runner from "@proompter/runner-flowise";
import { StreamingTextResponse } from "ai";
import { isEqual } from "lodash";

export async function Chat(
  req: Request,
  context: { params: { endpoint: string } },
  config: Config
): Promise<Response> {
  if (isEqual(context.params.endpoint, ["chat"])) {
    const args = await req.json();
    const chatflowId = "translate";
    const flow = config.chatflows.find((f) => f.id === chatflowId);

    if (!flow) {
      throw new Error("Chatflow not found");
    }

    if (flow.runner !== "flowise") {
      throw new Error("No runner avaliable for chatflow " + flow.runner);
    }

    const stream = await runner.run(flow.options.chatflowId, {
      message: {
        id: "1",
        content: "Hello",
      } as any,
      history: [],
    });

    return new StreamingTextResponse(stream);
  }
  return Response.json({
    hello: "world",
    name: config.name,
  });
}

async function predict(
  { messages, userId, conversationId, chatflowId }: PredictArgs,
  config: Config
) {
  console.log("HELLO");

  // Look up chatflow if it exists, throw an error if it dosnt

  // Look up conversation if it exists. If it dosn't, create it.

  // Pull up runner for this chatflow

  // Run the runner with the correct options and return a streaming response

  // Save the tokens to the database as the response is streaming back

  // In case the socket is terminated, stop the runner and save the message error state

  // return new StreamingTextResponse();
}
