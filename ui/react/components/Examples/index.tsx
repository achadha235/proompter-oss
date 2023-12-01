import clsx from "clsx";
import { Example } from "../Example";
import { motion } from "framer-motion";
import { Chat } from "@proompter/core";

const containerVariants = {
  visible: {
    transition: {
      // when children should start animating
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export interface ExamplesProps {
  examples: Chat.Example[];
  onExampleClicked?: (example: Chat.Example) => void;
  className?: string;
}

/**
 * A set of examples to be presented to a user as a possible starting point for a chat
 * @param props
 * @returns
 */
export function Examples({
  examples = [],
  onExampleClicked,
  className = "",
}: ExamplesProps) {
  return (
    <motion.div
      key={"examples"}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={clsx(
        "footer-gradient ai-flex ai-flex-col lg:ai-flex-row ai-flex-wrap ai-justify-center ai-items-center ai-gap-2 ai-w-full",
        className
      )}
    >
      {examples.map((example) => {
        const { title, subtitle, chatMessage } = example;
        return (
          <div
            key={title}
            className="ai-flex-none ai-w-full ai-flex-grow lg:ai-max-w-[48%] ai-mx-auto lg:ai-mx-0 "
          >
            <motion.div key={title} variants={itemVariants}>
              <Example
                key={title}
                onClick={() => onExampleClicked?.(example)}
                chatMessage={chatMessage}
                title={title}
                subtitle={subtitle}
              />
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}
