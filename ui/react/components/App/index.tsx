import { Layout } from "./Layout";
import { Header } from "..";
import { Footer } from "../Footer";
import { Config } from "@proompter/core";
import { useProompter } from "../../hooks/useProompter";
import { Conversation } from "../Conversation";

export interface AppProps {
  proompterConfig: Config;
}

export function App({ proompterConfig }: AppProps): React.JSX.Element {
  if (!proompterConfig) {
    throw new Error("Please provide a configuration");
  }
  const { chatflow, setChatflow, config } = useProompter(proompterConfig);
  const messages = [];
  const enableScroll = messages.length === 0;
  return (
    <Layout
      enableScroll={true}
      header={
        <Header
          selectChatflowProps={{
            chatflows: config.chatflows,
            chatflow,
            onChatflowClicked: (newChatflow) => {
              setChatflow(newChatflow);
            },
          }}
        />
      }
      footer={<Footer />}
      main={<Conversation messages={[]} examples={chatflow.examples!} />}
      drawer={
        <div className=" ai-h-full ai-w-full ai-flex ai-justify-center ai-items-center">
          Drawer
        </div>
      }
    />
  );
}
