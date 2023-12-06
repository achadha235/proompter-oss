import { User } from "@proompter/core";
import clsx from "clsx";

export function StartConversationButton({
  imageURL,
  title,
  className,
}: {
  imageURL: string;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        "ai-flex ai-flex-row ai-items-center ai-p-2 ai-gap-2 hover:ai-bg-base-200 ai-cursor-pointer ai-rounded-btn"
      )}
    >
      <div className="ai-avatar">
        <div className="ai-w-8 ai-rounded-full ai-bg-primary">
          <img className="ai-h-full ai-w-full" src={imageURL} alt="logo" />
        </div>
      </div>
      <div className=" ai-text-base-content ai-text-sm ai-font-bold">
        {title}
      </div>
      <div className=" ai-ml-auto">
        <span className="material-symbols-outlined">edit</span>
      </div>
    </div>
  );
}
