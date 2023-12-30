import crypto from "crypto";
import winston from "winston";

import { FlowiseSocketStream } from "./FlowiseSocketStream";
import { prepareFlowiseExecution } from "./prepareFlowiseExecution";
import { getChatflow } from "./getChatflow";
import { nullTransport } from "./nullTransport";

import { getDataSource } from "flowise/dist/DataSource";
import { FlowiseInput } from "./FlowiseRunArgs";

/**
 * Runs a Flowise ChatFlow and returns a readable stream for the result
 * @param chatflowId
 * @param args
 * @returns
 */
export async function run(
  chatflowId: string,
  args: FlowiseInput
): Promise<ReadableStream<any>> {
  const dataSource = getDataSource();
  const chatflow = await getChatflow(chatflowId, dataSource);

  const { nodeInstance, nodeData, question, history } =
    await prepareFlowiseExecution(
      chatflow,
      dataSource,
      args.message,
      args.history
    );

  const socketMock = FlowiseSocketStream();
  const socketStream = socketMock.stream;

  // const logger = winston.createLogger({
  //   level: "verbose",
  //   format: winston.format.simple(),
  //   transports: [nullTransport],
  // });

  // await nodeInstance.run(nodeData, question, {
  //   chatHistory: history,
  //   socketIO: socketMock,
  //   logger: logger,
  //   socketIOClientId: args?.conversationId || crypto.randomUUID(),
  // });

  return socketStream.readable;
}
