import { UseChatOptions } from "ai";
import { UseChatHelpers } from "ai/react";

export interface Adapter {}

export namespace Chat {
  export interface FlowiseRunnerOptions {
    chatflowId: string;
  }

  export interface Example {
    title: string;
    subtitle?: string;
    chatMessage: string;
  }

  export interface ConversationStarter {
    imageURL?: string;
    title?: string;
    examples: Example[];
  }
  export interface Chatflow {
    /** Unique ID for this chatflow */
    id: string;
    /** Name of the chatflow */
    name: string;
    /** Icon to display for this chatflow */
    icon: string;
    /** Description of the chatflows capabilities and / or features */
    description: string[];
    /** The runner to use for this chatflow */
    runner: "flowise";
    /** Options that will be provided to the runner */
    options: FlowiseRunnerOptions;
    /** The plans under which this chatflow is avaliable */
    plans?: string[];

    /** The examples to display for this chatflow */
    conversationStarter?: ConversationStarter;
  }

  /** An example that can be used to trigger a chat conversation */
}

export interface Config {
  /** Name of the app */
  name: string;
  /** Description of the app */
  description: string;
  /** Logo for the app */
  imageURL: string;

  /** Database adapter to use */
  adapter: Adapter;
  /** Chatflows to expose in the app */
  chatflows: Chat.Chatflow[];

  chatOptions?: UseChatOptions;

  conversationStarter?: Chat.ConversationStarter;
}

export interface User {
  email?: string;
  name?: string;
  imageURL: string;
}
export interface AppContext {
  user?: User;
  config: Partial<Config>; // TODO: make this more accurate
  chatflow: Chat.Chatflow;
  setChatflow: (chatflow: Chat.Chatflow) => any;
  // chat: UseChatHelpers;
}
