import { MouseEventHandler } from "react";

/**
 * An example that is presented to a user to begin a chat
 * @param props - the title, subtitle and click handler for the example
 * @returns
 */
export function Example({
  title,
  chatMessage,
  subtitle,
  onClick = undefined,
}: {
  title?: string; // A thing
  chatMessage: string;
  subtitle?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      data-message={chatMessage}
      className="ai-bg-base-100 hover:ai-bg-base-200 ai-shadow-sm hover:ai-shadow-md ai-text-base-content ai-border-base-content ai-border-opacity-25 ai-border ai-p-3 ai-transition-colors ai-rounded-md ai-cursor-pointer ai-aspect-[12/1]"
      onClick={onClick}
    >
      <div className="ai-text-base ai-font-bold">{title}</div>
      <div className="ai-text-sm ai-text-opacity-5 ai-line-clamp-1">
        {subtitle}
      </div>
    </div>
  );
}
