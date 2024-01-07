// import prisma from "./src/database";
import { Adapter, type Config } from "@proompter/core";
// import ProompterPrismaAdapter from "@proompter/adapter-prisma";

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

export const config: Config = {
  name: "C-3PO",
  description:
    "I'm C-3PO, fluent in over six million languages. Join me to master languages from Earth and across the galaxy!",
  imageURL: "https://robohash.org/c3po",
  adapter: {} as Adapter,
  getRequestUser(req) {
    return Promise.resolve({ id: "12345" });
  },
  conversationStarter: {
    examples,
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
