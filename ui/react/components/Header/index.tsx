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
    <div className={clsx("ai-flex", className)}>
      <SelectChatFlow {...selectChatflowProps} />
      <StartConversationButton {...startConversationButtonProps} />
    </div>
  );
}
