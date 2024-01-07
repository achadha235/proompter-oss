"use server";
import { Config } from "@proompter/core";
import runner from "@proompter/runner-flowise";
import { StreamingTextResponse, nanoid } from "ai";
import { isEqual, last } from "lodash";
import { IChatMessage } from "../../monorepos/flowise/packages/server/dist/Interface";

/**
 * Helper to couple a readable stream with a promise
 * The new resulting stream will close once the original stream is closed AND the promise is resolved
 * This is useful when you have an ephemeral cloud fn that will terminate as soon as the HTTP stream is closed
 * It allows you to (1) quickly return an event stream to the client and then (2) do some cleanup after the original stream is closed before closing the transformed stream
 * @param stream
 * @param promise
 * @returns
 */

async function streamWithPromise(
  stream: ReadableStream<any>,
  promise: Promise<any>
) {
  const transformStream = new TransformStream();

  const pipeComplete = stream.pipeTo(transformStream.writable, {
    preventClose: true,
  });

  Promise.all([pipeComplete, promise]).then(() => {
    // Close the transform stream once the original stream is closed AND the promise is resolved
    transformStream.writable.close();
  });

  return transformStream;
}

export async function Chat(
  req: Request,
  context: { params: { endpoint: string } },
  config: Config
): Promise<Response> {
  if (isEqual(context.params.endpoint, ["chat"])) {
    const args = await req.json();
    const user = await config.getRequestUser(req);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const chatUser = await config.adapter.getChatUser(user);
    if (!chatUser) {
      throw new Error("Chat user not found");
    }

    const chatflowId = args.chatflowId;
    const conversationId = args.conversationId;
    const flow = config.chatflows.find((f) => f.id === chatflowId);

    if (!flow) {
      throw new Error("Chatflow not found");
    }

    // TODO: refactor this into a validateChatflow function
    if (flow.runner !== "flowise") {
      throw new Error("No runner avaliable for chatflow " + flow.runner);
    }

    const conversation = !conversationId
      ? await config.adapter.startConversation(user.id)
      : await config.adapter.getConversation(conversationId);
    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const chatMessage = last(args.messages) as IChatMessage;

    const saveUserChatMessagePromise = config.adapter.saveMessage(
      conversation.id,
      {
        id: chatMessage.id,
        content: chatMessage.content,
        role: "user",
        type: "text",
      }
    );

    const stream = await runner.run(flow.options.chatflowId, {
      conversationId: conversation.id,
      message: chatMessage,
      history: conversation.messages.map((m) => {
        return {
          message: m.content,
          type: m.role === "user" ? "userMessage" : "apiMessage",
        };
      }),
    });

    const [responseStream, saveMessageStream] = stream.tee();
    const replyId = nanoid();

    const saveConversationPromise = saveUserChatMessagePromise
      .then(() => {
        console.log("Saved user message!");
        return saveResponseMessage(
          saveMessageStream,
          conversation.id,
          config,
          replyId
        );
      })
      .then(() => {
        console.log("Saved response message!");
      });

    const streamWithSaveMessages = await streamWithPromise(
      responseStream,
      saveConversationPromise
    );
    const finalResponseStream = streamWithSaveMessages.readable;

    return new StreamingTextResponse(finalResponseStream, {
      headers: {
        ConversationId: conversation.id,
        "AI-Response-Id": replyId,
      },
    });
  } else if (isEqual(context.params.endpoint, ["chat", "conversations"])) {
    console.log("Getting conversations");

    const user = await config.getRequestUser(req);
    if (!user) {
      throw new Error("Not authenticated");
    }
    const url = new URL(req.url);

    const cursor = url.searchParams.get("cursor");
    const limit = parseInt(url.searchParams.get("limit") || "25");

    console.log(
      "Getting conversations cursor:" +
        cursor +
        " limit: " +
        limit +
        " userid: " +
        user.id
    );

    const conversations = await config.adapter.getConversations(
      user.id,
      cursor,
      limit
    );
    return new Response(JSON.stringify(conversations), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return new Response("Not found", { status: 404 });
}

async function saveResponseMessage(
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
