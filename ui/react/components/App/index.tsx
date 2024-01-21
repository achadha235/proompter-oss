"use client";

import {
  Chat,
  Config,
  Conversation as ConverationType,
  User,
} from "@proompter/core";
import { last } from "lodash";
import { useCallback, useEffect } from "react";
import { Header } from "..";
import { useProompter } from "../../hooks/useProompter";
import ConversationManager from "../ConversationManager";
import { Footer } from "../Footer";
import { Sidebar } from "../Sidebar";
import { UserMenu } from "../UserMenu";
import { Layout } from "./Layout";
import { StartConversationButton } from "./StartConversationButton";
import { Conversation } from "../Conversation";
export interface AppProps {
  proompterConfig: Config;
  user?: User;
  initialChatflowId?: string;
  initialConversationId?: string;
  onNewConversationClicked?: () => void;
  onChatflowSelected?: (chatflowId: Chat.Chatflow) => void;
  onLogoutPressed?: () => void;
}

export function App({
  proompterConfig,
  user,
  onChatflowSelected,
  onNewConversationClicked,
  initialConversationId,
  onLogoutPressed,
  initialChatflowId,
}: AppProps): React.JSX.Element {
  const {
    chatflow,
    setChatflow,
    config,
    chat,
    conversationData,
    conversationId,
    setConversationId,
    currentConveration,
    renameConversation,
  } = useProompter(proompterConfig, {
    onChatflowSelected,
    initialChatflowId,
    initialConversationId,
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

  const focusComposer = () => {
    document.getElementById("composer-input")?.focus();
  };

  const onSidebarConversationSelected = (conversation: ConverationType) => {
    setConversationId(conversation?.id);
    focusComposer();
  };

  const startNewConversation = () => {
    chat.setMessages([]);
    onNewConversationClicked?.();
    setConversationId(null);
    focusComposer();
  };

  const onConversationRenamed = (
    conversation: ConverationType,
    name: string
  ) => {
    return renameConversation(conversation.id, name);
  };

  const onExampleClicked = (example: Chat.Example) => {
    chat.append({
      content: example.chatMessage,
      role: "user",
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
    conversationData.setSize(conversationData.size + 1);
  }, [
    conversationData.isLoading,
    conversationData.isValidating,
    conversationData.isReachingEnd,
    conversationData.setSize,
    conversationData.size,
  ]);

  useEffect(() => {
    if (!conversationId || !chat.messages) {
      return;
    }
    scrollToBottom("instant");
  }, [conversationId, chat.messages]);

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
              setConversationId(null);
              proompterConfig.onConversationSelected?.(null);
              setChatflow(newChatflow);
            },
          }}
        />
      }
      drawer={
        <Sidebar
          main={
            <ConversationManager
              activeConversationId={conversationId}
              onScrolledToBottom={onScrollToBottom}
              isLoading={conversationData.isLoading}
              isLoadingMore={conversationData.isLoadingMore}
              isLoadingInitialData={conversationData.isLoadingInitialData}
              conversations={conversationData.conversations}
              onConversationSelected={onSidebarConversationSelected}
              onConversationArchived={onSidebarConversationSelected}
              onConversationShared={onSidebarConversationSelected}
              onConversationRenamed={onConversationRenamed}
            />
          }
          header={
            <StartConversationButton
              onClick={startNewConversation}
              className=" ai-m-2 ai-mb-0"
              imageURL={proompterConfig.imageURL}
              title={proompterConfig.name}
            />
          }
          footer={
            <UserMenu
              user={user}
              className=" ai-mt-auto ai-pb-5"
              onLogoutPressed={onLogoutPressed}
            />
          }
        />
      }
      main={
        <Conversation
          activeConversationId={conversationId}
          onExampleClicked={onExampleClicked}
          conversationIsLoading={currentConveration.isLoading}
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
