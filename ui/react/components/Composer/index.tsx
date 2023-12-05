import clsx from "clsx";
import ReactTextareaAutosize from "react-textarea-autosize";

export function Composer({ className = "", placeholder = "Type a message" }) {
  return (
    <div
      className={clsx(
        "ai-rounded-btn ai-border ai-border-base-content ai-pl-4 ai-p-2 ai-flex ai-gap-2 ai-bg-base-100",
        className
      )}
    >
      <ReactTextareaAutosize
        minRows={1}
        maxRows={6}
        placeholder={placeholder}
        className=" ai-text-lg ai-flex-grow ai-w-auto ai-my-auto ai-resize-none ai-bg-transparent ai-outline-none"
      />
      <div className="ai-btn ai-aspect-square ai-mt-auto ai-btn-sm ai-btn-primary  small">
        <span className="material-symbols-outlined">arrow_upward</span>
      </div>
    </div>
  );
}
