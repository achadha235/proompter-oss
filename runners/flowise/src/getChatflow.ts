import { DataSource } from "typeorm";
import { ChatFlow } from "@proompter/flowise/dist/database/entities/ChatFlow";

/**
 * Fetches a specific Flowise Chatflow. If it is not found, an error is thrown
 * @param chatflowId
 * @param dataSource
 * @returns
 */
export async function getChatflow(chatflowId: string, dataSource: DataSource) {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
    // throw new Error("Flowise data source is not intialized");
  }
  const chatflow = await dataSource
    .getRepository(ChatFlow)
    .findOneOrFail({ where: { id: chatflowId } });

  return chatflow;
}
