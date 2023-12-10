import clsx from "clsx";
import {
  StartConversationButton,
  StartConversationButtonProps,
} from "../App/StartConversationButton";
import { SelectChatFlow, SelectChatFlowProps } from "../SelectChatFlow";

export function Header({
  className,
  selectChatflowProps,
  startConversationButtonProps,
}: {
  className?: string;
  selectChatflowProps: SelectChatFlowProps;
  startConversationButtonProps: StartConversationButtonProps;
}) {
  return (
    <div
      className={clsx(
        "ai-flex ai-bg-base-100 ai-bg-opacity-90 ai-p-1",
        className
      )}
    >
      <SelectChatFlow {...selectChatflowProps} />
      <StartConversationButton {...startConversationButtonProps} />
    </div>
  );
}
