import { Config } from "@proompter/core";
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
