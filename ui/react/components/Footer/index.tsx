import { Composer } from "../Composer";

export function Footer() {
  return (
    <div className="ai-w-full ai-flex ai-flex-col ai-justify-center ai-items-center ai-gap-2 ai-py-2">
      <Composer className="ai-w-full ai-max-w-3xl" />
      <div className="ai-text-xs ai-text-base-content">
        ChatGPT can make mistakes. Consider checking important information.
      </div>
    </div>
  );
}
