"use server";
import { Config } from "@proompter/core";
import { nanoid } from "ai";

export async function saveResponseMessage(
  stream: ReadableStream<any>,
  conversationId: string,
  config: Config,
  messageId?: string
) {
  const reader = stream.getReader();
  let done = false;
  let message = "";
  while (!done) {
    const { done: readerDone, value } = await reader.read();
    if (readerDone) {
      done = true;
    }
    if (value !== undefined) {
      message += value;
    }
  }

  await config.adapter.saveMessage(conversationId, {
    id: messageId || nanoid(),
    content: message,
    role: "assistant",
    type: "text",
  });
}
