import { Chat } from "@proompter/core";
import { ChatflowOption } from "./Option";
import { MouseEvent, useEffect, useRef } from "react";

export function SelectChatFlow({
  chatflows,
  chatflow,
  onChatflowClicked,
}: {
  chatflow: Chat.Chatflow;
  chatflows: Chat.Chatflow[];
  onChatflowClicked: (chatflow: Chat.Chatflow) => void;
}) {
  const dropdown = useRef<HTMLDetailsElement>(null);
  const handleClick = (_e: globalThis.MouseEvent) => {
    dropdown.current?.removeAttribute("open");
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <details ref={dropdown} className="ai-dropdown ai-dropdown-bottom">
      <summary className="ai-bg-base-100 ai-text-base-content hover:ai-bg-base-200 ai-transition-all ai-p-3 ai-rounded-box ai-flex ai-items-center ai-justify-between ai-gap-1 ai-cursor-pointer ai-border-none ai-outline-none">
        <span className="ai-text-lg">{chatflow.name}</span>
        <span className="material-symbols-outlined ai-opacity-50">
          expand_more
        </span>
      </summary>

      <ul className="ai-dropdown-content ai-z-[1] ai-mt-2 ai-shadow-sm ai-bg-base-100 ai-rounded-box ai-text-base-content ai-border ai-border-base-content ai-border-opacity-10 ai-join-vertical">
        {chatflows.map((cf, i) => {
          const showDivider =
            chatflows.length > 1 && i !== chatflows.length - 1;
          return (
            <>
              <ChatflowOption
                key={cf.name}
                chatflow={cf}
                selected={cf.id === chatflow.id}
                onClick={(e) => {
                  // Close the dropdown
                  (e.target as HTMLLIElement)
                    .closest("details")
                    ?.removeAttribute("open");
                  onChatflowClicked(cf);
                }}
              />
              {showDivider && (
                <div className="ai-divider ai-my-0 ai-py-0 ai-h-0" />
              )}
            </>
          );
        })}

        <div className="ai-divider ai-my-0 ai-py-0 ai-h-0" />
      </ul>
    </details>
  );
}
