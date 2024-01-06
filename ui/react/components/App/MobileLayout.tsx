import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { LayoutProps } from "./Layout";

/**
 * A layout for a chat app with a drawer, header, main content and footer.
 * @param props: LayoutProps
 * @returns
 */

export function MobileLayout({
  className,
  header,
  footer,
  drawer,
  main,
  children,
  enableScroll = true,
}: LayoutProps): React.JSX.Element {
  const [showScrollDownButton, setShowScrollDownButton] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: any) => {
    const scrollDiv = document.getElementById("chatContent");
    const hasVerticalScroll =
      scrollDiv && scrollDiv.scrollHeight > scrollDiv.clientHeight;
    if (hasVerticalScroll) {
      const showScrollDownButton =
        e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop >= 5;
      if (showScrollDownButton) {
        setShowScrollDownButton(true);
      } else {
        setShowScrollDownButton(false);
      }
    } else {
      setShowScrollDownButton(false);
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior) => {
    const div = document.getElementById("chatContent");
    div?.scrollTo({
      top: div.scrollHeight,
      behavior,
    });
  };

  useEffect(() => {
    const scrollDiv = scrollContainerRef.current;
    const hasVerticalScroll =
      scrollDiv && scrollDiv.scrollHeight > scrollDiv.clientHeight;

    if (hasVerticalScroll) {
      scrollDiv.scrollTo({
        top: scrollDiv.scrollHeight,
        behavior: "smooth",
      });
    }
  }, []);

  const scrollDownButton = (
    <div className="ai-relative ai-h-0 ai-w-full " id="scrollDownButton">
      <motion.div
        // initial={{ opacity: 0 }}
        animate={{ opacity: showScrollDownButton ? 1 : 0 }}
        style={{ pointerEvents: showScrollDownButton ? "auto" : "none" }}
        className="ai-w-10 -ai-translate-y-14 ai-h-10 ai-mx-auto ai-border ai-border-base-content   ai-cursor-pointer ai-rounded-full ai-flex ai-items-center ai-justify-center ai-bg-base-200 ai-bg-opacity-30 ai-shadow-lg ai-select-none"
        onClick={() => {
          scrollToBottom("smooth");
        }}
      >
        <span className="material-symbols-outlined">arrow_downward</span>
      </motion.div>
    </div>
  );

  const mobileSidebarToggleBtn = (
    <label
      htmlFor="my-drawer"
      className="ai-btn ai-btn-ghost ai-drawer-button ai-mt-1"
    >
      <span className="material-symbols-outlined">menu</span>
    </label>
  );

  const mobileMainContentArea = (
    <>
      {/* Main content */}
      <div
        id="chatContent"
        onScroll={handleScroll}
        className={clsx(
          "ai-chat-content ai-w-full main ai-h-full ai-bg-base-100ai-bottom-0 ai-relative ai-flex ai-flex-col ",
          enableScroll ? "ai-overflow-y-auto" : "ai-overflow-y-hidden"
        )}
      >
        <div className=" ai-sticky ai-top-0 ai-z-50 ai-flex  ai-border-b ai-border-opacity-10 ai-border-base-content ai-bg-base-100 ai-bg-opacity-80 ai-p-1 ai-pt-2">
          {mobileSidebarToggleBtn}
          <div className=" ai-flex-grow">{header}</div>
        </div>
        <div className=" ai-z-40 ai-flex-grow ai-w-full ai-p-2">{main}</div>
        {children}
        <div
          className={
            "ai-z-50 ai-w-full ai-h-fit ai-flex ai-flex-col ai-shadow-md ai-bg-base-100 pt-0 ai-sticky ai-bottom-0"
          }
        >
          {/* Scroll down button */}
          {scrollDownButton}
          {footer}
        </div>
      </div>
    </>
  );

  return (
    <div className="ai-drawer lg:ai-hidden">
      <input id="my-drawer" type="checkbox" className="ai-drawer-toggle" />
      <div className="ai-drawer-content ai-h-[100vh] ai-overflow-hidden ai-bg-base-100">
        {mobileMainContentArea}
      </div>
      <div className="ai-drawer-side ai-h-full ai-z-[1000]">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="ai-drawer-overlay ai-overscroll-none"
        />
        <ul className="ai-bg-base-200 ai-text-base-conten">
          <div className=" ai-flex-shrink-0 ai-w-[250px] ai-h-[100dvh] ai-overflow-hidden ai-border-r ai-border-x-base-200 ai-bg-base-300 ">
            {drawer}
          </div>
        </ul>
      </div>
    </div>
  );
}
