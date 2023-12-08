"use client";
import { Layout } from "./Layout";
import { Header } from "..";
import { Footer } from "../Footer";
import { Config, User } from "@proompter/core";
import { useProompter } from "../../hooks/useProompter";
import { Conversation } from "../Conversation";
import { Sidebar } from "../Sidebar";
import ConversationManager from "../ConversationManager";
import { UserMenu } from "../UserMenu";
import { StartConversationButton } from "./StartConversationButton";
export interface AppProps {
  proompterConfig: Config;
  user?: User;
}

export function App({ proompterConfig, user }: AppProps): React.JSX.Element {
  if (!proompterConfig) {
    throw new Error("Please provide a configuration");
  }

  const { chatflow, setChatflow, config, chat, conversations } =
    useProompter(proompterConfig);

  const messages = chat.messages;
  const enableScroll = messages.length === 0;
  const conversationStarter =
    chatflow?.conversationStarter || proompterConfig.conversationStarter!;

  return (
    <Layout
      enableScroll={enableScroll}
      header={
        <Header
          className=" ai-relative"
          startConversationButtonProps={{
            buttonOnly: true,
            className: "md:ai-hidden ai-ml-auto",
            imageURL: proompterConfig.imageURL,
            title: proompterConfig.name,
          }}
          selectChatflowProps={{
            chatflows: config.chatflows,
            chatflow,
            onChatflowClicked: (newChatflow) => {
              setChatflow(newChatflow);
            },
          }}
        />
      }
      drawer={
        <Sidebar
          main={<ConversationManager conversations={conversations} />}
          header={
            <StartConversationButton
              imageURL={proompterConfig.imageURL}
              title={proompterConfig.name}
            />
          }
          footer={<UserMenu user={user} className=" ai-mt-auto" />}
        />
      }
      main={
        <Conversation
          conversationHeaderProps={{
            title: conversationStarter.title || "How can I help you today?",
            imageURL: conversationStarter.imageURL || proompterConfig.imageURL,
          }}
          messages={[]}
          examples={conversationStarter.examples}
        />
      }
      footer={<Footer />}
    />
  );
}
