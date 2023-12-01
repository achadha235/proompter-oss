export function ChatflowOption() {
  return (
    <li className="ai-w-96 ai-m-2 ai-p-4 hover:ai-bg-base-200 ai-rounded-box ai-cursor-pointer">
      <div className="ai-flex ai-gap-2 ai-items-start">
        <span className="material-symbols-outlined ai-opacity-50">bolt</span>
        <div>
          <div className="ai-text-base ai-font-medium">GPT-4</div>
          <div className="ai-text-sm ai-whitespace-pre-wrap ai-mt-2">
            {"With DALLE, browsing and analaysis.\nLimit 40 messages / 3 hours"}
          </div>
        </div>
        <span
          className="material-symbols-outlined ai-opacity-50 ai-ml-auto"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
      </div>
    </li>
  );
}
