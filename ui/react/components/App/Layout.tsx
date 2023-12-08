/// <reference lib="dom" />

import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowButton } from "../ArrowButton";
import { useLocalStorage } from "usehooks-ts";
export interface LayoutProps {
  className?: string;
  drawer?: React.ReactNode;
  header?: React.ReactNode;
  main?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  enableScroll?: boolean;
}

/**
 * A layout for a chat app with a drawer, header, main content and footer.
 * @param props: LayoutProps
 * @returns
 */
export function Layout({
  className,
  header,
  footer,
  drawer,
  main,
  children,
  enableScroll = true,
}: LayoutProps): React.JSX.Element {
  const drawerWidth = 250;

  const [drawerOpen, setDrawerOpen] = useLocalStorage("drawerOpen", false);
  const [showScrollDownButton, setShowScrollDownButton] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    axis: "y",
  });

  const handleScroll = () => {
    const scrollDiv = scrollContainerRef.current;

    const hasVerticalScroll =
      scrollDiv && scrollDiv.scrollHeight > scrollDiv.clientHeight;

    if (hasVerticalScroll && scrollYProgress.get() <= 0.97) {
      setShowScrollDownButton(true);
    } else {
      setShowScrollDownButton(false);
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior) => {
    const div = scrollContainerRef.current;
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

  // Container for the drawer
  const drawerContainer = (
    <motion.div
      className="ai-flex-shrink-0 ai-h-[100dvh] ai-overflow-hidden ai-border-r ai-border-x-base-200 ai-bg-base-300"
      initial={{
        width: drawerOpen ? drawerWidth : 0,
        opacity: drawerOpen ? 1 : 0,
      }}
      animate={{
        width: drawerOpen ? drawerWidth : 0,
        opacity: drawerOpen ? 1 : 0,
      }}
    >
      {drawer}
    </motion.div>
  );

  // Container for the drawer toggle button
  const drawerToggleButton = (
    <div
      className="ai-tooltip ai-tooltip-right ai-w-fit ai-rounded-md ai-px-1 ai-py-2 ai-z-[100] ai-absolute ai-top-[calc(50%_-_23px)] -ai-right-8"
      data-tip={drawerOpen ? "Close sidebar" : "Open sidebar"}
    >
      <ArrowButton
        onClick={() => setDrawerOpen(!drawerOpen)}
        className={clsx({
          closed: !drawerOpen,
        })}
      />
    </div>
  );

  const scrollDownButton = (
    <div className="ai-relative ai-h-0 ai-w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollDownButton ? 1 : 0 }}
        style={{ pointerEvents: showScrollDownButton ? "auto" : "none" }}
        className="ai-w-10 -ai-translate-y-14 ai-h-10 ai-mx-auto ai-border ai-border-base-content   ai-cursor-pointer ai-rounded-full ai-flex ai-items-center ai-justify-center ai-z-50 ai-bg-base-200 ai-bg-opacity-30 ai-shadow-lg ai-select-none"
        onClick={() => {
          scrollToBottom("smooth");
        }}
      >
        <span className="material-symbols-outlined">arrow_downward</span>
      </motion.div>
    </div>
  );

  // Main content area with the header main footer
  const mainContentArea = (
    <>
      {/* Main content */}
      <div
        onScroll={handleScroll}
        ref={scrollContainerRef}
        className={clsx(
          "ai-chat-content ai-w-full main ai-bg-base-100 ai-h-full ai-bottom-0 ai-relative ai-flex ai-flex-col ",
          enableScroll ? "ai-overflow-y-auto" : "ai-overflow-y-hidden"
        )}
      >
        <div className="ai-sticky ai-top-0 ai-z-50">{header}</div>
        <div className="ai-flex-grow ai-w-full">{main}</div>
        {children}
      </div>
      <div
        className={
          "ai-z-50 ai-w-full ai-flex ai-flex-col ai-shadow-md ai-bg-base-100 pt-0"
        }
      >
        {/* Scroll down button */}
        {scrollDownButton}

        {footer}
      </div>
    </>
  );

  const desktopLayout = (
    <div
      className={clsx(
        className,
        "ai-hidden lg:ai-flex ai-w-full ai-h-full ai-min-h-[100dvh] ai-z-40 ai-text-base-content ai-text-xs ai-bg-base-100"
      )}
    >
      <div id="sidebar" className="ai-relative ai-flex-shrink-0 ai-h-[100dvh]">
        {drawerContainer}
        {drawerToggleButton}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="ai-relative ai-flex ai-flex-col ai-max-w-full ai-flex-1 ai-overflow-hidden ai-h-screen ai-p-2"
      >
        {mainContentArea}
      </motion.div>
    </div>
  );

  const mobileSidebarToggleBtn = (
    <label htmlFor="my-drawer" className="ai-btn ai-btn-ghost ai-drawer-button">
      <span className="material-symbols-outlined">menu</span>
    </label>
  );

  const mobileMainContentArea = (
    <>
      {/* Main content */}
      <div
        onScroll={handleScroll}
        ref={scrollContainerRef}
        className={clsx(
          "ai-chat-content ai-w-full main ai-h-full ai-bg-base-100ai-bottom-0 ai-relative ai-flex ai-flex-col ",
          enableScroll ? "ai-overflow-y-auto" : "ai-overflow-y-hidden"
        )}
      >
        <div className="ai-sticky ai-top-0 ai-z-50 ai-flex  ai-border-b ai-border-opacity-10 ai-border-base-content ai-p-1">
          {mobileSidebarToggleBtn}
          <div className=" ai-flex-grow">{header}</div>
        </div>
        <div className="ai-flex-grow ai-w-full ai-p-2">{main}</div>
        {children}
        <div
          className={
            "ai-z-50 ai-w-full ai-flex ai-flex-col ai-shadow-md ai-bg-base-100 pt-0"
          }
        >
          {/* Scroll down button */}
          {scrollDownButton}
          {footer}
        </div>
      </div>
    </>
  );

  const mobileLayout = (
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
          <div className=" ai-flex-shrink-0 ai-w-[230px] ai-h-[100dvh] ai-overflow-hidden ai-border-r ai-border-x-base-200 ai-bg-base-300 ">
            {drawer}
          </div>
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {desktopLayout}
      {mobileLayout}
    </>
  );
}
