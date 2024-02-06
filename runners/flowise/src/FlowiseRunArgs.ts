import { IChatMessage, IMessage } from "flowise/dist/Interface";
export interface FlowiseInput {
  message: IChatMessage;
  history: IMessage[];
  conversationId: string;
}
