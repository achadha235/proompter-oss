"use server";
import { Config, PredictArgs } from "@proompter/core";
import runner from "@proompter/runner-flowise";
import { StreamingTextResponse } from "ai";
import { isEqual, last } from "lodash";
import { IChatMessage } from "../../monorepos/flowise/packages/server/dist/Interface";

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
      message: last(args.messages) as IChatMessage,
      history: [],
    });

    return new StreamingTextResponse(stream);
  }
  return new Response("Not found", { status: 404 });
}
