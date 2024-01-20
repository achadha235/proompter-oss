import { Adapter, Conversation, Message } from "@proompter/core";
import { type PrismaClient } from "./client";
import crypto from "crypto";
export default class ProompterPrismaAdapter implements Adapter {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async startConversation(userId: string, chatflowId: string) {
    const convo = await this.prisma.conversation.create({
      data: {
        userId,
        id: crypto.randomUUID().toString(),
        flowId: chatflowId,
      },
      include: {
        messages: true,
      },
    });
    return convo;
  }

  async setConversationName(conversationId: string, name: string) {
    await this.prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        name,
      },
    });
    return;
  }

  async setConversationArchived(conversationId: string, archived: boolean) {
    await this.prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        archived,
      },
    });
    return;
  }

  async getConversation(conversationId: string) {
    const convo = await this.prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          orderBy: {
            sequenceId: "asc",
          },
        },
      },
    });
    return convo;
  }

  async getConversations(
    userId: string,
    cursor: string | null,
    limit: number
  ): Promise<Omit<Conversation, "messages">[]> {
    const conversations = await this.prisma.conversation.findMany({
      where: {
        userId,
        ...(cursor && {
          id: {
            not: {
              equals: cursor as string,
            },
          },
        }),
      },
      take: limit || 25,
      ...(cursor ? { cursor: { id: cursor } } : {}),
      orderBy: {
        createdAt: "desc",
      },
    });
    return conversations;
  }

  async getChatUser(user: { id: string }): Promise<{ id: string }> {
    const chatUser = await this.prisma.chatUser.upsert({
      where: {
        id: user.id,
      },
      update: {},
      create: {
        id: user.id,
      },
    });
    return chatUser;
  }

  async saveMessage(conversationId: string, message: Message): Promise<void> {
    await this.prisma.message.create({
      data: {
        id: message.id,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        content: message.content,
        type: message.type,
        role: message.role,
      },
    });
  }
}
