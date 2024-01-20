"use server";
import { Config } from "@proompter/core";
import runner from "@proompter/runner-flowise";
import { StreamingTextResponse, nanoid } from "ai";
import { last } from "lodash";
import { streamWithPromise } from "../utils/streamWithPromise";
import { IChatMessage } from "../../../monorepos/flowise/packages/server/dist/Interface";
import { saveResponseMessage } from "../utils/saveResponseMessage";

export async function processChat(req: Request, config: Config) {
  const args = await req.json();
  const user = await config.getRequestUser(req);
  if (!user) {
    throw new Error("Not authenticated");
  }
  // const data = new experimental_StreamData();
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
    ? await config.adapter.startConversation(user.id, chatflowId)
    : await config.adapter.getConversation(conversationId);

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  const chatMessage = last(args.messages) as IChatMessage;

  let saveNamePromise: Promise<void> | undefined;
  if (!conversationId) {
    saveNamePromise = config
      .nameConversation(chatMessage.content)
      .then((conversationName) => {
        // data.append({ name: conversationName });
        return config.adapter.setConversationName(
          conversation.id,
          conversationName
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

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

  const saveConversationPromise = saveUserChatMessagePromise.then(() => {
    return saveResponseMessage(
      saveMessageStream,
      conversation.id,
      config,
      replyId
    );
  });

  const streamWithSaveMessages = await streamWithPromise(
    responseStream,
    saveConversationPromise
  );
  const finalResponseStream = streamWithSaveMessages.readable;

  return new StreamingTextResponse(finalResponseStream, {
    headers: {
      "Conversation-Id": conversation.id,
      "AI-Response-Id": replyId,
    },
  });
}
