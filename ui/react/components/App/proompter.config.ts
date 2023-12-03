import { type Config } from "@proompter/core";

export const config: Config = {
  name: "C-3PO",
  description:
    "I'm C-3PO, fluent in over six million languages. Join me to master languages from Earth and across the galaxy!",
  imageURL: "/c3po.png",
  adapter: {},
  chatflows: [
    {
      id: "123",
      name: "Blah",
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
