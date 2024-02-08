import { UseChatHelpers } from "@proompter/ai/react";
import { createContext } from "react";

export const ChatContext = createContext<UseChatHelpers>({} as UseChatHelpers);

export const ChatProvider = ChatContext.Provider;
