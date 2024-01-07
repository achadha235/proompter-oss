import { isNil } from "lodash";
import { ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Message({
  text = "",
  imageURL,
  children,
  name = "You",
  isLoading = false,
  enableMarkdown = false,
}: {
  name?: ReactNode;
  text?: string;
  imageURL?: string;
  children?: ReactNode;
  isLoading?: boolean;
  enableMarkdown?: boolean;
}) {
  const isPlaceholder = isNil(text) || text === "";
  return (
    <div className="ai-max-w-3xl ai-flex ai-flex-col ai-mx-auto ai-w-full ai-justify-start ai-items-start ai-overflow-hidden ai-text-base-content ai-bg-base-100 ai-p-4">
      <div className="ai-flex ai-items-center ai-gap-2">
        <div className="ai-avatar">
          <div
            style={{ boxShadow: "inset 0 0 1px #0000004b" }}
            className="ai-w-8 ai-rounded-full"
          >
            <img src={imageURL} />
          </div>
        </div>
        <span className="ai-text-base-content ai-font-bold">{name}</span>
      </div>

      <div className="ai-w-full ai-pl-10 ai-text-sm ai-whitespace-pre-wrap">
        {!enableMarkdown && (
          <div className="ai-flex ai-flex-col ai-gap-0 ai-prose prose-headings:ai-mb-1 prose-headings:ai-mt-0 ai-leading-relaxed prose-ol:ai-leading-none prose-ul:ai-leading-none">
            <p>{text}</p>
          </div>
        )}

        {/* Fix the reflow problem for markdown */}
        {enableMarkdown && (
          <Markdown
            remarkPlugins={[remarkGfm]}
            className="ai-flex ai-flex-col ai-gap-0 ai-prose prose-headings:ai-mb-1 prose-headings:ai-mt-0 ai-leading-relaxed prose-ol:ai-leading-none prose-ul:ai-leading-none"
          >
            {isLoading && !isPlaceholder ? text + "⬤" : text}
          </Markdown>
        )}
        {isLoading && isPlaceholder && (
          <div className="ai-flex ai-flex-col ai-gap-0 ai-prose prose-headings:ai-mb-1 prose-headings:ai-mt-0 ai-leading-relaxed prose-ol:ai-leading-none prose-ul:ai-leading-none">
            <p className=" ai-animate-pulse">⬤</p>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
