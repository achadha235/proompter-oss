import { type DataSource } from "typeorm";
import { ChatFlow } from "flowise/dist/database/entities/ChatFlow";
import { NodesPool } from "flowise/dist/NodesPool";
import {
  buildLangchain,
  constructGraphs,
  getEndingNode,
  getStartingNodes,
  resolveVariables,
} from "flowise/dist/utils/index";
import {
  INodeData,
  IReactFlowNode,
  IReactFlowObject,
  IChatMessage,
  IMessage,
} from "flowise/dist/Interface";

/**
 * Prepares a Flowise Chatflow for execution by building the Langchain and resolving variables
 * @param chatflow
 * @param appDataSource
 * @param message
 * @param conversation
 * @returns
 */
export async function prepareFlowiseExecution(
  chatflow: ChatFlow,
  appDataSource: DataSource,
  message: IChatMessage,
  history: IMessage[]
) {
  let nodeToExecuteData: INodeData;

  const chatId = Date.now().toString();
  const flowData = chatflow.flowData;
  const parsedFlowData = JSON.parse(flowData) as IReactFlowObject;

  const nodes = parsedFlowData.nodes;
  const edges = parsedFlowData.edges;
  const { graph, nodeDependencies } = constructGraphs(nodes, edges);
  const directedGraph = graph;
  const endingNodeId = getEndingNode(nodeDependencies, directedGraph);
  if (!endingNodeId) {
    throw new Error(`Ending node must be either a Chain or Agent`);
  }

  const endingNodeData = nodes.find((nd) => nd.id === endingNodeId)?.data;
  if (!endingNodeData) {
    throw new Error(`Ending node must be either a Chain or Agent`);
  }

  if (
    endingNodeData.outputs &&
    Object.keys(endingNodeData.outputs).length &&
    !Object.values(endingNodeData.outputs).includes(endingNodeData.name)
  ) {
    throw new Error(
      `Output of ${endingNodeData.label} (${endingNodeData.id}) must be ${endingNodeData.label}, can't be an Output Prediction`
    );
  }

  const constructedObj = constructGraphs(nodes, edges, true);
  const nonDirectedGraph = constructedObj.graph;
  const { startingNodeIds, depthQueue } = getStartingNodes(
    nonDirectedGraph,
    endingNodeId
  );

  const nodesPool = new NodesPool();
  await nodesPool.initialize();

  const question = message.content;

  /*** BFS to traverse from Starting Nodes to Ending Node ***/
  const reactFlowNodes = await buildLangchain(
    startingNodeIds,
    nodes,
    graph,
    depthQueue,
    nodesPool.componentNodes,
    question,
    history,
    chatId,
    chatflow.id,
    appDataSource
  );

  const nodeToExecute = reactFlowNodes.find(
    (node: IReactFlowNode) => node.id === endingNodeId
  );
  if (!nodeToExecute) {
    throw new Error(`Node ${endingNodeId} not found`);
  }

  const reactFlowNodeData: INodeData = resolveVariables(
    nodeToExecute.data,
    reactFlowNodes,
    question,
    history
  );
  nodeToExecuteData = reactFlowNodeData;

  const nodeInstanceFilePath = nodesPool.componentNodes[nodeToExecuteData.name]
    .filePath as string;
  const nodeModule = await import(nodeInstanceFilePath);
  const nodeInstance = new nodeModule.nodeClass();

  return { nodeInstance, nodeData: nodeToExecuteData, question, history };
}
