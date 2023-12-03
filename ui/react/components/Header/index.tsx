import { SelectChatFlow, SelectChatFlowProps } from "../SelectChatFlow";

export function Header({
  selectChatflowProps,
}: {
  selectChatflowProps: SelectChatFlowProps;
}) {
  return (
    <div className=" ai-p-2">
      <SelectChatFlow {...selectChatflowProps} />
    </div>
  );
}
