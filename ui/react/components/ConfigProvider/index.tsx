import { ReactNode, createContext, useEffect, useState } from "react";
import { AppContext, Chat } from "@proompter/core";
import { first } from "lodash";
import { UseChatOptions, useChat } from "ai/react";
export const ConfigContext = createContext<AppContext>({} as AppContext);

export const ConfigProvider = ({
  user,
  config,
  children,
}: {
  user?: AppContext["user"];
  config: AppContext["config"];
  children: ReactNode;
}) => {
  const [chatflow, setChatflow] = useState<Chat.Chatflow>(
    first(config.chatflows) as Chat.Chatflow
  );

  return (
    <ConfigContext.Provider
      value={{
        user,
        config,
        chatflow,
        setChatflow,
        // chat,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
