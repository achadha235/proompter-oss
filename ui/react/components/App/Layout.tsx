import clsx from "clsx";
import { useState } from "react";
export interface LayoutProps {
  className?: string;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  main?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export function Layout({ className, footer }: LayoutProps): React.JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div
    
      className={clsx(
        className,
        "ai-w-full ai-flex ai-h-full ai-min-h-[100dvh] ai-z-40 ai-text-base-content ai-text-xs ai-bg-base-100"
      )}
    >




    </div>
  );
}
