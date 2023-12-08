export * from "flowise/dist/CachePool";
import { getDataSource } from "flowise/dist/DataSource";
import { ChatFlow } from "flowise/dist/database/entities/ChatFlow";

export async function getChatflows() {
  const dataSource = getDataSource();
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const chatflows = await dataSource.getRepository(ChatFlow).find();
  return chatflows;
}

export async function runChatflow(chatflow: ChatFlow) {
  return;
}
