import { ChatflowOption } from "./Option";

export function SelectChatFlow() {
  return (
    <details className="ai-dropdown ai-dropdown-bottom">
      <summary className="ai-bg-base-100 ai-text-base-content hover:ai-bg-base-200 ai-transition-all ai-p-3 ai-rounded-box ai-flex ai-items-center ai-justify-between ai-gap-1 ai-cursor-pointer ai-border-none ai-outline-none">
        <span className="ai-text-lg">ChatGPT 4</span>
        <span className="material-symbols-outlined ai-opacity-50">
          expand_more
        </span>
      </summary>

      <ul className="ai-dropdown-content ai-z-[1] ai-mt-2 ai-shadow-sm ai-bg-base-100 ai-rounded-box ai-text-base-content ai-border ai-border-base-content ai-border-opacity-10 ai-join-vertical">
        <ChatflowOption />
        <div className="ai-divider ai-my-0 ai-py-0 ai-h-0" />
        <ChatflowOption />
      </ul>
    </details>
  );
}
