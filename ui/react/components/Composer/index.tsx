import { UseChatHelpers } from "ai/react";
import clsx from "clsx";
import { KeyboardEvent, SyntheticEvent } from "react";
import ReactTextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";
export interface ComposerProps {
  className?: string;
  placeholder?: string;
  chat?: UseChatHelpers;
  textAreaProps?: TextareaAutosizeProps;
}

export function Composer({
  chat,
  className = "",
  placeholder = "Type a message",
}: ComposerProps) {
  const submitMessage = (e: SyntheticEvent<any>) => {
    chat?.handleSubmit(e);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // If enter is pressed and no shift key detected, prevent default and submit
    if (!chat?.isLoading && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitMessage(e);
    }
  };

  return (
    <form
      onSubmit={chat?.handleSubmit}
      className={clsx(
        "ai-rounded-btn ai-border-opacity-30 ai-border ai-border-base-content ai-pl-4 ai-p-2 ai-flex ai-gap-2 ai-bg-base-100 ai-shadow-sm",
        className
      )}
    >
      <ReactTextareaAutosize
        id="composer-input"
        autoFocus={true}
        value={chat?.input}
        onChange={chat?.handleInputChange}
        onKeyDown={onKeyDown}
        name="question"
        minRows={1}
        maxRows={6}
        placeholder={placeholder}
        className=" ai-text-lg ai-flex-grow ai-w-auto ai-my-auto ai-resize-none ai-bg-transparent ai-outline-none"
      />
      <button
        className={"ai-mt-auto"}
        disabled={chat?.input.length === 0}
        type="submit"
      >
        <div
          className={clsx(
            "ai-w-full ai-btn-primary ai-btn ai-aspect-square ai-btn-sm",
            {
              "ai-btn-disabled": chat?.input.length === 0 && !chat?.isLoading,
            }
          )}
        >
          <span
            className="material-symbols-outlined ai-text-primary-content"
            style={{ fontSize: "1.8rem" }}
          >
            {chat?.isLoading ? "stop_circle" : "arrow_upward"}
          </span>
        </div>
      </button>
    </form>
  );
}
