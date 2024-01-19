import { User } from "@proompter/core";
import clsx from "clsx";

export interface StartConversationButtonProps {
  imageURL: string;
  title: string;
  className?: string;
  buttonOnly?: boolean;
  onClick?: () => void;
}

export function StartConversationButton({
  imageURL,
  title,
  className,
  buttonOnly = false,
  onClick,
}: StartConversationButtonProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "ai-flex ai-flex-row ai-items-center ai-p-2 ai-gap-2 hover:ai-bg-base-200 ai-cursor-pointer ai-rounded-btn",
        className
      )}
    >
      {!buttonOnly && (
        <>
          <div className="ai-avatar">
            <div className="ai-w-8 ai-rounded-full ai-bg-primary">
              <img className="ai-h-full ai-w-full" src={imageURL} alt="logo" />
            </div>
          </div>
          <div className=" ai-text-base-content ai-text-sm ai-font-bold ai-line-clamp-1 ai-overflow-hidden">
            {title}
          </div>
        </>
      )}

      <div className=" ai-ml-auto">
        <span className="material-symbols-outlined">edit</span>
      </div>
    </div>
  );
}
