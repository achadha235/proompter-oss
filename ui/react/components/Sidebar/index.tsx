import { ReactNode } from "react";

export function Sidebar({
  header,
  main,
  footer,
}: {
  header: ReactNode;
  main: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className=" ai-w-full ai-h-screen ai-flex ai-flex-col ai-p-0">
      {header && <div className="ai-h-fit">{header}</div>}
      <div className="ai-flex-grow">{main}</div>
      {footer && <div className="ai-h-fit ai-p-2">{footer}</div>}
    </div>
  );
}
