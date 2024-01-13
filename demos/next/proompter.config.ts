import { getServerSession } from "next-auth";
import { type Config } from "@proompter/core";
import ProompterPrismaAdapter from "@proompter/adapter-prisma";

import prisma from "./src/database";
import { authOptions } from "@/auth.config";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { first, trim } from "lodash";

let openai: OpenAI;

const examples = [
  {
    title: "Recommend a dish",
    subtitle: "to bring to a potluck",
    chatMessage: "I want to make a dish for a potluck. What should I make?",
  },
  {
    title: "Brainstorm incentives",
    subtitle: "for a customer loyalty program in a small bookstore",
    chatMessage:
      "Can you help me brainstorm 7 ideas for a customer loyalty program? I work at a small bookstore.",
  },
  {
    title: "Write an email",
    subtitle: "requesting a deadline extension for my project",
    chatMessage:
      "Write a short email to my professor requesting a deadline extension for my project. I don't really have a good excuse, and I'm fine owning up to that – so please keep it real!",
  },
  {
    title: "Design a database schema",
    subtitle: "for an online merch store",
    chatMessage: "Design a database schema for an online merch store.",
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

  console.log("response: ", first(response.choices)!.text);
  const conversationName = trim(first(response.choices)!.text.trim(), "\"'");
  console.log("conversationName: ", conversationName);
  return conversationName;
}

async function getRequestUser(_req) {
  const session = await getServerSession(authOptions);
  return session?.user as { id: string };
}

const config: Config = {
  name: "C-3PO",
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
