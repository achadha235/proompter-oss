import clsx from "clsx";
import { ReactNode } from "react";

export interface ConversationHeaderProps {
  className?: string;
  imageURL?: string;
  title?: string;
  children?: ReactNode;
}

export function ConversationHeader({
  className = "",
  imageURL = undefined,
  title = undefined,
  children,
}: ConversationHeaderProps) {
  return (
    <div
      className={clsx(
        "ai-w-full ai-flex ai-flex-col ai-justify-center ai-items-center ai-gap-2",
        className
      )}
    >
      {imageURL && (
        <div className="ai-avatar">
          <div className="ai-w-24 ai-rounded-full ai-bg-primary">
            <img className="ai-w-24 ai-h-24" src={imageURL} alt="logo" />
          </div>
        </div>
      )}
      {title && <div className=" ai-text-2xl ai-font-semibold">{title}</div>}
      {children}
    </div>
  );
}
