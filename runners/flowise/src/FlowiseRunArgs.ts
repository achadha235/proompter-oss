import { IChatMessage, IMessage } from "flowise/dist/Interface";

export interface FlowiseRunArgs {
  message: IChatMessage;
  history: IMessage[];
  conversationId?: string;
}
