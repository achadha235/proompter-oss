import { useProompter } from "@/hooks/useProompter";
import { createContext } from "react";

const ConversationsContext = createContext({});

function ConversationProvider({ children, initialConfig }: any) {
  // const c = useProompter(initialConfig);
  const c = {};
  return (
    <ConversationsContext.Provider value={c}>
      {children}
    </ConversationsContext.Provider>
  );
}
