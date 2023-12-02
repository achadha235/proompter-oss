import { Chat } from "@proompter/core";
import clsx from "clsx";
import { MouseEventHandler } from "react";

export function ChatflowOption({
  onClick,
  chatflow,
  selected = false,
}: {
  onClick?: MouseEventHandler<HTMLLIElement>;
  chatflow: Chat.Chatflow;
  selected?: boolean;
}) {
  return (
    <li
      onClick={onClick}
      className="ai-w-96 ai-m-2 ai-p-4 hover:ai-bg-base-200 ai-rounded-box ai-cursor-pointer"
    >
      <div className="ai-flex ai-gap-2 ai-items-start">
        <span className="material-symbols-outlined ai-opacity-50">
          {chatflow.icon}
        </span>
        <div>
          <div className="ai-text-base ai-font-medium">{chatflow.name}</div>
          <div className="ai-text-sm ai-whitespace-pre-wrap ai-mt-2">
            {chatflow.description.join("\n")}
          </div>
        </div>
        <span
          className={clsx(
            "material-symbols-outlined ai-ml-auto",
            selected ? "ai-opacity-50" : "ai-opacity-0"
          )}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
      </div>
    </li>
  );
}
