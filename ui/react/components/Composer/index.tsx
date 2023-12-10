import clsx from "clsx";
import ReactTextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";
import { UseChatHelpers } from "ai/react";
import { KeyboardEvent, SyntheticEvent } from "react";
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
        "ai-rounded-btn ai-border ai-border-base-content ai-pl-4 ai-p-2 ai-flex ai-gap-2 ai-bg-base-100",
        className
      )}
    >
      <ReactTextareaAutosize
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
        type="submit"
        className="ai-btn ai-aspect-square ai-mt-auto ai-btn-sm ai-btn-primary  small"
      >
        <span className="material-symbols-outlined">
          {chat?.isLoading ? "stop_circle" : "arrow_upward"}
        </span>
      </button>
    </form>
  );
}
