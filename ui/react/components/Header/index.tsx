import { useProompter } from "@/hooks/useProompter";
import { SelectChatFlow } from "../SelectChatFlow";

export function Header() {
  const {
    config: { chatflows },
    chatflow,
    setChatflow,
  } = useProompter();
  return (
    <div className=" ai-p-2">
      <SelectChatFlow
        onChatflowClicked={(chatflow) => {
          setChatflow(chatflow);
        }}
        chatflow={chatflow}
        chatflows={chatflows!}
      />
    </div>
  );
}
