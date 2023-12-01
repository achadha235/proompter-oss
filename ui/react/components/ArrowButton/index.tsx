import clsx from "clsx";
import { EventHandler } from "react";

interface ArrowButtonProps {
  onClick?: EventHandler<any>;
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