import { Layout } from "./Layout";
import { Header } from "..";
import { Footer } from "../Footer";
import { Config } from "@proompter/core";
import { useProompter } from "../../hooks/useProompter";

export interface AppProps {
  proompterConfig: Config;
}

export function App({ proompterConfig }: AppProps): React.JSX.Element {
  if (!proompterConfig) {
    throw new Error("Please provide a configuration");
  }
  const { chatflow, setChatflow, config } = useProompter(proompterConfig);

  return (
    <Layout
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
      main={<div>Yo main</div>}
      drawer={
        <div className=" ai-h-full ai-w-full ai-flex ai-justify-center ai-items-center">
          Drawer
        </div>
      }
    />
  );
}
