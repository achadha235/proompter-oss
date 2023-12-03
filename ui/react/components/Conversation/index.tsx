import { Message } from "ai";
import { isNil } from "lodash";
import { ReactNode } from "react";
import { Examples } from "..";
import { Chat } from "@proompter/core";
import clsx from "clsx";

export function Conversation({
  messages,
  examples,
}: {
  messages: Message[];
  examples: Chat.Example[];
}) {
  let content: ReactNode = null;

  if (isNil(messages) || messages.length === 0) {
    return (
      <div className="ai-h-full ai-flex ai-flex-col ai-justify-evenly">
        <ConversationHeader className=" ai-my-auto" />
        <Examples
          className=" ai-mx-auto ai-mt-auto ai-mb-10  ai-max-w-3xl"
          examples={examples}
        />
      </div>
    );
  }
  return <div className="ai-w-full ai-bg-green-200">{content}</div>;
}

function ConversationHeader({ className = "" }: { className?: string }) {
  return (
    <div
      className={clsx(
        "ai-w-full ai-flex ai-flex-col ai-justify-center ai-items-center ai-gap-2",
        className
      )}
    >
      <div className="ai-avatar">
        <div className="ai-w-24 ai-rounded">
          <img className="ai-w-24 ai-h-24" src="/logo.svg" alt="logo" />
        </div>
      </div>
      <div className=" ai-text-2xl">How can I help you today?</div>
    </div>
  );
}
