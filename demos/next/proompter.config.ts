import ProompterPrismaAdapter from "@proompter/adapter-prisma";
import { Conversation, type Config } from "@proompter/core";
import { getServerSession } from "next-auth";

import { authOptions } from "@/auth.config";
import { first, trim } from "lodash";
import OpenAI from "openai";
import prisma from "./src/database";

let openai: OpenAI;

const examples = [
  {
    title: "Order a meal",
    subtitle: "at a restaurant",
    chatMessage: "I want a chicken curry with naan and mango juice.",
  },
  {
    title: "Navigate",
    subtitle: "in the city",
    chatMessage: "Can you tell me where the market is?",
  },
  {
    title: "Negotiate",
    subtitle: "at a shop",
    chatMessage: "I'll give you 1000 rupees for this, that is my final offer.",
  },
  {
    title: "Introduce yourself",
    subtitle: "to others",
    chatMessage: "Hi, my name is Sam. I'm from the United States.",
  },
];

async function nameConversation(firstMessage: string): Promise<string> {
  const namingPrompt = `INSTRUCTIONS: Pick a good descriptive name for this conversation that is less than or equal to 25 characters based on the first message.Do not add words like "Chat" or "Conversation" to the name. Return only the name without any additional quotation marks.\n\nFIRST MESSAGE: ${firstMessage}.`;
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: namingPrompt,
  });

  const conversationName = trim(first(response.choices)!.text.trim(), "\"'");
  return conversationName;
}

async function getRequestUser(_req) {
  const session = await getServerSession(authOptions);
  return session?.user as { id: string };
}

const config: Config = {
  name: "TranslateMan",
  description:
    "I'm C-3PO, fluent in over six million languages. Join me to master languages from Earth and across the galaxy!",
  imageURL: "/c3po.png",
  adapter: new ProompterPrismaAdapter(prisma as any),

  nameConversation,

  getRequestUser,

  conversationStarter: {
    examples,
  },
  chatOptions: {
    sendHistory: false,
  },
  routes: {
    logout: "/auth/logout",
  },
  chatflows: [
    {
      id: "velorum",
      name: "Velorum",
      icon: "language",
      description: ["Advanced translations and transliterations"],
      runner: "flowise",
      options: {
        chatflowId: "aeb3171b-d411-406c-baf3-60a8f66983ad",
      },
    },
    {
      id: "translate",
      name: "Simple Translation",
      icon: "bolt",
      description: ["Basic translations and transliterations"],
      runner: "flowise",
      options: {
        chatflowId: "9b6f5637-06da-43ac-ac67-a32787ff5be2",
      },
    },
    {
      id: "tutor",
      name: "Language Tutor",
      icon: "school",
      description: [
        "Translations & transliterations",
        "with Grammar, vocabulary & Q&A",
      ],
      runner: "flowise",
      options: {
        chatflowId: "fb079dba-bb53-465d-a2ba-48a7d60fd0d6",
      },
    },
  ],
};

export default config;
