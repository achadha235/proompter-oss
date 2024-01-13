"use client";

import { Chat, Config, User } from "@proompter/core";
import { last } from "lodash";
import { useCallback, useEffect } from "react";
import { Header } from "..";
import { useProompter } from "../../hooks/useProompter";
import { Conversation } from "../Conversation";
import ConversationManager from "../ConversationManager";
import { Footer } from "../Footer";
import { Sidebar } from "../Sidebar";
import { UserMenu } from "../UserMenu";
import { Layout } from "./Layout";
import { StartConversationButton } from "./StartConversationButton";
export interface AppProps {
  proompterConfig: Config;
  user?: User;
  initialChatflowId: string | null;
  onChatflowSelected?: (chatflowId: Chat.Chatflow) => void;
  onLogoutPressed?: () => void;
}

export function App({
  proompterConfig,
  user,
  initialChatflowId,
  onChatflowSelected,
  onLogoutPressed,
}: AppProps): React.JSX.Element {
  const { chatflow, setChatflow, config, chat, conversationData } =
    useProompter(proompterConfig, {
      onChatflowSelected,
      initialChatflowId,
    });

  const messages = chat.messages;
  const enableScroll = messages && messages.length > 0;
  const conversationStarter =
    chatflow?.conversationStarter || proompterConfig.conversationStarter!;

  const scrollToBottom = (behavior: ScrollBehavior) => {
    let div = document.getElementById("chatContent");
    div?.scrollTo({
      top: div.scrollHeight,
      behavior,
    });
  };

  useEffect(() => {
    const scrollDiv = document.getElementById("chatContent");
    if (!scrollDiv) {
      return;
    }
    const oneRem = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const minDistance = 3 * oneRem + 5;
    const showScrollDownButton =
      scrollDiv.scrollHeight - scrollDiv.clientHeight - scrollDiv.scrollTop >=
      minDistance;
    const nearBottom = !showScrollDownButton;
    const hasVerticalScroll =
      scrollDiv && scrollDiv.scrollHeight > scrollDiv.clientHeight;
    const lastMessageFromUser = last(chat.messages)?.role === "user";

    if (
      lastMessageFromUser ||
      (hasVerticalScroll && nearBottom) ||
      !hasVerticalScroll
    ) {
      scrollToBottom("instant");
    }
  }, [chat.messages, last(chat.messages)?.content]);

  const onScrollToBottom = useCallback(() => {
    if (
      conversationData.isLoading ||
      conversationData.isValidating ||
      conversationData.isReachingEnd
    ) {
      return;
    }
    console.log("Loading page " + (conversationData.size + 1));
    conversationData.setSize(conversationData.size + 1);
  }, [
    conversationData.isLoading,
    conversationData.isValidating,
    conversationData.isReachingEnd,
    conversationData.setSize,
    conversationData.size,
  ]);

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
            chatflow: chatflow!,
            onChatflowClicked: (newChatflow) => {
              setChatflow(newChatflow);
            },
          }}
        />
      }
      drawer={
        <Sidebar
          main={
            <ConversationManager
              onScrolledToBottom={onScrollToBottom}
              isLoading={conversationData.isLoading}
              isLoadingMore={conversationData.isLoadingMore}
              isLoadingInitialData={conversationData.isLoadingInitialData}
              conversations={conversationData.conversations}
            />
          }
          header={
            <StartConversationButton
              className=" ai-m-2 ai-mb-0"
              imageURL={proompterConfig.imageURL}
              title={proompterConfig.name}
            />
          }
          footer={
            <UserMenu
              user={user}
              className=" ai-mt-auto"
              onLogoutPressed={onLogoutPressed}
            />
          }
        />
      }
      main={
        <Conversation
          isLoading={chat.isLoading}
          conversationHeaderProps={{
            title: conversationStarter.title || "How can I help you today?",
            imageURL: conversationStarter.imageURL || proompterConfig.imageURL,
          }}
          user={user}
          appUser={{
            name: proompterConfig.name,
            imageURL: proompterConfig.imageURL,
          }}
          messages={chat.messages}
          examples={conversationStarter.examples}
        />
      }
      footer={<Footer composerProps={{ chat }} />}
    />
  );
}
