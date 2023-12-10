import { Composer, ComposerProps } from "../Composer";

export function Footer({ composerProps }: { composerProps?: ComposerProps }) {
  return (
    <div className="ai-w-full ai-flex ai-flex-col ai-justify-center ai-items-center ai-gap-2 ai-p-2 ai-pt-0">
      <Composer {...composerProps} className="ai-w-full ai-max-w-3xl" />
      <div className="ai-text-xs ai-text-base-content">
        ChatGPT can make mistakes. Consider checking important information.
      </div>
    </div>
  );
}
