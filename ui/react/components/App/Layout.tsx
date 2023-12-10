/// <reference lib="dom" />

import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowButton } from "../ArrowButton";
import { useLocalStorage } from "usehooks-ts";
import { MobileLayout } from "./MobileLayout";
export interface LayoutProps {
  className?: string;
  drawer?: React.ReactNode;
  header?: React.ReactNode;
  main?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  enableScroll?: boolean;
}

export function Layout(props: LayoutProps): React.JSX.Element {
  return (
    <>
      <DesktopLayout {...props} />
      <MobileLayout {...props} />
    </>
  );
}

/**
 * A layout for a chat app with a drawer, header, main content and footer.
 * @param props: LayoutProps
 * @returns
 */
export function DesktopLayout({
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
    let div = scrollContainerRef.current;
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
    <div className="ai-relative ai-h-0 ai-w-full " id="scrollDownButton">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollDownButton ? 1 : 0 }}
        style={{ pointerEvents: showScrollDownButton ? "auto" : "none" }}
        className="ai-w-10 -ai-translate-y-14 ai-h-10 ai-mx-auto ai-border ai-border-base-content   ai-cursor-pointer ai-rounded-full ai-flex ai-items-center ai-justify-center ai-bg-base-200 ai-bg-opacity-80 ai-shadow-lg ai-select-none"
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

  return (
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
        className="ai-relative ai-flex ai-flex-col ai-max-w-full ai-flex-1 ai-overflow-hidden ai-h-screen ai-p-0"
      >
        {mainContentArea}
      </motion.div>
    </div>
  );
}
