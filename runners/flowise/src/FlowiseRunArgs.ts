import { IChatMessage, IMessage } from "@proompter/flowise/dist/Interface";
export interface FlowiseInput {
  message: IChatMessage;
  history: IMessage[];
  conversationId: string;
}
