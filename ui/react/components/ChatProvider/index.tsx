import { UseChatHelpers } from "ai/react";
import { createContext } from "react";

export const ChatContext = createContext<UseChatHelpers>({} as UseChatHelpers);

export const ChatProvider = ChatContext.Provider;
