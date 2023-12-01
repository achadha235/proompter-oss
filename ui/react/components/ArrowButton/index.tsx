import clsx from "clsx";
import { MouseEventHandler } from "react";

interface ArrowButtonProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

/** A cool little animated arrow toggle, just like the one OpenAI made */
export function ArrowButton({ onClick, className = "" }: ArrowButtonProps) {
  return (
    <div className={clsx("arrow-button", className)} onClick={onClick}>
      <div className="arrow-top ai-rounded-full" />
      <div className="arrow-bottom ai-rounded-full" />
    </div>
  );
}

export default ArrowButton;
