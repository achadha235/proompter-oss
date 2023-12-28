import { randomUUID } from "crypto";
import { IMessage, INodeData } from "flowise/dist/Interface";
import fs from "fs";
import winston from "winston";
import { FlowiseSocketStream } from "./FlowiseSocketStream";
/**
 * Sends a streaming response for an Express request by executing a given app Chatflow
 * @param res
 * @param conversation
 * @param question
 * @param history
 * @param nodeInstance
 * @param nodeData
 * @param onPredictionEvent
 */

const nullTransport = new winston.transports.Stream({
  stream: fs.createWriteStream("/dev/null"),
});

async function respondWithFlowiseExecution(
  question: string,
  history: IMessage[],
  nodeInstance: { run: Function },
  nodeData: INodeData
) {
  const socketMock = FlowiseSocketStream();
  const socketStream = socketMock.stream;
  const logger = winston.createLogger({
    level: "verbose", // Set the highest logging level for the logger
    format: winston.format.simple(),
    transports: [nullTransport],
  });

  await nodeInstance.run(nodeData, question, {
    chatHistory: history,
    socketIO: socketMock,
    logger: logger,
    socketIOClientId: randomUUID(),
  });

  return socketStream;
}
